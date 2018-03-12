const path = require('path');

module.exports = (context, request, callback) => {

  if (context.indexOf('tns-core-modules') !== -1
    || context.indexOf('nativescript-') !== -1
    || /^(tns-core-modules)/i.test(request)
    || /^(ui|application)/i.test(request)) {

    // Support plugins requiring sibling files by rewriting './' into 'context/'
    if (request.indexOf('./') === 0) {
      request = path.join(path.basename(context), request.substring(2));
    }

    return callback(null, 'commonjs ' + request);
  }

  callback();
};
