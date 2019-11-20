/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/application.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/pug-runtime/index.js":
/*!*******************************************!*\
  !*** ./node_modules/pug-runtime/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      valA = valA && valA[valA.length - 1] !== ';' ? valA + ';' : valA;
      var valB = pug_style(b[key]);
      valB = valB && valB[valB.length - 1] !== ';' ? valB + ';' : valB;
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    return val + '';
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  var type = typeof val;
  if ((type === 'object' || type === 'function') && typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(/*! fs */ 0).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),

/***/ "./src/js/application.js":
/*!*******************************!*\
  !*** ./src/js/application.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/router */ "./src/js/modules/router.js");
/* harmony import */ var _modules_eventbus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/eventbus */ "./src/js/modules/eventbus.js");
/* harmony import */ var _controllers_posterController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controllers/posterController */ "./src/js/controllers/posterController.js");
/* harmony import */ var _models_posterModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/posterModel */ "./src/js/models/posterModel.js");
/* harmony import */ var _modules_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/events */ "./src/js/modules/events.js");
/* harmony import */ var _controllers_menuController__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./controllers/menuController */ "./src/js/controllers/menuController.js");






document.addEventListener('DOMContentLoaded', function () {
  var body = document.querySelector('.page');
  var header = document.querySelector('header');
  var content = document.querySelector('.main-content');
  var globalEventBus = new _modules_eventbus__WEBPACK_IMPORTED_MODULE_1__["EventBus"]([_modules_events__WEBPACK_IMPORTED_MODULE_4__["AUTH"], _modules_events__WEBPACK_IMPORTED_MODULE_4__["PROFILE"]].map(function (model) {
    return Object.values(model);
  }).flat());
  var models = {
    poster: _models_posterModel__WEBPACK_IMPORTED_MODULE_3__["default"]
  };
  Object.values(models).forEach(function (model) {
    return model.setGlobalEventBus(globalEventBus);
  });
  var router = new _modules_router__WEBPACK_IMPORTED_MODULE_0__["Router"](body);
  var menuController = new _controllers_menuController__WEBPACK_IMPORTED_MODULE_5__["MenuController"](header, globalEventBus, router);
  var posterController = new _controllers_posterController__WEBPACK_IMPORTED_MODULE_2__["PosterController"](content, globalEventBus, router);
  menuController.openWithData();
  router.add('/', posterController);
  router.start();
});

/***/ }),

/***/ "./src/js/controllers/menuController.js":
/*!**********************************************!*\
  !*** ./src/js/controllers/menuController.js ***!
  \**********************************************/
/*! exports provided: MenuController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuController", function() { return MenuController; });
/* harmony import */ var _views_Menu_Menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../views/Menu/Menu */ "./src/js/views/Menu/Menu.js");
/* harmony import */ var _modules_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/controller */ "./src/js/modules/controller.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var MenuController =
/*#__PURE__*/
function (_Controller) {
  _inherits(MenuController, _Controller);

  function MenuController(root, globalEventBus, router) {
    var _this;

    _classCallCheck(this, MenuController);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MenuController).call(this, root, globalEventBus, router));
    _this._view = new _views_Menu_Menu__WEBPACK_IMPORTED_MODULE_0__["MenuView"](_this._root, _this._globalEventBus);
    return _this;
  }

  return MenuController;
}(_modules_controller__WEBPACK_IMPORTED_MODULE_1__["Controller"]);

/***/ }),

/***/ "./src/js/controllers/posterController.js":
/*!************************************************!*\
  !*** ./src/js/controllers/posterController.js ***!
  \************************************************/
/*! exports provided: PosterController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PosterController", function() { return PosterController; });
/* harmony import */ var _views_Poster_Poster__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../views/Poster/Poster */ "./src/js/views/Poster/Poster.js");
/* harmony import */ var _modules_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/controller */ "./src/js/modules/controller.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var PosterController =
/*#__PURE__*/
function (_Controller) {
  _inherits(PosterController, _Controller);

  function PosterController(root, globalEventBus, router) {
    var _this;

    _classCallCheck(this, PosterController);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PosterController).call(this, root, globalEventBus, router));
    _this._view = new _views_Poster_Poster__WEBPACK_IMPORTED_MODULE_0__["PosterView"](_this._root, _this._globalEventBus);
    return _this;
  }

  return PosterController;
}(_modules_controller__WEBPACK_IMPORTED_MODULE_1__["Controller"]);

/***/ }),

/***/ "./src/js/models/posterModel.js":
/*!**************************************!*\
  !*** ./src/js/models/posterModel.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/api */ "./src/js/modules/api.js");
/* harmony import */ var _modules_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/events */ "./src/js/modules/events.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var PosterModel =
/*#__PURE__*/
function () {
  function PosterModel() {
    _classCallCheck(this, PosterModel);
  }

  _createClass(PosterModel, [{
    key: "_loadPage",
    value: function _loadPage(id) {
      var _this = this;

      _modules_api__WEBPACK_IMPORTED_MODULE_0__["default"].getPageFilms(id).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            _this._globalEventBus.triggerEvent('loadSuccess', data);
          });
        } else {
          response.json().then(function (data) {
            _this._globalEventBus.triggerEvent('loadFailed', data);
          });
        }
      })["catch"](function (error) {
        console.error(error);
      });
    }
  }, {
    key: "setGlobalEventBus",
    value: function setGlobalEventBus(globalEventBus) {
      this._globalEventBus = globalEventBus;

      this._globalEventBus.subscribeToEvent(_modules_events__WEBPACK_IMPORTED_MODULE_1__["AUTH"].checkAuth, this._onCheckAuth.bind(this));
    }
  }, {
    key: "_onCheckAuth",
    value: function _onCheckAuth() {
      _modules_api__WEBPACK_IMPORTED_MODULE_0__["default"].authCheck().then(function (res) {});
    }
  }]);

  return PosterModel;
}();

/* harmony default export */ __webpack_exports__["default"] = (new PosterModel());

/***/ }),

/***/ "./src/js/modules/api.js":
/*!*******************************!*\
  !*** ./src/js/modules/api.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Api; });
/* harmony import */ var _network__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./network */ "./src/js/modules/network.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


/**
 * API object
 * @class
 * @type {Api}
 */

var Api =
/*#__PURE__*/
function () {
  function Api() {
    _classCallCheck(this, Api);
  }

  _createClass(Api, null, [{
    key: "login",

    /**
     * API Login
     * POST /sessions/
     * @static
     * @param {string} email
     * @param {string} password
     * @returns {Promise<Response>}
     */
    value: function login(_ref) {
      var email = _ref.email,
          password = _ref.password;
      return _network__WEBPACK_IMPORTED_MODULE_0__["default"].doPost('/sessions/', {
        email: email,
        password: password
      });
    }
    /**
     * API Check auth
     * GET /sessions/
     * @static
     * @returns {Promise<Response>}
     */

  }, {
    key: "authCheck",
    value: function authCheck() {
      return _network__WEBPACK_IMPORTED_MODULE_0__["default"].doGet('/session');
    }
    /**
     * API Logout
     * delete /sessions/
     * @static
     * @returns {Promise<Response>}
     */

  }, {
    key: "logout",
    value: function logout() {
      return _network__WEBPACK_IMPORTED_MODULE_0__["default"].doDelete('/session/');
    }
    /**
     * API Registration
     * POST /users/
     * @static
     * @param {string} email
     * @param {string} password
     * @param {string} username
     * @returns {Promise<Response>}
     */

  }, {
    key: "register",
    value: function register(_ref2) {
      var email = _ref2.email,
          password = _ref2.password,
          username = _ref2.username;
      return _network__WEBPACK_IMPORTED_MODULE_0__["default"].doPost('/users/', {
        email: email,
        password: password,
        username: username
      });
    }
    /**
     * API Edit avatar
     * POST /images/
     * @static
     * @param {string} avatar - новое изображение
     * @param {string} userID
     * @returns {Promise<Response>}
     */

  }, {
    key: "editAvatar",
    value: function editAvatar(_ref3) {
      var avatar = _ref3.avatar;
      var formData = new FormData();
      formData.append('file', avatar.avatar);
      return _network__WEBPACK_IMPORTED_MODULE_0__["default"].doPostFormData('/users/images/', formData);
    }
    /**
     * API Edit profile
     * PUT /users/
     * @static
     * @param {string} email
     * @param {string} description
     * @returns {Promise<Response>}
     */

  }, {
    key: "editProfile",
    value: function editProfile(_ref4) {
      var username = _ref4.username,
          description = _ref4.description;
      return _network__WEBPACK_IMPORTED_MODULE_0__["default"].doPut('/users/', {
        username: username,
        description: description
      });
    }
    /**
     * API Get profile info
     * GET /users/
     * @static
     * @returns {Promise<Response>}
     */

  }, {
    key: "getProfileInfo",
    value: function getProfileInfo() {
      return _network__WEBPACK_IMPORTED_MODULE_0__["default"].doGet('/users/');
    }
    /**
     * API Get another user info
     * GET /users/{user_id}
     * @static
     * @returns {Promise<Response>}
     */

  }, {
    key: "getAnotherUserInfo",
    value: function getAnotherUserInfo(_ref5) {
      var userID = _ref5.userID;
      return _network__WEBPACK_IMPORTED_MODULE_0__["default"].doGet("/users/".concat(userID, "/"));
    }
    /**
     * API Get film info
     * GET /films/{film_id}/
     * @static
     * @param {string} filmID
     * @returns {Promise<Response>}
     */

  }, {
    key: "getFilmInfo",
    value: function getFilmInfo(_ref6) {
      var filmID = _ref6.filmID;
      return _network__WEBPACK_IMPORTED_MODULE_0__["default"].doGet("/films/".concat(filmID, "/"));
    }
    /**
     * API Get all films for certain page
     * GET /films/{pageID}/
     * @param pageID
     * @returns {Promise<Response>}
     */

  }, {
    key: "getPageFilms",
    value: function getPageFilms(_ref7) {
      var pageID = _ref7.pageID;
      return _network__WEBPACK_IMPORTED_MODULE_0__["default"].doGet("/films/".concat(pageID, "/"));
    }
    /**
     * API Add new film
     * POST /films/
     * @static
     * @param {string} title
     * @param {string} description
     * @param {Array} genres
     * @param {string} date
     * @param {Array} actors
     * @param {Array} directors
     * @param {number} rating
     * @returns {Promise<Response>}
     */

  }, {
    key: "addNewFilm",
    value: function addNewFilm(_ref8) {
      var title = _ref8.title,
          description = _ref8.description,
          genres = _ref8.genres,
          date = _ref8.date,
          actors = _ref8.actors,
          directors = _ref8.directors,
          rating = _ref8.rating;
      return _network__WEBPACK_IMPORTED_MODULE_0__["default"].doPost('/films/', {
        title: title,
        description: description,
        genres: genres,
        date: date,
        actors: actors,
        directors: directors,
        rating: rating
      });
    }
    /**
     * API Check session
     * @static
     * @returns {Promise<Response>}
     */

  }, {
    key: "checkSession",
    value: function checkSession() {
      return _network__WEBPACK_IMPORTED_MODULE_0__["default"].doGet({
        url: '/auth'
      });
    }
  }]);

  return Api;
}();



/***/ }),

/***/ "./src/js/modules/controller.js":
/*!**************************************!*\
  !*** ./src/js/modules/controller.js ***!
  \**************************************/
/*! exports provided: Controller */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return Controller; });
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ "./src/js/modules/view.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./router */ "./src/js/modules/router.js");
/* harmony import */ var _eventbus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./eventbus */ "./src/js/modules/eventbus.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var Controller = function Controller(root, globalEventBus, router) {
  var _this = this;

  _classCallCheck(this, Controller);

  _defineProperty(this, "_view", new _view__WEBPACK_IMPORTED_MODULE_0__["View"]());

  _defineProperty(this, "openWithData", function () {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _this._view.render(data);
  });

  _defineProperty(this, "close", function () {
    _this._view.hide();
  });

  this._root = root;
  this._globalEventBus = globalEventBus;
  this._router = router;
};

/***/ }),

/***/ "./src/js/modules/eventbus.js":
/*!************************************!*\
  !*** ./src/js/modules/eventbus.js ***!
  \************************************/
/*! exports provided: EventBus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventBus", function() { return EventBus; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Events creation
 * @class
 * @type {EventBus}
 */
var EventBus =
/*#__PURE__*/
function () {
  /**
   * @param listOfEvents Array[string] available events
   */
  function EventBus() {
    var _this = this;

    var listOfEvents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{}];

    _classCallCheck(this, EventBus);

    this.events = new Map();
    listOfEvents.forEach(function (eventName) {
      return _this.events.set(eventName, []);
    });
  }
  /**
   * Subscription to event
   * @param {string} eventName
   * @param {function} callback
   */


  _createClass(EventBus, [{
    key: "subscribeToEvent",
    value: function subscribeToEvent(eventName, callback) {
      if (!this.events.has(eventName)) {
        throw new Error("EventBus: Unknown event ".concat(eventName));
      }

      this.events.get(eventName).push(callback);
    }
    /**
     * Trigger all callbacks for events
     * @param {string} eventName
     * @param {object} args
     */

  }, {
    key: "triggerEvent",
    value: function triggerEvent(eventName) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (!this.events.has(eventName)) {
        throw new Error("EventBus: Unknown event ".concat(eventName));
      }

      var eventListeners = this.events.get(eventName);
      eventListeners.forEach(function (callback) {
        return callback.apply(void 0, args);
      });
    }
    /**
     * Call func by event
     * @param {string} eventName
     * @param {object} args
     * @return {*}
     */

  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(eventName) {
      var _this$events;

      if (eventName === undefined) {
        console.log('No event value');
        return;
      }

      if (this.events[eventName] === undefined) {
        console.log('No such event: ' + eventName);
        return;
      }

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return (_this$events = this.events)[eventName].apply(_this$events, args);
    }
  }]);

  return EventBus;
}();

/***/ }),

/***/ "./src/js/modules/events.js":
/*!**********************************!*\
  !*** ./src/js/modules/events.js ***!
  \**********************************/
/*! exports provided: AUTH, FILM, PROFILE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUTH", function() { return AUTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILM", function() { return FILM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROFILE", function() { return PROFILE; });
var AUTH = {
  checkAuth: 'checkAuth',
  checkAuthResponse: 'authR',
  signOut: 'signOut',
  signOutResponse: 'signOutR',
  signIn: 'signIn',
  signInSuccess: 'signInS',
  signInFailed: 'signInF',
  signUpCustomer: 'signUpCustomer',
  signUpSuccess: 'signUpS',
  signUpFailed: 'signUpF'
};
var FILM = {
  getFilms: 'getFilms',
  getFilmsSuccess: 'getFilmsS',
  getFilmsFailed: 'getFilmsF',
  createFilm: 'createFilm',
  createFilmSuccess: 'createFilmS',
  createFilmFailed: 'createFilmF',
  getFilm: 'getFilm',
  getFilmSuccess: 'getFilmS',
  getFilmFailed: 'getFilmF'
};
var PROFILE = {
  loadProfile: 'loadProfile',
  loadProfileSuccess: 'loadProfileS',
  loadProfileFailed: 'loadProfileF',
  saveButtonClicked: 'saveButtonC',
  saveProfile: 'saveProfile',
  saveProfileSuccess: 'saveProfileS',
  saveProfileFailed: 'saveProfileF',
  saveAvatar: 'saveAvatar',
  saveAvatarSuccess: 'saveAvatarS',
  saveAvatarFailed: 'saveAvatarF'
};

/***/ }),

/***/ "./src/js/modules/network.js":
/*!***********************************!*\
  !*** ./src/js/modules/network.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Network; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var serverUrl = 'http://127.0.0.1:8080';
/**
 * New Network obj
 * @class
 * @type {Network}
 */

var Network =
/*#__PURE__*/
function () {
  function Network() {
    _classCallCheck(this, Network);
  }

  _createClass(Network, null, [{
    key: "doGet",

    /**
     * Get request
     * @static
     * @param {string} path
     * @returns {Promise<Response>}
     */
    value: function doGet() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
      return fetch(Network.getServerUrl() + path, {
        method: 'GET',
        mode: 'no-cors',
        credentials: 'include'
      });
    }
    /**
     * Post request
     * @static
     * @param {string} path
     * @param {Object} body
     * @param {string} host
     * @returns {Promise<Response>}
     */

  }, {
    key: "doPost",
    value: function doPost() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
      var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var host = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Network.getServerUrl();
      return fetch(host + path, {
        method: "POST",
        mode: 'cors',
        credentials: "include",
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      });
    }
    /**
     * DELETE request
     * @param path
     * @returns {Promise<Response>}
     */

  }, {
    key: "doDelete",
    value: function doDelete() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
      return fetch(Network.getServerUrl() + path, {
        method: "DELETE",
        mode: "cors",
        credentials: "include"
      });
    }
    /**
     * PUT request
     * @static
     * @param {string} path
     * @param {Object} body
     * @return {Promise<Response>}
     */

  }, {
    key: "doPut",
    value: function doPut() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
      var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return fetch(Network.getServerUrl() + path, {
        method: "PUT",
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      });
    }
    /**
     *  Post formData
     *  @param {string} path
     *  @static
     *  @param {Object} body
     *  @returns {Promise<Response>}
     */

  }, {
    key: "doPostFormData",
    value: function doPostFormData() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$url = _ref.url,
          url = _ref$url === void 0 ? '/' : _ref$url,
          _ref$body = _ref.body,
          body = _ref$body === void 0 ? {} : _ref$body;

      var token = localStorage.getItem('token');
      return fetch(Network.getServerUrl() + url, {
        method: 'POST',
        body: body,
        mode: 'cors',
        credentials: 'include',
        headers: {
          'X-CSRF-Token': token
        }
      });
    }
    /**
     * PUT form-data request
     * @param {string} path
     * @param {Object} body
     * @returns {Promise<Response>}
     */

  }, {
    key: "doPutFormData",
    value: function doPutFormData() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
      var body = arguments.length > 1 ? arguments[1] : undefined;
      return fetch(Network.getServerUrl() + path, {
        method: 'PUT',
        mode: 'cors',
        credentials: 'include',
        body: body
      });
    }
    /**
     * Server URL
     * @returns {string}
     */

  }, {
    key: "getServerUrl",
    value: function getServerUrl() {
      return serverUrl;
    }
  }]);

  return Network;
}();



/***/ }),

/***/ "./src/js/modules/router.js":
/*!**********************************!*\
  !*** ./src/js/modules/router.js ***!
  \**********************************/
/*! exports provided: Router */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pathsWithId = ['/profile', '/poster', '/film'];
var Router =
/*#__PURE__*/
function () {
  function Router(root) {
    var _this = this;

    _classCallCheck(this, Router);

    this.root = root;
    this.routes = new Map();
    this.currentRoute = null;

    window.onpopstate = function (_) {
      if (window.location.pathname) {
        _this.route({
          path: window.location.pathname,
          addToHistory: false
        });
      }
    };
  }
  /**
   * To path with data
   * @param {String} path
   * @param {Object} data
   */


  _createClass(Router, [{
    key: "redirect",
    value: function redirect(path) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.route({
        path: path,
        data: data,
        addToHistory: true
      });
    }
    /**
     * Add controller to path
     * @param {String} path
     * @param {Controller} controller
     */

  }, {
    key: "add",
    value: function add(path, controller) {
      this.routes.set(path, controller);
    }
  }, {
    key: "route",
    value: function route() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          path = _ref.path,
          _ref$data = _ref.data,
          data = _ref$data === void 0 ? {} : _ref$data,
          _ref$addToHistory = _ref.addToHistory,
          addToHistory = _ref$addToHistory === void 0 ? true : _ref$addToHistory;

      var currentController = this.routes.get(this._getRoutePath(this.currentRoute));

      if (currentController) {
        currentController.close();
      }

      if (addToHistory) {
        window.history.pushState(null, null, path);
      }

      var pathWithoutParameters = path.split('?')[0];
      console.log(pathWithoutParameters);

      var routePath = this._getRoutePath(pathWithoutParameters);

      if (this.routes.has(routePath)) {
        var controller = this.routes.get(routePath);

        if (pathsWithId.find(function (el) {
          return el === routePath;
        })) {
          var id = this._extractIdFromPath(path);

          data = _objectSpread({
            id: id
          }, data);
        }

        console.log('router-> render(data)', data);
        this.currentRoute = path;
        controller.openWithData(data);
      } else {
        if (this.routes.has(pathWithoutParameters)) {
          var _controller = this.routes.get(pathWithoutParameters);

          console.log('router-> render(data)', data);
          this.currentRoute = path;

          _controller.openWithData(data);
        } //Error 404

      }
    }
    /**
     * Route
     * @param pathWithoutParameters
     * @returns {string}
     * @private
     */

  }, {
    key: "_getRoutePath",
    value: function _getRoutePath(pathWithoutParameters) {
      if (pathWithoutParameters) {
        return '/' + pathWithoutParameters.split('/')[1];
      }
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      window.addEventListener('click', function (ev) {
        if (ev.target.tagName === 'A') {
          ev.preventDefault();

          _this2.route({
            path: Router._normalizePath(ev.target.pathname),
            addToHistory: true
          });
        }
      }, true);
      this.route({
        path: Router._normalizePath(window.location.pathname),
        addToHistory: true
      });
    }
  }, {
    key: "_extractIdFromPath",
    value: function _extractIdFromPath(path) {
      return path.split('/').pop();
    }
  }], [{
    key: "_normalizePath",
    value: function _normalizePath(path) {
      return path.charAt(path.length - 1) === '/' && path !== '/' ? path.slice(0, path.length - 1) : path;
    }
  }]);

  return Router;
}();

/***/ }),

/***/ "./src/js/modules/validate.js":
/*!************************************!*\
  !*** ./src/js/modules/validate.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Validation; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var errEmailIsInvalid = 'Invalid email';
var errInvalidPasswordData = 'Password must have: 8 symbols, 1 numeral, 1 upper case letter and 1 lowercase.';
var emailRegexExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
var passRegexExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/;

var Validation =
/*#__PURE__*/
function () {
  function Validation() {
    _classCallCheck(this, Validation);
  }

  _createClass(Validation, null, [{
    key: "validateEmail",

    /**
     * Валидирует email.
     * @param email
     * @param withRegex - flag
     * @returns {string}  if not valid => false.
     */
    value: function validateEmail(email) {
      var withRegex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!email || withRegex && !Validation.validateEmailRegex(email)) {
        return errEmailIsInvalid;
      }
    }
    /**
     * Валидирует пароль.
     * @param password
     * @param withRegex - flag (если true - то пароль проверяется Regex на валидность)
     * @returns {string} если не валидный пароль, возвращает ошибку.
     */

  }, {
    key: "validatePassword",
    value: function validatePassword(password) {
      var withRegex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!password || withRegex && !Validation.validatePassRegex(password)) {
        return errInvalidPasswordData;
      }
    }
    /**
     * Validate email.
     * @param email
     * @returns {boolean}
     */

  }, {
    key: "validateEmailRegex",
    value: function validateEmailRegex(email) {
      return emailRegexExp.test(String(email).toLowerCase());
    }
    /**
     * Validate password must have: 8 symbols, 1 numeral, 1 upper case letter and 1 lowercase.
     * @param pass
     * @returns {boolean}
     */

  }, {
    key: "validatePassRegex",
    value: function validatePassRegex(pass) {
      return passRegexExp.test(String(pass));
    }
    /**
     * Empty check.
     * @param value
     * @returns {boolean}
     */

  }, {
    key: "isEmptyField",
    value: function isEmptyField(value) {
      return value === '';
    }
  }]);

  return Validation;
}();



/***/ }),

/***/ "./src/js/modules/view.js":
/*!********************************!*\
  !*** ./src/js/modules/view.js ***!
  \********************************/
/*! exports provided: View */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View", function() { return View; });
/* harmony import */ var _modules_validate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/validate */ "./src/js/modules/validate.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var View =
/*#__PURE__*/
function () {
  function View(root, template, globalEventBus) {
    _classCallCheck(this, View);

    this._root = root;
    this._globalEventBus = globalEventBus;
    this._template = template;
    this.isViewClosed = true;
  }

  _createClass(View, [{
    key: "render",
    value: function render(data) {
      this._root.innerHTML = this._template(data);
      this.isViewClosed = false;
      this.onRender();
    }
  }, {
    key: "onRender",
    value: function onRender() {}
  }, {
    key: "hide",
    value: function hide() {
      this._root.innerHTML = '';
      this.isViewClosed = true;
    }
  }, {
    key: "merge",
    value: function merge(data) {
      this._data = _objectSpread({}, this._data, {}, data);
    }
  }], [{
    key: "_addInputError",
    value: function _addInputError(input, error) {
      var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      if (input) {
        input.classList.add('input_invalid');
      }

      if (error) {
        error.classList.add('error_active');
        error.innerHTML = msg;
      }
    }
  }, {
    key: "_validateObligatoryInputs",
    value: function _validateObligatoryInputs() {
      var _this = this;

      var inputs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var wasfail = false;

      if (inputs) {
        inputs.forEach(function (input) {
          var error = input.nextElementSibling;

          if (_modules_validate__WEBPACK_IMPORTED_MODULE_0__["default"].isEmptyField(input.value)) {
            _this._addInputError(input, error, 'Обязательное поле');

            wasfail = true;
          } else {
            _this._removeInputError(input, error);
          }
        });
      }

      return wasfail;
    }
  }, {
    key: "_removeInputError",
    value: function _removeInputError(input, error) {
      if (input) {
        input.classList.remove('input_invalid');
      }

      if (error) {
        error.classList.remove('error_active');
        error.innerHTML = '';
      }
    }
  }]);

  return View;
}();

/***/ }),

/***/ "./src/js/views/Menu/Menu.js":
/*!***********************************!*\
  !*** ./src/js/views/Menu/Menu.js ***!
  \***********************************/
/*! exports provided: MenuView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuView", function() { return MenuView; });
/* harmony import */ var _modules_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/view */ "./src/js/modules/view.js");
/* harmony import */ var _Menu_pug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Menu.pug */ "./src/js/views/Menu/Menu.pug");
/* harmony import */ var _Menu_pug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Menu_pug__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modules/events */ "./src/js/modules/events.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var MenuView =
/*#__PURE__*/
function (_View) {
  _inherits(MenuView, _View);

  function MenuView(root, globalEventBus) {
    var _this;

    _classCallCheck(this, MenuView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MenuView).call(this, root, _Menu_pug__WEBPACK_IMPORTED_MODULE_1___default.a, globalEventBus));

    _this._globalEventBus.subscribeToEvent(_modules_events__WEBPACK_IMPORTED_MODULE_2__["AUTH"].checkAuthResponse, _this._onAuthResponse.bind(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(MenuView, [{
    key: "render",
    value: function render() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _get(_getPrototypeOf(MenuView.prototype), "render", this).call(this, data);
    }
  }, {
    key: "_onAuthResponse",
    value: function _onAuthResponse(data) {
      _get(_getPrototypeOf(MenuView.prototype), "render", this).call(this, data);
    }
  }]);

  return MenuView;
}(_modules_view__WEBPACK_IMPORTED_MODULE_0__["View"]);

/***/ }),

/***/ "./src/js/views/Menu/Menu.pug":
/*!************************************!*\
  !*** ./src/js/views/Menu/Menu.pug ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(/*! ../../../../node_modules/pug-runtime/index.js */ "./node_modules/pug-runtime/index.js");

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (RegExp, document, unescape) {pug_html = pug_html + "\u003Cstyle\u003E.menu {\n    list-style-type: none;\n    margin: 0;\n    padding: 0;\n    overflow: hidden;\n}\n\n.menu-el-right {\n    float: right;\n}\n\n.menu-el-left {\n    float: left;\n}\n\n.inner-menu-element {\n    display: block;\n    color: white;\n    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;\n    text-align: center;\n    padding: 14px 16px;\n    text-decoration: none;\n    width: 90px;\n    transition-property: transform;\n    transition-duration: 0.25s;\n}\n\n.inner-menu-element:hover {\n    transform: translateY(-5px);\n}\n\n.inner-menu-element:active {\n    transform: translateY(-5px) scale(1.33);\n}\u003C\u002Fstyle\u003E";
pug_mixins["item-right"] = pug_interp = function(title, href, section){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Cli class=\"menu-el-right\"\u003E\u003Ca" + (" class=\"inner-menu-element\""+pug.attr("href", href, true, true)+pug.attr("data-section", section, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
};
pug_mixins["item-left"] = pug_interp = function(title, href, section){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Cli class=\"menu-el-left\"\u003E\u003Ca" + (" class=\"inner-menu-element\""+pug.attr("href", href, true, true)+pug.attr("data-section", section, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
};
const getCookie = (name) => {var re = new RegExp(name + "=([^;]+)"); var value = re.exec(document.cookie); return (value != null) ? unescape(value[1]) : null;}
pug_html = pug_html + "\u003Cul class=\"menu\"\u003E";
pug_mixins["item-left"]('Афиша', '/poster', 'poster');
pug_mixins["item-left"]('О нас', '/about', 'about');
if (getCookie('id') != null) {
pug_mixins["item-right"]('Выход', '/signout', 'signout');
pug_mixins["item-right"]('Профиль', '/profile', 'profile');
}
else {
pug_mixins["item-right"]('Регистрация', '/signup', 'signup');
pug_mixins["item-right"]('Вход', '/signin', 'signin');
}
pug_html = pug_html + "\u003C\u002Ful\u003E";}.call(this,"RegExp" in locals_for_with?locals_for_with.RegExp:typeof RegExp!=="undefined"?RegExp:undefined,"document" in locals_for_with?locals_for_with.document:typeof document!=="undefined"?document:undefined,"unescape" in locals_for_with?locals_for_with.unescape:typeof unescape!=="undefined"?unescape:undefined));;return pug_html;};
module.exports = template;

/***/ }),

/***/ "./src/js/views/Poster/Poster.js":
/*!***************************************!*\
  !*** ./src/js/views/Poster/Poster.js ***!
  \***************************************/
/*! exports provided: PosterView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PosterView", function() { return PosterView; });
/* harmony import */ var _Poster_pug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Poster.pug */ "./src/js/views/Poster/Poster.pug");
/* harmony import */ var _Poster_pug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Poster_pug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/view */ "./src/js/modules/view.js");
/* harmony import */ var _modules_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modules/events */ "./src/js/modules/events.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var PosterView =
/*#__PURE__*/
function (_View) {
  _inherits(PosterView, _View);

  function PosterView(root, eventBus, globalEventBus) {
    var _this;

    _classCallCheck(this, PosterView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PosterView).call(this, root, _Poster_pug__WEBPACK_IMPORTED_MODULE_0___default.a, eventBus, globalEventBus));

    _this._globalEventBus.subscribeToEvent(_modules_events__WEBPACK_IMPORTED_MODULE_2__["AUTH"].checkAuthResponse, _this._onAuthResponse.bind(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(PosterView, [{
    key: "render",
    value: function render() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.merge(data);
      this.isViewClosed = false;

      this._globalEventBus.triggerEvent(_modules_events__WEBPACK_IMPORTED_MODULE_2__["AUTH"].checkAuth);

      _get(_getPrototypeOf(PosterView.prototype), "render", this).call(this, data);
    }
  }, {
    key: "onRender",
    value: function onRender() {}
  }, {
    key: "_onAuthResponse",
    value: function _onAuthResponse(data) {
      if (this.isViewClosed) {
        return;
      } else {
        this.merge(data);
      }

      _get(_getPrototypeOf(PosterView.prototype), "render", this).call(this, this._data);
    }
  }]);

  return PosterView;
}(_modules_view__WEBPACK_IMPORTED_MODULE_1__["View"]);

/***/ }),

/***/ "./src/js/views/Poster/Poster.pug":
/*!****************************************!*\
  !*** ./src/js/views/Poster/Poster.pug ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(/*! ../../../../node_modules/pug-runtime/index.js */ "./node_modules/pug-runtime/index.js");

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cstyle\u003E.container{\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    background-color: #5d2d2e;\n    background-image: url(\"data:image\u002Fsvg+xml,%3Csvg xmlns='http:\u002F\u002Fwww.w3.org\u002F2000\u002Fsvg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpolygon fill='%23b86969' fill-opacity='.1' points='120 0 120 60 90 30 60 0 0 0 0 0 60 60 0 120 60 120 90 90 120 60 120 0'\u002F%3E%3C\u002Fsvg%3E\");\n    padding: 15px;\n}\n\nh1 {\n    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;\n    color: white;\n    margin-bottom: 50px;\n}\n\n.card-item{\n    background-color: aliceblue;\n    width: 360px;\n    height: 360px;\n}\n.card {\n    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);\n    text-align: center;\n    font-family: arial;\n    max-width: 380px;\n    align-self: stretch;\n    \u002F*-webkit-transition: all 0.3s ease;;*\u002F\n    \u002F*-moz-transition: all 0.3s ease;;*\u002F\n    \u002F*-o-transition: all 0.3s ease;;*\u002F\n    \u002F*transition: all 0.3s ease;*\u002F\n    background-color: #c7ecee;\n    display: flex;\n    grid-template-rows: 10px 10px;\n    position: relative;\n}\n\n\u002F*.card:hover {*\u002F\n\u002F*    -webkit-transform: scale(1.2);*\u002F\n\u002F*    -ms-transform: scale(1.2);*\u002F\n\u002F*    transform: scale(1.2);*\u002F\n\u002F*}*\u002F\n\n.price {\n    color: grey;\n    font-size: 22px;\n}\n\n.card button {\n    display: flex;\n    border: none;\n    outline: 0;\n    padding: 12px;\n    color: white;\n    background-color: #222f3e;\n    text-align: center;\n    cursor: pointer;\n    width: 100%;\n    font-size: 18px;\n    flex-direction: column;\n}\n\n.card button:hover {\n    opacity: 0.7;\n}\n\n.card-deck {\n    \u002F* max-height: 550px; *\u002F\n    padding: 10px;\n    display: flex;\n    flex-direction: column;\n}\n\n.card {\n    margin: 10px;\n}\n\nh1{\n    margin-bottom: auto;\n}\n\n.card-item-blur {\n    align-self: end;\n    height: 120px;\n    background: rgba(1,0,0,0.6);\n    position: absolute;\n    width: 360px;\n    color: #dff9fb;\n}\n\n.card-item-blur:hover {\n    display: block;\n}\n\nhtml {\n    height: 100%;\n}\n\n\n\n.body {\n    \u002F* display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    align-items: center;\n    justify-items: center;\n    align-self: center;\n    padding: 10px; *\u002F\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    justify-content: center;\n}\n\na {\n    transition-property: transform;\n    transition-duration: 0.1s;\n    cursor: pointer;\n}\n\na:hover {\n    transform: scale(1.25);\n}\n\na:active {\n    transform: scale(1.25) translateY(-2px);\n}\u003C\u002Fstyle\u003E";
var title = "Joker"
var href ="https://static.karofilm.ru/uploads/film/desktop/e3/b6/4b/5215d5811b80298172dad73fd1.jpg"
var filmUrl="/film"
pug_mixins["card-deck"] = pug_interp = function(title, href, filmUrl){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Cdiv class=\"card\"\u003E\u003Cdiv class=\"card-item\"\u003E\u003Cimg" + (pug.attr("src", href, true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003Cdiv" + (" class=\"card-item-blur\""+pug.attr("src", href, true, true)) + "\u003E\u003Ch1\u003E" + (pug.escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E\u003Ca" + (pug.attr("onclick", filmUrl, true, true)+pug.attr("href", filmUrl, true, true)+" data-section=\"film\"") + "\u003EПодробнее\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
pug_html = pug_html + "\u003Cdiv class=\"container\"\u003E\u003Ch1\u003EФильмы\u003C\u002Fh1\u003E\u003Cdiv class=\"body\"\u003E";
var decks = 3;
while (decks > 0) {
// iterate [1,2,3,4]
;(function(){
  var $$obj = [1,2,3,4];
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var val = $$obj[pug_index0];
pug_mixins["card-deck"](title, href);
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var val = $$obj[pug_index0];
pug_mixins["card-deck"](title, href);
    }
  }
}).call(this);

decks--
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 0:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3B1Zy1ydW50aW1lL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcHBsaWNhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29udHJvbGxlcnMvbWVudUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbnRyb2xsZXJzL3Bvc3RlckNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21vZGVscy9wb3N0ZXJNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21vZHVsZXMvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9ldmVudGJ1cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21vZHVsZXMvbmV0d29yay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21vZHVsZXMvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21vZHVsZXMvdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlld3MvTWVudS9NZW51LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3cy9NZW51L01lbnUucHVnIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3cy9Qb3N0ZXIvUG9zdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3cy9Qb3N0ZXIvUG9zdGVyLnB1ZyIsIndlYnBhY2s6Ly8vZnMgKGlnbm9yZWQpIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImJvZHkiLCJxdWVyeVNlbGVjdG9yIiwiaGVhZGVyIiwiY29udGVudCIsImdsb2JhbEV2ZW50QnVzIiwiRXZlbnRCdXMiLCJBVVRIIiwiUFJPRklMRSIsIm1hcCIsIm1vZGVsIiwiT2JqZWN0IiwidmFsdWVzIiwiZmxhdCIsIm1vZGVscyIsInBvc3RlciIsIlBvc3Rlck1vZGVsIiwiZm9yRWFjaCIsInNldEdsb2JhbEV2ZW50QnVzIiwicm91dGVyIiwiUm91dGVyIiwibWVudUNvbnRyb2xsZXIiLCJNZW51Q29udHJvbGxlciIsInBvc3RlckNvbnRyb2xsZXIiLCJQb3N0ZXJDb250cm9sbGVyIiwib3BlbldpdGhEYXRhIiwiYWRkIiwic3RhcnQiLCJyb290IiwiX3ZpZXciLCJNZW51VmlldyIsIl9yb290IiwiX2dsb2JhbEV2ZW50QnVzIiwiQ29udHJvbGxlciIsIlBvc3RlclZpZXciLCJpZCIsImFwaSIsImdldFBhZ2VGaWxtcyIsInRoZW4iLCJyZXNwb25zZSIsIm9rIiwianNvbiIsImRhdGEiLCJ0cmlnZ2VyRXZlbnQiLCJlcnJvciIsImNvbnNvbGUiLCJzdWJzY3JpYmVUb0V2ZW50IiwiY2hlY2tBdXRoIiwiX29uQ2hlY2tBdXRoIiwiYmluZCIsImF1dGhDaGVjayIsInJlcyIsIkFwaSIsImVtYWlsIiwicGFzc3dvcmQiLCJOZXR3b3JrIiwiZG9Qb3N0IiwiZG9HZXQiLCJkb0RlbGV0ZSIsInVzZXJuYW1lIiwiYXZhdGFyIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsImRvUG9zdEZvcm1EYXRhIiwiZGVzY3JpcHRpb24iLCJkb1B1dCIsInVzZXJJRCIsImZpbG1JRCIsInBhZ2VJRCIsInRpdGxlIiwiZ2VucmVzIiwiZGF0ZSIsImFjdG9ycyIsImRpcmVjdG9ycyIsInJhdGluZyIsInVybCIsIlZpZXciLCJyZW5kZXIiLCJoaWRlIiwiX3JvdXRlciIsImxpc3RPZkV2ZW50cyIsImV2ZW50cyIsIk1hcCIsImV2ZW50TmFtZSIsInNldCIsImNhbGxiYWNrIiwiaGFzIiwiRXJyb3IiLCJnZXQiLCJwdXNoIiwiYXJncyIsImV2ZW50TGlzdGVuZXJzIiwidW5kZWZpbmVkIiwibG9nIiwiY2hlY2tBdXRoUmVzcG9uc2UiLCJzaWduT3V0Iiwic2lnbk91dFJlc3BvbnNlIiwic2lnbkluIiwic2lnbkluU3VjY2VzcyIsInNpZ25JbkZhaWxlZCIsInNpZ25VcEN1c3RvbWVyIiwic2lnblVwU3VjY2VzcyIsInNpZ25VcEZhaWxlZCIsIkZJTE0iLCJnZXRGaWxtcyIsImdldEZpbG1zU3VjY2VzcyIsImdldEZpbG1zRmFpbGVkIiwiY3JlYXRlRmlsbSIsImNyZWF0ZUZpbG1TdWNjZXNzIiwiY3JlYXRlRmlsbUZhaWxlZCIsImdldEZpbG0iLCJnZXRGaWxtU3VjY2VzcyIsImdldEZpbG1GYWlsZWQiLCJsb2FkUHJvZmlsZSIsImxvYWRQcm9maWxlU3VjY2VzcyIsImxvYWRQcm9maWxlRmFpbGVkIiwic2F2ZUJ1dHRvbkNsaWNrZWQiLCJzYXZlUHJvZmlsZSIsInNhdmVQcm9maWxlU3VjY2VzcyIsInNhdmVQcm9maWxlRmFpbGVkIiwic2F2ZUF2YXRhciIsInNhdmVBdmF0YXJTdWNjZXNzIiwic2F2ZUF2YXRhckZhaWxlZCIsInNlcnZlclVybCIsInBhdGgiLCJmZXRjaCIsImdldFNlcnZlclVybCIsIm1ldGhvZCIsIm1vZGUiLCJjcmVkZW50aWFscyIsImhvc3QiLCJKU09OIiwic3RyaW5naWZ5IiwiaGVhZGVycyIsInRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInBhdGhzV2l0aElkIiwicm91dGVzIiwiY3VycmVudFJvdXRlIiwid2luZG93Iiwib25wb3BzdGF0ZSIsIl8iLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwicm91dGUiLCJhZGRUb0hpc3RvcnkiLCJjb250cm9sbGVyIiwiY3VycmVudENvbnRyb2xsZXIiLCJfZ2V0Um91dGVQYXRoIiwiY2xvc2UiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwicGF0aFdpdGhvdXRQYXJhbWV0ZXJzIiwic3BsaXQiLCJyb3V0ZVBhdGgiLCJmaW5kIiwiZWwiLCJfZXh0cmFjdElkRnJvbVBhdGgiLCJldiIsInRhcmdldCIsInRhZ05hbWUiLCJwcmV2ZW50RGVmYXVsdCIsIl9ub3JtYWxpemVQYXRoIiwicG9wIiwiY2hhckF0IiwibGVuZ3RoIiwic2xpY2UiLCJlcnJFbWFpbElzSW52YWxpZCIsImVyckludmFsaWRQYXNzd29yZERhdGEiLCJlbWFpbFJlZ2V4RXhwIiwicGFzc1JlZ2V4RXhwIiwiVmFsaWRhdGlvbiIsIndpdGhSZWdleCIsInZhbGlkYXRlRW1haWxSZWdleCIsInZhbGlkYXRlUGFzc1JlZ2V4IiwidGVzdCIsIlN0cmluZyIsInRvTG93ZXJDYXNlIiwicGFzcyIsInZhbHVlIiwidGVtcGxhdGUiLCJfdGVtcGxhdGUiLCJpc1ZpZXdDbG9zZWQiLCJpbm5lckhUTUwiLCJvblJlbmRlciIsIl9kYXRhIiwiaW5wdXQiLCJtc2ciLCJjbGFzc0xpc3QiLCJpbnB1dHMiLCJ3YXNmYWlsIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwiaXNFbXB0eUZpZWxkIiwiX2FkZElucHV0RXJyb3IiLCJfcmVtb3ZlSW5wdXRFcnJvciIsInJlbW92ZSIsIl9vbkF1dGhSZXNwb25zZSIsImV2ZW50QnVzIiwibWVyZ2UiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FB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LDRCQUE0QiwwQkFBMEIsc0JBQXNCLDhCQUE4QixHQUFHLE9BQU8scUNBQXFDLGdDQUFnQyxzQkFBc0IsR0FBRyxhQUFhLDZCQUE2QixHQUFHLGNBQWMsOENBQThDLEdBQUc7QUFDdHZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLGtEQUFrRCxrQkFBa0I7QUFDcEU7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0Esb0VBQW9FO0FBQ3BFLDBCOzs7Ozs7Ozs7OztBQ2xDQSxlIiwiZmlsZSI6ImFwcGxpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvYXBwbGljYXRpb24uanNcIik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBwdWdfaGFzX293bl9wcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogTWVyZ2UgdHdvIGF0dHJpYnV0ZSBvYmplY3RzIGdpdmluZyBwcmVjZWRlbmNlXG4gKiB0byB2YWx1ZXMgaW4gb2JqZWN0IGBiYC4gQ2xhc3NlcyBhcmUgc3BlY2lhbC1jYXNlZFxuICogYWxsb3dpbmcgZm9yIGFycmF5cyBhbmQgbWVyZ2luZy9qb2luaW5nIGFwcHJvcHJpYXRlbHlcbiAqIHJlc3VsdGluZyBpbiBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYVxuICogQHBhcmFtIHtPYmplY3R9IGJcbiAqIEByZXR1cm4ge09iamVjdH0gYVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5tZXJnZSA9IHB1Z19tZXJnZTtcbmZ1bmN0aW9uIHB1Z19tZXJnZShhLCBiKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdmFyIGF0dHJzID0gYVswXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF0dHJzID0gcHVnX21lcmdlKGF0dHJzLCBhW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGF0dHJzO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoa2V5ID09PSAnY2xhc3MnKSB7XG4gICAgICB2YXIgdmFsQSA9IGFba2V5XSB8fCBbXTtcbiAgICAgIGFba2V5XSA9IChBcnJheS5pc0FycmF5KHZhbEEpID8gdmFsQSA6IFt2YWxBXSkuY29uY2F0KGJba2V5XSB8fCBbXSk7XG4gICAgfSBlbHNlIGlmIChrZXkgPT09ICdzdHlsZScpIHtcbiAgICAgIHZhciB2YWxBID0gcHVnX3N0eWxlKGFba2V5XSk7XG4gICAgICB2YWxBID0gdmFsQSAmJiB2YWxBW3ZhbEEubGVuZ3RoIC0gMV0gIT09ICc7JyA/IHZhbEEgKyAnOycgOiB2YWxBO1xuICAgICAgdmFyIHZhbEIgPSBwdWdfc3R5bGUoYltrZXldKTtcbiAgICAgIHZhbEIgPSB2YWxCICYmIHZhbEJbdmFsQi5sZW5ndGggLSAxXSAhPT0gJzsnID8gdmFsQiArICc7JyA6IHZhbEI7XG4gICAgICBhW2tleV0gPSB2YWxBICsgdmFsQjtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzIGFycmF5LCBvYmplY3QsIG9yIHN0cmluZyBhcyBhIHN0cmluZyBvZiBjbGFzc2VzIGRlbGltaXRlZCBieSBhIHNwYWNlLlxuICpcbiAqIElmIGB2YWxgIGlzIGFuIGFycmF5LCBhbGwgbWVtYmVycyBvZiBpdCBhbmQgaXRzIHN1YmFycmF5cyBhcmUgY291bnRlZCBhc1xuICogY2xhc3Nlcy4gSWYgYGVzY2FwaW5nYCBpcyBhbiBhcnJheSwgdGhlbiB3aGV0aGVyIG9yIG5vdCB0aGUgaXRlbSBpbiBgdmFsYCBpc1xuICogZXNjYXBlZCBkZXBlbmRzIG9uIHRoZSBjb3JyZXNwb25kaW5nIGl0ZW0gaW4gYGVzY2FwaW5nYC4gSWYgYGVzY2FwaW5nYCBpc1xuICogbm90IGFuIGFycmF5LCBubyBlc2NhcGluZyBpcyBkb25lLlxuICpcbiAqIElmIGB2YWxgIGlzIGFuIG9iamVjdCwgYWxsIHRoZSBrZXlzIHdob3NlIHZhbHVlIGlzIHRydXRoeSBhcmUgY291bnRlZCBhc1xuICogY2xhc3Nlcy4gTm8gZXNjYXBpbmcgaXMgZG9uZS5cbiAqXG4gKiBJZiBgdmFsYCBpcyBhIHN0cmluZywgaXQgaXMgY291bnRlZCBhcyBhIGNsYXNzLiBObyBlc2NhcGluZyBpcyBkb25lLlxuICpcbiAqIEBwYXJhbSB7KEFycmF5LjxzdHJpbmc+fE9iamVjdC48c3RyaW5nLCBib29sZWFuPnxzdHJpbmcpfSB2YWxcbiAqIEBwYXJhbSB7P0FycmF5LjxzdHJpbmc+fSBlc2NhcGluZ1xuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmNsYXNzZXMgPSBwdWdfY2xhc3NlcztcbmZ1bmN0aW9uIHB1Z19jbGFzc2VzX2FycmF5KHZhbCwgZXNjYXBpbmcpIHtcbiAgdmFyIGNsYXNzU3RyaW5nID0gJycsIGNsYXNzTmFtZSwgcGFkZGluZyA9ICcnLCBlc2NhcGVFbmFibGVkID0gQXJyYXkuaXNBcnJheShlc2NhcGluZyk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsLmxlbmd0aDsgaSsrKSB7XG4gICAgY2xhc3NOYW1lID0gcHVnX2NsYXNzZXModmFsW2ldKTtcbiAgICBpZiAoIWNsYXNzTmFtZSkgY29udGludWU7XG4gICAgZXNjYXBlRW5hYmxlZCAmJiBlc2NhcGluZ1tpXSAmJiAoY2xhc3NOYW1lID0gcHVnX2VzY2FwZShjbGFzc05hbWUpKTtcbiAgICBjbGFzc1N0cmluZyA9IGNsYXNzU3RyaW5nICsgcGFkZGluZyArIGNsYXNzTmFtZTtcbiAgICBwYWRkaW5nID0gJyAnO1xuICB9XG4gIHJldHVybiBjbGFzc1N0cmluZztcbn1cbmZ1bmN0aW9uIHB1Z19jbGFzc2VzX29iamVjdCh2YWwpIHtcbiAgdmFyIGNsYXNzU3RyaW5nID0gJycsIHBhZGRpbmcgPSAnJztcbiAgZm9yICh2YXIga2V5IGluIHZhbCkge1xuICAgIGlmIChrZXkgJiYgdmFsW2tleV0gJiYgcHVnX2hhc19vd25fcHJvcGVydHkuY2FsbCh2YWwsIGtleSkpIHtcbiAgICAgIGNsYXNzU3RyaW5nID0gY2xhc3NTdHJpbmcgKyBwYWRkaW5nICsga2V5O1xuICAgICAgcGFkZGluZyA9ICcgJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNsYXNzU3RyaW5nO1xufVxuZnVuY3Rpb24gcHVnX2NsYXNzZXModmFsLCBlc2NhcGluZykge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgcmV0dXJuIHB1Z19jbGFzc2VzX2FycmF5KHZhbCwgZXNjYXBpbmcpO1xuICB9IGVsc2UgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBwdWdfY2xhc3Nlc19vYmplY3QodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsIHx8ICcnO1xuICB9XG59XG5cbi8qKlxuICogQ29udmVydCBvYmplY3Qgb3Igc3RyaW5nIHRvIGEgc3RyaW5nIG9mIENTUyBzdHlsZXMgZGVsaW1pdGVkIGJ5IGEgc2VtaWNvbG9uLlxuICpcbiAqIEBwYXJhbSB7KE9iamVjdC48c3RyaW5nLCBzdHJpbmc+fHN0cmluZyl9IHZhbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5cbmV4cG9ydHMuc3R5bGUgPSBwdWdfc3R5bGU7XG5mdW5jdGlvbiBwdWdfc3R5bGUodmFsKSB7XG4gIGlmICghdmFsKSByZXR1cm4gJyc7XG4gIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgIHZhciBvdXQgPSAnJztcbiAgICBmb3IgKHZhciBzdHlsZSBpbiB2YWwpIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICBpZiAocHVnX2hhc19vd25fcHJvcGVydHkuY2FsbCh2YWwsIHN0eWxlKSkge1xuICAgICAgICBvdXQgPSBvdXQgKyBzdHlsZSArICc6JyArIHZhbFtzdHlsZV0gKyAnOyc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHZhbCArICcnO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZXNjYXBlZFxuICogQHBhcmFtIHtCb29sZWFufSB0ZXJzZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHIgPSBwdWdfYXR0cjtcbmZ1bmN0aW9uIHB1Z19hdHRyKGtleSwgdmFsLCBlc2NhcGVkLCB0ZXJzZSkge1xuICBpZiAodmFsID09PSBmYWxzZSB8fCB2YWwgPT0gbnVsbCB8fCAhdmFsICYmIChrZXkgPT09ICdjbGFzcycgfHwga2V5ID09PSAnc3R5bGUnKSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgcmV0dXJuICcgJyArICh0ZXJzZSA/IGtleSA6IGtleSArICc9XCInICsga2V5ICsgJ1wiJyk7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsO1xuICBpZiAoKHR5cGUgPT09ICdvYmplY3QnIHx8IHR5cGUgPT09ICdmdW5jdGlvbicpICYmIHR5cGVvZiB2YWwudG9KU09OID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFsID0gdmFsLnRvSlNPTigpO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsICE9PSAnc3RyaW5nJykge1xuICAgIHZhbCA9IEpTT04uc3RyaW5naWZ5KHZhbCk7XG4gICAgaWYgKCFlc2NhcGVkICYmIHZhbC5pbmRleE9mKCdcIicpICE9PSAtMSkge1xuICAgICAgcmV0dXJuICcgJyArIGtleSArICc9XFwnJyArIHZhbC5yZXBsYWNlKC8nL2csICcmIzM5OycpICsgJ1xcJyc7XG4gICAgfVxuICB9XG4gIGlmIChlc2NhcGVkKSB2YWwgPSBwdWdfZXNjYXBlKHZhbCk7XG4gIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIic7XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtPYmplY3R9IHRlcnNlIHdoZXRoZXIgdG8gdXNlIEhUTUw1IHRlcnNlIGJvb2xlYW4gYXR0cmlidXRlc1xuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHJzID0gcHVnX2F0dHJzO1xuZnVuY3Rpb24gcHVnX2F0dHJzKG9iaiwgdGVyc2Upe1xuICB2YXIgYXR0cnMgPSAnJztcblxuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKHB1Z19oYXNfb3duX3Byb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICB2YXIgdmFsID0gb2JqW2tleV07XG5cbiAgICAgIGlmICgnY2xhc3MnID09PSBrZXkpIHtcbiAgICAgICAgdmFsID0gcHVnX2NsYXNzZXModmFsKTtcbiAgICAgICAgYXR0cnMgPSBwdWdfYXR0cihrZXksIHZhbCwgZmFsc2UsIHRlcnNlKSArIGF0dHJzO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICgnc3R5bGUnID09PSBrZXkpIHtcbiAgICAgICAgdmFsID0gcHVnX3N0eWxlKHZhbCk7XG4gICAgICB9XG4gICAgICBhdHRycyArPSBwdWdfYXR0cihrZXksIHZhbCwgZmFsc2UsIHRlcnNlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYXR0cnM7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZ2l2ZW4gc3RyaW5nIG9mIGBodG1sYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIHB1Z19tYXRjaF9odG1sID0gL1tcIiY8Pl0vO1xuZXhwb3J0cy5lc2NhcGUgPSBwdWdfZXNjYXBlO1xuZnVuY3Rpb24gcHVnX2VzY2FwZShfaHRtbCl7XG4gIHZhciBodG1sID0gJycgKyBfaHRtbDtcbiAgdmFyIHJlZ2V4UmVzdWx0ID0gcHVnX21hdGNoX2h0bWwuZXhlYyhodG1sKTtcbiAgaWYgKCFyZWdleFJlc3VsdCkgcmV0dXJuIF9odG1sO1xuXG4gIHZhciByZXN1bHQgPSAnJztcbiAgdmFyIGksIGxhc3RJbmRleCwgZXNjYXBlO1xuICBmb3IgKGkgPSByZWdleFJlc3VsdC5pbmRleCwgbGFzdEluZGV4ID0gMDsgaSA8IGh0bWwubGVuZ3RoOyBpKyspIHtcbiAgICBzd2l0Y2ggKGh0bWwuY2hhckNvZGVBdChpKSkge1xuICAgICAgY2FzZSAzNDogZXNjYXBlID0gJyZxdW90Oyc7IGJyZWFrO1xuICAgICAgY2FzZSAzODogZXNjYXBlID0gJyZhbXA7JzsgYnJlYWs7XG4gICAgICBjYXNlIDYwOiBlc2NhcGUgPSAnJmx0Oyc7IGJyZWFrO1xuICAgICAgY2FzZSA2MjogZXNjYXBlID0gJyZndDsnOyBicmVhaztcbiAgICAgIGRlZmF1bHQ6IGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAobGFzdEluZGV4ICE9PSBpKSByZXN1bHQgKz0gaHRtbC5zdWJzdHJpbmcobGFzdEluZGV4LCBpKTtcbiAgICBsYXN0SW5kZXggPSBpICsgMTtcbiAgICByZXN1bHQgKz0gZXNjYXBlO1xuICB9XG4gIGlmIChsYXN0SW5kZXggIT09IGkpIHJldHVybiByZXN1bHQgKyBodG1sLnN1YnN0cmluZyhsYXN0SW5kZXgsIGkpO1xuICBlbHNlIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFJlLXRocm93IHRoZSBnaXZlbiBgZXJyYCBpbiBjb250ZXh0IHRvIHRoZVxuICogdGhlIHB1ZyBpbiBgZmlsZW5hbWVgIGF0IHRoZSBnaXZlbiBgbGluZW5vYC5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IGxpbmVub1xuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBvcmlnaW5hbCBzb3VyY2VcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucmV0aHJvdyA9IHB1Z19yZXRocm93O1xuZnVuY3Rpb24gcHVnX3JldGhyb3coZXJyLCBmaWxlbmFtZSwgbGluZW5vLCBzdHIpe1xuICBpZiAoIShlcnIgaW5zdGFuY2VvZiBFcnJvcikpIHRocm93IGVycjtcbiAgaWYgKCh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnIHx8ICFmaWxlbmFtZSkgJiYgIXN0cikge1xuICAgIGVyci5tZXNzYWdlICs9ICcgb24gbGluZSAnICsgbGluZW5vO1xuICAgIHRocm93IGVycjtcbiAgfVxuICB0cnkge1xuICAgIHN0ciA9IHN0ciB8fCByZXF1aXJlKCdmcycpLnJlYWRGaWxlU3luYyhmaWxlbmFtZSwgJ3V0ZjgnKVxuICB9IGNhdGNoIChleCkge1xuICAgIHB1Z19yZXRocm93KGVyciwgbnVsbCwgbGluZW5vKVxuICB9XG4gIHZhciBjb250ZXh0ID0gM1xuICAgICwgbGluZXMgPSBzdHIuc3BsaXQoJ1xcbicpXG4gICAgLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIGNvbnRleHQsIDApXG4gICAgLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIGNvbnRleHQpO1xuXG4gIC8vIEVycm9yIGNvbnRleHRcbiAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSl7XG4gICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyAnICA+ICcgOiAnICAgICcpXG4gICAgICArIGN1cnJcbiAgICAgICsgJ3wgJ1xuICAgICAgKyBsaW5lO1xuICB9KS5qb2luKCdcXG4nKTtcblxuICAvLyBBbHRlciBleGNlcHRpb24gbWVzc2FnZVxuICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCAnUHVnJykgKyAnOicgKyBsaW5lbm9cbiAgICArICdcXG4nICsgY29udGV4dCArICdcXG5cXG4nICsgZXJyLm1lc3NhZ2U7XG4gIHRocm93IGVycjtcbn07XG4iLCJpbXBvcnQge1JvdXRlcn0gZnJvbSAnLi9tb2R1bGVzL3JvdXRlcic7XG5pbXBvcnQge0V2ZW50QnVzfSBmcm9tICcuL21vZHVsZXMvZXZlbnRidXMnO1xuaW1wb3J0IHtQb3N0ZXJDb250cm9sbGVyfSBmcm9tIFwiLi9jb250cm9sbGVycy9wb3N0ZXJDb250cm9sbGVyXCI7XG5pbXBvcnQgUG9zdGVyTW9kZWwgZnJvbSAnLi9tb2RlbHMvcG9zdGVyTW9kZWwnXG5pbXBvcnQge0FVVEgsIFBST0ZJTEV9IGZyb20gXCIuL21vZHVsZXMvZXZlbnRzXCI7XG5pbXBvcnQge01lbnVDb250cm9sbGVyfSBmcm9tIFwiLi9jb250cm9sbGVycy9tZW51Q29udHJvbGxlclwiO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZScpO1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi1jb250ZW50Jyk7XG4gICAgY29uc3QgZ2xvYmFsRXZlbnRCdXMgPSBuZXcgRXZlbnRCdXMoW0FVVEgsIFBST0ZJTEVdLm1hcChtb2RlbCA9PiBPYmplY3QudmFsdWVzKG1vZGVsKSkuZmxhdCgpKTtcbiAgICBjb25zdCBtb2RlbHMgPSB7XG4gICAgICAgIHBvc3RlcjogUG9zdGVyTW9kZWwsXG4gICAgfTtcbiAgICBPYmplY3QudmFsdWVzKG1vZGVscykuZm9yRWFjaChtb2RlbCA9PiBtb2RlbC5zZXRHbG9iYWxFdmVudEJ1cyhnbG9iYWxFdmVudEJ1cykpO1xuXG4gICAgY29uc3Qgcm91dGVyID0gbmV3IFJvdXRlcihib2R5KTtcblxuICAgIGNvbnN0IG1lbnVDb250cm9sbGVyID0gbmV3IE1lbnVDb250cm9sbGVyKGhlYWRlciwgZ2xvYmFsRXZlbnRCdXMsIHJvdXRlcik7XG4gICAgY29uc3QgcG9zdGVyQ29udHJvbGxlciA9IG5ldyBQb3N0ZXJDb250cm9sbGVyKGNvbnRlbnQsIGdsb2JhbEV2ZW50QnVzLCByb3V0ZXIpO1xuICAgIG1lbnVDb250cm9sbGVyLm9wZW5XaXRoRGF0YSgpO1xuICAgIHJvdXRlci5hZGQoJy8nLCBwb3N0ZXJDb250cm9sbGVyKTtcbiAgICByb3V0ZXIuc3RhcnQoKTtcbn0pOyIsImltcG9ydCB7TWVudVZpZXd9IGZyb20gXCIuLi92aWV3cy9NZW51L01lbnVcIjtcbmltcG9ydCB7Q29udHJvbGxlcn0gZnJvbSBcIi4uL21vZHVsZXMvY29udHJvbGxlclwiO1xuXG5leHBvcnQgY2xhc3MgTWVudUNvbnRyb2xsZXIgZXh0ZW5kcyBDb250cm9sbGVye1xuICAgIGNvbnN0cnVjdG9yIChyb290LCBnbG9iYWxFdmVudEJ1cywgcm91dGVyKSB7XG4gICAgICAgIHN1cGVyKHJvb3QsIGdsb2JhbEV2ZW50QnVzLCByb3V0ZXIpO1xuICAgICAgICB0aGlzLl92aWV3ID0gbmV3IE1lbnVWaWV3KHRoaXMuX3Jvb3QsIHRoaXMuX2dsb2JhbEV2ZW50QnVzKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgUG9zdGVyVmlldyB9IGZyb20gJy4uL3ZpZXdzL1Bvc3Rlci9Qb3N0ZXInO1xuaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gJy4uL21vZHVsZXMvY29udHJvbGxlcic7XG5cbmV4cG9ydCBjbGFzcyBQb3N0ZXJDb250cm9sbGVyIGV4dGVuZHMgQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IgKHJvb3QsIGdsb2JhbEV2ZW50QnVzLCByb3V0ZXIpIHtcbiAgICAgICAgc3VwZXIocm9vdCwgZ2xvYmFsRXZlbnRCdXMsIHJvdXRlcik7XG5cbiAgICAgICAgdGhpcy5fdmlldyA9IG5ldyBQb3N0ZXJWaWV3KHRoaXMuX3Jvb3QsIHRoaXMuX2dsb2JhbEV2ZW50QnVzKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCBhcGkgZnJvbSBcIi4uL21vZHVsZXMvYXBpXCI7XG5pbXBvcnQge0FVVEh9IGZyb20gXCIuLi9tb2R1bGVzL2V2ZW50c1wiO1xuXG5jbGFzcyBQb3N0ZXJNb2RlbCB7XG4gICAgX2xvYWRQYWdlKGlkKXtcbiAgICAgICAgYXBpLmdldFBhZ2VGaWxtcyhpZCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5qc29uKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2xvYmFsRXZlbnRCdXMudHJpZ2dlckV2ZW50KCdsb2FkU3VjY2VzcycsIGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5qc29uKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2xvYmFsRXZlbnRCdXMudHJpZ2dlckV2ZW50KCdsb2FkRmFpbGVkJywgZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgIH1cblxuICAgIHNldEdsb2JhbEV2ZW50QnVzIChnbG9iYWxFdmVudEJ1cykge1xuICAgICAgICB0aGlzLl9nbG9iYWxFdmVudEJ1cyA9IGdsb2JhbEV2ZW50QnVzO1xuICAgICAgICB0aGlzLl9nbG9iYWxFdmVudEJ1cy5zdWJzY3JpYmVUb0V2ZW50KEFVVEguY2hlY2tBdXRoLCB0aGlzLl9vbkNoZWNrQXV0aC5iaW5kKHRoaXMpKVxuXG4gICAgfVxuXG4gICAgX29uQ2hlY2tBdXRoKCl7XG4gICAgICAgIGFwaS5hdXRoQ2hlY2soKVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+e1xuICAgICAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBQb3N0ZXJNb2RlbCgpOyIsImltcG9ydCBOZXR3b3JrIGZyb20gJy4vbmV0d29yayc7XG5cbi8qKlxuICogQVBJIG9iamVjdFxuICogQGNsYXNzXG4gKiBAdHlwZSB7QXBpfVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcGkge1xuXG4gICAgLyoqXG4gICAgICogQVBJIExvZ2luXG4gICAgICogUE9TVCAvc2Vzc2lvbnMvXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlbWFpbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFJlc3BvbnNlPn1cbiAgICAgKi9cbiAgICBzdGF0aWMgbG9naW4oe2VtYWlsLCBwYXNzd29yZH0pIHtcbiAgICAgICAgcmV0dXJuIE5ldHdvcmsuZG9Qb3N0KCcvc2Vzc2lvbnMvJywge1xuICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQVBJIENoZWNrIGF1dGhcbiAgICAgKiBHRVQgL3Nlc3Npb25zL1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxSZXNwb25zZT59XG4gICAgICovXG4gICAgc3RhdGljIGF1dGhDaGVjaygpIHtcbiAgICAgICAgcmV0dXJuIE5ldHdvcmsuZG9HZXQoJy9zZXNzaW9uJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQVBJIExvZ291dFxuICAgICAqIGRlbGV0ZSAvc2Vzc2lvbnMvXG4gICAgICogQHN0YXRpY1xuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFJlc3BvbnNlPn1cbiAgICAgKi9cbiAgICBzdGF0aWMgbG9nb3V0KCkge1xuICAgICAgICByZXR1cm4gTmV0d29yay5kb0RlbGV0ZSgnL3Nlc3Npb24vJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQVBJIFJlZ2lzdHJhdGlvblxuICAgICAqIFBPU1QgL3VzZXJzL1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZW1haWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFzc3dvcmRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcm5hbWVcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxSZXNwb25zZT59XG4gICAgICovXG4gICAgc3RhdGljIHJlZ2lzdGVyKHtlbWFpbCwgcGFzc3dvcmQsIHVzZXJuYW1lfSkge1xuICAgICAgICByZXR1cm4gTmV0d29yay5kb1Bvc3QoJy91c2Vycy8nLCB7XG4gICAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICAgICAgdXNlcm5hbWUsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFQSSBFZGl0IGF2YXRhclxuICAgICAqIFBPU1QgL2ltYWdlcy9cbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGF2YXRhciAtINC90L7QstC+0LUg0LjQt9C+0LHRgNCw0LbQtdC90LjQtVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySURcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxSZXNwb25zZT59XG4gICAgICovXG4gICAgc3RhdGljIGVkaXRBdmF0YXIoe2F2YXRhcn0pIHtcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdmaWxlJywgYXZhdGFyLmF2YXRhcik7XG4gICAgICAgIHJldHVybiBOZXR3b3JrLmRvUG9zdEZvcm1EYXRhKCcvdXNlcnMvaW1hZ2VzLycsIGZvcm1EYXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBUEkgRWRpdCBwcm9maWxlXG4gICAgICogUFVUIC91c2Vycy9cbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVtYWlsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc2NyaXB0aW9uXG4gICAgICogQHJldHVybnMge1Byb21pc2U8UmVzcG9uc2U+fVxuICAgICAqL1xuICAgIHN0YXRpYyBlZGl0UHJvZmlsZSh7dXNlcm5hbWUsIGRlc2NyaXB0aW9ufSkge1xuICAgICAgICByZXR1cm4gTmV0d29yay5kb1B1dCgnL3VzZXJzLycsIHtcbiAgICAgICAgICAgIHVzZXJuYW1lLFxuICAgICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFQSSBHZXQgcHJvZmlsZSBpbmZvXG4gICAgICogR0VUIC91c2Vycy9cbiAgICAgKiBAc3RhdGljXG4gICAgICogQHJldHVybnMge1Byb21pc2U8UmVzcG9uc2U+fVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRQcm9maWxlSW5mbygpIHtcbiAgICAgICAgcmV0dXJuIE5ldHdvcmsuZG9HZXQoJy91c2Vycy8nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBUEkgR2V0IGFub3RoZXIgdXNlciBpbmZvXG4gICAgICogR0VUIC91c2Vycy97dXNlcl9pZH1cbiAgICAgKiBAc3RhdGljXG4gICAgICogQHJldHVybnMge1Byb21pc2U8UmVzcG9uc2U+fVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRBbm90aGVyVXNlckluZm8oe3VzZXJJRH0pIHtcbiAgICAgICAgcmV0dXJuIE5ldHdvcmsuZG9HZXQoYC91c2Vycy8ke3VzZXJJRH0vYCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQVBJIEdldCBmaWxtIGluZm9cbiAgICAgKiBHRVQgL2ZpbG1zL3tmaWxtX2lkfS9cbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpbG1JRFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFJlc3BvbnNlPn1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0RmlsbUluZm8oe2ZpbG1JRH0pIHtcbiAgICAgICAgcmV0dXJuIE5ldHdvcmsuZG9HZXQoYC9maWxtcy8ke2ZpbG1JRH0vYCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQVBJIEdldCBhbGwgZmlsbXMgZm9yIGNlcnRhaW4gcGFnZVxuICAgICAqIEdFVCAvZmlsbXMve3BhZ2VJRH0vXG4gICAgICogQHBhcmFtIHBhZ2VJRFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFJlc3BvbnNlPn1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0UGFnZUZpbG1zKHtwYWdlSUR9KXtcbiAgICAgICAgcmV0dXJuIE5ldHdvcmsuZG9HZXQoYC9maWxtcy8ke3BhZ2VJRH0vYCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQVBJIEFkZCBuZXcgZmlsbVxuICAgICAqIFBPU1QgL2ZpbG1zL1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVzY3JpcHRpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBnZW5yZXNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFjdG9yc1xuICAgICAqIEBwYXJhbSB7QXJyYXl9IGRpcmVjdG9yc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYXRpbmdcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxSZXNwb25zZT59XG4gICAgICovXG4gICAgc3RhdGljIGFkZE5ld0ZpbG0oe3RpdGxlLCBkZXNjcmlwdGlvbiwgZ2VucmVzLCBkYXRlLCBhY3RvcnMsIGRpcmVjdG9ycywgcmF0aW5nfSkge1xuICAgICAgICByZXR1cm4gTmV0d29yay5kb1Bvc3QoJy9maWxtcy8nLCB7XG4gICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZ2VucmVzLFxuICAgICAgICAgICAgZGF0ZSxcbiAgICAgICAgICAgIGFjdG9ycyxcbiAgICAgICAgICAgIGRpcmVjdG9ycyxcbiAgICAgICAgICAgIHJhdGluZyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQVBJIENoZWNrIHNlc3Npb25cbiAgICAgKiBAc3RhdGljXG4gICAgICogQHJldHVybnMge1Byb21pc2U8UmVzcG9uc2U+fVxuICAgICAqL1xuICAgIHN0YXRpYyBjaGVja1Nlc3Npb24gKCkge1xuICAgICAgICByZXR1cm4gTmV0d29yay5kb0dldCh7IHVybDogJy9hdXRoJyB9KTtcbiAgICB9XG59IiwiaW1wb3J0IHtWaWV3fSBmcm9tIFwiLi92aWV3XCI7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSBcIi4vcm91dGVyXCI7XG5pbXBvcnQge0V2ZW50QnVzfSBmcm9tIFwiLi9ldmVudGJ1c1wiO1xuXG5leHBvcnQgY2xhc3MgQ29udHJvbGxlciB7XG4gICAgX3ZpZXcgPSBuZXcgVmlldygpO1xuICAgIGNvbnN0cnVjdG9yIChyb290LCBnbG9iYWxFdmVudEJ1cywgcm91dGVyKSB7XG4gICAgICAgIHRoaXMuX3Jvb3QgPSByb290O1xuICAgICAgICB0aGlzLl9nbG9iYWxFdmVudEJ1cyA9IGdsb2JhbEV2ZW50QnVzO1xuICAgICAgICB0aGlzLl9yb3V0ZXIgPSByb3V0ZXI7XG4gICAgfVxuXG4gICAgb3BlbldpdGhEYXRhID0gKGRhdGEgPSB7fSkgPT4ge1xuICAgICAgICB0aGlzLl92aWV3LnJlbmRlcihkYXRhKTtcbiAgICB9XG5cbiAgICBjbG9zZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5fdmlldy5oaWRlKCk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBFdmVudHMgY3JlYXRpb25cbiAqIEBjbGFzc1xuICogQHR5cGUge0V2ZW50QnVzfVxuICovXG5cbmV4cG9ydCBjbGFzcyBFdmVudEJ1cyB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIGxpc3RPZkV2ZW50cyBBcnJheVtzdHJpbmddIGF2YWlsYWJsZSBldmVudHNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciAobGlzdE9mRXZlbnRzPVt7fV0pIHtcbiAgICAgICAgdGhpcy5ldmVudHMgPSBuZXcgTWFwKCk7XG4gICAgICAgIGxpc3RPZkV2ZW50cy5mb3JFYWNoKChldmVudE5hbWUpID0+XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5zZXQoZXZlbnROYW1lLCBbXSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdWJzY3JpcHRpb24gdG8gZXZlbnRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBzdWJzY3JpYmVUb0V2ZW50IChldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICghdGhpcy5ldmVudHMuaGFzKGV2ZW50TmFtZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXZlbnRCdXM6IFVua25vd24gZXZlbnQgJHtldmVudE5hbWV9YCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmV2ZW50cy5nZXQoZXZlbnROYW1lKS5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyIGFsbCBjYWxsYmFja3MgZm9yIGV2ZW50c1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gYXJnc1xuICAgICAqL1xuXG4gICAgdHJpZ2dlckV2ZW50IChldmVudE5hbWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgaWYgKCF0aGlzLmV2ZW50cy5oYXMoZXZlbnROYW1lKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFdmVudEJ1czogVW5rbm93biBldmVudCAke2V2ZW50TmFtZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBldmVudExpc3RlbmVycyA9IHRoaXMuZXZlbnRzLmdldChldmVudE5hbWUpO1xuICAgICAgICBldmVudExpc3RlbmVycy5mb3JFYWNoKChjYWxsYmFjaykgPT5cbiAgICAgICAgICAgIGNhbGxiYWNrKC4uLmFyZ3MpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbCBmdW5jIGJ5IGV2ZW50XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBhcmdzXG4gICAgICogQHJldHVybiB7Kn1cbiAgICAgKi9cbiAgICBkaXNwYXRjaEV2ZW50KGV2ZW50TmFtZSwgLi4uYXJncykge1xuICAgICAgICBpZiAoZXZlbnROYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdObyBldmVudCB2YWx1ZScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ05vIHN1Y2ggZXZlbnQ6ICcgKyBldmVudE5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0oLi4uYXJncyk7XG4gICAgfVxufSIsIlxuZXhwb3J0IGNvbnN0IEFVVEggPSB7XG4gICAgY2hlY2tBdXRoOiAnY2hlY2tBdXRoJyxcbiAgICBjaGVja0F1dGhSZXNwb25zZTogJ2F1dGhSJyxcblxuICAgIHNpZ25PdXQ6ICdzaWduT3V0JyxcbiAgICBzaWduT3V0UmVzcG9uc2U6ICdzaWduT3V0UicsXG5cbiAgICBzaWduSW46ICdzaWduSW4nLFxuICAgIHNpZ25JblN1Y2Nlc3M6ICdzaWduSW5TJyxcbiAgICBzaWduSW5GYWlsZWQ6ICdzaWduSW5GJyxcblxuICAgIHNpZ25VcEN1c3RvbWVyOiAnc2lnblVwQ3VzdG9tZXInLFxuICAgIHNpZ25VcFN1Y2Nlc3M6ICdzaWduVXBTJyxcbiAgICBzaWduVXBGYWlsZWQ6ICdzaWduVXBGJyxcblxufTtcblxuZXhwb3J0IGNvbnN0IEZJTE0gPSB7XG4gICAgZ2V0RmlsbXM6ICdnZXRGaWxtcycsXG4gICAgZ2V0RmlsbXNTdWNjZXNzOiAnZ2V0RmlsbXNTJyxcbiAgICBnZXRGaWxtc0ZhaWxlZDogJ2dldEZpbG1zRicsXG5cbiAgICBjcmVhdGVGaWxtOiAnY3JlYXRlRmlsbScsXG4gICAgY3JlYXRlRmlsbVN1Y2Nlc3M6ICdjcmVhdGVGaWxtUycsXG4gICAgY3JlYXRlRmlsbUZhaWxlZDogJ2NyZWF0ZUZpbG1GJyxcblxuICAgIGdldEZpbG06ICdnZXRGaWxtJyxcbiAgICBnZXRGaWxtU3VjY2VzczogJ2dldEZpbG1TJyxcbiAgICBnZXRGaWxtRmFpbGVkOiAnZ2V0RmlsbUYnLFxufTtcblxuZXhwb3J0IGNvbnN0IFBST0ZJTEUgPSB7XG4gICAgbG9hZFByb2ZpbGU6ICdsb2FkUHJvZmlsZScsXG4gICAgbG9hZFByb2ZpbGVTdWNjZXNzOiAnbG9hZFByb2ZpbGVTJyxcbiAgICBsb2FkUHJvZmlsZUZhaWxlZDogJ2xvYWRQcm9maWxlRicsXG4gICAgc2F2ZUJ1dHRvbkNsaWNrZWQ6ICdzYXZlQnV0dG9uQycsXG4gICAgc2F2ZVByb2ZpbGU6ICdzYXZlUHJvZmlsZScsXG4gICAgc2F2ZVByb2ZpbGVTdWNjZXNzOiAnc2F2ZVByb2ZpbGVTJyxcbiAgICBzYXZlUHJvZmlsZUZhaWxlZDogJ3NhdmVQcm9maWxlRicsXG4gICAgc2F2ZUF2YXRhcjogJ3NhdmVBdmF0YXInLFxuICAgIHNhdmVBdmF0YXJTdWNjZXNzOiAnc2F2ZUF2YXRhclMnLFxuICAgIHNhdmVBdmF0YXJGYWlsZWQ6ICdzYXZlQXZhdGFyRicsXG59O1xuIiwiY29uc3Qgc2VydmVyVXJsID0gJ2h0dHA6Ly8xMjcuMC4wLjE6ODA4MCc7XG5cbi8qKlxuICogTmV3IE5ldHdvcmsgb2JqXG4gKiBAY2xhc3NcbiAqIEB0eXBlIHtOZXR3b3JrfVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ldHdvcmsge1xuXG4gICAgLyoqXG4gICAgICogR2V0IHJlcXVlc3RcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxSZXNwb25zZT59XG4gICAgICovXG5cbiAgICBzdGF0aWMgZG9HZXQocGF0aCA9ICcvJykge1xuICAgICAgICByZXR1cm4gZmV0Y2goTmV0d29yay5nZXRTZXJ2ZXJVcmwoKSArIHBhdGgsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICBtb2RlOiAnbm8tY29ycycsXG4gICAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQb3N0IHJlcXVlc3RcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYm9keVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBob3N0XG4gICAgICogQHJldHVybnMge1Byb21pc2U8UmVzcG9uc2U+fVxuICAgICAqL1xuXG4gICAgc3RhdGljIGRvUG9zdChwYXRoID0gJy8nLCBib2R5ICA9IHt9LCBob3N0ID0gTmV0d29yay5nZXRTZXJ2ZXJVcmwoKSkge1xuICAgICAgICByZXR1cm4gZmV0Y2goaG9zdCArIHBhdGgsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBtb2RlOiAnY29ycycsXG4gICAgICAgICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERFTEVURSByZXF1ZXN0XG4gICAgICogQHBhcmFtIHBhdGhcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxSZXNwb25zZT59XG4gICAgICovXG5cbiAgICBzdGF0aWMgZG9EZWxldGUocGF0aCA9ICcvJykge1xuICAgICAgICByZXR1cm4gZmV0Y2goTmV0d29yay5nZXRTZXJ2ZXJVcmwoKSArIHBhdGgsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgICAgICAgIG1vZGU6IFwiY29yc1wiLFxuICAgICAgICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQVVQgcmVxdWVzdFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5XG4gICAgICogQHJldHVybiB7UHJvbWlzZTxSZXNwb25zZT59XG4gICAgICovXG5cbiAgICBzdGF0aWMgZG9QdXQocGF0aCA9ICcvJywgYm9keSA9IHt9KSB7XG4gICAgICAgIHJldHVybiBmZXRjaChOZXR3b3JrLmdldFNlcnZlclVybCgpICsgcGF0aCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgICAgICAgbW9kZTogXCJjb3JzXCIsXG4gICAgICAgICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBQb3N0IGZvcm1EYXRhXG4gICAgICogIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogIEBzdGF0aWNcbiAgICAgKiAgQHBhcmFtIHtPYmplY3R9IGJvZHlcbiAgICAgKiAgQHJldHVybnMge1Byb21pc2U8UmVzcG9uc2U+fVxuICAgICAqL1xuXG4gICAgc3RhdGljIGRvUG9zdEZvcm1EYXRhICh7IHVybCA9ICcvJywgYm9keSA9IHt9IH0gPSB7fSkge1xuICAgICAgICBsZXQgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbiAgICAgICAgcmV0dXJuIGZldGNoKE5ldHdvcmsuZ2V0U2VydmVyVXJsKCkgKyB1cmwsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keSxcbiAgICAgICAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ1gtQ1NSRi1Ub2tlbic6IHRva2VuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBVVCBmb3JtLWRhdGEgcmVxdWVzdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGJvZHlcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxSZXNwb25zZT59XG4gICAgICovXG4gICAgc3RhdGljIGRvUHV0Rm9ybURhdGEocGF0aCA9ICcvJywgYm9keSkge1xuICAgICAgICByZXR1cm4gZmV0Y2goTmV0d29yay5nZXRTZXJ2ZXJVcmwoKSArIHBhdGgsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgICBtb2RlOiAnY29ycycsXG4gICAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgICAgICAgYm9keSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VydmVyIFVSTFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG5cbiAgICBzdGF0aWMgZ2V0U2VydmVyVXJsKCkge1xuICAgICAgICByZXR1cm4gc2VydmVyVXJsXG4gICAgfVxufSIsImNvbnN0IHBhdGhzV2l0aElkID0gW1xuICAgICcvcHJvZmlsZScsXG4gICAgJy9wb3N0ZXInLFxuICAgICcvZmlsbSdcbl07XG5cbmV4cG9ydCBjbGFzcyBSb3V0ZXIge1xuICAgIGNvbnN0cnVjdG9yIChyb290KSB7XG4gICAgICAgIHRoaXMucm9vdCA9IHJvb3Q7XG4gICAgICAgIHRoaXMucm91dGVzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIHRoaXMuY3VycmVudFJvdXRlID0gbnVsbDtcblxuICAgICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IF8gPT4ge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGUoeyBwYXRoOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsIGFkZFRvSGlzdG9yeTogZmFsc2UgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUbyBwYXRoIHdpdGggZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICByZWRpcmVjdCAocGF0aCwgZGF0YSA9IHt9KSB7XG4gICAgICAgIHRoaXMucm91dGUoeyBwYXRoLCBkYXRhLCBhZGRUb0hpc3Rvcnk6IHRydWUgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGNvbnRyb2xsZXIgdG8gcGF0aFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIHtDb250cm9sbGVyfSBjb250cm9sbGVyXG4gICAgICovXG4gICAgYWRkIChwYXRoLCBjb250cm9sbGVyKSB7XG4gICAgICAgIHRoaXMucm91dGVzLnNldChwYXRoLCBjb250cm9sbGVyKTtcbiAgICB9XG5cbiAgICByb3V0ZSAoeyBwYXRoLCBkYXRhID0ge30sIGFkZFRvSGlzdG9yeSA9IHRydWUgfSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb250cm9sbGVyID0gdGhpcy5yb3V0ZXMuZ2V0KHRoaXMuX2dldFJvdXRlUGF0aCh0aGlzLmN1cnJlbnRSb3V0ZSkpO1xuICAgICAgICBpZiAoY3VycmVudENvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIGN1cnJlbnRDb250cm9sbGVyLmNsb3NlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYWRkVG9IaXN0b3J5KSB7XG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgcGF0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXRoV2l0aG91dFBhcmFtZXRlcnMgPSBwYXRoLnNwbGl0KCc/JylbMF07XG4gICAgICAgIGNvbnNvbGUubG9nKHBhdGhXaXRob3V0UGFyYW1ldGVycyk7XG4gICAgICAgIGNvbnN0IHJvdXRlUGF0aCA9IHRoaXMuX2dldFJvdXRlUGF0aChwYXRoV2l0aG91dFBhcmFtZXRlcnMpO1xuXG4gICAgICAgIGlmICh0aGlzLnJvdXRlcy5oYXMocm91dGVQYXRoKSkge1xuICAgICAgICAgICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMucm91dGVzLmdldChyb3V0ZVBhdGgpO1xuXG4gICAgICAgICAgICBpZiAocGF0aHNXaXRoSWQuZmluZChlbCA9PiBlbCA9PT0gcm91dGVQYXRoKSkge1xuICAgICAgICAgICAgICAgIGxldCBpZCA9IHRoaXMuX2V4dHJhY3RJZEZyb21QYXRoKHBhdGgpO1xuICAgICAgICAgICAgICAgIGRhdGEgPSB7IGlkLCAuLi5kYXRhIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncm91dGVyLT4gcmVuZGVyKGRhdGEpJywgZGF0YSk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRSb3V0ZSA9IHBhdGg7XG4gICAgICAgICAgICBjb250cm9sbGVyLm9wZW5XaXRoRGF0YShkYXRhKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMucm91dGVzLmhhcyhwYXRoV2l0aG91dFBhcmFtZXRlcnMpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMucm91dGVzLmdldChwYXRoV2l0aG91dFBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyb3V0ZXItPiByZW5kZXIoZGF0YSknLCBkYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRSb3V0ZSA9IHBhdGg7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlci5vcGVuV2l0aERhdGEoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL0Vycm9yIDQwNFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUm91dGVcbiAgICAgKiBAcGFyYW0gcGF0aFdpdGhvdXRQYXJhbWV0ZXJzXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9nZXRSb3V0ZVBhdGggKHBhdGhXaXRob3V0UGFyYW1ldGVycykge1xuICAgICAgICBpZiAocGF0aFdpdGhvdXRQYXJhbWV0ZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gJy8nICsgcGF0aFdpdGhvdXRQYXJhbWV0ZXJzLnNwbGl0KCcvJylbMV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgX25vcm1hbGl6ZVBhdGggKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGguY2hhckF0KHBhdGgubGVuZ3RoIC0gMSkgPT09ICcvJyAmJiBwYXRoICE9PSAnLycgPyBwYXRoLnNsaWNlKDAsIHBhdGgubGVuZ3RoIC0gMSkgOiBwYXRoO1xuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXYudGFyZ2V0LnRhZ05hbWUgPT09ICdBJykge1xuICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZSh7IHBhdGg6IFJvdXRlci5fbm9ybWFsaXplUGF0aChldi50YXJnZXQucGF0aG5hbWUpLCBhZGRUb0hpc3Rvcnk6IHRydWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIHRoaXMucm91dGUoeyBwYXRoOiBSb3V0ZXIuX25vcm1hbGl6ZVBhdGgod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKSwgYWRkVG9IaXN0b3J5OiB0cnVlIH0pO1xuICAgIH1cblxuICAgIF9leHRyYWN0SWRGcm9tUGF0aCAocGF0aCkge1xuICAgICAgICByZXR1cm4gcGF0aC5zcGxpdCgnLycpLnBvcCgpO1xuICAgIH1cbn0iLCJjb25zdCBlcnJFbWFpbElzSW52YWxpZCA9ICdJbnZhbGlkIGVtYWlsJztcbmNvbnN0IGVyckludmFsaWRQYXNzd29yZERhdGEgPVxuICAgICdQYXNzd29yZCBtdXN0IGhhdmU6IDggc3ltYm9scywgMSBudW1lcmFsLCAxIHVwcGVyIGNhc2UgbGV0dGVyIGFuZCAxIGxvd2VyY2FzZS4nO1xuY29uc3QgZW1haWxSZWdleEV4cCA9IC9bYS16MC05ISMkJSYnKisvPT9eX2B7fH1+LV0rKD86XFwuW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKykqQCg/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cXC4pK1thLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT8vO1xuY29uc3QgcGFzc1JlZ2V4RXhwID0gL14oPz0uKlxcZCkoPz0uKlthLXpdKSg/PS4qW0EtWl0pKD89Lns4LH0pLztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFsaWRhdGlvbiB7XG4gICAgLyoqXG4gICAgICog0JLQsNC70LjQtNC40YDRg9C10YIgZW1haWwuXG4gICAgICogQHBhcmFtIGVtYWlsXG4gICAgICogQHBhcmFtIHdpdGhSZWdleCAtIGZsYWdcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSAgaWYgbm90IHZhbGlkID0+IGZhbHNlLlxuICAgICAqL1xuICAgIHN0YXRpYyB2YWxpZGF0ZUVtYWlsKGVtYWlsLCB3aXRoUmVnZXggPSBmYWxzZSkge1xuICAgICAgICBpZiAoIWVtYWlsIHx8ICh3aXRoUmVnZXggJiYgIVZhbGlkYXRpb24udmFsaWRhdGVFbWFpbFJlZ2V4KGVtYWlsKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJFbWFpbElzSW52YWxpZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0LDQu9C40LTQuNGA0YPQtdGCINC/0LDRgNC+0LvRjC5cbiAgICAgKiBAcGFyYW0gcGFzc3dvcmRcbiAgICAgKiBAcGFyYW0gd2l0aFJlZ2V4IC0gZmxhZyAo0LXRgdC70LggdHJ1ZSAtINGC0L4g0L/QsNGA0L7Qu9GMINC/0YDQvtCy0LXRgNGP0LXRgtGB0Y8gUmVnZXgg0L3QsCDQstCw0LvQuNC00L3QvtGB0YLRjClcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSDQtdGB0LvQuCDQvdC1INCy0LDQu9C40LTQvdGL0Lkg0L/QsNGA0L7Qu9GMLCDQstC+0LfQstGA0LDRidCw0LXRgiDQvtGI0LjQsdC60YMuXG4gICAgICovXG4gICAgc3RhdGljIHZhbGlkYXRlUGFzc3dvcmQocGFzc3dvcmQsIHdpdGhSZWdleCA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghcGFzc3dvcmQgfHwgKHdpdGhSZWdleCAmJiAhVmFsaWRhdGlvbi52YWxpZGF0ZVBhc3NSZWdleChwYXNzd29yZCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJySW52YWxpZFBhc3N3b3JkRGF0YTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIGVtYWlsLlxuICAgICAqIEBwYXJhbSBlbWFpbFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyB2YWxpZGF0ZUVtYWlsUmVnZXgoZW1haWwpIHtcbiAgICAgICAgcmV0dXJuIGVtYWlsUmVnZXhFeHAudGVzdChTdHJpbmcoZW1haWwpLnRvTG93ZXJDYXNlKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIHBhc3N3b3JkIG11c3QgaGF2ZTogOCBzeW1ib2xzLCAxIG51bWVyYWwsIDEgdXBwZXIgY2FzZSBsZXR0ZXIgYW5kIDEgbG93ZXJjYXNlLlxuICAgICAqIEBwYXJhbSBwYXNzXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIHZhbGlkYXRlUGFzc1JlZ2V4KHBhc3MpIHtcbiAgICAgICAgcmV0dXJuIHBhc3NSZWdleEV4cC50ZXN0KFN0cmluZyhwYXNzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRW1wdHkgY2hlY2suXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIGlzRW1wdHlGaWVsZCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgPT09ICcnO1xuICAgIH1cbn0iLCJpbXBvcnQgVmFsaWRhdGlvbiBmcm9tICcuLi9tb2R1bGVzL3ZhbGlkYXRlJztcblxuZXhwb3J0IGNsYXNzIFZpZXcge1xuICAgIGNvbnN0cnVjdG9yIChyb290LCB0ZW1wbGF0ZSwgZ2xvYmFsRXZlbnRCdXMpIHtcbiAgICAgICAgdGhpcy5fcm9vdCA9IHJvb3Q7XG4gICAgICAgIHRoaXMuX2dsb2JhbEV2ZW50QnVzID0gZ2xvYmFsRXZlbnRCdXM7XG4gICAgICAgIHRoaXMuX3RlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgICAgIHRoaXMuaXNWaWV3Q2xvc2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX2FkZElucHV0RXJyb3IgKGlucHV0LCBlcnJvciwgbXNnID0gJycpIHtcbiAgICAgICAgaWYgKGlucHV0KSB7XG4gICAgICAgICAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKCdpbnB1dF9pbnZhbGlkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICBlcnJvci5jbGFzc0xpc3QuYWRkKCdlcnJvcl9hY3RpdmUnKTtcbiAgICAgICAgICAgIGVycm9yLmlubmVySFRNTCA9IG1zZztcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBzdGF0aWMgX3ZhbGlkYXRlT2JsaWdhdG9yeUlucHV0cyAoaW5wdXRzID0ge30pIHtcbiAgICAgICAgbGV0IHdhc2ZhaWwgPSBmYWxzZTtcbiAgICAgICAgaWYgKGlucHV0cykge1xuICAgICAgICAgICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBlcnJvciA9IGlucHV0Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICBpZiAoVmFsaWRhdGlvbi5pc0VtcHR5RmllbGQoaW5wdXQudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FkZElucHV0RXJyb3IoaW5wdXQsIGVycm9yLCAn0J7QsdGP0LfQsNGC0LXQu9GM0L3QvtC1INC/0L7Qu9C1Jyk7XG4gICAgICAgICAgICAgICAgICAgIHdhc2ZhaWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZUlucHV0RXJyb3IoaW5wdXQsIGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gd2FzZmFpbDtcbiAgICB9XG5cbiAgICBzdGF0aWMgX3JlbW92ZUlucHV0RXJyb3IgKGlucHV0LCBlcnJvcikge1xuICAgICAgICBpZiAoaW5wdXQpIHtcbiAgICAgICAgICAgIGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0X2ludmFsaWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGVycm9yLmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yX2FjdGl2ZScpO1xuICAgICAgICAgICAgZXJyb3IuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIgKGRhdGEpIHtcbiAgICAgICAgdGhpcy5fcm9vdC5pbm5lckhUTUwgPSB0aGlzLl90ZW1wbGF0ZShkYXRhKTtcbiAgICAgICAgdGhpcy5pc1ZpZXdDbG9zZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLm9uUmVuZGVyKCk7XG4gICAgfVxuXG4gICAgb25SZW5kZXIgKCkge1xuXG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5fcm9vdC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy5pc1ZpZXdDbG9zZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIG1lcmdlIChkYXRhKSB7XG4gICAgICAgIHRoaXMuX2RhdGEgPSB7IC4uLnRoaXMuX2RhdGEsIC4uLmRhdGEgfTtcbiAgICB9XG59XG4iLCJpbXBvcnQge1ZpZXd9IGZyb20gXCIuLi8uLi9tb2R1bGVzL3ZpZXdcIjtcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL01lbnUucHVnJ1xuaW1wb3J0IHtBVVRIfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9ldmVudHNcIjtcblxuZXhwb3J0IGNsYXNzIE1lbnVWaWV3IGV4dGVuZHMgVmlld3tcbiAgICBjb25zdHJ1Y3RvciAocm9vdCwgZ2xvYmFsRXZlbnRCdXMpIHtcbiAgICAgICAgc3VwZXIocm9vdCwgdGVtcGxhdGUsIGdsb2JhbEV2ZW50QnVzKTtcblxuICAgICAgICB0aGlzLl9nbG9iYWxFdmVudEJ1cy5zdWJzY3JpYmVUb0V2ZW50KEFVVEguY2hlY2tBdXRoUmVzcG9uc2UsIHRoaXMuX29uQXV0aFJlc3BvbnNlLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHJlbmRlciAoZGF0YSA9IHt9KSB7XG4gICAgICAgIHN1cGVyLnJlbmRlcihkYXRhKTtcbiAgICB9XG5cbiAgICBfb25BdXRoUmVzcG9uc2UgKGRhdGEpIHtcbiAgICAgICAgc3VwZXIucmVuZGVyKGRhdGEpO1xuICAgIH1cbn0iLCJ2YXIgcHVnID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcHVnLXJ1bnRpbWUvaW5kZXguanNcIik7XG5cbmZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge3ZhciBwdWdfaHRtbCA9IFwiXCIsIHB1Z19taXhpbnMgPSB7fSwgcHVnX2ludGVycDs7dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoUmVnRXhwLCBkb2N1bWVudCwgdW5lc2NhcGUpIHtwdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDc3R5bGVcXHUwMDNFLm1lbnUge1xcbiAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuLm1lbnUtZWwtcmlnaHQge1xcbiAgICBmbG9hdDogcmlnaHQ7XFxufVxcblxcbi5tZW51LWVsLWxlZnQge1xcbiAgICBmbG9hdDogbGVmdDtcXG59XFxuXFxuLmlubmVyLW1lbnUtZWxlbWVudCB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIGZvbnQtZmFtaWx5OiBDYW1icmlhLCBDb2NoaW4sIEdlb3JnaWEsIFRpbWVzLCAnVGltZXMgTmV3IFJvbWFuJywgc2VyaWY7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgcGFkZGluZzogMTRweCAxNnB4O1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIHdpZHRoOiA5MHB4O1xcbiAgICB0cmFuc2l0aW9uLXByb3BlcnR5OiB0cmFuc2Zvcm07XFxuICAgIHRyYW5zaXRpb24tZHVyYXRpb246IDAuMjVzO1xcbn1cXG5cXG4uaW5uZXItbWVudS1lbGVtZW50OmhvdmVyIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01cHgpO1xcbn1cXG5cXG4uaW5uZXItbWVudS1lbGVtZW50OmFjdGl2ZSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNXB4KSBzY2FsZSgxLjMzKTtcXG59XFx1MDAzQ1xcdTAwMkZzdHlsZVxcdTAwM0VcIjtcbnB1Z19taXhpbnNbXCJpdGVtLXJpZ2h0XCJdID0gcHVnX2ludGVycCA9IGZ1bmN0aW9uKHRpdGxlLCBocmVmLCBzZWN0aW9uKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NsaSBjbGFzcz1cXFwibWVudS1lbC1yaWdodFxcXCJcXHUwMDNFXFx1MDAzQ2FcIiArIChcIiBjbGFzcz1cXFwiaW5uZXItbWVudS1lbGVtZW50XFxcIlwiK3B1Zy5hdHRyKFwiaHJlZlwiLCBocmVmLCB0cnVlLCB0cnVlKStwdWcuYXR0cihcImRhdGEtc2VjdGlvblwiLCBzZWN0aW9uLCB0cnVlLCB0cnVlKSkgKyBcIlxcdTAwM0VcIiArIChwdWcuZXNjYXBlKG51bGwgPT0gKHB1Z19pbnRlcnAgPSB0aXRsZSkgPyBcIlwiIDogcHVnX2ludGVycCkpICsgXCJcXHUwMDNDXFx1MDAyRmFcXHUwMDNFXFx1MDAzQ1xcdTAwMkZsaVxcdTAwM0VcIjtcbn07XG5wdWdfbWl4aW5zW1wiaXRlbS1sZWZ0XCJdID0gcHVnX2ludGVycCA9IGZ1bmN0aW9uKHRpdGxlLCBocmVmLCBzZWN0aW9uKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NsaSBjbGFzcz1cXFwibWVudS1lbC1sZWZ0XFxcIlxcdTAwM0VcXHUwMDNDYVwiICsgKFwiIGNsYXNzPVxcXCJpbm5lci1tZW51LWVsZW1lbnRcXFwiXCIrcHVnLmF0dHIoXCJocmVmXCIsIGhyZWYsIHRydWUsIHRydWUpK3B1Zy5hdHRyKFwiZGF0YS1zZWN0aW9uXCIsIHNlY3Rpb24sIHRydWUsIHRydWUpKSArIFwiXFx1MDAzRVwiICsgKHB1Zy5lc2NhcGUobnVsbCA9PSAocHVnX2ludGVycCA9IHRpdGxlKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSkgKyBcIlxcdTAwM0NcXHUwMDJGYVxcdTAwM0VcXHUwMDNDXFx1MDAyRmxpXFx1MDAzRVwiO1xufTtcbmNvbnN0IGdldENvb2tpZSA9IChuYW1lKSA9PiB7dmFyIHJlID0gbmV3IFJlZ0V4cChuYW1lICsgXCI9KFteO10rKVwiKTsgdmFyIHZhbHVlID0gcmUuZXhlYyhkb2N1bWVudC5jb29raWUpOyByZXR1cm4gKHZhbHVlICE9IG51bGwpID8gdW5lc2NhcGUodmFsdWVbMV0pIDogbnVsbDt9XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDdWwgY2xhc3M9XFxcIm1lbnVcXFwiXFx1MDAzRVwiO1xucHVnX21peGluc1tcIml0ZW0tbGVmdFwiXSgn0JDRhNC40YjQsCcsICcvcG9zdGVyJywgJ3Bvc3RlcicpO1xucHVnX21peGluc1tcIml0ZW0tbGVmdFwiXSgn0J4g0L3QsNGBJywgJy9hYm91dCcsICdhYm91dCcpO1xuaWYgKGdldENvb2tpZSgnaWQnKSAhPSBudWxsKSB7XG5wdWdfbWl4aW5zW1wiaXRlbS1yaWdodFwiXSgn0JLRi9GF0L7QtCcsICcvc2lnbm91dCcsICdzaWdub3V0Jyk7XG5wdWdfbWl4aW5zW1wiaXRlbS1yaWdodFwiXSgn0J/RgNC+0YTQuNC70YwnLCAnL3Byb2ZpbGUnLCAncHJvZmlsZScpO1xufVxuZWxzZSB7XG5wdWdfbWl4aW5zW1wiaXRlbS1yaWdodFwiXSgn0KDQtdCz0LjRgdGC0YDQsNGG0LjRjycsICcvc2lnbnVwJywgJ3NpZ251cCcpO1xucHVnX21peGluc1tcIml0ZW0tcmlnaHRcIl0oJ9CS0YXQvtC0JywgJy9zaWduaW4nLCAnc2lnbmluJyk7XG59XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDXFx1MDAyRnVsXFx1MDAzRVwiO30uY2FsbCh0aGlzLFwiUmVnRXhwXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5SZWdFeHA6dHlwZW9mIFJlZ0V4cCE9PVwidW5kZWZpbmVkXCI/UmVnRXhwOnVuZGVmaW5lZCxcImRvY3VtZW50XCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5kb2N1bWVudDp0eXBlb2YgZG9jdW1lbnQhPT1cInVuZGVmaW5lZFwiP2RvY3VtZW50OnVuZGVmaW5lZCxcInVuZXNjYXBlXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmVzY2FwZTp0eXBlb2YgdW5lc2NhcGUhPT1cInVuZGVmaW5lZFwiP3VuZXNjYXBlOnVuZGVmaW5lZCkpOztyZXR1cm4gcHVnX2h0bWw7fTtcbm1vZHVsZS5leHBvcnRzID0gdGVtcGxhdGU7IiwiaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vUG9zdGVyLnB1Zyc7XG5pbXBvcnQge1ZpZXd9IGZyb20gJy4uLy4uL21vZHVsZXMvdmlldyc7XG5pbXBvcnQge0FVVEh9IGZyb20gJy4uLy4uL21vZHVsZXMvZXZlbnRzJ1xuXG5leHBvcnQgY2xhc3MgUG9zdGVyVmlldyBleHRlbmRzIFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKHJvb3QsIGV2ZW50QnVzLCBnbG9iYWxFdmVudEJ1cykge1xuICAgICAgICBzdXBlcihyb290LCB0ZW1wbGF0ZSwgZXZlbnRCdXMsIGdsb2JhbEV2ZW50QnVzKTtcbiAgICAgICAgdGhpcy5fZ2xvYmFsRXZlbnRCdXMuc3Vic2NyaWJlVG9FdmVudChBVVRILmNoZWNrQXV0aFJlc3BvbnNlLCB0aGlzLl9vbkF1dGhSZXNwb25zZS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICByZW5kZXIoZGF0YSA9IHt9KSB7XG4gICAgICAgIHRoaXMubWVyZ2UoZGF0YSk7XG4gICAgICAgIHRoaXMuaXNWaWV3Q2xvc2VkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5fZ2xvYmFsRXZlbnRCdXMudHJpZ2dlckV2ZW50KEFVVEguY2hlY2tBdXRoKTtcbiAgICAgICAgc3VwZXIucmVuZGVyKGRhdGEpXG4gICAgfVxuXG4gICAgb25SZW5kZXIoKSB7XG4gICAgfVxuXG4gICAgX29uQXV0aFJlc3BvbnNlKGRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNWaWV3Q2xvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1lcmdlKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLnJlbmRlcih0aGlzLl9kYXRhKTtcbiAgICB9XG59IiwidmFyIHB1ZyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3B1Zy1ydW50aW1lL2luZGV4LmpzXCIpO1xuXG5mdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHt2YXIgcHVnX2h0bWwgPSBcIlwiLCBwdWdfbWl4aW5zID0ge30sIHB1Z19pbnRlcnA7cHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ3N0eWxlXFx1MDAzRS5jb250YWluZXJ7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWQyZDJlO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcImRhdGE6aW1hZ2VcXHUwMDJGc3ZnK3htbCwlM0NzdmcgeG1sbnM9J2h0dHA6XFx1MDAyRlxcdTAwMkZ3d3cudzMub3JnXFx1MDAyRjIwMDBcXHUwMDJGc3ZnJyB3aWR0aD0nMTIwJyBoZWlnaHQ9JzEyMCcgdmlld0JveD0nMCAwIDEyMCAxMjAnJTNFJTNDcG9seWdvbiBmaWxsPSclMjNiODY5NjknIGZpbGwtb3BhY2l0eT0nLjEnIHBvaW50cz0nMTIwIDAgMTIwIDYwIDkwIDMwIDYwIDAgMCAwIDAgMCA2MCA2MCAwIDEyMCA2MCAxMjAgOTAgOTAgMTIwIDYwIDEyMCAwJ1xcdTAwMkYlM0UlM0NcXHUwMDJGc3ZnJTNFXFxcIik7XFxuICAgIHBhZGRpbmc6IDE1cHg7XFxufVxcblxcbmgxIHtcXG4gICAgZm9udC1mYW1pbHk6IENhbWJyaWEsIENvY2hpbiwgR2VvcmdpYSwgVGltZXMsICdUaW1lcyBOZXcgUm9tYW4nLCBzZXJpZjtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBtYXJnaW4tYm90dG9tOiA1MHB4O1xcbn1cXG5cXG4uY2FyZC1pdGVte1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhbGljZWJsdWU7XFxuICAgIHdpZHRoOiAzNjBweDtcXG4gICAgaGVpZ2h0OiAzNjBweDtcXG59XFxuLmNhcmQge1xcbiAgICBib3gtc2hhZG93OiAwIDRweCA4cHggMCByZ2JhKDAsIDAsIDAsIDAuMik7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZm9udC1mYW1pbHk6IGFyaWFsO1xcbiAgICBtYXgtd2lkdGg6IDM4MHB4O1xcbiAgICBhbGlnbi1zZWxmOiBzdHJldGNoO1xcbiAgICBcXHUwMDJGKi13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTs7KlxcdTAwMkZcXG4gICAgXFx1MDAyRiotbW96LXRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7OypcXHUwMDJGXFxuICAgIFxcdTAwMkYqLW8tdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTs7KlxcdTAwMkZcXG4gICAgXFx1MDAyRip0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlOypcXHUwMDJGXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNjN2VjZWU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogMTBweCAxMHB4O1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcblxcdTAwMkYqLmNhcmQ6aG92ZXIgeypcXHUwMDJGXFxuXFx1MDAyRiogICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMik7KlxcdTAwMkZcXG5cXHUwMDJGKiAgICAtbXMtdHJhbnNmb3JtOiBzY2FsZSgxLjIpOypcXHUwMDJGXFxuXFx1MDAyRiogICAgdHJhbnNmb3JtOiBzY2FsZSgxLjIpOypcXHUwMDJGXFxuXFx1MDAyRip9KlxcdTAwMkZcXG5cXG4ucHJpY2Uge1xcbiAgICBjb2xvcjogZ3JleTtcXG4gICAgZm9udC1zaXplOiAyMnB4O1xcbn1cXG5cXG4uY2FyZCBidXR0b24ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIG91dGxpbmU6IDA7XFxuICAgIHBhZGRpbmc6IDEycHg7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzIyMmYzZTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBmb250LXNpemU6IDE4cHg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbi5jYXJkIGJ1dHRvbjpob3ZlciB7XFxuICAgIG9wYWNpdHk6IDAuNztcXG59XFxuXFxuLmNhcmQtZGVjayB7XFxuICAgIFxcdTAwMkYqIG1heC1oZWlnaHQ6IDU1MHB4OyAqXFx1MDAyRlxcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4uY2FyZCB7XFxuICAgIG1hcmdpbjogMTBweDtcXG59XFxuXFxuaDF7XFxuICAgIG1hcmdpbi1ib3R0b206IGF1dG87XFxufVxcblxcbi5jYXJkLWl0ZW0tYmx1ciB7XFxuICAgIGFsaWduLXNlbGY6IGVuZDtcXG4gICAgaGVpZ2h0OiAxMjBweDtcXG4gICAgYmFja2dyb3VuZDogcmdiYSgxLDAsMCwwLjYpO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAzNjBweDtcXG4gICAgY29sb3I6ICNkZmY5ZmI7XFxufVxcblxcbi5jYXJkLWl0ZW0tYmx1cjpob3ZlciB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG5odG1sIHtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5cXG5cXG4uYm9keSB7XFxuICAgIFxcdTAwMkYqIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbiAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IDEwcHg7ICpcXHUwMDJGXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbmEge1xcbiAgICB0cmFuc2l0aW9uLXByb3BlcnR5OiB0cmFuc2Zvcm07XFxuICAgIHRyYW5zaXRpb24tZHVyYXRpb246IDAuMXM7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuYTpob3ZlciB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4yNSk7XFxufVxcblxcbmE6YWN0aXZlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjI1KSB0cmFuc2xhdGVZKC0ycHgpO1xcbn1cXHUwMDNDXFx1MDAyRnN0eWxlXFx1MDAzRVwiO1xudmFyIHRpdGxlID0gXCJKb2tlclwiXG52YXIgaHJlZiA9XCJodHRwczovL3N0YXRpYy5rYXJvZmlsbS5ydS91cGxvYWRzL2ZpbG0vZGVza3RvcC9lMy9iNi80Yi81MjE1ZDU4MTFiODAyOTgxNzJkYWQ3M2ZkMS5qcGdcIlxudmFyIGZpbG1Vcmw9XCIvZmlsbVwiXG5wdWdfbWl4aW5zW1wiY2FyZC1kZWNrXCJdID0gcHVnX2ludGVycCA9IGZ1bmN0aW9uKHRpdGxlLCBocmVmLCBmaWxtVXJsKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NkaXYgY2xhc3M9XFxcImNhcmRcXFwiXFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcImNhcmQtaXRlbVxcXCJcXHUwMDNFXFx1MDAzQ2ltZ1wiICsgKHB1Zy5hdHRyKFwic3JjXCIsIGhyZWYsIHRydWUsIHRydWUpKSArIFwiXFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NkaXZcIiArIChcIiBjbGFzcz1cXFwiY2FyZC1pdGVtLWJsdXJcXFwiXCIrcHVnLmF0dHIoXCJzcmNcIiwgaHJlZiwgdHJ1ZSwgdHJ1ZSkpICsgXCJcXHUwMDNFXFx1MDAzQ2gxXFx1MDAzRVwiICsgKHB1Zy5lc2NhcGUobnVsbCA9PSAocHVnX2ludGVycCA9IHRpdGxlKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSkgKyBcIlxcdTAwM0NcXHUwMDJGaDFcXHUwMDNFXFx1MDAzQ2FcIiArIChwdWcuYXR0cihcIm9uY2xpY2tcIiwgZmlsbVVybCwgdHJ1ZSwgdHJ1ZSkrcHVnLmF0dHIoXCJocmVmXCIsIGZpbG1VcmwsIHRydWUsIHRydWUpK1wiIGRhdGEtc2VjdGlvbj1cXFwiZmlsbVxcXCJcIikgKyBcIlxcdTAwM0XQn9C+0LTRgNC+0LHQvdC10LVcXHUwMDNDXFx1MDAyRmFcXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXCI7XG59O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ2RpdiBjbGFzcz1cXFwiY29udGFpbmVyXFxcIlxcdTAwM0VcXHUwMDNDaDFcXHUwMDNF0KTQuNC70YzQvNGLXFx1MDAzQ1xcdTAwMkZoMVxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJib2R5XFxcIlxcdTAwM0VcIjtcbnZhciBkZWNrcyA9IDM7XG53aGlsZSAoZGVja3MgPiAwKSB7XG4vLyBpdGVyYXRlIFsxLDIsMyw0XVxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBbMSwyLDMsNF07XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG4gICAgICBmb3IgKHZhciBwdWdfaW5kZXgwID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyBwdWdfaW5kZXgwIDwgJCRsOyBwdWdfaW5kZXgwKyspIHtcbiAgICAgICAgdmFyIHZhbCA9ICQkb2JqW3B1Z19pbmRleDBdO1xucHVnX21peGluc1tcImNhcmQtZGVja1wiXSh0aXRsZSwgaHJlZik7XG4gICAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgcHVnX2luZGV4MCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7XG4gICAgICB2YXIgdmFsID0gJCRvYmpbcHVnX2luZGV4MF07XG5wdWdfbWl4aW5zW1wiY2FyZC1kZWNrXCJdKHRpdGxlLCBocmVmKTtcbiAgICB9XG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmRlY2tzLS1cbn1cbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVwiOztyZXR1cm4gcHVnX2h0bWw7fTtcbm1vZHVsZS5leHBvcnRzID0gdGVtcGxhdGU7IiwiLyogKGlnbm9yZWQpICovIl0sInNvdXJjZVJvb3QiOiIifQ==