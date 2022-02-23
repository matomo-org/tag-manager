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
__webpack_require__.d(__webpack_exports__, "VariableSelectType", function() { return /* reexport */ VariableSelectType; });
__webpack_require__.d(__webpack_exports__, "FieldTextareaVariable", function() { return /* reexport */ FieldTextareaVariable; });
__webpack_require__.d(__webpack_exports__, "FieldVariableTemplate", function() { return /* reexport */ FieldVariableTemplate; });
__webpack_require__.d(__webpack_exports__, "FieldVariableTypeTemplate", function() { return /* reexport */ FieldVariableTypeTemplate; });
__webpack_require__.d(__webpack_exports__, "VariableEdit", function() { return /* reexport */ VariableEdit; });
__webpack_require__.d(__webpack_exports__, "VariableList", function() { return /* reexport */ VariableList; });
__webpack_require__.d(__webpack_exports__, "VariableManage", function() { return /* reexport */ VariableManage; });

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
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/VariableSelect/VariableSelect.vue?vue&type=template&id=938e85b8

var VariableSelectvue_type_template_id_938e85b8_hoisted_1 = {
  class: "tagManagerManageSelect tagManagerVariableSelect"
};
var VariableSelectvue_type_template_id_938e85b8_hoisted_2 = {
  class: "tableActionBar"
};

var VariableSelectvue_type_template_id_938e85b8_hoisted_3 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, null, -1);

var VariableSelectvue_type_template_id_938e85b8_hoisted_4 = {
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

function VariableSelectvue_type_template_id_938e85b8_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_ActivityIndicator = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ActivityIndicator");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VariableSelectvue_type_template_id_938e85b8_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ActivityIndicator, {
    loading: _ctx.isLoading
  }, null, 8, ["loading"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableSelectvue_type_template_id_938e85b8_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    class: "createNewVariable",
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.createVariable();
    })
  }, [VariableSelectvue_type_template_id_938e85b8_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewX', _ctx.translate('TagManager_Variable'))), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isLoading]])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", VariableSelectvue_type_template_id_938e85b8_hoisted_4, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", _hoisted_5, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CustomVariables')), 1)]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.containerVariables, function (variable, index) {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
      class: "collection-item",
      onClick: function onClick($event) {
        return _ctx.selectVariable(variable);
      },
      key: index
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_7, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variable.name) + " (" + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Type')) + ": " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variable.type) + ") ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("i", {
      class: "icon-edit",
      onClick: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function ($event) {
        return _ctx.editVariable(variable);
      }, ["stop"]),
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
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/VariableSelect/VariableSelect.vue?vue&type=template&id=938e85b8

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



VariableSelectvue_type_script_lang_ts.render = VariableSelectvue_type_template_id_938e85b8_render

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
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/VariableSelectType/VariableSelectType.vue?vue&type=template&id=3569c41d

var VariableSelectTypevue_type_template_id_3569c41d_hoisted_1 = {
  class: "tagManagerManageSelect tagManagerVariableSelectType"
};

var VariableSelectTypevue_type_template_id_3569c41d_hoisted_2 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, null, -1);

function VariableSelectTypevue_type_template_id_3569c41d_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VariableSelectTypevue_type_template_id_3569c41d_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
    uicontrol: "select",
    name: "variableType".concat(_ctx.variableType),
    class: "selectVariableType",
    "model-value": _ctx.modelValue,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return _ctx.onChange($event);
    }),
    "full-width": true,
    options: _ctx.containerVariables
  }, null, 8, ["name", "model-value", "options"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    class: "createNewVariable",
    onClick: _cache[1] || (_cache[1] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function ($event) {
      return _ctx.createVariable();
    }, ["prevent"]))
  }, [VariableSelectTypevue_type_template_id_3569c41d_hoisted_2, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewX', _ctx.variableTypeName)), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isLoading]])]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/VariableSelectType/VariableSelectType.vue?vue&type=template&id=3569c41d

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/VariableSelectType/VariableSelectType.vue?vue&type=script&lang=ts
function VariableSelectTypevue_type_script_lang_ts_toConsumableArray(arr) { return VariableSelectTypevue_type_script_lang_ts_arrayWithoutHoles(arr) || VariableSelectTypevue_type_script_lang_ts_iterableToArray(arr) || VariableSelectTypevue_type_script_lang_ts_unsupportedIterableToArray(arr) || VariableSelectTypevue_type_script_lang_ts_nonIterableSpread(); }

function VariableSelectTypevue_type_script_lang_ts_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function VariableSelectTypevue_type_script_lang_ts_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return VariableSelectTypevue_type_script_lang_ts_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return VariableSelectTypevue_type_script_lang_ts_arrayLikeToArray(o, minLen); }

function VariableSelectTypevue_type_script_lang_ts_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function VariableSelectTypevue_type_script_lang_ts_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return VariableSelectTypevue_type_script_lang_ts_arrayLikeToArray(arr); }

function VariableSelectTypevue_type_script_lang_ts_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var VariableSelectTypevue_type_script_lang_ts_window = window,
    VariableSelectTypevue_type_script_lang_ts_tagManagerHelper = VariableSelectTypevue_type_script_lang_ts_window.tagManagerHelper;
/* harmony default export */ var VariableSelectTypevue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    variableTypeName: {
      type: String,
      required: true
    },
    modelValue: String,
    variableType: String
  },
  components: {
    Field: external_CorePluginsAdmin_["Field"]
  },
  emits: ['update:modelValue'],
  data: function data() {
    return {
      containerVariables: [],
      isLoading: false,
      idContainerVersion: null
    };
  },
  created: function created() {
    this.fetchAvailableVariables();
  },
  methods: {
    fetchAvailableVariables: function fetchAvailableVariables() {
      var _this = this;

      this.containerVariables = [];
      this.fetchContainer().then(function (container) {
        _this.isLoading = true;
        _this.idContainerVersion = container.draft.idcontainerversion;
        return external_CoreHome_["AjaxHelper"].fetch({
          method: 'TagManager.getAvailableContainerVariables',
          filter_limit: '-1',
          idContainer: external_CoreHome_["MatomoUrl"].parsed.value.idContainer,
          idContainerVersion: _this.idContainerVersion
        }).then(function (variables) {
          _this.containerVariables = [];
          _this.isLoading = false;
          variables.forEach(function (category) {
            var _this$containerVariab;

            var options = category.types.filter(function (t) {
              return t.type === _this.variableType;
            }).map(function (t) {
              return {
                key: "{{".concat(t.id, "}}"),
                value: t.name
              };
            });

            (_this$containerVariab = _this.containerVariables).push.apply(_this$containerVariab, VariableSelectTypevue_type_script_lang_ts_toConsumableArray(options));
          });

          if (!_this.modelValue && _this.containerVariables.length === 1) {
            // when no value configured and only one selection is available, we preselect that value
            _this.onChange(_this.containerVariables[0].key);
          }
        }).catch(function () {
          _this.isLoading = false;
        });
      });
    },
    onChange: function onChange(newValue) {
      this.$emit('update:modelValue', newValue);
    },
    createVariable: function createVariable() {
      var _this2 = this;

      if (!this.idContainerVersion) {
        return;
      }

      VariableSelectTypevue_type_script_lang_ts_tagManagerHelper.editVariable(null, external_CoreHome_["MatomoUrl"].parsed.value.idContainer, this.idContainerVersion, 0, function (variable) {
        _this2.fetchAvailableVariables();

        if (variable) {
          _this2.onChange("{{".concat(variable.name, "}}"));
        }
      }, this.variableType);
    },
    fetchContainer: function fetchContainer() {
      this.isLoading = true;
      return external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainer',
        filter_limit: '-1',
        idContainer: external_CoreHome_["MatomoUrl"].parsed.value.idContainer
      });
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/VariableSelectType/VariableSelectType.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/VariableSelectType/VariableSelectType.vue



VariableSelectTypevue_type_script_lang_ts.render = VariableSelectTypevue_type_template_id_3569c41d_render

/* harmony default export */ var VariableSelectType = (VariableSelectTypevue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/VariableSelectType/VariableSelectType.adapter.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */



/* harmony default export */ var VariableSelectType_adapter = (Object(external_CoreHome_["createAngularJsAdapter"])({
  component: VariableSelectType,
  scope: {
    variableTypeName: {
      angularJsBind: '@'
    },
    variable: {
      angularJsBind: '=',
      vue: 'modelValue',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      default: function _default(scope) {
        return scope.variable;
      }
    },
    variableType: {
      angularJsBind: '@'
    }
  },
  directiveName: 'piwikVariableSelectType',
  $inject: ['$timeout'],
  events: {
    'update:modelValue': function updateModelValue(newValue, vm, scope, el, attrs, controller, $timeout) {
      scope.variable = Object(external_CoreHome_["clone"])(newValue);
      $timeout();
    }
  },
  postCreate: function postCreate(vm, scope) {
    scope.$watch('variable', function (newValue, oldValue) {
      if (newValue !== oldValue) {
        Object(external_commonjs_vue_commonjs2_vue_root_Vue_["nextTick"])(function () {
          vm.modelValue = Object(external_CoreHome_["clone"])(newValue);
        });
      }
    });
  }
}));
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Variable/VariableEdit.vue?vue&type=template&id=93faf56a
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var VariableEditvue_type_template_id_93faf56a_hoisted_1 = {
  class: "editVariable tagManagerManageEdit",
  ref: "root"
};
var VariableEditvue_type_template_id_93faf56a_hoisted_2 = {
  class: "loadingPiwik"
};

var VariableEditvue_type_template_id_93faf56a_hoisted_3 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);

var VariableEditvue_type_template_id_93faf56a_hoisted_4 = {
  class: "loadingPiwik"
};

var VariableEditvue_type_template_id_93faf56a_hoisted_5 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);

var VariableEditvue_type_template_id_93faf56a_hoisted_6 = {
  key: 0,
  class: "form-group row"
};
var VariableEditvue_type_template_id_93faf56a_hoisted_7 = {
  class: "col s12"
};
var VariableEditvue_type_template_id_93faf56a_hoisted_8 = {
  key: 1
};
var VariableEditvue_type_template_id_93faf56a_hoisted_9 = {
  class: "form-group row"
};
var VariableEditvue_type_template_id_93faf56a_hoisted_10 = {
  class: "col s12"
};
var VariableEditvue_type_template_id_93faf56a_hoisted_11 = {
  class: "innerFormField"
};
var VariableEditvue_type_template_id_93faf56a_hoisted_12 = {
  class: "form-group row"
};
var VariableEditvue_type_template_id_93faf56a_hoisted_13 = {
  class: "col s12 m12"
};
var VariableEditvue_type_template_id_93faf56a_hoisted_14 = {
  for: "lookup_table"
};
var VariableEditvue_type_template_id_93faf56a_hoisted_15 = {
  class: "innerFormField comparisonField"
};
var VariableEditvue_type_template_id_93faf56a_hoisted_16 = {
  class: "innerFormField"
};
var _hoisted_17 = {
  class: "innerFormField"
};
var _hoisted_18 = ["onClick", "title"];
var _hoisted_19 = {
  class: "entityCancel"
};
var _hoisted_20 = {
  id: "confirmSelectVariableType"
};
var _hoisted_21 = {
  class: "collection-header"
};
var _hoisted_22 = ["onClick", "title"];
var _hoisted_23 = ["src"];
var _hoisted_24 = {
  class: "title"
};
var _hoisted_25 = {
  class: "secondary-content"
};
var _hoisted_26 = ["title"];
var _hoisted_27 = {
  class: "entityCancel"
};
function VariableEditvue_type_template_id_93faf56a_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _this = this;

  var _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");

  var _component_GroupedSettings = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("GroupedSettings");

  var _component_SaveButton = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("SaveButton");

  var _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VariableEditvue_type_template_id_93faf56a_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: "Tag Manager",
    "content-title": _ctx.editTitle
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      var _ctx$variable$typeMet, _ctx$variable$typeMet2, _ctx$variable$typeMet3, _ctx$variable$typeMet4, _ctx$variable$typeMet5;

      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", VariableEditvue_type_template_id_93faf56a_hoisted_2, [VariableEditvue_type_template_id_93faf56a_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_LoadingData')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isLoading]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", VariableEditvue_type_template_id_93faf56a_hoisted_4, [VariableEditvue_type_template_id_93faf56a_hoisted_5, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_UpdatingData')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isUpdating]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("form", {
        onSubmit: _cache[8] || (_cache[8] = function ($event) {
          return _ctx.edit ? _ctx.updateVariable() : _ctx.createVariable();
        })
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
        class: "alert alert-warning"
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_UseCustomTemplateCapabilityRequired', _ctx.translate('TagManager_CapabilityUseCustomTemplates'))), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isVariableDisabled]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "text",
        name: "type",
        modelValue: _ctx.variable.name,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
          return _ctx.variable.name = $event;
        }),
        disabled: true,
        "inline-help": _ctx.typeInlineHelp,
        title: _ctx.translate('TagManager_Type')
      }, null, 8, ["modelValue", "inline-help", "title"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "text",
        name: "name",
        "model-value": _ctx.variable.name,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
          _ctx.variable.name = $event;

          _ctx.setValueHasChanged();
        }),
        maxlength: 50,
        title: _ctx.translate('General_Name'),
        "inline-help": _ctx.translate('TagManager_VariableNameHelp')
      }, null, 8, ["model-value", "title", "inline-help"])]), (_ctx$variable$typeMet = _ctx.variable.typeMetadata) !== null && _ctx$variable$typeMet !== void 0 && (_ctx$variable$typeMet2 = _ctx$variable$typeMet.parameters) !== null && _ctx$variable$typeMet2 !== void 0 && _ctx$variable$typeMet2.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VariableEditvue_type_template_id_93faf56a_hoisted_6, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableEditvue_type_template_id_93faf56a_hoisted_7, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ConfigureThisVariable')), 1)])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.variable ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VariableEditvue_type_template_id_93faf56a_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_GroupedSettings, {
        settings: ((_ctx$variable$typeMet3 = _ctx.variable.typeMetadata) === null || _ctx$variable$typeMet3 === void 0 ? void 0 : _ctx$variable$typeMet3.parameters) || [],
        "all-setting-values": _ctx.parameterValues,
        onChange: _cache[2] || (_cache[2] = function ($event) {
          return _ctx.parameterValues[$event.name] = $event.value;
        })
      }, null, 8, ["settings", "all-setting-values"])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableEditvue_type_template_id_93faf56a_hoisted_9, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableEditvue_type_template_id_93faf56a_hoisted_10, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "showAdvancedSettings",
        onClick: _cache[3] || (_cache[3] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function ($event) {
          return _ctx.showAdvanced = true;
        }, ["prevent"]))
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ShowAdvancedSettings')), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.showAdvanced]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "hideAdvancedSettings",
        onClick: _cache[4] || (_cache[4] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function ($event) {
          return _ctx.showAdvanced = false;
        }, ["prevent"]))
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_HideAdvancedSettings')), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.showAdvanced]])])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], (_ctx$variable$typeMet4 = _ctx.variable.typeMetadata) === null || _ctx$variable$typeMet4 === void 0 ? void 0 : _ctx$variable$typeMet4.hasAdvancedSettings]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableEditvue_type_template_id_93faf56a_hoisted_11, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "text",
        name: "default_value",
        "model-value": _ctx.variable.default_value,
        "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
          _ctx.variable.default_value = $event;

          _ctx.setValueHasChanged();
        }),
        title: _ctx.translate('TagManager_DefaultValue'),
        "inline-help": _ctx.translate('TagManager_DefaultValueHelp')
      }, null, 8, ["model-value", "title", "inline-help"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableEditvue_type_template_id_93faf56a_hoisted_12, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableEditvue_type_template_id_93faf56a_hoisted_13, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", VariableEditvue_type_template_id_93faf56a_hoisted_14, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_LookupTableTitle')), 1), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.variable.lookup_table, function (lookup, index) {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
          key: index,
          class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])("lookupTable lookupTable".concat(index, " multiple valign-wrapper"))
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableEditvue_type_template_id_93faf56a_hoisted_15, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
          uicontrol: "select",
          name: "lookup_table_comparison",
          "model-value": lookup.comparison,
          "onUpdate:modelValue": function onUpdateModelValue($event) {
            lookup.comparison = $event;

            _ctx.setValueHasChanged();
          },
          "full-width": true,
          options: _ctx.availableLookUpComparisons
        }, null, 8, ["model-value", "onUpdate:modelValue", "options"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableEditvue_type_template_id_93faf56a_hoisted_16, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
          uicontrol: "text",
          name: "lookup_table_matchvalue",
          "model-value": lookup.match_value,
          "onUpdate:modelValue": function onUpdateModelValue($event) {
            lookup.match_value = $event;

            _ctx.setValueHasChanged();
          },
          "full-width": true,
          placeholder: _ctx.translate('TagManager_LookupTableMatchValue')
        }, null, 8, ["model-value", "onUpdate:modelValue", "placeholder"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_17, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
          uicontrol: "text",
          name: "lookup_table_outvalue",
          "model-value": lookup.out_value,
          "onUpdate:modelValue": function onUpdateModelValue($event) {
            lookup.out_value = $event;

            _ctx.setValueHasChanged();
          },
          "full-width": true,
          placeholder: _ctx.translate('TagManager_LookupTableOutValue')
        }, null, 8, ["model-value", "onUpdate:modelValue", "placeholder"])]), !(index + 1 === _ctx.variable.lookup_table.length) ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
          key: 0,
          class: "icon-minus valign",
          onClick: function onClick($event) {
            return _ctx.removeLookUpEntry(index);
          },
          title: _ctx.translate('General_Remove')
        }, null, 8, _hoisted_18)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 2);
      }), 128))])])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.showAdvanced && ((_ctx$variable$typeMet5 = _ctx.variable.typeMetadata) === null || _ctx$variable$typeMet5 === void 0 ? void 0 : _ctx$variable$typeMet5.hasAdvancedSettings)]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
        class: "alert alert-warning"
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_UseCustomTemplateCapabilityRequired', _ctx.translate('TagManager_CapabilityUseCustomTemplates'))), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isVariableDisabled]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_SaveButton, {
        class: "createButton",
        onConfirm: _cache[6] || (_cache[6] = function ($event) {
          return _ctx.edit ? _ctx.updateVariable() : _ctx.createVariable();
        }),
        disabled: _ctx.isUpdating || !_ctx.isDirty,
        saving: _ctx.isUpdating,
        value: _ctx.edit ? _ctx.translate('CoreUpdater_UpdateTitle') : _ctx.translate('TagManager_CreateNewVariable')
      }, null, 8, ["disabled", "saving", "value"]), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isVariableDisabled]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_19, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        onClick: _cache[7] || (_cache[7] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function ($event) {
          return _ctx.cancel();
        }, ["prevent"]))
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Cancel')), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isEmbedded]])])], 544), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.chooseVariableType && _ctx.editTitle]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_20, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.availableVariables, function (variableCategory, index) {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("ul", {
          class: "collection with-header",
          key: index
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", _hoisted_21, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variableCategory.name), 1)]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(variableCategory.types, function (variableTemplate, index) {
          return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
            key: index,
            class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["collection-item avatar", _defineProperty({
              disabledTemplate: _this.isVariableTemplateDisabled[variableTemplate.id]
            }, "templateType".concat(variableTemplate.id), true)]),
            onClick: function onClick($event) {
              return _ctx.createVariableType(variableTemplate);
            },
            title: !_this.isVariableTemplateDisabled[variableTemplate.id] ? '' : _ctx.translate('TagManager_UseCustomTemplateCapabilityRequired', _ctx.translate('TagManager_CapabilityUseCustomTemplates'))
          }, [variableTemplate.icon ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("img", {
            key: 0,
            alt: "",
            class: "circle",
            src: variableTemplate.icon
          }, null, 8, _hoisted_23)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_24, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variableTemplate.name), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variableTemplate.description), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], variableTemplate.description]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_25, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("i", {
            class: "icon-help",
            title: variableTemplate.help
          }, null, 8, _hoisted_26)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !!variableTemplate.help]])], 10, _hoisted_22);
        }), 128))]);
      }), 128)), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_27, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        onClick: _cache[9] || (_cache[9] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function ($event) {
          return _ctx.cancel();
        }, ["prevent"]))
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Cancel')), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isEmbedded]])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.chooseVariableType]])];
    }),
    _: 1
  }, 8, ["content-title"])], 512);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/VariableEdit.vue?vue&type=template&id=93faf56a

// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/Variables.store.ts
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || Variables_store_unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function Variables_store_toConsumableArray(arr) { return Variables_store_arrayWithoutHoles(arr) || Variables_store_iterableToArray(arr) || Variables_store_unsupportedIterableToArray(arr) || Variables_store_nonIterableSpread(); }

function Variables_store_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Variables_store_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Variables_store_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Variables_store_arrayLikeToArray(o, minLen); }

function Variables_store_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function Variables_store_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return Variables_store_arrayLikeToArray(arr); }

function Variables_store_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function Variables_store_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */



var Variables_store_VariablesStore = /*#__PURE__*/function () {
  function VariablesStore() {
    var _this = this;

    _classCallCheck(this, VariablesStore);

    Variables_store_defineProperty(this, "privateState", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      variables: [],
      isLoadingVars: false,
      isLoadingSingle: false,
      isUpdating: false
    }));

    Variables_store_defineProperty(this, "state", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(_this.privateState);
    }));

    Variables_store_defineProperty(this, "isLoading", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      var state = _this.state.value;
      return state.isLoadingVars || state.isLoadingSingle;
    }));

    Variables_store_defineProperty(this, "isUpdating", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return _this.state.value.isUpdating;
    }));

    Variables_store_defineProperty(this, "variables", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return _this.state.value.variables;
    }));

    Variables_store_defineProperty(this, "fetchPromise", null);

    Variables_store_defineProperty(this, "availableVariablesPromises", {});
  }

  _createClass(VariablesStore, [{
    key: "fetchVariablesIfNotLoaded",
    value: function fetchVariablesIfNotLoaded(idContainer, idContainerVersion) {
      if (!this.fetchPromise) {
        // needed for suggestNameForType() to make sure it is aware of all names
        this.fetchVariables(idContainer, idContainerVersion);
      }
    }
  }, {
    key: "findVariable",
    value: function findVariable(idContainer, idContainerVersion, idVariable) {
      var _this2 = this;

      // before going through an API request we first try to find it in loaded variables
      var found = this.variables.value.find(function (v) {
        return v.idvariable === idVariable;
      });

      if (found) {
        return Promise.resolve(found);
      } // otherwise we fetch it via API


      this.privateState.isLoadingSingle = true;
      return external_CoreHome_["AjaxHelper"].fetch({
        idVariable: idVariable,
        idContainer: idContainer,
        idContainerVersion: idContainerVersion,
        method: 'TagManager.getContainerVariable',
        filter_limit: '-1'
      }).then(function (record) {
        _this2.privateState.variables = [].concat(Variables_store_toConsumableArray(_this2.privateState.variables), [record]);
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(record);
      }).finally(function () {
        _this2.privateState.isLoadingSingle = false;
      });
    }
  }, {
    key: "fetchVariables",
    value: function fetchVariables(idContainer, idContainerVersion) {
      var _this3 = this;

      this.privateState.isLoadingVars = true;
      this.privateState.variables = [];

      if (!this.fetchPromise) {
        this.fetchPromise = external_CoreHome_["AjaxHelper"].fetch({
          method: 'TagManager.getContainerVariables',
          idContainer: idContainer,
          idContainerVersion: idContainerVersion,
          filter_limit: '-1'
        });
      }

      return Promise.resolve(this.fetchPromise).then(function (variables) {
        _this3.privateState.variables = variables;
        _this3.privateState.isLoadingVars = false;
        return _this3.variables.value;
      }).finally(function () {
        _this3.privateState.isLoadingVars = false;
      });
    }
  }, {
    key: "fetchAvailableVariables",
    value: function fetchAvailableVariables(idContext) {
      if (!this.availableVariablesPromises[idContext]) {
        this.availableVariablesPromises[idContext] = external_CoreHome_["AjaxHelper"].fetch({
          method: 'TagManager.getAvailableVariableTypesInContext',
          idContext: idContext,
          filter_limit: '-1'
        }).then(function (variables) {
          return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(variables);
        });
      }

      return Promise.resolve(this.availableVariablesPromises[idContext]);
    }
  }, {
    key: "suggestNameForType",
    value: function suggestNameForType(templateId) {
      var _this4 = this;

      var _loop = function _loop(counter) {
        var name = templateId;

        if (counter) {
          name = "".concat(name, " (").concat(counter, ")");
        }

        var isFree = !_this4.variables.value.some(function (v) {
          return v.name === name;
        });

        if (isFree) {
          return {
            v: name
          };
        }
      };

      for (var counter = 0; counter < 100; counter += 1) {
        var _ret = _loop(counter);

        if (_typeof(_ret) === "object") return _ret.v;
      }

      return undefined;
    }
  }, {
    key: "createOrUpdateVariable",
    value: function createOrUpdateVariable(variable, method, idContainer, idContainerVersion, parameterValues) {
      var _this5 = this;

      this.privateState.isUpdating = true;
      var mappedEntries = Object.entries(parameterValues).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        var newValue = value;

        if (typeof value === 'boolean') {
          newValue = (+value).toString();
        }

        return [key, newValue];
      });
      var parameters = Object.fromEntries(mappedEntries);
      var lookupTable = variable.lookup_table.filter(function (l) {
        return l && l.out_value && l.comparison;
      });
      return external_CoreHome_["AjaxHelper"].post({
        idVariable: variable.idvariable,
        method: method,
        idContainer: idContainer,
        idContainerVersion: idContainerVersion,
        type: variable.type,
        name: variable.name,
        defaultValue: variable.default_value
      }, {
        parameters: parameters,
        lookupTable: lookupTable
      }, {
        withTokenInUrl: true
      }).finally(function () {
        _this5.privateState.isUpdating = false;
      });
    }
  }, {
    key: "reload",
    value: function reload(idContainer, idContainerVersion) {
      this.privateState.variables = [];
      this.fetchPromise = null;
      this.availableVariablesPromises = {};
      return this.fetchVariables(idContainer, idContainerVersion);
    }
  }, {
    key: "deleteVariable",
    value: function deleteVariable(idContainer, idContainerVersion, idVariable) {
      var _this6 = this;

      this.privateState.isUpdating = true;
      this.privateState.variables = [];
      return external_CoreHome_["AjaxHelper"].fetch({
        idVariable: idVariable,
        idContainerVersion: idContainerVersion,
        idContainer: idContainer,
        method: 'TagManager.deleteContainerVariable'
      }, {
        withTokenInUrl: true
      }).finally(function () {
        _this6.privateState.isUpdating = false;
      });
    }
  }]);

  return VariablesStore;
}();

/* harmony default export */ var Variables_store = (new Variables_store_VariablesStore());
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/AvailableComparisons.store.ts
function AvailableComparisons_store_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AvailableComparisons_store_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function AvailableComparisons_store_createClass(Constructor, protoProps, staticProps) { if (protoProps) AvailableComparisons_store_defineProperties(Constructor.prototype, protoProps); if (staticProps) AvailableComparisons_store_defineProperties(Constructor, staticProps); return Constructor; }

function AvailableComparisons_store_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */



var AvailableComparisons_store_AvailableComparisonsStore = /*#__PURE__*/function () {
  function AvailableComparisonsStore() {
    var _this = this;

    AvailableComparisons_store_classCallCheck(this, AvailableComparisonsStore);

    AvailableComparisons_store_defineProperty(this, "privateState", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      comparisons: [],
      isLoading: false
    }));

    AvailableComparisons_store_defineProperty(this, "state", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(_this.privateState);
    }));

    AvailableComparisons_store_defineProperty(this, "isLoading", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return _this.state.value.isLoading;
    }));

    AvailableComparisons_store_defineProperty(this, "comparisons", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return _this.state.value.comparisons;
    }));

    AvailableComparisons_store_defineProperty(this, "comparisonOptions", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return _this.comparisons.value.map(function (_ref) {
        var id = _ref.id,
            name = _ref.name;
        return {
          key: id,
          value: name
        };
      });
    }));

    this.fetchAvailableComparisons();
  }

  AvailableComparisons_store_createClass(AvailableComparisonsStore, [{
    key: "fetchAvailableComparisons",
    value: function fetchAvailableComparisons() {
      var _this2 = this;

      this.privateState.isLoading = true;
      external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getAvailableComparisons',
        filter_limit: '-1'
      }).then(function (comparisons) {
        _this2.privateState.comparisons = comparisons;
      }).finally(function () {
        _this2.privateState.isLoading = false;
      });
    }
  }]);

  return AvailableComparisonsStore;
}();

/* harmony default export */ var AvailableComparisons_store = (Object(external_CoreHome_["lazyInitSingleton"])(AvailableComparisons_store_AvailableComparisonsStore));
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Variable/VariableEdit.vue?vue&type=script&lang=ts





var notificationId = 'tagvariablemanagement';
/* harmony default export */ var VariableEditvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idVariable: Number,
    idContainer: {
      type: String,
      required: true
    },
    idContainerVersion: {
      type: Number,
      required: true
    },
    variableType: String,
    isEmbedded: {
      type: Boolean,
      default: false
    }
  },
  components: {
    GroupedSettings: external_CorePluginsAdmin_["GroupedSettings"],
    ContentBlock: external_CoreHome_["ContentBlock"],
    Field: external_CorePluginsAdmin_["Field"],
    SaveButton: external_CorePluginsAdmin_["SaveButton"]
  },
  data: function data() {
    return {
      isDirty: false,
      showAdvanced: false,
      chooseVariableType: false,
      canUseCustomTemplates: external_CoreHome_["Matomo"].hasUserCapability('tagmanager_use_custom_templates'),
      availableVariables: [],
      editTitle: '',
      variable: {},
      parameterValues: {},
      isUpdatingVar: false
    };
  },
  emits: ['changeVariable'],
  created: function created() {
    // needed for suggestNameForType() to make sure it is aware of all names
    Variables_store.fetchVariablesIfNotLoaded(this.idContainer, this.idContainerVersion);
    this.initIdVariable();
  },
  watch: {
    idVariable: function idVariable(newValue) {
      if (newValue === null) {
        return;
      }

      this.initIdVariable();
    },
    variableParameterValues: {
      handler: function handler(newValue, oldValue) {
        if (!newValue || !oldValue) {
          return;
        }

        this.isDirty = true;
      },
      deep: true
    },
    variableLookupTable: {
      handler: function handler() {
        var hasAll = (this.variable.lookup_table || []).every(function (t) {
          return !!(t !== null && t !== void 0 && t.out_value);
        });

        if (hasAll) {
          this.addLookUpEntry();
        }
      },
      deep: true
    }
  },
  methods: {
    removeAnyVariableNotification: function removeAnyVariableNotification() {
      external_CoreHome_["NotificationsStore"].remove(notificationId);
      external_CoreHome_["NotificationsStore"].remove('ajaxHelper');
    },
    showNotification: function showNotification(message, context) {
      var notificationInstanceId = external_CoreHome_["NotificationsStore"].show({
        message: message,
        context: context,
        id: notificationId,
        type: 'transient'
      });
      setTimeout(function () {
        external_CoreHome_["NotificationsStore"].scrollToNotification(notificationInstanceId);
      }, 200);
    },
    showErrorFieldNotProvidedNotification: function showErrorFieldNotProvidedNotification(title) {
      var message = Object(external_CoreHome_["translate"])('TagManager_ErrorXNotProvided', [title]);
      this.showNotification(message, 'error');
    },
    initIdVariable: function initIdVariable() {
      var _this = this;

      external_CoreHome_["Matomo"].helper.lazyScrollToContent();
      this.availableVariables = [];
      external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainer',
        idContainer: this.idContainer,
        filter_limit: '-1'
      }).then(function (container) {
        return Variables_store.fetchAvailableVariables(container.context);
      }).then(function (variables) {
        _this.availableVariables = variables;
      }).then(function () {
        if (_this.edit && _this.idVariable) {
          _this.editTitle = Object(external_CoreHome_["translate"])('TagManager_EditVariable');
          Variables_store.findVariable(_this.idContainer, _this.idContainerVersion, _this.idVariable).then(function (variable) {
            if (!variable) {
              return;
            }

            _this.variable = Object(external_CoreHome_["clone"])(variable);
            _this.parameterValues = Object.fromEntries(variable.typeMetadata.parameters.map(function (s) {
              return [s.name, s.value];
            }));

            if (_this.variable.lookup_table && _this.variable.lookup_table.length || _this.variable.default_value) {
              _this.showAdvanced = true; // make sure lookup_table is visible directly if configured
            }

            _this.addLookUpEntryIfNoneExists();

            _this.isDirty = false;
          });
          return;
        }

        if (_this.create) {
          var found = false;

          if (_this.variableType) {
            _this.availableVariables.forEach(function (category) {
              if (!found) {
                var variable = category.types.find(function (v) {
                  return (v === null || v === void 0 ? void 0 : v.id) === _this.variableType;
                });

                if (variable) {
                  found = true;

                  _this.createVariableType(variable);
                }
              }
            });
          }

          if (!found) {
            _this.editTitle = Object(external_CoreHome_["translate"])('TagManager_ChooseVariableToContinue');
            _this.chooseVariableType = true;
          }
        }
      });
    },
    addLookUpEntryIfNoneExists: function addLookUpEntryIfNoneExists() {
      if (!this.variable.lookup_table || !Array.isArray(this.variable.lookup_table)) {
        this.variable.lookup_table = [];
      }

      if (!this.variable.lookup_table.length) {
        this.variable.lookup_table.push({
          comparison: 'equals',
          match_value: '',
          out_value: ''
        });
      }
    },
    addLookUpEntry: function addLookUpEntry() {
      this.variable.lookup_table.push({
        comparison: 'equals',
        match_value: '',
        out_value: ''
      });
      this.isDirty = true;
    },
    removeLookUpEntry: function removeLookUpEntry(index) {
      if (index > -1) {
        this.variable.lookup_table.splice(index, 1);
        this.isDirty = true;
      }
    },
    createVariableType: function createVariableType(variableTemplate) {
      var _this2 = this;

      if (variableTemplate && this.isVariableTemplateDisabled[variableTemplate.id]) {
        return;
      }

      this.chooseVariableType = false;
      this.editTitle = Object(external_CoreHome_["translate"])('TagManager_CreateNewVariable');
      this.variable = {
        idsite: parseInt("".concat(external_CoreHome_["Matomo"].idSite), 10),
        name: Variables_store.suggestNameForType(variableTemplate.name) || '',
        type: variableTemplate.id,
        idcontainer: this.idContainer,
        idcontainerversion: this.idContainerVersion,
        default_value: '',
        lookup_table: [],
        typeMetadata: variableTemplate
      };
      this.parameterValues = Object.fromEntries(variableTemplate.parameters.map(function (s) {
        return [s.name, s.value];
      }));
      this.addLookUpEntry(); // we directly make the create button visible as sometimes some variables do not have
      // any settings

      this.isDirty = true;
      Object(external_commonjs_vue_commonjs2_vue_root_Vue_["nextTick"])(function () {
        if (!_this2.$refs.root) {
          return;
        }

        var root = _this2.$refs.root;
        root.scrollIntoView();
        var name = root.querySelector('#name');

        if (name) {
          name.focus();
        }
      });
    },
    cancel: function cancel() {
      var newParams = Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value);
      delete newParams.idVariable;
      external_CoreHome_["MatomoUrl"].updateHash(newParams);
    },
    createVariable: function createVariable() {
      var _this3 = this;

      this.removeAnyVariableNotification();

      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }

      this.isUpdatingVar = true;
      Variables_store.createOrUpdateVariable(Object.assign(Object.assign({}, this.variable), {}, {
        name: encodeURIComponent(this.variable.name)
      }), 'TagManager.addContainerVariable', this.idContainer, this.idContainerVersion, this.parameterValues).then(function (response) {
        if (!response) {
          return;
        }

        _this3.isDirty = false;
        var idVariable = response.value;
        Variables_store.reload(_this3.idContainer, _this3.idContainerVersion).then(function () {
          if (_this3.isEmbedded) {
            _this3.variable.idvariable = idVariable;

            _this3.$emit('changeVariable', {
              variable: _this3.variable
            });

            return;
          }

          if (external_CoreHome_["Matomo"].helper.isAngularRenderingThePage()) {
            external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
              idVariable: idVariable
            }));
          } else {
            // TODO: compare w/ original behavior
            external_CoreHome_["MatomoUrl"].updateHash({
              idVariable: idVariable
            });
          }

          setTimeout(function () {
            var createdX = Object(external_CoreHome_["translate"])('TagManager_CreatedX', Object(external_CoreHome_["translate"])('TagManager_Variable'));
            var wantToRedeploy = Object(external_CoreHome_["translate"])('TagManager_WantToDeployThisChangeCreateVersion', '<a class="createNewVersionLink">', '</a>');

            _this3.showNotification("".concat(createdX, " ").concat(wantToRedeploy), 'success');
          }, 200);
        });
      }).finally(function () {
        _this3.isUpdatingVar = false;
      });
    },
    setValueHasChanged: function setValueHasChanged() {
      this.isDirty = true;
    },
    updateVariable: function updateVariable() {
      var _this4 = this;

      this.removeAnyVariableNotification();

      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }

      this.isUpdatingVar = true;
      Variables_store.createOrUpdateVariable(Object.assign(Object.assign({}, this.variable), {}, {
        name: encodeURIComponent(this.variable.name)
      }), 'TagManager.updateContainerVariable', this.idContainer, this.idContainerVersion, this.parameterValues).then(function (response) {
        if (!response) {
          return;
        }

        if (_this4.isEmbedded) {
          _this4.$emit('changeVariable', {
            variable: _this4.variable
          });

          return;
        }

        _this4.isDirty = false;
        Variables_store.reload(_this4.idContainer, _this4.idContainerVersion).then(function () {
          _this4.initIdVariable();
        });
        var updatedAt = Object(external_CoreHome_["translate"])('TagManager_UpdatedX', Object(external_CoreHome_["translate"])('TagManager_Variable'));
        var wantToDeploy = Object(external_CoreHome_["translate"])('TagManager_WantToDeployThisChangeCreateVersion', '<a class="createNewVersionLink">', '</a>');

        _this4.showNotification("".concat(updatedAt, " ").concat(wantToDeploy), 'success');
      }).finally(function () {
        _this4.isUpdatingVar = false;
      });
    },
    checkRequiredFieldsAreSet: function checkRequiredFieldsAreSet() {
      if (!this.variable.name) {
        this.showErrorFieldNotProvidedNotification(Object(external_CoreHome_["translate"])('General_Name'));
        return false;
      }

      return true;
    }
  },
  computed: {
    typeInlineHelp: function typeInlineHelp() {
      var _this$variable$typeMe, _this$variable$typeMe2;

      var desc = ((_this$variable$typeMe = this.variable.typeMetadata) === null || _this$variable$typeMe === void 0 ? void 0 : _this$variable$typeMe.description) || '';
      var help = ((_this$variable$typeMe2 = this.variable.typeMetadata) === null || _this$variable$typeMe2 === void 0 ? void 0 : _this$variable$typeMe2.help) || '';
      return "".concat(desc, " ").concat(help);
    },
    create: function create() {
      return this.idVariable === 0;
    },
    edit: function edit() {
      return !this.create;
    },
    isLoading: function isLoading() {
      return Variables_store.isLoading.value || AvailableComparisons_store.isLoading.value;
    },
    isUpdating: function isUpdating() {
      return Variables_store.isUpdating.value || this.isUpdatingVar;
    },
    availableLookUpComparisons: function availableLookUpComparisons() {
      return AvailableComparisons_store.comparisonOptions.value;
    },
    isVariableTemplateDisabled: function isVariableTemplateDisabled() {
      var _this5 = this;

      var result = {};
      this.availableVariables.forEach(function (variableCategory) {
        variableCategory.types.forEach(function (variable) {
          result[variable.id] = !_this5.canUseCustomTemplates && variable.isCustomTemplate;
        });
      });
      return result;
    },
    isVariableDisabled: function isVariableDisabled() {
      var _this$variable$typeMe3;

      return !this.canUseCustomTemplates && ((_this$variable$typeMe3 = this.variable.typeMetadata) === null || _this$variable$typeMe3 === void 0 ? void 0 : _this$variable$typeMe3.isCustomTemplate);
    },
    variableParameterValues: function variableParameterValues() {
      var _this$variable$typeMe4;

      if (!((_this$variable$typeMe4 = this.variable.typeMetadata) !== null && _this$variable$typeMe4 !== void 0 && _this$variable$typeMe4.parameters)) {
        return null;
      }

      return this.parameterValues;
    },
    variableLookupTable: function variableLookupTable() {
      return this.variable.lookup_table;
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/VariableEdit.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/VariableEdit.vue



VariableEditvue_type_script_lang_ts.render = VariableEditvue_type_template_id_93faf56a_render

/* harmony default export */ var VariableEdit = (VariableEditvue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/VariableEdit.adapter.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


/* harmony default export */ var VariableEdit_adapter = (Object(external_CoreHome_["createAngularJsAdapter"])({
  component: VariableEdit,
  scope: {
    idVariable: {
      angularJsBind: '='
    },
    idContainer: {
      angularJsBind: '='
    },
    idContainerVersion: {
      angularJsBind: '='
    },
    variableType: {
      angularJsBind: '=?'
    },
    isEmbedded: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      default: function _default(scope) {
        return !!scope.onChangeVariable;
      }
    },
    onChangeVariable: {
      angularJsBind: '&?',
      vue: 'changeVariable'
    }
  },
  directiveName: 'piwikVariableEdit',
  events: {
    onChangeVariable: function onChangeVariable($event, vm, scope) {
      scope.idVariable = $event.variable.idvariable;
    }
  },
  postCreate: function postCreate(vm, scope) {
    scope.$on('$destroy', function () {
      scope.idVariable = null;
    });
  }
}));
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Variable/VariableList.vue?vue&type=template&id=13cf24a8

var VariableListvue_type_template_id_13cf24a8_hoisted_1 = {
  class: "tagManagerManageList tagManagerVariableList"
};
var VariableListvue_type_template_id_13cf24a8_hoisted_2 = {
  class: "name"
};
var VariableListvue_type_template_id_13cf24a8_hoisted_3 = {
  class: "type"
};
var VariableListvue_type_template_id_13cf24a8_hoisted_4 = {
  class: "lookupTable"
};
var VariableListvue_type_template_id_13cf24a8_hoisted_5 = {
  class: "lastUpdated"
};
var VariableListvue_type_template_id_13cf24a8_hoisted_6 = {
  colspan: "7"
};
var VariableListvue_type_template_id_13cf24a8_hoisted_7 = {
  class: "loadingPiwik"
};

var VariableListvue_type_template_id_13cf24a8_hoisted_8 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);

var VariableListvue_type_template_id_13cf24a8_hoisted_9 = {
  colspan: "7"
};
var VariableListvue_type_template_id_13cf24a8_hoisted_10 = ["id"];
var VariableListvue_type_template_id_13cf24a8_hoisted_11 = {
  class: "name"
};
var VariableListvue_type_template_id_13cf24a8_hoisted_12 = ["title"];
var VariableListvue_type_template_id_13cf24a8_hoisted_13 = {
  class: "lookupTable"
};
var VariableListvue_type_template_id_13cf24a8_hoisted_14 = {
  class: "icon-ok"
};
var VariableListvue_type_template_id_13cf24a8_hoisted_15 = ["title"];
var VariableListvue_type_template_id_13cf24a8_hoisted_16 = {
  class: "action"
};
var VariableListvue_type_template_id_13cf24a8_hoisted_17 = ["onClick", "title"];
var VariableListvue_type_template_id_13cf24a8_hoisted_18 = ["onClick", "title"];
var VariableListvue_type_template_id_13cf24a8_hoisted_19 = {
  class: "tableActionBar"
};

var VariableListvue_type_template_id_13cf24a8_hoisted_20 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, null, -1);

var VariableListvue_type_template_id_13cf24a8_hoisted_21 = ["title"];

var VariableListvue_type_template_id_13cf24a8_hoisted_22 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-help preconfiguredVariablesHelp"
}, null, -1);

var VariableListvue_type_template_id_13cf24a8_hoisted_23 = {
  class: "collection-header"
};
var VariableListvue_type_template_id_13cf24a8_hoisted_24 = {
  class: "title"
};
var VariableListvue_type_template_id_13cf24a8_hoisted_25 = ["textContent"];
var VariableListvue_type_template_id_13cf24a8_hoisted_26 = {
  class: "secondary-content"
};
var VariableListvue_type_template_id_13cf24a8_hoisted_27 = ["title"];
var _hoisted_28 = {
  class: "ui-confirm",
  id: "confirmDeleteVariable",
  ref: "confirmDeleteVariable"
};
var _hoisted_29 = ["value"];
var _hoisted_30 = ["value"];
var _hoisted_31 = {
  class: "ui-confirm",
  id: "confirmDeleteVariableNotPossible",
  ref: "confirmDeleteVariableNotPossible"
};
var _hoisted_32 = {
  class: "collection"
};
var _hoisted_33 = ["value"];
function VariableListvue_type_template_id_13cf24a8_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");

  var _directive_content_table = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("content-table");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VariableListvue_type_template_id_13cf24a8_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: "Tag Manager",
    class: "tagManagerCustomVariablesList",
    "content-title": _ctx.translate('TagManager_ManageX', _ctx.translate('TagManager_Variables'))
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_VariableUsageBenefits')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("table", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", VariableListvue_type_template_id_13cf24a8_hoisted_2, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Name')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", VariableListvue_type_template_id_13cf24a8_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Type')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", VariableListvue_type_template_id_13cf24a8_hoisted_4, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_LookupTable')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", VariableListvue_type_template_id_13cf24a8_hoisted_5, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_LastUpdated')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
        class: "action"
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Actions')), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VariableListvue_type_template_id_13cf24a8_hoisted_6, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", VariableListvue_type_template_id_13cf24a8_hoisted_7, [VariableListvue_type_template_id_13cf24a8_hoisted_8, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_LoadingData')), 1)])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isLoading || _ctx.isUpdating]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VariableListvue_type_template_id_13cf24a8_hoisted_9, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_NoVariablesFound')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "createContainerVariableNow",
        onClick: _cache[0] || (_cache[0] = function ($event) {
          return _ctx.createVariable();
        })
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewVariableNow')), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isLoading && !_ctx.variables.length]]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.sortedVariables, function (variable) {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
          id: "variable".concat(variable.idvariable),
          class: "variables",
          key: variable.idvariable
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VariableListvue_type_template_id_13cf24a8_hoisted_11, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variable.name), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
          class: "type",
          title: variable.typeMetadata.description
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variable.typeMetadata.name), 9, VariableListvue_type_template_id_13cf24a8_hoisted_12), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VariableListvue_type_template_id_13cf24a8_hoisted_13, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", VariableListvue_type_template_id_13cf24a8_hoisted_14, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], variable.lookup_table.length]])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
          class: "lastUpdated",
          title: _ctx.translate('TagManager_CreatedOnX', variable.created_date_pretty)
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variable.updated_date_pretty), 1)], 8, VariableListvue_type_template_id_13cf24a8_hoisted_15), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VariableListvue_type_template_id_13cf24a8_hoisted_16, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
          class: "table-action icon-edit",
          onClick: function onClick($event) {
            return _ctx.editVariable(variable.idvariable, variable.type);
          },
          title: _ctx.translate('TagManager_EditVariable')
        }, null, 8, VariableListvue_type_template_id_13cf24a8_hoisted_17), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
          class: "table-action icon-delete",
          onClick: function onClick($event) {
            return _ctx.deleteVariable(variable);
          },
          title: _ctx.translate('TagManager_DeleteX', _ctx.translate('TagManager_Variable'))
        }, null, 8, VariableListvue_type_template_id_13cf24a8_hoisted_18)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])], 8, VariableListvue_type_template_id_13cf24a8_hoisted_10);
      }), 128))])], 512), [[_directive_content_table]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableListvue_type_template_id_13cf24a8_hoisted_19, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "createNewVariable",
        value: "",
        onClick: _cache[1] || (_cache[1] = function ($event) {
          return _ctx.createVariable();
        })
      }, [VariableListvue_type_template_id_13cf24a8_hoisted_20, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewVariable')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])];
    }),
    _: 1
  }, 8, ["content-title"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", {
    title: _ctx.translate('TagManager_PreConfiguredInfoTitle')
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_PreconfiguredVariables')) + " ", 1), VariableListvue_type_template_id_13cf24a8_hoisted_22], 8, VariableListvue_type_template_id_13cf24a8_hoisted_21), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.containerVariables, function (variableCategory, index) {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("ul", {
      class: "collection with-header",
      key: index
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", VariableListvue_type_template_id_13cf24a8_hoisted_23, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variableCategory.name), 1)]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(variableCategory.types, function (variableTemplate) {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
        class: "collection-item",
        key: variableTemplate.id
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", VariableListvue_type_template_id_13cf24a8_hoisted_24, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variableTemplate.name) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
        class: "variableId",
        textContent: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])("{{".concat(variableTemplate.id, "}}"))
      }, null, 8, VariableListvue_type_template_id_13cf24a8_hoisted_25)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", VariableListvue_type_template_id_13cf24a8_hoisted_26, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("i", {
        class: "icon-help",
        title: variableTemplate.description
      }, null, 8, VariableListvue_type_template_id_13cf24a8_hoisted_27)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !!variableTemplate.description]])], 512)), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], variableTemplate.is_pre_configured]]);
    }), 128))]);
  }), 128))]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_28, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_DeleteVariableConfirm')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "yes",
    type: "button",
    value: _ctx.translate('General_Yes')
  }, null, 8, _hoisted_29), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "no",
    type: "button",
    value: _ctx.translate('General_No')
  }, null, 8, _hoisted_30)], 512), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_31, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_VariableCannotBeDeleted')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_VariableBeingUsedBy')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", _hoisted_32, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.variableReferences, function (reference) {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
      class: "collection-item",
      key: "".concat(reference.referenceType, ".").concat(reference.referenceId)
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(reference.referenceTypeName) + ": " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(reference.referenceName), 1);
  }), 128))]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_VariableBeingUsedNeedsRemove')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "no",
    type: "button",
    value: _ctx.translate('General_Cancel')
  }, null, 8, _hoisted_33)], 512)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/VariableList.vue?vue&type=template&id=13cf24a8

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Variable/VariableList.vue?vue&type=script&lang=ts
function VariableListvue_type_script_lang_ts_toConsumableArray(arr) { return VariableListvue_type_script_lang_ts_arrayWithoutHoles(arr) || VariableListvue_type_script_lang_ts_iterableToArray(arr) || VariableListvue_type_script_lang_ts_unsupportedIterableToArray(arr) || VariableListvue_type_script_lang_ts_nonIterableSpread(); }

function VariableListvue_type_script_lang_ts_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function VariableListvue_type_script_lang_ts_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return VariableListvue_type_script_lang_ts_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return VariableListvue_type_script_lang_ts_arrayLikeToArray(o, minLen); }

function VariableListvue_type_script_lang_ts_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function VariableListvue_type_script_lang_ts_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return VariableListvue_type_script_lang_ts_arrayLikeToArray(arr); }

function VariableListvue_type_script_lang_ts_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




/* harmony default export */ var VariableListvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idContainer: {
      type: String,
      required: true
    },
    idContainerVersion: {
      type: Number,
      required: true
    }
  },
  components: {
    ContentBlock: external_CoreHome_["ContentBlock"]
  },
  directives: {
    ContentTable: external_CoreHome_["ContentTable"]
  },
  data: function data() {
    return {
      hasWriteAccess: external_CoreHome_["Matomo"].hasUserCapability('tagmanager_write'),
      variableReferences: [],
      containerVariables: []
    };
  },
  created: function created() {
    var _this = this;

    Variables_store.fetchVariables(this.idContainer, this.idContainerVersion);
    external_CoreHome_["AjaxHelper"].fetch({
      method: 'TagManager.getAvailableContainerVariables',
      idContainer: this.idContainer,
      idContainerVersion: this.idContainerVersion,
      filter_limit: '-1'
    }).then(function (variables) {
      _this.containerVariables = variables;
    });
  },
  methods: {
    createVariable: function createVariable() {
      this.editVariable(0);
    },
    editVariable: function editVariable(idVariable) {
      external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
        idVariable: idVariable
      }));
    },
    deleteVariable: function deleteVariable(variable) {
      var _this2 = this;

      external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainerVariableReferences',
        idContainer: this.idContainer,
        idContainerVersion: this.idContainerVersion,
        idVariable: variable.idvariable
      }).then(function (references) {
        if (!references || !references.length) {
          _this2.variableReferences = [];
          external_CoreHome_["Matomo"].helper.modalConfirm(_this2.$refs.confirmDeleteVariable, {
            yes: function yes() {
              Variables_store.deleteVariable(_this2.idContainer, _this2.idContainerVersion, variable.idvariable).then(function () {
                Variables_store.reload(_this2.idContainer, _this2.idContainerVersion);
              });
            }
          });
        } else {
          _this2.variableReferences = references;
          external_CoreHome_["Matomo"].helper.modalConfirm(_this2.$refs.confirmDeleteVariableNotPossible, {});
        }
      });
    }
  },
  computed: {
    isLoading: function isLoading() {
      return Variables_store.isLoading.value;
    },
    isUpdating: function isUpdating() {
      return Variables_store.isUpdating.value;
    },
    variables: function variables() {
      return Variables_store.variables.value;
    },
    sortedVariables: function sortedVariables() {
      var sorted = VariableListvue_type_script_lang_ts_toConsumableArray(this.variables);

      sorted.sort(function (lhs, rhs) {
        if (lhs.name < rhs.name) {
          return -1;
        }

        return lhs.name > rhs.name ? 1 : 0;
      });
      return sorted;
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/VariableList.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/VariableList.vue



VariableListvue_type_script_lang_ts.render = VariableListvue_type_template_id_13cf24a8_render

/* harmony default export */ var VariableList = (VariableListvue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/VariableList.adapter.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


/* harmony default export */ var VariableList_adapter = (Object(external_CoreHome_["createAngularJsAdapter"])({
  component: VariableList,
  scope: {
    idContainer: {
      angularJsBind: '='
    },
    idContainerVersion: {
      angularJsBind: '='
    }
  },
  directiveName: 'piwikVariableList'
}));
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Variable/VariableManage.vue?vue&type=template&id=1344dd73

var VariableManagevue_type_template_id_1344dd73_hoisted_1 = {
  class: "manageVariable"
};
var VariableManagevue_type_template_id_1344dd73_hoisted_2 = {
  key: 0
};
var VariableManagevue_type_template_id_1344dd73_hoisted_3 = {
  key: 1
};
function VariableManagevue_type_template_id_1344dd73_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_VariableList = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("VariableList");

  var _component_VariableEdit = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("VariableEdit");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VariableManagevue_type_template_id_1344dd73_hoisted_1, [!_ctx.editMode ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VariableManagevue_type_template_id_1344dd73_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_VariableList, {
    "id-container-version": _ctx.idContainerVersion,
    "id-container": _ctx.idContainer
  }, null, 8, ["id-container-version", "id-container"])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.editMode ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VariableManagevue_type_template_id_1344dd73_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_VariableEdit, {
    "id-container-version": _ctx.idContainerVersion,
    "id-container": _ctx.idContainer,
    "id-variable": _ctx.idVariable
  }, null, 8, ["id-container-version", "id-container", "id-variable"])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/VariableManage.vue?vue&type=template&id=1344dd73

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Variable/VariableManage.vue?vue&type=script&lang=ts




/* harmony default export */ var VariableManagevue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idContainerVersion: Number,
    idContainer: String
  },
  components: {
    VariableList: VariableList,
    VariableEdit: VariableEdit
  },
  data: function data() {
    return {
      isAddAllowed: false
    };
  },
  created: function created() {
    var _this = this;

    // doing this in a watch because we don't want to post an event in a computed property
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["watch"])(function () {
      return external_CoreHome_["MatomoUrl"].hashParsed.value.idVariable;
    }, function (idVariable) {
      _this.onIdVariableParamChange(idVariable);
    });
    external_CoreHome_["NotificationsStore"].remove('variablevariablemanagement');
    this.onIdVariableParamChange(external_CoreHome_["MatomoUrl"].hashParsed.value.idVariable);
  },
  methods: {
    onIdVariableParamChange: function onIdVariableParamChange(idVariable) {
      // for BC w/ angularjs only invoke event if idVariable is 0
      if (idVariable === '0') {
        var parameters = {
          isAllowed: true
        };
        external_CoreHome_["Matomo"].postEvent('TagManager.initAddVariable', parameters);
        this.isAddAllowed = !!parameters.isAllowed;
      }
    }
  },
  computed: {
    idVariable: function idVariable() {
      var idVariable = external_CoreHome_["MatomoUrl"].hashParsed.value.idVariable;

      if (!this.isAddAllowed && idVariable === '0') {
        return null;
      }

      return idVariable ? parseInt(idVariable, 10) : idVariable;
    },
    editMode: function editMode() {
      return typeof this.idVariable === 'number';
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/VariableManage.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/VariableManage.vue



VariableManagevue_type_script_lang_ts.render = VariableManagevue_type_template_id_1344dd73_render

/* harmony default export */ var VariableManage = (VariableManagevue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/VariableManage.adapter.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


/* harmony default export */ var VariableManage_adapter = (Object(external_CoreHome_["createAngularJsAdapter"])({
  component: VariableManage,
  scope: {
    idContainerVersion: {
      angularJsBind: '@',
      transform: function transform(value) {
        return value ? parseInt(value, 10) : undefined;
      }
    },
    idContainer: {
      angularJsBind: '@'
    }
  },
  directiveName: 'piwikVariableManage'
}));
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Field/FieldTextareaVariable.vue?vue&type=template&id=36f615a2

var FieldTextareaVariablevue_type_template_id_36f615a2_hoisted_1 = {
  class: "fieldVariableTemplate"
};
var FieldTextareaVariablevue_type_template_id_36f615a2_hoisted_2 = ["type", "id", "name", "value"];
var FieldTextareaVariablevue_type_template_id_36f615a2_hoisted_3 = ["title"];
var FieldTextareaVariablevue_type_template_id_36f615a2_hoisted_4 = ["for", "innerHTML"];
function FieldTextareaVariablevue_type_template_id_36f615a2_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", FieldTextareaVariablevue_type_template_id_36f615a2_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("textarea", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["mergeProps"])({
    class: "control_".concat(_ctx.uiControl, " materialize-textarea"),
    type: _ctx.uiControl,
    id: _ctx.name,
    name: _ctx.name,
    value: _ctx.modelValue,
    onKeydown: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.onKeydown($event);
    }),
    onChange: _cache[1] || (_cache[1] = function ($event) {
      return _ctx.onKeydown($event);
    }),
    placeholder: "",
    style: {
      "width": "calc(100% - 40px)"
    }
  }, _ctx.uiControlAttributes, {
    ref: "textarea"
  }), null, 16, FieldTextareaVariablevue_type_template_id_36f615a2_hoisted_2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
    class: "icon-code",
    style: {
      "margin-top": "14px",
      "position": "absolute"
    },
    title: _ctx.translate('TagManager_ChooseVariable'),
    onClick: _cache[2] || (_cache[2] = function ($event) {
      return _ctx.selectVariable();
    })
  }, null, 8, FieldTextareaVariablevue_type_template_id_36f615a2_hoisted_3), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
    for: _ctx.name,
    innerHTML: _ctx.$sanitize(_ctx.title)
  }, null, 8, FieldTextareaVariablevue_type_template_id_36f615a2_hoisted_4)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Field/FieldTextareaVariable.vue?vue&type=template&id=36f615a2

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Field/FieldTextareaVariable.vue?vue&type=script&lang=ts


var FieldTextareaVariablevue_type_script_lang_ts_window = window,
    FieldTextareaVariablevue_type_script_lang_ts_tagManagerHelper = FieldTextareaVariablevue_type_script_lang_ts_window.tagManagerHelper;
/* harmony default export */ var FieldTextareaVariablevue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    name: String,
    uiControlAttributes: Object,
    modelValue: String,
    title: String,
    uiControl: {
      type: String,
      required: true
    }
  },
  inheritAttrs: false,
  emits: ['update:modelValue'],
  created: function created() {
    this.onKeydown = Object(external_CoreHome_["debounce"])(this.onKeydown.bind(this), 50);
  },
  methods: {
    onKeydown: function onKeydown(event) {
      this.$emit('update:modelValue', event.target.value);
    },
    selectVariable: function selectVariable() {
      var _this = this;

      FieldTextareaVariablevue_type_script_lang_ts_tagManagerHelper.selectVariable(function (variable) {
        FieldTextareaVariablevue_type_script_lang_ts_tagManagerHelper.insertTextSnippetAtElement(_this.$refs.textarea, "{{".concat(variable.id, "}}"));
      });
    }
  },
  watch: {
    modelValue: function modelValue() {
      var _this2 = this;

      var _window2 = window,
          Materialize = _window2.Materialize;
      setTimeout(function () {
        Materialize.textareaAutoResize(_this2.$refs.textarea);
        Materialize.updateTextFields();
      });
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    var _window3 = window,
        Materialize = _window3.Materialize;
    setTimeout(function () {
      Materialize.textareaAutoResize(_this3.$refs.textarea);
      Materialize.updateTextFields();
    });
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Field/FieldTextareaVariable.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Field/FieldTextareaVariable.vue



FieldTextareaVariablevue_type_script_lang_ts.render = FieldTextareaVariablevue_type_template_id_36f615a2_render

/* harmony default export */ var FieldTextareaVariable = (FieldTextareaVariablevue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Field/FieldVariableTemplate.vue?vue&type=template&id=025d3bb8

var FieldVariableTemplatevue_type_template_id_025d3bb8_hoisted_1 = {
  class: "fieldVariableTemplate"
};
var FieldVariableTemplatevue_type_template_id_025d3bb8_hoisted_2 = ["type", "id", "name", "value"];
var FieldVariableTemplatevue_type_template_id_025d3bb8_hoisted_3 = ["title"];

var FieldVariableTemplatevue_type_template_id_025d3bb8_hoisted_4 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);

var FieldVariableTemplatevue_type_template_id_025d3bb8_hoisted_5 = ["for", "innerHTML"];
function FieldVariableTemplatevue_type_template_id_025d3bb8_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", FieldVariableTemplatevue_type_template_id_025d3bb8_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["mergeProps"])({
    class: "control_".concat(_ctx.uiControl),
    type: _ctx.uiControl,
    id: _ctx.name,
    name: _ctx.name,
    value: _ctx.modelValueText,
    onKeydown: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.onKeydown($event);
    }),
    onChange: _cache[1] || (_cache[1] = function ($event) {
      return _ctx.onKeydown($event);
    }),
    placeholder: "",
    style: {
      "width": "calc(100% - 40px)"
    }
  }, _ctx.uiControlAttributes, {
    ref: "input"
  }), null, 16, FieldVariableTemplatevue_type_template_id_025d3bb8_hoisted_2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
    class: "icon-code",
    title: _ctx.translate('TagManager_ChooseVariable'),
    onClick: _cache[2] || (_cache[2] = function ($event) {
      return _ctx.selectVariable();
    })
  }, null, 8, FieldVariableTemplatevue_type_template_id_025d3bb8_hoisted_3), FieldVariableTemplatevue_type_template_id_025d3bb8_hoisted_4, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
    for: _ctx.name,
    innerHTML: _ctx.$sanitize(_ctx.title)
  }, null, 8, FieldVariableTemplatevue_type_template_id_025d3bb8_hoisted_5)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Field/FieldVariableTemplate.vue?vue&type=template&id=025d3bb8

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Field/FieldVariableTemplate.vue?vue&type=script&lang=ts


var FieldVariableTemplatevue_type_script_lang_ts_window = window,
    FieldVariableTemplatevue_type_script_lang_ts_tagManagerHelper = FieldVariableTemplatevue_type_script_lang_ts_window.tagManagerHelper;
/* harmony default export */ var FieldVariableTemplatevue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    uiControl: {
      type: String,
      required: true
    },
    uiControlAttributes: Object,
    name: String,
    title: String,
    modelValue: null
  },
  inheritAttrs: false,
  emits: ['update:modelValue'],
  computed: {
    modelValueText: function modelValueText() {
      if (typeof this.modelValue === 'undefined' || this.modelValue === null) {
        return '';
      }

      return this.modelValue.toString();
    }
  },
  created: function created() {
    // debounce because puppeteer types reeaally fast
    this.onKeydown = Object(external_CoreHome_["debounce"])(this.onKeydown.bind(this), 50);
  },
  mounted: function mounted() {
    setTimeout(function () {
      window.Materialize.updateTextFields();
    });
  },
  watch: {
    modelValue: function modelValue() {
      setTimeout(function () {
        window.Materialize.updateTextFields();
      });
    }
  },
  methods: {
    onKeydown: function onKeydown(event) {
      this.$emit('update:modelValue', event.target.value);
    },
    selectVariable: function selectVariable() {
      var _this = this;

      FieldVariableTemplatevue_type_script_lang_ts_tagManagerHelper.selectVariable(function (variable) {
        FieldVariableTemplatevue_type_script_lang_ts_tagManagerHelper.insertTextSnippetAtElement(_this.$refs.input, "{{".concat(variable.id, "}}"));
      });
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Field/FieldVariableTemplate.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Field/FieldVariableTemplate.vue



FieldVariableTemplatevue_type_script_lang_ts.render = FieldVariableTemplatevue_type_template_id_025d3bb8_render

/* harmony default export */ var FieldVariableTemplate = (FieldVariableTemplatevue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Field/FieldVariableTypeTemplate.vue?vue&type=template&id=74bb398d

var FieldVariableTypeTemplatevue_type_template_id_74bb398d_hoisted_1 = ["for", "innerHTML"];
function FieldVariableTypeTemplatevue_type_template_id_74bb398d_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_VariableSelectType = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("VariableSelectType");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_VariableSelectType, {
    "model-value": _ctx.modelValue,
    id: _ctx.name,
    name: _ctx.name,
    "variable-type-name": _ctx.title,
    "variable-type": _ctx.uiControlAttributes.variableType,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return _ctx.$emit('update:modelValue', $event);
    })
  }, null, 8, ["model-value", "id", "name", "variable-type-name", "variable-type"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
    for: _ctx.name,
    style: {
      "font-size": "0.8rem"
    },
    innerHTML: _ctx.$sanitize(_ctx.title)
  }, null, 8, FieldVariableTypeTemplatevue_type_template_id_74bb398d_hoisted_1)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Field/FieldVariableTypeTemplate.vue?vue&type=template&id=74bb398d

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Field/FieldVariableTypeTemplate.vue?vue&type=script&lang=ts


/* harmony default export */ var FieldVariableTypeTemplatevue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    uiControlAttributes: {
      type: Object,
      required: true
    },
    name: String,
    title: String,
    modelValue: String
  },
  components: {
    VariableSelectType: VariableSelectType
  },
  emits: ['update:modelValue']
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Field/FieldVariableTypeTemplate.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Field/FieldVariableTypeTemplate.vue



FieldVariableTypeTemplatevue_type_script_lang_ts.render = FieldVariableTypeTemplatevue_type_template_id_74bb398d_render

/* harmony default export */ var FieldVariableTypeTemplate = (FieldVariableTypeTemplatevue_type_script_lang_ts);
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