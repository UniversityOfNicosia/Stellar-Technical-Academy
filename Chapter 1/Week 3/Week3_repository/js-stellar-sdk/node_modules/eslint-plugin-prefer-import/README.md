# eslint-plugin-prefer-import

ESLint plugin to prefer ES6 `import` statements when importing files.

# Installation

Install the npm package
```bash
# If eslint is installed globally
npm install -g eslint-plugin-prefe-import

# If eslint is installed locally
npm install -D eslint-plugin-prefe-import
```

Add the plugin to the `plugins` section and the rule to the `rules` section in your .eslintrc
```js
"plugins": [
  "prefer-import"
],
"rules": {
  "prefer-import/prefer-import-over-require": ["error"]
}
```
# Rules
 * `prefer-import-over-require`: Checks for any `require` calls and prefer the usage of `import` statements instead.
