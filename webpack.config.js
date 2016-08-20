var webpack = require('webpack');
var fs = require('fs');
var path = require('path');

var HtmlPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin')
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var config = {
    /* Entry points define modules or sets of modules. Each entry point
    is bundled into a separate file as specified by the output config
    object below. */
    entry: {
        vendor: ['react', 'react-dom']
    },
    /* Output defines where bundled objects are compiled to.
           path: the directory from the root.
           filename: the resulting filename. [name] refers to the key
               objects within the entry object. [chunkhash] refers to
               the hash of the contents of the resulting file, for 
               caching purposes */
    output: {
        path: 'static',
        filename: 'js/[name].[chunkhash].js'
    },
    module: {
        /* Loaders define how files are processed by webpack. Files
        which either match the test string or regex which also do
        not match the exclude string or regex are processed by
        loaders defined in either the loader or loaders key in
        each object. Loaders are processed from right to left,
        analagous to matrix multiplication or evalution of
        mathematical functions (e.g. f(g(x)) -> g first, then f).
        See the webpack documentation for more detail. */
        loaders: [
        {
            // Transpiles ES2015 to browser supported JavaScript.
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              presets: ['es2015', 'react']
            }
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        },
        {
            test: /\.jpe?g$|\.png$/,
            loader: 'file'
        }]
    },
    /* Plugins do additional transformations to the compilation.
    
    CommonsChunkPlugin extracts from all .js and .css files common
    requirements, which are separately stored and cached. This
    prevents redownload of shared dependencies.
    
    ExtractTextPlugin extracts .css files from being inlined in
    the compiled JavaScript code. Instead it bundles all required
    css inside a separate css file, which is loaded into the
    generated HTML through a stylesheet tag.
    
    CleanPlugin cleans the compile directory before each build. */
    plugins: [
        new CommonsChunkPlugin({name: 'vendor', filename: 'js/vendor.[chunkhash].js', minChunks: Infinity}),
        new ExtractTextPlugin("css/[name].[chunkhash].css", {allChunks: true}),
        new CleanPlugin(['static'])
    ]
};


/* Dynamically load views inside the specified folder. For example, a typical
directory structure might look like this, with root = './client/views/':

client
├── components
│   ├── hello-world.js
│   └── skeleton.css
└── views
    ├── home
    │   ├── index.js
    │   └── styles.css
    └── login
        ├── index.js
        └── styles.css

This code adds each folder inside the views directory to the entry object. For
each folder it also creates an instance of HtmlPlugin, which generates an HTML
file with imports the required dependencies (e.g. CSS, JS, etc.).
*/
var root = './client/views/';

var directories = fs.readdirSync(path.join(__dirname, root)).filter(function (file) {
    return fs.statSync(path.join(__dirname, root, file)).isDirectory();
});
directories.map(function (directory) {
    config.entry[directory] = '.' + path.sep + path.join(root, directory);
});

config.plugins = Array.prototype.concat.apply(config.plugins,
    directories.map(function (directory) {
        return new HtmlPlugin({
          chunks: ['vendor', directory],
          filename: path.join('views/', directory + '.html')
        });
    })
);
module.exports = config;
