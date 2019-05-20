const development = process.env.NODE_ENV !== 'production'

module.exports = {
  baseUrl: development ? '' : '/pc',
  configureWebpack: config => {
    if (development) {
      config.devtool = 'source-map'
    }
  },
  devServer: {
    proxy: {
        // proxy all requests starting with /api to jsonplaceholder
        '/sys': {
            target: 'http://47.103.55.170/sys',   //代理接口
                changeOrigin: true,
                pathRewrite: {
                '^/sys': ''    //代理的路径
            }
        }
    }
  }
}