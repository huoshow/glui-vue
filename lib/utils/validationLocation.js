'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

exports.scrollErrorItemIntoView = scrollErrorItemIntoView;

var _focusComponent = require('./focusComponent');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ERROR_ITEM_SELECTOR = '.el-form-item.is-error';
var EL_CONTROL_TAGS = new _set2.default(['el-associate', 'el-radio', 'el-radio-group', 'el-radio-button', 'el-checkbox', 'el-checkbox-group', 'el-checkbox-button', 'el-input', 'el-autocomplete', 'el-input-number', 'el-select', 'el-cascader', 'el-switch', 'el-slider', 'el-time-select', 'el-time-picker', 'el-date-picker', 'el-upload', 'el-uploader', 'el-rate']);

/**
 * 定位第一个校验未通过的元素
 * @param {*} options
 */
function scrollErrorItemIntoView() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var opt = (0, _extends3.default)({
    container: this, // 定位的容器组件或 Dom 元素，默认为调用方法的组件
    selector: ERROR_ITEM_SELECTOR, // 获取第一个校验未通过 FormItem 组件 Dom 元素 的选择器，默认为 '.el-form-item.is-error'
    offset: 0, // 第一个校验未通过 FormItem 滚动到距离窗口顶部的偏移量，默认 0
    focus: true, // 是否让未通过校验的控件进入焦点状态，默认为 true
    smooth: false, // 是否平滑滚动，默认 false
    focusHandle: function focusHandle() {
      return true;
    } }, options);
  var container = opt.container,
      selector = opt.selector,
      offset = opt.offset,
      smooth = opt.smooth,
      focus = opt.focus,
      focusHandle = opt.focusHandle;
  /** @type {HTMLElement} */

  var root = container.$el || container;
  var errorItem = root.querySelector(selector);
  if (!errorItem) {
    return;
  }
  var offsetItem = createOffsetItem(errorItem, offset);
  offsetItem.scrollIntoView({
    behavior: smooth ? 'smooth' : 'auto'
  });
  if (offset) {
    offsetItem.remove();
  }
  var component = getComponent(errorItem);
  if (focus) {
    if (focusHandle(errorItem.__vue__) === false) {
      return;
    }
    if (component) {
      (0, _focusComponent.focusComponent)(component);
    }
  }
}

/**
 * 创建并返回偏移定位元素，无偏移量直接返回父元素
 * @param {HTMLElement} parent
 * @param {number} offset
 */
function createOffsetItem(parent, offset) {
  if (!offset) {
    return parent;
  }
  var firstChild = parent.firstChild;
  var offsetItem = document.createElement('div');
  offsetItem.style.position = 'relative';
  offsetItem.style.top = -offset + 'px';
  offsetItem.style.height = '1px';
  if (firstChild) {
    parent.insertBefore(offsetItem, firstChild);
  } else {
    parent.appendChild(offsetItem);
  }
  return offsetItem;
}

/**
 *
 * @param {HTMLElement} errorItem
 */
function getComponent(errorItem) {
  var formItemCompoent = errorItem.__vue__;
  return walk([formItemCompoent]);;
  function walk(components) {
    for (var index = 0; index < components.length; index++) {
      var component = components[index];
      if (isControl(component)) {
        return component;
      }
      var c = walk(component.$children || []);
      if (c) {
        return c;
      }
    }
  }
}

/**
 * 判断是否 el 控件
*/
function isControl(component) {
  var tag = (0, _focusComponent.getComponentTagName)(component);
  return EL_CONTROL_TAGS.has(tag);
}