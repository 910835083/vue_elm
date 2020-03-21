module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            // proxy all requests starting with /api to jsonplaceholder
            '/api': {
                target: 'http://localhost:4000', //代理接口
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' //代理的路径
                }
            }
        }
    }
}