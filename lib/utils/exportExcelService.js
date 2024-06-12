'use strict';

exports.__esModule = true;
exports.exportExcelService = exports.ExportExcelService = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _types = require('element-ui/lib/utils/types');

var _elementUi = require('element-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var id = 0;

/**
 * 导出服务
 */

var ExportExcelService = exports.ExportExcelService = function () {
  function ExportExcelService() {
    (0, _classCallCheck3.default)(this, ExportExcelService);

    this.url = '/gillion-web/export/excel';
  }

  ExportExcelService.prototype.exportBackData = function exportBackData(_ref) {
    var key = _ref.key,
        isPrintAll = _ref.isPrintAll,
        url = _ref.url,
        domain = _ref.domain,
        callback = _ref.callback,
        exportField = _ref.exportField,
        groups = _ref.groups,
        params = _ref.params,
        sourceUrl = _ref.sourceUrl,
        pageSize = _ref.pageSize,
        currentPage = _ref.currentPage,
        sortName = _ref.sortName,
        sortDirection = _ref.sortDirection;

    var requestParams = {};
    params = params || {};
    if (groups) {
      if ((0, _types.isString)(groups)) {
        requestParams.groups = groups.split(',');
      } else {
        requestParams.groups = groups;
      }
    }
    requestParams = (0, _extends3.default)({}, requestParams, (0, _types.isFunction)(params) ? params() : params, {
      url: sourceUrl,
      pageSize: pageSize,
      currentPage: currentPage,
      sortName: sortName,
      sortDirection: sortDirection,
      key: key,
      isPrintAll: isPrintAll || '',
      domain: domain || ''
    });
    (0, _keys2.default)(requestParams).forEach(function (key) {
      if ((0, _types.isUndefined)(requestParams[key])) {
        delete requestParams[key];
      }
    });
    if (exportField) {
      return this.doPostExport({
        url: url,
        params: requestParams,
        callback: callback,
        exportField: exportField
      });
    } else {
      return this.doGetExport({
        url: url,
        params: requestParams,
        callback: callback
      });
    }
  };

  ExportExcelService.prototype.doExport = function doExport(opts) {
    this.exportBackData(opts);
  };

  ExportExcelService.prototype.doPostExport = function doPostExport(_ref2) {
    var url = _ref2.url,
        params = _ref2.params,
        callback = _ref2.callback,
        exportField = _ref2.exportField;

    if ((0, _types.isString)(exportField)) {
      params.exportField = exportField.split(',');
    } else if (Array.isArray(exportField)) {
      // isArray
      params.exportField = exportField;
    }
    var requestUrl = url || this.url;

    //创建iframe
    var iframe = document.createElement('iframe');
    iframe.src = 'javascript:false;';
    iframe.setAttribute('name', 'exportExcel' + id);
    iframe.setAttribute('id', 'exportExcel' + id);
    id++;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    //获取结果
    getResponseMessage(iframe[0], callback);

    //创建form
    var form = document.createElement('form');
    form.method = 'post';
    form.style.display = 'none';
    form.action = requestUrl;
    form.target = iframe.name;
    for (var el in params) {
      if (params.hasOwnProperty(el)) {
        var ele = params[el];
        if (Array.isArray(ele)) {
          ele.forEach(function (value) {
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = el;
            if ((0, _types.isObject)(value)) {
              input.value = (0, _stringify2.default)(value);
            } else {
              input.value = value;
            }
            form.appendChild(input);
          });
          if (ele.length == 0) {
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = el;
            input.value = '';
            form.appendChild(input);
          }
        } else {
          var _input = document.createElement('input');
          _input.type = 'hidden';
          _input.name = el;
          if ((0, _types.isObject)(ele)) {
            _input.value = (0, _stringify2.default)(ele);
          } else {
            _input.value = ele;
          }
          form.appendChild(_input);
        }
      }
    }
    document.body.appendChild(form);
    //提交表单
    form.submit();
    //移删除表单
    form.remove();
  };

  ExportExcelService.prototype.doGetExport = function doGetExport(_ref3) {
    var url = _ref3.url,
        params = _ref3.params,
        callback = _ref3.callback;

    var argumentStr = '';
    url = url || this.url;
    (0, _keys2.default)(params).forEach(function (key) {
      var value = params[key];
      if (Array.isArray(value)) {
        value.forEach(function (item) {
          if ((0, _types.isObject)(item)) {
            argumentStr += key + '=' + encodeURIComponent((0, _stringify2.default)(item)) + '&';
          } else {
            argumentStr += key + '=' + encodeURIComponent(item) + '&';
          }
        });
      } else {
        argumentStr = argumentStr + key + '=' + encodeURIComponent(value) + '&';
      }
    });
    if (argumentStr.length > 0) {
      url += '?' + argumentStr.substr(0, argumentStr.length - 1);
    }

    window.open(url).addEventListener('beforeunload', function (resp) {
      if ((0, _types.isFunction)(callback)) {
        callback(resp);
      }
    });
  };

  ExportExcelService.prototype.exportData = function exportData(_ref4) {
    var data = _ref4.data,
        key = _ref4.key,
        callback = _ref4.callback,
        url = _ref4.url,
        domain = _ref4.domain;

    //创建iframe
    var iframe = document.createElement('iframe');
    iframe.src = 'javascript:false;';
    iframe.setAttribute('name', 'exportExcel' + id);
    iframe.setAttribute('id', 'exportExcel' + id);
    id++;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    //获取结果
    getResponseMessage(iframe, callback);

    //日期的处理
    data = transformDateToString(data);
    data = (0, _stringify2.default)(data);
    // 创建form
    var form = document.createElement('form');
    form.method = 'post';
    form.style.display = 'none';
    form.action = url;
    form.target = iframe.name;
    var input1 = document.createElement('input');
    input1.type = 'hidden';
    input1.name = 'key';
    input1.value = key;
    form.appendChild(input1);
    var input2 = document.createElement('input');
    input2.type = 'hidden';
    input2.name = 'data';
    input2.value = data;
    form.appendChild(input2);
    if (domain) {
      var input3 = document.createElement('input');
      input3.type = 'hidden';
      input3.name = 'domain';
      input3.value = domain;
    }
    document.body.appendChild(form);

    //提交表单
    form.submit();
    //移删除表单
    form.remove();
  };

  return ExportExcelService;
}();

var exportExcelService = exports.exportExcelService = new ExportExcelService();

//对数据中的所有日期做转换
function transformDateToString(input) {
  var out, transformDateProperty;
  transformDateProperty = function transformDateProperty(item) {
    var ele = {};
    (0, _keys2.default)(item).forEach(function (key) {
      var el = item[key];
      if (isDate(el) && Date.prototype.toISOString) {
        ele[key] = el.toISOString();
      } else {
        ele[key] = el;
      }
    });
    return ele;
  };
  out = (input || []).map(function (item) {
    return transformDateProperty(item);
  });
  return out;
}

//获取返回值
function getResponseMessage(iframe, callback) {
  var timer = setInterval(function () {
    var response = void 0;
    var doc = iframe.contentDocument || iframe.contentWindow.document;
    if (doc.readyState === 'complete' || doc.readyState === 'interactive') {

      if (doc.readyState && doc.readyState !== 'complete') {
        iframe.remove();
        return;
      }

      if (doc.body && doc.body.innerHtml === 'false') {
        iframe.remove();
        return;
      }
      if (doc.XMLDocument) {
        response = doc.XMLDocument;
      } else if (doc.body) {
        response = doc.body.innerHTML;
      } else {
        response = {};
      }
      if (response) {
        try {
          response = new Function('return' + response)();
          if ((0, _types.isFunction)(callback)) {
            callback(response);
          } else {
            if (!response.success) {
              _elementUi.MessageBox.alert(response.errorMessages, '提示信息');
            }
          }
        } catch (_error) {
          _elementUi.MessageBox.alert('导出失败，请重试', '提示信息');
        }
      } else {
        callback();
      }

      clearInterval(timer);
      return;
    }
  }, 1000);
}

function isDate(val) {
  return val && val.toString() === '[object Date]';
}

/**
 * @typedef ExportExcelOptions
 * @property {string} key
 * @property {string} isPrintAll
 * @property {string} url
 * @property {string} domain
 * @property {Function} callback
 * @property {string \ string[]} exportField
 * @property {string | string[]} groups
 * @property {object | Function} params
 * @property {string} sourceUrl
 * @property {number} pageSize
 * @property {number} currentPage
 * @property {string} sortName
 * @property {string} sortDirection
 */