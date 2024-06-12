"use strict";

exports.__esModule = true;

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @type {ValidateUtil} */
var validateUtil = void 0;

var validators = {
  notNull: function notNull(_ref) {
    var rule = _ref.rule,
        value = _ref.value,
        callback = _ref.callback;

    if (!isDefined(value) || value === null) {
      callback(rule["message"]);
      return;
    }
    if (typeof value === "number") value = value.toString();
    if ((0, _keys2.default)(value).length > 0) {
      callback();
    } else {
      callback(rule["message"]);
    }
  },

  pattern: function pattern(_ref2) {
    var rule = _ref2.rule,
        value = _ref2.value,
        callback = _ref2.callback;

    var isPass = getReg(rule.pattern, rule.flags).test(value);
    if (value && isPass) {
      callback();
    } else {
      callback(rule["message"]);
    }
  },

  min: function min(_ref3) {
    var rule = _ref3.rule,
        value = _ref3.value,
        callback = _ref3.callback;

    var tmpValue = Number(value);
    if (tmpValue !== NaN && isNumber(tmpValue) && tmpValue >= rule.min) {
      callback();
    } else {
      callback(rule["message"]);
    }
  },

  max: function max(_ref4) {
    var rule = _ref4.rule,
        value = _ref4.value,
        callback = _ref4.callback;

    var tmpValue = Number(value);
    if (tmpValue !== NaN && isNumber(tmpValue) && tmpValue <= rule.max) {
      callback();
    } else {
      callback(rule["message"]);
    }
  },

  email: function email(_ref5) {
    var rule = _ref5.rule,
        value = _ref5.value,
        callback = _ref5.callback;

    if (!value) callback();
    var emailParts = value.toString().split("@");
    if (emailParts.length != 2) {
      callback(rule.message);
    }
    if (/\.$/.test(emailParts[0]) || /\.$/.test(emailParts[1])) {
      callback(rule.message);
      if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*/i.test(emailParts[0])) {
        callback(rule.message);
      }
      if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)+|\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\]/i.test(emailParts[1])) {
        callback();
      } else {
        callback(rule.message);
      }
    }
  },

  length: function length(_ref6) {
    var rule = _ref6.rule,
        value = _ref6.value,
        callback = _ref6.callback;

    if (isNumber(value)) value = value.toString();

    if (isDefined(value) && value !== null && isString(value) && value.length <= rule.max && value.length >= rule.min) {
      callback();
    } else {
      callback(rule["message"]);
    }
  },

  richLength: function richLength(_ref7) {
    var rule = _ref7.rule,
        value = _ref7.value,
        callback = _ref7.callback;

    if (!isDefined(value) || value === null) {
      callback(rule["message"]);
      return;
    }
    if (isDefined(value) && value.length >= rule.min && value.length <= rule.max) {
      callback();
    } else {
      callback(rule["message"]);
    }
  },

  numeric: function numeric(_ref8) {
    var rule = _ref8.rule,
        value = _ref8.value,
        callback = _ref8.callback;

    var tmpValue = void 0,
        token = void 0;
    if (value) {
      tmpValue = Number(value);
      token = value.split(".");

      if (rule.precision >= 0 && (token[1] || "").length > rule.precision) {
        callback(rule.message);
      } else if (rule.sign === "POSITIVE" && tmpValue < 0) {
        callback(rule.message);
      } else if (rule.sign === "NEGATIVE" && tmpValue > 0) {
        callback(rule.message);
      }
    }
    callback();
  },

  require: function require(_ref9) {
    var rule = _ref9.rule,
        value = _ref9.value,
        callback = _ref9.callback;

    if (!isDefined(value) && value === null) callback(rule["message"]);
    if (typeof value === "number") value = value.toString();
    if ((0, _keys2.default)(value).length > 0) {
      callback();
    } else {
      callback(rule["message"]);
    }
  },

  range: function range(_ref10) {
    var rule = _ref10.rule,
        value = _ref10.value,
        callback = _ref10.callback;

    if (rangeVal(value, rule)) {
      callback();
    } else {
      callback(rule["message"]);
    }
  },

  dateMax: function dateMax(_ref11) {
    var rule = _ref11.rule,
        value = _ref11.value,
        callback = _ref11.callback;

    if (value === null || !isDate(value)) {
      callback(rule.message);
    }
    var compareTime = (0, _moment2.default)(rule.compareTime).valueOf() / 1000 || parseInt(new Date().getTime() / 1000);
    if (compareTime >= (0, _moment2.default)(value).valueOf() / 1000) {
      callback();
    } else {
      callback(rule.message);
    }
  },

  dateMin: function dateMin(_ref12) {
    var rule = _ref12.rule,
        value = _ref12.value,
        callback = _ref12.callback;

    if (value === null || !isDate(value)) {
      callback(rule.message);
    }

    var compareTime = (0, _moment2.default)(rule.compareTime).valueOf() / 1000 || parseInt(new Date().getTime() / 1000);
    if (compareTime <= (0, _moment2.default)(value).valueOf() / 1000) {
      callback();
    } else {
      callback(rule.message);
    }
  },

  numberRange: function numberRange(_ref13) {
    var rule = _ref13.rule,
        value = _ref13.value,
        callback = _ref13.callback;

    if (rangeVal(value, rule)) {
      callback();
    } else {
      callback(rule.message);
    }
  },

  notBlank: function notBlank(_ref14) {
    var rule = _ref14.rule,
        value = _ref14.value,
        callback = _ref14.callback;

    if (!value || isString(value) && value.trim().length > 0) {
      callback();
    } else {
      callback(rule["message"]);
    }
  },

  notEmpty: function notEmpty(_ref15) {
    var rule = _ref15.rule,
        value = _ref15.value,
        callback = _ref15.callback;

    if (notNullVal(value)) {
      if (isString(value) || isArray(value)) {
        if (value.length > 0) {
          callback();
        } else {
          callback(new TypeError("NotEmpty 只支持 String 或 Array 类型的值的验证"));
        }
      }
    } else {
      callback(rule["message"]);
    }
  },

  allMatch: function allMatch(_ref16) {
    var ruleForm = _ref16.ruleForm,
        rule = _ref16.rule,
        value = _ref16.value,
        callback = _ref16.callback;

    var listenProperties = rule.listenProperties;
    var obj = {};
    listenProperties.map(function (listenProperty) {
      if (ruleForm[listenProperty] !== "") obj[ruleForm[listenProperty]] = ruleForm[listenProperty];
    });
    if ((0, _keys2.default)(obj).length <= 1) {
      callback();
    } else {
      callback(rule.message);
    }
  },

  eitherNotBlank: function eitherNotBlank(_ref17) {
    var ruleForm = _ref17.ruleForm,
        rule = _ref17.rule,
        value = _ref17.value,
        callback = _ref17.callback;

    var fieldValues = [];
    var notBlankNum = 0;
    rule.properties.map(function (property) {
      if (ruleForm[property] !== "") notBlankNum++;
    });
    if (notBlankNum === rule.properties.length) {
      callback();
    } else {
      callback(rule.message);
    }
  },

  unique: function unique(_ref18) {
    var ajaxMethod = _ref18.ajaxMethod,
        ruleForm = _ref18.ruleForm,
        rule = _ref18.rule,
        value = _ref18.value,
        callback = _ref18.callback;

    var fieldValues = [];
    rule.properties.map(function (property) {
      fieldValues.push(ruleForm[property]);
    });
    var uniqueParamsJson = {
      entityName: rule.entity,
      pkValue: ruleForm[rule.pkProperty],
      fieldNames: rule.properties,
      version: rule.version ? rule.version : false,
      boName: rule.boName ? rule.boName : "",
      fieldValues: fieldValues,
      configItemCode: ""
    };
    ajaxMethod(rule.ruleName, uniqueParamsJson).then(function (res) {
      if (res) callback();else callback(rule.message);
    });
  },

  scriptPreCondition: function scriptPreCondition(_ref19) {
    var ruleForm = _ref19.ruleForm,
        rule = _ref19.rule,
        value = _ref19.value,
        callback = _ref19.callback,
        ajaxMethod = _ref19.ajaxMethod;

    var preConditionScript = rule.preConditionScript ? rule.preConditionScript : "";

    function doPreCondition() {
      try {
        return new Function("__record", "\n          with(__record) {\n            return " + preConditionScript + ";\n          }\n        ")(ruleForm);
      } catch (e) {
        console.error(e);
        return false;
      }
    }

    if (preConditionScript) {
      if (doPreCondition()) {
        var assertRule = rule.assertRule;
        var ruleProperties = (0, _extends3.default)({}, assertRule.ruleProperties || {}, {
          property: assertRule.memberPath,
          ruleName: assertRule.ruleName,
          message: assertRule.ruleProperties.message || rule.message
        });

        validateUtil.transform(ruleForm, [ruleProperties]).then(function (result) {
          var transformedRule = result[ruleProperties.property][0];
          transformedRule.validator(ruleProperties, ruleForm[ruleProperties.property], callback);
        });
      } else {
        callback();
      }
    } else {
      callback();
    }
  },

  compare: function compare(_ref20) {
    var ruleForm = _ref20.ruleForm,
        rule = _ref20.rule,
        value = _ref20.value,
        callback = _ref20.callback;

    var propertyCtrl = rule.property,
        compareToCtrl = rule.compareTo,
        propertyVal = ruleForm[propertyCtrl],
        compareToVal = isDefined(ruleForm[compareToCtrl]) ? ruleForm[compareToCtrl] : null;
    if (!isDefined(propertyVal) && !isDefined(compareToVal) || propertyVal === "" && compareToVal === "" || propertyVal === null && compareToVal === null) {
      callback();
    }
    if (isNaN(propertyVal) && !isNaN(Date.parse(propertyVal))) {
      propertyVal = Date.parse(propertyVal);
    }
    if (isNaN(compareToVal) && !isNaN(Date.parse(compareToVal))) {
      compareToVal = Date.parse(compareToVal);
    }

    if (!isDate(propertyVal) && !isDate(compareToVal)) {
      propertyVal = isNaN(Number(propertyVal)) ? propertyVal : Number(propertyVal);
      compareToVal = isNaN(Number(compareToVal)) ? compareToVal : Number(compareToVal);
    }
    var flag = void 0;
    switch (rule.than) {
      case "GREATER":
        flag = propertyVal > compareToVal;
        break;
      case "GREATER_EQ":
        flag = propertyVal >= compareToVal;
        break;
      case "LESS":
        flag = propertyVal < compareToVal;
        break;
      case "LESS_EQ":
        flag = propertyVal <= compareToVal;
        break;
      default:
        flag = true;
        break;
    }
    if (flag) {
      callback();
    } else {
      callback(rule.message);
    }
  }
};

function getReg(pattern, flags) {
  if (flags) {
    return new RegExp(pattern, flags);
  } else {
    return new RegExp(pattern);
  }
}

/* ec校验中的函数 */
function isDefined(value) {
  return typeof value !== "undefined";
}

function isString(value) {
  return typeof value === "string";
}

function isNumber(value) {
  return typeof value === "number";
}

function isArray(value) {
  return Array.isArray(value);
}

function isDate(value) {
  var tmp = new Date(value);
  return tmp instanceof Date;
}

function isFunction(value) {
  return typeof value === "function";
}

function rangeVal(value, rule) {
  var tmpValue = Number(value);
  return tmpValue !== NaN && isNumber(tmpValue) && tmpValue >= rule.min && tmpValue <= rule.max;
}
// ec校验中的函数
function notNullVal(value) {
  return isDefined(value) && value !== null;
}

function isEmptyString(value) {
  return !notNullVal(value) || isString(value) && value.length == 0;
}

function combineProperty(combineName, property) {
  return combineName ? combineName + "." + property : property;
}

var ValidateUtil = function () {
  function ValidateUtil() {
    (0, _classCallCheck3.default)(this, ValidateUtil);
  }

  // method = null;

  ValidateUtil.prototype.invoke = function invoke(method) {
    this.method = method;
  };

  ValidateUtil.prototype.transform = function transform(ruleForm, rules, combineName) {
    var _this = this;

    var result = {};
    var tmpObj = {};
    var getRecord = function getRecord() {
      if (isFunction(ruleForm)) {
        return ruleForm();
      }
      return ruleForm;
    };
    rules = rules.filter(function (rule) {
      return combineName ? combineName === rule.combineName : !rule.combineName;
    });
    rules.map(function (rule) {
      var tmpValidator = void 0;
      if (rule.property && !result[rule.property]) result[rule.property] = [];

      if (rule.selfdefinedFunc) {
        tmpValidator = rule.selfdefinedFunc;
      }
      switch (rule.ruleName) {
        // 非空
        case "notNull":
          tmpValidator = function tmpValidator(rule, value, callback) {
            validators.notNull({ rule: rule, value: value, callback: callback });
          };
          tmpObj = {
            message: rule.message,
            property: rule.property,
            validator: tmpValidator,
            tipItem: [].concat(rule.property)
          };
          break;
        // 正则
        case "pattern":
          tmpValidator = function tmpValidator(rule, value, callback) {
            validators.pattern({ rule: rule, value: value, callback: callback });
          };
          tmpObj = {
            trigger: rule.trigger ? rule.trigger : "blur",
            pattern: rule.pattern,
            ruleName: rule.ruleName,
            message: rule.message,
            flags: rule.flags,
            property: rule.property,
            validator: tmpValidator,
            tipItem: [].concat(rule.property)
          };
          break;
        case "min":
          tmpValidator = function tmpValidator(rule, value, callback) {
            validators.min({ rule: rule, value: value, callback: callback });
          };
          tmpObj = {
            min: rule.min,
            message: rule.message,
            property: rule.property,
            validator: tmpValidator,
            tipItem: [].concat(rule.property)
          };
          break;
        // 最大值 vue中定义的max是值长度，，，ec中定义的是大小
        case "max":
          tmpValidator = function tmpValidator(rule, value, callback) {
            validators.max({ rule: rule, value: value, callback: callback });
          };
          tmpObj = {
            min: rule.min,
            max: rule.max,
            message: rule.message,
            property: rule.property,
            validator: tmpValidator,
            tipItem: [].concat(rule.property)
          };
          break;
        //  长度
        case "length":
          tmpValidator = function tmpValidator(rule, value, callback) {
            validators.length({ rule: rule, value: value, callback: callback });
          };
          tmpObj = {
            min: rule.min,
            max: rule.max,
            message: rule.message,
            property: rule.property,
            validator: tmpValidator,
            tipItem: [].concat(rule.property)
          };
          break;
        // 数值范围
        case "range":
          tmpValidator = function tmpValidator(rule, value, callback) {
            validators.range({ rule: rule, value: value, callback: callback });
          };
          tmpObj = {
            min: rule.min,
            max: rule.max,
            message: rule.message,
            property: rule.property,
            validator: tmpValidator,
            tipItem: [].concat(rule.property)
          };
          break;

        /* 非空格字符串 */
        case "notBlank":
          tmpValidator = function tmpValidator(rule, value, callback) {
            validators.notBlank({ rule: rule, value: value, callback: callback });
          };
          tmpObj = {
            message: rule.message,
            property: rule.property,
            validator: tmpValidator,
            tipItem: [].concat(rule.property)
          };
          break;
        /* 非空字符串 */
        case "notEmpty":
          tmpValidator = function tmpValidator(rule, value, callback) {
            validators.notEmpty({ rule: rule, value: value, callback: callback });
          };
          tmpObj = {
            message: rule.message,
            property: rule.property,
            validator: tmpValidator,
            tipItem: [].concat(rule.property)
          };
          break;
        /* 邮箱 */
        case "email":
          tmpValidator = function tmpValidator(rule, value, callback) {
            validators.email({ rule: rule, value: value, callback: callback });
          };
          tmpObj = {
            message: rule.message,
            property: rule.property,
            validator: tmpValidator,
            tipItem: [].concat(rule.property)
          };
          break;
        /* 拓展长度 */
        case "richLength":
          tmpValidator = function tmpValidator(rule, value, callback) {
            validators.richLength({ rule: rule, value: value, callback: callback });
          };
          tmpObj = {
            min: rule.min,
            max: rule.max,
            chineseWidth: rule.chineseWidth,
            message: rule.message,
            property: rule.property,
            validator: tmpValidator,
            tipItem: [].concat(rule.property)
          };
          break;

        /* 合法数值 */
        case "numeric":
          tmpValidator = function tmpValidator(rule, value, callback) {
            validators.numeric({ rule: rule, value: value, callback: callback });
          };
          tmpObj = {
            sign: rule.sign,
            precision: rule.precision,
            message: rule.message,
            property: rule.property,
            validator: tmpValidator,
            tipItem: [].concat(rule.property)
          };
          break;

        /* 必填 */
        case "require":
          tmpValidator = function tmpValidator(rule, value, callback) {
            validators.require({ rule: rule, value: value, callback: callback });
          };
          tmpObj = {
            required: true,
            message: rule.message,
            property: rule.property,
            validator: tmpValidator,
            tipItem: [].concat(rule.property)
          };
          break;

        /* 最大日期 */
        case "dateMax":
          tmpValidator = function tmpValidator(rule, value, callback) {
            validators.dateMax({ rule: rule, value: value, callback: callback });
          };
          tmpObj = {
            compareTime: rule.compareTime,
            shiftedTime: rule.shiftedTime,
            message: rule.message,
            property: rule.property,
            validator: tmpValidator,
            tipItem: [].concat(rule.property)
          };
          break;
        /* 最小日期 */
        case "dateMin":
          tmpValidator = function tmpValidator(rule, value, callback) {
            validators.dateMin({ rule: rule, value: value, callback: callback });
          };
          tmpObj = {
            compareTime: rule.compareTime,
            shiftedTime: rule.shiftedTime,
            message: rule.message,
            property: rule.property,
            validator: tmpValidator,
            tipItem: [].concat(rule.property)
          };
          break;
        /* 浮点数值范围 */
        case "numberRange":
          tmpValidator = function tmpValidator(rule, value, callback) {
            validators.numberRange({ rule: rule, value: value, callback: callback });
          };
          tmpObj = {
            min: rule.min,
            max: rule.max,
            message: rule.message,
            property: rule.property,
            validator: tmpValidator,
            tipItem: [].concat(rule.property)
          };
          break;

        /* 任意字段非空 */
        case "eitherNotBlank":
          tmpValidator = function tmpValidator(rule, value, callback) {
            validators.eitherNotBlank({
              ruleForm: getRecord(),
              rule: rule,
              value: value,
              callback: callback
            });
          };
          tmpObj = {
            property: rule.property,
            listenProperties: rule.listenProperties,
            ruleName: rule.ruleName,
            message: rule.message,
            properties: rule.properties,
            validator: tmpValidator,
            tipItem: [].concat(rule.property)
          };
          break;
        // 唯一性
        case "unique":
          tmpValidator = function tmpValidator(rule, value, callback) {
            validators.unique({
              ajaxMethod: _this.method,
              ruleForm: getRecord(),
              rule: rule,
              value: value,
              callback: callback
            });
          };
          tmpObj = {
            async: rule.async,
            pkProperty: rule.pkProperty,
            ruleName: rule.ruleName,
            message: rule.message,
            entity: rule.entity || rule.entityName,
            properties: rule.properties,
            validator: tmpValidator,
            tipItem: [].concat(rule.properties)
          };
          break;
        /* 比较 */
        case "compare":
          tmpValidator = function tmpValidator(rule, value, callback) {
            validators.compare({
              ruleForm: getRecord(),
              rule: rule,
              value: value,
              callback: callback
            });
          };
          tmpObj = {
            than: rule.than,
            ruleName: rule.ruleName,
            message: rule.message,
            listenProperties: rule.listenProperties,
            property: rule.property,
            compareTo: rule.compareTo,
            validator: tmpValidator,
            tipItem: [].concat(rule.property)
          };
          break;
        // 值相等
        case "allMatch":
          tmpValidator = function tmpValidator(rule, value, callback) {
            validators.allMatch({
              ruleForm: getRecord(),
              rule: rule,
              value: value,
              callback: callback
            });
          };

          tmpObj = {
            trigger: rule.trigger ? rule.trigger : "blur",
            listenProperties: rule.listenProperties,
            property: rule.property,
            ruleName: rule.ruleName,
            message: rule.message,
            validator: tmpValidator,
            tipItem: [].concat(rule.property)
          };
          break;
        /* 脚本先决条件 */
        case "scriptPreCondition":
          tmpValidator = function tmpValidator(rule, value, callback) {
            validators.scriptPreCondition({
              ruleForm: getRecord(),
              rule: rule,
              value: value,
              callback: callback,
              ajaxMethod: _this.method
            });
          };
          tmpObj = {
            trigger: rule.trigger ? rule.trigger : "blur",
            listenProperties: rule.listenProperties,
            properties: rule.properties,
            ruleName: rule.ruleName,
            assertRule: rule.assertRule,
            preConditionScript: rule.preConditionScript,
            message: rule.message,
            validator: tmpValidator,
            tipItem: rule.assertRule.ruleName === "unique" ? [].concat(rule.assertRule.ruleProperties.properties) : [].concat(rule.assertRule.ruleProperties.property)
          };
          break;
      }

      if (rule.listenProperties) {
        rule.listenProperties.map(function (property) {
          if (!result[property]) result[property] = [];
          result[property].push(tmpObj);
        });
      } else if (rule.property) {
        result[rule.property].push(tmpObj);
      } else if (rule.properties) {
        rule.properties.map(function (property) {
          if (!result[property]) result[property] = [];
          result[property].push(tmpObj);
        });
      }
    });
    return new _promise2.default(function (resolve) {
      resolve(result);
    });
  };

  return ValidateUtil;
}();

validateUtil = new ValidateUtil();

exports.default = validateUtil;