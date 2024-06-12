'use strict';

exports.__esModule = true;
exports.focusComponent = focusComponent;
exports.getComponentTagName = getComponentTagName;
/* 让控件进入焦点 */
function focusComponent(component) {
  if (!component) {
    console.warn('Component is Empty.');
    return;
  }
  var tagName = getComponentTagName(component);
  var ele = void 0;
  var upload = void 0;
  var elUpload = void 0;
  try {
    switch (tagName) {
      case 'el-associate':
      case 'el-select':
      case 'el-input':
      case 'el-autocomplete':
      case 'el-input-number':
      case 'el-switch':
      case 'el-time-select':
      case 'el-time-picker':
      case 'el-cascader':
        component.focus();
        break;
      case 'el-date-picker':
        component.focus();
        if (component.ranged) {
          component.$el.querySelector('input.el-range-input').focus();
        }
        break;
      case 'el-radio':
      case 'el-radio-button':
      case 'el-radio-group':
        ele = component.$el.querySelector('[type="radio"]');
        ele && ele.focus();
        break;
      case 'el-checkbox':
      case 'el-checkbox-group':
      case 'el-checkbox-button':
        ele = component.$el.querySelector('[type="checkbox"]');
        ele && ele.focus();
        break;
      case 'el-slider':
        ele = component.$el.querySelector('.el-slider__button-wrapper');
        ele && ele.focus();
        break;
      case 'el-upload':
        upload = component.$children.find(function (v) {
          return v.$options._componentTag === 'upload';
        });
        upload && upload.$el && upload.$el.focus();
        break;
      case 'el-uploader':
        elUpload = component.$children.find(function (v) {
          return v.$options._componentTag === 'el-upload';
        });
        upload = elUpload && elUpload.$children.find(function (v) {
          return v.$options._componentTag === 'upload';
        });
        upload && upload.$el && upload.$el.focus();
        break;
      case 'el-rate':
        component.$el.focus();
        break;
    }
  } catch (e) {
    console.warn(e);
  }
}

/* 获取组件标签名 */
function getComponentTagName(component) {
  var tagName = component && component.$options && component.$options._componentTag;
  return tagName;
}