'use strict';

exports.__esModule = true;
exports.validationHolder = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validationHolder = exports.validationHolder = {
  /** 缓存已加载的校验规则 */
  rules: {},
  /**
   * 根据 key 获取规则
   * @param {string} key
   */
  getRules: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(key) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (this.rules[key]) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return this.loadRules([key]);

            case 3:
              return _context.abrupt('return', this.rules[key]);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getRules(_x) {
      return _ref.apply(this, arguments);
    }

    return getRules;
  }(),

  /**
   * 根据 keys 获取校验规则
   * @param {string[]} keys
   */
  loadRules: function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(keys) {
      var url, result;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              url = this.getResourcePaths(keys);
              result = void 0;
              _context2.prev = 2;
              _context2.next = 5;
              return _axios2.default.get(url);

            case 5:
              result = _context2.sent;

              (0, _assign2.default)(this.rules, result.data);
              _context2.next = 12;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2['catch'](2);

              console.error(_context2.t0);

            case 12:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[2, 9]]);
    }));

    function loadRules(_x2) {
      return _ref2.apply(this, arguments);
    }

    return loadRules;
  }(),

  /**
   * 根据 keys 拼接 url
   * @param {string[]} keys
   */
  getResourcePaths: function getResourcePaths(keys) {
    return '/dao/static/app/validation/zh-cn/' + keys.join('$') + '.json';
  }
};