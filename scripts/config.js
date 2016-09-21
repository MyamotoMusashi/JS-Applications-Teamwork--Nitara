 SystemJS.config({
            'transpiler': 'plugin-babel',
            'map': {
                'plugin-babel': '../node_modules/systemjs-plugin-babel/plugin-babel.js',
                'systemjs-babel-build': '../node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
                'main': '../scripts/main.js',
                'jquery': '../bower_components/jquery/dist/jquery.js',
            }
});
        System.import('main');