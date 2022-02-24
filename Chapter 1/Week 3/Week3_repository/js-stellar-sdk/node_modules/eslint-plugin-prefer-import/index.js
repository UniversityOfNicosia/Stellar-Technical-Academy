module.exports.rules = {
  // "prefer-import-over-require": function (context) {
  //   return {
  //     CallExpression: function (node) {
  //       if(node.callee.name === 'require') {
  //         context.report(node, 'Unexpected require, use import instead.');
  //       }
  //     }
  //   }
  // }
  'prefer-import-over-require': require('./lib/prefer-import-over-require')
};
