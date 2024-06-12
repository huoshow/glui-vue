module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("element-ui");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/utils/util");

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export listenScrollMixinCreateor */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return listenScrollMixin; });
/* unused harmony export listenScrollPickerMixin */
/* unused harmony export listenScrollDropDownMixin */
function listenScrollMixinCreateor() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var visibleKey = options.visibleKey || 'visible';
  return {
    props: {
      hideDropdownWhenScroll: {
        type: Boolean,
        default: function _default() {
          return this.$ELEMENT && this.$ELEMENT.config && this.$ELEMENT.config.hideDropdownWhenScroll || false;
        }
      }
    },
    data: function data() {
      return {
        _removeDocumentScrollListener: null
      };
    },
    mounted: function mounted() {
      var _this = this;

      if (!this.hideDropdownWhenScroll) {
        return;
      }
      var handle = function handle(event) {
        if (!_this[visibleKey]) {
          return;
        }
        if (event.target && event.target.contains(_this.$el)) {
          _this[visibleKey] = false;
        }
      };
      document.addEventListener('scroll', handle, true);
      this._removeDocumentScrollListener = function () {
        document.removeEventListener('scroll', handle, true);
      };
    },
    beforeDestroy: function beforeDestroy() {
      this._removeDocumentScrollListener && this._removeDocumentScrollListener();
    }
  };
}

var listenScrollMixin = listenScrollMixinCreateor({ visibleKey: 'visible' });

var listenScrollPickerMixin = listenScrollMixinCreateor({ visibleKey: 'pickerVisible' });

var listenScrollDropDownMixin = listenScrollMixinCreateor({ visibleKey: 'dropDownVisible' });

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return focusOnClearMixin; });
var focusOnClearMixin = {
  props: {
    focusOnClear: {
      type: Boolean,
      default: function _default() {
        return this.$ELEMENT && this.$ELEMENT.config && this.$ELEMENT.config.focusOnClear || false;
      }
    }
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(20);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(26).default
var update = add("5fd16f9f", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/typeof");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/utils/types");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_associate_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_associate_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_associate_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// Module
exports.push([module.i, ".gl-associate-dropdown__wrap .gl-associate-td{display:table-cell;padding:0 3px;border-right:1px solid #ddd;border-top:1px solid #ddd;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.gl-associate-dropdown__wrap .gl-associate-td.gl-associate-td-checkbox{text-align:center;width:24px}.gl-associate-dropdown__wrap .gl-associate-td:last-child{border-right:0}.gl-associate-dropdown__wrap .gl-associate-th{display:table-cell;padding:0 3px;border-right:1px solid #ddd;border-top:1px solid #ddd;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.gl-associate-dropdown__wrap .gl-associate-th.gl-associate-th-checkbox{text-align:center;width:24px}.gl-associate-dropdown__wrap .gl-associate-th:last-child{border-right:0}.gl-associate-dropdown__wrap .el-select-dropdown__item{font-size:12px;height:24px;line-height:24px;display:table-row}.gl-associate-dropdown__wrap .gl-associate-table{display:table;border-bottom:1px solid #ddd;min-width:100%}.gl-associate-dropdown__wrap .gl-associate-thead{display:table-header-group}.gl-associate-dropdown__wrap .gl-associate-thead .el-select-dropdown__item{background:#eee;cursor:default}.gl-associate-dropdown__wrap .gl-associate-thead .el-select-dropdown__item:hover{background:#eee}.gl-associate-dropdown__wrap .gl-associate-thead .el-select-dropdown__item .gl-associate-td,.gl-associate-dropdown__wrap .gl-associate-thead .el-select-dropdown__item .gl-associate-th{font-weight:bold}.gl-associate-dropdown__wrap .gl-associate-tbody{display:table-row-group}.gl-associate-dropdown__wrap .gl-associate-page{display:flex;align-items:center;justify-content:space-between;padding:0 12px;font-size:12px}.gl-associate-dropdown__wrap .gl-associate-page .gl-associate-buttons{margin-left:10px}.gl-associate-dropdown__wrap .gl-associate-loading{margin-left:5px}.gl-associate-dropdown__wrap .gl-associate-empty{padding:10px;text-align:center;font-size:12px;color:#ccc;font-style:italic}.gl-associate-dropdown__wrap .el-button--mini{padding-top:5px;padding-bottom:5px}.gl-associate-dropdown__wrap.el-select-dropdown__wrap{max-height:80vh}.el-select-dropdown.is-multiple .gl-associate-dropdown__wrap .el-select-dropdown__item.selected::after{display:none}\n", ""]);



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/associate/src/associate.vue?vue&type=template&id=4a3b2024&
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "clickoutside",
          rawName: "v-clickoutside",
          value: _vm.handleClose,
          expression: "handleClose",
        },
      ],
      staticClass: "el-select gl-associate",
      class: [_vm.selectSize ? "el-select--" + _vm.selectSize : ""],
      on: {
        click: function ($event) {
          $event.stopPropagation()
          return _vm.toggleDropMenu($event)
        },
      },
    },
    [
      _vm.multiple
        ? _c(
            "div",
            {
              ref: "tags",
              staticClass: "el-select__tags",
              style: { "max-width": _vm.inputWidth - 32 + "px", width: "100%" },
            },
            [
              _vm.collapseTags && _vm.selected.length
                ? _c(
                    "span",
                    [
                      _c(
                        "el-tag",
                        {
                          attrs: {
                            closable: !_vm.selectDisabled,
                            size: _vm.collapseTagSize,
                            hit: _vm.selected[0].hitState,
                            type: "info",
                            "disable-transitions": "",
                          },
                          on: {
                            close: function ($event) {
                              return _vm.deleteTag($event, _vm.selected[0])
                            },
                          },
                        },
                        [
                          _c("span", { staticClass: "el-select__tags-text" }, [
                            _vm._v(_vm._s(_vm.selected[0].currentLabel)),
                          ]),
                        ]
                      ),
                      _vm.selected.length > 1
                        ? _c(
                            "el-tag",
                            {
                              attrs: {
                                closable: false,
                                size: _vm.collapseTagSize,
                                type: "info",
                                "disable-transitions": "",
                              },
                            },
                            [
                              _c(
                                "span",
                                { staticClass: "el-select__tags-text" },
                                [_vm._v("+ " + _vm._s(_vm.selected.length - 1))]
                              ),
                            ]
                          )
                        : _vm._e(),
                    ],
                    1
                  )
                : _vm._e(),
              !_vm.collapseTags
                ? _c(
                    "transition-group",
                    { on: { "after-leave": _vm.resetInputHeight } },
                    _vm._l(_vm.selected, function (item) {
                      return _c(
                        "el-tag",
                        {
                          key: _vm.getValueKey(item),
                          attrs: {
                            closable: !_vm.selectDisabled,
                            size: _vm.collapseTagSize,
                            hit: item.hitState,
                            type: "info",
                            "disable-transitions": "",
                          },
                          on: {
                            close: function ($event) {
                              return _vm.deleteTag($event, item)
                            },
                          },
                        },
                        [
                          _c("span", { staticClass: "el-select__tags-text" }, [
                            _vm._v(_vm._s(item.currentLabel)),
                          ]),
                        ]
                      )
                    }),
                    1
                  )
                : _vm._e(),
              _vm.filterable
                ? _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.query,
                        expression: "query",
                      },
                    ],
                    ref: "input",
                    staticClass: "el-select__input",
                    class: [_vm.selectSize ? "is-" + _vm.selectSize : ""],
                    style: {
                      "flex-grow": "1",
                      width: _vm.inputLength / (_vm.inputWidth - 32) + "%",
                      "max-width": _vm.inputWidth - 42 + "px",
                    },
                    attrs: {
                      type: "text",
                      disabled: _vm.selectDisabled,
                      autocomplete: _vm.autoComplete || _vm.autocomplete,
                    },
                    domProps: { value: _vm.query },
                    on: {
                      focus: _vm.handleFocus,
                      blur: function ($event) {
                        _vm.softFocus = false
                      },
                      keyup: _vm.managePlaceholder,
                      keydown: [
                        function ($event) {
                          if (
                            $event.ctrlKey ||
                            $event.shiftKey ||
                            $event.altKey ||
                            $event.metaKey
                          ) {
                            return null
                          }
                          return _vm.resetInputState($event)
                        },
                        function ($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k($event.keyCode, "down", 40, $event.key, [
                              "Down",
                              "ArrowDown",
                            ])
                          ) {
                            return null
                          }
                          if (
                            $event.ctrlKey ||
                            $event.shiftKey ||
                            $event.altKey ||
                            $event.metaKey
                          ) {
                            return null
                          }
                          $event.preventDefault()
                          return _vm.navigateOptions("next")
                        },
                        function ($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k($event.keyCode, "up", 38, $event.key, [
                              "Up",
                              "ArrowUp",
                            ])
                          ) {
                            return null
                          }
                          if (
                            $event.ctrlKey ||
                            $event.shiftKey ||
                            $event.altKey ||
                            $event.metaKey
                          ) {
                            return null
                          }
                          $event.preventDefault()
                          return _vm.navigateOptions("prev")
                        },
                        function ($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k(
                              $event.keyCode,
                              "enter",
                              13,
                              $event.key,
                              "Enter"
                            )
                          ) {
                            return null
                          }
                          if (
                            $event.ctrlKey ||
                            $event.shiftKey ||
                            $event.altKey ||
                            $event.metaKey
                          ) {
                            return null
                          }
                          $event.preventDefault()
                          return _vm.selectOption($event)
                        },
                        function ($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k($event.keyCode, "esc", 27, $event.key, [
                              "Esc",
                              "Escape",
                            ])
                          ) {
                            return null
                          }
                          if (
                            $event.ctrlKey ||
                            $event.shiftKey ||
                            $event.altKey ||
                            $event.metaKey
                          ) {
                            return null
                          }
                          $event.stopPropagation()
                          $event.preventDefault()
                          _vm.visible = false
                          _vm.esc = true
                        },
                        function ($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k(
                              $event.keyCode,
                              "delete",
                              [8, 46],
                              $event.key,
                              ["Backspace", "Delete", "Del"]
                            )
                          ) {
                            return null
                          }
                          if (
                            $event.ctrlKey ||
                            $event.shiftKey ||
                            $event.altKey ||
                            $event.metaKey
                          ) {
                            return null
                          }
                          return _vm.deletePrevTag($event)
                        },
                        function ($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k($event.keyCode, "tab", 9, $event.key, "Tab")
                          ) {
                            return null
                          }
                          if (
                            $event.ctrlKey ||
                            $event.shiftKey ||
                            $event.altKey ||
                            $event.metaKey
                          ) {
                            return null
                          }
                          _vm.visible = false
                        },
                        function ($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k($event.keyCode, "left", 37, $event.key, [
                              "Left",
                              "ArrowLeft",
                            ])
                          ) {
                            return null
                          }
                          if (!$event.ctrlKey) {
                            return null
                          }
                          if ("button" in $event && $event.button !== 0) {
                            return null
                          }
                          $event.stopPropagation()
                          $event.preventDefault()
                          return _vm.prevPage($event)
                        },
                        function ($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k($event.keyCode, "right", 39, $event.key, [
                              "Right",
                              "ArrowRight",
                            ])
                          ) {
                            return null
                          }
                          if (!$event.ctrlKey) {
                            return null
                          }
                          if ("button" in $event && $event.button !== 2) {
                            return null
                          }
                          $event.stopPropagation()
                          $event.preventDefault()
                          return _vm.nextPage($event)
                        },
                      ],
                      compositionstart: _vm.handleComposition,
                      compositionupdate: _vm.handleComposition,
                      compositionend: _vm.handleComposition,
                      input: [
                        function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.query = $event.target.value
                        },
                        _vm.debouncedQueryChange,
                      ],
                    },
                  })
                : _vm._e(),
            ],
            1
          )
        : _vm._e(),
      _c(
        "el-input",
        {
          ref: "reference",
          class: { "is-focus": _vm.visible },
          attrs: {
            type: "text",
            placeholder: _vm.currentPlaceholder,
            name: _vm.name,
            id: _vm.id,
            autocomplete: _vm.autoComplete || _vm.autocomplete,
            size: _vm.selectSize,
            disabled: _vm.selectDisabled,
            readonly: _vm.readonly,
            "validate-event": false,
            tabindex: _vm.multiple && _vm.filterable ? "-1" : null,
          },
          on: { focus: _vm.handleFocus, blur: _vm.handleBlur },
          nativeOn: {
            keyup: function ($event) {
              return _vm.debouncedOnInputChange($event)
            },
            keydown: [
              function ($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "down", 40, $event.key, [
                    "Down",
                    "ArrowDown",
                  ])
                ) {
                  return null
                }
                if (
                  $event.ctrlKey ||
                  $event.shiftKey ||
                  $event.altKey ||
                  $event.metaKey
                ) {
                  return null
                }
                $event.stopPropagation()
                $event.preventDefault()
                return _vm.navigateOptions("next")
              },
              function ($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "up", 38, $event.key, [
                    "Up",
                    "ArrowUp",
                  ])
                ) {
                  return null
                }
                if (
                  $event.ctrlKey ||
                  $event.shiftKey ||
                  $event.altKey ||
                  $event.metaKey
                ) {
                  return null
                }
                $event.stopPropagation()
                $event.preventDefault()
                return _vm.navigateOptions("prev")
              },
              function ($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                ) {
                  return null
                }
                if (
                  $event.ctrlKey ||
                  $event.shiftKey ||
                  $event.altKey ||
                  $event.metaKey
                ) {
                  return null
                }
                $event.preventDefault()
                return _vm.selectOption($event)
              },
              function ($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "esc", 27, $event.key, [
                    "Esc",
                    "Escape",
                  ])
                ) {
                  return null
                }
                if (
                  $event.ctrlKey ||
                  $event.shiftKey ||
                  $event.altKey ||
                  $event.metaKey
                ) {
                  return null
                }
                $event.stopPropagation()
                $event.preventDefault()
                _vm.visible = false
                _vm.esc = true
              },
              function ($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "tab", 9, $event.key, "Tab")
                ) {
                  return null
                }
                if (
                  $event.ctrlKey ||
                  $event.shiftKey ||
                  $event.altKey ||
                  $event.metaKey
                ) {
                  return null
                }
                _vm.visible = false
              },
              function ($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "left", 37, $event.key, [
                    "Left",
                    "ArrowLeft",
                  ])
                ) {
                  return null
                }
                if (!$event.ctrlKey) {
                  return null
                }
                if ("button" in $event && $event.button !== 0) {
                  return null
                }
                $event.stopPropagation()
                $event.preventDefault()
                return _vm.prevPage($event)
              },
              function ($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "right", 39, $event.key, [
                    "Right",
                    "ArrowRight",
                  ])
                ) {
                  return null
                }
                if (!$event.ctrlKey) {
                  return null
                }
                if ("button" in $event && $event.button !== 2) {
                  return null
                }
                $event.stopPropagation()
                $event.preventDefault()
                return _vm.nextPage($event)
              },
            ],
            paste: function ($event) {
              return _vm.debouncedOnInputChange($event)
            },
            mouseenter: function ($event) {
              _vm.inputHovering = true
            },
            mouseleave: function ($event) {
              _vm.inputHovering = false
            },
          },
          model: {
            value: _vm.selectedLabel,
            callback: function ($$v) {
              _vm.selectedLabel = $$v
            },
            expression: "selectedLabel",
          },
        },
        [
          _vm.$slots.prefix
            ? _c("template", { slot: "prefix" }, [_vm._t("prefix")], 2)
            : _vm._e(),
          _c("template", { slot: "suffix" }, [
            _c("i", {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: !_vm.showClose,
                  expression: "!showClose",
                },
              ],
              class: [
                "el-select__caret",
                "el-input__icon",
                "el-icon-" + _vm.iconClass,
              ],
            }),
            _vm.showClose
              ? _c("i", {
                  staticClass:
                    "el-select__caret el-input__icon el-icon-circle-close",
                  on: { click: _vm.handleClearClick },
                })
              : _vm._e(),
          ]),
        ],
        2
      ),
      _c(
        "transition",
        {
          attrs: { name: "el-zoom-in-top" },
          on: {
            "before-enter": _vm.handleMenuEnter,
            "after-leave": _vm.doDestroy,
          },
        },
        [
          _c(
            "el-select-menu",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value:
                    _vm.visible &&
                    (_vm.query ? _vm.query.length : 0) >= _vm.queryLength,
                  expression:
                    "visible && (query ? query.length : 0) >= queryLength",
                },
              ],
              ref: "popper",
              attrs: { "append-to-body": _vm.popperAppendToBody },
            },
            [
              _c(
                "el-scrollbar",
                {
                  ref: "scrollbar",
                  class: {
                    "is-empty":
                      !_vm.allowCreate &&
                      _vm.query &&
                      _vm.filteredOptionsCount === 0,
                  },
                  attrs: {
                    tag: "div",
                    "wrap-class":
                      "el-select-dropdown__wrap gl-associate-dropdown__wrap",
                    "view-class":
                      "el-select-dropdown__list gl-associate-dropdown__list",
                  },
                },
                [
                  [
                    _c("div", { staticClass: "gl-associate-page" }, [
                      _c("span", [
                        _c(
                          "span",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: _vm.hasTotal,
                                expression: "hasTotal",
                              },
                            ],
                          },
                          [_vm._v(_vm._s(_vm.totalText) + ", ")]
                        ),
                        _c("span", [_vm._v(_vm._s(_vm.fromToText))]),
                        _c("span", {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.searching,
                              expression: "searching",
                            },
                          ],
                          staticClass: "el-icon-loading gl-associate-loading",
                        }),
                      ]),
                      _c(
                        "span",
                        { staticClass: "gl-associate-buttons" },
                        [
                          _c("el-button", {
                            attrs: {
                              disabled: !_vm.canPrevPage,
                              size: "mini",
                              type: "text",
                              icon: "el-icon-caret-left",
                            },
                            on: { click: _vm.prevPage },
                          }),
                          _c("el-button", {
                            attrs: {
                              disabled: !_vm.canNextPage,
                              size: "mini",
                              type: "text",
                              icon: "el-icon-caret-right",
                            },
                            on: { click: _vm.nextPage },
                          }),
                        ],
                        1
                      ),
                    ]),
                    _c("div", { staticClass: "gl-associate-table" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.showColumnHeader,
                              expression: "showColumnHeader",
                            },
                          ],
                          staticClass: "gl-associate-thead",
                        },
                        [
                          _c(
                            "div",
                            { staticClass: "el-select-dropdown__item" },
                            [
                              _vm.multiple
                                ? _c("span", {
                                    staticClass:
                                      "gl-associate-th gl-associate-th-checkbox",
                                  })
                                : _vm._e(),
                              _vm._l(_vm.columns, function (column, index) {
                                return _c(
                                  "span",
                                  {
                                    key: index,
                                    staticClass: "gl-associate-th",
                                    style: _vm.getColumnStyle(column),
                                  },
                                  [
                                    _vm._v(
                                      "\n                  " +
                                        _vm._s(column.title) +
                                        "\n                "
                                    ),
                                  ]
                                )
                              }),
                            ],
                            2
                          ),
                        ]
                      ),
                      _c(
                        "div",
                        { staticClass: "gl-associate-tbody" },
                        _vm._l(_vm.list, function (item) {
                          return _c(
                            "g-option",
                            {
                              key: item[_vm.valueProp],
                              attrs: {
                                data: item,
                                "display-format": _vm.displayFormatFunc,
                                label: item[_vm.labelProp || _vm.valueProp],
                                value: item[_vm.valueProp],
                              },
                            },
                            [
                              _vm.multiple
                                ? _c(
                                    "span",
                                    {
                                      staticClass:
                                        "gl-associate-td gl-associate-td-checkbox",
                                    },
                                    [
                                      _c("el-checkbox", {
                                        style: { pointerEvents: "none" },
                                        attrs: {
                                          value: _vm.isSelectedRow(item),
                                        },
                                      }),
                                    ],
                                    1
                                  )
                                : _vm._e(),
                              _vm._l(_vm.columns, function (column, index) {
                                return _c(
                                  "span",
                                  {
                                    key: index,
                                    staticClass: "gl-associate-td",
                                    style: _vm.getColumnStyle(column),
                                    attrs: {
                                      title: _vm.getColumnDisplay(item, column),
                                    },
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(_vm.getColumnDisplay(item, column))
                                    ),
                                  ]
                                )
                              }),
                            ],
                            2
                          )
                        }),
                        1
                      ),
                    ]),
                    _c(
                      "div",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: !_vm.list.length,
                            expression: "!list.length",
                          },
                        ],
                        staticClass: "gl-associate-empty",
                      },
                      [_c("span", [_vm._v(_vm._s(_vm.emptyText))])]
                    ),
                  ],
                ],
                2
              ),
            ],
            1
          ),
        ],
        1
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/associate/src/associate.vue?vue&type=template&id=4a3b2024&

// EXTERNAL MODULE: external "babel-runtime/regenerator"
var regenerator_ = __webpack_require__(2);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator_);

// EXTERNAL MODULE: external "babel-runtime/helpers/asyncToGenerator"
var asyncToGenerator_ = __webpack_require__(7);
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator_);

// EXTERNAL MODULE: external "babel-runtime/helpers/typeof"
var typeof_ = __webpack_require__(12);
var typeof_default = /*#__PURE__*/__webpack_require__.n(typeof_);

// EXTERNAL MODULE: external "element-ui"
var external_element_ui_ = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/associate/src/gOption.vue?vue&type=template&id=03fbc8e8&
var gOptionvue_type_template_id_03fbc8e8_render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.visible,
          expression: "visible",
        },
      ],
      staticClass: "el-select-dropdown__item",
      class: {
        selected: _vm.itemSelected,
        "is-disabled": _vm.disabled || _vm.groupDisabled || _vm.limitReached,
        hover: _vm.hover,
      },
      on: {
        mouseenter: _vm.hoverItem,
        click: function ($event) {
          $event.stopPropagation()
          return _vm.selectOptionClick($event)
        },
      },
    },
    [_vm._t("default", [_c("span", [_vm._v(_vm._s(_vm.currentLabel))])])],
    2
  )
}
var gOptionvue_type_template_id_03fbc8e8_staticRenderFns = []
gOptionvue_type_template_id_03fbc8e8_render._withStripped = true


// CONCATENATED MODULE: ./packages/associate/src/gOption.vue?vue&type=template&id=03fbc8e8&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/associate/src/gOption.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var gOptionvue_type_script_lang_js_ = ({
  extends: external_element_ui_["Option"],
  name: 'GOption',
  props: {
    data: {
      type: Object,
      required: true
    },
    /** 格式化联想控件显示，可使用 {{}} 表达式字符串或 function，接收参数 record */
    displayFormat: Function
  },
  computed: {
    currentLabel: function currentLabel() {
      if (typeof this.displayFormat === 'function') {
        return this.displayFormat(this.data);
      }
      return this.label || (this.isObject ? '' : this.value);
    }
  }
});
// CONCATENATED MODULE: ./packages/associate/src/gOption.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_gOptionvue_type_script_lang_js_ = (gOptionvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/associate/src/gOption.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_gOptionvue_type_script_lang_js_,
  gOptionvue_type_template_id_03fbc8e8_render,
  gOptionvue_type_template_id_03fbc8e8_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/associate/src/gOption.vue"
/* harmony default export */ var gOption = (component.exports);
// EXTERNAL MODULE: external "element-ui/lib/utils/types"
var types_ = __webpack_require__(13);

// EXTERNAL MODULE: external "element-ui/lib/utils/util"
var util_ = __webpack_require__(3);

// EXTERNAL MODULE: ./packages/mixins/listenScroll.js
var listenScroll = __webpack_require__(5);

// EXTERNAL MODULE: ./packages/mixins/focusOnClear.js
var focusOnClear = __webpack_require__(6);

// EXTERNAL MODULE: external "babel-runtime/helpers/classCallCheck"
var classCallCheck_ = __webpack_require__(14);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck_);

// CONCATENATED MODULE: ./src/utils/associateService.js




/**
 * 联想控件公共服务
 */
var associateService_AssociateService = function () {
  function AssociateService() {
    classCallCheck_default()(this, AssociateService);

    /**
     * 缓存数据
     *  @type {{ [key: string]: any[] }}
     */
    this.storage = {};
  }
  /**
   * 加载方法，需要先注册
   * @param {string} key
   * @returns {Promise<any[]>}
   */


  AssociateService.prototype.serviceMethod = function serviceMethod(key) {
    throw new Error('ServiceMethod 未注册。');
  };

  AssociateService.prototype.loadData = function () {
    var _ref = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee(key) {
      var data;
      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.serviceMethod(key);

            case 2:
              data = _context.sent;

              this.setData(key, data);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function loadData(_x) {
      return _ref.apply(this, arguments);
    }

    return loadData;
  }();
  /**
   *  注册服务加载方法
   * @param {(key: string) => Promise<any[]>} method
   */


  AssociateService.prototype.registServiceMethod = function registServiceMethod(method) {
    this.serviceMethod = method;
  };
  /**
   * 从 storage 中获取数据
   * @param {string} key
   * @returns {Promise<any[]}
   */


  AssociateService.prototype.getData = function () {
    var _ref2 = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee2(key) {
      return regenerator_default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (this.storage[key]) {
                _context2.next = 3;
                break;
              }

              _context2.next = 3;
              return this.loadData(key);

            case 3:
              return _context2.abrupt('return', this.storage[key]);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getData(_x2) {
      return _ref2.apply(this, arguments);
    }

    return getData;
  }();
  /**
   * 设置 storage 数据
   * @param {string} key
   * @param {any[]} data
   */


  AssociateService.prototype.setData = function setData(key, data) {
    this.storage[key] = data;
  };

  return AssociateService;
}();

var associateService = new associateService_AssociateService();

/* harmony default export */ var utils_associateService = (associateService);
// CONCATENATED MODULE: ./packages/associate/src/utils.js
/**
 * 全角转羊角
 * @param {string} str
 */
function toCDB(str) {
  var tmp = "",
      length = str.length,
      i;
  for (i = 0; i < length; i++) {
    if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
      tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
    } else {
      tmp += String.fromCharCode(str.charCodeAt(i));
    }
  }
  tmp = tmp.replace("　", " ");
  return tmp;
}

/**
 * 去空格处理
 * @param {string} str
 * @param {string} trimType
 * @returns {string}
 */
function trim(str, trimType) {
  var reg = void 0;
  switch (trimType) {
    case 'ltrim':
      reg = /^\s*/g;
      break;
    case 'rtrim':
      reg = /\s*$/g;
      break;
    case 'atrim':
      reg = /\s*/g;
      break;
    case 'trim':
      reg = /^\s*|\s*$/g;
      break;
    default:
      return str;
  }
  return str.replace(reg, '');
}

/**
 * 大小写转换
 * @param {string} str
 * @param {string} caseType
 * @returns {string}
 */
function changeCase(str, caseType) {
  switch (caseType) {
    case 'upper':
      return str.toUpperCase();
    case 'lower':
      return str.toLowerCase();
    default:
      return str;
  }
}
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/associate/src/associate.vue?vue&type=script&lang=js&



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





// import { t } from 'element-ui/lib/locale';






var remoteMethod = function remoteMethod(val) {
  var _this = this;

  var keyword = this.formatKeyword(val || "");
  if (keyword.length < this.queryLength) {
    return;
  }
  this.previousKeyword = keyword;
  this.lastSearchId++;
  var lastSearchId = this.lastSearchId;
  this.searching = true;
  var trim = this.trim;
  var dbc = this.dbc;
  var _case = this.case;
  var pageSize = this.pageSize;
  var currentPage = this.currentPage || 1;

  this.previousQuery = keyword;
  this.queryMethod({
    originKeyword: val,
    keyword: keyword,
    pageSize: pageSize,
    currentPage: currentPage,
    trim: trim,
    dbc: dbc,
    case: _case
  }).then(function (result) {
    // 不是最后一次搜索返回的结果，直接丢弃
    if (_this.lastSearchId !== lastSearchId) {
      return;
    }
    var records = result[_this.recordsKey],
        total = result[_this.totalKey],
        fromIndex = result[_this.fromKey],
        toIndex = result[_this.toKey];

    var list = records || [];
    if (_this.allowCreate && keyword && (_this.allowCreateWhenNotEmpty || !list.length)) {
      var _ref;

      var createdItem = _this.createMethod ? _this.createMethod(keyword) : (_ref = {}, _ref[_this.valueProp] = keyword, _ref[_this.labelProp] = keyword, _ref.__isCreated = true, _ref);
      if (!list.find(function (item) {
        return item[_this.valueProp] === createdItem[_this.valueProp];
      })) {
        list.push(createdItem);
      }
    }
    _this.list = list;
    _this.total = total;
    // this.fromIndex = fromIndex;
    // this.toIndex = toIndex;
    _this.fromIndex = (currentPage - 1) * pageSize;
    _this.toIndex = _this.fromIndex + _this.list.length - 1;
    _this.$nextTick(function () {
      return _this.sortOptions();
    });
    if (!_this.userSelect && !_this.visible) {
      _this.onlyOneSelect();
    }
  }).catch(function (e) {
    window.console.error(e);
  }).finally(function () {
    if (_this.lastSearchId !== lastSearchId) {
      return;
    }
    _this.userSelect = false;
    _this.searching = false;
  });
};

/* harmony default export */ var associatevue_type_script_lang_js_ = ({
  extends: external_element_ui_["Select"],
  mixins: [listenScroll["a" /* listenScrollMixin */], focusOnClear["a" /* focusOnClearMixin */]],
  name: "ElAssociate",
  props: {
    /** 联想控件必须开启输入 */
    filterable: {
      type: Boolean,
      default: true,
      validator: function validator(val) {
        if (!val) {
          window.console.error("`Filterable` prop in <gl-associate> must be `true`.");
          return false;
        }
        return true;
      }
    },
    /** 联想控件必须开启远程搜索 */
    remote: {
      type: Boolean,
      default: true,
      validator: function validator(val) {
        if (!val) {
          window.console.error("`Remote` prop in <gl-associate> must be `true`.");
          return false;
        }
        return true;
      }
    },
    allowCreate: {
      type: Boolean,
      default: false
      // validate(val) {
      //   if (val) {
      //     window.console.error(
      //       '`AllowCreate` prop in <gl-associate> must be `false`.'
      //     );
      //     return false;
      //   }
      //   return true;
      // }
    },
    /** 是否允许在有返回值的情况下新建条目 */
    allowCreateWhenNotEmpty: {
      type: Boolean,
      default: function _default() {
        return this.$ELEMENT && this.$ELEMENT.config && this.$ELEMENT.config.associate && this.$ELEMENT.config.associate.allowCreateWhenNotEmpty || false;
      }
    },
    /** 焦点进入时是否保持输入框的文字，只对单选有效 */
    keepInputValue: {
      type: Boolean,
      default: function _default() {
        return this.$ELEMENT && this.$ELEMENT.config && this.$ELEMENT.config.associate && this.$ELEMENT.config.associate.keepInputValue || false;
      }
    },
    /** 是否焦点进入的时候以输入框的文本进行查询。单选且开启 keepInputValue 时有效 */
    initSearchKeepValue: {
      type: Boolean,
      default: function _default() {
        return this.$ELEMENT && this.$ELEMENT.config && this.$ELEMENT.config.associate && this.$ELEMENT.config.associate.initSearchKeepValue || false;
      }
    },
    /** 自定义无匹配数据时如何创建记录项 */
    createMethod: {
      type: Function,
      default: null
    },
    /** 是否默认选择第一行，可统一配置 */
    defaultFirstOption: {
      type: Boolean,
      default: function _default() {
        return this.$ELEMENT && this.$ELEMENT.config && this.$ELEMENT.config.associate && this.$ELEMENT.config.associate.defaultFirstOption || false;
      }
    },
    popperAppendToBody: {
      type: Boolean,
      default: function _default() {
        var configValue = this.$ELEMENT && this.$ELEMENT.config && this.$ELEMENT.config.associate && this.$ELEMENT.config.associate.popperAppendToBody;
        return configValue === undefined ? true : configValue;
      }
    },
    /** 下拉列表显示的表格列信息
     * - `column.title` 列标题
     * - `column.field` 列字段
     * - `column.format` 格式化显示方法，选填
     */
    columns: {
      type: Array,
      required: true
    },
    /** 值字段，必输 */
    valueProp: {
      type: String,
      required: true
    },
    /** 显示字段，或不配置则与 `labelProp` 相同 */
    labelProp: String,
    /** 是否显示表头 */
    showColumnHeader: {
      type: Boolean,
      default: true
    },
    /** 请求延迟时间 */
    delayTime: {
      type: Number,
      default: 300
    },
    /** remoteMethod 不可配置 */
    remoteMethod: {
      type: Function,
      default: remoteMethod,
      validator: function validator(val) {
        if (val !== remoteMethod) {
          return false;
        }
        return true;
      }
    },
    /** 用户需配置 queryMethod，返回 Promise */
    queryMethod: {
      type: Function,
      required: true
    },
    /** queryMethod 返回的数据字段 */
    recordsKey: {
      type: String,
      default: "records"
    },
    /** queryMethod 返回的数据从序号字段 */
    fromKey: {
      type: String,
      default: "recordStart"
    },
    /** queryMethod 返回的数据到序号字段 */
    toKey: {
      type: String,
      default: "recordEnd"
    },
    /** queryMethod 返回的数据总条数字段 */
    totalKey: {
      type: String,
      default: "total"
    },
    /** 每页记录数 */
    pageSize: {
      type: Number,
      default: 10
    },
    /** 为联想控件赋初始值，回显需要设置的字符串，与 `v-model` 的值一一对应 */
    displayInit: {
      type: [String, Array]
    },
    /** 请求关键字长度，当关键字长度小于此设置时，不请求查询 */
    queryLength: {
      type: Number,
      default: 0
    },
    /** 查询关键字是否全角转半角 */
    dbc: Boolean,
    /** 查询关键字是否去空格：
     *  - `ltrim`：去除左边空格；
     *  - `rtrim`：去除右边空格；
     *  - `atrim`：去除全部空格；
     *  - `trim`：去除左右空格
     */
    trim: String,
    /**
     * 查询关键字是否转换大小写
     * - `upper`: 转大写
     * - `lower`: 转大写
     */
    case: String,
    /**
     * 绑定关联字段值
     * key 为绑定的父组件 data 值, value 为对应组件列表数据的 key 值
     */
    dataBind: Object,
    autoSelectOnlyOption: {
      type: Boolean,
      default: function _default() {
        var configValue = this.$ELEMENT && this.$ELEMENT.config && this.$ELEMENT.config.associate && this.$ELEMENT.config.associate.autoSelectOnlyOption;
        return configValue === undefined ? true : configValue;
      }
    },
    /** 是否禁止在已显示下拉面板时，再次点击输入框收起下拉面板 */
    disableClickHideMenu: {
      type: Boolean,
      default: function _default() {
        return this.$ELEMENT && this.$ELEMENT.config && this.$ELEMENT.config.associate && this.$ELEMENT.config.associate.disableClickHideMenu || false;
      }
    },
    /** 是否入焦点的时候选中文本框的文字 */
    focusSelect: {
      type: Boolean,
      default: function _default() {
        return this.$ELEMENT && this.$ELEMENT.config && this.$ELEMENT.config.associate && this.$ELEMENT.config.associate.focusSelect || false;
      }
    },
    /** AssociateService 对应的 key 值 */
    serviceKey: String,
    /** 格式化联想控件显示，可使用 {{}} 表达式字符串或 function，接收参数 record */
    displayFormat: [String, Function]
  },

  data: function data() {
    return {
      /** 下拉列表数据集合 */
      list: [],
      /** 列表记录从 */
      fromIndex: null,
      /** 列表记录到 */
      toIndex: null,
      /** 总记录数 */
      total: null,
      /** 当前页 */
      currentPage: 1,
      /** 选中的列表项 */
      selectItem: null,
      /** 最后一次发起搜索的 id */
      lastSearchId: 0,
      /** 是否加载状态 */
      searching: false,
      /** 是否用户选择 */
      userSelect: false,
      /** 是否用户按下 Esc */
      esc: false,
      /** 前一次搜索关键字 */
      previousKeyword: null
    };
  },


  computed: {
    /**
     * 搜索延迟时间
     * @returns {number}
     */
    debounce: function debounce() {
      return this.delayTime || 300;
    },

    /**
     * 是否可以向下翻页
     * @returns {boolean}
     */
    canNextPage: function canNextPage() {
      if (this.hasTotal) {
        return this.toIndex + 1 < this.total;
      }
      return this.list.length >= this.pageSize;
    },

    /**
     * 是否可以向上翻页
     * @returns {boolean}
     */
    canPrevPage: function canPrevPage() {
      return this.currentPage > 1;
    },

    /**
     * 无数据显示文字
     * @returns {string}
     */
    emptyText: function emptyText() {
      if (this.searching) {
        return this.loadingText || this.t("el.select.loading");
      } else {
        if (this.options.length === 0) {
          return this.noDataText || this.t("el.select.noData");
        }
      }
      return null;
    },
    iconClass: function iconClass() {
      return "search is-reverse";
    },

    /**
     * 是否有统计总条数
     * @returns {boolean}
     */
    hasTotal: function hasTotal() {
      return typeof this.total === "number";
    },

    /**
     * 下拉面板显示的总条数文字
     * @returns {string}
     */
    totalText: function totalText() {
      return this.t("el.associate.totalFormat", { total: this.total });
    },

    /**
     * 下拉面板显示的记录起止文字
     * @returns {string}
     */
    fromToText: function fromToText() {
      var length = this.list.length;
      var from = length ? this.fromIndex + 1 : "";
      var to = length ? this.toIndex + 1 : "";
      return this.t("el.associate.fromToFormat", { from: from, to: to });
    },
    displayFormatFunc: function displayFormatFunc() {
      var displayFormat = this.displayFormat;
      switch (typeof displayFormat === "undefined" ? "undefined" : typeof_default()(displayFormat)) {
        case "function":
          return displayFormat;
        case "string":
          return function (data) {
            return displayFormat.replace(/\{([\s\S]+?)\}/g, function ($0, $1) {
              return new Function("row", "return " + $1 + " || ''")(data || {});
              // return 'aaa';
            });
          };
        default:
          return null;
      }
    }
  },

  components: {
    GOption: gOption
  },

  methods: {
    /**
     * 获取表格列显示文本
     * @param {*} record 当前行的数据
     * @param {*} column 列对象
     * @returns {string}
     */
    getColumnDisplay: function getColumnDisplay(record, column) {
      var field = column.field,
          format = column.format;

      var value = record && record[field];
      if (Object(types_["isFunction"])(format)) {
        return format(value);
      }
      return value;
    },

    /**
     * 获取表格列的样式（宽度）
     * @param {*} column 列对象
     * @returns {*}
     */
    getColumnStyle: function getColumnStyle(column) {
      return {
        width: column.width,
        maxWidth: column.width,
        textAlign: column.align || "left"
      };
    },

    /**
     * 判断是否勾选行
     * @param {*} record 行数据
     * @returns {boolean}
     */
    isSelectedRow: function isSelectedRow(record) {
      var option = this.getOption(record[this.valueProp]);
      return option && option.itemSelected;
    },

    /** 下一页 */
    nextPage: function nextPage() {
      if (this.canNextPage) {
        this.currentPage++;
        this.remoteMethod(this.query);
      }
      this.setSoftFocus();
    },

    /** 上一页 */
    prevPage: function prevPage() {
      if (this.canPrevPage) {
        this.currentPage--;
        this.remoteMethod(this.query);
      }
      this.setSoftFocus();
    },

    /**
     * 重写 getOption 方法，赋初始值时，根据回显示值 `displayInit` 进行显示
     */
    getOption: function getOption(value) {
      var _this2 = this;

      var option = void 0;
      var isObject = Object.prototype.toString.call(value).toLowerCase() === "[object object]";
      var isNull = Object.prototype.toString.call(value).toLowerCase() === "[object null]";
      var isUndefined = Object.prototype.toString.call(value).toLowerCase() === "[object undefined]";

      for (var i = this.cachedOptions.length - 1; i >= 0; i--) {
        var cachedOption = this.cachedOptions[i];
        var isEqual = isObject ? Object(util_["getValueByPath"])(cachedOption.value, this.valueKey) === Object(util_["getValueByPath"])(value, this.valueKey) : cachedOption.value === value;
        if (isEqual) {
          option = cachedOption;
          break;
        }
      }
      if (option) return option;
      var newOption = void 0;
      if (this.serviceData && this.serviceData.length) {
        var record = this.serviceData.find(function (item) {
          return item[_this2.valueProp] === value;
        });
        if (record) {
          newOption = {
            value: value,
            currentLabel: this.displayFormatFunc ? this.displayFormatFunc(record) : record[this.labelProp],
            data: record
          };
        }
      }
      if (!newOption) {
        var _record2;

        var label = !isObject && !isNull && !isUndefined ? this.getLabelInit(value) : "";
        var _record = (_record2 = {}, _record2[this.valueProp] = value, _record2[this.labelProp] = label, _record2);
        newOption = {
          value: value,
          currentLabel: label,
          data: _record
        };
      }
      if (this.multiple) {
        newOption.hitState = false;
      }
      return newOption;
    },

    /**
     * 获取初始回显文本
     * @param {string} value
     * @returns {string}
     */
    getLabelInit: function getLabelInit(value) {
      if (this.multiple) {
        var valueIndex = (this.value || []).findIndex(function (v) {
          return v === value;
        });
        return (this.displayInit || [])[valueIndex] || value;
      }
      if (!value) {
        return "";
      }
      return this.displayInit || value;
    },

    /**
     * 格式化关键字
     * @param {string} val
     * @returns {string}
     */
    formatKeyword: function formatKeyword(val) {
      var result = val;
      if (this.trim) {
        result = trim(result, this.trim);
      }
      if (this.case) {
        result = changeCase(result, this.case);
      }
      if (this.dbc) {
        result = toCDB(result);
      }
      return result;
    },

    /**
     * 重写 setSelected 方法
     */
    setSelected: function setSelected() {
      var _this3 = this;

      this.userSelect = true;
      if (!this.multiple) {
        var option = this.getOption(this.value);
        if (option.created) {
          this.createdLabel = option.currentLabel;
          this.createdSelected = true;
        } else {
          this.createdSelected = false;
        }
        this.selectedLabel = option.currentLabel;
        this.selected = option;
        if (this.filterable) this.query = this.selectedLabel;
        return;
      }
      var result = [];
      if (Array.isArray(this.value)) {
        this.value.forEach(function (value) {
          result.push(_this3.getOption(value));
        });
      }
      this.selected = result;
      this.$nextTick(function () {
        _this3.resetInputHeight();
      });
    },

    /** 当只有一条记录的时候，选中 */
    onlyOneSelect: function onlyOneSelect() {
      if (!this.autoSelectOnlyOption || this.list.length !== 1 || this.esc) {
        return;
      }
      var value = this.list[0][this.valueProp];
      var option = this.getOption(value);
      this.handleOptionSelect(option, false, true);
    },

    /** 重写 checkDefaultFirstOption 方法 */
    checkDefaultFirstOption: function checkDefaultFirstOption() {
      if (this.options.length) {
        this.hoverIndex = 0;
      } else {
        this.hoverIndex = -1;
      }
    },

    /** 重写 handleOptionSelect 方法,
     * 添加参数 isOnlyOneSelect，当为 true 时，不执行 setSoftFocus，多选不移除已选项
     */
    handleOptionSelect: function handleOptionSelect(option, byClick, isOnlyOneSelect) {
      var _this4 = this;

      if (this.multiple) {
        var value = (this.value || []).slice();
        var optionIndex = this.getValueIndex(value, option.value);
        if (optionIndex > -1) {
          if (isOnlyOneSelect) {
            return;
          }
          value.splice(optionIndex, 1);
        } else if (this.multipleLimit <= 0 || value.length < this.multipleLimit) {
          value.push(option.value);
        }
        this.$emit("input", value);
        this.emitChange(value);
        if (option.created) {
          this.query = "";
          this.handleQueryChange("");
          this.inputLength = 20;
        }
        if (this.filterable && !isOnlyOneSelect) this.$refs.input.focus();
      } else {
        this.$emit("input", option.value);
        this.emitChange(option.value);
        this.visible = false;
      }
      this.isSilentBlur = byClick;
      if (!isOnlyOneSelect) {
        this.setSoftFocus();
      }
      if (this.visible) return;
      this.$nextTick(function () {
        _this4.scrollToOption(option);
      });
    },

    /** 重写 emitChange 方法 */
    emitChange: function emitChange(val) {
      var _this5 = this;

      if (!Object(util_["valueEquals"])(this.value, val)) {
        var selectedRows = this.multiple ? (val || []).map(function (v) {
          return _this5.getRecordData(v);
        }) : this.getRecordData(val);
        this.$emit("change", val, selectedRows);
      }
    },

    /**
     * 获取行数据
     */
    getRecordData: function getRecordData(value) {
      var option = this.getOption(value);
      return option && option.data || {};
    },

    /**
     * 获取选中行数据，单选为对象，多选为数组
     */
    getSelectedRows: function getSelectedRows() {
      var value = this.value;
      if (this.multiple) {
        return [];
      }
      var option = this.getOption(value);
      return option && option.data || {};
    },
    handleClearClick: function handleClearClick() {
      var _Select$methods$handl,
          _this6 = this;

      (_Select$methods$handl = external_element_ui_["Select"].methods.handleClearClick).call.apply(_Select$methods$handl, [this].concat(Array.prototype.slice.call(arguments)));
      if (this.focusOnClear) {
        this.$nextTick(function () {
          return _this6.focus();
        });
      }
    },
    toggleDropMenu: function toggleDropMenu() {
      if (this.visible && this.disableClickHideMenu) {
        return;
      }
      this.toggleMenu();
    },
    handleFocus: function handleFocus(e) {
      var _Select$methods$handl2;

      if (this.focusSelect) {
        e.target.select();
      }
      (_Select$methods$handl2 = external_element_ui_["Select"].methods.handleFocus).call.apply(_Select$methods$handl2, [this].concat(Array.prototype.slice.call(arguments)));
    },
    handleBlur: function handleBlur(event) {
      var _this7 = this;

      setTimeout(function () {
        if (_this7.isSilentBlur) {
          _this7.isSilentBlur = false;
        } else {
          _this7.$emit("blur", event);
        }
      }, 50);
      this.softFocus = false;
    },

    /**
     * 对 this.options 重新进行排序
     */
    sortOptions: function sortOptions() {
      var _this8 = this;

      var options = this.options,
          list = this.list;

      if (!(options && list)) {
        return;
      }
      this.options = this.list.map(function (item) {
        return options.find(function (o) {
          return o.data === item;
        });
      });
      if (this.options.length) {
        this.hoverOption = this.options[this.hoverIndex];
        this.options.forEach(function (option, i) {
          if (option) {
            option.hover = option === _this8.hoverOption;
          }
        });
      }
    }
  },

  watch: {
    visible: function visible(val) {
      if (!val) {
        // 焦点移开的时候触发查询
        var input = this.$refs.input || this.$refs.reference;
        var query = input && input.value;
        if (query && query !== this.previousKeyword) {
          this.remoteMethod(query);
        }
        this.currentPage = 1;
        if (!this.searching && !this.userSelect) {
          this.onlyOneSelect();
        }
      } else {
        this.list = [];
        this.currentPage = 1;
        this.total = 0;
        this.fromIndex = 0;
        this.toIndex = 0;
        this.userSelect = false;
        this.esc = false;
        if (!this.multiple && this.keepInputValue) {
          var _input = this.$refs.input || this.$refs.reference;
          this.selectedLabel = _input && _input.value || "";
          if (this.initSearchKeepValue) {
            this.query = this.selectedLabel;
          }
        }
        this.remoteMethod(this.query);
      }
    },
    query: function query() {
      // 搜索关键字改变时，当前页码重置为 1
      this.currentPage = 1;
    }
  },

  created: function created() {
    var _this9 = this;

    return asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!_this9.serviceKey) {
                _context.next = 5;
                break;
              }

              _context.next = 3;
              return utils_associateService.getData(_this9.serviceKey);

            case 3:
              _this9.serviceData = _context.sent;

              _this9.setSelected();

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this9);
    }))();
  }
});
// CONCATENATED MODULE: ./packages/associate/src/associate.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_associatevue_type_script_lang_js_ = (associatevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./packages/associate/src/associate.vue?vue&type=style&index=0&lang=scss&
var associatevue_type_style_index_0_lang_scss_ = __webpack_require__(19);

// CONCATENATED MODULE: ./packages/associate/src/associate.vue






/* normalize component */

var associate_component = Object(componentNormalizer["a" /* default */])(
  src_associatevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var associate_api; }
associate_component.options.__file = "packages/associate/src/associate.vue"
/* harmony default export */ var associate = (associate_component.exports);
// CONCATENATED MODULE: ./packages/associate/index.js


/* istanbul ignore next */
associate.install = function (Vue) {
  Vue.component(associate.name, associate);
};

/* harmony default export */ var packages_associate = __webpack_exports__["default"] = (associate);

/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ addStylesClient; });

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ })
/******/ ]);