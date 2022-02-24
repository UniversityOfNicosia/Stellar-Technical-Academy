var rule = require('../lib/prefer-import-over-require');
var RuleTester = require('eslint').RuleTester;

var tester = new RuleTester({parserOptions: {ecmaVersion: 6}});
tester.run('lib/prefer-import-over-require', rule, {
  parserOptions: {ecmaVersion: 6},
  valid: [
    'import bar from "foo/bar"',
  ],
  invalid: [
    { code: 'var bar = require("foo/bar");', errors: ['Unexpected require, use import instead.'] }
  ]
});
