var includePaths = require('rollup-plugin-includepaths');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var uglify = require('rollup-plugin-uglify');
var progress = require('rollup-plugin-progress');

module.exports = {
    entry: 'src/app/main-aot.js',
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