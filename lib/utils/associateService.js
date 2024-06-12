'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 联想控件公共服务
 */
var AssociateService = function () {
  function AssociateService() {
    (0, _classCallCheck3.default)(this, AssociateService);

    /**
     * 缓存数据
     *  @type {{ [key: string]: any[] }}
     */
    this.storage = {};
  }
  /**
   * 加载方法，需要先注册
   * @param {string} key
   * @returns {Promise<any[]>}
   */


  AssociateService.prototype.serviceMethod = function serviceMethod(key) {
    throw new Error('ServiceMethod 未注册。');
  };

  AssociateService.prototype.loadData = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(key) {
      var data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.serviceMethod(key);

            case 2:
              data = _context.sent;

              this.setData(key, data);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function loadData(_x) {
      return _ref.apply(this, arguments);
    }

    return loadData;
  }();
  /**
   *  注册服务加载方法
   * @param {(key: string) => Promise<any[]>} method
   */


  AssociateService.prototype.registServiceMethod = function registServiceMethod(method) {
    this.serviceMethod = method;
  };
  /**
   * 从 storage 中获取数据
   * @param {string} key
   * @returns {Promise<any[]}
   */


  AssociateService.prototype.getData = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(key) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (this.storage[key]) {
                _context2.next = 3;
                break;
              }

              _context2.next = 3;
              return this.loadData(key);

            case 3:
              return _context2.abrupt('return', this.storage[key]);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getData(_x2) {
      return _ref2.apply(this, arguments);
    }

    return getData;
  }();
  /**
   * 设置 storage 数据
   * @param {string} key
   * @param {any[]} data
   */


  AssociateService.prototype.setData = function setData(key, data) {
    this.storage[key] = data;
  };

  return AssociateService;
}();

var associateService = new AssociateService();

exports.default = associateService;