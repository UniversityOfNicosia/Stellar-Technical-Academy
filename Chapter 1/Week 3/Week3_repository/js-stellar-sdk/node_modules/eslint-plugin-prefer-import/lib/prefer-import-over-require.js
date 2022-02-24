/**
 * @fileoverview Rule to prefer import statements over require
 * @author Daniel Ferraz
 */

module.exports = {
  create: function (context) {
    return {
      'CallExpression:exit': function (node) {
        if(node.callee.name === 'require') {
          context.report(node, 'Unexpected require, use import instead.');
        }
      }
    }
  }
}
