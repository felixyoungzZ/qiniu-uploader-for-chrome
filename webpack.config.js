const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const dist = path.resolve(__dirname, './dist');

module.exports = {
  mode: 'production',
  entry: {
    background: path.resolve(__dirname, './src/background'),
    options: path.resolve(__dirname, './src/options'),
    popup: path.resolve(__dirname, './src/popup'),
    uploadPage: path.resolve(__dirname, './src/uploadPage'),
  },
  output: {
    filename: 'js/[name].js',
    path: dist,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('postcss-preset-env')(),
                require('autoprefixer')({
                  'browsers': ['> 1%', 'last 2 versions'],
                }),
              ]
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js' ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'background.html',
      template: './public/background.html',
      chunks: ['background'],
    }),
    new HtmlWebpackPlugin({
      filename: 'options.html',
      template: './public/options.html',
      chunks: ['options'],
    }),
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: './public/popup.html',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      filename: 'uploadPage.html',
      template: './public/uploadPage.html',
      chunks: ['uploadPage'],
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './public/manifest.json'),
        to: dist,
      },
      {
        from: path.resolve(__dirname, './src/images'),
        to: path.resolve(__dirname, './dist/images'),
      }
    ]),
  ]
}