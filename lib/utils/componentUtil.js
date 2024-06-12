'use strict';

exports.__esModule = true;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _busUtil = require('./busUtil');

var _busUtil2 = _interopRequireDefault(_busUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// class ComponentUtil {
//   currentVm = null;
//   currentDialogs = [];

//   setCurrentPage(vm) {
//     if (vm !== this.currentVm) {
//       this.currentVm = vm;
//       this.currentDialogs = []
//     }
//   }

//   //获取活动状态的页面
//   getActivePage() {
//     return this.currentVm;
//   }

//   //获取活动状态的窗体，没有则返回false
//   getActiveDialog() {
//     if (this.currentDialogs.length === 0) return null;
//     return this.currentDialogs[this.currentDialogs.length - 1];
//   }
// }

var ComponentUtil = function ComponentUtil() {
  this.currentVm = null;
  this.currentDialogs = [];
};

ComponentUtil.prototype.setCurrentPage = function (vm) {
  var isParent = false;
  if (this.currentVm) {
    var parent = this.currentVm;
    while (parent.$parent) {
      if (parent.$parent === vm) {
        isParent = true;
        break;
      } else {
        parent = parent.$parent;
      }
    }
  }
  if (vm !== this.currentVm && !isParent) {
    this.currentVm = vm;
    this.currentDialogs = [];
  }
};

ComponentUtil.prototype.getActivePage = function () {
  return this.currentVm;
};

ComponentUtil.prototype.getActiveDialog = function () {
  if (this.currentDialogs.length === 0) return null;
  return this.currentDialogs[this.currentDialogs.length - 1];
};

ComponentUtil.prototype.getActiveComponent = function () {
  var dialog = this.getActiveDialog();
  if (!dialog) return dialog;
  return this.getActivePage();
};

var instance = new ComponentUtil();

setTimeout(function () {
  _vue2.default.mixin({
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
      next(function (vm) {
        instance.setCurrentPage(vm);
      });
    }
  });
}, 0);

_busUtil2.default.$on('gl-dialog-visible', function (vm, visible) {
  var index = instance.currentDialogs.indexOf(vm);
  if (visible) {
    if (index > -1) return;
    instance.currentDialogs.push(vm);
  } else {
    if (index === -1) return;
    instance.currentDialogs.splice(index, 1);
  }
});

_busUtil2.default.$on('gl-permissions-update', function () {
  instance.currentVm && instance.currentVm.$forceUpdate();
});

window.addEventListener('popstate', function (e) {
  var dialog = instance.getActiveDialog();
  if (dialog === null) return;
  dialog.close();
}, false);

exports.default = instance;