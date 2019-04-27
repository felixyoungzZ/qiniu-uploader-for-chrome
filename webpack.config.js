const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const dist = path.resolve(__dirname, './dist');

module.exports = {
  mode: 'production',
  entry: {
    background: path.resolve(__dirname, './src/pages/Background/index'),
    options: path.resolve(__dirname, './src/pages/Options/index'),
    popup: path.resolve(__dirname, './src/pages/Popup/index'),
    uploadPage: path.resolve(__dirname, './src/pages/UploadPage/index'),
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
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: "[local]___[hash:base64:5]",
            },
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
          {
            loader: 'less-loader',
            options: {
              strictMath: true,
              noIeCompat: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js' ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'background.html',
      template: './public/Background.html',
      chunks: ['background'],
    }),
    new HtmlWebpackPlugin({
      filename: 'options.html',
      template: './public/Options.html',
      chunks: ['options'],
    }),
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: './public/Popup.html',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      filename: 'UploadPage.html',
      template: './public/UploadPage.html',
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