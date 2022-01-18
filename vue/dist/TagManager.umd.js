(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("CoreHome"), require("vue"), require("CorePluginsAdmin"));
	else if(typeof define === 'function' && define.amd)
		define(["CoreHome", , "CorePluginsAdmin"], factory);
	else if(typeof exports === 'object')
		exports["TagManager"] = factory(require("CoreHome"), require("vue"), require("CorePluginsAdmin"));
	else
		root["TagManager"] = factory(root["CoreHome"], root["Vue"], root["CorePluginsAdmin"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__19dc__, __WEBPACK_EXTERNAL_MODULE__8bbf__, __WEBPACK_EXTERNAL_MODULE_a5a2__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "plugins/TagManager/vue/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fae3");
/******/ })
/************************************************************************/
/******/ ({

/***/ "19dc":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__19dc__;

/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;

/***/ }),

/***/ "a5a2":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_a5a2__;

/***/ }),

/***/ "fae3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "ImportVersion", function() { return /* reexport */ ImportVersion; });
__webpack_require__.d(__webpack_exports__, "VariableSelect", function() { return /* reexport */ VariableSelect; });

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: external "CoreHome"
var external_CoreHome_ = __webpack_require__("19dc");

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/ImportVersion/ImportVersion.vue?vue&type=template&id=4269c74c

var _hoisted_1 = {
  class: "tagManagerImportVersion"
};
var _hoisted_2 = {
  class: "ui-confirm",
  id: "confirmImportContainerVersion",
  ref: "confirmImportContainerVersion"
};
var _hoisted_3 = ["value"];
var _hoisted_4 = ["value"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_ActivityIndicator = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ActivityIndicator");

  var _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");

  var _component_SaveButton = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("SaveButton");

  var _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    "content-title": _ctx.translate('TagManager_ImportVersion')
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_VersionImportInfo')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ActivityIndicator, {
        loading: _ctx.isUpdating,
        "loading-message": _ctx.translate('TagManager_UpdatingData')
      }, null, 8, ["loading", "loading-message"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "text",
        modelValue: _ctx.backupName,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
          return _ctx.backupName = $event;
        }),
        name: "backupName",
        placeholder: ' ',
        title: _ctx.backupNameTitle,
        "inline-help": _ctx.translate('TagManager_BackupVersionNameHelp')
      }, null, 8, ["modelValue", "title", "inline-help"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "textarea",
        modelValue: _ctx.importContent,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
          return _ctx.importContent = $event;
        }),
        name: "importContent",
        placeholder: ' ',
        "full-width": true,
        title: _ctx.translate('TagManager_VersionImportContentTitle')
      }, null, 8, ["modelValue", "title"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_SaveButton, {
        class: "importVersion",
        disabled: !_ctx.importContent,
        onConfirm: _cache[2] || (_cache[2] = function ($event) {
          return _ctx.importVersion(_ctx.backupName, _ctx.importContent);
        }),
        value: _ctx.translate('TagManager_VersionImportOverwriteContent')
      }, null, 8, ["disabled", "value"])];
    }),
    _: 1
  }, 8, ["content-title"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ConfirmImportContainerVersion')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "yes",
    type: "button",
    value: _ctx.translate('General_Yes')
  }, null, 8, _hoisted_3), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "no",
    type: "button",
    value: _ctx.translate('General_No')
  }, null, 8, _hoisted_4)], 512)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/ImportVersion/ImportVersion.vue?vue&type=template&id=4269c74c

// EXTERNAL MODULE: external "CorePluginsAdmin"
var external_CorePluginsAdmin_ = __webpack_require__("a5a2");

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/ImportVersion/ImportVersion.vue?vue&type=script&lang=ts



var NOTIFICATION_ID = 'importContainerVersion';
/* harmony default export */ var ImportVersionvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idContainer: {
      type: String,
      required: true
    }
  },
  components: {
    ContentBlock: external_CoreHome_["ContentBlock"],
    ActivityIndicator: external_CoreHome_["ActivityIndicator"],
    Field: external_CorePluginsAdmin_["Field"],
    SaveButton: external_CorePluginsAdmin_["SaveButton"]
  },
  data: function data() {
    return {
      isUpdating: false,
      backupName: '',
      importContent: ''
    };
  },
  methods: {
    showNotification: function showNotification(message, context) {
      var instanceId = external_CoreHome_["NotificationsStore"].show({
        message: message,
        context: context,
        type: 'transient',
        id: NOTIFICATION_ID
      });
      setTimeout(function () {
        external_CoreHome_["NotificationsStore"].scrollToNotification(instanceId);
      }, 200);
    },
    importVersion: function importVersion(backupName, version) {
      var _this = this;

      if (!version) {
        return;
      }

      var parsed;

      try {
        parsed = JSON.parse(version);
      } catch (e) {
        this.showNotification(Object(external_CoreHome_["translate"])('TagManager_ErrorInvalidContainerImportFormat'), 'error');
        return;
      }

      if ('tags' in parsed && 'triggers' in parsed && 'variables' in parsed && 'idcontainer' in parsed && 'context' in parsed) {
        external_CoreHome_["Matomo"].helper.modalConfirm(this.$refs.confirmImportContainerVersion, {
          yes: function yes() {
            _this.isUpdating = true;
            var post = {
              exportedContainerVersion: version
            };
            external_CoreHome_["AjaxHelper"].post({
              method: 'TagManager.importContainerVersion',
              idContainer: _this.idContainer,
              backupName: _this.backupName
            }, post).then(function () {
              _this.showNotification(Object(external_CoreHome_["translate"])('TagManager_VersionImportSuccess'), 'success');

              _this.isUpdating = false;
              window.location.reload();
            }).catch(function () {
              _this.isUpdating = false;
            });
          }
        });
      } else {
        this.showNotification(Object(external_CoreHome_["translate"])('TagManager_ErrorContainerVersionImportIncomplete'), 'error');
      }
    }
  },
  computed: {
    backupNameTitle: function backupNameTitle() {
      return "".concat(Object(external_CoreHome_["translate"])('TagManager_BackupVersionName'), " (").concat(Object(external_CoreHome_["translate"])('General_Recommended'), ")");
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/ImportVersion/ImportVersion.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/ImportVersion/ImportVersion.vue



ImportVersionvue_type_script_lang_ts.render = render

/* harmony default export */ var ImportVersion = (ImportVersionvue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/ImportVersion/ImportVersion.adapter.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


/* harmony default export */ var ImportVersion_adapter = (Object(external_CoreHome_["createAngularJsAdapter"])({
  component: ImportVersion,
  scope: {
    idContainer: {
      angularJsBind: '='
    }
  },
  directiveName: 'piwikImportVersion'
}));
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/VariableSelect/VariableSelect.vue?vue&type=template&id=6659b52f

var VariableSelectvue_type_template_id_6659b52f_hoisted_1 = {
  class: "tagManagerManageSelect tagManagerVariableSelect"
};
var VariableSelectvue_type_template_id_6659b52f_hoisted_2 = {
  class: "tableActionBar"
};

var VariableSelectvue_type_template_id_6659b52f_hoisted_3 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, null, -1);

var VariableSelectvue_type_template_id_6659b52f_hoisted_4 = {
  class: "collection with-header"
};
var _hoisted_5 = {
  class: "collection-header"
};
var _hoisted_6 = ["onClick"];
var _hoisted_7 = {
  class: "title"
};
var _hoisted_8 = {
  class: "secondary-content"
};
var _hoisted_9 = ["onClick", "title"];
var _hoisted_10 = {
  class: "collection-header"
};
var _hoisted_11 = ["onClick"];
var _hoisted_12 = {
  class: "title"
};
var _hoisted_13 = {
  class: "secondary-content"
};
var _hoisted_14 = ["title"];
var _hoisted_15 = {
  class: "tableActionBar"
};

var _hoisted_16 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, null, -1);

function VariableSelectvue_type_template_id_6659b52f_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_ActivityIndicator = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ActivityIndicator");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VariableSelectvue_type_template_id_6659b52f_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ActivityIndicator, {
    loading: _ctx.isLoading
  }, null, 8, ["loading"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableSelectvue_type_template_id_6659b52f_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    class: "createNewVariable",
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.createVariable();
    })
  }, [VariableSelectvue_type_template_id_6659b52f_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewX', _ctx.translate('TagManager_Variable'))), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isLoading]])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", VariableSelectvue_type_template_id_6659b52f_hoisted_4, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", _hoisted_5, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CustomVariables')), 1)]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.containerVariables, function (variable, index) {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
      class: "collection-item",
      onClick: function onClick($event) {
        return _ctx.selectVariable(variable);
      },
      key: index
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_7, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variable.name) + " (Type: " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variable.type) + ")", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("i", {
      class: "icon-edit",
      onClick: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function ($event) {
        return _ctx.editVariable(variable);
      }, ["prevent"]),
      title: _ctx.translate('General_Edit')
    }, null, 8, _hoisted_9)])], 8, _hoisted_6);
  }), 128))]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_PreconfiguredVariables')), 1), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.preconfiguredVariables, function (variableCategory) {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("ul", {
      class: "collection with-header",
      key: variableCategory.name
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", _hoisted_10, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variableCategory.name), 1)]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(variableCategory.types, function (variableTemplate, index) {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
        class: "collection-item",
        key: index,
        onClick: function onClick($event) {
          return _ctx.selectVariable(variableTemplate);
        }
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_12, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variableTemplate.name), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_13, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("i", {
        class: "icon-help",
        title: variableTemplate.description
      }, null, 8, _hoisted_14)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !!variableTemplate.description]])], 8, _hoisted_11)), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], variableTemplate.is_pre_configured]]);
    }), 128))]);
  }), 128)), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_15, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    class: "createNewVariable",
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return _ctx.createVariable();
    })
  }, [_hoisted_16, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewX', _ctx.translate('TagManager_Variable'))), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isLoading]])])]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/VariableSelect/VariableSelect.vue?vue&type=template&id=6659b52f

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/VariableSelect/VariableSelect.vue?vue&type=script&lang=ts
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var _window = window,
    tagManagerHelper = _window.tagManagerHelper;
/* harmony default export */ var VariableSelectvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idContainer: {
      type: [String, Number],
      required: true
    },
    idContainerVersion: [String, Number]
  },
  components: {
    ActivityIndicator: external_CoreHome_["ActivityIndicator"]
  },
  data: function data() {
    return {
      preconfiguredVariables: [],
      containerVariables: [],
      isLoading: false,
      actualIdContainerVersion: this.idContainerVersion
    };
  },
  emits: ['selectVariable'],
  created: function created() {
    this.fetchAvailableVariables();
  },
  watch: {
    idContainerVersion: function idContainerVersion(newValue) {
      this.actualIdContainerVersion = newValue;
    }
  },
  methods: {
    fetchAvailableVariables: function fetchAvailableVariables() {
      var _this = this;

      this.preconfiguredVariables = [];
      this.containerVariables = [];
      this.fetchContainer().then(function (container) {
        _this.isLoading = true;
        _this.actualIdContainerVersion = container.draft.idcontainerversion;
        return external_CoreHome_["AjaxHelper"].fetch({
          method: 'TagManager.getAvailableContainerVariables',
          filter_limit: '-1',
          idContainer: _this.idContainer,
          idContainerVersion: _this.actualIdContainerVersion
        }).then(function (variables) {
          _this.preconfiguredVariables = [];
          _this.containerVariables = [];
          _this.isLoading = false;
          variables.forEach(function (category) {
            var _this$containerVariab;

            var preConfig = Object.assign(Object.assign({}, category), {}, {
              types: category.types.filter(function (c) {
                return c.is_pre_configured;
              })
            });

            (_this$containerVariab = _this.containerVariables).push.apply(_this$containerVariab, _toConsumableArray(category.types.filter(function (c) {
              return !c.is_pre_configured;
            })));

            if (preConfig.types.length) {
              _this.preconfiguredVariables.push(preConfig);
            }
          });
        }).catch(function () {
          _this.isLoading = false;
        });
      });
    },
    editVariable: function editVariable(variable) {
      var _this2 = this;

      if (!this.actualIdContainerVersion) {
        return;
      }

      tagManagerHelper.editVariable(null, this.idContainer, this.actualIdContainerVersion, variable.idvariable, function () {
        _this2.fetchAvailableVariables();
      });
    },
    createVariable: function createVariable() {
      var _this3 = this;

      if (!this.actualIdContainerVersion) {
        return;
      }

      tagManagerHelper.editVariable(null, this.idContainer, this.actualIdContainerVersion, 0, function () {
        _this3.fetchAvailableVariables();
      });
    },
    selectVariable: function selectVariable(variable) {
      this.$emit('selectVariable', {
        variable: variable
      });
    },
    fetchContainer: function fetchContainer() {
      this.isLoading = true;
      return external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainer',
        filter_limit: '-1',
        idContainer: this.idContainer
      });
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/VariableSelect/VariableSelect.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/VariableSelect/VariableSelect.vue



VariableSelectvue_type_script_lang_ts.render = VariableSelectvue_type_template_id_6659b52f_render

/* harmony default export */ var VariableSelect = (VariableSelectvue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/VariableSelect/VariableSelect.adapter.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


/* harmony default export */ var VariableSelect_adapter = (Object(external_CoreHome_["createAngularJsAdapter"])({
  component: VariableSelect,
  scope: {
    idContainer: {
      angularJsBind: '='
    },
    idContainerVersion: {
      angularJsBind: '='
    },
    onSelectVariable: {
      angularJsBind: '&?',
      vue: 'selectVariable'
    }
  },
  directiveName: 'piwikVariableSelect'
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/index.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */




// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib-no-default.js




/***/ })

/******/ });
});
//# sourceMappingURL=TagManager.umd.js.map