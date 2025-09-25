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
__webpack_require__.d(__webpack_exports__, "TrackingCodeCommon", function() { return /* reexport */ TrackingCodeCommon; });
__webpack_require__.d(__webpack_exports__, "TrackingCodePage", function() { return /* reexport */ TrackingCodePage; });
__webpack_require__.d(__webpack_exports__, "TrackingSPAPage", function() { return /* reexport */ TrackingSPAPage; });
__webpack_require__.d(__webpack_exports__, "Debugging", function() { return /* reexport */ Debugging; });
__webpack_require__.d(__webpack_exports__, "CopyDialog", function() { return /* reexport */ CopyDialog; });

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

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/ImportVersion/ImportVersion.vue?vue&type=template&id=b050db62

const _hoisted_1 = {
  class: "tagManagerImportVersion"
};
const _hoisted_2 = {
  class: "ui-confirm",
  id: "confirmImportContainerVersion",
  ref: "confirmImportContainerVersion"
};
const _hoisted_3 = ["value"];
const _hoisted_4 = ["value"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ActivityIndicator = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ActivityIndicator");
  const _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");
  const _component_SaveButton = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("SaveButton");
  const _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    "content-title": _ctx.translate('TagManager_ImportVersion')
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_VersionImportInfo')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ActivityIndicator, {
      loading: _ctx.isUpdating,
      "loading-message": _ctx.translate('TagManager_UpdatingData')
    }, null, 8, ["loading", "loading-message"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
      uicontrol: "text",
      modelValue: _ctx.backupName,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => _ctx.backupName = $event),
      name: "backupName",
      placeholder: ' ',
      title: _ctx.backupNameTitle,
      "inline-help": _ctx.translate('TagManager_BackupVersionNameHelp')
    }, null, 8, ["modelValue", "title", "inline-help"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
      uicontrol: "textarea",
      modelValue: _ctx.importContent,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => _ctx.importContent = $event),
      name: "importContent",
      placeholder: ' ',
      "full-width": true,
      title: _ctx.translate('TagManager_VersionImportContentTitle')
    }, null, 8, ["modelValue", "title"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_SaveButton, {
      class: "importVersion",
      disabled: !_ctx.importContent,
      onConfirm: _cache[2] || (_cache[2] = $event => _ctx.importVersion(_ctx.backupName, _ctx.importContent)),
      value: _ctx.translate('TagManager_VersionImportOverwriteContent')
    }, null, 8, ["disabled", "value"])]),
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
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/ImportVersion/ImportVersion.vue?vue&type=template&id=b050db62

// EXTERNAL MODULE: external "CoreHome"
var external_CoreHome_ = __webpack_require__("19dc");

// EXTERNAL MODULE: external "CorePluginsAdmin"
var external_CorePluginsAdmin_ = __webpack_require__("a5a2");

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/ImportVersion/ImportVersion.vue?vue&type=script&lang=ts



const NOTIFICATION_ID = 'importContainerVersion';
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
  data() {
    return {
      isUpdating: false,
      backupName: '',
      importContent: ''
    };
  },
  methods: {
    showNotification(message, context, type = null) {
      const instanceId = external_CoreHome_["NotificationsStore"].show({
        message,
        context,
        type: type !== null ? type : 'toast',
        id: NOTIFICATION_ID
      });
      setTimeout(() => {
        external_CoreHome_["NotificationsStore"].scrollToNotification(instanceId);
      }, 200);
    },
    importVersion(backupName, version) {
      if (!version) {
        return;
      }
      let parsed;
      try {
        parsed = JSON.parse(version);
      } catch (e) {
        this.showNotification(Object(external_CoreHome_["translate"])('TagManager_ErrorInvalidContainerImportFormat'), 'error');
        return;
      }
      if ('tags' in parsed && 'triggers' in parsed && 'variables' in parsed && 'idcontainer' in parsed && 'context' in parsed) {
        external_CoreHome_["Matomo"].helper.modalConfirm(this.$refs.confirmImportContainerVersion, {
          yes: () => {
            this.isUpdating = true;
            const post = {
              exportedContainerVersion: version
            };
            external_CoreHome_["AjaxHelper"].post({
              method: 'TagManager.importContainerVersion',
              idContainer: this.idContainer,
              backupName: this.backupName
            }, post, {
              createErrorNotification: false
            }).then(() => {
              this.showNotification(Object(external_CoreHome_["translate"])('TagManager_VersionImportSuccess'), 'success');
              this.isUpdating = false;
              window.location.reload();
            }).catch(e => {
              this.showNotification(e.message, 'error', 'transient');
              this.isUpdating = false;
            });
          }
        });
      } else {
        this.showNotification(Object(external_CoreHome_["translate"])('TagManager_ErrorContainerVersionImportIncomplete'), 'error');
      }
    }
  },
  computed: {
    backupNameTitle() {
      return `${Object(external_CoreHome_["translate"])('TagManager_BackupVersionName')} (${Object(external_CoreHome_["translate"])('General_Recommended')})`;
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/ImportVersion/ImportVersion.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/ImportVersion/ImportVersion.vue



ImportVersionvue_type_script_lang_ts.render = render

/* harmony default export */ var ImportVersion = (ImportVersionvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/VariableSelect/VariableSelect.vue?vue&type=template&id=2bc8897c

const VariableSelectvue_type_template_id_2bc8897c_hoisted_1 = {
  class: "tagManagerManageSelect tagManagerVariableSelect"
};
const VariableSelectvue_type_template_id_2bc8897c_hoisted_2 = {
  class: "tableActionBar"
};
const VariableSelectvue_type_template_id_2bc8897c_hoisted_3 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, " ", -1);
const VariableSelectvue_type_template_id_2bc8897c_hoisted_4 = {
  class: "collection with-header"
};
const _hoisted_5 = {
  class: "collection-header"
};
const _hoisted_6 = ["onClick"];
const _hoisted_7 = {
  class: "title"
};
const _hoisted_8 = {
  class: "secondary-content"
};
const _hoisted_9 = ["onClick", "title"];
const _hoisted_10 = {
  class: "collection-header"
};
const _hoisted_11 = ["onClick"];
const _hoisted_12 = {
  class: "title"
};
const _hoisted_13 = {
  class: "secondary-content"
};
const _hoisted_14 = ["title"];
const _hoisted_15 = {
  class: "tableActionBar"
};
const _hoisted_16 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, " ", -1);
function VariableSelectvue_type_template_id_2bc8897c_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ActivityIndicator = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ActivityIndicator");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VariableSelectvue_type_template_id_2bc8897c_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ActivityIndicator, {
    loading: _ctx.isLoading
  }, null, 8, ["loading"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableSelectvue_type_template_id_2bc8897c_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    class: "createNewVariable",
    onClick: _cache[0] || (_cache[0] = $event => _ctx.createVariable())
  }, [VariableSelectvue_type_template_id_2bc8897c_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewVariable')), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isLoading]])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", VariableSelectvue_type_template_id_2bc8897c_hoisted_4, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", _hoisted_5, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CustomVariables')), 1)]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.containerVariables, (variable, index) => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
      class: "collection-item",
      onClick: $event => _ctx.selectVariable(variable),
      key: index
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_7, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variable.name) + " (" + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Type')) + ": " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variable.type) + ") ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("i", {
      class: "icon-edit",
      onClick: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])($event => _ctx.editVariable(variable), ["stop"]),
      title: _ctx.translate('General_Edit')
    }, null, 8, _hoisted_9)])], 8, _hoisted_6);
  }), 128))]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_PreconfiguredVariables')), 1), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.preconfiguredVariables, variableCategory => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("ul", {
      class: "collection with-header",
      key: variableCategory.name
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", _hoisted_10, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variableCategory.name), 1)]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(variableCategory.types, (variableTemplate, index) => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
        class: "collection-item",
        key: index,
        onClick: $event => _ctx.selectVariable(variableTemplate)
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_12, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variableTemplate.name), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_13, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("i", {
        class: "icon-help",
        title: variableTemplate.description
      }, null, 8, _hoisted_14)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !!variableTemplate.description]])], 8, _hoisted_11)), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], variableTemplate.is_pre_configured]]);
    }), 128))]);
  }), 128)), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_15, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    class: "createNewVariable",
    onClick: _cache[1] || (_cache[1] = $event => _ctx.createVariable())
  }, [_hoisted_16, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewVariable', _ctx.translate('TagManager_Variable'))), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isLoading]])])]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/VariableSelect/VariableSelect.vue?vue&type=template&id=2bc8897c

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/VariableSelect/VariableSelect.vue?vue&type=script&lang=ts


const {
  tagManagerHelper
} = window;
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
  data() {
    return {
      preconfiguredVariables: [],
      containerVariables: [],
      isLoading: false,
      actualIdContainerVersion: this.idContainerVersion
    };
  },
  emits: ['selectVariable'],
  created() {
    this.fetchAvailableVariables();
  },
  watch: {
    idContainerVersion(newValue) {
      this.actualIdContainerVersion = newValue;
    }
  },
  methods: {
    fetchAvailableVariables() {
      this.preconfiguredVariables = [];
      this.containerVariables = [];
      this.fetchContainer().then(container => {
        this.isLoading = true;
        this.actualIdContainerVersion = container.draft.idcontainerversion;
        return external_CoreHome_["AjaxHelper"].fetch({
          method: 'TagManager.getAvailableContainerVariables',
          filter_limit: '-1',
          idContainer: this.idContainer,
          idContainerVersion: this.actualIdContainerVersion
        }).then(variables => {
          this.preconfiguredVariables = [];
          this.containerVariables = [];
          this.isLoading = false;
          variables.forEach(category => {
            const preConfig = Object.assign(Object.assign({}, category), {}, {
              types: category.types.filter(c => c.is_pre_configured)
            });
            this.containerVariables.push(...category.types.filter(c => !c.is_pre_configured));
            if (preConfig.types.length) {
              this.preconfiguredVariables.push(preConfig);
            }
          });
        }).catch(() => {
          this.isLoading = false;
        });
      });
    },
    editVariable(variable) {
      if (!this.actualIdContainerVersion) {
        return;
      }
      tagManagerHelper.editVariable(this.idContainer, this.actualIdContainerVersion, variable.idvariable, () => {
        this.fetchAvailableVariables();
      });
    },
    createVariable() {
      if (!this.actualIdContainerVersion) {
        return;
      }
      tagManagerHelper.editVariable(this.idContainer, this.actualIdContainerVersion, 0, () => {
        this.fetchAvailableVariables();
      });
    },
    selectVariable(variable) {
      this.$emit('selectVariable', {
        variable
      });
    },
    fetchContainer() {
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



VariableSelectvue_type_script_lang_ts.render = VariableSelectvue_type_template_id_2bc8897c_render

/* harmony default export */ var VariableSelect = (VariableSelectvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/VariableSelectType/VariableSelectType.vue?vue&type=template&id=037ff744

const VariableSelectTypevue_type_template_id_037ff744_hoisted_1 = {
  class: "tagManagerManageSelect tagManagerVariableSelectType"
};
const VariableSelectTypevue_type_template_id_037ff744_hoisted_2 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, " ", -1);
function VariableSelectTypevue_type_template_id_037ff744_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VariableSelectTypevue_type_template_id_037ff744_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
    uicontrol: "select",
    name: `variableType${_ctx.variableType}`,
    class: "selectVariableType",
    "model-value": _ctx.modelValue,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => _ctx.onChange($event)),
    "full-width": true,
    options: _ctx.containerVariables
  }, null, 8, ["name", "model-value", "options"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    class: "createNewVariable",
    onClick: _cache[1] || (_cache[1] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])($event => _ctx.createVariable(), ["prevent"]))
  }, [VariableSelectTypevue_type_template_id_037ff744_hoisted_2, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewVariable')), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isLoading]])]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/VariableSelectType/VariableSelectType.vue?vue&type=template&id=037ff744

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/VariableSelectType/VariableSelectType.vue?vue&type=script&lang=ts



const {
  tagManagerHelper: VariableSelectTypevue_type_script_lang_ts_tagManagerHelper
} = window;
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
  data() {
    return {
      containerVariables: [],
      isLoading: false,
      idContainerVersion: null
    };
  },
  created() {
    this.fetchAvailableVariables();
  },
  methods: {
    fetchAvailableVariables() {
      this.containerVariables = [];
      this.fetchContainer().then(container => {
        this.isLoading = true;
        this.idContainerVersion = container.draft.idcontainerversion;
        return external_CoreHome_["AjaxHelper"].fetch({
          method: 'TagManager.getAvailableContainerVariables',
          filter_limit: '-1',
          idContainer: external_CoreHome_["MatomoUrl"].parsed.value.idContainer,
          idContainerVersion: this.idContainerVersion
        }).then(variables => {
          this.containerVariables = [];
          this.isLoading = false;
          variables.forEach(category => {
            const options = category.types.filter(t => t.type === this.variableType).map(t => ({
              key: `{{${t.id}}}`,
              value: t.name
            }));
            this.containerVariables.push(...options);
          });
          if (!this.modelValue && this.containerVariables.length === 1) {
            // when no value configured and only one selection is available, we preselect that value
            this.onChange(this.containerVariables[0].key);
          }
        }).catch(() => {
          this.isLoading = false;
        });
      });
    },
    onChange(newValue) {
      this.$emit('update:modelValue', newValue);
    },
    createVariable() {
      if (!this.idContainerVersion) {
        return;
      }
      VariableSelectTypevue_type_script_lang_ts_tagManagerHelper.editVariable(external_CoreHome_["MatomoUrl"].parsed.value.idContainer, this.idContainerVersion, 0, variable => {
        this.fetchAvailableVariables();
        if (variable) {
          this.onChange(`{{${variable.name}}}`);
        }
      }, this.variableType);
    },
    fetchContainer() {
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



VariableSelectTypevue_type_script_lang_ts.render = VariableSelectTypevue_type_template_id_037ff744_render

/* harmony default export */ var VariableSelectType = (VariableSelectTypevue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Field/FieldTextareaVariable.vue?vue&type=template&id=36f615a2

const FieldTextareaVariablevue_type_template_id_36f615a2_hoisted_1 = {
  class: "fieldVariableTemplate"
};
const FieldTextareaVariablevue_type_template_id_36f615a2_hoisted_2 = ["type", "id", "name", "value"];
const FieldTextareaVariablevue_type_template_id_36f615a2_hoisted_3 = ["title"];
const FieldTextareaVariablevue_type_template_id_36f615a2_hoisted_4 = ["for", "innerHTML"];
function FieldTextareaVariablevue_type_template_id_36f615a2_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", FieldTextareaVariablevue_type_template_id_36f615a2_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("textarea", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["mergeProps"])({
    class: `control_${_ctx.uiControl} materialize-textarea`,
    type: _ctx.uiControl,
    id: _ctx.name,
    name: _ctx.name,
    value: _ctx.modelValue,
    onKeydown: _cache[0] || (_cache[0] = $event => _ctx.onKeydown($event)),
    onChange: _cache[1] || (_cache[1] = $event => _ctx.onKeydown($event)),
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
    onClick: _cache[2] || (_cache[2] = $event => _ctx.selectVariable())
  }, null, 8, FieldTextareaVariablevue_type_template_id_36f615a2_hoisted_3), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
    for: _ctx.name,
    innerHTML: _ctx.$sanitize(_ctx.title)
  }, null, 8, FieldTextareaVariablevue_type_template_id_36f615a2_hoisted_4)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Field/FieldTextareaVariable.vue?vue&type=template&id=36f615a2

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Field/FieldTextareaVariable.vue?vue&type=script&lang=ts


const {
  tagManagerHelper: FieldTextareaVariablevue_type_script_lang_ts_tagManagerHelper
} = window;
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
  created() {
    this.onKeydown = Object(external_CoreHome_["debounce"])(this.onKeydown.bind(this), 50);
  },
  methods: {
    onKeydown(event) {
      this.$emit('update:modelValue', event.target.value);
    },
    selectVariable() {
      FieldTextareaVariablevue_type_script_lang_ts_tagManagerHelper.selectVariable(variable => {
        FieldTextareaVariablevue_type_script_lang_ts_tagManagerHelper.insertTextSnippetAtElement(this.$refs.textarea, `{{${variable.id}}}`);
      });
    }
  },
  watch: {
    modelValue() {
      const {
        Materialize
      } = window;
      setTimeout(() => {
        Materialize.textareaAutoResize(this.$refs.textarea);
        Materialize.updateTextFields();
      });
    }
  },
  mounted() {
    const {
      Materialize
    } = window;
    setTimeout(() => {
      Materialize.textareaAutoResize(this.$refs.textarea);
      Materialize.updateTextFields();
    });
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Field/FieldTextareaVariable.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Field/FieldTextareaVariable.vue



FieldTextareaVariablevue_type_script_lang_ts.render = FieldTextareaVariablevue_type_template_id_36f615a2_render

/* harmony default export */ var FieldTextareaVariable = (FieldTextareaVariablevue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Field/FieldVariableTemplate.vue?vue&type=template&id=025d3bb8

const FieldVariableTemplatevue_type_template_id_025d3bb8_hoisted_1 = {
  class: "fieldVariableTemplate"
};
const FieldVariableTemplatevue_type_template_id_025d3bb8_hoisted_2 = ["type", "id", "name", "value"];
const FieldVariableTemplatevue_type_template_id_025d3bb8_hoisted_3 = ["title"];
const FieldVariableTemplatevue_type_template_id_025d3bb8_hoisted_4 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);
const FieldVariableTemplatevue_type_template_id_025d3bb8_hoisted_5 = ["for", "innerHTML"];
function FieldVariableTemplatevue_type_template_id_025d3bb8_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", FieldVariableTemplatevue_type_template_id_025d3bb8_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["mergeProps"])({
    class: `control_${_ctx.uiControl}`,
    type: _ctx.uiControl,
    id: _ctx.name,
    name: _ctx.name,
    value: _ctx.modelValueText,
    onKeydown: _cache[0] || (_cache[0] = $event => _ctx.onKeydown($event)),
    onChange: _cache[1] || (_cache[1] = $event => _ctx.onKeydown($event)),
    placeholder: "",
    style: {
      "width": "calc(100% - 40px)"
    }
  }, _ctx.uiControlAttributes, {
    ref: "input"
  }), null, 16, FieldVariableTemplatevue_type_template_id_025d3bb8_hoisted_2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
    class: "icon-code",
    title: _ctx.translate('TagManager_ChooseVariable'),
    onClick: _cache[2] || (_cache[2] = $event => _ctx.selectVariable())
  }, null, 8, FieldVariableTemplatevue_type_template_id_025d3bb8_hoisted_3), FieldVariableTemplatevue_type_template_id_025d3bb8_hoisted_4, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
    for: _ctx.name,
    innerHTML: _ctx.$sanitize(_ctx.title)
  }, null, 8, FieldVariableTemplatevue_type_template_id_025d3bb8_hoisted_5)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Field/FieldVariableTemplate.vue?vue&type=template&id=025d3bb8

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Field/FieldVariableTemplate.vue?vue&type=script&lang=ts


const {
  tagManagerHelper: FieldVariableTemplatevue_type_script_lang_ts_tagManagerHelper
} = window;
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
    modelValueText() {
      if (typeof this.modelValue === 'undefined' || this.modelValue === null) {
        return '';
      }
      return this.modelValue.toString();
    }
  },
  created() {
    // debounce because puppeteer types reeaally fast
    this.onKeydown = Object(external_CoreHome_["debounce"])(this.onKeydown.bind(this), 50);
  },
  mounted() {
    setTimeout(() => {
      window.Materialize.updateTextFields();
    });
  },
  watch: {
    modelValue() {
      setTimeout(() => {
        window.Materialize.updateTextFields();
      });
    }
  },
  methods: {
    onKeydown(event) {
      this.$emit('update:modelValue', event.target.value);
    },
    selectVariable() {
      FieldVariableTemplatevue_type_script_lang_ts_tagManagerHelper.selectVariable(variable => {
        FieldVariableTemplatevue_type_script_lang_ts_tagManagerHelper.insertTextSnippetAtElement(this.$refs.input, `{{${variable.id}}}`);
      });
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Field/FieldVariableTemplate.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Field/FieldVariableTemplate.vue



FieldVariableTemplatevue_type_script_lang_ts.render = FieldVariableTemplatevue_type_template_id_025d3bb8_render

/* harmony default export */ var FieldVariableTemplate = (FieldVariableTemplatevue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Field/FieldVariableTypeTemplate.vue?vue&type=template&id=74bb398d

const FieldVariableTypeTemplatevue_type_template_id_74bb398d_hoisted_1 = ["for", "innerHTML"];
function FieldVariableTypeTemplatevue_type_template_id_74bb398d_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_VariableSelectType = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("VariableSelectType");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_VariableSelectType, {
    "model-value": _ctx.modelValue,
    id: _ctx.name,
    name: _ctx.name,
    "variable-type-name": _ctx.title,
    "variable-type": _ctx.uiControlAttributes.variableType,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => _ctx.$emit('update:modelValue', $event))
  }, null, 8, ["model-value", "id", "name", "variable-type-name", "variable-type"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
    for: _ctx.name,
    style: {
      "font-size": "0.8rem"
    },
    innerHTML: _ctx.$sanitize(_ctx.title)
  }, null, 8, FieldVariableTypeTemplatevue_type_template_id_74bb398d_hoisted_1)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Field/FieldVariableTypeTemplate.vue?vue&type=template&id=74bb398d

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Field/FieldVariableTypeTemplate.vue?vue&type=script&lang=ts


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
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Variable/VariableEdit.vue?vue&type=template&id=32c62ff6

const VariableEditvue_type_template_id_32c62ff6_hoisted_1 = {
  class: "editVariable tagManagerManageEdit",
  ref: "root"
};
const VariableEditvue_type_template_id_32c62ff6_hoisted_2 = {
  class: "loadingPiwik"
};
const VariableEditvue_type_template_id_32c62ff6_hoisted_3 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);
const VariableEditvue_type_template_id_32c62ff6_hoisted_4 = {
  class: "loadingPiwik"
};
const VariableEditvue_type_template_id_32c62ff6_hoisted_5 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);
const VariableEditvue_type_template_id_32c62ff6_hoisted_6 = ["innerHTML"];
const VariableEditvue_type_template_id_32c62ff6_hoisted_7 = {
  key: 0,
  class: "form-group row"
};
const VariableEditvue_type_template_id_32c62ff6_hoisted_8 = {
  class: "col s12"
};
const VariableEditvue_type_template_id_32c62ff6_hoisted_9 = {
  key: 1
};
const VariableEditvue_type_template_id_32c62ff6_hoisted_10 = {
  class: "form-group row"
};
const VariableEditvue_type_template_id_32c62ff6_hoisted_11 = {
  class: "col s12"
};
const VariableEditvue_type_template_id_32c62ff6_hoisted_12 = {
  key: 2
};
const VariableEditvue_type_template_id_32c62ff6_hoisted_13 = {
  class: "innerFormField"
};
const VariableEditvue_type_template_id_32c62ff6_hoisted_14 = {
  class: "form-group row"
};
const VariableEditvue_type_template_id_32c62ff6_hoisted_15 = {
  class: "col s12 m12"
};
const VariableEditvue_type_template_id_32c62ff6_hoisted_16 = {
  for: "lookup_table"
};
const _hoisted_17 = {
  class: "innerFormField comparisonField"
};
const _hoisted_18 = {
  class: "innerFormField"
};
const _hoisted_19 = {
  class: "innerFormField"
};
const _hoisted_20 = ["onClick", "title"];
const _hoisted_21 = ["innerHTML"];
const _hoisted_22 = {
  class: "entityCancel"
};
const _hoisted_23 = {
  id: "confirmSelectVariableType"
};
const _hoisted_24 = {
  class: "collection-header"
};
const _hoisted_25 = ["onClick", "title"];
const _hoisted_26 = ["src"];
const _hoisted_27 = {
  class: "title"
};
const _hoisted_28 = {
  class: "secondary-content"
};
const _hoisted_29 = ["title"];
const _hoisted_30 = {
  class: "entityCancel"
};
function VariableEditvue_type_template_id_32c62ff6_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");
  const _component_GroupedSettings = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("GroupedSettings");
  const _component_SaveButton = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("SaveButton");
  const _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VariableEditvue_type_template_id_32c62ff6_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: "Tag Manager",
    "content-title": _ctx.editTitle
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => {
      var _ctx$variable$typeMet, _ctx$variable$typeMet2, _ctx$variable$typeMet3, _ctx$variable$typeMet4, _ctx$variable$typeMet5, _ctx$variable$typeMet6;
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", VariableEditvue_type_template_id_32c62ff6_hoisted_2, [VariableEditvue_type_template_id_32c62ff6_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_LoadingData')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isLoading]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", VariableEditvue_type_template_id_32c62ff6_hoisted_4, [VariableEditvue_type_template_id_32c62ff6_hoisted_5, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_UpdatingData')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isUpdating]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("form", {
        onSubmit: _cache[9] || (_cache[9] = $event => _ctx.edit ? _ctx.updateVariable() : _ctx.createVariable())
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
        class: "alert alert-danger",
        innerHTML: _ctx.$sanitize(_ctx.getNoCustomTemplatePermissionErrorMessage())
      }, null, 8, VariableEditvue_type_template_id_32c62ff6_hoisted_6), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isVariableDisabled]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "text",
        name: "name",
        "model-value": _ctx.variable.name,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => {
          _ctx.variable.name = $event;
          _ctx.setValueHasChanged();
        }),
        maxlength: 255,
        title: _ctx.translate('General_Name'),
        "inline-help": _ctx.translate('TagManager_VariableNameHelp'),
        placeholder: _ctx.translate('TagManager_VariableNamePlaceholder')
      }, null, 8, ["model-value", "title", "inline-help", "placeholder"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "textarea",
        name: "description",
        "model-value": _ctx.variable.description,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => {
          _ctx.variable.description = $event;
          _ctx.setValueHasChanged();
        }),
        maxlength: 1000,
        title: _ctx.translate('TagManager_Description'),
        "inline-help": _ctx.translate('TagManager_VariableDescriptionHelp'),
        placeholder: _ctx.translate('TagManager_VariableDescriptionPlaceholder')
      }, null, 8, ["model-value", "title", "inline-help", "placeholder"])]), (_ctx$variable$typeMet = _ctx.variable.typeMetadata) !== null && _ctx$variable$typeMet !== void 0 && (_ctx$variable$typeMet = _ctx$variable$typeMet.parameters) !== null && _ctx$variable$typeMet !== void 0 && _ctx$variable$typeMet.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VariableEditvue_type_template_id_32c62ff6_hoisted_7, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableEditvue_type_template_id_32c62ff6_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ConfigureThisVariable')), 1)])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.variable ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VariableEditvue_type_template_id_32c62ff6_hoisted_9, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_GroupedSettings, {
        settings: ((_ctx$variable$typeMet2 = _ctx.variable.typeMetadata) === null || _ctx$variable$typeMet2 === void 0 ? void 0 : _ctx$variable$typeMet2.parameters) || [],
        "all-setting-values": _ctx.parameterValues,
        onChange: _cache[2] || (_cache[2] = $event => _ctx.parameterValues[$event.name] = $event.value)
      }, null, 8, ["settings", "all-setting-values"])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableEditvue_type_template_id_32c62ff6_hoisted_10, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableEditvue_type_template_id_32c62ff6_hoisted_11, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "showAdvancedSettings",
        onClick: _cache[3] || (_cache[3] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])($event => _ctx.showAdvanced = true, ["prevent"]))
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ShowAdvancedSettings')), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.showAdvanced]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "hideAdvancedSettings",
        onClick: _cache[4] || (_cache[4] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])($event => _ctx.showAdvanced = false, ["prevent"]))
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_HideAdvancedSettings')), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.showAdvanced]])])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], (_ctx$variable$typeMet3 = _ctx.variable.typeMetadata) === null || _ctx$variable$typeMet3 === void 0 ? void 0 : _ctx$variable$typeMet3.hasAdvancedSettings]]), _ctx.variable && _ctx.variable.typeMetadata && _ctx.variable.typeMetadata.id === 'MatomoConfiguration' ? Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VariableEditvue_type_template_id_32c62ff6_hoisted_12, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_GroupedSettings, {
        settings: ((_ctx$variable$typeMet4 = _ctx.variable.typeMetadata) === null || _ctx$variable$typeMet4 === void 0 ? void 0 : _ctx$variable$typeMet4.advancedParameters) || [],
        "all-setting-values": _ctx.parameterValues,
        onChange: _cache[5] || (_cache[5] = $event => _ctx.parameterValues[$event.name] = $event.value)
      }, null, 8, ["settings", "all-setting-values"])], 512)), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.showAdvanced && ((_ctx$variable$typeMet5 = _ctx.variable.typeMetadata) === null || _ctx$variable$typeMet5 === void 0 ? void 0 : _ctx$variable$typeMet5.hasAdvancedSettings)]]) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableEditvue_type_template_id_32c62ff6_hoisted_13, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "text",
        name: "default_value",
        "model-value": _ctx.variable.default_value,
        "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => {
          _ctx.variable.default_value = $event;
          _ctx.setValueHasChanged();
        }),
        title: _ctx.translate('TagManager_DefaultValue'),
        "inline-help": _ctx.translate('TagManager_DefaultValueHelp'),
        placeholder: _ctx.translate('TagManager_DefaultValuePlaceholder')
      }, null, 8, ["model-value", "title", "inline-help", "placeholder"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableEditvue_type_template_id_32c62ff6_hoisted_14, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableEditvue_type_template_id_32c62ff6_hoisted_15, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", VariableEditvue_type_template_id_32c62ff6_hoisted_16, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_LookupTableTitle')), 1), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.variable.lookup_table, (lookup, index) => {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
          key: index,
          class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(`lookupTable lookupTable${index} multiple valign-wrapper`)
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_17, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
          uicontrol: "select",
          name: "lookup_table_comparison",
          "model-value": lookup.comparison,
          "onUpdate:modelValue": $event => {
            lookup.comparison = $event;
            _ctx.setValueHasChanged();
          },
          "full-width": true,
          options: _ctx.availableLookUpComparisons
        }, null, 8, ["model-value", "onUpdate:modelValue", "options"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_18, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
          uicontrol: "text",
          name: "lookup_table_matchvalue",
          "model-value": lookup.match_value,
          "onUpdate:modelValue": $event => {
            lookup.match_value = $event;
            _ctx.setValueHasChanged();
          },
          "full-width": true,
          placeholder: _ctx.translate('TagManager_LookupTableMatchValue')
        }, null, 8, ["model-value", "onUpdate:modelValue", "placeholder"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_19, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
          uicontrol: "text",
          name: "lookup_table_outvalue",
          "model-value": lookup.out_value,
          "onUpdate:modelValue": $event => {
            lookup.out_value = $event;
            _ctx.setValueHasChanged();
          },
          "full-width": true,
          placeholder: _ctx.translate('TagManager_LookupTableOutValue')
        }, null, 8, ["model-value", "onUpdate:modelValue", "placeholder"])]), !(index + 1 === _ctx.variable.lookup_table.length) ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
          key: 0,
          class: "icon-minus valign",
          onClick: $event => _ctx.removeLookUpEntry(index),
          title: _ctx.translate('General_Remove')
        }, null, 8, _hoisted_20)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 2);
      }), 128))])])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.showAdvanced && ((_ctx$variable$typeMet6 = _ctx.variable.typeMetadata) === null || _ctx$variable$typeMet6 === void 0 ? void 0 : _ctx$variable$typeMet6.hasAdvancedSettings) && _ctx.variable && _ctx.variable.typeMetadata && _ctx.variable.typeMetadata.id !== 'MatomoConfiguration']]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
        class: "alert alert-danger",
        innerHTML: _ctx.$sanitize(_ctx.getNoCustomTemplatePermissionErrorMessage())
      }, null, 8, _hoisted_21), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isVariableDisabled]]), !_ctx.isVariableDisabled ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_SaveButton, {
        key: 3,
        class: "createButton",
        onConfirm: _cache[7] || (_cache[7] = $event => _ctx.edit ? _ctx.updateVariable() : _ctx.createVariable()),
        disabled: _ctx.isUpdating || !_ctx.isDirty,
        saving: _ctx.isUpdating,
        value: _ctx.edit ? _ctx.translate('CoreUpdater_UpdateTitle') : _ctx.translate('TagManager_CreateNewVariable')
      }, null, 8, ["disabled", "saving", "value"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_22, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        onClick: _cache[8] || (_cache[8] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])($event => _ctx.cancel(), ["prevent"]))
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Cancel')), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isEmbedded]])])], 544), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.chooseVariableType && _ctx.editTitle]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_23, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.availableVariables, (variableCategory, index) => {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("ul", {
          class: "collection with-header",
          key: index
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", _hoisted_24, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variableCategory.name), 1)]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(variableCategory.types, (variableTemplate, index) => {
          return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
            key: index,
            class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["collection-item avatar", {
              disabledTemplate: this.isVariableTemplateDisabled[variableTemplate.id],
              [`templateType${variableTemplate.id}`]: true
            }]),
            onClick: $event => _ctx.createVariableType(variableTemplate),
            title: !this.isVariableTemplateDisabled[variableTemplate.id] ? '' : _ctx.translate('TagManager_UseCustomTemplateCapabilityPermissionRequiredDescription', '', _ctx.translate('TagManager_CapabilityUseCustomTemplates'), '')
          }, [variableTemplate.icon ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("img", {
            key: 0,
            alt: "",
            class: "circle",
            src: variableTemplate.icon
          }, null, 8, _hoisted_26)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_27, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variableTemplate.name), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variableTemplate.description), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], variableTemplate.description]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_28, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("i", {
            class: "icon-help",
            title: variableTemplate.help
          }, null, 8, _hoisted_29)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !!variableTemplate.help]])], 10, _hoisted_25);
        }), 128))]);
      }), 128)), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_30, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        onClick: _cache[10] || (_cache[10] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])($event => _ctx.cancel(), ["prevent"]))
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Cancel')), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isEmbedded]])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.chooseVariableType]])];
    }),
    _: 1
  }, 8, ["content-title"])], 512);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/VariableEdit.vue?vue&type=template&id=32c62ff6

// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/Variables.store.ts
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


class Variables_store_VariablesStore {
  constructor() {
    _defineProperty(this, "privateState", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      variables: [],
      isLoadingVars: false,
      isLoadingSingle: false,
      isUpdating: false
    }));
    _defineProperty(this, "state", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => this.privateState));
    _defineProperty(this, "isLoading", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
      const state = this.state.value;
      return state.isLoadingVars || state.isLoadingSingle;
    }));
    _defineProperty(this, "isUpdating", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => this.state.value.isUpdating));
    _defineProperty(this, "variables", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => this.state.value.variables));
    _defineProperty(this, "fetchPromise", null);
    _defineProperty(this, "availableVariablesPromises", {});
  }
  fetchVariablesIfNotLoaded(idContainer, idContainerVersion) {
    if (!this.fetchPromise) {
      // needed for suggestNameForType() to make sure it is aware of all names
      this.fetchVariables(idContainer, idContainerVersion);
    }
  }
  findVariable(idContainer, idContainerVersion, idVariable, ignoreCache) {
    // before going through an API request we first try to find it in loaded variables
    const found = this.variables.value.find(v => v.idvariable === idVariable);
    if (found && !ignoreCache) {
      return Promise.resolve(found);
    }
    // otherwise we fetch it via API
    this.privateState.isLoadingSingle = true;
    return external_CoreHome_["AjaxHelper"].fetch({
      idVariable,
      idContainer,
      idContainerVersion,
      method: 'TagManager.getContainerVariable',
      filter_limit: '-1'
    }).then(record => {
      this.privateState.variables = [...this.privateState.variables, record];
      return record;
    }).finally(() => {
      this.privateState.isLoadingSingle = false;
    });
  }
  fetchVariables(idContainer, idContainerVersion) {
    this.privateState.isLoadingVars = true;
    this.privateState.variables = [];
    if (!this.fetchPromise) {
      this.fetchPromise = external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainerVariables',
        idContainer,
        idContainerVersion,
        filter_limit: '-1'
      });
    }
    return Promise.resolve(this.fetchPromise).then(variables => {
      this.privateState.variables = variables;
      this.privateState.isLoadingVars = false;
      return this.variables.value;
    }).finally(() => {
      this.privateState.isLoadingVars = false;
    });
  }
  fetchAvailableVariables(idContext) {
    if (!this.availableVariablesPromises[idContext]) {
      this.availableVariablesPromises[idContext] = external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getAvailableVariableTypesInContext',
        idContext,
        filter_limit: '-1'
      }).then(variables => variables);
    }
    return Promise.resolve(this.availableVariablesPromises[idContext]);
  }
  suggestNameForType(templateId) {
    for (let counter = 0; counter < 100; counter += 1) {
      let name = templateId;
      if (counter) {
        name = `${name} (${counter})`;
      }
      const isFree = !this.variables.value.some(v => v.name === name);
      if (isFree) {
        return name;
      }
    }
    return undefined;
  }
  createOrUpdateVariable(variable, method, idContainer, idContainerVersion, parameterValues) {
    this.privateState.isUpdating = true;
    const mappedEntries = Object.entries(parameterValues).map(([key, value]) => {
      let newValue = value;
      if (typeof value === 'boolean') {
        newValue = (+value).toString();
      }
      return [key, newValue];
    });
    const parameters = Object.fromEntries(mappedEntries);
    const lookupTable = variable.lookup_table.filter(l => l && l.out_value && l.comparison);
    return external_CoreHome_["AjaxHelper"].post({
      idVariable: variable.idvariable,
      method,
      idContainer,
      idContainerVersion,
      type: variable.type,
      name: variable.name,
      description: variable.description,
      defaultValue: variable.default_value
    }, {
      parameters,
      lookupTable
    }, {
      withTokenInUrl: true
    }).finally(() => {
      this.privateState.isUpdating = false;
    });
  }
  reload(idContainer, idContainerVersion) {
    this.privateState.variables = [];
    this.fetchPromise = null;
    this.availableVariablesPromises = {};
    return this.fetchVariables(idContainer, idContainerVersion);
  }
  deleteVariable(idContainer, idContainerVersion, idVariable) {
    this.privateState.isUpdating = true;
    this.privateState.variables = [];
    return external_CoreHome_["AjaxHelper"].fetch({
      idVariable,
      idContainerVersion,
      idContainer,
      method: 'TagManager.deleteContainerVariable'
    }, {
      withTokenInUrl: true
    }).finally(() => {
      this.privateState.isUpdating = false;
    });
  }
}
/* harmony default export */ var Variables_store = (new Variables_store_VariablesStore());
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/AvailableComparisons.store.ts
function AvailableComparisons_store_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


class AvailableComparisons_store_AvailableComparisonsStore {
  constructor() {
    AvailableComparisons_store_defineProperty(this, "privateState", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      comparisons: [],
      isLoading: false
    }));
    AvailableComparisons_store_defineProperty(this, "state", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(this.privateState)));
    AvailableComparisons_store_defineProperty(this, "isLoading", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => this.state.value.isLoading));
    AvailableComparisons_store_defineProperty(this, "comparisons", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => this.state.value.comparisons));
    AvailableComparisons_store_defineProperty(this, "comparisonOptions", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => this.comparisons.value.map(({
      id,
      name
    }) => ({
      key: id,
      value: name
    }))));
    AvailableComparisons_store_defineProperty(this, "initializePromise", null);
  }
  init() {
    if (!this.initializePromise) {
      this.initializePromise = this.fetchAvailableComparisons();
    }
    return this.initializePromise;
  }
  fetchAvailableComparisons() {
    this.privateState.isLoading = true;
    return external_CoreHome_["AjaxHelper"].fetch({
      method: 'TagManager.getAvailableComparisons',
      filter_limit: '-1'
    }).then(comparisons => {
      this.privateState.comparisons = comparisons;
    }).finally(() => {
      this.privateState.isLoading = false;
    });
  }
}
/* harmony default export */ var AvailableComparisons_store = (new AvailableComparisons_store_AvailableComparisonsStore());
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Variable/VariableEdit.vue?vue&type=script&lang=ts





const notificationId = 'tagvariablemanagement';
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
  data() {
    return {
      isDirty: false,
      showAdvanced: false,
      chooseVariableType: false,
      canUseCustomTemplates: external_CoreHome_["Matomo"].hasUserCapability('tagmanager_use_custom_templates'),
      availableVariables: [],
      editTitle: '',
      variable: {},
      parameterValues: {},
      advancedParameters: {},
      isUpdatingVar: false
    };
  },
  emits: ['changeVariable'],
  created() {
    AvailableComparisons_store.init();
    // needed for suggestNameForType() to make sure it is aware of all names
    Variables_store.fetchVariablesIfNotLoaded(this.idContainer, this.idContainerVersion);
    this.initIdVariable();
  },
  watch: {
    idVariable(newValue) {
      if (newValue === null) {
        return;
      }
      this.initIdVariable();
    },
    variableParameterValues: {
      handler(newValue, oldValue) {
        if (!newValue || !oldValue) {
          return;
        }
        this.isDirty = true;
      },
      deep: true
    },
    variableLookupTable: {
      handler() {
        const hasAll = (this.variable.lookup_table || []).every(t => !!(t !== null && t !== void 0 && t.out_value));
        if (hasAll) {
          this.addLookUpEntry();
        }
      },
      deep: true
    }
  },
  methods: {
    removeAnyVariableNotification() {
      external_CoreHome_["NotificationsStore"].remove(notificationId);
      external_CoreHome_["NotificationsStore"].remove('ajaxHelper');
    },
    showNotification(message, context, type = null) {
      const notificationInstanceId = external_CoreHome_["NotificationsStore"].show({
        message,
        context,
        id: notificationId,
        type: type !== null ? type : 'toast'
      });
      setTimeout(() => {
        external_CoreHome_["NotificationsStore"].scrollToNotification(notificationInstanceId);
      }, 200);
    },
    showErrorFieldNotProvidedNotification(title) {
      const message = Object(external_CoreHome_["translate"])('TagManager_ErrorXNotProvided', [title]);
      this.showNotification(message, 'error');
    },
    initIdVariable() {
      external_CoreHome_["Matomo"].helper.lazyScrollToContent();
      this.availableVariables = [];
      external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainer',
        idContainer: this.idContainer,
        filter_limit: '-1'
      }).then(container => Variables_store.fetchAvailableVariables(container.context)).then(variables => {
        this.availableVariables = variables;
      }).then(() => {
        if (this.edit && this.idVariable) {
          this.editTitle = Object(external_CoreHome_["translate"])('TagManager_EditVariable');
          Variables_store.findVariable(this.idContainer, this.idContainerVersion, this.idVariable, this.isEmbedded).then(variable => {
            var _this$variable$typeMe;
            if (!variable) {
              return;
            }
            this.variable = Object(external_CoreHome_["clone"])(variable);
            this.variable.typeMetadata.parameters = variable.typeMetadata.parameters.filter(item => !Object.prototype.hasOwnProperty.call(item, 'uiControlAttributes') || !Object.prototype.hasOwnProperty.call(item.uiControlAttributes, 'showAdvancedSettings'));
            this.variable.typeMetadata.advancedParameters = variable.typeMetadata.parameters.filter(item => Object.prototype.hasOwnProperty.call(item, 'uiControlAttributes') && Object.prototype.hasOwnProperty.call(item.uiControlAttributes, 'showAdvancedSettings'));
            this.parameterValues = Object.fromEntries(variable.typeMetadata.parameters.map(s => [s.name, s.value]));
            if (this.variable.lookup_table && this.variable.lookup_table.length || this.variable.default_value) {
              this.showAdvanced = true; // make sure lookup_table is visible directly if configured
            }
            this.addLookUpEntryIfNoneExists();
            this.isDirty = false;
            if ((_this$variable$typeMe = this.variable.typeMetadata) !== null && _this$variable$typeMe !== void 0 && _this$variable$typeMe.name) {
              this.editTitle += `: ${this.variable.typeMetadata.name}`;
            }
          });
          return;
        }
        if (this.create) {
          let found = false;
          if (this.variableType) {
            this.availableVariables.forEach(category => {
              if (!found) {
                const variable = category.types.find(v => (v === null || v === void 0 ? void 0 : v.id) === this.variableType);
                if (variable) {
                  found = true;
                  this.createVariableType(variable);
                }
              }
            });
          }
          if (!found) {
            this.editTitle = Object(external_CoreHome_["translate"])('TagManager_ChooseVariableToContinue');
            this.chooseVariableType = true;
          }
        }
      });
    },
    addLookUpEntryIfNoneExists() {
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
    addLookUpEntry() {
      this.variable.lookup_table.push({
        comparison: 'equals',
        match_value: '',
        out_value: ''
      });
      this.isDirty = true;
    },
    removeLookUpEntry(index) {
      if (index > -1) {
        this.variable.lookup_table.splice(index, 1);
        this.isDirty = true;
      }
    },
    createVariableType(variableTemplate) {
      var _this$variable$typeMe2;
      if (variableTemplate && this.isVariableTemplateDisabled[variableTemplate.id]) {
        return;
      }
      this.chooseVariableType = false;
      this.editTitle = Object(external_CoreHome_["translate"])('TagManager_CreateNewVariable');
      this.variable = {
        idsite: parseInt(`${external_CoreHome_["Matomo"].idSite}`, 10),
        name: Variables_store.suggestNameForType(variableTemplate.name) || '',
        description: '',
        type: variableTemplate.id,
        idcontainer: this.idContainer,
        idcontainerversion: this.idContainerVersion,
        default_value: '',
        lookup_table: [],
        typeMetadata: variableTemplate
      };
      this.variable.typeMetadata.advancedParameters = [];
      const advancedOptions = variableTemplate.parameters.filter(item => Object.prototype.hasOwnProperty.call(item, 'uiControlAttributes') && Object.prototype.hasOwnProperty.call(item.uiControlAttributes, 'showAdvancedSettings'));
      const nonAdvancedOptions = variableTemplate.parameters.filter(item => !Object.prototype.hasOwnProperty.call(item, 'uiControlAttributes') || !Object.prototype.hasOwnProperty.call(item.uiControlAttributes, 'showAdvancedSettings'));
      this.parameterValues = Object.fromEntries(variableTemplate.parameters.map(s => [s.name, s.value]));
      this.variable.typeMetadata.advancedParameters = advancedOptions;
      this.variable.typeMetadata.parameters = nonAdvancedOptions;
      if ((_this$variable$typeMe2 = this.variable.typeMetadata) !== null && _this$variable$typeMe2 !== void 0 && _this$variable$typeMe2.name) {
        this.editTitle += `: ${this.variable.typeMetadata.name}`;
      }
      this.addLookUpEntry();
      // we directly make the create button visible as sometimes some variables do not have
      // any settings
      this.isDirty = true;
      Object(external_commonjs_vue_commonjs2_vue_root_Vue_["nextTick"])(() => {
        if (!this.$refs.root) {
          return;
        }
        const root = this.$refs.root;
        root.scrollIntoView();
        const name = root.querySelector('#name');
        if (name) {
          name.focus();
        }
      });
    },
    cancel() {
      const newParams = Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value);
      delete newParams.idVariable;
      external_CoreHome_["MatomoUrl"].updateHash(newParams);
    },
    createVariable() {
      this.removeAnyVariableNotification();
      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }
      this.isUpdatingVar = true;
      Variables_store.createOrUpdateVariable(Object.assign(Object.assign({}, this.variable), {}, {
        name: encodeURIComponent(this.variable.name)
      }), 'TagManager.addContainerVariable', this.idContainer, this.idContainerVersion, this.parameterValues).then(response => {
        if (!response) {
          return;
        }
        this.isDirty = false;
        const idVariable = response.value;
        Variables_store.reload(this.idContainer, this.idContainerVersion).then(() => {
          if (this.isEmbedded) {
            this.variable.idvariable = idVariable;
            this.$emit('changeVariable', {
              variable: this.variable
            });
            return;
          }
          // Go back to the list of variables
          this.cancel();
          setTimeout(() => {
            const createdX = Object(external_CoreHome_["translate"])('TagManager_CreatedX', Object(external_CoreHome_["translate"])('TagManager_Variable'));
            if (this.hasPublishCapability()) {
              const wantToRedeploy = Object(external_CoreHome_["translate"])('TagManager_WantToDeployThisChangeCreateVersion', '<a class="createNewVersionLink">', '</a>');
              this.showNotification(`${createdX} ${wantToRedeploy}`, 'success', 'transient');
              return;
            }
            this.showNotification(createdX, 'success');
          }, 200);
        });
      }).finally(() => {
        this.isUpdatingVar = false;
      });
    },
    setValueHasChanged() {
      this.isDirty = true;
    },
    updateVariable() {
      this.removeAnyVariableNotification();
      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }
      this.isUpdatingVar = true;
      Variables_store.createOrUpdateVariable(Object.assign(Object.assign({}, this.variable), {}, {
        name: encodeURIComponent(this.variable.name)
      }), 'TagManager.updateContainerVariable', this.idContainer, this.idContainerVersion, this.parameterValues).then(response => {
        if (!response) {
          return;
        }
        if (this.isEmbedded) {
          this.$emit('changeVariable', {
            variable: this.variable
          });
          return;
        }
        this.isDirty = false;
        Variables_store.reload(this.idContainer, this.idContainerVersion).then(() => {
          this.initIdVariable();
        });
        // Go back to the list of variables
        this.cancel();
        const updatedAt = Object(external_CoreHome_["translate"])('TagManager_UpdatedX', Object(external_CoreHome_["translate"])('TagManager_Variable'));
        if (this.hasPublishCapability()) {
          const wantToDeploy = Object(external_CoreHome_["translate"])('TagManager_WantToDeployThisChangeCreateVersion', '<a class="createNewVersionLink">', '</a>');
          this.showNotification(`${updatedAt} ${wantToDeploy}`, 'success', 'transient');
          return;
        }
        this.showNotification(updatedAt, 'success');
      }).finally(() => {
        this.isUpdatingVar = false;
      });
    },
    checkRequiredFieldsAreSet() {
      if (!this.variable.name) {
        this.showErrorFieldNotProvidedNotification(Object(external_CoreHome_["translate"])('General_Name'));
        return false;
      }
      return true;
    },
    hasPublishCapability() {
      return external_CoreHome_["Matomo"].hasUserCapability('tagmanager_write') && external_CoreHome_["Matomo"].hasUserCapability('tagmanager_use_custom_templates');
    },
    getNoCustomTemplatePermissionErrorMessage() {
      return Object(external_CoreHome_["translate"])('TagManager_UseCustomTemplateCapabilityPermissionRequiredDescription', '<strong>', Object(external_CoreHome_["translate"])('TagManager_CapabilityUseCustomTemplates'), '</strong>');
    }
  },
  computed: {
    typeInlineHelp() {
      var _this$variable$typeMe3, _this$variable$typeMe4;
      const desc = ((_this$variable$typeMe3 = this.variable.typeMetadata) === null || _this$variable$typeMe3 === void 0 ? void 0 : _this$variable$typeMe3.description) || '';
      const help = ((_this$variable$typeMe4 = this.variable.typeMetadata) === null || _this$variable$typeMe4 === void 0 ? void 0 : _this$variable$typeMe4.help) || '';
      return `${desc} ${help}`;
    },
    create() {
      return this.idVariable === 0;
    },
    edit() {
      return !this.create;
    },
    isLoading() {
      return Variables_store.isLoading.value || AvailableComparisons_store.isLoading.value;
    },
    isUpdating() {
      return Variables_store.isUpdating.value || this.isUpdatingVar;
    },
    availableLookUpComparisons() {
      return AvailableComparisons_store.comparisonOptions.value;
    },
    isVariableTemplateDisabled() {
      const result = {};
      this.availableVariables.forEach(variableCategory => {
        variableCategory.types.forEach(variable => {
          result[variable.id] = !this.canUseCustomTemplates && variable.isCustomTemplate;
        });
      });
      return result;
    },
    isVariableDisabled() {
      var _this$variable$typeMe5;
      return !this.canUseCustomTemplates && ((_this$variable$typeMe5 = this.variable.typeMetadata) === null || _this$variable$typeMe5 === void 0 ? void 0 : _this$variable$typeMe5.isCustomTemplate);
    },
    variableParameterValues() {
      var _this$variable$typeMe6;
      if (!((_this$variable$typeMe6 = this.variable.typeMetadata) !== null && _this$variable$typeMe6 !== void 0 && _this$variable$typeMe6.parameters)) {
        return null;
      }
      return this.parameterValues;
    },
    variableLookupTable() {
      return this.variable.lookup_table;
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/VariableEdit.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/VariableEdit.vue



VariableEditvue_type_script_lang_ts.render = VariableEditvue_type_template_id_32c62ff6_render

/* harmony default export */ var VariableEdit = (VariableEditvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Variable/VariableList.vue?vue&type=template&id=48ee54ae

const VariableListvue_type_template_id_48ee54ae_hoisted_1 = {
  class: "tagManagerManageList tagManagerVariableList"
};
const VariableListvue_type_template_id_48ee54ae_hoisted_2 = {
  class: "variableSearchFilter"
};
const VariableListvue_type_template_id_48ee54ae_hoisted_3 = ["title"];
const VariableListvue_type_template_id_48ee54ae_hoisted_4 = ["title"];
const VariableListvue_type_template_id_48ee54ae_hoisted_5 = ["title"];
const VariableListvue_type_template_id_48ee54ae_hoisted_6 = ["title"];
const VariableListvue_type_template_id_48ee54ae_hoisted_7 = ["title"];
const VariableListvue_type_template_id_48ee54ae_hoisted_8 = ["title"];
const VariableListvue_type_template_id_48ee54ae_hoisted_9 = {
  colspan: "7"
};
const VariableListvue_type_template_id_48ee54ae_hoisted_10 = {
  class: "loadingPiwik"
};
const VariableListvue_type_template_id_48ee54ae_hoisted_11 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);
const VariableListvue_type_template_id_48ee54ae_hoisted_12 = {
  colspan: "7"
};
const VariableListvue_type_template_id_48ee54ae_hoisted_13 = ["id"];
const VariableListvue_type_template_id_48ee54ae_hoisted_14 = ["title"];
const VariableListvue_type_template_id_48ee54ae_hoisted_15 = ["title"];
const VariableListvue_type_template_id_48ee54ae_hoisted_16 = ["title"];
const VariableListvue_type_template_id_48ee54ae_hoisted_17 = {
  class: "lookupTable"
};
const VariableListvue_type_template_id_48ee54ae_hoisted_18 = {
  class: "icon-ok"
};
const VariableListvue_type_template_id_48ee54ae_hoisted_19 = ["title"];
const VariableListvue_type_template_id_48ee54ae_hoisted_20 = ["onClick", "title"];
const VariableListvue_type_template_id_48ee54ae_hoisted_21 = ["onClick", "title"];
const VariableListvue_type_template_id_48ee54ae_hoisted_22 = ["onClick", "title"];
const VariableListvue_type_template_id_48ee54ae_hoisted_23 = {
  class: "tableActionBar"
};
const VariableListvue_type_template_id_48ee54ae_hoisted_24 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, " ", -1);
const VariableListvue_type_template_id_48ee54ae_hoisted_25 = ["title"];
const VariableListvue_type_template_id_48ee54ae_hoisted_26 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-help preconfiguredVariablesHelp"
}, null, -1);
const VariableListvue_type_template_id_48ee54ae_hoisted_27 = {
  class: "collection-header"
};
const VariableListvue_type_template_id_48ee54ae_hoisted_28 = {
  class: "title"
};
const VariableListvue_type_template_id_48ee54ae_hoisted_29 = ["textContent"];
const VariableListvue_type_template_id_48ee54ae_hoisted_30 = {
  class: "secondary-content"
};
const _hoisted_31 = ["title"];
const _hoisted_32 = {
  class: "ui-confirm",
  id: "confirmDeleteVariable",
  ref: "confirmDeleteVariable"
};
const _hoisted_33 = ["value"];
const _hoisted_34 = ["value"];
const _hoisted_35 = {
  class: "ui-confirm",
  id: "confirmDeleteVariableNotPossible",
  ref: "confirmDeleteVariableNotPossible"
};
const _hoisted_36 = {
  class: "collection"
};
const _hoisted_37 = ["value"];
function VariableListvue_type_template_id_48ee54ae_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");
  const _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");
  const _directive_content_table = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("content-table");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VariableListvue_type_template_id_48ee54ae_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: "Tag Manager",
    class: "tagManagerCustomVariablesList",
    "content-title": _ctx.translate('TagManager_ManageX', _ctx.translate('TagManager_Variables')),
    "help-text": _ctx.variablesHelpText
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_VariableUsageBenefits')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableListvue_type_template_id_48ee54ae_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
      uicontrol: "text",
      name: "variableSearch",
      title: _ctx.translate('General_Search'),
      modelValue: _ctx.variableSearch,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => _ctx.variableSearch = $event)
    }, null, 8, ["title", "modelValue"]), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.variables.length > 0]])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("table", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
      class: "name",
      title: _ctx.nameTranslatedText
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Name')), 9, VariableListvue_type_template_id_48ee54ae_hoisted_3), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
      class: "description",
      title: _ctx.descriptionTranslatedText
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Description')), 9, VariableListvue_type_template_id_48ee54ae_hoisted_4), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
      class: "type",
      title: _ctx.typeTranslatedText
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Type')), 9, VariableListvue_type_template_id_48ee54ae_hoisted_5), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
      class: "lookupTable",
      title: _ctx.lookupTableTranslatedText
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_LookupTable')), 9, VariableListvue_type_template_id_48ee54ae_hoisted_6), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
      class: "lastUpdated",
      title: _ctx.lastUpdatedTranslatedText
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_LastUpdated')), 9, VariableListvue_type_template_id_48ee54ae_hoisted_7), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
      class: "action",
      title: _ctx.actionTranslatedText
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Actions')), 9, VariableListvue_type_template_id_48ee54ae_hoisted_8), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VariableListvue_type_template_id_48ee54ae_hoisted_9, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", VariableListvue_type_template_id_48ee54ae_hoisted_10, [VariableListvue_type_template_id_48ee54ae_hoisted_11, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_LoadingData')), 1)])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isLoading || _ctx.isUpdating]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VariableListvue_type_template_id_48ee54ae_hoisted_12, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_NoVariablesFound')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      class: "createContainerVariableNow",
      onClick: _cache[1] || (_cache[1] = $event => _ctx.createVariable())
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewVariableNow')), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isLoading && !_ctx.variables.length]]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.sortedVariables, variable => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
        id: `variable${variable.idvariable}`,
        class: "variables",
        key: variable.idvariable
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
        class: "name",
        title: variable.name
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.truncateText(variable.name, 50)), 9, VariableListvue_type_template_id_48ee54ae_hoisted_14), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
        class: "description",
        title: variable.description
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.truncateText(variable.description, 75)), 9, VariableListvue_type_template_id_48ee54ae_hoisted_15), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
        class: "type",
        title: variable.typeMetadata.description
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variable.typeMetadata.name), 9, VariableListvue_type_template_id_48ee54ae_hoisted_16), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VariableListvue_type_template_id_48ee54ae_hoisted_17, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", VariableListvue_type_template_id_48ee54ae_hoisted_18, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], variable.lookup_table.length]])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
        class: "lastUpdated",
        title: _ctx.translate('TagManager_CreatedOnX', variable.created_date_pretty)
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variable.updated_date_pretty), 1)], 8, VariableListvue_type_template_id_48ee54ae_hoisted_19), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
        class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(_ctx.getActionClasses)
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "table-action icon-edit",
        onClick: $event => _ctx.editVariable(variable.idvariable, variable.type),
        title: _ctx.translate('TagManager_EditVariable')
      }, null, 8, VariableListvue_type_template_id_48ee54ae_hoisted_20), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "table-action icon-content-copy",
        onClick: $event => _ctx.openCopyDialog(variable),
        title: _ctx.translate('TagManager_CopyX', _ctx.translate('TagManager_Variable'))
      }, null, 8, VariableListvue_type_template_id_48ee54ae_hoisted_21), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasPublishCapability()]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "table-action icon-delete",
        onClick: $event => _ctx.deleteVariable(variable),
        title: _ctx.translate('TagManager_DeleteX', _ctx.translate('TagManager_Variable'))
      }, null, 8, VariableListvue_type_template_id_48ee54ae_hoisted_22)], 2), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])], 8, VariableListvue_type_template_id_48ee54ae_hoisted_13);
    }), 128))])])), [[_directive_content_table]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VariableListvue_type_template_id_48ee54ae_hoisted_23, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      class: "createNewVariable",
      value: "",
      onClick: _cache[2] || (_cache[2] = $event => _ctx.createVariable())
    }, [VariableListvue_type_template_id_48ee54ae_hoisted_24, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewVariable')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])]),
    _: 1
  }, 8, ["content-title", "help-text"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", {
    title: _ctx.translate('TagManager_PreConfiguredInfoTitle')
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_PreconfiguredVariables')) + " ", 1), VariableListvue_type_template_id_48ee54ae_hoisted_26], 8, VariableListvue_type_template_id_48ee54ae_hoisted_25), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.containerVariables, (variableCategory, index) => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("ul", {
      class: "collection with-header",
      key: index
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", VariableListvue_type_template_id_48ee54ae_hoisted_27, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variableCategory.name), 1)]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(variableCategory.types, variableTemplate => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
        class: "collection-item",
        key: variableTemplate.id
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", VariableListvue_type_template_id_48ee54ae_hoisted_28, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variableTemplate.name) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
        class: "variableId",
        textContent: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(`{{${variableTemplate.id}}}`)
      }, null, 8, VariableListvue_type_template_id_48ee54ae_hoisted_29)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", VariableListvue_type_template_id_48ee54ae_hoisted_30, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("i", {
        class: "icon-help",
        title: variableTemplate.description
      }, null, 8, _hoisted_31)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !!variableTemplate.description]])])), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], variableTemplate.is_pre_configured]]);
    }), 128))]);
  }), 128))]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_32, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_DeleteVariableConfirm')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "yes",
    type: "button",
    value: _ctx.translate('General_Yes')
  }, null, 8, _hoisted_33), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "no",
    type: "button",
    value: _ctx.translate('General_No')
  }, null, 8, _hoisted_34)], 512), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_35, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_VariableCannotBeDeleted')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_VariableBeingUsedBy')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", _hoisted_36, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.variableReferences, reference => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
      class: "collection-item",
      key: `${reference.referenceType}.${reference.referenceId}`
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(reference.referenceTypeName) + ": " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(reference.referenceName), 1);
  }), 128))]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_VariableBeingUsedNeedsRemove')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "no",
    type: "button",
    value: _ctx.translate('General_Cancel')
  }, null, 8, _hoisted_37)], 512)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/VariableList.vue?vue&type=template&id=48ee54ae

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Variable/VariableList.vue?vue&type=script&lang=ts




const {
  tagManagerHelper: VariableListvue_type_script_lang_ts_tagManagerHelper
} = window;
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
    Field: external_CorePluginsAdmin_["Field"],
    ContentBlock: external_CoreHome_["ContentBlock"]
  },
  directives: {
    ContentTable: external_CoreHome_["ContentTable"]
  },
  data() {
    return {
      hasWriteAccess: external_CoreHome_["Matomo"].hasUserCapability('tagmanager_write'),
      variableReferences: [],
      containerVariables: [],
      variableSearch: ''
    };
  },
  created() {
    Variables_store.fetchVariables(this.idContainer, this.idContainerVersion);
    external_CoreHome_["AjaxHelper"].fetch({
      method: 'TagManager.getAvailableContainerVariables',
      idContainer: this.idContainer,
      idContainerVersion: this.idContainerVersion,
      filter_limit: '-1'
    }).then(variables => {
      this.containerVariables = variables;
    });
  },
  methods: {
    createVariable() {
      this.editVariable(0);
    },
    editVariable(idVariable) {
      external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
        idVariable
      }));
    },
    deleteVariable(variable) {
      external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainerVariableReferences',
        idContainer: this.idContainer,
        idContainerVersion: this.idContainerVersion,
        idVariable: variable.idvariable
      }).then(references => {
        if (!references || !references.length) {
          this.variableReferences = [];
          external_CoreHome_["Matomo"].helper.modalConfirm(this.$refs.confirmDeleteVariable, {
            yes: () => {
              Variables_store.deleteVariable(this.idContainer, this.idContainerVersion, variable.idvariable).then(() => {
                Variables_store.reload(this.idContainer, this.idContainerVersion);
                external_CoreHome_["NotificationsStore"].remove('CopyDialogResultNotification');
              });
            }
          });
        } else {
          this.variableReferences = references;
          external_CoreHome_["Matomo"].helper.modalConfirm(this.$refs.confirmDeleteVariableNotPossible, {});
        }
      });
    },
    truncateText(text, length) {
      return VariableListvue_type_script_lang_ts_tagManagerHelper.truncateText(text, length);
    },
    hasPublishCapability() {
      return external_CoreHome_["Matomo"].hasUserCapability('tagmanager_write') && external_CoreHome_["Matomo"].hasUserCapability('tagmanager_use_custom_templates');
    },
    openCopyDialog(variable) {
      const url = external_CoreHome_["MatomoUrl"].stringify({
        module: 'TagManager',
        action: 'copyVariableDialog',
        idSite: variable.idsite,
        idContainer: this.idContainer,
        idVariable: variable.idvariable,
        idContainerVersion: this.idContainerVersion
      });
      window.Piwik_Popover.createPopupAndLoadUrl(url, '', 'mtmCopyVariable');
    }
  },
  computed: {
    isLoading() {
      return Variables_store.isLoading.value;
    },
    isUpdating() {
      return Variables_store.isUpdating.value;
    },
    variables() {
      return Variables_store.variables.value;
    },
    sortedVariables() {
      const searchFilter = this.variableSearch.toLowerCase();
      // look through string properties of variables for values that have searchFilter in them
      // (mimics angularjs filter() filter)
      const result = [...this.variables].filter(h => Object.keys(h).some(propName => {
        const entity = h;
        let propValue = '';
        if (typeof entity[propName] === 'string') {
          propValue = entity[propName];
        } else if (propName === 'typeMetadata') {
          const propTypeMeta = entity.typeMetadata;
          propValue = propTypeMeta.name;
        } else if (propName === 'parameters' && entity.type === 'CustomJsFunction') {
          const propTypeParameters = entity.parameters;
          propValue = propTypeParameters.jsFunction;
        }
        return propValue.toLowerCase().indexOf(searchFilter) !== -1;
      }));
      result.sort((lhs, rhs) => {
        if (lhs.name < rhs.name) {
          return -1;
        }
        return lhs.name > rhs.name ? 1 : 0;
      });
      return result;
    },
    nameTranslatedText() {
      return this.translate('TagManager_VariablesNameDescription');
    },
    descriptionTranslatedText() {
      return this.translate('TagManager_VariablesDescriptionDescription');
    },
    typeTranslatedText() {
      return this.translate('TagManager_VariablesTypeDescription');
    },
    lookupTableTranslatedText() {
      return this.translate('TagManager_VariablesLookupTableDescription');
    },
    lastUpdatedTranslatedText() {
      return this.translate('TagManager_VariablesLastUpdatedDescription');
    },
    actionTranslatedText() {
      return this.translate('TagManager_VariablesActionDescription');
    },
    getActionClasses() {
      const copyClass = this.hasPublishCapability() ? ' hasCopyAction' : '';
      return `action${copyClass}`;
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/VariableList.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/VariableList.vue



VariableListvue_type_script_lang_ts.render = VariableListvue_type_template_id_48ee54ae_render

/* harmony default export */ var VariableList = (VariableListvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Variable/VariableManage.vue?vue&type=template&id=f95f6f7c

const VariableManagevue_type_template_id_f95f6f7c_hoisted_1 = {
  class: "manageVariable"
};
const VariableManagevue_type_template_id_f95f6f7c_hoisted_2 = {
  key: 0
};
const VariableManagevue_type_template_id_f95f6f7c_hoisted_3 = {
  key: 1
};
function VariableManagevue_type_template_id_f95f6f7c_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_VariableList = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("VariableList");
  const _component_VariableEdit = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("VariableEdit");
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

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Variable/VariableManage.vue?vue&type=script&lang=ts




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
  data() {
    return {
      isAddAllowed: false
    };
  },
  created() {
    // doing this in a watch because we don't want to post an event in a computed property
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["watch"])(() => external_CoreHome_["MatomoUrl"].hashParsed.value.idVariable, idVariable => {
      this.onIdVariableParamChange(idVariable);
    });
    external_CoreHome_["NotificationsStore"].remove('variablevariablemanagement');
    this.onIdVariableParamChange(external_CoreHome_["MatomoUrl"].hashParsed.value.idVariable);
  },
  methods: {
    onIdVariableParamChange(idVariable) {
      // for BC w/ angularjs only invoke event if idVariable is 0
      if (idVariable === '0') {
        const parameters = {
          isAllowed: true
        };
        external_CoreHome_["Matomo"].postEvent('TagManager.initAddVariable', parameters);
        this.isAddAllowed = !!parameters.isAllowed;
      }
    }
  },
  computed: {
    idVariable() {
      const idVariable = external_CoreHome_["MatomoUrl"].hashParsed.value.idVariable;
      if (!this.isAddAllowed && idVariable === '0') {
        return null;
      }
      return idVariable ? parseInt(idVariable, 10) : idVariable;
    },
    editMode() {
      return typeof this.idVariable === 'number';
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/VariableManage.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Variable/VariableManage.vue



VariableManagevue_type_script_lang_ts.render = VariableManagevue_type_template_id_f95f6f7c_render

/* harmony default export */ var VariableManage = (VariableManagevue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Trigger/TriggerEdit.vue?vue&type=template&id=41d1144c

const TriggerEditvue_type_template_id_41d1144c_hoisted_1 = {
  class: "editTrigger tagManagerManageEdit",
  ref: "root"
};
const TriggerEditvue_type_template_id_41d1144c_hoisted_2 = {
  class: "loadingPiwik"
};
const TriggerEditvue_type_template_id_41d1144c_hoisted_3 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);
const TriggerEditvue_type_template_id_41d1144c_hoisted_4 = {
  class: "loadingPiwik"
};
const TriggerEditvue_type_template_id_41d1144c_hoisted_5 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);
const TriggerEditvue_type_template_id_41d1144c_hoisted_6 = ["innerHTML"];
const TriggerEditvue_type_template_id_41d1144c_hoisted_7 = {
  class: "form-group row"
};
const TriggerEditvue_type_template_id_41d1144c_hoisted_8 = {
  class: "col s12"
};
const TriggerEditvue_type_template_id_41d1144c_hoisted_9 = {
  key: 0
};
const TriggerEditvue_type_template_id_41d1144c_hoisted_10 = {
  class: "form-group row"
};
const TriggerEditvue_type_template_id_41d1144c_hoisted_11 = {
  class: "col s12"
};
const TriggerEditvue_type_template_id_41d1144c_hoisted_12 = {
  class: "form-group row multiple"
};
const TriggerEditvue_type_template_id_41d1144c_hoisted_13 = {
  class: "col s12 input-field m6"
};
const TriggerEditvue_type_template_id_41d1144c_hoisted_14 = {
  class: "col s12 input-field m6"
};
const TriggerEditvue_type_template_id_41d1144c_hoisted_15 = {
  class: "form-help"
};
const TriggerEditvue_type_template_id_41d1144c_hoisted_16 = ["innerHTML"];
const TriggerEditvue_type_template_id_41d1144c_hoisted_17 = {
  class: "col s12 m12"
};
const TriggerEditvue_type_template_id_41d1144c_hoisted_18 = {
  class: "innerFormField"
};
const TriggerEditvue_type_template_id_41d1144c_hoisted_19 = {
  class: "innerFormField comparisonField"
};
const TriggerEditvue_type_template_id_41d1144c_hoisted_20 = {
  class: "innerFormField"
};
const TriggerEditvue_type_template_id_41d1144c_hoisted_21 = ["onClick", "title"];
const TriggerEditvue_type_template_id_41d1144c_hoisted_22 = {
  class: "triggerConditionNode"
};
const TriggerEditvue_type_template_id_41d1144c_hoisted_23 = ["innerHTML"];
const TriggerEditvue_type_template_id_41d1144c_hoisted_24 = {
  class: "entityCancel"
};
const TriggerEditvue_type_template_id_41d1144c_hoisted_25 = {
  id: "confirmSelectTriggerType"
};
const TriggerEditvue_type_template_id_41d1144c_hoisted_26 = {
  class: "collection-header"
};
const TriggerEditvue_type_template_id_41d1144c_hoisted_27 = ["onClick", "title"];
const TriggerEditvue_type_template_id_41d1144c_hoisted_28 = ["src"];
const TriggerEditvue_type_template_id_41d1144c_hoisted_29 = {
  class: "title"
};
const TriggerEditvue_type_template_id_41d1144c_hoisted_30 = {
  class: "secondary-content"
};
const TriggerEditvue_type_template_id_41d1144c_hoisted_31 = ["title"];
const TriggerEditvue_type_template_id_41d1144c_hoisted_32 = {
  class: "entityCancel"
};
function TriggerEditvue_type_template_id_41d1144c_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");
  const _component_GroupedSettings = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("GroupedSettings");
  const _component_SaveButton = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("SaveButton");
  const _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", TriggerEditvue_type_template_id_41d1144c_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: "Tag Manager",
    "content-title": _ctx.editTitle
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => {
      var _ctx$trigger$typeMeta, _ctx$trigger$typeMeta2, _ctx$trigger$typeMeta3, _ctx$trigger$typeMeta4;
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", TriggerEditvue_type_template_id_41d1144c_hoisted_2, [TriggerEditvue_type_template_id_41d1144c_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_LoadingData')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isLoading]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", TriggerEditvue_type_template_id_41d1144c_hoisted_4, [TriggerEditvue_type_template_id_41d1144c_hoisted_5, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_UpdatingData')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isUpdating]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("form", {
        onSubmit: _cache[5] || (_cache[5] = $event => _ctx.edit ? _ctx.updateTrigger() : _ctx.createTrigger())
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
        class: "alert alert-danger",
        innerHTML: _ctx.$sanitize(_ctx.getNoCustomTemplatePermissionErrorMessage())
      }, null, 8, TriggerEditvue_type_template_id_41d1144c_hoisted_6), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isTriggerDisabled]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "text",
        name: "name",
        "model-value": _ctx.trigger.name,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => {
          _ctx.trigger.name = $event;
          _ctx.setValueHasChanged();
        }),
        maxlength: 255,
        title: _ctx.translate('General_Name'),
        "inline-help": _ctx.translate('TagManager_TriggerNameHelp'),
        placeholder: _ctx.translate('TagManager_TriggerNamePlaceholder')
      }, null, 8, ["model-value", "title", "inline-help", "placeholder"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "textarea",
        name: "description",
        "model-value": _ctx.trigger.description,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => {
          _ctx.trigger.description = $event;
          _ctx.setValueHasChanged();
        }),
        maxlength: 1000,
        title: _ctx.translate('TagManager_Description'),
        "inline-help": _ctx.translate('TagManager_TriggerDescriptionHelp'),
        placeholder: _ctx.translate('TagManager_TriggerDescriptionPlaceholder')
      }, null, 8, ["model-value", "title", "inline-help", "placeholder"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_41d1144c_hoisted_7, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_41d1144c_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ConfigureThisTrigger')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], (_ctx$trigger$typeMeta = _ctx.trigger.typeMetadata) === null || _ctx$trigger$typeMeta === void 0 || (_ctx$trigger$typeMeta = _ctx$trigger$typeMeta.parameters) === null || _ctx$trigger$typeMeta === void 0 ? void 0 : _ctx$trigger$typeMeta.length]]), _ctx.trigger ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", TriggerEditvue_type_template_id_41d1144c_hoisted_9, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_GroupedSettings, {
        settings: ((_ctx$trigger$typeMeta2 = _ctx.trigger.typeMetadata) === null || _ctx$trigger$typeMeta2 === void 0 ? void 0 : _ctx$trigger$typeMeta2.parameters) || [],
        "all-setting-values": _ctx.parameterValues,
        onChange: _cache[2] || (_cache[2] = $event => _ctx.parameterValues[$event.name] = $event.value)
      }, null, 8, ["settings", "all-setting-values"])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_41d1144c_hoisted_10, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_41d1144c_hoisted_11, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_OnlyTriggerWhen')) + " " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('Goals_Optional')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], (_ctx$trigger$typeMeta3 = _ctx.trigger.typeMetadata) === null || _ctx$trigger$typeMeta3 === void 0 ? void 0 : _ctx$trigger$typeMeta3.hasAdvancedSettings]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_41d1144c_hoisted_12, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_41d1144c_hoisted_13, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_TriggerConditionsHelp')), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_41d1144c_hoisted_14, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_41d1144c_hoisted_15, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
        class: "inline-help",
        innerHTML: _ctx.$sanitize(_ctx.triggerInlineHelpText)
      }, null, 8, TriggerEditvue_type_template_id_41d1144c_hoisted_16)])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_41d1144c_hoisted_17, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.trigger.conditions, (condition, index) => {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
          key: index,
          class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["condition multiple valign-wrapper", `condition${index}`])
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_41d1144c_hoisted_18, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
          uicontrol: "expandable-select",
          name: "condition_actual",
          "model-value": condition.actual,
          "onUpdate:modelValue": $event => {
            condition.actual = $event;
            _ctx.setValueHasChanged();
          },
          "full-width": true,
          options: _ctx.availableVariables,
          title: _ctx.variableIdToName[condition.actual] || condition.actual
        }, null, 8, ["model-value", "onUpdate:modelValue", "options", "title"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_41d1144c_hoisted_19, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
          uicontrol: "select",
          name: "condition_comparison",
          "model-value": condition.comparison,
          "onUpdate:modelValue": $event => {
            condition.comparison = $event;
            _ctx.setValueHasChanged();
          },
          "full-width": true,
          options: _ctx.availableComparisons
        }, null, 8, ["model-value", "onUpdate:modelValue", "options"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_41d1144c_hoisted_20, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
          uicontrol: "text",
          name: "condition_expected",
          "model-value": condition.expected,
          "onUpdate:modelValue": $event => {
            condition.expected = $event;
            _ctx.setValueHasChanged();
            _ctx.onConditionChange();
          },
          "full-width": true
        }, null, 8, ["model-value", "onUpdate:modelValue"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
          class: "icon-minus valign",
          onClick: $event => _ctx.removeConditionEntry(index),
          title: _ctx.translate('General_Remove')
        }, null, 8, TriggerEditvue_type_template_id_41d1144c_hoisted_21), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !(index + 1 === _ctx.trigger.conditions.length)]])], 2);
      }), 128))]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", TriggerEditvue_type_template_id_41d1144c_hoisted_22, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_TriggerConditionNode')), 1)])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], (_ctx$trigger$typeMeta4 = _ctx.trigger.typeMetadata) === null || _ctx$trigger$typeMeta4 === void 0 ? void 0 : _ctx$trigger$typeMeta4.hasAdvancedSettings]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
        class: "alert alert-danger",
        innerHTML: _ctx.$sanitize(_ctx.getNoCustomTemplatePermissionErrorMessage())
      }, null, 8, TriggerEditvue_type_template_id_41d1144c_hoisted_23), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isTriggerDisabled]]), !_ctx.isTriggerDisabled ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_SaveButton, {
        key: 1,
        class: "createButton",
        onConfirm: _cache[3] || (_cache[3] = $event => _ctx.edit ? _ctx.updateTrigger() : _ctx.createTrigger()),
        disabled: _ctx.isUpdating || !_ctx.isDirty,
        saving: _ctx.isUpdating,
        value: _ctx.saveButtonText
      }, null, 8, ["disabled", "saving", "value"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_41d1144c_hoisted_24, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        onClick: _cache[4] || (_cache[4] = $event => _ctx.cancel())
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Cancel')), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isEmbedded]])])], 544), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.chooseTriggerType && _ctx.editTitle]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_41d1144c_hoisted_25, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.availableTriggers, (triggerCategory, index) => {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("ul", {
          class: "collection with-header",
          key: index
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", TriggerEditvue_type_template_id_41d1144c_hoisted_26, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(triggerCategory.name), 1)]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(triggerCategory.types, (triggerTemplate, index) => {
          return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
            class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["collection-item avatar", {
              disabledTemplate: _ctx.isTriggerTemplateDisabled[triggerTemplate.id],
              [`templateType${triggerTemplate.id}`]: true
            }]),
            onClick: $event => _ctx.createTriggerType(triggerTemplate),
            key: index,
            title: !_ctx.isTriggerTemplateDisabled[triggerTemplate.id] ? '' : _ctx.collectionItemAvatarText
          }, [triggerTemplate.icon ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("img", {
            key: 0,
            alt: "",
            class: "circle",
            src: triggerTemplate.icon
          }, null, 8, TriggerEditvue_type_template_id_41d1144c_hoisted_28)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", TriggerEditvue_type_template_id_41d1144c_hoisted_29, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(triggerTemplate.name), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(triggerTemplate.description), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], triggerTemplate.description]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", TriggerEditvue_type_template_id_41d1144c_hoisted_30, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("i", {
            class: "icon-help",
            title: triggerTemplate.help
          }, null, 8, TriggerEditvue_type_template_id_41d1144c_hoisted_31)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !!triggerTemplate.help]])], 10, TriggerEditvue_type_template_id_41d1144c_hoisted_27);
        }), 128))]);
      }), 128)), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerEditvue_type_template_id_41d1144c_hoisted_32, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        onClick: _cache[6] || (_cache[6] = $event => _ctx.cancel())
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Cancel')), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isEmbedded]])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.chooseTriggerType]])];
    }),
    _: 1
  }, 8, ["content-title"])], 512);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Trigger/TriggerEdit.vue?vue&type=template&id=41d1144c

// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Trigger/Triggers.store.ts
function Triggers_store_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


class Triggers_store_TriggersStore {
  constructor() {
    Triggers_store_defineProperty(this, "privateState", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      triggers: [],
      isLoadingTriggers: false,
      isLoadingSingle: false,
      isUpdating: false
    }));
    Triggers_store_defineProperty(this, "state", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(this.privateState)));
    Triggers_store_defineProperty(this, "isUpdating", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => this.state.value.isUpdating));
    Triggers_store_defineProperty(this, "isLoading", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
      const state = this.state.value;
      return state.isLoadingTriggers || state.isLoadingSingle;
    }));
    Triggers_store_defineProperty(this, "triggers", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => this.state.value.triggers));
    Triggers_store_defineProperty(this, "fetchPromise", null);
    Triggers_store_defineProperty(this, "availableTriggersPromises", {});
  }
  fetchTriggers(idContainer, idContainerVersion) {
    this.privateState.triggers = [];
    this.privateState.isLoadingTriggers = true;
    if (!this.fetchPromise) {
      this.fetchPromise = external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainerTriggers',
        idContainer,
        idContainerVersion,
        filter_limit: '-1'
      });
    }
    return Promise.resolve(this.fetchPromise).then(triggers => {
      this.privateState.triggers = triggers;
      return this.triggers.value;
    }).finally(() => {
      this.privateState.isLoadingTriggers = false;
    });
  }
  fetchTriggersIfNotLoaded(idContainer, idContainerVersion) {
    if (!this.fetchPromise) {
      // needed for suggestNameForType() to make sure it is aware of all names
      this.fetchTriggers(idContainer, idContainerVersion);
    }
  }
  fetchAvailableTriggers(idContext) {
    if (!this.availableTriggersPromises[idContext]) {
      this.availableTriggersPromises[idContext] = external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getAvailableTriggerTypesInContext',
        idContext,
        filter_limit: '-1'
      });
    }
    return Promise.resolve(this.availableTriggersPromises[idContext]);
  }
  findTrigger(idContainer, idContainerVersion, idTrigger) {
    // before going through an API request we first try to find it in loaded variables
    const found = this.triggers.value.find(v => v.idtrigger === idTrigger);
    if (found) {
      return Promise.resolve(found);
    }
    // otherwise we fetch it via API
    this.privateState.isLoadingSingle = true;
    return external_CoreHome_["AjaxHelper"].fetch({
      idTrigger,
      idContainer,
      idContainerVersion,
      method: 'TagManager.getContainerTrigger',
      filter_limit: '-1'
    }).then(record => {
      this.privateState.triggers = [...this.privateState.triggers, record];
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(record);
    }).finally(() => {
      this.privateState.isLoadingSingle = false;
    });
  }
  suggestNameForType(templateId) {
    for (let counter = 0; counter < 100; counter += 1) {
      let name = templateId;
      if (counter) {
        name = `${name} (${counter})`;
      }
      const isFree = !this.triggers.value.some(v => v.name === name);
      if (isFree) {
        return name;
      }
    }
    return undefined;
  }
  createOrUpdateTrigger(trigger, method, idContainer, idContainerVersion, parameterValues) {
    const mappedEntries = Object.entries(parameterValues).map(([key, value]) => {
      let newValue = value;
      if (typeof value === 'boolean') {
        newValue = (+value).toString();
      }
      return [key, newValue];
    });
    const parameters = Object.fromEntries(mappedEntries);
    const conditions = trigger.conditions.filter(c => c && c.actual && c.comparison && c.expected);
    this.privateState.isUpdating = true;
    return external_CoreHome_["AjaxHelper"].post({
      idTrigger: trigger.idtrigger,
      method,
      idContainer,
      idContainerVersion,
      type: trigger.type,
      name: trigger.name,
      description: trigger.description
    }, {
      parameters,
      conditions
    }, {
      withTokenInUrl: true
    }).finally(() => {
      this.privateState.isUpdating = false;
    });
  }
  reload(idContainer, idContainerVersion) {
    this.privateState.triggers = [];
    this.fetchPromise = null;
    this.availableTriggersPromises = {};
    return this.fetchTriggers(idContainer, idContainerVersion);
  }
  deleteTrigger(idContainer, idContainerVersion, idTrigger) {
    this.privateState.isUpdating = true;
    this.privateState.triggers = [];
    return external_CoreHome_["AjaxHelper"].fetch({
      idTrigger,
      idContainerVersion,
      idContainer,
      method: 'TagManager.deleteContainerTrigger'
    }, {
      withTokenInUrl: true
    }).finally(() => {
      this.privateState.isUpdating = false;
    });
  }
}
/* harmony default export */ var Triggers_store = (new Triggers_store_TriggersStore());
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Trigger/TriggerEdit.vue?vue&type=script&lang=ts





const TriggerEditvue_type_script_lang_ts_notificationId = 'tagvariablemanagement';
const TRIGGER_TYPE_TO_CONDITION_ACTUAL = {
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
  data() {
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
  created() {
    AvailableComparisons_store.init();
    external_CoreHome_["AjaxHelper"].fetch({
      method: 'TagManager.getAvailableContainerVariables',
      filter_limit: '-1',
      idContainer: this.idContainer,
      idContainerVersion: this.idContainerVersion
    }).then(categories => {
      categories.forEach(category => {
        category.types.forEach(v => {
          this.variableIdToName[v.id] = v.name;
          this.availableVariables.push({
            key: v.id,
            value: v.name,
            group: category.name,
            tooltip: v.description
          });
        });
      });
    });
    // needed for suggestNameForType() to make sure it is aware of all names
    Triggers_store.fetchTriggersIfNotLoaded(this.idContainer, this.idContainerVersion);
    this.initIdTrigger();
  },
  watch: {
    idTrigger(newValue) {
      if (newValue === null) {
        return;
      }
      this.initIdTrigger();
    },
    triggerParameterValues: {
      handler(newValue, oldValue) {
        if (!newValue || !oldValue) {
          return;
        }
        this.isDirty = true;
      },
      deep: true
    }
  },
  methods: {
    checkRequiredFieldsAreSet() {
      if (!this.trigger.name) {
        this.showErrorFieldNotProvidedNotification(Object(external_CoreHome_["translate"])('General_Name'));
        return false;
      }
      return true;
    },
    removeAnyTriggerNotification() {
      external_CoreHome_["NotificationsStore"].remove(TriggerEditvue_type_script_lang_ts_notificationId);
      external_CoreHome_["NotificationsStore"].remove('ajaxHelper');
    },
    showNotification(message, context, type = null) {
      const notificationInstanceId = external_CoreHome_["NotificationsStore"].show({
        message,
        context,
        id: TriggerEditvue_type_script_lang_ts_notificationId,
        type: type !== null ? type : 'toast'
      });
      setTimeout(() => {
        external_CoreHome_["NotificationsStore"].scrollToNotification(notificationInstanceId);
      }, 200);
    },
    showErrorFieldNotProvidedNotification(title) {
      const message = Object(external_CoreHome_["translate"])('TagManager_ErrorXNotProvided', [title]);
      this.showNotification(message, 'error');
    },
    initIdTrigger() {
      this.trigger = {};
      this.chooseTriggerType = false;
      this.editTitle = '';
      external_CoreHome_["Matomo"].helper.lazyScrollToContent();
      this.availableTriggers = [];
      external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainer',
        idContainer: this.idContainer,
        filter_limit: '-1'
      }).then(container => Triggers_store.fetchAvailableTriggers(container.context)).then(triggers => {
        this.availableTriggers = triggers;
      }).then(() => {
        if (this.edit && this.idTrigger) {
          this.editTitle = Object(external_CoreHome_["translate"])('TagManager_EditTrigger');
          Triggers_store.findTrigger(this.idContainer, this.idContainerVersion, this.idTrigger).then(trigger => {
            var _this$trigger$typeMet;
            if (!trigger) {
              return;
            }
            this.trigger = Object(external_CoreHome_["clone"])(trigger);
            this.parameterValues = Object.fromEntries(trigger.typeMetadata.parameters.map(s => [s.name, s.value]));
            this.addConditionEntryIfNoneExists();
            this.onConditionChange();
            this.isDirty = false;
            if ((_this$trigger$typeMet = this.trigger.typeMetadata) !== null && _this$trigger$typeMet !== void 0 && _this$trigger$typeMet.name) {
              this.editTitle += `: ${this.trigger.typeMetadata.name}`;
            }
          });
          return;
        }
        if (this.create) {
          this.editTitle = Object(external_CoreHome_["translate"])('TagManager_ChooseTriggerToContinue');
          this.chooseTriggerType = true;
        }
      });
    },
    onConditionChange() {
      const hasAll = (this.trigger.conditions || []).every(c => !!(c !== null && c !== void 0 && c.expected));
      if (hasAll) {
        this.addConditionEntry();
      }
    },
    addConditionEntryIfNoneExists() {
      if (!this.trigger.conditions || !Array.isArray(this.trigger.conditions)) {
        this.trigger.conditions = [];
      }
      if (!this.trigger.conditions.length) {
        this.trigger.conditions.push(this.makeDefaultCondition());
      }
    },
    addConditionEntry() {
      this.trigger.conditions.push(this.makeDefaultCondition());
      this.isDirty = true;
    },
    removeConditionEntry(index) {
      if (index > -1) {
        const lastIndex = this.trigger.conditions.length - 1;
        if (lastIndex === index) {
          this.trigger.conditions[index] = this.makeDefaultCondition();
        } else {
          this.trigger.conditions.splice(index, 1);
        }
        this.isDirty = true;
      }
    },
    createTriggerType(triggerTemplate) {
      var _this$trigger$typeMet2;
      if (triggerTemplate && this.isTriggerTemplateDisabled[triggerTemplate.id]) {
        return;
      }
      this.chooseTriggerType = false;
      this.editTitle = Object(external_CoreHome_["translate"])('TagManager_CreateNewTrigger');
      this.trigger = {
        idsite: parseInt(`${external_CoreHome_["Matomo"].idSite}`, 10),
        name: Triggers_store.suggestNameForType(triggerTemplate.name) || '',
        description: '',
        type: triggerTemplate.id,
        idcontainerversion: this.idContainerVersion,
        conditions: [],
        typeMetadata: triggerTemplate
      };
      if ((_this$trigger$typeMet2 = this.trigger.typeMetadata) !== null && _this$trigger$typeMet2 !== void 0 && _this$trigger$typeMet2.name) {
        this.editTitle += `: ${this.trigger.typeMetadata.name}`;
      }
      this.parameterValues = Object.fromEntries(triggerTemplate.parameters.map(s => [s.name, s.value]));
      this.addConditionEntry();
      // we directly make the create button visible as sometimes some triggers do not
      // have any settings
      this.isDirty = true;
      Object(external_commonjs_vue_commonjs2_vue_root_Vue_["nextTick"])(() => {
        if (!this.$refs.root) {
          return;
        }
        const root = this.$refs.root;
        root.scrollIntoView();
        const name = root.querySelector('#name');
        if (name) {
          name.focus();
        }
      });
    },
    cancel() {
      const newParams = Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value);
      delete newParams.idTrigger;
      external_CoreHome_["MatomoUrl"].updateHash(newParams);
    },
    createTrigger() {
      this.removeAnyTriggerNotification();
      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }
      this.isUpdatingTrigger = true;
      Triggers_store.createOrUpdateTrigger(this.trigger, 'TagManager.addContainerTrigger', this.idContainer, this.idContainerVersion, this.parameterValues).then(response => {
        const idTrigger = response.value;
        this.isDirty = false;
        Triggers_store.reload(this.idContainer, this.idContainerVersion).then(() => {
          if (this.isEmbedded) {
            this.trigger.idtrigger = idTrigger;
            this.$emit('changeTrigger', {
              trigger: this.trigger
            });
            return;
          }
          // Go back to the list of triggers
          this.cancel();
          setTimeout(() => {
            const createdX = Object(external_CoreHome_["translate"])('TagManager_CreatedX', Object(external_CoreHome_["translate"])('TagManager_Trigger'));
            if (this.hasPublishCapability()) {
              const wantToRedeploy = Object(external_CoreHome_["translate"])('TagManager_WantToDeployThisChangeCreateVersion', '<a class="createNewVersionLink">', '</a>');
              this.showNotification(`${createdX} ${wantToRedeploy}`, 'success', 'transient');
              return;
            }
            this.showNotification(createdX, 'success');
          }, 200);
        });
      }).finally(() => {
        this.isUpdatingTrigger = false;
      });
    },
    setValueHasChanged() {
      this.isDirty = true;
    },
    updateTrigger() {
      this.removeAnyTriggerNotification();
      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }
      this.isUpdatingTrigger = true;
      Triggers_store.createOrUpdateTrigger(this.trigger, 'TagManager.updateContainerTrigger', this.idContainer, this.idContainerVersion, this.parameterValues).then(response => {
        if (!response) {
          return;
        }
        if (this.isEmbedded) {
          this.$emit('changeTrigger', {
            trigger: this.trigger
          });
          Triggers_store.reload(this.idContainer, this.idContainerVersion);
          return;
        }
        this.isDirty = false;
        Triggers_store.reload(this.idContainer, this.idContainerVersion).then(() => {
          this.initIdTrigger();
        });
        // Go back to the list of triggers
        this.cancel();
        const updatedAt = Object(external_CoreHome_["translate"])('TagManager_UpdatedX', Object(external_CoreHome_["translate"])('TagManager_Trigger'));
        if (this.hasPublishCapability()) {
          const wantToDeploy = Object(external_CoreHome_["translate"])('TagManager_WantToDeployThisChangeCreateVersion', '<a class="createNewVersionLink">', '</a>');
          this.showNotification(`${updatedAt} ${wantToDeploy}`, 'success', 'transient');
          return;
        }
        this.showNotification(updatedAt, 'success');
      }).finally(() => {
        this.isUpdatingTrigger = false;
      });
    },
    makeDefaultCondition() {
      var _this$trigger;
      let actual = 'PageUrl';
      if ((_this$trigger = this.trigger) !== null && _this$trigger !== void 0 && _this$trigger.typeMetadata) {
        const type = this.trigger.typeMetadata.id;
        if (TRIGGER_TYPE_TO_CONDITION_ACTUAL[type]) {
          actual = TRIGGER_TYPE_TO_CONDITION_ACTUAL[type];
        }
      }
      return {
        comparison: 'equals',
        actual,
        expected: ''
      };
    },
    hasPublishCapability() {
      return external_CoreHome_["Matomo"].hasUserCapability('tagmanager_write') && external_CoreHome_["Matomo"].hasUserCapability('tagmanager_use_custom_templates');
    },
    getNoCustomTemplatePermissionErrorMessage() {
      return Object(external_CoreHome_["translate"])('TagManager_UseCustomTemplateCapabilityPermissionRequiredDescription', '<strong>', Object(external_CoreHome_["translate"])('TagManager_CapabilityUseCustomTemplates'), '</strong>');
    }
  },
  computed: {
    isLoading() {
      return Triggers_store.isLoading.value || AvailableComparisons_store.isLoading.value;
    },
    isUpdating() {
      return Triggers_store.isUpdating.value || this.isUpdatingTrigger;
    },
    create() {
      return this.idTrigger === 0;
    },
    edit() {
      return !this.create;
    },
    canUseCustomTemplates() {
      return external_CoreHome_["Matomo"].hasUserCapability('tagmanager_use_custom_templates');
    },
    isTriggerDisabled() {
      var _this$trigger$typeMet3;
      return !this.canUseCustomTemplates && ((_this$trigger$typeMet3 = this.trigger.typeMetadata) === null || _this$trigger$typeMet3 === void 0 ? void 0 : _this$trigger$typeMet3.isCustomTemplate);
    },
    saveButtonText() {
      return this.edit ? Object(external_CoreHome_["translate"])('CoreUpdater_UpdateTitle') : Object(external_CoreHome_["translate"])('TagManager_CreateNewTrigger');
    },
    collectionItemAvatarText() {
      return Object(external_CoreHome_["translate"])('TagManager_UseCustomTemplateCapabilityPermissionRequiredDescription', '', Object(external_CoreHome_["translate"])('TagManager_CapabilityUseCustomTemplates'), '');
    },
    triggerInlineHelpText() {
      return Object(external_CoreHome_["translate"])('TagManager_TriggerConditionsHelpText', Object(external_CoreHome_["externalLink"])('https://matomo.org/faq/tag-manager/create-a-trigger-to-track-interactions-on-all-nested-elements/'), '</a>');
    },
    availableComparisons() {
      return AvailableComparisons_store.comparisonOptions.value;
    },
    isTriggerTemplateDisabled() {
      const result = {};
      this.availableTriggers.forEach(triggerCategory => {
        triggerCategory.types.forEach(trigger => {
          result[trigger.id] = !this.canUseCustomTemplates && trigger.isCustomTemplate;
        });
      });
      return result;
    },
    triggerParameterValues() {
      var _this$trigger$typeMet4;
      if (!((_this$trigger$typeMet4 = this.trigger.typeMetadata) !== null && _this$trigger$typeMet4 !== void 0 && _this$trigger$typeMet4.parameters)) {
        return null;
      }
      return this.parameterValues;
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Trigger/TriggerEdit.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Trigger/TriggerEdit.vue



TriggerEditvue_type_script_lang_ts.render = TriggerEditvue_type_template_id_41d1144c_render

/* harmony default export */ var TriggerEdit = (TriggerEditvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Trigger/TriggerList.vue?vue&type=template&id=3d3ac4c0

const TriggerListvue_type_template_id_3d3ac4c0_hoisted_1 = {
  class: "tagManagerManageList tagManagerTriggerList"
};
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_2 = {
  class: "triggerSearchFilter"
};
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_3 = ["title"];
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_4 = ["title"];
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_5 = ["title"];
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_6 = ["title"];
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_7 = ["title"];
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_8 = ["title"];
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_9 = {
  colspan: "7"
};
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_10 = {
  class: "loadingPiwik"
};
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_11 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_12 = {
  colspan: "7"
};
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_13 = ["id"];
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_14 = ["title"];
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_15 = ["title"];
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_16 = ["title"];
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_17 = {
  class: "conditions"
};
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_18 = {
  class: "icon-ok"
};
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_19 = ["title"];
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_20 = ["onClick", "title"];
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_21 = ["onClick", "title"];
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_22 = ["onClick", "title"];
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_23 = {
  class: "tableActionBar"
};
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_24 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, " ", -1);
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_25 = {
  class: "ui-confirm",
  id: "confirmDeleteTrigger",
  ref: "confirmDeleteTrigger"
};
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_26 = ["value"];
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_27 = ["value"];
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_28 = {
  class: "ui-confirm",
  id: "confirmDeleteTriggerNotPossible",
  ref: "confirmDeleteTriggerNotPossible"
};
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_29 = {
  class: "collection"
};
const TriggerListvue_type_template_id_3d3ac4c0_hoisted_30 = ["value"];
function TriggerListvue_type_template_id_3d3ac4c0_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");
  const _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");
  const _directive_content_table = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("content-table");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", TriggerListvue_type_template_id_3d3ac4c0_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: "Tag Manager",
    "content-title": _ctx.translate('TagManager_ManageX', _ctx.translate('TagManager_Triggers')),
    "help-text": _ctx.triggersHelpText
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_TriggerUsageBenefits')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerListvue_type_template_id_3d3ac4c0_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
      uicontrol: "text",
      name: "triggerSearch",
      title: _ctx.translate('General_Search'),
      modelValue: _ctx.triggerSearch,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => _ctx.triggerSearch = $event)
    }, null, 8, ["title", "modelValue"]), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.triggers.length > 0]])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("table", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
      class: "name",
      title: _ctx.nameTranslatedText
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Name')), 9, TriggerListvue_type_template_id_3d3ac4c0_hoisted_3), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
      class: "description",
      title: _ctx.descriptionTranslatedText
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Description')), 9, TriggerListvue_type_template_id_3d3ac4c0_hoisted_4), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
      class: "type",
      title: _ctx.typeTranslatedText
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Type')), 9, TriggerListvue_type_template_id_3d3ac4c0_hoisted_5), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
      class: "conditions",
      title: _ctx.filterTranslatedText
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Filter')), 9, TriggerListvue_type_template_id_3d3ac4c0_hoisted_6), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
      class: "lastUpdated",
      title: _ctx.lastUpdatedTranslatedText
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_LastUpdated')), 9, TriggerListvue_type_template_id_3d3ac4c0_hoisted_7), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
      class: "action",
      title: _ctx.actionTranslatedText
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Actions')), 9, TriggerListvue_type_template_id_3d3ac4c0_hoisted_8), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", TriggerListvue_type_template_id_3d3ac4c0_hoisted_9, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", TriggerListvue_type_template_id_3d3ac4c0_hoisted_10, [TriggerListvue_type_template_id_3d3ac4c0_hoisted_11, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_LoadingData')), 1)])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isLoading || _ctx.isUpdating]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", TriggerListvue_type_template_id_3d3ac4c0_hoisted_12, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_NoTriggersFound')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      class: "createContainerTriggerNow",
      onClick: _cache[1] || (_cache[1] = $event => _ctx.createTrigger())
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewTriggerNow')), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isLoading && _ctx.triggers.length === 0]]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.sortedTriggers, trigger => {
      var _trigger$conditions;
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
        id: `trigger${trigger.idtrigger}`,
        class: "triggers",
        key: trigger.idtrigger
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
        class: "name",
        title: trigger.name
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.truncateText(trigger.name, 50)), 9, TriggerListvue_type_template_id_3d3ac4c0_hoisted_14), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
        class: "description",
        title: trigger.description
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.truncateText(trigger.description, 75)), 9, TriggerListvue_type_template_id_3d3ac4c0_hoisted_15), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
        class: "type",
        title: trigger.typeMetadata.description
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(trigger.typeMetadata.name), 9, TriggerListvue_type_template_id_3d3ac4c0_hoisted_16), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", TriggerListvue_type_template_id_3d3ac4c0_hoisted_17, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", TriggerListvue_type_template_id_3d3ac4c0_hoisted_18, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], (_trigger$conditions = trigger.conditions) === null || _trigger$conditions === void 0 ? void 0 : _trigger$conditions.length]])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
        class: "lastUpdated",
        title: _ctx.translate('TagManager_CreatedOnX', trigger.created_date_pretty)
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(trigger.updated_date_pretty), 1)], 8, TriggerListvue_type_template_id_3d3ac4c0_hoisted_19), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
        class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(_ctx.getActionClasses)
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "table-action icon-edit",
        onClick: $event => _ctx.editTrigger(trigger.idtrigger, trigger.type),
        title: _ctx.translate('TagManager_EditTrigger')
      }, null, 8, TriggerListvue_type_template_id_3d3ac4c0_hoisted_20), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "table-action icon-content-copy",
        onClick: $event => _ctx.openCopyDialog(trigger),
        title: _ctx.translate('TagManager_CopyX', _ctx.translate('TagManager_Trigger'))
      }, null, 8, TriggerListvue_type_template_id_3d3ac4c0_hoisted_21), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasPublishCapability()]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "table-action icon-delete",
        onClick: $event => _ctx.deleteTrigger(trigger),
        title: _ctx.translate('TagManager_DeleteX', _ctx.translate('TagManager_Trigger'))
      }, null, 8, TriggerListvue_type_template_id_3d3ac4c0_hoisted_22)], 2), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])], 8, TriggerListvue_type_template_id_3d3ac4c0_hoisted_13);
    }), 128))])])), [[_directive_content_table]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerListvue_type_template_id_3d3ac4c0_hoisted_23, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      class: "createNewTrigger",
      value: "",
      onClick: _cache[2] || (_cache[2] = $event => _ctx.createTrigger())
    }, [TriggerListvue_type_template_id_3d3ac4c0_hoisted_24, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewTrigger')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])]),
    _: 1
  }, 8, ["content-title", "help-text"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerListvue_type_template_id_3d3ac4c0_hoisted_25, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_DeleteTriggerConfirm')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "yes",
    type: "button",
    value: _ctx.translate('General_Yes')
  }, null, 8, TriggerListvue_type_template_id_3d3ac4c0_hoisted_26), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "no",
    type: "button",
    value: _ctx.translate('General_No')
  }, null, 8, TriggerListvue_type_template_id_3d3ac4c0_hoisted_27)], 512), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TriggerListvue_type_template_id_3d3ac4c0_hoisted_28, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_TriggerCannotBeDeleted')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_TriggerBeingUsedBy')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", TriggerListvue_type_template_id_3d3ac4c0_hoisted_29, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.triggerReferences, reference => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
      class: "collection-item",
      key: reference.referenceId
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(reference.referenceTypeName) + ": " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(reference.referenceName), 1);
  }), 128))]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_TriggerBeingUsedNeedsRemove')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "no",
    type: "button",
    value: _ctx.translate('General_Cancel')
  }, null, 8, TriggerListvue_type_template_id_3d3ac4c0_hoisted_30)], 512)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Trigger/TriggerList.vue?vue&type=template&id=3d3ac4c0

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Trigger/TriggerList.vue?vue&type=script&lang=ts




const {
  tagManagerHelper: TriggerListvue_type_script_lang_ts_tagManagerHelper
} = window;
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
    Field: external_CorePluginsAdmin_["Field"],
    ContentBlock: external_CoreHome_["ContentBlock"]
  },
  directives: {
    ContentTable: external_CoreHome_["ContentTable"]
  },
  data() {
    return {
      hasWriteAccess: external_CoreHome_["Matomo"].hasUserCapability('tagmanager_write'),
      triggerReferences: [],
      triggerSearch: ''
    };
  },
  created() {
    Triggers_store.fetchTriggers(this.idContainer, this.idContainerVersion);
  },
  methods: {
    createTrigger() {
      this.editTrigger(0);
    },
    editTrigger(idTrigger) {
      external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
        idTrigger
      }));
    },
    deleteTrigger(trigger) {
      external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainerTriggerReferences',
        idContainer: this.idContainer,
        idContainerVersion: this.idContainerVersion,
        idTrigger: trigger.idtrigger
      }).then(references => {
        if (!references || !references.length) {
          this.triggerReferences = [];
          const doDelete = () => {
            Triggers_store.deleteTrigger(this.idContainer, this.idContainerVersion, trigger.idtrigger).then(() => {
              Triggers_store.reload(this.idContainer, this.idContainerVersion);
              external_CoreHome_["NotificationsStore"].remove('CopyDialogResultNotification');
            });
          };
          external_CoreHome_["Matomo"].helper.modalConfirm(this.$refs.confirmDeleteTrigger, {
            yes: doDelete
          });
        } else {
          this.triggerReferences = references;
          external_CoreHome_["Matomo"].helper.modalConfirm(this.$refs.confirmDeleteTriggerNotPossible, {});
        }
      });
    },
    truncateText(text, length) {
      return TriggerListvue_type_script_lang_ts_tagManagerHelper.truncateText(text, length);
    },
    hasPublishCapability() {
      return external_CoreHome_["Matomo"].hasUserCapability('tagmanager_write') && external_CoreHome_["Matomo"].hasUserCapability('tagmanager_use_custom_templates');
    },
    openCopyDialog(trigger) {
      const url = external_CoreHome_["MatomoUrl"].stringify({
        module: 'TagManager',
        action: 'copyTriggerDialog',
        idSite: trigger.idsite,
        idContainer: this.idContainer,
        idTrigger: trigger.idtrigger,
        idContainerVersion: this.idContainerVersion
      });
      window.Piwik_Popover.createPopupAndLoadUrl(url, '', 'mtmCopyTrigger');
    }
  },
  computed: {
    isLoading() {
      return Triggers_store.isLoading.value;
    },
    isUpdating() {
      return Triggers_store.isUpdating.value;
    },
    triggers() {
      return Triggers_store.triggers.value;
    },
    sortedTriggers() {
      const searchFilter = this.triggerSearch.toLowerCase();
      // look through string properties of triggers for values that have searchFilter in them
      // (mimics angularjs filter() filter)
      const result = [...this.triggers].filter(h => Object.keys(h).some(propName => {
        const entity = h;
        let propValue = '';
        if (typeof entity[propName] === 'string') {
          propValue = entity[propName];
        } else if (propName === 'typeMetadata') {
          const propTypeMeta = entity.typeMetadata;
          propValue = propTypeMeta.name;
        } else if (propName === 'parameters' && entity.type === 'CustomEvent') {
          const propTypeParameters = entity.parameters;
          propValue = propTypeParameters.eventName;
        }
        return propValue.toLowerCase().indexOf(searchFilter) !== -1;
      }));
      result.sort((lhs, rhs) => {
        if (lhs.name < rhs.name) {
          return -1;
        }
        return lhs.name > rhs.name ? 1 : 0;
      });
      return result;
    },
    nameTranslatedText() {
      return this.translate('TagManager_TriggersNameDescription');
    },
    descriptionTranslatedText() {
      return this.translate('TagManager_TriggersDescriptionDescription');
    },
    typeTranslatedText() {
      return this.translate('TagManager_TriggersTypeDescription');
    },
    filterTranslatedText() {
      return this.translate('TagManager_TriggersFilterDescription');
    },
    lastUpdatedTranslatedText() {
      return this.translate('TagManager_TriggersLastUpdatedDescription');
    },
    actionTranslatedText() {
      return this.translate('TagManager_TriggersActionDescription');
    },
    getActionClasses() {
      const copyClass = this.hasPublishCapability() ? ' hasCopyAction' : '';
      return `action${copyClass}`;
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Trigger/TriggerList.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Trigger/TriggerList.vue



TriggerListvue_type_script_lang_ts.render = TriggerListvue_type_template_id_3d3ac4c0_render

/* harmony default export */ var TriggerList = (TriggerListvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Trigger/TriggerManage.vue?vue&type=template&id=50893454

const TriggerManagevue_type_template_id_50893454_hoisted_1 = {
  class: "manageTrigger"
};
function TriggerManagevue_type_template_id_50893454_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_TriggerList = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("TriggerList");
  const _component_TriggerEdit = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("TriggerEdit");
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

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Trigger/TriggerManage.vue?vue&type=script&lang=ts




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
  data() {
    return {
      isAddAllowed: false
    };
  },
  created() {
    // doing this in a watch because we don't want to post an event in a computed property
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["watch"])(() => external_CoreHome_["MatomoUrl"].hashParsed.value.idTrigger, idTrigger => {
      this.onIdTriggerParamChange(idTrigger);
    });
    external_CoreHome_["NotificationsStore"].remove('triggertriggermanagement');
    this.onIdTriggerParamChange(external_CoreHome_["MatomoUrl"].hashParsed.value.idTrigger);
  },
  methods: {
    onIdTriggerParamChange(idTrigger) {
      // for BC w/ angularjs only invoke event if idVariable is 0
      if (idTrigger === '0') {
        const parameters = {
          isAllowed: true
        };
        external_CoreHome_["Matomo"].postEvent('TagManager.initAddTrigger', parameters);
        this.isAddAllowed = !!parameters.isAllowed;
      }
    }
  },
  computed: {
    idTrigger() {
      const idTrigger = external_CoreHome_["MatomoUrl"].hashParsed.value.idTrigger;
      if (!this.isAddAllowed && idTrigger === '0') {
        return null;
      }
      return idTrigger ? parseInt(idTrigger, 10) : idTrigger;
    },
    editMode() {
      return typeof this.idTrigger === 'number';
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Trigger/TriggerManage.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Trigger/TriggerManage.vue



TriggerManagevue_type_script_lang_ts.render = TriggerManagevue_type_template_id_50893454_render

/* harmony default export */ var TriggerManage = (TriggerManagevue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Tag/TagEdit.vue?vue&type=template&id=1c4cbd0b

const TagEditvue_type_template_id_1c4cbd0b_hoisted_1 = {
  class: "editTag tagManagerManageEdit",
  ref: "root"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_2 = {
  class: "loadingPiwik"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_3 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);
const TagEditvue_type_template_id_1c4cbd0b_hoisted_4 = {
  class: "loadingPiwik"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_5 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);
const TagEditvue_type_template_id_1c4cbd0b_hoisted_6 = ["innerHTML"];
const TagEditvue_type_template_id_1c4cbd0b_hoisted_7 = {
  class: "form-group row"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_8 = {
  class: "col s12"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_9 = {
  key: 0
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_10 = {
  class: "form-group row"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_11 = {
  class: "col s12"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_12 = {
  class: "form-group row"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_13 = {
  class: "col s12"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_14 = {
  class: "form-group row tagStartDate"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_15 = {
  class: "col s12 m6"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_16 = {
  class: "row"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_17 = {
  class: "col s12"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_18 = {
  for: "start_date_date",
  class: "active"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_19 = {
  class: "tagStartDate"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_20 = {
  class: "col s12 m6"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_21 = {
  class: "form-help"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_22 = {
  class: "inline-help"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_23 = ["innerHTML"];
const TagEditvue_type_template_id_1c4cbd0b_hoisted_24 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);
const TagEditvue_type_template_id_1c4cbd0b_hoisted_25 = ["innerHTML"];
const TagEditvue_type_template_id_1c4cbd0b_hoisted_26 = {
  class: "form-group row tagEndDate"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_27 = {
  class: "col s12 m6"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_28 = {
  class: "row"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_29 = {
  class: "col s12"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_30 = {
  for: "end_date_date",
  class: "active"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_31 = {
  class: "tagEndDate"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_32 = {
  class: "col s12 m6"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_33 = {
  class: "form-help"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_34 = {
  class: "inline-help"
};
const TagEditvue_type_template_id_1c4cbd0b_hoisted_35 = ["innerHTML"];
const TagEditvue_type_template_id_1c4cbd0b_hoisted_36 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);
const TagEditvue_type_template_id_1c4cbd0b_hoisted_37 = ["innerHTML"];
const _hoisted_38 = ["innerHTML"];
const _hoisted_39 = {
  class: "entityCancel"
};
const _hoisted_40 = {
  id: "confirmSelectTagType"
};
const _hoisted_41 = {
  class: "collection-header"
};
const _hoisted_42 = ["onClick", "title"];
const _hoisted_43 = ["src"];
const _hoisted_44 = {
  class: "title"
};
const _hoisted_45 = {
  class: "secondary-content"
};
const _hoisted_46 = ["title"];
const _hoisted_47 = {
  class: "entityCancel"
};
function TagEditvue_type_template_id_1c4cbd0b_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");
  const _component_GroupedSettings = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("GroupedSettings");
  const _component_TagTriggerArray = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("TagTriggerArray");
  const _component_TagDateInput = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("TagDateInput");
  const _component_SaveButton = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("SaveButton");
  const _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", TagEditvue_type_template_id_1c4cbd0b_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: "Tag Manager",
    "content-title": _ctx.editTitle
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => {
      var _ctx$tag$typeMetadata, _ctx$tag$typeMetadata2, _ctx$tag$typeMetadata3, _ctx$tag$typeMetadata4, _ctx$tag$typeMetadata5;
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", TagEditvue_type_template_id_1c4cbd0b_hoisted_2, [TagEditvue_type_template_id_1c4cbd0b_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_LoadingData')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isLoading]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", TagEditvue_type_template_id_1c4cbd0b_hoisted_4, [TagEditvue_type_template_id_1c4cbd0b_hoisted_5, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_UpdatingData')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isUpdating]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("form", {
        onSubmit: _cache[18] || (_cache[18] = $event => _ctx.edit ? _ctx.updateTag() : _ctx.createTag())
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
        class: "alert alert-danger",
        innerHTML: _ctx.$sanitize(_ctx.getNoCustomTemplatePermissionErrorMessage())
      }, null, 8, TagEditvue_type_template_id_1c4cbd0b_hoisted_6), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isTagDisabled]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "text",
        name: "name",
        "model-value": _ctx.tag.name,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => {
          _ctx.tag.name = $event;
          _ctx.setValueHasChanged();
        }),
        maxlength: 255,
        title: _ctx.translate('General_Name'),
        "inline-help": _ctx.tagNameHelpText,
        placeholder: _ctx.translate('TagManager_TagNamePlaceholder')
      }, null, 8, ["model-value", "title", "inline-help", "placeholder"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "textarea",
        name: "description",
        "model-value": _ctx.tag.description,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => {
          _ctx.tag.description = $event;
          _ctx.setValueHasChanged();
        }),
        maxlength: 1000,
        title: _ctx.translate('TagManager_Description'),
        placeholder: _ctx.translate('TagManager_TagDescriptionPlaceholder')
      }, null, 8, ["model-value", "title", "placeholder"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_1c4cbd0b_hoisted_7, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_1c4cbd0b_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ConfigureWhatTagDoes')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], (_ctx$tag$typeMetadata = _ctx.tag.typeMetadata) === null || _ctx$tag$typeMetadata === void 0 ? void 0 : _ctx$tag$typeMetadata.parameters.length]]), _ctx.tag ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", TagEditvue_type_template_id_1c4cbd0b_hoisted_9, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_GroupedSettings, {
        settings: ((_ctx$tag$typeMetadata2 = _ctx.tag.typeMetadata) === null || _ctx$tag$typeMetadata2 === void 0 ? void 0 : _ctx$tag$typeMetadata2.parameters) || [],
        "all-setting-values": _ctx.parameterValues,
        onChange: _cache[2] || (_cache[2] = $event => {
          _ctx.parameterValues[$event.name] = $event.value;
          _ctx.setValueHasChanged();
        })
      }, null, 8, ["settings", "all-setting-values"])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_1c4cbd0b_hoisted_10, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_1c4cbd0b_hoisted_11, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ConfigureWhenTagDoes')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], (_ctx$tag$typeMetadata3 = _ctx.tag.typeMetadata) === null || _ctx$tag$typeMetadata3 === void 0 ? void 0 : _ctx$tag$typeMetadata3.parameters.length]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_TagTriggerArray, {
        "container-triggers": _ctx.containerTriggers,
        type: "fire",
        title: _ctx.translate('TagManager_FireTriggerTitle'),
        help: _ctx.translate('TagManager_FireTriggerHelp', _ctx.translate('TagManager_FireLimit')),
        "model-value": _ctx.fireTriggers,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => {
          _ctx.fireTriggers = $event;
          _ctx.setValueHasChanged();
          _ctx.onFireTriggerChange();
        }),
        onCreate: _cache[4] || (_cache[4] = $event => _ctx.onCreateNewFireTrigger()),
        onEdit: _cache[5] || (_cache[5] = $event => _ctx.editTrigger($event))
      }, null, 8, ["container-triggers", "title", "help", "model-value"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_TagTriggerArray, {
        "container-triggers": _ctx.containerTriggers,
        type: "block",
        title: _ctx.translate('TagManager_BlockTriggerTitle'),
        help: _ctx.translate('TagManager_BlockTriggerHelp'),
        "model-value": _ctx.blockTriggers,
        "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => {
          _ctx.blockTriggers = $event;
          _ctx.setValueHasChanged();
          _ctx.onBlockTriggerChange();
        }),
        onCreate: _cache[7] || (_cache[7] = $event => _ctx.onCreateNewBlockTrigger()),
        onEdit: _cache[8] || (_cache[8] = $event => _ctx.editTrigger($event))
      }, null, 8, ["container-triggers", "title", "help", "model-value"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_1c4cbd0b_hoisted_12, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_1c4cbd0b_hoisted_13, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        href: "",
        class: "showAdvancedSettings",
        onClick: _cache[9] || (_cache[9] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])($event => _ctx.showAdvanced = true, ["prevent"]))
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ShowAdvancedSettings')), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.showAdvanced]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        href: "",
        class: "hideAdvancedSettings",
        onClick: _cache[10] || (_cache[10] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])($event => _ctx.showAdvanced = false, ["prevent"]))
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_HideAdvancedSettings')), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.showAdvanced]])])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], (_ctx$tag$typeMetadata4 = _ctx.tag.typeMetadata) === null || _ctx$tag$typeMetadata4 === void 0 ? void 0 : _ctx$tag$typeMetadata4.hasAdvancedSettings]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "radio",
        name: "fire_limit",
        "model-value": _ctx.tag.fire_limit,
        "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => {
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
        "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => {
          _ctx.tag.fire_delay = $event;
          _ctx.setValueHasChanged();
        }),
        maxlength: 8,
        title: _ctx.translate('TagManager_FireDelay'),
        "inline-help": _ctx.translate('TagManager_FireDelayHelp'),
        placeholder: _ctx.translate('TagManager_PlaceholderZero')
      }, null, 8, ["model-value", "title", "inline-help", "placeholder"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "text",
        name: "priority",
        "model-value": _ctx.tag.priority,
        "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => {
          _ctx.tag.priority = $event;
          _ctx.setValueHasChanged();
        }),
        maxlength: 4,
        title: _ctx.translate('TagManager_Priority'),
        "inline-help": _ctx.translate('TagManager_PriorityHelp'),
        placeholder: _ctx.translate('TagManager_PriorityPlaceholder')
      }, null, 8, ["model-value", "title", "inline-help", "placeholder"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_1c4cbd0b_hoisted_14, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_1c4cbd0b_hoisted_15, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_1c4cbd0b_hoisted_16, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_1c4cbd0b_hoisted_17, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", TagEditvue_type_template_id_1c4cbd0b_hoisted_18, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_StartDate')) + ":", 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_1c4cbd0b_hoisted_19, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_TagDateInput, {
        name: "start_date",
        "model-value": _ctx.tag.start_date,
        "onUpdate:modelValue": _cache[14] || (_cache[14] = $event => {
          _ctx.tag.start_date = $event;
          _ctx.setValueHasChanged();
        }),
        "default-time": "00:00:00"
      }, null, 8, ["model-value"])])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_1c4cbd0b_hoisted_20, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_1c4cbd0b_hoisted_21, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", TagEditvue_type_template_id_1c4cbd0b_hoisted_22, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
        innerHTML: _ctx.$sanitize(_ctx.translate('TagManager_TagStartDateHelp', '<strong>', '</strong>'))
      }, null, 8, TagEditvue_type_template_id_1c4cbd0b_hoisted_23), TagEditvue_type_template_id_1c4cbd0b_hoisted_24, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
        class: "currentLocalTime",
        innerHTML: _ctx.$sanitize(_ctx.translate('TagManager_CurrentTimeInLocalTimezone', '<strong>', _ctx.currentTime, '</strong>'))
      }, null, 8, TagEditvue_type_template_id_1c4cbd0b_hoisted_25)])])])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_1c4cbd0b_hoisted_26, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_1c4cbd0b_hoisted_27, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_1c4cbd0b_hoisted_28, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_1c4cbd0b_hoisted_29, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", TagEditvue_type_template_id_1c4cbd0b_hoisted_30, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_EndDate')) + ":", 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_1c4cbd0b_hoisted_31, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_TagDateInput, {
        name: "end_date",
        "model-value": _ctx.tag.end_date,
        "onUpdate:modelValue": _cache[15] || (_cache[15] = $event => {
          _ctx.tag.end_date = $event;
          _ctx.setValueHasChanged();
        }),
        "default-time": "23:59:59"
      }, null, 8, ["model-value"])])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_1c4cbd0b_hoisted_32, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagEditvue_type_template_id_1c4cbd0b_hoisted_33, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", TagEditvue_type_template_id_1c4cbd0b_hoisted_34, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
        innerHTML: _ctx.$sanitize(_ctx.translate('TagManager_TagEndDateHelp', '<strong>', '</strong>'))
      }, null, 8, TagEditvue_type_template_id_1c4cbd0b_hoisted_35), TagEditvue_type_template_id_1c4cbd0b_hoisted_36, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
        class: "currentLocalTime",
        innerHTML: _ctx.$sanitize(_ctx.translate('TagManager_CurrentTimeInLocalTimezone', '<strong>', _ctx.currentTime, '</strong>'))
      }, null, 8, TagEditvue_type_template_id_1c4cbd0b_hoisted_37)])])])])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.showAdvanced && ((_ctx$tag$typeMetadata5 = _ctx.tag.typeMetadata) === null || _ctx$tag$typeMetadata5 === void 0 ? void 0 : _ctx$tag$typeMetadata5.hasAdvancedSettings)]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
        class: "alert alert-danger",
        innerHTML: _ctx.$sanitize(_ctx.getNoCustomTemplatePermissionErrorMessage())
      }, null, 8, _hoisted_38), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isTagDisabled]]), !_ctx.isTagDisabled ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_SaveButton, {
        key: 1,
        class: "createButton",
        onConfirm: _cache[16] || (_cache[16] = $event => _ctx.edit ? _ctx.updateTag() : _ctx.createTag()),
        disabled: _ctx.isUpdating || !_ctx.isDirty,
        saving: _ctx.isUpdating,
        value: _ctx.edit ? _ctx.translate('CoreUpdater_UpdateTitle') : _ctx.translate('TagManager_CreateNewTag')
      }, null, 8, ["disabled", "saving", "value"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_39, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        onClick: _cache[17] || (_cache[17] = $event => _ctx.cancel())
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Cancel')), 1)])])], 544), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.chooseTagType && _ctx.editTitle]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_40, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.availableTags, tagCategory => {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("ul", {
          class: "collection with-header",
          key: tagCategory.name
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", _hoisted_41, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(tagCategory.name), 1)]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(tagCategory.types, (tagTemplate, index) => {
          return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
            key: index,
            class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["collection-item avatar", {
              disabledTemplate: _ctx.isTagTemplateDisabled[tagTemplate.id],
              [`templateType${tagTemplate.id}`]: true
            }]),
            onClick: $event => _ctx.createTagType(tagTemplate),
            title: !_ctx.isTagTemplateDisabled[tagTemplate.id] ? '' : _ctx.collectionItemAvatarText
          }, [tagTemplate.icon ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("img", {
            key: 0,
            alt: "",
            class: "circle",
            src: tagTemplate.icon
          }, null, 8, _hoisted_43)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_44, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(tagTemplate.name), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(tagTemplate.description), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], tagTemplate.description]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_45, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("i", {
            class: "icon-help",
            title: tagTemplate.help
          }, null, 8, _hoisted_46)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !!tagTemplate.help]])], 10, _hoisted_42)), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isTagVisible(tagTemplate.id)]]);
        }), 128))]);
      }), 128)), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_47, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        onClick: _cache[19] || (_cache[19] = $event => _ctx.cancel())
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Cancel')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.chooseTagType]])];
    }),
    _: 1
  }, 8, ["content-title"])], 512);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagEdit.vue?vue&type=template&id=1c4cbd0b

// CONCATENATED MODULE: ./plugins/TagManager/vue/src/AvailableFireLimit.store.ts
function AvailableFireLimit_store_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


class AvailableFireLimit_store_AvailableFireLimitStore {
  constructor() {
    AvailableFireLimit_store_defineProperty(this, "privateState", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      fireLimits: [],
      isLoading: false
    }));
    AvailableFireLimit_store_defineProperty(this, "state", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(this.privateState)));
    AvailableFireLimit_store_defineProperty(this, "isLoading", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => this.state.value.isLoading));
    AvailableFireLimit_store_defineProperty(this, "fireLimits", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => this.state.value.fireLimits));
    AvailableFireLimit_store_defineProperty(this, "fireLimitsOptions", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => this.fireLimits.value.map(({
      id,
      name
    }) => ({
      key: id,
      value: name
    }))));
    AvailableFireLimit_store_defineProperty(this, "initializePromise", null);
  }
  init() {
    if (!this.initializePromise) {
      this.initializePromise = this.fetchAvailableFireLimits();
    }
    return this.initializePromise;
  }
  fetchAvailableFireLimits() {
    this.privateState.isLoading = true;
    return external_CoreHome_["AjaxHelper"].fetch({
      method: 'TagManager.getAvailableTagFireLimits',
      filter_limit: '-1'
    }).then(fireLimits => {
      let entities;
      if (Array.isArray(fireLimits)) {
        entities = fireLimits;
      } else {
        entities = Object.values(fireLimits);
      }
      this.privateState.fireLimits = entities;
    }).finally(() => {
      this.privateState.isLoading = false;
    });
  }
}
/* harmony default export */ var AvailableFireLimit_store = (new AvailableFireLimit_store_AvailableFireLimitStore());
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Tag/TagTriggerArray.vue?vue&type=template&id=c1c05b4a

const TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_1 = {
  class: "col s12 m6"
};
const TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_2 = ["for"];
const TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_3 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);
const TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_4 = ["name"];
const TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_5 = ["onClick", "title"];
const TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_6 = ["onClick", "title"];
const TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_7 = {
  class: "col s12 m6"
};
const TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_8 = {
  class: "form-help"
};
const TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_9 = {
  class: "inline-help"
};
const TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_10 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);
const TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_11 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);
function TagTriggerArrayvue_type_template_id_c1c05b4a_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["form-group row", `${_ctx.type}Triggers`])
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
    for: `${_ctx.type}_triggers`
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.title), 9, TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_NoTriggersFound')) + ". ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    class: "createNewTrigger",
    onClick: _cache[0] || (_cache[0] = $event => _ctx.$emit('create'))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewTriggerNow')), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.containerTriggers.length === 0]]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.modelValue, (idTrigger, index) => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["multiple valign-wrapper", `${_ctx.type}Trigger ${_ctx.type}Trigger${index}`]),
      key: index
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
      class: "innerFormField",
      name: `${_ctx.type}_triggers`
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
      uicontrol: "select",
      name: `${_ctx.type}_triggers`,
      "model-value": idTrigger,
      "onUpdate:modelValue": $event => _ctx.onChangeTrigger($event, index),
      "full-width": true,
      options: _ctx.containerTriggers
    }, null, 8, ["name", "model-value", "onUpdate:modelValue", "options"])], 8, TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_4), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
      class: "icon-edit valign",
      onClick: $event => _ctx.$emit('edit', idTrigger),
      title: _ctx.translate('General_Edit')
    }, null, 8, TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_5), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], idTrigger]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
      class: "icon-minus valign",
      onClick: $event => _ctx.removeTrigger(index),
      title: _ctx.translate('General_Remove')
    }, null, 8, TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_6), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], index + 1 !== _ctx.modelValue.length]])], 2)), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.containerTriggers.length]]);
  }), 128))])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_7, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_9, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.help) + " ", 1), TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_10, TagTriggerArrayvue_type_template_id_c1c05b4a_hoisted_11, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    class: "createTriggerInHelp",
    onClick: _cache[1] || (_cache[1] = $event => _ctx.$emit('create'))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewTriggerNow')), 1)])])])], 2);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagTriggerArray.vue?vue&type=template&id=c1c05b4a

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Tag/TagTriggerArray.vue?vue&type=script&lang=ts


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
    onChangeTrigger(idTrigger, index) {
      const newValue = [...this.modelValue];
      newValue[index] = parseInt(idTrigger, 10);
      this.$emit('update:modelValue', newValue);
    },
    removeTrigger(index) {
      const newValue = [...this.modelValue];
      newValue.splice(index, 1);
      this.$emit('update:modelValue', newValue);
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagTriggerArray.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagTriggerArray.vue



TagTriggerArrayvue_type_script_lang_ts.render = TagTriggerArrayvue_type_template_id_c1c05b4a_render

/* harmony default export */ var TagTriggerArray = (TagTriggerArrayvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Tag/TagDateInput.vue?vue&type=template&id=fc05d13c

const TagDateInputvue_type_template_id_fc05d13c_hoisted_1 = {
  class: "col s12 m6 input-field"
};
const TagDateInputvue_type_template_id_fc05d13c_hoisted_2 = ["name", "id", "value"];
const TagDateInputvue_type_template_id_fc05d13c_hoisted_3 = {
  class: "col s12 m6 input-field"
};
const TagDateInputvue_type_template_id_fc05d13c_hoisted_4 = ["name", "id", "value"];
function TagDateInputvue_type_template_id_fc05d13c_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagDateInputvue_type_template_id_fc05d13c_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    ref: "dateInput",
    type: "text",
    name: `${_ctx.name}_date`,
    id: `${_ctx.name}_date`,
    class: "dateInput",
    value: _ctx.dateText,
    onKeydown: _cache[0] || (_cache[0] = $event => _ctx.onDateKeydown($event)),
    onChange: _cache[1] || (_cache[1] = $event => _ctx.onDateKeydown($event))
  }, null, 40, TagDateInputvue_type_template_id_fc05d13c_hoisted_2)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagDateInputvue_type_template_id_fc05d13c_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    ref: "timeInput",
    type: "text",
    name: `${_ctx.name}_time`,
    id: `${_ctx.name}_time`,
    class: "timeInput",
    value: _ctx.timeText,
    onKeydown: _cache[2] || (_cache[2] = $event => _ctx.onTimeKeydown($event))
  }, null, 40, TagDateInputvue_type_template_id_fc05d13c_hoisted_4)])], 64);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagDateInput.vue?vue&type=template&id=fc05d13c

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Tag/TagDateInput.vue?vue&type=script&lang=ts
/* eslint-disable @typescript-eslint/ban-ts-comment */


function prefixDateZeroIfNeeded(number) {
  let datePart = String(number);
  if (datePart.length === 1) {
    datePart = `0${datePart}`;
  }
  return datePart;
}
function convertUtcToLocalDate(dateTime) {
  if (!dateTime) {
    return undefined;
  }
  let isoDate = dateTime;
  if (isoDate) {
    isoDate = `${isoDate}`.replace(/-/g, '/');
    try {
      return new Date(`${isoDate} UTC`);
    } catch (e) {
      try {
        return new Date(Date.parse(`${isoDate} UTC`));
      } catch (ex) {
        // eg phantomjs etc
        const datePart = isoDate.substr(0, 10);
        const timePart = isoDate.substr(11);
        const dateParts = datePart.split('/');
        const timeParts = timePart.split(':');
        if (dateParts.length === 3 && timeParts.length === 3) {
          const result = new Date(parseInt(dateParts[0], 10), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[2], 10), parseInt(timeParts[0], 10), parseInt(timeParts[1], 10), parseInt(timeParts[2], 10));
          const newTime = result.getTime() + result.getTimezoneOffset() * 60000;
          return new Date(newTime);
        }
      }
    }
  }
  return undefined;
}
function convertUtcDateToLocalDatePart(isoDateTime) {
  const localStartDate = convertUtcToLocalDate(isoDateTime);
  if (localStartDate) {
    const month = prefixDateZeroIfNeeded(localStartDate.getMonth() + 1);
    const date = prefixDateZeroIfNeeded(localStartDate.getDate());
    return `${localStartDate.getFullYear()}-${month}-${date}`;
  }
  const parts = isoDateTime.split(' ');
  return parts[0];
}
function convertUtcDateToLocalTimePart(isoDateTime) {
  const localStartDate = convertUtcToLocalDate(isoDateTime);
  if (localStartDate) {
    const hours = prefixDateZeroIfNeeded(localStartDate.getHours());
    const minutes = prefixDateZeroIfNeeded(localStartDate.getMinutes());
    const seconds = prefixDateZeroIfNeeded(localStartDate.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  }
  const parts = isoDateTime.split(' ');
  return parts[1];
}
function convertLocalDateToUtc(strDate) {
  let dateTime = strDate;
  if (dateTime) {
    dateTime = dateTime.replace(/-/g, '/');
  }
  try {
    const localDate = new Date(dateTime);
    const month = prefixDateZeroIfNeeded(localDate.getUTCMonth() + 1);
    const date = prefixDateZeroIfNeeded(localDate.getUTCDate());
    const hours = prefixDateZeroIfNeeded(localDate.getUTCHours());
    const minutes = prefixDateZeroIfNeeded(localDate.getUTCMinutes());
    const seconds = prefixDateZeroIfNeeded(localDate.getUTCSeconds());
    let formatted = '';
    formatted += `${localDate.getUTCFullYear()}-${month}-${date}`;
    formatted += ' ';
    formatted += `${hours}:${minutes}:${seconds}`;
    return formatted;
  } catch (e) {
    return dateTime;
  }
}
const {
  $: TagDateInputvue_type_script_lang_ts_$
} = window;
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
  mounted() {
    const datePickerOptions = Object.assign(Object.assign({}, external_CoreHome_["Matomo"].getBaseDatePickerOptions(null)), {}, {
      minDate: new Date()
    });
    delete datePickerOptions.maxDate;
    TagDateInputvue_type_script_lang_ts_$(this.$refs.dateInput).datepicker(Object.assign({}, datePickerOptions));
    // @ts-ignore
    TagDateInputvue_type_script_lang_ts_$(this.$refs.timeInput).timepicker({
      timeFormat: 'H:i:s'
    })
    // timepicker triggers a jquery event, not a addEventListener event, so vue doesn't catch
    // it
    .on('change', event => {
      this.onTimeKeydown(event);
    });
  },
  computed: {
    dateText() {
      if (!this.modelValue) {
        return '';
      }
      return convertUtcDateToLocalDatePart(this.modelValue);
    },
    timeText() {
      if (!this.modelValue) {
        return '';
      }
      return convertUtcDateToLocalTimePart(this.modelValue);
    }
  },
  methods: {
    onDateKeydown(event) {
      setTimeout(() => {
        const {
          value
        } = event.target;
        if (this.dateText === value) {
          return;
        }
        this.onChange(value, this.timeText);
      });
    },
    onTimeKeydown(event) {
      setTimeout(() => {
        const {
          value
        } = event.target;
        if (this.timeText === value) {
          return;
        }
        this.onChange(this.dateText, value);
      });
    },
    onChange(date, time) {
      if (!date) {
        this.$emit('update:model-value', null);
        return;
      }
      const timeToUse = time || this.defaultTime;
      const newDate = convertLocalDateToUtc(`${date} ${timeToUse}`);
      this.$emit('update:model-value', newDate);
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagDateInput.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagDateInput.vue



TagDateInputvue_type_script_lang_ts.render = TagDateInputvue_type_template_id_fc05d13c_render

/* harmony default export */ var TagDateInput = (TagDateInputvue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/Tags.store.ts
function Tags_store_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


class Tags_store_TagsStore {
  constructor() {
    Tags_store_defineProperty(this, "privateState", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      tags: [],
      isLoadingTags: false,
      isLoadingSingle: false,
      isUpdating: false
    }));
    Tags_store_defineProperty(this, "state", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(this.privateState)));
    Tags_store_defineProperty(this, "isLoading", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
      const state = this.state.value;
      return state.isLoadingTags || state.isLoadingSingle;
    }));
    Tags_store_defineProperty(this, "isUpdating", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => this.state.value.isUpdating));
    Tags_store_defineProperty(this, "tags", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => this.state.value.tags));
    Tags_store_defineProperty(this, "fetchPromise", null);
    Tags_store_defineProperty(this, "availableTagsPromises", {});
  }
  fetchTags(idContainer, idContainerVersion) {
    this.privateState.isLoadingTags = true;
    this.privateState.tags = [];
    if (!this.fetchPromise) {
      this.fetchPromise = external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainerTags',
        idContainer,
        idContainerVersion,
        filter_limit: '-1'
      });
    }
    return Promise.resolve(this.fetchPromise).then(tags => {
      this.privateState.tags = tags;
      this.privateState.isLoadingTags = false;
      return this.tags.value;
    }).finally(() => {
      this.privateState.isLoadingTags = false;
    });
  }
  reload(idContainer, idContainerVersion) {
    this.privateState.tags = [];
    this.fetchPromise = null;
    this.availableTagsPromises = {};
    return this.fetchTags(idContainer, idContainerVersion);
  }
  findTag(idContainer, idContainerVersion, idTag) {
    // before going through an API request we first try to find it in loaded variables
    const found = this.tags.value.find(v => v.idtag === idTag);
    if (found) {
      return Promise.resolve(found);
    }
    // otherwise we fetch it via API
    this.privateState.isLoadingSingle = true;
    return external_CoreHome_["AjaxHelper"].fetch({
      idTag,
      idContainer,
      idContainerVersion,
      method: 'TagManager.getContainerTag',
      filter_limit: '-1'
    }).then(record => {
      this.privateState.tags = [...this.privateState.tags, record];
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(record);
    }).finally(() => {
      this.privateState.isLoadingSingle = false;
    });
  }
  fetchAvailableTags(idContext) {
    if (!this.availableTagsPromises[idContext]) {
      this.availableTagsPromises[idContext] = external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getAvailableTagTypesInContext',
        idContext,
        filter_limit: '-1'
      }).then(tags => Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(tags));
    }
    return Promise.resolve(this.availableTagsPromises[idContext]);
  }
  createOrUpdateTag(tag, method, idContainer, idContainerVersion, parameterValues, fireTriggerIds, blockTriggerIds) {
    this.privateState.isUpdating = true;
    const mappedEntries = Object.entries(parameterValues).map(([key, value]) => {
      let newValue = value;
      if (typeof value === 'boolean') {
        newValue = (+value).toString();
      }
      return [key, newValue];
    });
    const parameters = Object.fromEntries(mappedEntries);
    return external_CoreHome_["AjaxHelper"].post({
      idTag: tag.idtag,
      method,
      idContainer,
      idContainerVersion,
      type: tag.type,
      name: tag.name,
      description: tag.description,
      startDate: tag.start_date,
      endDate: tag.end_date,
      fireLimit: tag.fire_limit,
      fireDelay: tag.fire_delay,
      priority: tag.priority
    }, {
      parameters,
      fireTriggerIds,
      blockTriggerIds
    }, {
      withTokenInUrl: true
    }).finally(() => {
      this.privateState.isUpdating = false;
    });
  }
  deleteTag(idContainer, idContainerVersion, idTag) {
    this.privateState.isUpdating = true;
    this.privateState.tags = [];
    return external_CoreHome_["AjaxHelper"].fetch({
      idTag,
      idContainerVersion,
      idContainer,
      method: 'TagManager.deleteContainerTag'
    }, {
      withTokenInUrl: true
    }).finally(() => {
      this.privateState.isUpdating = false;
    });
  }
  pauseTag(idContainer, idContainerVersion, idTag) {
    this.privateState.isUpdating = true;
    this.privateState.tags = [];
    return external_CoreHome_["AjaxHelper"].fetch({
      idTag,
      idContainerVersion,
      idContainer,
      method: 'TagManager.pauseContainerTag'
    }, {
      withTokenInUrl: true
    }).finally(() => {
      this.privateState.isUpdating = false;
    });
  }
  resumeTag(idContainer, idContainerVersion, idTag) {
    this.privateState.isUpdating = true;
    this.privateState.tags = [];
    return external_CoreHome_["AjaxHelper"].fetch({
      idTag,
      idContainerVersion,
      idContainer,
      method: 'TagManager.resumeContainerTag'
    }, {
      withTokenInUrl: true
    }).finally(() => {
      this.privateState.isUpdating = false;
    });
  }
  suggestNameForType(templateId) {
    for (let counter = 0; counter < 100; counter += 1) {
      let name = templateId;
      if (counter) {
        name = `${name} (${counter})`;
      }
      const isFree = !this.tags.value.some(v => v.name === name);
      if (isFree) {
        return name;
      }
    }
    return undefined;
  }
}
/* harmony default export */ var Tags_store = (new Tags_store_TagsStore());
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Tag/TagEdit.vue?vue&type=script&lang=ts








function getCurrentTime() {
  const date = new Date();
  if (date && date.toString) {
    return date.toString();
  }
  return null;
}
const {
  $: TagEditvue_type_script_lang_ts_$,
  tagManagerHelper: TagEditvue_type_script_lang_ts_tagManagerHelper
} = window;
const TagEditvue_type_script_lang_ts_notificationId = 'tagtagmanagement';
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
  data() {
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
  created() {
    AvailableFireLimit_store.init();
    this.updateAvailableTriggers();
    this.setCurrentTime();
    Tags_store.reload(this.idContainer, this.idContainerVersion).then(() => {
      this.initIdTag();
    });
  },
  unmounted() {
    if (this.currentTimeTimeout) {
      clearTimeout(this.currentTimeTimeout);
    }
  },
  watch: {
    idTag(newValue) {
      if (newValue === null) {
        return;
      }
      this.initIdTag();
    }
  },
  methods: {
    setCurrentTime() {
      this.currentTime = getCurrentTime();
      this.currentTimeTimeout = setTimeout(this.setCurrentTime.bind(this), 10000);
    },
    updateAvailableTriggers() {
      external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainerTriggers',
        idContainer: this.idContainer,
        idContainerVersion: this.idContainerVersion,
        filter_limit: '-1'
      }).then(triggers => {
        this.containerTriggers = triggers.map(t => ({
          key: t.idtrigger,
          value: t.name
        }));
      });
    },
    removeAnyTagNotification() {
      external_CoreHome_["NotificationsStore"].remove(TagEditvue_type_script_lang_ts_notificationId);
      external_CoreHome_["NotificationsStore"].remove('ajaxHelper');
    },
    showNotification(message, context, type = null) {
      const instanceId = external_CoreHome_["NotificationsStore"].show({
        message,
        context,
        id: TagEditvue_type_script_lang_ts_notificationId,
        type: type !== null ? type : 'toast'
      });
      setTimeout(() => {
        external_CoreHome_["NotificationsStore"].scrollToNotification(instanceId);
      }, 200);
    },
    showErrorFieldNotProvidedNotification(title) {
      const message = Object(external_CoreHome_["translate"])('TagManager_ErrorXNotProvided', [title]);
      this.showNotification(message, 'error');
    },
    initIdTag() {
      this.tag = {};
      this.chooseTagType = false;
      this.editTitle = '';
      external_CoreHome_["Matomo"].helper.lazyScrollToContent();
      this.availableTags = [];
      external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainer',
        idContainer: this.idContainer,
        filter_limit: '-1'
      }).then(container => Tags_store.fetchAvailableTags(container.context)).then(tags => {
        this.availableTags = tags;
      }).then(() => {
        if (this.edit && this.idTag) {
          this.editTitle = Object(external_CoreHome_["translate"])('TagManager_EditTag');
          Tags_store.findTag(this.idContainer, this.idContainerVersion, this.idTag).then(tag => {
            var _this$tag$typeMetadat;
            if (!tag) {
              return;
            }
            this.tag = Object(external_CoreHome_["clone"])(tag);
            this.parameterValues = Object.fromEntries(tag.typeMetadata.parameters.map(s => [s.name, s.value]));
            this.blockTriggers = [...(this.tag.block_trigger_ids || [])];
            if (!this.blockTriggers.length) {
              this.blockTriggers.push(null);
            }
            this.fireTriggers = [...(this.tag.fire_trigger_ids || [])];
            if (!this.fireTriggers.length) {
              this.fireTriggers.push(null);
            }
            this.onFireTriggerChange();
            this.onBlockTriggerChange();
            this.isDirty = false;
            this.editTitle = Object(external_CoreHome_["translate"])('TagManager_EditTag');
            if ((_this$tag$typeMetadat = this.tag.typeMetadata) !== null && _this$tag$typeMetadat !== void 0 && _this$tag$typeMetadat.name) {
              this.editTitle += `: ${this.tag.typeMetadata.name}`;
            }
          });
          return;
        }
        if (this.create) {
          this.editTitle = Object(external_CoreHome_["translate"])('TagManager_ChooseTagToContinue');
          this.chooseTagType = true;
        }
      });
    },
    onCreateNewBlockTrigger() {
      this.openEditTrigger(trigger => {
        const indexLastEntry = this.blockTriggers.length - 1;
        if (!this.blockTriggers[indexLastEntry]) {
          this.blockTriggers[indexLastEntry] = trigger.idtrigger;
        } else {
          this.blockTriggers.push(trigger.idtrigger);
        }
        this.onBlockTriggerChange();
      }, 0);
    },
    onCreateNewFireTrigger() {
      this.openEditTrigger(trigger => {
        const indexLastEntry = this.fireTriggers.length - 1;
        if (!this.fireTriggers[indexLastEntry]) {
          this.fireTriggers[indexLastEntry] = trigger.idtrigger;
        } else {
          this.fireTriggers.push(trigger.idtrigger);
        }
        this.onFireTriggerChange();
      }, 0);
    },
    editTrigger(idTrigger) {
      this.openEditTrigger(() => null, idTrigger);
    },
    openEditTrigger(callback, idTag) {
      TagEditvue_type_script_lang_ts_tagManagerHelper.editTrigger(this.idContainer, this.idContainerVersion, idTag, trigger => {
        this.updateAvailableTriggers();
        callback(trigger);
      });
    },
    onBlockTriggerChange() {
      const hasAll = this.blockTriggers.every(t => !!t);
      if (hasAll) {
        this.addBlockTrigger();
      }
    },
    addBlockTrigger() {
      this.blockTriggers.push(null);
      this.isDirty = true;
    },
    removeBlockTrigger(index) {
      if (index > -1) {
        const lastIndex = this.blockTriggers.length - 1;
        if (lastIndex === index) {
          this.blockTriggers[index] = null;
        } else {
          this.blockTriggers.splice(index, 1);
        }
        this.isDirty = true;
      }
    },
    onFireTriggerChange() {
      const hasAll = this.fireTriggers.every(t => !!t);
      if (hasAll) {
        this.addFireTrigger();
      }
    },
    addFireTrigger() {
      this.fireTriggers.push(null);
      this.isDirty = true;
    },
    removeFireTrigger(index) {
      if (index > -1) {
        const lastIndex = this.fireTriggers.length - 1;
        if (lastIndex === index) {
          this.fireTriggers[index] = null;
        } else {
          this.fireTriggers.splice(index, 1);
        }
        this.isDirty = true;
      }
    },
    createTagType(tagTemplate) {
      var _this$tag$typeMetadat2;
      if (tagTemplate && this.isTagTemplateDisabled[tagTemplate.id]) {
        return;
      }
      this.chooseTagType = false;
      this.tag = {
        idsite: parseInt(`${external_CoreHome_["Matomo"].idSite}`, 10),
        name: Tags_store.suggestNameForType(tagTemplate.name) || '',
        type: tagTemplate.id,
        fire_limit: 'unlimited',
        priority: tagTemplate.id === 'GoogleTag' || tagTemplate.id === 'GoogleAnalytics4' ? 1 : 999,
        fire_delay: 0,
        typeMetadata: tagTemplate
      };
      this.editTitle = Object(external_CoreHome_["translate"])('TagManager_CreateNewTag');
      if ((_this$tag$typeMetadat2 = this.tag.typeMetadata) !== null && _this$tag$typeMetadat2 !== void 0 && _this$tag$typeMetadat2.name) {
        this.editTitle += `: ${this.tag.typeMetadata.name}`;
      }
      this.blockTriggers = [null];
      this.fireTriggers = [null];
      this.parameterValues = Object.fromEntries(tagTemplate.parameters.map(s => [s.name, s.value]));
      this.isDirty = false;
      setTimeout(() => {
        const editTag = TagEditvue_type_script_lang_ts_$(this.$refs.root);
        if (editTag.length && editTag[0]) {
          editTag[0].scrollIntoView();
        }
        editTag.find('#name').focus();
      }, 1);
    },
    cancel() {
      const newParams = Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value);
      delete newParams.idTag;
      external_CoreHome_["MatomoUrl"].updateHash(newParams);
    },
    createTag() {
      this.removeAnyTagNotification();
      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }
      this.isUpdatingTag = true;
      Tags_store.createOrUpdateTag(this.tag, 'TagManager.addContainerTag', this.idContainer, this.idContainerVersion, this.parameterValues, this.fireTriggers.filter(id => !!id), this.blockTriggers.filter(id => !!id)).then(response => {
        if (!response) {
          return;
        }
        this.isDirty = false;
        Tags_store.reload(this.idContainer, this.idContainerVersion).then(() => {
          // Go back to the list of tags
          this.cancel();
          setTimeout(() => {
            const createdX = Object(external_CoreHome_["translate"])('TagManager_CreatedX', Object(external_CoreHome_["translate"])('TagManager_Tag'));
            if (this.hasPublishCapability()) {
              const wantToRedeploy = Object(external_CoreHome_["translate"])('TagManager_WantToDeployThisChangeCreateVersion', '<a class="createNewVersionLink">', '</a>');
              this.showNotification(`${createdX} ${wantToRedeploy}`, 'success', 'transient');
              return;
            }
            this.showNotification(createdX, 'success');
          }, 200);
        });
      }).finally(() => {
        this.isUpdatingTag = false;
      });
    },
    setValueHasChanged() {
      this.isDirty = true;
    },
    updateTag() {
      this.removeAnyTagNotification();
      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }
      this.isUpdatingTag = true;
      Tags_store.createOrUpdateTag(this.tag, 'TagManager.updateContainerTag', this.idContainer, this.idContainerVersion, this.parameterValues, this.fireTriggers.filter(id => !!id), this.blockTriggers.filter(id => !!id)).then(response => {
        if (!response) {
          return;
        }
        this.isDirty = false;
        Tags_store.reload(this.idContainer, this.idContainerVersion).then(() => {
          this.initIdTag();
        });
        // Go back to the list of tags
        this.cancel();
        const updatedAt = Object(external_CoreHome_["translate"])('TagManager_UpdatedX', Object(external_CoreHome_["translate"])('TagManager_Tag'));
        if (this.hasPublishCapability()) {
          const wantToDeploy = Object(external_CoreHome_["translate"])('TagManager_WantToDeployThisChangeCreateVersion', '<a class="createNewVersionLink">', '</a>');
          this.showNotification(`${updatedAt} ${wantToDeploy}`, 'success', 'transient');
          return;
        }
        this.showNotification(updatedAt, 'success');
      }).finally(() => {
        this.isUpdatingTag = false;
      });
    },
    checkRequiredFieldsAreSet() {
      if (!this.tag.name) {
        const title = Object(external_CoreHome_["translate"])('General_Name');
        this.showErrorFieldNotProvidedNotification(title);
        return false;
      }
      if (!this.fireTriggers || !this.fireTriggers.length) {
        this.showNotification(Object(external_CoreHome_["translate"])('TagManager_TagFireTriggerRequirement'), 'error');
        return false;
      }
      return true;
    },
    hasPublishCapability() {
      return external_CoreHome_["Matomo"].hasUserCapability('tagmanager_write') && external_CoreHome_["Matomo"].hasUserCapability('tagmanager_use_custom_templates');
    },
    isTagVisible(id) {
      if (this.create && id === 'GoogleAnalytics4') {
        return false;
      }
      return true;
    },
    getNoCustomTemplatePermissionErrorMessage() {
      return Object(external_CoreHome_["translate"])('TagManager_UseCustomTemplateCapabilityPermissionRequiredDescription', '<strong>', Object(external_CoreHome_["translate"])('TagManager_CapabilityUseCustomTemplates'), '</strong>');
    }
  },
  computed: {
    availableFireLimits() {
      return AvailableFireLimit_store.fireLimitsOptions.value;
    },
    isLoading() {
      return Triggers_store.isLoading.value || AvailableFireLimit_store.isLoading.value;
    },
    isUpdating() {
      return Triggers_store.isUpdating.value || this.isUpdatingTag;
    },
    create() {
      return this.idTag === 0;
    },
    edit() {
      return !this.create;
    },
    canUseCustomTemplates() {
      return external_CoreHome_["Matomo"].hasUserCapability('tagmanager_use_custom_templates');
    },
    isTagDisabled() {
      var _this$tag$typeMetadat3;
      return !this.canUseCustomTemplates && ((_this$tag$typeMetadat3 = this.tag.typeMetadata) === null || _this$tag$typeMetadat3 === void 0 ? void 0 : _this$tag$typeMetadat3.isCustomTemplate);
    },
    isTagTemplateDisabled() {
      const result = {};
      this.availableTags.forEach(tagCategory => {
        tagCategory.types.forEach(tag => {
          result[tag.id] = !this.canUseCustomTemplates && tag.isCustomTemplate;
        });
      });
      return result;
    },
    collectionItemAvatarText() {
      return Object(external_CoreHome_["translate"])('TagManager_UseCustomTemplateCapabilityPermissionRequiredDescription', '', Object(external_CoreHome_["translate"])('TagManager_CapabilityUseCustomTemplates'), '');
    },
    fireLimitHelp() {
      return Object(external_CoreHome_["translate"])('TagManager_FireLimitHelp', Object(external_CoreHome_["translate"])('TagManager_Unlimited'), Object(external_CoreHome_["translate"])('TagManager_OncePage'), Object(external_CoreHome_["translate"])('TagManager_Once24Hours'), Object(external_CoreHome_["translate"])('TagManager_OnceLifetime'));
    },
    tagNameHelpText() {
      let additionalHelpText = '';
      if (this.tag.type === 'CustomHtml') {
        additionalHelpText = Object(external_CoreHome_["translate"])('TagManager_CustomHTMLTagNameInlineHelpText', '<br><br><strong>', '</strong>', Object(external_CoreHome_["externalLink"])('https://matomo.org/faq/tag-manager/how-to-add-google-ads-remarketing-tags-in-matomo-tag-manager/'), '</a>');
      }
      return Object(external_CoreHome_["translate"])('TagManager_TagNameHelpV2') + additionalHelpText;
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagEdit.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagEdit.vue



TagEditvue_type_script_lang_ts.render = TagEditvue_type_template_id_1c4cbd0b_render

/* harmony default export */ var TagEdit = (TagEditvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Tag/TagList.vue?vue&type=template&id=23672444

const TagListvue_type_template_id_23672444_hoisted_1 = {
  class: "tagManagerManageList tagManagerTagList"
};
const TagListvue_type_template_id_23672444_hoisted_2 = {
  class: "tagSearchFilter"
};
const TagListvue_type_template_id_23672444_hoisted_3 = ["title"];
const TagListvue_type_template_id_23672444_hoisted_4 = ["title"];
const TagListvue_type_template_id_23672444_hoisted_5 = ["title"];
const TagListvue_type_template_id_23672444_hoisted_6 = ["title"];
const TagListvue_type_template_id_23672444_hoisted_7 = ["title"];
const TagListvue_type_template_id_23672444_hoisted_8 = ["title"];
const TagListvue_type_template_id_23672444_hoisted_9 = {
  colspan: "6"
};
const TagListvue_type_template_id_23672444_hoisted_10 = {
  class: "loadingPiwik"
};
const TagListvue_type_template_id_23672444_hoisted_11 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);
const TagListvue_type_template_id_23672444_hoisted_12 = {
  colspan: "6"
};
const TagListvue_type_template_id_23672444_hoisted_13 = ["id"];
const TagListvue_type_template_id_23672444_hoisted_14 = ["title"];
const TagListvue_type_template_id_23672444_hoisted_15 = ["title"];
const TagListvue_type_template_id_23672444_hoisted_16 = ["title"];
const TagListvue_type_template_id_23672444_hoisted_17 = {
  class: "triggers"
};
const TagListvue_type_template_id_23672444_hoisted_18 = ["onClick", "title"];
const TagListvue_type_template_id_23672444_hoisted_19 = ["title"];
const TagListvue_type_template_id_23672444_hoisted_20 = ["onClick", "title"];
const TagListvue_type_template_id_23672444_hoisted_21 = ["title"];
const TagListvue_type_template_id_23672444_hoisted_22 = ["title"];
const TagListvue_type_template_id_23672444_hoisted_23 = ["onClick", "title"];
const TagListvue_type_template_id_23672444_hoisted_24 = ["onClick", "title"];
const TagListvue_type_template_id_23672444_hoisted_25 = ["onClick", "title"];
const TagListvue_type_template_id_23672444_hoisted_26 = ["onClick", "title"];
const TagListvue_type_template_id_23672444_hoisted_27 = ["onClick", "title"];
const TagListvue_type_template_id_23672444_hoisted_28 = {
  class: "tableActionBar"
};
const TagListvue_type_template_id_23672444_hoisted_29 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, " ", -1);
const TagListvue_type_template_id_23672444_hoisted_30 = {
  class: "ui-confirm",
  id: "confirmDeleteTag",
  ref: "confirmDeleteTag"
};
const TagListvue_type_template_id_23672444_hoisted_31 = ["value"];
const TagListvue_type_template_id_23672444_hoisted_32 = ["value"];
const TagListvue_type_template_id_23672444_hoisted_33 = {
  class: "ui-confirm",
  id: "confirmPauseTag",
  ref: "confirmPauseTag"
};
const TagListvue_type_template_id_23672444_hoisted_34 = ["value"];
const TagListvue_type_template_id_23672444_hoisted_35 = ["value"];
const TagListvue_type_template_id_23672444_hoisted_36 = {
  class: "ui-confirm",
  id: "confirmResumeTag",
  ref: "confirmResumeTag"
};
const TagListvue_type_template_id_23672444_hoisted_37 = ["value"];
const TagListvue_type_template_id_23672444_hoisted_38 = ["value"];
function TagListvue_type_template_id_23672444_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");
  const _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");
  const _directive_content_table = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("content-table");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", TagListvue_type_template_id_23672444_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: "Tag Manager",
    "content-title": _ctx.translate('TagManager_ManageX', _ctx.translate('TagManager_Tags')),
    "help-text": _ctx.tagsHelpText
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_TagUsageBenefits')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagListvue_type_template_id_23672444_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
      uicontrol: "text",
      name: "tagSearch",
      title: _ctx.translate('General_Search'),
      modelValue: _ctx.tagSearch,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => _ctx.tagSearch = $event)
    }, null, 8, ["title", "modelValue"]), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.tags.length > 0]])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("table", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
      class: "name",
      title: _ctx.nameTranslatedText
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Name')), 9, TagListvue_type_template_id_23672444_hoisted_3), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
      class: "description",
      title: _ctx.descriptionTranslatedText
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Description')), 9, TagListvue_type_template_id_23672444_hoisted_4), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
      class: "type",
      title: _ctx.typeTranslatedText
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Type')), 9, TagListvue_type_template_id_23672444_hoisted_5), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
      class: "triggers",
      title: _ctx.triggersTranslatedText
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Triggers')), 9, TagListvue_type_template_id_23672444_hoisted_6), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
      class: "lastUpdated",
      title: _ctx.lastUpdatedTranslatedText
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_LastUpdated')), 9, TagListvue_type_template_id_23672444_hoisted_7), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
      class: "action",
      title: _ctx.actionTranslatedText
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Actions')), 9, TagListvue_type_template_id_23672444_hoisted_8), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", TagListvue_type_template_id_23672444_hoisted_9, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", TagListvue_type_template_id_23672444_hoisted_10, [TagListvue_type_template_id_23672444_hoisted_11, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_LoadingData')), 1)])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isLoading || _ctx.isUpdating]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", TagListvue_type_template_id_23672444_hoisted_12, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_NoTagsFound')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      class: "createContainerTagNow",
      onClick: _cache[1] || (_cache[1] = $event => _ctx.createTag())
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewTagNow')), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isLoading && _ctx.tags.length === 0]]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.sortedTags, tag => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
        class: "tags",
        key: tag.idtag,
        id: `tag${tag.idtag}`
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
        class: "name",
        title: tag.name
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.truncateText(tag.name, 50)), 9, TagListvue_type_template_id_23672444_hoisted_14), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
        class: "description",
        title: tag.description
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.truncateText(tag.description, 75)), 9, TagListvue_type_template_id_23672444_hoisted_15), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
        class: "type",
        title: tag.typeMetadata.description
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(tag.typeMetadata.name), 9, TagListvue_type_template_id_23672444_hoisted_16), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", TagListvue_type_template_id_23672444_hoisted_17, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(tag.fire_trigger_ids, (fireTriggerId, fireTriggerIndex) => {
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
          onClick: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])($event => _ctx.editTrigger(fireTriggerId), ["prevent"]),
          title: this.triggers[fireTriggerId]
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.truncateText(this.triggers[fireTriggerId], _ctx.triggerTruncateLength)), 9, TagListvue_type_template_id_23672444_hoisted_18)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), !_ctx.hasWriteAccess ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
          key: 1,
          class: "chip",
          title: this.triggers[fireTriggerId]
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.truncateText(this.triggers[fireTriggerId], _ctx.triggerTruncateLength)), 9, TagListvue_type_template_id_23672444_hoisted_19)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
      }), 128)), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Except')) + ": ", 1), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(tag.block_trigger_ids, (blockTriggerId, index) => {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
          key: index,
          style: {
            "margin-right": "3.5px"
          }
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
          class: "chip",
          href: "",
          onClick: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])($event => _ctx.editTrigger(blockTriggerId), ["prevent"]),
          title: this.triggers[blockTriggerId]
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.truncateText(this.triggers[blockTriggerId], _ctx.triggerTruncateLength)), 9, TagListvue_type_template_id_23672444_hoisted_20), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
          class: "chip",
          title: this.triggers[blockTriggerId]
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.truncateText(this.triggers[blockTriggerId], _ctx.triggerTruncateLength)), 9, TagListvue_type_template_id_23672444_hoisted_21), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.hasWriteAccess]])]);
      }), 128))], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], tag.block_trigger_ids.length]])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
        class: "lastUpdated",
        title: _ctx.translate('TagManager_CreatedOnX', tag.created_date_pretty)
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(tag.updated_date_pretty), 1)], 8, TagListvue_type_template_id_23672444_hoisted_22), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
        class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(_ctx.getActionClasses)
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "table-action icon-pause",
        onClick: $event => _ctx.pauseTag(tag),
        title: _ctx.translate('TagManager_PauseX', _ctx.translate('TagManager_Tag'))
      }, null, 8, TagListvue_type_template_id_23672444_hoisted_23), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], tag.status === 'active']]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "table-action icon-play",
        onClick: $event => _ctx.resumeTag(tag),
        title: _ctx.translate('TagManager_ResumeX', _ctx.translate('TagManager_Tag'))
      }, null, 8, TagListvue_type_template_id_23672444_hoisted_24), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], tag.status === 'paused']]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "table-action icon-edit",
        onClick: $event => _ctx.editTag(tag.idtag, tag.type),
        title: _ctx.translate('TagManager_EditTag')
      }, null, 8, TagListvue_type_template_id_23672444_hoisted_25), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "table-action icon-content-copy",
        onClick: $event => _ctx.openCopyDialog(tag),
        title: _ctx.translate('TagManager_CopyX', _ctx.translate('TagManager_Tag'))
      }, null, 8, TagListvue_type_template_id_23672444_hoisted_26), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasPublishCapability()]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "table-action icon-delete",
        onClick: $event => _ctx.deleteTag(tag),
        title: _ctx.translate('TagManager_DeleteX', _ctx.translate('TagManager_Tag'))
      }, null, 8, TagListvue_type_template_id_23672444_hoisted_27)], 2), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])], 8, TagListvue_type_template_id_23672444_hoisted_13);
    }), 128))])])), [[_directive_content_table]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagListvue_type_template_id_23672444_hoisted_28, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      class: "createNewTag",
      value: "",
      onClick: _cache[2] || (_cache[2] = $event => _ctx.createTag())
    }, [TagListvue_type_template_id_23672444_hoisted_29, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewTag')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])]),
    _: 1
  }, 8, ["content-title", "help-text"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagListvue_type_template_id_23672444_hoisted_30, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_DeleteTagConfirm')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "yes",
    type: "button",
    value: _ctx.translate('General_Yes')
  }, null, 8, TagListvue_type_template_id_23672444_hoisted_31), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "no",
    type: "button",
    value: _ctx.translate('General_No')
  }, null, 8, TagListvue_type_template_id_23672444_hoisted_32)], 512), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagListvue_type_template_id_23672444_hoisted_33, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_PauseTagConfirm')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "yes",
    type: "button",
    value: _ctx.translate('General_Yes')
  }, null, 8, TagListvue_type_template_id_23672444_hoisted_34), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "no",
    type: "button",
    value: _ctx.translate('General_No')
  }, null, 8, TagListvue_type_template_id_23672444_hoisted_35)], 512), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TagListvue_type_template_id_23672444_hoisted_36, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ResumeTagConfirm')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "yes",
    type: "button",
    value: _ctx.translate('General_Yes')
  }, null, 8, TagListvue_type_template_id_23672444_hoisted_37), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "no",
    type: "button",
    value: _ctx.translate('General_No')
  }, null, 8, TagListvue_type_template_id_23672444_hoisted_38)], 512)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagList.vue?vue&type=template&id=23672444

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Tag/TagList.vue?vue&type=script&lang=ts





const {
  tagManagerHelper: TagListvue_type_script_lang_ts_tagManagerHelper
} = window;
const TagListvue_type_script_lang_ts_notificationId = 'tagtagmanagementlist';
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
    ContentBlock: external_CoreHome_["ContentBlock"],
    Field: external_CorePluginsAdmin_["Field"]
  },
  directives: {
    ContentTable: external_CoreHome_["ContentTable"]
  },
  data() {
    return {
      hasWriteAccess: external_CoreHome_["Matomo"].hasUserCapability('tagmanager_write'),
      triggerTruncateLength: 40,
      tagSearch: ''
    };
  },
  created() {
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["watch"])(() => Tags_store.tags.value, () => {
      this.reloadTriggers();
    });
    this.reloadTriggers();
    Tags_store.fetchTags(this.idContainer, this.idContainerVersion);
  },
  methods: {
    reloadTriggers() {
      Triggers_store.reload(this.idContainer, this.idContainerVersion);
    },
    createTag() {
      this.editTag(0);
    },
    editTrigger(idTrigger) {
      TagListvue_type_script_lang_ts_tagManagerHelper.editTrigger(this.idContainer, this.idContainerVersion, idTrigger, () => {
        this.reloadTriggers();
      });
    },
    editTag(idTag) {
      external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
        idTag
      }));
    },
    pauseTag(tag) {
      const doPause = () => {
        Tags_store.pauseTag(this.idContainer, this.idContainerVersion, tag.idtag).then(() => {
          Tags_store.reload(this.idContainer, this.idContainerVersion).then(() => {
            setTimeout(() => {
              this.showDeployNotification('pause');
            }, 200);
          });
        });
      };
      external_CoreHome_["Matomo"].helper.modalConfirm('#confirmPauseTag', {
        yes: doPause
      });
    },
    resumeTag(tag) {
      const doResume = () => {
        Tags_store.resumeTag(this.idContainer, this.idContainerVersion, tag.idtag).then(() => {
          Tags_store.reload(this.idContainer, this.idContainerVersion).then(() => {
            setTimeout(() => {
              this.showDeployNotification('resume');
            }, 200);
          });
        });
      };
      external_CoreHome_["Matomo"].helper.modalConfirm('#confirmResumeTag', {
        yes: doResume
      });
    },
    deleteTag(tag) {
      const doDelete = () => {
        Tags_store.deleteTag(this.idContainer, this.idContainerVersion, tag.idtag).then(() => {
          Tags_store.reload(this.idContainer, this.idContainerVersion);
          external_CoreHome_["NotificationsStore"].remove('CopyDialogResultNotification');
        });
      };
      external_CoreHome_["Matomo"].helper.modalConfirm('#confirmDeleteTag', {
        yes: doDelete
      });
    },
    truncateText(text, length) {
      return TagListvue_type_script_lang_ts_tagManagerHelper.truncateText(text, length);
    },
    hasPublishCapability() {
      return external_CoreHome_["Matomo"].hasUserCapability('tagmanager_write') && external_CoreHome_["Matomo"].hasUserCapability('tagmanager_use_custom_templates');
    },
    showDeployNotification(type) {
      const translatedString = type === 'pause' ? 'TagManager_PausedTag' : 'TagManager_ResumedTag';
      const createdX = Object(external_CoreHome_["translate"])(translatedString, Object(external_CoreHome_["translate"])('TagManager_Tag'));
      if (this.hasPublishCapability()) {
        const wantToRedeploy = Object(external_CoreHome_["translate"])('TagManager_WantToDeployThisChangeCreateVersion', '<a class="createNewVersionLink">', '</a>');
        this.showNotification(`${createdX} ${wantToRedeploy}`, 'success', 'transient');
        return;
      }
      this.showNotification(createdX, 'success');
    },
    showNotification(message, context, type = null) {
      const instanceId = external_CoreHome_["NotificationsStore"].show({
        message,
        context,
        id: TagListvue_type_script_lang_ts_notificationId,
        type: type !== null ? type : 'toast'
      });
      setTimeout(() => {
        external_CoreHome_["NotificationsStore"].scrollToNotification(instanceId);
      }, 200);
    },
    openCopyDialog(tag) {
      const url = external_CoreHome_["MatomoUrl"].stringify({
        module: 'TagManager',
        action: 'copyTagDialog',
        idSite: tag.idsite,
        idContainer: this.idContainer,
        idTag: tag.idtag,
        idContainerVersion: this.idContainerVersion
      });
      window.Piwik_Popover.createPopupAndLoadUrl(url, '', 'mtmCopyTag');
    }
  },
  computed: {
    triggers() {
      const triggers = {};
      Triggers_store.triggers.value.forEach(t => {
        triggers[`${t.idtrigger}`] = t.name;
      });
      return triggers;
    },
    isLoading() {
      return Tags_store.isLoading.value;
    },
    isUpdating() {
      return Tags_store.isUpdating.value;
    },
    tags() {
      return Tags_store.tags.value;
    },
    sortedTags() {
      const searchFilter = this.tagSearch.toLowerCase();
      // look through string properties of tags for values that have searchFilter in them
      // (mimics angularjs filter() filter)
      const result = [...this.tags].filter(h => Object.keys(h).some(propName => {
        const entity = h;
        let propValue = '';
        if (typeof entity[propName] === 'string') {
          propValue = entity[propName];
        } else if (propName === 'typeMetadata') {
          const propTypeMeta = entity.typeMetadata;
          propValue = propTypeMeta.name;
        } else if (propName === 'fire_trigger_ids') {
          if (this.triggers && entity.fire_trigger_ids) {
            Object.values(entity.fire_trigger_ids).forEach(value => {
              if (this.triggers[value]) {
                propValue += `${this.triggers[value]} `;
              }
            });
          }
        } else if (propName === 'parameters' && entity.type === 'CustomHtml') {
          const propTypeParameters = entity.parameters;
          propValue = propTypeParameters.customHtml;
        }
        return propValue.toLowerCase().indexOf(searchFilter) !== -1;
      }));
      result.sort((lhs, rhs) => {
        if (lhs.name < rhs.name) {
          return -1;
        }
        return lhs.name > rhs.name ? 1 : 0;
      });
      return result;
    },
    nameTranslatedText() {
      return this.translate('TagManager_TagsNameDescription');
    },
    descriptionTranslatedText() {
      return this.translate('TagManager_TagsDescriptionDescription');
    },
    typeTranslatedText() {
      return this.translate('TagManager_TagsTypeDescription');
    },
    triggersTranslatedText() {
      return this.translate('TagManager_TagsTriggersDescription');
    },
    lastUpdatedTranslatedText() {
      return this.translate('TagManager_TagsLastUpdatedDescription');
    },
    actionTranslatedText() {
      return this.translate('TagManager_TagsActionDescription');
    },
    getActionClasses() {
      const copyClass = this.hasPublishCapability() ? ' hasCopyAction' : '';
      return `action${copyClass}`;
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagList.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagList.vue



TagListvue_type_script_lang_ts.render = TagListvue_type_template_id_23672444_render

/* harmony default export */ var TagList = (TagListvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Tag/TagManage.vue?vue&type=template&id=02e1fe94

const TagManagevue_type_template_id_02e1fe94_hoisted_1 = {
  class: "manageTag"
};
const TagManagevue_type_template_id_02e1fe94_hoisted_2 = {
  key: 0
};
const TagManagevue_type_template_id_02e1fe94_hoisted_3 = {
  key: 1
};
function TagManagevue_type_template_id_02e1fe94_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_TagList = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("TagList");
  const _component_TagEdit = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("TagEdit");
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

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Tag/TagManage.vue?vue&type=script&lang=ts




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
  data() {
    return {
      isAddAllowed: false
    };
  },
  created() {
    // doing this in a watch because we don't want to post an event in a computed property
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["watch"])(() => external_CoreHome_["MatomoUrl"].hashParsed.value.idTag, idTag => {
      this.onIdTagParamChange(idTag);
    });
    external_CoreHome_["NotificationsStore"].remove('tagtagmanagement');
    this.onIdTagParamChange(external_CoreHome_["MatomoUrl"].hashParsed.value.idTag);
  },
  methods: {
    onIdTagParamChange(idTag) {
      // for BC w/ angularjs only invoke event if idTag is 0
      if (idTag === '0') {
        const parameters = {
          isAllowed: true
        };
        external_CoreHome_["Matomo"].postEvent('TagManager.initAddTag', parameters);
        this.isAddAllowed = !!parameters.isAllowed;
      }
    }
  },
  computed: {
    idTag() {
      const idTag = external_CoreHome_["MatomoUrl"].hashParsed.value.idTag;
      if (!this.isAddAllowed && idTag === '0') {
        return null;
      }
      return idTag ? parseInt(idTag, 10) : idTag;
    },
    editMode() {
      return typeof this.idTag === 'number';
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagManage.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Tag/TagManage.vue



TagManagevue_type_script_lang_ts.render = TagManagevue_type_template_id_02e1fe94_render

/* harmony default export */ var TagManage = (TagManagevue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Version/VersionEdit.vue?vue&type=template&id=5988da06

const VersionEditvue_type_template_id_5988da06_hoisted_1 = {
  class: "editVersion tagManagerManageEdit"
};
const VersionEditvue_type_template_id_5988da06_hoisted_2 = {
  class: "loadingPiwik"
};
const VersionEditvue_type_template_id_5988da06_hoisted_3 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);
const VersionEditvue_type_template_id_5988da06_hoisted_4 = {
  class: "loadingPiwik"
};
const VersionEditvue_type_template_id_5988da06_hoisted_5 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);
const VersionEditvue_type_template_id_5988da06_hoisted_6 = {
  key: 0
};
const VersionEditvue_type_template_id_5988da06_hoisted_7 = {
  key: 0
};
const VersionEditvue_type_template_id_5988da06_hoisted_8 = {
  key: 1
};
const VersionEditvue_type_template_id_5988da06_hoisted_9 = ["innerHTML"];
const VersionEditvue_type_template_id_5988da06_hoisted_10 = {
  key: 2,
  class: "versionChanges"
};
const VersionEditvue_type_template_id_5988da06_hoisted_11 = {
  key: 0
};
const VersionEditvue_type_template_id_5988da06_hoisted_12 = {
  colspan: "4"
};
const VersionEditvue_type_template_id_5988da06_hoisted_13 = {
  key: 1
};
const VersionEditvue_type_template_id_5988da06_hoisted_14 = {
  colspan: "4"
};
const VersionEditvue_type_template_id_5988da06_hoisted_15 = {
  class: "lastUpdated"
};
const VersionEditvue_type_template_id_5988da06_hoisted_16 = {
  class: "entityCancel"
};
function VersionEditvue_type_template_id_5988da06_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");
  const _component_SaveButton = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("SaveButton");
  const _component_ActivityIndicator = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ActivityIndicator");
  const _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");
  const _directive_content_table = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("content-table");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VersionEditvue_type_template_id_5988da06_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: "Tag Manager",
    "content-title": _ctx.editTitle
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => {
      var _ctx$version$environm;
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", VersionEditvue_type_template_id_5988da06_hoisted_2, [VersionEditvue_type_template_id_5988da06_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_LoadingData')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isLoading]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", VersionEditvue_type_template_id_5988da06_hoisted_4, [VersionEditvue_type_template_id_5988da06_hoisted_5, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_UpdatingData')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isUpdating]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("form", {
        onSubmit: _cache[6] || (_cache[6] = $event => _ctx.edit ? _ctx.updateVersion() : _ctx.createVersion())
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [_ctx.hasPublishCapability() || _ctx.hasWriteCapability() && _ctx.hasPublishToLiveCapability() ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VersionEditvue_type_template_id_5988da06_hoisted_6, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "text",
        name: "name",
        "inline-help": _ctx.versionNameHelpText,
        "inline-help-bind": {
          lastVersion: _ctx.lastVersion
        },
        "model-value": _ctx.version.name,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => {
          _ctx.version.name = $event;
          _ctx.setValueHasChanged();
        }),
        maxlength: 50,
        title: _ctx.translate('TagManager_VersionName'),
        placeholder: _ctx.translate('TagManager_VersionNamePlaceholder')
      }, null, 8, ["inline-help", "inline-help-bind", "model-value", "title", "placeholder"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "textarea",
        name: "description",
        "model-value": _ctx.version.description,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => {
          _ctx.version.description = $event;
          _ctx.setValueHasChanged();
        }),
        title: _ctx.translate('TagManager_VersionDescriptionOptional'),
        "inline-help": _ctx.translate('TagManager_VersionDescriptionHelp'),
        placeholder: _ctx.translate('TagManager_VersionDescriptionPlaceholder')
      }, null, 8, ["model-value", "title", "inline-help", "placeholder"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_SaveButton, {
        class: "createButton no-publish",
        onConfirm: _cache[2] || (_cache[2] = $event => _ctx.edit ? _ctx.updateVersion() : _ctx.createVersion()),
        disabled: _ctx.isUpdating || !_ctx.isDirty,
        saving: _ctx.isUpdating,
        value: _ctx.edit ? _ctx.translate('CoreUpdater_UpdateTitle') : _ctx.translate('TagManager_CreateVersionWithoutPublishing')
      }, null, 8, ["disabled", "saving", "value"]), _ctx.create && _ctx.environments.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VersionEditvue_type_template_id_5988da06_hoisted_7, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "select",
        name: "environment",
        "inline-help": _ctx.selectTagManagerEnvironmentHelp,
        "inline-help-bind": {
          canPublishToLive: _ctx.canPublishToLive
        },
        "model-value": (_ctx$version$environm = _ctx.version.environments) === null || _ctx$version$environm === void 0 ? void 0 : _ctx$version$environm[0],
        "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => {
          _ctx.version.environments[0] = $event;
          _ctx.setValueHasChanged();
        }),
        options: _ctx.environments,
        introduction: _ctx.translate('TagManager_OrCreateAndPublishVersion'),
        title: _ctx.translate('TagManager_Environment')
      }, null, 8, ["inline-help", "inline-help-bind", "model-value", "options", "introduction", "title"])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.create && _ctx.environments.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_SaveButton, {
        key: 1,
        class: "publishButton",
        onConfirm: _cache[4] || (_cache[4] = $event => _ctx.createVersionAndPublish()),
        disabled: _ctx.isUpdating || !_ctx.isDirty,
        saving: _ctx.isUpdating,
        value: _ctx.translate('TagManager_CreateVersionAndPublishRelease')
      }, null, 8, ["disabled", "saving", "value"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VersionEditvue_type_template_id_5988da06_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
        class: "alert alert-warning",
        innerHTML: _ctx.$sanitize(_ctx.showNoAccessErrorMessage)
      }, null, 8, VersionEditvue_type_template_id_5988da06_hoisted_9)])), _ctx.lastVersion ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VersionEditvue_type_template_id_5988da06_hoisted_10, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ChangesSinceLastVersion')) + ":", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("table", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('SitesManager_Type')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Name')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Change')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_LastUpdated')), 1)])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [_ctx.isLoadingVersionChanges ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", VersionEditvue_type_template_id_5988da06_hoisted_11, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VersionEditvue_type_template_id_5988da06_hoisted_12, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ActivityIndicator, {
        "loading-message": _ctx.translate('TagManager_DetectingChanges'),
        loading: true
      }, null, 8, ["loading-message"])])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), !_ctx.versionChanges.length && !_ctx.isLoadingVersionChanges ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", VersionEditvue_type_template_id_5988da06_hoisted_13, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VersionEditvue_type_template_id_5988da06_hoisted_14, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('UserCountryMap_None')), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.versionChanges, (versionChange, index) => {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
          key: index
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate(versionChange.entityType)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(versionChange.name), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate(versionChange.type)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VersionEditvue_type_template_id_5988da06_hoisted_15, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(versionChange.lastChanged), 1)])]);
      }), 128))])])), [[_directive_content_table]])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VersionEditvue_type_template_id_5988da06_hoisted_16, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        onClick: _cache[5] || (_cache[5] = $event => _ctx.cancel())
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Cancel')), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isEmbedded]])])], 32)];
    }),
    _: 1
  }, 8, ["content-title"])]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionEdit.vue?vue&type=template&id=5988da06

// CONCATENATED MODULE: ./plugins/TagManager/vue/src/AvailableEnvironments.store.ts
function AvailableEnvironments_store_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


class AvailableEnvironments_store_AvailableEnvironmentStore {
  constructor() {
    AvailableEnvironments_store_defineProperty(this, "privateState", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      environmentsWithPublish: [],
      isLoading: false
    }));
    AvailableEnvironments_store_defineProperty(this, "state", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(this.privateState)));
    AvailableEnvironments_store_defineProperty(this, "isLoading", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => this.state.value.isLoading));
    AvailableEnvironments_store_defineProperty(this, "environmentsWithPublish", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => this.state.value.environmentsWithPublish));
    AvailableEnvironments_store_defineProperty(this, "environmentsWithPublishOptions", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => this.environmentsWithPublish.value.map(
    // eslint-disable-next-line
    ({
      id,
      name,
      disabled
    }) => ({
      key: id,
      value: name,
      disabled: false
    }))));
    AvailableEnvironments_store_defineProperty(this, "initializePromise", null);
  }
  init() {
    if (!this.initializePromise) {
      this.initializePromise = this.fetchEnvironments();
    }
    return this.initializePromise;
  }
  fetchEnvironments() {
    this.privateState.isLoading = true;
    return external_CoreHome_["AjaxHelper"].fetch({
      method: 'TagManager.getAvailableEnvironmentsWithPublishCapability',
      filter_limit: '-1'
    }).then(environmentsWithPublish => {
      let entities;
      if (Array.isArray(environmentsWithPublish)) {
        entities = environmentsWithPublish;
      } else {
        entities = Object.values(environmentsWithPublish);
      }
      this.privateState.environmentsWithPublish = entities;
    }).finally(() => {
      this.privateState.isLoading = false;
    });
  }
}
/* harmony default export */ var AvailableEnvironments_store = (new AvailableEnvironments_store_AvailableEnvironmentStore());
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/diffDraftVersion.ts
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

function diffDraftVersion(idContainer, idContainerVersionNew, idContainerVersionPrevious) {
  function findEntryInArray(array, name) {
    return array.find(v => v.name === name);
  }
  function getDifference(entityType, array1, array2, keysToCheck) {
    const diff = [];
    array1.forEach(array1Item => {
      const matchingEntry = findEntryInArray(array2, array1Item.name);
      if (matchingEntry) {
        keysToCheck.some(key => {
          if (JSON.stringify(array1Item[key]) !== JSON.stringify(matchingEntry[key])) {
            // matching, check if different
            diff.push({
              entityType,
              type: key === 'status' && array1Item[key] === 'paused' ? 'TagManager_DiffPaused' : 'TagManager_DiffModified',
              name: array1Item.name,
              lastChanged: array1Item.updated_date_pretty
            });
            return true;
          }
          return false;
        });
        return;
      }
      if (array1Item.status === 'paused') {
        diff.push({
          entityType,
          type: 'TagManager_DiffAddedPaused',
          name: array1Item.name,
          lastChanged: array1Item.updated_date_pretty
        });
      } else {
        diff.push({
          entityType,
          type: 'TagManager_DiffAdded',
          name: array1Item.name,
          lastChanged: array1Item.updated_date_pretty
        });
      }
    });
    array2.forEach(array2Item => {
      if (!findEntryInArray(array1, array2Item.name)) {
        diff.push({
          entityType,
          type: 'TagManager_DiffDeleted',
          name: array2Item.name,
          lastChanged: array2Item.updated_date_pretty
        });
      }
    });
    return diff;
  }
  function mixinTagTriggers(tags, triggers) {
    tags.forEach(tag => {
      tag.fire_triggers = [];
      tag.block_triggers = [];
      tag.fire_trigger_ids.forEach(idtrigger => {
        const trigger = triggers.find(t => t.idtrigger === idtrigger);
        if (trigger) {
          tag.fire_triggers.push(trigger.name);
        }
      });
      tag.block_trigger_ids.forEach(idtrigger => {
        const trigger = triggers.find(t => t.idtrigger === idtrigger);
        if (trigger) {
          tag.block_triggers.push(trigger.name);
        }
      });
    });
  }
  const draftVersion = {
    module: 'API',
    method: 'TagManager.exportContainerVersion',
    format: 'json',
    idContainer,
    filter_limit: -1
  };
  if (idContainerVersionNew) {
    draftVersion.idContainerVersion = idContainerVersionNew;
  }
  const lastVersion = {
    module: 'API',
    method: 'TagManager.exportContainerVersion',
    format: 'json',
    idContainer,
    idContainerVersion: idContainerVersionPrevious,
    filter_limit: -1
  };
  return external_CoreHome_["AjaxHelper"].fetch([draftVersion, lastVersion]).then(([draft, last]) => {
    mixinTagTriggers(draft.tags, draft.triggers);
    mixinTagTriggers(last.tags, last.triggers);
    const diff1 = getDifference('TagManager_Tag', draft.tags, last.tags, ['name', 'type', 'fire_limit', 'priority', 'fire_delay', 'fire_triggers', 'block_triggers', 'parameters', 'status']);
    const diff2 = getDifference('TagManager_Trigger', draft.triggers, last.triggers, ['name', 'type', 'conditions', 'parameters']);
    const diff3 = getDifference('TagManager_Variable', draft.variables, last.variables, ['name', 'type', 'lookup_table', 'default_value', 'parameters']);
    return [...diff1, ...diff2, ...diff3];
  });
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/Versions.store.ts
function Versions_store_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


class Versions_store_VersionsStore {
  constructor() {
    Versions_store_defineProperty(this, "privateState", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      versions: [],
      isLoadingVersions: false,
      isLoadingSingle: false,
      isUpdating: false
    }));
    Versions_store_defineProperty(this, "state", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(this.privateState)));
    Versions_store_defineProperty(this, "isLoading", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
      const state = this.state.value;
      return state.isLoadingVersions || state.isLoadingSingle;
    }));
    Versions_store_defineProperty(this, "isUpdating", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => this.state.value.isUpdating));
    Versions_store_defineProperty(this, "versions", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => this.state.value.versions));
    Versions_store_defineProperty(this, "fetchPromise", null);
  }
  reload(idContainer) {
    this.privateState.versions = [];
    this.fetchPromise = null;
    return this.fetchVersions(idContainer);
  }
  fetchVersions(idContainer) {
    this.privateState.isLoadingVersions = true;
    this.privateState.versions = [];
    if (!this.fetchPromise) {
      this.fetchPromise = external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainerVersions',
        idContainer,
        filter_limit: '-1'
      });
    }
    return Promise.resolve(this.fetchPromise).then(versions => {
      this.privateState.versions = versions;
      this.privateState.isLoadingVersions = false;
      return this.versions.value;
    }).finally(() => {
      this.privateState.isLoadingVersions = false;
    });
  }
  findVersion(idContainer, idContainerVersion) {
    // before going through an API request we first try to find it in loaded versions
    const found = this.versions.value.find(v => v.idcontainerversion === idContainerVersion);
    if (found) {
      return Promise.resolve(found);
    }
    // otherwise we fetch it via API
    this.privateState.isLoadingSingle = true;
    return external_CoreHome_["AjaxHelper"].fetch({
      idContainerVersion,
      idContainer,
      method: 'TagManager.getContainerVersion',
      filter_limit: '-1'
    }).then(record => {
      this.privateState.versions = [...this.privateState.versions, record];
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(record);
    }).finally(() => {
      this.privateState.isLoadingSingle = false;
    });
  }
  deleteVersion(idContainer, idContainerVersion) {
    this.privateState.isUpdating = true;
    this.privateState.versions = [];
    return external_CoreHome_["AjaxHelper"].fetch({
      idContainerVersion,
      idContainer,
      method: 'TagManager.deleteContainerVersion'
    }, {
      withTokenInUrl: true
    }).finally(() => {
      this.privateState.isUpdating = false;
    });
  }
  publishVersion(idContainer, idContainerVersion, environment) {
    this.privateState.isUpdating = true;
    return external_CoreHome_["AjaxHelper"].fetch({
      idContainer,
      idContainerVersion,
      environment,
      method: 'TagManager.publishContainerVersion'
    }).finally(() => {
      this.privateState.isUpdating = false;
    });
  }
  createOrUpdateVersion(version, method, idContainer) {
    this.privateState.isUpdating = true;
    return external_CoreHome_["AjaxHelper"].post({
      method,
      idContainer,
      idContainerVersion: version.idcontainerversion
    }, {
      name: version.name,
      description: version.description
    }, {
      withTokenInUrl: true
    }).finally(() => {
      this.privateState.isUpdating = false;
    });
  }
}
/* harmony default export */ var Versions_store = (new Versions_store_VersionsStore());
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Version/VersionNameHelpText.vue?vue&type=template&id=acc4c29a

const VersionNameHelpTextvue_type_template_id_acc4c29a_hoisted_1 = {
  id: "versionNameHelpText",
  class: "inline-help-node"
};
const VersionNameHelpTextvue_type_template_id_acc4c29a_hoisted_2 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);
const VersionNameHelpTextvue_type_template_id_acc4c29a_hoisted_3 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);
const VersionNameHelpTextvue_type_template_id_acc4c29a_hoisted_4 = ["innerHTML"];
function VersionNameHelpTextvue_type_template_id_acc4c29a_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VersionNameHelpTextvue_type_template_id_acc4c29a_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_VersionNameHelp')) + " ", 1), VersionNameHelpTextvue_type_template_id_acc4c29a_hoisted_2, VersionNameHelpTextvue_type_template_id_acc4c29a_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
    innerHTML: _ctx.$sanitize(_ctx.translate('TagManager_NameOfLatestVersion', `<strong>${_ctx.lastVersion}</strong>`))
  }, null, 8, VersionNameHelpTextvue_type_template_id_acc4c29a_hoisted_4), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.lastVersion]])]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionNameHelpText.vue?vue&type=template&id=acc4c29a

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Version/VersionNameHelpText.vue?vue&type=script&lang=ts

/* harmony default export */ var VersionNameHelpTextvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    lastVersion: String
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionNameHelpText.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionNameHelpText.vue



VersionNameHelpTextvue_type_script_lang_ts.render = VersionNameHelpTextvue_type_template_id_acc4c29a_render

/* harmony default export */ var VersionNameHelpText = (VersionNameHelpTextvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Version/SelectTagManagerEnvironmentHelpText.vue?vue&type=template&id=40d41b93

const SelectTagManagerEnvironmentHelpTextvue_type_template_id_40d41b93_hoisted_1 = {
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

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Version/SelectTagManagerEnvironmentHelpText.vue?vue&type=script&lang=ts

/* harmony default export */ var SelectTagManagerEnvironmentHelpTextvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    canPublishToLive: Boolean
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/SelectTagManagerEnvironmentHelpText.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/SelectTagManagerEnvironmentHelpText.vue



SelectTagManagerEnvironmentHelpTextvue_type_script_lang_ts.render = SelectTagManagerEnvironmentHelpTextvue_type_template_id_40d41b93_render

/* harmony default export */ var SelectTagManagerEnvironmentHelpText = (SelectTagManagerEnvironmentHelpTextvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Version/VersionEdit.vue?vue&type=script&lang=ts










const VersionEditvue_type_script_lang_ts_notificationId = 'versiontagmanagement';
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
  data() {
    return {
      isDirty: false,
      lastVersion: null,
      versionChanges: [],
      isLoadingVersionChanges: false,
      isUpdatingVersion: false,
      version: {}
    };
  },
  emits: ['changeVersion'],
  created() {
    AvailableComparisons_store.init();
    AvailableEnvironments_store.init();
    this.initIdContainerVersion();
  },
  watch: {
    idContainerVersion(newValue) {
      if (newValue === null) {
        return;
      }
      this.initIdContainerVersion();
    }
  },
  methods: {
    removeAnyVersionNotification() {
      external_CoreHome_["NotificationsStore"].remove(VersionEditvue_type_script_lang_ts_notificationId);
      external_CoreHome_["NotificationsStore"].remove('ajaxHelper');
    },
    showNotification(message, context, type = null) {
      const notificationInstanceId = external_CoreHome_["NotificationsStore"].show({
        message,
        context,
        id: VersionEditvue_type_script_lang_ts_notificationId,
        type: type !== null ? type : 'toast'
      });
      setTimeout(() => {
        external_CoreHome_["NotificationsStore"].scrollToNotification(notificationInstanceId);
      }, 200);
    },
    showErrorFieldNotProvidedNotification(title) {
      const message = Object(external_CoreHome_["translate"])('TagManager_ErrorXNotProvided', [title]);
      this.showNotification(message, 'error');
    },
    initIdContainerVersion() {
      this.version = {};
      this.lastVersion = null;
      this.versionChanges = [];
      this.isLoadingVersionChanges = true;
      Versions_store.fetchVersions(this.idContainer).then(() => {
        var _versions$;
        this.isLoadingVersionChanges = false;
        this.lastVersion = null;
        const versions = [...Versions_store.versions.value];
        if (!(versions !== null && versions !== void 0 && versions.length)) {
          return;
        }
        versions.sort((a, b) => a.revision < b.revision ? 1 : 0);
        let lastContainerVersion = null;
        if (this.create && (_versions$ = versions[0]) !== null && _versions$ !== void 0 && _versions$.name) {
          this.lastVersion = external_CoreHome_["Matomo"].helper.htmlEntities(versions[0].name);
          lastContainerVersion = versions[0].idcontainerversion;
        } else if (this.edit) {
          versions.forEach((v, i) => {
            // we stop before the last one because it cannot have an entry
            if (i >= versions.length - 1) {
              return;
            }
            if (v.idcontainerversion === this.idContainerVersion && versions[i + 1]) {
              this.lastVersion = external_CoreHome_["Matomo"].helper.htmlEntities(versions[i + 1].name);
              lastContainerVersion = versions[i + 1].idcontainerversion;
            }
          });
        }
        if (this.lastVersion) {
          this.isLoadingVersionChanges = true;
          diffDraftVersion(this.idContainer, this.idContainerVersion, lastContainerVersion).then(diff => {
            diff.sort((a, b) => new Date(b.lastChanged).valueOf() - new Date(a.lastChanged).valueOf());
            this.versionChanges = diff;
            this.isLoadingVersionChanges = false;
          });
          if (this.create && !this.version.name && /^\d+$/.test(this.lastVersion)) {
            this.version.name = `${parseInt(this.lastVersion, 10) + 1}`;
            this.isDirty = true;
          }
        }
      });
      external_CoreHome_["Matomo"].helper.lazyScrollToContent();
      if (this.edit && this.idContainerVersion) {
        Versions_store.findVersion(this.idContainer, this.idContainerVersion).then(version => {
          if (!version) {
            return;
          }
          this.version = Object(external_CoreHome_["clone"])(version);
          this.isDirty = false;
        });
        return;
      }
      if (this.create) {
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
          const notLive = this.environments.find(obj => obj.key !== 'live');
          this.version.environments = notLive ? [notLive.key] : [];
        }
        this.isDirty = false;
      }
    },
    cancel() {
      const newParams = Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value);
      delete newParams.idContainerVersion;
      external_CoreHome_["MatomoUrl"].updateHash(newParams);
    },
    createVersion() {
      this.removeAnyVersionNotification();
      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }
      this.isUpdatingVersion = true;
      Versions_store.createOrUpdateVersion(this.version, 'TagManager.createContainerVersion', this.idContainer).then(response => {
        if (!response) {
          return;
        }
        this.isDirty = false;
        const idContainerVersion = response.value;
        if (this.isEmbedded) {
          this.version.idcontainerversion = idContainerVersion;
          this.$emit('changeVersion', {
            version: this.version
          });
        }
        Versions_store.reload(this.idContainer).then(() => {
          if (this.isEmbedded) {
            external_CoreHome_["MatomoUrl"].updateHash(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value));
          } else {
            external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
              idContainerVersion
            }));
          }
          setTimeout(() => {
            const createdX = Object(external_CoreHome_["translate"])('TagManager_CreatedX', Object(external_CoreHome_["translate"])('TagManager_Version'));
            if (this.hasPublishCapability()) {
              const wantToRedeploy = Object(external_CoreHome_["translate"])('TagManager_WantToDeployThisChangeCreateVersion', '<a class="createNewVersionLink">', '</a>');
              this.showNotification(`${createdX} ${wantToRedeploy}`, 'success', 'transient');
              return;
            }
            this.showNotification(createdX, 'success');
          }, 200);
        });
      }).finally(() => {
        this.isUpdatingVersion = false;
      });
    },
    createVersionAndPublish() {
      this.removeAnyVersionNotification();
      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }
      this.isUpdatingVersion = true;
      Versions_store.createOrUpdateVersion(this.version, 'TagManager.createContainerVersion', this.idContainer).then(response => {
        if (!response) {
          return null;
        }
        const idContainerVersion = response.value;
        this.version.idcontainerversion = idContainerVersion;
        return Versions_store.publishVersion(this.idContainer, idContainerVersion, this.version.environments[0]).then(() => {
          this.isDirty = false;
          if (this.isEmbedded) {
            this.$emit('changeVersion', {
              version: this.version
            });
          }
          Versions_store.reload(this.idContainer).then(() => {
            if (this.isEmbedded) {
              external_CoreHome_["MatomoUrl"].updateHash(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value));
            } else {
              external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
                idContainerVersion
              }));
            }
            setTimeout(() => {
              this.showNotification(Object(external_CoreHome_["translate"])('TagManager_VersionPublishSuccess'), 'success');
            }, 200);
          });
        });
      }).finally(() => {
        this.isUpdatingVersion = false;
      });
    },
    setValueHasChanged() {
      this.isDirty = true;
    },
    updateVersion() {
      this.removeAnyVersionNotification();
      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }
      this.isUpdatingVersion = true;
      Versions_store.createOrUpdateVersion(this.version, 'TagManager.updateContainerVersion', this.idContainer).then(response => {
        if (!response) {
          return;
        }
        if (this.isEmbedded) {
          this.$emit('changeVersion', {
            version: this.version
          });
          return;
        }
        this.isDirty = false;
        this.version = {};
        Versions_store.reload(this.idContainer).then(() => {
          this.initIdContainerVersion();
        });
        this.showNotification(Object(external_CoreHome_["translate"])('TagManager_UpdatedX', Object(external_CoreHome_["translate"])('TagManager_Version')), 'success');
      }).finally(() => {
        this.isUpdatingVersion = false;
      });
    },
    checkRequiredFieldsAreSet() {
      if (!this.version.name) {
        const title = Object(external_CoreHome_["translate"])('General_Name');
        this.showErrorFieldNotProvidedNotification(title);
        return false;
      }
      return true;
    },
    hasPublishCapability() {
      return this.hasWriteCapability() && external_CoreHome_["Matomo"].hasUserCapability('tagmanager_use_custom_templates');
    },
    hasWriteCapability() {
      return external_CoreHome_["Matomo"].hasUserCapability('tagmanager_write');
    },
    hasPublishToLiveCapability() {
      return external_CoreHome_["Matomo"].hasUserCapability('tagmanager_publish_live_container');
    }
  },
  computed: {
    create() {
      return this.idContainerVersion === 0;
    },
    edit() {
      return !this.create;
    },
    isLoading() {
      return Variables_store.isLoading.value || AvailableComparisons_store.isLoading.value;
    },
    isUpdating() {
      return Variables_store.isUpdating.value || this.isUpdatingVersion;
    },
    environments() {
      const environments = AvailableEnvironments_store.environmentsWithPublishOptions.value;
      if (!this.canPublishToLive) {
        // If the user can't publish to live, disable that option.
        const liveIndex = environments.findIndex(obj => obj.key === 'live');
        if (liveIndex > -1) {
          environments[liveIndex].disabled = true;
        }
      }
      return environments;
    },
    canPublishToLive() {
      return external_CoreHome_["Matomo"].hasUserCapability('tagmanager_publish_live_container');
    },
    versionNameHelpText() {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["markRaw"])(VersionNameHelpText);
    },
    selectTagManagerEnvironmentHelp() {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["markRaw"])(SelectTagManagerEnvironmentHelpText);
    },
    editTitle() {
      return this.create ? Object(external_CoreHome_["translate"])('TagManager_CreateNewVersion') : Object(external_CoreHome_["translate"])('TagManager_EditVersion');
    },
    showNoAccessErrorMessage() {
      return Object(external_CoreHome_["translate"])('TagManager_VersionEditWithNoAccessMessage', Object(external_CoreHome_["externalLink"])('https://matomo.org/faq/tag-manager/faq_26547/'), '</a>');
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionEdit.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionEdit.vue



VersionEditvue_type_script_lang_ts.render = VersionEditvue_type_template_id_5988da06_render

/* harmony default export */ var VersionEdit = (VersionEditvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Version/VersionList.vue?vue&type=template&id=a804e98a

const VersionListvue_type_template_id_a804e98a_hoisted_1 = {
  class: "tagManagerManageList tagManagerVersionList"
};
const VersionListvue_type_template_id_a804e98a_hoisted_2 = {
  class: "versionSearchFilter"
};
const VersionListvue_type_template_id_a804e98a_hoisted_3 = ["title"];
const VersionListvue_type_template_id_a804e98a_hoisted_4 = ["title"];
const VersionListvue_type_template_id_a804e98a_hoisted_5 = ["title"];
const VersionListvue_type_template_id_a804e98a_hoisted_6 = ["title"];
const VersionListvue_type_template_id_a804e98a_hoisted_7 = ["title"];
const VersionListvue_type_template_id_a804e98a_hoisted_8 = ["title"];
const VersionListvue_type_template_id_a804e98a_hoisted_9 = {
  colspan: "7"
};
const VersionListvue_type_template_id_a804e98a_hoisted_10 = {
  class: "loadingPiwik"
};
const VersionListvue_type_template_id_a804e98a_hoisted_11 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);
const VersionListvue_type_template_id_a804e98a_hoisted_12 = {
  colspan: "7"
};
const VersionListvue_type_template_id_a804e98a_hoisted_13 = ["id"];
const VersionListvue_type_template_id_a804e98a_hoisted_14 = {
  class: "index"
};
const VersionListvue_type_template_id_a804e98a_hoisted_15 = ["title"];
const VersionListvue_type_template_id_a804e98a_hoisted_16 = ["title"];
const VersionListvue_type_template_id_a804e98a_hoisted_17 = {
  class: "environments"
};
const VersionListvue_type_template_id_a804e98a_hoisted_18 = ["title"];
const VersionListvue_type_template_id_a804e98a_hoisted_19 = {
  class: "created"
};
const VersionListvue_type_template_id_a804e98a_hoisted_20 = {
  class: "action"
};
const VersionListvue_type_template_id_a804e98a_hoisted_21 = ["onClick", "title"];
const VersionListvue_type_template_id_a804e98a_hoisted_22 = ["onClick", "title"];
const VersionListvue_type_template_id_a804e98a_hoisted_23 = ["onClick", "href", "title"];
const VersionListvue_type_template_id_a804e98a_hoisted_24 = ["onClick", "title"];
const VersionListvue_type_template_id_a804e98a_hoisted_25 = ["onClick", "title"];
const VersionListvue_type_template_id_a804e98a_hoisted_26 = {
  class: "tableActionBar"
};
const VersionListvue_type_template_id_a804e98a_hoisted_27 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, " ", -1);
const VersionListvue_type_template_id_a804e98a_hoisted_28 = ["href"];
const VersionListvue_type_template_id_a804e98a_hoisted_29 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-export"
}, " ", -1);
const VersionListvue_type_template_id_a804e98a_hoisted_30 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-upload"
}, " ", -1);
const VersionListvue_type_template_id_a804e98a_hoisted_31 = {
  class: "ui-confirm",
  id: "confirmDeleteVersion",
  ref: "confirmDeleteVersion"
};
const VersionListvue_type_template_id_a804e98a_hoisted_32 = ["value"];
const VersionListvue_type_template_id_a804e98a_hoisted_33 = ["value"];
const VersionListvue_type_template_id_a804e98a_hoisted_34 = {
  class: "ui-confirm",
  id: "confirmPublishVersion",
  ref: "confirmPublishVersion"
};
const VersionListvue_type_template_id_a804e98a_hoisted_35 = {
  key: 0,
  class: "alert alert-info",
  style: {
    "margin-top": "16px"
  }
};
const VersionListvue_type_template_id_a804e98a_hoisted_36 = ["value"];
const VersionListvue_type_template_id_a804e98a_hoisted_37 = ["value"];
function VersionListvue_type_template_id_a804e98a_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _ctx$versionToBePubli;
  const _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");
  const _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");
  const _directive_content_table = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("content-table");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VersionListvue_type_template_id_a804e98a_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: "Tag Manager",
    "content-title": _ctx.translate('TagManager_ManageX', _ctx.translate('TagManager_Versions')),
    "help-text": _ctx.versionsHelpText
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_VersionUsageBenefits')) + " " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ConfigureEnvironmentsSuperUser')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VersionListvue_type_template_id_a804e98a_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
      uicontrol: "text",
      name: "versionSearch",
      title: _ctx.translate('General_Search'),
      modelValue: _ctx.versionSearch,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => _ctx.versionSearch = $event)
    }, null, 8, ["title", "modelValue"]), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.versions.length > 0]])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("table", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
      class: "index",
      title: _ctx.revisionTranslatedText
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Revision')), 9, VersionListvue_type_template_id_a804e98a_hoisted_3), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
      class: "name",
      title: _ctx.nameTranslatedText
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Name')), 9, VersionListvue_type_template_id_a804e98a_hoisted_4), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
      class: "description",
      title: _ctx.descriptionTranslatedText
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Description')), 9, VersionListvue_type_template_id_a804e98a_hoisted_5), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
      class: "environments",
      title: _ctx.environmentTranslatedText
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Environments')), 9, VersionListvue_type_template_id_a804e98a_hoisted_6), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
      class: "created",
      title: _ctx.createdTranslatedText
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Created')), 9, VersionListvue_type_template_id_a804e98a_hoisted_7), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", {
      class: "action",
      title: _ctx.actionTranslatedText
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Actions')), 9, VersionListvue_type_template_id_a804e98a_hoisted_8)])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VersionListvue_type_template_id_a804e98a_hoisted_9, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", VersionListvue_type_template_id_a804e98a_hoisted_10, [VersionListvue_type_template_id_a804e98a_hoisted_11, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_LoadingData')), 1)])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isLoading || _ctx.isUpdating]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VersionListvue_type_template_id_a804e98a_hoisted_12, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_NoVersionsFound')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      class: "createContainerVersionNow",
      onClick: _cache[1] || (_cache[1] = $event => _ctx.createVersion())
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewVersionNow')), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess && _ctx.hasCustomTemplatesCapability]])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isLoading && _ctx.versions.length === 0]]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.sortedVersions, version => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
        id: `version${version.idcontainerversion}`,
        class: "versions",
        key: version.revision
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VersionListvue_type_template_id_a804e98a_hoisted_14, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(version.revision), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
        class: "name",
        title: version.name
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.truncateText(version.name, 50)), 9, VersionListvue_type_template_id_a804e98a_hoisted_15), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
        class: "description",
        title: version.description
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.truncateText(version.description, 75)), 9, VersionListvue_type_template_id_a804e98a_hoisted_16), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VersionListvue_type_template_id_a804e98a_hoisted_17, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(version.releases, (release, index) => {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
          key: index,
          title: _ctx.translate('TagManager_ReleaseInfo', release.release_login, release.release_date_pretty)
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.ucfirst(release.environment)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, ", ", 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], index !== version.releases.length - 1]])], 8, VersionListvue_type_template_id_a804e98a_hoisted_18);
      }), 128))]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VersionListvue_type_template_id_a804e98a_hoisted_19, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(version.created_date_pretty), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", VersionListvue_type_template_id_a804e98a_hoisted_20, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "table-action icon-rocket",
        onClick: $event => _ctx.publishVersion(version),
        title: _ctx.translate('TagManager_PublishVersion', version.name)
      }, null, 8, VersionListvue_type_template_id_a804e98a_hoisted_21), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess && (_ctx.hasCustomTemplatesCapability || _ctx.canPublishToLive)]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "table-action icon-bug",
        onClick: $event => _ctx.enableDebugMode(version.idcontainerversion),
        title: _ctx.translate('TagManager_EnablePreviewDebug')
      }, null, 8, VersionListvue_type_template_id_a804e98a_hoisted_22), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        target: "_blank",
        class: "table-action icon-export",
        onClick: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])($event => {
          _ctx.exportVersion(version.idcontainerversion, version.name);
        }, ["prevent"]),
        href: _ctx.getExportUrl(version),
        title: _ctx.translate('TagManager_ExportX', _ctx.translate('TagManager_Version'))
      }, null, 8, VersionListvue_type_template_id_a804e98a_hoisted_23), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "table-action icon-edit",
        onClick: $event => _ctx.editVersion(version.idcontainerversion),
        title: _ctx.translate('TagManager_EditX', _ctx.translate('TagManager_Version'))
      }, null, 8, VersionListvue_type_template_id_a804e98a_hoisted_24), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "table-action icon-delete",
        onClick: $event => _ctx.deleteVersion(version),
        title: _ctx.translate('TagManager_DeleteX', _ctx.translate('TagManager_Version'))
      }, null, 8, VersionListvue_type_template_id_a804e98a_hoisted_25), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], version.releases.length === 0 && _ctx.hasWriteAccess && _ctx.hasCustomTemplatesCapability]])])], 8, VersionListvue_type_template_id_a804e98a_hoisted_13);
    }), 128))])])), [[_directive_content_table]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VersionListvue_type_template_id_a804e98a_hoisted_26, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      class: "createNewVersion",
      onClick: _cache[2] || (_cache[2] = $event => _ctx.createVersion())
    }, [VersionListvue_type_template_id_a804e98a_hoisted_27, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewVersion')), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess && _ctx.hasCustomTemplatesCapability]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      class: "exportDraft",
      target: "_blank",
      onClick: _cache[3] || (_cache[3] = $event => {
        _ctx.exportVersion(null, 'draft');
        $event.preventDefault();
      }),
      href: _ctx.getExportDraftUrl()
    }, [VersionListvue_type_template_id_a804e98a_hoisted_29, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ExportDraft')), 1)], 8, VersionListvue_type_template_id_a804e98a_hoisted_28), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      class: "importVersion",
      onClick: _cache[4] || (_cache[4] = $event => _ctx.importVersion())
    }, [VersionListvue_type_template_id_a804e98a_hoisted_30, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Import')), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess && _ctx.hasCustomTemplatesCapability]])])]),
    _: 1
  }, 8, ["content-title", "help-text"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VersionListvue_type_template_id_a804e98a_hoisted_31, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_DeleteVersionConfirm')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "yes",
    type: "button",
    value: _ctx.translate('General_Yes')
  }, null, 8, VersionListvue_type_template_id_a804e98a_hoisted_32), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "no",
    type: "button",
    value: _ctx.translate('General_No')
  }, null, 8, VersionListvue_type_template_id_a804e98a_hoisted_33)], 512), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", VersionListvue_type_template_id_a804e98a_hoisted_34, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_PublishVersion', (_ctx$versionToBePubli = _ctx.versionToBePublished) === null || _ctx$versionToBePubli === void 0 ? void 0 : _ctx$versionToBePubli.name)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
    uicontrol: "select",
    name: "environment",
    modelValue: _ctx.availableEnvironmentsToPublish.deployEnvironment,
    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => _ctx.availableEnvironmentsToPublish.deployEnvironment = $event),
    options: _ctx.availableEnvironmentsToPublish.environnments,
    "full-width": true,
    title: _ctx.translate('TagManager_Environment')
  }, null, 8, ["modelValue", "options", "title"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    style: {
      "margin-bottom": "0"
    },
    class: "alert alert-info"
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_PublishLiveEnvironmentCapabilityRequired', _ctx.translate('TagManager_CapabilityPublishLiveContainer'))), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.canPublishToLive]])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.availableEnvironmentsToPublish.environnments.length]]), !_ctx.availableEnvironmentsToPublish.environnments.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VersionListvue_type_template_id_a804e98a_hoisted_35, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_VersionAlreadyPublishedToAllEnvironments')), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "yes",
    type: "button",
    value: _ctx.translate('TagManager_PublishRelease')
  }, null, 8, VersionListvue_type_template_id_a804e98a_hoisted_36), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "no",
    type: "button",
    value: _ctx.translate('General_Cancel')
  }, null, 8, VersionListvue_type_template_id_a804e98a_hoisted_37)], 512)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionList.vue?vue&type=template&id=a804e98a

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Version/VersionList.vue?vue&type=script&lang=ts





const {
  tagManagerHelper: VersionListvue_type_script_lang_ts_tagManagerHelper
} = window;
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
  data() {
    return {
      versionToBePublished: null,
      versionSearch: ''
    };
  },
  created() {
    AvailableEnvironments_store.init();
    Versions_store.fetchVersions(this.idContainer);
  },
  methods: {
    createVersion() {
      this.editVersion(0);
    },
    truncateText(text, length) {
      return VersionListvue_type_script_lang_ts_tagManagerHelper.truncateText(text, length);
    },
    publishVersion(version) {
      this.versionToBePublished = version;
      external_CoreHome_["Matomo"].helper.modalConfirm(this.$refs.confirmPublishVersion, {
        yes: () => {
          const {
            deployEnvironment
          } = this.availableEnvironmentsToPublish;
          if (deployEnvironment) {
            Versions_store.publishVersion(version.idcontainer, version.idcontainerversion, deployEnvironment).then(() => {
              Versions_store.reload(this.idContainer);
            });
          }
        }
      });
    },
    enableDebugMode(idContainerVersion) {
      VersionListvue_type_script_lang_ts_tagManagerHelper.enablePreviewMode(this.idContainer, idContainerVersion);
    },
    exportVersion(idContainerVersion, versionName) {
      const params = {
        module: 'API',
        method: 'TagManager.exportContainerVersion',
        format: 'json',
        idContainer: this.idContainer,
        filter_limit: -1
      };
      if (idContainerVersion) {
        params.idContainerVersion = idContainerVersion;
      }
      let filename = `container_${this.idContainer}`;
      if (versionName) {
        filename += `_${versionName}`;
      }
      external_CoreHome_["AjaxHelper"].fetch(params).then(exportedContainer => {
        external_CoreHome_["Matomo"].helper.sendContentAsDownload(`${filename}.json`, JSON.stringify(exportedContainer));
      });
    },
    editVersion(idContainerVersion) {
      external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
        idContainerVersion
      }));
    },
    importVersion() {
      VersionListvue_type_script_lang_ts_tagManagerHelper.importVersion(this.idContainer);
    },
    deleteVersion(version) {
      const doDelete = () => {
        Versions_store.deleteVersion(this.idContainer, version.idcontainerversion).then(() => {
          Versions_store.reload(this.idContainer);
        });
      };
      external_CoreHome_["Matomo"].helper.modalConfirm(this.$refs.confirmDeleteVersion, {
        yes: doDelete
      });
    },
    ucfirst(s) {
      return `${s.substring(0, 1).toUpperCase()}${s.substring(1)}`;
    },
    getExportUrl(version) {
      return `?module=TagManager&action=exportContainerVersion&idContainer=${this.idContainer}` + `&idContainerVersion=${version.idcontainerversion}&idSite=${version.idsite}` + '&period=day&date=yesterday';
    },
    getExportDraftUrl() {
      return `?module=TagManager&action=exportContainerVersion&idContainer=${this.idContainer}` + `&idSite=${this.idSite}&period=day&date=yesterday`;
    }
  },
  computed: {
    environments() {
      return AvailableEnvironments_store.environmentsWithPublishOptions.value;
    },
    availableEnvironmentsToPublish() {
      let deployEnvironment = '';
      const environnments = this.environments.filter(env => {
        var _this$versionToBePubl, _this$versionToBePubl2;
        if (!((_this$versionToBePubl = this.versionToBePublished) !== null && _this$versionToBePubl !== void 0 && _this$versionToBePubl.releases)) {
          return true;
        }
        const found = (_this$versionToBePubl2 = this.versionToBePublished) === null || _this$versionToBePubl2 === void 0 ? void 0 : _this$versionToBePubl2.releases.some(r => r.environment === (env === null || env === void 0 ? void 0 : env.key));
        if (!found && !deployEnvironment) {
          deployEnvironment = env.key;
        }
        return !found;
      });
      return {
        deployEnvironment,
        environnments
      };
    },
    idSite() {
      return external_CoreHome_["Matomo"].idSite;
    },
    isLoading() {
      return Versions_store.isLoading.value;
    },
    isUpdating() {
      return Versions_store.isUpdating.value;
    },
    versions() {
      return Versions_store.versions.value;
    },
    sortedVersions() {
      const searchFilter = this.versionSearch.toLowerCase();
      // look through string properties of versions for values that have searchFilter in them
      // (mimics angularjs filter() filter)
      const result = [...this.versions].filter(h => Object.keys(h).some(propName => {
        const entity = h;
        let propValue = '';
        if (typeof entity[propName] === 'string') {
          propValue = entity[propName];
        } else if (propName === 'releases') {
          Object.values(entity.releases).forEach(value => {
            if (value.environment) {
              propValue += `${value.environment} `;
            }
          });
        }
        return propValue.toLowerCase().indexOf(searchFilter) !== -1;
      }));
      result.sort((lhs, rhs) => {
        if (lhs.revision < rhs.revision) {
          return 1;
        }
        return lhs.revision > rhs.revision ? 0 : 1;
      });
      return result;
    },
    hasWriteAccess() {
      return external_CoreHome_["Matomo"].hasUserCapability('tagmanager_write');
    },
    hasCustomTemplatesCapability() {
      return external_CoreHome_["Matomo"].hasUserCapability('tagmanager_use_custom_templates');
    },
    canPublishToLive() {
      return external_CoreHome_["Matomo"].hasUserCapability('tagmanager_publish_live_container');
    },
    revisionTranslatedText() {
      return this.translate('TagManager_VersionsRevisionDescription');
    },
    nameTranslatedText() {
      return this.translate('TagManager_VersionsNameDescription');
    },
    descriptionTranslatedText() {
      return this.translate('TagManager_VersionsDescriptionDescription');
    },
    environmentTranslatedText() {
      return this.translate('TagManager_VersionsEnvironmentsDescription');
    },
    createdTranslatedText() {
      return this.translate('TagManager_VersionsCreatedDescription');
    },
    actionTranslatedText() {
      return this.translate('TagManager_VersionsActionDescription');
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionList.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionList.vue



VersionListvue_type_script_lang_ts.render = VersionListvue_type_template_id_a804e98a_render

/* harmony default export */ var VersionList = (VersionListvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Version/VersionManage.vue?vue&type=template&id=50bd0b30

const VersionManagevue_type_template_id_50bd0b30_hoisted_1 = {
  class: "manageVersion"
};
const VersionManagevue_type_template_id_50bd0b30_hoisted_2 = {
  key: 0
};
const VersionManagevue_type_template_id_50bd0b30_hoisted_3 = {
  key: 1
};
function VersionManagevue_type_template_id_50bd0b30_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_VersionList = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("VersionList");
  const _component_VersionEdit = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("VersionEdit");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VersionManagevue_type_template_id_50bd0b30_hoisted_1, [!_ctx.editMode ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VersionManagevue_type_template_id_50bd0b30_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_VersionList, {
    "id-container": _ctx.idContainer,
    "versions-help-text": _ctx.versionsHelpText
  }, null, 8, ["id-container", "versions-help-text"])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.editMode ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", VersionManagevue_type_template_id_50bd0b30_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_VersionEdit, {
    "id-container": _ctx.idContainer,
    "id-container-version": _ctx.idContainerVersion
  }, null, 8, ["id-container", "id-container-version"])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionManage.vue?vue&type=template&id=50bd0b30

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Version/VersionManage.vue?vue&type=script&lang=ts




/* harmony default export */ var VersionManagevue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idContainer: String,
    versionsHelpText: String
  },
  components: {
    VersionList: VersionList,
    VersionEdit: VersionEdit
  },
  data() {
    return {
      isAddAllowed: false
    };
  },
  created() {
    // doing this in a watch because we don't want to post an event in a computed property
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["watch"])(() => external_CoreHome_["MatomoUrl"].hashParsed.value.idContainerVersion, v => {
      this.onIdContainerVersionParamChange(v);
    });
    external_CoreHome_["NotificationsStore"].remove('versiontagmanagement');
    this.onIdContainerVersionParamChange(external_CoreHome_["MatomoUrl"].hashParsed.value.idContainerVersion);
  },
  methods: {
    onIdContainerVersionParamChange(idContainerVersion) {
      // for BC w/ angularjs only invoke event if idContainerVersion is 0
      if (idContainerVersion === '0') {
        const parameters = {
          isAllowed: true
        };
        external_CoreHome_["Matomo"].postEvent('TagManager.initAddVersion', parameters);
        this.isAddAllowed = !!parameters.isAllowed;
      }
    }
  },
  computed: {
    idContainerVersion() {
      const idContainerVersion = external_CoreHome_["MatomoUrl"].hashParsed.value.idContainerVersion;
      if (!this.isAddAllowed && idContainerVersion === '0') {
        return null;
      }
      return idContainerVersion ? parseInt(idContainerVersion, 10) : idContainerVersion;
    },
    editMode() {
      return typeof this.idContainerVersion === 'number';
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionManage.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Version/VersionManage.vue



VersionManagevue_type_script_lang_ts.render = VersionManagevue_type_template_id_50bd0b30_render

/* harmony default export */ var VersionManage = (VersionManagevue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Container/ContainerEdit.vue?vue&type=template&id=93caf22c

const ContainerEditvue_type_template_id_93caf22c_hoisted_1 = {
  class: "loadingPiwik"
};
const ContainerEditvue_type_template_id_93caf22c_hoisted_2 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);
const ContainerEditvue_type_template_id_93caf22c_hoisted_3 = {
  class: "loadingPiwik"
};
const ContainerEditvue_type_template_id_93caf22c_hoisted_4 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);
const ContainerEditvue_type_template_id_93caf22c_hoisted_5 = {
  class: "entityCancel"
};
function ContainerEditvue_type_template_id_93caf22c_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");
  const _component_SaveButton = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("SaveButton");
  const _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_ContentBlock, {
    class: "editContainer tagManagerManageEdit",
    feature: "Tag Manager",
    "content-title": _ctx.editTitle
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", ContainerEditvue_type_template_id_93caf22c_hoisted_1, [ContainerEditvue_type_template_id_93caf22c_hoisted_2, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_LoadingData')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isLoading]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", ContainerEditvue_type_template_id_93caf22c_hoisted_3, [ContainerEditvue_type_template_id_93caf22c_hoisted_4, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_UpdatingData')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isUpdating]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("form", {
      onSubmit: _cache[8] || (_cache[8] = $event => _ctx.edit ? _ctx.updateContainer() : _ctx.createContainer())
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
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => {
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
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => {
        _ctx.container.name = $event;
        _ctx.setValueHasChanged();
      }),
      maxlength: 255,
      title: _ctx.translate('General_Name'),
      "inline-help": _ctx.translate('TagManager_ContainerNameHelp'),
      placeholder: _ctx.translate('TagManager_ContainerNamePlaceholder')
    }, null, 8, ["model-value", "title", "inline-help", "placeholder"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
      uicontrol: "textarea",
      name: "description",
      "model-value": _ctx.container.description,
      "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => {
        _ctx.container.description = $event;
        _ctx.setValueHasChanged();
      }),
      title: _ctx.translate('TagManager_Description'),
      "inline-help": _ctx.translate('TagManager_ContainerDescriptionHelp'),
      placeholder: _ctx.translate('TagManager_ContainerDescriptionPlaceholder')
    }, null, 8, ["model-value", "title", "inline-help", "placeholder"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
      uicontrol: "checkbox",
      name: "ignoreGtmDataLayer",
      "model-value": _ctx.container.ignoreGtmDataLayer,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => {
        _ctx.container.ignoreGtmDataLayer = $event;
        _ctx.setValueHasChanged();
      }),
      title: _ctx.translate('TagManager_IgnoreGtmDataLaterTitle'),
      "inline-help": _ctx.translate('TagManager_IgnoreGtmDataLaterDescription')
    }, null, 8, ["model-value", "title", "inline-help"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
      uicontrol: "checkbox",
      name: "activelySyncGtmDataLayer",
      "model-value": _ctx.container.activelySyncGtmDataLayer,
      "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => {
        _ctx.container.activelySyncGtmDataLayer = $event;
        _ctx.setValueHasChanged();
      }),
      title: _ctx.translate('TagManager_ActivelySyncGtmDataLayerTitle'),
      "inline-help": _ctx.translate('TagManager_ActivelySyncGtmDataLayerDescription')
    }, null, 8, ["model-value", "title", "inline-help"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
      uicontrol: "checkbox",
      name: "isTagFireLimitAllowedInPreviewMode",
      "model-value": _ctx.container.isTagFireLimitAllowedInPreviewMode,
      "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => {
        _ctx.container.isTagFireLimitAllowedInPreviewMode = $event;
        _ctx.setValueHasChanged();
      }),
      title: _ctx.translate('TagManager_TagFireLimitAllowedInPreviewModeTitle'),
      "inline-help": _ctx.translate('TagManager_TagFireLimitAllowedInPreviewModeDescription')
    }, null, 8, ["model-value", "title", "inline-help"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_SaveButton, {
      class: "createButton",
      onConfirm: _cache[6] || (_cache[6] = $event => _ctx.edit ? _ctx.updateContainer() : _ctx.createContainer()),
      disabled: _ctx.isUpdating || !_ctx.isDirty,
      saving: _ctx.isUpdating,
      value: _ctx.edit ? _ctx.translate('CoreUpdater_UpdateTitle') : _ctx.translate('TagManager_CreateNewContainer')
    }, null, 8, ["disabled", "saving", "value"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ContainerEditvue_type_template_id_93caf22c_hoisted_5, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      onClick: _cache[7] || (_cache[7] = $event => _ctx.cancel())
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Cancel')), 1)])])], 32)]),
    _: 1
  }, 8, ["content-title"]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Container/ContainerEdit.vue?vue&type=template&id=93caf22c

// CONCATENATED MODULE: ./plugins/TagManager/vue/src/AvailableContexts.store.ts
function AvailableContexts_store_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


class AvailableContexts_store_AvailableContextStore {
  constructor() {
    AvailableContexts_store_defineProperty(this, "privateState", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      contexts: [],
      isLoading: false
    }));
    AvailableContexts_store_defineProperty(this, "state", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(this.privateState)));
    AvailableContexts_store_defineProperty(this, "isLoading", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => this.state.value.isLoading));
    AvailableContexts_store_defineProperty(this, "contexts", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => this.state.value.contexts));
    AvailableContexts_store_defineProperty(this, "contextsOptions", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => this.contexts.value.map(({
      id,
      name
    }) => ({
      key: id,
      value: name
    }))));
    AvailableContexts_store_defineProperty(this, "initializePromise", null);
  }
  init() {
    if (!this.initializePromise) {
      this.initializePromise = this.fetchAvailableContexts();
    }
    return this.initializePromise;
  }
  fetchAvailableContexts() {
    this.privateState.isLoading = true;
    return external_CoreHome_["AjaxHelper"].fetch({
      method: 'TagManager.getAvailableContexts',
      filter_limit: '-1'
    }).then(contexts => {
      let entities;
      if (Array.isArray(contexts)) {
        entities = contexts;
      } else {
        entities = Object.values(contexts);
      }
      this.privateState.contexts = entities;
    }).finally(() => {
      this.privateState.isLoading = false;
    });
  }
}
/* harmony default export */ var AvailableContexts_store = (new AvailableContexts_store_AvailableContextStore());
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Container/Containers.store.ts
function Containers_store_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


class Containers_store_ContainersStore {
  constructor() {
    Containers_store_defineProperty(this, "privateState", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      containers: [],
      isLoadingContainers: false,
      isLoadingSingle: false,
      isUpdating: false
    }));
    Containers_store_defineProperty(this, "state", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(this.privateState)));
    Containers_store_defineProperty(this, "isLoading", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
      const state = this.state.value;
      return state.isLoadingContainers || state.isLoadingSingle;
    }));
    Containers_store_defineProperty(this, "isUpdating", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => this.state.value.isUpdating));
    Containers_store_defineProperty(this, "containers", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => this.state.value.containers));
    Containers_store_defineProperty(this, "fetchPromise", null);
  }
  reload() {
    this.privateState.containers = [];
    this.fetchPromise = null;
    return this.fetchContainers();
  }
  fetchContainers() {
    this.privateState.isLoadingContainers = true;
    this.privateState.containers = [];
    if (!this.fetchPromise) {
      this.fetchPromise = external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainers',
        filter_limit: '-1'
      });
    }
    return Promise.resolve(this.fetchPromise).then(containers => {
      this.privateState.containers = containers;
      this.privateState.isLoadingContainers = false;
      return this.containers.value;
    }).finally(() => {
      this.privateState.isLoadingContainers = false;
    });
  }
  findContainer(idContainer) {
    // before going through an API request we first try to find it in loaded containers
    const found = this.containers.value.find(v => v.idcontainer === idContainer);
    if (found) {
      return Promise.resolve(found);
    }
    // otherwise we fetch it via API
    this.privateState.isLoadingSingle = true;
    return external_CoreHome_["AjaxHelper"].fetch({
      idContainer,
      method: 'TagManager.getContainer',
      filter_limit: '-1'
    }).then(record => {
      this.privateState.containers = [...this.privateState.containers, record];
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["readonly"])(record);
    }).finally(() => {
      this.privateState.isLoadingSingle = false;
    });
  }
  deleteContainer(idContainer) {
    this.privateState.isUpdating = true;
    this.privateState.containers = [];
    return external_CoreHome_["AjaxHelper"].fetch({
      idContainer,
      method: 'TagManager.deleteContainer'
    }, {
      withTokenInUrl: true
    }).finally(() => {
      this.privateState.isUpdating = false;
    });
  }
  createOrUpdateContainer(container, method) {
    this.privateState.isUpdating = true;
    return external_CoreHome_["AjaxHelper"].post({
      method,
      idContainer: container.idcontainer
    }, {
      name: container.name,
      description: container.description,
      ignoreGtmDataLayer: container.ignoreGtmDataLayer,
      activelySyncGtmDataLayer: container.activelySyncGtmDataLayer,
      isTagFireLimitAllowedInPreviewMode: container.isTagFireLimitAllowedInPreviewMode,
      context: container.context
    }, {
      withTokenInUrl: true
    }).finally(() => {
      this.privateState.isUpdating = false;
    });
  }
}
/* harmony default export */ var Containers_store = (new Containers_store_ContainersStore());
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Container/ContainerEdit.vue?vue&type=script&lang=ts







const ContainerEditvue_type_script_lang_ts_notificationId = 'containertagmanagement';
/* harmony default export */ var ContainerEditvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idContainer: String
  },
  components: {
    ContentBlock: external_CoreHome_["ContentBlock"],
    Field: external_CorePluginsAdmin_["Field"],
    SaveButton: external_CorePluginsAdmin_["SaveButton"]
  },
  data() {
    return {
      isDirty: false,
      editTitle: '',
      isUpdatingVersion: false,
      container: {}
    };
  },
  created() {
    AvailableContexts_store.init();
    AvailableComparisons_store.init();
    this.initIdContainer();
  },
  watch: {
    idContainer(newValue) {
      if (newValue === null) {
        return;
      }
      this.initIdContainer();
    }
  },
  methods: {
    removeAnyContainerNotification() {
      external_CoreHome_["NotificationsStore"].remove(ContainerEditvue_type_script_lang_ts_notificationId);
      external_CoreHome_["NotificationsStore"].remove('ajaxHelper');
    },
    showNotification(message, context) {
      const notificationInstanceId = external_CoreHome_["NotificationsStore"].show({
        message,
        context,
        id: ContainerEditvue_type_script_lang_ts_notificationId,
        type: 'toast'
      });
      setTimeout(() => {
        external_CoreHome_["NotificationsStore"].scrollToNotification(notificationInstanceId);
      }, 200);
    },
    showErrorFieldNotProvidedNotification(title) {
      const message = Object(external_CoreHome_["translate"])('TagManager_ErrorXNotProvided', [title]);
      this.showNotification(message, 'error');
    },
    initIdContainer() {
      this.container = {};
      external_CoreHome_["Matomo"].helper.lazyScrollToContent();
      if (this.edit && this.idContainer) {
        this.editTitle = Object(external_CoreHome_["translate"])('TagManager_EditContainer');
        Containers_store.findContainer(this.idContainer).then(container => {
          if (!container) {
            return;
          }
          this.container = Object(external_CoreHome_["clone"])(container);
          this.isDirty = false;
        });
      } else if (this.create) {
        this.editTitle = Object(external_CoreHome_["translate"])('TagManager_CreateNewContainer');
        this.container = {
          idSite: external_CoreHome_["Matomo"].idSite,
          name: '',
          context: 'web',
          description: '',
          activelySyncGtmDataLayer: true
        };
        this.isDirty = false;
      }
    },
    cancel() {
      const newParams = Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value);
      delete newParams.idContainer;
      external_CoreHome_["MatomoUrl"].updateHash(newParams);
    },
    createContainer() {
      this.removeAnyContainerNotification();
      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }
      this.isUpdatingVersion = true;
      Containers_store.createOrUpdateContainer(this.container, 'TagManager.addContainer').then(response => {
        this.isUpdatingVersion = false;
        if (!response) {
          return;
        }
        this.isDirty = false;
        const idContainer = response.value;
        this.showNotification(Object(external_CoreHome_["translate"])('TagManager_CreatedX', Object(external_CoreHome_["translate"])('TagManager_Container')), 'success');
        external_CoreHome_["MatomoUrl"].updateUrl(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].urlParsed.value), {}, {
          module: 'TagManager',
          action: 'dashboard',
          idContainer
        }));
      }).finally(() => {
        this.isUpdatingVersion = false;
      });
    },
    setValueHasChanged() {
      this.isDirty = true;
    },
    updateContainer() {
      this.removeAnyContainerNotification();
      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }
      this.isUpdating = true;
      Containers_store.createOrUpdateContainer(this.container, 'TagManager.updateContainer').then(response => {
        if (!response) {
          return;
        }
        this.isDirty = false;
        this.container = {};
        Containers_store.reload().then(() => {
          this.initIdContainer();
        });
        this.showNotification(Object(external_CoreHome_["translate"])('TagManager_UpdatedX', Object(external_CoreHome_["translate"])('TagManager_Container')), 'success');
      });
    },
    checkRequiredFieldsAreSet() {
      if (!this.container.name) {
        const title = Object(external_CoreHome_["translate"])('General_Name');
        this.showErrorFieldNotProvidedNotification(title);
        return false;
      }
      return true;
    }
  },
  computed: {
    contexts() {
      return AvailableContexts_store.contextsOptions.value;
    },
    create() {
      return this.idContainer === '0';
    },
    edit() {
      return !this.create;
    },
    isLoading() {
      return Variables_store.isLoading.value || AvailableComparisons_store.isLoading.value;
    },
    isUpdating() {
      return Variables_store.isUpdating.value || this.isUpdatingVersion;
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Container/ContainerEdit.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Container/ContainerEdit.vue



ContainerEditvue_type_script_lang_ts.render = ContainerEditvue_type_template_id_93caf22c_render

/* harmony default export */ var ContainerEdit = (ContainerEditvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Container/ContainerList.vue?vue&type=template&id=2a62f646

const ContainerListvue_type_template_id_2a62f646_hoisted_1 = {
  class: "tagManagerManageList tagManagerContainerList"
};
const ContainerListvue_type_template_id_2a62f646_hoisted_2 = ["innerHTML"];
const ContainerListvue_type_template_id_2a62f646_hoisted_3 = {
  class: "index"
};
const ContainerListvue_type_template_id_2a62f646_hoisted_4 = {
  class: "name"
};
const ContainerListvue_type_template_id_2a62f646_hoisted_5 = {
  class: "description"
};
const ContainerListvue_type_template_id_2a62f646_hoisted_6 = {
  class: "created"
};
const ContainerListvue_type_template_id_2a62f646_hoisted_7 = {
  class: "action"
};
const ContainerListvue_type_template_id_2a62f646_hoisted_8 = {
  colspan: "5"
};
const ContainerListvue_type_template_id_2a62f646_hoisted_9 = {
  class: "loadingPiwik"
};
const ContainerListvue_type_template_id_2a62f646_hoisted_10 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);
const ContainerListvue_type_template_id_2a62f646_hoisted_11 = {
  colspan: "5"
};
const ContainerListvue_type_template_id_2a62f646_hoisted_12 = ["id"];
const ContainerListvue_type_template_id_2a62f646_hoisted_13 = ["title"];
const ContainerListvue_type_template_id_2a62f646_hoisted_14 = ["title"];
const ContainerListvue_type_template_id_2a62f646_hoisted_15 = ["title"];
const ContainerListvue_type_template_id_2a62f646_hoisted_16 = {
  class: "created"
};
const ContainerListvue_type_template_id_2a62f646_hoisted_17 = ["href", "title"];
const ContainerListvue_type_template_id_2a62f646_hoisted_18 = ["onClick", "title"];
const ContainerListvue_type_template_id_2a62f646_hoisted_19 = ["onClick", "title"];
const ContainerListvue_type_template_id_2a62f646_hoisted_20 = ["onClick", "title"];
const ContainerListvue_type_template_id_2a62f646_hoisted_21 = ["onClick", "title"];
const ContainerListvue_type_template_id_2a62f646_hoisted_22 = {
  class: "tableActionBar"
};
const ContainerListvue_type_template_id_2a62f646_hoisted_23 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, " ", -1);
const ContainerListvue_type_template_id_2a62f646_hoisted_24 = {
  class: "ui-confirm",
  id: "confirmDeleteContainer",
  ref: "confirmDeleteContainer"
};
const ContainerListvue_type_template_id_2a62f646_hoisted_25 = ["value"];
const ContainerListvue_type_template_id_2a62f646_hoisted_26 = ["value"];
function ContainerListvue_type_template_id_2a62f646_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");
  const _directive_content_table = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("content-table");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", ContainerListvue_type_template_id_2a62f646_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: "Tag Manager",
    "content-title": _ctx.translate('TagManager_ManageX', _ctx.translate('TagManager_Containers'))
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", {
      innerHTML: _ctx.$sanitize(_ctx.getManageContainersIntro)
    }, null, 8, ContainerListvue_type_template_id_2a62f646_hoisted_2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("table", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", ContainerListvue_type_template_id_2a62f646_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Id')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", ContainerListvue_type_template_id_2a62f646_hoisted_4, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Name')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", ContainerListvue_type_template_id_2a62f646_hoisted_5, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Description')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", ContainerListvue_type_template_id_2a62f646_hoisted_6, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreatedDate')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", ContainerListvue_type_template_id_2a62f646_hoisted_7, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Actions')), 1)])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", ContainerListvue_type_template_id_2a62f646_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", ContainerListvue_type_template_id_2a62f646_hoisted_9, [ContainerListvue_type_template_id_2a62f646_hoisted_10, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_LoadingData')), 1)])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isLoading || _ctx.isUpdating]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", ContainerListvue_type_template_id_2a62f646_hoisted_11, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_NoContainersFound')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      class: "createContainerNow",
      onClick: _cache[0] || (_cache[0] = $event => _ctx.createContainer())
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewContainerNow')), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isLoading && _ctx.containers.length === 0]]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.sortedContainers, container => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
        id: `container${container.idcontainer}`,
        class: "containers",
        key: container.idcontainer
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
        class: "index",
        title: `${_ctx.translate('TagManager_Context')}: ` + _ctx.contexts[container.context]
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(container.idcontainer), 9, ContainerListvue_type_template_id_2a62f646_hoisted_13), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
        class: "name",
        title: container.name
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.truncateText(container.name, 50)), 9, ContainerListvue_type_template_id_2a62f646_hoisted_14), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
        class: "description",
        title: container.description
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.truncateText(container.description, 75)), 9, ContainerListvue_type_template_id_2a62f646_hoisted_15), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", ContainerListvue_type_template_id_2a62f646_hoisted_16, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(container.created_date_pretty), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
        class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(_ctx.getActionClasses)
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "table-action icon-configure",
        href: '?module=TagManager&action=' + _ctx.containerDefaultAction + '&idContainer=' + container.idcontainer + '&idSite=' + container.idsite + '&period=day&date=yesterday',
        title: _ctx.translate('TagManager_ConfigureX', _ctx.translate('TagManager_Container'))
      }, null, 8, ContainerListvue_type_template_id_2a62f646_hoisted_17), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "table-action installCode icon-embed",
        onClick: $event => _ctx.installCode(container.idcontainer),
        title: _ctx.translate('TagManager_InstallCode')
      }, null, 8, ContainerListvue_type_template_id_2a62f646_hoisted_18), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "table-action icon-edit",
        onClick: $event => _ctx.editContainer(container.idcontainer),
        title: _ctx.translate('TagManager_EditX', _ctx.translate('TagManager_Container'))
      }, null, 8, ContainerListvue_type_template_id_2a62f646_hoisted_19), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "table-action icon-content-copy",
        onClick: $event => _ctx.openCopyDialog(container),
        title: _ctx.translate('TagManager_CopyX', _ctx.translate('TagManager_Container'))
      }, null, 8, ContainerListvue_type_template_id_2a62f646_hoisted_20), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.canCopyContainer]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "table-action icon-delete",
        onClick: $event => _ctx.deleteContainer(container),
        title: _ctx.translate('TagManager_DeleteX', _ctx.translate('TagManager_Container'))
      }, null, 8, ContainerListvue_type_template_id_2a62f646_hoisted_21), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])], 2)], 8, ContainerListvue_type_template_id_2a62f646_hoisted_12);
    }), 128))])])), [[_directive_content_table]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ContainerListvue_type_template_id_2a62f646_hoisted_22, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      class: "createNewContainer",
      value: "",
      onClick: _cache[1] || (_cache[1] = $event => _ctx.createContainer())
    }, [ContainerListvue_type_template_id_2a62f646_hoisted_23, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewContainer')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.hasWriteAccess]])]),
    _: 1
  }, 8, ["content-title"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ContainerListvue_type_template_id_2a62f646_hoisted_24, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_DeleteContainerConfirm')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "yes",
    type: "button",
    value: _ctx.translate('General_Yes')
  }, null, 8, ContainerListvue_type_template_id_2a62f646_hoisted_25), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    role: "no",
    type: "button",
    value: _ctx.translate('General_No')
  }, null, 8, ContainerListvue_type_template_id_2a62f646_hoisted_26)], 512)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Container/ContainerList.vue?vue&type=template&id=2a62f646

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Container/ContainerList.vue?vue&type=script&lang=ts





const {
  tagManagerHelper: ContainerListvue_type_script_lang_ts_tagManagerHelper
} = window;
/* harmony default export */ var ContainerListvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    isSuperUser: {
      type: Boolean,
      required: true
    }
  },
  components: {
    ContentBlock: external_CoreHome_["ContentBlock"]
  },
  directives: {
    ContentTable: external_CoreHome_["ContentTable"]
  },
  created() {
    AvailableContexts_store.init();
    Containers_store.fetchContainers();
  },
  computed: {
    contexts() {
      const result = {};
      AvailableContexts_store.contexts.value.forEach(({
        id,
        name
      }) => {
        result[id] = name;
      });
      return result;
    },
    hasWriteAccess() {
      return external_CoreHome_["Matomo"].hasUserCapability('tagmanager_write');
    },
    containerDefaultAction() {
      return this.hasWriteAccess ? 'dashboard' : 'manageTags';
    },
    isLoading() {
      return Versions_store.isLoading.value;
    },
    isUpdating() {
      return Versions_store.isUpdating.value;
    },
    containers() {
      return Containers_store.containers.value;
    },
    sortedContainers() {
      const sorted = [...this.containers];
      sorted.sort((lhs, rhs) => {
        if (lhs.created_date < rhs.created_date) {
          return 1;
        }
        return lhs.created_date > rhs.created_date ? -1 : 0;
      });
      return sorted;
    },
    getManageContainersIntro() {
      const linkString = Object(external_CoreHome_["externalLink"])('https://matomo.org/guide/tag-manager/getting-started-with-tag-manager/');
      return Object(external_CoreHome_["translate"])('TagManager_ManageContainersIntro', linkString, '</a>');
    },
    canCopyContainer() {
      return external_CoreHome_["Matomo"].hasUserCapability('tagmanager_write') && external_CoreHome_["Matomo"].hasUserCapability('tagmanager_use_custom_templates');
    },
    getActionClasses() {
      const copyClass = this.canCopyContainer ? ' hasCopyAction' : '';
      return `action${copyClass}`;
    }
  },
  methods: {
    createContainer() {
      this.editContainer('0');
    },
    editContainer(idContainer) {
      external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
        idContainer
      }));
    },
    installCode(idContainer) {
      ContainerListvue_type_script_lang_ts_tagManagerHelper.showInstallCode(idContainer);
    },
    deleteContainer(container) {
      function doDelete() {
        Containers_store.deleteContainer(container.idcontainer).then(() => {
          Containers_store.reload();
          external_CoreHome_["NotificationsStore"].remove('CopyDialogResultNotification');
        });
      }
      external_CoreHome_["Matomo"].helper.modalConfirm(this.$refs.confirmDeleteContainer, {
        yes: doDelete
      });
    },
    truncateText(text, length) {
      if (text.length > length) {
        return `${text.substr(0, length - 3)}...`;
      }
      return text;
    },
    openCopyDialog(container) {
      const url = external_CoreHome_["MatomoUrl"].stringify({
        module: 'TagManager',
        action: 'copyContainerDialog',
        idSite: container.idsite,
        idContainer: container.idcontainer
      });
      window.Piwik_Popover.createPopupAndLoadUrl(url, '', 'mtmCopyContainer');
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Container/ContainerList.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Container/ContainerList.vue



ContainerListvue_type_script_lang_ts.render = ContainerListvue_type_template_id_2a62f646_render

/* harmony default export */ var ContainerList = (ContainerListvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Container/ContainerManage.vue?vue&type=template&id=4b1a4e9a

const ContainerManagevue_type_template_id_4b1a4e9a_hoisted_1 = {
  class: "manageContainer"
};
function ContainerManagevue_type_template_id_4b1a4e9a_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ContainerList = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContainerList");
  const _component_ContainerEdit = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContainerEdit");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", ContainerManagevue_type_template_id_4b1a4e9a_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContainerList, {
    "is-super-user": _ctx.isSuperUser
  }, null, 8, ["is-super-user"])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.editMode]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContainerEdit, {
    "id-container": _ctx.idContainer
  }, null, 8, ["id-container"])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.editMode]])]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Container/ContainerManage.vue?vue&type=template&id=4b1a4e9a

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Container/ContainerManage.vue?vue&type=script&lang=ts




/* harmony default export */ var ContainerManagevue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    isSuperUser: {
      type: Boolean,
      required: true
    }
  },
  components: {
    ContainerList: ContainerList,
    ContainerEdit: ContainerEdit
  },
  data() {
    return {
      isAddAllowed: false
    };
  },
  created() {
    // doing this in a watch because we don't want to post an event in a computed property
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["watch"])(() => external_CoreHome_["MatomoUrl"].hashParsed.value.idContainer, v => {
      this.onIdContainerParamChange(v);
    });
    external_CoreHome_["NotificationsStore"].remove('containertagmanagement');
    this.onIdContainerParamChange(external_CoreHome_["MatomoUrl"].hashParsed.value.idContainer);
  },
  computed: {
    idContainer() {
      const idContainer = external_CoreHome_["MatomoUrl"].hashParsed.value.idContainer;
      if (!this.isAddAllowed && idContainer === '') {
        return null;
      }
      return idContainer;
    },
    editMode() {
      return !!this.idContainer;
    }
  },
  methods: {
    onIdContainerParamChange(idContainer) {
      // for BC w/ angularjs only invoke event if idContainer is 0
      if (idContainer === '0') {
        const parameters = {
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



ContainerManagevue_type_script_lang_ts.render = ContainerManagevue_type_template_id_4b1a4e9a_render

/* harmony default export */ var ContainerManage = (ContainerManagevue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/ContainerDashboard/ContainerDashboard.vue?vue&type=template&id=674b3075

const ContainerDashboardvue_type_template_id_674b3075_hoisted_1 = {
  class: "containerDashboard"
};
const ContainerDashboardvue_type_template_id_674b3075_hoisted_2 = {
  key: 0
};
const ContainerDashboardvue_type_template_id_674b3075_hoisted_3 = {
  class: "dashboardCreationDate"
};
const ContainerDashboardvue_type_template_id_674b3075_hoisted_4 = {
  key: 0
};
const ContainerDashboardvue_type_template_id_674b3075_hoisted_5 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);
const ContainerDashboardvue_type_template_id_674b3075_hoisted_6 = ["innerHTML"];
const ContainerDashboardvue_type_template_id_674b3075_hoisted_7 = {
  class: "row",
  style: {
    "margin-left": "-0.75rem"
  }
};
const ContainerDashboardvue_type_template_id_674b3075_hoisted_8 = {
  class: "col m6 s12"
};
const ContainerDashboardvue_type_template_id_674b3075_hoisted_9 = {
  key: 0
};
const ContainerDashboardvue_type_template_id_674b3075_hoisted_10 = ["href", "title"];
const ContainerDashboardvue_type_template_id_674b3075_hoisted_11 = {
  key: 0
};
const ContainerDashboardvue_type_template_id_674b3075_hoisted_12 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("hr", null, null, -1);
const ContainerDashboardvue_type_template_id_674b3075_hoisted_13 = ["href"];
const ContainerDashboardvue_type_template_id_674b3075_hoisted_14 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-edit"
}, " ", -1);
const ContainerDashboardvue_type_template_id_674b3075_hoisted_15 = ["href"];
const ContainerDashboardvue_type_template_id_674b3075_hoisted_16 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, " ", -1);
const ContainerDashboardvue_type_template_id_674b3075_hoisted_17 = {
  class: "col m6 s12"
};
const ContainerDashboardvue_type_template_id_674b3075_hoisted_18 = {
  key: 0
};
const ContainerDashboardvue_type_template_id_674b3075_hoisted_19 = ["href", "title"];
const ContainerDashboardvue_type_template_id_674b3075_hoisted_20 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("hr", null, null, -1);
const ContainerDashboardvue_type_template_id_674b3075_hoisted_21 = ["href"];
const ContainerDashboardvue_type_template_id_674b3075_hoisted_22 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-edit"
}, " ", -1);
const ContainerDashboardvue_type_template_id_674b3075_hoisted_23 = ["href"];
const ContainerDashboardvue_type_template_id_674b3075_hoisted_24 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, " ", -1);
const ContainerDashboardvue_type_template_id_674b3075_hoisted_25 = {
  class: "row",
  style: {
    "margin-left": "-0.75rem"
  }
};
const ContainerDashboardvue_type_template_id_674b3075_hoisted_26 = {
  class: "col m6 s12"
};
const ContainerDashboardvue_type_template_id_674b3075_hoisted_27 = ["href", "title"];
const ContainerDashboardvue_type_template_id_674b3075_hoisted_28 = {
  key: 0
};
const ContainerDashboardvue_type_template_id_674b3075_hoisted_29 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("hr", null, null, -1);
const ContainerDashboardvue_type_template_id_674b3075_hoisted_30 = ["href"];
const ContainerDashboardvue_type_template_id_674b3075_hoisted_31 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-edit"
}, " ", -1);
const ContainerDashboardvue_type_template_id_674b3075_hoisted_32 = ["href"];
const ContainerDashboardvue_type_template_id_674b3075_hoisted_33 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, " ", -1);
const ContainerDashboardvue_type_template_id_674b3075_hoisted_34 = {
  class: "col m6 s12"
};
const ContainerDashboardvue_type_template_id_674b3075_hoisted_35 = ["title", "href"];
const ContainerDashboardvue_type_template_id_674b3075_hoisted_36 = {
  key: 0
};
const ContainerDashboardvue_type_template_id_674b3075_hoisted_37 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);
const ContainerDashboardvue_type_template_id_674b3075_hoisted_38 = ["title"];
const ContainerDashboardvue_type_template_id_674b3075_hoisted_39 = {
  key: 0
};
const ContainerDashboardvue_type_template_id_674b3075_hoisted_40 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("hr", null, null, -1);
const ContainerDashboardvue_type_template_id_674b3075_hoisted_41 = ["href"];
const ContainerDashboardvue_type_template_id_674b3075_hoisted_42 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-edit"
}, " ", -1);
const ContainerDashboardvue_type_template_id_674b3075_hoisted_43 = ["href"];
const ContainerDashboardvue_type_template_id_674b3075_hoisted_44 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-add"
}, " ", -1);
function ContainerDashboardvue_type_template_id_674b3075_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _ctx$containerVersion, _ctx$containerVersion2;
  const _component_ActivityIndicator = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ActivityIndicator");
  const _component_EnrichedHeadline = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("EnrichedHeadline");
  const _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");
  const _directive_content_intro = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("content-intro");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", ContainerDashboardvue_type_template_id_674b3075_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ActivityIndicator, {
    loading: _ctx.isLoading
  }, null, 8, ["loading"]), !_ctx.isLoading ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", ContainerDashboardvue_type_template_id_674b3075_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_EnrichedHeadline, {
    "feature-name": "Tag Manager",
    "inline-help": _ctx.dashboardHelpText
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => {
      var _ctx$container;
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ContainerX', (_ctx$container = _ctx.container) === null || _ctx$container === void 0 ? void 0 : _ctx$container.name)), 1)];
    }),
    _: 1
  }, 8, ["inline-help"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", ContainerDashboardvue_type_template_id_674b3075_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.containerMetaInformation) + " ", 1), (_ctx$containerVersion = _ctx.containerVersion) !== null && _ctx$containerVersion !== void 0 && _ctx$containerVersion.description ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", ContainerDashboardvue_type_template_id_674b3075_hoisted_4, [ContainerDashboardvue_type_template_id_674b3075_hoisted_5, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Description')) + ": " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])((_ctx$containerVersion2 = _ctx.containerVersion) === null || _ctx$containerVersion2 === void 0 ? void 0 : _ctx$containerVersion2.description), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", {
    innerHTML: _ctx.$sanitize(_ctx.containerDashboardDescription)
  }, null, 8, ContainerDashboardvue_type_template_id_674b3075_hoisted_6)])), [[_directive_content_intro]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ContainerDashboardvue_type_template_id_674b3075_hoisted_7, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ContainerDashboardvue_type_template_id_674b3075_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: _ctx.translate('TagManager_Tags'),
    "content-title": `${_ctx.tagCount} ${_ctx.translate('TagManager_Tags')}`,
    "help-text": _ctx.tagsHelpText,
    "edit-url": _ctx.linkTo('manageTags')
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [_ctx.tagCount ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", ContainerDashboardvue_type_template_id_674b3075_hoisted_9, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Names')) + ": ", 1), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.sortedContainerVersionTags, (tag, index) => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
        key: index
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        href: _ctx.linkTo('manageTags', {
          idTag: tag.idtag
        }),
        title: _ctx.translate('TagManager_EntityDateTypeMetaInformation', tag.created_date_pretty, tag.updated_date_pretty, tag.type)
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(tag.name), 9, ContainerDashboardvue_type_template_id_674b3075_hoisted_10), index !== _ctx.sortedContainerVersionTags.length - 1 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", ContainerDashboardvue_type_template_id_674b3075_hoisted_11, ", ")) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
    }), 128))])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), ContainerDashboardvue_type_template_id_674b3075_hoisted_12, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      class: "btn-flat",
      href: _ctx.linkTo('manageTags')
    }, [ContainerDashboardvue_type_template_id_674b3075_hoisted_14, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_EditTags')), 1)], 8, ContainerDashboardvue_type_template_id_674b3075_hoisted_13), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      class: "btn-flat",
      href: _ctx.linkTo('manageTags', {
        idTag: 0
      })
    }, [ContainerDashboardvue_type_template_id_674b3075_hoisted_16, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewTag')), 1)], 8, ContainerDashboardvue_type_template_id_674b3075_hoisted_15)]),
    _: 1
  }, 8, ["feature", "content-title", "help-text", "edit-url"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ContainerDashboardvue_type_template_id_674b3075_hoisted_17, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: _ctx.translate('TagManager_Triggers'),
    "content-title": `${_ctx.triggerCount} ${_ctx.translate('TagManager_Triggers')}`,
    "help-text": _ctx.triggersHelpText,
    "edit-url": _ctx.linkTo('manageTriggers')
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [_ctx.triggerCount ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", ContainerDashboardvue_type_template_id_674b3075_hoisted_18, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Names')) + ": ", 1), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.sortedTriggers, (trigger, index) => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
        key: index
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        href: _ctx.linkTo('manageTriggers', {
          idTrigger: trigger.idtrigger
        }),
        title: _ctx.translate('TagManager_EntityDateTypeMetaInformation', trigger.created_date_pretty, trigger.updated_date_pretty, trigger.type)
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(trigger.name), 9, ContainerDashboardvue_type_template_id_674b3075_hoisted_19), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, ", ", 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], index !== _ctx.sortedTriggers.length - 1]])]);
    }), 128))])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), ContainerDashboardvue_type_template_id_674b3075_hoisted_20, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      class: "btn-flat",
      href: _ctx.linkTo('manageTriggers')
    }, [ContainerDashboardvue_type_template_id_674b3075_hoisted_22, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_EditTriggers')), 1)], 8, ContainerDashboardvue_type_template_id_674b3075_hoisted_21), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      class: "btn-flat",
      href: _ctx.linkTo('manageTriggers', {
        idTrigger: 0
      })
    }, [ContainerDashboardvue_type_template_id_674b3075_hoisted_24, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewTrigger')), 1)], 8, ContainerDashboardvue_type_template_id_674b3075_hoisted_23)]),
    _: 1
  }, 8, ["feature", "content-title", "help-text", "edit-url"])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ContainerDashboardvue_type_template_id_674b3075_hoisted_25, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ContainerDashboardvue_type_template_id_674b3075_hoisted_26, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: _ctx.translate('TagManager_Variables'),
    "content-title": `${_ctx.variableCount} ${_ctx.translate('TagManager_Variables')}`,
    "help-text": _ctx.variablesHelpText,
    "edit-url": _ctx.linkTo('manageVariables')
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Names')) + ": ", 1), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.sortedVariables, (variable, index) => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
        key: index
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        href: _ctx.linkTo('manageVariables', {
          idVariable: variable.idvariable
        }),
        title: _ctx.translate('TagManager_EntityDateTypeMetaInformation', variable.created_date_pretty, variable.updated_date_pretty, variable.type)
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variable.name), 9, ContainerDashboardvue_type_template_id_674b3075_hoisted_27), index !== _ctx.sortedVariables.length - 1 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", ContainerDashboardvue_type_template_id_674b3075_hoisted_28, ", ")) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
    }), 128))], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.variableCount]])]), ContainerDashboardvue_type_template_id_674b3075_hoisted_29, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      class: "btn-flat",
      href: _ctx.linkTo('manageVariables')
    }, [ContainerDashboardvue_type_template_id_674b3075_hoisted_31, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_EditVariables')), 1)], 8, ContainerDashboardvue_type_template_id_674b3075_hoisted_30), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      class: "btn-flat",
      href: _ctx.linkTo('manageVariables', {
        idVariable: 0
      })
    }, [ContainerDashboardvue_type_template_id_674b3075_hoisted_33, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewVariable')), 1)], 8, ContainerDashboardvue_type_template_id_674b3075_hoisted_32)]),
    _: 1
  }, 8, ["feature", "content-title", "help-text", "edit-url"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ContainerDashboardvue_type_template_id_674b3075_hoisted_34, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    feature: _ctx.translate('TagManager_Versions'),
    "content-title": `${_ctx.versionCount} ${_ctx.translate('TagManager_Versions')}`,
    "help-text": _ctx.versionsHelpText,
    "edit-url": _ctx.linkTo('manageVersions')
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_LastVersions')) + ": ", 1), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.lastVersions, (lastVersion, index) => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
        key: index
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        title: _ctx.lastVersionLinkTitle(lastVersion),
        href: _ctx.linkTo('manageVersions', {
          idContainerVersion: lastVersion.idcontainerversion
        })
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(lastVersion.name), 9, ContainerDashboardvue_type_template_id_674b3075_hoisted_35), index !== _ctx.lastVersions.length - 1 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", ContainerDashboardvue_type_template_id_674b3075_hoisted_36, ", ")) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
    }), 128))], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.lastVersions.length]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, [ContainerDashboardvue_type_template_id_674b3075_hoisted_37, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Environments')) + ": ", 1), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.container.releases, (release, index) => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
        key: index
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
        title: _ctx.releaseTooltip(release)
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.ucfirst(release.environment)), 9, ContainerDashboardvue_type_template_id_674b3075_hoisted_38), index !== _ctx.container.releases.length - 1 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", ContainerDashboardvue_type_template_id_674b3075_hoisted_39, ", ")) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
    }), 128))], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.container.releases.length]])]), ContainerDashboardvue_type_template_id_674b3075_hoisted_40, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      class: "btn-flat",
      href: _ctx.linkTo('manageVersions')
    }, [ContainerDashboardvue_type_template_id_674b3075_hoisted_42, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_EditVersions')), 1)], 8, ContainerDashboardvue_type_template_id_674b3075_hoisted_41), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      class: "btn-flat",
      href: _ctx.linkTo('manageVersions', {
        idContainerVersion: 0
      })
    }, [ContainerDashboardvue_type_template_id_674b3075_hoisted_44, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_CreateNewVersion')), 1)], 8, ContainerDashboardvue_type_template_id_674b3075_hoisted_43)]),
    _: 1
  }, 8, ["feature", "content-title", "help-text", "edit-url"])])])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/ContainerDashboard/ContainerDashboard.vue?vue&type=template&id=674b3075

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/ContainerDashboard/ContainerDashboard.vue?vue&type=script&lang=ts



function sortByName(items) {
  items.sort((lhs, rhs) => {
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
  data() {
    return {
      container: null,
      containerVersion: null,
      isLoading: false
    };
  },
  created() {
    AvailableContexts_store.init();
    this.isLoading = true;
    const containerPromise = external_CoreHome_["AjaxHelper"].fetch({
      method: 'TagManager.getContainer',
      idContainer: this.idContainer
    }).then(container => {
      this.container = container;
    });
    const versionPromise = external_CoreHome_["AjaxHelper"].fetch({
      method: 'TagManager.exportContainerVersion',
      idContainer: this.idContainer
    }).then(containerVersion => {
      this.containerVersion = containerVersion;
    });
    Promise.all([containerPromise, versionPromise]).finally(() => {
      this.isLoading = false;
    });
  },
  methods: {
    linkTo(action, hash) {
      let url = external_CoreHome_["MatomoUrl"].stringify(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].urlParsed.value), {}, {
        module: 'TagManager',
        action
      }));
      if (hash) {
        url += `#?${external_CoreHome_["MatomoUrl"].stringify(hash)}`;
      }
      return `?${url}`;
    },
    lastVersionLinkTitle(lastVersion) {
      return `Created on ${lastVersion.created_date_pretty}` + `, description: '${lastVersion.description}'`;
    },
    releaseTooltip(release) {
      const firstPart = Object(external_CoreHome_["translate"])('TagManager_ReleaseInfo', release.release_login, release.release_date_pretty);
      const secondPart = Object(external_CoreHome_["translate"])('TagManager_ReleaseVersionInfo', release.version_name);
      return `${firstPart} ${secondPart}`;
    },
    ucfirst(s) {
      return `${s.substr(0, 1).toUpperCase()}${s.substr(1)}`;
    }
  },
  computed: {
    lastVersions() {
      var _this$container;
      if ((_this$container = this.container) !== null && _this$container !== void 0 && (_this$container = _this$container.versions) !== null && _this$container !== void 0 && _this$container.length) {
        return this.container.versions.slice(0, 5);
      }
      return [];
    },
    contexts() {
      const result = {};
      AvailableContexts_store.contexts.value.forEach(({
        id,
        name
      }) => {
        result[id] = name;
      });
      return result;
    },
    containerMetaInformation() {
      var _this$containerVersio;
      return Object(external_CoreHome_["translate"])('TagManager_ContainerIdInformation', ((_this$containerVersio = this.containerVersion) === null || _this$containerVersio === void 0 ? void 0 : _this$containerVersio.idcontainer) || '');
    },
    containerDashboardDescription() {
      const linkString = Object(external_CoreHome_["externalLink"])('https://matomo.org/guide/tag-manager/getting-started-with-tag-manager/');
      return Object(external_CoreHome_["translate"])('TagManager_ContainerDashboardDescription', linkString, '</a>');
    },
    sortedContainerVersionTags() {
      var _this$containerVersio2;
      const tags = ((_this$containerVersio2 = this.containerVersion) === null || _this$containerVersio2 === void 0 ? void 0 : _this$containerVersio2.tags) || [];
      sortByName(tags);
      return tags;
    },
    sortedTriggers() {
      var _this$containerVersio3;
      const triggers = ((_this$containerVersio3 = this.containerVersion) === null || _this$containerVersio3 === void 0 ? void 0 : _this$containerVersio3.triggers) || [];
      sortByName(triggers);
      return triggers;
    },
    sortedVariables() {
      var _this$containerVersio4;
      const variables = ((_this$containerVersio4 = this.containerVersion) === null || _this$containerVersio4 === void 0 ? void 0 : _this$containerVersio4.variables) || [];
      sortByName(variables);
      return variables;
    },
    tagCount() {
      var _this$containerVersio5;
      return (_this$containerVersio5 = this.containerVersion) === null || _this$containerVersio5 === void 0 ? void 0 : _this$containerVersio5.tags.length;
    },
    triggerCount() {
      var _this$containerVersio6;
      return (_this$containerVersio6 = this.containerVersion) === null || _this$containerVersio6 === void 0 ? void 0 : _this$containerVersio6.triggers.length;
    },
    versionCount() {
      var _this$container2;
      return (_this$container2 = this.container) === null || _this$container2 === void 0 ? void 0 : _this$container2.versions.length;
    },
    variableCount() {
      var _this$containerVersio7;
      return (_this$containerVersio7 = this.containerVersion) === null || _this$containerVersio7 === void 0 ? void 0 : _this$containerVersio7.variables.length;
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/ContainerDashboard/ContainerDashboard.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/ContainerDashboard/ContainerDashboard.vue



ContainerDashboardvue_type_script_lang_ts.render = ContainerDashboardvue_type_template_id_674b3075_render

/* harmony default export */ var ContainerDashboard = (ContainerDashboardvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/ContainerSelector/ContainerSelector.vue?vue&type=template&id=cf66c4f0

const ContainerSelectorvue_type_template_id_cf66c4f0_hoisted_1 = ["title"];
const ContainerSelectorvue_type_template_id_cf66c4f0_hoisted_2 = {
  class: "title"
};
const ContainerSelectorvue_type_template_id_cf66c4f0_hoisted_3 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon icon-chevron-down"
}, " ", -1);
const ContainerSelectorvue_type_template_id_cf66c4f0_hoisted_4 = {
  class: "dropdown positionInViewport"
};
const ContainerSelectorvue_type_template_id_cf66c4f0_hoisted_5 = {
  class: "custom_select_container"
};
const ContainerSelectorvue_type_template_id_cf66c4f0_hoisted_6 = {
  class: "custom_select_ul_list"
};
const ContainerSelectorvue_type_template_id_cf66c4f0_hoisted_7 = ["title"];
const ContainerSelectorvue_type_template_id_cf66c4f0_hoisted_8 = ["href"];
function ContainerSelectorvue_type_template_id_cf66c4f0_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ActivityIndicator = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ActivityIndicator");
  const _directive_focus_anywhere_but_here = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("focus-anywhere-but-here");
  const _directive_tooltips = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("tooltips");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["tagContainerSelector piwikSelector borderedControl", {
      expanded: _ctx.showContainerList
    }]),
    onClick: _cache[1] || (_cache[1] = $event => {
      _ctx.fetchContainers();
      _ctx.showContainerList = !_ctx.showContainerList;
    }),
    title: _ctx.translate('TagManager_ChooseContainer')
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", ContainerSelectorvue_type_template_id_cf66c4f0_hoisted_2, [ContainerSelectorvue_type_template_id_cf66c4f0_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.truncateText(_ctx.actualContainerName, 50)), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ContainerSelectorvue_type_template_id_cf66c4f0_hoisted_4, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ActivityIndicator, {
    loading: _ctx.isLoading
  }, null, 8, ["loading"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ContainerSelectorvue_type_template_id_cf66c4f0_hoisted_5, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", ContainerSelectorvue_type_template_id_cf66c4f0_hoisted_6, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    tabindex: "-1",
    onClick: _cache[0] || (_cache[0] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(() => {}, ["prevent", "stop"]))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_NoContainersFound')), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isLoading && _ctx.containers.length === 0]]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.containers, containerEntry => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
      title: `${containerEntry.name} (${containerEntry.idcontainer})`,
      key: containerEntry.idcontainer
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      href: _ctx.linkTo(containerEntry.idcontainer)
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(containerEntry.name) + " (" + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(containerEntry.idcontainer) + ") ", 9, ContainerSelectorvue_type_template_id_cf66c4f0_hoisted_8)], 8, ContainerSelectorvue_type_template_id_cf66c4f0_hoisted_7);
  }), 128))])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.showContainerList]])], 10, ContainerSelectorvue_type_template_id_cf66c4f0_hoisted_1)), [[_directive_focus_anywhere_but_here, {
    blur: _ctx.onBlur
  }], [_directive_tooltips]]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/ContainerSelector/ContainerSelector.vue?vue&type=template&id=cf66c4f0

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/ContainerSelector/ContainerSelector.vue?vue&type=script&lang=ts


const {
  tagManagerHelper: ContainerSelectorvue_type_script_lang_ts_tagManagerHelper
} = window;
/* harmony default export */ var ContainerSelectorvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    containerName: String
  },
  components: {
    ActivityIndicator: external_CoreHome_["ActivityIndicator"]
  },
  directives: {
    FocusAnywhereButHere: external_CoreHome_["FocusAnywhereButHere"],
    Tooltips: external_CoreHome_["Tooltips"]
  },
  data() {
    return {
      containers: [],
      isLoading: false,
      showContainerList: false
    };
  },
  created() {
    setTimeout(() => {
      window.initTopControls();
    });
  },
  methods: {
    fetchContainers() {
      this.isLoading = true;
      this.containers = [];
      external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainers'
      }).then(containers => {
        this.containers = containers;
      }).finally(() => {
        this.isLoading = false;
      });
    },
    linkTo(idContainer) {
      let action = external_CoreHome_["MatomoUrl"].urlParsed.value.action;
      if (!action || action === 'manageContainers') {
        action = this.hasWriteAccess ? 'dashboard' : 'manageTags';
      }
      const newQuery = external_CoreHome_["MatomoUrl"].stringify(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].urlParsed.value), {}, {
        idContainer,
        action
      }));
      return `${window.location.pathname}?${newQuery}`;
    },
    onBlur() {
      this.showContainerList = false;
    },
    truncateText(text, length) {
      return ContainerSelectorvue_type_script_lang_ts_tagManagerHelper.truncateText(text, length);
    }
  },
  computed: {
    actualContainerName() {
      if (this.containerName) {
        return Object(external_CoreHome_["translate"])('TagManager_ContainerX', this.containerName);
      }
      return Object(external_CoreHome_["translate"])('TagManager_ChooseContainer');
    },
    hasWriteAccess() {
      return external_CoreHome_["Matomo"].hasUserCapability('tagmanager_write');
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/ContainerSelector/ContainerSelector.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/ContainerSelector/ContainerSelector.vue



ContainerSelectorvue_type_script_lang_ts.render = ContainerSelectorvue_type_template_id_cf66c4f0_render

/* harmony default export */ var ContainerSelector = (ContainerSelectorvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/ManageInstallTagCode/ManageInstallTagCode.vue?vue&type=template&id=f7d80dd6

const ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_1 = {
  style: {
    "margin-left": "-0.75rem"
  }
};
const ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_2 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);
const ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_3 = ["href"];
const ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_4 = ["textContent"];
const ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_5 = {
  style: {
    "margin-top": "1rem"
  }
};
const ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_6 = ["innerHTML"];
const ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_7 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);
const ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_8 = ["href"];
const ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_9 = {
  class: "environment"
};
const ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_10 = {
  class: "name"
};
const ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_11 = {
  class: "name"
};
const ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_12 = {
  class: "released_by"
};
const ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_13 = {
  class: "released_on"
};
const ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_14 = {
  key: 0
};
const ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_15 = {
  colspan: "7"
};
const ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_16 = {
  class: "loadingPiwik"
};
const ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_17 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);
const ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_18 = {
  key: 1
};
const ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_19 = {
  colspan: "7"
};
const ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_20 = {
  class: "environment"
};
const ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_21 = {
  class: "name"
};
const ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_22 = {
  class: "revision"
};
const ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_23 = {
  class: "released_by"
};
const ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_24 = {
  class: "released_on"
};
const ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_25 = {
  class: "date"
};
function ManageInstallTagCodevue_type_template_id_f7d80dd6_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");
  const _component_ActivityIndicator = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ActivityIndicator");
  const _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");
  const _directive_copy_to_clipboard = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("copy-to-clipboard");
  const _directive_content_table = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("content-table");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_ContentBlock, {
    class: "manageInstallTagCode",
    feature: "Tag Manager",
    "content-title": "Install Code"
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => {
      var _ctx$container;
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "select",
        name: "environment",
        "model-value": _ctx.environment,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => {
          _ctx.environment = $event;
          _ctx.fetchInstallInstructions(_ctx.environment);
        }),
        options: _ctx.environments,
        title: _ctx.translate('TagManager_Environment')
      }, null, 8, ["model-value", "options", "title"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ActivityIndicator, {
        loading: _ctx.isLoading
      }, null, 8, ["loading"]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.installInstructions, (installInstruction, index) => {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
          key: index
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(installInstruction.description) + " ", 1), ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_2, installInstruction.helpUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
          key: 0,
          target: "_blank",
          href: installInstruction.helpUrl
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_LearnMore')), 9, ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_3)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [installInstruction.embedCode ? Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("pre", {
          key: 0,
          textContent: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(installInstruction.embedCode)
        }, null, 8, ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_4)), [[_directive_copy_to_clipboard, {}]]) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])]);
      }), 128)), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_InstallCodePublishEnvironmentNote', 'preview')) + " " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ConfigureEnvironmentsSuperUser')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_5, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
        innerHTML: _ctx.$sanitize(_ctx.translate('TagManager_InstallCodeDataLayerNote', '<strong>', '</strong>'))
      }, null, 8, ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_6), ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_7, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        target: "_blank",
        href: _ctx.externalRawLink('https://matomo.org/faq/tag-manager/data-layer-in-matomo-tag-manager/')
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_LearnMore')), 9, ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_8)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ReleasesOverview')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("table", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_9, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_Environment')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_10, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_VersionName')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_11, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_VersionRevision')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_12, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ReleasedBy')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_13, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_ReleasedOn')), 1)])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [_ctx.isLoading ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_14, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_15, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_16, [ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_17, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_LoadingData')), 1)])])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), !_ctx.isLoading && ((_ctx$container = _ctx.container) === null || _ctx$container === void 0 || (_ctx$container = _ctx$container.releases) === null || _ctx$container === void 0 ? void 0 : _ctx$container.length) === 0 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_18, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_19, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_NoReleasesFound')), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.sortedReleases, release => {
        var _ctx$releaseVersions$, _ctx$releaseVersions$2;
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
          key: release.idcontainerrelease
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_20, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.ucfirst(release.environment)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_21, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])((_ctx$releaseVersions$ = _ctx.releaseVersions[release.idcontainerrelease]) === null || _ctx$releaseVersions$ === void 0 ? void 0 : _ctx$releaseVersions$.name), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_22, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])((_ctx$releaseVersions$2 = _ctx.releaseVersions[release.idcontainerrelease]) === null || _ctx$releaseVersions$2 === void 0 ? void 0 : _ctx$releaseVersions$2.revision), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_23, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(release.release_login), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_24, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", ManageInstallTagCodevue_type_template_id_f7d80dd6_hoisted_25, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(release.release_date_pretty), 1)])]);
      }), 128))])])), [[_directive_content_table]])];
    }),
    _: 1
  });
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/ManageInstallTagCode/ManageInstallTagCode.vue?vue&type=template&id=f7d80dd6

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/ManageInstallTagCode/ManageInstallTagCode.vue?vue&type=script&lang=ts



const {
  $: ManageInstallTagCodevue_type_script_lang_ts_$
} = window;
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
    ContentTable: external_CoreHome_["ContentTable"],
    CopyToClipboard: external_CoreHome_["CopyToClipboard"]
  },
  data() {
    return {
      container: null,
      environments: [],
      environment: 'live',
      installInstructions: [],
      isLoading: false,
      isLoadingInstructions: false
    };
  },
  created() {
    this.isLoading = true;
    this.fetchReleases().finally(() => {
      this.isLoading = false;
    });
  },
  methods: {
    fetchInstallInstructions(environment) {
      this.installInstructions = [];
      this.isLoadingInstructions = true;
      return external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainerInstallInstructions',
        filter_limit: '-1',
        idContainer: this.idContainer,
        environment
      }).then(instructions => {
        this.installInstructions = instructions;
        Object(external_commonjs_vue_commonjs2_vue_root_Vue_["nextTick"])(() => {
          const codeblocks = Array.isArray(this.$refs.codeblock) ? this.$refs.codeblock : [this.$refs.codeblock];
          codeblocks.forEach(n => {
            ManageInstallTagCodevue_type_script_lang_ts_$(n).effect('highlight', {}, 1500);
          });
        });
      }).finally(() => {
        this.isLoadingInstructions = false;
      });
    },
    fetchReleases() {
      return external_CoreHome_["AjaxHelper"].fetch([{
        method: 'TagManager.getAvailableEnvironments',
        filter_limit: '-1'
      }, {
        method: 'TagManager.getContainer',
        idContainer: this.idContainer,
        filter_limit: '-1'
      }]).then(([environments, container]) => {
        var _this$environments;
        this.environments = environments.map(e => ({
          key: e.id,
          value: e.name
        }));
        this.container = container;
        const hasLive = container.releases.some(r => r.environment === 'live');
        if (!hasLive && (_this$environments = this.environments) !== null && _this$environments !== void 0 && (_this$environments = _this$environments[0]) !== null && _this$environments !== void 0 && _this$environments.key) {
          this.environment = this.environments[0].key;
        } else if (!hasLive) {
          // no release available yet
          this.environment = '';
        }
        if (this.environment) {
          return this.fetchInstallInstructions(this.environment);
        }
        return undefined;
      });
    },
    ucfirst(s) {
      return `${s.substr(0, 1).toUpperCase()}${s.substr(1)}`;
    }
  },
  computed: {
    releaseVersions() {
      var _this$container;
      const result = {};
      (((_this$container = this.container) === null || _this$container === void 0 ? void 0 : _this$container.releases) || []).forEach(r => {
        result[r.idcontainerrelease] = this.container.versions.find(v => v.idcontainerversion === r.idcontainerversion);
      });
      return result;
    },
    sortedReleases() {
      var _this$container2;
      const sorted = [...(((_this$container2 = this.container) === null || _this$container2 === void 0 ? void 0 : _this$container2.releases) || []).map((r, i) => Object.assign(Object.assign({}, r), {}, {
        index: i
      }))];
      sorted.sort((lhs, rhs) => {
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



ManageInstallTagCodevue_type_script_lang_ts.render = ManageInstallTagCodevue_type_template_id_f7d80dd6_render

/* harmony default export */ var ManageInstallTagCode = (ManageInstallTagCodevue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/TagmanagerTrackingCode/TrackingCodeCommon.vue?vue&type=template&id=23c13e80

const TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_1 = {
  class: "tagManagerTrackingCode"
};
const TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_2 = {
  key: 0
};
const TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_3 = {
  class: "trackingCodeAdvancedOptions"
};
const TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_4 = {
  class: "advance-option"
};
const TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_5 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-chevron-down"
}, null, -1);
const TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_6 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-chevron-up"
}, null, -1);
const TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_7 = {
  id: "mtm-advanced-options"
};
const TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_8 = ["innerHTML"];
const TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_9 = {
  key: 1,
  class: "row"
};
const TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_10 = {
  class: "col s12 m4"
};
const TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_11 = {
  class: "form-group row"
};
const TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_12 = {
  class: "col s12 input-field"
};
const TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_13 = {
  for: "tagManagerTrackingCodeSite",
  class: "siteSelectorLabel"
};
const TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_14 = {
  class: "sites_autocomplete"
};
const TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_15 = {
  class: "col s12 m4"
};
const TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_16 = {
  class: "col s12 m4"
};
const TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_17 = ["innerHTML"];
const TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_18 = {
  key: 1,
  class: "alert alert-info"
};
const TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_19 = {
  href: ""
};
const TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_20 = {
  key: 0
};
const TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_21 = ["href"];
const TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_22 = ["innerHTML"];
const TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_23 = ["textContent"];
const TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_24 = ["innerHTML"];
const TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_25 = {
  key: 1
};
function TrackingCodeCommonvue_type_template_id_23c13e80_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ActivityIndicator = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ActivityIndicator");
  const _component_SiteSelector = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("SiteSelector");
  const _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");
  const _directive_copy_to_clipboard = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("copy-to-clipboard");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_1, [_ctx.showContainerRow ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_OptionallyCustomiseContainer')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_4, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, [!_ctx.isAdvancedDisplayed ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
    key: 0,
    href: "javascript:;",
    onClick: _cache[0] || (_cache[0] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])($event => _ctx.isAdvancedDisplayed = true, ["prevent"]))
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('CoreAdminHome_ShowAdvancedOptions')) + " ", 1), TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_5])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.isAdvancedDisplayed ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
    key: 1,
    href: "javascript:;",
    onClick: _cache[1] || (_cache[1] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])($event => _ctx.isAdvancedDisplayed = false, ["prevent"]))
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('CoreAdminHome_HideAdvancedOptions')) + " ", 1), TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_6])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_7, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    innerHTML: _ctx.$sanitize(_ctx.getAdvancedStepText)
  }, null, 8, TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_8), _ctx.showContainerRow || _ctx.environments.length > 1 ? Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_ActivityIndicator, {
    key: 0,
    loading: true
  }, null, 512)), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isLoading]]) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.showContainerRow || _ctx.environments.length > 1 ? Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_9, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_10, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_11, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_12, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_13, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Website')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_14, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_SiteSelector, {
    id: "tagManagerTrackingCodeSite",
    modelValue: _ctx.site,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => _ctx.site = $event),
    "show-all-sites-item": false,
    "switch-site-on-select": false,
    "show-selected-site": true
  }, null, 8, ["modelValue"])])])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_15, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
    uicontrol: "select",
    name: "containers",
    "model-value": _ctx.idContainer,
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => {
      _ctx.idContainer = $event;
      _ctx.onContainerChange();
    }),
    options: _ctx.containerOptions,
    disabled: _ctx.containerOptions.length <= 1,
    "full-width": true,
    title: _ctx.translate('TagManager_Container')
  }, null, 8, ["model-value", "options", "disabled", "title"])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_16, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
    uicontrol: "select",
    name: "environment",
    "model-value": _ctx.environment,
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => {
      _ctx.environment = $event;
      this.$emit('fetchInstallInstructions');
    }),
    options: _ctx.environments,
    disabled: _ctx.environments.length <= 1,
    "full-width": true,
    title: _ctx.translate('TagManager_Environment')
  }, null, 8, ["model-value", "options", "disabled", "title"])])])], 512)), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.isLoading]]) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.idContainer ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
    key: 2,
    innerHTML: _ctx.$sanitize(_ctx.getAdvancedStepInfo)
  }, null, 8, TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_17)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isAdvancedDisplayed]])])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.idContainer && _ctx.noReleaseFound ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_18, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_NoReleasesFoundForContainer')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_19, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_PublishVersionToEnvironmentToViewEmbedCode')), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.installInstructions, (installInstruction, index) => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
      key: index
    }, [_ctx.showDescription ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("p", TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_20, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(installInstruction.description) + " ", 1), installInstruction.helpUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
      key: 0,
      target: "_blank",
      href: installInstruction.helpUrl
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_LearnMore')), 9, TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_21)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(". ")])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.showPlainMtmSteps ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
      key: 1,
      innerHTML: _ctx.$sanitize(_ctx.getMtmStep3)
    }, null, 8, TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_22)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("pre", {
      class: "codeblock",
      textContent: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(installInstruction.embedCode),
      ref_for: true,
      ref: "codeblock"
    }, null, 8, TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_23), [[_directive_copy_to_clipboard, {}]])])], 64);
  }), 128)), _ctx.showBottom && !_ctx.noReleaseFound && _ctx.idContainer ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 2
  }, [!_ctx.showTestSection ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("p", {
    key: 0,
    innerHTML: _ctx.$sanitize(_ctx.getCongratulationsText)
  }, null, 8, TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_24)) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", TrackingCodeCommonvue_type_template_id_23c13e80_hoisted_25, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDynamicComponent"])(_ctx.testComponent), {
    site: _ctx.site
  }, null, 8, ["site"]))]))], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/TagmanagerTrackingCode/TrackingCodeCommon.vue?vue&type=template&id=23c13e80

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/TagmanagerTrackingCode/TrackingCodeCommon.vue?vue&type=script&lang=ts



function ucfirst(s) {
  return `${s.substr(0, 1).toUpperCase()}${s.substr(1)}`;
}
/* harmony default export */ var TrackingCodeCommonvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    showContainerRow: Boolean,
    showBottom: Boolean,
    showDescription: Boolean,
    showPlainMtmSteps: Boolean,
    showTestSection: Boolean,
    showAdvancedOptions: {
      required: false,
      type: Boolean,
      default: false
    }
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
  data() {
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
      noReleaseFound: false,
      isAdvancedDisplayed: false
    };
  },
  created() {
    external_CoreHome_["AjaxHelper"].fetch({
      method: 'TagManager.getAvailableEnvironments',
      filter_limit: '-1'
    }).then(environments => {
      let entities;
      if (Array.isArray(environments)) {
        entities = environments;
      } else {
        entities = Object.values(environments);
      }
      this.environmentNameMap = Object.fromEntries(entities.map(({
        id,
        name
      }) => [id, name]));
    });
    this.onSiteChange();
    this.isAdvancedDisplayed = this.showAdvancedOptions;
  },
  watch: {
    site() {
      this.onSiteChange();
    }
  },
  methods: {
    onSiteChange() {
      var _this$site;
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
      }).then(containers => {
        this.containerOptions = [];
        if (!(containers !== null && containers !== void 0 && containers.length)) {
          this.idContainer = '';
          this.isAdvancedDisplayed = true;
          this.containerOptions.push({
            key: '',
            value: this.translate('TagManager_NoContainersFound')
          });
          return;
        }
        containers.forEach(container => {
          if (!this.idContainer) {
            this.idContainer = container.idcontainer;
          }
          this.containerMap[container.idcontainer] = container;
          this.containerOptions.push({
            key: container.idcontainer,
            value: container.name
          });
        });
        this.onContainerChange();
      }).finally(() => {
        this.isLoading = false;
      });
    },
    onContainerChange() {
      this.noReleaseFound = false;
      if (!this.idContainer) {
        return;
      }
      this.installInstructions = [];
      const container = this.containerMap[this.idContainer];
      const draftVersion = container.draft.idcontainerversion;
      this.environment = '';
      this.environments = [];
      const releases = container.releases || [];
      if (releases.find(r => r.environment === 'live')) {
        // we always prefer to pre-select the live environment
        this.environment = 'live';
      }
      releases.forEach(release => {
        if (release.environment === 'preview') {
          return; // there is nothing to embed for this environment
        }
        if (!this.environment) {
          this.environment = release.environment;
        }
        let name = ucfirst(release.environment);
        if (release.environment in this.environmentNameMap) {
          name = this.environmentNameMap[release.environment];
        }
        this.environments.push({
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
    linkTo(action, idSite, idContainer, hash) {
      const newQuery = external_CoreHome_["MatomoUrl"].stringify(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].urlParsed.value), {}, {
        module: 'TagManager',
        action,
        idSite,
        idContainer
      }));
      let newUrl = `${window.location.pathname}?${newQuery}`;
      if (hash) {
        newUrl += `#?${external_CoreHome_["MatomoUrl"].stringify(hash)}`;
      }
      return newUrl;
    },
    fetchVariables(containerDraftVersion) {
      var _this$site2;
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
      }).then(variables => {
        this.matomoConfigs = variables.filter(v => v.type === 'MatomoConfiguration');
      }).finally(() => {
        this.isLoading = false;
      });
    }
  },
  computed: {
    getLearnMoreLink() {
      return Object(external_CoreHome_["translate"])('TagManager_CustomHtmlTagHelpText', Object(external_CoreHome_["externalLink"])('https://matomo.org/faq/tag-manager/container-dashboard-in-matomo-tag-manager/'), '</a>');
    },
    getMtmStep3() {
      return Object(external_CoreHome_["translate"])('TagManager_CopyCodePasteInHeader', '&lt;/head&gt;');
    },
    getCongratulationsText() {
      return Object(external_CoreHome_["translate"])('TagManager_SiteWithoutDataReactFollowStepCompleted', '<strong>', '</strong>');
    },
    testComponent() {
      if (this.showTestSection) {
        return Object(external_CoreHome_["useExternalPluginComponent"])('JsTrackerInstallCheck', 'JsTrackerInstallCheck');
      }
      return '';
    },
    getAdvancedStepText() {
      var _this$site3;
      const stepText = Object(external_CoreHome_["translate"])('TagManager_SelectContainerForWebsite', '<strong>', '</strong>');
      if (this.idContainer) {
        return stepText;
      }
      // If not container is found, we should include a link to the manage containers area
      const manageContainerURL = this.linkTo('manageContainers', String((_this$site3 = this.site) === null || _this$site3 === void 0 ? void 0 : _this$site3.id), '');
      const manageContainersText = Object(external_CoreHome_["translate"])('TagManager_ManageContainersLink', `<a href="${manageContainerURL}" target="_blank" rel="noreferrer noopener">`, '</a>');
      return `${stepText} ${manageContainersText}`;
    },
    getAdvancedStepInfo() {
      const idSite = this.site && this.site.id ? this.site.id : '';
      const link = this.linkTo('dashboard', idSite, this.idContainer, []);
      return Object(external_CoreHome_["translate"])('TagManager_CustomiseContainer', `<a href="${link}">`, '</a>', Object(external_CoreHome_["externalLink"])('https://matomo.org/faq/tag-manager/container-dashboard-in-matomo-tag-manager/'), '</a>');
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/TagmanagerTrackingCode/TrackingCodeCommon.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/TagmanagerTrackingCode/TrackingCodeCommon.vue



TrackingCodeCommonvue_type_script_lang_ts.render = TrackingCodeCommonvue_type_template_id_23c13e80_render

/* harmony default export */ var TrackingCodeCommon = (TrackingCodeCommonvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/TagmanagerTrackingCode/TrackingCodePage.vue?vue&type=template&id=5d8c78fb

const TrackingCodePagevue_type_template_id_5d8c78fb_hoisted_1 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);
const TrackingCodePagevue_type_template_id_5d8c78fb_hoisted_2 = {
  class: "followStepsHeading"
};
const TrackingCodePagevue_type_template_id_5d8c78fb_hoisted_3 = {
  style: {
    "list-style": "inside decimal"
  }
};
function TrackingCodePagevue_type_template_id_5d8c78fb_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_TrackingCodeCommon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("TrackingCodeCommon");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDynamicComponent"])(_ctx.currentAction === 'getTrackingMethodsForSite' ? 'div' : 'ContentBlock'), {
    anchor: "tagmanager",
    "content-title": _ctx.translate('TagManager_MatomoTagManager')
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('TagManager_MtmTrackingCodeIntro')), 1), TrackingCodePagevue_type_template_id_5d8c78fb_hoisted_1, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", TrackingCodePagevue_type_template_id_5d8c78fb_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("strong", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('SitesManager_SiteWithoutDataCloudflareFollowStepsIntro')), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ol", TrackingCodePagevue_type_template_id_5d8c78fb_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_TrackingCodeCommon, {
      "show-container-row": _ctx.showContainerRow,
      showBottom: true,
      showDescription: false,
      showPlainMtmSteps: true,
      showAdvancedOptions: _ctx.currentAction === 'trackingCodeGenerator',
      showTestSection: _ctx.currentAction === 'getTrackingMethodsForSite' && _ctx.isJsTrackerInstallCheckAvailable,
      onFetchInstallInstructions: _ctx.fetchInstallInstructions,
      ref: "trackingCodeCommon"
    }, null, 8, ["show-container-row", "showAdvancedOptions", "showTestSection", "onFetchInstallInstructions"])])]),
    _: 1
  }, 8, ["content-title"]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/TagmanagerTrackingCode/TrackingCodePage.vue?vue&type=template&id=5d8c78fb

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/TagmanagerTrackingCode/TrackingCodePage.vue?vue&type=script&lang=ts



/* harmony default export */ var TrackingCodePagevue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    currentAction: String,
    showContainerRow: Boolean,
    isJsTrackerInstallCheckAvailable: Boolean
  },
  components: {
    ContentBlock: external_CoreHome_["ContentBlock"],
    TrackingCodeCommon: TrackingCodeCommon
  },
  methods: {
    fetchInstallInstructions() {
      var _refs$site, _refs$site2;
      // eslint-disable-next-line
      const refs = this.$refs.trackingCodeCommon;
      refs.installInstructions = [];
      if (!(refs !== null && refs !== void 0 && (_refs$site = refs.site) !== null && _refs$site !== void 0 && _refs$site.id) || !(refs !== null && refs !== void 0 && refs.environment)) {
        return;
      }
      refs.isLoading = true;
      external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainerInstallInstructions',
        filter_limit: '-1',
        idContainer: refs === null || refs === void 0 ? void 0 : refs.idContainer,
        environment: refs === null || refs === void 0 ? void 0 : refs.environment,
        idSite: refs === null || refs === void 0 || (_refs$site2 = refs.site) === null || _refs$site2 === void 0 ? void 0 : _refs$site2.id
      }).then(instructions => {
        refs.installInstructions = instructions;
        Object(external_commonjs_vue_commonjs2_vue_root_Vue_["nextTick"])(() => {
          const codeblocks = Array.isArray(this.$refs.codeblock) ? this.$refs.codeblock : [this.$refs.codeblock];
          codeblocks.forEach(n => {
            $(n).effect('highlight', {}, 1500);
          });
        });
      }).finally(() => {
        refs.isLoading = false;
      });
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/TagmanagerTrackingCode/TrackingCodePage.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/TagmanagerTrackingCode/TrackingCodePage.vue



TrackingCodePagevue_type_script_lang_ts.render = TrackingCodePagevue_type_template_id_5d8c78fb_render

/* harmony default export */ var TrackingCodePage = (TrackingCodePagevue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/TagmanagerTrackingCode/TrackingSPAPage.vue?vue&type=template&id=278cbe58

const TrackingSPAPagevue_type_template_id_278cbe58_hoisted_1 = {
  class: "list-style-decimal"
};
const TrackingSPAPagevue_type_template_id_278cbe58_hoisted_2 = {
  ref: "step1"
};
const TrackingSPAPagevue_type_template_id_278cbe58_hoisted_3 = ["innerHTML"];
const TrackingSPAPagevue_type_template_id_278cbe58_hoisted_4 = ["innerHTML"];
const TrackingSPAPagevue_type_template_id_278cbe58_hoisted_5 = ["textContent"];
const TrackingSPAPagevue_type_template_id_278cbe58_hoisted_6 = ["innerHTML"];
const TrackingSPAPagevue_type_template_id_278cbe58_hoisted_7 = ["textContent"];
const TrackingSPAPagevue_type_template_id_278cbe58_hoisted_8 = ["innerHTML"];
const TrackingSPAPagevue_type_template_id_278cbe58_hoisted_9 = ["innerHTML"];
const TrackingSPAPagevue_type_template_id_278cbe58_hoisted_10 = ["innerHTML"];
const TrackingSPAPagevue_type_template_id_278cbe58_hoisted_11 = ["textContent"];
const TrackingSPAPagevue_type_template_id_278cbe58_hoisted_12 = {
  style: {
    "list-style": "lower-alpha",
    "list-style-position": "inside"
  }
};
const TrackingSPAPagevue_type_template_id_278cbe58_hoisted_13 = ["innerHTML"];
const TrackingSPAPagevue_type_template_id_278cbe58_hoisted_14 = ["innerHTML"];
const TrackingSPAPagevue_type_template_id_278cbe58_hoisted_15 = ["innerHTML"];
const TrackingSPAPagevue_type_template_id_278cbe58_hoisted_16 = ["textContent"];
const TrackingSPAPagevue_type_template_id_278cbe58_hoisted_17 = ["textContent"];
const TrackingSPAPagevue_type_template_id_278cbe58_hoisted_18 = ["innerHTML"];
const TrackingSPAPagevue_type_template_id_278cbe58_hoisted_19 = ["textContent"];
const TrackingSPAPagevue_type_template_id_278cbe58_hoisted_20 = ["innerHTML"];
const TrackingSPAPagevue_type_template_id_278cbe58_hoisted_21 = ["innerHTML"];
const TrackingSPAPagevue_type_template_id_278cbe58_hoisted_22 = ["textContent"];
function TrackingSPAPagevue_type_template_id_278cbe58_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_TrackingCodeCommon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("TrackingCodeCommon");
  const _directive_copy_to_clipboard = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("copy-to-clipboard");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("ol", TrackingSPAPagevue_type_template_id_278cbe58_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", TrackingSPAPagevue_type_template_id_278cbe58_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_TrackingCodeCommon, {
    "show-container-row": _ctx.showContainerRow,
    showBottom: false,
    showDescription: false,
    onFetchInstallInstructions: _ctx.fetchInstallInstructionsSPA,
    ref: "trackingCodeCommon"
  }, null, 8, ["show-container-row", "onFetchInstallInstructions"])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.step1HasContent]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    innerHTML: _ctx.$sanitize(_ctx.setupStep2)
  }, null, 8, TrackingSPAPagevue_type_template_id_278cbe58_hoisted_3), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep3)
  }, null, 8, TrackingSPAPagevue_type_template_id_278cbe58_hoisted_4), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    textContent: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.fetchClickX('TagManager_CreateNewTrigger'))
  }, null, 8, TrackingSPAPagevue_type_template_id_278cbe58_hoisted_5), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep5)
  }, null, 8, TrackingSPAPagevue_type_template_id_278cbe58_hoisted_6), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    textContent: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.fetchClickX('TagManager_CreateNewTrigger'))
  }, null, 8, TrackingSPAPagevue_type_template_id_278cbe58_hoisted_7), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    innerHTML: _ctx.$sanitize(_ctx.setupStep7)
  }, null, 8, TrackingSPAPagevue_type_template_id_278cbe58_hoisted_8), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep8)
  }, null, 8, TrackingSPAPagevue_type_template_id_278cbe58_hoisted_9), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep9)
  }, null, 8, TrackingSPAPagevue_type_template_id_278cbe58_hoisted_10), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
    textContent: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.fetchFollowStep10)
  }, null, 8, TrackingSPAPagevue_type_template_id_278cbe58_hoisted_11), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ol", TrackingSPAPagevue_type_template_id_278cbe58_hoisted_12, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep10a)
  }, null, 8, TrackingSPAPagevue_type_template_id_278cbe58_hoisted_13), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep10b)
  }, null, 8, TrackingSPAPagevue_type_template_id_278cbe58_hoisted_14)])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep11)
  }, null, 8, TrackingSPAPagevue_type_template_id_278cbe58_hoisted_15), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    textContent: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.fetchClickX('General_Update'))
  }, null, 8, TrackingSPAPagevue_type_template_id_278cbe58_hoisted_16), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    textContent: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.fetchFollowStep13)
  }, null, 8, TrackingSPAPagevue_type_template_id_278cbe58_hoisted_17), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep14)
  }, null, 8, TrackingSPAPagevue_type_template_id_278cbe58_hoisted_18), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    textContent: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.fetchFollowStep15)
  }, null, 8, TrackingSPAPagevue_type_template_id_278cbe58_hoisted_19), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", null, [_ctx.jsFramework === 'react' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
    key: 0,
    innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep16React)
  }, null, 8, TrackingSPAPagevue_type_template_id_278cbe58_hoisted_20)) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
    key: 1,
    innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep16SPA)
  }, null, 8, TrackingSPAPagevue_type_template_id_278cbe58_hoisted_21)), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.installInstructions, (installInstruction, index) => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
      key: index
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("pre", {
      class: "codeblock",
      textContent: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(installInstruction.embedCode),
      ref_for: true,
      ref: "codeblock"
    }, null, 8, TrackingSPAPagevue_type_template_id_278cbe58_hoisted_22), [[_directive_copy_to_clipboard, {}]])]);
  }), 128))])]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/TagmanagerTrackingCode/TrackingSPAPage.vue?vue&type=template&id=278cbe58

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/TagmanagerTrackingCode/TrackingSPAPage.vue?vue&type=script&lang=ts



/* harmony default export */ var TrackingSPAPagevue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    showContainerRow: Boolean,
    jsFramework: String
  },
  components: {
    TrackingCodeCommon: TrackingCodeCommon
  },
  directives: {
    CopyToClipboard: external_CoreHome_["CopyToClipboard"]
  },
  data() {
    return {
      setupStep1: '',
      setupStep2: '',
      setupStep7: '',
      installInstructions: []
    };
  },
  methods: {
    fetchInstallInstructionsSPA() {
      var _refs$site, _refs$site2;
      // eslint-disable-next-line
      const refs = this.$refs.trackingCodeCommon;
      this.installInstructions = [];
      if (!(refs !== null && refs !== void 0 && refs.idContainer) || !(refs !== null && refs !== void 0 && refs.environment) || !(refs !== null && refs !== void 0 && (_refs$site = refs.site) !== null && _refs$site !== void 0 && _refs$site.id)) {
        return;
      }
      const manageContainerURL = this.linkTo('manageContainers', refs.site.id, refs.idContainer);
      this.setupStep1 = Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep1', '<br><strong>', '</strong>', `<a href="${manageContainerURL}" target="_blank" rel="noreferrer noopener">`, '</a>');
      const triggersUrl = this.linkTo('manageTriggers', refs.site.id, refs.idContainer);
      this.setupStep2 = Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep2', `<a href="${triggersUrl}" target="_blank" rel="noreferrer noopener">`, '</a>');
      const tagsURL = this.linkTo('manageTags', refs.site.id, refs.idContainer);
      this.setupStep7 = Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep7', `<a href="${tagsURL}" target="_blank" rel="noreferrer noopener">`, '</a>');
      refs.isLoading = true;
      external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainerInstallInstructions',
        filter_limit: '-1',
        idContainer: refs === null || refs === void 0 ? void 0 : refs.idContainer,
        environment: refs === null || refs === void 0 ? void 0 : refs.environment,
        idSite: refs === null || refs === void 0 || (_refs$site2 = refs.site) === null || _refs$site2 === void 0 ? void 0 : _refs$site2.id,
        jsFramework: this.jsFramework
      }).then(instructions => {
        this.installInstructions = instructions;
        Object(external_commonjs_vue_commonjs2_vue_root_Vue_["nextTick"])(() => {
          const codeblocks = Array.isArray(this.$refs.codeblock) ? this.$refs.codeblock : [this.$refs.codeblock];
          codeblocks.forEach(n => {
            $(n).effect('highlight', {}, 1500);
          });
        });
      }).finally(() => {
        refs.isLoading = false;
      });
    },
    linkTo(action, idSite, idContainer, hash) {
      let url = external_CoreHome_["MatomoUrl"].stringify(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].urlParsed.value), {}, {
        module: 'TagManager',
        action,
        idSite,
        idContainer
      }));
      if (hash) {
        url += `#?${external_CoreHome_["MatomoUrl"].stringify(hash)}`;
      }
      return `?${url}`;
    },
    fetchClickX(clickTarget) {
      return Object(external_CoreHome_["translate"])('General_ClickX', Object(external_CoreHome_["translate"])(clickTarget));
    }
  },
  computed: {
    step1HasContent() {
      const elem = this.$refs.step1;
      return elem && elem.textContent !== '';
    },
    fetchFollowStep3() {
      return Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep3', `<strong>${Object(external_CoreHome_["translate"])('TagManager_PageViewTriggerName')}</strong>`, Object(external_CoreHome_["translate"])('TagManager_PageViewTriggerName'), Object(external_CoreHome_["externalLink"])('https://matomo.org/faq/tag-manager/how-do-i-track-pageviews-of-my-website-using-matomo-tag-manager/#create-pageview-trigger'), '</a>');
    },
    fetchFollowStep5() {
      return Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep5', `<strong>${Object(external_CoreHome_["translate"])('TagManager_HistoryChangeTriggerName')}</strong>`, Object(external_CoreHome_["translate"])('TagManager_CategoryUserEngagement'));
    },
    fetchFollowStep8() {
      return Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep8', `<strong>${Object(external_CoreHome_["translate"])('TagManager_PageViewTriggerName')}</strong>`, `<strong>${Object(external_CoreHome_["translate"])('TagManager_MatomoTagName')}</strong>`, Object(external_CoreHome_["translate"])('TagManager_PageViewTriggerName'), Object(external_CoreHome_["externalLink"])('https://matomo.org/faq/tag-manager/how-do-i-track-pageviews-of-my-website-using-matomo-tag-manager/#create-pageview-tag'), '</a>');
    },
    fetchFollowStep9() {
      return Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep9', Object(external_CoreHome_["translate"])('TagManager_ConfigureWhatTagDoes'), Object(external_CoreHome_["translate"])('TagManager_CustomTitle'), '<strong>', '</strong>');
    },
    fetchFollowStep10() {
      return Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep10', Object(external_CoreHome_["translate"])('TagManager_CustomUrl'));
    },
    fetchFollowStep10a() {
      return Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep10a', '<strong>', '</strong>', Object(external_CoreHome_["translate"])('TagManager_CustomUrl'));
    },
    fetchFollowStep10b() {
      return Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep10b', Object(external_CoreHome_["translate"])('TagManager_CustomUrl'), '<strong>', '</strong>');
    },
    fetchFollowStep11() {
      return Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep11', Object(external_CoreHome_["translate"])('TagManager_ConfigureWhenTagDoes'), Object(external_CoreHome_["translate"])('TagManager_FireTriggerTitle'), `<strong>${Object(external_CoreHome_["translate"])('TagManager_HistoryChangeTriggerName')}</strong>`, `<strong>${Object(external_CoreHome_["translate"])('TagManager_PageViewTriggerName')}</strong>`);
    },
    fetchFollowStep13() {
      return Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep13', Object(external_CoreHome_["translate"])('TagManager_Publish'));
    },
    fetchFollowStep14() {
      return Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep14', Object(external_CoreHome_["translate"])('TagManager_VersionName'), '<strong>', '</strong>');
    },
    fetchFollowStep15() {
      return Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep15', Object(external_CoreHome_["translate"])('TagManager_CreateVersionAndPublishRelease'));
    },
    fetchFollowStep16SPA() {
      return Object(external_CoreHome_["translate"])('TagManager_SPAFollowStep16', '&lt;/head&gt;', Object(external_CoreHome_["externalLink"])('https://developer.matomo.org/guides/tagmanager/embedding'), '</a>');
    },
    fetchFollowStep16React() {
      return Object(external_CoreHome_["translate"])('TagManager_ReactFollowStep16', '<strong>', '</strong>', '<strong>App.js</strong>', '<strong>React.useEffect</strong>', '<strong>Hello World</strong>', '<strong>React.js</strong>');
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/TagmanagerTrackingCode/TrackingSPAPage.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/TagmanagerTrackingCode/TrackingSPAPage.vue



TrackingSPAPagevue_type_script_lang_ts.render = TrackingSPAPagevue_type_template_id_278cbe58_render

/* harmony default export */ var TrackingSPAPage = (TrackingSPAPagevue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Debugging/Debugging.vue?vue&type=template&id=1ae9acce

const Debuggingvue_type_template_id_1ae9acce_hoisted_1 = {
  class: "nav-wrapper"
};
const Debuggingvue_type_template_id_1ae9acce_hoisted_2 = {
  class: "pull-right"
};
const Debuggingvue_type_template_id_1ae9acce_hoisted_3 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("svg", {
  class: "tm-icon tm-icon-close"
}, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("use", {
  "xlink:href": "#tm-icon-close"
})], -1);
const Debuggingvue_type_template_id_1ae9acce_hoisted_4 = [Debuggingvue_type_template_id_1ae9acce_hoisted_3];
const Debuggingvue_type_template_id_1ae9acce_hoisted_5 = {
  class: "pull-right"
};
const Debuggingvue_type_template_id_1ae9acce_hoisted_6 = {
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
};
const Debuggingvue_type_template_id_1ae9acce_hoisted_7 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("defs", null, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("symbol", {
  id: "tm-icon-checkmark",
  viewBox: "0 0 32 32"
}, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("path", {
  d: "M27 4l-15 15-7-7-5 5 12 12 20-20z"
})])], -1);
const Debuggingvue_type_template_id_1ae9acce_hoisted_8 = [Debuggingvue_type_template_id_1ae9acce_hoisted_7];
const Debuggingvue_type_template_id_1ae9acce_hoisted_9 = {
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
};
const Debuggingvue_type_template_id_1ae9acce_hoisted_10 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("symbol", {
  id: "tm-icon-close",
  viewBox: "0 0 32 32"
}, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("path", {
  d: "M31.33 0.67c0.893 0.893 0.893 2.34 0 3.232l-27.427 27.427c-0.893 0.893-2.34\n          0.893-3.232 0s-0.893-2.34 0-3.232l27.427-27.427c0.892-0.893 2.34-0.893 3.232 0z"
}), /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("path", {
  d: "M0.67 0.67c0.893-0.893 2.34-0.893 3.232 0l27.427 27.427c0.893 0.892 0.893\n          2.34 0 3.232s-2.34 0.892-3.232 0l-27.427-27.427c-0.893-0.893-0.893-2.34 0-3.232z"
})], -1);
const Debuggingvue_type_template_id_1ae9acce_hoisted_11 = [Debuggingvue_type_template_id_1ae9acce_hoisted_10];
const Debuggingvue_type_template_id_1ae9acce_hoisted_12 = {
  class: "page",
  style: {
    "clear": "both"
  }
};
const Debuggingvue_type_template_id_1ae9acce_hoisted_13 = {
  key: 0,
  id: "secondNavBar",
  class: "Menu--dashboard z-depth-1"
};
const Debuggingvue_type_template_id_1ae9acce_hoisted_14 = {
  class: "navbar",
  role: "menu",
  style: {
    "padding": "0"
  }
};
const Debuggingvue_type_template_id_1ae9acce_hoisted_15 = {
  class: "menuTab",
  role: "menuitem"
};
const Debuggingvue_type_template_id_1ae9acce_hoisted_16 = {
  class: "item",
  style: {
    "font-weight": "normal"
  }
};
const Debuggingvue_type_template_id_1ae9acce_hoisted_17 = {
  key: 0
};
const Debuggingvue_type_template_id_1ae9acce_hoisted_18 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);
const Debuggingvue_type_template_id_1ae9acce_hoisted_19 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);
const Debuggingvue_type_template_id_1ae9acce_hoisted_20 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
  for: "onlyfiredTags",
  class: "lbl-onlyfiredTags"
}, "Only fired tags", -1);
const Debuggingvue_type_template_id_1ae9acce_hoisted_21 = {
  key: 0,
  style: {
    "padding": "0 0 1rem 1.2rem"
  }
};
const Debuggingvue_type_template_id_1ae9acce_hoisted_22 = ["onClick", "title"];
const Debuggingvue_type_template_id_1ae9acce_hoisted_23 = {
  title: "This tag was fired"
};
const Debuggingvue_type_template_id_1ae9acce_hoisted_24 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("svg", {
  class: "tm-icon tm-icon-checkmark"
}, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("use", {
  "xlink:href": "#tm-icon-checkmark"
})], -1);
const Debuggingvue_type_template_id_1ae9acce_hoisted_25 = [Debuggingvue_type_template_id_1ae9acce_hoisted_24];
const Debuggingvue_type_template_id_1ae9acce_hoisted_26 = {
  class: "pageWrap"
};
const Debuggingvue_type_template_id_1ae9acce_hoisted_27 = {
  class: "home",
  id: "content"
};
const Debuggingvue_type_template_id_1ae9acce_hoisted_28 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", null, "Fired Tags", -1);
const Debuggingvue_type_template_id_1ae9acce_hoisted_29 = {
  class: "entityTable"
};
const Debuggingvue_type_template_id_1ae9acce_hoisted_30 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, "Action"), /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, "Name"), /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, "Type"), /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, "Fired count")])], -1);
const Debuggingvue_type_template_id_1ae9acce_hoisted_31 = {
  key: 0
};
const Debuggingvue_type_template_id_1ae9acce_hoisted_32 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
  colspan: "4"
}, "No tags", -1);
const Debuggingvue_type_template_id_1ae9acce_hoisted_33 = [Debuggingvue_type_template_id_1ae9acce_hoisted_32];
const Debuggingvue_type_template_id_1ae9acce_hoisted_34 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", {
  style: {
    "margin-top": "30px"
  }
}, "Not Yet Fired Tags", -1);
const Debuggingvue_type_template_id_1ae9acce_hoisted_35 = {
  class: "entityTable"
};
const Debuggingvue_type_template_id_1ae9acce_hoisted_36 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, "Name"), /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, "Type")])], -1);
const Debuggingvue_type_template_id_1ae9acce_hoisted_37 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
  colspan: "4"
}, "No tags", -1);
const Debuggingvue_type_template_id_1ae9acce_hoisted_38 = [Debuggingvue_type_template_id_1ae9acce_hoisted_37];
const Debuggingvue_type_template_id_1ae9acce_hoisted_39 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", null, "Triggers", -1);
const Debuggingvue_type_template_id_1ae9acce_hoisted_40 = {
  class: "entityTable"
};
const Debuggingvue_type_template_id_1ae9acce_hoisted_41 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, "Name"), /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, "Type")])], -1);
const Debuggingvue_type_template_id_1ae9acce_hoisted_42 = {
  key: 0
};
const Debuggingvue_type_template_id_1ae9acce_hoisted_43 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
  colspan: "4"
}, "No trigger", -1);
const Debuggingvue_type_template_id_1ae9acce_hoisted_44 = [Debuggingvue_type_template_id_1ae9acce_hoisted_43];
const Debuggingvue_type_template_id_1ae9acce_hoisted_45 = {
  key: 1
};
const Debuggingvue_type_template_id_1ae9acce_hoisted_46 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", null, "Pushed data by this event", -1);
const Debuggingvue_type_template_id_1ae9acce_hoisted_47 = {
  class: "entityTable"
};
const _hoisted_48 = {
  style: {
    "word-break": "break-all"
  }
};
const _hoisted_49 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);
const _hoisted_50 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", null, "Content after this event", -1);
const _hoisted_51 = {
  class: "entityTable"
};
const _hoisted_52 = {
  style: {
    "word-break": "break-all"
  }
};
const _hoisted_53 = {
  class: "entityTable"
};
const _hoisted_54 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, "Name"), /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, "Type"), /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, "Value")])], -1);
const _hoisted_55 = {
  key: 0
};
const _hoisted_56 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
  colspan: "3"
}, "No variables", -1);
const _hoisted_57 = [_hoisted_56];
const _hoisted_58 = {
  style: {
    "word-break": "break-all"
  }
};
const _hoisted_59 = {
  class: "entityTable"
};
const _hoisted_60 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, "Time"), /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, "Message")])], -1);
const _hoisted_61 = {
  style: {
    "word-break": "break-all"
  }
};
const _hoisted_62 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);
function Debuggingvue_type_template_id_1ae9acce_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _ctx$selectedEvent, _ctx$selectedEvent2, _ctx$selectedEvent3, _ctx$selectedEvent4, _ctx$selectedEvent5, _ctx$selectedEvent6;
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("nav", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", Debuggingvue_type_template_id_1ae9acce_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "logo")]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])({
      'active': _ctx.contentTab === 'tags' || !_ctx.contentTab
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    onClick: _cache[0] || (_cache[0] = $event => _ctx.contentTab = 'tags')
  }, "Tags")], 2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])({
      'active': _ctx.contentTab === 'triggers'
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    onClick: _cache[1] || (_cache[1] = $event => _ctx.contentTab = 'triggers')
  }, "Triggers")], 2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])({
      'active': _ctx.contentTab === 'variables'
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    onClick: _cache[2] || (_cache[2] = $event => _ctx.contentTab = 'variables')
  }, "Variables")], 2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])({
      'active': _ctx.contentTab === 'dataLayer'
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    onClick: _cache[3] || (_cache[3] = $event => _ctx.contentTab = 'dataLayer')
  }, "Data Layer")], 2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])({
      'active': _ctx.contentTab === 'logs'
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    onClick: _cache[4] || (_cache[4] = $event => _ctx.contentTab = 'logs')
  }, "Logs")], 2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", Debuggingvue_type_template_id_1ae9acce_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    id: "mtmCloseDebug",
    onClick: _cache[5] || (_cache[5] = $event => _ctx.mtmCloseDebugWindow())
  }, Debuggingvue_type_template_id_1ae9acce_hoisted_4)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", Debuggingvue_type_template_id_1ae9acce_hoisted_5, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    id: "mtmUpdateDebugPosition",
    onClick: _cache[6] || (_cache[6] = $event => _ctx.mtmUpdateDebugPosition())
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.positionText), 1)])])])]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("svg", Debuggingvue_type_template_id_1ae9acce_hoisted_6, Debuggingvue_type_template_id_1ae9acce_hoisted_8)), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("svg", Debuggingvue_type_template_id_1ae9acce_hoisted_9, Debuggingvue_type_template_id_1ae9acce_hoisted_11)), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", Debuggingvue_type_template_id_1ae9acce_hoisted_12, [_ctx.contentTab !== 'logs' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", Debuggingvue_type_template_id_1ae9acce_hoisted_13, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", Debuggingvue_type_template_id_1ae9acce_hoisted_14, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", Debuggingvue_type_template_id_1ae9acce_hoisted_15, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", Debuggingvue_type_template_id_1ae9acce_hoisted_16, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" Events "), _ctx.mtmEvents.length > 0 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", Debuggingvue_type_template_id_1ae9acce_hoisted_17, [Debuggingvue_type_template_id_1ae9acce_hoisted_18, Debuggingvue_type_template_id_1ae9acce_hoisted_19, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    type: "checkbox",
    class: "onlyFiredTags-chk",
    name: "onlyfiredTags",
    id: "onlyfiredTags",
    value: "1",
    "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => _ctx.onlyfiredTags = $event),
    style: {
      "margin-right": "3.5px"
    }
  }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelCheckbox"], _ctx.onlyfiredTags]]), Debuggingvue_type_template_id_1ae9acce_hoisted_20])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])]), _ctx.mtmEvents.length === 0 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", Debuggingvue_type_template_id_1ae9acce_hoisted_21, "No event executed")) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.mtmEventsReversed, (event, index) => {
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
      onClick: $event => _ctx.selectEvent(event.index0),
      title: `Time: ${event.time}. Trigger: ${(_event$metTrigger = event.metTrigger) === null || _event$metTrigger === void 0 ? void 0 : _event$metTrigger.name}`
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(event.index) + ": " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(event.name) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", Debuggingvue_type_template_id_1ae9acce_hoisted_23, Debuggingvue_type_template_id_1ae9acce_hoisted_25, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], (_event$tags = event.tags) === null || _event$tags === void 0 ? void 0 : _event$tags.length]])], 8, Debuggingvue_type_template_id_1ae9acce_hoisted_22)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 2);
  }), 128))])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", Debuggingvue_type_template_id_1ae9acce_hoisted_26, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", Debuggingvue_type_template_id_1ae9acce_hoisted_27, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.homeTabTitle), 513), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.contentTab !== 'logs']]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Debuggingvue_type_template_id_1ae9acce_hoisted_28, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("table", Debuggingvue_type_template_id_1ae9acce_hoisted_29, [Debuggingvue_type_template_id_1ae9acce_hoisted_30, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [!((_ctx$selectedEvent = _ctx.selectedEvent) !== null && _ctx$selectedEvent !== void 0 && (_ctx$selectedEvent = _ctx$selectedEvent.tags) !== null && _ctx$selectedEvent !== void 0 && _ctx$selectedEvent.length) ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", Debuggingvue_type_template_id_1ae9acce_hoisted_31, Debuggingvue_type_template_id_1ae9acce_hoisted_33)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(((_ctx$selectedEvent2 = _ctx.selectedEvent) === null || _ctx$selectedEvent2 === void 0 ? void 0 : _ctx$selectedEvent2.tags) || [], (tag, index) => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
      key: index
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(tag.action), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(tag.name), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(tag.type), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(tag.numExecuted), 1)]);
  }), 128))])]), Debuggingvue_type_template_id_1ae9acce_hoisted_34, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("table", Debuggingvue_type_template_id_1ae9acce_hoisted_35, [Debuggingvue_type_template_id_1ae9acce_hoisted_36, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, Debuggingvue_type_template_id_1ae9acce_hoisted_38, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.notFiredTags.length === 0]]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.notFiredTags, (tag, index) => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
      key: index
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(tag.name), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(tag.type), 1)]);
  }), 128))])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.contentTab === 'tags' || !_ctx.contentTab]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Debuggingvue_type_template_id_1ae9acce_hoisted_39, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("table", Debuggingvue_type_template_id_1ae9acce_hoisted_40, [Debuggingvue_type_template_id_1ae9acce_hoisted_41, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [!((_ctx$selectedEvent3 = _ctx.selectedEvent) !== null && _ctx$selectedEvent3 !== void 0 && _ctx$selectedEvent3.metTrigger) ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", Debuggingvue_type_template_id_1ae9acce_hoisted_42, Debuggingvue_type_template_id_1ae9acce_hoisted_44)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), (_ctx$selectedEvent4 = _ctx.selectedEvent) !== null && _ctx$selectedEvent4 !== void 0 && _ctx$selectedEvent4.metTrigger ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", Debuggingvue_type_template_id_1ae9acce_hoisted_45, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.selectedEvent.metTrigger.name), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.selectedEvent.metTrigger.type), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.contentTab === 'triggers']]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Debuggingvue_type_template_id_1ae9acce_hoisted_46, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("table", Debuggingvue_type_template_id_1ae9acce_hoisted_47, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", _hoisted_48, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.selectedEventData), 1)])])]), _hoisted_49, _hoisted_50, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("table", _hoisted_51, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", _hoisted_52, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.selectedEventContainerDataLayer), 1)])])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.contentTab === 'dataLayer']]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("table", _hoisted_53, [_hoisted_54, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [!((_ctx$selectedEvent5 = _ctx.selectedEvent) !== null && _ctx$selectedEvent5 !== void 0 && (_ctx$selectedEvent5 = _ctx$selectedEvent5.container) !== null && _ctx$selectedEvent5 !== void 0 && (_ctx$selectedEvent5 = _ctx$selectedEvent5.variables) !== null && _ctx$selectedEvent5 !== void 0 && _ctx$selectedEvent5.length) ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", _hoisted_55, _hoisted_57)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(((_ctx$selectedEvent6 = _ctx.selectedEvent) === null || _ctx$selectedEvent6 === void 0 || (_ctx$selectedEvent6 = _ctx$selectedEvent6.container) === null || _ctx$selectedEvent6 === void 0 ? void 0 : _ctx$selectedEvent6.variables) || [], (variable, index) => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
      key: index
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variable.name), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(variable.type), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", _hoisted_58, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.stringifySelectedVariable(variable)), 1)]);
  }), 128))])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.contentTab === 'variables']]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("table", _hoisted_59, [_hoisted_60, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.mtmLogs, (log, index) => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
      key: index
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(log.time), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", _hoisted_61, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(log.messages, (logMessage, index) => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
        key: index
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(logMessage), 1), _hoisted_62]);
    }), 128))])]);
  }), 128))])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.contentTab === 'logs']])])])])]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Debugging/Debugging.vue?vue&type=template&id=1ae9acce

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/Debugging/Debugging.vue?vue&type=script&lang=ts
var _window$mtmDbgData, _window$mtmDbgData2;
/* eslint-disable @typescript-eslint/no-explicit-any */


window.mtmDbgData = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
  mtmEvents: ((_window$mtmDbgData = window.mtmDbgData) === null || _window$mtmDbgData === void 0 ? void 0 : _window$mtmDbgData.mtmEvents) || [],
  mtmLogs: ((_window$mtmDbgData2 = window.mtmDbgData) === null || _window$mtmDbgData2 === void 0 ? void 0 : _window$mtmDbgData2.mtmLogs) || []
});
const cookieName = 'mtmPreviewPosition';
const stickyTextTop = 'Stick to Top';
const stickyTextBottom = 'Stick to Bottom';
function getCircularReplacer() {
  const seen = new WeakSet();
  function circular(key, value) {
    if (typeof value === 'object' && value !== null) {
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
  data() {
    return {
      contentTab: 'tags',
      selectedEventIndex: 0,
      onlyfiredTags: false,
      positionText: Object(external_CoreHome_["getCookie"])(cookieName) === 'top' ? stickyTextBottom : stickyTextTop
    };
  },
  methods: {
    mtmUpdateDebugPosition() {
      const sevenDays = 7 * 60 * 60 * 24 * 1000;
      const currentCookieValue = Object(external_CoreHome_["getCookie"])(cookieName);
      const cookieValue = currentCookieValue === 'top' ? 'bottom' : 'top';
      Object(external_CoreHome_["setCookie"])(cookieName, cookieValue, sevenDays);
      const iframe = window.parent.document.getElementById('mtmDebugFrame');
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
    mtmCloseDebugWindow() {
      const iframe = window.parent.document.getElementById('mtmDebugFrame');
      if (iframe) {
        iframe.style.display = 'none';
      }
    },
    selectEvent(eventIndex) {
      if (!this.mtmEvents[eventIndex]) {
        return;
      }
      this.selectedEventIndex = eventIndex;
    },
    stringifySelectedVariable(variable) {
      return JSON.stringify(variable.value, getCircularReplacer());
    }
  },
  computed: {
    homeTabTitle() {
      var _this$selectedEvent;
      if (!((_this$selectedEvent = this.selectedEvent) !== null && _this$selectedEvent !== void 0 && _this$selectedEvent.container)) {
        return '';
      }
      const versionName = this.selectedEvent.container.versionName || 'Draft version';
      const container = this.selectedEvent.container.id;
      const eventNum = this.selectedEventIndex + 1;
      return `Event ${eventNum}: ${this.selectedEvent.name} (${container} - ${versionName})`;
    },
    notFiredTags() {
      var _this$selectedEvent2;
      if (!((_this$selectedEvent2 = this.selectedEvent) !== null && _this$selectedEvent2 !== void 0 && _this$selectedEvent2.container)) {
        return [];
      }
      const eventIndex = this.selectedEventIndex;
      const tagsFired = [];
      this.mtmEvents.forEach((event, i) => {
        if (i > eventIndex) {
          return;
        }
        tagsFired.push(...event.tags.map(tag => tag.name));
      });
      const tagsNotFired = [];
      this.selectedEvent.container.tags.forEach(tag => {
        if (tagsFired.indexOf(tag.name) === -1) {
          tagsNotFired.push(tag);
        }
      });
      return tagsNotFired;
    },
    selectedEvent() {
      return this.mtmEvents[this.selectedEventIndex];
    },
    mtmEvents() {
      return window.mtmDbgData.mtmEvents;
    },
    mtmEventsReversed() {
      const result = [...this.mtmEvents];
      result.reverse();
      return result;
    },
    mtmLogs() {
      return window.mtmDbgData.mtmLogs;
    },
    selectedEventData() {
      var _this$selectedEvent3;
      return ((_this$selectedEvent3 = this.selectedEvent) === null || _this$selectedEvent3 === void 0 ? void 0 : _this$selectedEvent3.eventData) && JSON.stringify(this.selectedEvent.eventData, getCircularReplacer());
    },
    selectedEventContainerDataLayer() {
      var _this$selectedEvent4;
      return ((_this$selectedEvent4 = this.selectedEvent) === null || _this$selectedEvent4 === void 0 || (_this$selectedEvent4 = _this$selectedEvent4.container) === null || _this$selectedEvent4 === void 0 ? void 0 : _this$selectedEvent4.dataLayer) && JSON.stringify(this.selectedEvent.container.dataLayer, getCircularReplacer());
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Debugging/Debugging.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/Debugging/Debugging.vue



Debuggingvue_type_script_lang_ts.render = Debuggingvue_type_template_id_1ae9acce_render

/* harmony default export */ var Debugging = (Debuggingvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/CopyDialog/CopyDialog.vue?vue&type=template&id=2360e942

const CopyDialogvue_type_template_id_2360e942_hoisted_1 = {
  class: "copyMtmObjectDialog"
};
const CopyDialogvue_type_template_id_2360e942_hoisted_2 = ["innerHTML"];
const CopyDialogvue_type_template_id_2360e942_hoisted_3 = ["innerHTML"];
function CopyDialogvue_type_template_id_2360e942_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");
  const _directive_form = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("form");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CopyDialogvue_type_template_id_2360e942_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.getCopyDialogTitle), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.getCopyDescription) + "  ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
    innerHTML: _ctx.$sanitize(_ctx.getLearnMoreLink),
    class: "learnMore"
  }, null, 8, CopyDialogvue_type_template_id_2360e942_hoisted_2)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
    uicontrol: "site",
    name: "destinationSite",
    title: _ctx.translate('TagManager_ChooseWebsite'),
    modelValue: _ctx.site,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => _ctx.site = $event)
  }, null, 8, ["title", "modelValue"]), _ctx.copyType.toLowerCase() !== 'container' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Field, {
    key: 0,
    uicontrol: "select",
    name: "idDestinationContainer",
    options: _ctx.containerOptions,
    disabled: _ctx.containerOptions.length <= 1,
    "full-width": true,
    title: _ctx.translate('TagManager_Container'),
    modelValue: _ctx.idDestinationContainer,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => _ctx.idDestinationContainer = $event)
  }, null, 8, ["options", "disabled", "title", "modelValue"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.copyType.toLowerCase() === 'container' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("p", {
    key: 1,
    class: "copyNote",
    innerHTML: _ctx.$sanitize(_ctx.getCopyContainerNote)
  }, null, 8, CopyDialogvue_type_template_id_2360e942_hoisted_3)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    class: "btn",
    onClick: _cache[2] || (_cache[2] = (...args) => _ctx.performCopy && _ctx.performCopy(...args))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Copy')), 1)])), [[_directive_form]])]);
}
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/CopyDialog/CopyDialog.vue?vue&type=template&id=2360e942

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/TagManager/vue/src/CopyDialog/CopyDialog.vue?vue&type=script&lang=ts







/* harmony default export */ var CopyDialogvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    defaultSite: {
      type: Object,
      required: true
    },
    copyType: {
      type: String,
      required: true
    },
    copyNonce: {
      type: String,
      required: false,
      default: ''
    },
    idToCopy: {
      type: [String, Number],
      required: true
    },
    idSourceContainer: {
      type: String,
      required: false,
      default: ''
    },
    idContainerVersion: {
      type: Number,
      required: false,
      default: 0
    }
  },
  directives: {
    Form: external_CorePluginsAdmin_["Form"]
  },
  components: {
    Field: external_CorePluginsAdmin_["Field"]
  },
  data() {
    return {
      site: this.defaultSite,
      idDestinationContainer: '',
      containerOptions: []
    };
  },
  created() {
    this.onSiteChange();
    this.idDestinationContainer = this.idSourceContainer;
  },
  watch: {
    site() {
      this.onSiteChange();
    }
  },
  methods: {
    onSiteChange() {
      var _this$site;
      // Return because there's no need to look up containers for container copy
      if (this.copyType.toLowerCase() === 'container') {
        return;
      }
      this.containerOptions = [];
      this.idDestinationContainer = '';
      if (!((_this$site = this.site) !== null && _this$site !== void 0 && _this$site.id)) {
        return;
      }
      external_CoreHome_["AjaxHelper"].fetch({
        method: 'TagManager.getContainers',
        filter_limit: '-1',
        idSite: this.site.id
      }).then(containers => {
        this.containerOptions = [];
        if (!(containers !== null && containers !== void 0 && containers.length)) {
          this.idDestinationContainer = '';
          this.containerOptions.push({
            key: '',
            value: this.translate('TagManager_NoContainersFound')
          });
          return;
        }
        containers.forEach(container => {
          if (!this.idDestinationContainer) {
            this.idDestinationContainer = container.idcontainer;
          }
          this.containerOptions.push({
            key: container.idcontainer,
            value: container.name
          });
        });
      });
    },
    performCopy() {
      var _this$site2;
      const requestParams = {
        module: 'TagManager',
        action: '',
        idSite: this.defaultSite.id,
        idDestinationSite: (_this$site2 = this.site) !== null && _this$site2 !== void 0 && _this$site2.id ? this.site.id : 0,
        nonce: this.copyNonce,
        idDestinationContainer: '',
        idSourceContainer: '',
        idContainerVersion: 0,
        idContainer: 0,
        idTag: 0,
        idTrigger: 0,
        idVariable: 0
      };
      switch (this.copyType.toLowerCase()) {
        case 'container':
          requestParams.action = 'copyContainer';
          requestParams.idContainer = this.idToCopy;
          break;
        case 'tag':
          requestParams.action = 'copyTag';
          requestParams.idTag = this.idToCopy;
          break;
        case 'trigger':
          requestParams.action = 'copyTrigger';
          requestParams.idTrigger = this.idToCopy;
          break;
        case 'variable':
          requestParams.action = 'copyVariable';
          requestParams.idVariable = this.idToCopy;
          break;
        default:
          throw Error('Unrecognised copy object type.');
      }
      if (this.idDestinationContainer) {
        requestParams.idDestinationContainer = this.idDestinationContainer;
      }
      if (this.idSourceContainer) {
        requestParams.idSourceContainer = this.idSourceContainer;
      }
      if (this.idContainerVersion > 0) {
        requestParams.idContainerVersion = this.idContainerVersion;
      }
      external_CoreHome_["AjaxHelper"].fetch(requestParams).then(response => {
        // If there was an issue with the response, display a generic error
        if (!response || !response.isSuccess || !response.urlToNewCopy) {
          const message = Object(external_CoreHome_["translate"])('General_ErrorRequest', '', '');
          const notificationInstanceId = external_CoreHome_["NotificationsStore"].show({
            message,
            id: 'CopyDialogResultNotification',
            context: 'error',
            type: 'transient'
          });
          external_CoreHome_["NotificationsStore"].scrollToNotification(notificationInstanceId);
          window.Piwik_Popover.close();
          return;
        }
        // Close the modal, reload the store, and display notification
        this.reloadEntityStore();
        this.displaySuccessNotification(response.urlToNewCopy);
        window.Piwik_Popover.close();
      });
    },
    reloadEntityStore() {
      switch (this.copyType.toLowerCase()) {
        case 'container':
          Containers_store.reload();
          break;
        case 'tag':
          Tags_store.reload(this.idSourceContainer, this.idContainerVersion);
          break;
        case 'trigger':
          Triggers_store.reload(this.idSourceContainer, this.idContainerVersion);
          break;
        case 'variable':
          Variables_store.reload(this.idSourceContainer, this.idContainerVersion);
          break;
        default:
          throw Error('Unrecognised copy object type.');
      }
    },
    displaySuccessNotification(urlToNewCopy) {
      const mainTranslation = 'TagManager_CopyXSuccess';
      let typeTranslation = '';
      switch (this.copyType.toLowerCase()) {
        case 'container':
          typeTranslation = 'TagManager_ContainerLowercase';
          break;
        case 'tag':
          typeTranslation = 'TagManager_TagLowercase';
          break;
        case 'trigger':
          typeTranslation = 'TagManager_TriggerLowercase';
          break;
        case 'variable':
          typeTranslation = 'TagManager_VariableLowercase';
          break;
        default:
          throw Error('Unrecognised copy object type.');
      }
      const message = Object(external_CoreHome_["translate"])(mainTranslation, [`<a href="${urlToNewCopy}">`, Object(external_CoreHome_["translate"])(typeTranslation), '</a>']);
      const notificationInstanceId = external_CoreHome_["NotificationsStore"].show({
        message,
        id: 'CopyDialogResultNotification',
        context: 'success',
        type: 'transient'
      });
      external_CoreHome_["NotificationsStore"].scrollToNotification(notificationInstanceId);
    }
  },
  computed: {
    getCopyDialogTitle() {
      let objectTypeTranslation = '';
      switch (this.copyType.toLowerCase()) {
        case 'container':
          objectTypeTranslation = Object(external_CoreHome_["translate"])('TagManager_Container');
          break;
        case 'tag':
          objectTypeTranslation = Object(external_CoreHome_["translate"])('TagManager_Tag');
          break;
        case 'trigger':
          objectTypeTranslation = Object(external_CoreHome_["translate"])('TagManager_Trigger');
          break;
        case 'variable':
          objectTypeTranslation = Object(external_CoreHome_["translate"])('TagManager_Variable');
          break;
        default:
          throw Error('Unrecognised copy object type.');
      }
      return Object(external_CoreHome_["translate"])('TagManager_CopyX', objectTypeTranslation);
    },
    getCopyDescription() {
      if (this.copyType.toLowerCase() === 'container') {
        return Object(external_CoreHome_["translate"])('TagManager_CopyContainerDescription');
      }
      let objectTypeTranslation = '';
      switch (this.copyType.toLowerCase()) {
        case 'tag':
          objectTypeTranslation = Object(external_CoreHome_["translate"])('TagManager_TagLowercase');
          break;
        case 'trigger':
          objectTypeTranslation = Object(external_CoreHome_["translate"])('TagManager_TriggerLowercase');
          break;
        case 'variable':
          objectTypeTranslation = Object(external_CoreHome_["translate"])('TagManager_VariableLowercase');
          break;
        default:
          throw Error('Unrecognised copy object type.');
      }
      return Object(external_CoreHome_["translate"])('TagManager_CopyXDescription', objectTypeTranslation);
    },
    getCopyContainerNote() {
      return Object(external_CoreHome_["translate"])('TagManager_CopyContainerNote', '<strong>', '</strong>');
    },
    getCopyUrl() {
      var _this$site3;
      const requestParams = {
        module: 'TagManager',
        action: '',
        idSite: this.defaultSite.id,
        idDestinationSite: (_this$site3 = this.site) !== null && _this$site3 !== void 0 && _this$site3.id ? this.site.id : 0,
        nonce: this.copyNonce,
        idDestinationContainer: '',
        idSourceContainer: '',
        idContainerVersion: 0,
        idContainer: 0,
        idTag: 0,
        idTrigger: 0,
        idVariable: 0
      };
      switch (this.copyType.toLowerCase()) {
        case 'container':
          requestParams.action = 'copyContainer';
          requestParams.idContainer = this.idToCopy;
          break;
        case 'tag':
          requestParams.action = 'copyTag';
          requestParams.idTag = this.idToCopy;
          break;
        case 'trigger':
          requestParams.action = 'copyTrigger';
          requestParams.idTrigger = this.idToCopy;
          break;
        case 'variable':
          requestParams.action = 'copyVariable';
          requestParams.idVariable = this.idToCopy;
          break;
        default:
          throw Error('Unrecognised copy object type.');
      }
      if (this.idDestinationContainer) {
        requestParams.idDestinationContainer = this.idDestinationContainer;
      }
      if (this.idSourceContainer) {
        requestParams.idSourceContainer = this.idSourceContainer;
      }
      if (this.idContainerVersion > 0) {
        requestParams.idContainerVersion = this.idContainerVersion;
      }
      return `?${external_CoreHome_["MatomoUrl"].stringify(requestParams)}`;
    },
    getLearnMoreLink() {
      let faqLink = '';
      switch (this.copyType.toLowerCase()) {
        case 'container':
          faqLink = 'https://matomo.org/faq/tag-manager/how-to-copy-a-matomo-tag-manager-container-and-its-components';
          break;
        case 'tag':
          faqLink = 'https://matomo.org/faq/tag-manager/how-to-copy-a-tag-in-matomo-tag-manager ';
          break;
        case 'trigger':
          faqLink = 'https://matomo.org/faq/tag-manager/how-to-copy-a-trigger-in-matomo-tag-manager';
          break;
        case 'variable':
          faqLink = 'https://matomo.org/faq/tag-manager/how-to-copy-a-variable-in-matomo-tag-manager';
          break;
        default:
          throw Error('Unrecognised copy object type.');
      }
      const linkString = Object(external_CoreHome_["externalLink"])(faqLink);
      return Object(external_CoreHome_["translate"])('TagManager_LearnMoreFullStop', linkString, '</a>');
    }
  }
}));
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/CopyDialog/CopyDialog.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/TagManager/vue/src/CopyDialog/CopyDialog.vue



CopyDialogvue_type_script_lang_ts.render = CopyDialogvue_type_template_id_2360e942_render

/* harmony default export */ var CopyDialog = (CopyDialogvue_type_script_lang_ts);
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