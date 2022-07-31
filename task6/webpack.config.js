const path = require("path"); //Node.js内置模块
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/js/index.ts', //配置入口文件
    output: {
        path: path.resolve(__dirname, './dist'), //输出路径，__dirname：当前文件所在路径
        filename: 'bundle.js',//输出文件
        library: 'MyLibrary',
        libraryTarget: "umd",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
                exclude: /node_modules/

            },
            {
                test: /\.jpe?g|png|gif|svg/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024 // 4kb
                    },

                },
                generator: {
                    filename: "static/images/[name].[hash].[ext]",
                }
            },
            {
                test: /\.html$/,
                loader: "html-loader"


            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/

            },
            {
                test: /\.js$/,

                exclude: /node_modules/,
                loader: "babel-loader"
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin(
        {
            template: path.resolve(__dirname, "index.html"),
            inject: 'head',
            scriptLoading: 'blocking'
        }
    )],

    target: "web",

    mode: "development",


}
