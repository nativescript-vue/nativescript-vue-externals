const path = require('path');
const nodeModulesPath = path.resolve(__dirname, '..', '..', 'node_modules')

module.exports = (context, request, callback) => {
  if(context.startsWith(nodeModulesPath)) {
    const module = context.replace(nodeModulesPath, '').split(path.sep).find(p => !!p)
    try {
      const pkg = require(path.resolve(nodeModulesPath, module, 'package.json'))

      if(pkg.nativescript) {
        if(request.match(/^\.{0,2}(?:\/|\\\\|\\)/)) {
          request = path.relative(nodeModulesPath, path.resolve(context, request))
        }
        return callback(null, 'commonjs ' + request.replace(/\\|\\\\/g, '/'))
      }
    } catch(e) {
      // ignore
    }
  }

  callback()
}
