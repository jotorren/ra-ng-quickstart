var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var htmlMinifier = require('html-minifier');
var inlineNg2Template = require('gulp-inline-ng2-template');
var merge = require('merge2');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');
// var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var sysBuilder = require('systemjs-builder');

var ngc = require('gulp-ngc');
var rollup = require('rollup-stream');
var source = require('vinyl-source-stream');

var tsProject = ts.createProject('tsconfig.json');
var aotProject = ngc('tsconfig-aot.json');

gulp.task('default', function(callback) {
  runSequence('clean', 'environment:prod', 'compile:ts', 'clean:public', 'gen:assets', 'bundle:js', 'environment:dev', callback);
});

gulp.task('aot', function(callback) {
  runSequence('clean', 'environment:prod', 'compile:aot', 'clean:public', 'gen:assets', 'bundle:aot', 'environment:dev', callback);
});

gulp.task('clean:dist', function() {
    return gulp.src('dist/src', { read: false }).pipe(clean());
});

gulp.task('clean:public', function() {
    return gulp.src('dist/public', { read: false }).pipe(clean());
});

gulp.task('clean:aot', function() {
    return gulp.src('aot', { read: false }).pipe(clean());
});

gulp.task('clean', ['clean:public', 'clean:dist', 'clean:aot']);

gulp.task('environment:prod', function() {

    return gulp.src('src/environments/environment.prod.ts')
        .pipe(rename('environment.ts'))
        .pipe(gulp.dest('src/app/shared'));
});

gulp.task('environment:dev', function() {

    return gulp.src('src/environments/environment.ts')
        .pipe(gulp.dest('src/app/shared'));
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
        .pipe(replace('moduleId: module.id,', ''))
        .pipe(tsProject())
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/src/app'));
});

gulp.task('compile:aot', function() {
    return ngc('tsconfig-aot.json');
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
            'node_modules/quill/dist/quill.bubble.css'
        ]).pipe(gulp.dest('dist/public/assets/css')),

        gulp.src('node_modules/primeui/themes/redmond/theme.css')
            .pipe(rename('primeui-redmond-theme.css')).pipe(gulp.dest('dist/public/assets/css')),

        gulp.src([
            'node_modules/core-js/client/shim.min.js',
            'node_modules/zone.js/dist/zone.min.js',
            'node_modules/reflect-metadata/Reflect.js',
            'node_modules/quill/dist/quill.min.js'
        ]).pipe(concat('polyfills.js')).pipe(uglify()).pipe(gulp.dest('dist/public')),

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
        //     'ra-ng', 'ng2-translate/ng2-translate', 'log4javascript', 'cachefactory', 'lodash',
        //     'rxjs', 'crypto-js', 'primeng'],
        minify: true,
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
  return rollup('rollup.config-aot.js')
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist/public'));
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