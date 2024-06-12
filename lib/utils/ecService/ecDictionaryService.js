'use strict';

exports.__esModule = true;
exports.getEcDictionary = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * EC 默认加载字典表方法
 * @param {string[]} keyList
 * @param {any} config
 */
var getEcDictionary = exports.getEcDictionary = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var keyList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var url;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = config.url || '/dictionary/queryDictRows';
            return _context.abrupt('return', _axios2.default.get(url, {
              params: {
                params: keyList.join(',')
              }
            }).then(function (response) {
              return response.data;
            }).catch(function (err) {
              _elementUi.Notification.error({
                title: 'ERROR',
                message: 'Error Load Dictionary.'
              });
              return _promise2.default.reject(err);
            }));

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getEcDictionary() {
    return _ref.apply(this, arguments);
  };
}();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _elementUi = require('element-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }