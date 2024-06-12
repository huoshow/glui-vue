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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = require("element-ui");

/***/ }),

/***/ 1:
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

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "element-ui"
var external_element_ui_ = __webpack_require__(0);

// EXTERNAL MODULE: ./src/utils/stringUtil.js
var stringUtil = __webpack_require__(4);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/input/src/GlInput.vue?vue&type=script&lang=js&



/* harmony default export */ var GlInputvue_type_script_lang_js_ = ({
  extends: external_element_ui_["Input"],
  name: 'ElInput',
  data: function data() {
    return {};
  },

  props: {
    dbc: {
      type: Boolean,
      default: function _default() {
        return this.$ELEMENT && this.$ELEMENT.config && this.$ELEMENT.config.input && this.$ELEMENT.config.input.dbc || false;
      }
    },
    'case': {
      type: String,
      default: function _default() {
        return this.$ELEMENT && this.$ELEMENT.config && this.$ELEMENT.config.input && this.$ELEMENT.config.input.case;
      }
    },
    trim: {
      type: [String, Boolean],
      default: function _default() {
        return this.$ELEMENT && this.$ELEMENT.config && this.$ELEMENT.config.input && this.$ELEMENT.config.input.trim;
      }
    }
  },
  methods: {
    focus: function focus() {
      this.getInput().focus();
    },
    handleInput: function handleInput(event) {
      var targetValue = event.target.value;
      if (this.isComposing) return;
      if (targetValue === this.nativeInputValue) return;
      if (this.dbc) {
        targetValue = Object(stringUtil["a" /* toCDB */])(targetValue);
      }
      if (this.case === 'upper') {
        targetValue = targetValue.toUpperCase();
      } else if (this.case === 'lower') {
        targetValue = targetValue.toLowerCase();
      }
      this.$emit('input', targetValue);
      this.$nextTick(this.setNativeInputValue);
    },
    handleBlur: function handleBlur(event) {
      var targetValue = event.target.value;
      this.focused = false;
      if (this.trim !== undefined) {
        var value = Object(stringUtil["b" /* trimValue */])(this.trim, targetValue);
        this.$emit('input', value);
        this.$nextTick(this.setNativeInputValue);
      }
      this.$emit('blur', event);

      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.blur', [this.value]);
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/input/src/GlInput.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_GlInputvue_type_script_lang_js_ = (GlInputvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/input/src/GlInput.vue
var render, staticRenderFns




/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_GlInputvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/input/src/GlInput.vue"
/* harmony default export */ var GlInput = (component.exports);
// CONCATENATED MODULE: ./packages/input/index.js


/* istanbul ignore next */
GlInput.install = function (Vue) {
  Vue.component(GlInput.name, GlInput);
};

/* harmony default export */ var input = __webpack_exports__["default"] = (GlInput);

/***/ }),

/***/ 4:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return toCDB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return trimValue; });
/* unused harmony export trim */
/* unused harmony export changeCase */
/**
 * 全角转羊角
 * @param {string} str
 */
function toCDB(str) {
  var tmp = '';
  var length = str.length;
  var i = void 0;
  for (i = 0; i < length; i++) {
    if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
      tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
    } else {
      tmp += String.fromCharCode(str.charCodeAt(i));
    }
  }
  tmp = tmp.replace('　', ' ');
  return tmp;
}

function trimValue(trim, value) {
  var reg = null;
  var trimStr = '\\s+';
  switch (trim) {
    case 'ltrim':
      reg = new RegExp('^' + trimStr, 'g');
      break;
    case 'rtrim':
      reg = new RegExp(trimStr + '$', 'g');
      break;
    case 'atrim':
      reg = new RegExp(trimStr, 'g');
      break;
    case 'trim':
    case '':
    case true:
      reg = new RegExp('^' + trimStr + '|' + trimStr + '$', 'g');
  }
  return value.replace(reg, '');
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



/***/ })

/******/ });