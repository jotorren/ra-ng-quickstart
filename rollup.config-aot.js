import rollup from 'rollup'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify'

export default {
    entry: 'src/app/main-aot.js',
    dest: 'dist/public/app.js', // output a single application bundle
    sourceMap: false,
    format: 'iife',
    plugins: [
        nodeResolve({ jsnext: true, module: true }),

        commonjs({
            include: [ 'node_modules/rxjs/**', 
            'node_modules/primeng/**', 'node_modules/log4javascript/**', 'node_modules/lodash/**',
            'node_modules/crypto-js/**' ],
            
            namedExports: {
                'node_modules/primeng/primeng.js': [ 'MessagesModule', 'GrowlModule', 'PanelModule', 'DropdownModule',
                'ToggleButtonModule', 'BreadcrumbModule', 'ConfirmDialogModule', 'ConfirmationService' ],
                'node_modules/log4javascript/log4javascript.js': [ 'AjaxAppender', 'AlertAppender', 'BrowserConsoleAppender',
                'NullLayout', 'SimpleLayout', 'PatternLayout', 'XmlLayout', 'JsonLayout', 'HttpPostDataLayout',
                'setEnabled', 'getLogger', 'getRootLogger', 'Level', 'Logger' ],
                'node_modules/lodash/lodash.js': [ 'find' ],
                'node_modules/crypto-js/index.js': [ 'AES', 'enc' ]
            }
        }),
        uglify()
    ]
}