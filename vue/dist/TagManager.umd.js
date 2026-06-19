(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("CoreHome"), require("CorePluginsAdmin")) : typeof define === "function" && define.amd ? define(["exports", "vue", "CoreHome", "CorePluginsAdmin"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.TagManager = {}, global.Vue, global.CoreHome, global.CorePluginsAdmin));
})(this, (function(exports2, vue, CoreHome, CorePluginsAdmin) {
  "use strict";var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  var _a, _b;
  const NOTIFICATION_ID = "importContainerVersion";
  const _sfc_main$w = vue.defineComponent({
    props: {
      idContainer: {
        type: String,
        required: true
      }
    },
    components: {
      ContentBlock: CoreHome.ContentBlock,
      ActivityIndicator: CoreHome.ActivityIndicator,
      Field: CorePluginsAdmin.Field,
      SaveButton: CorePluginsAdmin.SaveButton
    },
    data() {
      return {
        isUpdating: false,
        backupName: "",
        importContent: ""
      };
    },
    methods: {
      showNotification(message, context, type = null) {
        const instanceId = CoreHome.NotificationsStore.show({
          message,
          context,
          type: type !== null ? type : "toast",
          id: NOTIFICATION_ID
        });
        setTimeout(() => {
          CoreHome.NotificationsStore.scrollToNotification(instanceId);
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
          this.showNotification(CoreHome.translate("TagManager_ErrorInvalidContainerImportFormat"), "error");
          return;
        }
        if ("tags" in parsed && "triggers" in parsed && "variables" in parsed && "idcontainer" in parsed && "context" in parsed) {
          CoreHome.Matomo.helper.modalConfirm(
            this.$refs.confirmImportContainerVersion,
            {
              yes: () => {
                this.isUpdating = true;
                const post = {
                  exportedContainerVersion: version
                };
                CoreHome.AjaxHelper.post(
                  {
                    method: "TagManager.importContainerVersion",
                    idContainer: this.idContainer,
                    backupName: this.backupName
                  },
                  post,
                  {
                    createErrorNotification: false
                  }
                ).then(() => {
                  this.showNotification(CoreHome.translate("TagManager_VersionImportSuccess"), "success");
                  this.isUpdating = false;
                  window.location.reload();
                }).catch((e) => {
                  this.showNotification(e.message, "error", "transient");
                  this.isUpdating = false;
                });
              }
            }
          );
        } else {
          this.showNotification(CoreHome.translate("TagManager_ErrorContainerVersionImportIncomplete"), "error");
        }
      }
    },
    computed: {
      backupNameTitle() {
        return `${CoreHome.translate("TagManager_BackupVersionName")} (${CoreHome.translate("General_Recommended")})`;
      }
    }
  });
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _hoisted_1$w = { class: "tagManagerImportVersion" };
  const _hoisted_2$s = {
    class: "ui-confirm",
    id: "confirmImportContainerVersion",
    ref: "confirmImportContainerVersion"
  };
  const _hoisted_3$r = ["value"];
  const _hoisted_4$m = ["value"];
  function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_ActivityIndicator = vue.resolveComponent("ActivityIndicator");
    const _component_Field = vue.resolveComponent("Field");
    const _component_SaveButton = vue.resolveComponent("SaveButton");
    const _component_ContentBlock = vue.resolveComponent("ContentBlock");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$w, [
      vue.createVNode(_component_ContentBlock, {
        "content-title": _ctx.translate("TagManager_ImportVersion")
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("p", null, vue.toDisplayString(_ctx.translate("TagManager_VersionImportInfo")), 1),
          vue.createVNode(_component_ActivityIndicator, {
            loading: _ctx.isUpdating,
            "loading-message": _ctx.translate("TagManager_UpdatingData")
          }, null, 8, ["loading", "loading-message"]),
          vue.createElementVNode("div", null, [
            vue.createVNode(_component_Field, {
              uicontrol: "text",
              modelValue: _ctx.backupName,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.backupName = $event),
              name: "backupName",
              placeholder: " ",
              title: _ctx.backupNameTitle,
              "inline-help": _ctx.translate("TagManager_BackupVersionNameHelp")
            }, null, 8, ["modelValue", "title", "inline-help"])
          ]),
          vue.createElementVNode("div", null, [
            vue.createVNode(_component_Field, {
              uicontrol: "textarea",
              modelValue: _ctx.importContent,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.importContent = $event),
              name: "importContent",
              placeholder: " ",
              "full-width": true,
              title: _ctx.translate("TagManager_VersionImportContentTitle")
            }, null, 8, ["modelValue", "title"])
          ]),
          vue.createVNode(_component_SaveButton, {
            class: "importVersion",
            disabled: !_ctx.importContent,
            onConfirm: _cache[2] || (_cache[2] = ($event) => _ctx.importVersion(_ctx.backupName, _ctx.importContent)),
            value: _ctx.translate("TagManager_VersionImportOverwriteContent")
          }, null, 8, ["disabled", "value"])
        ]),
        _: 1
      }, 8, ["content-title"]),
      vue.createElementVNode("div", _hoisted_2$s, [
        vue.createElementVNode("h2", null, vue.toDisplayString(_ctx.translate("TagManager_ConfirmImportContainerVersion")), 1),
        vue.createElementVNode("input", {
          role: "yes",
          type: "button",
          value: _ctx.translate("General_Yes")
        }, null, 8, _hoisted_3$r),
        vue.createElementVNode("input", {
          role: "no",
          type: "button",
          value: _ctx.translate("General_No")
        }, null, 8, _hoisted_4$m)
      ], 512)
    ]);
  }
  const ImportVersion = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$w]]);
  const { tagManagerHelper: tagManagerHelper$a } = window;
  const _sfc_main$v = vue.defineComponent({
    props: {
      idContainer: {
        type: String,
        required: true
      },
      idContainerVersion: Number
    },
    components: {
      ActivityIndicator: CoreHome.ActivityIndicator
    },
    data() {
      return {
        preconfiguredVariables: [],
        containerVariables: [],
        isLoading: false,
        actualIdContainerVersion: this.idContainerVersion
      };
    },
    emits: ["selectVariable"],
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
        this.fetchContainer().then((container) => {
          this.isLoading = true;
          this.actualIdContainerVersion = container.draft.idcontainerversion;
          return CoreHome.AjaxHelper.fetch({
            method: "TagManager.getAvailableContainerVariables",
            filter_limit: "-1",
            idContainer: this.idContainer,
            idContainerVersion: this.actualIdContainerVersion
          }).then((variables) => {
            this.preconfiguredVariables = [];
            this.containerVariables = [];
            this.isLoading = false;
            variables.forEach((category) => {
              const preConfig = __spreadProps(__spreadValues({}, category), {
                types: category.types.filter((c) => c.is_pre_configured)
              });
              this.containerVariables.push(...category.types.filter((c) => !c.is_pre_configured));
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
        tagManagerHelper$a.editVariable(
          this.idContainer,
          this.actualIdContainerVersion,
          variable.idvariable,
          () => {
            this.fetchAvailableVariables();
          }
        );
      },
      createVariable() {
        if (!this.actualIdContainerVersion) {
          return;
        }
        tagManagerHelper$a.editVariable(
          this.idContainer,
          this.actualIdContainerVersion,
          0,
          () => {
            this.fetchAvailableVariables();
          }
        );
      },
      selectVariable(variable) {
        this.$emit("selectVariable", { variable });
      },
      fetchContainer() {
        this.isLoading = true;
        return CoreHome.AjaxHelper.fetch({
          method: "TagManager.getContainer",
          filter_limit: "-1",
          idContainer: this.idContainer
        });
      }
    }
  });
  const _hoisted_1$v = { class: "tagManagerManageSelect tagManagerVariableSelect" };
  const _hoisted_2$r = { class: "tableActionBar" };
  const _hoisted_3$q = /* @__PURE__ */ vue.createElementVNode("span", { class: "icon-add" }, " ", -1);
  const _hoisted_4$l = { class: "collection with-header" };
  const _hoisted_5$i = { class: "collection-header" };
  const _hoisted_6$g = ["onClick"];
  const _hoisted_7$g = { class: "title" };
  const _hoisted_8$g = { class: "secondary-content" };
  const _hoisted_9$f = ["onClick", "title"];
  const _hoisted_10$f = { class: "collection-header" };
  const _hoisted_11$f = ["onClick"];
  const _hoisted_12$e = { class: "title" };
  const _hoisted_13$e = { class: "secondary-content" };
  const _hoisted_14$e = ["title"];
  const _hoisted_15$e = { class: "tableActionBar" };
  const _hoisted_16$e = /* @__PURE__ */ vue.createElementVNode("span", { class: "icon-add" }, " ", -1);
  function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_ActivityIndicator = vue.resolveComponent("ActivityIndicator");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$v, [
      vue.createVNode(_component_ActivityIndicator, { loading: _ctx.isLoading }, null, 8, ["loading"]),
      vue.createElementVNode("div", _hoisted_2$r, [
        vue.withDirectives(vue.createElementVNode("a", {
          class: "createNewVariable",
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.createVariable())
        }, [
          _hoisted_3$q,
          vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_CreateNewVariable")), 1)
        ], 512), [
          [vue.vShow, !_ctx.isLoading]
        ])
      ]),
      vue.createElementVNode("ul", _hoisted_4$l, [
        vue.createElementVNode("li", _hoisted_5$i, [
          vue.createElementVNode("h4", null, vue.toDisplayString(_ctx.translate("TagManager_CustomVariables")), 1)
        ]),
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.containerVariables, (variable, index) => {
          return vue.openBlock(), vue.createElementBlock("li", {
            class: "collection-item",
            onClick: ($event) => _ctx.selectVariable(variable),
            key: index
          }, [
            vue.createElementVNode("span", _hoisted_7$g, vue.toDisplayString(variable.name) + " (" + vue.toDisplayString(_ctx.translate("TagManager_Type")) + ": " + vue.toDisplayString(variable.type) + ") ", 1),
            vue.createElementVNode("span", _hoisted_8$g, [
              vue.createElementVNode("i", {
                class: "icon-edit",
                onClick: vue.withModifiers(($event) => _ctx.editVariable(variable), ["stop"]),
                title: _ctx.translate("General_Edit")
              }, null, 8, _hoisted_9$f)
            ])
          ], 8, _hoisted_6$g);
        }), 128))
      ]),
      vue.createElementVNode("h2", null, vue.toDisplayString(_ctx.translate("TagManager_PreconfiguredVariables")), 1),
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.preconfiguredVariables, (variableCategory) => {
        return vue.openBlock(), vue.createElementBlock("ul", {
          class: "collection with-header",
          key: variableCategory.name
        }, [
          vue.createElementVNode("li", _hoisted_10$f, [
            vue.createElementVNode("h4", null, vue.toDisplayString(variableCategory.name), 1)
          ]),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(variableCategory.types, (variableTemplate, index) => {
            return vue.withDirectives((vue.openBlock(), vue.createElementBlock("li", {
              class: "collection-item",
              key: index,
              onClick: ($event) => _ctx.selectVariable(variableTemplate)
            }, [
              vue.createElementVNode("span", _hoisted_12$e, vue.toDisplayString(variableTemplate.name), 1),
              vue.withDirectives(vue.createElementVNode("span", _hoisted_13$e, [
                vue.createElementVNode("i", {
                  class: "icon-help",
                  title: variableTemplate.description
                }, null, 8, _hoisted_14$e)
              ], 512), [
                [vue.vShow, !!variableTemplate.description]
              ])
            ], 8, _hoisted_11$f)), [
              [vue.vShow, variableTemplate.is_pre_configured]
            ]);
          }), 128))
        ]);
      }), 128)),
      vue.createElementVNode("div", _hoisted_15$e, [
        vue.withDirectives(vue.createElementVNode("a", {
          class: "createNewVariable",
          onClick: _cache[1] || (_cache[1] = ($event) => _ctx.createVariable())
        }, [
          _hoisted_16$e,
          vue.createTextVNode(vue.toDisplayString(_ctx.translate(
            "TagManager_CreateNewVariable",
            _ctx.translate("TagManager_Variable")
          )), 1)
        ], 512), [
          [vue.vShow, !_ctx.isLoading]
        ])
      ])
    ]);
  }
  const VariableSelect = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$v]]);
  const { tagManagerHelper: tagManagerHelper$9 } = window;
  const _sfc_main$u = vue.defineComponent({
    props: {
      variableTypeName: {
        type: String,
        required: true
      },
      modelValue: String,
      variableType: String
    },
    components: {
      Field: CorePluginsAdmin.Field
    },
    emits: ["update:modelValue"],
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
        this.fetchContainer().then((container) => {
          this.isLoading = true;
          this.idContainerVersion = container.draft.idcontainerversion;
          return CoreHome.AjaxHelper.fetch({
            method: "TagManager.getAvailableContainerVariables",
            filter_limit: "-1",
            idContainer: CoreHome.MatomoUrl.parsed.value.idContainer,
            idContainerVersion: this.idContainerVersion
          }).then((variables) => {
            this.containerVariables = [];
            this.isLoading = false;
            variables.forEach((category) => {
              const options = category.types.filter((t) => t.type === this.variableType).map((t) => ({ key: `{{${t.id}}}`, value: t.name }));
              this.containerVariables.push(...options);
            });
            if (!this.modelValue && this.containerVariables.length === 1) {
              this.onChange(this.containerVariables[0].key);
            }
          }).catch(() => {
            this.isLoading = false;
          });
        });
      },
      onChange(newValue) {
        this.$emit("update:modelValue", newValue);
      },
      createVariable() {
        if (!this.idContainerVersion) {
          return;
        }
        tagManagerHelper$9.editVariable(
          CoreHome.MatomoUrl.parsed.value.idContainer,
          this.idContainerVersion,
          0,
          (variable) => {
            this.fetchAvailableVariables();
            if (variable) {
              this.onChange(`{{${variable.name}}}`);
            }
          },
          this.variableType
        );
      },
      fetchContainer() {
        this.isLoading = true;
        return CoreHome.AjaxHelper.fetch({
          method: "TagManager.getContainer",
          filter_limit: "-1",
          idContainer: CoreHome.MatomoUrl.parsed.value.idContainer
        });
      }
    }
  });
  const _hoisted_1$u = { class: "tagManagerManageSelect tagManagerVariableSelectType" };
  const _hoisted_2$q = /* @__PURE__ */ vue.createElementVNode("span", { class: "icon-add" }, " ", -1);
  function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Field = vue.resolveComponent("Field");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$u, [
      vue.createElementVNode("div", null, [
        vue.createVNode(_component_Field, {
          uicontrol: "select",
          name: `variableType${_ctx.variableType}`,
          class: "selectVariableType",
          "model-value": _ctx.modelValue,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.onChange($event)),
          "full-width": true,
          options: _ctx.containerVariables
        }, null, 8, ["name", "model-value", "options"])
      ]),
      vue.withDirectives(vue.createElementVNode("a", {
        class: "createNewVariable",
        onClick: _cache[1] || (_cache[1] = vue.withModifiers(($event) => _ctx.createVariable(), ["prevent"]))
      }, [
        _hoisted_2$q,
        vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_CreateNewVariable")), 1)
      ], 512), [
        [vue.vShow, !_ctx.isLoading]
      ])
    ]);
  }
  const VariableSelectType = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$u]]);
  const { tagManagerHelper: tagManagerHelper$8 } = window;
  const _sfc_main$t = vue.defineComponent({
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
    emits: ["update:modelValue"],
    created() {
      this.onKeydown = CoreHome.debounce(this.onKeydown.bind(this), 50);
    },
    methods: {
      onKeydown(event) {
        this.$emit("update:modelValue", event.target.value);
      },
      selectVariable() {
        tagManagerHelper$8.selectVariable((variable) => {
          tagManagerHelper$8.insertTextSnippetAtElement(
            this.$refs.textarea,
            `{{${variable.id}}}`
          );
        });
      }
    },
    watch: {
      modelValue() {
        const { Materialize } = window;
        setTimeout(() => {
          Materialize.textareaAutoResize(this.$refs.textarea);
          Materialize.updateTextFields();
        });
      }
    },
    mounted() {
      const { Materialize } = window;
      setTimeout(() => {
        Materialize.textareaAutoResize(this.$refs.textarea);
        Materialize.updateTextFields();
      });
    }
  });
  const _hoisted_1$t = { class: "fieldVariableTemplate" };
  const _hoisted_2$p = ["type", "id", "name", "value"];
  const _hoisted_3$p = ["title"];
  const _hoisted_4$k = ["for", "innerHTML"];
  function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$t, [
      vue.createElementVNode("textarea", vue.mergeProps({
        class: `control_${_ctx.uiControl} materialize-textarea`,
        type: _ctx.uiControl,
        id: _ctx.name,
        name: _ctx.name,
        value: _ctx.modelValue,
        onKeydown: _cache[0] || (_cache[0] = ($event) => _ctx.onKeydown($event)),
        onChange: _cache[1] || (_cache[1] = ($event) => _ctx.onKeydown($event)),
        placeholder: "",
        style: { "width": "calc(100% - 40px)" }
      }, _ctx.uiControlAttributes, { ref: "textarea" }), null, 16, _hoisted_2$p),
      vue.createElementVNode("span", {
        class: "icon-code",
        style: { "margin-top": "14px", "position": "absolute" },
        title: _ctx.translate("TagManager_ChooseVariable"),
        onClick: _cache[2] || (_cache[2] = ($event) => _ctx.selectVariable())
      }, null, 8, _hoisted_3$p),
      vue.createElementVNode("label", {
        for: _ctx.name,
        innerHTML: _ctx.$sanitize(_ctx.title)
      }, null, 8, _hoisted_4$k)
    ]);
  }
  const FieldTextareaVariable = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$t]]);
  const { tagManagerHelper: tagManagerHelper$7 } = window;
  const _sfc_main$s = vue.defineComponent({
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
    emits: ["update:modelValue"],
    computed: {
      modelValueText() {
        if (typeof this.modelValue === "undefined" || this.modelValue === null) {
          return "";
        }
        return this.modelValue.toString();
      }
    },
    created() {
      this.onKeydown = CoreHome.debounce(this.onKeydown.bind(this), 50);
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
        this.$emit("update:modelValue", event.target.value);
      },
      selectVariable() {
        tagManagerHelper$7.selectVariable((variable) => {
          tagManagerHelper$7.insertTextSnippetAtElement(
            this.$refs.input,
            `{{${variable.id}}}`
          );
        });
      }
    }
  });
  const _hoisted_1$s = { class: "fieldVariableTemplate" };
  const _hoisted_2$o = ["type", "id", "name", "value"];
  const _hoisted_3$o = ["title"];
  const _hoisted_4$j = /* @__PURE__ */ vue.createElementVNode("br", null, null, -1);
  const _hoisted_5$h = ["for", "innerHTML"];
  function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$s, [
      vue.createElementVNode("input", vue.mergeProps({
        class: `control_${_ctx.uiControl}`,
        type: _ctx.uiControl,
        id: _ctx.name,
        name: _ctx.name,
        value: _ctx.modelValueText,
        onKeydown: _cache[0] || (_cache[0] = ($event) => _ctx.onKeydown($event)),
        onChange: _cache[1] || (_cache[1] = ($event) => _ctx.onKeydown($event)),
        placeholder: "",
        style: { "width": "calc(100% - 40px)" }
      }, _ctx.uiControlAttributes, { ref: "input" }), null, 16, _hoisted_2$o),
      vue.createElementVNode("span", {
        class: "icon-code",
        title: _ctx.translate("TagManager_ChooseVariable"),
        onClick: _cache[2] || (_cache[2] = ($event) => _ctx.selectVariable())
      }, null, 8, _hoisted_3$o),
      _hoisted_4$j,
      vue.createElementVNode("label", {
        for: _ctx.name,
        innerHTML: _ctx.$sanitize(_ctx.title)
      }, null, 8, _hoisted_5$h)
    ]);
  }
  const FieldVariableTemplate = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$s]]);
  const _sfc_main$r = vue.defineComponent({
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
      VariableSelectType
    },
    emits: ["update:modelValue"]
  });
  const _hoisted_1$r = ["for", "innerHTML"];
  function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_VariableSelectType = vue.resolveComponent("VariableSelectType");
    return vue.openBlock(), vue.createElementBlock("div", null, [
      vue.createVNode(_component_VariableSelectType, {
        "model-value": _ctx.modelValue,
        id: _ctx.name,
        name: _ctx.name,
        "variable-type-name": _ctx.title,
        "variable-type": _ctx.uiControlAttributes.variableType,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.$emit("update:modelValue", $event))
      }, null, 8, ["model-value", "id", "name", "variable-type-name", "variable-type"]),
      vue.createElementVNode("label", {
        for: _ctx.name,
        style: { "font-size": "0.8rem" },
        innerHTML: _ctx.$sanitize(_ctx.title)
      }, null, 8, _hoisted_1$r)
    ]);
  }
  const FieldVariableTypeTemplate = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$r]]);
  /*!
   * Matomo - free/libre analytics platform
   *
   * @link https://matomo.org
   * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
   */
  class VariablesStore {
    constructor() {
      __publicField(this, "privateState", vue.reactive({
        variables: [],
        isLoadingVars: false,
        isLoadingSingle: false,
        isUpdating: false
      }));
      __publicField(this, "state", vue.computed(() => this.privateState));
      __publicField(this, "isLoading", vue.computed(() => {
        const state = this.state.value;
        return state.isLoadingVars || state.isLoadingSingle;
      }));
      __publicField(this, "isUpdating", vue.computed(() => this.state.value.isUpdating));
      __publicField(this, "variables", vue.computed(() => this.state.value.variables));
      __publicField(this, "fetchPromise", null);
      __publicField(this, "availableVariablesPromises", {});
    }
    fetchVariablesIfNotLoaded(idContainer, idContainerVersion) {
      if (!this.fetchPromise) {
        this.fetchVariables(idContainer, idContainerVersion);
      }
    }
    findVariable(idContainer, idContainerVersion, idVariable, ignoreCache) {
      const found = this.variables.value.find((v) => v.idvariable === idVariable);
      if (found && !ignoreCache) {
        return Promise.resolve(found);
      }
      this.privateState.isLoadingSingle = true;
      return CoreHome.AjaxHelper.fetch({
        idVariable,
        idContainer,
        idContainerVersion,
        method: "TagManager.getContainerVariable",
        filter_limit: "-1"
      }).then((record) => {
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
        this.fetchPromise = CoreHome.AjaxHelper.fetch({
          method: "TagManager.getContainerVariables",
          idContainer,
          idContainerVersion,
          filter_limit: "-1"
        });
      }
      return Promise.resolve(this.fetchPromise).then((variables) => {
        this.privateState.variables = variables;
        this.privateState.isLoadingVars = false;
        return this.variables.value;
      }).finally(() => {
        this.privateState.isLoadingVars = false;
      });
    }
    fetchAvailableVariables(idContext) {
      if (!this.availableVariablesPromises[idContext]) {
        this.availableVariablesPromises[idContext] = CoreHome.AjaxHelper.fetch({
          method: "TagManager.getAvailableVariableTypesInContext",
          idContext,
          filter_limit: "-1"
        }).then((variables) => variables);
      }
      return Promise.resolve(this.availableVariablesPromises[idContext]);
    }
    suggestNameForType(templateId) {
      for (let counter = 0; counter < 100; counter += 1) {
        let name = templateId;
        if (counter) {
          name = `${name} (${counter})`;
        }
        const isFree = !this.variables.value.some((v) => v.name === name);
        if (isFree) {
          return name;
        }
      }
      return void 0;
    }
    createOrUpdateVariable(variable, method, idContainer, idContainerVersion, parameterValues) {
      this.privateState.isUpdating = true;
      const mappedEntries = Object.entries(parameterValues).map(([key, value]) => {
        let newValue = value;
        if (typeof value === "boolean") {
          newValue = (+value).toString();
        }
        return [key, newValue];
      });
      const parameters = Object.fromEntries(mappedEntries);
      const lookupTable = variable.lookup_table.filter((l) => l && l.out_value && l.comparison);
      return CoreHome.AjaxHelper.post(
        {
          idVariable: variable.idvariable,
          method,
          idContainer,
          idContainerVersion,
          type: variable.type,
          name: variable.name,
          description: variable.description,
          defaultValue: variable.default_value
        },
        {
          parameters,
          lookupTable
        },
        { withTokenInUrl: true }
      ).finally(() => {
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
      return CoreHome.AjaxHelper.fetch(
        {
          idVariable,
          idContainerVersion,
          idContainer,
          method: "TagManager.deleteContainerVariable"
        },
        { withTokenInUrl: true }
      ).finally(() => {
        this.privateState.isUpdating = false;
      });
    }
  }
  const VariablesStore$1 = new VariablesStore();
  /*!
   * Matomo - free/libre analytics platform
   *
   * @link https://matomo.org
   * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
   */
  class AvailableComparisonsStore {
    constructor() {
      __publicField(this, "privateState", vue.reactive({
        comparisons: [],
        isLoading: false
      }));
      __publicField(this, "state", vue.computed(() => vue.readonly(this.privateState)));
      __publicField(this, "isLoading", vue.computed(() => this.state.value.isLoading));
      __publicField(this, "comparisons", vue.computed(() => this.state.value.comparisons));
      __publicField(this, "comparisonOptions", vue.computed(() => this.comparisons.value.map(
        ({ id, name }) => ({ key: id, value: name })
      )));
      __publicField(this, "initializePromise", null);
    }
    init() {
      if (!this.initializePromise) {
        this.initializePromise = this.fetchAvailableComparisons();
      }
      return this.initializePromise;
    }
    fetchAvailableComparisons() {
      this.privateState.isLoading = true;
      return CoreHome.AjaxHelper.fetch({
        method: "TagManager.getAvailableComparisons",
        filter_limit: "-1"
      }).then((comparisons) => {
        this.privateState.comparisons = comparisons;
      }).finally(() => {
        this.privateState.isLoading = false;
      });
    }
  }
  const AvailableComparisonsStore$1 = new AvailableComparisonsStore();
  const notificationId$5 = "tagvariablemanagement";
  const _sfc_main$q = vue.defineComponent({
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
      GroupedSettings: CorePluginsAdmin.GroupedSettings,
      ContentBlock: CoreHome.ContentBlock,
      Field: CorePluginsAdmin.Field,
      SaveButton: CorePluginsAdmin.SaveButton
    },
    data() {
      return {
        isDirty: false,
        showAdvanced: false,
        chooseVariableType: false,
        canUseCustomTemplates: CoreHome.Matomo.hasUserCapability("tagmanager_use_custom_templates"),
        availableVariables: [],
        editTitle: "",
        variable: {},
        parameterValues: {},
        advancedParameters: {},
        isUpdatingVar: false
      };
    },
    emits: ["changeVariable"],
    created() {
      AvailableComparisonsStore$1.init();
      VariablesStore$1.fetchVariablesIfNotLoaded(this.idContainer, this.idContainerVersion);
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
          const hasAll = (this.variable.lookup_table || []).every((t) => !!(t == null ? void 0 : t.out_value));
          if (hasAll) {
            this.addLookUpEntry();
          }
        },
        deep: true
      }
    },
    methods: {
      removeAnyVariableNotification() {
        CoreHome.NotificationsStore.remove(notificationId$5);
        CoreHome.NotificationsStore.remove("ajaxHelper");
      },
      showNotification(message, context, type = null) {
        const notificationInstanceId = CoreHome.NotificationsStore.show({
          message,
          context,
          id: notificationId$5,
          type: type !== null ? type : "toast"
        });
        setTimeout(() => {
          CoreHome.NotificationsStore.scrollToNotification(notificationInstanceId);
        }, 200);
      },
      showErrorFieldNotProvidedNotification(title) {
        const message = CoreHome.translate("TagManager_ErrorXNotProvided", [title]);
        this.showNotification(message, "error");
      },
      initIdVariable() {
        CoreHome.Matomo.helper.lazyScrollToContent();
        this.availableVariables = [];
        CoreHome.AjaxHelper.fetch({
          method: "TagManager.getContainer",
          idContainer: this.idContainer,
          filter_limit: "-1"
        }).then(
          (container) => VariablesStore$1.fetchAvailableVariables(container.context)
        ).then((variables) => {
          this.availableVariables = variables;
        }).then(() => {
          if (this.edit && this.idVariable) {
            this.editTitle = CoreHome.translate("TagManager_EditVariable");
            VariablesStore$1.findVariable(
              this.idContainer,
              this.idContainerVersion,
              this.idVariable,
              this.isEmbedded
            ).then((variable) => {
              var _a2;
              if (!variable) {
                return;
              }
              this.variable = CoreHome.clone(variable);
              this.variable.typeMetadata.parameters = variable.typeMetadata.parameters.filter(
                (item) => !Object.prototype.hasOwnProperty.call(item, "uiControlAttributes") || !Object.prototype.hasOwnProperty.call(item.uiControlAttributes, "showAdvancedSettings")
              );
              this.variable.typeMetadata.advancedParameters = variable.typeMetadata.parameters.filter(
                (item) => Object.prototype.hasOwnProperty.call(item, "uiControlAttributes") && Object.prototype.hasOwnProperty.call(item.uiControlAttributes, "showAdvancedSettings")
              );
              this.parameterValues = Object.fromEntries(variable.typeMetadata.parameters.map(
                (s) => [s.name, s.value]
              ));
              if (this.variable.lookup_table && this.variable.lookup_table.length || this.variable.default_value) {
                this.showAdvanced = true;
              }
              this.addLookUpEntryIfNoneExists();
              this.isDirty = false;
              if ((_a2 = this.variable.typeMetadata) == null ? void 0 : _a2.name) {
                this.editTitle += `: ${this.variable.typeMetadata.name}`;
              }
            });
            return;
          }
          if (this.create) {
            let found = false;
            if (this.variableType) {
              this.availableVariables.forEach((category) => {
                if (!found) {
                  const variable = category.types.find((v) => (v == null ? void 0 : v.id) === this.variableType);
                  if (variable) {
                    found = true;
                    this.createVariableType(variable);
                  }
                }
              });
            }
            if (!found) {
              this.editTitle = CoreHome.translate("TagManager_ChooseVariableToContinue");
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
            comparison: "equals",
            match_value: "",
            out_value: ""
          });
        }
      },
      addLookUpEntry() {
        this.variable.lookup_table.push({
          comparison: "equals",
          match_value: "",
          out_value: ""
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
        var _a2;
        if (variableTemplate && this.isVariableTemplateDisabled[variableTemplate.id]) {
          return;
        }
        this.chooseVariableType = false;
        this.editTitle = CoreHome.translate("TagManager_CreateNewVariable");
        this.variable = {
          idsite: parseInt(`${CoreHome.Matomo.idSite}`, 10),
          name: VariablesStore$1.suggestNameForType(variableTemplate.name) || "",
          description: "",
          type: variableTemplate.id,
          idcontainer: this.idContainer,
          idcontainerversion: this.idContainerVersion,
          default_value: "",
          lookup_table: [],
          typeMetadata: variableTemplate
        };
        this.variable.typeMetadata.advancedParameters = [];
        const advancedOptions = variableTemplate.parameters.filter(
          (item) => Object.prototype.hasOwnProperty.call(item, "uiControlAttributes") && Object.prototype.hasOwnProperty.call(item.uiControlAttributes, "showAdvancedSettings")
        );
        const nonAdvancedOptions = variableTemplate.parameters.filter(
          (item) => !Object.prototype.hasOwnProperty.call(item, "uiControlAttributes") || !Object.prototype.hasOwnProperty.call(item.uiControlAttributes, "showAdvancedSettings")
        );
        this.parameterValues = Object.fromEntries(variableTemplate.parameters.map(
          (s) => [s.name, s.value]
        ));
        this.variable.typeMetadata.advancedParameters = advancedOptions;
        this.variable.typeMetadata.parameters = nonAdvancedOptions;
        if ((_a2 = this.variable.typeMetadata) == null ? void 0 : _a2.name) {
          this.editTitle += `: ${this.variable.typeMetadata.name}`;
        }
        this.addLookUpEntry();
        this.isDirty = true;
        vue.nextTick(() => {
          if (!this.$refs.root) {
            return;
          }
          const root = this.$refs.root;
          root.scrollIntoView();
          const name = root.querySelector("#name");
          if (name) {
            name.focus();
          }
        });
      },
      cancel() {
        const newParams = __spreadValues({}, CoreHome.MatomoUrl.hashParsed.value);
        delete newParams.idVariable;
        CoreHome.MatomoUrl.updateHash(newParams);
      },
      createVariable() {
        this.removeAnyVariableNotification();
        if (!this.checkRequiredFieldsAreSet()) {
          return;
        }
        this.isUpdatingVar = true;
        VariablesStore$1.createOrUpdateVariable(
          __spreadProps(__spreadValues({}, this.variable), { name: encodeURIComponent(this.variable.name) }),
          "TagManager.addContainerVariable",
          this.idContainer,
          this.idContainerVersion,
          this.parameterValues
        ).then((response) => {
          if (!response) {
            return;
          }
          this.isDirty = false;
          const idVariable = response.value;
          VariablesStore$1.reload(this.idContainer, this.idContainerVersion).then(() => {
            if (this.isEmbedded) {
              this.variable.idvariable = idVariable;
              this.$emit("changeVariable", {
                variable: this.variable
              });
              return;
            }
            this.cancel();
            setTimeout(() => {
              const createdX = CoreHome.translate("TagManager_CreatedX", CoreHome.translate("TagManager_Variable"));
              if (this.hasPublishCapability()) {
                const wantToRedeploy = CoreHome.translate(
                  "TagManager_WantToDeployThisChangeCreateVersion",
                  '<a class="createNewVersionLink">',
                  "</a>"
                );
                this.showNotification(`${createdX} ${wantToRedeploy}`, "success", "transient");
                return;
              }
              this.showNotification(createdX, "success");
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
        VariablesStore$1.createOrUpdateVariable(
          __spreadProps(__spreadValues({}, this.variable), { name: encodeURIComponent(this.variable.name) }),
          "TagManager.updateContainerVariable",
          this.idContainer,
          this.idContainerVersion,
          this.parameterValues
        ).then((response) => {
          if (!response) {
            return;
          }
          if (this.isEmbedded) {
            this.$emit("changeVariable", {
              variable: this.variable
            });
            return;
          }
          this.isDirty = false;
          VariablesStore$1.reload(this.idContainer, this.idContainerVersion).then(() => {
            this.initIdVariable();
          });
          this.cancel();
          const updatedAt = CoreHome.translate("TagManager_UpdatedX", CoreHome.translate("TagManager_Variable"));
          if (this.hasPublishCapability()) {
            const wantToDeploy = CoreHome.translate(
              "TagManager_WantToDeployThisChangeCreateVersion",
              '<a class="createNewVersionLink">',
              "</a>"
            );
            this.showNotification(`${updatedAt} ${wantToDeploy}`, "success", "transient");
            return;
          }
          this.showNotification(updatedAt, "success");
        }).finally(() => {
          this.isUpdatingVar = false;
        });
      },
      checkRequiredFieldsAreSet() {
        if (!this.variable.name) {
          this.showErrorFieldNotProvidedNotification(CoreHome.translate("General_Name"));
          return false;
        }
        return true;
      },
      hasPublishCapability() {
        return CoreHome.Matomo.hasUserCapability("tagmanager_write") && CoreHome.Matomo.hasUserCapability("tagmanager_use_custom_templates");
      },
      getNoCustomTemplatePermissionErrorMessage() {
        return CoreHome.translate(
          "TagManager_UseCustomTemplateCapabilityPermissionRequiredDescription",
          "<strong>",
          CoreHome.translate("TagManager_CapabilityUseCustomTemplates"),
          "</strong>"
        );
      }
    },
    computed: {
      typeInlineHelp() {
        var _a2, _b2;
        const desc = ((_a2 = this.variable.typeMetadata) == null ? void 0 : _a2.description) || "";
        const help = ((_b2 = this.variable.typeMetadata) == null ? void 0 : _b2.help) || "";
        return `${desc} ${help}`;
      },
      create() {
        return this.idVariable === 0;
      },
      edit() {
        return !this.create;
      },
      isLoading() {
        return VariablesStore$1.isLoading.value || AvailableComparisonsStore$1.isLoading.value;
      },
      isUpdating() {
        return VariablesStore$1.isUpdating.value || this.isUpdatingVar;
      },
      availableLookUpComparisons() {
        return AvailableComparisonsStore$1.comparisonOptions.value;
      },
      isVariableTemplateDisabled() {
        const result = {};
        this.availableVariables.forEach((variableCategory) => {
          variableCategory.types.forEach((variable) => {
            result[variable.id] = !this.canUseCustomTemplates && variable.isCustomTemplate;
          });
        });
        return result;
      },
      isVariableDisabled() {
        var _a2;
        return !this.canUseCustomTemplates && ((_a2 = this.variable.typeMetadata) == null ? void 0 : _a2.isCustomTemplate);
      },
      variableParameterValues() {
        var _a2;
        if (!((_a2 = this.variable.typeMetadata) == null ? void 0 : _a2.parameters)) {
          return null;
        }
        return this.parameterValues;
      },
      variableLookupTable() {
        return this.variable.lookup_table;
      }
    }
  });
  const _hoisted_1$q = {
    class: "editVariable tagManagerManageEdit",
    ref: "root"
  };
  const _hoisted_2$n = { class: "loadingPiwik" };
  const _hoisted_3$n = /* @__PURE__ */ vue.createElementVNode("img", { src: "plugins/Morpheus/images/loading-blue.gif" }, null, -1);
  const _hoisted_4$i = { class: "loadingPiwik" };
  const _hoisted_5$g = /* @__PURE__ */ vue.createElementVNode("img", { src: "plugins/Morpheus/images/loading-blue.gif" }, null, -1);
  const _hoisted_6$f = ["innerHTML"];
  const _hoisted_7$f = {
    key: 0,
    class: "form-group row"
  };
  const _hoisted_8$f = { class: "col s12" };
  const _hoisted_9$e = { key: 1 };
  const _hoisted_10$e = { class: "form-group row" };
  const _hoisted_11$e = { class: "col s12" };
  const _hoisted_12$d = { key: 2 };
  const _hoisted_13$d = { class: "innerFormField" };
  const _hoisted_14$d = { class: "form-group row" };
  const _hoisted_15$d = { class: "col s12 m12" };
  const _hoisted_16$d = { for: "lookup_table" };
  const _hoisted_17$c = { class: "innerFormField comparisonField" };
  const _hoisted_18$c = { class: "innerFormField" };
  const _hoisted_19$c = { class: "innerFormField" };
  const _hoisted_20$c = ["onClick", "title"];
  const _hoisted_21$c = ["innerHTML"];
  const _hoisted_22$c = { class: "entityCancel" };
  const _hoisted_23$b = { id: "confirmSelectVariableType" };
  const _hoisted_24$b = { class: "collection-header" };
  const _hoisted_25$b = ["onClick", "title"];
  const _hoisted_26$9 = ["src"];
  const _hoisted_27$8 = { class: "title" };
  const _hoisted_28$8 = { class: "secondary-content" };
  const _hoisted_29$8 = ["title"];
  const _hoisted_30$8 = { class: "entityCancel" };
  function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Field = vue.resolveComponent("Field");
    const _component_GroupedSettings = vue.resolveComponent("GroupedSettings");
    const _component_SaveButton = vue.resolveComponent("SaveButton");
    const _component_ContentBlock = vue.resolveComponent("ContentBlock");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$q, [
      vue.createVNode(_component_ContentBlock, {
        feature: "Tag Manager",
        "content-title": _ctx.editTitle
      }, {
        default: vue.withCtx(() => {
          var _a2, _b2, _c, _d, _e, _f, _g;
          return [
            vue.withDirectives(vue.createElementVNode("p", null, [
              vue.createElementVNode("span", _hoisted_2$n, [
                _hoisted_3$n,
                vue.createTextVNode(" " + vue.toDisplayString(_ctx.translate("General_LoadingData")), 1)
              ])
            ], 512), [
              [vue.vShow, _ctx.isLoading]
            ]),
            vue.withDirectives(vue.createElementVNode("p", null, [
              vue.createElementVNode("span", _hoisted_4$i, [
                _hoisted_5$g,
                vue.createTextVNode(" " + vue.toDisplayString(_ctx.translate("TagManager_UpdatingData")), 1)
              ])
            ], 512), [
              [vue.vShow, _ctx.isUpdating]
            ]),
            vue.withDirectives(vue.createElementVNode("form", {
              onSubmit: _cache[9] || (_cache[9] = ($event) => _ctx.edit ? _ctx.updateVariable() : _ctx.createVariable())
            }, [
              vue.createElementVNode("div", null, [
                vue.withDirectives(vue.createElementVNode("div", {
                  class: "alert alert-danger",
                  innerHTML: _ctx.$sanitize(_ctx.getNoCustomTemplatePermissionErrorMessage())
                }, null, 8, _hoisted_6$f), [
                  [vue.vShow, _ctx.isVariableDisabled]
                ]),
                vue.createElementVNode("div", null, [
                  vue.createVNode(_component_Field, {
                    uicontrol: "text",
                    name: "name",
                    "model-value": _ctx.variable.name,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => {
                      _ctx.variable.name = $event;
                      _ctx.setValueHasChanged();
                    }),
                    maxlength: 255,
                    title: _ctx.translate("General_Name"),
                    "inline-help": _ctx.translate(
                      "TagManager_NameHelpText",
                      _ctx.translate("TagManager_VariableLowercase")
                    ),
                    placeholder: _ctx.translate("TagManager_VariableNamePlaceholder")
                  }, null, 8, ["model-value", "title", "inline-help", "placeholder"])
                ]),
                vue.createElementVNode("div", null, [
                  vue.createVNode(_component_Field, {
                    uicontrol: "textarea",
                    name: "description",
                    "model-value": _ctx.variable.description,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => {
                      _ctx.variable.description = $event;
                      _ctx.setValueHasChanged();
                    }),
                    maxlength: 1e3,
                    title: _ctx.translate("TagManager_Description"),
                    "inline-help": _ctx.translate("TagManager_DescriptionHelpText"),
                    "ui-control-attributes": { class: "compact-textarea" },
                    placeholder: _ctx.translate("TagManager_VariableDescriptionPlaceholder")
                  }, null, 8, ["model-value", "title", "inline-help", "placeholder"])
                ]),
                ((_b2 = (_a2 = _ctx.variable.typeMetadata) == null ? void 0 : _a2.parameters) == null ? void 0 : _b2.length) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7$f, [
                  vue.createElementVNode("div", _hoisted_8$f, [
                    vue.createElementVNode("h3", null, vue.toDisplayString(_ctx.translate("TagManager_ConfigureThisVariable")), 1)
                  ])
                ])) : vue.createCommentVNode("", true),
                _ctx.variable ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_9$e, [
                  vue.createVNode(_component_GroupedSettings, {
                    settings: ((_c = _ctx.variable.typeMetadata) == null ? void 0 : _c.parameters) || [],
                    "all-setting-values": _ctx.parameterValues,
                    onChange: _cache[2] || (_cache[2] = ($event) => _ctx.parameterValues[$event.name] = $event.value)
                  }, null, 8, ["settings", "all-setting-values"])
                ])) : vue.createCommentVNode("", true),
                vue.withDirectives(vue.createElementVNode("div", _hoisted_10$e, [
                  vue.createElementVNode("div", _hoisted_11$e, [
                    vue.createElementVNode("h3", null, [
                      vue.withDirectives(vue.createElementVNode("a", {
                        class: "showAdvancedSettings",
                        onClick: _cache[3] || (_cache[3] = vue.withModifiers(($event) => _ctx.showAdvanced = true, ["prevent"]))
                      }, vue.toDisplayString(_ctx.translate("TagManager_ShowAdvancedSettings")), 513), [
                        [vue.vShow, !_ctx.showAdvanced]
                      ]),
                      vue.withDirectives(vue.createElementVNode("a", {
                        class: "hideAdvancedSettings",
                        onClick: _cache[4] || (_cache[4] = vue.withModifiers(($event) => _ctx.showAdvanced = false, ["prevent"]))
                      }, vue.toDisplayString(_ctx.translate("TagManager_HideAdvancedSettings")), 513), [
                        [vue.vShow, _ctx.showAdvanced]
                      ])
                    ])
                  ])
                ], 512), [
                  [vue.vShow, (_d = _ctx.variable.typeMetadata) == null ? void 0 : _d.hasAdvancedSettings]
                ]),
                _ctx.variable && _ctx.variable.typeMetadata && _ctx.variable.typeMetadata.id === "MatomoConfiguration" ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", _hoisted_12$d, [
                  vue.createVNode(_component_GroupedSettings, {
                    settings: ((_e = _ctx.variable.typeMetadata) == null ? void 0 : _e.advancedParameters) || [],
                    "all-setting-values": _ctx.parameterValues,
                    onChange: _cache[5] || (_cache[5] = ($event) => _ctx.parameterValues[$event.name] = $event.value)
                  }, null, 8, ["settings", "all-setting-values"])
                ], 512)), [
                  [vue.vShow, _ctx.showAdvanced && ((_f = _ctx.variable.typeMetadata) == null ? void 0 : _f.hasAdvancedSettings)]
                ]) : vue.createCommentVNode("", true),
                vue.withDirectives(vue.createElementVNode("div", null, [
                  vue.createElementVNode("div", _hoisted_13$d, [
                    vue.createVNode(_component_Field, {
                      uicontrol: "text",
                      name: "default_value",
                      "model-value": _ctx.variable.default_value,
                      "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => {
                        _ctx.variable.default_value = $event;
                        _ctx.setValueHasChanged();
                      }),
                      title: _ctx.translate("TagManager_DefaultValue"),
                      "inline-help": _ctx.translate("TagManager_DefaultValueHelp"),
                      placeholder: _ctx.translate("TagManager_DefaultValuePlaceholder")
                    }, null, 8, ["model-value", "title", "inline-help", "placeholder"])
                  ]),
                  vue.createElementVNode("div", _hoisted_14$d, [
                    vue.createElementVNode("div", _hoisted_15$d, [
                      vue.createElementVNode("div", null, [
                        vue.createElementVNode("label", _hoisted_16$d, vue.toDisplayString(_ctx.translate("TagManager_LookupTableTitle")), 1),
                        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.variable.lookup_table, (lookup, index) => {
                          return vue.openBlock(), vue.createElementBlock("div", {
                            key: index,
                            class: vue.normalizeClass(`lookupTable lookupTable${index} multiple valign-wrapper`)
                          }, [
                            vue.createElementVNode("div", _hoisted_17$c, [
                              vue.createVNode(_component_Field, {
                                uicontrol: "select",
                                name: "lookup_table_comparison",
                                "model-value": lookup.comparison,
                                "onUpdate:modelValue": ($event) => {
                                  lookup.comparison = $event;
                                  _ctx.setValueHasChanged();
                                },
                                "full-width": true,
                                options: _ctx.availableLookUpComparisons
                              }, null, 8, ["model-value", "onUpdate:modelValue", "options"])
                            ]),
                            vue.createElementVNode("div", _hoisted_18$c, [
                              vue.createVNode(_component_Field, {
                                uicontrol: "text",
                                name: "lookup_table_matchvalue",
                                "model-value": lookup.match_value,
                                "onUpdate:modelValue": ($event) => {
                                  lookup.match_value = $event;
                                  _ctx.setValueHasChanged();
                                },
                                "full-width": true,
                                placeholder: _ctx.translate("TagManager_LookupTableMatchValue")
                              }, null, 8, ["model-value", "onUpdate:modelValue", "placeholder"])
                            ]),
                            vue.createElementVNode("div", _hoisted_19$c, [
                              vue.createVNode(_component_Field, {
                                uicontrol: "text",
                                name: "lookup_table_outvalue",
                                "model-value": lookup.out_value,
                                "onUpdate:modelValue": ($event) => {
                                  lookup.out_value = $event;
                                  _ctx.setValueHasChanged();
                                },
                                "full-width": true,
                                placeholder: _ctx.translate("TagManager_LookupTableOutValue")
                              }, null, 8, ["model-value", "onUpdate:modelValue", "placeholder"])
                            ]),
                            !(index + 1 === _ctx.variable.lookup_table.length) ? (vue.openBlock(), vue.createElementBlock("span", {
                              key: 0,
                              class: "icon-minus valign",
                              onClick: ($event) => _ctx.removeLookUpEntry(index),
                              title: _ctx.translate("General_Remove")
                            }, null, 8, _hoisted_20$c)) : vue.createCommentVNode("", true)
                          ], 2);
                        }), 128))
                      ])
                    ])
                  ])
                ], 512), [
                  [vue.vShow, _ctx.showAdvanced && ((_g = _ctx.variable.typeMetadata) == null ? void 0 : _g.hasAdvancedSettings) && _ctx.variable && _ctx.variable.typeMetadata && _ctx.variable.typeMetadata.id !== "MatomoConfiguration"]
                ]),
                vue.withDirectives(vue.createElementVNode("div", {
                  class: "alert alert-danger",
                  innerHTML: _ctx.$sanitize(_ctx.getNoCustomTemplatePermissionErrorMessage())
                }, null, 8, _hoisted_21$c), [
                  [vue.vShow, _ctx.isVariableDisabled]
                ]),
                !_ctx.isVariableDisabled ? (vue.openBlock(), vue.createBlock(_component_SaveButton, {
                  key: 3,
                  class: "createButton",
                  onConfirm: _cache[7] || (_cache[7] = ($event) => _ctx.edit ? _ctx.updateVariable() : _ctx.createVariable()),
                  disabled: _ctx.isUpdating || !_ctx.isDirty,
                  saving: _ctx.isUpdating,
                  value: _ctx.edit ? _ctx.translate("CoreUpdater_UpdateTitle") : _ctx.translate("TagManager_CreateNewVariable")
                }, null, 8, ["disabled", "saving", "value"])) : vue.createCommentVNode("", true),
                vue.withDirectives(vue.createElementVNode("div", _hoisted_22$c, [
                  vue.createElementVNode("a", {
                    onClick: _cache[8] || (_cache[8] = vue.withModifiers(($event) => _ctx.cancel(), ["prevent"]))
                  }, vue.toDisplayString(_ctx.translate("General_Cancel")), 1)
                ], 512), [
                  [vue.vShow, !_ctx.isEmbedded]
                ])
              ])
            ], 544), [
              [vue.vShow, !_ctx.chooseVariableType && _ctx.editTitle]
            ]),
            vue.withDirectives(vue.createElementVNode("div", _hoisted_23$b, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.availableVariables, (variableCategory, index) => {
                return vue.openBlock(), vue.createElementBlock("ul", {
                  class: "collection with-header",
                  key: index
                }, [
                  vue.createElementVNode("li", _hoisted_24$b, [
                    vue.createElementVNode("h4", null, vue.toDisplayString(variableCategory.name), 1)
                  ]),
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(variableCategory.types, (variableTemplate, index2) => {
                    return vue.openBlock(), vue.createElementBlock("li", {
                      key: index2,
                      class: vue.normalizeClass(["collection-item avatar", {
                        disabledTemplate: this.isVariableTemplateDisabled[variableTemplate.id],
                        [`templateType${variableTemplate.id}`]: true
                      }]),
                      onClick: ($event) => _ctx.createVariableType(variableTemplate),
                      title: !this.isVariableTemplateDisabled[variableTemplate.id] ? "" : _ctx.translate(
                        "TagManager_UseCustomTemplateCapabilityPermissionRequiredDescription",
                        "",
                        _ctx.translate("TagManager_CapabilityUseCustomTemplates"),
                        ""
                      )
                    }, [
                      variableTemplate.icon ? (vue.openBlock(), vue.createElementBlock("img", {
                        key: 0,
                        alt: "",
                        class: "circle",
                        src: variableTemplate.icon
                      }, null, 8, _hoisted_26$9)) : vue.createCommentVNode("", true),
                      vue.createElementVNode("span", _hoisted_27$8, vue.toDisplayString(variableTemplate.name), 1),
                      vue.withDirectives(vue.createElementVNode("p", null, vue.toDisplayString(variableTemplate.description), 513), [
                        [vue.vShow, variableTemplate.description]
                      ]),
                      vue.withDirectives(vue.createElementVNode("span", _hoisted_28$8, [
                        vue.createElementVNode("i", {
                          class: "icon-help",
                          title: variableTemplate.help
                        }, null, 8, _hoisted_29$8)
                      ], 512), [
                        [vue.vShow, !!variableTemplate.help]
                      ])
                    ], 10, _hoisted_25$b);
                  }), 128))
                ]);
              }), 128)),
              vue.withDirectives(vue.createElementVNode("div", _hoisted_30$8, [
                vue.createElementVNode("a", {
                  onClick: _cache[10] || (_cache[10] = vue.withModifiers(($event) => _ctx.cancel(), ["prevent"]))
                }, vue.toDisplayString(_ctx.translate("General_Cancel")), 1)
              ], 512), [
                [vue.vShow, !_ctx.isEmbedded]
              ])
            ], 512), [
              [vue.vShow, _ctx.chooseVariableType]
            ])
          ];
        }),
        _: 1
      }, 8, ["content-title"])
    ], 512);
  }
  const VariableEdit = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$q]]);
  const { tagManagerHelper: tagManagerHelper$6 } = window;
  const _sfc_main$p = vue.defineComponent({
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
      Field: CorePluginsAdmin.Field,
      ContentBlock: CoreHome.ContentBlock
    },
    directives: {
      ContentTable: CoreHome.ContentTable
    },
    data() {
      return {
        hasWriteAccess: CoreHome.Matomo.hasUserCapability("tagmanager_write"),
        variableReferences: [],
        containerVariables: [],
        variableSearch: ""
      };
    },
    created() {
      VariablesStore$1.fetchVariables(this.idContainer, this.idContainerVersion);
      CoreHome.AjaxHelper.fetch({
        method: "TagManager.getAvailableContainerVariables",
        idContainer: this.idContainer,
        idContainerVersion: this.idContainerVersion,
        filter_limit: "-1"
      }).then((variables) => {
        this.containerVariables = variables;
      });
    },
    methods: {
      createVariable() {
        this.editVariable(0);
      },
      editVariable(idVariable) {
        CoreHome.MatomoUrl.updateHash(__spreadProps(__spreadValues({}, CoreHome.MatomoUrl.hashParsed.value), {
          idVariable
        }));
      },
      deleteVariable(variable) {
        CoreHome.AjaxHelper.fetch({
          method: "TagManager.getContainerVariableReferences",
          idContainer: this.idContainer,
          idContainerVersion: this.idContainerVersion,
          idVariable: variable.idvariable
        }).then((references) => {
          if (!references || !references.length) {
            this.variableReferences = [];
            CoreHome.Matomo.helper.modalConfirm(this.$refs.confirmDeleteVariable, {
              yes: () => {
                VariablesStore$1.deleteVariable(
                  this.idContainer,
                  this.idContainerVersion,
                  variable.idvariable
                ).then(() => {
                  VariablesStore$1.reload(this.idContainer, this.idContainerVersion);
                  CoreHome.NotificationsStore.remove("CopyDialogResultNotification");
                });
              }
            });
          } else {
            this.variableReferences = references;
            CoreHome.Matomo.helper.modalConfirm(
              this.$refs.confirmDeleteVariableNotPossible,
              {}
            );
          }
        });
      },
      truncateText(text, length) {
        return tagManagerHelper$6.truncateText(text, length);
      },
      hasPublishCapability() {
        return CoreHome.Matomo.hasUserCapability("tagmanager_write") && CoreHome.Matomo.hasUserCapability("tagmanager_use_custom_templates");
      },
      openCopyDialog(variable) {
        const url = CoreHome.MatomoUrl.stringify({
          module: "TagManager",
          action: "copyVariableDialog",
          idSite: variable.idsite,
          idContainer: this.idContainer,
          idVariable: variable.idvariable,
          idContainerVersion: this.idContainerVersion
        });
        window.Piwik_Popover.createPopupAndLoadUrl(url, "", "mtmCopyVariable");
      }
    },
    computed: {
      isLoading() {
        return VariablesStore$1.isLoading.value;
      },
      isUpdating() {
        return VariablesStore$1.isUpdating.value;
      },
      variables() {
        return VariablesStore$1.variables.value;
      },
      sortedVariables() {
        const searchFilter = this.variableSearch.toLowerCase();
        const result = [...this.variables].filter((h) => Object.keys(h).some((propName) => {
          const entity = h;
          let propValue = "";
          if (typeof entity[propName] === "string") {
            propValue = entity[propName];
          } else if (propName === "typeMetadata") {
            const propTypeMeta = entity.typeMetadata;
            propValue = propTypeMeta.name;
          } else if (propName === "parameters" && entity.type === "CustomJsFunction") {
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
        return this.translate("TagManager_VariablesNameDescription");
      },
      descriptionTranslatedText() {
        return this.translate("TagManager_VariablesDescriptionDescription");
      },
      typeTranslatedText() {
        return this.translate("TagManager_VariablesTypeDescription");
      },
      lookupTableTranslatedText() {
        return this.translate("TagManager_VariablesLookupTableDescription");
      },
      lastUpdatedTranslatedText() {
        return this.translate("TagManager_VariablesLastUpdatedDescription");
      },
      actionTranslatedText() {
        return this.translate("TagManager_VariablesActionDescription");
      },
      getActionClasses() {
        const copyClass = this.hasPublishCapability() ? " hasCopyAction" : "";
        return `action${copyClass}`;
      },
      canUseCustomTemplates() {
        return CoreHome.Matomo.hasUserCapability("tagmanager_use_custom_templates");
      }
    }
  });
  const _hoisted_1$p = { class: "tagManagerManageList tagManagerVariableList" };
  const _hoisted_2$m = { class: "variableSearchFilter" };
  const _hoisted_3$m = ["title"];
  const _hoisted_4$h = ["title"];
  const _hoisted_5$f = ["title"];
  const _hoisted_6$e = ["title"];
  const _hoisted_7$e = ["title"];
  const _hoisted_8$e = ["title"];
  const _hoisted_9$d = { colspan: "7" };
  const _hoisted_10$d = { class: "loadingPiwik" };
  const _hoisted_11$d = /* @__PURE__ */ vue.createElementVNode("img", { src: "plugins/Morpheus/images/loading-blue.gif" }, null, -1);
  const _hoisted_12$c = { colspan: "7" };
  const _hoisted_13$c = ["id"];
  const _hoisted_14$c = ["title"];
  const _hoisted_15$c = ["title"];
  const _hoisted_16$c = ["title"];
  const _hoisted_17$b = { class: "lookupTable" };
  const _hoisted_18$b = { class: "icon-ok" };
  const _hoisted_19$b = ["title"];
  const _hoisted_20$b = ["onClick", "title"];
  const _hoisted_21$b = ["onClick", "title"];
  const _hoisted_22$b = ["onClick", "title"];
  const _hoisted_23$a = { class: "tableActionBar" };
  const _hoisted_24$a = /* @__PURE__ */ vue.createElementVNode("span", { class: "icon-add" }, " ", -1);
  const _hoisted_25$a = ["title"];
  const _hoisted_26$8 = /* @__PURE__ */ vue.createElementVNode("span", { class: "icon-help preconfiguredVariablesHelp" }, null, -1);
  const _hoisted_27$7 = { class: "collection-header" };
  const _hoisted_28$7 = { class: "title" };
  const _hoisted_29$7 = ["textContent"];
  const _hoisted_30$7 = { class: "secondary-content" };
  const _hoisted_31$6 = ["title"];
  const _hoisted_32$6 = {
    class: "ui-confirm",
    id: "confirmDeleteVariable",
    ref: "confirmDeleteVariable"
  };
  const _hoisted_33$5 = ["value"];
  const _hoisted_34$5 = ["value"];
  const _hoisted_35$5 = {
    class: "ui-confirm",
    id: "confirmDeleteVariableNotPossible",
    ref: "confirmDeleteVariableNotPossible"
  };
  const _hoisted_36$5 = { class: "collection" };
  const _hoisted_37$5 = ["value"];
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Field = vue.resolveComponent("Field");
    const _component_ContentBlock = vue.resolveComponent("ContentBlock");
    const _directive_content_table = vue.resolveDirective("content-table");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$p, [
      vue.createVNode(_component_ContentBlock, {
        feature: "Tag Manager",
        class: "tagManagerCustomVariablesList",
        "content-title": _ctx.translate("TagManager_ManageX", _ctx.translate("TagManager_Variables")),
        "help-text": _ctx.variablesHelpText
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("p", null, vue.toDisplayString(_ctx.translate("TagManager_VariableUsageBenefits")), 1),
          vue.createElementVNode("div", _hoisted_2$m, [
            vue.withDirectives(vue.createVNode(_component_Field, {
              uicontrol: "text",
              name: "variableSearch",
              title: _ctx.translate("General_Search"),
              modelValue: _ctx.variableSearch,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.variableSearch = $event)
            }, null, 8, ["title", "modelValue"]), [
              [vue.vShow, _ctx.variables.length > 0]
            ])
          ]),
          vue.withDirectives((vue.openBlock(), vue.createElementBlock("table", null, [
            vue.createElementVNode("thead", null, [
              vue.createElementVNode("tr", null, [
                vue.createElementVNode("th", {
                  class: "name",
                  title: _ctx.nameTranslatedText
                }, vue.toDisplayString(_ctx.translate("General_Name")), 9, _hoisted_3$m),
                vue.createElementVNode("th", {
                  class: "description",
                  title: _ctx.descriptionTranslatedText
                }, vue.toDisplayString(_ctx.translate("General_Description")), 9, _hoisted_4$h),
                vue.createElementVNode("th", {
                  class: "type",
                  title: _ctx.typeTranslatedText
                }, vue.toDisplayString(_ctx.translate("TagManager_Type")), 9, _hoisted_5$f),
                vue.createElementVNode("th", {
                  class: "lookupTable",
                  title: _ctx.lookupTableTranslatedText
                }, vue.toDisplayString(_ctx.translate("TagManager_LookupTable")), 9, _hoisted_6$e),
                vue.createElementVNode("th", {
                  class: "lastUpdated",
                  title: _ctx.lastUpdatedTranslatedText
                }, vue.toDisplayString(_ctx.translate("TagManager_LastUpdated")), 9, _hoisted_7$e),
                vue.withDirectives(vue.createElementVNode("th", {
                  class: "action",
                  title: _ctx.actionTranslatedText
                }, vue.toDisplayString(_ctx.translate("General_Actions")), 9, _hoisted_8$e), [
                  [vue.vShow, _ctx.hasWriteAccess]
                ])
              ])
            ]),
            vue.createElementVNode("tbody", null, [
              vue.withDirectives(vue.createElementVNode("tr", null, [
                vue.createElementVNode("td", _hoisted_9$d, [
                  vue.createElementVNode("span", _hoisted_10$d, [
                    _hoisted_11$d,
                    vue.createTextVNode(" " + vue.toDisplayString(_ctx.translate("General_LoadingData")), 1)
                  ])
                ])
              ], 512), [
                [vue.vShow, _ctx.isLoading || _ctx.isUpdating]
              ]),
              vue.withDirectives(vue.createElementVNode("tr", null, [
                vue.createElementVNode("td", _hoisted_12$c, [
                  vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_NoVariablesFound")) + " ", 1),
                  vue.withDirectives(vue.createElementVNode("a", {
                    class: "createContainerVariableNow",
                    onClick: _cache[1] || (_cache[1] = ($event) => _ctx.createVariable())
                  }, vue.toDisplayString(_ctx.translate("TagManager_CreateNewVariableNow")), 513), [
                    [vue.vShow, _ctx.hasWriteAccess]
                  ])
                ])
              ], 512), [
                [vue.vShow, !_ctx.isLoading && !_ctx.variables.length]
              ]),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.sortedVariables, (variable) => {
                var _a2;
                return vue.openBlock(), vue.createElementBlock("tr", {
                  id: `variable${variable.idvariable}`,
                  class: "variables",
                  key: variable.idvariable
                }, [
                  vue.createElementVNode("td", {
                    class: "name",
                    title: variable.name
                  }, vue.toDisplayString(_ctx.truncateText(variable.name, 50)), 9, _hoisted_14$c),
                  vue.createElementVNode("td", {
                    class: "description",
                    title: variable.description
                  }, vue.toDisplayString(_ctx.truncateText(variable.description, 75)), 9, _hoisted_15$c),
                  vue.createElementVNode("td", {
                    class: "type",
                    title: variable.typeMetadata.description
                  }, vue.toDisplayString(variable.typeMetadata.name), 9, _hoisted_16$c),
                  vue.createElementVNode("td", _hoisted_17$b, [
                    vue.withDirectives(vue.createElementVNode("span", _hoisted_18$b, null, 512), [
                      [vue.vShow, variable.lookup_table.length]
                    ])
                  ]),
                  vue.createElementVNode("td", {
                    class: "lastUpdated",
                    title: _ctx.translate("TagManager_CreatedOnX", variable.created_date_pretty)
                  }, [
                    vue.createElementVNode("span", null, vue.toDisplayString(variable.updated_date_pretty), 1)
                  ], 8, _hoisted_19$b),
                  vue.withDirectives(vue.createElementVNode("td", {
                    class: vue.normalizeClass(_ctx.getActionClasses)
                  }, [
                    vue.createElementVNode("a", {
                      class: "table-action icon-edit",
                      onClick: ($event) => _ctx.editVariable(variable.idvariable, variable.type),
                      title: _ctx.translate("TagManager_EditVariable")
                    }, null, 8, _hoisted_20$b),
                    vue.withDirectives(vue.createElementVNode("a", {
                      class: "table-action icon-content-copy",
                      onClick: ($event) => _ctx.openCopyDialog(variable),
                      title: _ctx.translate(
                        "TagManager_CopyX",
                        _ctx.translate("TagManager_Variable")
                      )
                    }, null, 8, _hoisted_21$b), [
                      [vue.vShow, _ctx.hasPublishCapability()]
                    ]),
                    vue.withDirectives(vue.createElementVNode("a", {
                      class: "table-action icon-delete",
                      onClick: ($event) => _ctx.deleteVariable(variable),
                      title: _ctx.translate("TagManager_DeleteX", _ctx.translate("TagManager_Variable"))
                    }, null, 8, _hoisted_22$b), [
                      [vue.vShow, !((_a2 = variable.typeMetadata) == null ? void 0 : _a2.isCustomTemplate) || _ctx.canUseCustomTemplates]
                    ])
                  ], 2), [
                    [vue.vShow, _ctx.hasWriteAccess]
                  ])
                ], 8, _hoisted_13$c);
              }), 128))
            ])
          ])), [
            [_directive_content_table]
          ]),
          vue.withDirectives(vue.createElementVNode("div", _hoisted_23$a, [
            vue.createElementVNode("a", {
              class: "createNewVariable",
              value: "",
              onClick: _cache[2] || (_cache[2] = ($event) => _ctx.createVariable())
            }, [
              _hoisted_24$a,
              vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_CreateNewVariable")), 1)
            ])
          ], 512), [
            [vue.vShow, _ctx.hasWriteAccess]
          ])
        ]),
        _: 1
      }, 8, ["content-title", "help-text"]),
      vue.createElementVNode("h2", {
        title: _ctx.translate("TagManager_PreConfiguredInfoTitle")
      }, [
        vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_PreconfiguredVariables")) + " ", 1),
        _hoisted_26$8
      ], 8, _hoisted_25$a),
      vue.createElementVNode("div", null, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.containerVariables, (variableCategory, index) => {
          return vue.openBlock(), vue.createElementBlock("ul", {
            class: "collection with-header",
            key: index
          }, [
            vue.createElementVNode("li", _hoisted_27$7, [
              vue.createElementVNode("h4", null, vue.toDisplayString(variableCategory.name), 1)
            ]),
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(variableCategory.types, (variableTemplate) => {
              return vue.withDirectives((vue.openBlock(), vue.createElementBlock("li", {
                class: "collection-item",
                key: variableTemplate.id
              }, [
                vue.createElementVNode("span", _hoisted_28$7, [
                  vue.createTextVNode(vue.toDisplayString(variableTemplate.name) + " ", 1),
                  vue.createElementVNode("span", {
                    class: "variableId",
                    textContent: vue.toDisplayString(`{{${variableTemplate.id}}}`)
                  }, null, 8, _hoisted_29$7)
                ]),
                vue.withDirectives(vue.createElementVNode("span", _hoisted_30$7, [
                  vue.createElementVNode("i", {
                    class: "icon-help",
                    title: variableTemplate.description
                  }, null, 8, _hoisted_31$6)
                ], 512), [
                  [vue.vShow, !!variableTemplate.description]
                ])
              ])), [
                [vue.vShow, variableTemplate.is_pre_configured]
              ]);
            }), 128))
          ]);
        }), 128))
      ]),
      vue.createElementVNode("div", _hoisted_32$6, [
        vue.createElementVNode("h2", null, vue.toDisplayString(_ctx.translate("TagManager_DeleteVariableConfirm")), 1),
        vue.createElementVNode("input", {
          role: "yes",
          type: "button",
          value: _ctx.translate("General_Yes")
        }, null, 8, _hoisted_33$5),
        vue.createElementVNode("input", {
          role: "no",
          type: "button",
          value: _ctx.translate("General_No")
        }, null, 8, _hoisted_34$5)
      ], 512),
      vue.createElementVNode("div", _hoisted_35$5, [
        vue.createElementVNode("h2", null, vue.toDisplayString(_ctx.translate("TagManager_VariableCannotBeDeleted")), 1),
        vue.createElementVNode("p", null, vue.toDisplayString(_ctx.translate("TagManager_VariableBeingUsedBy")), 1),
        vue.createElementVNode("ul", _hoisted_36$5, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.variableReferences, (reference) => {
            return vue.openBlock(), vue.createElementBlock("li", {
              class: "collection-item",
              key: `${reference.referenceType}.${reference.referenceId}`
            }, vue.toDisplayString(reference.referenceTypeName) + ": " + vue.toDisplayString(reference.referenceName), 1);
          }), 128))
        ]),
        vue.createElementVNode("p", null, vue.toDisplayString(_ctx.translate("TagManager_VariableBeingUsedNeedsRemove")), 1),
        vue.createElementVNode("input", {
          role: "no",
          type: "button",
          value: _ctx.translate("General_Cancel")
        }, null, 8, _hoisted_37$5)
      ], 512)
    ]);
  }
  const VariableList = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$p]]);
  const _sfc_main$o = vue.defineComponent({
    props: {
      idContainerVersion: Number,
      idContainer: String,
      variablesHelpText: String
    },
    components: {
      VariableList,
      VariableEdit
    },
    data() {
      return {
        isAddAllowed: false
      };
    },
    created() {
      vue.watch(() => CoreHome.MatomoUrl.hashParsed.value.idVariable, (idVariable) => {
        this.onIdVariableParamChange(idVariable);
      });
      CoreHome.NotificationsStore.remove("variablevariablemanagement");
      this.onIdVariableParamChange(CoreHome.MatomoUrl.hashParsed.value.idVariable);
    },
    methods: {
      onIdVariableParamChange(idVariable) {
        if (idVariable === "0") {
          const parameters = { isAllowed: true };
          CoreHome.Matomo.postEvent("TagManager.initAddVariable", parameters);
          this.isAddAllowed = !!parameters.isAllowed;
        }
      }
    },
    computed: {
      idVariable() {
        const idVariable = CoreHome.MatomoUrl.hashParsed.value.idVariable;
        if (!this.isAddAllowed && idVariable === "0") {
          return null;
        }
        return idVariable ? parseInt(idVariable, 10) : idVariable;
      },
      editMode() {
        return typeof this.idVariable === "number";
      }
    }
  });
  const _hoisted_1$o = { class: "manageVariable" };
  const _hoisted_2$l = { key: 0 };
  const _hoisted_3$l = { key: 1 };
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_VariableList = vue.resolveComponent("VariableList");
    const _component_VariableEdit = vue.resolveComponent("VariableEdit");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$o, [
      !_ctx.editMode ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$l, [
        vue.createVNode(_component_VariableList, {
          "id-container-version": _ctx.idContainerVersion,
          "id-container": _ctx.idContainer,
          "variables-help-text": _ctx.variablesHelpText
        }, null, 8, ["id-container-version", "id-container", "variables-help-text"])
      ])) : vue.createCommentVNode("", true),
      _ctx.editMode ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$l, [
        vue.createVNode(_component_VariableEdit, {
          "id-container-version": _ctx.idContainerVersion,
          "id-container": _ctx.idContainer,
          "id-variable": _ctx.idVariable
        }, null, 8, ["id-container-version", "id-container", "id-variable"])
      ])) : vue.createCommentVNode("", true)
    ]);
  }
  const VariableManage = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$o]]);
  /*!
   * Matomo - free/libre analytics platform
   *
   * @link https://matomo.org
   * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
   */
  class TriggersStore {
    constructor() {
      __publicField(this, "privateState", vue.reactive({
        triggers: [],
        isLoadingTriggers: false,
        isLoadingSingle: false,
        isUpdating: false
      }));
      __publicField(this, "state", vue.computed(() => vue.readonly(this.privateState)));
      __publicField(this, "isUpdating", vue.computed(() => this.state.value.isUpdating));
      __publicField(this, "isLoading", vue.computed(() => {
        const state = this.state.value;
        return state.isLoadingTriggers || state.isLoadingSingle;
      }));
      __publicField(this, "triggers", vue.computed(() => this.state.value.triggers));
      __publicField(this, "fetchPromise", null);
      __publicField(this, "availableTriggersPromises", {});
    }
    fetchTriggers(idContainer, idContainerVersion) {
      this.privateState.triggers = [];
      this.privateState.isLoadingTriggers = true;
      if (!this.fetchPromise) {
        this.fetchPromise = CoreHome.AjaxHelper.fetch({
          method: "TagManager.getContainerTriggers",
          idContainer,
          idContainerVersion,
          filter_limit: "-1"
        });
      }
      return Promise.resolve(this.fetchPromise).then((triggers) => {
        this.privateState.triggers = triggers;
        return this.triggers.value;
      }).finally(() => {
        this.privateState.isLoadingTriggers = false;
      });
    }
    fetchTriggersIfNotLoaded(idContainer, idContainerVersion) {
      if (!this.fetchPromise) {
        this.fetchTriggers(idContainer, idContainerVersion);
      }
    }
    fetchAvailableTriggers(idContext) {
      if (!this.availableTriggersPromises[idContext]) {
        this.availableTriggersPromises[idContext] = CoreHome.AjaxHelper.fetch({
          method: "TagManager.getAvailableTriggerTypesInContext",
          idContext,
          filter_limit: "-1"
        });
      }
      return Promise.resolve(this.availableTriggersPromises[idContext]);
    }
    findTrigger(idContainer, idContainerVersion, idTrigger) {
      const found = this.triggers.value.find((v) => v.idtrigger === idTrigger);
      if (found) {
        return Promise.resolve(found);
      }
      this.privateState.isLoadingSingle = true;
      return CoreHome.AjaxHelper.fetch({
        idTrigger,
        idContainer,
        idContainerVersion,
        method: "TagManager.getContainerTrigger",
        filter_limit: "-1"
      }).then((record) => {
        this.privateState.triggers = [...this.privateState.triggers, record];
        return vue.readonly(record);
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
        const isFree = !this.triggers.value.some((v) => v.name === name);
        if (isFree) {
          return name;
        }
      }
      return void 0;
    }
    createOrUpdateTrigger(trigger, method, idContainer, idContainerVersion, parameterValues) {
      const mappedEntries = Object.entries(parameterValues).map(([key, value]) => {
        let newValue = value;
        if (typeof value === "boolean") {
          newValue = (+value).toString();
        }
        return [key, newValue];
      });
      const parameters = Object.fromEntries(mappedEntries);
      const conditions = trigger.conditions.filter(
        (c) => c && c.actual && c.comparison && c.expected
      );
      this.privateState.isUpdating = true;
      return CoreHome.AjaxHelper.post(
        {
          idTrigger: trigger.idtrigger,
          method,
          idContainer,
          idContainerVersion,
          type: trigger.type,
          name: trigger.name,
          description: trigger.description
        },
        {
          parameters,
          conditions
        },
        { withTokenInUrl: true }
      ).finally(() => {
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
      return CoreHome.AjaxHelper.fetch(
        {
          idTrigger,
          idContainerVersion,
          idContainer,
          method: "TagManager.deleteContainerTrigger"
        },
        { withTokenInUrl: true }
      ).finally(() => {
        this.privateState.isUpdating = false;
      });
    }
  }
  const TriggersStore$1 = new TriggersStore();
  const notificationId$4 = "tagvariablemanagement";
  const TRIGGER_TYPE_TO_CONDITION_ACTUAL = {
    AllElementsClick: "ClickId",
    AllLinksClick: "ClickId",
    DownloadClick: "ClickId",
    ElementVisibility: "VisibleElementClasses",
    FormSubmit: "FormId",
    JavaScriptError: "ErrorMessage"
  };
  const _sfc_main$n = vue.defineComponent({
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
      ContentBlock: CoreHome.ContentBlock,
      Field: CorePluginsAdmin.Field,
      GroupedSettings: CorePluginsAdmin.GroupedSettings,
      SaveButton: CorePluginsAdmin.SaveButton
    },
    data() {
      return {
        isDirty: false,
        chooseTriggerType: false,
        availableTriggers: [],
        availableVariables: [],
        variableIdToName: {},
        editTitle: "",
        trigger: {},
        parameterValues: {},
        isUpdatingTrigger: false
      };
    },
    emits: ["changeTrigger"],
    created() {
      AvailableComparisonsStore$1.init();
      CoreHome.AjaxHelper.fetch({
        method: "TagManager.getAvailableContainerVariables",
        filter_limit: "-1",
        idContainer: this.idContainer,
        idContainerVersion: this.idContainerVersion
      }).then((categories) => {
        categories.forEach((category) => {
          category.types.forEach((v) => {
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
      TriggersStore$1.fetchTriggersIfNotLoaded(this.idContainer, this.idContainerVersion);
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
          this.showErrorFieldNotProvidedNotification(CoreHome.translate("General_Name"));
          return false;
        }
        return true;
      },
      removeAnyTriggerNotification() {
        CoreHome.NotificationsStore.remove(notificationId$4);
        CoreHome.NotificationsStore.remove("ajaxHelper");
      },
      showNotification(message, context, type = null) {
        const notificationInstanceId = CoreHome.NotificationsStore.show({
          message,
          context,
          id: notificationId$4,
          type: type !== null ? type : "toast"
        });
        setTimeout(() => {
          CoreHome.NotificationsStore.scrollToNotification(notificationInstanceId);
        }, 200);
      },
      showErrorFieldNotProvidedNotification(title) {
        const message = CoreHome.translate("TagManager_ErrorXNotProvided", [title]);
        this.showNotification(message, "error");
      },
      initIdTrigger() {
        this.trigger = {};
        this.chooseTriggerType = false;
        this.editTitle = "";
        CoreHome.Matomo.helper.lazyScrollToContent();
        this.availableTriggers = [];
        CoreHome.AjaxHelper.fetch({
          method: "TagManager.getContainer",
          idContainer: this.idContainer,
          filter_limit: "-1"
        }).then(
          (container) => TriggersStore$1.fetchAvailableTriggers(container.context)
        ).then((triggers) => {
          this.availableTriggers = triggers;
        }).then(() => {
          if (this.edit && this.idTrigger) {
            this.editTitle = CoreHome.translate("TagManager_EditTrigger");
            TriggersStore$1.findTrigger(
              this.idContainer,
              this.idContainerVersion,
              this.idTrigger
            ).then((trigger) => {
              var _a2;
              if (!trigger) {
                return;
              }
              this.trigger = CoreHome.clone(trigger);
              this.parameterValues = Object.fromEntries(trigger.typeMetadata.parameters.map(
                (s) => [s.name, s.value]
              ));
              this.addConditionEntryIfNoneExists();
              this.onConditionChange();
              this.isDirty = false;
              if ((_a2 = this.trigger.typeMetadata) == null ? void 0 : _a2.name) {
                this.editTitle += `: ${this.trigger.typeMetadata.name}`;
              }
            });
            return;
          }
          if (this.create) {
            this.editTitle = CoreHome.translate("TagManager_ChooseTriggerToContinue");
            this.chooseTriggerType = true;
          }
        });
      },
      onConditionChange() {
        const hasAll = (this.trigger.conditions || []).every((c) => !!(c == null ? void 0 : c.expected));
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
        var _a2;
        if (triggerTemplate && this.isTriggerTemplateDisabled[triggerTemplate.id]) {
          return;
        }
        this.chooseTriggerType = false;
        this.editTitle = CoreHome.translate("TagManager_CreateNewTrigger");
        this.trigger = {
          idsite: parseInt(`${CoreHome.Matomo.idSite}`, 10),
          name: TriggersStore$1.suggestNameForType(triggerTemplate.name) || "",
          description: "",
          type: triggerTemplate.id,
          idcontainerversion: this.idContainerVersion,
          conditions: [],
          typeMetadata: triggerTemplate
        };
        if ((_a2 = this.trigger.typeMetadata) == null ? void 0 : _a2.name) {
          this.editTitle += `: ${this.trigger.typeMetadata.name}`;
        }
        this.parameterValues = Object.fromEntries(triggerTemplate.parameters.map(
          (s) => [s.name, s.value]
        ));
        this.addConditionEntry();
        this.isDirty = true;
        vue.nextTick(() => {
          if (!this.$refs.root) {
            return;
          }
          const root = this.$refs.root;
          root.scrollIntoView();
          const name = root.querySelector("#name");
          if (name) {
            name.focus();
          }
        });
      },
      cancel() {
        const newParams = __spreadValues({}, CoreHome.MatomoUrl.hashParsed.value);
        delete newParams.idTrigger;
        CoreHome.MatomoUrl.updateHash(newParams);
      },
      createTrigger() {
        this.removeAnyTriggerNotification();
        if (!this.checkRequiredFieldsAreSet()) {
          return;
        }
        this.isUpdatingTrigger = true;
        TriggersStore$1.createOrUpdateTrigger(
          this.trigger,
          "TagManager.addContainerTrigger",
          this.idContainer,
          this.idContainerVersion,
          this.parameterValues
        ).then((response) => {
          const idTrigger = response.value;
          this.isDirty = false;
          TriggersStore$1.reload(this.idContainer, this.idContainerVersion).then(() => {
            if (this.isEmbedded) {
              this.trigger.idtrigger = idTrigger;
              this.$emit("changeTrigger", {
                trigger: this.trigger
              });
              return;
            }
            this.cancel();
            setTimeout(() => {
              const createdX = CoreHome.translate("TagManager_CreatedX", CoreHome.translate("TagManager_Trigger"));
              if (this.hasPublishCapability()) {
                const wantToRedeploy = CoreHome.translate(
                  "TagManager_WantToDeployThisChangeCreateVersion",
                  '<a class="createNewVersionLink">',
                  "</a>"
                );
                this.showNotification(`${createdX} ${wantToRedeploy}`, "success", "transient");
                return;
              }
              this.showNotification(createdX, "success");
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
        TriggersStore$1.createOrUpdateTrigger(
          this.trigger,
          "TagManager.updateContainerTrigger",
          this.idContainer,
          this.idContainerVersion,
          this.parameterValues
        ).then((response) => {
          if (!response) {
            return;
          }
          if (this.isEmbedded) {
            this.$emit("changeTrigger", {
              trigger: this.trigger
            });
            TriggersStore$1.reload(this.idContainer, this.idContainerVersion);
            return;
          }
          this.isDirty = false;
          TriggersStore$1.reload(this.idContainer, this.idContainerVersion).then(() => {
            this.initIdTrigger();
          });
          this.cancel();
          const updatedAt = CoreHome.translate("TagManager_UpdatedX", CoreHome.translate("TagManager_Trigger"));
          if (this.hasPublishCapability()) {
            const wantToDeploy = CoreHome.translate(
              "TagManager_WantToDeployThisChangeCreateVersion",
              '<a class="createNewVersionLink">',
              "</a>"
            );
            this.showNotification(`${updatedAt} ${wantToDeploy}`, "success", "transient");
            return;
          }
          this.showNotification(updatedAt, "success");
        }).finally(() => {
          this.isUpdatingTrigger = false;
        });
      },
      makeDefaultCondition() {
        var _a2;
        let actual = "PageUrl";
        if ((_a2 = this.trigger) == null ? void 0 : _a2.typeMetadata) {
          const type = this.trigger.typeMetadata.id;
          if (TRIGGER_TYPE_TO_CONDITION_ACTUAL[type]) {
            actual = TRIGGER_TYPE_TO_CONDITION_ACTUAL[type];
          }
        }
        return { comparison: "equals", actual, expected: "" };
      },
      hasPublishCapability() {
        return CoreHome.Matomo.hasUserCapability("tagmanager_write") && CoreHome.Matomo.hasUserCapability("tagmanager_use_custom_templates");
      },
      getNoCustomTemplatePermissionErrorMessage() {
        return CoreHome.translate(
          "TagManager_UseCustomTemplateCapabilityPermissionRequiredDescription",
          "<strong>",
          CoreHome.translate("TagManager_CapabilityUseCustomTemplates"),
          "</strong>"
        );
      }
    },
    computed: {
      isLoading() {
        return TriggersStore$1.isLoading.value || AvailableComparisonsStore$1.isLoading.value;
      },
      isUpdating() {
        return TriggersStore$1.isUpdating.value || this.isUpdatingTrigger;
      },
      create() {
        return this.idTrigger === 0;
      },
      edit() {
        return !this.create;
      },
      canUseCustomTemplates() {
        return CoreHome.Matomo.hasUserCapability("tagmanager_use_custom_templates");
      },
      isTriggerDisabled() {
        var _a2;
        return !this.canUseCustomTemplates && ((_a2 = this.trigger.typeMetadata) == null ? void 0 : _a2.isCustomTemplate);
      },
      saveButtonText() {
        return this.edit ? CoreHome.translate("CoreUpdater_UpdateTitle") : CoreHome.translate("TagManager_CreateNewTrigger");
      },
      collectionItemAvatarText() {
        return CoreHome.translate(
          "TagManager_UseCustomTemplateCapabilityPermissionRequiredDescription",
          "",
          CoreHome.translate("TagManager_CapabilityUseCustomTemplates"),
          ""
        );
      },
      triggerInlineHelpText() {
        return CoreHome.translate(
          "TagManager_TriggerConditionsHelpText",
          CoreHome.externalLink("https://matomo.org/faq/tag-manager/create-a-trigger-to-track-interactions-on-all-nested-elements/"),
          "</a>"
        );
      },
      availableComparisons() {
        return AvailableComparisonsStore$1.comparisonOptions.value;
      },
      isTriggerTemplateDisabled() {
        const result = {};
        this.availableTriggers.forEach((triggerCategory) => {
          triggerCategory.types.forEach((trigger) => {
            result[trigger.id] = !this.canUseCustomTemplates && trigger.isCustomTemplate;
          });
        });
        return result;
      },
      triggerParameterValues() {
        var _a2;
        if (!((_a2 = this.trigger.typeMetadata) == null ? void 0 : _a2.parameters)) {
          return null;
        }
        return this.parameterValues;
      }
    }
  });
  const _hoisted_1$n = {
    class: "editTrigger tagManagerManageEdit",
    ref: "root"
  };
  const _hoisted_2$k = { class: "loadingPiwik" };
  const _hoisted_3$k = /* @__PURE__ */ vue.createElementVNode("img", { src: "plugins/Morpheus/images/loading-blue.gif" }, null, -1);
  const _hoisted_4$g = { class: "loadingPiwik" };
  const _hoisted_5$e = /* @__PURE__ */ vue.createElementVNode("img", { src: "plugins/Morpheus/images/loading-blue.gif" }, null, -1);
  const _hoisted_6$d = ["innerHTML"];
  const _hoisted_7$d = { class: "form-group row" };
  const _hoisted_8$d = { class: "col s12" };
  const _hoisted_9$c = { key: 0 };
  const _hoisted_10$c = { class: "form-group row" };
  const _hoisted_11$c = { class: "col s12" };
  const _hoisted_12$b = { class: "form-group row multiple" };
  const _hoisted_13$b = { class: "col s12 input-field m6" };
  const _hoisted_14$b = { class: "col s12 input-field m6" };
  const _hoisted_15$b = { class: "form-help" };
  const _hoisted_16$b = ["innerHTML"];
  const _hoisted_17$a = { class: "col s12 m12" };
  const _hoisted_18$a = { class: "innerFormField" };
  const _hoisted_19$a = { class: "innerFormField comparisonField" };
  const _hoisted_20$a = { class: "innerFormField" };
  const _hoisted_21$a = ["onClick", "title"];
  const _hoisted_22$a = { class: "triggerConditionNode" };
  const _hoisted_23$9 = ["innerHTML"];
  const _hoisted_24$9 = { class: "entityCancel" };
  const _hoisted_25$9 = { id: "confirmSelectTriggerType" };
  const _hoisted_26$7 = { class: "collection-header" };
  const _hoisted_27$6 = ["onClick", "title"];
  const _hoisted_28$6 = ["src"];
  const _hoisted_29$6 = { class: "title" };
  const _hoisted_30$6 = { class: "secondary-content" };
  const _hoisted_31$5 = ["title"];
  const _hoisted_32$5 = { class: "entityCancel" };
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Field = vue.resolveComponent("Field");
    const _component_GroupedSettings = vue.resolveComponent("GroupedSettings");
    const _component_SaveButton = vue.resolveComponent("SaveButton");
    const _component_ContentBlock = vue.resolveComponent("ContentBlock");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$n, [
      vue.createVNode(_component_ContentBlock, {
        feature: "Tag Manager",
        "content-title": _ctx.editTitle
      }, {
        default: vue.withCtx(() => {
          var _a2, _b2, _c, _d, _e;
          return [
            vue.withDirectives(vue.createElementVNode("p", null, [
              vue.createElementVNode("span", _hoisted_2$k, [
                _hoisted_3$k,
                vue.createTextVNode(" " + vue.toDisplayString(_ctx.translate("General_LoadingData")), 1)
              ])
            ], 512), [
              [vue.vShow, _ctx.isLoading]
            ]),
            vue.withDirectives(vue.createElementVNode("p", null, [
              vue.createElementVNode("span", _hoisted_4$g, [
                _hoisted_5$e,
                vue.createTextVNode(" " + vue.toDisplayString(_ctx.translate("TagManager_UpdatingData")), 1)
              ])
            ], 512), [
              [vue.vShow, _ctx.isUpdating]
            ]),
            vue.withDirectives(vue.createElementVNode("form", {
              onSubmit: _cache[5] || (_cache[5] = ($event) => _ctx.edit ? _ctx.updateTrigger() : _ctx.createTrigger())
            }, [
              vue.createElementVNode("div", null, [
                vue.withDirectives(vue.createElementVNode("div", {
                  class: "alert alert-danger",
                  innerHTML: _ctx.$sanitize(_ctx.getNoCustomTemplatePermissionErrorMessage())
                }, null, 8, _hoisted_6$d), [
                  [vue.vShow, _ctx.isTriggerDisabled]
                ]),
                vue.createElementVNode("div", null, [
                  vue.createVNode(_component_Field, {
                    uicontrol: "text",
                    name: "name",
                    "model-value": _ctx.trigger.name,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => {
                      _ctx.trigger.name = $event;
                      _ctx.setValueHasChanged();
                    }),
                    maxlength: 255,
                    title: _ctx.translate("General_Name"),
                    "inline-help": _ctx.translate(
                      "TagManager_NameHelpText",
                      _ctx.translate("TagManager_TriggerLowercase")
                    ),
                    placeholder: _ctx.translate("TagManager_TriggerNamePlaceholder")
                  }, null, 8, ["model-value", "title", "inline-help", "placeholder"])
                ]),
                vue.createElementVNode("div", null, [
                  vue.createVNode(_component_Field, {
                    uicontrol: "textarea",
                    name: "description",
                    "model-value": _ctx.trigger.description,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => {
                      _ctx.trigger.description = $event;
                      _ctx.setValueHasChanged();
                    }),
                    maxlength: 1e3,
                    title: _ctx.translate("TagManager_Description"),
                    "inline-help": _ctx.translate("TagManager_DescriptionHelpText"),
                    "ui-control-attributes": { class: "compact-textarea" },
                    placeholder: _ctx.translate("TagManager_TriggerDescriptionPlaceholder")
                  }, null, 8, ["model-value", "title", "inline-help", "placeholder"])
                ]),
                vue.withDirectives(vue.createElementVNode("div", _hoisted_7$d, [
                  vue.createElementVNode("div", _hoisted_8$d, [
                    vue.createElementVNode("h3", null, vue.toDisplayString(_ctx.translate("TagManager_ConfigureThisTrigger")), 1)
                  ])
                ], 512), [
                  [vue.vShow, (_b2 = (_a2 = _ctx.trigger.typeMetadata) == null ? void 0 : _a2.parameters) == null ? void 0 : _b2.length]
                ]),
                _ctx.trigger ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_9$c, [
                  vue.createVNode(_component_GroupedSettings, {
                    settings: ((_c = _ctx.trigger.typeMetadata) == null ? void 0 : _c.parameters) || [],
                    "all-setting-values": _ctx.parameterValues,
                    onChange: _cache[2] || (_cache[2] = ($event) => _ctx.parameterValues[$event.name] = $event.value)
                  }, null, 8, ["settings", "all-setting-values"])
                ])) : vue.createCommentVNode("", true),
                vue.withDirectives(vue.createElementVNode("div", _hoisted_10$c, [
                  vue.createElementVNode("div", _hoisted_11$c, [
                    vue.createElementVNode("h3", null, vue.toDisplayString(_ctx.translate("TagManager_OnlyTriggerWhen")) + " " + vue.toDisplayString(_ctx.translate("Goals_Optional")), 1)
                  ])
                ], 512), [
                  [vue.vShow, (_d = _ctx.trigger.typeMetadata) == null ? void 0 : _d.hasAdvancedSettings]
                ]),
                vue.withDirectives(vue.createElementVNode("div", null, [
                  vue.createElementVNode("div", _hoisted_12$b, [
                    vue.createElementVNode("div", _hoisted_13$b, [
                      vue.createElementVNode("p", null, vue.toDisplayString(_ctx.translate("TagManager_TriggerConditionsHelp")), 1)
                    ]),
                    vue.createElementVNode("div", _hoisted_14$b, [
                      vue.createElementVNode("div", _hoisted_15$b, [
                        vue.createElementVNode("span", {
                          class: "inline-help",
                          innerHTML: _ctx.$sanitize(_ctx.triggerInlineHelpText)
                        }, null, 8, _hoisted_16$b)
                      ])
                    ]),
                    vue.createElementVNode("div", _hoisted_17$a, [
                      vue.createElementVNode("div", null, [
                        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.trigger.conditions, (condition, index) => {
                          return vue.openBlock(), vue.createElementBlock("div", {
                            key: index,
                            class: vue.normalizeClass(["condition multiple valign-wrapper", `condition${index}`])
                          }, [
                            vue.createElementVNode("div", _hoisted_18$a, [
                              vue.createVNode(_component_Field, {
                                uicontrol: "expandable-select",
                                name: "condition_actual",
                                "model-value": condition.actual,
                                "onUpdate:modelValue": ($event) => {
                                  condition.actual = $event;
                                  _ctx.setValueHasChanged();
                                },
                                "full-width": true,
                                options: _ctx.availableVariables,
                                title: _ctx.variableIdToName[condition.actual] || condition.actual
                              }, null, 8, ["model-value", "onUpdate:modelValue", "options", "title"])
                            ]),
                            vue.createElementVNode("div", _hoisted_19$a, [
                              vue.createVNode(_component_Field, {
                                uicontrol: "select",
                                name: "condition_comparison",
                                "model-value": condition.comparison,
                                "onUpdate:modelValue": ($event) => {
                                  condition.comparison = $event;
                                  _ctx.setValueHasChanged();
                                },
                                "full-width": true,
                                options: _ctx.availableComparisons
                              }, null, 8, ["model-value", "onUpdate:modelValue", "options"])
                            ]),
                            vue.createElementVNode("div", _hoisted_20$a, [
                              vue.createVNode(_component_Field, {
                                uicontrol: "text",
                                name: "condition_expected",
                                "model-value": condition.expected,
                                "onUpdate:modelValue": ($event) => {
                                  condition.expected = $event;
                                  _ctx.setValueHasChanged();
                                  _ctx.onConditionChange();
                                },
                                "full-width": true
                              }, null, 8, ["model-value", "onUpdate:modelValue"])
                            ]),
                            vue.withDirectives(vue.createElementVNode("span", {
                              class: "icon-minus valign",
                              onClick: ($event) => _ctx.removeConditionEntry(index),
                              title: _ctx.translate("General_Remove")
                            }, null, 8, _hoisted_21$a), [
                              [vue.vShow, !(index + 1 === _ctx.trigger.conditions.length)]
                            ])
                          ], 2);
                        }), 128))
                      ]),
                      vue.createElementVNode("p", _hoisted_22$a, vue.toDisplayString(_ctx.translate("TagManager_TriggerConditionNode")), 1)
                    ])
                  ])
                ], 512), [
                  [vue.vShow, (_e = _ctx.trigger.typeMetadata) == null ? void 0 : _e.hasAdvancedSettings]
                ]),
                vue.withDirectives(vue.createElementVNode("div", {
                  class: "alert alert-danger",
                  innerHTML: _ctx.$sanitize(_ctx.getNoCustomTemplatePermissionErrorMessage())
                }, null, 8, _hoisted_23$9), [
                  [vue.vShow, _ctx.isTriggerDisabled]
                ]),
                !_ctx.isTriggerDisabled ? (vue.openBlock(), vue.createBlock(_component_SaveButton, {
                  key: 1,
                  class: "createButton",
                  onConfirm: _cache[3] || (_cache[3] = ($event) => _ctx.edit ? _ctx.updateTrigger() : _ctx.createTrigger()),
                  disabled: _ctx.isUpdating || !_ctx.isDirty,
                  saving: _ctx.isUpdating,
                  value: _ctx.saveButtonText
                }, null, 8, ["disabled", "saving", "value"])) : vue.createCommentVNode("", true),
                vue.withDirectives(vue.createElementVNode("div", _hoisted_24$9, [
                  vue.createElementVNode("a", {
                    onClick: _cache[4] || (_cache[4] = ($event) => _ctx.cancel())
                  }, vue.toDisplayString(_ctx.translate("General_Cancel")), 1)
                ], 512), [
                  [vue.vShow, !_ctx.isEmbedded]
                ])
              ])
            ], 544), [
              [vue.vShow, !_ctx.chooseTriggerType && _ctx.editTitle]
            ]),
            vue.withDirectives(vue.createElementVNode("div", _hoisted_25$9, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.availableTriggers, (triggerCategory, index) => {
                return vue.openBlock(), vue.createElementBlock("ul", {
                  class: "collection with-header",
                  key: index
                }, [
                  vue.createElementVNode("li", _hoisted_26$7, [
                    vue.createElementVNode("h4", null, vue.toDisplayString(triggerCategory.name), 1)
                  ]),
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(triggerCategory.types, (triggerTemplate, index2) => {
                    return vue.openBlock(), vue.createElementBlock("li", {
                      class: vue.normalizeClass(["collection-item avatar", {
                        disabledTemplate: _ctx.isTriggerTemplateDisabled[triggerTemplate.id],
                        [`templateType${triggerTemplate.id}`]: true
                      }]),
                      onClick: ($event) => _ctx.createTriggerType(triggerTemplate),
                      key: index2,
                      title: !_ctx.isTriggerTemplateDisabled[triggerTemplate.id] ? "" : _ctx.collectionItemAvatarText
                    }, [
                      triggerTemplate.icon ? (vue.openBlock(), vue.createElementBlock("img", {
                        key: 0,
                        alt: "",
                        class: "circle",
                        src: triggerTemplate.icon
                      }, null, 8, _hoisted_28$6)) : vue.createCommentVNode("", true),
                      vue.createElementVNode("span", _hoisted_29$6, vue.toDisplayString(triggerTemplate.name), 1),
                      vue.withDirectives(vue.createElementVNode("p", null, vue.toDisplayString(triggerTemplate.description), 513), [
                        [vue.vShow, triggerTemplate.description]
                      ]),
                      vue.withDirectives(vue.createElementVNode("span", _hoisted_30$6, [
                        vue.createElementVNode("i", {
                          class: "icon-help",
                          title: triggerTemplate.help
                        }, null, 8, _hoisted_31$5)
                      ], 512), [
                        [vue.vShow, !!triggerTemplate.help]
                      ])
                    ], 10, _hoisted_27$6);
                  }), 128))
                ]);
              }), 128)),
              vue.withDirectives(vue.createElementVNode("div", _hoisted_32$5, [
                vue.createElementVNode("a", {
                  onClick: _cache[6] || (_cache[6] = ($event) => _ctx.cancel())
                }, vue.toDisplayString(_ctx.translate("General_Cancel")), 1)
              ], 512), [
                [vue.vShow, !_ctx.isEmbedded]
              ])
            ], 512), [
              [vue.vShow, _ctx.chooseTriggerType]
            ])
          ];
        }),
        _: 1
      }, 8, ["content-title"])
    ], 512);
  }
  const TriggerEdit = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$n]]);
  const { tagManagerHelper: tagManagerHelper$5 } = window;
  const _sfc_main$m = vue.defineComponent({
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
      Field: CorePluginsAdmin.Field,
      ContentBlock: CoreHome.ContentBlock
    },
    directives: {
      ContentTable: CoreHome.ContentTable
    },
    data() {
      return {
        hasWriteAccess: CoreHome.Matomo.hasUserCapability("tagmanager_write"),
        triggerReferences: [],
        triggerSearch: ""
      };
    },
    created() {
      TriggersStore$1.fetchTriggers(this.idContainer, this.idContainerVersion);
    },
    methods: {
      createTrigger() {
        this.editTrigger(0);
      },
      editTrigger(idTrigger) {
        CoreHome.MatomoUrl.updateHash(__spreadProps(__spreadValues({}, CoreHome.MatomoUrl.hashParsed.value), {
          idTrigger
        }));
      },
      deleteTrigger(trigger) {
        CoreHome.AjaxHelper.fetch({
          method: "TagManager.getContainerTriggerReferences",
          idContainer: this.idContainer,
          idContainerVersion: this.idContainerVersion,
          idTrigger: trigger.idtrigger
        }).then((references) => {
          if (!references || !references.length) {
            this.triggerReferences = [];
            const doDelete = () => {
              TriggersStore$1.deleteTrigger(
                this.idContainer,
                this.idContainerVersion,
                trigger.idtrigger
              ).then(() => {
                TriggersStore$1.reload(this.idContainer, this.idContainerVersion);
                CoreHome.NotificationsStore.remove("CopyDialogResultNotification");
              });
            };
            CoreHome.Matomo.helper.modalConfirm(this.$refs.confirmDeleteTrigger, {
              yes: doDelete
            });
          } else {
            this.triggerReferences = references;
            CoreHome.Matomo.helper.modalConfirm(this.$refs.confirmDeleteTriggerNotPossible, {});
          }
        });
      },
      truncateText(text, length) {
        return tagManagerHelper$5.truncateText(text, length);
      },
      hasPublishCapability() {
        return CoreHome.Matomo.hasUserCapability("tagmanager_write") && CoreHome.Matomo.hasUserCapability("tagmanager_use_custom_templates");
      },
      openCopyDialog(trigger) {
        const url = CoreHome.MatomoUrl.stringify({
          module: "TagManager",
          action: "copyTriggerDialog",
          idSite: trigger.idsite,
          idContainer: this.idContainer,
          idTrigger: trigger.idtrigger,
          idContainerVersion: this.idContainerVersion
        });
        window.Piwik_Popover.createPopupAndLoadUrl(url, "", "mtmCopyTrigger");
      }
    },
    computed: {
      isLoading() {
        return TriggersStore$1.isLoading.value;
      },
      isUpdating() {
        return TriggersStore$1.isUpdating.value;
      },
      triggers() {
        return TriggersStore$1.triggers.value;
      },
      sortedTriggers() {
        const searchFilter = this.triggerSearch.toLowerCase();
        const result = [...this.triggers].filter((h) => Object.keys(h).some((propName) => {
          const entity = h;
          let propValue = "";
          if (typeof entity[propName] === "string") {
            propValue = entity[propName];
          } else if (propName === "typeMetadata") {
            const propTypeMeta = entity.typeMetadata;
            propValue = propTypeMeta.name;
          } else if (propName === "parameters" && entity.type === "CustomEvent") {
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
        return this.translate("TagManager_TriggersNameDescription");
      },
      descriptionTranslatedText() {
        return this.translate("TagManager_TriggersDescriptionDescription");
      },
      typeTranslatedText() {
        return this.translate("TagManager_TriggersTypeDescription");
      },
      filterTranslatedText() {
        return this.translate("TagManager_TriggersFilterDescription");
      },
      lastUpdatedTranslatedText() {
        return this.translate("TagManager_TriggersLastUpdatedDescription");
      },
      actionTranslatedText() {
        return this.translate("TagManager_TriggersActionDescription");
      },
      getActionClasses() {
        const copyClass = this.hasPublishCapability() ? " hasCopyAction" : "";
        return `action${copyClass}`;
      },
      canUseCustomTemplates() {
        return CoreHome.Matomo.hasUserCapability("tagmanager_use_custom_templates");
      }
    }
  });
  const _hoisted_1$m = { class: "tagManagerManageList tagManagerTriggerList" };
  const _hoisted_2$j = { class: "triggerSearchFilter" };
  const _hoisted_3$j = ["title"];
  const _hoisted_4$f = ["title"];
  const _hoisted_5$d = ["title"];
  const _hoisted_6$c = ["title"];
  const _hoisted_7$c = ["title"];
  const _hoisted_8$c = ["title"];
  const _hoisted_9$b = { colspan: "7" };
  const _hoisted_10$b = { class: "loadingPiwik" };
  const _hoisted_11$b = /* @__PURE__ */ vue.createElementVNode("img", { src: "plugins/Morpheus/images/loading-blue.gif" }, null, -1);
  const _hoisted_12$a = { colspan: "7" };
  const _hoisted_13$a = ["id"];
  const _hoisted_14$a = ["title"];
  const _hoisted_15$a = ["title"];
  const _hoisted_16$a = ["title"];
  const _hoisted_17$9 = { class: "conditions" };
  const _hoisted_18$9 = { class: "icon-ok" };
  const _hoisted_19$9 = ["title"];
  const _hoisted_20$9 = ["onClick", "title"];
  const _hoisted_21$9 = ["onClick", "title"];
  const _hoisted_22$9 = ["onClick", "title"];
  const _hoisted_23$8 = { class: "tableActionBar" };
  const _hoisted_24$8 = /* @__PURE__ */ vue.createElementVNode("span", { class: "icon-add" }, " ", -1);
  const _hoisted_25$8 = {
    class: "ui-confirm",
    id: "confirmDeleteTrigger",
    ref: "confirmDeleteTrigger"
  };
  const _hoisted_26$6 = ["value"];
  const _hoisted_27$5 = ["value"];
  const _hoisted_28$5 = {
    class: "ui-confirm",
    id: "confirmDeleteTriggerNotPossible",
    ref: "confirmDeleteTriggerNotPossible"
  };
  const _hoisted_29$5 = { class: "collection" };
  const _hoisted_30$5 = ["value"];
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Field = vue.resolveComponent("Field");
    const _component_ContentBlock = vue.resolveComponent("ContentBlock");
    const _directive_content_table = vue.resolveDirective("content-table");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$m, [
      vue.createVNode(_component_ContentBlock, {
        feature: "Tag Manager",
        "content-title": _ctx.translate("TagManager_ManageX", _ctx.translate("TagManager_Triggers")),
        "help-text": _ctx.triggersHelpText
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("p", null, vue.toDisplayString(_ctx.translate("TagManager_TriggerUsageBenefits")), 1),
          vue.createElementVNode("div", _hoisted_2$j, [
            vue.withDirectives(vue.createVNode(_component_Field, {
              uicontrol: "text",
              name: "triggerSearch",
              title: _ctx.translate("General_Search"),
              modelValue: _ctx.triggerSearch,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.triggerSearch = $event)
            }, null, 8, ["title", "modelValue"]), [
              [vue.vShow, _ctx.triggers.length > 0]
            ])
          ]),
          vue.withDirectives((vue.openBlock(), vue.createElementBlock("table", null, [
            vue.createElementVNode("thead", null, [
              vue.createElementVNode("tr", null, [
                vue.createElementVNode("th", {
                  class: "name",
                  title: _ctx.nameTranslatedText
                }, vue.toDisplayString(_ctx.translate("General_Name")), 9, _hoisted_3$j),
                vue.createElementVNode("th", {
                  class: "description",
                  title: _ctx.descriptionTranslatedText
                }, vue.toDisplayString(_ctx.translate("General_Description")), 9, _hoisted_4$f),
                vue.createElementVNode("th", {
                  class: "type",
                  title: _ctx.typeTranslatedText
                }, vue.toDisplayString(_ctx.translate("TagManager_Type")), 9, _hoisted_5$d),
                vue.createElementVNode("th", {
                  class: "conditions",
                  title: _ctx.filterTranslatedText
                }, vue.toDisplayString(_ctx.translate("TagManager_Filter")), 9, _hoisted_6$c),
                vue.createElementVNode("th", {
                  class: "lastUpdated",
                  title: _ctx.lastUpdatedTranslatedText
                }, vue.toDisplayString(_ctx.translate("TagManager_LastUpdated")), 9, _hoisted_7$c),
                vue.withDirectives(vue.createElementVNode("th", {
                  class: "action",
                  title: _ctx.actionTranslatedText
                }, vue.toDisplayString(_ctx.translate("General_Actions")), 9, _hoisted_8$c), [
                  [vue.vShow, _ctx.hasWriteAccess]
                ])
              ])
            ]),
            vue.createElementVNode("tbody", null, [
              vue.withDirectives(vue.createElementVNode("tr", null, [
                vue.createElementVNode("td", _hoisted_9$b, [
                  vue.createElementVNode("span", _hoisted_10$b, [
                    _hoisted_11$b,
                    vue.createTextVNode(" " + vue.toDisplayString(_ctx.translate("General_LoadingData")), 1)
                  ])
                ])
              ], 512), [
                [vue.vShow, _ctx.isLoading || _ctx.isUpdating]
              ]),
              vue.withDirectives(vue.createElementVNode("tr", null, [
                vue.createElementVNode("td", _hoisted_12$a, [
                  vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_NoTriggersFound")) + " ", 1),
                  vue.withDirectives(vue.createElementVNode("a", {
                    class: "createContainerTriggerNow",
                    onClick: _cache[1] || (_cache[1] = ($event) => _ctx.createTrigger())
                  }, vue.toDisplayString(_ctx.translate("TagManager_CreateNewTriggerNow")), 513), [
                    [vue.vShow, _ctx.hasWriteAccess]
                  ])
                ])
              ], 512), [
                [vue.vShow, !_ctx.isLoading && _ctx.triggers.length === 0]
              ]),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.sortedTriggers, (trigger) => {
                var _a2, _b2;
                return vue.openBlock(), vue.createElementBlock("tr", {
                  id: `trigger${trigger.idtrigger}`,
                  class: "triggers",
                  key: trigger.idtrigger
                }, [
                  vue.createElementVNode("td", {
                    class: "name",
                    title: trigger.name
                  }, vue.toDisplayString(_ctx.truncateText(trigger.name, 50)), 9, _hoisted_14$a),
                  vue.createElementVNode("td", {
                    class: "description",
                    title: trigger.description
                  }, vue.toDisplayString(_ctx.truncateText(trigger.description, 75)), 9, _hoisted_15$a),
                  vue.createElementVNode("td", {
                    class: "type",
                    title: trigger.typeMetadata.description
                  }, vue.toDisplayString(trigger.typeMetadata.name), 9, _hoisted_16$a),
                  vue.createElementVNode("td", _hoisted_17$9, [
                    vue.withDirectives(vue.createElementVNode("span", _hoisted_18$9, null, 512), [
                      [vue.vShow, (_a2 = trigger.conditions) == null ? void 0 : _a2.length]
                    ])
                  ]),
                  vue.createElementVNode("td", {
                    class: "lastUpdated",
                    title: _ctx.translate("TagManager_CreatedOnX", trigger.created_date_pretty)
                  }, [
                    vue.createElementVNode("span", null, vue.toDisplayString(trigger.updated_date_pretty), 1)
                  ], 8, _hoisted_19$9),
                  vue.withDirectives(vue.createElementVNode("td", {
                    class: vue.normalizeClass(_ctx.getActionClasses)
                  }, [
                    vue.createElementVNode("a", {
                      class: "table-action icon-edit",
                      onClick: ($event) => _ctx.editTrigger(trigger.idtrigger, trigger.type),
                      title: _ctx.translate("TagManager_EditTrigger")
                    }, null, 8, _hoisted_20$9),
                    vue.withDirectives(vue.createElementVNode("a", {
                      class: "table-action icon-content-copy",
                      onClick: ($event) => _ctx.openCopyDialog(trigger),
                      title: _ctx.translate(
                        "TagManager_CopyX",
                        _ctx.translate("TagManager_Trigger")
                      )
                    }, null, 8, _hoisted_21$9), [
                      [vue.vShow, _ctx.hasPublishCapability()]
                    ]),
                    vue.withDirectives(vue.createElementVNode("a", {
                      class: "table-action icon-delete",
                      onClick: ($event) => _ctx.deleteTrigger(trigger),
                      title: _ctx.translate("TagManager_DeleteX", _ctx.translate("TagManager_Trigger"))
                    }, null, 8, _hoisted_22$9), [
                      [vue.vShow, !((_b2 = trigger.typeMetadata) == null ? void 0 : _b2.isCustomTemplate) || _ctx.canUseCustomTemplates]
                    ])
                  ], 2), [
                    [vue.vShow, _ctx.hasWriteAccess]
                  ])
                ], 8, _hoisted_13$a);
              }), 128))
            ])
          ])), [
            [_directive_content_table]
          ]),
          vue.withDirectives(vue.createElementVNode("div", _hoisted_23$8, [
            vue.createElementVNode("a", {
              class: "createNewTrigger",
              value: "",
              onClick: _cache[2] || (_cache[2] = ($event) => _ctx.createTrigger())
            }, [
              _hoisted_24$8,
              vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_CreateNewTrigger")), 1)
            ])
          ], 512), [
            [vue.vShow, _ctx.hasWriteAccess]
          ])
        ]),
        _: 1
      }, 8, ["content-title", "help-text"]),
      vue.createElementVNode("div", _hoisted_25$8, [
        vue.createElementVNode("h2", null, vue.toDisplayString(_ctx.translate("TagManager_DeleteTriggerConfirm")), 1),
        vue.createElementVNode("input", {
          role: "yes",
          type: "button",
          value: _ctx.translate("General_Yes")
        }, null, 8, _hoisted_26$6),
        vue.createElementVNode("input", {
          role: "no",
          type: "button",
          value: _ctx.translate("General_No")
        }, null, 8, _hoisted_27$5)
      ], 512),
      vue.createElementVNode("div", _hoisted_28$5, [
        vue.createElementVNode("h2", null, vue.toDisplayString(_ctx.translate("TagManager_TriggerCannotBeDeleted")), 1),
        vue.createElementVNode("p", null, vue.toDisplayString(_ctx.translate("TagManager_TriggerBeingUsedBy")), 1),
        vue.createElementVNode("ul", _hoisted_29$5, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.triggerReferences, (reference) => {
            return vue.openBlock(), vue.createElementBlock("li", {
              class: "collection-item",
              key: reference.referenceId
            }, vue.toDisplayString(reference.referenceTypeName) + ": " + vue.toDisplayString(reference.referenceName), 1);
          }), 128))
        ]),
        vue.createElementVNode("p", null, vue.toDisplayString(_ctx.translate("TagManager_TriggerBeingUsedNeedsRemove")), 1),
        vue.createElementVNode("input", {
          role: "no",
          type: "button",
          value: _ctx.translate("General_Cancel")
        }, null, 8, _hoisted_30$5)
      ], 512)
    ]);
  }
  const TriggerList = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$m]]);
  const _sfc_main$l = vue.defineComponent({
    props: {
      idContainerVersion: Number,
      idContainer: String,
      triggersHelpText: String
    },
    components: {
      TriggerList,
      TriggerEdit
    },
    data() {
      return {
        isAddAllowed: false
      };
    },
    created() {
      vue.watch(() => CoreHome.MatomoUrl.hashParsed.value.idTrigger, (idTrigger) => {
        this.onIdTriggerParamChange(idTrigger);
      });
      CoreHome.NotificationsStore.remove("triggertriggermanagement");
      this.onIdTriggerParamChange(CoreHome.MatomoUrl.hashParsed.value.idTrigger);
    },
    methods: {
      onIdTriggerParamChange(idTrigger) {
        if (idTrigger === "0") {
          const parameters = { isAllowed: true };
          CoreHome.Matomo.postEvent("TagManager.initAddTrigger", parameters);
          this.isAddAllowed = !!parameters.isAllowed;
        }
      }
    },
    computed: {
      idTrigger() {
        const idTrigger = CoreHome.MatomoUrl.hashParsed.value.idTrigger;
        if (!this.isAddAllowed && idTrigger === "0") {
          return null;
        }
        return idTrigger ? parseInt(idTrigger, 10) : idTrigger;
      },
      editMode() {
        return typeof this.idTrigger === "number";
      }
    }
  });
  const _hoisted_1$l = { class: "manageTrigger" };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_TriggerList = vue.resolveComponent("TriggerList");
    const _component_TriggerEdit = vue.resolveComponent("TriggerEdit");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$l, [
      vue.withDirectives(vue.createElementVNode("div", null, [
        vue.createElementVNode("div", null, [
          vue.createVNode(_component_TriggerList, {
            "id-container": _ctx.idContainer,
            "id-container-version": _ctx.idContainerVersion,
            "triggers-help-text": _ctx.triggersHelpText
          }, null, 8, ["id-container", "id-container-version", "triggers-help-text"])
        ])
      ], 512), [
        [vue.vShow, !_ctx.editMode]
      ]),
      vue.withDirectives(vue.createElementVNode("div", null, [
        vue.createElementVNode("div", null, [
          vue.createVNode(_component_TriggerEdit, {
            "id-container": _ctx.idContainer,
            "id-container-version": _ctx.idContainerVersion,
            "id-trigger": _ctx.idTrigger
          }, null, 8, ["id-container", "id-container-version", "id-trigger"])
        ])
      ], 512), [
        [vue.vShow, _ctx.editMode]
      ])
    ]);
  }
  const TriggerManage = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$l]]);
  /*!
   * Matomo - free/libre analytics platform
   *
   * @link https://matomo.org
   * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
   */
  class AvailableFireLimitStore {
    constructor() {
      __publicField(this, "privateState", vue.reactive({
        fireLimits: [],
        isLoading: false
      }));
      __publicField(this, "state", vue.computed(() => vue.readonly(this.privateState)));
      __publicField(this, "isLoading", vue.computed(() => this.state.value.isLoading));
      __publicField(this, "fireLimits", vue.computed(() => this.state.value.fireLimits));
      __publicField(this, "fireLimitsOptions", vue.computed(() => this.fireLimits.value.map(
        ({ id, name }) => ({ key: id, value: name })
      )));
      __publicField(this, "initializePromise", null);
    }
    init() {
      if (!this.initializePromise) {
        this.initializePromise = this.fetchAvailableFireLimits();
      }
      return this.initializePromise;
    }
    fetchAvailableFireLimits() {
      this.privateState.isLoading = true;
      return CoreHome.AjaxHelper.fetch({
        method: "TagManager.getAvailableTagFireLimits",
        filter_limit: "-1"
      }).then((fireLimits) => {
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
  const AvailableFireLimitsStore = new AvailableFireLimitStore();
  const _sfc_main$k = vue.defineComponent({
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
      Field: CorePluginsAdmin.Field
    },
    emits: ["update:modelValue", "create", "edit"],
    methods: {
      onChangeTrigger(idTrigger, index) {
        const newValue = [...this.modelValue];
        newValue[index] = parseInt(idTrigger, 10);
        this.$emit("update:modelValue", newValue);
      },
      removeTrigger(index) {
        const newValue = [...this.modelValue];
        newValue.splice(index, 1);
        this.$emit("update:modelValue", newValue);
      }
    }
  });
  const _hoisted_1$k = { class: "col s12 m6" };
  const _hoisted_2$i = ["for"];
  const _hoisted_3$i = /* @__PURE__ */ vue.createElementVNode("br", null, null, -1);
  const _hoisted_4$e = ["name"];
  const _hoisted_5$c = ["onClick", "title"];
  const _hoisted_6$b = ["onClick", "title"];
  const _hoisted_7$b = { class: "col s12 m6" };
  const _hoisted_8$b = { class: "form-help" };
  const _hoisted_9$a = { class: "inline-help" };
  const _hoisted_10$a = /* @__PURE__ */ vue.createElementVNode("br", null, null, -1);
  const _hoisted_11$a = /* @__PURE__ */ vue.createElementVNode("br", null, null, -1);
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Field = vue.resolveComponent("Field");
    return vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(["form-group row", `${_ctx.type}Triggers`])
    }, [
      vue.createElementVNode("div", _hoisted_1$k, [
        vue.createElementVNode("div", null, [
          vue.createElementVNode("label", {
            for: `${_ctx.type}_triggers`
          }, vue.toDisplayString(_ctx.title), 9, _hoisted_2$i),
          vue.withDirectives(vue.createElementVNode("p", null, [
            _hoisted_3$i,
            vue.createTextVNode(" " + vue.toDisplayString(_ctx.translate("TagManager_NoTriggersFound")) + ". ", 1),
            vue.createElementVNode("a", {
              class: "createNewTrigger",
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("create"))
            }, vue.toDisplayString(_ctx.translate("TagManager_CreateNewTriggerNow")), 1)
          ], 512), [
            [vue.vShow, _ctx.containerTriggers.length === 0]
          ]),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.modelValue, (idTrigger, index) => {
            return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
              class: vue.normalizeClass(["multiple valign-wrapper", `${_ctx.type}Trigger ${_ctx.type}Trigger${index}`]),
              key: index
            }, [
              vue.createElementVNode("div", {
                class: "innerFormField",
                name: `${_ctx.type}_triggers`
              }, [
                vue.createVNode(_component_Field, {
                  uicontrol: "select",
                  name: `${_ctx.type}_triggers`,
                  "model-value": idTrigger,
                  "onUpdate:modelValue": ($event) => _ctx.onChangeTrigger($event, index),
                  "full-width": true,
                  options: _ctx.containerTriggers
                }, null, 8, ["name", "model-value", "onUpdate:modelValue", "options"])
              ], 8, _hoisted_4$e),
              vue.withDirectives(vue.createElementVNode("span", {
                class: "icon-edit valign",
                onClick: ($event) => _ctx.$emit("edit", idTrigger),
                title: _ctx.translate("General_Edit")
              }, null, 8, _hoisted_5$c), [
                [vue.vShow, idTrigger]
              ]),
              vue.withDirectives(vue.createElementVNode("span", {
                class: "icon-minus valign",
                onClick: ($event) => _ctx.removeTrigger(index),
                title: _ctx.translate("General_Remove")
              }, null, 8, _hoisted_6$b), [
                [vue.vShow, index + 1 !== _ctx.modelValue.length]
              ])
            ], 2)), [
              [vue.vShow, _ctx.containerTriggers.length]
            ]);
          }), 128))
        ])
      ]),
      vue.createElementVNode("div", _hoisted_7$b, [
        vue.createElementVNode("div", _hoisted_8$b, [
          vue.createElementVNode("span", _hoisted_9$a, [
            vue.createTextVNode(vue.toDisplayString(_ctx.help) + " ", 1),
            _hoisted_10$a,
            _hoisted_11$a,
            vue.createElementVNode("a", {
              class: "createTriggerInHelp",
              onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("create"))
            }, vue.toDisplayString(_ctx.translate("TagManager_CreateNewTriggerNow")), 1)
          ])
        ])
      ])
    ], 2);
  }
  const TagTriggerArray = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$k]]);
  function prefixDateZeroIfNeeded(number) {
    let datePart = String(number);
    if (datePart.length === 1) {
      datePart = `0${datePart}`;
    }
    return datePart;
  }
  function convertUtcToLocalDate(dateTime) {
    if (!dateTime) {
      return void 0;
    }
    let isoDate = dateTime;
    if (isoDate) {
      isoDate = `${isoDate}`.replace(/-/g, "/");
      try {
        return /* @__PURE__ */ new Date(`${isoDate} UTC`);
      } catch (e) {
        try {
          return new Date(Date.parse(`${isoDate} UTC`));
        } catch (ex) {
          const datePart = isoDate.substr(0, 10);
          const timePart = isoDate.substr(11);
          const dateParts = datePart.split("/");
          const timeParts = timePart.split(":");
          if (dateParts.length === 3 && timeParts.length === 3) {
            const result = new Date(
              parseInt(dateParts[0], 10),
              parseInt(dateParts[1], 10) - 1,
              parseInt(dateParts[2], 10),
              parseInt(timeParts[0], 10),
              parseInt(timeParts[1], 10),
              parseInt(timeParts[2], 10)
            );
            const newTime = result.getTime() + result.getTimezoneOffset() * 6e4;
            return new Date(newTime);
          }
        }
      }
    }
    return void 0;
  }
  function convertUtcDateToLocalDatePart(isoDateTime) {
    const localStartDate = convertUtcToLocalDate(isoDateTime);
    if (localStartDate) {
      const month = prefixDateZeroIfNeeded(localStartDate.getMonth() + 1);
      const date = prefixDateZeroIfNeeded(localStartDate.getDate());
      return `${localStartDate.getFullYear()}-${month}-${date}`;
    }
    const parts = isoDateTime.split(" ");
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
    const parts = isoDateTime.split(" ");
    return parts[1];
  }
  function convertLocalDateToUtc(strDate) {
    let dateTime = strDate;
    if (dateTime) {
      dateTime = dateTime.replace(/-/g, "/");
    }
    try {
      const localDate = new Date(dateTime);
      const month = prefixDateZeroIfNeeded(localDate.getUTCMonth() + 1);
      const date = prefixDateZeroIfNeeded(localDate.getUTCDate());
      const hours = prefixDateZeroIfNeeded(localDate.getUTCHours());
      const minutes = prefixDateZeroIfNeeded(localDate.getUTCMinutes());
      const seconds = prefixDateZeroIfNeeded(localDate.getUTCSeconds());
      let formatted = "";
      formatted += `${localDate.getUTCFullYear()}-${month}-${date}`;
      formatted += " ";
      formatted += `${hours}:${minutes}:${seconds}`;
      return formatted;
    } catch (e) {
      return dateTime;
    }
  }
  const { $: $$3 } = window;
  const _sfc_main$j = vue.defineComponent({
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
      const datePickerOptions = __spreadProps(__spreadValues({}, CoreHome.Matomo.getBaseDatePickerOptions(null)), {
        minDate: /* @__PURE__ */ new Date()
      });
      delete datePickerOptions.maxDate;
      $$3(this.$refs.dateInput).datepicker(__spreadValues({}, datePickerOptions));
      $$3(this.$refs.timeInput).timepicker({ timeFormat: "H:i:s" }).on("change", (event) => {
        this.onTimeKeydown(event);
      });
    },
    computed: {
      dateText() {
        if (!this.modelValue) {
          return "";
        }
        return convertUtcDateToLocalDatePart(this.modelValue);
      },
      timeText() {
        if (!this.modelValue) {
          return "";
        }
        return convertUtcDateToLocalTimePart(this.modelValue);
      }
    },
    methods: {
      onDateKeydown(event) {
        setTimeout(() => {
          const { value } = event.target;
          if (this.dateText === value) {
            return;
          }
          this.onChange(value, this.timeText);
        });
      },
      onTimeKeydown(event) {
        setTimeout(() => {
          const { value } = event.target;
          if (this.timeText === value) {
            return;
          }
          this.onChange(this.dateText, value);
        });
      },
      onChange(date, time) {
        if (!date) {
          this.$emit("update:model-value", null);
          return;
        }
        const timeToUse = time || this.defaultTime;
        const newDate = convertLocalDateToUtc(`${date} ${timeToUse}`);
        this.$emit("update:model-value", newDate);
      }
    }
  });
  const _hoisted_1$j = { class: "col s12 m6 input-field" };
  const _hoisted_2$h = ["name", "id", "value"];
  const _hoisted_3$h = { class: "col s12 m6 input-field" };
  const _hoisted_4$d = ["name", "id", "value"];
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createElementVNode("div", _hoisted_1$j, [
        vue.createElementVNode("input", {
          ref: "dateInput",
          type: "text",
          name: `${_ctx.name}_date`,
          id: `${_ctx.name}_date`,
          class: "dateInput",
          value: _ctx.dateText,
          onKeydown: _cache[0] || (_cache[0] = ($event) => _ctx.onDateKeydown($event)),
          onChange: _cache[1] || (_cache[1] = ($event) => _ctx.onDateKeydown($event))
        }, null, 40, _hoisted_2$h)
      ]),
      vue.createElementVNode("div", _hoisted_3$h, [
        vue.createElementVNode("input", {
          ref: "timeInput",
          type: "text",
          name: `${_ctx.name}_time`,
          id: `${_ctx.name}_time`,
          class: "timeInput",
          value: _ctx.timeText,
          onKeydown: _cache[2] || (_cache[2] = ($event) => _ctx.onTimeKeydown($event))
        }, null, 40, _hoisted_4$d)
      ])
    ], 64);
  }
  const TagDateInput = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$j]]);
  /*!
   * Matomo - free/libre analytics platform
   *
   * @link https://matomo.org
   * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
   */
  class TagsStore {
    constructor() {
      __publicField(this, "privateState", vue.reactive({
        tags: [],
        isLoadingTags: false,
        isLoadingSingle: false,
        isUpdating: false
      }));
      __publicField(this, "state", vue.computed(() => vue.readonly(this.privateState)));
      __publicField(this, "isLoading", vue.computed(() => {
        const state = this.state.value;
        return state.isLoadingTags || state.isLoadingSingle;
      }));
      __publicField(this, "isUpdating", vue.computed(() => this.state.value.isUpdating));
      __publicField(this, "tags", vue.computed(() => this.state.value.tags));
      __publicField(this, "fetchPromise", null);
      __publicField(this, "availableTagsPromises", {});
    }
    fetchTags(idContainer, idContainerVersion) {
      this.privateState.isLoadingTags = true;
      this.privateState.tags = [];
      if (!this.fetchPromise) {
        this.fetchPromise = CoreHome.AjaxHelper.fetch({
          method: "TagManager.getContainerTags",
          idContainer,
          idContainerVersion,
          filter_limit: "-1"
        });
      }
      return Promise.resolve(this.fetchPromise).then((tags) => {
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
      const found = this.tags.value.find((v) => v.idtag === idTag);
      if (found) {
        return Promise.resolve(found);
      }
      this.privateState.isLoadingSingle = true;
      return CoreHome.AjaxHelper.fetch({
        idTag,
        idContainer,
        idContainerVersion,
        method: "TagManager.getContainerTag",
        filter_limit: "-1"
      }).then((record) => {
        this.privateState.tags = [...this.privateState.tags, record];
        return vue.readonly(record);
      }).finally(() => {
        this.privateState.isLoadingSingle = false;
      });
    }
    fetchAvailableTags(idContext) {
      if (!this.availableTagsPromises[idContext]) {
        this.availableTagsPromises[idContext] = CoreHome.AjaxHelper.fetch({
          method: "TagManager.getAvailableTagTypesInContext",
          idContext,
          filter_limit: "-1"
        }).then((tags) => vue.readonly(tags));
      }
      return Promise.resolve(this.availableTagsPromises[idContext]);
    }
    createOrUpdateTag(tag, method, idContainer, idContainerVersion, parameterValues, fireTriggerIds, blockTriggerIds) {
      this.privateState.isUpdating = true;
      const mappedEntries = Object.entries(parameterValues).map(([key, value]) => {
        let newValue = value;
        if (typeof value === "boolean") {
          newValue = (+value).toString();
        }
        return [key, newValue];
      });
      const parameters = Object.fromEntries(mappedEntries);
      return CoreHome.AjaxHelper.post(
        {
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
        },
        {
          parameters,
          fireTriggerIds,
          blockTriggerIds
        },
        { withTokenInUrl: true }
      ).finally(() => {
        this.privateState.isUpdating = false;
      });
    }
    deleteTag(idContainer, idContainerVersion, idTag) {
      this.privateState.isUpdating = true;
      this.privateState.tags = [];
      return CoreHome.AjaxHelper.fetch(
        {
          idTag,
          idContainerVersion,
          idContainer,
          method: "TagManager.deleteContainerTag"
        },
        { withTokenInUrl: true }
      ).finally(() => {
        this.privateState.isUpdating = false;
      });
    }
    pauseTag(idContainer, idContainerVersion, idTag) {
      this.privateState.isUpdating = true;
      this.privateState.tags = [];
      return CoreHome.AjaxHelper.fetch(
        {
          idTag,
          idContainerVersion,
          idContainer,
          method: "TagManager.pauseContainerTag"
        },
        { withTokenInUrl: true }
      ).finally(() => {
        this.privateState.isUpdating = false;
      });
    }
    resumeTag(idContainer, idContainerVersion, idTag) {
      this.privateState.isUpdating = true;
      this.privateState.tags = [];
      return CoreHome.AjaxHelper.fetch(
        {
          idTag,
          idContainerVersion,
          idContainer,
          method: "TagManager.resumeContainerTag"
        },
        { withTokenInUrl: true }
      ).finally(() => {
        this.privateState.isUpdating = false;
      });
    }
    suggestNameForType(templateId) {
      for (let counter = 0; counter < 100; counter += 1) {
        let name = templateId;
        if (counter) {
          name = `${name} (${counter})`;
        }
        const isFree = !this.tags.value.some((v) => v.name === name);
        if (isFree) {
          return name;
        }
      }
      return void 0;
    }
  }
  const TagsStore$1 = new TagsStore();
  function getCurrentTime() {
    const date = /* @__PURE__ */ new Date();
    if (date && date.toString) {
      return date.toString();
    }
    return null;
  }
  const { $: $$2, tagManagerHelper: tagManagerHelper$4 } = window;
  const notificationId$3 = "tagtagmanagement";
  const _sfc_main$i = vue.defineComponent({
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
      TagDateInput,
      ContentBlock: CoreHome.ContentBlock,
      Field: CorePluginsAdmin.Field,
      SaveButton: CorePluginsAdmin.SaveButton,
      GroupedSettings: CorePluginsAdmin.GroupedSettings,
      TagTriggerArray
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
        editTitle: "",
        parameterValues: {},
        isUpdatingTag: false,
        fireTriggers: [],
        blockTriggers: [],
        currentTimeTimeout: null
      };
    },
    created() {
      AvailableFireLimitsStore.init();
      this.updateAvailableTriggers();
      this.setCurrentTime();
      TagsStore$1.reload(this.idContainer, this.idContainerVersion).then(() => {
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
        this.currentTimeTimeout = setTimeout(this.setCurrentTime.bind(this), 1e4);
      },
      updateAvailableTriggers() {
        CoreHome.AjaxHelper.fetch({
          method: "TagManager.getContainerTriggers",
          idContainer: this.idContainer,
          idContainerVersion: this.idContainerVersion,
          filter_limit: "-1"
        }).then((triggers) => {
          this.containerTriggers = triggers.map((t) => ({
            key: t.idtrigger,
            value: t.name
          }));
        });
      },
      removeAnyTagNotification() {
        CoreHome.NotificationsStore.remove(notificationId$3);
        CoreHome.NotificationsStore.remove("ajaxHelper");
      },
      showNotification(message, context, type = null) {
        const instanceId = CoreHome.NotificationsStore.show({
          message,
          context,
          id: notificationId$3,
          type: type !== null ? type : "toast"
        });
        setTimeout(() => {
          CoreHome.NotificationsStore.scrollToNotification(instanceId);
        }, 200);
      },
      showErrorFieldNotProvidedNotification(title) {
        const message = CoreHome.translate("TagManager_ErrorXNotProvided", [title]);
        this.showNotification(message, "error");
      },
      initIdTag() {
        this.tag = {};
        this.chooseTagType = false;
        this.editTitle = "";
        CoreHome.Matomo.helper.lazyScrollToContent();
        this.availableTags = [];
        CoreHome.AjaxHelper.fetch({
          method: "TagManager.getContainer",
          idContainer: this.idContainer,
          filter_limit: "-1"
        }).then(
          (container) => TagsStore$1.fetchAvailableTags(container.context)
        ).then((tags) => {
          this.availableTags = tags;
        }).then(() => {
          if (this.edit && this.idTag) {
            this.editTitle = CoreHome.translate("TagManager_EditTag");
            TagsStore$1.findTag(this.idContainer, this.idContainerVersion, this.idTag).then((tag) => {
              var _a2;
              if (!tag) {
                return;
              }
              this.tag = CoreHome.clone(tag);
              this.parameterValues = Object.fromEntries(tag.typeMetadata.parameters.map(
                (s) => [s.name, s.value]
              ));
              this.blockTriggers = [...this.tag.block_trigger_ids || []];
              if (!this.blockTriggers.length) {
                this.blockTriggers.push(null);
              }
              this.fireTriggers = [...this.tag.fire_trigger_ids || []];
              if (!this.fireTriggers.length) {
                this.fireTriggers.push(null);
              }
              this.onFireTriggerChange();
              this.onBlockTriggerChange();
              this.isDirty = false;
              this.editTitle = CoreHome.translate("TagManager_EditTag");
              if ((_a2 = this.tag.typeMetadata) == null ? void 0 : _a2.name) {
                this.editTitle += `: ${this.tag.typeMetadata.name}`;
              }
            });
            return;
          }
          if (this.create) {
            this.editTitle = CoreHome.translate("TagManager_ChooseTagToContinue");
            this.chooseTagType = true;
          }
        });
      },
      onCreateNewBlockTrigger() {
        this.openEditTrigger((trigger) => {
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
        this.openEditTrigger((trigger) => {
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
        tagManagerHelper$4.editTrigger(
          this.idContainer,
          this.idContainerVersion,
          idTag,
          (trigger) => {
            this.updateAvailableTriggers();
            callback(trigger);
          }
        );
      },
      onBlockTriggerChange() {
        const hasAll = this.blockTriggers.every((t) => !!t);
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
        const hasAll = this.fireTriggers.every((t) => !!t);
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
        var _a2;
        if (tagTemplate && this.isTagTemplateDisabled[tagTemplate.id]) {
          return;
        }
        this.chooseTagType = false;
        this.tag = {
          idsite: parseInt(`${CoreHome.Matomo.idSite}`, 10),
          name: TagsStore$1.suggestNameForType(tagTemplate.name) || "",
          type: tagTemplate.id,
          fire_limit: "unlimited",
          priority: tagTemplate.id === "GoogleTag" || tagTemplate.id === "GoogleAnalytics4" ? 1 : 999,
          // if both linking and conversion for Google Ads Conversion or pageview and events for GA4 fires on same trigger, this should get the highest priority else the conversion will throw error
          fire_delay: 0,
          typeMetadata: tagTemplate
        };
        this.editTitle = CoreHome.translate("TagManager_CreateNewTag");
        if ((_a2 = this.tag.typeMetadata) == null ? void 0 : _a2.name) {
          this.editTitle += `: ${this.tag.typeMetadata.name}`;
        }
        this.blockTriggers = [null];
        this.fireTriggers = [null];
        this.parameterValues = Object.fromEntries(tagTemplate.parameters.map(
          (s) => [s.name, s.value]
        ));
        this.isDirty = false;
        setTimeout(() => {
          const editTag = $$2(this.$refs.root);
          if (editTag.length && editTag[0]) {
            editTag[0].scrollIntoView();
          }
          editTag.find("#name").focus();
        }, 1);
      },
      cancel() {
        const newParams = __spreadValues({}, CoreHome.MatomoUrl.hashParsed.value);
        delete newParams.idTag;
        CoreHome.MatomoUrl.updateHash(newParams);
      },
      createTag() {
        this.removeAnyTagNotification();
        if (!this.checkRequiredFieldsAreSet()) {
          return;
        }
        this.isUpdatingTag = true;
        TagsStore$1.createOrUpdateTag(
          this.tag,
          "TagManager.addContainerTag",
          this.idContainer,
          this.idContainerVersion,
          this.parameterValues,
          this.fireTriggers.filter((id) => !!id),
          this.blockTriggers.filter((id) => !!id)
        ).then((response) => {
          if (!response) {
            return;
          }
          this.isDirty = false;
          TagsStore$1.reload(this.idContainer, this.idContainerVersion).then(() => {
            this.cancel();
            setTimeout(() => {
              const createdX = CoreHome.translate("TagManager_CreatedX", CoreHome.translate("TagManager_Tag"));
              if (this.hasPublishCapability()) {
                const wantToRedeploy = CoreHome.translate(
                  "TagManager_WantToDeployThisChangeCreateVersion",
                  '<a class="createNewVersionLink">',
                  "</a>"
                );
                this.showNotification(`${createdX} ${wantToRedeploy}`, "success", "transient");
                return;
              }
              this.showNotification(createdX, "success");
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
        TagsStore$1.createOrUpdateTag(
          this.tag,
          "TagManager.updateContainerTag",
          this.idContainer,
          this.idContainerVersion,
          this.parameterValues,
          this.fireTriggers.filter((id) => !!id),
          this.blockTriggers.filter((id) => !!id)
        ).then((response) => {
          if (!response) {
            return;
          }
          this.isDirty = false;
          TagsStore$1.reload(this.idContainer, this.idContainerVersion).then(() => {
            this.initIdTag();
          });
          this.cancel();
          const updatedAt = CoreHome.translate("TagManager_UpdatedX", CoreHome.translate("TagManager_Tag"));
          if (this.hasPublishCapability()) {
            const wantToDeploy = CoreHome.translate(
              "TagManager_WantToDeployThisChangeCreateVersion",
              '<a class="createNewVersionLink">',
              "</a>"
            );
            this.showNotification(`${updatedAt} ${wantToDeploy}`, "success", "transient");
            return;
          }
          this.showNotification(updatedAt, "success");
        }).finally(() => {
          this.isUpdatingTag = false;
        });
      },
      checkRequiredFieldsAreSet() {
        if (!this.tag.name) {
          const title = CoreHome.translate("General_Name");
          this.showErrorFieldNotProvidedNotification(title);
          return false;
        }
        if (!this.fireTriggers || !this.fireTriggers.length) {
          this.showNotification(CoreHome.translate("TagManager_TagFireTriggerRequirement"), "error");
          return false;
        }
        return true;
      },
      hasPublishCapability() {
        return CoreHome.Matomo.hasUserCapability("tagmanager_write") && CoreHome.Matomo.hasUserCapability("tagmanager_use_custom_templates");
      },
      isTagVisible(id) {
        if (this.create && id === "GoogleAnalytics4") {
          return false;
        }
        return true;
      },
      getNoCustomTemplatePermissionErrorMessage() {
        return CoreHome.translate(
          "TagManager_UseCustomTemplateCapabilityPermissionRequiredDescription",
          "<strong>",
          CoreHome.translate("TagManager_CapabilityUseCustomTemplates"),
          "</strong>"
        );
      }
    },
    computed: {
      availableFireLimits() {
        return AvailableFireLimitsStore.fireLimitsOptions.value;
      },
      isLoading() {
        return TriggersStore$1.isLoading.value || AvailableFireLimitsStore.isLoading.value;
      },
      isUpdating() {
        return TriggersStore$1.isUpdating.value || this.isUpdatingTag;
      },
      create() {
        return this.idTag === 0;
      },
      edit() {
        return !this.create;
      },
      canUseCustomTemplates() {
        return CoreHome.Matomo.hasUserCapability("tagmanager_use_custom_templates");
      },
      isTagDisabled() {
        var _a2;
        return !this.canUseCustomTemplates && ((_a2 = this.tag.typeMetadata) == null ? void 0 : _a2.isCustomTemplate);
      },
      isTagTemplateDisabled() {
        const result = {};
        this.availableTags.forEach((tagCategory) => {
          tagCategory.types.forEach((tag) => {
            result[tag.id] = !this.canUseCustomTemplates && tag.isCustomTemplate;
          });
        });
        return result;
      },
      collectionItemAvatarText() {
        return CoreHome.translate(
          "TagManager_UseCustomTemplateCapabilityPermissionRequiredDescription",
          "",
          CoreHome.translate("TagManager_CapabilityUseCustomTemplates"),
          ""
        );
      },
      fireLimitHelp() {
        return CoreHome.translate(
          "TagManager_FireLimitHelp",
          CoreHome.translate("TagManager_Unlimited"),
          CoreHome.translate("TagManager_OncePage"),
          CoreHome.translate("TagManager_Once24Hours"),
          CoreHome.translate("TagManager_OnceLifetime")
        );
      },
      tagNameHelpText() {
        let additionalHelpText = "";
        if (this.tag.type === "CustomHtml") {
          additionalHelpText = CoreHome.translate(
            "TagManager_CustomHTMLTagNameInlineHelpText",
            "<br><br><strong>",
            "</strong>",
            CoreHome.externalLink("https://matomo.org/faq/tag-manager/how-to-add-google-ads-remarketing-tags-in-matomo-tag-manager/"),
            "</a>"
          );
        }
        return CoreHome.translate("TagManager_NameHelpText", CoreHome.translate("TagManager_TagLowercase")) + additionalHelpText;
      }
    }
  });
  const _hoisted_1$i = {
    class: "editTag tagManagerManageEdit",
    ref: "root"
  };
  const _hoisted_2$g = { class: "loadingPiwik" };
  const _hoisted_3$g = /* @__PURE__ */ vue.createElementVNode("img", { src: "plugins/Morpheus/images/loading-blue.gif" }, null, -1);
  const _hoisted_4$c = { class: "loadingPiwik" };
  const _hoisted_5$b = /* @__PURE__ */ vue.createElementVNode("img", { src: "plugins/Morpheus/images/loading-blue.gif" }, null, -1);
  const _hoisted_6$a = ["innerHTML"];
  const _hoisted_7$a = { class: "form-group row" };
  const _hoisted_8$a = { class: "col s12" };
  const _hoisted_9$9 = { key: 0 };
  const _hoisted_10$9 = { class: "form-group row" };
  const _hoisted_11$9 = { class: "col s12" };
  const _hoisted_12$9 = { class: "form-group row" };
  const _hoisted_13$9 = { class: "col s12" };
  const _hoisted_14$9 = { class: "form-group row tagStartDate" };
  const _hoisted_15$9 = { class: "col s12 m6" };
  const _hoisted_16$9 = { class: "row" };
  const _hoisted_17$8 = { class: "col s12" };
  const _hoisted_18$8 = {
    for: "start_date_date",
    class: "active"
  };
  const _hoisted_19$8 = { class: "tagStartDate" };
  const _hoisted_20$8 = { class: "col s12 m6" };
  const _hoisted_21$8 = { class: "form-help" };
  const _hoisted_22$8 = { class: "inline-help" };
  const _hoisted_23$7 = ["innerHTML"];
  const _hoisted_24$7 = /* @__PURE__ */ vue.createElementVNode("br", null, null, -1);
  const _hoisted_25$7 = ["innerHTML"];
  const _hoisted_26$5 = { class: "form-group row tagEndDate" };
  const _hoisted_27$4 = { class: "col s12 m6" };
  const _hoisted_28$4 = { class: "row" };
  const _hoisted_29$4 = { class: "col s12" };
  const _hoisted_30$4 = {
    for: "end_date_date",
    class: "active"
  };
  const _hoisted_31$4 = { class: "tagEndDate" };
  const _hoisted_32$4 = { class: "col s12 m6" };
  const _hoisted_33$4 = { class: "form-help" };
  const _hoisted_34$4 = { class: "inline-help" };
  const _hoisted_35$4 = ["innerHTML"];
  const _hoisted_36$4 = /* @__PURE__ */ vue.createElementVNode("br", null, null, -1);
  const _hoisted_37$4 = ["innerHTML"];
  const _hoisted_38$3 = ["innerHTML"];
  const _hoisted_39$2 = { class: "entityCancel" };
  const _hoisted_40$2 = { id: "confirmSelectTagType" };
  const _hoisted_41$2 = { class: "collection-header" };
  const _hoisted_42$2 = ["onClick", "title"];
  const _hoisted_43$2 = ["src"];
  const _hoisted_44$2 = { class: "title" };
  const _hoisted_45$1 = { class: "secondary-content" };
  const _hoisted_46$1 = ["title"];
  const _hoisted_47$1 = { class: "entityCancel" };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Field = vue.resolveComponent("Field");
    const _component_GroupedSettings = vue.resolveComponent("GroupedSettings");
    const _component_TagTriggerArray = vue.resolveComponent("TagTriggerArray");
    const _component_TagDateInput = vue.resolveComponent("TagDateInput");
    const _component_SaveButton = vue.resolveComponent("SaveButton");
    const _component_ContentBlock = vue.resolveComponent("ContentBlock");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$i, [
      vue.createVNode(_component_ContentBlock, {
        feature: "Tag Manager",
        "content-title": _ctx.editTitle
      }, {
        default: vue.withCtx(() => {
          var _a2, _b2, _c, _d, _e;
          return [
            vue.withDirectives(vue.createElementVNode("p", null, [
              vue.createElementVNode("span", _hoisted_2$g, [
                _hoisted_3$g,
                vue.createTextVNode(" " + vue.toDisplayString(_ctx.translate("General_LoadingData")), 1)
              ])
            ], 512), [
              [vue.vShow, _ctx.isLoading]
            ]),
            vue.withDirectives(vue.createElementVNode("p", null, [
              vue.createElementVNode("span", _hoisted_4$c, [
                _hoisted_5$b,
                vue.createTextVNode(" " + vue.toDisplayString(_ctx.translate("TagManager_UpdatingData")), 1)
              ])
            ], 512), [
              [vue.vShow, _ctx.isUpdating]
            ]),
            vue.withDirectives(vue.createElementVNode("form", {
              onSubmit: _cache[18] || (_cache[18] = ($event) => _ctx.edit ? _ctx.updateTag() : _ctx.createTag())
            }, [
              vue.createElementVNode("div", null, [
                vue.withDirectives(vue.createElementVNode("div", {
                  class: "alert alert-danger",
                  innerHTML: _ctx.$sanitize(_ctx.getNoCustomTemplatePermissionErrorMessage())
                }, null, 8, _hoisted_6$a), [
                  [vue.vShow, _ctx.isTagDisabled]
                ]),
                vue.createElementVNode("div", null, [
                  vue.createVNode(_component_Field, {
                    uicontrol: "text",
                    name: "name",
                    "model-value": _ctx.tag.name,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => {
                      _ctx.tag.name = $event;
                      _ctx.setValueHasChanged();
                    }),
                    maxlength: 255,
                    title: _ctx.translate("General_Name"),
                    "inline-help": _ctx.tagNameHelpText,
                    placeholder: _ctx.translate("TagManager_TagNamePlaceholder")
                  }, null, 8, ["model-value", "title", "inline-help", "placeholder"])
                ]),
                vue.createElementVNode("div", null, [
                  vue.createVNode(_component_Field, {
                    uicontrol: "textarea",
                    name: "description",
                    "model-value": _ctx.tag.description,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => {
                      _ctx.tag.description = $event;
                      _ctx.setValueHasChanged();
                    }),
                    maxlength: 1e3,
                    title: _ctx.translate("TagManager_Description"),
                    "inline-help": _ctx.translate("TagManager_DescriptionHelpText"),
                    "ui-control-attributes": { class: "compact-textarea" },
                    placeholder: _ctx.translate("TagManager_TagDescriptionPlaceholder")
                  }, null, 8, ["model-value", "title", "inline-help", "placeholder"])
                ]),
                vue.withDirectives(vue.createElementVNode("div", _hoisted_7$a, [
                  vue.createElementVNode("div", _hoisted_8$a, [
                    vue.createElementVNode("h3", null, vue.toDisplayString(_ctx.translate("TagManager_ConfigureWhatTagDoes")), 1)
                  ])
                ], 512), [
                  [vue.vShow, (_a2 = _ctx.tag.typeMetadata) == null ? void 0 : _a2.parameters.length]
                ]),
                _ctx.tag ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_9$9, [
                  vue.createVNode(_component_GroupedSettings, {
                    settings: ((_b2 = _ctx.tag.typeMetadata) == null ? void 0 : _b2.parameters) || [],
                    "all-setting-values": _ctx.parameterValues,
                    onChange: _cache[2] || (_cache[2] = ($event) => {
                      _ctx.parameterValues[$event.name] = $event.value;
                      _ctx.setValueHasChanged();
                    })
                  }, null, 8, ["settings", "all-setting-values"])
                ])) : vue.createCommentVNode("", true),
                vue.withDirectives(vue.createElementVNode("div", _hoisted_10$9, [
                  vue.createElementVNode("div", _hoisted_11$9, [
                    vue.createElementVNode("h3", null, vue.toDisplayString(_ctx.translate("TagManager_ConfigureWhenTagDoes")), 1)
                  ])
                ], 512), [
                  [vue.vShow, (_c = _ctx.tag.typeMetadata) == null ? void 0 : _c.parameters.length]
                ]),
                vue.createVNode(_component_TagTriggerArray, {
                  "container-triggers": _ctx.containerTriggers,
                  type: "fire",
                  title: _ctx.translate("TagManager_FireTriggerTitle"),
                  help: _ctx.translate(
                    "TagManager_FireTriggerHelp",
                    _ctx.translate("TagManager_FireLimit")
                  ),
                  "model-value": _ctx.fireTriggers,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => {
                    _ctx.fireTriggers = $event;
                    _ctx.setValueHasChanged();
                    _ctx.onFireTriggerChange();
                  }),
                  onCreate: _cache[4] || (_cache[4] = ($event) => _ctx.onCreateNewFireTrigger()),
                  onEdit: _cache[5] || (_cache[5] = ($event) => _ctx.editTrigger($event))
                }, null, 8, ["container-triggers", "title", "help", "model-value"]),
                vue.createVNode(_component_TagTriggerArray, {
                  "container-triggers": _ctx.containerTriggers,
                  type: "block",
                  title: _ctx.translate("TagManager_BlockTriggerTitle"),
                  help: _ctx.translate("TagManager_BlockTriggerHelp"),
                  "model-value": _ctx.blockTriggers,
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => {
                    _ctx.blockTriggers = $event;
                    _ctx.setValueHasChanged();
                    _ctx.onBlockTriggerChange();
                  }),
                  onCreate: _cache[7] || (_cache[7] = ($event) => _ctx.onCreateNewBlockTrigger()),
                  onEdit: _cache[8] || (_cache[8] = ($event) => _ctx.editTrigger($event))
                }, null, 8, ["container-triggers", "title", "help", "model-value"]),
                vue.withDirectives(vue.createElementVNode("div", _hoisted_12$9, [
                  vue.createElementVNode("div", _hoisted_13$9, [
                    vue.createElementVNode("h3", null, [
                      vue.withDirectives(vue.createElementVNode("a", {
                        href: "",
                        class: "showAdvancedSettings",
                        onClick: _cache[9] || (_cache[9] = vue.withModifiers(($event) => _ctx.showAdvanced = true, ["prevent"]))
                      }, vue.toDisplayString(_ctx.translate("TagManager_ShowAdvancedSettings")), 513), [
                        [vue.vShow, !_ctx.showAdvanced]
                      ]),
                      vue.withDirectives(vue.createElementVNode("a", {
                        href: "",
                        class: "hideAdvancedSettings",
                        onClick: _cache[10] || (_cache[10] = vue.withModifiers(($event) => _ctx.showAdvanced = false, ["prevent"]))
                      }, vue.toDisplayString(_ctx.translate("TagManager_HideAdvancedSettings")), 513), [
                        [vue.vShow, _ctx.showAdvanced]
                      ])
                    ])
                  ])
                ], 512), [
                  [vue.vShow, (_d = _ctx.tag.typeMetadata) == null ? void 0 : _d.hasAdvancedSettings]
                ]),
                vue.withDirectives(vue.createElementVNode("div", null, [
                  vue.createElementVNode("div", null, [
                    vue.createVNode(_component_Field, {
                      uicontrol: "radio",
                      name: "fire_limit",
                      "model-value": _ctx.tag.fire_limit,
                      "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => {
                        _ctx.tag.fire_limit = $event;
                        _ctx.setValueHasChanged();
                      }),
                      options: _ctx.availableFireLimits,
                      title: _ctx.translate("TagManager_FireLimit"),
                      "inline-help": _ctx.fireLimitHelp
                    }, null, 8, ["model-value", "options", "title", "inline-help"])
                  ]),
                  vue.createElementVNode("div", null, [
                    vue.createVNode(_component_Field, {
                      uicontrol: "text",
                      name: "fire_delay",
                      "model-value": _ctx.tag.fire_delay,
                      "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => {
                        _ctx.tag.fire_delay = $event;
                        _ctx.setValueHasChanged();
                      }),
                      maxlength: 8,
                      title: _ctx.translate("TagManager_FireDelay"),
                      "inline-help": _ctx.translate("TagManager_FireDelayHelp"),
                      placeholder: _ctx.translate("TagManager_PlaceholderZero")
                    }, null, 8, ["model-value", "title", "inline-help", "placeholder"])
                  ]),
                  vue.createElementVNode("div", null, [
                    vue.createVNode(_component_Field, {
                      uicontrol: "text",
                      name: "priority",
                      "model-value": _ctx.tag.priority,
                      "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => {
                        _ctx.tag.priority = $event;
                        _ctx.setValueHasChanged();
                      }),
                      maxlength: 4,
                      title: _ctx.translate("TagManager_Priority"),
                      "inline-help": _ctx.translate("TagManager_PriorityHelp"),
                      placeholder: _ctx.translate("TagManager_PriorityPlaceholder")
                    }, null, 8, ["model-value", "title", "inline-help", "placeholder"])
                  ]),
                  vue.createElementVNode("div", _hoisted_14$9, [
                    vue.createElementVNode("div", _hoisted_15$9, [
                      vue.createElementVNode("div", _hoisted_16$9, [
                        vue.createElementVNode("div", _hoisted_17$8, [
                          vue.createElementVNode("label", _hoisted_18$8, vue.toDisplayString(_ctx.translate("TagManager_StartDate")) + ":", 1)
                        ]),
                        vue.createElementVNode("div", _hoisted_19$8, [
                          vue.createVNode(_component_TagDateInput, {
                            name: "start_date",
                            "model-value": _ctx.tag.start_date,
                            "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => {
                              _ctx.tag.start_date = $event;
                              _ctx.setValueHasChanged();
                            }),
                            "default-time": "00:00:00"
                          }, null, 8, ["model-value"])
                        ])
                      ])
                    ]),
                    vue.createElementVNode("div", _hoisted_20$8, [
                      vue.createElementVNode("div", _hoisted_21$8, [
                        vue.createElementVNode("span", _hoisted_22$8, [
                          vue.createElementVNode("span", null, [
                            vue.createElementVNode("span", {
                              innerHTML: _ctx.$sanitize(_ctx.translate(
                                "TagManager_TagStartDateHelp",
                                "<strong>",
                                "</strong>"
                              ))
                            }, null, 8, _hoisted_23$7),
                            _hoisted_24$7,
                            vue.createElementVNode("span", {
                              class: "currentLocalTime",
                              innerHTML: _ctx.$sanitize(_ctx.translate(
                                "TagManager_CurrentTimeInLocalTimezone",
                                "<strong>",
                                _ctx.currentTime,
                                "</strong>"
                              ))
                            }, null, 8, _hoisted_25$7)
                          ])
                        ])
                      ])
                    ])
                  ]),
                  vue.createElementVNode("div", _hoisted_26$5, [
                    vue.createElementVNode("div", _hoisted_27$4, [
                      vue.createElementVNode("div", _hoisted_28$4, [
                        vue.createElementVNode("div", _hoisted_29$4, [
                          vue.createElementVNode("label", _hoisted_30$4, vue.toDisplayString(_ctx.translate("TagManager_EndDate")) + ":", 1)
                        ]),
                        vue.createElementVNode("div", _hoisted_31$4, [
                          vue.createVNode(_component_TagDateInput, {
                            name: "end_date",
                            "model-value": _ctx.tag.end_date,
                            "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => {
                              _ctx.tag.end_date = $event;
                              _ctx.setValueHasChanged();
                            }),
                            "default-time": "23:59:59"
                          }, null, 8, ["model-value"])
                        ])
                      ])
                    ]),
                    vue.createElementVNode("div", _hoisted_32$4, [
                      vue.createElementVNode("div", _hoisted_33$4, [
                        vue.createElementVNode("span", _hoisted_34$4, [
                          vue.createElementVNode("span", null, [
                            vue.createElementVNode("span", {
                              innerHTML: _ctx.$sanitize(_ctx.translate(
                                "TagManager_TagEndDateHelp",
                                "<strong>",
                                "</strong>"
                              ))
                            }, null, 8, _hoisted_35$4),
                            _hoisted_36$4,
                            vue.createElementVNode("span", {
                              class: "currentLocalTime",
                              innerHTML: _ctx.$sanitize(_ctx.translate(
                                "TagManager_CurrentTimeInLocalTimezone",
                                "<strong>",
                                _ctx.currentTime,
                                "</strong>"
                              ))
                            }, null, 8, _hoisted_37$4)
                          ])
                        ])
                      ])
                    ])
                  ])
                ], 512), [
                  [vue.vShow, _ctx.showAdvanced && ((_e = _ctx.tag.typeMetadata) == null ? void 0 : _e.hasAdvancedSettings)]
                ]),
                vue.withDirectives(vue.createElementVNode("div", {
                  class: "alert alert-danger",
                  innerHTML: _ctx.$sanitize(_ctx.getNoCustomTemplatePermissionErrorMessage())
                }, null, 8, _hoisted_38$3), [
                  [vue.vShow, _ctx.isTagDisabled]
                ]),
                !_ctx.isTagDisabled ? (vue.openBlock(), vue.createBlock(_component_SaveButton, {
                  key: 1,
                  class: "createButton",
                  onConfirm: _cache[16] || (_cache[16] = ($event) => _ctx.edit ? _ctx.updateTag() : _ctx.createTag()),
                  disabled: _ctx.isUpdating || !_ctx.isDirty,
                  saving: _ctx.isUpdating,
                  value: _ctx.edit ? _ctx.translate("CoreUpdater_UpdateTitle") : _ctx.translate("TagManager_CreateNewTag")
                }, null, 8, ["disabled", "saving", "value"])) : vue.createCommentVNode("", true),
                vue.createElementVNode("div", _hoisted_39$2, [
                  vue.createElementVNode("a", {
                    onClick: _cache[17] || (_cache[17] = ($event) => _ctx.cancel())
                  }, vue.toDisplayString(_ctx.translate("General_Cancel")), 1)
                ])
              ])
            ], 544), [
              [vue.vShow, !_ctx.chooseTagType && _ctx.editTitle]
            ]),
            vue.withDirectives(vue.createElementVNode("div", _hoisted_40$2, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.availableTags, (tagCategory) => {
                return vue.openBlock(), vue.createElementBlock("ul", {
                  class: "collection with-header",
                  key: tagCategory.name
                }, [
                  vue.createElementVNode("li", _hoisted_41$2, [
                    vue.createElementVNode("h4", null, vue.toDisplayString(tagCategory.name), 1)
                  ]),
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(tagCategory.types, (tagTemplate, index) => {
                    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("li", {
                      key: index,
                      class: vue.normalizeClass(["collection-item avatar", {
                        disabledTemplate: _ctx.isTagTemplateDisabled[tagTemplate.id],
                        [`templateType${tagTemplate.id}`]: true
                      }]),
                      onClick: ($event) => _ctx.createTagType(tagTemplate),
                      title: !_ctx.isTagTemplateDisabled[tagTemplate.id] ? "" : _ctx.collectionItemAvatarText
                    }, [
                      tagTemplate.icon ? (vue.openBlock(), vue.createElementBlock("img", {
                        key: 0,
                        alt: "",
                        class: "circle",
                        src: tagTemplate.icon
                      }, null, 8, _hoisted_43$2)) : vue.createCommentVNode("", true),
                      vue.createElementVNode("span", _hoisted_44$2, vue.toDisplayString(tagTemplate.name), 1),
                      vue.withDirectives(vue.createElementVNode("p", null, vue.toDisplayString(tagTemplate.description), 513), [
                        [vue.vShow, tagTemplate.description]
                      ]),
                      vue.withDirectives(vue.createElementVNode("span", _hoisted_45$1, [
                        vue.createElementVNode("i", {
                          class: "icon-help",
                          title: tagTemplate.help
                        }, null, 8, _hoisted_46$1)
                      ], 512), [
                        [vue.vShow, !!tagTemplate.help]
                      ])
                    ], 10, _hoisted_42$2)), [
                      [vue.vShow, _ctx.isTagVisible(tagTemplate.id)]
                    ]);
                  }), 128))
                ]);
              }), 128)),
              vue.createElementVNode("div", _hoisted_47$1, [
                vue.createElementVNode("a", {
                  onClick: _cache[19] || (_cache[19] = ($event) => _ctx.cancel())
                }, vue.toDisplayString(_ctx.translate("General_Cancel")), 1)
              ])
            ], 512), [
              [vue.vShow, _ctx.chooseTagType]
            ])
          ];
        }),
        _: 1
      }, 8, ["content-title"])
    ], 512);
  }
  const TagEdit = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$i]]);
  const { tagManagerHelper: tagManagerHelper$3 } = window;
  const notificationId$2 = "tagtagmanagementlist";
  const _sfc_main$h = vue.defineComponent({
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
      ContentBlock: CoreHome.ContentBlock,
      Field: CorePluginsAdmin.Field
    },
    directives: {
      ContentTable: CoreHome.ContentTable
    },
    data() {
      return {
        hasWriteAccess: CoreHome.Matomo.hasUserCapability("tagmanager_write"),
        triggerTruncateLength: 40,
        tagSearch: ""
      };
    },
    created() {
      vue.watch(() => TagsStore$1.tags.value, () => {
        this.reloadTriggers();
      });
      this.reloadTriggers();
      TagsStore$1.fetchTags(this.idContainer, this.idContainerVersion);
    },
    methods: {
      reloadTriggers() {
        TriggersStore$1.reload(this.idContainer, this.idContainerVersion);
      },
      createTag() {
        this.editTag(0);
      },
      editTrigger(idTrigger) {
        tagManagerHelper$3.editTrigger(
          this.idContainer,
          this.idContainerVersion,
          idTrigger,
          () => {
            this.reloadTriggers();
          }
        );
      },
      editTag(idTag) {
        CoreHome.MatomoUrl.updateHash(__spreadProps(__spreadValues({}, CoreHome.MatomoUrl.hashParsed.value), {
          idTag
        }));
      },
      pauseTag(tag) {
        const doPause = () => {
          TagsStore$1.pauseTag(this.idContainer, this.idContainerVersion, tag.idtag).then(() => {
            TagsStore$1.reload(this.idContainer, this.idContainerVersion).then(() => {
              setTimeout(() => {
                this.showDeployNotification("pause");
              }, 200);
            });
          });
        };
        CoreHome.Matomo.helper.modalConfirm("#confirmPauseTag", {
          yes: doPause
        });
      },
      resumeTag(tag) {
        const doResume = () => {
          TagsStore$1.resumeTag(this.idContainer, this.idContainerVersion, tag.idtag).then(() => {
            TagsStore$1.reload(this.idContainer, this.idContainerVersion).then(() => {
              setTimeout(() => {
                this.showDeployNotification("resume");
              }, 200);
            });
          });
        };
        CoreHome.Matomo.helper.modalConfirm("#confirmResumeTag", {
          yes: doResume
        });
      },
      deleteTag(tag) {
        const doDelete = () => {
          TagsStore$1.deleteTag(this.idContainer, this.idContainerVersion, tag.idtag).then(() => {
            TagsStore$1.reload(this.idContainer, this.idContainerVersion);
            CoreHome.NotificationsStore.remove("CopyDialogResultNotification");
          });
        };
        CoreHome.Matomo.helper.modalConfirm("#confirmDeleteTag", {
          yes: doDelete
        });
      },
      truncateText(text, length) {
        return tagManagerHelper$3.truncateText(text, length);
      },
      hasPublishCapability() {
        return CoreHome.Matomo.hasUserCapability("tagmanager_write") && CoreHome.Matomo.hasUserCapability("tagmanager_use_custom_templates");
      },
      showDeployNotification(type) {
        const translatedString = type === "pause" ? "TagManager_PausedTag" : "TagManager_ResumedTag";
        const createdX = CoreHome.translate(translatedString, CoreHome.translate("TagManager_Tag"));
        if (this.hasPublishCapability()) {
          const wantToRedeploy = CoreHome.translate(
            "TagManager_WantToDeployThisChangeCreateVersion",
            '<a class="createNewVersionLink">',
            "</a>"
          );
          this.showNotification(`${createdX} ${wantToRedeploy}`, "success", "transient");
          return;
        }
        this.showNotification(createdX, "success");
      },
      showNotification(message, context, type = null) {
        const instanceId = CoreHome.NotificationsStore.show({
          message,
          context,
          id: notificationId$2,
          type: type !== null ? type : "toast"
        });
        setTimeout(() => {
          CoreHome.NotificationsStore.scrollToNotification(instanceId);
        }, 200);
      },
      openCopyDialog(tag) {
        const url = CoreHome.MatomoUrl.stringify({
          module: "TagManager",
          action: "copyTagDialog",
          idSite: tag.idsite,
          idContainer: this.idContainer,
          idTag: tag.idtag,
          idContainerVersion: this.idContainerVersion
        });
        window.Piwik_Popover.createPopupAndLoadUrl(url, "", "mtmCopyTag");
      }
    },
    computed: {
      triggers() {
        const triggers = {};
        TriggersStore$1.triggers.value.forEach((t) => {
          triggers[`${t.idtrigger}`] = t.name;
        });
        return triggers;
      },
      isLoading() {
        return TagsStore$1.isLoading.value;
      },
      isUpdating() {
        return TagsStore$1.isUpdating.value;
      },
      tags() {
        return TagsStore$1.tags.value;
      },
      sortedTags() {
        const searchFilter = this.tagSearch.toLowerCase();
        const result = [...this.tags].filter((h) => Object.keys(h).some((propName) => {
          const entity = h;
          let propValue = "";
          if (typeof entity[propName] === "string") {
            propValue = entity[propName];
          } else if (propName === "typeMetadata") {
            const propTypeMeta = entity.typeMetadata;
            propValue = propTypeMeta.name;
          } else if (propName === "fire_trigger_ids") {
            if (this.triggers && entity.fire_trigger_ids) {
              Object.values(entity.fire_trigger_ids).forEach((value) => {
                if (this.triggers[value]) {
                  propValue += `${this.triggers[value]} `;
                }
              });
            }
          } else if (propName === "parameters" && entity.type === "CustomHtml") {
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
        return this.translate("TagManager_TagsNameDescription");
      },
      descriptionTranslatedText() {
        return this.translate("TagManager_TagsDescriptionDescription");
      },
      typeTranslatedText() {
        return this.translate("TagManager_TagsTypeDescription");
      },
      triggersTranslatedText() {
        return this.translate("TagManager_TagsTriggersDescription");
      },
      lastUpdatedTranslatedText() {
        return this.translate("TagManager_TagsLastUpdatedDescription");
      },
      actionTranslatedText() {
        return this.translate("TagManager_TagsActionDescription");
      },
      getActionClasses() {
        const copyClass = this.hasPublishCapability() ? " hasCopyAction" : "";
        return `action${copyClass}`;
      },
      canUseCustomTemplates() {
        return CoreHome.Matomo.hasUserCapability("tagmanager_use_custom_templates");
      }
    }
  });
  const _hoisted_1$h = { class: "tagManagerManageList tagManagerTagList" };
  const _hoisted_2$f = { class: "tagSearchFilter" };
  const _hoisted_3$f = ["title"];
  const _hoisted_4$b = ["title"];
  const _hoisted_5$a = ["title"];
  const _hoisted_6$9 = ["title"];
  const _hoisted_7$9 = ["title"];
  const _hoisted_8$9 = ["title"];
  const _hoisted_9$8 = { colspan: "6" };
  const _hoisted_10$8 = { class: "loadingPiwik" };
  const _hoisted_11$8 = /* @__PURE__ */ vue.createElementVNode("img", { src: "plugins/Morpheus/images/loading-blue.gif" }, null, -1);
  const _hoisted_12$8 = { colspan: "6" };
  const _hoisted_13$8 = ["id"];
  const _hoisted_14$8 = ["title"];
  const _hoisted_15$8 = ["title"];
  const _hoisted_16$8 = ["title"];
  const _hoisted_17$7 = { class: "triggers" };
  const _hoisted_18$7 = ["onClick", "title"];
  const _hoisted_19$7 = ["title"];
  const _hoisted_20$7 = ["onClick", "title"];
  const _hoisted_21$7 = ["title"];
  const _hoisted_22$7 = ["title"];
  const _hoisted_23$6 = ["onClick", "title"];
  const _hoisted_24$6 = ["onClick", "title"];
  const _hoisted_25$6 = ["onClick", "title"];
  const _hoisted_26$4 = ["onClick", "title"];
  const _hoisted_27$3 = ["onClick", "title"];
  const _hoisted_28$3 = { class: "tableActionBar" };
  const _hoisted_29$3 = /* @__PURE__ */ vue.createElementVNode("span", { class: "icon-add" }, " ", -1);
  const _hoisted_30$3 = {
    class: "ui-confirm",
    id: "confirmDeleteTag",
    ref: "confirmDeleteTag"
  };
  const _hoisted_31$3 = ["value"];
  const _hoisted_32$3 = ["value"];
  const _hoisted_33$3 = {
    class: "ui-confirm",
    id: "confirmPauseTag",
    ref: "confirmPauseTag"
  };
  const _hoisted_34$3 = ["value"];
  const _hoisted_35$3 = ["value"];
  const _hoisted_36$3 = {
    class: "ui-confirm",
    id: "confirmResumeTag",
    ref: "confirmResumeTag"
  };
  const _hoisted_37$3 = ["value"];
  const _hoisted_38$2 = ["value"];
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Field = vue.resolveComponent("Field");
    const _component_ContentBlock = vue.resolveComponent("ContentBlock");
    const _directive_content_table = vue.resolveDirective("content-table");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$h, [
      vue.createVNode(_component_ContentBlock, {
        feature: "Tag Manager",
        "content-title": _ctx.translate("TagManager_ManageX", _ctx.translate("TagManager_Tags")),
        "help-text": _ctx.tagsHelpText
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("p", null, vue.toDisplayString(_ctx.translate("TagManager_TagUsageBenefits")), 1),
          vue.createElementVNode("div", _hoisted_2$f, [
            vue.withDirectives(vue.createVNode(_component_Field, {
              uicontrol: "text",
              name: "tagSearch",
              title: _ctx.translate("General_Search"),
              modelValue: _ctx.tagSearch,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.tagSearch = $event)
            }, null, 8, ["title", "modelValue"]), [
              [vue.vShow, _ctx.tags.length > 0]
            ])
          ]),
          vue.withDirectives((vue.openBlock(), vue.createElementBlock("table", null, [
            vue.createElementVNode("thead", null, [
              vue.createElementVNode("tr", null, [
                vue.createElementVNode("th", {
                  class: "name",
                  title: _ctx.nameTranslatedText
                }, vue.toDisplayString(_ctx.translate("General_Name")), 9, _hoisted_3$f),
                vue.createElementVNode("th", {
                  class: "description",
                  title: _ctx.descriptionTranslatedText
                }, vue.toDisplayString(_ctx.translate("General_Description")), 9, _hoisted_4$b),
                vue.createElementVNode("th", {
                  class: "type",
                  title: _ctx.typeTranslatedText
                }, vue.toDisplayString(_ctx.translate("TagManager_Type")), 9, _hoisted_5$a),
                vue.createElementVNode("th", {
                  class: "triggers",
                  title: _ctx.triggersTranslatedText
                }, vue.toDisplayString(_ctx.translate("TagManager_Triggers")), 9, _hoisted_6$9),
                vue.createElementVNode("th", {
                  class: "lastUpdated",
                  title: _ctx.lastUpdatedTranslatedText
                }, vue.toDisplayString(_ctx.translate("TagManager_LastUpdated")), 9, _hoisted_7$9),
                vue.withDirectives(vue.createElementVNode("th", {
                  class: "action",
                  title: _ctx.actionTranslatedText
                }, vue.toDisplayString(_ctx.translate("General_Actions")), 9, _hoisted_8$9), [
                  [vue.vShow, _ctx.hasWriteAccess]
                ])
              ])
            ]),
            vue.createElementVNode("tbody", null, [
              vue.withDirectives(vue.createElementVNode("tr", null, [
                vue.createElementVNode("td", _hoisted_9$8, [
                  vue.createElementVNode("span", _hoisted_10$8, [
                    _hoisted_11$8,
                    vue.createTextVNode(" " + vue.toDisplayString(_ctx.translate("General_LoadingData")), 1)
                  ])
                ])
              ], 512), [
                [vue.vShow, _ctx.isLoading || _ctx.isUpdating]
              ]),
              vue.withDirectives(vue.createElementVNode("tr", null, [
                vue.createElementVNode("td", _hoisted_12$8, [
                  vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_NoTagsFound")) + " ", 1),
                  vue.withDirectives(vue.createElementVNode("a", {
                    class: "createContainerTagNow",
                    onClick: _cache[1] || (_cache[1] = ($event) => _ctx.createTag())
                  }, vue.toDisplayString(_ctx.translate("TagManager_CreateNewTagNow")), 513), [
                    [vue.vShow, _ctx.hasWriteAccess]
                  ])
                ])
              ], 512), [
                [vue.vShow, !_ctx.isLoading && _ctx.tags.length === 0]
              ]),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.sortedTags, (tag) => {
                var _a2, _b2, _c;
                return vue.openBlock(), vue.createElementBlock("tr", {
                  class: "tags",
                  key: tag.idtag,
                  id: `tag${tag.idtag}`
                }, [
                  vue.createElementVNode("td", {
                    class: "name",
                    title: tag.name
                  }, vue.toDisplayString(_ctx.truncateText(tag.name, 50)), 9, _hoisted_14$8),
                  vue.createElementVNode("td", {
                    class: "description",
                    title: tag.description
                  }, vue.toDisplayString(_ctx.truncateText(tag.description, 75)), 9, _hoisted_15$8),
                  vue.createElementVNode("td", {
                    class: "type",
                    title: tag.typeMetadata.description
                  }, vue.toDisplayString(tag.typeMetadata.name), 9, _hoisted_16$8),
                  vue.createElementVNode("td", _hoisted_17$7, [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(tag.fire_trigger_ids, (fireTriggerId, fireTriggerIndex) => {
                      return vue.openBlock(), vue.createElementBlock("span", {
                        key: fireTriggerIndex,
                        style: { "margin-right": "3.5px" }
                      }, [
                        _ctx.hasWriteAccess ? (vue.openBlock(), vue.createElementBlock("a", {
                          key: 0,
                          style: { "display": "inline-block", "vertical-align": "top !important" },
                          class: "chip",
                          href: "",
                          onClick: vue.withModifiers(($event) => _ctx.editTrigger(fireTriggerId), ["prevent"]),
                          title: this.triggers[fireTriggerId]
                        }, vue.toDisplayString(_ctx.truncateText(this.triggers[fireTriggerId], _ctx.triggerTruncateLength)), 9, _hoisted_18$7)) : vue.createCommentVNode("", true),
                        !_ctx.hasWriteAccess ? (vue.openBlock(), vue.createElementBlock("span", {
                          key: 1,
                          class: "chip",
                          title: this.triggers[fireTriggerId]
                        }, vue.toDisplayString(_ctx.truncateText(this.triggers[fireTriggerId], _ctx.triggerTruncateLength)), 9, _hoisted_19$7)) : vue.createCommentVNode("", true)
                      ]);
                    }), 128)),
                    vue.withDirectives(vue.createElementVNode("span", null, [
                      vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_Except")) + ": ", 1),
                      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(tag.block_trigger_ids, (blockTriggerId, index) => {
                        return vue.openBlock(), vue.createElementBlock("span", {
                          key: index,
                          style: { "margin-right": "3.5px" }
                        }, [
                          vue.withDirectives(vue.createElementVNode("a", {
                            class: "chip",
                            href: "",
                            onClick: vue.withModifiers(($event) => _ctx.editTrigger(blockTriggerId), ["prevent"]),
                            title: this.triggers[blockTriggerId]
                          }, vue.toDisplayString(_ctx.truncateText(this.triggers[blockTriggerId], _ctx.triggerTruncateLength)), 9, _hoisted_20$7), [
                            [vue.vShow, _ctx.hasWriteAccess]
                          ]),
                          vue.withDirectives(vue.createElementVNode("span", {
                            class: "chip",
                            title: this.triggers[blockTriggerId]
                          }, vue.toDisplayString(_ctx.truncateText(this.triggers[blockTriggerId], _ctx.triggerTruncateLength)), 9, _hoisted_21$7), [
                            [vue.vShow, !_ctx.hasWriteAccess]
                          ])
                        ]);
                      }), 128))
                    ], 512), [
                      [vue.vShow, tag.block_trigger_ids.length]
                    ])
                  ]),
                  vue.createElementVNode("td", {
                    class: "lastUpdated",
                    title: _ctx.translate("TagManager_CreatedOnX", tag.created_date_pretty)
                  }, [
                    vue.createElementVNode("span", null, vue.toDisplayString(tag.updated_date_pretty), 1)
                  ], 8, _hoisted_22$7),
                  vue.withDirectives(vue.createElementVNode("td", {
                    class: vue.normalizeClass(_ctx.getActionClasses)
                  }, [
                    vue.withDirectives(vue.createElementVNode("a", {
                      class: "table-action icon-pause",
                      onClick: ($event) => _ctx.pauseTag(tag),
                      title: _ctx.translate("TagManager_PauseX", _ctx.translate("TagManager_Tag"))
                    }, null, 8, _hoisted_23$6), [
                      [vue.vShow, tag.status === "active" && (!((_a2 = tag.typeMetadata) == null ? void 0 : _a2.isCustomTemplate) || _ctx.canUseCustomTemplates)]
                    ]),
                    vue.withDirectives(vue.createElementVNode("a", {
                      class: "table-action icon-play",
                      onClick: ($event) => _ctx.resumeTag(tag),
                      title: _ctx.translate("TagManager_ResumeX", _ctx.translate("TagManager_Tag"))
                    }, null, 8, _hoisted_24$6), [
                      [vue.vShow, tag.status === "paused" && (!((_b2 = tag.typeMetadata) == null ? void 0 : _b2.isCustomTemplate) || _ctx.canUseCustomTemplates)]
                    ]),
                    vue.createElementVNode("a", {
                      class: "table-action icon-edit",
                      onClick: ($event) => _ctx.editTag(tag.idtag, tag.type),
                      title: _ctx.translate("TagManager_EditTag")
                    }, null, 8, _hoisted_25$6),
                    vue.withDirectives(vue.createElementVNode("a", {
                      class: "table-action icon-content-copy",
                      onClick: ($event) => _ctx.openCopyDialog(tag),
                      title: _ctx.translate(
                        "TagManager_CopyX",
                        _ctx.translate("TagManager_Tag")
                      )
                    }, null, 8, _hoisted_26$4), [
                      [vue.vShow, _ctx.hasPublishCapability()]
                    ]),
                    vue.withDirectives(vue.createElementVNode("a", {
                      class: "table-action icon-delete",
                      onClick: ($event) => _ctx.deleteTag(tag),
                      title: _ctx.translate("TagManager_DeleteX", _ctx.translate("TagManager_Tag"))
                    }, null, 8, _hoisted_27$3), [
                      [vue.vShow, !((_c = tag.typeMetadata) == null ? void 0 : _c.isCustomTemplate) || _ctx.canUseCustomTemplates]
                    ])
                  ], 2), [
                    [vue.vShow, _ctx.hasWriteAccess]
                  ])
                ], 8, _hoisted_13$8);
              }), 128))
            ])
          ])), [
            [_directive_content_table]
          ]),
          vue.withDirectives(vue.createElementVNode("div", _hoisted_28$3, [
            vue.createElementVNode("a", {
              class: "createNewTag",
              value: "",
              onClick: _cache[2] || (_cache[2] = ($event) => _ctx.createTag())
            }, [
              _hoisted_29$3,
              vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_CreateNewTag")), 1)
            ])
          ], 512), [
            [vue.vShow, _ctx.hasWriteAccess]
          ])
        ]),
        _: 1
      }, 8, ["content-title", "help-text"]),
      vue.createElementVNode("div", _hoisted_30$3, [
        vue.createElementVNode("h2", null, vue.toDisplayString(_ctx.translate("TagManager_DeleteTagConfirm")), 1),
        vue.createElementVNode("input", {
          role: "yes",
          type: "button",
          value: _ctx.translate("General_Yes")
        }, null, 8, _hoisted_31$3),
        vue.createElementVNode("input", {
          role: "no",
          type: "button",
          value: _ctx.translate("General_No")
        }, null, 8, _hoisted_32$3)
      ], 512),
      vue.createElementVNode("div", _hoisted_33$3, [
        vue.createElementVNode("h2", null, vue.toDisplayString(_ctx.translate("TagManager_PauseTagConfirm")), 1),
        vue.createElementVNode("input", {
          role: "yes",
          type: "button",
          value: _ctx.translate("General_Yes")
        }, null, 8, _hoisted_34$3),
        vue.createElementVNode("input", {
          role: "no",
          type: "button",
          value: _ctx.translate("General_No")
        }, null, 8, _hoisted_35$3)
      ], 512),
      vue.createElementVNode("div", _hoisted_36$3, [
        vue.createElementVNode("h2", null, vue.toDisplayString(_ctx.translate("TagManager_ResumeTagConfirm")), 1),
        vue.createElementVNode("input", {
          role: "yes",
          type: "button",
          value: _ctx.translate("General_Yes")
        }, null, 8, _hoisted_37$3),
        vue.createElementVNode("input", {
          role: "no",
          type: "button",
          value: _ctx.translate("General_No")
        }, null, 8, _hoisted_38$2)
      ], 512)
    ]);
  }
  const TagList = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h]]);
  const _sfc_main$g = vue.defineComponent({
    props: {
      idContainerVersion: Number,
      idContainer: String,
      tagsHelpText: String
    },
    components: {
      TagList,
      TagEdit
    },
    data() {
      return {
        isAddAllowed: false
      };
    },
    created() {
      vue.watch(() => CoreHome.MatomoUrl.hashParsed.value.idTag, (idTag) => {
        this.onIdTagParamChange(idTag);
      });
      CoreHome.NotificationsStore.remove("tagtagmanagement");
      this.onIdTagParamChange(CoreHome.MatomoUrl.hashParsed.value.idTag);
    },
    methods: {
      onIdTagParamChange(idTag) {
        if (idTag === "0") {
          const parameters = { isAllowed: true };
          CoreHome.Matomo.postEvent("TagManager.initAddTag", parameters);
          this.isAddAllowed = !!parameters.isAllowed;
        }
      }
    },
    computed: {
      idTag() {
        const idTag = CoreHome.MatomoUrl.hashParsed.value.idTag;
        if (!this.isAddAllowed && idTag === "0") {
          return null;
        }
        return idTag ? parseInt(idTag, 10) : idTag;
      },
      editMode() {
        return typeof this.idTag === "number";
      }
    }
  });
  const _hoisted_1$g = { class: "manageTag" };
  const _hoisted_2$e = { key: 0 };
  const _hoisted_3$e = { key: 1 };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_TagList = vue.resolveComponent("TagList");
    const _component_TagEdit = vue.resolveComponent("TagEdit");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$g, [
      !_ctx.editMode ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$e, [
        vue.createVNode(_component_TagList, {
          "id-container": _ctx.idContainer,
          "id-container-version": _ctx.idContainerVersion,
          "tags-help-text": _ctx.tagsHelpText
        }, null, 8, ["id-container", "id-container-version", "tags-help-text"])
      ])) : vue.createCommentVNode("", true),
      _ctx.editMode ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$e, [
        vue.createVNode(_component_TagEdit, {
          "id-container": _ctx.idContainer,
          "id-container-version": _ctx.idContainerVersion,
          "id-tag": _ctx.idTag
        }, null, 8, ["id-container", "id-container-version", "id-tag"])
      ])) : vue.createCommentVNode("", true)
    ]);
  }
  const TagManage = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g]]);
  /*!
   * Matomo - free/libre analytics platform
   *
   * @link https://matomo.org
   * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
   */
  class AvailableEnvironmentStore {
    constructor() {
      __publicField(this, "privateState", vue.reactive({
        environmentsWithPublish: [],
        isLoading: false
      }));
      __publicField(this, "state", vue.computed(() => vue.readonly(this.privateState)));
      __publicField(this, "isLoading", vue.computed(() => this.state.value.isLoading));
      __publicField(this, "environmentsWithPublish", vue.computed(() => this.state.value.environmentsWithPublish));
      __publicField(this, "environmentsWithPublishOptions", vue.computed(
        () => this.environmentsWithPublish.value.map(
          // eslint-disable-next-line
          ({ id, name, disabled }) => ({ key: id, value: name, disabled: false })
        )
      ));
      __publicField(this, "initializePromise", null);
    }
    init() {
      if (!this.initializePromise) {
        this.initializePromise = this.fetchEnvironments();
      }
      return this.initializePromise;
    }
    fetchEnvironments() {
      this.privateState.isLoading = true;
      return CoreHome.AjaxHelper.fetch({
        method: "TagManager.getAvailableEnvironmentsWithPublishCapability",
        filter_limit: "-1"
      }).then((environmentsWithPublish) => {
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
  const AvailableEnvironmentsStore = new AvailableEnvironmentStore();
  /**
   * Matomo - free/libre analytics platform
   *
   * @link https://matomo.org
   * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
   */
  function diffDraftVersion(idContainer, idContainerVersionNew, idContainerVersionPrevious) {
    function findEntryInArray(array, name) {
      return array.find((v) => v.name === name);
    }
    function getDifference(entityType, array1, array2, keysToCheck) {
      const diff = [];
      array1.forEach((array1Item) => {
        const matchingEntry = findEntryInArray(array2, array1Item.name);
        if (matchingEntry) {
          keysToCheck.some((key) => {
            if (JSON.stringify(array1Item[key]) !== JSON.stringify(matchingEntry[key])) {
              diff.push({
                entityType,
                type: key === "status" && array1Item[key] === "paused" ? "TagManager_DiffPaused" : "TagManager_DiffModified",
                name: array1Item.name,
                lastChanged: array1Item.updated_date_pretty
              });
              return true;
            }
            return false;
          });
          return;
        }
        if (array1Item.status === "paused") {
          diff.push({
            entityType,
            type: "TagManager_DiffAddedPaused",
            name: array1Item.name,
            lastChanged: array1Item.updated_date_pretty
          });
        } else {
          diff.push({
            entityType,
            type: "TagManager_DiffAdded",
            name: array1Item.name,
            lastChanged: array1Item.updated_date_pretty
          });
        }
      });
      array2.forEach((array2Item) => {
        if (!findEntryInArray(array1, array2Item.name)) {
          diff.push({
            entityType,
            type: "TagManager_DiffDeleted",
            name: array2Item.name,
            lastChanged: array2Item.updated_date_pretty
          });
        }
      });
      return diff;
    }
    function mixinTagTriggers(tags, triggers) {
      tags.forEach((tag) => {
        tag.fire_triggers = [];
        tag.block_triggers = [];
        tag.fire_trigger_ids.forEach((idtrigger) => {
          const trigger = triggers.find((t) => t.idtrigger === idtrigger);
          if (trigger) {
            tag.fire_triggers.push(trigger.name);
          }
        });
        tag.block_trigger_ids.forEach((idtrigger) => {
          const trigger = triggers.find((t) => t.idtrigger === idtrigger);
          if (trigger) {
            tag.block_triggers.push(trigger.name);
          }
        });
      });
    }
    const draftVersion = {
      module: "API",
      method: "TagManager.exportContainerVersion",
      format: "json",
      idContainer,
      filter_limit: -1
    };
    if (idContainerVersionNew) {
      draftVersion.idContainerVersion = idContainerVersionNew;
    }
    const lastVersion = {
      module: "API",
      method: "TagManager.exportContainerVersion",
      format: "json",
      idContainer,
      idContainerVersion: idContainerVersionPrevious,
      filter_limit: -1
    };
    return CoreHome.AjaxHelper.fetch(
      [draftVersion, lastVersion]
    ).then(([draft, last]) => {
      mixinTagTriggers(draft.tags, draft.triggers);
      mixinTagTriggers(last.tags, last.triggers);
      const diff1 = getDifference(
        "TagManager_Tag",
        draft.tags,
        last.tags,
        [
          "name",
          "type",
          "fire_limit",
          "priority",
          "fire_delay",
          "fire_triggers",
          "block_triggers",
          "parameters",
          "status"
        ]
      );
      const diff2 = getDifference(
        "TagManager_Trigger",
        draft.triggers,
        last.triggers,
        ["name", "type", "conditions", "parameters"]
      );
      const diff3 = getDifference(
        "TagManager_Variable",
        draft.variables,
        last.variables,
        ["name", "type", "lookup_table", "default_value", "parameters"]
      );
      return [
        ...diff1,
        ...diff2,
        ...diff3
      ];
    });
  }
  /*!
   * Matomo - free/libre analytics platform
   *
   * @link https://matomo.org
   * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
   */
  class VersionsStore {
    constructor() {
      __publicField(this, "privateState", vue.reactive({
        versions: [],
        isLoadingVersions: false,
        isLoadingSingle: false,
        isUpdating: false
      }));
      __publicField(this, "state", vue.computed(() => vue.readonly(this.privateState)));
      __publicField(this, "isLoading", vue.computed(() => {
        const state = this.state.value;
        return state.isLoadingVersions || state.isLoadingSingle;
      }));
      __publicField(this, "isUpdating", vue.computed(() => this.state.value.isUpdating));
      __publicField(this, "versions", vue.computed(() => this.state.value.versions));
      __publicField(this, "fetchPromise", null);
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
        this.fetchPromise = CoreHome.AjaxHelper.fetch({
          method: "TagManager.getContainerVersions",
          idContainer,
          filter_limit: "-1"
        });
      }
      return Promise.resolve(this.fetchPromise).then((versions) => {
        this.privateState.versions = versions;
        this.privateState.isLoadingVersions = false;
        return this.versions.value;
      }).finally(() => {
        this.privateState.isLoadingVersions = false;
      });
    }
    findVersion(idContainer, idContainerVersion) {
      const found = this.versions.value.find((v) => v.idcontainerversion === idContainerVersion);
      if (found) {
        return Promise.resolve(found);
      }
      this.privateState.isLoadingSingle = true;
      return CoreHome.AjaxHelper.fetch({
        idContainerVersion,
        idContainer,
        method: "TagManager.getContainerVersion",
        filter_limit: "-1"
      }).then((record) => {
        this.privateState.versions = [...this.privateState.versions, record];
        return vue.readonly(record);
      }).finally(() => {
        this.privateState.isLoadingSingle = false;
      });
    }
    deleteVersion(idContainer, idContainerVersion) {
      this.privateState.isUpdating = true;
      this.privateState.versions = [];
      return CoreHome.AjaxHelper.fetch(
        {
          idContainerVersion,
          idContainer,
          method: "TagManager.deleteContainerVersion"
        },
        { withTokenInUrl: true }
      ).finally(() => {
        this.privateState.isUpdating = false;
      });
    }
    publishVersion(idContainer, idContainerVersion, environment) {
      this.privateState.isUpdating = true;
      return CoreHome.AjaxHelper.fetch({
        idContainer,
        idContainerVersion,
        environment,
        method: "TagManager.publishContainerVersion"
      }).finally(() => {
        this.privateState.isUpdating = false;
      });
    }
    createOrUpdateVersion(version, method, idContainer) {
      this.privateState.isUpdating = true;
      return CoreHome.AjaxHelper.post(
        {
          method,
          idContainer,
          idContainerVersion: version.idcontainerversion
        },
        {
          name: version.name,
          description: version.description
        },
        { withTokenInUrl: true }
      ).finally(() => {
        this.privateState.isUpdating = false;
      });
    }
  }
  const VersionsStore$1 = new VersionsStore();
  const _sfc_main$f = vue.defineComponent({
    props: {
      lastVersion: String
    }
  });
  const _hoisted_1$f = {
    id: "versionNameHelpText",
    class: "inline-help-node"
  };
  const _hoisted_2$d = /* @__PURE__ */ vue.createElementVNode("br", null, null, -1);
  const _hoisted_3$d = /* @__PURE__ */ vue.createElementVNode("br", null, null, -1);
  const _hoisted_4$a = ["innerHTML"];
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$f, [
      vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_VersionNameHelpText")) + " ", 1),
      _hoisted_2$d,
      _hoisted_3$d,
      vue.withDirectives(vue.createElementVNode("span", {
        innerHTML: _ctx.$sanitize(_ctx.translate(
          "TagManager_NameOfLatestVersion",
          `<strong>${_ctx.lastVersion}</strong>`
        ))
      }, null, 8, _hoisted_4$a), [
        [vue.vShow, _ctx.lastVersion]
      ])
    ]);
  }
  const VersionNameHelpText = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f]]);
  const _sfc_main$e = vue.defineComponent({
    props: {
      canPublishToLive: Boolean
    }
  });
  const _hoisted_1$e = {
    id: "selectTagManagerEnvironmentHelp",
    class: "inline-help-node"
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$e, [
      vue.createElementVNode("div", null, vue.toDisplayString(_ctx.translate("TagManager_VersionEnvironmentHelp")), 1),
      vue.withDirectives(vue.createElementVNode("div", {
        class: "alert alert-info",
        style: { "margin-bottom": "0", "padding-bottom": "0" }
      }, vue.toDisplayString(_ctx.translate(
        "TagManager_PublishLiveEnvironmentCapabilityRequired",
        _ctx.translate("TagManager_CapabilityPublishLiveContainer")
      )), 513), [
        [vue.vShow, !_ctx.canPublishToLive]
      ])
    ]);
  }
  const SelectTagManagerEnvironmentHelpText = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e]]);
  const notificationId$1 = "versiontagmanagement";
  const _sfc_main$d = vue.defineComponent({
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
      ContentBlock: CoreHome.ContentBlock,
      Field: CorePluginsAdmin.Field,
      SaveButton: CorePluginsAdmin.SaveButton,
      ActivityIndicator: CoreHome.ActivityIndicator
    },
    directives: {
      ContentTable: CoreHome.ContentTable
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
    emits: ["changeVersion"],
    created() {
      AvailableComparisonsStore$1.init();
      AvailableEnvironmentsStore.init();
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
        CoreHome.NotificationsStore.remove(notificationId$1);
        CoreHome.NotificationsStore.remove("ajaxHelper");
      },
      showNotification(message, context, type = null) {
        const notificationInstanceId = CoreHome.NotificationsStore.show({
          message,
          context,
          id: notificationId$1,
          type: type !== null ? type : "toast"
        });
        setTimeout(() => {
          CoreHome.NotificationsStore.scrollToNotification(notificationInstanceId);
        }, 200);
      },
      showErrorFieldNotProvidedNotification(title) {
        const message = CoreHome.translate("TagManager_ErrorXNotProvided", [title]);
        this.showNotification(message, "error");
      },
      initIdContainerVersion() {
        this.version = {};
        this.lastVersion = null;
        this.versionChanges = [];
        this.isLoadingVersionChanges = true;
        VersionsStore$1.fetchVersions(this.idContainer).then(() => {
          var _a2;
          this.isLoadingVersionChanges = false;
          this.lastVersion = null;
          const versions = [...VersionsStore$1.versions.value];
          if (!(versions == null ? void 0 : versions.length)) {
            return;
          }
          versions.sort((a, b) => a.revision < b.revision ? 1 : 0);
          let lastContainerVersion = null;
          if (this.create && ((_a2 = versions[0]) == null ? void 0 : _a2.name)) {
            this.lastVersion = CoreHome.Matomo.helper.htmlEntities(versions[0].name);
            lastContainerVersion = versions[0].idcontainerversion;
          } else if (this.edit) {
            versions.forEach((v, i) => {
              if (i >= versions.length - 1) {
                return;
              }
              if (v.idcontainerversion === this.idContainerVersion && versions[i + 1]) {
                this.lastVersion = CoreHome.Matomo.helper.htmlEntities(versions[i + 1].name);
                lastContainerVersion = versions[i + 1].idcontainerversion;
              }
            });
          }
          if (this.lastVersion) {
            this.isLoadingVersionChanges = true;
            diffDraftVersion(
              this.idContainer,
              this.idContainerVersion,
              lastContainerVersion
            ).then((diff) => {
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
        CoreHome.Matomo.helper.lazyScrollToContent();
        if (this.edit && this.idContainerVersion) {
          VersionsStore$1.findVersion(this.idContainer, this.idContainerVersion).then((version) => {
            if (!version) {
              return;
            }
            this.version = CoreHome.clone(version);
            this.isDirty = false;
          });
          return;
        }
        if (this.create) {
          this.version = {
            idSite: CoreHome.Matomo.idSite,
            idcontainer: this.idContainer,
            name: "",
            description: ""
          };
          if (this.canPublishToLive) {
            this.version.environments = ["live"];
          } else {
            const notLive = this.environments.find((obj) => obj.key !== "live");
            this.version.environments = notLive ? [notLive.key] : [];
          }
          this.isDirty = false;
        }
      },
      cancel() {
        const newParams = __spreadValues({}, CoreHome.MatomoUrl.hashParsed.value);
        delete newParams.idContainerVersion;
        CoreHome.MatomoUrl.updateHash(newParams);
      },
      createVersion() {
        this.removeAnyVersionNotification();
        if (!this.checkRequiredFieldsAreSet()) {
          return;
        }
        this.isUpdatingVersion = true;
        VersionsStore$1.createOrUpdateVersion(
          this.version,
          "TagManager.createContainerVersion",
          this.idContainer
        ).then((response) => {
          if (!response) {
            return;
          }
          this.isDirty = false;
          const idContainerVersion = response.value;
          if (this.isEmbedded) {
            this.version.idcontainerversion = idContainerVersion;
            this.$emit("changeVersion", {
              version: this.version
            });
          }
          VersionsStore$1.reload(this.idContainer).then(() => {
            if (this.isEmbedded) {
              CoreHome.MatomoUrl.updateHash(__spreadValues({}, CoreHome.MatomoUrl.hashParsed.value));
            } else {
              CoreHome.MatomoUrl.updateHash(__spreadProps(__spreadValues({}, CoreHome.MatomoUrl.hashParsed.value), {
                idContainerVersion
              }));
            }
            setTimeout(() => {
              const createdX = CoreHome.translate("TagManager_CreatedX", CoreHome.translate("TagManager_Version"));
              if (this.hasPublishCapability()) {
                const wantToRedeploy = CoreHome.translate(
                  "TagManager_WantToDeployThisChangeCreateVersion",
                  '<a class="createNewVersionLink">',
                  "</a>"
                );
                this.showNotification(`${createdX} ${wantToRedeploy}`, "success", "transient");
                return;
              }
              this.showNotification(createdX, "success");
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
        VersionsStore$1.createOrUpdateVersion(
          this.version,
          "TagManager.createContainerVersion",
          this.idContainer
        ).then((response) => {
          if (!response) {
            return null;
          }
          const idContainerVersion = response.value;
          this.version.idcontainerversion = idContainerVersion;
          return VersionsStore$1.publishVersion(
            this.idContainer,
            idContainerVersion,
            this.version.environments[0]
          ).then(() => {
            this.isDirty = false;
            if (this.isEmbedded) {
              this.$emit("changeVersion", {
                version: this.version
              });
            }
            VersionsStore$1.reload(this.idContainer).then(() => {
              if (this.isEmbedded) {
                CoreHome.MatomoUrl.updateHash(__spreadValues({}, CoreHome.MatomoUrl.hashParsed.value));
              } else {
                CoreHome.MatomoUrl.updateHash(__spreadProps(__spreadValues({}, CoreHome.MatomoUrl.hashParsed.value), {
                  idContainerVersion
                }));
              }
              setTimeout(() => {
                this.showNotification(CoreHome.translate("TagManager_VersionPublishSuccess"), "success");
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
        VersionsStore$1.createOrUpdateVersion(
          this.version,
          "TagManager.updateContainerVersion",
          this.idContainer
        ).then((response) => {
          if (!response) {
            return;
          }
          if (this.isEmbedded) {
            this.$emit("changeVersion", {
              version: this.version
            });
            return;
          }
          this.isDirty = false;
          this.version = {};
          VersionsStore$1.reload(this.idContainer).then(() => {
            this.initIdContainerVersion();
          });
          this.showNotification(CoreHome.translate("TagManager_UpdatedX", CoreHome.translate("TagManager_Version")), "success");
        }).finally(() => {
          this.isUpdatingVersion = false;
        });
      },
      checkRequiredFieldsAreSet() {
        if (!this.version.name) {
          const title = CoreHome.translate("General_Name");
          this.showErrorFieldNotProvidedNotification(title);
          return false;
        }
        return true;
      },
      hasPublishCapability() {
        return this.hasWriteCapability() && CoreHome.Matomo.hasUserCapability("tagmanager_use_custom_templates");
      },
      hasWriteCapability() {
        return CoreHome.Matomo.hasUserCapability("tagmanager_write");
      },
      hasPublishToLiveCapability() {
        return CoreHome.Matomo.hasUserCapability("tagmanager_publish_live_container");
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
        return VariablesStore$1.isLoading.value || AvailableComparisonsStore$1.isLoading.value;
      },
      isUpdating() {
        return VariablesStore$1.isUpdating.value || this.isUpdatingVersion;
      },
      environments() {
        const environments = AvailableEnvironmentsStore.environmentsWithPublishOptions.value;
        if (!this.canPublishToLive) {
          const liveIndex = environments.findIndex((obj) => obj.key === "live");
          if (liveIndex > -1) {
            environments[liveIndex].disabled = true;
          }
        }
        return environments;
      },
      canPublishToLive() {
        return CoreHome.Matomo.hasUserCapability("tagmanager_publish_live_container");
      },
      versionNameHelpText() {
        return vue.markRaw(VersionNameHelpText);
      },
      selectTagManagerEnvironmentHelp() {
        return vue.markRaw(SelectTagManagerEnvironmentHelpText);
      },
      editTitle() {
        return this.create ? CoreHome.translate("TagManager_CreateNewVersion") : CoreHome.translate("TagManager_EditVersion");
      },
      showNoAccessErrorMessage() {
        return CoreHome.translate(
          "TagManager_VersionEditWithNoAccessMessage",
          CoreHome.externalLink("https://matomo.org/faq/tag-manager/faq_26547/"),
          "</a>"
        );
      }
    }
  });
  const _hoisted_1$d = { class: "editVersion tagManagerManageEdit" };
  const _hoisted_2$c = { class: "loadingPiwik" };
  const _hoisted_3$c = /* @__PURE__ */ vue.createElementVNode("img", { src: "plugins/Morpheus/images/loading-blue.gif" }, null, -1);
  const _hoisted_4$9 = { class: "loadingPiwik" };
  const _hoisted_5$9 = /* @__PURE__ */ vue.createElementVNode("img", { src: "plugins/Morpheus/images/loading-blue.gif" }, null, -1);
  const _hoisted_6$8 = { key: 0 };
  const _hoisted_7$8 = { key: 0 };
  const _hoisted_8$8 = { key: 1 };
  const _hoisted_9$7 = ["innerHTML"];
  const _hoisted_10$7 = {
    key: 2,
    class: "versionChanges"
  };
  const _hoisted_11$7 = { key: 0 };
  const _hoisted_12$7 = { colspan: "4" };
  const _hoisted_13$7 = { key: 1 };
  const _hoisted_14$7 = { colspan: "4" };
  const _hoisted_15$7 = { class: "lastUpdated" };
  const _hoisted_16$7 = { class: "entityCancel" };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Field = vue.resolveComponent("Field");
    const _component_SaveButton = vue.resolveComponent("SaveButton");
    const _component_ActivityIndicator = vue.resolveComponent("ActivityIndicator");
    const _component_ContentBlock = vue.resolveComponent("ContentBlock");
    const _directive_content_table = vue.resolveDirective("content-table");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$d, [
      vue.createVNode(_component_ContentBlock, {
        feature: "Tag Manager",
        "content-title": _ctx.editTitle
      }, {
        default: vue.withCtx(() => {
          var _a2;
          return [
            vue.withDirectives(vue.createElementVNode("p", null, [
              vue.createElementVNode("span", _hoisted_2$c, [
                _hoisted_3$c,
                vue.createTextVNode(" " + vue.toDisplayString(_ctx.translate("General_LoadingData")), 1)
              ])
            ], 512), [
              [vue.vShow, _ctx.isLoading]
            ]),
            vue.withDirectives(vue.createElementVNode("p", null, [
              vue.createElementVNode("span", _hoisted_4$9, [
                _hoisted_5$9,
                vue.createTextVNode(" " + vue.toDisplayString(_ctx.translate("TagManager_UpdatingData")), 1)
              ])
            ], 512), [
              [vue.vShow, _ctx.isUpdating]
            ]),
            vue.createElementVNode("form", {
              onSubmit: _cache[6] || (_cache[6] = ($event) => _ctx.edit ? _ctx.updateVersion() : _ctx.createVersion())
            }, [
              vue.createElementVNode("div", null, [
                _ctx.hasPublishCapability() || _ctx.hasWriteCapability() && _ctx.hasPublishToLiveCapability() ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_6$8, [
                  vue.createElementVNode("div", null, [
                    vue.createVNode(_component_Field, {
                      uicontrol: "text",
                      name: "name",
                      "inline-help": _ctx.versionNameHelpText,
                      "inline-help-bind": { lastVersion: _ctx.lastVersion },
                      "model-value": _ctx.version.name,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => {
                        _ctx.version.name = $event;
                        _ctx.setValueHasChanged();
                      }),
                      maxlength: 50,
                      title: _ctx.translate("TagManager_VersionName"),
                      placeholder: _ctx.translate("TagManager_VersionNamePlaceholderV2")
                    }, null, 8, ["inline-help", "inline-help-bind", "model-value", "title", "placeholder"])
                  ]),
                  vue.createElementVNode("div", null, [
                    vue.createVNode(_component_Field, {
                      uicontrol: "textarea",
                      name: "description",
                      "model-value": _ctx.version.description,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => {
                        _ctx.version.description = $event;
                        _ctx.setValueHasChanged();
                      }),
                      title: _ctx.translate("TagManager_VersionDescriptionOptional"),
                      "inline-help": _ctx.translate("TagManager_VersionDescriptionHelpText"),
                      "ui-control-attributes": { class: "compact-textarea" },
                      placeholder: _ctx.translate("TagManager_VersionDescriptionPlaceholderV2")
                    }, null, 8, ["model-value", "title", "inline-help", "placeholder"])
                  ]),
                  vue.createVNode(_component_SaveButton, {
                    class: "createButton no-publish",
                    onConfirm: _cache[2] || (_cache[2] = ($event) => _ctx.edit ? _ctx.updateVersion() : _ctx.createVersion()),
                    disabled: _ctx.isUpdating || !_ctx.isDirty,
                    saving: _ctx.isUpdating,
                    value: _ctx.edit ? _ctx.translate("CoreUpdater_UpdateTitle") : _ctx.translate("TagManager_CreateVersionWithoutPublishing")
                  }, null, 8, ["disabled", "saving", "value"]),
                  _ctx.create && _ctx.environments.length ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7$8, [
                    vue.createVNode(_component_Field, {
                      uicontrol: "select",
                      name: "environment",
                      "inline-help": _ctx.selectTagManagerEnvironmentHelp,
                      "inline-help-bind": { canPublishToLive: _ctx.canPublishToLive },
                      "model-value": (_a2 = _ctx.version.environments) == null ? void 0 : _a2[0],
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => {
                        _ctx.version.environments[0] = $event;
                        _ctx.setValueHasChanged();
                      }),
                      options: _ctx.environments,
                      introduction: _ctx.translate("TagManager_OrCreateAndPublishVersion"),
                      title: _ctx.translate("TagManager_Environment")
                    }, null, 8, ["inline-help", "inline-help-bind", "model-value", "options", "introduction", "title"])
                  ])) : vue.createCommentVNode("", true),
                  _ctx.create && _ctx.environments.length ? (vue.openBlock(), vue.createBlock(_component_SaveButton, {
                    key: 1,
                    class: "publishButton",
                    onConfirm: _cache[4] || (_cache[4] = ($event) => _ctx.createVersionAndPublish()),
                    disabled: _ctx.isUpdating || !_ctx.isDirty,
                    saving: _ctx.isUpdating,
                    value: _ctx.translate("TagManager_CreateVersionAndPublishRelease")
                  }, null, 8, ["disabled", "saving", "value"])) : vue.createCommentVNode("", true)
                ])) : (vue.openBlock(), vue.createElementBlock("div", _hoisted_8$8, [
                  vue.createElementVNode("div", {
                    class: "alert alert-warning",
                    innerHTML: _ctx.$sanitize(_ctx.showNoAccessErrorMessage)
                  }, null, 8, _hoisted_9$7)
                ])),
                _ctx.lastVersion ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_10$7, [
                  vue.createElementVNode("h3", null, vue.toDisplayString(_ctx.translate("TagManager_ChangesSinceLastVersion")) + ":", 1),
                  vue.withDirectives((vue.openBlock(), vue.createElementBlock("table", null, [
                    vue.createElementVNode("thead", null, [
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("th", null, vue.toDisplayString(_ctx.translate("SitesManager_Type")), 1),
                        vue.createElementVNode("th", null, vue.toDisplayString(_ctx.translate("General_Name")), 1),
                        vue.createElementVNode("th", null, vue.toDisplayString(_ctx.translate("TagManager_Change")), 1),
                        vue.createElementVNode("th", null, vue.toDisplayString(_ctx.translate("TagManager_LastUpdated")), 1)
                      ])
                    ]),
                    vue.createElementVNode("tbody", null, [
                      _ctx.isLoadingVersionChanges ? (vue.openBlock(), vue.createElementBlock("tr", _hoisted_11$7, [
                        vue.createElementVNode("td", _hoisted_12$7, [
                          vue.createVNode(_component_ActivityIndicator, {
                            "loading-message": _ctx.translate("TagManager_DetectingChanges"),
                            loading: true
                          }, null, 8, ["loading-message"])
                        ])
                      ])) : vue.createCommentVNode("", true),
                      !_ctx.versionChanges.length && !_ctx.isLoadingVersionChanges ? (vue.openBlock(), vue.createElementBlock("tr", _hoisted_13$7, [
                        vue.createElementVNode("td", _hoisted_14$7, vue.toDisplayString(_ctx.translate("UserCountryMap_None")), 1)
                      ])) : vue.createCommentVNode("", true),
                      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.versionChanges, (versionChange, index) => {
                        return vue.openBlock(), vue.createElementBlock("tr", { key: index }, [
                          vue.createElementVNode("td", null, vue.toDisplayString(_ctx.translate(versionChange.entityType)), 1),
                          vue.createElementVNode("td", null, vue.toDisplayString(versionChange.name), 1),
                          vue.createElementVNode("td", null, vue.toDisplayString(_ctx.translate(versionChange.type)), 1),
                          vue.createElementVNode("td", _hoisted_15$7, [
                            vue.createElementVNode("span", null, vue.toDisplayString(versionChange.lastChanged), 1)
                          ])
                        ]);
                      }), 128))
                    ])
                  ])), [
                    [_directive_content_table]
                  ])
                ])) : vue.createCommentVNode("", true),
                vue.withDirectives(vue.createElementVNode("div", _hoisted_16$7, [
                  vue.createElementVNode("a", {
                    onClick: _cache[5] || (_cache[5] = ($event) => _ctx.cancel())
                  }, vue.toDisplayString(_ctx.translate("General_Cancel")), 1)
                ], 512), [
                  [vue.vShow, !_ctx.isEmbedded]
                ])
              ])
            ], 32)
          ];
        }),
        _: 1
      }, 8, ["content-title"])
    ]);
  }
  const VersionEdit = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d]]);
  const { tagManagerHelper: tagManagerHelper$2 } = window;
  const _sfc_main$c = vue.defineComponent({
    props: {
      idContainer: {
        type: String,
        required: true
      },
      versionsHelpText: String
    },
    components: {
      ContentBlock: CoreHome.ContentBlock,
      Field: CorePluginsAdmin.Field
    },
    directives: {
      ContentTable: CoreHome.ContentTable
    },
    data() {
      return {
        versionToBePublished: null,
        versionSearch: ""
      };
    },
    created() {
      AvailableEnvironmentsStore.init();
      VersionsStore$1.fetchVersions(this.idContainer);
    },
    methods: {
      createVersion() {
        this.editVersion(0);
      },
      truncateText(text, length) {
        return tagManagerHelper$2.truncateText(text, length);
      },
      publishVersion(version) {
        this.versionToBePublished = version;
        CoreHome.Matomo.helper.modalConfirm(this.$refs.confirmPublishVersion, {
          yes: () => {
            const { deployEnvironment } = this.availableEnvironmentsToPublish;
            if (deployEnvironment) {
              VersionsStore$1.publishVersion(
                version.idcontainer,
                version.idcontainerversion,
                deployEnvironment
              ).then(() => {
                VersionsStore$1.reload(this.idContainer);
              });
            }
          }
        });
      },
      enableDebugMode(idContainerVersion) {
        tagManagerHelper$2.enablePreviewMode(this.idContainer, idContainerVersion);
      },
      exportVersion(idContainerVersion, versionName) {
        const params = {
          module: "API",
          method: "TagManager.exportContainerVersion",
          format: "json",
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
        CoreHome.AjaxHelper.fetch(params).then((exportedContainer) => {
          CoreHome.Matomo.helper.sendContentAsDownload(`${filename}.json`, JSON.stringify(exportedContainer));
        });
      },
      editVersion(idContainerVersion) {
        CoreHome.MatomoUrl.updateHash(__spreadProps(__spreadValues({}, CoreHome.MatomoUrl.hashParsed.value), {
          idContainerVersion
        }));
      },
      importVersion() {
        tagManagerHelper$2.importVersion(this.idContainer);
      },
      deleteVersion(version) {
        const doDelete = () => {
          VersionsStore$1.deleteVersion(this.idContainer, version.idcontainerversion).then(() => {
            VersionsStore$1.reload(this.idContainer);
          });
        };
        CoreHome.Matomo.helper.modalConfirm(this.$refs.confirmDeleteVersion, {
          yes: doDelete
        });
      },
      ucfirst(s) {
        return `${s.substring(0, 1).toUpperCase()}${s.substring(1)}`;
      },
      getExportUrl(version) {
        return `?module=TagManager&action=exportContainerVersion&idContainer=${this.idContainer}&idContainerVersion=${version.idcontainerversion}&idSite=${version.idsite}&period=day&date=yesterday`;
      },
      getExportDraftUrl() {
        return `?module=TagManager&action=exportContainerVersion&idContainer=${this.idContainer}&idSite=${this.idSite}&period=day&date=yesterday`;
      }
    },
    computed: {
      environments() {
        return AvailableEnvironmentsStore.environmentsWithPublishOptions.value;
      },
      availableEnvironmentsToPublish() {
        let deployEnvironment = "";
        const environnments = this.environments.filter((env) => {
          var _a2, _b2;
          if (!((_a2 = this.versionToBePublished) == null ? void 0 : _a2.releases)) {
            return true;
          }
          const found = (_b2 = this.versionToBePublished) == null ? void 0 : _b2.releases.some((r) => r.environment === (env == null ? void 0 : env.key));
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
        return CoreHome.Matomo.idSite;
      },
      isLoading() {
        return VersionsStore$1.isLoading.value;
      },
      isUpdating() {
        return VersionsStore$1.isUpdating.value;
      },
      versions() {
        return VersionsStore$1.versions.value;
      },
      sortedVersions() {
        const searchFilter = this.versionSearch.toLowerCase();
        const result = [...this.versions].filter((h) => Object.keys(h).some((propName) => {
          const entity = h;
          let propValue = "";
          if (typeof entity[propName] === "string") {
            propValue = entity[propName];
          } else if (propName === "releases") {
            Object.values(entity.releases).forEach((value) => {
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
        return CoreHome.Matomo.hasUserCapability("tagmanager_write");
      },
      hasCustomTemplatesCapability() {
        return CoreHome.Matomo.hasUserCapability("tagmanager_use_custom_templates");
      },
      canPublishToLive() {
        return CoreHome.Matomo.hasUserCapability("tagmanager_publish_live_container");
      },
      revisionTranslatedText() {
        return this.translate("TagManager_VersionsRevisionDescription");
      },
      nameTranslatedText() {
        return this.translate("TagManager_VersionsNameDescription");
      },
      descriptionTranslatedText() {
        return this.translate("TagManager_VersionsDescriptionDescription");
      },
      environmentTranslatedText() {
        return this.translate("TagManager_VersionsEnvironmentsDescription");
      },
      createdTranslatedText() {
        return this.translate("TagManager_VersionsCreatedDescription");
      },
      actionTranslatedText() {
        return this.translate("TagManager_VersionsActionDescription");
      }
    }
  });
  const _hoisted_1$c = { class: "tagManagerManageList tagManagerVersionList" };
  const _hoisted_2$b = { class: "versionSearchFilter" };
  const _hoisted_3$b = ["title"];
  const _hoisted_4$8 = ["title"];
  const _hoisted_5$8 = ["title"];
  const _hoisted_6$7 = ["title"];
  const _hoisted_7$7 = ["title"];
  const _hoisted_8$7 = ["title"];
  const _hoisted_9$6 = { colspan: "7" };
  const _hoisted_10$6 = { class: "loadingPiwik" };
  const _hoisted_11$6 = /* @__PURE__ */ vue.createElementVNode("img", { src: "plugins/Morpheus/images/loading-blue.gif" }, null, -1);
  const _hoisted_12$6 = { colspan: "7" };
  const _hoisted_13$6 = ["id"];
  const _hoisted_14$6 = { class: "index" };
  const _hoisted_15$6 = ["title"];
  const _hoisted_16$6 = ["title"];
  const _hoisted_17$6 = { class: "environments" };
  const _hoisted_18$6 = ["title"];
  const _hoisted_19$6 = { class: "created" };
  const _hoisted_20$6 = { class: "action" };
  const _hoisted_21$6 = ["onClick", "title"];
  const _hoisted_22$6 = ["onClick", "title"];
  const _hoisted_23$5 = ["onClick", "href", "title"];
  const _hoisted_24$5 = ["onClick", "title"];
  const _hoisted_25$5 = ["onClick", "title"];
  const _hoisted_26$3 = { class: "tableActionBar" };
  const _hoisted_27$2 = /* @__PURE__ */ vue.createElementVNode("span", { class: "icon-add" }, " ", -1);
  const _hoisted_28$2 = ["href"];
  const _hoisted_29$2 = /* @__PURE__ */ vue.createElementVNode("span", { class: "icon-export" }, " ", -1);
  const _hoisted_30$2 = /* @__PURE__ */ vue.createElementVNode("span", { class: "icon-upload" }, " ", -1);
  const _hoisted_31$2 = {
    class: "ui-confirm",
    id: "confirmDeleteVersion",
    ref: "confirmDeleteVersion"
  };
  const _hoisted_32$2 = ["value"];
  const _hoisted_33$2 = ["value"];
  const _hoisted_34$2 = {
    class: "ui-confirm",
    id: "confirmPublishVersion",
    ref: "confirmPublishVersion"
  };
  const _hoisted_35$2 = {
    key: 0,
    class: "alert alert-info",
    style: { "margin-top": "16px" }
  };
  const _hoisted_36$2 = ["value"];
  const _hoisted_37$2 = ["value"];
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    var _a2;
    const _component_Field = vue.resolveComponent("Field");
    const _component_ContentBlock = vue.resolveComponent("ContentBlock");
    const _directive_content_table = vue.resolveDirective("content-table");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$c, [
      vue.createVNode(_component_ContentBlock, {
        feature: "Tag Manager",
        "content-title": _ctx.translate("TagManager_ManageX", _ctx.translate("TagManager_Versions")),
        "help-text": _ctx.versionsHelpText
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("p", null, vue.toDisplayString(_ctx.translate("TagManager_VersionUsageBenefits")) + " " + vue.toDisplayString(_ctx.translate("TagManager_ConfigureEnvironmentsSuperUser")), 1),
          vue.createElementVNode("div", _hoisted_2$b, [
            vue.withDirectives(vue.createVNode(_component_Field, {
              uicontrol: "text",
              name: "versionSearch",
              title: _ctx.translate("General_Search"),
              modelValue: _ctx.versionSearch,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.versionSearch = $event)
            }, null, 8, ["title", "modelValue"]), [
              [vue.vShow, _ctx.versions.length > 0]
            ])
          ]),
          vue.withDirectives((vue.openBlock(), vue.createElementBlock("table", null, [
            vue.createElementVNode("thead", null, [
              vue.createElementVNode("tr", null, [
                vue.createElementVNode("th", {
                  class: "index",
                  title: _ctx.revisionTranslatedText
                }, vue.toDisplayString(_ctx.translate("TagManager_Revision")), 9, _hoisted_3$b),
                vue.createElementVNode("th", {
                  class: "name",
                  title: _ctx.nameTranslatedText
                }, vue.toDisplayString(_ctx.translate("General_Name")), 9, _hoisted_4$8),
                vue.createElementVNode("th", {
                  class: "description",
                  title: _ctx.descriptionTranslatedText
                }, vue.toDisplayString(_ctx.translate("General_Description")), 9, _hoisted_5$8),
                vue.createElementVNode("th", {
                  class: "environments",
                  title: _ctx.environmentTranslatedText
                }, vue.toDisplayString(_ctx.translate("TagManager_Environments")), 9, _hoisted_6$7),
                vue.createElementVNode("th", {
                  class: "created",
                  title: _ctx.createdTranslatedText
                }, vue.toDisplayString(_ctx.translate("TagManager_Created")), 9, _hoisted_7$7),
                vue.createElementVNode("th", {
                  class: "action",
                  title: _ctx.actionTranslatedText
                }, vue.toDisplayString(_ctx.translate("General_Actions")), 9, _hoisted_8$7)
              ])
            ]),
            vue.createElementVNode("tbody", null, [
              vue.withDirectives(vue.createElementVNode("tr", null, [
                vue.createElementVNode("td", _hoisted_9$6, [
                  vue.createElementVNode("span", _hoisted_10$6, [
                    _hoisted_11$6,
                    vue.createTextVNode(" " + vue.toDisplayString(_ctx.translate("General_LoadingData")), 1)
                  ])
                ])
              ], 512), [
                [vue.vShow, _ctx.isLoading || _ctx.isUpdating]
              ]),
              vue.withDirectives(vue.createElementVNode("tr", null, [
                vue.createElementVNode("td", _hoisted_12$6, [
                  vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_NoVersionsFound")) + " ", 1),
                  vue.withDirectives(vue.createElementVNode("a", {
                    class: "createContainerVersionNow",
                    onClick: _cache[1] || (_cache[1] = ($event) => _ctx.createVersion())
                  }, vue.toDisplayString(_ctx.translate("TagManager_CreateNewVersionNow")), 513), [
                    [vue.vShow, _ctx.hasWriteAccess && _ctx.hasCustomTemplatesCapability]
                  ])
                ])
              ], 512), [
                [vue.vShow, !_ctx.isLoading && _ctx.versions.length === 0]
              ]),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.sortedVersions, (version) => {
                return vue.openBlock(), vue.createElementBlock("tr", {
                  id: `version${version.idcontainerversion}`,
                  class: "versions",
                  key: version.revision
                }, [
                  vue.createElementVNode("td", _hoisted_14$6, vue.toDisplayString(version.revision), 1),
                  vue.createElementVNode("td", {
                    class: "name",
                    title: version.name
                  }, vue.toDisplayString(_ctx.truncateText(version.name, 50)), 9, _hoisted_15$6),
                  vue.createElementVNode("td", {
                    class: "description",
                    title: version.description
                  }, vue.toDisplayString(_ctx.truncateText(version.description, 75)), 9, _hoisted_16$6),
                  vue.createElementVNode("td", _hoisted_17$6, [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(version.releases, (release, index) => {
                      return vue.openBlock(), vue.createElementBlock("span", {
                        key: index,
                        title: _ctx.translate(
                          "TagManager_ReleaseInfo",
                          release.release_login,
                          release.release_date_pretty
                        )
                      }, [
                        vue.createTextVNode(vue.toDisplayString(_ctx.ucfirst(release.environment)), 1),
                        vue.withDirectives(vue.createElementVNode("span", null, ", ", 512), [
                          [vue.vShow, index !== version.releases.length - 1]
                        ])
                      ], 8, _hoisted_18$6);
                    }), 128))
                  ]),
                  vue.createElementVNode("td", _hoisted_19$6, [
                    vue.createElementVNode("span", null, vue.toDisplayString(version.created_date_pretty), 1)
                  ]),
                  vue.createElementVNode("td", _hoisted_20$6, [
                    vue.withDirectives(vue.createElementVNode("a", {
                      class: "table-action icon-rocket",
                      onClick: ($event) => _ctx.publishVersion(version),
                      title: _ctx.translate("TagManager_PublishVersion", version.name)
                    }, null, 8, _hoisted_21$6), [
                      [vue.vShow, _ctx.hasWriteAccess && (_ctx.hasCustomTemplatesCapability || _ctx.canPublishToLive)]
                    ]),
                    vue.withDirectives(vue.createElementVNode("a", {
                      class: "table-action icon-bug",
                      onClick: ($event) => _ctx.enableDebugMode(version.idcontainerversion),
                      title: _ctx.translate("TagManager_EnablePreviewDebug")
                    }, null, 8, _hoisted_22$6), [
                      [vue.vShow, _ctx.hasWriteAccess]
                    ]),
                    vue.createElementVNode("a", {
                      target: "_blank",
                      class: "table-action icon-export",
                      onClick: vue.withModifiers(($event) => {
                        _ctx.exportVersion(version.idcontainerversion, version.name);
                      }, ["prevent"]),
                      href: _ctx.getExportUrl(version),
                      title: _ctx.translate("TagManager_ExportX", _ctx.translate("TagManager_Version"))
                    }, null, 8, _hoisted_23$5),
                    vue.withDirectives(vue.createElementVNode("a", {
                      class: "table-action icon-edit",
                      onClick: ($event) => _ctx.editVersion(version.idcontainerversion),
                      title: _ctx.translate("TagManager_EditX", _ctx.translate("TagManager_Version"))
                    }, null, 8, _hoisted_24$5), [
                      [vue.vShow, _ctx.hasWriteAccess]
                    ]),
                    vue.withDirectives(vue.createElementVNode("a", {
                      class: "table-action icon-delete",
                      onClick: ($event) => _ctx.deleteVersion(version),
                      title: _ctx.translate("TagManager_DeleteX", _ctx.translate("TagManager_Version"))
                    }, null, 8, _hoisted_25$5), [
                      [vue.vShow, version.releases.length === 0 && _ctx.hasWriteAccess && _ctx.hasCustomTemplatesCapability]
                    ])
                  ])
                ], 8, _hoisted_13$6);
              }), 128))
            ])
          ])), [
            [_directive_content_table]
          ]),
          vue.createElementVNode("div", _hoisted_26$3, [
            vue.withDirectives(vue.createElementVNode("a", {
              class: "createNewVersion",
              onClick: _cache[2] || (_cache[2] = ($event) => _ctx.createVersion())
            }, [
              _hoisted_27$2,
              vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_CreateNewVersion")), 1)
            ], 512), [
              [vue.vShow, _ctx.hasWriteAccess && _ctx.hasCustomTemplatesCapability]
            ]),
            vue.createElementVNode("a", {
              class: "exportDraft",
              target: "_blank",
              onClick: _cache[3] || (_cache[3] = ($event) => {
                _ctx.exportVersion(null, "draft");
                $event.preventDefault();
              }),
              href: _ctx.getExportDraftUrl()
            }, [
              _hoisted_29$2,
              vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_ExportDraft")), 1)
            ], 8, _hoisted_28$2),
            vue.withDirectives(vue.createElementVNode("a", {
              class: "importVersion",
              onClick: _cache[4] || (_cache[4] = ($event) => _ctx.importVersion())
            }, [
              _hoisted_30$2,
              vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_Import")), 1)
            ], 512), [
              [vue.vShow, _ctx.hasWriteAccess && _ctx.hasCustomTemplatesCapability]
            ])
          ])
        ]),
        _: 1
      }, 8, ["content-title", "help-text"]),
      vue.createElementVNode("div", _hoisted_31$2, [
        vue.createElementVNode("h2", null, vue.toDisplayString(_ctx.translate("TagManager_DeleteVersionConfirm")), 1),
        vue.createElementVNode("input", {
          role: "yes",
          type: "button",
          value: _ctx.translate("General_Yes")
        }, null, 8, _hoisted_32$2),
        vue.createElementVNode("input", {
          role: "no",
          type: "button",
          value: _ctx.translate("General_No")
        }, null, 8, _hoisted_33$2)
      ], 512),
      vue.createElementVNode("div", _hoisted_34$2, [
        vue.createElementVNode("h2", null, vue.toDisplayString(_ctx.translate("TagManager_PublishVersion", (_a2 = _ctx.versionToBePublished) == null ? void 0 : _a2.name)), 1),
        vue.withDirectives(vue.createElementVNode("div", null, [
          vue.createElementVNode("div", null, [
            vue.createVNode(_component_Field, {
              uicontrol: "select",
              name: "environment",
              modelValue: _ctx.availableEnvironmentsToPublish.deployEnvironment,
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.availableEnvironmentsToPublish.deployEnvironment = $event),
              options: _ctx.availableEnvironmentsToPublish.environnments,
              "full-width": true,
              title: _ctx.translate("TagManager_Environment")
            }, null, 8, ["modelValue", "options", "title"])
          ]),
          vue.withDirectives(vue.createElementVNode("div", {
            style: { "margin-bottom": "0" },
            class: "alert alert-info"
          }, vue.toDisplayString(_ctx.translate(
            "TagManager_PublishLiveEnvironmentCapabilityRequired",
            _ctx.translate("TagManager_CapabilityPublishLiveContainer")
          )), 513), [
            [vue.vShow, !_ctx.canPublishToLive]
          ])
        ], 512), [
          [vue.vShow, _ctx.availableEnvironmentsToPublish.environnments.length]
        ]),
        !_ctx.availableEnvironmentsToPublish.environnments.length ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_35$2, vue.toDisplayString(_ctx.translate("TagManager_VersionAlreadyPublishedToAllEnvironments")), 1)) : vue.createCommentVNode("", true),
        vue.createElementVNode("input", {
          role: "yes",
          type: "button",
          value: _ctx.translate("TagManager_PublishRelease")
        }, null, 8, _hoisted_36$2),
        vue.createElementVNode("input", {
          role: "no",
          type: "button",
          value: _ctx.translate("General_Cancel")
        }, null, 8, _hoisted_37$2)
      ], 512)
    ]);
  }
  const VersionList = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c]]);
  const _sfc_main$b = vue.defineComponent({
    props: {
      idContainer: String,
      versionsHelpText: String
    },
    components: {
      VersionList,
      VersionEdit
    },
    data() {
      return {
        isAddAllowed: false
      };
    },
    created() {
      vue.watch(() => CoreHome.MatomoUrl.hashParsed.value.idContainerVersion, (v) => {
        this.onIdContainerVersionParamChange(v);
      });
      CoreHome.NotificationsStore.remove("versiontagmanagement");
      this.onIdContainerVersionParamChange(CoreHome.MatomoUrl.hashParsed.value.idContainerVersion);
    },
    methods: {
      onIdContainerVersionParamChange(idContainerVersion) {
        if (idContainerVersion === "0") {
          const parameters = { isAllowed: true };
          CoreHome.Matomo.postEvent("TagManager.initAddVersion", parameters);
          this.isAddAllowed = !!parameters.isAllowed;
        }
      }
    },
    computed: {
      idContainerVersion() {
        const idContainerVersion = CoreHome.MatomoUrl.hashParsed.value.idContainerVersion;
        if (!this.isAddAllowed && idContainerVersion === "0") {
          return null;
        }
        return idContainerVersion ? parseInt(idContainerVersion, 10) : idContainerVersion;
      },
      editMode() {
        return typeof this.idContainerVersion === "number";
      }
    }
  });
  const _hoisted_1$b = { class: "manageVersion" };
  const _hoisted_2$a = { key: 0 };
  const _hoisted_3$a = { key: 1 };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_VersionList = vue.resolveComponent("VersionList");
    const _component_VersionEdit = vue.resolveComponent("VersionEdit");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$b, [
      !_ctx.editMode ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$a, [
        vue.createVNode(_component_VersionList, {
          "id-container": _ctx.idContainer,
          "versions-help-text": _ctx.versionsHelpText
        }, null, 8, ["id-container", "versions-help-text"])
      ])) : vue.createCommentVNode("", true),
      _ctx.editMode ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$a, [
        vue.createVNode(_component_VersionEdit, {
          "id-container": _ctx.idContainer,
          "id-container-version": _ctx.idContainerVersion
        }, null, 8, ["id-container", "id-container-version"])
      ])) : vue.createCommentVNode("", true)
    ]);
  }
  const VersionManage = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b]]);
  /*!
   * Matomo - free/libre analytics platform
   *
   * @link https://matomo.org
   * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
   */
  class AvailableContextStore {
    constructor() {
      __publicField(this, "privateState", vue.reactive({
        contexts: [],
        isLoading: false
      }));
      __publicField(this, "state", vue.computed(() => vue.readonly(this.privateState)));
      __publicField(this, "isLoading", vue.computed(() => this.state.value.isLoading));
      __publicField(this, "contexts", vue.computed(() => this.state.value.contexts));
      __publicField(this, "contextsOptions", vue.computed(() => this.contexts.value.map(
        ({ id, name }) => ({ key: id, value: name })
      )));
      __publicField(this, "initializePromise", null);
    }
    init() {
      if (!this.initializePromise) {
        this.initializePromise = this.fetchAvailableContexts();
      }
      return this.initializePromise;
    }
    fetchAvailableContexts() {
      this.privateState.isLoading = true;
      return CoreHome.AjaxHelper.fetch({
        method: "TagManager.getAvailableContexts",
        filter_limit: "-1"
      }).then((contexts) => {
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
  const AvailableContextsStore = new AvailableContextStore();
  /*!
   * Matomo - free/libre analytics platform
   *
   * @link https://matomo.org
   * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
   */
  class ContainersStore {
    constructor() {
      __publicField(this, "privateState", vue.reactive({
        containers: [],
        isLoadingContainers: false,
        isLoadingSingle: false,
        isUpdating: false
      }));
      __publicField(this, "state", vue.computed(() => vue.readonly(this.privateState)));
      __publicField(this, "isLoading", vue.computed(() => {
        const state = this.state.value;
        return state.isLoadingContainers || state.isLoadingSingle;
      }));
      __publicField(this, "isUpdating", vue.computed(() => this.state.value.isUpdating));
      __publicField(this, "containers", vue.computed(() => this.state.value.containers));
      __publicField(this, "fetchPromise", null);
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
        this.fetchPromise = CoreHome.AjaxHelper.fetch({
          method: "TagManager.getContainers",
          filter_limit: "-1"
        });
      }
      return Promise.resolve(this.fetchPromise).then((containers) => {
        this.privateState.containers = containers;
        this.privateState.isLoadingContainers = false;
        return this.containers.value;
      }).finally(() => {
        this.privateState.isLoadingContainers = false;
      });
    }
    findContainer(idContainer) {
      const found = this.containers.value.find((v) => v.idcontainer === idContainer);
      if (found) {
        return Promise.resolve(found);
      }
      this.privateState.isLoadingSingle = true;
      return CoreHome.AjaxHelper.fetch({
        idContainer,
        method: "TagManager.getContainer",
        filter_limit: "-1"
      }).then((record) => {
        this.privateState.containers = [...this.privateState.containers, record];
        return vue.readonly(record);
      }).finally(() => {
        this.privateState.isLoadingSingle = false;
      });
    }
    deleteContainer(idContainer) {
      this.privateState.isUpdating = true;
      this.privateState.containers = [];
      return CoreHome.AjaxHelper.fetch(
        {
          idContainer,
          method: "TagManager.deleteContainer"
        },
        { withTokenInUrl: true }
      ).finally(() => {
        this.privateState.isUpdating = false;
      });
    }
    createOrUpdateContainer(container, method) {
      this.privateState.isUpdating = true;
      return CoreHome.AjaxHelper.post(
        {
          method,
          idContainer: container.idcontainer
        },
        {
          name: container.name,
          description: container.description,
          ignoreGtmDataLayer: container.ignoreGtmDataLayer,
          activelySyncGtmDataLayer: container.activelySyncGtmDataLayer,
          isTagFireLimitAllowedInPreviewMode: container.isTagFireLimitAllowedInPreviewMode,
          context: container.context
        },
        { withTokenInUrl: true }
      ).finally(() => {
        this.privateState.isUpdating = false;
      });
    }
  }
  const ContainersStore$1 = new ContainersStore();
  const notificationId = "containertagmanagement";
  const _sfc_main$a = vue.defineComponent({
    props: {
      idContainer: String
    },
    components: {
      ContentBlock: CoreHome.ContentBlock,
      Field: CorePluginsAdmin.Field,
      SaveButton: CorePluginsAdmin.SaveButton
    },
    data() {
      return {
        isDirty: false,
        editTitle: "",
        isUpdatingVersion: false,
        container: {}
      };
    },
    created() {
      AvailableContextsStore.init();
      AvailableComparisonsStore$1.init();
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
        CoreHome.NotificationsStore.remove(notificationId);
        CoreHome.NotificationsStore.remove("ajaxHelper");
      },
      showNotification(message, context) {
        const notificationInstanceId = CoreHome.NotificationsStore.show({
          message,
          context,
          id: notificationId,
          type: "toast"
        });
        setTimeout(() => {
          CoreHome.NotificationsStore.scrollToNotification(notificationInstanceId);
        }, 200);
      },
      showErrorFieldNotProvidedNotification(title) {
        const message = CoreHome.translate("TagManager_ErrorXNotProvided", [title]);
        this.showNotification(message, "error");
      },
      initIdContainer() {
        this.container = {};
        CoreHome.Matomo.helper.lazyScrollToContent();
        if (this.edit && this.idContainer) {
          this.editTitle = CoreHome.translate("TagManager_EditContainer");
          ContainersStore$1.findContainer(this.idContainer).then((container) => {
            if (!container) {
              return;
            }
            this.container = CoreHome.clone(container);
            this.isDirty = false;
          });
        } else if (this.create) {
          this.editTitle = CoreHome.translate("TagManager_CreateNewContainer");
          this.container = {
            idSite: CoreHome.Matomo.idSite,
            name: "",
            context: "web",
            description: "",
            activelySyncGtmDataLayer: true
          };
          this.isDirty = false;
        }
      },
      cancel() {
        const newParams = __spreadValues({}, CoreHome.MatomoUrl.hashParsed.value);
        delete newParams.idContainer;
        CoreHome.MatomoUrl.updateHash(newParams);
      },
      createContainer() {
        this.removeAnyContainerNotification();
        if (!this.checkRequiredFieldsAreSet()) {
          return;
        }
        this.isUpdatingVersion = true;
        ContainersStore$1.createOrUpdateContainer(
          this.container,
          "TagManager.addContainer"
        ).then((response) => {
          this.isUpdatingVersion = false;
          if (!response) {
            return;
          }
          this.isDirty = false;
          const idContainer = response.value;
          this.showNotification(
            CoreHome.translate("TagManager_CreatedX", CoreHome.translate("TagManager_Container")),
            "success"
          );
          CoreHome.MatomoUrl.updateUrl(__spreadProps(__spreadValues({}, CoreHome.MatomoUrl.urlParsed.value), {
            module: "TagManager",
            action: "dashboard",
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
        ContainersStore$1.createOrUpdateContainer(
          this.container,
          "TagManager.updateContainer"
        ).then((response) => {
          if (!response) {
            return;
          }
          this.isDirty = false;
          this.container = {};
          ContainersStore$1.reload().then(() => {
            this.initIdContainer();
          });
          this.showNotification(
            CoreHome.translate(
              "TagManager_UpdatedX",
              CoreHome.translate("TagManager_Container")
            ),
            "success"
          );
        });
      },
      checkRequiredFieldsAreSet() {
        if (!this.container.name) {
          const title = CoreHome.translate("General_Name");
          this.showErrorFieldNotProvidedNotification(title);
          return false;
        }
        return true;
      }
    },
    computed: {
      contexts() {
        return AvailableContextsStore.contextsOptions.value;
      },
      create() {
        return this.idContainer === "0";
      },
      edit() {
        return !this.create;
      },
      isLoading() {
        return VariablesStore$1.isLoading.value || AvailableComparisonsStore$1.isLoading.value;
      },
      isUpdating() {
        return VariablesStore$1.isUpdating.value || this.isUpdatingVersion;
      },
      contextHelpText() {
        return `${CoreHome.translate("TagManager_ContainerContextHelp")} ${CoreHome.translate(
          "General_LearnMore",
          CoreHome.externalLink("https://matomo.org/faq/tag-manager/create-a-container-in-matomo-tag-manager/"),
          "</a>"
        )}`;
      }
    }
  });
  const _hoisted_1$a = { class: "loadingPiwik" };
  const _hoisted_2$9 = /* @__PURE__ */ vue.createElementVNode("img", { src: "plugins/Morpheus/images/loading-blue.gif" }, null, -1);
  const _hoisted_3$9 = { class: "loadingPiwik" };
  const _hoisted_4$7 = /* @__PURE__ */ vue.createElementVNode("img", { src: "plugins/Morpheus/images/loading-blue.gif" }, null, -1);
  const _hoisted_5$7 = { class: "entityCancel" };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Field = vue.resolveComponent("Field");
    const _component_SaveButton = vue.resolveComponent("SaveButton");
    const _component_ContentBlock = vue.resolveComponent("ContentBlock");
    return vue.openBlock(), vue.createBlock(_component_ContentBlock, {
      class: "editContainer tagManagerManageEdit",
      feature: "Tag Manager",
      "content-title": _ctx.editTitle
    }, {
      default: vue.withCtx(() => [
        vue.withDirectives(vue.createElementVNode("p", null, [
          vue.createElementVNode("span", _hoisted_1$a, [
            _hoisted_2$9,
            vue.createTextVNode(" " + vue.toDisplayString(_ctx.translate("General_LoadingData")), 1)
          ])
        ], 512), [
          [vue.vShow, _ctx.isLoading]
        ]),
        vue.withDirectives(vue.createElementVNode("p", null, [
          vue.createElementVNode("span", _hoisted_3$9, [
            _hoisted_4$7,
            vue.createTextVNode(" " + vue.toDisplayString(_ctx.translate("TagManager_UpdatingData")), 1)
          ])
        ], 512), [
          [vue.vShow, _ctx.isUpdating]
        ]),
        vue.createElementVNode("form", {
          onSubmit: _cache[8] || (_cache[8] = ($event) => _ctx.edit ? _ctx.updateContainer() : _ctx.createContainer())
        }, [
          vue.createElementVNode("div", null, [
            vue.createElementVNode("div", null, [
              vue.withDirectives(vue.createVNode(_component_Field, {
                uicontrol: "text",
                name: "idcontainer",
                "model-value": _ctx.container.idcontainer,
                disabled: true,
                title: _ctx.translate("General_Id")
              }, null, 8, ["model-value", "title"]), [
                [vue.vShow, _ctx.edit]
              ])
            ]),
            vue.createElementVNode("div", null, [
              vue.createVNode(_component_Field, {
                uicontrol: "text",
                name: "name",
                "model-value": _ctx.container.name,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => {
                  _ctx.container.name = $event;
                  _ctx.setValueHasChanged();
                }),
                maxlength: 255,
                title: _ctx.translate("General_Name"),
                "inline-help": _ctx.translate("TagManager_ContainerNameHelpText"),
                placeholder: _ctx.translate("TagManager_ContainerNamePlaceholderV2")
              }, null, 8, ["model-value", "title", "inline-help", "placeholder"])
            ]),
            vue.createElementVNode("div", null, [
              vue.createVNode(_component_Field, {
                uicontrol: "textarea",
                name: "description",
                "model-value": _ctx.container.description,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => {
                  _ctx.container.description = $event;
                  _ctx.setValueHasChanged();
                }),
                title: _ctx.translate("TagManager_Description"),
                "ui-control-attributes": { class: "compact-textarea" },
                "inline-help": _ctx.translate("TagManager_ContainerDescriptionHelpText"),
                placeholder: _ctx.translate("TagManager_ContainerDescriptionPlaceholderV2")
              }, null, 8, ["model-value", "title", "inline-help", "placeholder"])
            ]),
            vue.createElementVNode("div", null, [
              vue.createVNode(_component_Field, {
                uicontrol: "select",
                name: "context",
                "model-value": _ctx.container.context,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => {
                  _ctx.container.context = $event;
                  _ctx.setValueHasChanged();
                }),
                disabled: true,
                options: _ctx.contexts,
                title: _ctx.translate("TagManager_Context"),
                "inline-help": _ctx.contextHelpText
              }, null, 8, ["model-value", "options", "title", "inline-help"])
            ]),
            vue.createElementVNode("div", null, [
              vue.createVNode(_component_Field, {
                uicontrol: "checkbox",
                name: "ignoreGtmDataLayer",
                "model-value": _ctx.container.ignoreGtmDataLayer,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => {
                  _ctx.container.ignoreGtmDataLayer = $event;
                  _ctx.setValueHasChanged();
                }),
                title: _ctx.translate("TagManager_IgnoreGtmDataLaterTitle"),
                "inline-help": _ctx.translate("TagManager_IgnoreGtmDataLaterDescription")
              }, null, 8, ["model-value", "title", "inline-help"])
            ]),
            vue.createElementVNode("div", null, [
              vue.createVNode(_component_Field, {
                uicontrol: "checkbox",
                name: "activelySyncGtmDataLayer",
                "model-value": _ctx.container.activelySyncGtmDataLayer,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => {
                  _ctx.container.activelySyncGtmDataLayer = $event;
                  _ctx.setValueHasChanged();
                }),
                title: _ctx.translate("TagManager_ActivelySyncGtmDataLayerTitle"),
                "inline-help": _ctx.translate("TagManager_ActivelySyncGtmDataLayerDescription")
              }, null, 8, ["model-value", "title", "inline-help"])
            ]),
            vue.createElementVNode("div", null, [
              vue.createVNode(_component_Field, {
                uicontrol: "checkbox",
                name: "isTagFireLimitAllowedInPreviewMode",
                "model-value": _ctx.container.isTagFireLimitAllowedInPreviewMode,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => {
                  _ctx.container.isTagFireLimitAllowedInPreviewMode = $event;
                  _ctx.setValueHasChanged();
                }),
                title: _ctx.translate("TagManager_TagFireLimitAllowedInPreviewModeTitle"),
                "inline-help": _ctx.translate("TagManager_TagFireLimitAllowedInPreviewModeDescription")
              }, null, 8, ["model-value", "title", "inline-help"])
            ]),
            vue.createVNode(_component_SaveButton, {
              class: "createButton",
              onConfirm: _cache[6] || (_cache[6] = ($event) => _ctx.edit ? _ctx.updateContainer() : _ctx.createContainer()),
              disabled: _ctx.isUpdating || !_ctx.isDirty,
              saving: _ctx.isUpdating,
              value: _ctx.edit ? _ctx.translate("CoreUpdater_UpdateTitle") : _ctx.translate("TagManager_CreateNewContainer")
            }, null, 8, ["disabled", "saving", "value"]),
            vue.createElementVNode("div", _hoisted_5$7, [
              vue.createElementVNode("a", {
                onClick: _cache[7] || (_cache[7] = ($event) => _ctx.cancel())
              }, vue.toDisplayString(_ctx.translate("General_Cancel")), 1)
            ])
          ])
        ], 32)
      ]),
      _: 1
    }, 8, ["content-title"]);
  }
  const ContainerEdit = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a]]);
  const { tagManagerHelper: tagManagerHelper$1 } = window;
  const _sfc_main$9 = vue.defineComponent({
    props: {
      isSuperUser: {
        type: Boolean,
        required: true
      }
    },
    components: {
      ContentBlock: CoreHome.ContentBlock
    },
    directives: {
      ContentTable: CoreHome.ContentTable
    },
    created() {
      AvailableContextsStore.init();
      ContainersStore$1.fetchContainers();
    },
    computed: {
      contexts() {
        const result = {};
        AvailableContextsStore.contexts.value.forEach(({ id, name }) => {
          result[id] = name;
        });
        return result;
      },
      hasWriteAccess() {
        return CoreHome.Matomo.hasUserCapability("tagmanager_write");
      },
      containerDefaultAction() {
        return this.hasWriteAccess ? "dashboard" : "manageTags";
      },
      isLoading() {
        return VersionsStore$1.isLoading.value;
      },
      isUpdating() {
        return VersionsStore$1.isUpdating.value;
      },
      containers() {
        return ContainersStore$1.containers.value;
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
        const linkString = CoreHome.externalLink("https://matomo.org/guide/tag-manager/getting-started-with-tag-manager/");
        return CoreHome.translate("TagManager_ManageContainersIntro", linkString, "</a>");
      },
      canCopyContainer() {
        return CoreHome.Matomo.hasUserCapability("tagmanager_write") && CoreHome.Matomo.hasUserCapability("tagmanager_use_custom_templates");
      },
      getActionClasses() {
        const copyClass = this.canCopyContainer ? " hasCopyAction" : "";
        return `action${copyClass}`;
      }
    },
    methods: {
      createContainer() {
        this.editContainer("0");
      },
      editContainer(idContainer) {
        CoreHome.MatomoUrl.updateHash(__spreadProps(__spreadValues({}, CoreHome.MatomoUrl.hashParsed.value), {
          idContainer
        }));
      },
      installCode(idContainer) {
        tagManagerHelper$1.showInstallCode(idContainer);
      },
      deleteContainer(container) {
        function doDelete() {
          ContainersStore$1.deleteContainer(container.idcontainer).then(() => {
            CoreHome.NotificationsStore.remove("CopyDialogResultNotification");
            window.location.reload();
          });
        }
        CoreHome.Matomo.helper.modalConfirm(this.$refs.confirmDeleteContainer, {
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
        const url = CoreHome.MatomoUrl.stringify({
          module: "TagManager",
          action: "copyContainerDialog",
          idSite: container.idsite,
          idContainer: container.idcontainer
        });
        window.Piwik_Popover.createPopupAndLoadUrl(url, "", "mtmCopyContainer");
      }
    }
  });
  const _hoisted_1$9 = { class: "tagManagerManageList tagManagerContainerList" };
  const _hoisted_2$8 = ["innerHTML"];
  const _hoisted_3$8 = { class: "index" };
  const _hoisted_4$6 = { class: "name" };
  const _hoisted_5$6 = { class: "description" };
  const _hoisted_6$6 = { class: "created" };
  const _hoisted_7$6 = { class: "action" };
  const _hoisted_8$6 = { colspan: "5" };
  const _hoisted_9$5 = { class: "loadingPiwik" };
  const _hoisted_10$5 = /* @__PURE__ */ vue.createElementVNode("img", { src: "plugins/Morpheus/images/loading-blue.gif" }, null, -1);
  const _hoisted_11$5 = { colspan: "5" };
  const _hoisted_12$5 = ["id"];
  const _hoisted_13$5 = ["title"];
  const _hoisted_14$5 = ["title"];
  const _hoisted_15$5 = ["title"];
  const _hoisted_16$5 = { class: "created" };
  const _hoisted_17$5 = ["href", "title"];
  const _hoisted_18$5 = ["onClick", "title"];
  const _hoisted_19$5 = ["onClick", "title"];
  const _hoisted_20$5 = ["onClick", "title"];
  const _hoisted_21$5 = ["onClick", "title"];
  const _hoisted_22$5 = { class: "tableActionBar" };
  const _hoisted_23$4 = /* @__PURE__ */ vue.createElementVNode("span", { class: "icon-add" }, " ", -1);
  const _hoisted_24$4 = {
    class: "ui-confirm",
    id: "confirmDeleteContainer",
    ref: "confirmDeleteContainer"
  };
  const _hoisted_25$4 = ["value"];
  const _hoisted_26$2 = ["value"];
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_ContentBlock = vue.resolveComponent("ContentBlock");
    const _directive_content_table = vue.resolveDirective("content-table");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$9, [
      vue.createVNode(_component_ContentBlock, {
        feature: "Tag Manager",
        "content-title": _ctx.translate(
          "TagManager_ManageX",
          _ctx.translate("TagManager_Containers")
        )
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("p", {
            innerHTML: _ctx.$sanitize(_ctx.getManageContainersIntro)
          }, null, 8, _hoisted_2$8),
          vue.withDirectives((vue.openBlock(), vue.createElementBlock("table", null, [
            vue.createElementVNode("thead", null, [
              vue.createElementVNode("tr", null, [
                vue.createElementVNode("th", _hoisted_3$8, vue.toDisplayString(_ctx.translate("General_Id")), 1),
                vue.createElementVNode("th", _hoisted_4$6, vue.toDisplayString(_ctx.translate("General_Name")), 1),
                vue.createElementVNode("th", _hoisted_5$6, vue.toDisplayString(_ctx.translate("General_Description")), 1),
                vue.createElementVNode("th", _hoisted_6$6, vue.toDisplayString(_ctx.translate("TagManager_CreatedDate")), 1),
                vue.createElementVNode("th", _hoisted_7$6, vue.toDisplayString(_ctx.translate("General_Actions")), 1)
              ])
            ]),
            vue.createElementVNode("tbody", null, [
              vue.withDirectives(vue.createElementVNode("tr", null, [
                vue.createElementVNode("td", _hoisted_8$6, [
                  vue.createElementVNode("span", _hoisted_9$5, [
                    _hoisted_10$5,
                    vue.createTextVNode(" " + vue.toDisplayString(_ctx.translate("General_LoadingData")), 1)
                  ])
                ])
              ], 512), [
                [vue.vShow, _ctx.isLoading || _ctx.isUpdating]
              ]),
              vue.withDirectives(vue.createElementVNode("tr", null, [
                vue.createElementVNode("td", _hoisted_11$5, [
                  vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_NoContainersFound")) + " ", 1),
                  vue.withDirectives(vue.createElementVNode("a", {
                    class: "createContainerNow",
                    onClick: _cache[0] || (_cache[0] = ($event) => _ctx.createContainer())
                  }, vue.toDisplayString(_ctx.translate("TagManager_CreateNewContainerNow")), 513), [
                    [vue.vShow, _ctx.hasWriteAccess]
                  ])
                ])
              ], 512), [
                [vue.vShow, !_ctx.isLoading && _ctx.containers.length === 0]
              ]),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.sortedContainers, (container) => {
                return vue.openBlock(), vue.createElementBlock("tr", {
                  id: `container${container.idcontainer}`,
                  class: "containers",
                  key: container.idcontainer
                }, [
                  vue.createElementVNode("td", {
                    class: "index",
                    title: `${_ctx.translate("TagManager_Context")}: ` + _ctx.contexts[container.context]
                  }, vue.toDisplayString(container.idcontainer), 9, _hoisted_13$5),
                  vue.createElementVNode("td", {
                    class: "name",
                    title: container.name
                  }, vue.toDisplayString(_ctx.truncateText(container.name, 50)), 9, _hoisted_14$5),
                  vue.createElementVNode("td", {
                    class: "description",
                    title: container.description
                  }, vue.toDisplayString(_ctx.truncateText(container.description, 75)), 9, _hoisted_15$5),
                  vue.createElementVNode("td", _hoisted_16$5, [
                    vue.createElementVNode("span", null, vue.toDisplayString(container.created_date_pretty), 1)
                  ]),
                  vue.createElementVNode("td", {
                    class: vue.normalizeClass(_ctx.getActionClasses)
                  }, [
                    vue.createElementVNode("a", {
                      class: "table-action icon-configure",
                      href: "?module=TagManager&action=" + _ctx.containerDefaultAction + "&idContainer=" + container.idcontainer + "&idSite=" + container.idsite + "&period=day&date=yesterday",
                      title: _ctx.translate(
                        "TagManager_ConfigureX",
                        _ctx.translate("TagManager_Container")
                      )
                    }, null, 8, _hoisted_17$5),
                    vue.createElementVNode("a", {
                      class: "table-action installCode icon-embed",
                      onClick: ($event) => _ctx.installCode(container.idcontainer),
                      title: _ctx.translate("TagManager_InstallCode")
                    }, null, 8, _hoisted_18$5),
                    vue.withDirectives(vue.createElementVNode("a", {
                      class: "table-action icon-edit",
                      onClick: ($event) => _ctx.editContainer(container.idcontainer),
                      title: _ctx.translate(
                        "TagManager_EditX",
                        _ctx.translate("TagManager_Container")
                      )
                    }, null, 8, _hoisted_19$5), [
                      [vue.vShow, _ctx.hasWriteAccess]
                    ]),
                    vue.withDirectives(vue.createElementVNode("a", {
                      class: "table-action icon-content-copy",
                      onClick: ($event) => _ctx.openCopyDialog(container),
                      title: _ctx.translate(
                        "TagManager_CopyX",
                        _ctx.translate("TagManager_Container")
                      )
                    }, null, 8, _hoisted_20$5), [
                      [vue.vShow, _ctx.canCopyContainer]
                    ]),
                    vue.withDirectives(vue.createElementVNode("a", {
                      class: "table-action icon-delete",
                      onClick: ($event) => _ctx.deleteContainer(container),
                      title: _ctx.translate(
                        "TagManager_DeleteX",
                        _ctx.translate("TagManager_Container")
                      )
                    }, null, 8, _hoisted_21$5), [
                      [vue.vShow, _ctx.hasWriteAccess]
                    ])
                  ], 2)
                ], 8, _hoisted_12$5);
              }), 128))
            ])
          ])), [
            [_directive_content_table]
          ]),
          vue.withDirectives(vue.createElementVNode("div", _hoisted_22$5, [
            vue.createElementVNode("a", {
              class: "createNewContainer",
              value: "",
              onClick: _cache[1] || (_cache[1] = ($event) => _ctx.createContainer())
            }, [
              _hoisted_23$4,
              vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_CreateNewContainer")), 1)
            ])
          ], 512), [
            [vue.vShow, _ctx.hasWriteAccess]
          ])
        ]),
        _: 1
      }, 8, ["content-title"]),
      vue.createElementVNode("div", _hoisted_24$4, [
        vue.createElementVNode("h2", null, vue.toDisplayString(_ctx.translate("TagManager_DeleteContainerConfirm")), 1),
        vue.createElementVNode("input", {
          role: "yes",
          type: "button",
          value: _ctx.translate("General_Yes")
        }, null, 8, _hoisted_25$4),
        vue.createElementVNode("input", {
          role: "no",
          type: "button",
          value: _ctx.translate("General_No")
        }, null, 8, _hoisted_26$2)
      ], 512)
    ]);
  }
  const ContainerList = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9]]);
  const _sfc_main$8 = vue.defineComponent({
    props: {
      isSuperUser: {
        type: Boolean,
        required: true
      }
    },
    components: {
      ContainerList,
      ContainerEdit
    },
    data() {
      return {
        isAddAllowed: false
      };
    },
    created() {
      vue.watch(() => CoreHome.MatomoUrl.hashParsed.value.idContainer, (v) => {
        this.onIdContainerParamChange(v);
      });
      CoreHome.NotificationsStore.remove("containertagmanagement");
      this.onIdContainerParamChange(CoreHome.MatomoUrl.hashParsed.value.idContainer);
    },
    computed: {
      idContainer() {
        const idContainer = CoreHome.MatomoUrl.hashParsed.value.idContainer;
        if (!this.isAddAllowed && idContainer === "") {
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
        if (idContainer === "0") {
          const parameters = { isAllowed: true };
          CoreHome.Matomo.postEvent("TagManager.initAddVersion", parameters);
          this.isAddAllowed = !!parameters.isAllowed;
        }
      }
    }
  });
  const _hoisted_1$8 = { class: "manageContainer" };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_ContainerList = vue.resolveComponent("ContainerList");
    const _component_ContainerEdit = vue.resolveComponent("ContainerEdit");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$8, [
      vue.withDirectives(vue.createElementVNode("div", null, [
        vue.createVNode(_component_ContainerList, { "is-super-user": _ctx.isSuperUser }, null, 8, ["is-super-user"])
      ], 512), [
        [vue.vShow, !_ctx.editMode]
      ]),
      vue.withDirectives(vue.createElementVNode("div", null, [
        vue.createVNode(_component_ContainerEdit, { "id-container": _ctx.idContainer }, null, 8, ["id-container"])
      ], 512), [
        [vue.vShow, _ctx.editMode]
      ])
    ]);
  }
  const ContainerManage = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8]]);
  function sortByName(items) {
    items.sort((lhs, rhs) => {
      if (lhs.name < rhs.name) {
        return -1;
      }
      return lhs.name > rhs.name ? 1 : 0;
    });
  }
  const _sfc_main$7 = vue.defineComponent({
    props: {
      idContainer: String,
      dashboardHelpText: String,
      tagsHelpText: String,
      triggersHelpText: String,
      variablesHelpText: String,
      versionsHelpText: String
    },
    components: {
      ActivityIndicator: CoreHome.ActivityIndicator,
      EnrichedHeadline: CoreHome.EnrichedHeadline,
      ContentBlock: CoreHome.ContentBlock
    },
    directives: {
      ContentIntro: CoreHome.ContentIntro
    },
    data() {
      return {
        container: null,
        containerVersion: null,
        isLoading: false
      };
    },
    created() {
      AvailableContextsStore.init();
      this.isLoading = true;
      const containerPromise = CoreHome.AjaxHelper.fetch({
        method: "TagManager.getContainer",
        idContainer: this.idContainer
      }).then((container) => {
        this.container = container;
      });
      const versionPromise = CoreHome.AjaxHelper.fetch({
        method: "TagManager.exportContainerVersion",
        idContainer: this.idContainer
      }).then((containerVersion) => {
        this.containerVersion = containerVersion;
      });
      Promise.all([containerPromise, versionPromise]).finally(() => {
        this.isLoading = false;
      });
    },
    methods: {
      linkTo(action, hash) {
        let url = CoreHome.MatomoUrl.stringify(__spreadProps(__spreadValues({}, CoreHome.MatomoUrl.urlParsed.value), {
          module: "TagManager",
          action
        }));
        if (hash) {
          url += `#?${CoreHome.MatomoUrl.stringify(hash)}`;
        }
        return `?${url}`;
      },
      lastVersionLinkTitle(lastVersion) {
        return `Created on ${lastVersion.created_date_pretty}, description: '${lastVersion.description}'`;
      },
      releaseTooltip(release) {
        const firstPart = CoreHome.translate(
          "TagManager_ReleaseInfo",
          release.release_login,
          release.release_date_pretty
        );
        const secondPart = CoreHome.translate("TagManager_ReleaseVersionInfo", release.version_name);
        return `${firstPart} ${secondPart}`;
      },
      ucfirst(s) {
        return `${s.substr(0, 1).toUpperCase()}${s.substr(1)}`;
      }
    },
    computed: {
      lastVersions() {
        var _a2, _b2;
        if ((_b2 = (_a2 = this.container) == null ? void 0 : _a2.versions) == null ? void 0 : _b2.length) {
          return this.container.versions.slice(0, 5);
        }
        return [];
      },
      contexts() {
        const result = {};
        AvailableContextsStore.contexts.value.forEach(({ id, name }) => {
          result[id] = name;
        });
        return result;
      },
      containerMetaInformation() {
        var _a2;
        return CoreHome.translate(
          "TagManager_ContainerIdInformation",
          ((_a2 = this.containerVersion) == null ? void 0 : _a2.idcontainer) || ""
        );
      },
      containerDashboardDescription() {
        const linkString = CoreHome.externalLink("https://matomo.org/guide/tag-manager/getting-started-with-tag-manager/");
        return CoreHome.translate("TagManager_ContainerDashboardDescription", linkString, "</a>");
      },
      sortedContainerVersionTags() {
        var _a2;
        const tags = ((_a2 = this.containerVersion) == null ? void 0 : _a2.tags) || [];
        sortByName(tags);
        return tags;
      },
      sortedTriggers() {
        var _a2;
        const triggers = ((_a2 = this.containerVersion) == null ? void 0 : _a2.triggers) || [];
        sortByName(triggers);
        return triggers;
      },
      sortedVariables() {
        var _a2;
        const variables = ((_a2 = this.containerVersion) == null ? void 0 : _a2.variables) || [];
        sortByName(variables);
        return variables;
      },
      tagCount() {
        var _a2;
        return (_a2 = this.containerVersion) == null ? void 0 : _a2.tags.length;
      },
      triggerCount() {
        var _a2;
        return (_a2 = this.containerVersion) == null ? void 0 : _a2.triggers.length;
      },
      versionCount() {
        var _a2;
        return (_a2 = this.container) == null ? void 0 : _a2.versions.length;
      },
      variableCount() {
        var _a2;
        return (_a2 = this.containerVersion) == null ? void 0 : _a2.variables.length;
      }
    }
  });
  const _hoisted_1$7 = { class: "containerDashboard" };
  const _hoisted_2$7 = { key: 0 };
  const _hoisted_3$7 = { class: "dashboardCreationDate" };
  const _hoisted_4$5 = { key: 0 };
  const _hoisted_5$5 = /* @__PURE__ */ vue.createElementVNode("br", null, null, -1);
  const _hoisted_6$5 = ["innerHTML"];
  const _hoisted_7$5 = {
    class: "row",
    style: { "margin-left": "-0.75rem" }
  };
  const _hoisted_8$5 = { class: "col m6 s12" };
  const _hoisted_9$4 = { key: 0 };
  const _hoisted_10$4 = ["href", "title"];
  const _hoisted_11$4 = { key: 0 };
  const _hoisted_12$4 = /* @__PURE__ */ vue.createElementVNode("hr", null, null, -1);
  const _hoisted_13$4 = ["href"];
  const _hoisted_14$4 = /* @__PURE__ */ vue.createElementVNode("span", { class: "icon-edit" }, " ", -1);
  const _hoisted_15$4 = ["href"];
  const _hoisted_16$4 = /* @__PURE__ */ vue.createElementVNode("span", { class: "icon-add" }, " ", -1);
  const _hoisted_17$4 = { class: "col m6 s12" };
  const _hoisted_18$4 = { key: 0 };
  const _hoisted_19$4 = ["href", "title"];
  const _hoisted_20$4 = /* @__PURE__ */ vue.createElementVNode("hr", null, null, -1);
  const _hoisted_21$4 = ["href"];
  const _hoisted_22$4 = /* @__PURE__ */ vue.createElementVNode("span", { class: "icon-edit" }, " ", -1);
  const _hoisted_23$3 = ["href"];
  const _hoisted_24$3 = /* @__PURE__ */ vue.createElementVNode("span", { class: "icon-add" }, " ", -1);
  const _hoisted_25$3 = {
    class: "row",
    style: { "margin-left": "-0.75rem" }
  };
  const _hoisted_26$1 = { class: "col m6 s12" };
  const _hoisted_27$1 = ["href", "title"];
  const _hoisted_28$1 = { key: 0 };
  const _hoisted_29$1 = /* @__PURE__ */ vue.createElementVNode("hr", null, null, -1);
  const _hoisted_30$1 = ["href"];
  const _hoisted_31$1 = /* @__PURE__ */ vue.createElementVNode("span", { class: "icon-edit" }, " ", -1);
  const _hoisted_32$1 = ["href"];
  const _hoisted_33$1 = /* @__PURE__ */ vue.createElementVNode("span", { class: "icon-add" }, " ", -1);
  const _hoisted_34$1 = { class: "col m6 s12" };
  const _hoisted_35$1 = ["title", "href"];
  const _hoisted_36$1 = { key: 0 };
  const _hoisted_37$1 = /* @__PURE__ */ vue.createElementVNode("br", null, null, -1);
  const _hoisted_38$1 = ["title"];
  const _hoisted_39$1 = { key: 0 };
  const _hoisted_40$1 = /* @__PURE__ */ vue.createElementVNode("hr", null, null, -1);
  const _hoisted_41$1 = ["href"];
  const _hoisted_42$1 = /* @__PURE__ */ vue.createElementVNode("span", { class: "icon-edit" }, " ", -1);
  const _hoisted_43$1 = ["href"];
  const _hoisted_44$1 = /* @__PURE__ */ vue.createElementVNode("span", { class: "icon-add" }, " ", -1);
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    var _a2, _b2;
    const _component_ActivityIndicator = vue.resolveComponent("ActivityIndicator");
    const _component_EnrichedHeadline = vue.resolveComponent("EnrichedHeadline");
    const _component_ContentBlock = vue.resolveComponent("ContentBlock");
    const _directive_content_intro = vue.resolveDirective("content-intro");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$7, [
      vue.createVNode(_component_ActivityIndicator, { loading: _ctx.isLoading }, null, 8, ["loading"]),
      !_ctx.isLoading ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$7, [
        vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", null, [
          vue.createElementVNode("h2", null, [
            vue.createVNode(_component_EnrichedHeadline, {
              "feature-name": "Tag Manager",
              "inline-help": _ctx.dashboardHelpText
            }, {
              default: vue.withCtx(() => {
                var _a3;
                return [
                  vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_ContainerX", (_a3 = _ctx.container) == null ? void 0 : _a3.name)), 1)
                ];
              }),
              _: 1
            }, 8, ["inline-help"])
          ]),
          vue.createElementVNode("p", _hoisted_3$7, [
            vue.createTextVNode(vue.toDisplayString(_ctx.containerMetaInformation) + " ", 1),
            ((_a2 = _ctx.containerVersion) == null ? void 0 : _a2.description) ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_4$5, [
              _hoisted_5$5,
              vue.createTextVNode(" " + vue.toDisplayString(_ctx.translate("General_Description")) + ": " + vue.toDisplayString((_b2 = _ctx.containerVersion) == null ? void 0 : _b2.description), 1)
            ])) : vue.createCommentVNode("", true)
          ]),
          vue.createElementVNode("p", {
            innerHTML: _ctx.$sanitize(_ctx.containerDashboardDescription)
          }, null, 8, _hoisted_6$5)
        ])), [
          [_directive_content_intro]
        ]),
        vue.createElementVNode("div", _hoisted_7$5, [
          vue.createElementVNode("div", _hoisted_8$5, [
            vue.createVNode(_component_ContentBlock, {
              feature: _ctx.translate("TagManager_Tags"),
              "content-title": `${_ctx.tagCount} ${_ctx.translate("TagManager_Tags")}`,
              "help-text": _ctx.tagsHelpText,
              "edit-url": _ctx.linkTo("manageTags")
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("p", null, [
                  _ctx.tagCount ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_9$4, [
                    vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_Names")) + ": ", 1),
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.sortedContainerVersionTags, (tag, index) => {
                      return vue.openBlock(), vue.createElementBlock("span", { key: index }, [
                        vue.createElementVNode("a", {
                          href: _ctx.linkTo("manageTags", { idTag: tag.idtag }),
                          title: _ctx.translate(
                            "TagManager_EntityDateTypeMetaInformation",
                            tag.created_date_pretty,
                            tag.updated_date_pretty,
                            tag.type
                          )
                        }, vue.toDisplayString(tag.name), 9, _hoisted_10$4),
                        index !== _ctx.sortedContainerVersionTags.length - 1 ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_11$4, ", ")) : vue.createCommentVNode("", true)
                      ]);
                    }), 128))
                  ])) : vue.createCommentVNode("", true)
                ]),
                _hoisted_12$4,
                vue.createElementVNode("a", {
                  class: "btn-flat",
                  href: _ctx.linkTo("manageTags")
                }, [
                  _hoisted_14$4,
                  vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_EditTags")), 1)
                ], 8, _hoisted_13$4),
                vue.createElementVNode("a", {
                  class: "btn-flat",
                  href: _ctx.linkTo("manageTags", { idTag: 0 })
                }, [
                  _hoisted_16$4,
                  vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_CreateNewTag")), 1)
                ], 8, _hoisted_15$4)
              ]),
              _: 1
            }, 8, ["feature", "content-title", "help-text", "edit-url"])
          ]),
          vue.createElementVNode("div", _hoisted_17$4, [
            vue.createVNode(_component_ContentBlock, {
              feature: _ctx.translate("TagManager_Triggers"),
              "content-title": `${_ctx.triggerCount} ${_ctx.translate("TagManager_Triggers")}`,
              "help-text": _ctx.triggersHelpText,
              "edit-url": _ctx.linkTo("manageTriggers")
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("p", null, [
                  _ctx.triggerCount ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_18$4, [
                    vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_Names")) + ": ", 1),
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.sortedTriggers, (trigger, index) => {
                      return vue.openBlock(), vue.createElementBlock("span", { key: index }, [
                        vue.createElementVNode("a", {
                          href: _ctx.linkTo("manageTriggers", { idTrigger: trigger.idtrigger }),
                          title: _ctx.translate(
                            "TagManager_EntityDateTypeMetaInformation",
                            trigger.created_date_pretty,
                            trigger.updated_date_pretty,
                            trigger.type
                          )
                        }, vue.toDisplayString(trigger.name), 9, _hoisted_19$4),
                        vue.withDirectives(vue.createElementVNode("span", null, ", ", 512), [
                          [
                            vue.vShow,
                            index !== _ctx.sortedTriggers.length - 1
                          ]
                        ])
                      ]);
                    }), 128))
                  ])) : vue.createCommentVNode("", true)
                ]),
                _hoisted_20$4,
                vue.createElementVNode("a", {
                  class: "btn-flat",
                  href: _ctx.linkTo("manageTriggers")
                }, [
                  _hoisted_22$4,
                  vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_EditTriggers")), 1)
                ], 8, _hoisted_21$4),
                vue.createElementVNode("a", {
                  class: "btn-flat",
                  href: _ctx.linkTo("manageTriggers", { idTrigger: 0 })
                }, [
                  _hoisted_24$3,
                  vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_CreateNewTrigger")), 1)
                ], 8, _hoisted_23$3)
              ]),
              _: 1
            }, 8, ["feature", "content-title", "help-text", "edit-url"])
          ])
        ]),
        vue.createElementVNode("div", _hoisted_25$3, [
          vue.createElementVNode("div", _hoisted_26$1, [
            vue.createVNode(_component_ContentBlock, {
              feature: _ctx.translate("TagManager_Variables"),
              "content-title": `${_ctx.variableCount} ${_ctx.translate("TagManager_Variables")}`,
              "help-text": _ctx.variablesHelpText,
              "edit-url": _ctx.linkTo("manageVariables")
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("p", null, [
                  vue.withDirectives(vue.createElementVNode("span", null, [
                    vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_Names")) + ": ", 1),
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.sortedVariables, (variable, index) => {
                      return vue.openBlock(), vue.createElementBlock("span", { key: index }, [
                        vue.createElementVNode("a", {
                          href: _ctx.linkTo("manageVariables", { idVariable: variable.idvariable }),
                          title: _ctx.translate(
                            "TagManager_EntityDateTypeMetaInformation",
                            variable.created_date_pretty,
                            variable.updated_date_pretty,
                            variable.type
                          )
                        }, vue.toDisplayString(variable.name), 9, _hoisted_27$1),
                        index !== _ctx.sortedVariables.length - 1 ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_28$1, ", ")) : vue.createCommentVNode("", true)
                      ]);
                    }), 128))
                  ], 512), [
                    [vue.vShow, _ctx.variableCount]
                  ])
                ]),
                _hoisted_29$1,
                vue.createElementVNode("a", {
                  class: "btn-flat",
                  href: _ctx.linkTo("manageVariables")
                }, [
                  _hoisted_31$1,
                  vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_EditVariables")), 1)
                ], 8, _hoisted_30$1),
                vue.createElementVNode("a", {
                  class: "btn-flat",
                  href: _ctx.linkTo("manageVariables", { idVariable: 0 })
                }, [
                  _hoisted_33$1,
                  vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_CreateNewVariable")), 1)
                ], 8, _hoisted_32$1)
              ]),
              _: 1
            }, 8, ["feature", "content-title", "help-text", "edit-url"])
          ]),
          vue.createElementVNode("div", _hoisted_34$1, [
            vue.createVNode(_component_ContentBlock, {
              feature: _ctx.translate("TagManager_Versions"),
              "content-title": `${_ctx.versionCount} ${_ctx.translate("TagManager_Versions")}`,
              "help-text": _ctx.versionsHelpText,
              "edit-url": _ctx.linkTo("manageVersions")
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("p", null, [
                  vue.withDirectives(vue.createElementVNode("span", null, [
                    vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_LastVersions")) + ": ", 1),
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.lastVersions, (lastVersion, index) => {
                      return vue.openBlock(), vue.createElementBlock("span", { key: index }, [
                        vue.createElementVNode("a", {
                          title: _ctx.lastVersionLinkTitle(lastVersion),
                          href: _ctx.linkTo(
                            "manageVersions",
                            { idContainerVersion: lastVersion.idcontainerversion }
                          )
                        }, vue.toDisplayString(lastVersion.name), 9, _hoisted_35$1),
                        index !== _ctx.lastVersions.length - 1 ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_36$1, ", ")) : vue.createCommentVNode("", true)
                      ]);
                    }), 128))
                  ], 512), [
                    [vue.vShow, _ctx.lastVersions.length]
                  ]),
                  vue.withDirectives(vue.createElementVNode("span", null, [
                    _hoisted_37$1,
                    vue.createTextVNode(" " + vue.toDisplayString(_ctx.translate("TagManager_Environments")) + ": ", 1),
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.container.releases, (release, index) => {
                      return vue.openBlock(), vue.createElementBlock("span", { key: index }, [
                        vue.createElementVNode("span", {
                          title: _ctx.releaseTooltip(release)
                        }, vue.toDisplayString(_ctx.ucfirst(release.environment)), 9, _hoisted_38$1),
                        index !== _ctx.container.releases.length - 1 ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_39$1, ", ")) : vue.createCommentVNode("", true)
                      ]);
                    }), 128))
                  ], 512), [
                    [vue.vShow, _ctx.container.releases.length]
                  ])
                ]),
                _hoisted_40$1,
                vue.createElementVNode("a", {
                  class: "btn-flat",
                  href: _ctx.linkTo("manageVersions")
                }, [
                  _hoisted_42$1,
                  vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_EditVersions")), 1)
                ], 8, _hoisted_41$1),
                vue.createElementVNode("a", {
                  class: "btn-flat",
                  href: _ctx.linkTo("manageVersions", { idContainerVersion: 0 })
                }, [
                  _hoisted_44$1,
                  vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_CreateNewVersion")), 1)
                ], 8, _hoisted_43$1)
              ]),
              _: 1
            }, 8, ["feature", "content-title", "help-text", "edit-url"])
          ])
        ])
      ])) : vue.createCommentVNode("", true)
    ]);
  }
  const ContainerDashboard = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);
  const { tagManagerHelper } = window;
  const _sfc_main$6 = vue.defineComponent({
    props: {
      containerName: String
    },
    components: {
      ActivityIndicator: CoreHome.ActivityIndicator
    },
    directives: {
      FocusAnywhereButHere: CoreHome.FocusAnywhereButHere,
      Tooltips: CoreHome.Tooltips
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
        CoreHome.AjaxHelper.fetch({
          method: "TagManager.getContainers"
        }).then((containers) => {
          this.containers = containers;
        }).finally(() => {
          this.isLoading = false;
        });
      },
      linkTo(idContainer) {
        let action = CoreHome.MatomoUrl.urlParsed.value.action;
        if (!action || action === "manageContainers") {
          action = this.hasWriteAccess ? "dashboard" : "manageTags";
        }
        const newQuery = CoreHome.MatomoUrl.stringify(__spreadProps(__spreadValues({}, CoreHome.MatomoUrl.urlParsed.value), {
          idContainer,
          action
        }));
        return `${window.location.pathname}?${newQuery}`;
      },
      onBlur() {
        this.showContainerList = false;
      },
      truncateText(text, length) {
        return tagManagerHelper.truncateText(text, length);
      },
      htmlEntities(v) {
        return CoreHome.Matomo.helper.htmlEntities(v);
      }
    },
    computed: {
      actualContainerName() {
        if (this.containerName) {
          return CoreHome.translate("TagManager_ContainerX", this.containerName);
        }
        return CoreHome.translate("TagManager_ChooseContainer");
      },
      hasWriteAccess() {
        return CoreHome.Matomo.hasUserCapability("tagmanager_write");
      }
    }
  });
  const _hoisted_1$6 = ["title"];
  const _hoisted_2$6 = { class: "title" };
  const _hoisted_3$6 = /* @__PURE__ */ vue.createElementVNode("span", { class: "icon icon-chevron-down" }, " ", -1);
  const _hoisted_4$4 = { class: "dropdown positionInViewport" };
  const _hoisted_5$4 = { class: "custom_select_container" };
  const _hoisted_6$4 = { class: "custom_select_ul_list" };
  const _hoisted_7$4 = ["title"];
  const _hoisted_8$4 = ["href"];
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_ActivityIndicator = vue.resolveComponent("ActivityIndicator");
    const _directive_focus_anywhere_but_here = vue.resolveDirective("focus-anywhere-but-here");
    const _directive_tooltips = vue.resolveDirective("tooltips");
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(["tagContainerSelector piwikSelector borderedControl", { expanded: _ctx.showContainerList }]),
      onClick: _cache[1] || (_cache[1] = ($event) => {
        _ctx.fetchContainers();
        _ctx.showContainerList = !_ctx.showContainerList;
      }),
      title: _ctx.translate("TagManager_ChooseContainer")
    }, [
      vue.createElementVNode("a", _hoisted_2$6, [
        vue.createTextVNode(vue.toDisplayString(_ctx.truncateText(_ctx.actualContainerName, 50)), 1),
        _hoisted_3$6
      ]),
      vue.withDirectives(vue.createElementVNode("div", _hoisted_4$4, [
        vue.createVNode(_component_ActivityIndicator, { loading: _ctx.isLoading }, null, 8, ["loading"]),
        vue.createElementVNode("div", _hoisted_5$4, [
          vue.createElementVNode("ul", _hoisted_6$4, [
            vue.withDirectives(vue.createElementVNode("li", null, [
              vue.createElementVNode("a", {
                tabindex: "-1",
                onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
                }, ["prevent", "stop"]))
              }, vue.toDisplayString(_ctx.translate("TagManager_NoContainersFound")), 1)
            ], 512), [
              [vue.vShow, !_ctx.isLoading && _ctx.containers.length === 0]
            ]),
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.containers, (containerEntry) => {
              return vue.openBlock(), vue.createElementBlock("li", {
                title: this.htmlEntities(`${containerEntry.name} (${containerEntry.idcontainer})`),
                key: containerEntry.idcontainer
              }, [
                vue.createElementVNode("a", {
                  href: _ctx.linkTo(containerEntry.idcontainer)
                }, vue.toDisplayString(containerEntry.name) + " (" + vue.toDisplayString(containerEntry.idcontainer) + ") ", 9, _hoisted_8$4)
              ], 8, _hoisted_7$4);
            }), 128))
          ])
        ])
      ], 512), [
        [vue.vShow, _ctx.showContainerList]
      ])
    ], 10, _hoisted_1$6)), [
      [_directive_focus_anywhere_but_here, { blur: _ctx.onBlur }],
      [_directive_tooltips]
    ]);
  }
  const ContainerSelector = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
  const { $: $$1 } = window;
  const _sfc_main$5 = vue.defineComponent({
    props: {
      idContainer: {
        type: String,
        required: true
      }
    },
    components: {
      ContentBlock: CoreHome.ContentBlock,
      Field: CorePluginsAdmin.Field,
      ActivityIndicator: CoreHome.ActivityIndicator
    },
    directives: {
      SelectOnFocus: CoreHome.SelectOnFocus,
      ContentTable: CoreHome.ContentTable,
      CopyToClipboard: CoreHome.CopyToClipboard
    },
    data() {
      return {
        container: null,
        environments: [],
        environment: "live",
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
        return CoreHome.AjaxHelper.fetch({
          method: "TagManager.getContainerInstallInstructions",
          filter_limit: "-1",
          idContainer: this.idContainer,
          environment
        }).then((instructions) => {
          this.installInstructions = instructions;
          vue.nextTick(() => {
            const codeblocks = Array.isArray(this.$refs.codeblock) ? this.$refs.codeblock : [this.$refs.codeblock];
            codeblocks.forEach((n) => {
              $$1(n).effect("highlight", {}, 1500);
            });
          });
        }).finally(() => {
          this.isLoadingInstructions = false;
        });
      },
      fetchReleases() {
        return CoreHome.AjaxHelper.fetch([
          {
            method: "TagManager.getAvailableEnvironments",
            filter_limit: "-1"
          },
          {
            method: "TagManager.getContainer",
            idContainer: this.idContainer,
            filter_limit: "-1"
          }
        ]).then(([environments, container]) => {
          var _a2, _b2;
          this.environments = environments.map((e) => ({ key: e.id, value: e.name }));
          this.container = container;
          const hasLive = container.releases.some((r) => r.environment === "live");
          if (!hasLive && ((_b2 = (_a2 = this.environments) == null ? void 0 : _a2[0]) == null ? void 0 : _b2.key)) {
            this.environment = this.environments[0].key;
          } else if (!hasLive) {
            this.environment = "";
          }
          if (this.environment) {
            return this.fetchInstallInstructions(this.environment);
          }
          return void 0;
        });
      },
      ucfirst(s) {
        return `${s.substr(0, 1).toUpperCase()}${s.substr(1)}`;
      }
    },
    computed: {
      releaseVersions() {
        var _a2;
        const result = {};
        (((_a2 = this.container) == null ? void 0 : _a2.releases) || []).forEach((r) => {
          result[r.idcontainerrelease] = this.container.versions.find(
            (v) => v.idcontainerversion === r.idcontainerversion
          );
        });
        return result;
      },
      sortedReleases() {
        var _a2;
        const sorted = [...(((_a2 = this.container) == null ? void 0 : _a2.releases) || []).map((r, i) => __spreadProps(__spreadValues({}, r), { index: i }))];
        sorted.sort((lhs, rhs) => {
          if (lhs.release_date < rhs.release_date) {
            return 1;
          }
          if (lhs.release_date > rhs.release_date) {
            return -1;
          }
          return rhs.index - lhs.index;
        });
        return sorted;
      }
    }
  });
  const _hoisted_1$5 = { style: { "margin-left": "-0.75rem" } };
  const _hoisted_2$5 = /* @__PURE__ */ vue.createElementVNode("br", null, null, -1);
  const _hoisted_3$5 = ["href"];
  const _hoisted_4$3 = ["textContent"];
  const _hoisted_5$3 = { style: { "margin-top": "1rem" } };
  const _hoisted_6$3 = ["innerHTML"];
  const _hoisted_7$3 = /* @__PURE__ */ vue.createElementVNode("br", null, null, -1);
  const _hoisted_8$3 = ["href"];
  const _hoisted_9$3 = { class: "environment" };
  const _hoisted_10$3 = { class: "name" };
  const _hoisted_11$3 = { class: "name" };
  const _hoisted_12$3 = { class: "released_by" };
  const _hoisted_13$3 = { class: "released_on" };
  const _hoisted_14$3 = { key: 0 };
  const _hoisted_15$3 = { colspan: "7" };
  const _hoisted_16$3 = { class: "loadingPiwik" };
  const _hoisted_17$3 = /* @__PURE__ */ vue.createElementVNode("img", { src: "plugins/Morpheus/images/loading-blue.gif" }, null, -1);
  const _hoisted_18$3 = { key: 1 };
  const _hoisted_19$3 = { colspan: "7" };
  const _hoisted_20$3 = { class: "environment" };
  const _hoisted_21$3 = { class: "name" };
  const _hoisted_22$3 = { class: "revision" };
  const _hoisted_23$2 = { class: "released_by" };
  const _hoisted_24$2 = { class: "released_on" };
  const _hoisted_25$2 = { class: "date" };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Field = vue.resolveComponent("Field");
    const _component_ActivityIndicator = vue.resolveComponent("ActivityIndicator");
    const _component_ContentBlock = vue.resolveComponent("ContentBlock");
    const _directive_copy_to_clipboard = vue.resolveDirective("copy-to-clipboard");
    const _directive_content_table = vue.resolveDirective("content-table");
    return vue.openBlock(), vue.createBlock(_component_ContentBlock, {
      class: "manageInstallTagCode",
      feature: "Tag Manager",
      "content-title": "Install Code"
    }, {
      default: vue.withCtx(() => {
        var _a2, _b2;
        return [
          vue.createElementVNode("div", _hoisted_1$5, [
            vue.createVNode(_component_Field, {
              uicontrol: "select",
              name: "environment",
              "model-value": _ctx.environment,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => {
                _ctx.environment = $event;
                _ctx.fetchInstallInstructions(_ctx.environment);
              }),
              options: _ctx.environments,
              title: _ctx.translate("TagManager_Environment")
            }, null, 8, ["model-value", "options", "title"])
          ]),
          vue.createVNode(_component_ActivityIndicator, { loading: _ctx.isLoading }, null, 8, ["loading"]),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.installInstructions, (installInstruction, index) => {
            return vue.openBlock(), vue.createElementBlock("div", { key: index }, [
              vue.createElementVNode("p", null, [
                vue.createTextVNode(vue.toDisplayString(installInstruction.description) + " ", 1),
                _hoisted_2$5,
                installInstruction.helpUrl ? (vue.openBlock(), vue.createElementBlock("a", {
                  key: 0,
                  target: "_blank",
                  href: installInstruction.helpUrl
                }, vue.toDisplayString(_ctx.translate("TagManager_LearnMore")), 9, _hoisted_3$5)) : vue.createCommentVNode("", true)
              ]),
              vue.createElementVNode("div", null, [
                installInstruction.embedCode ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("pre", {
                  key: 0,
                  textContent: vue.toDisplayString(installInstruction.embedCode)
                }, null, 8, _hoisted_4$3)), [
                  [_directive_copy_to_clipboard, {}]
                ]) : vue.createCommentVNode("", true)
              ])
            ]);
          }), 128)),
          vue.createElementVNode("p", null, vue.toDisplayString(_ctx.translate("TagManager_InstallCodePublishEnvironmentNote", "preview")) + " " + vue.toDisplayString(_ctx.translate("TagManager_ConfigureEnvironmentsSuperUser")), 1),
          vue.createElementVNode("p", _hoisted_5$3, [
            vue.createElementVNode("span", {
              innerHTML: _ctx.$sanitize(_ctx.translate(
                "TagManager_InstallCodeDataLayerNote",
                "<strong>",
                "</strong>"
              ))
            }, null, 8, _hoisted_6$3),
            _hoisted_7$3,
            vue.createElementVNode("a", {
              target: "_blank",
              href: _ctx.externalRawLink("https://matomo.org/faq/tag-manager/data-layer-in-matomo-tag-manager/")
            }, vue.toDisplayString(_ctx.translate("TagManager_LearnMore")), 9, _hoisted_8$3)
          ]),
          vue.createElementVNode("h2", null, vue.toDisplayString(_ctx.translate("TagManager_ReleasesOverview")), 1),
          vue.withDirectives((vue.openBlock(), vue.createElementBlock("table", null, [
            vue.createElementVNode("thead", null, [
              vue.createElementVNode("tr", null, [
                vue.createElementVNode("th", _hoisted_9$3, vue.toDisplayString(_ctx.translate("TagManager_Environment")), 1),
                vue.createElementVNode("th", _hoisted_10$3, vue.toDisplayString(_ctx.translate("TagManager_VersionName")), 1),
                vue.createElementVNode("th", _hoisted_11$3, vue.toDisplayString(_ctx.translate("TagManager_VersionRevision")), 1),
                vue.createElementVNode("th", _hoisted_12$3, vue.toDisplayString(_ctx.translate("TagManager_ReleasedBy")), 1),
                vue.createElementVNode("th", _hoisted_13$3, vue.toDisplayString(_ctx.translate("TagManager_ReleasedOn")), 1)
              ])
            ]),
            vue.createElementVNode("tbody", null, [
              _ctx.isLoading ? (vue.openBlock(), vue.createElementBlock("tr", _hoisted_14$3, [
                vue.createElementVNode("td", _hoisted_15$3, [
                  vue.createElementVNode("span", _hoisted_16$3, [
                    _hoisted_17$3,
                    vue.createTextVNode(" " + vue.toDisplayString(_ctx.translate("General_LoadingData")), 1)
                  ])
                ])
              ])) : vue.createCommentVNode("", true),
              !_ctx.isLoading && ((_b2 = (_a2 = _ctx.container) == null ? void 0 : _a2.releases) == null ? void 0 : _b2.length) === 0 ? (vue.openBlock(), vue.createElementBlock("tr", _hoisted_18$3, [
                vue.createElementVNode("td", _hoisted_19$3, vue.toDisplayString(_ctx.translate("TagManager_NoReleasesFound")), 1)
              ])) : vue.createCommentVNode("", true),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.sortedReleases, (release) => {
                var _a3, _b3;
                return vue.openBlock(), vue.createElementBlock("tr", {
                  key: release.idcontainerrelease
                }, [
                  vue.createElementVNode("td", _hoisted_20$3, vue.toDisplayString(_ctx.ucfirst(release.environment)), 1),
                  vue.createElementVNode("td", _hoisted_21$3, vue.toDisplayString((_a3 = _ctx.releaseVersions[release.idcontainerrelease]) == null ? void 0 : _a3.name), 1),
                  vue.createElementVNode("td", _hoisted_22$3, vue.toDisplayString((_b3 = _ctx.releaseVersions[release.idcontainerrelease]) == null ? void 0 : _b3.revision), 1),
                  vue.createElementVNode("td", _hoisted_23$2, vue.toDisplayString(release.release_login), 1),
                  vue.createElementVNode("td", _hoisted_24$2, [
                    vue.createElementVNode("span", _hoisted_25$2, vue.toDisplayString(release.release_date_pretty), 1)
                  ])
                ]);
              }), 128))
            ])
          ])), [
            [_directive_content_table]
          ])
        ];
      }),
      _: 1
    });
  }
  const ManageInstallTagCode = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
  function ucfirst(s) {
    return `${s.substr(0, 1).toUpperCase()}${s.substr(1)}`;
  }
  const _sfc_main$4 = vue.defineComponent({
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
      ActivityIndicator: CoreHome.ActivityIndicator,
      SiteSelector: CoreHome.SiteSelector,
      Field: CorePluginsAdmin.Field
    },
    emits: ["fetchInstallInstructions"],
    directives: {
      CopyToClipboard: CoreHome.CopyToClipboard
    },
    data() {
      return {
        containerVariables: [],
        isLoading: false,
        idContainer: "",
        environment: "",
        environments: [],
        environmentNameMap: {},
        containerMap: {},
        containerOptions: [],
        site: {
          id: CoreHome.Matomo.idSite,
          name: CoreHome.Matomo.helper.htmlDecode(CoreHome.Matomo.siteName)
        },
        matomoConfigs: [],
        releases: [],
        installInstructions: [],
        noReleaseFound: false,
        isAdvancedDisplayed: false
      };
    },
    created() {
      CoreHome.AjaxHelper.fetch({
        method: "TagManager.getAvailableEnvironments",
        filter_limit: "-1"
      }).then((environments) => {
        let entities;
        if (Array.isArray(environments)) {
          entities = environments;
        } else {
          entities = Object.values(environments);
        }
        this.environmentNameMap = Object.fromEntries(entities.map(({ id, name }) => [id, name]));
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
        var _a2;
        this.installInstructions = [];
        this.containerOptions = [];
        this.containerMap = {};
        this.environments = [];
        this.matomoConfigs = [];
        this.idContainer = "";
        if (!((_a2 = this.site) == null ? void 0 : _a2.id)) {
          return;
        }
        this.isLoading = true;
        CoreHome.AjaxHelper.fetch({
          method: "TagManager.getContainers",
          filter_limit: "-1",
          idSite: this.site.id
        }).then((containers) => {
          this.containerOptions = [];
          if (!(containers == null ? void 0 : containers.length)) {
            this.idContainer = "";
            this.isAdvancedDisplayed = true;
            this.containerOptions.push({
              key: "",
              value: this.translate("TagManager_NoContainersFound")
            });
            return;
          }
          containers.forEach((container) => {
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
        this.environment = "";
        this.environments = [];
        const releases = container.releases || [];
        if (releases.find((r) => r.environment === "live")) {
          this.environment = "live";
        }
        releases.forEach((release) => {
          if (release.environment === "preview") {
            return;
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
            key: "",
            value: this.translate("TagManager_NoReleasesFound")
          });
        }
        this.$emit("fetchInstallInstructions");
        this.fetchVariables(draftVersion);
      },
      linkTo(action, idSite, idContainer, hash) {
        const newQuery = CoreHome.MatomoUrl.stringify(__spreadProps(__spreadValues({}, CoreHome.MatomoUrl.urlParsed.value), {
          module: "TagManager",
          action,
          idSite,
          idContainer
        }));
        let newUrl = `${window.location.pathname}?${newQuery}`;
        if (hash) {
          newUrl += `#?${CoreHome.MatomoUrl.stringify(hash)}`;
        }
        return newUrl;
      },
      fetchVariables(containerDraftVersion) {
        var _a2;
        this.matomoConfigs = [];
        if (!this.idContainer || !((_a2 = this.site) == null ? void 0 : _a2.id) || !containerDraftVersion) {
          return;
        }
        CoreHome.AjaxHelper.fetch({
          method: "TagManager.getContainerVariables",
          filter_limit: "-1",
          idContainer: this.idContainer,
          idContainerVersion: containerDraftVersion,
          idSite: this.site.id
        }).then((variables) => {
          this.matomoConfigs = variables.filter((v) => v.type === "MatomoConfiguration");
        }).finally(() => {
          this.isLoading = false;
        });
      }
    },
    computed: {
      getLearnMoreLink() {
        return CoreHome.translate(
          "TagManager_CustomHtmlTagHelpText",
          CoreHome.externalLink("https://matomo.org/faq/tag-manager/container-dashboard-in-matomo-tag-manager/"),
          "</a>"
        );
      },
      getMtmStep3() {
        return CoreHome.translate(
          "TagManager_CopyCodePasteInHeader",
          "&lt;/head&gt;"
        );
      },
      getCongratulationsText() {
        return CoreHome.translate(
          "TagManager_SiteWithoutDataReactFollowStepCompleted",
          "<strong>",
          "</strong>"
        );
      },
      testComponent() {
        if (this.showTestSection) {
          return CoreHome.useExternalPluginComponent("JsTrackerInstallCheck", "JsTrackerInstallCheck");
        }
        return "";
      },
      getAdvancedStepText() {
        var _a2;
        const stepText = CoreHome.translate("TagManager_SelectContainerForWebsite", "<strong>", "</strong>");
        if (this.idContainer) {
          return stepText;
        }
        const manageContainerURL = this.linkTo("manageContainers", String((_a2 = this.site) == null ? void 0 : _a2.id), "");
        const manageContainersText = CoreHome.translate(
          "TagManager_ManageContainersLink",
          `<a href="${manageContainerURL}" target="_blank" rel="noreferrer noopener">`,
          "</a>"
        );
        return `${stepText} ${manageContainersText}`;
      },
      getAdvancedStepInfo() {
        const idSite = this.site && this.site.id ? this.site.id : "";
        const link = this.linkTo("dashboard", idSite, this.idContainer, []);
        return CoreHome.translate(
          "TagManager_CustomiseContainer",
          `<a href="${link}">`,
          "</a>",
          CoreHome.externalLink("https://matomo.org/faq/tag-manager/container-dashboard-in-matomo-tag-manager/"),
          "</a>"
        );
      }
    }
  });
  const _hoisted_1$4 = { class: "tagManagerTrackingCode" };
  const _hoisted_2$4 = { key: 0 };
  const _hoisted_3$4 = { class: "trackingCodeAdvancedOptions" };
  const _hoisted_4$2 = { class: "advance-option" };
  const _hoisted_5$2 = /* @__PURE__ */ vue.createElementVNode("span", { class: "icon-chevron-down" }, null, -1);
  const _hoisted_6$2 = /* @__PURE__ */ vue.createElementVNode("span", { class: "icon-chevron-up" }, null, -1);
  const _hoisted_7$2 = { id: "mtm-advanced-options" };
  const _hoisted_8$2 = ["innerHTML"];
  const _hoisted_9$2 = {
    key: 1,
    class: "row"
  };
  const _hoisted_10$2 = { class: "col s12 m4" };
  const _hoisted_11$2 = { class: "form-group row" };
  const _hoisted_12$2 = { class: "col s12 input-field" };
  const _hoisted_13$2 = {
    for: "tagManagerTrackingCodeSite",
    class: "siteSelectorLabel"
  };
  const _hoisted_14$2 = { class: "sites_autocomplete" };
  const _hoisted_15$2 = { class: "col s12 m4" };
  const _hoisted_16$2 = { class: "col s12 m4" };
  const _hoisted_17$2 = ["innerHTML"];
  const _hoisted_18$2 = {
    key: 1,
    class: "alert alert-info"
  };
  const _hoisted_19$2 = { href: "" };
  const _hoisted_20$2 = { key: 0 };
  const _hoisted_21$2 = ["href"];
  const _hoisted_22$2 = ["innerHTML"];
  const _hoisted_23$1 = ["textContent"];
  const _hoisted_24$1 = ["innerHTML"];
  const _hoisted_25$1 = { key: 1 };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_ActivityIndicator = vue.resolveComponent("ActivityIndicator");
    const _component_SiteSelector = vue.resolveComponent("SiteSelector");
    const _component_Field = vue.resolveComponent("Field");
    const _directive_copy_to_clipboard = vue.resolveDirective("copy-to-clipboard");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$4, [
      _ctx.showContainerRow ? (vue.openBlock(), vue.createElementBlock("li", _hoisted_2$4, [
        vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_OptionallyCustomiseContainer")) + " ", 1),
        vue.createElementVNode("div", _hoisted_3$4, [
          vue.createElementVNode("div", _hoisted_4$2, [
            vue.createElementVNode("span", null, [
              !_ctx.isAdvancedDisplayed ? (vue.openBlock(), vue.createElementBlock("a", {
                key: 0,
                href: "javascript:;",
                onClick: _cache[0] || (_cache[0] = vue.withModifiers(($event) => _ctx.isAdvancedDisplayed = true, ["prevent"]))
              }, [
                vue.createTextVNode(vue.toDisplayString(_ctx.translate("CoreAdminHome_ShowAdvancedOptions")) + " ", 1),
                _hoisted_5$2
              ])) : vue.createCommentVNode("", true),
              _ctx.isAdvancedDisplayed ? (vue.openBlock(), vue.createElementBlock("a", {
                key: 1,
                href: "javascript:;",
                onClick: _cache[1] || (_cache[1] = vue.withModifiers(($event) => _ctx.isAdvancedDisplayed = false, ["prevent"]))
              }, [
                vue.createTextVNode(vue.toDisplayString(_ctx.translate("CoreAdminHome_HideAdvancedOptions")) + " ", 1),
                _hoisted_6$2
              ])) : vue.createCommentVNode("", true)
            ])
          ]),
          vue.withDirectives(vue.createElementVNode("div", _hoisted_7$2, [
            vue.createElementVNode("ul", null, [
              vue.createElementVNode("li", {
                innerHTML: _ctx.$sanitize(_ctx.getAdvancedStepText)
              }, null, 8, _hoisted_8$2),
              _ctx.showContainerRow || _ctx.environments.length > 1 ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_ActivityIndicator, {
                key: 0,
                loading: true
              }, null, 512)), [
                [vue.vShow, _ctx.isLoading]
              ]) : vue.createCommentVNode("", true),
              _ctx.showContainerRow || _ctx.environments.length > 1 ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", _hoisted_9$2, [
                vue.createElementVNode("div", _hoisted_10$2, [
                  vue.createElementVNode("div", _hoisted_11$2, [
                    vue.createElementVNode("div", _hoisted_12$2, [
                      vue.createElementVNode("label", _hoisted_13$2, vue.toDisplayString(_ctx.translate("General_Website")), 1),
                      vue.createElementVNode("div", _hoisted_14$2, [
                        vue.createVNode(_component_SiteSelector, {
                          id: "tagManagerTrackingCodeSite",
                          modelValue: _ctx.site,
                          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.site = $event),
                          "show-all-sites-item": false,
                          "switch-site-on-select": false,
                          "show-selected-site": true
                        }, null, 8, ["modelValue"])
                      ])
                    ])
                  ])
                ]),
                vue.createElementVNode("div", _hoisted_15$2, [
                  vue.createElementVNode("div", null, [
                    vue.createVNode(_component_Field, {
                      uicontrol: "select",
                      name: "containers",
                      "model-value": _ctx.idContainer,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => {
                        _ctx.idContainer = $event;
                        _ctx.onContainerChange();
                      }),
                      options: _ctx.containerOptions,
                      disabled: _ctx.containerOptions.length <= 1,
                      "full-width": true,
                      title: _ctx.translate("TagManager_Container")
                    }, null, 8, ["model-value", "options", "disabled", "title"])
                  ])
                ]),
                vue.createElementVNode("div", _hoisted_16$2, [
                  vue.createElementVNode("div", null, [
                    vue.createVNode(_component_Field, {
                      uicontrol: "select",
                      name: "environment",
                      "model-value": _ctx.environment,
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => {
                        _ctx.environment = $event;
                        this.$emit("fetchInstallInstructions");
                      }),
                      options: _ctx.environments,
                      disabled: _ctx.environments.length <= 1,
                      "full-width": true,
                      title: _ctx.translate("TagManager_Environment")
                    }, null, 8, ["model-value", "options", "disabled", "title"])
                  ])
                ])
              ], 512)), [
                [vue.vShow, !_ctx.isLoading]
              ]) : vue.createCommentVNode("", true),
              _ctx.idContainer ? (vue.openBlock(), vue.createElementBlock("li", {
                key: 2,
                innerHTML: _ctx.$sanitize(_ctx.getAdvancedStepInfo)
              }, null, 8, _hoisted_17$2)) : vue.createCommentVNode("", true)
            ])
          ], 512), [
            [vue.vShow, _ctx.isAdvancedDisplayed]
          ])
        ])
      ])) : vue.createCommentVNode("", true),
      _ctx.idContainer && _ctx.noReleaseFound ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_18$2, [
        vue.createTextVNode(vue.toDisplayString(_ctx.translate("TagManager_NoReleasesFoundForContainer")) + " ", 1),
        vue.createElementVNode("a", _hoisted_19$2, vue.toDisplayString(_ctx.translate("TagManager_PublishVersionToEnvironmentToViewEmbedCode")), 1)
      ])) : vue.createCommentVNode("", true),
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.installInstructions, (installInstruction, index) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: index }, [
          _ctx.showDescription ? (vue.openBlock(), vue.createElementBlock("p", _hoisted_20$2, [
            vue.createTextVNode(vue.toDisplayString(installInstruction.description) + " ", 1),
            installInstruction.helpUrl ? (vue.openBlock(), vue.createElementBlock("a", {
              key: 0,
              target: "_blank",
              href: installInstruction.helpUrl
            }, vue.toDisplayString(_ctx.translate("TagManager_LearnMore")), 9, _hoisted_21$2)) : vue.createCommentVNode("", true),
            vue.createTextVNode(". ")
          ])) : vue.createCommentVNode("", true),
          _ctx.showPlainMtmSteps ? (vue.openBlock(), vue.createElementBlock("li", {
            key: 1,
            innerHTML: _ctx.$sanitize(_ctx.getMtmStep3)
          }, null, 8, _hoisted_22$2)) : vue.createCommentVNode("", true),
          vue.createElementVNode("div", null, [
            vue.withDirectives(vue.createElementVNode("pre", {
              class: "codeblock",
              textContent: vue.toDisplayString(installInstruction.embedCode),
              ref_for: true,
              ref: "codeblock"
            }, null, 8, _hoisted_23$1), [
              [_directive_copy_to_clipboard, {}]
            ])
          ])
        ], 64);
      }), 128)),
      _ctx.showBottom && !_ctx.noReleaseFound && _ctx.idContainer ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 2 }, [
        !_ctx.showTestSection ? (vue.openBlock(), vue.createElementBlock("p", {
          key: 0,
          innerHTML: _ctx.$sanitize(_ctx.getCongratulationsText)
        }, null, 8, _hoisted_24$1)) : (vue.openBlock(), vue.createElementBlock("li", _hoisted_25$1, [
          (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.testComponent), { site: _ctx.site }, null, 8, ["site"]))
        ]))
      ], 64)) : vue.createCommentVNode("", true)
    ]);
  }
  const TrackingCodeCommon = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
  const _sfc_main$3 = vue.defineComponent({
    props: {
      currentAction: String,
      showContainerRow: Boolean,
      isJsTrackerInstallCheckAvailable: Boolean
    },
    components: {
      ContentBlock: CoreHome.ContentBlock,
      TrackingCodeCommon
    },
    methods: {
      fetchInstallInstructions() {
        var _a2, _b2;
        const refs = this.$refs.trackingCodeCommon;
        refs.installInstructions = [];
        if (!((_a2 = refs == null ? void 0 : refs.site) == null ? void 0 : _a2.id) || !(refs == null ? void 0 : refs.environment)) {
          return;
        }
        refs.isLoading = true;
        CoreHome.AjaxHelper.fetch({
          method: "TagManager.getContainerInstallInstructions",
          filter_limit: "-1",
          idContainer: refs == null ? void 0 : refs.idContainer,
          environment: refs == null ? void 0 : refs.environment,
          idSite: (_b2 = refs == null ? void 0 : refs.site) == null ? void 0 : _b2.id
        }).then((instructions) => {
          refs.installInstructions = instructions;
          vue.nextTick(() => {
            const codeblocks = Array.isArray(this.$refs.codeblock) ? this.$refs.codeblock : [this.$refs.codeblock];
            codeblocks.forEach((n) => {
              $(n).effect("highlight", {}, 1500);
            });
          });
        }).finally(() => {
          refs.isLoading = false;
        });
      }
    }
  });
  const _hoisted_1$3 = /* @__PURE__ */ vue.createElementVNode("br", null, null, -1);
  const _hoisted_2$3 = { class: "followStepsHeading" };
  const _hoisted_3$3 = { style: { "list-style": "inside decimal" } };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_TrackingCodeCommon = vue.resolveComponent("TrackingCodeCommon");
    return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.currentAction === "getTrackingMethodsForSite" ? "div" : "ContentBlock"), {
      anchor: "tagmanager",
      "content-title": _ctx.translate("TagManager_MatomoTagManager")
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode("p", null, vue.toDisplayString(_ctx.translate("TagManager_MtmTrackingCodeIntro")), 1),
        _hoisted_1$3,
        vue.createElementVNode("p", _hoisted_2$3, [
          vue.createElementVNode("strong", null, vue.toDisplayString(_ctx.translate("SitesManager_SiteWithoutDataCloudflareFollowStepsIntro")), 1)
        ]),
        vue.createElementVNode("ol", _hoisted_3$3, [
          vue.createVNode(_component_TrackingCodeCommon, {
            "show-container-row": _ctx.showContainerRow,
            showBottom: true,
            showDescription: false,
            showPlainMtmSteps: true,
            showAdvancedOptions: _ctx.currentAction === "trackingCodeGenerator",
            showTestSection: _ctx.currentAction === "getTrackingMethodsForSite" && _ctx.isJsTrackerInstallCheckAvailable,
            onFetchInstallInstructions: _ctx.fetchInstallInstructions,
            ref: "trackingCodeCommon"
          }, null, 8, ["show-container-row", "showAdvancedOptions", "showTestSection", "onFetchInstallInstructions"])
        ])
      ]),
      _: 1
    }, 8, ["content-title"]);
  }
  const TrackingCodePage = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
  const _sfc_main$2 = vue.defineComponent({
    props: {
      showContainerRow: Boolean,
      jsFramework: String
    },
    components: {
      TrackingCodeCommon
    },
    directives: {
      CopyToClipboard: CoreHome.CopyToClipboard
    },
    data() {
      return {
        setupStep1: "",
        setupStep2: "",
        setupStep7: "",
        installInstructions: []
      };
    },
    methods: {
      fetchInstallInstructionsSPA() {
        var _a2, _b2;
        const refs = this.$refs.trackingCodeCommon;
        this.installInstructions = [];
        if (!(refs == null ? void 0 : refs.idContainer) || !(refs == null ? void 0 : refs.environment) || !((_a2 = refs == null ? void 0 : refs.site) == null ? void 0 : _a2.id)) {
          return;
        }
        const manageContainerURL = this.linkTo("manageContainers", refs.site.id, refs.idContainer);
        this.setupStep1 = CoreHome.translate(
          "TagManager_SPAFollowStep1",
          "<br><strong>",
          "</strong>",
          `<a href="${manageContainerURL}" target="_blank" rel="noreferrer noopener">`,
          "</a>"
        );
        const triggersUrl = this.linkTo("manageTriggers", refs.site.id, refs.idContainer);
        this.setupStep2 = CoreHome.translate(
          "TagManager_SPAFollowStep2",
          `<a href="${triggersUrl}" target="_blank" rel="noreferrer noopener">`,
          "</a>"
        );
        const tagsURL = this.linkTo("manageTags", refs.site.id, refs.idContainer);
        this.setupStep7 = CoreHome.translate(
          "TagManager_SPAFollowStep7",
          `<a href="${tagsURL}" target="_blank" rel="noreferrer noopener">`,
          "</a>"
        );
        refs.isLoading = true;
        CoreHome.AjaxHelper.fetch({
          method: "TagManager.getContainerInstallInstructions",
          filter_limit: "-1",
          idContainer: refs == null ? void 0 : refs.idContainer,
          environment: refs == null ? void 0 : refs.environment,
          idSite: (_b2 = refs == null ? void 0 : refs.site) == null ? void 0 : _b2.id,
          jsFramework: this.jsFramework
        }).then((instructions) => {
          this.installInstructions = instructions;
          vue.nextTick(() => {
            const codeblocks = Array.isArray(this.$refs.codeblock) ? this.$refs.codeblock : [this.$refs.codeblock];
            codeblocks.forEach((n) => {
              $(n).effect("highlight", {}, 1500);
            });
          });
        }).finally(() => {
          refs.isLoading = false;
        });
      },
      linkTo(action, idSite, idContainer, hash) {
        let url = CoreHome.MatomoUrl.stringify(__spreadProps(__spreadValues({}, CoreHome.MatomoUrl.urlParsed.value), {
          module: "TagManager",
          action,
          idSite,
          idContainer
        }));
        if (hash) {
          url += `#?${CoreHome.MatomoUrl.stringify(hash)}`;
        }
        return `?${url}`;
      },
      fetchClickX(clickTarget) {
        return CoreHome.translate(
          "General_ClickX",
          CoreHome.translate(clickTarget)
        );
      }
    },
    computed: {
      step1HasContent() {
        const elem = this.$refs.step1;
        return elem && elem.textContent !== "";
      },
      fetchFollowStep3() {
        return CoreHome.translate(
          "TagManager_SPAFollowStep3",
          `<strong>${CoreHome.translate("TagManager_PageViewTriggerName")}</strong>`,
          CoreHome.translate("TagManager_PageViewTriggerName"),
          CoreHome.externalLink("https://matomo.org/faq/tag-manager/how-do-i-track-pageviews-of-my-website-using-matomo-tag-manager/#create-pageview-trigger"),
          "</a>"
        );
      },
      fetchFollowStep5() {
        return CoreHome.translate(
          "TagManager_SPAFollowStep5",
          `<strong>${CoreHome.translate("TagManager_HistoryChangeTriggerName")}</strong>`,
          CoreHome.translate("TagManager_CategoryUserEngagement")
        );
      },
      fetchFollowStep8() {
        return CoreHome.translate(
          "TagManager_SPAFollowStep8",
          `<strong>${CoreHome.translate("TagManager_PageViewTriggerName")}</strong>`,
          `<strong>${CoreHome.translate("TagManager_MatomoTagName")}</strong>`,
          CoreHome.translate("TagManager_PageViewTriggerName"),
          CoreHome.externalLink("https://matomo.org/faq/tag-manager/how-do-i-track-pageviews-of-my-website-using-matomo-tag-manager/#create-pageview-tag"),
          "</a>"
        );
      },
      fetchFollowStep9() {
        return CoreHome.translate(
          "TagManager_SPAFollowStep9",
          CoreHome.translate("TagManager_ConfigureWhatTagDoes"),
          CoreHome.translate("TagManager_CustomTitle"),
          "<strong>",
          "</strong>"
        );
      },
      fetchFollowStep10() {
        return CoreHome.translate(
          "TagManager_SPAFollowStep10",
          CoreHome.translate("TagManager_CustomUrl")
        );
      },
      fetchFollowStep10a() {
        return CoreHome.translate(
          "TagManager_SPAFollowStep10a",
          "<strong>",
          "</strong>",
          CoreHome.translate("TagManager_CustomUrl")
        );
      },
      fetchFollowStep10b() {
        return CoreHome.translate(
          "TagManager_SPAFollowStep10b",
          CoreHome.translate("TagManager_CustomUrl"),
          "<strong>",
          "</strong>"
        );
      },
      fetchFollowStep11() {
        return CoreHome.translate(
          "TagManager_SPAFollowStep11",
          CoreHome.translate("TagManager_ConfigureWhenTagDoes"),
          CoreHome.translate("TagManager_FireTriggerTitle"),
          `<strong>${CoreHome.translate("TagManager_HistoryChangeTriggerName")}</strong>`,
          `<strong>${CoreHome.translate("TagManager_PageViewTriggerName")}</strong>`
        );
      },
      fetchFollowStep13() {
        return CoreHome.translate(
          "TagManager_SPAFollowStep13",
          CoreHome.translate("TagManager_Publish")
        );
      },
      fetchFollowStep14() {
        return CoreHome.translate(
          "TagManager_SPAFollowStep14",
          CoreHome.translate("TagManager_VersionName"),
          "<strong>",
          "</strong>"
        );
      },
      fetchFollowStep15() {
        return CoreHome.translate(
          "TagManager_SPAFollowStep15",
          CoreHome.translate("TagManager_CreateVersionAndPublishRelease")
        );
      },
      fetchFollowStep16SPA() {
        return CoreHome.translate(
          "TagManager_SPAFollowStep16",
          "&lt;/head&gt;",
          CoreHome.externalLink("https://developer.matomo.org/guides/tagmanager/embedding"),
          "</a>"
        );
      },
      fetchFollowStep16React() {
        return CoreHome.translate(
          "TagManager_ReactFollowStep16",
          "<strong>",
          "</strong>",
          "<strong>App.js</strong>",
          "<strong>React.useEffect</strong>",
          "<strong>Hello World</strong>",
          "<strong>React.js</strong>"
        );
      }
    }
  });
  const _hoisted_1$2 = { class: "list-style-decimal" };
  const _hoisted_2$2 = { ref: "step1" };
  const _hoisted_3$2 = ["innerHTML"];
  const _hoisted_4$1 = ["innerHTML"];
  const _hoisted_5$1 = ["textContent"];
  const _hoisted_6$1 = ["innerHTML"];
  const _hoisted_7$1 = ["textContent"];
  const _hoisted_8$1 = ["innerHTML"];
  const _hoisted_9$1 = ["innerHTML"];
  const _hoisted_10$1 = ["innerHTML"];
  const _hoisted_11$1 = ["textContent"];
  const _hoisted_12$1 = { style: { "list-style": "lower-alpha", "list-style-position": "inside" } };
  const _hoisted_13$1 = ["innerHTML"];
  const _hoisted_14$1 = ["innerHTML"];
  const _hoisted_15$1 = ["innerHTML"];
  const _hoisted_16$1 = ["textContent"];
  const _hoisted_17$1 = ["textContent"];
  const _hoisted_18$1 = ["innerHTML"];
  const _hoisted_19$1 = ["textContent"];
  const _hoisted_20$1 = ["innerHTML"];
  const _hoisted_21$1 = ["innerHTML"];
  const _hoisted_22$1 = ["textContent"];
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_TrackingCodeCommon = vue.resolveComponent("TrackingCodeCommon");
    const _directive_copy_to_clipboard = vue.resolveDirective("copy-to-clipboard");
    return vue.openBlock(), vue.createElementBlock("ol", _hoisted_1$2, [
      vue.withDirectives(vue.createElementVNode("li", _hoisted_2$2, [
        vue.createVNode(_component_TrackingCodeCommon, {
          "show-container-row": _ctx.showContainerRow,
          showBottom: false,
          showDescription: false,
          onFetchInstallInstructions: _ctx.fetchInstallInstructionsSPA,
          ref: "trackingCodeCommon"
        }, null, 8, ["show-container-row", "onFetchInstallInstructions"])
      ], 512), [
        [vue.vShow, _ctx.step1HasContent]
      ]),
      vue.createElementVNode("li", {
        innerHTML: _ctx.$sanitize(_ctx.setupStep2)
      }, null, 8, _hoisted_3$2),
      vue.createElementVNode("li", {
        innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep3)
      }, null, 8, _hoisted_4$1),
      vue.createElementVNode("li", {
        textContent: vue.toDisplayString(_ctx.fetchClickX("TagManager_CreateNewTrigger"))
      }, null, 8, _hoisted_5$1),
      vue.createElementVNode("li", {
        innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep5)
      }, null, 8, _hoisted_6$1),
      vue.createElementVNode("li", {
        textContent: vue.toDisplayString(_ctx.fetchClickX("TagManager_CreateNewTrigger"))
      }, null, 8, _hoisted_7$1),
      vue.createElementVNode("li", {
        innerHTML: _ctx.$sanitize(_ctx.setupStep7)
      }, null, 8, _hoisted_8$1),
      vue.createElementVNode("li", {
        innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep8)
      }, null, 8, _hoisted_9$1),
      vue.createElementVNode("li", {
        innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep9)
      }, null, 8, _hoisted_10$1),
      vue.createElementVNode("li", null, [
        vue.createElementVNode("span", {
          textContent: vue.toDisplayString(_ctx.fetchFollowStep10)
        }, null, 8, _hoisted_11$1),
        vue.createElementVNode("ol", _hoisted_12$1, [
          vue.createElementVNode("li", {
            innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep10a)
          }, null, 8, _hoisted_13$1),
          vue.createElementVNode("li", {
            innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep10b)
          }, null, 8, _hoisted_14$1)
        ])
      ]),
      vue.createElementVNode("li", {
        innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep11)
      }, null, 8, _hoisted_15$1),
      vue.createElementVNode("li", {
        textContent: vue.toDisplayString(_ctx.fetchClickX("General_Update"))
      }, null, 8, _hoisted_16$1),
      vue.createElementVNode("li", {
        textContent: vue.toDisplayString(_ctx.fetchFollowStep13)
      }, null, 8, _hoisted_17$1),
      vue.createElementVNode("li", {
        innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep14)
      }, null, 8, _hoisted_18$1),
      vue.createElementVNode("li", {
        textContent: vue.toDisplayString(_ctx.fetchFollowStep15)
      }, null, 8, _hoisted_19$1),
      vue.createElementVNode("li", null, [
        _ctx.jsFramework === "react" ? (vue.openBlock(), vue.createElementBlock("span", {
          key: 0,
          innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep16React)
        }, null, 8, _hoisted_20$1)) : (vue.openBlock(), vue.createElementBlock("span", {
          key: 1,
          innerHTML: _ctx.$sanitize(_ctx.fetchFollowStep16SPA)
        }, null, 8, _hoisted_21$1)),
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.installInstructions, (installInstruction, index) => {
          return vue.openBlock(), vue.createElementBlock("div", { key: index }, [
            vue.withDirectives(vue.createElementVNode("pre", {
              class: "codeblock",
              textContent: vue.toDisplayString(installInstruction.embedCode),
              ref_for: true,
              ref: "codeblock"
            }, null, 8, _hoisted_22$1), [
              [_directive_copy_to_clipboard, {}]
            ])
          ]);
        }), 128))
      ])
    ]);
  }
  const TrackingSPAPage = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
  window.mtmDbgData = vue.reactive({
    mtmEvents: ((_a = window.mtmDbgData) == null ? void 0 : _a.mtmEvents) || [],
    mtmLogs: ((_b = window.mtmDbgData) == null ? void 0 : _b.mtmLogs) || []
  });
  const cookieName = "mtmPreviewPosition";
  const stickyTextTop = "Stick to Top";
  const stickyTextBottom = "Stick to Bottom";
  function getCircularReplacer() {
    const seen = /* @__PURE__ */ new WeakSet();
    function circular(key, value) {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return "";
        }
        seen.add(value);
      }
      return value;
    }
    return circular;
  }
  const _sfc_main$1 = vue.defineComponent({
    data() {
      return {
        contentTab: "tags",
        selectedEventIndex: 0,
        onlyfiredTags: false,
        positionText: CoreHome.getCookie(cookieName) === "top" ? stickyTextBottom : stickyTextTop
      };
    },
    methods: {
      mtmUpdateDebugPosition() {
        const sevenDays = 7 * 60 * 60 * 24 * 1e3;
        const currentCookieValue = CoreHome.getCookie(cookieName);
        const cookieValue = currentCookieValue === "top" ? "bottom" : "top";
        CoreHome.setCookie(cookieName, cookieValue, sevenDays);
        const iframe = window.parent.document.getElementById("mtmDebugFrame");
        if (cookieValue === "top") {
          this.positionText = stickyTextBottom;
          iframe.classList.remove("mtmStickyBottom");
          iframe.classList.add("mtmStickyTop");
        } else {
          this.positionText = stickyTextTop;
          iframe.classList.remove("mtmStickyTop");
          iframe.classList.add("mtmStickyBottom");
        }
      },
      mtmCloseDebugWindow() {
        const iframe = window.parent.document.getElementById("mtmDebugFrame");
        if (iframe) {
          iframe.style.display = "none";
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
        var _a2;
        if (!((_a2 = this.selectedEvent) == null ? void 0 : _a2.container)) {
          return "";
        }
        const versionName = this.selectedEvent.container.versionName || "Draft version";
        const container = this.selectedEvent.container.id;
        const eventNum = this.selectedEventIndex + 1;
        return `Event ${eventNum}: ${this.selectedEvent.name} (${container} - ${versionName})`;
      },
      notFiredTags() {
        var _a2;
        if (!((_a2 = this.selectedEvent) == null ? void 0 : _a2.container)) {
          return [];
        }
        const eventIndex = this.selectedEventIndex;
        const tagsFired = [];
        this.mtmEvents.forEach((event, i) => {
          if (i > eventIndex) {
            return;
          }
          tagsFired.push(...event.tags.map((tag) => tag.name));
        });
        const tagsNotFired = [];
        this.selectedEvent.container.tags.forEach((tag) => {
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
        var _a2;
        return ((_a2 = this.selectedEvent) == null ? void 0 : _a2.eventData) && JSON.stringify(this.selectedEvent.eventData, getCircularReplacer());
      },
      selectedEventContainerDataLayer() {
        var _a2, _b2;
        return ((_b2 = (_a2 = this.selectedEvent) == null ? void 0 : _a2.container) == null ? void 0 : _b2.dataLayer) && JSON.stringify(this.selectedEvent.container.dataLayer, getCircularReplacer());
      }
    }
  });
  const _hoisted_1$1 = { class: "nav-wrapper" };
  const _hoisted_2$1 = { class: "pull-right" };
  const _hoisted_3$1 = /* @__PURE__ */ vue.createElementVNode("svg", { class: "tm-icon tm-icon-close" }, [
    /* @__PURE__ */ vue.createElementVNode("use", { "xlink:href": "#tm-icon-close" })
  ], -1);
  const _hoisted_4 = [
    _hoisted_3$1
  ];
  const _hoisted_5 = { class: "pull-right" };
  const _hoisted_6 = {
    "aria-hidden": "true",
    style: { "position": "absolute", "width": "0", "height": "0", "overflow": "hidden" },
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink"
  };
  const _hoisted_7 = /* @__PURE__ */ vue.createElementVNode("defs", null, [
    /* @__PURE__ */ vue.createElementVNode("symbol", {
      id: "tm-icon-checkmark",
      viewBox: "0 0 32 32"
    }, [
      /* @__PURE__ */ vue.createElementVNode("path", { d: "M27 4l-15 15-7-7-5 5 12 12 20-20z" })
    ])
  ], -1);
  const _hoisted_8 = [
    _hoisted_7
  ];
  const _hoisted_9 = {
    "aria-hidden": "true",
    style: { "position": "absolute", "width": "0", "height": "0", "overflow": "hidden" },
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink"
  };
  const _hoisted_10 = /* @__PURE__ */ vue.createElementVNode("symbol", {
    id: "tm-icon-close",
    viewBox: "0 0 32 32"
  }, [
    /* @__PURE__ */ vue.createElementVNode("path", { d: "M31.33 0.67c0.893 0.893 0.893 2.34 0 3.232l-27.427 27.427c-0.893 0.893-2.34\n          0.893-3.232 0s-0.893-2.34 0-3.232l27.427-27.427c0.892-0.893 2.34-0.893 3.232 0z" }),
    /* @__PURE__ */ vue.createElementVNode("path", { d: "M0.67 0.67c0.893-0.893 2.34-0.893 3.232 0l27.427 27.427c0.893 0.892 0.893\n          2.34 0 3.232s-2.34 0.892-3.232 0l-27.427-27.427c-0.893-0.893-0.893-2.34 0-3.232z" })
  ], -1);
  const _hoisted_11 = [
    _hoisted_10
  ];
  const _hoisted_12 = {
    class: "page",
    style: { "clear": "both", "display": "flex" }
  };
  const _hoisted_13 = {
    key: 0,
    id: "secondNavBar",
    class: "Menu--dashboard z-depth-1"
  };
  const _hoisted_14 = {
    class: "navbar",
    role: "menu",
    style: { "padding": "0" }
  };
  const _hoisted_15 = {
    class: "menuTab",
    role: "menuitem"
  };
  const _hoisted_16 = /* @__PURE__ */ vue.createElementVNode("span", {
    class: "item",
    style: { "font-weight": "normal" }
  }, " Events ", -1);
  const _hoisted_17 = {
    key: 0,
    class: "item",
    style: { "font-weight": "normal" }
  };
  const _hoisted_18 = /* @__PURE__ */ vue.createElementVNode("label", {
    for: "onlyfiredTags",
    class: "lbl-onlyfiredTags"
  }, "Only fired tags", -1);
  const _hoisted_19 = {
    key: 0,
    style: { "padding": "0 0 1rem 1.2rem" }
  };
  const _hoisted_20 = ["onClick", "title"];
  const _hoisted_21 = { title: "This tag was fired" };
  const _hoisted_22 = /* @__PURE__ */ vue.createElementVNode("svg", { class: "tm-icon tm-icon-checkmark" }, [
    /* @__PURE__ */ vue.createElementVNode("use", { "xlink:href": "#tm-icon-checkmark" })
  ], -1);
  const _hoisted_23 = [
    _hoisted_22
  ];
  const _hoisted_24 = { class: "pageWrap" };
  const _hoisted_25 = {
    class: "home",
    id: "content"
  };
  const _hoisted_26 = /* @__PURE__ */ vue.createElementVNode("h3", null, "Fired Tags", -1);
  const _hoisted_27 = { class: "entityTable" };
  const _hoisted_28 = /* @__PURE__ */ vue.createElementVNode("thead", null, [
    /* @__PURE__ */ vue.createElementVNode("tr", null, [
      /* @__PURE__ */ vue.createElementVNode("th", null, "Action"),
      /* @__PURE__ */ vue.createElementVNode("th", null, "Name"),
      /* @__PURE__ */ vue.createElementVNode("th", null, "Type"),
      /* @__PURE__ */ vue.createElementVNode("th", null, "Fired count")
    ])
  ], -1);
  const _hoisted_29 = { key: 0 };
  const _hoisted_30 = /* @__PURE__ */ vue.createElementVNode("td", { colspan: "4" }, "No tags", -1);
  const _hoisted_31 = [
    _hoisted_30
  ];
  const _hoisted_32 = /* @__PURE__ */ vue.createElementVNode("h3", { style: { "margin-top": "30px" } }, "Not Yet Fired Tags", -1);
  const _hoisted_33 = { class: "entityTable" };
  const _hoisted_34 = /* @__PURE__ */ vue.createElementVNode("thead", null, [
    /* @__PURE__ */ vue.createElementVNode("tr", null, [
      /* @__PURE__ */ vue.createElementVNode("th", null, "Name"),
      /* @__PURE__ */ vue.createElementVNode("th", null, "Type")
    ])
  ], -1);
  const _hoisted_35 = /* @__PURE__ */ vue.createElementVNode("td", { colspan: "4" }, "No tags", -1);
  const _hoisted_36 = [
    _hoisted_35
  ];
  const _hoisted_37 = /* @__PURE__ */ vue.createElementVNode("h3", null, "Triggers", -1);
  const _hoisted_38 = { class: "entityTable" };
  const _hoisted_39 = /* @__PURE__ */ vue.createElementVNode("thead", null, [
    /* @__PURE__ */ vue.createElementVNode("tr", null, [
      /* @__PURE__ */ vue.createElementVNode("th", null, "Name"),
      /* @__PURE__ */ vue.createElementVNode("th", null, "Type")
    ])
  ], -1);
  const _hoisted_40 = { key: 0 };
  const _hoisted_41 = /* @__PURE__ */ vue.createElementVNode("td", { colspan: "4" }, "No trigger", -1);
  const _hoisted_42 = [
    _hoisted_41
  ];
  const _hoisted_43 = { key: 1 };
  const _hoisted_44 = /* @__PURE__ */ vue.createElementVNode("h3", null, "Pushed data by this event", -1);
  const _hoisted_45 = { class: "entityTable" };
  const _hoisted_46 = { style: { "word-break": "break-all" } };
  const _hoisted_47 = /* @__PURE__ */ vue.createElementVNode("br", null, null, -1);
  const _hoisted_48 = /* @__PURE__ */ vue.createElementVNode("h3", null, "Content after this event", -1);
  const _hoisted_49 = { class: "entityTable" };
  const _hoisted_50 = { style: { "word-break": "break-all" } };
  const _hoisted_51 = { class: "entityTable" };
  const _hoisted_52 = /* @__PURE__ */ vue.createElementVNode("thead", null, [
    /* @__PURE__ */ vue.createElementVNode("tr", null, [
      /* @__PURE__ */ vue.createElementVNode("th", null, "Name"),
      /* @__PURE__ */ vue.createElementVNode("th", null, "Type"),
      /* @__PURE__ */ vue.createElementVNode("th", null, "Value")
    ])
  ], -1);
  const _hoisted_53 = { key: 0 };
  const _hoisted_54 = /* @__PURE__ */ vue.createElementVNode("td", { colspan: "3" }, "No variables", -1);
  const _hoisted_55 = [
    _hoisted_54
  ];
  const _hoisted_56 = { style: { "word-break": "break-all" } };
  const _hoisted_57 = { class: "entityTable" };
  const _hoisted_58 = /* @__PURE__ */ vue.createElementVNode("thead", null, [
    /* @__PURE__ */ vue.createElementVNode("tr", null, [
      /* @__PURE__ */ vue.createElementVNode("th", null, "Time"),
      /* @__PURE__ */ vue.createElementVNode("th", null, "Message")
    ])
  ], -1);
  const _hoisted_59 = { style: { "word-break": "break-all" } };
  const _hoisted_60 = /* @__PURE__ */ vue.createElementVNode("br", null, null, -1);
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j;
    return vue.openBlock(), vue.createElementBlock("div", null, [
      vue.createElementVNode("nav", null, [
        vue.createElementVNode("div", _hoisted_1$1, [
          vue.createElementVNode("ul", null, [
            vue.createElementVNode("li", null, [
              vue.renderSlot(_ctx.$slots, "logo")
            ]),
            vue.createElementVNode("li", {
              class: vue.normalizeClass({ "active": _ctx.contentTab === "tags" || !_ctx.contentTab })
            }, [
              vue.createElementVNode("a", {
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.contentTab = "tags")
              }, "Tags")
            ], 2),
            vue.createElementVNode("li", {
              class: vue.normalizeClass({ "active": _ctx.contentTab === "triggers" })
            }, [
              vue.createElementVNode("a", {
                onClick: _cache[1] || (_cache[1] = ($event) => _ctx.contentTab = "triggers")
              }, "Triggers")
            ], 2),
            vue.createElementVNode("li", {
              class: vue.normalizeClass({ "active": _ctx.contentTab === "variables" })
            }, [
              vue.createElementVNode("a", {
                onClick: _cache[2] || (_cache[2] = ($event) => _ctx.contentTab = "variables")
              }, "Variables")
            ], 2),
            vue.createElementVNode("li", {
              class: vue.normalizeClass({ "active": _ctx.contentTab === "dataLayer" })
            }, [
              vue.createElementVNode("a", {
                onClick: _cache[3] || (_cache[3] = ($event) => _ctx.contentTab = "dataLayer")
              }, "Data Layer")
            ], 2),
            vue.createElementVNode("li", {
              class: vue.normalizeClass({ "active": _ctx.contentTab === "logs" })
            }, [
              vue.createElementVNode("a", {
                onClick: _cache[4] || (_cache[4] = ($event) => _ctx.contentTab = "logs")
              }, "Logs")
            ], 2),
            vue.createElementVNode("li", _hoisted_2$1, [
              vue.createElementVNode("a", {
                id: "mtmCloseDebug",
                onClick: _cache[5] || (_cache[5] = ($event) => _ctx.mtmCloseDebugWindow())
              }, _hoisted_4)
            ]),
            vue.createElementVNode("li", _hoisted_5, [
              vue.createElementVNode("a", {
                id: "mtmUpdateDebugPosition",
                onClick: _cache[6] || (_cache[6] = ($event) => _ctx.mtmUpdateDebugPosition())
              }, vue.toDisplayString(_ctx.positionText), 1)
            ])
          ])
        ])
      ]),
      (vue.openBlock(), vue.createElementBlock("svg", _hoisted_6, _hoisted_8)),
      (vue.openBlock(), vue.createElementBlock("svg", _hoisted_9, _hoisted_11)),
      vue.createElementVNode("div", _hoisted_12, [
        _ctx.contentTab !== "logs" ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_13, [
          vue.createElementVNode("ul", _hoisted_14, [
            vue.createElementVNode("li", _hoisted_15, [
              _hoisted_16,
              _ctx.mtmEvents.length > 0 ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_17, [
                vue.withDirectives(vue.createElementVNode("input", {
                  type: "checkbox",
                  class: "onlyFiredTags-chk",
                  name: "onlyfiredTags",
                  id: "onlyfiredTags",
                  value: "1",
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.onlyfiredTags = $event),
                  style: { "margin-right": "3.5px", "margin-top": "-3.5px" }
                }, null, 512), [
                  [vue.vModelCheckbox, _ctx.onlyfiredTags]
                ]),
                _hoisted_18
              ])) : vue.createCommentVNode("", true)
            ]),
            _ctx.mtmEvents.length === 0 ? (vue.openBlock(), vue.createElementBlock("li", _hoisted_19, "No event executed")) : vue.createCommentVNode("", true),
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.mtmEventsReversed, (event, index) => {
              var _a3, _b3;
              return vue.openBlock(), vue.createElementBlock("li", {
                class: vue.normalizeClass(["menuTab", { "active": index === _ctx.selectedEventIndex }]),
                role: "menuitem",
                key: index
              }, [
                (event.tags || []).length || !_ctx.onlyfiredTags ? (vue.openBlock(), vue.createElementBlock("a", {
                  key: 0,
                  class: "item",
                  onClick: ($event) => _ctx.selectEvent(event.index0),
                  title: `Time: ${event.time}. Trigger: ${(_a3 = event.metTrigger) == null ? void 0 : _a3.name}`
                }, [
                  vue.createTextVNode(vue.toDisplayString(event.index) + ": " + vue.toDisplayString(event.name) + " ", 1),
                  vue.withDirectives(vue.createElementVNode("span", _hoisted_21, _hoisted_23, 512), [
                    [vue.vShow, (_b3 = event.tags) == null ? void 0 : _b3.length]
                  ])
                ], 8, _hoisted_20)) : vue.createCommentVNode("", true)
              ], 2);
            }), 128))
          ])
        ])) : vue.createCommentVNode("", true),
        vue.createElementVNode("div", _hoisted_24, [
          vue.createElementVNode("div", _hoisted_25, [
            vue.withDirectives(vue.createElementVNode("h2", null, vue.toDisplayString(_ctx.homeTabTitle), 513), [
              [vue.vShow, _ctx.contentTab !== "logs"]
            ]),
            vue.withDirectives(vue.createElementVNode("div", null, [
              _hoisted_26,
              vue.createElementVNode("table", _hoisted_27, [
                _hoisted_28,
                vue.createElementVNode("tbody", null, [
                  !((_b2 = (_a2 = _ctx.selectedEvent) == null ? void 0 : _a2.tags) == null ? void 0 : _b2.length) ? (vue.openBlock(), vue.createElementBlock("tr", _hoisted_29, _hoisted_31)) : vue.createCommentVNode("", true),
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(((_c = _ctx.selectedEvent) == null ? void 0 : _c.tags) || [], (tag, index) => {
                    return vue.openBlock(), vue.createElementBlock("tr", { key: index }, [
                      vue.createElementVNode("td", null, vue.toDisplayString(tag.action), 1),
                      vue.createElementVNode("td", null, vue.toDisplayString(tag.name), 1),
                      vue.createElementVNode("td", null, vue.toDisplayString(tag.type), 1),
                      vue.createElementVNode("td", null, vue.toDisplayString(tag.numExecuted), 1)
                    ]);
                  }), 128))
                ])
              ]),
              _hoisted_32,
              vue.createElementVNode("table", _hoisted_33, [
                _hoisted_34,
                vue.createElementVNode("tbody", null, [
                  vue.withDirectives(vue.createElementVNode("tr", null, _hoisted_36, 512), [
                    [vue.vShow, _ctx.notFiredTags.length === 0]
                  ]),
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.notFiredTags, (tag, index) => {
                    return vue.openBlock(), vue.createElementBlock("tr", { key: index }, [
                      vue.createElementVNode("td", null, vue.toDisplayString(tag.name), 1),
                      vue.createElementVNode("td", null, vue.toDisplayString(tag.type), 1)
                    ]);
                  }), 128))
                ])
              ])
            ], 512), [
              [vue.vShow, _ctx.contentTab === "tags" || !_ctx.contentTab]
            ]),
            vue.withDirectives(vue.createElementVNode("div", null, [
              _hoisted_37,
              vue.createElementVNode("table", _hoisted_38, [
                _hoisted_39,
                vue.createElementVNode("tbody", null, [
                  !((_d = _ctx.selectedEvent) == null ? void 0 : _d.metTrigger) ? (vue.openBlock(), vue.createElementBlock("tr", _hoisted_40, _hoisted_42)) : vue.createCommentVNode("", true),
                  ((_e = _ctx.selectedEvent) == null ? void 0 : _e.metTrigger) ? (vue.openBlock(), vue.createElementBlock("tr", _hoisted_43, [
                    vue.createElementVNode("td", null, vue.toDisplayString(_ctx.selectedEvent.metTrigger.name), 1),
                    vue.createElementVNode("td", null, vue.toDisplayString(_ctx.selectedEvent.metTrigger.type), 1)
                  ])) : vue.createCommentVNode("", true)
                ])
              ])
            ], 512), [
              [vue.vShow, _ctx.contentTab === "triggers"]
            ]),
            vue.withDirectives(vue.createElementVNode("div", null, [
              _hoisted_44,
              vue.createElementVNode("table", _hoisted_45, [
                vue.createElementVNode("tbody", null, [
                  vue.createElementVNode("tr", null, [
                    vue.createElementVNode("td", _hoisted_46, vue.toDisplayString(_ctx.selectedEventData), 1)
                  ])
                ])
              ]),
              _hoisted_47,
              _hoisted_48,
              vue.createElementVNode("table", _hoisted_49, [
                vue.createElementVNode("tbody", null, [
                  vue.createElementVNode("tr", null, [
                    vue.createElementVNode("td", _hoisted_50, vue.toDisplayString(_ctx.selectedEventContainerDataLayer), 1)
                  ])
                ])
              ])
            ], 512), [
              [vue.vShow, _ctx.contentTab === "dataLayer"]
            ]),
            vue.withDirectives(vue.createElementVNode("div", null, [
              vue.createElementVNode("table", _hoisted_51, [
                _hoisted_52,
                vue.createElementVNode("tbody", null, [
                  !((_h = (_g = (_f = _ctx.selectedEvent) == null ? void 0 : _f.container) == null ? void 0 : _g.variables) == null ? void 0 : _h.length) ? (vue.openBlock(), vue.createElementBlock("tr", _hoisted_53, _hoisted_55)) : vue.createCommentVNode("", true),
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(((_j = (_i = _ctx.selectedEvent) == null ? void 0 : _i.container) == null ? void 0 : _j.variables) || [], (variable, index) => {
                    return vue.openBlock(), vue.createElementBlock("tr", { key: index }, [
                      vue.createElementVNode("td", null, vue.toDisplayString(variable.name), 1),
                      vue.createElementVNode("td", null, vue.toDisplayString(variable.type), 1),
                      vue.createElementVNode("td", _hoisted_56, vue.toDisplayString(_ctx.stringifySelectedVariable(variable)), 1)
                    ]);
                  }), 128))
                ])
              ])
            ], 512), [
              [vue.vShow, _ctx.contentTab === "variables"]
            ]),
            vue.withDirectives(vue.createElementVNode("div", null, [
              vue.createElementVNode("table", _hoisted_57, [
                _hoisted_58,
                vue.createElementVNode("tbody", null, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.mtmLogs, (log, index) => {
                    return vue.openBlock(), vue.createElementBlock("tr", { key: index }, [
                      vue.createElementVNode("td", null, vue.toDisplayString(log.time), 1),
                      vue.createElementVNode("td", _hoisted_59, [
                        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(log.messages, (logMessage, index2) => {
                          return vue.openBlock(), vue.createElementBlock("span", { key: index2 }, [
                            vue.createTextVNode(vue.toDisplayString(logMessage), 1),
                            _hoisted_60
                          ]);
                        }), 128))
                      ])
                    ]);
                  }), 128))
                ])
              ])
            ], 512), [
              [vue.vShow, _ctx.contentTab === "logs"]
            ])
          ])
        ])
      ])
    ]);
  }
  const Debugging = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
  const _sfc_main = vue.defineComponent({
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
        default: ""
      },
      idToCopy: {
        type: [String, Number],
        required: true
      },
      idSourceContainer: {
        type: String,
        required: false,
        default: ""
      },
      idContainerVersion: {
        type: Number,
        required: false,
        default: 0
      }
    },
    directives: {
      Form: CorePluginsAdmin.Form
    },
    components: {
      Field: CorePluginsAdmin.Field
    },
    data() {
      return {
        site: this.defaultSite,
        idDestinationContainer: "",
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
        var _a2;
        if (this.copyType.toLowerCase() === "container") {
          return;
        }
        this.containerOptions = [];
        this.idDestinationContainer = "";
        if (!((_a2 = this.site) == null ? void 0 : _a2.id)) {
          return;
        }
        CoreHome.AjaxHelper.fetch({
          method: "TagManager.getContainers",
          filter_limit: "-1",
          idSite: this.site.id
        }).then((containers) => {
          this.containerOptions = [];
          if (!(containers == null ? void 0 : containers.length)) {
            this.idDestinationContainer = "";
            this.containerOptions.push({
              key: "",
              value: this.translate("TagManager_NoContainersFound")
            });
            return;
          }
          containers.forEach((container) => {
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
        var _a2;
        const requestParams = {
          module: "TagManager",
          action: "",
          idSite: this.defaultSite.id,
          idDestinationSite: ((_a2 = this.site) == null ? void 0 : _a2.id) ? this.site.id : 0,
          nonce: this.copyNonce,
          idDestinationContainer: "",
          idSourceContainer: "",
          idContainerVersion: 0,
          idContainer: 0,
          idTag: 0,
          idTrigger: 0,
          idVariable: 0
        };
        switch (this.copyType.toLowerCase()) {
          case "container":
            requestParams.action = "copyContainer";
            requestParams.idContainer = this.idToCopy;
            break;
          case "tag":
            requestParams.action = "copyTag";
            requestParams.idTag = this.idToCopy;
            break;
          case "trigger":
            requestParams.action = "copyTrigger";
            requestParams.idTrigger = this.idToCopy;
            break;
          case "variable":
            requestParams.action = "copyVariable";
            requestParams.idVariable = this.idToCopy;
            break;
          default:
            throw Error("Unrecognised copy object type.");
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
        CoreHome.AjaxHelper.fetch(requestParams).then((response) => {
          var _a3;
          if (!response || !response.isSuccess || !response.urlToNewCopy) {
            const message = (_a3 = response.message) != null ? _a3 : CoreHome.translate("General_ErrorRequest", "", "");
            const notificationInstanceId = CoreHome.NotificationsStore.show({
              message,
              id: "CopyDialogResultNotification",
              context: "error",
              type: "transient"
            });
            CoreHome.NotificationsStore.scrollToNotification(notificationInstanceId);
            window.Piwik_Popover.close();
            return;
          }
          this.reloadEntityStore();
          this.displaySuccessNotification(response.urlToNewCopy);
          window.Piwik_Popover.close();
        });
      },
      reloadEntityStore() {
        switch (this.copyType.toLowerCase()) {
          case "container":
            ContainersStore$1.reload();
            break;
          case "tag":
            TagsStore$1.reload(this.idSourceContainer, this.idContainerVersion);
            break;
          case "trigger":
            TriggersStore$1.reload(this.idSourceContainer, this.idContainerVersion);
            break;
          case "variable":
            VariablesStore$1.reload(this.idSourceContainer, this.idContainerVersion);
            break;
          default:
            throw Error("Unrecognised copy object type.");
        }
      },
      displaySuccessNotification(urlToNewCopy) {
        const mainTranslation = "TagManager_CopyXSuccess";
        let typeTranslation = "";
        switch (this.copyType.toLowerCase()) {
          case "container":
            typeTranslation = "TagManager_ContainerLowercase";
            break;
          case "tag":
            typeTranslation = "TagManager_TagLowercase";
            break;
          case "trigger":
            typeTranslation = "TagManager_TriggerLowercase";
            break;
          case "variable":
            typeTranslation = "TagManager_VariableLowercase";
            break;
          default:
            throw Error("Unrecognised copy object type.");
        }
        const message = CoreHome.translate(
          mainTranslation,
          [
            `<a href="${urlToNewCopy}">`,
            CoreHome.translate(typeTranslation),
            "</a>"
          ]
        );
        const notificationInstanceId = CoreHome.NotificationsStore.show({
          message,
          id: "CopyDialogResultNotification",
          context: "success",
          type: "transient"
        });
        CoreHome.NotificationsStore.scrollToNotification(notificationInstanceId);
      }
    },
    computed: {
      getCopyDialogTitle() {
        let objectTypeTranslation = "";
        switch (this.copyType.toLowerCase()) {
          case "container":
            objectTypeTranslation = CoreHome.translate("TagManager_Container");
            break;
          case "tag":
            objectTypeTranslation = CoreHome.translate("TagManager_Tag");
            break;
          case "trigger":
            objectTypeTranslation = CoreHome.translate("TagManager_Trigger");
            break;
          case "variable":
            objectTypeTranslation = CoreHome.translate("TagManager_Variable");
            break;
          default:
            throw Error("Unrecognised copy object type.");
        }
        return CoreHome.translate("TagManager_CopyX", objectTypeTranslation);
      },
      getCopyDescription() {
        if (this.copyType.toLowerCase() === "container") {
          return CoreHome.translate("TagManager_CopyContainerDescription");
        }
        let objectTypeTranslation = "";
        switch (this.copyType.toLowerCase()) {
          case "tag":
            objectTypeTranslation = CoreHome.translate("TagManager_TagLowercase");
            break;
          case "trigger":
            objectTypeTranslation = CoreHome.translate("TagManager_TriggerLowercase");
            break;
          case "variable":
            objectTypeTranslation = CoreHome.translate("TagManager_VariableLowercase");
            break;
          default:
            throw Error("Unrecognised copy object type.");
        }
        return CoreHome.translate("TagManager_CopyXDescription", objectTypeTranslation);
      },
      getCopyContainerNote() {
        return CoreHome.translate("TagManager_CopyContainerNote", "<strong>", "</strong>");
      },
      getCopyUrl() {
        var _a2;
        const requestParams = {
          module: "TagManager",
          action: "",
          idSite: this.defaultSite.id,
          idDestinationSite: ((_a2 = this.site) == null ? void 0 : _a2.id) ? this.site.id : 0,
          nonce: this.copyNonce,
          idDestinationContainer: "",
          idSourceContainer: "",
          idContainerVersion: 0,
          idContainer: 0,
          idTag: 0,
          idTrigger: 0,
          idVariable: 0
        };
        switch (this.copyType.toLowerCase()) {
          case "container":
            requestParams.action = "copyContainer";
            requestParams.idContainer = this.idToCopy;
            break;
          case "tag":
            requestParams.action = "copyTag";
            requestParams.idTag = this.idToCopy;
            break;
          case "trigger":
            requestParams.action = "copyTrigger";
            requestParams.idTrigger = this.idToCopy;
            break;
          case "variable":
            requestParams.action = "copyVariable";
            requestParams.idVariable = this.idToCopy;
            break;
          default:
            throw Error("Unrecognised copy object type.");
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
        return `?${CoreHome.MatomoUrl.stringify(requestParams)}`;
      },
      getLearnMoreLink() {
        let faqLink = "";
        switch (this.copyType.toLowerCase()) {
          case "container":
            faqLink = "https://matomo.org/faq/tag-manager/how-to-copy-a-matomo-tag-manager-container-and-its-components";
            break;
          case "tag":
            faqLink = "https://matomo.org/faq/tag-manager/how-to-copy-a-tag-in-matomo-tag-manager ";
            break;
          case "trigger":
            faqLink = "https://matomo.org/faq/tag-manager/how-to-copy-a-trigger-in-matomo-tag-manager";
            break;
          case "variable":
            faqLink = "https://matomo.org/faq/tag-manager/how-to-copy-a-variable-in-matomo-tag-manager";
            break;
          default:
            throw Error("Unrecognised copy object type.");
        }
        const linkString = CoreHome.externalLink(faqLink);
        return CoreHome.translate("TagManager_LearnMoreFullStop", linkString, "</a>");
      }
    }
  });
  const _hoisted_1 = { class: "copyMtmObjectDialog" };
  const _hoisted_2 = ["innerHTML"];
  const _hoisted_3 = ["innerHTML"];
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Field = vue.resolveComponent("Field");
    const _directive_form = vue.resolveDirective("form");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
      vue.createElementVNode("h2", null, vue.toDisplayString(_ctx.getCopyDialogTitle), 1),
      vue.createElementVNode("p", null, [
        vue.createTextVNode(vue.toDisplayString(_ctx.getCopyDescription) + "  ", 1),
        vue.createElementVNode("span", {
          innerHTML: _ctx.$sanitize(_ctx.getLearnMoreLink),
          class: "learnMore"
        }, null, 8, _hoisted_2)
      ]),
      vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", null, [
        vue.createVNode(_component_Field, {
          uicontrol: "site",
          name: "destinationSite",
          title: _ctx.translate("TagManager_ChooseWebsite"),
          modelValue: _ctx.site,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.site = $event)
        }, null, 8, ["title", "modelValue"]),
        _ctx.copyType.toLowerCase() !== "container" ? (vue.openBlock(), vue.createBlock(_component_Field, {
          key: 0,
          uicontrol: "select",
          name: "idDestinationContainer",
          options: _ctx.containerOptions,
          disabled: _ctx.containerOptions.length <= 1,
          "full-width": true,
          title: _ctx.translate("TagManager_Container"),
          modelValue: _ctx.idDestinationContainer,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.idDestinationContainer = $event)
        }, null, 8, ["options", "disabled", "title", "modelValue"])) : vue.createCommentVNode("", true),
        _ctx.copyType.toLowerCase() === "container" ? (vue.openBlock(), vue.createElementBlock("p", {
          key: 1,
          class: "copyNote",
          innerHTML: _ctx.$sanitize(_ctx.getCopyContainerNote)
        }, null, 8, _hoisted_3)) : vue.createCommentVNode("", true),
        vue.createElementVNode("button", {
          class: "btn",
          onClick: _cache[2] || (_cache[2] = (...args) => _ctx.performCopy && _ctx.performCopy(...args))
        }, vue.toDisplayString(_ctx.translate("General_Copy")), 1)
      ])), [
        [_directive_form]
      ])
    ]);
  }
  const CopyDialog = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
  exports2.ContainerDashboard = ContainerDashboard;
  exports2.ContainerEdit = ContainerEdit;
  exports2.ContainerList = ContainerList;
  exports2.ContainerManage = ContainerManage;
  exports2.ContainerSelector = ContainerSelector;
  exports2.CopyDialog = CopyDialog;
  exports2.Debugging = Debugging;
  exports2.FieldTextareaVariable = FieldTextareaVariable;
  exports2.FieldVariableTemplate = FieldVariableTemplate;
  exports2.FieldVariableTypeTemplate = FieldVariableTypeTemplate;
  exports2.ImportVersion = ImportVersion;
  exports2.ManageInstallTagCode = ManageInstallTagCode;
  exports2.TagEdit = TagEdit;
  exports2.TagList = TagList;
  exports2.TagManage = TagManage;
  exports2.TrackingCodeCommon = TrackingCodeCommon;
  exports2.TrackingCodePage = TrackingCodePage;
  exports2.TrackingSPAPage = TrackingSPAPage;
  exports2.TriggerEdit = TriggerEdit;
  exports2.TriggerList = TriggerList;
  exports2.TriggerManage = TriggerManage;
  exports2.VariableEdit = VariableEdit;
  exports2.VariableList = VariableList;
  exports2.VariableManage = VariableManage;
  exports2.VariableSelect = VariableSelect;
  exports2.VariableSelectType = VariableSelectType;
  exports2.VersionEdit = VersionEdit;
  exports2.VersionList = VersionList;
  exports2.VersionManage = VersionManage;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
}));
