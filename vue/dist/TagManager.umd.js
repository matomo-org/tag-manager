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
__webpack_require__.d(__webpack_exports__, "TriggerEdit", function() { return /* reexport */ TriggerEdit; });
__webpack_require__.d(__webpack_exports__, "TriggerList", function() { return /* reexport */ TriggerList; });
__webpack_require__.d(__webpack_exports__, "TriggerManage", function() { return /* reexport */ TriggerManage; });
__webpack_require__.d(__webpack_exports__, "TagEdit", function() { return /* reexport */ TagEdit; });
__webpack_require__.d(__webpack_exports__, "TagList", function() { return /* reexport */ TagList; });
__webpack_require__.d(__webpack_exports__, "TagManage", function() { return /* reexport */ TagManage; });
__webpack_require__.d(__webpack_exports__, "VersionEdit", function() { return /* reexport */ VersionEdit; });
__webpack_require__.d(__webpack_exports__, "VersionList", function() { return /* reexport */ VersionList; });
__webpack_require__.d(__webpack_exports__, "VersionManage", function() { return /* reexport */ VersionManage; });
__webpack_require__.d(__webpack_exports__, "ContainerEdit", function() { return /* reexport */ ContainerEdit; });
__webpack_require__.d(__webpack_exports__, "ContainerList", function() { return /* reexport */ ContainerList; });
__webpack_require__.d(__webpack_exports__, "ContainerManage", function() { return /* reexport */ ContainerManage; });
__webpack_require__.d(__webpack_exports__, "ContainerDashboard", function() { return /* reexport */ ContainerDashboard; });
__webpack_require__.d(__webpack_exports__, "ContainerSelector", function() { return /* reexport */ ContainerSelector; });
__webpack_require__.d(__webpack_exports__, "ManageInstallTagCode", function() { return /* reexport */ ManageInstallTagCode; });
__webpack_require__.d(__webpack_exports__, "TagmanagerTrackingCode", function() { return /* reexport */ TagmanagerTrackingCode; });
__webpack_require__.d(__webpack_exports__, "TrackingSPAPage", function() { return /* reexport */ TrackingSPAPage; });
__webpack_require__.d(__webpack_exports__, "Debugging", function() { return /* reexport */ Debugging; });

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
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/VariableSelect/VariableSelect.vue?vue&type=template&id=9ddb6408

var VariableSelectvue_type_template_id_9ddb6408_hoisted_1 = {
  class: "tagManagerManageSelect tagManagerVariableSelect"
};
var VariableSelectvue_type_template_id_9ddb6408_hoisted_2 = {
  class: "tableActionBar"
};

var VariableSelectvue_type_template_id_9ddb6408_hoisted_3 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, null, -1);

var VariableSelectvue_type_template_id_9ddb6408_hoisted_4 = {
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

function VariableSelectvue_type_template_id_9ddb6408_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_ActivityIndicator = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ActivityIndicator");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VariableSelectvue_type_template_id_9ddb6408_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ActivityIndicator, {
    loading: _ctx.isLoading
  }, null, 8, ["loading"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableSelectvue_type_template_id_9ddb6408_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    class: "createNewVariable",
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.createVariable();
    })
  }, [VariableSelectvue_type_template_id_9ddb6408_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewVariable')), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isLoading]])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", VariableSelectvue_type_template_id_9ddb6408_hoisted_4, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", _hoisted_5, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CustomVariables')), 1)]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.containerVariables, function (variable, index) {
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
  }, [_hoisted_16, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewVariable', _ctx.translate('TagManager_Variable'))), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isLoading]])])]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/VariableSelect/VariableSelect.vue?vue&type=template&id=9ddb6408

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
      type: String,
      required: true
    },
    idContainerVersion: Number
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



VariableSelectvue_type_script_lang_ts.render = VariableSelectvue_type_template_id_9ddb6408_render

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
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/VariableSelectType/VariableSelectType.vue?vue&type=template&id=27e9e79b

var VariableSelectTypevue_type_template_id_27e9e79b_hoisted_1 = {
  class: "tagManagerManageSelect tagManagerVariableSelectType"
};

var VariableSelectTypevue_type_template_id_27e9e79b_hoisted_2 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, null, -1);

function VariableSelectTypevue_type_template_id_27e9e79b_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VariableSelectTypevue_type_template_id_27e9e79b_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
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
  }, [VariableSelectTypevue_type_template_id_27e9e79b_hoisted_2, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewVariable')), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isLoading]])]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/VariableSelectType/VariableSelectType.vue?vue&type=template&id=27e9e79b

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



VariableSelectTypevue_type_script_lang_ts.render = VariableSelectTypevue_type_template_id_27e9e79b_render

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
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Variable/VariableEdit.vue?vue&type=template&id=d670a1fc
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var VariableEditvue_type_template_id_d670a1fc_hoisted_1 = {
  class: "editVariable tagManagerManageEdit",
  ref: "root"
};
var VariableEditvue_type_template_id_d670a1fc_hoisted_2 = {
  class: "loadingPiwik"
};

var VariableEditvue_type_template_id_d670a1fc_hoisted_3 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);

var VariableEditvue_type_template_id_d670a1fc_hoisted_4 = {
  class: "loadingPiwik"
};

var VariableEditvue_type_template_id_d670a1fc_hoisted_5 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);

var VariableEditvue_type_template_id_d670a1fc_hoisted_6 = {
  key: 0,
  class: "form-group row"
};
var VariableEditvue_type_template_id_d670a1fc_hoisted_7 = {
  class: "col s12"
};
var VariableEditvue_type_template_id_d670a1fc_hoisted_8 = {
  key: 1
};
var VariableEditvue_type_template_id_d670a1fc_hoisted_9 = {
  class: "form-group row"
};
var VariableEditvue_type_template_id_d670a1fc_hoisted_10 = {
  class: "col s12"
};
var VariableEditvue_type_template_id_d670a1fc_hoisted_11 = {
  class: "innerFormField"
};
var VariableEditvue_type_template_id_d670a1fc_hoisted_12 = {
  class: "form-group row"
};
var VariableEditvue_type_template_id_d670a1fc_hoisted_13 = {
  class: "col s12 m12"
};
var VariableEditvue_type_template_id_d670a1fc_hoisted_14 = {
  for: "lookup_table"
};
var VariableEditvue_type_template_id_d670a1fc_hoisted_15 = {
  class: "innerFormField comparisonField"
};
var VariableEditvue_type_template_id_d670a1fc_hoisted_16 = {
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
function VariableEditvue_type_template_id_d670a1fc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _this = this;

  var _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");

  var _component_GroupedSettings = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("GroupedSettings");

  var _component_SaveButton = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("SaveButton");

  var _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VariableEditvue_type_template_id_d670a1fc_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: "Tag Manager",
    "content-title": _ctx.editTitle
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      var _ctx$variable$typeMet, _ctx$variable$typeMet2, _ctx$variable$typeMet3, _ctx$variable$typeMet4, _ctx$variable$typeMet5, _ctx$variable$typeMet6;

      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", VariableEditvue_type_template_id_d670a1fc_hoisted_2, [VariableEditvue_type_template_id_d670a1fc_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_LoadingData')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isLoading]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", VariableEditvue_type_template_id_d670a1fc_hoisted_4, [VariableEditvue_type_template_id_d670a1fc_hoisted_5, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_UpdatingData')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isUpdating]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("form", {
        onSubmit: _cache[8] || (_cache[8] = function ($event) {
          return _ctx.edit ? _ctx.updateVariable() : _ctx.createVariable();
        })
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
        class: "alert alert-warning"
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_UseCustomTemplateCapabilityRequired', _ctx.translate('TagManager_CapabilityUseCustomTemplates'))), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isVariableDisabled]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "text",
        name: "type",
        "model-value": (_ctx$variable$typeMet = _ctx.variable.typeMetadata) === null || _ctx$variable$typeMet === void 0 ? void 0 : _ctx$variable$typeMet.name,
        disabled: true,
        "inline-help": _ctx.typeInlineHelp,
        title: _ctx.translate('TagManager_Type')
      }, null, 8, ["model-value", "inline-help", "title"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "text",
        name: "name",
        "model-value": _ctx.variable.name,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
          _ctx.variable.name = $event;

          _ctx.setValueHasChanged();
        }),
        maxlength: 50,
        title: _ctx.translate('General_Name'),
        "inline-help": _ctx.translate('TagManager_VariableNameHelp')
      }, null, 8, ["model-value", "title", "inline-help"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "textarea",
        name: "description",
        "model-value": _ctx.variable.description,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
          _ctx.variable.description = $event;

          _ctx.setValueHasChanged();
        }),
        maxlength: 1000,
        title: _ctx.translate('General_Description'),
        "inline-help": _ctx.translate('TagManager_VariableDescriptionHelp')
      }, null, 8, ["model-value", "title", "inline-help"])]), (_ctx$variable$typeMet2 = _ctx.variable.typeMetadata) !== null && _ctx$variable$typeMet2 !== void 0 && (_ctx$variable$typeMet3 = _ctx$variable$typeMet2.parameters) !== null && _ctx$variable$typeMet3 !== void 0 && _ctx$variable$typeMet3.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VariableEditvue_type_template_id_d670a1fc_hoisted_6, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableEditvue_type_template_id_d670a1fc_hoisted_7, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ConfigureThisVariable')), 1)])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.variable ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VariableEditvue_type_template_id_d670a1fc_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_GroupedSettings, {
        settings: ((_ctx$variable$typeMet4 = _ctx.variable.typeMetadata) === null || _ctx$variable$typeMet4 === void 0 ? void 0 : _ctx$variable$typeMet4.parameters) || [],
        "all-setting-values": _ctx.parameterValues,
        onChange: _cache[2] || (_cache[2] = function ($event) {
          return _ctx.parameterValues[$event.name] = $event.value;
        })
      }, null, 8, ["settings", "all-setting-values"])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableEditvue_type_template_id_d670a1fc_hoisted_9, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableEditvue_type_template_id_d670a1fc_hoisted_10, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "showAdvancedSettings",
        onClick: _cache[3] || (_cache[3] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function ($event) {
          return _ctx.showAdvanced = true;
        }, ["prevent"]))
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ShowAdvancedSettings')), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.showAdvanced]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "hideAdvancedSettings",
        onClick: _cache[4] || (_cache[4] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function ($event) {
          return _ctx.showAdvanced = false;
        }, ["prevent"]))
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_HideAdvancedSettings')), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.showAdvanced]])])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], (_ctx$variable$typeMet5 = _ctx.variable.typeMetadata) === null || _ctx$variable$typeMet5 === void 0 ? void 0 : _ctx$variable$typeMet5.hasAdvancedSettings]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableEditvue_type_template_id_d670a1fc_hoisted_11, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "text",
        name: "default_value",
        "model-value": _ctx.variable.default_value,
        "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
          _ctx.variable.default_value = $event;

          _ctx.setValueHasChanged();
        }),
        title: _ctx.translate('TagManager_DefaultValue'),
        "inline-help": _ctx.translate('TagManager_DefaultValueHelp')
      }, null, 8, ["model-value", "title", "inline-help"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableEditvue_type_template_id_d670a1fc_hoisted_12, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableEditvue_type_template_id_d670a1fc_hoisted_13, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", VariableEditvue_type_template_id_d670a1fc_hoisted_14, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_LookupTableTitle')), 1), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.variable.lookup_table, function (lookup, index) {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
          key: index,
          class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])("lookupTable lookupTable".concat(index, " multiple valign-wrapper"))
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableEditvue_type_template_id_d670a1fc_hoisted_15, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
          uicontrol: "select",
          name: "lookup_table_comparison",
          "model-value": lookup.comparison,
          "onUpdate:modelValue": function onUpdateModelValue($event) {
            lookup.comparison = $event;

            _ctx.setValueHasChanged();
          },
          "full-width": true,
          options: _ctx.availableLookUpComparisons
        }, null, 8, ["model-value", "onUpdate:modelValue", "options"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableEditvue_type_template_id_d670a1fc_hoisted_16, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
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
      }), 128))])])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.showAdvanced && ((_ctx$variable$typeMet6 = _ctx.variable.typeMetadata) === null || _ctx$variable$typeMet6 === void 0 ? void 0 : _ctx$variable$typeMet6.hasAdvancedSettings)]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
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
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/VariableEdit.vue?vue&type=template&id=d670a1fc

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
    value: function findVariable(idContainer, idContainerVersion, idVariable, ignoreCache) {
      var _this2 = this;

      // before going through an API request we first try to find it in loaded variables
      var found = this.variables.value.find(function (v) {
        return v.idvariable === idVariable;
      });

      if (found && !ignoreCache) {
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
        description: variable.description,
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

    AvailableComparisons_store_defineProperty(this, "initializePromise", null);
  }

  AvailableComparisons_store_createClass(AvailableComparisonsStore, [{
    key: "init",
    value: function init() {
      if (!this.initializePromise) {
        this.initializePromise = this.fetchAvailableComparisons();
      }

      return this.initializePromise;
    }
  }, {
    key: "fetchAvailableComparisons",
    value: function fetchAvailableComparisons() {
      var _this2 = this;

      this.privateState.isLoading = true;
      return external_CoreHome_["AjaxHelper"].fetch({
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

/* harmony default export */ var AvailableComparisons_store = (new AvailableComparisons_store_AvailableComparisonsStore());
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
    AvailableComparisons_store.init(); // needed for suggestNameForType() to make sure it is aware of all names

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
          Variables_store.findVariable(_this.idContainer, _this.idContainerVersion, _this.idVariable, _this.isEmbedded).then(function (variable) {
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
        description: '',
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



VariableEditvue_type_script_lang_ts.render = VariableEditvue_type_template_id_d670a1fc_render

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
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Variable/VariableList.vue?vue&type=template&id=5a7548f9

var VariableListvue_type_template_id_5a7548f9_hoisted_1 = {
  class: "tagManagerManageList tagManagerVariableList"
};
var VariableListvue_type_template_id_5a7548f9_hoisted_2 = ["title"];
var VariableListvue_type_template_id_5a7548f9_hoisted_3 = ["title"];
var VariableListvue_type_template_id_5a7548f9_hoisted_4 = ["title"];
var VariableListvue_type_template_id_5a7548f9_hoisted_5 = ["title"];
var VariableListvue_type_template_id_5a7548f9_hoisted_6 = ["title"];
var VariableListvue_type_template_id_5a7548f9_hoisted_7 = ["title"];
var VariableListvue_type_template_id_5a7548f9_hoisted_8 = {
  colspan: "7"
};
var VariableListvue_type_template_id_5a7548f9_hoisted_9 = {
  class: "loadingPiwik"
};

var VariableListvue_type_template_id_5a7548f9_hoisted_10 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);

var VariableListvue_type_template_id_5a7548f9_hoisted_11 = {
  colspan: "7"
};
var VariableListvue_type_template_id_5a7548f9_hoisted_12 = ["id"];
var VariableListvue_type_template_id_5a7548f9_hoisted_13 = {
  class: "name"
};
var VariableListvue_type_template_id_5a7548f9_hoisted_14 = ["title"];
var VariableListvue_type_template_id_5a7548f9_hoisted_15 = ["title"];
var VariableListvue_type_template_id_5a7548f9_hoisted_16 = {
  class: "lookupTable"
};
var VariableListvue_type_template_id_5a7548f9_hoisted_17 = {
  class: "icon-ok"
};
var VariableListvue_type_template_id_5a7548f9_hoisted_18 = ["title"];
var VariableListvue_type_template_id_5a7548f9_hoisted_19 = {
  class: "action"
};
var VariableListvue_type_template_id_5a7548f9_hoisted_20 = ["onClick", "title"];
var VariableListvue_type_template_id_5a7548f9_hoisted_21 = ["onClick", "title"];
var VariableListvue_type_template_id_5a7548f9_hoisted_22 = {
  class: "tableActionBar"
};

var VariableListvue_type_template_id_5a7548f9_hoisted_23 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, null, -1);

var VariableListvue_type_template_id_5a7548f9_hoisted_24 = ["title"];

var VariableListvue_type_template_id_5a7548f9_hoisted_25 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-help preconfiguredVariablesHelp"
}, null, -1);

var VariableListvue_type_template_id_5a7548f9_hoisted_26 = {
  class: "collection-header"
};
var VariableListvue_type_template_id_5a7548f9_hoisted_27 = {
  class: "title"
};
var _hoisted_28 = ["textContent"];
var _hoisted_29 = {
  class: "secondary-content"
};
var _hoisted_30 = ["title"];
var _hoisted_31 = {
  class: "ui-confirm",
  id: "confirmDeleteVariable",
  ref: "confirmDeleteVariable"
};
var _hoisted_32 = ["value"];
var _hoisted_33 = ["value"];
var _hoisted_34 = {
  class: "ui-confirm",
  id: "confirmDeleteVariableNotPossible",
  ref: "confirmDeleteVariableNotPossible"
};
var _hoisted_35 = {
  class: "collection"
};
var _hoisted_36 = ["value"];
function VariableListvue_type_template_id_5a7548f9_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");

  var _directive_content_table = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("content-table");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VariableListvue_type_template_id_5a7548f9_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: "Tag Manager",
    class: "tagManagerCustomVariablesList",
    "content-title": _ctx.translate('TagManager_ManageX', _ctx.translate('TagManager_Variables')),
    "help-text": _ctx.variablesHelpText
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_VariableUsageBenefits')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("table", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
        class: "name",
        title: _ctx.nameTranslatedText
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Name')), 9, VariableListvue_type_template_id_5a7548f9_hoisted_2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
        class: "description",
        title: _ctx.descriptionTranslatedText
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Description')), 9, VariableListvue_type_template_id_5a7548f9_hoisted_3), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
        class: "type",
        title: _ctx.typeTranslatedText
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Type')), 9, VariableListvue_type_template_id_5a7548f9_hoisted_4), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
        class: "lookupTable",
        title: _ctx.lookupTableTranslatedText
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_LookupTable')), 9, VariableListvue_type_template_id_5a7548f9_hoisted_5), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
        class: "lastUpdated",
        title: _ctx.lastUpdatedTranslatedText
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_LastUpdated')), 9, VariableListvue_type_template_id_5a7548f9_hoisted_6), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
        class: "action",
        title: _ctx.actionTranslatedText
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Actions')), 9, VariableListvue_type_template_id_5a7548f9_hoisted_7), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VariableListvue_type_template_id_5a7548f9_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", VariableListvue_type_template_id_5a7548f9_hoisted_9, [VariableListvue_type_template_id_5a7548f9_hoisted_10, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_LoadingData')), 1)])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isLoading || _ctx.isUpdating]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VariableListvue_type_template_id_5a7548f9_hoisted_11, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_NoVariablesFound')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "createContainerVariableNow",
        onClick: _cache[0] || (_cache[0] = function ($event) {
          return _ctx.createVariable();
        })
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewVariableNow')), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isLoading && !_ctx.variables.length]]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.sortedVariables, function (variable) {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
          id: "variable".concat(variable.idvariable),
          class: "variables",
          key: variable.idvariable
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VariableListvue_type_template_id_5a7548f9_hoisted_13, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variable.name), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
          class: "description",
          title: variable.description
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.truncateText(variable.description, 30)), 9, VariableListvue_type_template_id_5a7548f9_hoisted_14), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
          class: "type",
          title: variable.typeMetadata.description
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variable.typeMetadata.name), 9, VariableListvue_type_template_id_5a7548f9_hoisted_15), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VariableListvue_type_template_id_5a7548f9_hoisted_16, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", VariableListvue_type_template_id_5a7548f9_hoisted_17, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], variable.lookup_table.length]])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
          class: "lastUpdated",
          title: _ctx.translate('TagManager_CreatedOnX', variable.created_date_pretty)
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variable.updated_date_pretty), 1)], 8, VariableListvue_type_template_id_5a7548f9_hoisted_18), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VariableListvue_type_template_id_5a7548f9_hoisted_19, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
          class: "table-action icon-edit",
          onClick: function onClick($event) {
            return _ctx.editVariable(variable.idvariable, variable.type);
          },
          title: _ctx.translate('TagManager_EditVariable')
        }, null, 8, VariableListvue_type_template_id_5a7548f9_hoisted_20), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
          class: "table-action icon-delete",
          onClick: function onClick($event) {
            return _ctx.deleteVariable(variable);
          },
          title: _ctx.translate('TagManager_DeleteX', _ctx.translate('TagManager_Variable'))
        }, null, 8, VariableListvue_type_template_id_5a7548f9_hoisted_21)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])], 8, VariableListvue_type_template_id_5a7548f9_hoisted_12);
      }), 128))])], 512), [[_directive_content_table]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableListvue_type_template_id_5a7548f9_hoisted_22, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "createNewVariable",
        value: "",
        onClick: _cache[1] || (_cache[1] = function ($event) {
          return _ctx.createVariable();
        })
      }, [VariableListvue_type_template_id_5a7548f9_hoisted_23, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewVariable')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])];
    }),
    _: 1
  }, 8, ["content-title", "help-text"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", {
    title: _ctx.translate('TagManager_PreConfiguredInfoTitle')
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_PreconfiguredVariables')) + " ", 1), VariableListvue_type_template_id_5a7548f9_hoisted_25], 8, VariableListvue_type_template_id_5a7548f9_hoisted_24), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.containerVariables, function (variableCategory, index) {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("ul", {
      class: "collection with-header",
      key: index
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", VariableListvue_type_template_id_5a7548f9_hoisted_26, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variableCategory.name), 1)]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(variableCategory.types, function (variableTemplate) {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
        class: "collection-item",
        key: variableTemplate.id
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", VariableListvue_type_template_id_5a7548f9_hoisted_27, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variableTemplate.name) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
        class: "variableId",
        textContent: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])("{{".concat(variableTemplate.id, "}}"))
      }, null, 8, _hoisted_28)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_29, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("i", {
        class: "icon-help",
        title: variableTemplate.description
      }, null, 8, _hoisted_30)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !!variableTemplate.description]])], 512)), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], variableTemplate.is_pre_configured]]);
    }), 128))]);
  }), 128))]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_31, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_DeleteVariableConfirm')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "yes",
    type: "button",
    value: _ctx.translate('General_Yes')
  }, null, 8, _hoisted_32), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "no",
    type: "button",
    value: _ctx.translate('General_No')
  }, null, 8, _hoisted_33)], 512), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_34, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_VariableCannotBeDeleted')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_VariableBeingUsedBy')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", _hoisted_35, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.variableReferences, function (reference) {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
      class: "collection-item",
      key: "".concat(reference.referenceType, ".").concat(reference.referenceId)
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(reference.referenceTypeName) + ": " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(reference.referenceName), 1);
  }), 128))]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_VariableBeingUsedNeedsRemove')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "no",
    type: "button",
    value: _ctx.translate('General_Cancel')
  }, null, 8, _hoisted_36)], 512)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/VariableList.vue?vue&type=template&id=5a7548f9

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Variable/VariableList.vue?vue&type=script&lang=ts
function VariableListvue_type_script_lang_ts_toConsumableArray(arr) { return VariableListvue_type_script_lang_ts_arrayWithoutHoles(arr) || VariableListvue_type_script_lang_ts_iterableToArray(arr) || VariableListvue_type_script_lang_ts_unsupportedIterableToArray(arr) || VariableListvue_type_script_lang_ts_nonIterableSpread(); }

function VariableListvue_type_script_lang_ts_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function VariableListvue_type_script_lang_ts_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return VariableListvue_type_script_lang_ts_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return VariableListvue_type_script_lang_ts_arrayLikeToArray(o, minLen); }

function VariableListvue_type_script_lang_ts_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function VariableListvue_type_script_lang_ts_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return VariableListvue_type_script_lang_ts_arrayLikeToArray(arr); }

function VariableListvue_type_script_lang_ts_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var VariableListvue_type_script_lang_ts_window = window,
    VariableListvue_type_script_lang_ts_tagManagerHelper = VariableListvue_type_script_lang_ts_window.tagManagerHelper;
/* harmony default export */ var VariableListvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idContainer: {
      type: String,
      required: true
    },
    idContainerVersion: {
      type: Number,
      required: true
    },
    variablesHelpText: String
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
    },
    truncateText: function truncateText(text, length) {
      return VariableListvue_type_script_lang_ts_tagManagerHelper.truncateText(text, length);
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
    },
    nameTranslatedText: function nameTranslatedText() {
      return this.translate('TagManager_VariablesNameDescription');
    },
    descriptionTranslatedText: function descriptionTranslatedText() {
      return this.translate('TagManager_VariablesDescriptionDescription');
    },
    typeTranslatedText: function typeTranslatedText() {
      return this.translate('TagManager_VariablesTypeDescription');
    },
    lookupTableTranslatedText: function lookupTableTranslatedText() {
      return this.translate('TagManager_VariablesLookupTableDescription');
    },
    lastUpdatedTranslatedText: function lastUpdatedTranslatedText() {
      return this.translate('TagManager_VariablesLastUpdatedDescription');
    },
    actionTranslatedText: function actionTranslatedText() {
      return this.translate('TagManager_VariablesActionDescription');
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/VariableList.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/VariableList.vue



VariableListvue_type_script_lang_ts.render = VariableListvue_type_template_id_5a7548f9_render

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
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Variable/VariableManage.vue?vue&type=template&id=f95f6f7c

var VariableManagevue_type_template_id_f95f6f7c_hoisted_1 = {
  class: "manageVariable"
};
var VariableManagevue_type_template_id_f95f6f7c_hoisted_2 = {
  key: 0
};
var VariableManagevue_type_template_id_f95f6f7c_hoisted_3 = {
  key: 1
};
function VariableManagevue_type_template_id_f95f6f7c_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_VariableList = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("VariableList");

  var _component_VariableEdit = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("VariableEdit");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VariableManagevue_type_template_id_f95f6f7c_hoisted_1, [!_ctx.editMode ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VariableManagevue_type_template_id_f95f6f7c_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_VariableList, {
    "id-container-version": _ctx.idContainerVersion,
    "id-container": _ctx.idContainer,
    "variables-help-text": _ctx.variablesHelpText
  }, null, 8, ["id-container-version", "id-container", "variables-help-text"])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.editMode ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VariableManagevue_type_template_id_f95f6f7c_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_VariableEdit, {
    "id-container-version": _ctx.idContainerVersion,
    "id-container": _ctx.idContainer,
    "id-variable": _ctx.idVariable
  }, null, 8, ["id-container-version", "id-container", "id-variable"])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/VariableManage.vue?vue&type=template&id=f95f6f7c

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Variable/VariableManage.vue?vue&type=script&lang=ts




/* harmony default export */ var VariableManagevue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idContainerVersion: Number,
    idContainer: String,
    variablesHelpText: String
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



VariableManagevue_type_script_lang_ts.render = VariableManagevue_type_template_id_f95f6f7c_render

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
    },
    variablesHelpText: {
      angularJsBind: '@'
    }
  },
  directiveName: 'piwikVariableManage'
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Trigger/Triggers.store.ts
function Triggers_store_slicedToArray(arr, i) { return Triggers_store_arrayWithHoles(arr) || Triggers_store_iterableToArrayLimit(arr, i) || Triggers_store_unsupportedIterableToArray(arr, i) || Triggers_store_nonIterableRest(); }

function Triggers_store_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Triggers_store_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Triggers_store_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Triggers_store_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Triggers_store_typeof = function _typeof(obj) { return typeof obj; }; } else { Triggers_store_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Triggers_store_typeof(obj); }

function Triggers_store_toConsumableArray(arr) { return Triggers_store_arrayWithoutHoles(arr) || Triggers_store_iterableToArray(arr) || Triggers_store_unsupportedIterableToArray(arr) || Triggers_store_nonIterableSpread(); }

function Triggers_store_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Triggers_store_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Triggers_store_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Triggers_store_arrayLikeToArray(o, minLen); }

function Triggers_store_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function Triggers_store_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return Triggers_store_arrayLikeToArray(arr); }

function Triggers_store_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Triggers_store_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Triggers_store_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Triggers_store_createClass(Constructor, protoProps, staticProps) { if (protoProps) Triggers_store_defineProperties(Constructor.prototype, protoProps); if (staticProps) Triggers_store_defineProperties(Constructor, staticProps); return Constructor; }

function Triggers_store_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */



var Triggers_store_TriggersStore = /*#__PURE__*/function () {
  function TriggersStore() {
    var _this = this;

    Triggers_store_classCallCheck(this, TriggersStore);

    Triggers_store_defineProperty(this, "privateState", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      triggers: [],
      isLoadingTriggers: false,
      isLoadingSingle: false,
      isUpdating: false
    }));

    Triggers_store_defineProperty(this, "state", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(_this.privateState);
    }));

    Triggers_store_defineProperty(this, "isUpdating", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return _this.state.value.isUpdating;
    }));

    Triggers_store_defineProperty(this, "isLoading", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      var state = _this.state.value;
      return state.isLoadingTriggers || state.isLoadingSingle;
    }));

    Triggers_store_defineProperty(this, "triggers", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return _this.state.value.triggers;
    }));

    Triggers_store_defineProperty(this, "fetchPromise", null);

    Triggers_store_defineProperty(this, "availableTriggersPromises", {});
  }

  Triggers_store_createClass(TriggersStore, [{
    key: "fetchTriggers",
    value: function fetchTriggers(idContainer, idContainerVersion) {
      var _this2 = this;

      this.privateState.triggers = [];
      this.privateState.isLoadingTriggers = true;

      if (!this.fetchPromise) {
        this.fetchPromise = external_CoreHome_["AjaxHelper"].fetch({
          method: 'TagManager.getContainerTriggers',
          idContainer: idContainer,
          idContainerVersion: idContainerVersion,
          filter_limit: '-1'
        });
      }

      return Promise.resolve(this.fetchPromise).then(function (triggers) {
        _this2.privateState.triggers = triggers;
        return _this2.triggers.value;
      }).finally(function () {
        _this2.privateState.isLoadingTriggers = false;
      });
    }
  }, {
    key: "fetchTriggersIfNotLoaded",
    value: function fetchTriggersIfNotLoaded(idContainer, idContainerVersion) {
      if (!this.fetchPromise) {
        // needed for suggestNameForType() to make sure it is aware of all names
        this.fetchTriggers(idContainer, idContainerVersion);
      }
    }
  }, {
    key: "fetchAvailableTriggers",
    value: function fetchAvailableTriggers(idContext) {
      if (!this.availableTriggersPromises[idContext]) {
        this.availableTriggersPromises[idContext] = external_CoreHome_["AjaxHelper"].fetch({
          method: 'TagManager.getAvailableTriggerTypesInContext',
          idContext: idContext,
          filter_limit: '-1'
        });
      }

      return Promise.resolve(this.availableTriggersPromises[idContext]);
    }
  }, {
    key: "findTrigger",
    value: function findTrigger(idContainer, idContainerVersion, idTrigger) {
      var _this3 = this;

      // before going through an API request we first try to find it in loaded variables
      var found = this.triggers.value.find(function (v) {
        return v.idtrigger === idTrigger;
      });

      if (found) {
        return Promise.resolve(found);
      } // otherwise we fetch it via API


      this.privateState.isLoadingSingle = true;
      return external_CoreHome_["AjaxHelper"].fetch({
        idTrigger: idTrigger,
        idContainer: idContainer,
        idContainerVersion: idContainerVersion,
        method: 'TagManager.getContainerTrigger',
        filter_limit: '-1'
      }).then(function (record) {
        _this3.privateState.triggers = [].concat(Triggers_store_toConsumableArray(_this3.privateState.triggers), [record]);
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(record);
      }).finally(function () {
        _this3.privateState.isLoadingSingle = false;
      });
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

        var isFree = !_this4.triggers.value.some(function (v) {
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

        if (Triggers_store_typeof(_ret) === "object") return _ret.v;
      }

      return undefined;
    }
  }, {
    key: "createOrUpdateTrigger",
    value: function createOrUpdateTrigger(trigger, method, idContainer, idContainerVersion, parameterValues) {
      var _this5 = this;

      var mappedEntries = Object.entries(parameterValues).map(function (_ref) {
        var _ref2 = Triggers_store_slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        var newValue = value;

        if (typeof value === 'boolean') {
          newValue = (+value).toString();
        }

        return [key, newValue];
      });
      var parameters = Object.fromEntries(mappedEntries);
      var conditions = trigger.conditions.filter(function (c) {
        return c && c.actual && c.comparison && c.expected;
      });
      this.privateState.isUpdating = true;
      return external_CoreHome_["AjaxHelper"].post({
        idTrigger: trigger.idtrigger,
        method: method,
        idContainer: idContainer,
        idContainerVersion: idContainerVersion,
        type: trigger.type,
        name: trigger.name,
        description: trigger.description
      }, {
        parameters: parameters,
        conditions: conditions
      }, {
        withTokenInUrl: true
      }).finally(function () {
        _this5.privateState.isUpdating = false;
      });
    }
  }, {
    key: "reload",
    value: function reload(idContainer, idContainerVersion) {
      this.privateState.triggers = [];
      this.fetchPromise = null;
      this.availableTriggersPromises = {};
      return this.fetchTriggers(idContainer, idContainerVersion);
    }
  }, {
    key: "deleteTrigger",
    value: function deleteTrigger(idContainer, idContainerVersion, idTrigger) {
      var _this6 = this;

      this.privateState.isUpdating = true;
      this.privateState.triggers = [];
      return external_CoreHome_["AjaxHelper"].fetch({
        idTrigger: idTrigger,
        idContainerVersion: idContainerVersion,
        idContainer: idContainer,
        method: 'TagManager.deleteContainerTrigger'
      }, {
        withTokenInUrl: true
      }).finally(function () {
        _this6.privateState.isUpdating = false;
      });
    }
  }]);

  return TriggersStore;
}();

/* harmony default export */ var Triggers_store = (new Triggers_store_TriggersStore());
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Trigger/Triggers.store.adapter.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

window.angular.module('piwikApp').factory('tagManagerTriggerModel', function () {
  return Triggers_store;
});
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Trigger/TriggerEdit.vue?vue&type=template&id=68a714f6
function TriggerEditvue_type_template_id_68a714f6_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var TriggerEditvue_type_template_id_68a714f6_hoisted_1 = {
  class: "editTrigger tagManagerManageEdit",
  ref: "root"
};
var TriggerEditvue_type_template_id_68a714f6_hoisted_2 = {
  class: "loadingPiwik"
};

var TriggerEditvue_type_template_id_68a714f6_hoisted_3 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);

var TriggerEditvue_type_template_id_68a714f6_hoisted_4 = {
  class: "loadingPiwik"
};

var TriggerEditvue_type_template_id_68a714f6_hoisted_5 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);

var TriggerEditvue_type_template_id_68a714f6_hoisted_6 = {
  class: "form-group row"
};
var TriggerEditvue_type_template_id_68a714f6_hoisted_7 = {
  class: "col s12"
};
var TriggerEditvue_type_template_id_68a714f6_hoisted_8 = {
  key: 0
};
var TriggerEditvue_type_template_id_68a714f6_hoisted_9 = {
  class: "form-group row"
};
var TriggerEditvue_type_template_id_68a714f6_hoisted_10 = {
  class: "col s12"
};
var TriggerEditvue_type_template_id_68a714f6_hoisted_11 = {
  class: "form-group row multiple"
};
var TriggerEditvue_type_template_id_68a714f6_hoisted_12 = {
  class: "col s12 m12"
};
var TriggerEditvue_type_template_id_68a714f6_hoisted_13 = {
  class: "innerFormField"
};
var TriggerEditvue_type_template_id_68a714f6_hoisted_14 = {
  class: "innerFormField comparisonField"
};
var TriggerEditvue_type_template_id_68a714f6_hoisted_15 = {
  class: "innerFormField"
};
var TriggerEditvue_type_template_id_68a714f6_hoisted_16 = ["onClick", "title"];
var TriggerEditvue_type_template_id_68a714f6_hoisted_17 = {
  class: "triggerConditionNode"
};
var TriggerEditvue_type_template_id_68a714f6_hoisted_18 = {
  class: "entityCancel"
};
var TriggerEditvue_type_template_id_68a714f6_hoisted_19 = {
  id: "confirmSelectTriggerType"
};
var TriggerEditvue_type_template_id_68a714f6_hoisted_20 = {
  class: "collection-header"
};
var TriggerEditvue_type_template_id_68a714f6_hoisted_21 = ["onClick", "title"];
var TriggerEditvue_type_template_id_68a714f6_hoisted_22 = ["src"];
var TriggerEditvue_type_template_id_68a714f6_hoisted_23 = {
  class: "title"
};
var TriggerEditvue_type_template_id_68a714f6_hoisted_24 = {
  class: "secondary-content"
};
var TriggerEditvue_type_template_id_68a714f6_hoisted_25 = ["title"];
var TriggerEditvue_type_template_id_68a714f6_hoisted_26 = {
  class: "entityCancel"
};
function TriggerEditvue_type_template_id_68a714f6_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");

  var _component_GroupedSettings = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("GroupedSettings");

  var _component_SaveButton = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("SaveButton");

  var _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", TriggerEditvue_type_template_id_68a714f6_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: "Tag Manager",
    "content-title": _ctx.editTitle
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      var _ctx$trigger$typeMeta, _ctx$trigger$typeMeta2, _ctx$trigger$typeMeta3, _ctx$trigger$typeMeta4, _ctx$trigger$typeMeta5, _ctx$trigger$typeMeta6, _ctx$trigger$typeMeta7, _ctx$trigger$typeMeta8;

      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", TriggerEditvue_type_template_id_68a714f6_hoisted_2, [TriggerEditvue_type_template_id_68a714f6_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_LoadingData')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isLoading]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", TriggerEditvue_type_template_id_68a714f6_hoisted_4, [TriggerEditvue_type_template_id_68a714f6_hoisted_5, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_UpdatingData')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isUpdating]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("form", {
        onSubmit: _cache[5] || (_cache[5] = function ($event) {
          return _ctx.edit ? _ctx.updateTrigger() : _ctx.createTrigger();
        })
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
        class: "alert alert-warning"
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_UseCustomTemplateCapabilityRequired', _ctx.translate('TagManager_CapabilityUseCustomTemplates'))), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isTriggerDisabled]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "text",
        name: "type",
        "model-value": (_ctx$trigger$typeMeta = _ctx.trigger.typeMetadata) === null || _ctx$trigger$typeMeta === void 0 ? void 0 : _ctx$trigger$typeMeta.name,
        disabled: true,
        "inline-help": "".concat((_ctx$trigger$typeMeta2 = _ctx.trigger.typeMetadata) === null || _ctx$trigger$typeMeta2 === void 0 ? void 0 : _ctx$trigger$typeMeta2.description, " ").concat((_ctx$trigger$typeMeta3 = _ctx.trigger.typeMetadata) === null || _ctx$trigger$typeMeta3 === void 0 ? void 0 : _ctx$trigger$typeMeta3.help),
        title: _ctx.translate('TagManager_Type')
      }, null, 8, ["model-value", "inline-help", "title"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "text",
        name: "name",
        "model-value": _ctx.trigger.name,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
          _ctx.trigger.name = $event;

          _ctx.setValueHasChanged();
        }),
        maxlength: 50,
        title: _ctx.translate('General_Name'),
        "inline-help": _ctx.translate('TagManager_TriggerNameHelp')
      }, null, 8, ["model-value", "title", "inline-help"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "textarea",
        name: "description",
        "model-value": _ctx.trigger.description,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
          _ctx.trigger.description = $event;

          _ctx.setValueHasChanged();
        }),
        maxlength: 1000,
        title: _ctx.translate('General_Description'),
        "inline-help": _ctx.translate('TagManager_TriggerDescriptionHelp')
      }, null, 8, ["model-value", "title", "inline-help"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_68a714f6_hoisted_6, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_68a714f6_hoisted_7, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ConfigureThisTrigger')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], (_ctx$trigger$typeMeta4 = _ctx.trigger.typeMetadata) === null || _ctx$trigger$typeMeta4 === void 0 ? void 0 : (_ctx$trigger$typeMeta5 = _ctx$trigger$typeMeta4.parameters) === null || _ctx$trigger$typeMeta5 === void 0 ? void 0 : _ctx$trigger$typeMeta5.length]]), _ctx.trigger ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", TriggerEditvue_type_template_id_68a714f6_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_GroupedSettings, {
        settings: ((_ctx$trigger$typeMeta6 = _ctx.trigger.typeMetadata) === null || _ctx$trigger$typeMeta6 === void 0 ? void 0 : _ctx$trigger$typeMeta6.parameters) || [],
        "all-setting-values": _ctx.parameterValues,
        onChange: _cache[2] || (_cache[2] = function ($event) {
          return _ctx.parameterValues[$event.name] = $event.value;
        })
      }, null, 8, ["settings", "all-setting-values"])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_68a714f6_hoisted_9, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_68a714f6_hoisted_10, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_OnlyTriggerWhen')) + " " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('Goals_Optional')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], (_ctx$trigger$typeMeta7 = _ctx.trigger.typeMetadata) === null || _ctx$trigger$typeMeta7 === void 0 ? void 0 : _ctx$trigger$typeMeta7.hasAdvancedSettings]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_68a714f6_hoisted_11, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_68a714f6_hoisted_12, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_TriggerConditionsHelp')), 1), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.trigger.conditions, function (condition, index) {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
          key: index,
          class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["condition multiple valign-wrapper", "condition".concat(index)])
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_68a714f6_hoisted_13, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
          uicontrol: "expandable-select",
          name: "condition_actual",
          "model-value": condition.actual,
          "onUpdate:modelValue": function onUpdateModelValue($event) {
            condition.actual = $event;

            _ctx.setValueHasChanged();
          },
          "full-width": true,
          options: _ctx.availableVariables,
          title: _ctx.variableIdToName[condition.actual] || condition.actual
        }, null, 8, ["model-value", "onUpdate:modelValue", "options", "title"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_68a714f6_hoisted_14, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
          uicontrol: "select",
          name: "condition_comparison",
          "model-value": condition.comparison,
          "onUpdate:modelValue": function onUpdateModelValue($event) {
            condition.comparison = $event;

            _ctx.setValueHasChanged();
          },
          "full-width": true,
          options: _ctx.availableComparisons
        }, null, 8, ["model-value", "onUpdate:modelValue", "options"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_68a714f6_hoisted_15, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
          uicontrol: "text",
          name: "condition_expected",
          "model-value": condition.expected,
          "onUpdate:modelValue": function onUpdateModelValue($event) {
            condition.expected = $event;

            _ctx.setValueHasChanged();

            _ctx.onConditionChange();
          },
          "full-width": true
        }, null, 8, ["model-value", "onUpdate:modelValue"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
          class: "icon-minus valign",
          onClick: function onClick($event) {
            return _ctx.removeConditionEntry(index);
          },
          title: _ctx.translate('General_Remove')
        }, null, 8, TriggerEditvue_type_template_id_68a714f6_hoisted_16), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !(index + 1 === _ctx.trigger.conditions.length)]])], 2);
      }), 128))]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", TriggerEditvue_type_template_id_68a714f6_hoisted_17, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_TriggerConditionNode')), 1)])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], (_ctx$trigger$typeMeta8 = _ctx.trigger.typeMetadata) === null || _ctx$trigger$typeMeta8 === void 0 ? void 0 : _ctx$trigger$typeMeta8.hasAdvancedSettings]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
        class: "alert alert-warning"
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_UseCustomTemplateCapabilityRequired', _ctx.translate('TagManager_CapabilityUseCustomTemplates'))), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isTriggerDisabled]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_SaveButton, {
        class: "createButton",
        onConfirm: _cache[3] || (_cache[3] = function ($event) {
          return _ctx.edit ? _ctx.updateTrigger() : _ctx.createTrigger();
        }),
        disabled: _ctx.isUpdating || !_ctx.isDirty,
        saving: _ctx.isUpdating,
        value: _ctx.saveButtonText
      }, null, 8, ["disabled", "saving", "value"]), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isTriggerDisabled]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_68a714f6_hoisted_18, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        onClick: _cache[4] || (_cache[4] = function ($event) {
          return _ctx.cancel();
        })
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Cancel')), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isEmbedded]])])], 544), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.chooseTriggerType && _ctx.editTitle]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_68a714f6_hoisted_19, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.availableTriggers, function (triggerCategory, index) {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("ul", {
          class: "collection with-header",
          key: index
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", TriggerEditvue_type_template_id_68a714f6_hoisted_20, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(triggerCategory.name), 1)]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(triggerCategory.types, function (triggerTemplate, index) {
          return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
            class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["collection-item avatar", TriggerEditvue_type_template_id_68a714f6_defineProperty({
              disabledTemplate: _ctx.isTriggerTemplateDisabled[triggerTemplate.id]
            }, "templateType".concat(triggerTemplate.id), true)]),
            onClick: function onClick($event) {
              return _ctx.createTriggerType(triggerTemplate);
            },
            key: index,
            title: !_ctx.isTriggerTemplateDisabled[triggerTemplate.id] ? '' : _ctx.collectionItemAvatarText
          }, [triggerTemplate.icon ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("img", {
            key: 0,
            alt: "",
            class: "circle",
            src: triggerTemplate.icon
          }, null, 8, TriggerEditvue_type_template_id_68a714f6_hoisted_22)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", TriggerEditvue_type_template_id_68a714f6_hoisted_23, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(triggerTemplate.name), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(triggerTemplate.description), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], triggerTemplate.description]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", TriggerEditvue_type_template_id_68a714f6_hoisted_24, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("i", {
            class: "icon-help",
            title: triggerTemplate.help
          }, null, 8, TriggerEditvue_type_template_id_68a714f6_hoisted_25)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !!triggerTemplate.help]])], 10, TriggerEditvue_type_template_id_68a714f6_hoisted_21);
        }), 128))]);
      }), 128)), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_68a714f6_hoisted_26, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        onClick: _cache[6] || (_cache[6] = function ($event) {
          return _ctx.cancel();
        })
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Cancel')), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isEmbedded]])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.chooseTriggerType]])];
    }),
    _: 1
  }, 8, ["content-title"])], 512);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Trigger/TriggerEdit.vue?vue&type=template&id=68a714f6

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Trigger/TriggerEdit.vue?vue&type=script&lang=ts





var TriggerEditvue_type_script_lang_ts_notificationId = 'tagvariablemanagement';
var TRIGGER_TYPE_TO_CONDITION_ACTUAL = {
  AllElementsClick: 'ClickId',
  AllLinksClick: 'ClickId',
  DownloadClick: 'ClickId',
  ElementVisibility: 'VisibleElementClasses',
  FormSubmit: 'FormId',
  JavaScriptError: 'ErrorMessage'
};
/* harmony default export */ var TriggerEditvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idTrigger: Number,
    idContainer: {
      type: String,
      required: true
    },
    idContainerVersion: {
      type: Number,
      required: true
    },
    newTriggerType: String,
    isEmbedded: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ContentBlock: external_CoreHome_["ContentBlock"],
    Field: external_CorePluginsAdmin_["Field"],
    GroupedSettings: external_CorePluginsAdmin_["GroupedSettings"],
    SaveButton: external_CorePluginsAdmin_["SaveButton"]
  },
  data: function data() {
    return {
      isDirty: false,
      chooseTriggerType: false,
      availableTriggers: [],
      availableVariables: [],
      variableIdToName: {},
      editTitle: '',
      trigger: {},
      parameterValues: {},
      isUpdatingTrigger: false
    };
  },
  emits: ['changeTrigger'],
  created: function created() {
    var _this = this;

    AvailableComparisons_store.init();
    external_CoreHome_["AjaxHelper"].fetch({
      method: 'TagManager.getAvailableContainerVariables',
      filter_limit: '-1',
      idContainer: this.idContainer,
      idContainerVersion: this.idContainerVersion
    }).then(function (categories) {
      categories.forEach(function (category) {
        category.types.forEach(function (v) {
          _this.variableIdToName[v.id] = v.name;

          _this.availableVariables.push({
            key: v.id,
            value: v.name,
            group: category.name,
            tooltip: v.description
          });
        });
      });
    }); // needed for suggestNameForType() to make sure it is aware of all names

    Triggers_store.fetchTriggersIfNotLoaded(this.idContainer, this.idContainerVersion);
    this.initIdTrigger();
  },
  watch: {
    idTrigger: function idTrigger(newValue) {
      if (newValue === null) {
        return;
      }

      this.initIdTrigger();
    },
    triggerParameterValues: {
      handler: function handler(newValue, oldValue) {
        if (!newValue || !oldValue) {
          return;
        }

        this.isDirty = true;
      },
      deep: true
    }
  },
  methods: {
    checkRequiredFieldsAreSet: function checkRequiredFieldsAreSet() {
      if (!this.trigger.name) {
        this.showErrorFieldNotProvidedNotification(Object(external_CoreHome_["translate"])('General_Name'));
        return false;
      }

      return true;
    },
    removeAnyTriggerNotification: function removeAnyTriggerNotification() {
      external_CoreHome_["NotificationsStore"].remove(TriggerEditvue_type_script_lang_ts_notificationId);
      external_CoreHome_["NotificationsStore"].remove('ajaxHelper');
    },
    showNotification: function showNotification(message, context) {
      var notificationInstanceId = external_CoreHome_["NotificationsStore"].show({
        message: message,
        context: context,
        id: TriggerEditvue_type_script_lang_ts_notificationId,
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
    initIdTrigger: function initIdTrigger() {
      var _this2 = this;

      this.trigger = {};
      this.chooseTriggerType = false;
      this.editTitle = '';
      external_CoreHome_["Matomo"].helper.lazyScrollToContent();
      this.availableTriggers = [];
      external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainer',
        idContainer: this.idContainer,
        filter_limit: '-1'
      }).then(function (container) {
        return Triggers_store.fetchAvailableTriggers(container.context);
      }).then(function (triggers) {
        _this2.availableTriggers = triggers;
      }).then(function () {
        if (_this2.edit && _this2.idTrigger) {
          _this2.editTitle = Object(external_CoreHome_["translate"])('TagManager_EditTrigger');
          Triggers_store.findTrigger(_this2.idContainer, _this2.idContainerVersion, _this2.idTrigger).then(function (trigger) {
            if (!trigger) {
              return;
            }

            _this2.trigger = Object(external_CoreHome_["clone"])(trigger);
            _this2.parameterValues = Object.fromEntries(trigger.typeMetadata.parameters.map(function (s) {
              return [s.name, s.value];
            }));

            _this2.addConditionEntryIfNoneExists();

            _this2.onConditionChange();

            _this2.isDirty = false;
          });
          return;
        }

        if (_this2.create) {
          _this2.editTitle = Object(external_CoreHome_["translate"])('TagManager_ChooseTriggerToContinue');
          _this2.chooseTriggerType = true;
        }
      });
    },
    onConditionChange: function onConditionChange() {
      var hasAll = (this.trigger.conditions || []).every(function (c) {
        return !!(c !== null && c !== void 0 && c.expected);
      });

      if (hasAll) {
        this.addConditionEntry();
      }
    },
    addConditionEntryIfNoneExists: function addConditionEntryIfNoneExists() {
      if (!this.trigger.conditions || !Array.isArray(this.trigger.conditions)) {
        this.trigger.conditions = [];
      }

      if (!this.trigger.conditions.length) {
        this.trigger.conditions.push(this.makeDefaultCondition());
      }
    },
    addConditionEntry: function addConditionEntry() {
      this.trigger.conditions.push(this.makeDefaultCondition());
      this.isDirty = true;
    },
    removeConditionEntry: function removeConditionEntry(index) {
      if (index > -1) {
        var lastIndex = this.trigger.conditions.length - 1;

        if (lastIndex === index) {
          this.trigger.conditions[index] = this.makeDefaultCondition();
        } else {
          this.trigger.conditions.splice(index, 1);
        }

        this.isDirty = true;
      }
    },
    createTriggerType: function createTriggerType(triggerTemplate) {
      var _this3 = this;

      if (triggerTemplate && this.isTriggerTemplateDisabled[triggerTemplate.id]) {
        return;
      }

      this.chooseTriggerType = false;
      this.editTitle = Object(external_CoreHome_["translate"])('TagManager_CreateNewTrigger');
      this.trigger = {
        idsite: parseInt("".concat(external_CoreHome_["Matomo"].idSite), 10),
        name: Triggers_store.suggestNameForType(triggerTemplate.name) || '',
        description: '',
        type: triggerTemplate.id,
        idcontainerversion: this.idContainerVersion,
        conditions: [],
        typeMetadata: triggerTemplate
      };
      this.parameterValues = Object.fromEntries(triggerTemplate.parameters.map(function (s) {
        return [s.name, s.value];
      }));
      this.addConditionEntry(); // we directly make the create button visible as sometimes some triggers do not
      // have any settings

      this.isDirty = true;
      Object(external_commonjs_vue_commonjs2_vue_root_Vue_["nextTick"])(function () {
        if (!_this3.$refs.root) {
          return;
        }

        var root = _this3.$refs.root;
        root.scrollIntoView();
        var name = root.querySelector('#name');

        if (name) {
          name.focus();
        }
      });
    },
    cancel: function cancel() {
      var newParams = Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value);
      delete newParams.idTrigger;
      external_CoreHome_["MatomoUrl"].updateHash(newParams);
    },
    createTrigger: function createTrigger() {
      var _this4 = this;

      this.removeAnyTriggerNotification();

      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }

      this.isUpdatingTrigger = true;
      Triggers_store.createOrUpdateTrigger(this.trigger, 'TagManager.addContainerTrigger', this.idContainer, this.idContainerVersion, this.parameterValues).then(function (response) {
        var idTrigger = response.value;
        _this4.isDirty = false;
        Triggers_store.reload(_this4.idContainer, _this4.idContainerVersion).then(function () {
          if (_this4.isEmbedded) {
            _this4.trigger.idtrigger = idTrigger;

            _this4.$emit('changeTrigger', {
              trigger: _this4.trigger
            });

            return;
          }

          external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
            idTrigger: idTrigger
          }));
          setTimeout(function () {
            var createdX = Object(external_CoreHome_["translate"])('TagManager_CreatedX', Object(external_CoreHome_["translate"])('TagManager_Trigger'));
            var wantToRedeploy = Object(external_CoreHome_["translate"])('TagManager_WantToDeployThisChangeCreateVersion', '<a href="" class="createNewVersionLink">', '</a>');

            _this4.showNotification("".concat(createdX, " ").concat(wantToRedeploy), 'success');
          }, 200);
        });
      }).finally(function () {
        _this4.isUpdatingTrigger = false;
      });
    },
    setValueHasChanged: function setValueHasChanged() {
      this.isDirty = true;
    },
    updateTrigger: function updateTrigger() {
      var _this5 = this;

      this.removeAnyTriggerNotification();

      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }

      this.isUpdatingTrigger = true;
      Triggers_store.createOrUpdateTrigger(this.trigger, 'TagManager.updateContainerTrigger', this.idContainer, this.idContainerVersion, this.parameterValues).then(function (response) {
        if (!response) {
          return;
        }

        if (_this5.isEmbedded) {
          _this5.$emit('changeTrigger', {
            trigger: _this5.trigger
          });

          return;
        }

        _this5.isDirty = false;
        Triggers_store.reload(_this5.idContainer, _this5.idContainerVersion).then(function () {
          _this5.initIdTrigger();
        });
        var updatedAt = Object(external_CoreHome_["translate"])('TagManager_UpdatedX', Object(external_CoreHome_["translate"])('TagManager_Trigger'));
        var wantToDeploy = Object(external_CoreHome_["translate"])('TagManager_WantToDeployThisChangeCreateVersion', '<a href="" class="createNewVersionLink">', '</a>');

        _this5.showNotification("".concat(updatedAt, " ").concat(wantToDeploy), 'success');
      }).finally(function () {
        _this5.isUpdatingTrigger = false;
      });
    },
    makeDefaultCondition: function makeDefaultCondition() {
      var _this$trigger;

      var actual = 'PageUrl';

      if ((_this$trigger = this.trigger) !== null && _this$trigger !== void 0 && _this$trigger.typeMetadata) {
        var type = this.trigger.typeMetadata.id;

        if (TRIGGER_TYPE_TO_CONDITION_ACTUAL[type]) {
          actual = TRIGGER_TYPE_TO_CONDITION_ACTUAL[type];
        }
      }

      return {
        comparison: 'equals',
        actual: actual,
        expected: ''
      };
    }
  },
  computed: {
    isLoading: function isLoading() {
      return Triggers_store.isLoading.value || AvailableComparisons_store.isLoading.value;
    },
    isUpdating: function isUpdating() {
      return Triggers_store.isUpdating.value || this.isUpdatingTrigger;
    },
    create: function create() {
      return this.idTrigger === 0;
    },
    edit: function edit() {
      return !this.create;
    },
    canUseCustomTemplates: function canUseCustomTemplates() {
      return external_CoreHome_["Matomo"].hasUserCapability('tagmanager_use_custom_templates');
    },
    isTriggerDisabled: function isTriggerDisabled() {
      var _this$trigger$typeMet;

      return !this.canUseCustomTemplates && ((_this$trigger$typeMet = this.trigger.typeMetadata) === null || _this$trigger$typeMet === void 0 ? void 0 : _this$trigger$typeMet.isCustomTemplate);
    },
    saveButtonText: function saveButtonText() {
      return this.edit ? Object(external_CoreHome_["translate"])('CoreUpdater_UpdateTitle') : Object(external_CoreHome_["translate"])('TagManager_CreateNewTrigger');
    },
    collectionItemAvatarText: function collectionItemAvatarText() {
      return Object(external_CoreHome_["translate"])('TagManager_UseCustomTemplateCapabilityRequired', Object(external_CoreHome_["translate"])('TagManager_CapabilityUseCustomTemplates'));
    },
    availableComparisons: function availableComparisons() {
      return AvailableComparisons_store.comparisonOptions.value;
    },
    isTriggerTemplateDisabled: function isTriggerTemplateDisabled() {
      var _this6 = this;

      var result = {};
      this.availableTriggers.forEach(function (triggerCategory) {
        triggerCategory.types.forEach(function (trigger) {
          result[trigger.id] = !_this6.canUseCustomTemplates && trigger.isCustomTemplate;
        });
      });
      return result;
    },
    triggerParameterValues: function triggerParameterValues() {
      var _this$trigger$typeMet2;

      if (!((_this$trigger$typeMet2 = this.trigger.typeMetadata) !== null && _this$trigger$typeMet2 !== void 0 && _this$trigger$typeMet2.parameters)) {
        return null;
      }

      return this.parameterValues;
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Trigger/TriggerEdit.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Trigger/TriggerEdit.vue



TriggerEditvue_type_script_lang_ts.render = TriggerEditvue_type_template_id_68a714f6_render

/* harmony default export */ var TriggerEdit = (TriggerEditvue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Trigger/TriggerEdit.adapter.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


/* harmony default export */ var TriggerEdit_adapter = (Object(external_CoreHome_["createAngularJsAdapter"])({
  component: TriggerEdit,
  scope: {
    idTrigger: {
      angularJsBind: '='
    },
    idContainer: {
      angularJsBind: '='
    },
    idContainerVersion: {
      angularJsBind: '='
    },
    newTriggerType: {
      angularJsBind: '='
    },
    isEmbedded: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      default: function _default(scope) {
        return !!scope.onChangeTrigger;
      }
    },
    onChangeTrigger: {
      angularJsBind: '&?',
      vue: 'changeTrigger'
    }
  },
  directiveName: 'piwikTriggerEdit',
  events: {
    onChangeTrigger: function onChangeTrigger($event, vm, scope) {
      scope.idTrigger = $event.trigger.idtrigger;
    }
  },
  postCreate: function postCreate(vm, scope) {
    scope.$on('$destroy', function () {
      scope.idTrigger = null;
    });
  }
}));
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Trigger/TriggerList.vue?vue&type=template&id=12a2ba62

var TriggerListvue_type_template_id_12a2ba62_hoisted_1 = {
  class: "tagManagerManageList tagManagerTriggerList"
};
var TriggerListvue_type_template_id_12a2ba62_hoisted_2 = ["title"];
var TriggerListvue_type_template_id_12a2ba62_hoisted_3 = ["title"];
var TriggerListvue_type_template_id_12a2ba62_hoisted_4 = ["title"];
var TriggerListvue_type_template_id_12a2ba62_hoisted_5 = ["title"];
var TriggerListvue_type_template_id_12a2ba62_hoisted_6 = ["title"];
var TriggerListvue_type_template_id_12a2ba62_hoisted_7 = ["title"];
var TriggerListvue_type_template_id_12a2ba62_hoisted_8 = {
  colspan: "7"
};
var TriggerListvue_type_template_id_12a2ba62_hoisted_9 = {
  class: "loadingPiwik"
};

var TriggerListvue_type_template_id_12a2ba62_hoisted_10 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);

var TriggerListvue_type_template_id_12a2ba62_hoisted_11 = {
  colspan: "7"
};
var TriggerListvue_type_template_id_12a2ba62_hoisted_12 = ["id"];
var TriggerListvue_type_template_id_12a2ba62_hoisted_13 = {
  class: "name"
};
var TriggerListvue_type_template_id_12a2ba62_hoisted_14 = ["title"];
var TriggerListvue_type_template_id_12a2ba62_hoisted_15 = ["title"];
var TriggerListvue_type_template_id_12a2ba62_hoisted_16 = {
  class: "conditions"
};
var TriggerListvue_type_template_id_12a2ba62_hoisted_17 = {
  class: "icon-ok"
};
var TriggerListvue_type_template_id_12a2ba62_hoisted_18 = ["title"];
var TriggerListvue_type_template_id_12a2ba62_hoisted_19 = {
  class: "action"
};
var TriggerListvue_type_template_id_12a2ba62_hoisted_20 = ["onClick", "title"];
var TriggerListvue_type_template_id_12a2ba62_hoisted_21 = ["onClick", "title"];
var TriggerListvue_type_template_id_12a2ba62_hoisted_22 = {
  class: "tableActionBar"
};

var TriggerListvue_type_template_id_12a2ba62_hoisted_23 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, null, -1);

var TriggerListvue_type_template_id_12a2ba62_hoisted_24 = {
  class: "ui-confirm",
  id: "confirmDeleteTrigger",
  ref: "confirmDeleteTrigger"
};
var TriggerListvue_type_template_id_12a2ba62_hoisted_25 = ["value"];
var TriggerListvue_type_template_id_12a2ba62_hoisted_26 = ["value"];
var TriggerListvue_type_template_id_12a2ba62_hoisted_27 = {
  class: "ui-confirm",
  id: "confirmDeleteTriggerNotPossible",
  ref: "confirmDeleteTriggerNotPossible"
};
var TriggerListvue_type_template_id_12a2ba62_hoisted_28 = {
  class: "collection"
};
var TriggerListvue_type_template_id_12a2ba62_hoisted_29 = ["value"];
function TriggerListvue_type_template_id_12a2ba62_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");

  var _directive_content_table = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("content-table");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", TriggerListvue_type_template_id_12a2ba62_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: "Tag Manager",
    "content-title": _ctx.translate('TagManager_ManageX', _ctx.translate('TagManager_Triggers')),
    "help-text": _ctx.triggersHelpText
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_TriggerUsageBenefits')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("table", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
        class: "name",
        title: _ctx.nameTranslatedText
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Name')), 9, TriggerListvue_type_template_id_12a2ba62_hoisted_2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
        class: "description",
        title: _ctx.descriptionTranslatedText
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Description')), 9, TriggerListvue_type_template_id_12a2ba62_hoisted_3), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
        class: "type",
        title: _ctx.typeTranslatedText
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Type')), 9, TriggerListvue_type_template_id_12a2ba62_hoisted_4), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
        class: "conditions",
        title: _ctx.filterTranslatedText
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Filter')), 9, TriggerListvue_type_template_id_12a2ba62_hoisted_5), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
        class: "lastUpdated",
        title: _ctx.lastUpdatedTranslatedText
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_LastUpdated')), 9, TriggerListvue_type_template_id_12a2ba62_hoisted_6), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
        class: "action",
        title: _ctx.actionTranslatedText
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Actions')), 9, TriggerListvue_type_template_id_12a2ba62_hoisted_7), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", TriggerListvue_type_template_id_12a2ba62_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", TriggerListvue_type_template_id_12a2ba62_hoisted_9, [TriggerListvue_type_template_id_12a2ba62_hoisted_10, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_LoadingData')), 1)])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isLoading || _ctx.isUpdating]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", TriggerListvue_type_template_id_12a2ba62_hoisted_11, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_NoTriggersFound')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "createContainerTriggerNow",
        onClick: _cache[0] || (_cache[0] = function ($event) {
          return _ctx.createTrigger();
        })
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewTriggerNow')), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isLoading && _ctx.triggers.length === 0]]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.sortedTriggers, function (trigger) {
        var _trigger$conditions;

        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
          id: "trigger".concat(trigger.idtrigger),
          class: "triggers",
          key: trigger.idtrigger
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", TriggerListvue_type_template_id_12a2ba62_hoisted_13, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(trigger.name), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
          class: "description",
          title: trigger.description
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.truncateText(trigger.description, 30)), 9, TriggerListvue_type_template_id_12a2ba62_hoisted_14), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
          class: "type",
          title: trigger.typeMetadata.description
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(trigger.typeMetadata.name), 9, TriggerListvue_type_template_id_12a2ba62_hoisted_15), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", TriggerListvue_type_template_id_12a2ba62_hoisted_16, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", TriggerListvue_type_template_id_12a2ba62_hoisted_17, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], (_trigger$conditions = trigger.conditions) === null || _trigger$conditions === void 0 ? void 0 : _trigger$conditions.length]])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
          class: "lastUpdated",
          title: _ctx.translate('TagManager_CreatedOnX', trigger.created_date_pretty)
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(trigger.updated_date_pretty), 1)], 8, TriggerListvue_type_template_id_12a2ba62_hoisted_18), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", TriggerListvue_type_template_id_12a2ba62_hoisted_19, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
          class: "table-action icon-edit",
          onClick: function onClick($event) {
            return _ctx.editTrigger(trigger.idtrigger, trigger.type);
          },
          title: _ctx.translate('TagManager_EditTrigger')
        }, null, 8, TriggerListvue_type_template_id_12a2ba62_hoisted_20), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
          class: "table-action icon-delete",
          onClick: function onClick($event) {
            return _ctx.deleteTrigger(trigger);
          },
          title: _ctx.translate('TagManager_DeleteX', _ctx.translate('TagManager_Trigger'))
        }, null, 8, TriggerListvue_type_template_id_12a2ba62_hoisted_21)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])], 8, TriggerListvue_type_template_id_12a2ba62_hoisted_12);
      }), 128))])], 512), [[_directive_content_table]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerListvue_type_template_id_12a2ba62_hoisted_22, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "createNewTrigger",
        value: "",
        onClick: _cache[1] || (_cache[1] = function ($event) {
          return _ctx.createTrigger();
        })
      }, [TriggerListvue_type_template_id_12a2ba62_hoisted_23, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewTrigger')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])];
    }),
    _: 1
  }, 8, ["content-title", "help-text"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerListvue_type_template_id_12a2ba62_hoisted_24, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_DeleteTriggerConfirm')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "yes",
    type: "button",
    value: _ctx.translate('General_Yes')
  }, null, 8, TriggerListvue_type_template_id_12a2ba62_hoisted_25), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "no",
    type: "button",
    value: _ctx.translate('General_No')
  }, null, 8, TriggerListvue_type_template_id_12a2ba62_hoisted_26)], 512), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerListvue_type_template_id_12a2ba62_hoisted_27, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_TriggerCannotBeDeleted')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_TriggerBeingUsedBy')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", TriggerListvue_type_template_id_12a2ba62_hoisted_28, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.triggerReferences, function (reference) {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
      class: "collection-item",
      key: reference.referenceId
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(reference.referenceTypeName) + ": " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(reference.referenceName), 1);
  }), 128))]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_TriggerBeingUsedNeedsRemove')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "no",
    type: "button",
    value: _ctx.translate('General_Cancel')
  }, null, 8, TriggerListvue_type_template_id_12a2ba62_hoisted_29)], 512)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Trigger/TriggerList.vue?vue&type=template&id=12a2ba62

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Trigger/TriggerList.vue?vue&type=script&lang=ts
function TriggerListvue_type_script_lang_ts_toConsumableArray(arr) { return TriggerListvue_type_script_lang_ts_arrayWithoutHoles(arr) || TriggerListvue_type_script_lang_ts_iterableToArray(arr) || TriggerListvue_type_script_lang_ts_unsupportedIterableToArray(arr) || TriggerListvue_type_script_lang_ts_nonIterableSpread(); }

function TriggerListvue_type_script_lang_ts_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function TriggerListvue_type_script_lang_ts_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return TriggerListvue_type_script_lang_ts_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return TriggerListvue_type_script_lang_ts_arrayLikeToArray(o, minLen); }

function TriggerListvue_type_script_lang_ts_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function TriggerListvue_type_script_lang_ts_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return TriggerListvue_type_script_lang_ts_arrayLikeToArray(arr); }

function TriggerListvue_type_script_lang_ts_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var TriggerListvue_type_script_lang_ts_window = window,
    TriggerListvue_type_script_lang_ts_tagManagerHelper = TriggerListvue_type_script_lang_ts_window.tagManagerHelper;
/* harmony default export */ var TriggerListvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idContainer: {
      type: String,
      required: true
    },
    idContainerVersion: {
      type: Number,
      required: true
    },
    triggersHelpText: String
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
      triggerReferences: []
    };
  },
  created: function created() {
    Triggers_store.fetchTriggers(this.idContainer, this.idContainerVersion);
  },
  methods: {
    createTrigger: function createTrigger() {
      this.editTrigger(0);
    },
    editTrigger: function editTrigger(idTrigger) {
      external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
        idTrigger: idTrigger
      }));
    },
    deleteTrigger: function deleteTrigger(trigger) {
      var _this = this;

      external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainerTriggerReferences',
        idContainer: this.idContainer,
        idContainerVersion: this.idContainerVersion,
        idTrigger: trigger.idtrigger
      }).then(function (references) {
        if (!references || !references.length) {
          _this.triggerReferences = [];

          var doDelete = function doDelete() {
            Triggers_store.deleteTrigger(_this.idContainer, _this.idContainerVersion, trigger.idtrigger).then(function () {
              Triggers_store.reload(_this.idContainer, _this.idContainerVersion);
            });
          };

          external_CoreHome_["Matomo"].helper.modalConfirm(_this.$refs.confirmDeleteTrigger, {
            yes: doDelete
          });
        } else {
          _this.triggerReferences = references;
          external_CoreHome_["Matomo"].helper.modalConfirm(_this.$refs.confirmDeleteTriggerNotPossible, {});
        }
      });
    },
    truncateText: function truncateText(text, length) {
      return TriggerListvue_type_script_lang_ts_tagManagerHelper.truncateText(text, length);
    }
  },
  computed: {
    isLoading: function isLoading() {
      return Triggers_store.isLoading.value;
    },
    isUpdating: function isUpdating() {
      return Triggers_store.isUpdating.value;
    },
    triggers: function triggers() {
      return Triggers_store.triggers.value;
    },
    sortedTriggers: function sortedTriggers() {
      var sorted = TriggerListvue_type_script_lang_ts_toConsumableArray(this.triggers);

      sorted.sort(function (lhs, rhs) {
        if (lhs.name < rhs.name) {
          return -1;
        }

        return lhs.name > rhs.name ? 1 : 0;
      });
      return sorted;
    },
    nameTranslatedText: function nameTranslatedText() {
      return this.translate('TagManager_TriggersNameDescription');
    },
    descriptionTranslatedText: function descriptionTranslatedText() {
      return this.translate('TagManager_TriggersDescriptionDescription');
    },
    typeTranslatedText: function typeTranslatedText() {
      return this.translate('TagManager_TriggersTypeDescription');
    },
    filterTranslatedText: function filterTranslatedText() {
      return this.translate('TagManager_TriggersFilterDescription');
    },
    lastUpdatedTranslatedText: function lastUpdatedTranslatedText() {
      return this.translate('TagManager_TriggersLastUpdatedDescription');
    },
    actionTranslatedText: function actionTranslatedText() {
      return this.translate('TagManager_TriggersActionDescription');
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Trigger/TriggerList.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Trigger/TriggerList.vue



TriggerListvue_type_script_lang_ts.render = TriggerListvue_type_template_id_12a2ba62_render

/* harmony default export */ var TriggerList = (TriggerListvue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Trigger/TriggerList.adapter.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


/* harmony default export */ var TriggerList_adapter = (Object(external_CoreHome_["createAngularJsAdapter"])({
  component: TriggerList,
  scope: {
    idContainer: {
      angularJsBind: '='
    },
    idContainerVersion: {
      angularJsBind: '='
    }
  },
  directiveName: 'piwikTriggerList'
}));
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Trigger/TriggerManage.vue?vue&type=template&id=50893454

var TriggerManagevue_type_template_id_50893454_hoisted_1 = {
  class: "manageTrigger"
};
function TriggerManagevue_type_template_id_50893454_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_TriggerList = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("TriggerList");

  var _component_TriggerEdit = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("TriggerEdit");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", TriggerManagevue_type_template_id_50893454_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_TriggerList, {
    "id-container": _ctx.idContainer,
    "id-container-version": _ctx.idContainerVersion,
    "triggers-help-text": _ctx.triggersHelpText
  }, null, 8, ["id-container", "id-container-version", "triggers-help-text"])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.editMode]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_TriggerEdit, {
    "id-container": _ctx.idContainer,
    "id-container-version": _ctx.idContainerVersion,
    "id-trigger": _ctx.idTrigger
  }, null, 8, ["id-container", "id-container-version", "id-trigger"])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.editMode]])]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Trigger/TriggerManage.vue?vue&type=template&id=50893454

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Trigger/TriggerManage.vue?vue&type=script&lang=ts




/* harmony default export */ var TriggerManagevue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idContainerVersion: Number,
    idContainer: String,
    triggersHelpText: String
  },
  components: {
    TriggerList: TriggerList,
    TriggerEdit: TriggerEdit
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
      return external_CoreHome_["MatomoUrl"].hashParsed.value.idTrigger;
    }, function (idTrigger) {
      _this.onIdTriggerParamChange(idTrigger);
    });
    external_CoreHome_["NotificationsStore"].remove('triggertriggermanagement');
    this.onIdTriggerParamChange(external_CoreHome_["MatomoUrl"].hashParsed.value.idTrigger);
  },
  methods: {
    onIdTriggerParamChange: function onIdTriggerParamChange(idTrigger) {
      // for BC w/ angularjs only invoke event if idVariable is 0
      if (idTrigger === '0') {
        var parameters = {
          isAllowed: true
        };
        external_CoreHome_["Matomo"].postEvent('TagManager.initAddTrigger', parameters);
        this.isAddAllowed = !!parameters.isAllowed;
      }
    }
  },
  computed: {
    idTrigger: function idTrigger() {
      var idTrigger = external_CoreHome_["MatomoUrl"].hashParsed.value.idTrigger;

      if (!this.isAddAllowed && idTrigger === '0') {
        return null;
      }

      return idTrigger ? parseInt(idTrigger, 10) : idTrigger;
    },
    editMode: function editMode() {
      return typeof this.idTrigger === 'number';
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Trigger/TriggerManage.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Trigger/TriggerManage.vue



TriggerManagevue_type_script_lang_ts.render = TriggerManagevue_type_template_id_50893454_render

/* harmony default export */ var TriggerManage = (TriggerManagevue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Trigger/TriggerManage.adapter.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


/* harmony default export */ var TriggerManage_adapter = (Object(external_CoreHome_["createAngularJsAdapter"])({
  component: TriggerManage,
  scope: {
    idContainerVersion: {
      angularJsBind: '@',
      transform: function transform(v) {
        return typeof v === 'string' ? parseInt(v, 10) : v;
      }
    },
    idContainer: {
      angularJsBind: '@'
    },
    triggersHelpText: {
      angularJsBind: '@'
    }
  },
  directiveName: 'piwikTriggerManage'
}));
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Tag/TagEdit.vue?vue&type=template&id=5ee639e0
function TagEditvue_type_template_id_5ee639e0_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var TagEditvue_type_template_id_5ee639e0_hoisted_1 = {
  class: "editTag tagManagerManageEdit",
  ref: "root"
};
var TagEditvue_type_template_id_5ee639e0_hoisted_2 = {
  class: "loadingPiwik"
};

var TagEditvue_type_template_id_5ee639e0_hoisted_3 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);

var TagEditvue_type_template_id_5ee639e0_hoisted_4 = {
  class: "loadingPiwik"
};

var TagEditvue_type_template_id_5ee639e0_hoisted_5 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);

var TagEditvue_type_template_id_5ee639e0_hoisted_6 = {
  class: "form-group row"
};
var TagEditvue_type_template_id_5ee639e0_hoisted_7 = {
  class: "col s12"
};
var TagEditvue_type_template_id_5ee639e0_hoisted_8 = {
  key: 0
};
var TagEditvue_type_template_id_5ee639e0_hoisted_9 = {
  class: "form-group row"
};
var TagEditvue_type_template_id_5ee639e0_hoisted_10 = {
  class: "col s12"
};
var TagEditvue_type_template_id_5ee639e0_hoisted_11 = {
  class: "form-group row"
};
var TagEditvue_type_template_id_5ee639e0_hoisted_12 = {
  class: "col s12"
};
var TagEditvue_type_template_id_5ee639e0_hoisted_13 = {
  class: "form-group row tagStartDate"
};
var TagEditvue_type_template_id_5ee639e0_hoisted_14 = {
  class: "col s12 m6"
};
var TagEditvue_type_template_id_5ee639e0_hoisted_15 = {
  class: "row"
};
var TagEditvue_type_template_id_5ee639e0_hoisted_16 = {
  class: "col s12"
};
var TagEditvue_type_template_id_5ee639e0_hoisted_17 = {
  for: "start_date_date",
  class: "active"
};
var TagEditvue_type_template_id_5ee639e0_hoisted_18 = {
  class: "tagStartDate"
};
var TagEditvue_type_template_id_5ee639e0_hoisted_19 = {
  class: "col s12 m6 "
};
var TagEditvue_type_template_id_5ee639e0_hoisted_20 = {
  class: "form-help"
};
var TagEditvue_type_template_id_5ee639e0_hoisted_21 = {
  class: "inline-help"
};
var TagEditvue_type_template_id_5ee639e0_hoisted_22 = ["innerHTML"];

var TagEditvue_type_template_id_5ee639e0_hoisted_23 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);

var TagEditvue_type_template_id_5ee639e0_hoisted_24 = ["innerHTML"];
var TagEditvue_type_template_id_5ee639e0_hoisted_25 = {
  class: "form-group row tagEndDate"
};
var TagEditvue_type_template_id_5ee639e0_hoisted_26 = {
  class: "col s12 m6"
};
var TagEditvue_type_template_id_5ee639e0_hoisted_27 = {
  class: "row"
};
var TagEditvue_type_template_id_5ee639e0_hoisted_28 = {
  class: "col s12"
};
var TagEditvue_type_template_id_5ee639e0_hoisted_29 = {
  for: "end_date_date",
  class: "active"
};
var TagEditvue_type_template_id_5ee639e0_hoisted_30 = {
  class: "tagEndDate"
};
var TagEditvue_type_template_id_5ee639e0_hoisted_31 = {
  class: "col s12 m6"
};
var TagEditvue_type_template_id_5ee639e0_hoisted_32 = {
  class: "form-help"
};
var TagEditvue_type_template_id_5ee639e0_hoisted_33 = {
  class: "inline-help"
};
var TagEditvue_type_template_id_5ee639e0_hoisted_34 = ["innerHTML"];

var TagEditvue_type_template_id_5ee639e0_hoisted_35 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);

var TagEditvue_type_template_id_5ee639e0_hoisted_36 = ["innerHTML"];
var _hoisted_37 = {
  class: "entityCancel"
};
var _hoisted_38 = {
  id: "confirmSelectTagType"
};
var _hoisted_39 = {
  class: "collection-header"
};
var _hoisted_40 = ["onClick", "title"];
var _hoisted_41 = ["src"];
var _hoisted_42 = {
  class: "title"
};
var _hoisted_43 = {
  class: "secondary-content"
};
var _hoisted_44 = ["title"];
var _hoisted_45 = {
  class: "entityCancel"
};
function TagEditvue_type_template_id_5ee639e0_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");

  var _component_GroupedSettings = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("GroupedSettings");

  var _component_TagTriggerArray = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("TagTriggerArray");

  var _component_TagDateInput = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("TagDateInput");

  var _component_SaveButton = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("SaveButton");

  var _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", TagEditvue_type_template_id_5ee639e0_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: "Tag Manager",
    "content-title": _ctx.editTitle
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      var _ctx$tag$typeMetadata, _ctx$tag$typeMetadata2, _ctx$tag$typeMetadata3, _ctx$tag$typeMetadata4, _ctx$tag$typeMetadata5, _ctx$tag$typeMetadata6, _ctx$tag$typeMetadata7, _ctx$tag$typeMetadata8;

      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", TagEditvue_type_template_id_5ee639e0_hoisted_2, [TagEditvue_type_template_id_5ee639e0_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_LoadingData')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isLoading]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", TagEditvue_type_template_id_5ee639e0_hoisted_4, [TagEditvue_type_template_id_5ee639e0_hoisted_5, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_UpdatingData')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isUpdating]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("form", {
        onSubmit: _cache[18] || (_cache[18] = function ($event) {
          return _ctx.edit ? _ctx.updateTag() : _ctx.createTag();
        })
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
        class: "alert alert-warning"
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_UseCustomTemplateCapabilityRequired', _ctx.translate('TagManager_CapabilityUseCustomTemplates'))), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isTagDisabled]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "text",
        name: "type",
        "model-value": (_ctx$tag$typeMetadata = _ctx.tag.typeMetadata) === null || _ctx$tag$typeMetadata === void 0 ? void 0 : _ctx$tag$typeMetadata.name,
        disabled: true,
        "inline-help": ((_ctx$tag$typeMetadata2 = _ctx.tag.typeMetadata) === null || _ctx$tag$typeMetadata2 === void 0 ? void 0 : _ctx$tag$typeMetadata2.description) + ' ' + ((_ctx$tag$typeMetadata3 = _ctx.tag.typeMetadata) === null || _ctx$tag$typeMetadata3 === void 0 ? void 0 : _ctx$tag$typeMetadata3.help),
        title: _ctx.translate('TagManager_Type')
      }, null, 8, ["model-value", "inline-help", "title"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "text",
        name: "name",
        "model-value": _ctx.tag.name,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
          _ctx.tag.name = $event;

          _ctx.setValueHasChanged();
        }),
        maxlength: 50,
        title: _ctx.translate('General_Name'),
        "inline-help": _ctx.translate('TagManager_TagNameHelp')
      }, null, 8, ["model-value", "title", "inline-help"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "textarea",
        name: "description",
        "model-value": _ctx.tag.description,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
          _ctx.tag.description = $event;

          _ctx.setValueHasChanged();
        }),
        maxlength: 1000,
        title: _ctx.translate('General_Description'),
        "inline-help": _ctx.translate('TagManager_TagDescriptionHelp')
      }, null, 8, ["model-value", "title", "inline-help"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_5ee639e0_hoisted_6, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_5ee639e0_hoisted_7, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ConfigureWhatTagDoes')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], (_ctx$tag$typeMetadata4 = _ctx.tag.typeMetadata) === null || _ctx$tag$typeMetadata4 === void 0 ? void 0 : _ctx$tag$typeMetadata4.parameters.length]]), _ctx.tag ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", TagEditvue_type_template_id_5ee639e0_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_GroupedSettings, {
        settings: ((_ctx$tag$typeMetadata5 = _ctx.tag.typeMetadata) === null || _ctx$tag$typeMetadata5 === void 0 ? void 0 : _ctx$tag$typeMetadata5.parameters) || [],
        "all-setting-values": _ctx.parameterValues,
        onChange: _cache[2] || (_cache[2] = function ($event) {
          _ctx.parameterValues[$event.name] = $event.value;

          _ctx.setValueHasChanged();
        })
      }, null, 8, ["settings", "all-setting-values"])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_5ee639e0_hoisted_9, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_5ee639e0_hoisted_10, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ConfigureWhenTagDoes')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], (_ctx$tag$typeMetadata6 = _ctx.tag.typeMetadata) === null || _ctx$tag$typeMetadata6 === void 0 ? void 0 : _ctx$tag$typeMetadata6.parameters.length]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_TagTriggerArray, {
        "container-triggers": _ctx.containerTriggers,
        type: "fire",
        title: _ctx.translate('TagManager_FireTriggerTitle'),
        help: _ctx.translate('TagManager_FireTriggerHelp', _ctx.translate('TagManager_FireLimit')),
        "model-value": _ctx.fireTriggers,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
          _ctx.fireTriggers = $event;

          _ctx.setValueHasChanged();

          _ctx.onFireTriggerChange();
        }),
        onCreate: _cache[4] || (_cache[4] = function ($event) {
          return _ctx.onCreateNewFireTrigger();
        }),
        onEdit: _cache[5] || (_cache[5] = function ($event) {
          return _ctx.editTrigger($event);
        })
      }, null, 8, ["container-triggers", "title", "help", "model-value"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_TagTriggerArray, {
        "container-triggers": _ctx.containerTriggers,
        type: "block",
        title: _ctx.translate('TagManager_BlockTriggerTitle'),
        help: _ctx.translate('TagManager_BlockTriggerHelp'),
        "model-value": _ctx.blockTriggers,
        "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
          _ctx.blockTriggers = $event;

          _ctx.setValueHasChanged();

          _ctx.onBlockTriggerChange();
        }),
        onCreate: _cache[7] || (_cache[7] = function ($event) {
          return _ctx.onCreateNewBlockTrigger();
        }),
        onEdit: _cache[8] || (_cache[8] = function ($event) {
          return _ctx.editTrigger($event);
        })
      }, null, 8, ["container-triggers", "title", "help", "model-value"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_5ee639e0_hoisted_11, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_5ee639e0_hoisted_12, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        href: "",
        class: "showAdvancedSettings",
        onClick: _cache[9] || (_cache[9] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function ($event) {
          return _ctx.showAdvanced = true;
        }, ["prevent"]))
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ShowAdvancedSettings')), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.showAdvanced]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        href: "",
        class: "hideAdvancedSettings",
        onClick: _cache[10] || (_cache[10] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function ($event) {
          return _ctx.showAdvanced = false;
        }, ["prevent"]))
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_HideAdvancedSettings')), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.showAdvanced]])])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], (_ctx$tag$typeMetadata7 = _ctx.tag.typeMetadata) === null || _ctx$tag$typeMetadata7 === void 0 ? void 0 : _ctx$tag$typeMetadata7.hasAdvancedSettings]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "radio",
        name: "fire_limit",
        "model-value": _ctx.tag.fire_limit,
        "onUpdate:modelValue": _cache[11] || (_cache[11] = function ($event) {
          _ctx.tag.fire_limit = $event;

          _ctx.setValueHasChanged();
        }),
        options: _ctx.availableFireLimits,
        title: _ctx.translate('TagManager_FireLimit'),
        "inline-help": _ctx.fireLimitHelp
      }, null, 8, ["model-value", "options", "title", "inline-help"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "text",
        name: "fire_delay",
        "model-value": _ctx.tag.fire_delay,
        "onUpdate:modelValue": _cache[12] || (_cache[12] = function ($event) {
          _ctx.tag.fire_delay = $event;

          _ctx.setValueHasChanged();
        }),
        maxlength: 8,
        title: _ctx.translate('TagManager_FireDelay'),
        "inline-help": _ctx.translate('TagManager_FireDelayHelp')
      }, null, 8, ["model-value", "title", "inline-help"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "text",
        name: "priority",
        "model-value": _ctx.tag.priority,
        "onUpdate:modelValue": _cache[13] || (_cache[13] = function ($event) {
          _ctx.tag.priority = $event;

          _ctx.setValueHasChanged();
        }),
        maxlength: 4,
        title: _ctx.translate('TagManager_Priority'),
        "inline-help": _ctx.translate('TagManager_PriorityHelp')
      }, null, 8, ["model-value", "title", "inline-help"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_5ee639e0_hoisted_13, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_5ee639e0_hoisted_14, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_5ee639e0_hoisted_15, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_5ee639e0_hoisted_16, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", TagEditvue_type_template_id_5ee639e0_hoisted_17, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_StartDate')) + ":", 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_5ee639e0_hoisted_18, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_TagDateInput, {
        name: "start_date",
        "model-value": _ctx.tag.start_date,
        "onUpdate:modelValue": _cache[14] || (_cache[14] = function ($event) {
          _ctx.tag.start_date = $event;

          _ctx.setValueHasChanged();
        }),
        "default-time": "00:00:00"
      }, null, 8, ["model-value"])])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_5ee639e0_hoisted_19, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_5ee639e0_hoisted_20, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", TagEditvue_type_template_id_5ee639e0_hoisted_21, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
        innerHTML: _ctx.$sanitize(_ctx.translate('TagManager_TagStartDateHelp', '<strong>', '</strong>'))
      }, null, 8, TagEditvue_type_template_id_5ee639e0_hoisted_22), TagEditvue_type_template_id_5ee639e0_hoisted_23, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
        class: "currentLocalTime",
        innerHTML: _ctx.$sanitize(_ctx.translate('TagManager_CurrentTimeInLocalTimezone', '<strong>', _ctx.currentTime, '</strong>'))
      }, null, 8, TagEditvue_type_template_id_5ee639e0_hoisted_24)])])])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_5ee639e0_hoisted_25, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_5ee639e0_hoisted_26, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_5ee639e0_hoisted_27, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_5ee639e0_hoisted_28, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", TagEditvue_type_template_id_5ee639e0_hoisted_29, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_EndDate')) + ":", 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_5ee639e0_hoisted_30, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_TagDateInput, {
        name: "end_date",
        "model-value": _ctx.tag.end_date,
        "onUpdate:modelValue": _cache[15] || (_cache[15] = function ($event) {
          _ctx.tag.end_date = $event;

          _ctx.setValueHasChanged();
        }),
        "default-time": "23:59:59"
      }, null, 8, ["model-value"])])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_5ee639e0_hoisted_31, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_5ee639e0_hoisted_32, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", TagEditvue_type_template_id_5ee639e0_hoisted_33, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
        innerHTML: _ctx.$sanitize(_ctx.translate('TagManager_TagEndDateHelp', '<strong>', '</strong>'))
      }, null, 8, TagEditvue_type_template_id_5ee639e0_hoisted_34), TagEditvue_type_template_id_5ee639e0_hoisted_35, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
        class: "currentLocalTime",
        innerHTML: _ctx.$sanitize(_ctx.translate('TagManager_CurrentTimeInLocalTimezone', '<strong>', _ctx.currentTime, '</strong>'))
      }, null, 8, TagEditvue_type_template_id_5ee639e0_hoisted_36)])])])])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.showAdvanced && ((_ctx$tag$typeMetadata8 = _ctx.tag.typeMetadata) === null || _ctx$tag$typeMetadata8 === void 0 ? void 0 : _ctx$tag$typeMetadata8.hasAdvancedSettings)]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
        class: "alert alert-warning"
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_UseCustomTemplateCapabilityRequired', _ctx.translate('TagManager_CapabilityUseCustomTemplates'))), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isTagDisabled]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_SaveButton, {
        class: "createButton",
        onConfirm: _cache[16] || (_cache[16] = function ($event) {
          return _ctx.edit ? _ctx.updateTag() : _ctx.createTag();
        }),
        disabled: _ctx.isUpdating || !_ctx.isDirty,
        saving: _ctx.isUpdating,
        value: _ctx.edit ? _ctx.translate('CoreUpdater_UpdateTitle') : _ctx.translate('TagManager_CreateNewTag')
      }, null, 8, ["disabled", "saving", "value"]), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isTagDisabled]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_37, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        onClick: _cache[17] || (_cache[17] = function ($event) {
          return _ctx.cancel();
        })
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Cancel')), 1)])])], 544), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.chooseTagType && _ctx.editTitle]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_38, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.availableTags, function (tagCategory) {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("ul", {
          class: "collection with-header",
          key: tagCategory.name
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", _hoisted_39, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(tagCategory.name), 1)]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(tagCategory.types, function (tagTemplate, index) {
          return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
            key: index,
            class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["collection-item avatar", TagEditvue_type_template_id_5ee639e0_defineProperty({
              disabledTemplate: _ctx.isTagTemplateDisabled[tagTemplate.id]
            }, "templateType".concat(tagTemplate.id), true)]),
            onClick: function onClick($event) {
              return _ctx.createTagType(tagTemplate);
            },
            title: !_ctx.isTagTemplateDisabled[tagTemplate.id] ? '' : _ctx.collectionItemAvatarText
          }, [tagTemplate.icon ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("img", {
            key: 0,
            alt: "",
            class: "circle",
            src: tagTemplate.icon
          }, null, 8, _hoisted_41)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_42, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(tagTemplate.name), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(tagTemplate.description), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], tagTemplate.description]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_43, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("i", {
            class: "icon-help",
            title: tagTemplate.help
          }, null, 8, _hoisted_44)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !!tagTemplate.help]])], 10, _hoisted_40);
        }), 128))]);
      }), 128)), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_45, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        onClick: _cache[19] || (_cache[19] = function ($event) {
          return _ctx.cancel();
        })
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Cancel')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.chooseTagType]])];
    }),
    _: 1
  }, 8, ["content-title"])], 512);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagEdit.vue?vue&type=template&id=5ee639e0

// CONCATENATED MODULE: ./plugins/TagManager/vue/src/AvailableFireLimit.store.ts
function AvailableFireLimit_store_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AvailableFireLimit_store_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function AvailableFireLimit_store_createClass(Constructor, protoProps, staticProps) { if (protoProps) AvailableFireLimit_store_defineProperties(Constructor.prototype, protoProps); if (staticProps) AvailableFireLimit_store_defineProperties(Constructor, staticProps); return Constructor; }

function AvailableFireLimit_store_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */



var AvailableFireLimit_store_AvailableFireLimitStore = /*#__PURE__*/function () {
  function AvailableFireLimitStore() {
    var _this = this;

    AvailableFireLimit_store_classCallCheck(this, AvailableFireLimitStore);

    AvailableFireLimit_store_defineProperty(this, "privateState", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      fireLimits: [],
      isLoading: false
    }));

    AvailableFireLimit_store_defineProperty(this, "state", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(_this.privateState);
    }));

    AvailableFireLimit_store_defineProperty(this, "isLoading", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return _this.state.value.isLoading;
    }));

    AvailableFireLimit_store_defineProperty(this, "fireLimits", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return _this.state.value.fireLimits;
    }));

    AvailableFireLimit_store_defineProperty(this, "fireLimitsOptions", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return _this.fireLimits.value.map(function (_ref) {
        var id = _ref.id,
            name = _ref.name;
        return {
          key: id,
          value: name
        };
      });
    }));

    AvailableFireLimit_store_defineProperty(this, "initializePromise", null);
  }

  AvailableFireLimit_store_createClass(AvailableFireLimitStore, [{
    key: "init",
    value: function init() {
      if (!this.initializePromise) {
        this.initializePromise = this.fetchAvailableFireLimits();
      }

      return this.initializePromise;
    }
  }, {
    key: "fetchAvailableFireLimits",
    value: function fetchAvailableFireLimits() {
      var _this2 = this;

      this.privateState.isLoading = true;
      return external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getAvailableTagFireLimits',
        filter_limit: '-1'
      }).then(function (fireLimits) {
        var entities;

        if (Array.isArray(fireLimits)) {
          entities = fireLimits;
        } else {
          entities = Object.values(fireLimits);
        }

        _this2.privateState.fireLimits = entities;
      }).finally(function () {
        _this2.privateState.isLoading = false;
      });
    }
  }]);

  return AvailableFireLimitStore;
}();

/* harmony default export */ var AvailableFireLimit_store = (new AvailableFireLimit_store_AvailableFireLimitStore());
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Tag/TagTriggerArray.vue?vue&type=template&id=c1c05b4a

var TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_1 = {
  class: "col s12 m6"
};
var TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_2 = ["for"];

var TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_3 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);

var TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_4 = ["name"];
var TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_5 = ["onClick", "title"];
var TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_6 = ["onClick", "title"];
var TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_7 = {
  class: "col s12 m6"
};
var TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_8 = {
  class: "form-help"
};
var TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_9 = {
  class: "inline-help"
};

var TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_10 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);

var TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_11 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);

function TagTriggerArrayvue_type_template_id_c1c05b4a_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["form-group row", "".concat(_ctx.type, "Triggers")])
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
    for: "".concat(_ctx.type, "_triggers")
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.title), 9, TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_NoTriggersFound')) + ". ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    class: "createNewTrigger",
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.$emit('create');
    })
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewTriggerNow')), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.containerTriggers.length === 0]]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.modelValue, function (idTrigger, index) {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["multiple valign-wrapper", "".concat(_ctx.type, "Trigger ").concat(_ctx.type, "Trigger").concat(index)]),
      key: index
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
      class: "innerFormField",
      name: "".concat(_ctx.type, "_triggers")
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
      uicontrol: "select",
      name: "".concat(_ctx.type, "_triggers"),
      "model-value": idTrigger,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return _ctx.onChangeTrigger($event, index);
      },
      "full-width": true,
      options: _ctx.containerTriggers
    }, null, 8, ["name", "model-value", "onUpdate:modelValue", "options"])], 8, TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_4), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
      class: "icon-edit valign",
      onClick: function onClick($event) {
        return _ctx.$emit('edit', idTrigger);
      },
      title: _ctx.translate('General_Edit')
    }, null, 8, TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_5), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], idTrigger]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
      class: "icon-minus valign",
      onClick: function onClick($event) {
        return _ctx.removeTrigger(index);
      },
      title: _ctx.translate('General_Remove')
    }, null, 8, TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_6), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], index + 1 !== _ctx.modelValue.length]])], 2)), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.containerTriggers.length]]);
  }), 128))])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_7, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_9, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.help) + " ", 1), TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_10, TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_11, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    class: "createTriggerInHelp",
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return _ctx.$emit('create');
    })
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewTriggerNow')), 1)])])])], 2);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagTriggerArray.vue?vue&type=template&id=c1c05b4a

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Tag/TagTriggerArray.vue?vue&type=script&lang=ts
function TagTriggerArrayvue_type_script_lang_ts_toConsumableArray(arr) { return TagTriggerArrayvue_type_script_lang_ts_arrayWithoutHoles(arr) || TagTriggerArrayvue_type_script_lang_ts_iterableToArray(arr) || TagTriggerArrayvue_type_script_lang_ts_unsupportedIterableToArray(arr) || TagTriggerArrayvue_type_script_lang_ts_nonIterableSpread(); }

function TagTriggerArrayvue_type_script_lang_ts_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function TagTriggerArrayvue_type_script_lang_ts_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return TagTriggerArrayvue_type_script_lang_ts_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return TagTriggerArrayvue_type_script_lang_ts_arrayLikeToArray(o, minLen); }

function TagTriggerArrayvue_type_script_lang_ts_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function TagTriggerArrayvue_type_script_lang_ts_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return TagTriggerArrayvue_type_script_lang_ts_arrayLikeToArray(arr); }

function TagTriggerArrayvue_type_script_lang_ts_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



/* harmony default export */ var TagTriggerArrayvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    type: {
      type: String,
      required: true
    },
    help: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    containerTriggers: {
      type: Array,
      required: true
    },
    modelValue: {
      type: Array,
      required: true
    }
  },
  components: {
    Field: external_CorePluginsAdmin_["Field"]
  },
  emits: ['update:modelValue', 'create', 'edit'],
  methods: {
    onChangeTrigger: function onChangeTrigger(idTrigger, index) {
      var newValue = TagTriggerArrayvue_type_script_lang_ts_toConsumableArray(this.modelValue);

      newValue[index] = parseInt(idTrigger, 10);
      this.$emit('update:modelValue', newValue);
    },
    removeTrigger: function removeTrigger(index) {
      var newValue = TagTriggerArrayvue_type_script_lang_ts_toConsumableArray(this.modelValue);

      newValue.splice(index, 1);
      this.$emit('update:modelValue', newValue);
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagTriggerArray.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagTriggerArray.vue



TagTriggerArrayvue_type_script_lang_ts.render = TagTriggerArrayvue_type_template_id_c1c05b4a_render

/* harmony default export */ var TagTriggerArray = (TagTriggerArrayvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Tag/TagDateInput.vue?vue&type=template&id=cd8af1f4

var TagDateInputvue_type_template_id_cd8af1f4_hoisted_1 = {
  class: "col s12 m6 input-field"
};
var TagDateInputvue_type_template_id_cd8af1f4_hoisted_2 = ["name", "id", "value"];
var TagDateInputvue_type_template_id_cd8af1f4_hoisted_3 = {
  class: "col s12 m6 input-field"
};
var TagDateInputvue_type_template_id_cd8af1f4_hoisted_4 = ["name", "id", "value"];
function TagDateInputvue_type_template_id_cd8af1f4_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagDateInputvue_type_template_id_cd8af1f4_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    ref: "dateInput",
    type: "text",
    name: "".concat(_ctx.name, "_date"),
    id: "".concat(_ctx.name, "_date"),
    class: "dateInput",
    value: _ctx.dateText,
    onKeydown: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.onDateKeydown($event);
    }),
    onChange: _cache[1] || (_cache[1] = function ($event) {
      return _ctx.onDateKeydown($event);
    })
  }, null, 40, TagDateInputvue_type_template_id_cd8af1f4_hoisted_2)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagDateInputvue_type_template_id_cd8af1f4_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    ref: "timeInput",
    type: "text",
    name: "".concat(_ctx.name, "_time"),
    id: "".concat(_ctx.name, "_time"),
    class: "timeInput",
    value: _ctx.timeText,
    onKeydown: _cache[2] || (_cache[2] = function ($event) {
      return _ctx.onTimeKeydown($event);
    })
  }, null, 40, TagDateInputvue_type_template_id_cd8af1f4_hoisted_4)])], 64);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagDateInput.vue?vue&type=template&id=cd8af1f4

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Tag/TagDateInput.vue?vue&type=script&lang=ts
/* eslint-disable @typescript-eslint/ban-ts-comment */



function prefixDateZeroIfNeeded(number) {
  var datePart = String(number);

  if (datePart.length === 1) {
    datePart = "0".concat(datePart);
  }

  return datePart;
}

function convertUtcToLocalDate(dateTime) {
  if (!dateTime) {
    return undefined;
  }

  var isoDate = dateTime;

  if (isoDate) {
    isoDate = "".concat(isoDate).replace(/-/g, '/');

    try {
      return new Date("".concat(isoDate, " UTC"));
    } catch (e) {
      try {
        return new Date(Date.parse("".concat(isoDate, " UTC")));
      } catch (ex) {
        // eg phantomjs etc
        var datePart = isoDate.substr(0, 10);
        var timePart = isoDate.substr(11);
        var dateParts = datePart.split('/');
        var timeParts = timePart.split(':');

        if (dateParts.length === 3 && timeParts.length === 3) {
          var result = new Date(parseInt(dateParts[0], 10), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[2], 10), parseInt(timeParts[0], 10), parseInt(timeParts[1], 10), parseInt(timeParts[2], 10));
          var newTime = result.getTime() + result.getTimezoneOffset() * 60000;
          return new Date(newTime);
        }
      }
    }
  }

  return undefined;
}

function convertUtcDateToLocalDatePart(isoDateTime) {
  var localStartDate = convertUtcToLocalDate(isoDateTime);

  if (localStartDate) {
    var month = prefixDateZeroIfNeeded(localStartDate.getMonth() + 1);
    var date = prefixDateZeroIfNeeded(localStartDate.getDate());
    return "".concat(localStartDate.getFullYear(), "-").concat(month, "-").concat(date);
  }

  var parts = isoDateTime.split(' ');
  return parts[0];
}

function convertUtcDateToLocalTimePart(isoDateTime) {
  var localStartDate = convertUtcToLocalDate(isoDateTime);

  if (localStartDate) {
    var hours = prefixDateZeroIfNeeded(localStartDate.getHours());
    var minutes = prefixDateZeroIfNeeded(localStartDate.getMinutes());
    var seconds = prefixDateZeroIfNeeded(localStartDate.getSeconds());
    return "".concat(hours, ":").concat(minutes, ":").concat(seconds);
  }

  var parts = isoDateTime.split(' ');
  return parts[1];
}

function convertLocalDateToUtc(strDate) {
  var dateTime = strDate;

  if (dateTime) {
    dateTime = dateTime.replace(/-/g, '/');
  }

  try {
    var localDate = new Date(dateTime);
    var month = prefixDateZeroIfNeeded(localDate.getUTCMonth() + 1);
    var date = prefixDateZeroIfNeeded(localDate.getUTCDate());
    var hours = prefixDateZeroIfNeeded(localDate.getUTCHours());
    var minutes = prefixDateZeroIfNeeded(localDate.getUTCMinutes());
    var seconds = prefixDateZeroIfNeeded(localDate.getUTCSeconds());
    var formatted = '';
    formatted += "".concat(localDate.getUTCFullYear(), "-").concat(month, "-").concat(date);
    formatted += ' ';
    formatted += "".concat(hours, ":").concat(minutes, ":").concat(seconds);
    return formatted;
  } catch (e) {
    return dateTime;
  }
}

var TagDateInputvue_type_script_lang_ts_window = window,
    TagDateInputvue_type_script_lang_ts_$ = TagDateInputvue_type_script_lang_ts_window.$;
/* harmony default export */ var TagDateInputvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    name: {
      type: String,
      required: true
    },
    defaultTime: {
      type: String,
      required: true
    },
    modelValue: String
  },
  mounted: function mounted() {
    var _this = this;

    var datePickerOptions = Object.assign(Object.assign({}, external_CoreHome_["Matomo"].getBaseDatePickerOptions(null)), {}, {
      minDate: new Date()
    });
    delete datePickerOptions.maxDate;
    TagDateInputvue_type_script_lang_ts_$(this.$refs.dateInput).datepicker(Object.assign({}, datePickerOptions)); // @ts-ignore

    TagDateInputvue_type_script_lang_ts_$(this.$refs.timeInput).timepicker({
      timeFormat: 'H:i:s'
    }) // timepicker triggers a jquery event, not a addEventListener event, so vue doesn't catch
    // it
    .on('change', function (event) {
      _this.onTimeKeydown(event);
    });
  },
  computed: {
    dateText: function dateText() {
      if (!this.modelValue) {
        return '';
      }

      return convertUtcDateToLocalDatePart(this.modelValue);
    },
    timeText: function timeText() {
      if (!this.modelValue) {
        return '';
      }

      return convertUtcDateToLocalTimePart(this.modelValue);
    }
  },
  methods: {
    onDateKeydown: function onDateKeydown(event) {
      var _this2 = this;

      setTimeout(function () {
        var value = event.target.value;

        if (_this2.dateText === value) {
          return;
        }

        _this2.onChange(value, _this2.timeText);
      });
    },
    onTimeKeydown: function onTimeKeydown(event) {
      var _this3 = this;

      setTimeout(function () {
        var value = event.target.value;

        if (_this3.timeText === value) {
          return;
        }

        _this3.onChange(_this3.dateText, value);
      });
    },
    onChange: function onChange(date, time) {
      if (!date) {
        this.$emit('update:model-value', null);
        return;
      }

      var timeToUse = time || this.defaultTime;
      var newDate = convertLocalDateToUtc("".concat(date, " ").concat(timeToUse));
      this.$emit('update:model-value', newDate);
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagDateInput.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagDateInput.vue



TagDateInputvue_type_script_lang_ts.render = TagDateInputvue_type_template_id_cd8af1f4_render

/* harmony default export */ var TagDateInput = (TagDateInputvue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/Tags.store.ts
function Tags_store_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Tags_store_typeof = function _typeof(obj) { return typeof obj; }; } else { Tags_store_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Tags_store_typeof(obj); }

function Tags_store_slicedToArray(arr, i) { return Tags_store_arrayWithHoles(arr) || Tags_store_iterableToArrayLimit(arr, i) || Tags_store_unsupportedIterableToArray(arr, i) || Tags_store_nonIterableRest(); }

function Tags_store_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Tags_store_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Tags_store_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Tags_store_toConsumableArray(arr) { return Tags_store_arrayWithoutHoles(arr) || Tags_store_iterableToArray(arr) || Tags_store_unsupportedIterableToArray(arr) || Tags_store_nonIterableSpread(); }

function Tags_store_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Tags_store_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Tags_store_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Tags_store_arrayLikeToArray(o, minLen); }

function Tags_store_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function Tags_store_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return Tags_store_arrayLikeToArray(arr); }

function Tags_store_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Tags_store_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Tags_store_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Tags_store_createClass(Constructor, protoProps, staticProps) { if (protoProps) Tags_store_defineProperties(Constructor.prototype, protoProps); if (staticProps) Tags_store_defineProperties(Constructor, staticProps); return Constructor; }

function Tags_store_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */



var Tags_store_TagsStore = /*#__PURE__*/function () {
  function TagsStore() {
    var _this = this;

    Tags_store_classCallCheck(this, TagsStore);

    Tags_store_defineProperty(this, "privateState", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      tags: [],
      isLoadingTags: false,
      isLoadingSingle: false,
      isUpdating: false
    }));

    Tags_store_defineProperty(this, "state", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(_this.privateState);
    }));

    Tags_store_defineProperty(this, "isLoading", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      var state = _this.state.value;
      return state.isLoadingTags || state.isLoadingSingle;
    }));

    Tags_store_defineProperty(this, "isUpdating", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return _this.state.value.isUpdating;
    }));

    Tags_store_defineProperty(this, "tags", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return _this.state.value.tags;
    }));

    Tags_store_defineProperty(this, "fetchPromise", null);

    Tags_store_defineProperty(this, "availableTagsPromises", {});
  }

  Tags_store_createClass(TagsStore, [{
    key: "fetchTags",
    value: function fetchTags(idContainer, idContainerVersion) {
      var _this2 = this;

      this.privateState.isLoadingTags = true;
      this.privateState.tags = [];

      if (!this.fetchPromise) {
        this.fetchPromise = external_CoreHome_["AjaxHelper"].fetch({
          method: 'TagManager.getContainerTags',
          idContainer: idContainer,
          idContainerVersion: idContainerVersion,
          filter_limit: '-1'
        });
      }

      return Promise.resolve(this.fetchPromise).then(function (tags) {
        _this2.privateState.tags = tags;
        _this2.privateState.isLoadingTags = false;
        return _this2.tags.value;
      }).finally(function () {
        _this2.privateState.isLoadingTags = false;
      });
    }
  }, {
    key: "reload",
    value: function reload(idContainer, idContainerVersion) {
      this.privateState.tags = [];
      this.fetchPromise = null;
      this.availableTagsPromises = {};
      return this.fetchTags(idContainer, idContainerVersion);
    }
  }, {
    key: "findTag",
    value: function findTag(idContainer, idContainerVersion, idTag) {
      var _this3 = this;

      // before going through an API request we first try to find it in loaded variables
      var found = this.tags.value.find(function (v) {
        return v.idtag === idTag;
      });

      if (found) {
        return Promise.resolve(found);
      } // otherwise we fetch it via API


      this.privateState.isLoadingSingle = true;
      return external_CoreHome_["AjaxHelper"].fetch({
        idTag: idTag,
        idContainer: idContainer,
        idContainerVersion: idContainerVersion,
        method: 'TagManager.getContainerTag',
        filter_limit: '-1'
      }).then(function (record) {
        _this3.privateState.tags = [].concat(Tags_store_toConsumableArray(_this3.privateState.tags), [record]);
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(record);
      }).finally(function () {
        _this3.privateState.isLoadingSingle = false;
      });
    }
  }, {
    key: "fetchAvailableTags",
    value: function fetchAvailableTags(idContext) {
      if (!this.availableTagsPromises[idContext]) {
        this.availableTagsPromises[idContext] = external_CoreHome_["AjaxHelper"].fetch({
          method: 'TagManager.getAvailableTagTypesInContext',
          idContext: idContext,
          filter_limit: '-1'
        }).then(function (tags) {
          return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(tags);
        });
      }

      return Promise.resolve(this.availableTagsPromises[idContext]);
    }
  }, {
    key: "createOrUpdateTag",
    value: function createOrUpdateTag(tag, method, idContainer, idContainerVersion, parameterValues, fireTriggerIds, blockTriggerIds) {
      var _this4 = this;

      this.privateState.isUpdating = true;
      var mappedEntries = Object.entries(parameterValues).map(function (_ref) {
        var _ref2 = Tags_store_slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        var newValue = value;

        if (typeof value === 'boolean') {
          newValue = (+value).toString();
        }

        return [key, newValue];
      });
      var parameters = Object.fromEntries(mappedEntries);
      return external_CoreHome_["AjaxHelper"].post({
        idTag: tag.idtag,
        method: method,
        idContainer: idContainer,
        idContainerVersion: idContainerVersion,
        type: tag.type,
        name: tag.name,
        description: tag.description,
        startDate: tag.start_date,
        endDate: tag.end_date,
        fireLimit: tag.fire_limit,
        fireDelay: tag.fire_delay,
        priority: tag.priority
      }, {
        parameters: parameters,
        fireTriggerIds: fireTriggerIds,
        blockTriggerIds: blockTriggerIds
      }, {
        withTokenInUrl: true
      }).finally(function () {
        _this4.privateState.isUpdating = false;
      });
    }
  }, {
    key: "deleteTag",
    value: function deleteTag(idContainer, idContainerVersion, idTag) {
      var _this5 = this;

      this.privateState.isUpdating = true;
      this.privateState.tags = [];
      return external_CoreHome_["AjaxHelper"].fetch({
        idTag: idTag,
        idContainerVersion: idContainerVersion,
        idContainer: idContainer,
        method: 'TagManager.deleteContainerTag'
      }, {
        withTokenInUrl: true
      }).finally(function () {
        _this5.privateState.isUpdating = false;
      });
    }
  }, {
    key: "suggestNameForType",
    value: function suggestNameForType(templateId) {
      var _this6 = this;

      var _loop = function _loop(counter) {
        var name = templateId;

        if (counter) {
          name = "".concat(name, " (").concat(counter, ")");
        }

        var isFree = !_this6.tags.value.some(function (v) {
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

        if (Tags_store_typeof(_ret) === "object") return _ret.v;
      }

      return undefined;
    }
  }]);

  return TagsStore;
}();

/* harmony default export */ var Tags_store = (new Tags_store_TagsStore());
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Tag/TagEdit.vue?vue&type=script&lang=ts
function TagEditvue_type_script_lang_ts_toConsumableArray(arr) { return TagEditvue_type_script_lang_ts_arrayWithoutHoles(arr) || TagEditvue_type_script_lang_ts_iterableToArray(arr) || TagEditvue_type_script_lang_ts_unsupportedIterableToArray(arr) || TagEditvue_type_script_lang_ts_nonIterableSpread(); }

function TagEditvue_type_script_lang_ts_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function TagEditvue_type_script_lang_ts_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return TagEditvue_type_script_lang_ts_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return TagEditvue_type_script_lang_ts_arrayLikeToArray(o, minLen); }

function TagEditvue_type_script_lang_ts_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function TagEditvue_type_script_lang_ts_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return TagEditvue_type_script_lang_ts_arrayLikeToArray(arr); }

function TagEditvue_type_script_lang_ts_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }










function getCurrentTime() {
  var date = new Date();

  if (date && date.toString) {
    return date.toString();
  }

  return null;
}

var TagEditvue_type_script_lang_ts_window = window,
    TagEditvue_type_script_lang_ts_$ = TagEditvue_type_script_lang_ts_window.$,
    TagEditvue_type_script_lang_ts_tagManagerHelper = TagEditvue_type_script_lang_ts_window.tagManagerHelper;
var TagEditvue_type_script_lang_ts_notificationId = 'tagtagmanagement';
/* harmony default export */ var TagEditvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idTag: Number,
    idContainer: {
      type: String,
      required: true
    },
    idContainerVersion: {
      type: Number,
      required: true
    },
    newTagType: null
  },
  components: {
    TagDateInput: TagDateInput,
    ContentBlock: external_CoreHome_["ContentBlock"],
    Field: external_CorePluginsAdmin_["Field"],
    SaveButton: external_CorePluginsAdmin_["SaveButton"],
    GroupedSettings: external_CorePluginsAdmin_["GroupedSettings"],
    TagTriggerArray: TagTriggerArray
  },
  data: function data() {
    return {
      isDirty: false,
      showAdvanced: false,
      chooseTagType: false,
      availableTags: [],
      containerTriggers: [],
      currentTime: null,
      tag: {},
      editTitle: '',
      parameterValues: {},
      isUpdatingTag: false,
      fireTriggers: [],
      blockTriggers: [],
      currentTimeTimeout: null
    };
  },
  created: function created() {
    var _this = this;

    AvailableFireLimit_store.init();
    this.updateAvailableTriggers();
    this.setCurrentTime();
    Tags_store.reload(this.idContainer, this.idContainerVersion).then(function () {
      _this.initIdTag();
    });
  },
  unmounted: function unmounted() {
    if (this.currentTimeTimeout) {
      clearTimeout(this.currentTimeTimeout);
    }
  },
  watch: {
    idTag: function idTag(newValue) {
      if (newValue === null) {
        return;
      }

      this.initIdTag();
    }
  },
  methods: {
    setCurrentTime: function setCurrentTime() {
      this.currentTime = getCurrentTime();
      this.currentTimeTimeout = setTimeout(this.setCurrentTime.bind(this), 10000);
    },
    updateAvailableTriggers: function updateAvailableTriggers() {
      var _this2 = this;

      external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainerTriggers',
        idContainer: this.idContainer,
        idContainerVersion: this.idContainerVersion,
        filter_limit: '-1'
      }).then(function (triggers) {
        _this2.containerTriggers = triggers.map(function (t) {
          return {
            key: t.idtrigger,
            value: t.name
          };
        });
      });
    },
    removeAnyTagNotification: function removeAnyTagNotification() {
      external_CoreHome_["NotificationsStore"].remove(TagEditvue_type_script_lang_ts_notificationId);
      external_CoreHome_["NotificationsStore"].remove('ajaxHelper');
    },
    showNotification: function showNotification(message, context) {
      var instanceId = external_CoreHome_["NotificationsStore"].show({
        message: message,
        context: context,
        id: TagEditvue_type_script_lang_ts_notificationId,
        type: 'transient'
      });
      setTimeout(function () {
        external_CoreHome_["NotificationsStore"].scrollToNotification(instanceId);
      }, 200);
    },
    showErrorFieldNotProvidedNotification: function showErrorFieldNotProvidedNotification(title) {
      var message = Object(external_CoreHome_["translate"])('TagManager_ErrorXNotProvided', [title]);
      this.showNotification(message, 'error');
    },
    initIdTag: function initIdTag() {
      var _this3 = this;

      this.tag = {};
      this.chooseTagType = false;
      this.editTitle = '';
      external_CoreHome_["Matomo"].helper.lazyScrollToContent();
      this.availableTags = [];
      external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainer',
        idContainer: this.idContainer,
        filter_limit: '-1'
      }).then(function (container) {
        return Tags_store.fetchAvailableTags(container.context);
      }).then(function (tags) {
        _this3.availableTags = tags;
      }).then(function () {
        if (_this3.edit && _this3.idTag) {
          _this3.editTitle = Object(external_CoreHome_["translate"])('TagManager_EditTag');
          Tags_store.findTag(_this3.idContainer, _this3.idContainerVersion, _this3.idTag).then(function (tag) {
            if (!tag) {
              return;
            }

            _this3.tag = Object(external_CoreHome_["clone"])(tag);
            _this3.parameterValues = Object.fromEntries(tag.typeMetadata.parameters.map(function (s) {
              return [s.name, s.value];
            }));
            _this3.blockTriggers = TagEditvue_type_script_lang_ts_toConsumableArray(_this3.tag.block_trigger_ids || []);

            if (!_this3.blockTriggers.length) {
              _this3.blockTriggers.push(null);
            }

            _this3.fireTriggers = TagEditvue_type_script_lang_ts_toConsumableArray(_this3.tag.fire_trigger_ids || []);

            if (!_this3.fireTriggers.length) {
              _this3.fireTriggers.push(null);
            }

            _this3.onFireTriggerChange();

            _this3.onBlockTriggerChange();

            _this3.isDirty = false;
          });
          return;
        }

        if (_this3.create) {
          _this3.editTitle = Object(external_CoreHome_["translate"])('TagManager_ChooseTagToContinue');
          _this3.chooseTagType = true;
        }
      });
    },
    onCreateNewBlockTrigger: function onCreateNewBlockTrigger() {
      var _this4 = this;

      this.openEditTrigger(function (trigger) {
        var indexLastEntry = _this4.blockTriggers.length - 1;

        if (!_this4.blockTriggers[indexLastEntry]) {
          _this4.blockTriggers[indexLastEntry] = trigger.idtrigger;
        } else {
          _this4.blockTriggers.push(trigger.idtrigger);
        }

        _this4.onBlockTriggerChange();
      }, 0);
    },
    onCreateNewFireTrigger: function onCreateNewFireTrigger() {
      var _this5 = this;

      this.openEditTrigger(function (trigger) {
        var indexLastEntry = _this5.fireTriggers.length - 1;

        if (!_this5.fireTriggers[indexLastEntry]) {
          _this5.fireTriggers[indexLastEntry] = trigger.idtrigger;
        } else {
          _this5.fireTriggers.push(trigger.idtrigger);
        }

        _this5.onFireTriggerChange();
      }, 0);
    },
    editTrigger: function editTrigger(idTrigger) {
      this.openEditTrigger(function () {
        return null;
      }, idTrigger);
    },
    openEditTrigger: function openEditTrigger(callback, idTag) {
      var _this6 = this;

      TagEditvue_type_script_lang_ts_tagManagerHelper.editTrigger(null, this.idContainer, this.idContainerVersion, idTag, function (trigger) {
        _this6.updateAvailableTriggers();

        callback(trigger);
      });
    },
    onBlockTriggerChange: function onBlockTriggerChange() {
      var hasAll = this.blockTriggers.every(function (t) {
        return !!t;
      });

      if (hasAll) {
        this.addBlockTrigger();
      }
    },
    addBlockTrigger: function addBlockTrigger() {
      this.blockTriggers.push(null);
      this.isDirty = true;
    },
    removeBlockTrigger: function removeBlockTrigger(index) {
      if (index > -1) {
        var lastIndex = this.blockTriggers.length - 1;

        if (lastIndex === index) {
          this.blockTriggers[index] = null;
        } else {
          this.blockTriggers.splice(index, 1);
        }

        this.isDirty = true;
      }
    },
    onFireTriggerChange: function onFireTriggerChange() {
      var hasAll = this.fireTriggers.every(function (t) {
        return !!t;
      });

      if (hasAll) {
        this.addFireTrigger();
      }
    },
    addFireTrigger: function addFireTrigger() {
      this.fireTriggers.push(null);
      this.isDirty = true;
    },
    removeFireTrigger: function removeFireTrigger(index) {
      if (index > -1) {
        var lastIndex = this.fireTriggers.length - 1;

        if (lastIndex === index) {
          this.fireTriggers[index] = null;
        } else {
          this.fireTriggers.splice(index, 1);
        }

        this.isDirty = true;
      }
    },
    createTagType: function createTagType(tagTemplate) {
      var _this7 = this;

      if (tagTemplate && this.isTagTemplateDisabled[tagTemplate.id]) {
        return;
      }

      this.chooseTagType = false;
      this.editTitle = Object(external_CoreHome_["translate"])('TagManager_CreateNewTag');
      this.tag = {
        idsite: parseInt("".concat(external_CoreHome_["Matomo"].idSite), 10),
        name: Tags_store.suggestNameForType(tagTemplate.name) || '',
        type: tagTemplate.id,
        fire_limit: 'unlimited',
        priority: 999,
        fire_delay: 0,
        typeMetadata: tagTemplate
      };
      this.blockTriggers = [null];
      this.fireTriggers = [null];
      this.parameterValues = Object.fromEntries(tagTemplate.parameters.map(function (s) {
        return [s.name, s.value];
      }));
      this.isDirty = false;
      setTimeout(function () {
        var editTag = TagEditvue_type_script_lang_ts_$(_this7.$refs.root);

        if (editTag.length && editTag[0]) {
          editTag[0].scrollIntoView();
        }

        editTag.find('#name').focus();
      }, 1);
    },
    cancel: function cancel() {
      var newParams = Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value);
      delete newParams.idTag;
      external_CoreHome_["MatomoUrl"].updateHash(newParams);
    },
    createTag: function createTag() {
      var _this8 = this;

      this.removeAnyTagNotification();

      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }

      this.isUpdatingTag = true;
      Tags_store.createOrUpdateTag(this.tag, 'TagManager.addContainerTag', this.idContainer, this.idContainerVersion, this.parameterValues, this.fireTriggers.filter(function (id) {
        return !!id;
      }), this.blockTriggers.filter(function (id) {
        return !!id;
      })).then(function (response) {
        if (!response) {
          return;
        }

        _this8.isDirty = false;
        var idTag = response.value;
        Tags_store.reload(_this8.idContainer, _this8.idContainerVersion).then(function () {
          external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
            idTag: idTag
          }));
          setTimeout(function () {
            var createdX = Object(external_CoreHome_["translate"])('TagManager_CreatedX', Object(external_CoreHome_["translate"])('TagManager_Tag'));
            var wantToRedeploy = Object(external_CoreHome_["translate"])('TagManager_WantToDeployThisChangeCreateVersion', '<a class="createNewVersionLink">', '</a>');

            _this8.showNotification("".concat(createdX, " ").concat(wantToRedeploy), 'success');
          }, 200);
        });
      }).finally(function () {
        _this8.isUpdatingTag = false;
      });
    },
    setValueHasChanged: function setValueHasChanged() {
      this.isDirty = true;
    },
    updateTag: function updateTag() {
      var _this9 = this;

      this.removeAnyTagNotification();

      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }

      this.isUpdatingTag = true;
      Tags_store.createOrUpdateTag(this.tag, 'TagManager.updateContainerTag', this.idContainer, this.idContainerVersion, this.parameterValues, this.fireTriggers.filter(function (id) {
        return !!id;
      }), this.blockTriggers.filter(function (id) {
        return !!id;
      })).then(function (response) {
        if (!response) {
          return;
        }

        _this9.isDirty = false;
        Tags_store.reload(_this9.idContainer, _this9.idContainerVersion).then(function () {
          _this9.initIdTag();
        });
        var updatedAt = Object(external_CoreHome_["translate"])('TagManager_UpdatedX', Object(external_CoreHome_["translate"])('TagManager_Tag'));
        var wantToDeploy = Object(external_CoreHome_["translate"])('TagManager_WantToDeployThisChangeCreateVersion', '<a class="createNewVersionLink">', '</a>');

        _this9.showNotification("".concat(updatedAt, " ").concat(wantToDeploy), 'success');
      }).finally(function () {
        _this9.isUpdatingTag = false;
      });
    },
    checkRequiredFieldsAreSet: function checkRequiredFieldsAreSet() {
      if (!this.tag.name) {
        var title = Object(external_CoreHome_["translate"])('General_Name');
        this.showErrorFieldNotProvidedNotification(title);
        return false;
      }

      if (!this.fireTriggers || !this.fireTriggers.length) {
        this.showNotification(Object(external_CoreHome_["translate"])('TagManager_TagFireTriggerRequirement'), 'error');
        return false;
      }

      return true;
    }
  },
  computed: {
    availableFireLimits: function availableFireLimits() {
      return AvailableFireLimit_store.fireLimitsOptions.value;
    },
    isLoading: function isLoading() {
      return Triggers_store.isLoading.value || AvailableFireLimit_store.isLoading.value;
    },
    isUpdating: function isUpdating() {
      return Triggers_store.isUpdating.value || this.isUpdatingTag;
    },
    create: function create() {
      return this.idTag === 0;
    },
    edit: function edit() {
      return !this.create;
    },
    canUseCustomTemplates: function canUseCustomTemplates() {
      return external_CoreHome_["Matomo"].hasUserCapability('tagmanager_use_custom_templates');
    },
    isTagDisabled: function isTagDisabled() {
      var _this$tag$typeMetadat;

      return !this.canUseCustomTemplates && ((_this$tag$typeMetadat = this.tag.typeMetadata) === null || _this$tag$typeMetadat === void 0 ? void 0 : _this$tag$typeMetadat.isCustomTemplate);
    },
    isTagTemplateDisabled: function isTagTemplateDisabled() {
      var _this10 = this;

      var result = {};
      this.availableTags.forEach(function (tagCategory) {
        tagCategory.types.forEach(function (tag) {
          result[tag.id] = !_this10.canUseCustomTemplates && tag.isCustomTemplate;
        });
      });
      return result;
    },
    collectionItemAvatarText: function collectionItemAvatarText() {
      return Object(external_CoreHome_["translate"])('TagManager_UseCustomTemplateCapabilityRequired', Object(external_CoreHome_["translate"])('TagManager_CapabilityUseCustomTemplates'));
    },
    fireLimitHelp: function fireLimitHelp() {
      return Object(external_CoreHome_["translate"])('TagManager_FireLimitHelp', Object(external_CoreHome_["translate"])('TagManager_Unlimited'), Object(external_CoreHome_["translate"])('TagManager_OncePage'), Object(external_CoreHome_["translate"])('TagManager_Once24Hours'), Object(external_CoreHome_["translate"])('TagManager_OnceLifetime'));
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagEdit.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagEdit.vue



TagEditvue_type_script_lang_ts.render = TagEditvue_type_template_id_5ee639e0_render

/* harmony default export */ var TagEdit = (TagEditvue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagEdit.adapter.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


/* harmony default export */ var TagEdit_adapter = (Object(external_CoreHome_["createAngularJsAdapter"])({
  component: TagEdit,
  scope: {
    idTag: {
      angularJsBind: '='
    },
    idContainer: {
      angularJsBind: '='
    },
    idContainerVersion: {
      angularJsBind: '='
    },
    newTagType: {
      angularJsBind: '='
    }
  },
  directiveName: 'piwikTagEdit'
}));
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Tag/TagList.vue?vue&type=template&id=03e7a1b4

var TagListvue_type_template_id_03e7a1b4_hoisted_1 = {
  class: "tagManagerManageList tagManagerTagList"
};
var TagListvue_type_template_id_03e7a1b4_hoisted_2 = ["title"];
var TagListvue_type_template_id_03e7a1b4_hoisted_3 = ["title"];
var TagListvue_type_template_id_03e7a1b4_hoisted_4 = ["title"];
var TagListvue_type_template_id_03e7a1b4_hoisted_5 = ["title"];
var TagListvue_type_template_id_03e7a1b4_hoisted_6 = ["title"];
var TagListvue_type_template_id_03e7a1b4_hoisted_7 = ["title"];
var TagListvue_type_template_id_03e7a1b4_hoisted_8 = {
  colspan: "5"
};
var TagListvue_type_template_id_03e7a1b4_hoisted_9 = {
  class: "loadingPiwik"
};

var TagListvue_type_template_id_03e7a1b4_hoisted_10 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);

var TagListvue_type_template_id_03e7a1b4_hoisted_11 = {
  colspan: "5"
};
var TagListvue_type_template_id_03e7a1b4_hoisted_12 = ["id"];
var TagListvue_type_template_id_03e7a1b4_hoisted_13 = {
  class: "name"
};
var TagListvue_type_template_id_03e7a1b4_hoisted_14 = ["title"];
var TagListvue_type_template_id_03e7a1b4_hoisted_15 = ["title"];
var TagListvue_type_template_id_03e7a1b4_hoisted_16 = {
  class: "triggers"
};
var TagListvue_type_template_id_03e7a1b4_hoisted_17 = ["onClick"];
var TagListvue_type_template_id_03e7a1b4_hoisted_18 = {
  key: 1,
  class: "chip"
};
var TagListvue_type_template_id_03e7a1b4_hoisted_19 = ["onClick"];
var TagListvue_type_template_id_03e7a1b4_hoisted_20 = ["title"];
var TagListvue_type_template_id_03e7a1b4_hoisted_21 = {
  class: "action"
};
var TagListvue_type_template_id_03e7a1b4_hoisted_22 = ["onClick", "title"];
var TagListvue_type_template_id_03e7a1b4_hoisted_23 = ["onClick", "title"];
var TagListvue_type_template_id_03e7a1b4_hoisted_24 = {
  class: "tableActionBar"
};

var TagListvue_type_template_id_03e7a1b4_hoisted_25 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, null, -1);

var TagListvue_type_template_id_03e7a1b4_hoisted_26 = {
  class: "ui-confirm",
  id: "confirmDeleteTag",
  ref: "confirmDeleteTag"
};
var TagListvue_type_template_id_03e7a1b4_hoisted_27 = ["value"];
var TagListvue_type_template_id_03e7a1b4_hoisted_28 = ["value"];
function TagListvue_type_template_id_03e7a1b4_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _this = this;

  var _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");

  var _directive_content_table = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("content-table");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", TagListvue_type_template_id_03e7a1b4_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: "Tag Manager",
    "content-title": _ctx.translate('TagManager_ManageX', _ctx.translate('TagManager_Tags')),
    "help-text": _ctx.tagsHelpText
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_TagUsageBenefits')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("table", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
        class: "name",
        title: _ctx.nameTranslatedText
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Name')), 9, TagListvue_type_template_id_03e7a1b4_hoisted_2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
        class: "description",
        title: _ctx.descriptionTranslatedText
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Description')), 9, TagListvue_type_template_id_03e7a1b4_hoisted_3), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
        class: "type",
        title: _ctx.typeTranslatedText
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Type')), 9, TagListvue_type_template_id_03e7a1b4_hoisted_4), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
        class: "triggers",
        title: _ctx.triggersTranslatedText
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Triggers')), 9, TagListvue_type_template_id_03e7a1b4_hoisted_5), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
        class: "lastUpdated",
        title: _ctx.lastUpdatedTranslatedText
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_LastUpdated')), 9, TagListvue_type_template_id_03e7a1b4_hoisted_6), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
        class: "action",
        title: _ctx.actionTranslatedText
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Actions')), 9, TagListvue_type_template_id_03e7a1b4_hoisted_7), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", TagListvue_type_template_id_03e7a1b4_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", TagListvue_type_template_id_03e7a1b4_hoisted_9, [TagListvue_type_template_id_03e7a1b4_hoisted_10, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_LoadingData')), 1)])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isLoading || _ctx.isUpdating]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", TagListvue_type_template_id_03e7a1b4_hoisted_11, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_NoTagsFound')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "createContainerTagNow",
        onClick: _cache[0] || (_cache[0] = function ($event) {
          return _ctx.createTag();
        })
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewTagNow')), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isLoading && _ctx.tags.length === 0]]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.sortedTags, function (tag) {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
          class: "tags",
          key: tag.idtag,
          id: "tag".concat(tag.idtag)
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", TagListvue_type_template_id_03e7a1b4_hoisted_13, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(tag.name), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
          class: "description",
          title: tag.description
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.truncateText(tag.description, 30)), 9, TagListvue_type_template_id_03e7a1b4_hoisted_14), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
          class: "type",
          title: tag.typeMetadata.description
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(tag.typeMetadata.name), 9, TagListvue_type_template_id_03e7a1b4_hoisted_15), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", TagListvue_type_template_id_03e7a1b4_hoisted_16, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(tag.fire_trigger_ids, function (fireTriggerId, fireTriggerIndex) {
          return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
            key: fireTriggerIndex,
            style: {
              "margin-right": "3.5px"
            }
          }, [_ctx.hasWriteAccess ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
            key: 0,
            style: {
              "display": "inline-block",
              "vertical-align": "top !important"
            },
            class: "chip",
            href: "",
            onClick: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function ($event) {
              return _ctx.editTrigger(fireTriggerId);
            }, ["prevent"])
          }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_this.triggers[fireTriggerId]), 9, TagListvue_type_template_id_03e7a1b4_hoisted_17)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), !_ctx.hasWriteAccess ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", TagListvue_type_template_id_03e7a1b4_hoisted_18, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_this.triggers[fireTriggerId]), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
        }), 128)), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Except')) + ": ", 1), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(tag.block_trigger_ids, function (blockTriggerId, index) {
          return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
            key: index,
            style: {
              "margin-right": "3.5px"
            }
          }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
            class: "chip",
            href: "",
            onClick: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function ($event) {
              return _ctx.editTrigger(blockTriggerId);
            }, ["prevent"])
          }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_this.triggers[blockTriggerId]), 9, TagListvue_type_template_id_03e7a1b4_hoisted_19), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
            class: "chip"
          }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_this.triggers[blockTriggerId]), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.hasWriteAccess]])]);
        }), 128))], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], tag.block_trigger_ids.length]])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
          class: "lastUpdated",
          title: _ctx.translate('TagManager_CreatedOnX', tag.created_date_pretty)
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(tag.updated_date_pretty), 1)], 8, TagListvue_type_template_id_03e7a1b4_hoisted_20), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", TagListvue_type_template_id_03e7a1b4_hoisted_21, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
          class: "table-action icon-edit",
          onClick: function onClick($event) {
            return _ctx.editTag(tag.idtag, tag.type);
          },
          title: _ctx.translate('TagManager_EditTag')
        }, null, 8, TagListvue_type_template_id_03e7a1b4_hoisted_22), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
          class: "table-action icon-delete",
          onClick: function onClick($event) {
            return _ctx.deleteTag(tag);
          },
          title: _ctx.translate('TagManager_DeleteX', _ctx.translate('TagManager_Tag'))
        }, null, 8, TagListvue_type_template_id_03e7a1b4_hoisted_23)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])], 8, TagListvue_type_template_id_03e7a1b4_hoisted_12);
      }), 128))])], 512), [[_directive_content_table]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagListvue_type_template_id_03e7a1b4_hoisted_24, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "createNewTag",
        value: "",
        onClick: _cache[1] || (_cache[1] = function ($event) {
          return _ctx.createTag();
        })
      }, [TagListvue_type_template_id_03e7a1b4_hoisted_25, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewTag')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])];
    }),
    _: 1
  }, 8, ["content-title", "help-text"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagListvue_type_template_id_03e7a1b4_hoisted_26, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_DeleteTagConfirm')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "yes",
    type: "button",
    value: _ctx.translate('General_Yes')
  }, null, 8, TagListvue_type_template_id_03e7a1b4_hoisted_27), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "no",
    type: "button",
    value: _ctx.translate('General_No')
  }, null, 8, TagListvue_type_template_id_03e7a1b4_hoisted_28)], 512)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagList.vue?vue&type=template&id=03e7a1b4

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Tag/TagList.vue?vue&type=script&lang=ts
function TagListvue_type_script_lang_ts_toConsumableArray(arr) { return TagListvue_type_script_lang_ts_arrayWithoutHoles(arr) || TagListvue_type_script_lang_ts_iterableToArray(arr) || TagListvue_type_script_lang_ts_unsupportedIterableToArray(arr) || TagListvue_type_script_lang_ts_nonIterableSpread(); }

function TagListvue_type_script_lang_ts_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function TagListvue_type_script_lang_ts_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return TagListvue_type_script_lang_ts_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return TagListvue_type_script_lang_ts_arrayLikeToArray(o, minLen); }

function TagListvue_type_script_lang_ts_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function TagListvue_type_script_lang_ts_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return TagListvue_type_script_lang_ts_arrayLikeToArray(arr); }

function TagListvue_type_script_lang_ts_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





var TagListvue_type_script_lang_ts_window = window,
    TagListvue_type_script_lang_ts_tagManagerHelper = TagListvue_type_script_lang_ts_window.tagManagerHelper;
/* harmony default export */ var TagListvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idContainer: {
      type: String,
      required: true
    },
    idContainerVersion: {
      type: Number,
      required: true
    },
    tagsHelpText: String
  },
  components: {
    ContentBlock: external_CoreHome_["ContentBlock"]
  },
  directives: {
    ContentTable: external_CoreHome_["ContentTable"]
  },
  data: function data() {
    return {
      hasWriteAccess: external_CoreHome_["Matomo"].hasUserCapability('tagmanager_write')
    };
  },
  created: function created() {
    var _this = this;

    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["watch"])(function () {
      return Tags_store.tags.value;
    }, function () {
      _this.reloadTriggers();
    });
    this.reloadTriggers();
    Tags_store.fetchTags(this.idContainer, this.idContainerVersion);
  },
  methods: {
    reloadTriggers: function reloadTriggers() {
      Triggers_store.reload(this.idContainer, this.idContainerVersion);
    },
    createTag: function createTag() {
      this.editTag(0);
    },
    editTrigger: function editTrigger(idTrigger) {
      var _this2 = this;

      TagListvue_type_script_lang_ts_tagManagerHelper.editTrigger(null, this.idContainer, this.idContainerVersion, idTrigger, function () {
        _this2.reloadTriggers();
      });
    },
    editTag: function editTag(idTag) {
      external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
        idTag: idTag
      }));
    },
    deleteTag: function deleteTag(tag) {
      var _this3 = this;

      var doDelete = function doDelete() {
        Tags_store.deleteTag(_this3.idContainer, _this3.idContainerVersion, tag.idtag).then(function () {
          Tags_store.reload(_this3.idContainer, _this3.idContainerVersion);
        });
      };

      external_CoreHome_["Matomo"].helper.modalConfirm('#confirmDeleteTag', {
        yes: doDelete
      });
    },
    truncateText: function truncateText(text, length) {
      return TagListvue_type_script_lang_ts_tagManagerHelper.truncateText(text, length);
    }
  },
  computed: {
    triggers: function triggers() {
      var triggers = {};
      Triggers_store.triggers.value.forEach(function (t) {
        triggers["".concat(t.idtrigger)] = t.name;
      });
      return triggers;
    },
    isLoading: function isLoading() {
      return Tags_store.isLoading.value;
    },
    isUpdating: function isUpdating() {
      return Tags_store.isUpdating.value;
    },
    tags: function tags() {
      return Tags_store.tags.value;
    },
    sortedTags: function sortedTags() {
      var sorted = TagListvue_type_script_lang_ts_toConsumableArray(this.tags);

      sorted.sort(function (lhs, rhs) {
        if (lhs.name < rhs.name) {
          return -1;
        }

        return lhs.name > rhs.name ? 1 : 0;
      });
      return sorted;
    },
    nameTranslatedText: function nameTranslatedText() {
      return this.translate('TagManager_TagsNameDescription');
    },
    descriptionTranslatedText: function descriptionTranslatedText() {
      return this.translate('TagManager_TagsDescriptionDescription');
    },
    typeTranslatedText: function typeTranslatedText() {
      return this.translate('TagManager_TagsTypeDescription');
    },
    triggersTranslatedText: function triggersTranslatedText() {
      return this.translate('TagManager_TagsTriggersDescription');
    },
    lastUpdatedTranslatedText: function lastUpdatedTranslatedText() {
      return this.translate('TagManager_TagsLastUpdatedDescription');
    },
    actionTranslatedText: function actionTranslatedText() {
      return this.translate('TagManager_TagsActionDescription');
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagList.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagList.vue



TagListvue_type_script_lang_ts.render = TagListvue_type_template_id_03e7a1b4_render

/* harmony default export */ var TagList = (TagListvue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagList.adapter.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


/* harmony default export */ var TagList_adapter = (Object(external_CoreHome_["createAngularJsAdapter"])({
  component: TagList,
  scope: {
    idContainer: {
      angularJsBind: '='
    },
    idContainerVersion: {
      angularJsBind: '='
    }
  },
  directiveName: 'piwikTagList'
}));
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Tag/TagManage.vue?vue&type=template&id=02e1fe94

var TagManagevue_type_template_id_02e1fe94_hoisted_1 = {
  class: "manageTag"
};
var TagManagevue_type_template_id_02e1fe94_hoisted_2 = {
  key: 0
};
var TagManagevue_type_template_id_02e1fe94_hoisted_3 = {
  key: 1
};
function TagManagevue_type_template_id_02e1fe94_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_TagList = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("TagList");

  var _component_TagEdit = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("TagEdit");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", TagManagevue_type_template_id_02e1fe94_hoisted_1, [!_ctx.editMode ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", TagManagevue_type_template_id_02e1fe94_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_TagList, {
    "id-container": _ctx.idContainer,
    "id-container-version": _ctx.idContainerVersion,
    "tags-help-text": _ctx.tagsHelpText
  }, null, 8, ["id-container", "id-container-version", "tags-help-text"])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.editMode ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", TagManagevue_type_template_id_02e1fe94_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_TagEdit, {
    "id-container": _ctx.idContainer,
    "id-container-version": _ctx.idContainerVersion,
    "id-tag": _ctx.idTag
  }, null, 8, ["id-container", "id-container-version", "id-tag"])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagManage.vue?vue&type=template&id=02e1fe94

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Tag/TagManage.vue?vue&type=script&lang=ts




/* harmony default export */ var TagManagevue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idContainerVersion: Number,
    idContainer: String,
    tagsHelpText: String
  },
  components: {
    TagList: TagList,
    TagEdit: TagEdit
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
      return external_CoreHome_["MatomoUrl"].hashParsed.value.idTag;
    }, function (idTag) {
      _this.onIdTagParamChange(idTag);
    });
    external_CoreHome_["NotificationsStore"].remove('tagtagmanagement');
    this.onIdTagParamChange(external_CoreHome_["MatomoUrl"].hashParsed.value.idTag);
  },
  methods: {
    onIdTagParamChange: function onIdTagParamChange(idTag) {
      // for BC w/ angularjs only invoke event if idTag is 0
      if (idTag === '0') {
        var parameters = {
          isAllowed: true
        };
        external_CoreHome_["Matomo"].postEvent('TagManager.initAddTag', parameters);
        this.isAddAllowed = !!parameters.isAllowed;
      }
    }
  },
  computed: {
    idTag: function idTag() {
      var idTag = external_CoreHome_["MatomoUrl"].hashParsed.value.idTag;

      if (!this.isAddAllowed && idTag === '0') {
        return null;
      }

      return idTag ? parseInt(idTag, 10) : idTag;
    },
    editMode: function editMode() {
      return typeof this.idTag === 'number';
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagManage.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagManage.vue



TagManagevue_type_script_lang_ts.render = TagManagevue_type_template_id_02e1fe94_render

/* harmony default export */ var TagManage = (TagManagevue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagManage.adapter.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


/* harmony default export */ var TagManage_adapter = (Object(external_CoreHome_["createAngularJsAdapter"])({
  component: TagManage,
  scope: {
    idContainerVersion: {
      angularJsBind: '@',
      transform: function transform(value) {
        return value ? parseInt(value, 10) : undefined;
      }
    },
    idContainer: {
      angularJsBind: '@'
    },
    tagsHelpText: {
      angularJsBind: '@'
    }
  },
  directiveName: 'piwikTagManage'
}));
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Version/VersionEdit.vue?vue&type=template&id=35b98e23

var VersionEditvue_type_template_id_35b98e23_hoisted_1 = {
  class: "editVersion tagManagerManageEdit"
};
var VersionEditvue_type_template_id_35b98e23_hoisted_2 = {
  class: "loadingPiwik"
};

var VersionEditvue_type_template_id_35b98e23_hoisted_3 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);

var VersionEditvue_type_template_id_35b98e23_hoisted_4 = {
  class: "loadingPiwik"
};

var VersionEditvue_type_template_id_35b98e23_hoisted_5 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);

var VersionEditvue_type_template_id_35b98e23_hoisted_6 = {
  key: 0
};
var VersionEditvue_type_template_id_35b98e23_hoisted_7 = {
  key: 2,
  class: "versionChanges"
};
var VersionEditvue_type_template_id_35b98e23_hoisted_8 = {
  key: 0
};
var VersionEditvue_type_template_id_35b98e23_hoisted_9 = {
  colspan: "4"
};
var VersionEditvue_type_template_id_35b98e23_hoisted_10 = {
  key: 1
};
var VersionEditvue_type_template_id_35b98e23_hoisted_11 = {
  colspan: "4"
};
var VersionEditvue_type_template_id_35b98e23_hoisted_12 = {
  class: "lastUpdated"
};
var VersionEditvue_type_template_id_35b98e23_hoisted_13 = {
  class: "entityCancel"
};
function VersionEditvue_type_template_id_35b98e23_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");

  var _component_SaveButton = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("SaveButton");

  var _component_ActivityIndicator = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ActivityIndicator");

  var _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");

  var _directive_content_table = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("content-table");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VersionEditvue_type_template_id_35b98e23_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: "Tag Manager",
    "content-title": _ctx.editTitle
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      var _ctx$version$environm;

      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", VersionEditvue_type_template_id_35b98e23_hoisted_2, [VersionEditvue_type_template_id_35b98e23_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_LoadingData')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isLoading]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", VersionEditvue_type_template_id_35b98e23_hoisted_4, [VersionEditvue_type_template_id_35b98e23_hoisted_5, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_UpdatingData')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isUpdating]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("form", {
        onSubmit: _cache[6] || (_cache[6] = function ($event) {
          return _ctx.edit ? _ctx.updateVersion() : _ctx.createVersion();
        })
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "text",
        name: "name",
        "inline-help": _ctx.versionNameHelpText,
        "inline-help-bind": {
          lastVersion: _ctx.lastVersion
        },
        "model-value": _ctx.version.name,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
          _ctx.version.name = $event;

          _ctx.setValueHasChanged();
        }),
        maxlength: 30,
        title: _ctx.translate('TagManager_VersionName')
      }, null, 8, ["inline-help", "inline-help-bind", "model-value", "title"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "textarea",
        name: "description",
        "model-value": _ctx.version.description,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
          _ctx.version.description = $event;

          _ctx.setValueHasChanged();
        }),
        title: _ctx.translate('TagManager_VersionDescription'),
        "inline-help": _ctx.translate('TagManager_VersionDescriptionHelp')
      }, null, 8, ["model-value", "title", "inline-help"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_SaveButton, {
        class: "createButton no-publish",
        onConfirm: _cache[2] || (_cache[2] = function ($event) {
          return _ctx.edit ? _ctx.updateVersion() : _ctx.createVersion();
        }),
        disabled: _ctx.isUpdating || !_ctx.isDirty,
        saving: _ctx.isUpdating,
        value: _ctx.edit ? _ctx.translate('CoreUpdater_UpdateTitle') : _ctx.translate('TagManager_CreateVersionWithoutPublishing')
      }, null, 8, ["disabled", "saving", "value"]), _ctx.create && _ctx.environments.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VersionEditvue_type_template_id_35b98e23_hoisted_6, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "select",
        name: "environment",
        "inline-help": _ctx.selectTagManagerEnvironmentHelp,
        "inline-help-bind": {
          canPublishToLive: _ctx.canPublishToLive
        },
        "model-value": (_ctx$version$environm = _ctx.version.environments) === null || _ctx$version$environm === void 0 ? void 0 : _ctx$version$environm[0],
        "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
          _ctx.version.environments[0] = $event;

          _ctx.setValueHasChanged();
        }),
        options: _ctx.environments,
        introduction: _ctx.translate('TagManager_OrCreateAndPublishVersion'),
        title: _ctx.translate('TagManager_Environment')
      }, null, 8, ["inline-help", "inline-help-bind", "model-value", "options", "introduction", "title"])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.create && _ctx.environments.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_SaveButton, {
        key: 1,
        class: "publishButton",
        onConfirm: _cache[4] || (_cache[4] = function ($event) {
          return _ctx.createVersionAndPublish();
        }),
        disabled: _ctx.isUpdating || !_ctx.isDirty,
        saving: _ctx.isUpdating,
        value: _ctx.translate('TagManager_CreateVersionAndPublishRelease')
      }, null, 8, ["disabled", "saving", "value"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.lastVersion ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VersionEditvue_type_template_id_35b98e23_hoisted_7, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ChangesSinceLastVersion')) + ":", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("table", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('SitesManager_Type')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Name')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Change')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_LastUpdated')), 1)])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [_ctx.isLoadingVersionChanges ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", VersionEditvue_type_template_id_35b98e23_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VersionEditvue_type_template_id_35b98e23_hoisted_9, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ActivityIndicator, {
        "loading-message": _ctx.translate('TagManager_DetectingChanges'),
        loading: true
      }, null, 8, ["loading-message"])])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), !_ctx.versionChanges.length && !_ctx.isLoadingVersionChanges ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", VersionEditvue_type_template_id_35b98e23_hoisted_10, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VersionEditvue_type_template_id_35b98e23_hoisted_11, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('UserCountryMap_None')), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.versionChanges, function (versionChange, index) {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
          key: index
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate(versionChange.entityType)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(versionChange.name), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate(versionChange.type)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VersionEditvue_type_template_id_35b98e23_hoisted_12, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(versionChange.lastChanged), 1)])]);
      }), 128))])], 512), [[_directive_content_table]])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VersionEditvue_type_template_id_35b98e23_hoisted_13, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        onClick: _cache[5] || (_cache[5] = function ($event) {
          return _ctx.cancel();
        })
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Cancel')), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isEmbedded]])])], 32)];
    }),
    _: 1
  }, 8, ["content-title"])]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionEdit.vue?vue&type=template&id=35b98e23

// CONCATENATED MODULE: ./plugins/TagManager/vue/src/AvailableEnvironments.store.ts
function AvailableEnvironments_store_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AvailableEnvironments_store_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function AvailableEnvironments_store_createClass(Constructor, protoProps, staticProps) { if (protoProps) AvailableEnvironments_store_defineProperties(Constructor.prototype, protoProps); if (staticProps) AvailableEnvironments_store_defineProperties(Constructor, staticProps); return Constructor; }

function AvailableEnvironments_store_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */



var AvailableEnvironments_store_AvailableEnvironmentStore = /*#__PURE__*/function () {
  function AvailableEnvironmentStore() {
    var _this = this;

    AvailableEnvironments_store_classCallCheck(this, AvailableEnvironmentStore);

    AvailableEnvironments_store_defineProperty(this, "privateState", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      environmentsWithPublish: [],
      isLoading: false
    }));

    AvailableEnvironments_store_defineProperty(this, "state", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(_this.privateState);
    }));

    AvailableEnvironments_store_defineProperty(this, "isLoading", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return _this.state.value.isLoading;
    }));

    AvailableEnvironments_store_defineProperty(this, "environmentsWithPublish", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return _this.state.value.environmentsWithPublish;
    }));

    AvailableEnvironments_store_defineProperty(this, "environmentsWithPublishOptions", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return _this.environmentsWithPublish.value.map( // eslint-disable-next-line
      function (_ref) {
        var id = _ref.id,
            name = _ref.name,
            disabled = _ref.disabled;
        return {
          key: id,
          value: name,
          disabled: false
        };
      });
    }));

    AvailableEnvironments_store_defineProperty(this, "initializePromise", null);
  }

  AvailableEnvironments_store_createClass(AvailableEnvironmentStore, [{
    key: "init",
    value: function init() {
      if (!this.initializePromise) {
        this.initializePromise = this.fetchEnvironments();
      }

      return this.initializePromise;
    }
  }, {
    key: "fetchEnvironments",
    value: function fetchEnvironments() {
      var _this2 = this;

      this.privateState.isLoading = true;
      return external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getAvailableEnvironmentsWithPublishCapability',
        filter_limit: '-1'
      }).then(function (environmentsWithPublish) {
        var entities;

        if (Array.isArray(environmentsWithPublish)) {
          entities = environmentsWithPublish;
        } else {
          entities = Object.values(environmentsWithPublish);
        }

        _this2.privateState.environmentsWithPublish = entities;
      }).finally(function () {
        _this2.privateState.isLoading = false;
      });
    }
  }]);

  return AvailableEnvironmentStore;
}();

/* harmony default export */ var AvailableEnvironments_store = (new AvailableEnvironments_store_AvailableEnvironmentStore());
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/diffDraftVersion.ts
function diffDraftVersion_toConsumableArray(arr) { return diffDraftVersion_arrayWithoutHoles(arr) || diffDraftVersion_iterableToArray(arr) || diffDraftVersion_unsupportedIterableToArray(arr) || diffDraftVersion_nonIterableSpread(); }

function diffDraftVersion_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function diffDraftVersion_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function diffDraftVersion_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return diffDraftVersion_arrayLikeToArray(arr); }

function diffDraftVersion_slicedToArray(arr, i) { return diffDraftVersion_arrayWithHoles(arr) || diffDraftVersion_iterableToArrayLimit(arr, i) || diffDraftVersion_unsupportedIterableToArray(arr, i) || diffDraftVersion_nonIterableRest(); }

function diffDraftVersion_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function diffDraftVersion_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return diffDraftVersion_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return diffDraftVersion_arrayLikeToArray(o, minLen); }

function diffDraftVersion_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function diffDraftVersion_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function diffDraftVersion_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

function diffDraftVersion(idContainer, idContainerVersionNew, idContainerVersionPrevious) {
  function findEntryInArray(array, name) {
    return array.find(function (v) {
      return v.name === name;
    });
  }

  function getDifference(entityType, array1, array2, keysToCheck) {
    var diff = [];
    array1.forEach(function (array1Item) {
      var matchingEntry = findEntryInArray(array2, array1Item.name);

      if (matchingEntry) {
        keysToCheck.some(function (key) {
          if (JSON.stringify(array1Item[key]) !== JSON.stringify(matchingEntry[key])) {
            // matching, check if different
            diff.push({
              entityType: entityType,
              type: 'TagManager_DiffModified',
              name: array1Item.name,
              lastChanged: array1Item.updated_date_pretty
            });
            return true;
          }

          return false;
        });
        return;
      }

      diff.push({
        entityType: entityType,
        type: 'TagManager_DiffAdded',
        name: array1Item.name,
        lastChanged: array1Item.updated_date_pretty
      });
    });
    array2.forEach(function (array2Item) {
      if (!findEntryInArray(array1, array2Item.name)) {
        diff.push({
          entityType: entityType,
          type: 'TagManager_DiffDeleted',
          name: array2Item.name,
          lastChanged: array2Item.updated_date_pretty
        });
      }
    });
    return diff;
  }

  function mixinTagTriggers(tags, triggers) {
    tags.forEach(function (tag) {
      tag.fire_triggers = [];
      tag.block_triggers = [];
      tag.fire_trigger_ids.forEach(function (idtrigger) {
        var trigger = triggers.find(function (t) {
          return t.idtrigger === idtrigger;
        });

        if (trigger) {
          tag.fire_triggers.push(trigger.name);
        }
      });
      tag.block_trigger_ids.forEach(function (idtrigger) {
        var trigger = triggers.find(function (t) {
          return t.idtrigger === idtrigger;
        });

        if (trigger) {
          tag.block_triggers.push(trigger.name);
        }
      });
    });
  }

  var draftVersion = {
    module: 'API',
    method: 'TagManager.exportContainerVersion',
    format: 'json',
    idContainer: idContainer,
    filter_limit: -1
  };

  if (idContainerVersionNew) {
    draftVersion.idContainerVersion = idContainerVersionNew;
  }

  var lastVersion = {
    module: 'API',
    method: 'TagManager.exportContainerVersion',
    format: 'json',
    idContainer: idContainer,
    idContainerVersion: idContainerVersionPrevious,
    filter_limit: -1
  };
  return external_CoreHome_["AjaxHelper"].fetch([draftVersion, lastVersion]).then(function (_ref) {
    var _ref2 = diffDraftVersion_slicedToArray(_ref, 2),
        draft = _ref2[0],
        last = _ref2[1];

    mixinTagTriggers(draft.tags, draft.triggers);
    mixinTagTriggers(last.tags, last.triggers);
    var diff1 = getDifference('TagManager_Tag', draft.tags, last.tags, ['name', 'type', 'fire_limit', 'priority', 'fire_delay', 'fire_triggers', 'block_triggers', 'parameters']);
    var diff2 = getDifference('TagManager_Trigger', draft.triggers, last.triggers, ['name', 'type', 'conditions', 'parameters']);
    var diff3 = getDifference('TagManager_Variable', draft.variables, last.variables, ['name', 'type', 'lookup_table', 'default_value', 'parameters']);
    return [].concat(diffDraftVersion_toConsumableArray(diff1), diffDraftVersion_toConsumableArray(diff2), diffDraftVersion_toConsumableArray(diff3));
  });
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/Versions.store.ts
function Versions_store_toConsumableArray(arr) { return Versions_store_arrayWithoutHoles(arr) || Versions_store_iterableToArray(arr) || Versions_store_unsupportedIterableToArray(arr) || Versions_store_nonIterableSpread(); }

function Versions_store_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Versions_store_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Versions_store_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Versions_store_arrayLikeToArray(o, minLen); }

function Versions_store_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function Versions_store_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return Versions_store_arrayLikeToArray(arr); }

function Versions_store_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Versions_store_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Versions_store_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Versions_store_createClass(Constructor, protoProps, staticProps) { if (protoProps) Versions_store_defineProperties(Constructor.prototype, protoProps); if (staticProps) Versions_store_defineProperties(Constructor, staticProps); return Constructor; }

function Versions_store_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */



var Versions_store_VersionsStore = /*#__PURE__*/function () {
  function VersionsStore() {
    var _this = this;

    Versions_store_classCallCheck(this, VersionsStore);

    Versions_store_defineProperty(this, "privateState", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      versions: [],
      isLoadingVersions: false,
      isLoadingSingle: false,
      isUpdating: false
    }));

    Versions_store_defineProperty(this, "state", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(_this.privateState);
    }));

    Versions_store_defineProperty(this, "isLoading", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      var state = _this.state.value;
      return state.isLoadingVersions || state.isLoadingSingle;
    }));

    Versions_store_defineProperty(this, "isUpdating", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return _this.state.value.isUpdating;
    }));

    Versions_store_defineProperty(this, "versions", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return _this.state.value.versions;
    }));

    Versions_store_defineProperty(this, "fetchPromise", null);
  }

  Versions_store_createClass(VersionsStore, [{
    key: "reload",
    value: function reload(idContainer) {
      this.privateState.versions = [];
      this.fetchPromise = null;
      return this.fetchVersions(idContainer);
    }
  }, {
    key: "fetchVersions",
    value: function fetchVersions(idContainer) {
      var _this2 = this;

      this.privateState.isLoadingVersions = true;
      this.privateState.versions = [];

      if (!this.fetchPromise) {
        this.fetchPromise = external_CoreHome_["AjaxHelper"].fetch({
          method: 'TagManager.getContainerVersions',
          idContainer: idContainer,
          filter_limit: '-1'
        });
      }

      return Promise.resolve(this.fetchPromise).then(function (versions) {
        _this2.privateState.versions = versions;
        _this2.privateState.isLoadingVersions = false;
        return _this2.versions.value;
      }).finally(function () {
        _this2.privateState.isLoadingVersions = false;
      });
    }
  }, {
    key: "findVersion",
    value: function findVersion(idContainer, idContainerVersion) {
      var _this3 = this;

      // before going through an API request we first try to find it in loaded versions
      var found = this.versions.value.find(function (v) {
        return v.idcontainerversion === idContainerVersion;
      });

      if (found) {
        return Promise.resolve(found);
      } // otherwise we fetch it via API


      this.privateState.isLoadingSingle = true;
      return external_CoreHome_["AjaxHelper"].fetch({
        idContainerVersion: idContainerVersion,
        idContainer: idContainer,
        method: 'TagManager.getContainerVersion',
        filter_limit: '-1'
      }).then(function (record) {
        _this3.privateState.versions = [].concat(Versions_store_toConsumableArray(_this3.privateState.versions), [record]);
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(record);
      }).finally(function () {
        _this3.privateState.isLoadingSingle = false;
      });
    }
  }, {
    key: "deleteVersion",
    value: function deleteVersion(idContainer, idContainerVersion) {
      var _this4 = this;

      this.privateState.isUpdating = true;
      this.privateState.versions = [];
      return external_CoreHome_["AjaxHelper"].fetch({
        idContainerVersion: idContainerVersion,
        idContainer: idContainer,
        method: 'TagManager.deleteContainerVersion'
      }, {
        withTokenInUrl: true
      }).finally(function () {
        _this4.privateState.isUpdating = false;
      });
    }
  }, {
    key: "publishVersion",
    value: function publishVersion(idContainer, idContainerVersion, environment) {
      var _this5 = this;

      this.privateState.isUpdating = true;
      return external_CoreHome_["AjaxHelper"].fetch({
        idContainer: idContainer,
        idContainerVersion: idContainerVersion,
        environment: environment,
        method: 'TagManager.publishContainerVersion'
      }).finally(function () {
        _this5.privateState.isUpdating = false;
      });
    }
  }, {
    key: "createOrUpdateVersion",
    value: function createOrUpdateVersion(version, method, idContainer) {
      var _this6 = this;

      this.privateState.isUpdating = true;
      return external_CoreHome_["AjaxHelper"].post({
        method: method,
        idContainer: idContainer,
        idContainerVersion: version.idcontainerversion
      }, {
        name: version.name,
        description: version.description
      }, {
        withTokenInUrl: true
      }).finally(function () {
        _this6.privateState.isUpdating = false;
      });
    }
  }]);

  return VersionsStore;
}();

/* harmony default export */ var Versions_store = (new Versions_store_VersionsStore());
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Version/VersionNameHelpText.vue?vue&type=template&id=acc4c29a

var VersionNameHelpTextvue_type_template_id_acc4c29a_hoisted_1 = {
  id: "versionNameHelpText",
  class: "inline-help-node"
};

var VersionNameHelpTextvue_type_template_id_acc4c29a_hoisted_2 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);

var VersionNameHelpTextvue_type_template_id_acc4c29a_hoisted_3 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);

var VersionNameHelpTextvue_type_template_id_acc4c29a_hoisted_4 = ["innerHTML"];
function VersionNameHelpTextvue_type_template_id_acc4c29a_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VersionNameHelpTextvue_type_template_id_acc4c29a_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_VersionNameHelp')) + " ", 1), VersionNameHelpTextvue_type_template_id_acc4c29a_hoisted_2, VersionNameHelpTextvue_type_template_id_acc4c29a_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
    innerHTML: _ctx.$sanitize(_ctx.translate('TagManager_NameOfLatestVersion', "<strong>".concat(_ctx.lastVersion, "</strong>")))
  }, null, 8, VersionNameHelpTextvue_type_template_id_acc4c29a_hoisted_4), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.lastVersion]])]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionNameHelpText.vue?vue&type=template&id=acc4c29a

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Version/VersionNameHelpText.vue?vue&type=script&lang=ts

/* harmony default export */ var VersionNameHelpTextvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    lastVersion: String
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionNameHelpText.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionNameHelpText.vue



VersionNameHelpTextvue_type_script_lang_ts.render = VersionNameHelpTextvue_type_template_id_acc4c29a_render

/* harmony default export */ var VersionNameHelpText = (VersionNameHelpTextvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Version/SelectTagManagerEnvironmentHelpText.vue?vue&type=template&id=40d41b93

var SelectTagManagerEnvironmentHelpTextvue_type_template_id_40d41b93_hoisted_1 = {
  id: "selectTagManagerEnvironmentHelp",
  class: "inline-help-node"
};
function SelectTagManagerEnvironmentHelpTextvue_type_template_id_40d41b93_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", SelectTagManagerEnvironmentHelpTextvue_type_template_id_40d41b93_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_VersionEnvironmentHelp')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    class: "alert alert-info",
    style: {
      "margin-bottom": "0",
      "padding-bottom": "0"
    }
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_PublishLiveEnvironmentCapabilityRequired', _ctx.translate('TagManager_CapabilityPublishLiveContainer'))), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.canPublishToLive]])]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/SelectTagManagerEnvironmentHelpText.vue?vue&type=template&id=40d41b93

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Version/SelectTagManagerEnvironmentHelpText.vue?vue&type=script&lang=ts

/* harmony default export */ var SelectTagManagerEnvironmentHelpTextvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    canPublishToLive: Boolean
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/SelectTagManagerEnvironmentHelpText.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/SelectTagManagerEnvironmentHelpText.vue



SelectTagManagerEnvironmentHelpTextvue_type_script_lang_ts.render = SelectTagManagerEnvironmentHelpTextvue_type_template_id_40d41b93_render

/* harmony default export */ var SelectTagManagerEnvironmentHelpText = (SelectTagManagerEnvironmentHelpTextvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Version/VersionEdit.vue?vue&type=script&lang=ts
function VersionEditvue_type_script_lang_ts_toConsumableArray(arr) { return VersionEditvue_type_script_lang_ts_arrayWithoutHoles(arr) || VersionEditvue_type_script_lang_ts_iterableToArray(arr) || VersionEditvue_type_script_lang_ts_unsupportedIterableToArray(arr) || VersionEditvue_type_script_lang_ts_nonIterableSpread(); }

function VersionEditvue_type_script_lang_ts_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function VersionEditvue_type_script_lang_ts_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return VersionEditvue_type_script_lang_ts_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return VersionEditvue_type_script_lang_ts_arrayLikeToArray(o, minLen); }

function VersionEditvue_type_script_lang_ts_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function VersionEditvue_type_script_lang_ts_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return VersionEditvue_type_script_lang_ts_arrayLikeToArray(arr); }

function VersionEditvue_type_script_lang_ts_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }











var VersionEditvue_type_script_lang_ts_notificationId = 'versiontagmanagement';
/* harmony default export */ var VersionEditvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idContainerVersion: {
      type: Number,
      required: true
    },
    idContainer: {
      type: String,
      required: true
    },
    isEmbedded: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ContentBlock: external_CoreHome_["ContentBlock"],
    Field: external_CorePluginsAdmin_["Field"],
    SaveButton: external_CorePluginsAdmin_["SaveButton"],
    ActivityIndicator: external_CoreHome_["ActivityIndicator"]
  },
  directives: {
    ContentTable: external_CoreHome_["ContentTable"]
  },
  data: function data() {
    return {
      isDirty: false,
      lastVersion: null,
      versionChanges: [],
      isLoadingVersionChanges: false,
      isUpdatingVersion: false,
      editTitle: '',
      version: {}
    };
  },
  emits: ['changeVersion'],
  created: function created() {
    AvailableComparisons_store.init();
    AvailableEnvironments_store.init();
    this.initIdContainerVersion();
  },
  watch: {
    idContainerVersion: function idContainerVersion(newValue) {
      if (newValue === null) {
        return;
      }

      this.initIdContainerVersion();
    }
  },
  methods: {
    removeAnyVersionNotification: function removeAnyVersionNotification() {
      external_CoreHome_["NotificationsStore"].remove(VersionEditvue_type_script_lang_ts_notificationId);
      external_CoreHome_["NotificationsStore"].remove('ajaxHelper');
    },
    showNotification: function showNotification(message, context) {
      var notificationInstanceId = external_CoreHome_["NotificationsStore"].show({
        message: message,
        context: context,
        id: VersionEditvue_type_script_lang_ts_notificationId,
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
    initIdContainerVersion: function initIdContainerVersion() {
      var _this = this;

      this.version = {};
      this.lastVersion = null;
      this.versionChanges = [];
      this.isLoadingVersionChanges = true;
      Versions_store.fetchVersions(this.idContainer).then(function () {
        var _versions$;

        _this.isLoadingVersionChanges = false;
        _this.lastVersion = null;

        var versions = VersionEditvue_type_script_lang_ts_toConsumableArray(Versions_store.versions.value);

        if (!(versions !== null && versions !== void 0 && versions.length)) {
          return;
        }

        versions.sort(function (a, b) {
          return a.revision < b.revision ? 1 : 0;
        });
        var lastContainerVersion = null;

        if (_this.create && (_versions$ = versions[0]) !== null && _versions$ !== void 0 && _versions$.name) {
          _this.lastVersion = versions[0].name;
          lastContainerVersion = versions[0].idcontainerversion;
        } else if (_this.edit) {
          versions.forEach(function (v, i) {
            // we stop before the last one because it cannot have an entry
            if (i >= versions.length - 1) {
              return;
            }

            if (v.idcontainerversion === _this.idContainerVersion && versions[i + 1]) {
              _this.lastVersion = versions[i + 1].name;
              lastContainerVersion = versions[i + 1].idcontainerversion;
            }
          });
        }

        if (_this.lastVersion) {
          _this.isLoadingVersionChanges = true;
          diffDraftVersion(_this.idContainer, _this.idContainerVersion, lastContainerVersion).then(function (diff) {
            _this.versionChanges = diff;
            _this.isLoadingVersionChanges = false;
          });

          if (_this.create && !_this.version.name && /^\d+$/.test(_this.lastVersion)) {
            _this.version.name = "".concat(parseInt(_this.lastVersion, 10) + 1);
            _this.isDirty = true;
          }
        }
      });
      external_CoreHome_["Matomo"].helper.lazyScrollToContent();

      if (this.edit && this.idContainerVersion) {
        this.editTitle = Object(external_CoreHome_["translate"])('TagManager_EditVersion');
        Versions_store.findVersion(this.idContainer, this.idContainerVersion).then(function (version) {
          if (!version) {
            return;
          }

          _this.version = Object(external_CoreHome_["clone"])(version);
          _this.isDirty = false;
        });
        return;
      }

      if (this.create) {
        this.editTitle = Object(external_CoreHome_["translate"])('TagManager_CreateNewVersion');
        this.version = {
          idSite: external_CoreHome_["Matomo"].idSite,
          idcontainer: this.idContainer,
          name: '',
          description: ''
        };

        if (this.canPublishToLive) {
          this.version.environments = ['live'];
        } else {
          // If the user can't publish to live, select the next available option.
          var notLive = this.environments.find(function (obj) {
            return obj.key !== 'live';
          });
          this.version.environments = notLive ? [notLive.key] : [];
        }

        this.isDirty = false;
      }
    },
    cancel: function cancel() {
      var newParams = Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value);
      delete newParams.idContainerVersion;
      external_CoreHome_["MatomoUrl"].updateHash(newParams);
    },
    createVersion: function createVersion() {
      var _this2 = this;

      this.removeAnyVersionNotification();

      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }

      this.isUpdatingVersion = true;
      Versions_store.createOrUpdateVersion(this.version, 'TagManager.createContainerVersion', this.idContainer).then(function (response) {
        if (!response) {
          return;
        }

        _this2.isDirty = false;
        var idContainerVersion = response.value;

        if (_this2.isEmbedded) {
          _this2.version.idcontainerversion = idContainerVersion;

          _this2.$emit('changeVersion', {
            version: _this2.version
          });

          return;
        }

        Versions_store.reload(_this2.idContainer).then(function () {
          external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
            idContainerVersion: idContainerVersion
          }));
          setTimeout(function () {
            var createdX = Object(external_CoreHome_["translate"])('TagManager_CreatedX', Object(external_CoreHome_["translate"])('TagManager_Version'));
            var wantToRedeploy = Object(external_CoreHome_["translate"])('TagManager_WantToDeployThisChangeCreateVersion', '<a class="createNewVersionLink">', '</a>');

            _this2.showNotification("".concat(createdX, " ").concat(wantToRedeploy), 'success');
          }, 200);
        });
      }).finally(function () {
        _this2.isUpdatingVersion = false;
      });
    },
    createVersionAndPublish: function createVersionAndPublish() {
      var _this3 = this;

      this.removeAnyVersionNotification();

      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }

      this.isUpdatingVersion = true;
      Versions_store.createOrUpdateVersion(this.version, 'TagManager.createContainerVersion', this.idContainer).then(function (response) {
        if (!response) {
          return null;
        }

        var idContainerVersion = response.value;
        _this3.version.idcontainerversion = idContainerVersion;
        return Versions_store.publishVersion(_this3.idContainer, idContainerVersion, _this3.version.environments[0]).then(function () {
          _this3.isDirty = false;

          if (_this3.isEmbedded) {
            _this3.$emit('changeVersion', {
              version: _this3.version
            });

            return;
          }

          Versions_store.reload(_this3.idContainer).then(function () {
            external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
              idContainerVersion: idContainerVersion
            }));
            setTimeout(function () {
              _this3.showNotification(Object(external_CoreHome_["translate"])('TagManager_VersionPublishSuccess'), 'success');
            }, 200);
          });
        });
      }).finally(function () {
        _this3.isUpdatingVersion = false;
      });
    },
    setValueHasChanged: function setValueHasChanged() {
      this.isDirty = true;
    },
    updateVersion: function updateVersion() {
      var _this4 = this;

      this.removeAnyVersionNotification();

      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }

      this.isUpdatingVersion = true;
      Versions_store.createOrUpdateVersion(this.version, 'TagManager.updateContainerVersion', this.idContainer).then(function (response) {
        if (!response) {
          return;
        }

        if (_this4.isEmbedded) {
          _this4.$emit('changeVersion', {
            version: _this4.version
          });

          return;
        }

        _this4.isDirty = false;
        _this4.version = {};
        Versions_store.reload(_this4.idContainer).then(function () {
          _this4.initIdContainerVersion();
        });

        _this4.showNotification(Object(external_CoreHome_["translate"])('TagManager_UpdatedX', Object(external_CoreHome_["translate"])('TagManager_Version')), 'success');
      }).finally(function () {
        _this4.isUpdatingVersion = false;
      });
    },
    checkRequiredFieldsAreSet: function checkRequiredFieldsAreSet() {
      if (!this.version.name) {
        var title = Object(external_CoreHome_["translate"])('General_Name');
        this.showErrorFieldNotProvidedNotification(title);
        return false;
      }

      return true;
    }
  },
  computed: {
    create: function create() {
      return this.idContainerVersion === 0;
    },
    edit: function edit() {
      return !this.create;
    },
    isLoading: function isLoading() {
      return Variables_store.isLoading.value || AvailableComparisons_store.isLoading.value;
    },
    isUpdating: function isUpdating() {
      return Variables_store.isUpdating.value || this.isUpdatingVersion;
    },
    environments: function environments() {
      var environments = AvailableEnvironments_store.environmentsWithPublishOptions.value;

      if (!this.canPublishToLive) {
        // If the user can't publish to live, disable that option.
        var liveIndex = environments.findIndex(function (obj) {
          return obj.key === 'live';
        });

        if (liveIndex > -1) {
          environments[liveIndex].disabled = true;
        }
      }

      return environments;
    },
    canPublishToLive: function canPublishToLive() {
      return external_CoreHome_["Matomo"].hasUserCapability('tagmanager_publish_live_container');
    },
    versionNameHelpText: function versionNameHelpText() {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["markRaw"])(VersionNameHelpText);
    },
    selectTagManagerEnvironmentHelp: function selectTagManagerEnvironmentHelp() {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["markRaw"])(SelectTagManagerEnvironmentHelpText);
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionEdit.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionEdit.vue



VersionEditvue_type_script_lang_ts.render = VersionEditvue_type_template_id_35b98e23_render

/* harmony default export */ var VersionEdit = (VersionEditvue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionEdit.adapter.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


/* harmony default export */ var VersionEdit_adapter = (Object(external_CoreHome_["createAngularJsAdapter"])({
  component: VersionEdit,
  scope: {
    idContainerVersion: {
      angularJsBind: '='
    },
    idContainer: {
      angularJsBind: '='
    },
    onChangeVersion: {
      angularJsBind: '&?',
      vue: 'changeVersion'
    }
  },
  directiveName: 'piwikVersionEdit'
}));
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Version/VersionList.vue?vue&type=template&id=984acb68

var VersionListvue_type_template_id_984acb68_hoisted_1 = {
  class: "tagManagerManageList tagManagerVersionList"
};
var VersionListvue_type_template_id_984acb68_hoisted_2 = ["title"];
var VersionListvue_type_template_id_984acb68_hoisted_3 = ["title"];
var VersionListvue_type_template_id_984acb68_hoisted_4 = ["title"];
var VersionListvue_type_template_id_984acb68_hoisted_5 = ["title"];
var VersionListvue_type_template_id_984acb68_hoisted_6 = ["title"];
var VersionListvue_type_template_id_984acb68_hoisted_7 = ["title"];
var VersionListvue_type_template_id_984acb68_hoisted_8 = {
  colspan: "7"
};
var VersionListvue_type_template_id_984acb68_hoisted_9 = {
  class: "loadingPiwik"
};

var VersionListvue_type_template_id_984acb68_hoisted_10 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);

var VersionListvue_type_template_id_984acb68_hoisted_11 = {
  colspan: "7"
};
var VersionListvue_type_template_id_984acb68_hoisted_12 = ["id"];
var VersionListvue_type_template_id_984acb68_hoisted_13 = {
  class: "index"
};
var VersionListvue_type_template_id_984acb68_hoisted_14 = {
  class: "name"
};
var VersionListvue_type_template_id_984acb68_hoisted_15 = ["title"];
var VersionListvue_type_template_id_984acb68_hoisted_16 = {
  class: "environments"
};
var VersionListvue_type_template_id_984acb68_hoisted_17 = ["title"];
var VersionListvue_type_template_id_984acb68_hoisted_18 = {
  class: "created"
};
var VersionListvue_type_template_id_984acb68_hoisted_19 = {
  class: "action"
};
var VersionListvue_type_template_id_984acb68_hoisted_20 = ["onClick", "title"];
var VersionListvue_type_template_id_984acb68_hoisted_21 = ["onClick", "title"];
var VersionListvue_type_template_id_984acb68_hoisted_22 = ["onClick", "href", "title"];
var VersionListvue_type_template_id_984acb68_hoisted_23 = ["onClick", "title"];
var VersionListvue_type_template_id_984acb68_hoisted_24 = ["onClick", "title"];
var VersionListvue_type_template_id_984acb68_hoisted_25 = {
  class: "tableActionBar"
};

var VersionListvue_type_template_id_984acb68_hoisted_26 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, null, -1);

var VersionListvue_type_template_id_984acb68_hoisted_27 = ["href"];

var VersionListvue_type_template_id_984acb68_hoisted_28 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-export"
}, null, -1);

var VersionListvue_type_template_id_984acb68_hoisted_29 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-upload"
}, null, -1);

var VersionListvue_type_template_id_984acb68_hoisted_30 = {
  class: "ui-confirm",
  id: "confirmDeleteVersion",
  ref: "confirmDeleteVersion"
};
var VersionListvue_type_template_id_984acb68_hoisted_31 = ["value"];
var VersionListvue_type_template_id_984acb68_hoisted_32 = ["value"];
var VersionListvue_type_template_id_984acb68_hoisted_33 = {
  class: "ui-confirm",
  id: "confirmPublishVersion",
  ref: "confirmPublishVersion"
};
var VersionListvue_type_template_id_984acb68_hoisted_34 = {
  key: 0,
  class: "alert alert-info",
  style: {
    "margin-top": "16px"
  }
};
var VersionListvue_type_template_id_984acb68_hoisted_35 = ["value"];
var VersionListvue_type_template_id_984acb68_hoisted_36 = ["value"];
function VersionListvue_type_template_id_984acb68_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _ctx$versionToBePubli;

  var _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");

  var _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");

  var _directive_content_table = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("content-table");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VersionListvue_type_template_id_984acb68_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: "Tag Manager",
    "content-title": _ctx.translate('TagManager_ManageX', _ctx.translate('TagManager_Versions')),
    "help-text": _ctx.versionsHelpText
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_VersionUsageBenefits')) + " " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ConfigureEnvironmentsSuperUser')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("table", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
        class: "index",
        title: _ctx.revisionTranslatedText
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Revision')), 9, VersionListvue_type_template_id_984acb68_hoisted_2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
        class: "name",
        title: _ctx.nameTranslatedText
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Name')), 9, VersionListvue_type_template_id_984acb68_hoisted_3), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
        class: "description",
        title: _ctx.descriptionTranslatedText
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Description')), 9, VersionListvue_type_template_id_984acb68_hoisted_4), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
        class: "environments",
        title: _ctx.environmentTranslatedText
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Environments')), 9, VersionListvue_type_template_id_984acb68_hoisted_5), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
        class: "created",
        title: _ctx.createdTranslatedText
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Created')), 9, VersionListvue_type_template_id_984acb68_hoisted_6), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
        class: "action",
        title: _ctx.actionTranslatedText
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Actions')), 9, VersionListvue_type_template_id_984acb68_hoisted_7)])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VersionListvue_type_template_id_984acb68_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", VersionListvue_type_template_id_984acb68_hoisted_9, [VersionListvue_type_template_id_984acb68_hoisted_10, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_LoadingData')), 1)])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isLoading || _ctx.isUpdating]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VersionListvue_type_template_id_984acb68_hoisted_11, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_NoVersionsFound')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "createContainerVersionNow",
        onClick: _cache[0] || (_cache[0] = function ($event) {
          return _ctx.createVersion();
        })
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewVersionNow')), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isLoading && _ctx.versions.length === 0]]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.sortedVersions, function (version) {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
          id: "version".concat(version.idcontainerversion),
          class: "versions",
          key: version.revision
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VersionListvue_type_template_id_984acb68_hoisted_13, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(version.revision), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VersionListvue_type_template_id_984acb68_hoisted_14, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(version.name), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
          class: "description",
          title: version.description
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.truncateText(version.description, 30)), 9, VersionListvue_type_template_id_984acb68_hoisted_15), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VersionListvue_type_template_id_984acb68_hoisted_16, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(version.releases, function (release, index) {
          return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
            key: index,
            title: _ctx.translate('TagManager_ReleaseInfo', release.release_login, release.release_date_pretty)
          }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.ucfirst(release.environment)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, ", ", 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], index !== version.releases.length - 1]])], 8, VersionListvue_type_template_id_984acb68_hoisted_17);
        }), 128))]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VersionListvue_type_template_id_984acb68_hoisted_18, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(version.created_date_pretty), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VersionListvue_type_template_id_984acb68_hoisted_19, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
          class: "table-action icon-rocket",
          onClick: function onClick($event) {
            return _ctx.publishVersion(version);
          },
          title: _ctx.translate('TagManager_PublishVersion', version.name)
        }, null, 8, VersionListvue_type_template_id_984acb68_hoisted_20), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
          class: "table-action icon-bug",
          onClick: function onClick($event) {
            return _ctx.enableDebugMode(version.idcontainerversion);
          },
          title: _ctx.translate('TagManager_EnablePreviewDebug')
        }, null, 8, VersionListvue_type_template_id_984acb68_hoisted_21), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
          target: "_blank",
          class: "table-action icon-export",
          onClick: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function ($event) {
            _ctx.exportVersion(version.idcontainerversion, version.name);
          }, ["prevent"]),
          href: _ctx.getExportUrl(version),
          title: _ctx.translate('TagManager_ExportX', _ctx.translate('TagManager_Version'))
        }, null, 8, VersionListvue_type_template_id_984acb68_hoisted_22), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
          class: "table-action icon-edit",
          onClick: function onClick($event) {
            return _ctx.editVersion(version.idcontainerversion);
          },
          title: _ctx.translate('TagManager_EditX', _ctx.translate('TagManager_Version'))
        }, null, 8, VersionListvue_type_template_id_984acb68_hoisted_23), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
          class: "table-action icon-delete",
          onClick: function onClick($event) {
            return _ctx.deleteVersion(version);
          },
          title: _ctx.translate('TagManager_DeleteX', _ctx.translate('TagManager_Version'))
        }, null, 8, VersionListvue_type_template_id_984acb68_hoisted_24), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], version.releases.length === 0 && _ctx.hasWriteAccess]])])], 8, VersionListvue_type_template_id_984acb68_hoisted_12);
      }), 128))])], 512), [[_directive_content_table]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VersionListvue_type_template_id_984acb68_hoisted_25, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "createNewVersion",
        onClick: _cache[1] || (_cache[1] = function ($event) {
          return _ctx.createVersion();
        })
      }, [VersionListvue_type_template_id_984acb68_hoisted_26, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewVersion')), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "exportDraft",
        target: "_blank",
        onClick: _cache[2] || (_cache[2] = function ($event) {
          _ctx.exportVersion(null, 'draft');

          $event.preventDefault();
        }),
        href: _ctx.getExportDraftUrl()
      }, [VersionListvue_type_template_id_984acb68_hoisted_28, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ExportDraft')), 1)], 8, VersionListvue_type_template_id_984acb68_hoisted_27), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "importVersion",
        onClick: _cache[3] || (_cache[3] = function ($event) {
          return _ctx.importVersion();
        })
      }, [VersionListvue_type_template_id_984acb68_hoisted_29, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Import')), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])])];
    }),
    _: 1
  }, 8, ["content-title", "help-text"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VersionListvue_type_template_id_984acb68_hoisted_30, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_DeleteVersionConfirm')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "yes",
    type: "button",
    value: _ctx.translate('General_Yes')
  }, null, 8, VersionListvue_type_template_id_984acb68_hoisted_31), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "no",
    type: "button",
    value: _ctx.translate('General_No')
  }, null, 8, VersionListvue_type_template_id_984acb68_hoisted_32)], 512), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VersionListvue_type_template_id_984acb68_hoisted_33, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_PublishVersion', (_ctx$versionToBePubli = _ctx.versionToBePublished) === null || _ctx$versionToBePubli === void 0 ? void 0 : _ctx$versionToBePubli.name)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
    uicontrol: "select",
    name: "environment",
    modelValue: _ctx.availableEnvironmentsToPublish.deployEnvironment,
    "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
      return _ctx.availableEnvironmentsToPublish.deployEnvironment = $event;
    }),
    options: _ctx.availableEnvironmentsToPublish.environnments,
    "full-width": true,
    title: _ctx.translate('TagManager_Environment')
  }, null, 8, ["modelValue", "options", "title"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    style: {
      "margin-bottom": "0"
    },
    class: "alert alert-info"
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_PublishLiveEnvironmentCapabilityRequired', _ctx.translate('TagManager_CapabilityPublishLiveContainer'))), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.canPublishToLive]])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.availableEnvironmentsToPublish.environnments.length]]), !_ctx.availableEnvironmentsToPublish.environnments.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VersionListvue_type_template_id_984acb68_hoisted_34, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_VersionAlreadyPublishedToAllEnvironments')), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "yes",
    type: "button",
    value: _ctx.translate('TagManager_PublishRelease')
  }, null, 8, VersionListvue_type_template_id_984acb68_hoisted_35), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "no",
    type: "button",
    value: _ctx.translate('General_Cancel')
  }, null, 8, VersionListvue_type_template_id_984acb68_hoisted_36)], 512)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionList.vue?vue&type=template&id=984acb68

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Version/VersionList.vue?vue&type=script&lang=ts
function VersionListvue_type_script_lang_ts_toConsumableArray(arr) { return VersionListvue_type_script_lang_ts_arrayWithoutHoles(arr) || VersionListvue_type_script_lang_ts_iterableToArray(arr) || VersionListvue_type_script_lang_ts_unsupportedIterableToArray(arr) || VersionListvue_type_script_lang_ts_nonIterableSpread(); }

function VersionListvue_type_script_lang_ts_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function VersionListvue_type_script_lang_ts_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return VersionListvue_type_script_lang_ts_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return VersionListvue_type_script_lang_ts_arrayLikeToArray(o, minLen); }

function VersionListvue_type_script_lang_ts_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function VersionListvue_type_script_lang_ts_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return VersionListvue_type_script_lang_ts_arrayLikeToArray(arr); }

function VersionListvue_type_script_lang_ts_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }






var VersionListvue_type_script_lang_ts_window = window,
    VersionListvue_type_script_lang_ts_tagManagerHelper = VersionListvue_type_script_lang_ts_window.tagManagerHelper;
/* harmony default export */ var VersionListvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idContainer: {
      type: String,
      required: true
    },
    versionsHelpText: String
  },
  components: {
    ContentBlock: external_CoreHome_["ContentBlock"],
    Field: external_CorePluginsAdmin_["Field"]
  },
  directives: {
    ContentTable: external_CoreHome_["ContentTable"]
  },
  data: function data() {
    return {
      versionToBePublished: null
    };
  },
  created: function created() {
    AvailableEnvironments_store.init();
    Versions_store.fetchVersions(this.idContainer);
  },
  methods: {
    createVersion: function createVersion() {
      this.editVersion(0);
    },
    truncateText: function truncateText(text, length) {
      return VersionListvue_type_script_lang_ts_tagManagerHelper.truncateText(text, length);
    },
    publishVersion: function publishVersion(version) {
      var _this = this;

      this.versionToBePublished = version;
      external_CoreHome_["Matomo"].helper.modalConfirm(this.$refs.confirmPublishVersion, {
        yes: function yes() {
          var deployEnvironment = _this.availableEnvironmentsToPublish.deployEnvironment;

          if (deployEnvironment) {
            Versions_store.publishVersion(version.idcontainer, version.idcontainerversion, deployEnvironment).then(function () {
              Versions_store.reload(_this.idContainer);
            });
          }
        }
      });
    },
    enableDebugMode: function enableDebugMode(idContainerVersion) {
      VersionListvue_type_script_lang_ts_tagManagerHelper.enablePreviewMode(this.idContainer, idContainerVersion);
    },
    exportVersion: function exportVersion(idContainerVersion, versionName) {
      var params = {
        module: 'API',
        method: 'TagManager.exportContainerVersion',
        format: 'json',
        idContainer: this.idContainer,
        filter_limit: -1
      };

      if (idContainerVersion) {
        params.idContainerVersion = idContainerVersion;
      }

      var filename = "container_".concat(this.idContainer);

      if (versionName) {
        filename += "_".concat(versionName);
      }

      external_CoreHome_["AjaxHelper"].fetch(params).then(function (exportedContainer) {
        external_CoreHome_["Matomo"].helper.sendContentAsDownload("".concat(filename, ".json"), JSON.stringify(exportedContainer));
      });
    },
    editVersion: function editVersion(idContainerVersion) {
      external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
        idContainerVersion: idContainerVersion
      }));
    },
    importVersion: function importVersion() {
      VersionListvue_type_script_lang_ts_tagManagerHelper.importVersion(null, this.idContainer);
    },
    deleteVersion: function deleteVersion(version) {
      var _this2 = this;

      var doDelete = function doDelete() {
        Versions_store.deleteVersion(_this2.idContainer, version.idcontainerversion).then(function () {
          Versions_store.reload(_this2.idContainer);
        });
      };

      external_CoreHome_["Matomo"].helper.modalConfirm(this.$refs.confirmDeleteVersion, {
        yes: doDelete
      });
    },
    ucfirst: function ucfirst(s) {
      return "".concat(s.substring(0, 1).toUpperCase()).concat(s.substring(1));
    },
    getExportUrl: function getExportUrl(version) {
      return "?module=TagManager&action=exportContainerVersion&idContainer=".concat(this.idContainer) + "&idContainerVersion=".concat(version.idcontainerversion, "&idSite=").concat(version.idsite) + '&period=day&date=yesterday';
    },
    getExportDraftUrl: function getExportDraftUrl() {
      return "?module=TagManager&action=exportContainerVersion&idContainer=".concat(this.idContainer) + "&idSite=".concat(this.idSite, "&period=day&date=yesterday");
    }
  },
  computed: {
    environments: function environments() {
      return AvailableEnvironments_store.environmentsWithPublishOptions.value;
    },
    availableEnvironmentsToPublish: function availableEnvironmentsToPublish() {
      var _this3 = this;

      var deployEnvironment = '';
      var environnments = this.environments.filter(function (env) {
        var _this3$versionToBePub, _this3$versionToBePub2;

        if (!((_this3$versionToBePub = _this3.versionToBePublished) !== null && _this3$versionToBePub !== void 0 && _this3$versionToBePub.releases)) {
          return true;
        }

        var found = (_this3$versionToBePub2 = _this3.versionToBePublished) === null || _this3$versionToBePub2 === void 0 ? void 0 : _this3$versionToBePub2.releases.some(function (r) {
          return r.environment === (env === null || env === void 0 ? void 0 : env.key);
        });

        if (!found && !deployEnvironment) {
          deployEnvironment = env.key;
        }

        return !found;
      });
      return {
        deployEnvironment: deployEnvironment,
        environnments: environnments
      };
    },
    idSite: function idSite() {
      return external_CoreHome_["Matomo"].idSite;
    },
    isLoading: function isLoading() {
      return Versions_store.isLoading.value;
    },
    isUpdating: function isUpdating() {
      return Versions_store.isUpdating.value;
    },
    versions: function versions() {
      return Versions_store.versions.value;
    },
    sortedVersions: function sortedVersions() {
      var sorted = VersionListvue_type_script_lang_ts_toConsumableArray(this.versions);

      sorted.sort(function (lhs, rhs) {
        if (lhs.revision < rhs.revision) {
          return 1;
        }

        return lhs.revision > rhs.revision ? 0 : 1;
      });
      return sorted;
    },
    hasWriteAccess: function hasWriteAccess() {
      return external_CoreHome_["Matomo"].hasUserCapability('tagmanager_write');
    },
    canPublishToLive: function canPublishToLive() {
      return external_CoreHome_["Matomo"].hasUserCapability('tagmanager_publish_live_container');
    },
    revisionTranslatedText: function revisionTranslatedText() {
      return this.translate('TagManager_VersionsRevisionDescription');
    },
    nameTranslatedText: function nameTranslatedText() {
      return this.translate('TagManager_VersionsNameDescription');
    },
    descriptionTranslatedText: function descriptionTranslatedText() {
      return this.translate('TagManager_VersionsDescriptionDescription');
    },
    environmentTranslatedText: function environmentTranslatedText() {
      return this.translate('TagManager_VersionsEnvironmentsDescription');
    },
    createdTranslatedText: function createdTranslatedText() {
      return this.translate('TagManager_VersionsCreatedDescription');
    },
    actionTranslatedText: function actionTranslatedText() {
      return this.translate('TagManager_VersionsActionDescription');
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionList.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionList.vue



VersionListvue_type_script_lang_ts.render = VersionListvue_type_template_id_984acb68_render

/* harmony default export */ var VersionList = (VersionListvue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionList.adapter.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


/* harmony default export */ var VersionList_adapter = (Object(external_CoreHome_["createAngularJsAdapter"])({
  component: VersionList,
  scope: {
    idContainer: {
      angularJsBind: '='
    }
  },
  directiveName: 'piwikVersionList'
}));
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Version/VersionManage.vue?vue&type=template&id=50bd0b30

var VersionManagevue_type_template_id_50bd0b30_hoisted_1 = {
  class: "manageVersion"
};
var VersionManagevue_type_template_id_50bd0b30_hoisted_2 = {
  key: 0
};
var VersionManagevue_type_template_id_50bd0b30_hoisted_3 = {
  key: 1
};
function VersionManagevue_type_template_id_50bd0b30_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_VersionList = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("VersionList");

  var _component_VersionEdit = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("VersionEdit");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VersionManagevue_type_template_id_50bd0b30_hoisted_1, [!_ctx.editMode ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VersionManagevue_type_template_id_50bd0b30_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_VersionList, {
    "id-container": _ctx.idContainer,
    "versions-help-text": _ctx.versionsHelpText
  }, null, 8, ["id-container", "versions-help-text"])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.editMode ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VersionManagevue_type_template_id_50bd0b30_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_VersionEdit, {
    "id-container": _ctx.idContainer,
    "id-container-version": _ctx.idContainerVersion
  }, null, 8, ["id-container", "id-container-version"])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionManage.vue?vue&type=template&id=50bd0b30

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Version/VersionManage.vue?vue&type=script&lang=ts




/* harmony default export */ var VersionManagevue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idContainer: String,
    versionsHelpText: String
  },
  components: {
    VersionList: VersionList,
    VersionEdit: VersionEdit
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
      return external_CoreHome_["MatomoUrl"].hashParsed.value.idContainerVersion;
    }, function (v) {
      _this.onIdContainerVersionParamChange(v);
    });
    external_CoreHome_["NotificationsStore"].remove('versiontagmanagement');
    this.onIdContainerVersionParamChange(external_CoreHome_["MatomoUrl"].hashParsed.value.idContainerVersion);
  },
  methods: {
    onIdContainerVersionParamChange: function onIdContainerVersionParamChange(idContainerVersion) {
      // for BC w/ angularjs only invoke event if idContainerVersion is 0
      if (idContainerVersion === '0') {
        var parameters = {
          isAllowed: true
        };
        external_CoreHome_["Matomo"].postEvent('TagManager.initAddVersion', parameters);
        this.isAddAllowed = !!parameters.isAllowed;
      }
    }
  },
  computed: {
    idContainerVersion: function idContainerVersion() {
      var idContainerVersion = external_CoreHome_["MatomoUrl"].hashParsed.value.idContainerVersion;

      if (!this.isAddAllowed && idContainerVersion === '0') {
        return null;
      }

      return idContainerVersion ? parseInt(idContainerVersion, 10) : idContainerVersion;
    },
    editMode: function editMode() {
      return typeof this.idContainerVersion === 'number';
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionManage.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionManage.vue



VersionManagevue_type_script_lang_ts.render = VersionManagevue_type_template_id_50bd0b30_render

/* harmony default export */ var VersionManage = (VersionManagevue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionManage.adapter.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


/* harmony default export */ var VersionManage_adapter = (Object(external_CoreHome_["createAngularJsAdapter"])({
  component: VersionManage,
  scope: {
    idContainer: {
      angularJsBind: '@'
    },
    versionsHelpText: {
      angularJsBind: '@'
    }
  },
  directiveName: 'piwikVersionManage'
}));
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Container/ContainerEdit.vue?vue&type=template&id=74a2f037

var ContainerEditvue_type_template_id_74a2f037_hoisted_1 = {
  class: "loadingPiwik"
};

var ContainerEditvue_type_template_id_74a2f037_hoisted_2 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);

var ContainerEditvue_type_template_id_74a2f037_hoisted_3 = {
  class: "loadingPiwik"
};

var ContainerEditvue_type_template_id_74a2f037_hoisted_4 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);

var ContainerEditvue_type_template_id_74a2f037_hoisted_5 = {
  class: "entityCancel"
};
function ContainerEditvue_type_template_id_74a2f037_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");

  var _component_SaveButton = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("SaveButton");

  var _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_ContentBlock, {
    class: "editContainer tagManagerManageEdit",
    feature: "Tag Manager",
    "content-title": _ctx.editTitle
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", ContainerEditvue_type_template_id_74a2f037_hoisted_1, [ContainerEditvue_type_template_id_74a2f037_hoisted_2, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_LoadingData')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isLoading]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", ContainerEditvue_type_template_id_74a2f037_hoisted_3, [ContainerEditvue_type_template_id_74a2f037_hoisted_4, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_UpdatingData')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isUpdating]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("form", {
        onSubmit: _cache[5] || (_cache[5] = function ($event) {
          return _ctx.edit ? _ctx.updateContainer() : _ctx.createContainer();
        })
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "text",
        name: "idcontainer",
        "model-value": _ctx.container.idcontainer,
        disabled: true,
        title: _ctx.translate('General_Id')
      }, null, 8, ["model-value", "title"]), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.edit]])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "select",
        name: "context",
        "model-value": _ctx.container.context,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
          _ctx.container.context = $event;

          _ctx.setValueHasChanged();
        }),
        disabled: true,
        options: _ctx.contexts,
        title: _ctx.translate('TagManager_Context'),
        "inline-help": _ctx.translate('TagManager_ContainerContextHelp')
      }, null, 8, ["model-value", "options", "title", "inline-help"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "text",
        name: "name",
        "model-value": _ctx.container.name,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
          _ctx.container.name = $event;

          _ctx.setValueHasChanged();
        }),
        maxlength: 50,
        title: _ctx.translate('General_Name'),
        "inline-help": _ctx.translate('TagManager_ContainerNameHelp')
      }, null, 8, ["model-value", "title", "inline-help"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "textarea",
        name: "description",
        "model-value": _ctx.container.description,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
          _ctx.container.description = $event;

          _ctx.setValueHasChanged();
        }),
        title: _ctx.translate('General_Description'),
        "inline-help": _ctx.translate('TagManager_ContainerDescriptionHelp')
      }, null, 8, ["model-value", "title", "inline-help"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_SaveButton, {
        class: "createButton",
        onConfirm: _cache[3] || (_cache[3] = function ($event) {
          return _ctx.edit ? _ctx.updateContainer() : _ctx.createContainer();
        }),
        disabled: _ctx.isUpdating || !_ctx.isDirty,
        saving: _ctx.isUpdating,
        value: _ctx.edit ? _ctx.translate('CoreUpdater_UpdateTitle') : _ctx.translate('TagManager_CreateNewContainer')
      }, null, 8, ["disabled", "saving", "value"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ContainerEditvue_type_template_id_74a2f037_hoisted_5, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        onClick: _cache[4] || (_cache[4] = function ($event) {
          return _ctx.cancel();
        })
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Cancel')), 1)])])], 32)];
    }),
    _: 1
  }, 8, ["content-title"]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Container/ContainerEdit.vue?vue&type=template&id=74a2f037

// CONCATENATED MODULE: ./plugins/TagManager/vue/src/AvailableContexts.store.ts
function AvailableContexts_store_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AvailableContexts_store_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function AvailableContexts_store_createClass(Constructor, protoProps, staticProps) { if (protoProps) AvailableContexts_store_defineProperties(Constructor.prototype, protoProps); if (staticProps) AvailableContexts_store_defineProperties(Constructor, staticProps); return Constructor; }

function AvailableContexts_store_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */



var AvailableContexts_store_AvailableContextStore = /*#__PURE__*/function () {
  function AvailableContextStore() {
    var _this = this;

    AvailableContexts_store_classCallCheck(this, AvailableContextStore);

    AvailableContexts_store_defineProperty(this, "privateState", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      contexts: [],
      isLoading: false
    }));

    AvailableContexts_store_defineProperty(this, "state", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(_this.privateState);
    }));

    AvailableContexts_store_defineProperty(this, "isLoading", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return _this.state.value.isLoading;
    }));

    AvailableContexts_store_defineProperty(this, "contexts", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return _this.state.value.contexts;
    }));

    AvailableContexts_store_defineProperty(this, "contextsOptions", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return _this.contexts.value.map(function (_ref) {
        var id = _ref.id,
            name = _ref.name;
        return {
          key: id,
          value: name
        };
      });
    }));

    AvailableContexts_store_defineProperty(this, "initializePromise", null);
  }

  AvailableContexts_store_createClass(AvailableContextStore, [{
    key: "init",
    value: function init() {
      if (!this.initializePromise) {
        this.initializePromise = this.fetchAvailableContexts();
      }

      return this.initializePromise;
    }
  }, {
    key: "fetchAvailableContexts",
    value: function fetchAvailableContexts() {
      var _this2 = this;

      this.privateState.isLoading = true;
      return external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getAvailableContexts',
        filter_limit: '-1'
      }).then(function (contexts) {
        var entities;

        if (Array.isArray(contexts)) {
          entities = contexts;
        } else {
          entities = Object.values(contexts);
        }

        _this2.privateState.contexts = entities;
      }).finally(function () {
        _this2.privateState.isLoading = false;
      });
    }
  }]);

  return AvailableContextStore;
}();

/* harmony default export */ var AvailableContexts_store = (new AvailableContexts_store_AvailableContextStore());
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Container/Containers.store.ts
function Containers_store_toConsumableArray(arr) { return Containers_store_arrayWithoutHoles(arr) || Containers_store_iterableToArray(arr) || Containers_store_unsupportedIterableToArray(arr) || Containers_store_nonIterableSpread(); }

function Containers_store_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Containers_store_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Containers_store_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Containers_store_arrayLikeToArray(o, minLen); }

function Containers_store_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function Containers_store_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return Containers_store_arrayLikeToArray(arr); }

function Containers_store_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Containers_store_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Containers_store_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Containers_store_createClass(Constructor, protoProps, staticProps) { if (protoProps) Containers_store_defineProperties(Constructor.prototype, protoProps); if (staticProps) Containers_store_defineProperties(Constructor, staticProps); return Constructor; }

function Containers_store_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */



var Containers_store_ContainersStore = /*#__PURE__*/function () {
  function ContainersStore() {
    var _this = this;

    Containers_store_classCallCheck(this, ContainersStore);

    Containers_store_defineProperty(this, "privateState", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      containers: [],
      isLoadingContainers: false,
      isLoadingSingle: false,
      isUpdating: false
    }));

    Containers_store_defineProperty(this, "state", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(_this.privateState);
    }));

    Containers_store_defineProperty(this, "isLoading", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      var state = _this.state.value;
      return state.isLoadingContainers || state.isLoadingSingle;
    }));

    Containers_store_defineProperty(this, "isUpdating", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return _this.state.value.isUpdating;
    }));

    Containers_store_defineProperty(this, "containers", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function () {
      return _this.state.value.containers;
    }));

    Containers_store_defineProperty(this, "fetchPromise", null);
  }

  Containers_store_createClass(ContainersStore, [{
    key: "reload",
    value: function reload() {
      this.privateState.containers = [];
      this.fetchPromise = null;
      return this.fetchContainers();
    }
  }, {
    key: "fetchContainers",
    value: function fetchContainers() {
      var _this2 = this;

      this.privateState.isLoadingContainers = true;
      this.privateState.containers = [];

      if (!this.fetchPromise) {
        this.fetchPromise = external_CoreHome_["AjaxHelper"].fetch({
          method: 'TagManager.getContainers',
          filter_limit: '-1'
        });
      }

      return Promise.resolve(this.fetchPromise).then(function (containers) {
        _this2.privateState.containers = containers;
        _this2.privateState.isLoadingContainers = false;
        return _this2.containers.value;
      }).finally(function () {
        _this2.privateState.isLoadingContainers = false;
      });
    }
  }, {
    key: "findContainer",
    value: function findContainer(idContainer) {
      var _this3 = this;

      // before going through an API request we first try to find it in loaded containers
      var found = this.containers.value.find(function (v) {
        return v.idcontainer === idContainer;
      });

      if (found) {
        return Promise.resolve(found);
      } // otherwise we fetch it via API


      this.privateState.isLoadingSingle = true;
      return external_CoreHome_["AjaxHelper"].fetch({
        idContainer: idContainer,
        method: 'TagManager.getContainer',
        filter_limit: '-1'
      }).then(function (record) {
        _this3.privateState.containers = [].concat(Containers_store_toConsumableArray(_this3.privateState.containers), [record]);
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(record);
      }).finally(function () {
        _this3.privateState.isLoadingSingle = false;
      });
    }
  }, {
    key: "deleteContainer",
    value: function deleteContainer(idContainer) {
      var _this4 = this;

      this.privateState.isUpdating = true;
      this.privateState.containers = [];
      return external_CoreHome_["AjaxHelper"].fetch({
        idContainer: idContainer,
        method: 'TagManager.deleteContainer'
      }, {
        withTokenInUrl: true
      }).finally(function () {
        _this4.privateState.isUpdating = false;
      });
    }
  }, {
    key: "createOrUpdateContainer",
    value: function createOrUpdateContainer(container, method) {
      var _this5 = this;

      this.privateState.isUpdating = true;
      return external_CoreHome_["AjaxHelper"].post({
        method: method,
        idContainer: container.idcontainer
      }, {
        name: container.name,
        description: container.description,
        context: container.context
      }, {
        withTokenInUrl: true
      }).finally(function () {
        _this5.privateState.isUpdating = false;
      });
    }
  }]);

  return ContainersStore;
}();

/* harmony default export */ var Containers_store = (new Containers_store_ContainersStore());
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Container/ContainerEdit.vue?vue&type=script&lang=ts







var ContainerEditvue_type_script_lang_ts_notificationId = 'containertagmanagement';
/* harmony default export */ var ContainerEditvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idContainer: String
  },
  components: {
    ContentBlock: external_CoreHome_["ContentBlock"],
    Field: external_CorePluginsAdmin_["Field"],
    SaveButton: external_CorePluginsAdmin_["SaveButton"]
  },
  data: function data() {
    return {
      isDirty: false,
      editTitle: '',
      isUpdatingVersion: false,
      container: {}
    };
  },
  created: function created() {
    AvailableContexts_store.init();
    AvailableComparisons_store.init();
    this.initIdContainer();
  },
  watch: {
    idContainer: function idContainer(newValue) {
      if (newValue === null) {
        return;
      }

      this.initIdContainer();
    }
  },
  methods: {
    removeAnyContainerNotification: function removeAnyContainerNotification() {
      external_CoreHome_["NotificationsStore"].remove(ContainerEditvue_type_script_lang_ts_notificationId);
      external_CoreHome_["NotificationsStore"].remove('ajaxHelper');
    },
    showNotification: function showNotification(message, context) {
      var notificationInstanceId = external_CoreHome_["NotificationsStore"].show({
        message: message,
        context: context,
        id: ContainerEditvue_type_script_lang_ts_notificationId,
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
    initIdContainer: function initIdContainer() {
      var _this = this;

      this.container = {};
      external_CoreHome_["Matomo"].helper.lazyScrollToContent();

      if (this.edit && this.idContainer) {
        this.editTitle = Object(external_CoreHome_["translate"])('TagManager_EditContainer');
        Containers_store.findContainer(this.idContainer).then(function (container) {
          if (!container) {
            return;
          }

          _this.container = Object(external_CoreHome_["clone"])(container);
          _this.isDirty = false;
        });
      } else if (this.create) {
        this.editTitle = Object(external_CoreHome_["translate"])('TagManager_CreateNewContainer');
        this.container = {
          idSite: external_CoreHome_["Matomo"].idSite,
          name: '',
          context: 'web',
          description: ''
        };
        this.isDirty = false;
      }
    },
    cancel: function cancel() {
      var newParams = Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value);
      delete newParams.idContainer;
      external_CoreHome_["MatomoUrl"].updateHash(newParams);
    },
    createContainer: function createContainer() {
      var _this2 = this;

      this.removeAnyContainerNotification();

      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }

      this.isUpdatingVersion = true;
      Containers_store.createOrUpdateContainer(this.container, 'TagManager.addContainer').then(function (response) {
        _this2.isUpdatingVersion = false;

        if (!response) {
          return;
        }

        _this2.isDirty = false;
        var idContainer = response.value;

        _this2.showNotification(Object(external_CoreHome_["translate"])('TagManager_CreatedX', Object(external_CoreHome_["translate"])('TagManager_Container')), 'success');

        external_CoreHome_["MatomoUrl"].updateUrl(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].urlParsed.value), {}, {
          module: 'TagManager',
          action: 'dashboard',
          idContainer: idContainer
        }));
      }).finally(function () {
        _this2.isUpdatingVersion = false;
      });
    },
    setValueHasChanged: function setValueHasChanged() {
      this.isDirty = true;
    },
    updateContainer: function updateContainer() {
      var _this3 = this;

      this.removeAnyContainerNotification();

      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }

      this.isUpdating = true;
      Containers_store.createOrUpdateContainer(this.container, 'TagManager.updateContainer').then(function (response) {
        if (!response) {
          return;
        }

        _this3.isDirty = false;
        _this3.container = {};
        Containers_store.reload().then(function () {
          _this3.initIdContainer();
        });

        _this3.showNotification(Object(external_CoreHome_["translate"])('TagManager_UpdatedX', Object(external_CoreHome_["translate"])('TagManager_Container')), 'success');
      });
    },
    checkRequiredFieldsAreSet: function checkRequiredFieldsAreSet() {
      if (!this.container.name) {
        var title = Object(external_CoreHome_["translate"])('General_Name');
        this.showErrorFieldNotProvidedNotification(title);
        return false;
      }

      return true;
    }
  },
  computed: {
    contexts: function contexts() {
      return AvailableContexts_store.contextsOptions.value;
    },
    create: function create() {
      return this.idContainer === '0';
    },
    edit: function edit() {
      return !this.create;
    },
    isLoading: function isLoading() {
      return Variables_store.isLoading.value || AvailableComparisons_store.isLoading.value;
    },
    isUpdating: function isUpdating() {
      return Variables_store.isUpdating.value || this.isUpdatingVersion;
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Container/ContainerEdit.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Container/ContainerEdit.vue



ContainerEditvue_type_script_lang_ts.render = ContainerEditvue_type_template_id_74a2f037_render

/* harmony default export */ var ContainerEdit = (ContainerEditvue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Container/ContainerEdit.adapter.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


/* harmony default export */ var ContainerEdit_adapter = (Object(external_CoreHome_["createAngularJsAdapter"])({
  component: ContainerEdit,
  scope: {
    idContainer: {
      angularJsBind: '='
    }
  },
  directiveName: 'piwikContainerEdit'
}));
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Container/ContainerList.vue?vue&type=template&id=500bd8dd

var ContainerListvue_type_template_id_500bd8dd_hoisted_1 = {
  class: "tagManagerManageList tagManagerContainerList"
};
var ContainerListvue_type_template_id_500bd8dd_hoisted_2 = {
  class: "index"
};
var ContainerListvue_type_template_id_500bd8dd_hoisted_3 = {
  class: "name"
};
var ContainerListvue_type_template_id_500bd8dd_hoisted_4 = {
  class: "description"
};
var ContainerListvue_type_template_id_500bd8dd_hoisted_5 = {
  class: "created"
};
var ContainerListvue_type_template_id_500bd8dd_hoisted_6 = {
  class: "action"
};
var ContainerListvue_type_template_id_500bd8dd_hoisted_7 = {
  colspan: "5"
};
var ContainerListvue_type_template_id_500bd8dd_hoisted_8 = {
  class: "loadingPiwik"
};

var ContainerListvue_type_template_id_500bd8dd_hoisted_9 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);

var ContainerListvue_type_template_id_500bd8dd_hoisted_10 = {
  colspan: "5"
};
var ContainerListvue_type_template_id_500bd8dd_hoisted_11 = ["id"];
var ContainerListvue_type_template_id_500bd8dd_hoisted_12 = ["title"];
var ContainerListvue_type_template_id_500bd8dd_hoisted_13 = {
  class: "name"
};
var ContainerListvue_type_template_id_500bd8dd_hoisted_14 = ["title"];
var ContainerListvue_type_template_id_500bd8dd_hoisted_15 = {
  class: "created"
};
var ContainerListvue_type_template_id_500bd8dd_hoisted_16 = {
  class: "action"
};
var ContainerListvue_type_template_id_500bd8dd_hoisted_17 = ["href", "title"];
var ContainerListvue_type_template_id_500bd8dd_hoisted_18 = ["onClick", "title"];
var ContainerListvue_type_template_id_500bd8dd_hoisted_19 = ["onClick", "title"];
var ContainerListvue_type_template_id_500bd8dd_hoisted_20 = ["onClick", "title"];
var ContainerListvue_type_template_id_500bd8dd_hoisted_21 = {
  class: "tableActionBar"
};

var ContainerListvue_type_template_id_500bd8dd_hoisted_22 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, null, -1);

var ContainerListvue_type_template_id_500bd8dd_hoisted_23 = {
  class: "ui-confirm",
  id: "confirmDeleteContainer",
  ref: "confirmDeleteContainer"
};
var ContainerListvue_type_template_id_500bd8dd_hoisted_24 = ["value"];
var ContainerListvue_type_template_id_500bd8dd_hoisted_25 = ["value"];
function ContainerListvue_type_template_id_500bd8dd_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");

  var _directive_content_table = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("content-table");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", ContainerListvue_type_template_id_500bd8dd_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: "Tag Manager",
    "content-title": _ctx.translate('TagManager_ManageX', _ctx.translate('TagManager_Containers'))
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ContainerUsageBenefits')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("table", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", ContainerListvue_type_template_id_500bd8dd_hoisted_2, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Id')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", ContainerListvue_type_template_id_500bd8dd_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Name')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", ContainerListvue_type_template_id_500bd8dd_hoisted_4, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Description')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", ContainerListvue_type_template_id_500bd8dd_hoisted_5, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreatedDate')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", ContainerListvue_type_template_id_500bd8dd_hoisted_6, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Actions')), 1)])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", ContainerListvue_type_template_id_500bd8dd_hoisted_7, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", ContainerListvue_type_template_id_500bd8dd_hoisted_8, [ContainerListvue_type_template_id_500bd8dd_hoisted_9, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_LoadingData')), 1)])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isLoading || _ctx.isUpdating]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", ContainerListvue_type_template_id_500bd8dd_hoisted_10, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_NoContainersFound')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "createContainerNow",
        onClick: _cache[0] || (_cache[0] = function ($event) {
          return _ctx.createContainer();
        })
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewContainerNow')), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isLoading && _ctx.containers.length === 0]]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.sortedContainers, function (container) {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
          id: "container".concat(container.idcontainer),
          class: "containers",
          key: container.idcontainer
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
          class: "index",
          title: "".concat(_ctx.translate('TagManager_Context'), ": ") + _ctx.contexts[container.context]
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(container.idcontainer), 9, ContainerListvue_type_template_id_500bd8dd_hoisted_12), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", ContainerListvue_type_template_id_500bd8dd_hoisted_13, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(container.name), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
          class: "description",
          title: container.description
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.truncateText(container.description, 50)), 9, ContainerListvue_type_template_id_500bd8dd_hoisted_14), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", ContainerListvue_type_template_id_500bd8dd_hoisted_15, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(container.created_date_pretty), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", ContainerListvue_type_template_id_500bd8dd_hoisted_16, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
          class: "table-action icon-configure",
          href: '?module=TagManager&action=' + _ctx.containerDefaultAction + '&idContainer=' + container.idcontainer + '&idSite=' + container.idsite + '&period=day&date=yesterday',
          title: _ctx.translate('TagManager_ConfigureX', _ctx.translate('TagManager_Container'))
        }, null, 8, ContainerListvue_type_template_id_500bd8dd_hoisted_17), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
          class: "table-action installCode icon-embed",
          onClick: function onClick($event) {
            return _ctx.installCode(container.idcontainer);
          },
          title: _ctx.translate('TagManager_InstallCode')
        }, null, 8, ContainerListvue_type_template_id_500bd8dd_hoisted_18), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
          class: "table-action icon-edit",
          onClick: function onClick($event) {
            return _ctx.editContainer(container.idcontainer);
          },
          title: _ctx.translate('TagManager_EditX', _ctx.translate('TagManager_Container'))
        }, null, 8, ContainerListvue_type_template_id_500bd8dd_hoisted_19), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
          class: "table-action icon-delete",
          onClick: function onClick($event) {
            return _ctx.deleteContainer(container);
          },
          title: _ctx.translate('TagManager_DeleteX', _ctx.translate('TagManager_Container'))
        }, null, 8, ContainerListvue_type_template_id_500bd8dd_hoisted_20), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])])], 8, ContainerListvue_type_template_id_500bd8dd_hoisted_11);
      }), 128))])], 512), [[_directive_content_table]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ContainerListvue_type_template_id_500bd8dd_hoisted_21, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "createNewContainer",
        value: "",
        onClick: _cache[1] || (_cache[1] = function ($event) {
          return _ctx.createContainer();
        })
      }, [ContainerListvue_type_template_id_500bd8dd_hoisted_22, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewContainer')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])];
    }),
    _: 1
  }, 8, ["content-title"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ContainerListvue_type_template_id_500bd8dd_hoisted_23, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_DeleteContainerConfirm')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "yes",
    type: "button",
    value: _ctx.translate('General_Yes')
  }, null, 8, ContainerListvue_type_template_id_500bd8dd_hoisted_24), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "no",
    type: "button",
    value: _ctx.translate('General_No')
  }, null, 8, ContainerListvue_type_template_id_500bd8dd_hoisted_25)], 512)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Container/ContainerList.vue?vue&type=template&id=500bd8dd

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Container/ContainerList.vue?vue&type=script&lang=ts
function ContainerListvue_type_script_lang_ts_toConsumableArray(arr) { return ContainerListvue_type_script_lang_ts_arrayWithoutHoles(arr) || ContainerListvue_type_script_lang_ts_iterableToArray(arr) || ContainerListvue_type_script_lang_ts_unsupportedIterableToArray(arr) || ContainerListvue_type_script_lang_ts_nonIterableSpread(); }

function ContainerListvue_type_script_lang_ts_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function ContainerListvue_type_script_lang_ts_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return ContainerListvue_type_script_lang_ts_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ContainerListvue_type_script_lang_ts_arrayLikeToArray(o, minLen); }

function ContainerListvue_type_script_lang_ts_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function ContainerListvue_type_script_lang_ts_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return ContainerListvue_type_script_lang_ts_arrayLikeToArray(arr); }

function ContainerListvue_type_script_lang_ts_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }






var ContainerListvue_type_script_lang_ts_window = window,
    ContainerListvue_type_script_lang_ts_tagManagerHelper = ContainerListvue_type_script_lang_ts_window.tagManagerHelper;
/* harmony default export */ var ContainerListvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  components: {
    ContentBlock: external_CoreHome_["ContentBlock"]
  },
  directives: {
    ContentTable: external_CoreHome_["ContentTable"]
  },
  created: function created() {
    AvailableContexts_store.init();
    Containers_store.fetchContainers();
  },
  computed: {
    contexts: function contexts() {
      var result = {};
      AvailableContexts_store.contexts.value.forEach(function (_ref) {
        var id = _ref.id,
            name = _ref.name;
        result[id] = name;
      });
      return result;
    },
    hasWriteAccess: function hasWriteAccess() {
      return external_CoreHome_["Matomo"].hasUserCapability('tagmanager_write');
    },
    containerDefaultAction: function containerDefaultAction() {
      return this.hasWriteAccess ? 'dashboard' : 'manageTags';
    },
    isLoading: function isLoading() {
      return Versions_store.isLoading.value;
    },
    isUpdating: function isUpdating() {
      return Versions_store.isUpdating.value;
    },
    containers: function containers() {
      return Containers_store.containers.value;
    },
    sortedContainers: function sortedContainers() {
      var sorted = ContainerListvue_type_script_lang_ts_toConsumableArray(this.containers);

      sorted.sort(function (lhs, rhs) {
        if (lhs.created_date < rhs.created_date) {
          return 1;
        }

        return lhs.created_date > rhs.created_date ? -1 : 0;
      });
      return sorted;
    }
  },
  methods: {
    createContainer: function createContainer() {
      this.editContainer('0');
    },
    editContainer: function editContainer(idContainer) {
      external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
        idContainer: idContainer
      }));
    },
    installCode: function installCode(idContainer) {
      ContainerListvue_type_script_lang_ts_tagManagerHelper.showInstallCode(idContainer);
    },
    deleteContainer: function deleteContainer(container) {
      function doDelete() {
        Containers_store.deleteContainer(container.idcontainer).then(function () {
          Containers_store.reload();
        });
      }

      external_CoreHome_["Matomo"].helper.modalConfirm(this.$refs.confirmDeleteContainer, {
        yes: doDelete
      });
    },
    truncateText: function truncateText(text, length) {
      if (text.length > length) {
        return "".concat(text.substr(0, length - 3), "...");
      }

      return text;
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Container/ContainerList.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Container/ContainerList.vue



ContainerListvue_type_script_lang_ts.render = ContainerListvue_type_template_id_500bd8dd_render

/* harmony default export */ var ContainerList = (ContainerListvue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Container/ContainerList.adapter.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


/* harmony default export */ var ContainerList_adapter = (Object(external_CoreHome_["createAngularJsAdapter"])({
  component: ContainerList,
  directiveName: 'piwikContainerList'
}));
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Container/ContainerManage.vue?vue&type=template&id=2e778f03

var ContainerManagevue_type_template_id_2e778f03_hoisted_1 = {
  class: "manageContainer"
};
function ContainerManagevue_type_template_id_2e778f03_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_ContainerList = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContainerList");

  var _component_ContainerEdit = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContainerEdit");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", ContainerManagevue_type_template_id_2e778f03_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContainerList)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.editMode]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContainerEdit, {
    "id-container": _ctx.idContainer
  }, null, 8, ["id-container"])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.editMode]])]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Container/ContainerManage.vue?vue&type=template&id=2e778f03

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Container/ContainerManage.vue?vue&type=script&lang=ts




/* harmony default export */ var ContainerManagevue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {},
  components: {
    ContainerList: ContainerList,
    ContainerEdit: ContainerEdit
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
      return external_CoreHome_["MatomoUrl"].hashParsed.value.idContainer;
    }, function (v) {
      _this.onIdContainerParamChange(v);
    });
    external_CoreHome_["NotificationsStore"].remove('containertagmanagement');
    this.onIdContainerParamChange(external_CoreHome_["MatomoUrl"].hashParsed.value.idContainer);
  },
  computed: {
    idContainer: function idContainer() {
      var idContainer = external_CoreHome_["MatomoUrl"].hashParsed.value.idContainer;

      if (!this.isAddAllowed && idContainer === '') {
        return null;
      }

      return idContainer;
    },
    editMode: function editMode() {
      return !!this.idContainer;
    }
  },
  methods: {
    onIdContainerParamChange: function onIdContainerParamChange(idContainer) {
      // for BC w/ angularjs only invoke event if idContainer is 0
      if (idContainer === '0') {
        var parameters = {
          isAllowed: true
        };
        external_CoreHome_["Matomo"].postEvent('TagManager.initAddVersion', parameters);
        this.isAddAllowed = !!parameters.isAllowed;
      }
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Container/ContainerManage.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Container/ContainerManage.vue



ContainerManagevue_type_script_lang_ts.render = ContainerManagevue_type_template_id_2e778f03_render

/* harmony default export */ var ContainerManage = (ContainerManagevue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Container/ContainerManage.adapter.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


/* harmony default export */ var ContainerManage_adapter = (Object(external_CoreHome_["createAngularJsAdapter"])({
  component: ContainerManage,
  directiveName: 'piwikContainerManage'
}));
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/ContainerDashboard/ContainerDashboard.vue?vue&type=template&id=a8ae88ee

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_1 = {
  class: "containerDashboard"
};
var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_2 = {
  key: 0
};
var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_3 = {
  class: "dashboardCreationDate"
};
var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_4 = {
  key: 0
};

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_5 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_6 = {
  class: "row",
  style: {
    "margin-left": "-0.75rem"
  }
};
var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_7 = {
  class: "col m6 s12"
};
var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_8 = {
  key: 0
};
var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_9 = ["href", "title"];
var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_10 = {
  key: 0
};

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_11 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("hr", null, null, -1);

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_12 = ["href"];

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_13 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-edit"
}, null, -1);

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_14 = ["href"];

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_15 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, null, -1);

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_16 = {
  class: "col m6 s12"
};
var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_17 = {
  key: 0
};
var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_18 = ["href", "title"];

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_19 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("hr", null, null, -1);

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_20 = ["href"];

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_21 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-edit"
}, null, -1);

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_22 = ["href"];

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_23 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, null, -1);

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_24 = {
  class: "row",
  style: {
    "margin-left": "-0.75rem"
  }
};
var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_25 = {
  class: "col m6 s12"
};
var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_26 = ["href", "title"];
var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_27 = {
  key: 0
};

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_28 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("hr", null, null, -1);

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_29 = ["href"];

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_30 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-edit"
}, null, -1);

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_31 = ["href"];

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_32 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, null, -1);

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_33 = {
  class: "col m6 s12"
};
var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_34 = ["title", "href"];
var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_35 = {
  key: 0
};

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_36 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_37 = ["title"];
var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_38 = {
  key: 0
};

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_39 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("hr", null, null, -1);

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_40 = ["href"];

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_41 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-edit"
}, null, -1);

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_42 = ["href"];

var ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_43 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, null, -1);

function ContainerDashboardvue_type_template_id_a8ae88ee_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _ctx$containerVersion, _ctx$containerVersion2;

  var _component_ActivityIndicator = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ActivityIndicator");

  var _component_EnrichedHeadline = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("EnrichedHeadline");

  var _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");

  var _directive_content_intro = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("content-intro");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ActivityIndicator, {
    loading: _ctx.isLoading
  }, null, 8, ["loading"]), !_ctx.isLoading ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_EnrichedHeadline, {
    "feature-name": "Tag Manager",
    "inline-help": _ctx.dashboardHelpText
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      var _ctx$container;

      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ContainerX', (_ctx$container = _ctx.container) === null || _ctx$container === void 0 ? void 0 : _ctx$container.name)), 1)];
    }),
    _: 1
  }, 8, ["inline-help"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.containerMetaInformation) + " ", 1), (_ctx$containerVersion = _ctx.containerVersion) !== null && _ctx$containerVersion !== void 0 && _ctx$containerVersion.description ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_4, [ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_5, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Description')) + ": " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])((_ctx$containerVersion2 = _ctx.containerVersion) === null || _ctx$containerVersion2 === void 0 ? void 0 : _ctx$containerVersion2.description), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])], 512), [[_directive_content_intro]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_6, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_7, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: "Tag Manager",
    "content-title": "".concat(_ctx.tagCount, " ").concat(_ctx.translate('TagManager_Tags')),
    "help-text": _ctx.tagsHelpText
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [_ctx.tagCount ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Names')) + ": ", 1), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.sortedContainerVersionTags, function (tag, index) {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
          key: index
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
          href: _ctx.linkTo('manageTags', {
            idTag: tag.idtag
          }),
          title: _ctx.translate('TagManager_EntityDateTypeMetaInformation', tag.created_date_pretty, tag.updated_date_pretty, tag.type)
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(tag.name), 9, ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_9), index !== _ctx.sortedContainerVersionTags.length - 1 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_10, ", ")) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
      }), 128))])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_11, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "btn-flat",
        href: _ctx.linkTo('manageTags')
      }, [ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_13, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_EditTags')), 1)], 8, ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_12), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "btn-flat",
        href: _ctx.linkTo('manageTags', {
          idTag: 0
        })
      }, [ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_15, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewTag')), 1)], 8, ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_14)];
    }),
    _: 1
  }, 8, ["content-title", "help-text"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_16, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: "Tag Manager",
    "content-title": "".concat(_ctx.triggerCount, " ").concat(_ctx.translate('TagManager_Triggers')),
    "help-text": _ctx.triggersHelpText
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [_ctx.triggerCount ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_17, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Names')) + ": ", 1), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.sortedTriggers, function (trigger, index) {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
          key: index
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
          href: _ctx.linkTo('manageTriggers', {
            idTrigger: trigger.idtrigger
          }),
          title: _ctx.translate('TagManager_EntityDateTypeMetaInformation', trigger.created_date_pretty, trigger.updated_date_pretty, trigger.type)
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(trigger.name), 9, ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_18), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, ", ", 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], index !== _ctx.sortedTriggers.length - 1]])]);
      }), 128))])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_19, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "btn-flat",
        href: _ctx.linkTo('manageTriggers')
      }, [ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_21, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_EditTriggers')), 1)], 8, ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_20), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "btn-flat",
        href: _ctx.linkTo('manageTriggers', {
          idTrigger: 0
        })
      }, [ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_23, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewTrigger')), 1)], 8, ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_22)];
    }),
    _: 1
  }, 8, ["content-title", "help-text"])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_24, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_25, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: "Tag Manager",
    "content-title": "".concat(_ctx.variableCount, " ").concat(_ctx.translate('TagManager_Variables')),
    "help-text": _ctx.variablesHelpText
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Names')) + ": ", 1), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.sortedVariables, function (variable, index) {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
          key: index
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
          href: _ctx.linkTo('manageVariables', {
            idVariable: variable.idvariable
          }),
          title: _ctx.translate('TagManager_EntityDateTypeMetaInformation', variable.created_date_pretty, variable.updated_date_pretty, variable.type)
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variable.name), 9, ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_26), index !== _ctx.sortedVariables.length - 1 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_27, ", ")) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
      }), 128))], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.variableCount]])]), ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_28, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "btn-flat",
        href: _ctx.linkTo('manageVariables')
      }, [ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_30, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_EditVariables')), 1)], 8, ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_29), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "btn-flat",
        href: _ctx.linkTo('manageVariables', {
          idVariable: 0
        })
      }, [ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_32, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewVariable')), 1)], 8, ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_31)];
    }),
    _: 1
  }, 8, ["content-title", "help-text"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_33, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: "Tag Manager",
    "content-title": "".concat(_ctx.versionCount, " ").concat(_ctx.translate('TagManager_Versions')),
    "help-text": _ctx.versionsHelpText
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_LastVersions')) + ": ", 1), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.lastVersions, function (lastVersion, index) {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
          key: index
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
          title: _ctx.lastVersionLinkTitle(lastVersion),
          href: _ctx.linkTo('manageVersions', {
            idContainerVersion: lastVersion.idcontainerversion
          })
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(lastVersion.name), 9, ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_34), index !== _ctx.lastVersions.length - 1 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_35, ", ")) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
      }), 128))], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.lastVersions.length]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, [ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_36, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Environments')) + ": ", 1), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.container.releases, function (release, index) {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
          key: index
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
          title: _ctx.releaseTooltip(release)
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.ucfirst(release.environment)), 9, ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_37), index !== _ctx.container.releases.length - 1 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_38, ", ")) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
      }), 128))], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.container.releases.length]])]), ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_39, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "btn-flat",
        href: _ctx.linkTo('manageVersions')
      }, [ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_41, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_EditVersions')), 1)], 8, ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_40), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "btn-flat",
        href: _ctx.linkTo('manageVersions', {
          idContainerVersion: 0
        })
      }, [ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_43, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewVersion')), 1)], 8, ContainerDashboardvue_type_template_id_a8ae88ee_hoisted_42)];
    }),
    _: 1
  }, 8, ["content-title", "help-text"])])])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/ContainerDashboard/ContainerDashboard.vue?vue&type=template&id=a8ae88ee

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/ContainerDashboard/ContainerDashboard.vue?vue&type=script&lang=ts




function sortByName(items) {
  items.sort(function (lhs, rhs) {
    if (lhs.name < rhs.name) {
      return -1;
    }

    return lhs.name > rhs.name ? 1 : 0;
  });
}

/* harmony default export */ var ContainerDashboardvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idContainer: String,
    dashboardHelpText: String,
    tagsHelpText: String,
    triggersHelpText: String,
    variablesHelpText: String,
    versionsHelpText: String
  },
  components: {
    ActivityIndicator: external_CoreHome_["ActivityIndicator"],
    EnrichedHeadline: external_CoreHome_["EnrichedHeadline"],
    ContentBlock: external_CoreHome_["ContentBlock"]
  },
  directives: {
    ContentIntro: external_CoreHome_["ContentIntro"]
  },
  data: function data() {
    return {
      container: null,
      containerVersion: null,
      isLoading: false
    };
  },
  created: function created() {
    var _this = this;

    AvailableContexts_store.init();
    this.isLoading = true;
    var containerPromise = external_CoreHome_["AjaxHelper"].fetch({
      method: 'TagManager.getContainer',
      idContainer: this.idContainer
    }).then(function (container) {
      _this.container = container;
    });
    var versionPromise = external_CoreHome_["AjaxHelper"].fetch({
      method: 'TagManager.exportContainerVersion',
      idContainer: this.idContainer
    }).then(function (containerVersion) {
      _this.containerVersion = containerVersion;
    });
    Promise.all([containerPromise, versionPromise]).finally(function () {
      _this.isLoading = false;
    });
  },
  methods: {
    linkTo: function linkTo(action, hash) {
      var url = external_CoreHome_["MatomoUrl"].stringify(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].urlParsed.value), {}, {
        module: 'TagManager',
        action: action
      }));

      if (hash) {
        url += "#?".concat(external_CoreHome_["MatomoUrl"].stringify(hash));
      }

      return "?".concat(url);
    },
    lastVersionLinkTitle: function lastVersionLinkTitle(lastVersion) {
      return "Created on ".concat(lastVersion.created_date_pretty) + ", description: '".concat(lastVersion.description, "'");
    },
    releaseTooltip: function releaseTooltip(release) {
      var firstPart = Object(external_CoreHome_["translate"])('TagManager_ReleaseInfo', release.release_login, release.release_date_pretty);
      var secondPart = Object(external_CoreHome_["translate"])('TagManager_ReleaseVersionInfo', release.version_name);
      return "".concat(firstPart, " ").concat(secondPart);
    },
    ucfirst: function ucfirst(s) {
      return "".concat(s.substr(0, 1).toUpperCase()).concat(s.substr(1));
    }
  },
  computed: {
    lastVersions: function lastVersions() {
      var _this$container, _this$container$versi;

      if ((_this$container = this.container) !== null && _this$container !== void 0 && (_this$container$versi = _this$container.versions) !== null && _this$container$versi !== void 0 && _this$container$versi.length) {
        return this.container.versions.slice(-5);
      }

      return [];
    },
    contexts: function contexts() {
      var result = {};
      AvailableContexts_store.contexts.value.forEach(function (_ref) {
        var id = _ref.id,
            name = _ref.name;
        result[id] = name;
      });
      return result;
    },
    containerMetaInformation: function containerMetaInformation() {
      var _this$containerVersio, _this$container2, _this$containerVersio2;

      return Object(external_CoreHome_["translate"])('TagManager_ContainerMetaInformation', ((_this$containerVersio = this.containerVersion) === null || _this$containerVersio === void 0 ? void 0 : _this$containerVersio.idcontainer) || '', this.contexts[((_this$container2 = this.container) === null || _this$container2 === void 0 ? void 0 : _this$container2.context) || ''] || '', ((_this$containerVersio2 = this.containerVersion) === null || _this$containerVersio2 === void 0 ? void 0 : _this$containerVersio2.created_date_pretty) || '');
    },
    sortedContainerVersionTags: function sortedContainerVersionTags() {
      var _this$containerVersio3;

      var tags = ((_this$containerVersio3 = this.containerVersion) === null || _this$containerVersio3 === void 0 ? void 0 : _this$containerVersio3.tags) || [];
      sortByName(tags);
      return tags;
    },
    sortedTriggers: function sortedTriggers() {
      var _this$containerVersio4;

      var triggers = ((_this$containerVersio4 = this.containerVersion) === null || _this$containerVersio4 === void 0 ? void 0 : _this$containerVersio4.triggers) || [];
      sortByName(triggers);
      return triggers;
    },
    sortedVariables: function sortedVariables() {
      var _this$containerVersio5;

      var variables = ((_this$containerVersio5 = this.containerVersion) === null || _this$containerVersio5 === void 0 ? void 0 : _this$containerVersio5.variables) || [];
      sortByName(variables);
      return variables;
    },
    tagCount: function tagCount() {
      var _this$containerVersio6;

      return (_this$containerVersio6 = this.containerVersion) === null || _this$containerVersio6 === void 0 ? void 0 : _this$containerVersio6.tags.length;
    },
    triggerCount: function triggerCount() {
      var _this$containerVersio7;

      return (_this$containerVersio7 = this.containerVersion) === null || _this$containerVersio7 === void 0 ? void 0 : _this$containerVersio7.triggers.length;
    },
    versionCount: function versionCount() {
      var _this$container3;

      return (_this$container3 = this.container) === null || _this$container3 === void 0 ? void 0 : _this$container3.versions.length;
    },
    variableCount: function variableCount() {
      var _this$containerVersio8;

      return (_this$containerVersio8 = this.containerVersion) === null || _this$containerVersio8 === void 0 ? void 0 : _this$containerVersio8.variables.length;
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/ContainerDashboard/ContainerDashboard.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/ContainerDashboard/ContainerDashboard.vue



ContainerDashboardvue_type_script_lang_ts.render = ContainerDashboardvue_type_template_id_a8ae88ee_render

/* harmony default export */ var ContainerDashboard = (ContainerDashboardvue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/ContainerDashboard/ContainerDashboard.adapter.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


/* harmony default export */ var ContainerDashboard_adapter = (Object(external_CoreHome_["createAngularJsAdapter"])({
  component: ContainerDashboard,
  scope: {
    idContainer: {
      angularJsBind: '@'
    },
    dashboardHelpText: {
      angularJsBind: '@'
    },
    tagsHelpText: {
      angularJsBind: '@'
    },
    triggersHelpText: {
      angularJsBind: '@'
    },
    variablesHelpText: {
      angularJsBind: '@'
    },
    versionsHelpText: {
      angularJsBind: '@'
    }
  },
  directiveName: 'piwikContainerDashboard'
}));
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/ContainerSelector/ContainerSelector.vue?vue&type=template&id=63c39b5f

var ContainerSelectorvue_type_template_id_63c39b5f_hoisted_1 = ["title"];
var ContainerSelectorvue_type_template_id_63c39b5f_hoisted_2 = {
  class: "title"
};

var ContainerSelectorvue_type_template_id_63c39b5f_hoisted_3 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon icon-arrow-bottom"
}, null, -1);

var ContainerSelectorvue_type_template_id_63c39b5f_hoisted_4 = {
  class: "dropdown positionInViewport"
};
var ContainerSelectorvue_type_template_id_63c39b5f_hoisted_5 = {
  class: "custom_select_container"
};
var ContainerSelectorvue_type_template_id_63c39b5f_hoisted_6 = {
  class: "custom_select_ul_list"
};
var ContainerSelectorvue_type_template_id_63c39b5f_hoisted_7 = ["title"];
var ContainerSelectorvue_type_template_id_63c39b5f_hoisted_8 = ["href"];
function ContainerSelectorvue_type_template_id_63c39b5f_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_ActivityIndicator = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ActivityIndicator");

  var _directive_focus_anywhere_but_here = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("focus-anywhere-but-here");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["tagContainerSelector piwikSelector borderedControl", {
      expanded: _ctx.showContainerList
    }]),
    onClick: _cache[1] || (_cache[1] = function ($event) {
      _ctx.fetchContainers();

      _ctx.showContainerList = !_ctx.showContainerList;
    }),
    title: _ctx.translate('TagManager_ChooseContainer')
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", ContainerSelectorvue_type_template_id_63c39b5f_hoisted_2, [ContainerSelectorvue_type_template_id_63c39b5f_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.actualContainerName), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ContainerSelectorvue_type_template_id_63c39b5f_hoisted_4, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ActivityIndicator, {
    loading: _ctx.isLoading
  }, null, 8, ["loading"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ContainerSelectorvue_type_template_id_63c39b5f_hoisted_5, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", ContainerSelectorvue_type_template_id_63c39b5f_hoisted_6, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    tabindex: "-1",
    onClick: _cache[0] || (_cache[0] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function () {}, ["prevent", "stop"]))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_NoContainersFound')), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isLoading && _ctx.containers.length === 0]]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.containers, function (containerEntry) {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
      title: "".concat(containerEntry.name, " (").concat(containerEntry.idcontainer, ")"),
      key: containerEntry.idcontainer
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      href: _ctx.linkTo(containerEntry.idcontainer)
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(containerEntry.name) + " (" + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(containerEntry.idcontainer) + ") ", 9, ContainerSelectorvue_type_template_id_63c39b5f_hoisted_8)], 8, ContainerSelectorvue_type_template_id_63c39b5f_hoisted_7);
  }), 128))])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.showContainerList]])], 10, ContainerSelectorvue_type_template_id_63c39b5f_hoisted_1)), [[_directive_focus_anywhere_but_here, {
    blur: _ctx.onBlur
  }]]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/ContainerSelector/ContainerSelector.vue?vue&type=template&id=63c39b5f

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/ContainerSelector/ContainerSelector.vue?vue&type=script&lang=ts


/* harmony default export */ var ContainerSelectorvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    containerName: String
  },
  components: {
    ActivityIndicator: external_CoreHome_["ActivityIndicator"]
  },
  directives: {
    FocusAnywhereButHere: external_CoreHome_["FocusAnywhereButHere"]
  },
  data: function data() {
    return {
      containers: [],
      isLoading: false,
      showContainerList: false
    };
  },
  created: function created() {
    setTimeout(function () {
      window.initTopControls();
    });
  },
  methods: {
    fetchContainers: function fetchContainers() {
      var _this = this;

      this.isLoading = true;
      this.containers = [];
      external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainers'
      }).then(function (containers) {
        _this.containers = containers;
      }).finally(function () {
        _this.isLoading = false;
      });
    },
    linkTo: function linkTo(idContainer) {
      var action = external_CoreHome_["MatomoUrl"].urlParsed.value.action;

      if (!action || action === 'manageContainers') {
        action = this.hasWriteAccess ? 'dashboard' : 'manageTags';
      }

      var newQuery = external_CoreHome_["MatomoUrl"].stringify(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].urlParsed.value), {}, {
        idContainer: idContainer,
        action: action
      }));
      return "".concat(window.location.pathname, "?").concat(newQuery);
    },
    onBlur: function onBlur() {
      this.showContainerList = false;
    }
  },
  computed: {
    actualContainerName: function actualContainerName() {
      if (this.containerName) {
        return Object(external_CoreHome_["translate"])('TagManager_ContainerX', this.containerName);
      }

      return Object(external_CoreHome_["translate"])('TagManager_ChooseContainer');
    },
    hasWriteAccess: function hasWriteAccess() {
      return external_CoreHome_["Matomo"].hasUserCapability('tagmanager_write');
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/ContainerSelector/ContainerSelector.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/ContainerSelector/ContainerSelector.vue



ContainerSelectorvue_type_script_lang_ts.render = ContainerSelectorvue_type_template_id_63c39b5f_render

/* harmony default export */ var ContainerSelector = (ContainerSelectorvue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/ContainerSelector/ContainerSelector.adapter.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


/* harmony default export */ var ContainerSelector_adapter = (Object(external_CoreHome_["createAngularJsAdapter"])({
  component: ContainerSelector,
  scope: {
    containerName: {
      angularJsBind: '@?'
    }
  },
  directiveName: 'piwikContainerSelector'
}));
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/ManageInstallTagCode/ManageInstallTagCode.vue?vue&type=template&id=7f2f7f11

var ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_1 = {
  style: {
    "margin-left": "-0.75rem"
  }
};

var ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_2 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);

var ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_3 = ["href"];
var ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_4 = ["textContent"];
var ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_5 = {
  style: {
    "margin-top": "1rem"
  }
};
var ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_6 = ["innerHTML"];

var ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_7 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);

var ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_8 = {
  target: "_blank",
  href: "https://matomo.org/faq/tag-manager/data-layer-in-matomo-tag-manager/"
};
var ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_9 = {
  class: "environment"
};
var ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_10 = {
  class: "name"
};
var ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_11 = {
  class: "name"
};
var ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_12 = {
  class: "released_by"
};
var ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_13 = {
  class: "released_on"
};
var ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_14 = {
  key: 0
};
var ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_15 = {
  colspan: "7"
};
var ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_16 = {
  class: "loadingPiwik"
};

var ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_17 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);

var ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_18 = {
  key: 1
};
var ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_19 = {
  colspan: "7"
};
var ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_20 = {
  class: "environment"
};
var ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_21 = {
  class: "name"
};
var ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_22 = {
  class: "revision"
};
var ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_23 = {
  class: "released_by"
};
var ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_24 = {
  class: "released_on"
};
var ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_25 = {
  class: "date"
};
function ManageInstallTagCodevue_type_template_id_7f2f7f11_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");

  var _component_ActivityIndicator = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ActivityIndicator");

  var _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");

  var _directive_select_on_focus = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("select-on-focus");

  var _directive_content_table = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("content-table");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_ContentBlock, {
    class: "manageInstallTagCode",
    feature: "Tag Manager",
    "content-title": "Install Code"
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      var _ctx$container, _ctx$container$releas;

      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "select",
        name: "environment",
        "model-value": _ctx.environment,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
          _ctx.environment = $event;

          _ctx.fetchInstallInstructions(_ctx.environment);
        }),
        options: _ctx.environments,
        title: _ctx.translate('TagManager_Environment')
      }, null, 8, ["model-value", "options", "title"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ActivityIndicator, {
        loading: _ctx.isLoading
      }, null, 8, ["loading"]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.installInstructions, function (installInstruction, index) {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
          key: index
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(installInstruction.description) + " ", 1), ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_2, installInstruction.helpUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
          key: 0,
          target: "_blank",
          href: installInstruction.helpUrl
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_LearnMore')), 9, ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_3)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), installInstruction.embedCode ? Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("pre", {
          key: 0,
          class: "codeblock",
          textContent: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(installInstruction.embedCode),
          ref: "codeblock"
        }, null, 8, ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_4)), [[_directive_select_on_focus, {}]]) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
      }), 128)), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_InstallCodePublishEnvironmentNote', 'preview')) + " " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ConfigureEnvironmentsSuperUser')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_5, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
        innerHTML: _ctx.$sanitize(_ctx.translate('TagManager_InstallCodeDataLayerNote', '<strong>', '</strong>'))
      }, null, 8, ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_6), ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_7, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_8, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_LearnMore')), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ReleasesOverview')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("table", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_9, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Environment')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_10, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_VersionName')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_11, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_VersionRevision')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_12, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ReleasedBy')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_13, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ReleasedOn')), 1)])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [_ctx.isLoading ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_14, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_15, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_16, [ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_17, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_LoadingData')), 1)])])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), !_ctx.isLoading && ((_ctx$container = _ctx.container) === null || _ctx$container === void 0 ? void 0 : (_ctx$container$releas = _ctx$container.releases) === null || _ctx$container$releas === void 0 ? void 0 : _ctx$container$releas.length) === 0 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_18, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_19, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_NoReleasesFound')), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.sortedReleases, function (release) {
        var _ctx$releaseVersions$, _ctx$releaseVersions$2;

        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
          key: release.idcontainerrelease
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_20, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.ucfirst(release.environment)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_21, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])((_ctx$releaseVersions$ = _ctx.releaseVersions[release.idcontainerrelease]) === null || _ctx$releaseVersions$ === void 0 ? void 0 : _ctx$releaseVersions$.name), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_22, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])((_ctx$releaseVersions$2 = _ctx.releaseVersions[release.idcontainerrelease]) === null || _ctx$releaseVersions$2 === void 0 ? void 0 : _ctx$releaseVersions$2.revision), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_23, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(release.release_login), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_24, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", ManageInstallTagCodevue_type_template_id_7f2f7f11_hoisted_25, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(release.release_date_pretty), 1)])]);
      }), 128))])], 512), [[_directive_content_table]])];
    }),
    _: 1
  });
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/ManageInstallTagCode/ManageInstallTagCode.vue?vue&type=template&id=7f2f7f11

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/ManageInstallTagCode/ManageInstallTagCode.vue?vue&type=script&lang=ts
function ManageInstallTagCodevue_type_script_lang_ts_toConsumableArray(arr) { return ManageInstallTagCodevue_type_script_lang_ts_arrayWithoutHoles(arr) || ManageInstallTagCodevue_type_script_lang_ts_iterableToArray(arr) || ManageInstallTagCodevue_type_script_lang_ts_unsupportedIterableToArray(arr) || ManageInstallTagCodevue_type_script_lang_ts_nonIterableSpread(); }

function ManageInstallTagCodevue_type_script_lang_ts_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function ManageInstallTagCodevue_type_script_lang_ts_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function ManageInstallTagCodevue_type_script_lang_ts_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return ManageInstallTagCodevue_type_script_lang_ts_arrayLikeToArray(arr); }

function ManageInstallTagCodevue_type_script_lang_ts_slicedToArray(arr, i) { return ManageInstallTagCodevue_type_script_lang_ts_arrayWithHoles(arr) || ManageInstallTagCodevue_type_script_lang_ts_iterableToArrayLimit(arr, i) || ManageInstallTagCodevue_type_script_lang_ts_unsupportedIterableToArray(arr, i) || ManageInstallTagCodevue_type_script_lang_ts_nonIterableRest(); }

function ManageInstallTagCodevue_type_script_lang_ts_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function ManageInstallTagCodevue_type_script_lang_ts_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return ManageInstallTagCodevue_type_script_lang_ts_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ManageInstallTagCodevue_type_script_lang_ts_arrayLikeToArray(o, minLen); }

function ManageInstallTagCodevue_type_script_lang_ts_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ManageInstallTagCodevue_type_script_lang_ts_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function ManageInstallTagCodevue_type_script_lang_ts_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var ManageInstallTagCodevue_type_script_lang_ts_window = window,
    ManageInstallTagCodevue_type_script_lang_ts_$ = ManageInstallTagCodevue_type_script_lang_ts_window.$;
/* harmony default export */ var ManageInstallTagCodevue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idContainer: {
      type: String,
      required: true
    }
  },
  components: {
    ContentBlock: external_CoreHome_["ContentBlock"],
    Field: external_CorePluginsAdmin_["Field"],
    ActivityIndicator: external_CoreHome_["ActivityIndicator"]
  },
  directives: {
    SelectOnFocus: external_CoreHome_["SelectOnFocus"],
    ContentTable: external_CoreHome_["ContentTable"]
  },
  data: function data() {
    return {
      container: null,
      environments: [],
      environment: 'live',
      installInstructions: [],
      isLoading: false,
      isLoadingInstructions: false
    };
  },
  created: function created() {
    var _this = this;

    this.isLoading = true;
    this.fetchReleases().finally(function () {
      _this.isLoading = false;
    });
  },
  methods: {
    fetchInstallInstructions: function fetchInstallInstructions(environment) {
      var _this2 = this;

      this.installInstructions = [];
      this.isLoadingInstructions = true;
      return external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainerInstallInstructions',
        filter_limit: '-1',
        idContainer: this.idContainer,
        environment: environment
      }).then(function (instructions) {
        _this2.installInstructions = instructions;
        Object(external_commonjs_vue_commonjs2_vue_root_Vue_["nextTick"])(function () {
          var codeblocks = Array.isArray(_this2.$refs.codeblock) ? _this2.$refs.codeblock : [_this2.$refs.codeblock];
          codeblocks.forEach(function (n) {
            ManageInstallTagCodevue_type_script_lang_ts_$(n).effect('highlight', {}, 1500);
          });
        });
      }).finally(function () {
        _this2.isLoadingInstructions = false;
      });
    },
    fetchReleases: function fetchReleases() {
      var _this3 = this;

      return external_CoreHome_["AjaxHelper"].fetch([{
        method: 'TagManager.getAvailableEnvironments',
        filter_limit: '-1'
      }, {
        method: 'TagManager.getContainer',
        idContainer: this.idContainer,
        filter_limit: '-1'
      }]).then(function (_ref) {
        var _this3$environments, _this3$environments$;

        var _ref2 = ManageInstallTagCodevue_type_script_lang_ts_slicedToArray(_ref, 2),
            environments = _ref2[0],
            container = _ref2[1];

        _this3.environments = environments.map(function (e) {
          return {
            key: e.id,
            value: e.name
          };
        });
        _this3.container = container;
        var hasLive = container.releases.some(function (r) {
          return r.environment === 'live';
        });

        if (!hasLive && (_this3$environments = _this3.environments) !== null && _this3$environments !== void 0 && (_this3$environments$ = _this3$environments[0]) !== null && _this3$environments$ !== void 0 && _this3$environments$.key) {
          _this3.environment = _this3.environments[0].key;
        } else if (!hasLive) {
          // no release available yet
          _this3.environment = '';
        }

        if (_this3.environment) {
          return _this3.fetchInstallInstructions(_this3.environment);
        }

        return undefined;
      });
    },
    ucfirst: function ucfirst(s) {
      return "".concat(s.substr(0, 1).toUpperCase()).concat(s.substr(1));
    }
  },
  computed: {
    releaseVersions: function releaseVersions() {
      var _this$container,
          _this4 = this;

      var result = {};
      (((_this$container = this.container) === null || _this$container === void 0 ? void 0 : _this$container.releases) || []).forEach(function (r) {
        result[r.idcontainerrelease] = _this4.container.versions.find(function (v) {
          return v.idcontainerversion === r.idcontainerversion;
        });
      });
      return result;
    },
    sortedReleases: function sortedReleases() {
      var _this$container2;

      var sorted = ManageInstallTagCodevue_type_script_lang_ts_toConsumableArray((((_this$container2 = this.container) === null || _this$container2 === void 0 ? void 0 : _this$container2.releases) || []).map(function (r, i) {
        return Object.assign(Object.assign({}, r), {}, {
          index: i
        });
      }));

      sorted.sort(function (lhs, rhs) {
        if (lhs.release_date < rhs.release_date) {
          return 1;
        }

        if (lhs.release_date > rhs.release_date) {
          return -1;
        }

        return rhs.index - lhs.index; // angularjs sort defaults to using index when key is same
      });
      return sorted;
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/ManageInstallTagCode/ManageInstallTagCode.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/ManageInstallTagCode/ManageInstallTagCode.vue



ManageInstallTagCodevue_type_script_lang_ts.render = ManageInstallTagCodevue_type_template_id_7f2f7f11_render

/* harmony default export */ var ManageInstallTagCode = (ManageInstallTagCodevue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/ManageInstallTagCode/ManageInstallTagCode.adapter.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


/* harmony default export */ var ManageInstallTagCode_adapter = (Object(external_CoreHome_["createAngularJsAdapter"])({
  component: ManageInstallTagCode,
  scope: {
    idContainer: {
      angularJsBind: '@'
    }
  },
  directiveName: 'piwikManageInstallTagCode'
}));
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/TagmanagerTrackingCode/TagmanagerTrackingCode.vue?vue&type=template&id=ac5dd9a4

var TagmanagerTrackingCodevue_type_template_id_ac5dd9a4_hoisted_1 = {
  class: "list-style-decimal"
};
var TagmanagerTrackingCodevue_type_template_id_ac5dd9a4_hoisted_2 = ["innerHTML"];
function TagmanagerTrackingCodevue_type_template_id_ac5dd9a4_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_TrackingCodeCommon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("TrackingCodeCommon");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("ol", TagmanagerTrackingCodevue_type_template_id_ac5dd9a4_hoisted_1, [_ctx.showContainerRow ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
    key: 0,
    innerHTML: _ctx.$sanitize(_ctx.setupStep1)
  }, null, 8, TagmanagerTrackingCodevue_type_template_id_ac5dd9a4_hoisted_2)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_TrackingCodeCommon, {
    "show-container-row": _ctx.showContainerRow,
    showBottom: true,
    showDescription: false,
    showPlainMtmSteps: true,
    onFetchInstallInstructions: _ctx.fetchInstallInstructions,
    ref: "trackingCodeCommon"
  }, null, 8, ["show-container-row", "onFetchInstallInstructions"])]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/TagmanagerTrackingCode/TagmanagerTrackingCode.vue?vue&type=template&id=ac5dd9a4

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/TagmanagerTrackingCode/TrackingCodeCommon.vue?vue&type=template&id=764e7f64

var TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_1 = {
  class: "tagManagerTrackingCode"
};
var TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_2 = {
  key: 1,
  class: "row"
};
var TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_3 = {
  class: "col s12 m4 "
};
var TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_4 = {
  class: "form-group row"
};
var TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_5 = {
  class: "col s12 input-field"
};
var TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_6 = {
  for: "tagManagerTrackingCodeSite",
  class: "siteSelectorLabel"
};
var TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_7 = {
  class: "sites_autocomplete"
};
var TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_8 = {
  class: "col s12 m4"
};
var TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_9 = {
  class: "col s12 m4"
};
var TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_10 = {
  key: 2,
  class: "alert alert-info"
};
var TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_11 = {
  href: ""
};
var TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_12 = {
  key: 0
};
var TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_13 = ["href"];

var TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_14 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(". ");

var TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_15 = {
  key: 1
};
var TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_16 = ["href"];

var TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_17 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(". ");

var TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_18 = ["innerHTML"];

var TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_19 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(". ");

var TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_20 = ["innerHTML"];
var TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_21 = ["textContent"];
var TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_22 = {
  key: 3
};
var TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_23 = ["innerHTML"];
function TrackingCodeCommonvue_type_template_id_764e7f64_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _this = this;

  var _component_ActivityIndicator = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ActivityIndicator");

  var _component_SiteSelector = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("SiteSelector");

  var _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");

  var _directive_copy_to_clipboard = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("copy-to-clipboard");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_1, [_ctx.showContainerRow || _ctx.environments.length > 1 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_ActivityIndicator, {
    key: 0,
    style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
      opacity: _ctx.isLoading ? 1 : 0
    }),
    loading: true
  }, null, 8, ["style"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.showContainerRow || _ctx.environments.length > 1 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_4, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_5, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_6, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Website')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_7, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_SiteSelector, {
    id: "tagManagerTrackingCodeSite",
    modelValue: _ctx.site,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return _ctx.site = $event;
    }),
    "show-all-sites-item": false,
    "switch-site-on-select": false,
    "show-selected-site": true
  }, null, 8, ["modelValue"])])])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
    uicontrol: "select",
    name: "containers",
    "model-value": _ctx.idContainer,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      _ctx.idContainer = $event;

      _ctx.onContainerChange();
    }),
    options: _ctx.containerOptions,
    disabled: _ctx.containerOptions.length <= 1,
    "full-width": true,
    title: _ctx.translate('TagManager_Container')
  }, null, 8, ["model-value", "options", "disabled", "title"])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_9, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
    uicontrol: "select",
    name: "environment",
    "model-value": _ctx.environment,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
      _ctx.environment = $event;

      _this.$emit('fetchInstallInstructions');
    }),
    options: _ctx.environments,
    disabled: _ctx.environments.length <= 1,
    "full-width": true,
    title: _ctx.translate('TagManager_Environment')
  }, null, 8, ["model-value", "options", "disabled", "title"])])])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.idContainer && _ctx.noReleaseFound ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_10, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_NoReleasesFoundForContainer')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_11, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_PublishVersionToEnvironmentToViewEmbedCode')), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.installInstructions, function (installInstruction, index) {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
      key: index
    }, [_ctx.showDescription ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("p", TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_12, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(installInstruction.description) + " ", 1), installInstruction.helpUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
      key: 0,
      target: "_blank",
      href: installInstruction.helpUrl
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_LearnMore')), 9, TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_13)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_14])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.showPlainMtmSteps ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_15, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_SiteWithoutDataMtmStep2')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      href: _ctx.linkTo('dashboard', _ctx.site.id, _ctx.idContainer)
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Container')) + " " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('Dashboard_Dashboard')), 9, TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_16), TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_17, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
      innerHTML: _ctx.$sanitize(_ctx.getLearnMoreLink)
    }, null, 8, TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_18), TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_19]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
      innerHTML: _ctx.$sanitize(_ctx.getMtmStep3)
    }, null, 8, TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_20)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("pre", {
      class: "codeblock",
      textContent: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(installInstruction.embedCode),
      ref: "codeblock"
    }, null, 8, TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_21), [[_directive_copy_to_clipboard, {}]])])]);
  }), 128)), _ctx.showBottom ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_22, [_ctx.idContainer ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("p", {
    key: 0,
    innerHTML: _ctx.$sanitize(_ctx.getCongratulationsText)
  }, null, 8, TrackingCodeCommonvue_type_template_id_764e7f64_hoisted_23)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/TagmanagerTrackingCode/TrackingCodeCommon.vue?vue&type=template&id=764e7f64

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/TagmanagerTrackingCode/TrackingCodeCommon.vue?vue&type=script&lang=ts




function ucfirst(s) {
  return "".concat(s.substr(0, 1).toUpperCase()).concat(s.substr(1));
}

/* harmony default export */ var TrackingCodeCommonvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    showContainerRow: Boolean,
    currentAction: String,
    showBottom: Boolean,
    showDescription: Boolean,
    showPlainMtmSteps: Boolean
  },
  components: {
    ActivityIndicator: external_CoreHome_["ActivityIndicator"],
    SiteSelector: external_CoreHome_["SiteSelector"],
    Field: external_CorePluginsAdmin_["Field"]
  },
  emits: ['fetchInstallInstructions'],
  directives: {
    CopyToClipboard: external_CoreHome_["CopyToClipboard"]
  },
  data: function data() {
    return {
      containerVariables: [],
      isLoading: false,
      idContainer: '',
      environment: '',
      environments: [],
      environmentNameMap: {},
      containerMap: {},
      containerOptions: [],
      site: {
        id: external_CoreHome_["Matomo"].idSite,
        name: external_CoreHome_["Matomo"].helper.htmlDecode(external_CoreHome_["Matomo"].siteName)
      },
      matomoConfigs: [],
      releases: [],
      installInstructions: [],
      noReleaseFound: false
    };
  },
  created: function created() {
    var _this = this;

    external_CoreHome_["AjaxHelper"].fetch({
      method: 'TagManager.getAvailableEnvironments',
      filter_limit: '-1'
    }).then(function (environments) {
      var entities;

      if (Array.isArray(environments)) {
        entities = environments;
      } else {
        entities = Object.values(environments);
      }

      _this.environmentNameMap = Object.fromEntries(entities.map(function (_ref) {
        var id = _ref.id,
            name = _ref.name;
        return [id, name];
      }));
    });
    this.onSiteChange();
  },
  watch: {
    site: function site() {
      this.onSiteChange();
    }
  },
  methods: {
    onSiteChange: function onSiteChange() {
      var _this$site,
          _this2 = this;

      this.installInstructions = [];
      this.containerOptions = [];
      this.containerMap = {};
      this.environments = [];
      this.matomoConfigs = [];
      this.idContainer = '';

      if (!((_this$site = this.site) !== null && _this$site !== void 0 && _this$site.id)) {
        return;
      }

      this.isLoading = true;
      external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainers',
        filter_limit: '-1',
        idSite: this.site.id
      }).then(function (containers) {
        _this2.containerOptions = [];

        if (!(containers !== null && containers !== void 0 && containers.length)) {
          _this2.idContainer = '';

          _this2.containerOptions.push({
            key: '',
            value: _this2.translate('TagManager_NoContainersFound')
          });

          return;
        }

        containers.forEach(function (container) {
          if (!_this2.idContainer) {
            _this2.idContainer = container.idcontainer;
          }

          _this2.containerMap[container.idcontainer] = container;

          _this2.containerOptions.push({
            key: container.idcontainer,
            value: container.name
          });
        });

        _this2.onContainerChange();
      }).finally(function () {
        _this2.isLoading = false;
      });
    },
    onContainerChange: function onContainerChange() {
      var _this3 = this;

      this.noReleaseFound = false;

      if (!this.idContainer) {
        return;
      }

      this.installInstructions = [];
      var container = this.containerMap[this.idContainer];
      var draftVersion = container.draft.idcontainerversion;
      this.environment = '';
      this.environments = [];
      var releases = container.releases || [];

      if (releases.find(function (r) {
        return r.environment === 'live';
      })) {
        // we always prefer to pre-select the live environment
        this.environment = 'live';
      }

      releases.forEach(function (release) {
        if (release.environment === 'preview') {
          return; // there is nothing to embed for this environment
        }

        if (!_this3.environment) {
          _this3.environment = release.environment;
        }

        var name = ucfirst(release.environment);

        if (release.environment in _this3.environmentNameMap) {
          name = _this3.environmentNameMap[release.environment];
        }

        _this3.environments.push({
          key: release.environment,
          value: name
        });
      });

      if (!this.environments.length) {
        this.noReleaseFound = true;
        this.environments.push({
          key: '',
          value: this.translate('TagManager_NoReleasesFound')
        });
      }

      this.$emit('fetchInstallInstructions');
      this.fetchVariables(draftVersion);
    },
    linkTo: function linkTo(action, idSite, idContainer, hash) {
      var newQuery = external_CoreHome_["MatomoUrl"].stringify(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].urlParsed.value), {}, {
        module: 'TagManager',
        action: action,
        idSite: idSite,
        idContainer: idContainer
      }));
      var newUrl = "".concat(window.location.pathname, "?").concat(newQuery);

      if (hash) {
        newUrl += "#?".concat(external_CoreHome_["MatomoUrl"].stringify(hash));
      }

      return newUrl;
    },
    fetchVariables: function fetchVariables(containerDraftVersion) {
      var _this$site2,
          _this4 = this;

      this.matomoConfigs = [];

      if (!this.idContainer || !((_this$site2 = this.site) !== null && _this$site2 !== void 0 && _this$site2.id) || !containerDraftVersion) {
        return;
      }

      external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainerVariables',
        filter_limit: '-1',
        idContainer: this.idContainer,
        idContainerVersion: containerDraftVersion,
        idSite: this.site.id
      }).then(function (variables) {
        _this4.matomoConfigs = variables.filter(function (v) {
          return v.type === 'MatomoConfiguration';
        });
      }).finally(function () {
        _this4.isLoading = false;
      });
    }
  },
  computed: {
    getLearnMoreLink: function getLearnMoreLink() {
      return Object(external_CoreHome_["translate"])('TagManager_CustomHtmlTagHelpText', '<a rel="noreferrer noopener" target="_blank" href="https://matomo.org/faq/tag-manager/container-dashboard-in-matomo-tag-manager/">', '</a>');
    },
    getMtmStep3: function getMtmStep3() {
      return Object(external_CoreHome_["translate"])('TagManager_SiteWithoutDataMtmStep3', '&lt;/head&gt;', '<a rel="noreferrer noopener" target="_blank" href="https://developer.matomo.org/guides/tagmanager/embedding">', '</a>');
    },
    getCongratulationsText: function getCongratulationsText() {
      return Object(external_CoreHome_["translate"])('TagManager_SiteWithoutDataReactFollowStepCompleted', '<strong>', '</strong>');
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/TagmanagerTrackingCode/TrackingCodeCommon.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/TagmanagerTrackingCode/TrackingCodeCommon.vue



TrackingCodeCommonvue_type_script_lang_ts.render = TrackingCodeCommonvue_type_template_id_764e7f64_render

/* harmony default export */ var TrackingCodeCommon = (TrackingCodeCommonvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/TagmanagerTrackingCode/TagmanagerTrackingCode.vue?vue&type=script&lang=ts



/* harmony default export */ var TagmanagerTrackingCodevue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    showContainerRow: Boolean
  },
  components: {
    TrackingCodeCommon: TrackingCodeCommon
  },
  data: function data() {
    return {
      setupStep1: ''
    };
  },
  methods: {
    fetchInstallInstructions: function fetchInstallInstructions() {
      var _refs$site,
          _refs$site2,
          _this = this;

      // eslint-disable-next-line
      var refs = this.$refs.trackingCodeCommon;
      refs.installInstructions = [];

      if (!(refs !== null && refs !== void 0 && refs.idContainer) || !(refs !== null && refs !== void 0 && refs.environment) || !(refs !== null && refs !== void 0 && (_refs$site = refs.site) !== null && _refs$site !== void 0 && _refs$site.id)) {
        return;
      }

      var manageContainerURL = this.linkTo('manageContainers', refs.site.id, refs.idContainer);
      this.setupStep1 = Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep1', '<br><strong>', '</strong>', "<a href=\"".concat(manageContainerURL, "\" target=\"_blank\" rel=\"noreferrer noopener\">"), '</a>');
      refs.isLoading = true;
      external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainerInstallInstructions',
        filter_limit: '-1',
        idContainer: refs === null || refs === void 0 ? void 0 : refs.idContainer,
        environment: refs === null || refs === void 0 ? void 0 : refs.environment,
        idSite: refs === null || refs === void 0 ? void 0 : (_refs$site2 = refs.site) === null || _refs$site2 === void 0 ? void 0 : _refs$site2.id
      }).then(function (instructions) {
        refs.installInstructions = instructions;
        Object(external_commonjs_vue_commonjs2_vue_root_Vue_["nextTick"])(function () {
          var codeblocks = Array.isArray(_this.$refs.codeblock) ? _this.$refs.codeblock : [_this.$refs.codeblock];
          codeblocks.forEach(function (n) {
            $(n).effect('highlight', {}, 1500);
          });
        });
      }).finally(function () {
        refs.isLoading = false;
      });
    },
    linkTo: function linkTo(action, idSite, idContainer, hash) {
      var url = external_CoreHome_["MatomoUrl"].stringify(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].urlParsed.value), {}, {
        module: 'TagManager',
        action: action,
        idSite: idSite,
        idContainer: idContainer
      }));

      if (hash) {
        url += "#?".concat(external_CoreHome_["MatomoUrl"].stringify(hash));
      }

      return "?".concat(url);
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/TagmanagerTrackingCode/TagmanagerTrackingCode.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/TagmanagerTrackingCode/TagmanagerTrackingCode.vue



TagmanagerTrackingCodevue_type_script_lang_ts.render = TagmanagerTrackingCodevue_type_template_id_ac5dd9a4_render

/* harmony default export */ var TagmanagerTrackingCode = (TagmanagerTrackingCodevue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/TagmanagerTrackingCode/TagmanagerTrackingCode.adapter.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


/* harmony default export */ var TagmanagerTrackingCode_adapter = (Object(external_CoreHome_["createAngularJsAdapter"])({
  component: TagmanagerTrackingCode,
  directiveName: 'matomoTagmanagerTrackingCode',
  scope: {
    showContainerRow: {
      angularJsBind: '='
    },
    currentAction: {
      angularJsBind: '='
    }
  }
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
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/TagmanagerTrackingCode/TrackingSPAPage.vue?vue&type=template&id=2509c980

var TrackingSPAPagevue_type_template_id_2509c980_hoisted_1 = {
  class: "list-style-decimal"
};
var TrackingSPAPagevue_type_template_id_2509c980_hoisted_2 = ["innerHTML"];
var TrackingSPAPagevue_type_template_id_2509c980_hoisted_3 = ["innerHTML"];
var TrackingSPAPagevue_type_template_id_2509c980_hoisted_4 = ["innerHTML"];
var TrackingSPAPagevue_type_template_id_2509c980_hoisted_5 = ["textContent"];
var TrackingSPAPagevue_type_template_id_2509c980_hoisted_6 = ["innerHTML"];
var TrackingSPAPagevue_type_template_id_2509c980_hoisted_7 = ["textContent"];
var TrackingSPAPagevue_type_template_id_2509c980_hoisted_8 = ["innerHTML"];
var TrackingSPAPagevue_type_template_id_2509c980_hoisted_9 = ["innerHTML"];
var TrackingSPAPagevue_type_template_id_2509c980_hoisted_10 = ["innerHTML"];
var TrackingSPAPagevue_type_template_id_2509c980_hoisted_11 = ["textContent"];
var TrackingSPAPagevue_type_template_id_2509c980_hoisted_12 = {
  style: {
    "list-style": "lower-alpha",
    "list-style-position": "inside",
    "text-indent": "1.2rem"
  }
};
var TrackingSPAPagevue_type_template_id_2509c980_hoisted_13 = ["innerHTML"];
var TrackingSPAPagevue_type_template_id_2509c980_hoisted_14 = ["innerHTML"];
var TrackingSPAPagevue_type_template_id_2509c980_hoisted_15 = ["innerHTML"];
var TrackingSPAPagevue_type_template_id_2509c980_hoisted_16 = ["textContent"];
var TrackingSPAPagevue_type_template_id_2509c980_hoisted_17 = ["textContent"];
var TrackingSPAPagevue_type_template_id_2509c980_hoisted_18 = ["innerHTML"];
var TrackingSPAPagevue_type_template_id_2509c980_hoisted_19 = ["textContent"];
var TrackingSPAPagevue_type_template_id_2509c980_hoisted_20 = ["innerHTML"];
var TrackingSPAPagevue_type_template_id_2509c980_hoisted_21 = ["innerHTML"];
var TrackingSPAPagevue_type_template_id_2509c980_hoisted_22 = ["textContent"];
function TrackingSPAPagevue_type_template_id_2509c980_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_TrackingCodeCommon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("TrackingCodeCommon");

  var _directive_select_on_focus = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("select-on-focus");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("ol", TrackingSPAPagevue_type_template_id_2509c980_hoisted_1, [_ctx.showContainerRow ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
    key: 0,
    innerHTML: _ctx.$sanitize(_ctx.setupStep1)
  }, null, 8, TrackingSPAPagevue_type_template_id_2509c980_hoisted_2)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_TrackingCodeCommon, {
    "show-container-row": _ctx.showContainerRow,
    "current-action": _ctx.currentAction,
    showBottom: false,
    showDescription: false,
    onFetchInstallInstructions: _ctx.fetchInstallInstructionsSPA,
    ref: "trackingCodeCommon"
  }, null, 8, ["show-container-row", "current-action", "onFetchInstallInstructions"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    innerHTML: _ctx.$sanitize(_ctx.setupStep2)
  }, null, 8, TrackingSPAPagevue_type_template_id_2509c980_hoisted_3), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep3)
  }, null, 8, TrackingSPAPagevue_type_template_id_2509c980_hoisted_4), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    textContent: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.fetchClickX('TagManager_CreateNewTrigger'))
  }, null, 8, TrackingSPAPagevue_type_template_id_2509c980_hoisted_5), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep5)
  }, null, 8, TrackingSPAPagevue_type_template_id_2509c980_hoisted_6), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    textContent: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.fetchClickX('TagManager_CreateNewTrigger'))
  }, null, 8, TrackingSPAPagevue_type_template_id_2509c980_hoisted_7), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    innerHTML: _ctx.$sanitize(_ctx.setupStep7)
  }, null, 8, TrackingSPAPagevue_type_template_id_2509c980_hoisted_8), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep8)
  }, null, 8, TrackingSPAPagevue_type_template_id_2509c980_hoisted_9), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep9)
  }, null, 8, TrackingSPAPagevue_type_template_id_2509c980_hoisted_10), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
    textContent: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.fetchFollowStep10)
  }, null, 8, TrackingSPAPagevue_type_template_id_2509c980_hoisted_11), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ol", TrackingSPAPagevue_type_template_id_2509c980_hoisted_12, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep10a)
  }, null, 8, TrackingSPAPagevue_type_template_id_2509c980_hoisted_13), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep10b)
  }, null, 8, TrackingSPAPagevue_type_template_id_2509c980_hoisted_14)])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep11)
  }, null, 8, TrackingSPAPagevue_type_template_id_2509c980_hoisted_15), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    textContent: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.fetchClickX('General_Update'))
  }, null, 8, TrackingSPAPagevue_type_template_id_2509c980_hoisted_16), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    textContent: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.fetchFollowStep13)
  }, null, 8, TrackingSPAPagevue_type_template_id_2509c980_hoisted_17), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep14)
  }, null, 8, TrackingSPAPagevue_type_template_id_2509c980_hoisted_18), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    textContent: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.fetchFollowStep15)
  }, null, 8, TrackingSPAPagevue_type_template_id_2509c980_hoisted_19), _ctx.jsFramework === 'react' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
    key: 1,
    innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep16React)
  }, null, 8, TrackingSPAPagevue_type_template_id_2509c980_hoisted_20)) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
    key: 2,
    innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep16SPA)
  }, null, 8, TrackingSPAPagevue_type_template_id_2509c980_hoisted_21)), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.installInstructions, function (installInstruction, index) {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
      key: index
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("pre", {
      class: "codeblock",
      textContent: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(installInstruction.embedCode),
      ref: "codeblock"
    }, null, 8, TrackingSPAPagevue_type_template_id_2509c980_hoisted_22), [[_directive_select_on_focus, {}]])]);
  }), 128))]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/TagmanagerTrackingCode/TrackingSPAPage.vue?vue&type=template&id=2509c980

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/TagmanagerTrackingCode/TrackingSPAPage.vue?vue&type=script&lang=ts



/* harmony default export */ var TrackingSPAPagevue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    showContainerRow: Boolean,
    currentAction: String,
    jsFramework: String
  },
  components: {
    TrackingCodeCommon: TrackingCodeCommon
  },
  directives: {
    SelectOnFocus: external_CoreHome_["SelectOnFocus"]
  },
  data: function data() {
    return {
      setupStep1: '',
      setupStep2: '',
      setupStep7: '',
      installInstructions: []
    };
  },
  methods: {
    fetchInstallInstructionsSPA: function fetchInstallInstructionsSPA() {
      var _refs$site,
          _refs$site2,
          _this = this;

      // eslint-disable-next-line
      var refs = this.$refs.trackingCodeCommon;
      this.installInstructions = [];

      if (!(refs !== null && refs !== void 0 && refs.idContainer) || !(refs !== null && refs !== void 0 && refs.environment) || !(refs !== null && refs !== void 0 && (_refs$site = refs.site) !== null && _refs$site !== void 0 && _refs$site.id)) {
        return;
      }

      var manageContainerURL = this.linkTo('manageContainers', refs.site.id, refs.idContainer);
      this.setupStep1 = Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep1', '<br><strong>', '</strong>', "<a href=\"".concat(manageContainerURL, "\" target=\"_blank\" rel=\"noreferrer noopener\">"), '</a>');
      var triggersUrl = this.linkTo('manageTriggers', refs.site.id, refs.idContainer);
      this.setupStep2 = Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep2', "<a href=\"".concat(triggersUrl, "\" target=\"_blank\" rel=\"noreferrer noopener\">"), '</a>');
      var tagsURL = this.linkTo('manageTags', refs.site.id, refs.idContainer);
      this.setupStep7 = Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep7', "<a href=\"".concat(tagsURL, "\" target=\"_blank\" rel=\"noreferrer noopener\">"), '</a>');
      refs.isLoading = true;
      external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainerInstallInstructions',
        filter_limit: '-1',
        idContainer: refs === null || refs === void 0 ? void 0 : refs.idContainer,
        environment: refs === null || refs === void 0 ? void 0 : refs.environment,
        idSite: refs === null || refs === void 0 ? void 0 : (_refs$site2 = refs.site) === null || _refs$site2 === void 0 ? void 0 : _refs$site2.id,
        jsFramework: this.jsFramework
      }).then(function (instructions) {
        _this.installInstructions = instructions;
        Object(external_commonjs_vue_commonjs2_vue_root_Vue_["nextTick"])(function () {
          var codeblocks = Array.isArray(_this.$refs.codeblock) ? _this.$refs.codeblock : [_this.$refs.codeblock];
          codeblocks.forEach(function (n) {
            $(n).effect('highlight', {}, 1500);
          });
        });
      }).finally(function () {
        refs.isLoading = false;
      });
    },
    linkTo: function linkTo(action, idSite, idContainer, hash) {
      var url = external_CoreHome_["MatomoUrl"].stringify(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].urlParsed.value), {}, {
        module: 'TagManager',
        action: action,
        idSite: idSite,
        idContainer: idContainer
      }));

      if (hash) {
        url += "#?".concat(external_CoreHome_["MatomoUrl"].stringify(hash));
      }

      return "?".concat(url);
    },
    fetchClickX: function fetchClickX(clickTarget) {
      return Object(external_CoreHome_["translate"])('General_ClickX', Object(external_CoreHome_["translate"])(clickTarget));
    }
  },
  computed: {
    fetchFollowStep3: function fetchFollowStep3() {
      return Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep3', "<strong>".concat(Object(external_CoreHome_["translate"])('TagManager_PageViewTriggerName'), "</strong>"), Object(external_CoreHome_["translate"])('TagManager_PageViewTriggerName'), '<a href="https://matomo.org/faq/tag-manager/how-do-i-track-pageviews-of-my-website-using-matomo-tag-manager/#create-pageview-trigger" target="_blank" rel="noreferrer noopener">', '</a>');
    },
    fetchFollowStep5: function fetchFollowStep5() {
      return Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep5', "<strong>".concat(Object(external_CoreHome_["translate"])('TagManager_HistoryChangeTriggerName'), "</strong>"), Object(external_CoreHome_["translate"])('TagManager_CategoryUserEngagement'));
    },
    fetchFollowStep8: function fetchFollowStep8() {
      return Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep8', "<strong>".concat(Object(external_CoreHome_["translate"])('TagManager_PageViewTriggerName'), "</strong>"), "<strong>".concat(Object(external_CoreHome_["translate"])('TagManager_MatomoTagName'), "</strong>"), Object(external_CoreHome_["translate"])('TagManager_PageViewTriggerName'), '<a href="https://matomo.org/faq/tag-manager/how-do-i-track-pageviews-of-my-website-using-matomo-tag-manager/#create-pageview-tag" target="_blank" rel="noreferrer noopener">', '</a>');
    },
    fetchFollowStep9: function fetchFollowStep9() {
      return Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep9', Object(external_CoreHome_["translate"])('TagManager_ConfigureWhatTagDoes'), Object(external_CoreHome_["translate"])('TagManager_CustomTitle'), '<strong>', '</strong>');
    },
    fetchFollowStep10: function fetchFollowStep10() {
      return Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep10', Object(external_CoreHome_["translate"])('TagManager_CustomUrl'));
    },
    fetchFollowStep10a: function fetchFollowStep10a() {
      return Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep10a', '<strong>', '</strong>', Object(external_CoreHome_["translate"])('TagManager_CustomUrl'));
    },
    fetchFollowStep10b: function fetchFollowStep10b() {
      return Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep10b', Object(external_CoreHome_["translate"])('TagManager_CustomUrl'), '<strong>', '</strong>');
    },
    fetchFollowStep11: function fetchFollowStep11() {
      return Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep11', Object(external_CoreHome_["translate"])('TagManager_ConfigureWhenTagDoes'), Object(external_CoreHome_["translate"])('TagManager_FireTriggerTitle'), "<strong>".concat(Object(external_CoreHome_["translate"])('TagManager_HistoryChangeTriggerName'), "</strong>"), "<strong>".concat(Object(external_CoreHome_["translate"])('TagManager_PageViewTriggerName'), "</strong>"));
    },
    fetchFollowStep13: function fetchFollowStep13() {
      return Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep13', Object(external_CoreHome_["translate"])('TagManager_Publish'));
    },
    fetchFollowStep14: function fetchFollowStep14() {
      return Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep14', Object(external_CoreHome_["translate"])('TagManager_VersionName'), '<strong>', '</strong>');
    },
    fetchFollowStep15: function fetchFollowStep15() {
      return Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep15', Object(external_CoreHome_["translate"])('TagManager_CreateVersionAndPublishRelease'));
    },
    fetchFollowStep16SPA: function fetchFollowStep16SPA() {
      return Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep16', '&lt;/head&gt;', '<a href="https://developer.matomo.org/guides/tagmanager/embedding" target="_blank" rel="noreferrer noopener">', '</a>');
    },
    fetchFollowStep16React: function fetchFollowStep16React() {
      return Object(external_CoreHome_["translate"])('TagManager_ReactFollowStep16', '<strong>', '</strong>', '<strong>App.js</strong>', '<strong>React.useEffect</strong>', '<strong>Hello World</strong>', '<strong>React.js</strong>');
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/TagmanagerTrackingCode/TrackingSPAPage.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/TagmanagerTrackingCode/TrackingSPAPage.vue



TrackingSPAPagevue_type_script_lang_ts.render = TrackingSPAPagevue_type_template_id_2509c980_render

/* harmony default export */ var TrackingSPAPage = (TrackingSPAPagevue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Debugging/Debugging.vue?vue&type=template&id=6e8e3aea

var Debuggingvue_type_template_id_6e8e3aea_hoisted_1 = {
  class: "nav-wrapper"
};
var Debuggingvue_type_template_id_6e8e3aea_hoisted_2 = {
  class: "pull-right"
};

var Debuggingvue_type_template_id_6e8e3aea_hoisted_3 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("svg", {
  "aria-hidden": "true",
  style: {
    "position": "absolute",
    "width": "0",
    "height": "0",
    "overflow": "hidden"
  },
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink"
}, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("defs", null, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("symbol", {
  id: "tm-icon-checkmark",
  viewBox: "0 0 32 32"
}, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("path", {
  d: "M27 4l-15 15-7-7-5 5 12 12 20-20z"
})])])], -1);

var Debuggingvue_type_template_id_6e8e3aea_hoisted_4 = {
  class: "page",
  style: {
    "clear": "both"
  }
};
var Debuggingvue_type_template_id_6e8e3aea_hoisted_5 = {
  key: 0,
  id: "secondNavBar",
  class: "Menu--dashboard z-depth-1"
};
var Debuggingvue_type_template_id_6e8e3aea_hoisted_6 = {
  class: "navbar",
  role: "menu",
  style: {
    "padding": "0"
  }
};
var Debuggingvue_type_template_id_6e8e3aea_hoisted_7 = {
  class: "menuTab",
  role: "menuitem"
};
var Debuggingvue_type_template_id_6e8e3aea_hoisted_8 = {
  class: "item",
  style: {
    "font-weight": "normal"
  }
};

var Debuggingvue_type_template_id_6e8e3aea_hoisted_9 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" Events ");

var Debuggingvue_type_template_id_6e8e3aea_hoisted_10 = {
  key: 0
};

var Debuggingvue_type_template_id_6e8e3aea_hoisted_11 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);

var Debuggingvue_type_template_id_6e8e3aea_hoisted_12 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);

var Debuggingvue_type_template_id_6e8e3aea_hoisted_13 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
  for: "onlyfiredTags",
  class: "lbl-onlyfiredTags"
}, "Only fired tags", -1);

var Debuggingvue_type_template_id_6e8e3aea_hoisted_14 = {
  key: 0,
  style: {
    "padding": "0 0 1rem 1.2rem"
  }
};
var Debuggingvue_type_template_id_6e8e3aea_hoisted_15 = ["onClick", "title"];
var Debuggingvue_type_template_id_6e8e3aea_hoisted_16 = {
  title: "This tag was fired"
};

var Debuggingvue_type_template_id_6e8e3aea_hoisted_17 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("svg", {
  class: "tm-icon tm-icon-checkmark"
}, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("use", {
  "xlink:href": "#tm-icon-checkmark"
})], -1);

var Debuggingvue_type_template_id_6e8e3aea_hoisted_18 = [Debuggingvue_type_template_id_6e8e3aea_hoisted_17];
var Debuggingvue_type_template_id_6e8e3aea_hoisted_19 = {
  class: "pageWrap"
};
var Debuggingvue_type_template_id_6e8e3aea_hoisted_20 = {
  class: "home",
  id: "content"
};

var Debuggingvue_type_template_id_6e8e3aea_hoisted_21 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", null, "Fired Tags", -1);

var Debuggingvue_type_template_id_6e8e3aea_hoisted_22 = {
  class: "entityTable"
};

var Debuggingvue_type_template_id_6e8e3aea_hoisted_23 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, "Action"), /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, "Name"), /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, "Type"), /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, "Fired count")])], -1);

var Debuggingvue_type_template_id_6e8e3aea_hoisted_24 = {
  key: 0
};

var Debuggingvue_type_template_id_6e8e3aea_hoisted_25 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
  colspan: "4"
}, "No tags", -1);

var Debuggingvue_type_template_id_6e8e3aea_hoisted_26 = [Debuggingvue_type_template_id_6e8e3aea_hoisted_25];

var Debuggingvue_type_template_id_6e8e3aea_hoisted_27 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", {
  style: {
    "margin-top": "30px"
  }
}, "Not Yet Fired Tags", -1);

var Debuggingvue_type_template_id_6e8e3aea_hoisted_28 = {
  class: "entityTable"
};

var Debuggingvue_type_template_id_6e8e3aea_hoisted_29 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, "Name"), /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, "Type")])], -1);

var Debuggingvue_type_template_id_6e8e3aea_hoisted_30 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
  colspan: "4"
}, "No tags", -1);

var Debuggingvue_type_template_id_6e8e3aea_hoisted_31 = [Debuggingvue_type_template_id_6e8e3aea_hoisted_30];

var Debuggingvue_type_template_id_6e8e3aea_hoisted_32 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", null, "Triggers", -1);

var Debuggingvue_type_template_id_6e8e3aea_hoisted_33 = {
  class: "entityTable"
};

var Debuggingvue_type_template_id_6e8e3aea_hoisted_34 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, "Name"), /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, "Type")])], -1);

var Debuggingvue_type_template_id_6e8e3aea_hoisted_35 = {
  key: 0
};

var Debuggingvue_type_template_id_6e8e3aea_hoisted_36 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
  colspan: "4"
}, "No trigger", -1);

var Debuggingvue_type_template_id_6e8e3aea_hoisted_37 = [Debuggingvue_type_template_id_6e8e3aea_hoisted_36];
var Debuggingvue_type_template_id_6e8e3aea_hoisted_38 = {
  key: 1
};

var Debuggingvue_type_template_id_6e8e3aea_hoisted_39 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", null, "Pushed data by this event", -1);

var Debuggingvue_type_template_id_6e8e3aea_hoisted_40 = {
  class: "entityTable"
};
var Debuggingvue_type_template_id_6e8e3aea_hoisted_41 = {
  style: {
    "word-break": "break-all"
  }
};

var Debuggingvue_type_template_id_6e8e3aea_hoisted_42 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);

var Debuggingvue_type_template_id_6e8e3aea_hoisted_43 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", null, "Content after this event", -1);

var Debuggingvue_type_template_id_6e8e3aea_hoisted_44 = {
  class: "entityTable"
};
var Debuggingvue_type_template_id_6e8e3aea_hoisted_45 = {
  style: {
    "word-break": "break-all"
  }
};
var _hoisted_46 = {
  class: "entityTable"
};

var _hoisted_47 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, "Name"), /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, "Type"), /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, "Value")])], -1);

var _hoisted_48 = {
  key: 0
};

var _hoisted_49 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
  colspan: "3"
}, "No variables", -1);

var _hoisted_50 = [_hoisted_49];
var _hoisted_51 = {
  style: {
    "word-break": "break-all"
  }
};
var _hoisted_52 = {
  class: "entityTable"
};

var _hoisted_53 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, "Time"), /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, "Message")])], -1);

var _hoisted_54 = {
  style: {
    "word-break": "break-all"
  }
};

var _hoisted_55 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);

function Debuggingvue_type_template_id_6e8e3aea_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _ctx$selectedEvent, _ctx$selectedEvent$ta, _ctx$selectedEvent2, _ctx$selectedEvent3, _ctx$selectedEvent4, _ctx$selectedEvent5, _ctx$selectedEvent5$c, _ctx$selectedEvent5$c2, _ctx$selectedEvent6, _ctx$selectedEvent6$c;

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("nav", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", Debuggingvue_type_template_id_6e8e3aea_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "logo")]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])({
      'active': _ctx.contentTab === 'tags' || !_ctx.contentTab
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.contentTab = 'tags';
    })
  }, "Tags")], 2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])({
      'active': _ctx.contentTab === 'triggers'
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return _ctx.contentTab = 'triggers';
    })
  }, "Triggers")], 2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])({
      'active': _ctx.contentTab === 'variables'
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    onClick: _cache[2] || (_cache[2] = function ($event) {
      return _ctx.contentTab = 'variables';
    })
  }, "Variables")], 2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])({
      'active': _ctx.contentTab === 'dataLayer'
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    onClick: _cache[3] || (_cache[3] = function ($event) {
      return _ctx.contentTab = 'dataLayer';
    })
  }, "Data Layer")], 2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])({
      'active': _ctx.contentTab === 'logs'
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    onClick: _cache[4] || (_cache[4] = function ($event) {
      return _ctx.contentTab = 'logs';
    })
  }, "Logs")], 2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", Debuggingvue_type_template_id_6e8e3aea_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    id: "mtmUpdateDebugPosition",
    onClick: _cache[5] || (_cache[5] = function ($event) {
      return _ctx.mtmUpdateDebugPosition();
    })
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.positionText), 1)])])])]), Debuggingvue_type_template_id_6e8e3aea_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", Debuggingvue_type_template_id_6e8e3aea_hoisted_4, [_ctx.contentTab !== 'logs' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", Debuggingvue_type_template_id_6e8e3aea_hoisted_5, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", Debuggingvue_type_template_id_6e8e3aea_hoisted_6, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", Debuggingvue_type_template_id_6e8e3aea_hoisted_7, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", Debuggingvue_type_template_id_6e8e3aea_hoisted_8, [Debuggingvue_type_template_id_6e8e3aea_hoisted_9, _ctx.mtmEvents.length > 0 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", Debuggingvue_type_template_id_6e8e3aea_hoisted_10, [Debuggingvue_type_template_id_6e8e3aea_hoisted_11, Debuggingvue_type_template_id_6e8e3aea_hoisted_12, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    type: "checkbox",
    class: "onlyFiredTags-chk",
    name: "onlyfiredTags",
    id: "onlyfiredTags",
    value: "1",
    "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
      return _ctx.onlyfiredTags = $event;
    }),
    style: {
      "margin-right": "3.5px"
    }
  }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelCheckbox"], _ctx.onlyfiredTags]]), Debuggingvue_type_template_id_6e8e3aea_hoisted_13])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])]), _ctx.mtmEvents.length === 0 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", Debuggingvue_type_template_id_6e8e3aea_hoisted_14, "No event executed")) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.mtmEventsReversed, function (event, index) {
    var _event$metTrigger, _event$tags;

    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["menuTab", {
        'active': index === _ctx.selectedEventIndex
      }]),
      role: "menuitem",
      key: index
    }, [(event.tags || []).length || !_ctx.onlyfiredTags ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
      key: 0,
      class: "item",
      onClick: function onClick($event) {
        return _ctx.selectEvent(event.index0);
      },
      title: "Time: ".concat(event.time, ". Trigger: ").concat((_event$metTrigger = event.metTrigger) === null || _event$metTrigger === void 0 ? void 0 : _event$metTrigger.name)
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(event.index) + ": " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(event.name) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", Debuggingvue_type_template_id_6e8e3aea_hoisted_16, Debuggingvue_type_template_id_6e8e3aea_hoisted_18, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], (_event$tags = event.tags) === null || _event$tags === void 0 ? void 0 : _event$tags.length]])], 8, Debuggingvue_type_template_id_6e8e3aea_hoisted_15)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 2);
  }), 128))])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", Debuggingvue_type_template_id_6e8e3aea_hoisted_19, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", Debuggingvue_type_template_id_6e8e3aea_hoisted_20, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.homeTabTitle), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.contentTab !== 'logs']]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Debuggingvue_type_template_id_6e8e3aea_hoisted_21, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("table", Debuggingvue_type_template_id_6e8e3aea_hoisted_22, [Debuggingvue_type_template_id_6e8e3aea_hoisted_23, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [!((_ctx$selectedEvent = _ctx.selectedEvent) !== null && _ctx$selectedEvent !== void 0 && (_ctx$selectedEvent$ta = _ctx$selectedEvent.tags) !== null && _ctx$selectedEvent$ta !== void 0 && _ctx$selectedEvent$ta.length) ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", Debuggingvue_type_template_id_6e8e3aea_hoisted_24, Debuggingvue_type_template_id_6e8e3aea_hoisted_26)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(((_ctx$selectedEvent2 = _ctx.selectedEvent) === null || _ctx$selectedEvent2 === void 0 ? void 0 : _ctx$selectedEvent2.tags) || [], function (tag, index) {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
      key: index
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(tag.action), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(tag.name), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(tag.type), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(tag.numExecuted), 1)]);
  }), 128))])]), Debuggingvue_type_template_id_6e8e3aea_hoisted_27, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("table", Debuggingvue_type_template_id_6e8e3aea_hoisted_28, [Debuggingvue_type_template_id_6e8e3aea_hoisted_29, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, Debuggingvue_type_template_id_6e8e3aea_hoisted_31, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.notFiredTags.length === 0]]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.notFiredTags, function (tag, index) {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
      key: index
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(tag.name), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(tag.type), 1)]);
  }), 128))])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.contentTab === 'tags' || !_ctx.contentTab]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Debuggingvue_type_template_id_6e8e3aea_hoisted_32, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("table", Debuggingvue_type_template_id_6e8e3aea_hoisted_33, [Debuggingvue_type_template_id_6e8e3aea_hoisted_34, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [!((_ctx$selectedEvent3 = _ctx.selectedEvent) !== null && _ctx$selectedEvent3 !== void 0 && _ctx$selectedEvent3.metTrigger) ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", Debuggingvue_type_template_id_6e8e3aea_hoisted_35, Debuggingvue_type_template_id_6e8e3aea_hoisted_37)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), (_ctx$selectedEvent4 = _ctx.selectedEvent) !== null && _ctx$selectedEvent4 !== void 0 && _ctx$selectedEvent4.metTrigger ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", Debuggingvue_type_template_id_6e8e3aea_hoisted_38, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.selectedEvent.metTrigger.name), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.selectedEvent.metTrigger.type), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.contentTab === 'triggers']]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Debuggingvue_type_template_id_6e8e3aea_hoisted_39, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("table", Debuggingvue_type_template_id_6e8e3aea_hoisted_40, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", Debuggingvue_type_template_id_6e8e3aea_hoisted_41, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.selectedEventData), 1)])])]), Debuggingvue_type_template_id_6e8e3aea_hoisted_42, Debuggingvue_type_template_id_6e8e3aea_hoisted_43, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("table", Debuggingvue_type_template_id_6e8e3aea_hoisted_44, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", Debuggingvue_type_template_id_6e8e3aea_hoisted_45, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.selectedEventContainerDataLayer), 1)])])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.contentTab === 'dataLayer']]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("table", _hoisted_46, [_hoisted_47, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [!((_ctx$selectedEvent5 = _ctx.selectedEvent) !== null && _ctx$selectedEvent5 !== void 0 && (_ctx$selectedEvent5$c = _ctx$selectedEvent5.container) !== null && _ctx$selectedEvent5$c !== void 0 && (_ctx$selectedEvent5$c2 = _ctx$selectedEvent5$c.variables) !== null && _ctx$selectedEvent5$c2 !== void 0 && _ctx$selectedEvent5$c2.length) ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", _hoisted_48, _hoisted_50)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(((_ctx$selectedEvent6 = _ctx.selectedEvent) === null || _ctx$selectedEvent6 === void 0 ? void 0 : (_ctx$selectedEvent6$c = _ctx$selectedEvent6.container) === null || _ctx$selectedEvent6$c === void 0 ? void 0 : _ctx$selectedEvent6$c.variables) || [], function (variable, index) {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
      key: index
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variable.name), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variable.type), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", _hoisted_51, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.stringifySelectedVariable(variable)), 1)]);
  }), 128))])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.contentTab === 'variables']]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("table", _hoisted_52, [_hoisted_53, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.mtmLogs, function (log, index) {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
      key: index
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(log.time), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", _hoisted_54, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(log.messages, function (logMessage, index) {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
        key: index
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(logMessage), 1), _hoisted_55]);
    }), 128))])]);
  }), 128))])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.contentTab === 'logs']])])])])]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Debugging/Debugging.vue?vue&type=template&id=6e8e3aea

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/TagManager/vue/src/Debugging/Debugging.vue?vue&type=script&lang=ts
var _window$mtmDbgData, _window$mtmDbgData2;

function Debuggingvue_type_script_lang_ts_toConsumableArray(arr) { return Debuggingvue_type_script_lang_ts_arrayWithoutHoles(arr) || Debuggingvue_type_script_lang_ts_iterableToArray(arr) || Debuggingvue_type_script_lang_ts_unsupportedIterableToArray(arr) || Debuggingvue_type_script_lang_ts_nonIterableSpread(); }

function Debuggingvue_type_script_lang_ts_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Debuggingvue_type_script_lang_ts_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Debuggingvue_type_script_lang_ts_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Debuggingvue_type_script_lang_ts_arrayLikeToArray(o, minLen); }

function Debuggingvue_type_script_lang_ts_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function Debuggingvue_type_script_lang_ts_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return Debuggingvue_type_script_lang_ts_arrayLikeToArray(arr); }

function Debuggingvue_type_script_lang_ts_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Debuggingvue_type_script_lang_ts_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Debuggingvue_type_script_lang_ts_typeof = function _typeof(obj) { return typeof obj; }; } else { Debuggingvue_type_script_lang_ts_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Debuggingvue_type_script_lang_ts_typeof(obj); }

/* eslint-disable @typescript-eslint/no-explicit-any */


window.mtmDbgData = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
  mtmEvents: ((_window$mtmDbgData = window.mtmDbgData) === null || _window$mtmDbgData === void 0 ? void 0 : _window$mtmDbgData.mtmEvents) || [],
  mtmLogs: ((_window$mtmDbgData2 = window.mtmDbgData) === null || _window$mtmDbgData2 === void 0 ? void 0 : _window$mtmDbgData2.mtmLogs) || []
});
var cookieName = 'mtmPreviewPosition';
var stickyTextTop = 'Stick to Top';
var stickyTextBottom = 'Stick to Bottom';

function getCircularReplacer() {
  var seen = new WeakSet();

  function circular(key, value) {
    if (Debuggingvue_type_script_lang_ts_typeof(value) === 'object' && value !== null) {
      if (seen.has(value)) {
        return '';
      }

      seen.add(value);
    }

    return value;
  }

  return circular;
}

/* harmony default export */ var Debuggingvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  data: function data() {
    return {
      contentTab: 'tags',
      selectedEventIndex: 0,
      onlyfiredTags: false,
      positionText: Object(external_CoreHome_["getCookie"])(cookieName) === 'top' ? stickyTextBottom : stickyTextTop
    };
  },
  methods: {
    mtmUpdateDebugPosition: function mtmUpdateDebugPosition() {
      var sevenDays = 7 * 60 * 60 * 24 * 1000;
      var currentCookieValue = Object(external_CoreHome_["getCookie"])(cookieName);
      var cookieValue = currentCookieValue === 'top' ? 'bottom' : 'top';
      Object(external_CoreHome_["setCookie"])(cookieName, cookieValue, sevenDays);
      var iframe = window.parent.document.getElementById('mtmDebugFrame');

      if (cookieValue === 'top') {
        this.positionText = stickyTextBottom;
        iframe.classList.remove('mtmStickyBottom');
        iframe.classList.add('mtmStickyTop');
      } else {
        this.positionText = stickyTextTop;
        iframe.classList.remove('mtmStickyTop');
        iframe.classList.add('mtmStickyBottom');
      }
    },
    selectEvent: function selectEvent(eventIndex) {
      if (!this.mtmEvents[eventIndex]) {
        return;
      }

      this.selectedEventIndex = eventIndex;
    },
    stringifySelectedVariable: function stringifySelectedVariable(variable) {
      return JSON.stringify(variable.value, getCircularReplacer());
    }
  },
  computed: {
    homeTabTitle: function homeTabTitle() {
      var _this$selectedEvent;

      if (!((_this$selectedEvent = this.selectedEvent) !== null && _this$selectedEvent !== void 0 && _this$selectedEvent.container)) {
        return '';
      }

      var versionName = this.selectedEvent.container.versionName || 'Draft version';
      var container = this.selectedEvent.container.id;
      var eventNum = this.selectedEventIndex + 1;
      return "Event ".concat(eventNum, ": ").concat(this.selectedEvent.name, " (").concat(container, " - ").concat(versionName, ")");
    },
    notFiredTags: function notFiredTags() {
      var _this$selectedEvent2;

      if (!((_this$selectedEvent2 = this.selectedEvent) !== null && _this$selectedEvent2 !== void 0 && _this$selectedEvent2.container)) {
        return [];
      }

      var eventIndex = this.selectedEventIndex;
      var tagsFired = [];
      this.mtmEvents.forEach(function (event, i) {
        if (i > eventIndex) {
          return;
        }

        tagsFired.push.apply(tagsFired, Debuggingvue_type_script_lang_ts_toConsumableArray(event.tags.map(function (tag) {
          return tag.name;
        })));
      });
      var tagsNotFired = [];
      this.selectedEvent.container.tags.forEach(function (tag) {
        if (tagsFired.indexOf(tag.name) === -1) {
          tagsNotFired.push(tag);
        }
      });
      return tagsNotFired;
    },
    selectedEvent: function selectedEvent() {
      return this.mtmEvents[this.selectedEventIndex];
    },
    mtmEvents: function mtmEvents() {
      return window.mtmDbgData.mtmEvents;
    },
    mtmEventsReversed: function mtmEventsReversed() {
      var result = Debuggingvue_type_script_lang_ts_toConsumableArray(this.mtmEvents);

      result.reverse();
      return result;
    },
    mtmLogs: function mtmLogs() {
      return window.mtmDbgData.mtmLogs;
    },
    selectedEventData: function selectedEventData() {
      var _this$selectedEvent3;

      return ((_this$selectedEvent3 = this.selectedEvent) === null || _this$selectedEvent3 === void 0 ? void 0 : _this$selectedEvent3.eventData) && JSON.stringify(this.selectedEvent.eventData, getCircularReplacer());
    },
    selectedEventContainerDataLayer: function selectedEventContainerDataLayer() {
      var _this$selectedEvent4, _this$selectedEvent4$;

      return ((_this$selectedEvent4 = this.selectedEvent) === null || _this$selectedEvent4 === void 0 ? void 0 : (_this$selectedEvent4$ = _this$selectedEvent4.container) === null || _this$selectedEvent4$ === void 0 ? void 0 : _this$selectedEvent4$.dataLayer) && JSON.stringify(this.selectedEvent.container.dataLayer, getCircularReplacer());
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Debugging/Debugging.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Debugging/Debugging.vue



Debuggingvue_type_script_lang_ts.render = Debuggingvue_type_template_id_6e8e3aea_render

/* harmony default export */ var Debugging = (Debuggingvue_type_script_lang_ts);
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