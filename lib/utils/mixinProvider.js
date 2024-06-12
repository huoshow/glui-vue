"use strict";

exports.__esModule = true;
exports.MIXIN_TYPE = exports.mixinProvider = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _componentManager = require("./componentManager");

var _hotKeyService = require(".//hotKeyService");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 储存的mixin列表
var mixinObject = {
  PAGE: [],
  DIALOG: []
};

var MixinProvider = function () {
  function MixinProvider() {
    (0, _classCallCheck3.default)(this, MixinProvider);


    this.registerMixin(_componentManager.MIXIN_TYPE.PAGE, {
      mounted: function mounted() {
        //console.log('挂载,混入对象的钩子被调用，混入管理器已注册页面混入');
        //此处应存入组件实例
        _componentManager.componentManager.registerActive(_componentManager.MIXIN_TYPE.PAGE, this);
      },
      destroyed: function destroyed() {
        //console.log('卸载,混入对象的钩子被调用，混入管理器已注册页面混入');
        //此处应卸载组件实例
        _componentManager.componentManager.unloadActive(_componentManager.MIXIN_TYPE.PAGE, this);
      }
    });
    this.registerMixin(_componentManager.MIXIN_TYPE.DIALOG, {
      mounted: function mounted() {
        //let that=this;
        //console.log('挂载,混入对象的钩子被调用，混入管理器已注册弹窗混入');
        //此处应存入组件实例
        _componentManager.componentManager.registerActive(_componentManager.MIXIN_TYPE.DIALOG, this);
      },
      destroyed: function destroyed() {
        //console.log('卸载,混入对象的钩子被调用，混入管理器已注册弹窗混入');
        //此处应卸载组件实例
        _componentManager.componentManager.unloadActive(_componentManager.MIXIN_TYPE.DIALOG, this);
      }
    });
  }

  // 注册类型


  MixinProvider.prototype.registerType = function registerType(type) {
    console.log(type);
    //todo...
  };

  //注册混入


  MixinProvider.prototype.registerMixin = function registerMixin(type, mixin) {
    if (type === _componentManager.MIXIN_TYPE.PAGE) mixinObject.PAGE.push(mixin);else if (type === _componentManager.MIXIN_TYPE.DIALOG) mixinObject.DIALOG.push(mixin);else return null;
  };

  //获取混入
  //type 支持单个或多个


  MixinProvider.prototype.get = function get(type, list) {
    if (!list) {
      list = [];
    }
    var getMixinList = []; //获取的混入
    if (Array.isArray(type)) {
      //为数组，多类型
      type.map(function (item) {
        if (item === _componentManager.MIXIN_TYPE.PAGE) {
          getMixinList = getMixinList.concat(mixinObject.PAGE);
        } else if (item === _componentManager.MIXIN_TYPE.DIALOG) {
          getMixinList = getMixinList.concat(mixinObject.DIALOG);
        } else {
          getMixinList = [];
        }
      });
    } else {
      //为单个类型
      if (type === _componentManager.MIXIN_TYPE.PAGE) getMixinList = mixinObject.PAGE;else if (type === _componentManager.MIXIN_TYPE.DIALOG) getMixinList = mixinObject.DIALOG;else getMixinList = [];
    }
    /*返回混合列表*/
    return getMixinList.concat(list);
  };

  return MixinProvider;
}();

var mixinProvider = new MixinProvider();
exports.mixinProvider = mixinProvider;
exports.MIXIN_TYPE = _componentManager.MIXIN_TYPE;