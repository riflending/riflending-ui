module.exports = {
  transpileDependencies: ['vuetify', 'VueGoogleCharts'],
  lintOnSave: false,
  configureWebpack: {
    output: {
      filename: '[name].[hash].bundle.js',
    },
  },
}
