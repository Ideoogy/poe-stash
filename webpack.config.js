var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
			{
				test: /\.css$/, use: [ 'style-loader', 'css-loader' ],
			},
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                     {
					   loader: 'file-loader',
                       options: {
                       name: '[name].[ext]',
                       outputPath: 'images/',
                       publicPath: 'images/'
                       }
					 }  
                     ]
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        }
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true
    },
	externals: {
        // global app config object
        config: JSON.stringify({
           //apiUrl: 'http://localhost:4000'
           apiUrl: '/api'
        })
	}
}
