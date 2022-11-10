const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


//workbox plugins for service worker and manifest file
module.exports = () => {
  return {
    mode: 'production',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template:'./index.html',
        title: 'Webpack Plugin'
      }),
      new WebpackPwaManifest({
				name: 'JATE',
				short_name: 'JATE',
				description: 'Just Another Text Editor',
				display: 'standalone',
				background_color: '#1e1e1e',
				theme_color: '#1e1e1e',
				start_url: '/',
				publicPath: '/',
				fingerprints: false,
				inject: true,
				icons: [
					{
						src: path.resolve('src/images/logo.png'),
						sizes: [96, 128, 192, 256, 384, 512],
						destination: path.join('assets', 'icons'),
					},
				],
			}),
      new InjectManifest({
				swSrc: './src-sw.js',
				swDest: 'service-worker.js',
			}),
      
    ],
//css and babel loaders
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
