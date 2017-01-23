import includePaths from 'rollup-plugin-includepaths';
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import progress from 'rollup-plugin-progress';

export default {
    entry: 'src/app/main-aot.js',
    dest: 'dist/public/app.js',
    sourceMap: true,
    sourceMapFile: 'dist/public/app.js.map',
    format: 'iife',
    plugins: [
        progress({
            clearLine: true
        }),

        includePaths({
            include: {},
            paths: ['src'],
            external: [],
            extensions: ['.js']
        }),

        nodeResolve({ jsnext: true, module: true }),

        commonjs({
            include: ['node_modules/rxjs/**',
                'node_modules/primeng/**', 'node_modules/log4javascript/**', 'node_modules/lodash/**',
                'node_modules/crypto-js/**', 'node_modules/moment/**'],

            namedExports: {
                'node_modules/primeng/primeng.js': ['MessagesModule', 'GrowlModule', 'PanelModule', 'DropdownModule',
                    'ToggleButtonModule', 'BreadcrumbModule', 'ConfirmDialogModule', 'ConfirmationService'],
                'node_modules/log4javascript/log4javascript.js': ['AjaxAppender', 'AlertAppender', 'BrowserConsoleAppender',
                    'NullLayout', 'SimpleLayout', 'PatternLayout', 'XmlLayout', 'JsonLayout', 'HttpPostDataLayout',
                    'setEnabled', 'getLogger', 'getRootLogger', 'Level', 'Logger'],
                'node_modules/lodash/lodash.js': ['find'],
                'node_modules/crypto-js/index.js': ['AES', 'enc']
            }
        }),
        uglify()
    ],
    onwarn: function (warn) {
        if (/THIS_IS_UNDEFINED/.test(warn.code)) return;

        console.error('-----------');
        console.error(warn.message);
        if (!/MISSING_EXPORT/.test(warn.code) && warn.loc){
            console.error(warn.loc);
        }
    }
}