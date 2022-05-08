const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
          },
          {
            loader: 'svgo-loader',
            /* options: {
              configFile: './scripts/svgo.config.js'
            } */
          }
        ]
      }
    ]
  }
};
