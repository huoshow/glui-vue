'use strict';

exports.__esModule = true;
exports.PermissionService = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _ecLoadPermissionMethod = require('./ecService/ecLoadPermissionMethod');

var _busUtil = require('./busUtil');

var _busUtil2 = _interopRequireDefault(_busUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PermissionService = exports.PermissionService = _vue2.default.observable({
  /**
   * 是否缓存权限数据
   * @type {boolean}
   */
  useCache: true,
  /**
   * 无权限列表
   * @type {string[]}
   */
  noPermits: [],

  /**
   * 权限列表
   * @type {string[]}
   */
  permits: [],

  /**
   * sessionAttrs
   * @type {any}
   */
  sessionAttrs: {},

  /**
   * 重定向 url
   * @type {[pageUrl: string]: string}
   */
  redirectUrls: {},

  /**
   * 已加载权限的页面列表
   * @type {string[]}
   */
  loadedPaths: [],

  /**
   * 加载权限方法，使用前必须先注册
   * @type {LoadPermitionMethod}
   */
  loadPermitionMethod: function loadPermitionMethod() {
    throw new Error('loadPermitionMethod is not registed.');
  },

  /**
   * Vue.use(PermissionService, options) 调用此方法
   * @param {typeof Vue} Vue
   * @param {Object} options
   * @param {LoadPermitionMethod} options.loadPermitionMethod
   */
  install: function install(Vue, _ref) {
    var loadPermitionMethod = _ref.loadPermitionMethod,
        _ref$config = _ref.config,
        config = _ref$config === undefined ? {} : _ref$config;

    this.useCache = config.useCache === undefined ? true : config.useCache;
    this.registLoadPermitionMethod(loadPermitionMethod, config);
    Vue.prototype.$permissions = this;
  },


  /**
   * 注册加载权限方法
   * @param {LoadPermitionMethod} method
   */
  registLoadPermitionMethod: function registLoadPermitionMethod(method, config) {
    this.loadPermitionMethod = method || (0, _ecLoadPermissionMethod.createEcLoadPermissionMethods)(config);
  },


  /**
   * 判断页面权限是否加载完成
   * @param {string} path
   * @returns {boolean}
   */
  isLoaded: function isLoaded(path) {
    return this.loadedPaths.indexOf(path) >= 0;
  },


  /**
   * @param {string} permitionKey
   * @param {boolean} [checkNoPermits = false] 是否检测有权限列表
   * @returns {boolean}
   */
  isNoPermit: function isNoPermit(permitionKey) {
    var checkPermits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    return checkPermits ? this.permits.indexOf(permitionKey) < 0 : this.noPermits.indexOf(permitionKey) >= 0;
  },


  /** 清除缓存的权限数据 */
  clearCache: function clearCache() {
    this.loadedPaths = [];
    this.redirectUrls = {};
    this.noPermits = [];
    this.permits = [];
  },


  /**
   * 加载页面权限
   * @param {string} path
   */
  loadPermissions: function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var _this = this;

      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var _ref3, sessionAttrs, noPermits, permits, redirectUrl, noPermitsSet, permitsSet;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!this.useCache) {
                this.clearCache();
              }

              if (!this.isLoaded(path)) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return');

            case 3:
              _context.next = 5;
              return this.loadPermitionMethod(path);

            case 5:
              _ref3 = _context.sent;
              sessionAttrs = _ref3.sessionAttrs;
              noPermits = _ref3.noPermits;
              permits = _ref3.permits;
              redirectUrl = _ref3.redirectUrl;

              this.loadedPaths.push(path);
              this.redirectUrls[path] = redirectUrl;
              if (sessionAttrs) {
                this.sessionAttrs = sessionAttrs;
              }
              noPermitsSet = new _set2.default([].concat(this.noPermits, noPermits || []));

              this.noPermits = [];
              noPermitsSet.forEach(function (v) {
                return _this.noPermits.push(v);
              });
              permitsSet = new _set2.default([].concat(this.permits, permits || []));

              this.permits = [];
              permitsSet.forEach(function (v) {
                return _this.permits.push(v);
              });
              _busUtil2.default.$emit('gl-permissions-update');

            case 20:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function loadPermissions() {
      return _ref2.apply(this, arguments);
    }

    return loadPermissions;
  }()
});

/**
 * 加载权限方法返回对象
 * @typedef {Object} LoadPermitionReturns
 * @property {any} sessionAttrs
 * @property {string[]} [noPermits] - 无权限列表
 * @property {string[]} [permits] - 有权限列表
 * @property {string} [redirectUrl] - 重定向 url
 *
 * loadPermitionMethod 方法定义
 * @typedef {(path: string) => Promise<LoadPermitionReturns>} LoadPermitionMethod
 */