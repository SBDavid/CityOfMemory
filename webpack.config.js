var path = require('path');
var os = require('os');
var UglifyJsParallelPlugin = require('webpack-uglify-parallel');

var config = {
  entry: './src/index.js',
  devtool: process.env.NODE_ENV == 'production' ? false : "source-map",
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      pixi: path.join(__dirname, './node_modules/phaser/dist/pixi.js'),
      p2: path.join(__dirname, './node_modules/phaser/dist/p2.js')

    }
  },
  plugins: []
};

if (process.env.NODE_ENV == 'production') {
  config.plugins = config.plugins.concat([
    new UglifyJsParallelPlugin({
      workers: os.cpus().length,
      comments: false,
      compressor: {
        properties: false,
        warnings: false
      },
      output: {
        quote_keys: true
      },
      mangle: {
        screw_ie8: false //发现还是uglify-js问题，其mangle 配置属性 mangle.screw_ie8 默认为 true， 什么意思捏，意思就是把支持IE8的代码clear掉，screw you => 去你的，修改压缩配置项，重新编译，问题解决
      }
    })
  ]);
}

module.exports = config;