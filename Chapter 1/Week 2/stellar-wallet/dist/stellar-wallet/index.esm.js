import { g as global$1 } from './global-e1c7e609.js';

const __dirname = '/home/stellaracademy/Stellaracademy/stellar-wallet/node_modules/module-alias';

// shim for using process in browser
// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
if (typeof global$1.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
}
if (typeof global$1.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
function nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
}
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
var title = 'browser';
var platform = 'browser';
var browser = true;
var env = {};
var argv = [];
var version = ''; // empty string to avoid regexp issues
var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;

function binding(name) {
    throw new Error('process.binding is not supported');
}

function cwd () { return '/' }
function chdir (dir) {
    throw new Error('process.chdir is not supported');
}function umask() { return 0; }

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = global$1.performance || {};
var performanceNow =
  performance.now        ||
  performance.mozNow     ||
  performance.msNow      ||
  performance.oNow       ||
  performance.webkitNow  ||
  function(){ return (new Date()).getTime() };

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp){
  var clocktime = performanceNow.call(performance)*1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor((clocktime%1)*1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds<0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds,nanoseconds]
}

var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}

var browser$1 = {
  nextTick: nextTick,
  title: title,
  browser: browser,
  env: env,
  argv: argv,
  version: version,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

'use strict';

var BuiltinModule = require('module');

// Guard against poorly mocked module constructors
var Module = module.constructor.length > 1
  ? module.constructor
  : BuiltinModule;

var nodePath = require('path');

var modulePaths = [];
var moduleAliases = {};
var moduleAliasNames = [];

var oldNodeModulePaths = Module._nodeModulePaths;
Module._nodeModulePaths = function (from) {
  var paths = oldNodeModulePaths.call(this, from);

  // Only include the module path for top-level modules
  // that were not installed:
  if (from.indexOf('node_modules') === -1) {
    paths = modulePaths.concat(paths);
  }

  return paths
};

var oldResolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parentModule, isMain, options) {
  for (var i = moduleAliasNames.length; i-- > 0;) {
    var alias = moduleAliasNames[i];
    if (isPathMatchesAlias(request, alias)) {
      var aliasTarget = moduleAliases[alias];
      // Custom function handler
      if (typeof moduleAliases[alias] === 'function') {
        var fromPath = parentModule.filename;
        aliasTarget = moduleAliases[alias](fromPath, request, alias);
        if (!aliasTarget || typeof aliasTarget !== 'string') {
          throw new Error('[module-alias] Expecting custom handler function to return path.')
        }
      }
      request = nodePath.join(aliasTarget, request.substr(alias.length));
      // Only use the first match
      break
    }
  }

  return oldResolveFilename.call(this, request, parentModule, isMain, options)
};

function isPathMatchesAlias (path, alias) {
  // Matching /^alias(\/|$)/
  if (path.indexOf(alias) === 0) {
    if (path.length === alias.length) return true
    if (path[alias.length] === '/') return true
  }

  return false
}

function addPathHelper (path, targetArray) {
  path = nodePath.normalize(path);
  if (targetArray && targetArray.indexOf(path) === -1) {
    targetArray.unshift(path);
  }
}

function removePathHelper (path, targetArray) {
  if (targetArray) {
    var index = targetArray.indexOf(path);
    if (index !== -1) {
      targetArray.splice(index, 1);
    }
  }
}

function addPath (path) {
  var parent;
  path = nodePath.normalize(path);

  if (modulePaths.indexOf(path) === -1) {
    modulePaths.push(path);
    // Enable the search path for the current top-level module
    var mainModule = getMainModule();
    if (mainModule) {
      addPathHelper(path, mainModule.paths);
    }
    parent = module.parent;

    // Also modify the paths of the module that was used to load the
    // app-module-paths module and all of it's parents
    while (parent && parent !== mainModule) {
      addPathHelper(path, parent.paths);
      parent = parent.parent;
    }
  }
}

function addAliases (aliases) {
  for (var alias in aliases) {
    addAlias(alias, aliases[alias]);
  }
}

function addAlias (alias, target) {
  moduleAliases[alias] = target;
  // Cost of sorting is lower here than during resolution
  moduleAliasNames = Object.keys(moduleAliases);
  moduleAliasNames.sort();
}

/**
 * Reset any changes maded (resets all registered aliases
 * and custom module directories)
 * The function is undocumented and for testing purposes only
 */
function reset () {
  var mainModule = getMainModule();

  // Reset all changes in paths caused by addPath function
  modulePaths.forEach(function (path) {
    if (mainModule) {
      removePathHelper(path, mainModule.paths);
    }

    // Delete from require.cache if the module has been required before.
    // This is required for node >= 11
    Object.getOwnPropertyNames(require.cache).forEach(function (name) {
      if (name.indexOf(path) !== -1) {
        delete require.cache[name];
      }
    });

    var parent = module.parent;
    while (parent && parent !== mainModule) {
      removePathHelper(path, parent.paths);
      parent = parent.parent;
    }
  });

  modulePaths = [];
  moduleAliases = {};
  moduleAliasNames = [];
}

/**
 * Import aliases from package.json
 * @param {object} options
 */
function init (options) {
  if (typeof options === 'string') {
    options = { base: options };
  }

  options = options || {};

  var candidatePackagePaths;
  if (options.base) {
    candidatePackagePaths = [nodePath.resolve(options.base.replace(/\/package\.json$/, ''))];
  } else {
    // There is probably 99% chance that the project root directory in located
    // above the node_modules directory,
    // Or that package.json is in the node process' current working directory (when
    // running a package manager script, e.g. `yarn start` / `npm run start`)
    candidatePackagePaths = [nodePath.join(__dirname, '../..'), browser$1.cwd()];
  }

  var npmPackage;
  var base;
  for (var i in candidatePackagePaths) {
    try {
      base = candidatePackagePaths[i];

      npmPackage = require(nodePath.join(base, 'package.json'));
      break
    } catch (e) {
      // noop
    }
  }

  if (typeof npmPackage !== 'object') {
    var pathString = candidatePackagePaths.join(',\n');
    throw new Error('Unable to find package.json in any of:\n[' + pathString + ']')
  }

  //
  // Import aliases
  //

  var aliases = npmPackage._moduleAliases || {};

  for (var alias in aliases) {
    if (aliases[alias][0] !== '/') {
      aliases[alias] = nodePath.join(base, aliases[alias]);
    }
  }

  addAliases(aliases);

  //
  // Register custom module directories (like node_modules)
  //

  if (npmPackage._moduleDirectories instanceof Array) {
    npmPackage._moduleDirectories.forEach(function (dir) {
      if (dir === 'node_modules') return

      var modulePath = nodePath.join(base, dir);
      addPath(modulePath);
    });
  }
}

function getMainModule () {
  return require.main._simulateRepl ? undefined : require.main
}

module.exports = init;
module.exports.addPath = addPath;
module.exports.addAlias = addAlias;
module.exports.addAliases = addAliases;
module.exports.isPathMatchesAlias = isPathMatchesAlias;
module.exports.reset = reset;

const moduleAlias = /*#__PURE__*/Object.freeze({
  __proto__: null
});

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function getDefaultExportFromNamespaceIfPresent (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') ? n['default'] : n;
}

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

function getAugmentedNamespace(n) {
	if (n.__esModule) return n;
	var a = Object.defineProperty({}, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

const require$$0 = /*@__PURE__*/getAugmentedNamespace(moduleAlias);

require$$0();

var register = {

};
