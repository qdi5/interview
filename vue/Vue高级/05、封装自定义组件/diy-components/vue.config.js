const path = require('path')
function resolve(dir) {
  return path.join(__dirname, 'src', dir)
}
module.exports = {
  chainWebpack: function(config) {
    config.resolve.alias.set('common', resolve('components/common'))
  },
  devServer: {
    open: true
  }


}
