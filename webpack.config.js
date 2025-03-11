const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

console.log(path.resolve(__dirname, 'frontend/public/index.html')); // Verifica il percorso risolto

module.exports = {
  entry: './frontend/src/main.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist', 'mac', 'plates-for-us.app', 'Contents', 'Resources'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './frontend/public/index.html',
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 5173,
  },
};
