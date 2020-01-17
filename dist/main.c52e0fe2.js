// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"css/lota-baker/lota-baker.css":[function(require,module,exports) {
"use strict";

var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./webfonts/3A49B6_0_0.eot":[["3A49B6_0_0.31df32a8.eot","css/lota-baker/webfonts/3A49B6_0_0.eot"],"css/lota-baker/webfonts/3A49B6_0_0.eot"],"./webfonts/3A49B6_0_0.woff2":[["3A49B6_0_0.f8e898a5.woff2","css/lota-baker/webfonts/3A49B6_0_0.woff2"],"css/lota-baker/webfonts/3A49B6_0_0.woff2"],"./webfonts/3A49B6_0_0.woff":[["3A49B6_0_0.3785484d.woff","css/lota-baker/webfonts/3A49B6_0_0.woff"],"css/lota-baker/webfonts/3A49B6_0_0.woff"],"./webfonts/3A49B6_0_0.ttf":[["3A49B6_0_0.976b60a6.ttf","css/lota-baker/webfonts/3A49B6_0_0.ttf"],"css/lota-baker/webfonts/3A49B6_0_0.ttf"],"./webfonts/3A49B6_1_0.eot":[["3A49B6_1_0.1ca016c4.eot","css/lota-baker/webfonts/3A49B6_1_0.eot"],"css/lota-baker/webfonts/3A49B6_1_0.eot"],"./webfonts/3A49B6_1_0.woff2":[["3A49B6_1_0.ecd123e7.woff2","css/lota-baker/webfonts/3A49B6_1_0.woff2"],"css/lota-baker/webfonts/3A49B6_1_0.woff2"],"./webfonts/3A49B6_1_0.woff":[["3A49B6_1_0.8c4111f7.woff","css/lota-baker/webfonts/3A49B6_1_0.woff"],"css/lota-baker/webfonts/3A49B6_1_0.woff"],"./webfonts/3A49B6_1_0.ttf":[["3A49B6_1_0.e4a4aaf9.ttf","css/lota-baker/webfonts/3A49B6_1_0.ttf"],"css/lota-baker/webfonts/3A49B6_1_0.ttf"],"./webfonts/3A49B6_2_0.eot":[["3A49B6_2_0.bf383ecb.eot","css/lota-baker/webfonts/3A49B6_2_0.eot"],"css/lota-baker/webfonts/3A49B6_2_0.eot"],"./webfonts/3A49B6_2_0.woff2":[["3A49B6_2_0.e38fa474.woff2","css/lota-baker/webfonts/3A49B6_2_0.woff2"],"css/lota-baker/webfonts/3A49B6_2_0.woff2"],"./webfonts/3A49B6_2_0.woff":[["3A49B6_2_0.65fc7425.woff","css/lota-baker/webfonts/3A49B6_2_0.woff"],"css/lota-baker/webfonts/3A49B6_2_0.woff"],"./webfonts/3A49B6_2_0.ttf":[["3A49B6_2_0.eda13096.ttf","css/lota-baker/webfonts/3A49B6_2_0.ttf"],"css/lota-baker/webfonts/3A49B6_2_0.ttf"],"./webfonts/3A49B6_3_0.eot":[["3A49B6_3_0.f58608a0.eot","css/lota-baker/webfonts/3A49B6_3_0.eot"],"css/lota-baker/webfonts/3A49B6_3_0.eot"],"./webfonts/3A49B6_3_0.woff2":[["3A49B6_3_0.a77a16cd.woff2","css/lota-baker/webfonts/3A49B6_3_0.woff2"],"css/lota-baker/webfonts/3A49B6_3_0.woff2"],"./webfonts/3A49B6_3_0.woff":[["3A49B6_3_0.856775a8.woff","css/lota-baker/webfonts/3A49B6_3_0.woff"],"css/lota-baker/webfonts/3A49B6_3_0.woff"],"./webfonts/3A49B6_3_0.ttf":[["3A49B6_3_0.7d25fcab.ttf","css/lota-baker/webfonts/3A49B6_3_0.ttf"],"css/lota-baker/webfonts/3A49B6_3_0.ttf"],"./webfonts/3A49B6_4_0.eot":[["3A49B6_4_0.73458036.eot","css/lota-baker/webfonts/3A49B6_4_0.eot"],"css/lota-baker/webfonts/3A49B6_4_0.eot"],"./webfonts/3A49B6_4_0.woff2":[["3A49B6_4_0.c81b79f4.woff2","css/lota-baker/webfonts/3A49B6_4_0.woff2"],"css/lota-baker/webfonts/3A49B6_4_0.woff2"],"./webfonts/3A49B6_4_0.woff":[["3A49B6_4_0.ee23b8be.woff","css/lota-baker/webfonts/3A49B6_4_0.woff"],"css/lota-baker/webfonts/3A49B6_4_0.woff"],"./webfonts/3A49B6_4_0.ttf":[["3A49B6_4_0.79fcd6bb.ttf","css/lota-baker/webfonts/3A49B6_4_0.ttf"],"css/lota-baker/webfonts/3A49B6_4_0.ttf"],"./webfonts/3A49B6_5_0.eot":[["3A49B6_5_0.d24c45bb.eot","css/lota-baker/webfonts/3A49B6_5_0.eot"],"css/lota-baker/webfonts/3A49B6_5_0.eot"],"./webfonts/3A49B6_5_0.woff2":[["3A49B6_5_0.11bd85f1.woff2","css/lota-baker/webfonts/3A49B6_5_0.woff2"],"css/lota-baker/webfonts/3A49B6_5_0.woff2"],"./webfonts/3A49B6_5_0.woff":[["3A49B6_5_0.898112a1.woff","css/lota-baker/webfonts/3A49B6_5_0.woff"],"css/lota-baker/webfonts/3A49B6_5_0.woff"],"./webfonts/3A49B6_5_0.ttf":[["3A49B6_5_0.c121623a.ttf","css/lota-baker/webfonts/3A49B6_5_0.ttf"],"css/lota-baker/webfonts/3A49B6_5_0.ttf"],"./webfonts/3A49B6_6_0.eot":[["3A49B6_6_0.170a269f.eot","css/lota-baker/webfonts/3A49B6_6_0.eot"],"css/lota-baker/webfonts/3A49B6_6_0.eot"],"./webfonts/3A49B6_6_0.woff2":[["3A49B6_6_0.8d1b2ba7.woff2","css/lota-baker/webfonts/3A49B6_6_0.woff2"],"css/lota-baker/webfonts/3A49B6_6_0.woff2"],"./webfonts/3A49B6_6_0.woff":[["3A49B6_6_0.fecc031c.woff","css/lota-baker/webfonts/3A49B6_6_0.woff"],"css/lota-baker/webfonts/3A49B6_6_0.woff"],"./webfonts/3A49B6_6_0.ttf":[["3A49B6_6_0.f5d25898.ttf","css/lota-baker/webfonts/3A49B6_6_0.ttf"],"css/lota-baker/webfonts/3A49B6_6_0.ttf"],"./webfonts/3A49B6_7_0.eot":[["3A49B6_7_0.b0a51ef3.eot","css/lota-baker/webfonts/3A49B6_7_0.eot"],"css/lota-baker/webfonts/3A49B6_7_0.eot"],"./webfonts/3A49B6_7_0.woff2":[["3A49B6_7_0.7ee0c8fd.woff2","css/lota-baker/webfonts/3A49B6_7_0.woff2"],"css/lota-baker/webfonts/3A49B6_7_0.woff2"],"./webfonts/3A49B6_7_0.woff":[["3A49B6_7_0.cd030c5d.woff","css/lota-baker/webfonts/3A49B6_7_0.woff"],"css/lota-baker/webfonts/3A49B6_7_0.woff"],"./webfonts/3A49B6_7_0.ttf":[["3A49B6_7_0.49e165d2.ttf","css/lota-baker/webfonts/3A49B6_7_0.ttf"],"css/lota-baker/webfonts/3A49B6_7_0.ttf"],"./webfonts/3A49B6_8_0.eot":[["3A49B6_8_0.45692d5e.eot","css/lota-baker/webfonts/3A49B6_8_0.eot"],"css/lota-baker/webfonts/3A49B6_8_0.eot"],"./webfonts/3A49B6_8_0.woff2":[["3A49B6_8_0.06be2089.woff2","css/lota-baker/webfonts/3A49B6_8_0.woff2"],"css/lota-baker/webfonts/3A49B6_8_0.woff2"],"./webfonts/3A49B6_8_0.woff":[["3A49B6_8_0.d2f4c831.woff","css/lota-baker/webfonts/3A49B6_8_0.woff"],"css/lota-baker/webfonts/3A49B6_8_0.woff"],"./webfonts/3A49B6_8_0.ttf":[["3A49B6_8_0.f92395f9.ttf","css/lota-baker/webfonts/3A49B6_8_0.ttf"],"css/lota-baker/webfonts/3A49B6_8_0.ttf"],"./webfonts/3A49B6_9_0.eot":[["3A49B6_9_0.01c8053f.eot","css/lota-baker/webfonts/3A49B6_9_0.eot"],"css/lota-baker/webfonts/3A49B6_9_0.eot"],"./webfonts/3A49B6_9_0.woff2":[["3A49B6_9_0.e0436e2f.woff2","css/lota-baker/webfonts/3A49B6_9_0.woff2"],"css/lota-baker/webfonts/3A49B6_9_0.woff2"],"./webfonts/3A49B6_9_0.woff":[["3A49B6_9_0.ce881043.woff","css/lota-baker/webfonts/3A49B6_9_0.woff"],"css/lota-baker/webfonts/3A49B6_9_0.woff"],"./webfonts/3A49B6_9_0.ttf":[["3A49B6_9_0.2e2f4e12.ttf","css/lota-baker/webfonts/3A49B6_9_0.ttf"],"css/lota-baker/webfonts/3A49B6_9_0.ttf"],"./webfonts/3A49B6_A_0.eot":[["3A49B6_A_0.d34c2e2a.eot","css/lota-baker/webfonts/3A49B6_A_0.eot"],"css/lota-baker/webfonts/3A49B6_A_0.eot"],"./webfonts/3A49B6_A_0.woff2":[["3A49B6_A_0.df01f76c.woff2","css/lota-baker/webfonts/3A49B6_A_0.woff2"],"css/lota-baker/webfonts/3A49B6_A_0.woff2"],"./webfonts/3A49B6_A_0.woff":[["3A49B6_A_0.e84e38b6.woff","css/lota-baker/webfonts/3A49B6_A_0.woff"],"css/lota-baker/webfonts/3A49B6_A_0.woff"],"./webfonts/3A49B6_A_0.ttf":[["3A49B6_A_0.6fd848a1.ttf","css/lota-baker/webfonts/3A49B6_A_0.ttf"],"css/lota-baker/webfonts/3A49B6_A_0.ttf"],"./webfonts/3A49B6_B_0.eot":[["3A49B6_B_0.8ac95883.eot","css/lota-baker/webfonts/3A49B6_B_0.eot"],"css/lota-baker/webfonts/3A49B6_B_0.eot"],"./webfonts/3A49B6_B_0.woff2":[["3A49B6_B_0.89b1b719.woff2","css/lota-baker/webfonts/3A49B6_B_0.woff2"],"css/lota-baker/webfonts/3A49B6_B_0.woff2"],"./webfonts/3A49B6_B_0.woff":[["3A49B6_B_0.0c2224af.woff","css/lota-baker/webfonts/3A49B6_B_0.woff"],"css/lota-baker/webfonts/3A49B6_B_0.woff"],"./webfonts/3A49B6_B_0.ttf":[["3A49B6_B_0.d1db6639.ttf","css/lota-baker/webfonts/3A49B6_B_0.ttf"],"css/lota-baker/webfonts/3A49B6_B_0.ttf"],"./webfonts/3A49B6_C_0.eot":[["3A49B6_C_0.c2a4b2f5.eot","css/lota-baker/webfonts/3A49B6_C_0.eot"],"css/lota-baker/webfonts/3A49B6_C_0.eot"],"./webfonts/3A49B6_C_0.woff2":[["3A49B6_C_0.2e308e49.woff2","css/lota-baker/webfonts/3A49B6_C_0.woff2"],"css/lota-baker/webfonts/3A49B6_C_0.woff2"],"./webfonts/3A49B6_C_0.woff":[["3A49B6_C_0.c4d28e60.woff","css/lota-baker/webfonts/3A49B6_C_0.woff"],"css/lota-baker/webfonts/3A49B6_C_0.woff"],"./webfonts/3A49B6_C_0.ttf":[["3A49B6_C_0.0d8d3b42.ttf","css/lota-baker/webfonts/3A49B6_C_0.ttf"],"css/lota-baker/webfonts/3A49B6_C_0.ttf"],"./webfonts/3A49B6_D_0.eot":[["3A49B6_D_0.81f91ff4.eot","css/lota-baker/webfonts/3A49B6_D_0.eot"],"css/lota-baker/webfonts/3A49B6_D_0.eot"],"./webfonts/3A49B6_D_0.woff2":[["3A49B6_D_0.c81436fb.woff2","css/lota-baker/webfonts/3A49B6_D_0.woff2"],"css/lota-baker/webfonts/3A49B6_D_0.woff2"],"./webfonts/3A49B6_D_0.woff":[["3A49B6_D_0.d6ef47a2.woff","css/lota-baker/webfonts/3A49B6_D_0.woff"],"css/lota-baker/webfonts/3A49B6_D_0.woff"],"./webfonts/3A49B6_D_0.ttf":[["3A49B6_D_0.1f1cf002.ttf","css/lota-baker/webfonts/3A49B6_D_0.ttf"],"css/lota-baker/webfonts/3A49B6_D_0.ttf"],"./webfonts/3A49B6_E_0.eot":[["3A49B6_E_0.b30dc6b2.eot","css/lota-baker/webfonts/3A49B6_E_0.eot"],"css/lota-baker/webfonts/3A49B6_E_0.eot"],"./webfonts/3A49B6_E_0.woff2":[["3A49B6_E_0.36427996.woff2","css/lota-baker/webfonts/3A49B6_E_0.woff2"],"css/lota-baker/webfonts/3A49B6_E_0.woff2"],"./webfonts/3A49B6_E_0.woff":[["3A49B6_E_0.40c13aea.woff","css/lota-baker/webfonts/3A49B6_E_0.woff"],"css/lota-baker/webfonts/3A49B6_E_0.woff"],"./webfonts/3A49B6_E_0.ttf":[["3A49B6_E_0.05cf90f6.ttf","css/lota-baker/webfonts/3A49B6_E_0.ttf"],"css/lota-baker/webfonts/3A49B6_E_0.ttf"],"./webfonts/3A49B6_F_0.eot":[["3A49B6_F_0.78a4a610.eot","css/lota-baker/webfonts/3A49B6_F_0.eot"],"css/lota-baker/webfonts/3A49B6_F_0.eot"],"./webfonts/3A49B6_F_0.woff2":[["3A49B6_F_0.c634c1b3.woff2","css/lota-baker/webfonts/3A49B6_F_0.woff2"],"css/lota-baker/webfonts/3A49B6_F_0.woff2"],"./webfonts/3A49B6_F_0.woff":[["3A49B6_F_0.21f44baa.woff","css/lota-baker/webfonts/3A49B6_F_0.woff"],"css/lota-baker/webfonts/3A49B6_F_0.woff"],"./webfonts/3A49B6_F_0.ttf":[["3A49B6_F_0.886f82a5.ttf","css/lota-baker/webfonts/3A49B6_F_0.ttf"],"css/lota-baker/webfonts/3A49B6_F_0.ttf"],"./webfonts/3A49B6_10_0.eot":[["3A49B6_10_0.9e5dfe3e.eot","css/lota-baker/webfonts/3A49B6_10_0.eot"],"css/lota-baker/webfonts/3A49B6_10_0.eot"],"./webfonts/3A49B6_10_0.woff2":[["3A49B6_10_0.8d1f6c17.woff2","css/lota-baker/webfonts/3A49B6_10_0.woff2"],"css/lota-baker/webfonts/3A49B6_10_0.woff2"],"./webfonts/3A49B6_10_0.woff":[["3A49B6_10_0.f87d1cde.woff","css/lota-baker/webfonts/3A49B6_10_0.woff"],"css/lota-baker/webfonts/3A49B6_10_0.woff"],"./webfonts/3A49B6_10_0.ttf":[["3A49B6_10_0.adee3a76.ttf","css/lota-baker/webfonts/3A49B6_10_0.ttf"],"css/lota-baker/webfonts/3A49B6_10_0.ttf"],"./webfonts/3A49B6_11_0.eot":[["3A49B6_11_0.448871a8.eot","css/lota-baker/webfonts/3A49B6_11_0.eot"],"css/lota-baker/webfonts/3A49B6_11_0.eot"],"./webfonts/3A49B6_11_0.woff2":[["3A49B6_11_0.aecf1d25.woff2","css/lota-baker/webfonts/3A49B6_11_0.woff2"],"css/lota-baker/webfonts/3A49B6_11_0.woff2"],"./webfonts/3A49B6_11_0.woff":[["3A49B6_11_0.b36ff4cc.woff","css/lota-baker/webfonts/3A49B6_11_0.woff"],"css/lota-baker/webfonts/3A49B6_11_0.woff"],"./webfonts/3A49B6_11_0.ttf":[["3A49B6_11_0.a070cd2b.ttf","css/lota-baker/webfonts/3A49B6_11_0.ttf"],"css/lota-baker/webfonts/3A49B6_11_0.ttf"],"./webfonts/3A49B6_12_0.eot":[["3A49B6_12_0.a95d0910.eot","css/lota-baker/webfonts/3A49B6_12_0.eot"],"css/lota-baker/webfonts/3A49B6_12_0.eot"],"./webfonts/3A49B6_12_0.woff2":[["3A49B6_12_0.6b573406.woff2","css/lota-baker/webfonts/3A49B6_12_0.woff2"],"css/lota-baker/webfonts/3A49B6_12_0.woff2"],"./webfonts/3A49B6_12_0.woff":[["3A49B6_12_0.d7d44c52.woff","css/lota-baker/webfonts/3A49B6_12_0.woff"],"css/lota-baker/webfonts/3A49B6_12_0.woff"],"./webfonts/3A49B6_12_0.ttf":[["3A49B6_12_0.7e6d25bf.ttf","css/lota-baker/webfonts/3A49B6_12_0.ttf"],"css/lota-baker/webfonts/3A49B6_12_0.ttf"],"./webfonts/3A49B6_13_0.eot":[["3A49B6_13_0.71fa1746.eot","css/lota-baker/webfonts/3A49B6_13_0.eot"],"css/lota-baker/webfonts/3A49B6_13_0.eot"],"./webfonts/3A49B6_13_0.woff2":[["3A49B6_13_0.75aae349.woff2","css/lota-baker/webfonts/3A49B6_13_0.woff2"],"css/lota-baker/webfonts/3A49B6_13_0.woff2"],"./webfonts/3A49B6_13_0.woff":[["3A49B6_13_0.2934a5d7.woff","css/lota-baker/webfonts/3A49B6_13_0.woff"],"css/lota-baker/webfonts/3A49B6_13_0.woff"],"./webfonts/3A49B6_13_0.ttf":[["3A49B6_13_0.6b5ef42d.ttf","css/lota-baker/webfonts/3A49B6_13_0.ttf"],"css/lota-baker/webfonts/3A49B6_13_0.ttf"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"css/main.css":[function(require,module,exports) {
"use strict";

var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./lota-baker/lota-baker.css":"css/lota-baker/lota-baker.css","_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58381" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js"], null)
//# sourceMappingURL=/main.c52e0fe2.js.map