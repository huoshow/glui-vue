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
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
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

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/select/src/GlSelect.vue?vue&type=template&id=7285044b&
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
      staticClass: "el-select",
      class: [_vm.selectSize ? "el-select--" + _vm.selectSize : ""],
      on: {
        click: function ($event) {
          $event.stopPropagation()
          return _vm.toggleMenu($event)
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
                                [
                                  _vm._v(
                                    "+\n          " +
                                      _vm._s(_vm.selected.length - 1)
                                  ),
                                ]
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
                        _vm.resetInputState,
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
                          return _vm.deletePrevTag($event)
                        },
                        function ($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k($event.keyCode, "tab", 9, $event.key, "Tab")
                          ) {
                            return null
                          }
                          _vm.visible = false
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
                _vm.visible = false
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
                  value: _vm.visible && _vm.emptyText !== false,
                  expression: "visible && emptyText !== false",
                },
              ],
              ref: "popper",
              attrs: { "append-to-body": _vm.popperAppendToBody },
            },
            [
              _c(
                "el-scrollbar",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.options.length > 0 && !_vm.loading,
                      expression: "options.length > 0 && !loading",
                    },
                  ],
                  ref: "scrollbar",
                  class: {
                    "is-empty":
                      !_vm.allowCreate &&
                      _vm.query &&
                      _vm.filteredOptionsCount === 0,
                  },
                  attrs: {
                    tag: "ul",
                    "wrap-class": "el-select-dropdown__wrap",
                    "view-class": "el-select-dropdown__list",
                  },
                },
                [
                  _vm.showNewOption
                    ? _c("el-option", {
                        attrs: { value: _vm.query, created: "" },
                      })
                    : _vm._e(),
                  _vm._t("default"),
                ],
                2
              ),
              _vm.emptyText &&
              (!_vm.allowCreate ||
                _vm.loading ||
                (_vm.allowCreate && _vm.options.length === 0))
                ? [
                    _vm.$slots.empty
                      ? _vm._t("empty")
                      : _c("p", { staticClass: "el-select-dropdown__empty" }, [
                          _vm._v(
                            "\n          " +
                              _vm._s(_vm.emptyText) +
                              "\n        "
                          ),
                        ]),
                  ]
                : _vm._e(),
            ],
            2
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


// CONCATENATED MODULE: ./packages/select/src/GlSelect.vue?vue&type=template&id=7285044b&

// EXTERNAL MODULE: external "element-ui"
var external_element_ui_ = __webpack_require__(0);

// EXTERNAL MODULE: external "element-ui/lib/utils/util"
var util_ = __webpack_require__(3);

// EXTERNAL MODULE: ./packages/mixins/listenScroll.js
var listenScroll = __webpack_require__(5);

// EXTERNAL MODULE: ./packages/mixins/focusOnClear.js
var focusOnClear = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/select/src/GlSelect.vue?vue&type=script&lang=js&
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






/* harmony default export */ var GlSelectvue_type_script_lang_js_ = ({
  extends: external_element_ui_["Select"],
  name: 'ElSelect',
  mixins: [listenScroll["a" /* listenScrollMixin */], focusOnClear["a" /* focusOnClearMixin */]],
  props: {
    allowCreate: {
      type: Boolean,
      default: function _default() {
        return this.$ELEMENT && this.$ELEMENT.config && this.$ELEMENT.config.select && this.$ELEMENT.config.select.allowCreate || false;
      }
    },
    value: {
      required: true
    },
    filterable: {
      type: Boolean,
      default: function _default() {
        return this.$ELEMENT && this.$ELEMENT.config && this.$ELEMENT.config.select && this.$ELEMENT.config.select.filterable || false;
      }
    },
    clearable: {
      type: Boolean,
      default: function _default() {
        return this.$ELEMENT && this.$ELEMENT.config && this.$ELEMENT.config.select && this.$ELEMENT.config.select.clearable || false;
      }
    },
    popperAppendToBody: {
      type: Boolean,
      default: function _default() {
        var configValue = this.$ELEMENT && this.$ELEMENT.config && this.$ELEMENT.config.select && this.$ELEMENT.config.select.popperAppendToBody;
        return configValue === undefined ? true : configValue;
      }
    }
  },

  data: function data() {
    return {
      esc: false // 是否用户按下 Esc

    };
  },

  watch: {
    // 在visible中添加离焦选中第一条的判断
    visible: function visible(val) {
      var _this = this;

      if (!val) {
        this.broadcast('ElSelectDropdown', 'destroyPopper');
        var input = this.$refs.input || this.$refs.reference;
        var query = input && input.value;
        if (query && query !== '' && this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount) {
          if (this.esc) return;
          this.handleOptionSelect(this.options[this.hoverIndex]);
          this.visible = val;
        }
      } else {
        this.broadcast('ElSelectDropdown', 'updatePopper');
        this.esc = false;
        // 当未有选中项时,selected为{value:'',currentLabel的空对象}判断选中项是否存在存在，this.selected.$el是否为选中项实例，
        if (this.selected.length && this.selected.length !== 0 || this.selected.$el) {
          var options = this.options;
          var indexArr = [];
          var num = -1;
          if (this.selected instanceof Array) {
            this.selected.map(function (selected) {
              num = options.findIndex(function (option) {
                return option.currentLabel === selected.currentLabel;
              });
              if (num !== -1) indexArr.push(num);
            });
          } else {
            num = this.options.findIndex(function (option) {
              return _this.selected.currentLabel === option.currentLabel;
            });
            if (num !== -1) indexArr.push(num);
          }

          if (indexArr.length !== 0) {
            this.hoverIndex = Math.min.apply(Math, indexArr);
          } else {
            this.clearHover();
          }
        } else {
          this.clearHover();
        }
      }
    },
    value: function value(val, oldVal) {
      if (this.multiple) {
        this.resetInputHeight();
        if (val && val.length > 0 || this.$refs.input && this.query !== '') {
          this.currentPlaceholder = '';
        } else {
          this.currentPlaceholder = this.cachedPlaceHolder;
        }
        if (this.filterable && !this.reserveKeyword) {
          this.query = '';
          this.handleQueryChange(this.query);
        }
      }
      this.setSelected();
      if (this.filterable && !this.multiple) {
        this.inputLength = 20;
      }
      if (!Object(util_["valueEquals"])(val, oldVal)) {
        this.dispatch('ElFormItem', 'el.form.change', val);
      }
    }
  },
  methods: {
    checkDefaultFirstOption: function checkDefaultFirstOption() {
      this.hoverIndex = -1;
      // highlight the created option
      var hasCreated = false;
      for (var i = this.options.length - 1; i >= 0; i--) {
        if (this.options[i].created) {
          hasCreated = true;
          this.hoverIndex = i;
          break;
        }
      }
      if (hasCreated) return;
      for (var _i = 0; _i !== this.options.length; ++_i) {
        var option = this.options[_i];
        if (this.query) {
          // highlight first options that passes the filter
          if (!option.disabled && !option.groupDisabled && option.visible) {
            this.hoverIndex = _i;
            break;
          }
        } else {
          // highlight currently selected option
          // 增加  option.hover的判断，确保hoverIndex与hover的选项一致
          if (option.hover /* || option.itemSelected */) {
              this.hoverIndex = _i;
              break;
            }
        }
      }
    },
    clearHover: function clearHover() {
      var _this2 = this;

      /*  无查询值清除hover且重置hoverIndex */
      this.$nextTick(function () {
        _this2.options.forEach(function (option) {
          option.hover = false;
        });
      });
      this.hoverIndex = -1;
    },
    handleClearClick: function handleClearClick() {
      var _Select$methods$handl;

      (_Select$methods$handl = external_element_ui_["Select"].methods.handleClearClick).call.apply(_Select$methods$handl, [this].concat(Array.prototype.slice.call(arguments)));
      if (this.focusOnClear) {
        this.focus();
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/select/src/GlSelect.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_GlSelectvue_type_script_lang_js_ = (GlSelectvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/select/src/GlSelect.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_GlSelectvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/select/src/GlSelect.vue"
/* harmony default export */ var GlSelect = (component.exports);
// CONCATENATED MODULE: ./packages/select/index.js


/* istanbul ignore next */
GlSelect.install = function (Vue) {
  Vue.component(GlSelect.name, GlSelect);
};

/* harmony default export */ var packages_select = __webpack_exports__["default"] = (GlSelect);

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/utils/util");

/***/ }),

/***/ 5:
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

/***/ 6:
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

/***/ })

/******/ });