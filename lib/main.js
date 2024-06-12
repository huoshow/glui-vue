'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/** 模拟获取权限 */
var loadPermitionMethod = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(path) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new _promise2.default(function (resolve) {
              setTimeout(function () {
                var result = {
                  noPermits: ['/hello/world'],
                  permits: ['/hello/world2']
                };
                if ((path || '').indexOf('permit-test') >= 0) {
                  result.redirectUrl = '/examples/no-permit';
                }
                resolve(result);
              }, 500);
            }));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function loadPermitionMethod(_x4) {
    return _ref2.apply(this, arguments);
  };
}();

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _Permissions = require('./utils/Permissions');

var _zhCN = require('../src/locale/lang/zh-CN');

var _zhCN2 = _interopRequireDefault(_zhCN);

var _locale = require('element-ui/lib/locale');

var _locale2 = _interopRequireDefault(_locale);

require('./examples/mock/index');

var _index = require('./index');

var ec = _interopRequireWildcard(_index);

var _App = require('./App.vue');

var _App2 = _interopRequireDefault(_App);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 中文

_vue2.default.use(ec);
// import lang from '../src/locale/lang/en'; // 英文


_vue2.default.use(_vueRouter2.default);


_vue2.default.config.productionTip = false;

_locale2.default.use(_zhCN2.default);

_Permissions.PermissionService.install(_vue2.default, {
  loadPermitionMethod: loadPermitionMethod
});

var router = new _vueRouter2.default({
  mode: 'history',
  routes: [
  // 动态路径参数 以冒号开头
  {
    path: '/test',
    component: function component() {
      return import('./examples/FormTest');
    }
  }, {
    path: '/my-test',
    component: function component() {
      return import('./examples/MyTest');
    }
  }, {
    path: '/examples/associate',
    component: function component() {
      return import('./examples/AssociateTest');
    }
  }, {
    path: '/examples/button-permissions',
    component: function component() {
      return import('./examples/ButtonPermissions');
    }
  }, {
    path: '/examples/permit-test',
    component: function component() {
      return import('./examples/PermitTest');
    }
  }, {
    path: '/examples/no-permit',
    component: function component() {
      return import('./examples/NoPermit');
    }
  }, {
    path: '/my-validate',
    component: function component() {
      return import('./examples/MyValidate');
    }
  }]
});

router.beforeEach(function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(to, from, next) {
    var redirectUrl;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            window.console.log('app-before-each');
            // window.console.log(to);
            // window.console.log(from);
            // window.console.log(next);

            // 路由守卫统一配置权限查询

            if (!(to.path.indexOf('permit-test') > 0)) {
              _context.next = 9;
              break;
            }

            _context.next = 4;
            return _Permissions.PermissionService.loadPermissions(to.path);

          case 4:
            redirectUrl = _Permissions.PermissionService.redirectUrls[to.path];

            if (!redirectUrl) {
              _context.next = 9;
              break;
            }

            console.log('\u76EE\u6807\u9875\u9762(' + to.path + ')\u65E0\u6743\u9650\uFF0C\u91CD\u5B9A\u5411\u5230\u65E0\u6743\u9650\u9875\u9762 (' + redirectUrl + ')');
            next(redirectUrl);
            return _context.abrupt('return');

          case 9:

            next();

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

// router.afterEach(() => {
//   window.console.log('app-after-each');
//   // window.console.log(to);
//   // window.console.log(from);
// })

new _vue2.default({
  router: router,
  render: function render(h) {
    return h(_App2.default);
  }
}).$mount('#app');