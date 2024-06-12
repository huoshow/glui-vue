'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _componentUtil = require('./componentUtil');

var _componentUtil2 = _interopRequireDefault(_componentUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// key => callback
var globalKeyRegister = {};

// key = > callback + components
var componentKeyRegister = {};

// keyObject结构
// const keyObject = {
//   ctrl: true,
//   shift: true,
//   alt: true,
//   key: 'A' | 95,
// };

function createKeyObject(e) {
  return {
    ctrl: e.ctrlKey,
    shift: e.shiftKey,
    alt: e.altKey,
    key: e.key ? e.key : e.keyCode
  };
}

function formatKeyObject(keyObject) {
  var keyObj = {
    ctrl: keyObject.ctrl ? keyObject.ctrl : false,
    shift: keyObject.shift ? keyObject.shift : false,
    alt: keyObject.alt ? keyObject.alt : false,
    key: keyObject.key
  };
  return (0, _stringify2.default)(keyObj);
}

function getActiveWindowComponent() {
  var component = _componentUtil2.default.getActiveDialog();
  if (!component) {
    component = _componentUtil2.default.getActivePage();
  }

  if (!component) {
    window.console.error('HotKeyService: Window component is null.');
  }

  return component;
}

var HotKeyService = function () {
  function HotKeyService() {
    (0, _classCallCheck3.default)(this, HotKeyService);

    document.addEventListener('keydown', function (e) {
      if (event.defaultPrevented) {
        return; // Should do nothing if the default action has been cancelled
      }

      if (!(e && e.key)) {
        return;
      }

      var key = e.key.toLowerCase();
      if (key === 'control' || key === 'alt' || key === 'shift') {
        return; // ignore System Modifier Keys
      }

      var keyObj = formatKeyObject(createKeyObject(e));
      //console.log('keyObj: ' + keyObj);

      var componentCallbackMap = componentKeyRegister[keyObj]; //组件内的快捷键
      var globalCallback = globalKeyRegister[keyObj];
      if (componentCallbackMap) {
        var component = getActiveWindowComponent();
        if (component) {
          var callback = componentCallbackMap[component._uid];
          if (callback) {
            callback(e, component);
          } else {
            /*没有匹配到组件快捷键则执行全局*/
            if (globalCallback) {
              globalCallback(e);
            }
          }
        }
      } else {
        if (globalCallback) {
          globalCallback(e);
        }
      }
    }, true);
  }

  // 声明注册全局快捷键


  HotKeyService.prototype.registerGlobal = function registerGlobal(keyObject, callback) {
    var keyObj = formatKeyObject(keyObject);
    globalKeyRegister[keyObj] = callback;
  };

  // 注册组件快捷键


  HotKeyService.prototype.register = function register(component, keyObject, callback) {
    if (!component || !component._uid) {
      window.console.error('HotKeyService: only component instance can register key.');
      return;
    }

    var keyObj = formatKeyObject(keyObject);
    var componentObj = componentKeyRegister[keyObj];
    if (!componentObj) {
      componentKeyRegister[keyObj] = {};
    }

    componentKeyRegister[keyObj][component._uid] = callback;
  };

  return HotKeyService;
}();

// let hotKeyService = new HotKeyService;

// export {
//   hotKeyService,
// };

exports.default = new HotKeyService();