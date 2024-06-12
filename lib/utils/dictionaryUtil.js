'use strict';

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _ecDictionaryService = require('./ecService/ecDictionaryService');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StoreStrategy = function () {

  // store = null;
  // method = null;

  function StoreStrategy(store, method) {
    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _classCallCheck3.default)(this, StoreStrategy);

    var _this = this;
    this.store = store;
    this.method = method || _ecDictionaryService.getEcDictionary;
    this.config = config;
    this.store.registerModule('glDict', {
      state: {
        data: {}
      },
      mutations: {
        addDictionary: function addDictionary(state, payload) {
          if (!payload) return;
          for (var key in payload) {
            state.data[key] = payload[key];
          }
        },
        deleteDictionary: function deleteDictionary(state, payload) {
          if (!payload) return;
          var keyList = Array.isArray(payload) ? payload : [payload];
          for (var key in keyList) {
            delete state.data[key];
          }
        }
      },
      actions: {
        addDictionary: function addDictionary(_ref, payload) {
          var commit = _ref.commit,
              state = _ref.state;

          var keyList = Array.isArray(payload) ? payload : [payload];
          var requestKeyList = keyList.filter(function (k) {
            return !state.data[k];
          });
          return new _promise2.default(function (resolve) {
            if (requestKeyList.length === 0) {
              var resultData = _this._get(keyList);
              resolve(resultData);
            } else {
              _this.method(requestKeyList, _this.config).then(function (data) {
                commit('addDictionary', data);
                var resultData = _this._get(keyList);
                resolve(resultData);
              });
            }
          });
        }
      },
      getters: {}
    });
  }

  StoreStrategy.prototype.init = function init(key) {
    return this.store.dispatch('addDictionary', key);
  };

  StoreStrategy.prototype.get = function get(key, remote) {
    if (remote === true) {
      return this.store.dispatch('addDictionary', key);
    } else {
      var data = this._get(key);
      return Array.isArray(key) ? data : data[key];
    }
  };

  StoreStrategy.prototype.delete = function _delete(key) {
    this.store.commit('deleteDictionary', key);
  };

  StoreStrategy.prototype._get = function _get(key) {
    var _this = this;
    var keyList = Array.isArray(key) ? key : [key];
    var result = {};
    keyList.forEach(function (k) {
      var item = _this.store.state['glDict'].data[k];
      if (item) result[k] = item;
    });
    return result;
  };

  return StoreStrategy;
}();

var NatureStrategy = function () {

  // method = null;
  // data = {};

  function NatureStrategy(method) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, NatureStrategy);

    this.data = {};
    this.method = method;
    this.config = config;
  }

  NatureStrategy.prototype.init = function init(key) {
    var _this2 = this;

    var _this = this;
    var keyList = Array.isArray(key) ? key : [key];
    var requestKeyList = keyList.filter(function (k) {
      return !_this2.data[k];
    });
    return new _promise2.default(function (resolve) {
      if (requestKeyList.length === 0) {
        var resultData = _this2._get(keyList);
        resolve(resultData);
      } else {
        _this.method(requestKeyList, _this.config).then(function (data) {
          for (var key in data) {
            _this2.data[key] = data[key];
          }
          var resultData = _this2._get(keyList);
          resolve(resultData);
        });
      }
    });
  };

  NatureStrategy.prototype.get = function get(key, remote) {
    if (remote === true) {
      return this.init(key);
    } else {
      var data = this._get(key);
      return Array.isArray(key) ? data : data[key];
    }
  };

  NatureStrategy.prototype.delete = function _delete(key) {
    var keyList = Array.isArray(key) ? key : [key];
    for (var k in keyList) {
      delete this.data[k];
    }
  };

  NatureStrategy.prototype._get = function _get(key) {
    var _this3 = this;

    var keyList = Array.isArray(key) ? key : [key];
    var result = {};
    keyList.forEach(function (k) {
      var item = _this3.data[k];
      if (item) result[k] = item;
    });
    return result;
  };

  return NatureStrategy;
}();

/**
 * 字典服务
 */


var DictionaryUtil = function () {
  function DictionaryUtil() {
    (0, _classCallCheck3.default)(this, DictionaryUtil);
  }

  // strategy = null;

  /**
   * 外部委托，注册状态模块
   * @param {object} store vuex实例
   * @param {function} method 获取数据的方法，它必须返回promise
   * @param {any} config
   */
  DictionaryUtil.prototype.invoke = function invoke(method, store, config) {
    this.strategy = !store ? new NatureStrategy(method, config) : new StoreStrategy(store, method, config);
  };

  /**
   * 初始化指定字典数据
   * @param {string|Array} key
   */


  DictionaryUtil.prototype.init = function init(key) {
    return this.strategy.init(key);
  };

  /**
   * 获取字典，异步模式则返回promise
   * @param {string|Array} key 字典KEY，多个采用数组
   * @param {boolean} remote 是否异步模式
   */


  DictionaryUtil.prototype.get = function get(key, remote) {
    return this.strategy.get(key, remote);
  };

  /**
   * 删除字典
   * @param {string|Array} key 字典KEY，多个采用数组
   */


  DictionaryUtil.prototype.delete = function _delete(key) {
    return this.strategy.delete(key);
  };

  return DictionaryUtil;
}();

var instance = new DictionaryUtil();
exports.default = instance;