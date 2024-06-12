"use strict";

exports.__esModule = true;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _set = require("babel-runtime/core-js/set");

var _set2 = _interopRequireDefault(_set);

var _elementUi = require("element-ui");

var _vue = require("vue");

var _vue2 = _interopRequireDefault(_vue);

var _componentUtil = require("./componentUtil");

var _componentUtil2 = _interopRequireDefault(_componentUtil);

var _focusComponent = require("./focusComponent");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EL_CONTROL_TAGS = new _set2.default(["el-associate", "el-radio", "el-radio-group", "el-radio-button", "el-checkbox", "el-checkbox-group", "el-checkbox-button", "el-input", "el-autocomplete", "el-input-number", "el-select", "el-cascader",
// 'el-switch',
"el-slider", "el-time-select", "el-time-picker", "el-date-picker",
// 'el-upload',
// 'el-uploader',
"el-rate"]);

//  config
//界面组件管理器
var globalConfigRegister = {};

//  component => config
var componentConfigRegister = {};

/*默认按键*/
var defaultKey = {
  resetKey: {
    ctrl: false,
    shift: false,
    alt: false,
    key: "F1"
  },
  nextKey: {
    ctrl: false,
    shift: false,
    alt: false,
    key: isIE() ? "Down" : "ArrowDown"
  },
  prevKey: {
    ctrl: false,
    shift: false,
    alt: false,
    key: isIE() ? "Up" : "ArrowUp"
  }
};

//判断是否ie
function isIE() {
  if (!!window.ActiveXObject || "ActiveXObject" in window) return true;else return false;
}

function createConfigObject(e) {
  return {
    ignoreCase: e.ignoreCase != undefined ? e.ignoreCase : true, //默认为true
    fieldProp: e.fieldProp ? e.fieldProp : "field", //默认为field
    keyProp: e.keyProp ? e.keyProp : "key", //默认为key
    labelProp: e.labelProp ? e.labelProp : "label", //默认为label
    indexProp: e.indexProp ? e.indexProp : "index", //默认为index
    jumpMultiple: e.jumpMultiple != undefined ? e.jumpMultiple : false, //默认为false
    getElement: e.getElement ? e.getElement : null, //自定义获取控件的方法
    resetKey: e.resetKey === "default" ? defaultKey.resetKey : e.resetKey || {}, //重置键
    nextKey: e.nextKey === "default" ? defaultKey.nextKey : e.nextKey || {}, //下一个焦点
    prevKey: e.prevKey === "default" ? defaultKey.prevKey : e.prevKey || {}, //上一个焦点
    indexes: e.indexes || [], //索引集合
    keyDownHandle: e.keyDownHandle
  };
}

function createKeyObject(e, ignoreCase) {
  return (0, _stringify2.default)({
    ctrl: e.ctrlKey,
    shift: e.shiftKey,
    alt: e.altKey,
    key: e.key ? ignoreCase ? e.key.toLowerCase() : e.key : e.keyCode
  });
}

/* 数组去重 */
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log("type error!");
    return;
  }
  var array = [];
  for (var i = 0; i < arr.length; i++) {
    if (array.indexOf(arr[i]) === -1) {
      array.push(arr[i]);
    }
  }
  return array;
}

/* 获取当前活动的页面 */
function getActiveWindowComponent() {
  var component = _componentUtil2.default.getActiveDialog();
  if (!component) {
    component = _componentUtil2.default.getActivePage();
  }
  if (!component && process.env.NODE_ENV === "development") {
    window.console.error("Window component is null.");
  }
  return component;
}

/*查找当前定位的点*/
function nowFocusNameElIdx(config) {
  /*获取dom*/
  var focusedEl = document.activeElement;
  var index = null;
  var subIdx = null;
  /*判断当前的位置*/
  if (typeof config.getElement === "function") {
    var isEqualIndex = false;
    var nowComponentList = config.getElement(config.indexes[tabIndexService.index]); //自定义获取组件列表
    var listType = Object.prototype.toString.call(nowComponentList);
    if (listType !== "[object Array]" && componentList !== null) {
      return window.console.error("getElement function callback must be Array or null");
    }
    nowComponentList == null ? nowComponentList = [] : nowComponentList;

    nowComponentList.forEach(function (item, index) {
      var componentTagName = item.$options._componentTag;
      if (componentTagName == "el-radio" || componentTagName == "el-checkbox") {
        if (item.focus) {
          subIdx = index;
        }
      }
    });

    if (!isEqualIndex) {
      for (var i in config.indexes) {
        var getComponentList = config.getElement(config.indexes[i]);
        var _listType = Object.prototype.toString.call(getComponentList);
        if (_listType !== "[object Array]" && getDomList == null) {
          return window.console.error("getElement function callback must be Array or null");
        }
        getComponentList == null ? getComponentList = [] : getComponentList;
        if (getComponentList != null) {
          for (var j = 0; j < getComponentList.length; j++) {
            var componentTagName = getComponentList[j].$options._componentTag;
            if (componentTagName == "el-radio" || componentTagName == "el-checkbox") {
              if (getComponentList[j].focus) {
                index = i;
                subIdx = j;
                break;
              }
            }
          }
        }
      }
    }
  } else if (focusedEl.name) {
    //系统默认取组件 name属性
    subIdx = 0;
    for (var _i in config.indexes) {
      if (config.indexes[_i][config.fieldProp] === focusedEl.name) {
        index = _i;
        break;
      }
    }

    var count = null;
    var hasName = false;
    tabIndexService.indexComponent.forEach(function (item, index) {
      if ((item.name || item.$attrs.name) === focusedEl.name) {
        hasName = true;
        count === null ? count = 0 : count++;
        // 获取组件的焦点状态  处理el-select children [0] el-cascader children[0]/ / el-switch(单个不做处理)  /  el-checkbox input 焦点  / el-radio  input  焦点  /  time,date children[0]
        var _componentTagName = item.$options._componentTag; // 判断组件类型
        if (_componentTagName == "el-radio" || _componentTagName == "el-checkbox") {
          if (item.focus) {
            subIdx = count;
          }
        }
      }
    });

    // 解决弹窗 父组件 按钮 submit focus 问题
    if (!hasName) {
      subIdx = null;
    }
  }
  return { index: index, subIdx: subIdx };
}

/*兼容 closet方法*/
function closetEl(el, tagName) {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }
  if (!Element.prototype.closest) Element.prototype.closest = function (s) {
    var el = this;
    if (!document.documentElement.contains(el)) return null;
    do {
      if (el.matches(s)) return el;
      el = el.parentElement;
    } while (el !== null);
    return null;
  };
  return el.closest(tagName);
}

/*判断元素是否显示和disabled*/
function isVisible(e) {
  return !!((e.offsetWidth || e.offsetHeight || e.getClientRects().length) && !e.disabled);
}

/*配置建议*/
function configSuggestions(config) {
  var arr = [];
  for (var key in config) {
    var keyValue = config[key];
    if (key == "fieldProp" || key == "keyProp" || key == "labelProp" || key == "indexProp") {
      arr.push(keyValue);
    }
  }
  if (new _set2.default(arr).size !== arr.length) {
    window.console.error("fieldProp,keyProp,labelProp,indexProp 不能相同");
    return false;
  }
  return true;
}

/* 遍历组件 */
function flatten(data, indexList, isDefaultJump) {
  var indexListArr = indexList;
  // let sortedItems = data.filter(item => item.name || item.$attrs.name);
  var sortedItems = data.sort(function (a, b) {
    var posA = getComponentPosition(a);
    var posB = getComponentPosition(b);
    var isCol = (0, _focusComponent.getComponentTagName)(a) === "el-col" && (0, _focusComponent.getComponentTagName)(b) === "el-col";
    return posA.top === posB.top || isCol ? posA.left - posB.left : posA.top - posB.top;
  });
  for (var _iterator = sortedItems, _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
    var _ref;

    if (_isArray) {
      if (_i2 >= _iterator.length) break;
      _ref = _iterator[_i2++];
    } else {
      _i2 = _iterator.next();
      if (_i2.done) break;
      _ref = _i2.value;
    }

    var item = _ref;

    var isControl = isControlComponent(item);
    var hasName = item.name || item.$attrs.name;
    if (isDefaultJump ? isControl : hasName) {
      indexListArr.push(item);
      continue;
    }
    if (!isControl && item.$children.length !== 0 && !isIgnoreComponent(item)) {
      flatten(item.$children, indexListArr, isDefaultJump);
    }
  }
  return indexListArr;
}

/* 判断组件是否是表单控件 */
function isControlComponent(component) {
  var tagName = (0, _focusComponent.getComponentTagName)(component);
  if (!tagName) {
    return false;
  }
  return EL_CONTROL_TAGS.has(tagName);
}

function isIgnoreComponent(component) {
  var tagName = (0, _focusComponent.getComponentTagName)(component);
  if (!tagName) {
    return false;
  }
  return tagName === "hot-table" || tagName === "el-dialog";
}

/* 获取组件元素坐标区域 */
function getComponentPosition(component) {
  if (!inDoc(component.$el)) {
    return {
      top: Infinity,
      left: Infinity
    };
  }
  var rect = component.$el && component.$el.getBoundingClientRect && component.$el.getBoundingClientRect() || {};
  return {
    top: rect.top === undefined ? Infinity : rect.top,
    left: rect.left === undefined ? Infinity : rect.left
  };
}

/* 判断组件是否在当前 Document 内 */
function inDoc(node) {
  if (!node) return false;
  var doc = node.ownerDocument.documentElement;
  var parent = node.parentNode;
  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
}

/* 让组件离开焦点 */
function blur(component) {
  try {
    if (component && typeof component.blur === "function") {
      component.blur();
    }
    if (component && typeof component.hidePicker === "function") {
      component.hidePicker();
    }
  } catch (e) {
    console.warn(e);
  }
}

var TabIndexService = function () {
  function TabIndexService() {
    var _this = this;

    (0, _classCallCheck3.default)(this, TabIndexService);

    this.index = 0; //索引
    this.config = {}; //当前配置
    this.component = {}; //当前组件
    this.indexComponent = []; //name组件列表
    document.addEventListener("keydown", function (e) {
      _this.keyDown(e);
    });
  }
  /* 焦点切换 */


  TabIndexService.prototype.keyDown = function keyDown(e) {
    if (e["__fromHotTable"]) {
      return;
    }
    if (e.key) {
      var key = e.key.toLowerCase();
      if (key === "control" || key === "alt" || key === "shift") {
        return; // ignore System Modifier Keys
      }
    }

    /*获取当前活跃组件，当前活跃组件改变时改变重新注册*/
    var component = getActiveWindowComponent();
    var dialogComponent = _componentUtil2.default.getActiveDialog();
    var pageComponent = _componentUtil2.default.getActivePage();
    var currentConfig = void 0;
    if (!component) return;
    if (dialogComponent) {
      currentConfig = componentConfigRegister[dialogComponent._uid];
    } else if (pageComponent) {
      currentConfig = componentConfigRegister[pageComponent._uid];
    }
    var isChange = component._uid === this.component._uid ? false : true;
    if (component) {
      if (isChange) {
        this.component = component;
        if (currentConfig) {
          var config = createConfigObject(currentConfig);
          this.config = config;
          var indexes = this.config.indexes;
          indexes.sort(function (a, b) {
            return a[config.indexProp] - b[config.indexProp];
          });
          this.config.indexes = indexes;
          //获取组件实例列表
          this.getComponentElName("part"); //局部定义
        } else {
          this.config = createConfigObject(globalConfigRegister);
          this.getComponentElName();
        }
        this.index = 0;
      }
    } else {
      return;
    }
    // if (this.config.indexes.length == 0) return; //阻止indexes未空的行为
    var keyObj = createKeyObject(e, this.config.ignoreCase);

    if (this.config.keyDownHandle) {
      var currentIndex = this.isDefaultJump() ? this.getDefaultFocusIdx() : nowFocusNameElIdx(this.config, this.index);
      if (currentIndex && currentIndex.index > -1) {
        var opts = {
          event: e,
          config: this.config,
          keyObj: JSON.parse(keyObj),
          windowComponent: component,
          indexComponent: this.indexComponent,
          currentIndex: currentIndex,
          currentComponet: this.indexComponent[currentIndex.index]
        };
        var result = this.config.keyDownHandle(opts);
        if (result === false) {
          return;
        } else if (result === "next" || result === "prev" || result === "reset") {
          this.changeFocus(result);
          return;
        }
      }
    }

    /*执行规则方法*/
    this.changeFocus(keyObj);
  };

  TabIndexService.prototype.refresh = function refresh() {
    var _this2 = this;

    setTimeout(function () {
      var component = getActiveWindowComponent();
      _this2.getComponentElName(null, component);
    }, 0);
  };

  TabIndexService.prototype.isDefaultJump = function isDefaultJump() {
    return !(this.config.indexex && this.config.indexes.length);
  };

  /*对应规则*/


  TabIndexService.prototype.changeFocus = function changeFocus(keyObj) {
    var isDefaultJump = this.isDefaultJump();
    var nowIndexObj = isDefaultJump ? this.getDefaultFocusIdx() : nowFocusNameElIdx(this.config, this.index);
    var subIndex = nowIndexObj.subIdx;

    switch (keyObj) {
      case "reset":
      case this.config.ignoreCase ? (0, _stringify2.default)(this.config.resetKey).toLowerCase() : (0, _stringify2.default)(this.config.resetKey):
        /*reset*/
        if (isDefaultJump) {
          this.setFocusElementDefault("reset");
          break;
        }
        this.index = 0;
        subIndex = null;
        this.setFocusElement("reset", subIndex);
        break;
      case "prev":
      case this.config.ignoreCase ? (0, _stringify2.default)(this.config.prevKey).toLowerCase() : (0, _stringify2.default)(this.config.prevKey):
        /*prev*/
        if (isDefaultJump) {
          this.setFocusElementDefault("prev");
          break;
        }
        if (nowIndexObj.index == null) {
          this.index = this.config.indexes.length - 1;
        } else {
          this.index = nowIndexObj.index;
        }
        this.setFocusElement("prev", subIndex);
        break;
      case "next":
      case this.config.ignoreCase ? (0, _stringify2.default)(this.config.nextKey).toLowerCase() : (0, _stringify2.default)(this.config.nextKey):
        /*next*/
        if (isDefaultJump) {
          this.setFocusElementDefault("next");
          break;
        }
        if (nowIndexObj.index == null) {
          this.index = 0;
        } else {
          this.index = nowIndexObj.index;
        }
        this.setFocusElement("next", subIndex);
        break;
      default:
        if (isDefaultJump) {
          break;
        }
        for (var i in this.config.indexes) {
          if (this.config.indexes[i][this.config.keyProp]) {
            var otherKey = this.config.ignoreCase ? (0, _stringify2.default)(this.config.indexes[i][this.config.keyProp]).toLowerCase() : (0, _stringify2.default)(this.config.indexes[i][this.config.keyProp]);
            if (otherKey === keyObj) {
              this.index = i;
              this.setFocusElement("position", subIndex);
            }
          }
        }
        break;
    }
  };

  TabIndexService.prototype.getDefaultFocusIdx = function getDefaultFocusIdx() {
    var focusedEl = document.activeElement;
    var index = this.indexComponent.findIndex(function (c) {
      return c.$el === focusedEl || c.$el.contains(focusedEl);
    });
    this.index = index;
    return { index: index };
  };

  TabIndexService.prototype.setFocusElement = function setFocusElement(type, subIndex) {
    isIE() ? window.event.returnValue = false : window.event.preventDefault(); //阻止默认操作
    var that = this;
    var index = that.index;
    do {
      var componentNameList = [];
      if (typeof that.config.getElement === "function") {
        componentNameList = that.config.getElement(that.config.indexes[index]); //返回的 实例数组
        if (Object.prototype.toString.call(componentNameList) !== "[object Array]" && componentList !== null) {
          return window.console.error("getElement function callback must be Array or null");
        }
        componentNameList == null ? componentNameList = [] : componentNameList;
      } else {
        for (var _iterator2 = this.indexComponent, _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
          var _ref2;

          if (_isArray2) {
            if (_i3 >= _iterator2.length) break;
            _ref2 = _iterator2[_i3++];
          } else {
            _i3 = _iterator2.next();
            if (_i3.done) break;
            _ref2 = _i3.value;
          }

          var item = _ref2;

          if ((item.name || item.$attrs.name) == that.config.indexes[index][that.config.fieldProp]) {
            componentNameList.push(item);
          }
        }
      }
      var currentTagName = componentNameList[subIndex == null ? 0 : subIndex].$options._componentTag;
      if (currentTagName === "el-date-picker" || currentTagName === "el-time-picker" || currentTagName == "el-autocomplete") {
        var curItem = componentNameList[subIndex == null ? 0 : subIndex];
        if (curItem.suggestionVisible) {
          curItem.close();
        } else if (curItem.pickerVisible) {
          curItem.hidePicker();
        }
      }

      /*是否跳过该焦点*/
      var isJump = that.config.indexes[index].jumpMultiple != undefined ? that.config.indexes[index].jumpMultiple : that.config.jumpMultiple;
      if (subIndex == null || type == "reset" || type == "position") {
        for (var _iterator3 = componentNameList, _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
          var _ref3;

          if (_isArray3) {
            if (_i4 >= _iterator3.length) break;
            _ref3 = _iterator3[_i4++];
          } else {
            _i4 = _iterator3.next();
            if (_i4.done) break;
            _ref3 = _i4.value;
          }

          var _item = _ref3;

          if (!_item.disabled && _item.$el.style.display != "none") {
            //判断元素是否显示和disabled
            var tagName = _item.$options._componentTag;
            if (tagName == "el-checkbox" || tagName == "el-radio") {
              _item.focus = true;
              _item.$el.childNodes[0].children[1].focus();
            } else if (tagName == "el-select" || tagName == "el-cascader" || tagName == "el-autocomplete" || tagName == "el-associate" || tagName == "el-time-picker" || tagName == "el-date-picker" || tagName == "el-input-number") {
              _item.$children[0].focus();
            } else if (tagName == "el-button") {
              _item.$el.focus();
            } else if (tagName == "el-input" || tagName == "el-switch") {
              _item.focus();
            }
            this.index = index;
            return;
          }
        }
        if (type == "position") return;
      } else {
        if (!isJump) {
          //false
          do {
            /*判断跳出*/
            if (type == "prev" && subIndex == 0 || type == "next" && subIndex == componentNameList.length - 1) {
              break;
            }
            /* 判断当前元素的下拉框是否显示 */

            var nextSub = type == "next" ? subIndex + 1 : subIndex - 1;
            if (!componentNameList[nextSub].disabled && componentNameList[nextSub].$el.style.display != "none") {
              var _tagName = componentNameList[nextSub].$options._componentTag;
              if (_tagName == "el-checkbox" || _tagName == "el-radio") {
                componentNameList[nextSub].focus = true;
                componentNameList[nextSub].$el.childNodes[0].children[1].focus();
              } else if (_tagName == "el-select" || _tagName == "el-cascader" || _tagName == "el-autocomplete" || _tagName == "el-associate" || _tagName == "el-time-picker" || _tagName == "el-date-picker" || _tagName == "el-input-number") {
                componentNameList[nextSub].$children[0].focus();
              } else if (_tagName == "el-button") {
                componentNameList[nextSub].$el.focus();
              } else {
                componentNameList[nextSub].focus();
              }
              this.index = index;
              return;
            }
            type == "next" ? subIndex++ : subIndex--;
          } while (subIndex >= 0 && subIndex <= componentNameList.length - 1);
        }
      }
      subIndex = null;
      if (type == "reset" || type == "next") {
        index++;
      } else {
        index--;
      }
    } while (index >= 0 && index <= that.config.indexes.length - 1);
  };

  TabIndexService.prototype.setFocusElementDefault = function setFocusElementDefault(type) {
    isIE() ? window.event.returnValue = false : window.event.preventDefault(); //阻止默认操作
    var currentIndex = this.index;
    var currentComponent = this.indexComponent[currentIndex];
    var nextComponent = void 0;
    var count = this.indexComponent.length;
    var index = currentIndex;
    var loopCount = 0;
    while (true) {
      var breakWhile = false;
      loopCount++;
      switch (type) {
        case "reset":
          index = 0;
          nextComponent = this.indexComponent[index];
          breakWhile = true;
          break;
        case "next":
          index++;
          if (index > count - 1) {
            index = 0;
          }
          nextComponent = this.indexComponent[index];
          if (nextComponent.disabled) {
            nextComponent = null;
          } else {
            breakWhile = true;
          }
          break;
        case "prev":
          index--;
          if (index < 0) {
            index = count - 1;
          }
          nextComponent = this.indexComponent[index];
          if (nextComponent.disabled) {
            nextComponent = null;
          } else {
            breakWhile = true;
          }
          break;
        default:
          breakWhile = true;
          break;
      }
      if (breakWhile || loopCount >= count) {
        break;
      }
    }
    if (nextComponent) {
      this.index = index;
      blur(currentComponent);
      (0, _focusComponent.focusComponent)(nextComponent);
    }
  };

  TabIndexService.prototype.getComponentElName = function getComponentElName(type, component) {
    var _this3 = this;

    component = component || this.component;

    if (!component) {
      return null;
    }
    var indexesArr = [];
    var nameArr = [];
    var componentList = flatten(component.$children, [], this.isDefaultJump());
    var that = this;
    this.indexComponent = componentList; //赋值给组件列表

    var _loop = function _loop(item) {
      var tagName = item.$options._componentTag;
      //阻止联想控件，select 组件默认行为
      if (tagName === "el-select" || tagName === "el-associate") {
        var input = item.$vnode.elm.children[0].children[0];
        // console.log(input);
        input.onkeydown = function (e) {
          if (item.visible) {
            return;
          }
          window.event ? window.event.cancelBubble = true : e.stopPropagation(); // 阻止向上冒泡
          // 阻止默认行为
          if (event && event.preventDefault) event.preventDefault();else window.event.returnValue = false;
          that.keyDown(e);
        };
      } else if (tagName === "el-date-picker") {
        inputs = item.$el.querySelectorAll("input.el-input__inner,input.el-range-input");

        inputs.forEach(function (_input) {
          _input.onkeydown = function (e) {
            that.keyDown(e);
          };
        });
      }
      if (item.name || item.$attrs.name) {
        nameArr.push(item.name || item.$attrs.name);
      }
    };

    for (var _iterator4 = this.indexComponent, _isArray4 = Array.isArray(_iterator4), _i5 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3.default)(_iterator4);;) {
      var _ref4;

      if (_isArray4) {
        if (_i5 >= _iterator4.length) break;
        _ref4 = _iterator4[_i5++];
      } else {
        _i5 = _iterator4.next();
        if (_i5.done) break;
        _ref4 = _i5.value;
      }

      var item = _ref4;
      var inputs;

      _loop(item);
    }
    if (type == "part" || this.isDefaultJump()) {
      return;
    }
    if (nameArr.length != 0) {
      nameArr = unique(nameArr); //去重
      console.log(nameArr);
      nameArr.forEach(function (item, index) {
        var nameObj = {};
        nameObj[_this3.config.fieldProp] = item;
        nameObj[_this3.config.labelProp] = item + _this3.config.labelProp.charAt(0).toUpperCase() + _this3.config.labelProp.slice(1);
        nameObj[_this3.config.indexProp] = index;
        indexesArr.push(nameObj);
      });
    }
    return indexesArr;
  };

  TabIndexService.prototype.registerGlobal = function registerGlobal(config) {
    /*config valid*/
    if (configSuggestions(config)) {
      globalConfigRegister = config;
    }
  };

  TabIndexService.prototype.register = function register(component, config) {
    if (!component || !component._uid) {
      window.console.error("only component instance can register key.");
      return;
    }
    if (configSuggestions(config)) {
      componentConfigRegister[component._uid] = config;
      _vue2.default.nextTick(function () {
        window.console.log(component);
      });
    }
  };

  return TabIndexService;
}();

var tabIndexService = new TabIndexService();

exports.default = tabIndexService;