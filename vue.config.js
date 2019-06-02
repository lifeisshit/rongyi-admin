const development = process.env.NODE_ENV !== 'production'

module.exports = {
  // publicPath: development ? '' : '',
  configureWebpack: config => {
    if (development) {
      config.devtool = 'source-map'
    }
  },
  devServer: {
    proxy: {
        // proxy all requests starting with /sys to
      '/sys': {
        target: 'http://localhost:28080/sys',   //代理接口
        changeOrigin: true,
        pathRewrite: {
          '^/sys': '/'    //代理的路径
        }
      }
    }
  }
}
