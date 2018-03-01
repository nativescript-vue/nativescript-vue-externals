module.exports = (context, request, callback) => {
  if (context.indexOf('tns-core-modules') !== -1
    || context.indexOf('nativescript-') !== -1
    || /^(tns-core-modules)/i.test(request)) {
    return callback(null, 'commonjs ' + request);
  }
  callback();
};
