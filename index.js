const path = require('path');

module.exports = (context, request, callback) => {

  if (context.indexOf('tns-core-modules') !== -1
    || context.indexOf('nativescript-') !== -1
    || /^tns-core-modules/i.test(request)
    || /^(ui|application)/i.test(request)) {

    if (request.indexOf('../') === 0 || request.indexOf('./') === 0) {
      let index = context.indexOf('node_modules') + 'node_modules'.length + 1;

      request = path.normalize(path.join(context.substring(index).replace(/\\/g, '/'), request)).replace(/\\/g, '/');
    }
    else if (/^(ui|application)/i.test(request)) {
      request = `tns-core-modules/${request}`.replace(/\\/g, '/');
    }

    return callback(null, 'commonjs ' + request);
  }

  callback();
};
