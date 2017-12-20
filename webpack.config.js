const path = require("path"); //内置的node路径模块
const htmlWP = require("html-webpack-plugin"); //HTML插件

module.exports = {
    //入口, 打包文件路径
    entry: path.resolve(__dirname, "./src/main.js"),
    //输出配置
    output: {
        path: path.resolve(__dirname, "./dist"), //输出的文件夹名字
        filename: "bundle.js" //输出的文件名字
    },
    //插件配置
    plugins: [
        //html处理
        new htmlWP({
            template: path.resolve(__dirname, "./src/index.html"), //自动把JS引入到指定HTML文件中
            filename: "index.html" //打包后的HTML文件名字
        })
    ],
    //非JS模块配置
    module: {
        rules: [{
                //添加CSS的处理 
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] //css-loader打包css文件,style-loader引入css文件
            },
            //添加less模块的处理
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'] //less-loader打包less文件
            },

            //添加静态资源模块的打包处理
            {
                test: /\.(gif|png|jpg|jpeg|svg|woff|ttf|ico)$/, //配置图片,还可以配置其他文件比如MP4.MP3等等
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240, //小于10KB才打包
                        name: '[name]_[hash:8].[ext]'
                    }
                }]
            },
            //添加js模块的处理,把js转换为es5
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/ //第三方JS,不需要语法转换,所以排除
            },
            //添加Vue模块的解析打包处理
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }	
        ]
    },
     // webpack-dev-server的配置
    devServer: {
        open: true,         // 服务启动后自动打开浏览器
        port: 8888,         // 服务端口
        contentBase: 'dist' // 开启服务的目录
    }
}
