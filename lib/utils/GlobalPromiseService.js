'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultGroupId = 'gillion-group-id';

// groupId => [promiseId, promiseId, ...]
var globalPromiseRegister = {};

/* 生成uuid */
function uuid() {
  var s = [];
  var hexDigits = '0123456789abcdef';
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits[Math.floor(Math.random() * 0x10)];
  }

  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits[s[19] & 0x3 | 0x8]; // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-';

  var uuid = s.join('');
  return uuid;
}

var GlobalPromiseService = function () {
  function GlobalPromiseService() {
    (0, _classCallCheck3.default)(this, GlobalPromiseService);
  }

  /**
   * 注册
   * @param groupId
   * @returns {string} 返回promiseId
   */
  GlobalPromiseService.register = function register(groupId) {
    if (!groupId) {
      groupId = defaultGroupId;
    }
    var promiseGroup = globalPromiseRegister[groupId];
    if (!promiseGroup) {
      globalPromiseRegister[groupId] = promiseGroup = [];
    }
    var promiseId = uuid();
    promiseGroup.push(promiseId);
    return promiseId;
  };

  /**
   * 清空
   * @param groupId
   */


  GlobalPromiseService.clear = function clear(groupId) {
    if (!groupId) {
      groupId = defaultGroupId;
    }
    globalPromiseRegister[groupId] = [];
  };

  /**
   * 移除
   * @param promiseId
   */


  GlobalPromiseService.remove = function remove(promiseId) {
    if (!promiseId) {
      window.console.error('GlobalPromiseService: promiseId is null.');
      return;
    }
    for (var groupId in globalPromiseRegister) {
      var promiseGroup = globalPromiseRegister[groupId];
      var index = promiseGroup.indexOf(promiseId);
      if (index >= 0) {
        promiseGroup.splice(index, 1);
      }
    }
  };

  /**
   * promise成功回调
   * @param promiseId
   */


  GlobalPromiseService.resolve = function resolve(promiseId) {
    GlobalPromiseService.remove(promiseId);
  };

  /**
   * 全局拦截，保证所有groupId的promise都移除后回调callback
   * @param callback
   * @param groupId
   */


  GlobalPromiseService.callback = function callback(_callback, groupId) {
    // 都已完成，直接回调
    if (GlobalPromiseService._isAllGroupPromiseFinished(groupId)) {
      _callback();
    } else {
      // 采用定时器轮询
      var timerId = setInterval(function () {
        if (GlobalPromiseService._isAllGroupPromiseFinished(groupId)) {
          clearInterval(timerId);
          _callback();
        }
      }, 100);
    }
  };

  GlobalPromiseService._isAllGroupPromiseFinished = function _isAllGroupPromiseFinished(groupId) {
    if (!groupId) {
      groupId = defaultGroupId;
    }
    var promiseGroup = globalPromiseRegister[groupId];
    return !promiseGroup || promiseGroup.length == 0;
  };

  return GlobalPromiseService;
}();

// export {GlobalPromiseService};


exports.default = GlobalPromiseService;