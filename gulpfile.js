var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var htmlMinifier = require('html-minifier');
var inlineNg2Template = require('gulp-inline-ng2-template');
var merge = require('merge2');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var rev = require("gulp-rev");
var revReplace = require("gulp-rev-replace");
var revdel = require('gulp-rev-delete-original');
var runSequence = require('run-sequence');
// var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip');
var sysBuilder = require('systemjs-builder');

var ngc = require('gulp-ngc');
var Q = require('q');
var rollup = require( 'rollup' );

var tsProject = ts.createProject('tsconfig.prod.json');

gulp.task('default', function(callback) {
  runSequence(
      'clean:dist', 
      'environment:prod', 'compile:ts', 'environment:dev', 
      'gen:assets', 
      'bundle:js', 'cache:bust', 'bundle:zip', callback);
});

gulp.task('aot', function(callback) {
  runSequence(
      'clean:dist', 
      'environment:prod', 'compile:aot', 'environment:dev', 
      'gen:assets', 'call:namespace', 
      'bundle:aot', 'cache:bust', 'bundle:zip', callback);
});

gulp.task('clean:dist', function() {
    return gulp.src('dist', { read: false }).pipe(clean());
});

gulp.task('environment:prod', function() {

    return gulp.src('src/environments/environment.prod.ts')
        .pipe(rename('environment.ts'))
        .pipe(gulp.dest('src/app/shared'));
});

gulp.task('environment:dev', function() {

    return gulp.src('src/environments/environment.ts')
        .pipe(gulp.dest('src/app/shared'));
});

gulp.task('call:namespace', function() {

    return gulp.src('src/**/*.js')
        .pipe(replace('import * as moment', 'import moment'))
        .pipe(gulp.dest('src'));
});

// Compile TypeScript to JS
gulp.task('compile:ts', function() {

    return tsProject.src()
        //.pipe(sourcemaps.init())
        .pipe(inlineNg2Template({
            base: '/src/app',
            target: 'es5',
            indent: 0,
            useRelativePaths: true,
            removeLineBreaks: true,
            templateProcessor: minifyTemplate,
            styleProcessor: minifyTemplate
        }))
        .pipe(tsProject())
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/src/app'));
});

gulp.task('compile:aot', function() {
    return ngc('tsconfig.prod-aot.json');
});

gulp.task('gen:assets', function() {
    return merge([
        gulp.src('src/systemjs.config.js').pipe(replace('./../node_modules/', './node_modules/')).pipe(gulp.dest('dist/src')),

        gulp.src('src/assets/**/*').pipe(gulp.dest('dist/public/assets')),
        gulp.src([
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap.min.css.map',
            'node_modules/primeui/primeui-ng-all.min.css',
            'node_modules/quill/dist/quill.snow.css',
            'node_modules/quill/dist/quill.bubble.css'])
            .pipe(gulp.dest('dist/public/assets/css')),

        gulp.src('node_modules/primeui/themes/redmond/theme.css')
            .pipe(rename('primeui-redmond-theme.css')).pipe(gulp.dest('dist/public/assets/css')),

        gulp.src([
            'node_modules/core-js/client/shim.min.js',
            'node_modules/zone.js/dist/zone.min.js',
            'node_modules/reflect-metadata/Reflect.js',
            'node_modules/quill/dist/quill.min.js'])
            .pipe(concat('polyfills.js'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/public')),

        gulp.src('src/*.ico').pipe(gulp.dest('dist/public')),
        gulp.src('src/index-public.html').pipe(rename('index.html')).pipe(gulp.dest('dist/public')),
        gulp.src('src/environments/**/*.json').pipe(gulp.dest('dist/public/environments')),
        gulp.src('src/app/**/*.json').pipe(gulp.dest('dist/public/app'))
    ]);
});

gulp.task('bundle:js', function() {
    var builder = new sysBuilder('dist/src', 'dist/src/systemjs.config.js');
    return builder.buildStatic('app', 'dist/public/app.js', {
        // externals: ['@angular/core', '@angular/common', '@angular/compiler', '@angular/platform-browser',
        //     '@angular/platform-browser-dynamic', '@angular/http', '@angular/router', '@angular/forms',
        //     'ra-ng', 'ng2-translate/ng2-translate', 'log4javascript', 'moment', 'lodash',
        //     'rxjs', 'crypto-js', 'primeng'],
        minify: true,
        // sourceMaps, Either boolean value (enable/disable) or string value 'inline' which will inline the 
        // SourceMap data as Base64 data URI right in the generated output file (never use in production). 
        // (Default is false)
        sourceMaps: false
    })
        .then(function() {
            console.log('>>> [systemjs-builder] Bundling OK');
        })
        .catch(function(err) {
            console.error('>>> [systemjs-builder] Bundling failed', err);
        });
});

gulp.task('bundle:aot', function() {
    var deferred = Q.defer();
    var config = require( './rollup.config-aot.es5.js' );
    rollup.rollup(config).then( function ( bundle ) {

        bundle.write({
            dest: 'dist/public/app.js',
            sourceMap: false,
            format: 'iife'
        });

        deferred.resolve();
    });

    return deferred.promise;
});

gulp.task('bundle:hash', function(){
  return gulp.src(['dist/public/polyfills.js', 'dist/public/app.js'])
    .pipe(rev())
    .pipe(revdel())
    .pipe(gulp.dest('dist/public'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist/public'))
})

gulp.task('cache:bust', ['bundle:hash'], function(){
  var manifest = gulp.src('dist/public/rev-manifest.json');
 
  return gulp.src('dist/public/index.html')
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest('dist/public'));
});

gulp.task('bundle:zip', function() {
    return gulp.src(['dist/public/polyfills*.js', 'dist/public/app*.js'])
        .pipe(gzip({ gzipOptions: { level: 9 } }))
        .pipe(gulp.dest('dist/public'));
});

function minifyTemplate(path, ext, file, callback) {
    try {
        var minifiedFile = htmlMinifier.minify(file, {
            collapseWhitespace: true,
            caseSensitive: true,
            removeComments: true,
            removeRedundantAttributes: true
        });
        callback(null, minifiedFile);
    }
    catch (err) {
        callback(err);
    }
}