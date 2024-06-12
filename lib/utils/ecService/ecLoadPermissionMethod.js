'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.createEcLoadPermissionMethods = createEcLoadPermissionMethods;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _elementUi = require('element-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createEcLoadPermissionMethods() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(path) {
      var url;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              url = config.url || '/system/security/getSessionAttrsAndNoPermits';
              return _context.abrupt('return', _axios2.default.get(url, {
                params: {
                  pageUrl: path,
                  t: new Date().getTime()
                }
              }).then(function (response) {
                return response.data;
              }).catch(function (err) {
                _elementUi.Notification.error({
                  title: 'ERROR',
                  message: 'Error Load Permissions.'
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

    function ecLoadPermissionMethods(_x2) {
      return _ref.apply(this, arguments);
    }

    return ecLoadPermissionMethods;
  }();
}