const path = require('path');

const serverConfig = {
  target: 'node',
  entry: './src/LiquidCrypto-n.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'LiquidCrypto-n.js',
    library: '',
    libraryTarget: 'commonjs'
  }
};

const clientConfig = {
  entry: './src/LiquidCrypto-b.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'LiquidCrypto-b.js'
  }
};

module.exports = [ serverConfig, clientConfig ];