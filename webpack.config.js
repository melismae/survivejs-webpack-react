const path = require('path');
const merge = require('webpack-merge');
const TARGET = process.env.npm_lifecycle_event;
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

//set to npm lifecycle event - allows for predictable mapping btw package.json & .babelrc
process.env.BABEL_ENV = TARGET;

const common = {
  //Entry accepts a path or an object of entries.
  entry: {
    app: PATHS.app
  },
  // add resolve extentions for Babel compiling
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        // Test expects a RegExp! DON'T BE A FOOL!
        test: /\.css$/,
        loaders: ['style', 'css'],
        // Include accepts either an path or an array of paths
        include: PATHS.app
      },
      {
        //sets up jsx, also accepts js
        test: /\.jsx?$/,
        //enable caching to improve performance
        loaders: ['babel?cacheDirectory'],
        // parse only app files. can also use an exclude here, but include is more specific
        include: PATHS.app
      }
    ]
  }
}

//Default configuration
if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    // to generate source maps
    devtool: 'eval-source-map',
    devServer: {
      contentBase: PATHS.build,
      //enable history API fallback so HTML5 History API based routing works
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      // Display only errors to reduce the amount of output.
      stats: 'errors-only',
      // Parse host and port from env so this is easy to customize
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new NpmInstallPlugin({
        save: true // --save
      })
    ]
  });
}
if (TARGET === 'build') {
  module.exports = merge(common, {});
}
