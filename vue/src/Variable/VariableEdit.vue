<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

// TODO
<todo>
- conversion check (mistakes get fixed in quickmigrate)
- property types
- state types
- look over template
- look over component code
- get to build
- test in UI
- create PR
</todo>

<template>
  <ContentBlock
    class="editVariable tagManagerManageEdit"
    feature="Tag Manager"
    :content-title="editTitle"
  >
    <p v-show="isLoading">
      <span class="loadingPiwik"><img src="plugins/Morpheus/images/loading-blue.gif" /> {{ translate('General_LoadingData') }}</span>
    </p>
    <p v-show="isUpdating">
      <span class="loadingPiwik"><img src="plugins/Morpheus/images/loading-blue.gif" /> {{ translate('TagManager_UpdatingData') }}</span>
    </p>
    <form
      v-show="!chooseVariableType && editTitle"
      @submit="edit ? updateVariable() : createVariable()"
    >
      <div>
        <div
          class="alert alert-warning"
          v-show="variable.isDisabled"
        >
          {{ translate(
            'TagManager_UseCustomTemplateCapabilityRequired',
            translate('TagManager_CapabilityUseCustomTemplates'),
          ) }}
        </div>
        <div>
          <Field
            uicontrol="text"
            name="type"
            v-model="variable.name"
            :disabled="true"
            :inline-help="`${variable.description || ''} ${variable.help || ''}`"
            :title="translate('TagManager_Type')"
          />
        </div>
        <div>
          <Field
            uicontrol="text"
            name="name"
            :model-value="variable.name"
            @update:model-value="variable.name = $event; setValueHasChanged()"
            :maxlength="50"
            :title="translate('General_Name')"
            :inline-help="translate('TagManager_VariableNameHelp')"
          />
        </div>
        <div
          class="form-group row"
          v-if="variable.parameters?.length"
        >
          <div class="col s12">
            <h3>{{ translate('TagManager_ConfigureThisVariable') }}</h3>
          </div>
        </div>
        <div v-if="variable">
          <GroupedSettings
            :settings="variable.parameters"
            :all-setting-values="parameterValues"
            @change="parameterValues[$event.name] = $event.value"
          />
        </div>
        <div
          class="form-group row"
          v-show="variable.hasAdvancedSettings"
        >
          <div class="col s12">
            <h3>
              <a
                class="showAdvancedSettings"
                v-show="!showAdvanced"
                @click.prevent="showAdvanced = true"
              >{{ translate('TagManager_ShowAdvancedSettings') }}</a>
              <a
                class="hideAdvancedSettings"
                v-show="showAdvanced"
                @click.prevent="showAdvanced = false"
              >{{ translate('TagManager_HideAdvancedSettings') }}</a>
            </h3>
          </div>
        </div>
        <div v-show="showAdvanced && variable.hasAdvancedSettings">
          <div>
            <Field
              uicontrol="text"
              name="default_value"
              class="innerFormField"
              :model-value="variable.default_value"
              @update:model-value="variable.default_value = $event; setValueHasChanged()"
              :title="translate('TagManager_DefaultValue')"
              :inline-help="translate('TagManager_DefaultValueHelp')"
            />
          </div>
          <div class="form-group row">
            <div class="col s12 m12">
              <div>
                <label for="lookup_table">{{ translate('TagManager_LookupTableTitle') }}</label>
                <div
                  v-for="(lookup, index) in variable.lookup_table"
                  :key="index"
                  :class="`lookupTable lookupTable${ index } multiple valign-wrapper`"
                >
                  <div>
                    <Field
                      uicontrol="select"
                      name="lookup_table_comparison"
                      class="innerFormField comparisonField"
                      :model-value="lookup.comparison"
                      @update:model-value="lookup.comparison = $event; setValueHasChanged()"
                      :full-width="true"
                      :options="availableLookUpComparisons"
                    />
                  </div>
                  <div>
                    <Field
                      uicontrol="text"
                      name="lookup_table_matchvalue"
                      class="innerFormField"
                      :model-value="lookup.match_value"
                      @update:model-value="lookup.match_value = $event; setValueHasChanged(); onLookupChange()"
                      :full-width="true"
                      :placeholder="translate('TagManager_LookupTableMatchValue')"
                    />
                  </div>
                  <div>
                    <Field
                      uicontrol="text"
                      name="lookup_table_outvalue"
                      class="innerFormField"
                      :model-value="lookup.out_value"
                      @update:model-value="lookup.out_value = $event; setValueHasChanged(); onLookupChange()"
                      :full-width="true"
                      :placeholder="translate('TagManager_LookupTableOutValue')"
                    />
                  </div>
                  <span
                    class="icon-minus valign"
                    @click="removeLookUpEntry(index)"
                    v-if="!((index + 1) === (variable.lookup_table.length))"
                    :title="translate('General_Remove')"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="alert alert-warning"
          v-show="variable.isDisabled"
        >
          {{ translate('TagManager_UseCustomTemplateCapabilityRequired', translate('TagManager_CapabilityUseCustomTemplates')) }}
        </div>
        <SaveButton
          class="createButton"
          v-show="!variable.isDisabled"
          @confirm="edit ? updateVariable() : createVariable()"
          :disabled="isUpdating || !isDirty"
          :saving="isUpdating"
          :value="edit
            ? translate('CoreUpdater_UpdateTitle')
            : translate('TagManager_CreateNewVariable')"
        />
        <div
          class="entityCancel"
          v-show="!isEmbedded"
        >
          <a @click.prevent="cancel()">{{ translate('General_Cancel') }}</a>
        </div>
      </div>
    </form>
    <div
      id="confirmSelectVariableType"
      v-show="chooseVariableType"
    >
      <ul
        class="collection with-header"
        v-for="(variableCategory, index) in availableVariables"
        :key="index"
      >
        <li class="collection-header">
          <h4>{{ variableCategory.name }}</h4>
        </li>
        <li
          v-for="(variableTemplate, index) in variableCategory.types"
          :key="index"
          class="collection-item avatar"
          @click="createVariableType(variableTemplate)"
          :class="{
            disabledTemplate: variableTemplate.isDisabled,
            [`templateType${variableTemplate.id}`]: true,
          }"
          :title="!variableTemplate.isDisabled ? '' :
            translate('TagManager_UseCustomTemplateCapabilityRequired',
              translate('TagManager_CapabilityUseCustomTemplates'))"
        >
          <img
            alt
            class="circle"
            :src="variableTemplate.icon"
            v-if="variableTemplate.icon"
          />
          <span class="title">{{ variableTemplate.name }}</span>
          <p v-show="variableTemplate.description">{{ variableTemplate.description }}</p>
          <span
            class="secondary-content"
            v-show="!!variableTemplate.help"
          >
            <i
              class="icon-help"
              :title="variableTemplate.help"
            />
          </span>
        </li>
      </ul>
      <div
        class="entityCancel"
        v-show="!isEmbedded"
      >
        <a @click.prevent="cancel()">{{ translate('General_Cancel') }}</a>
      </div>
    </div>
  </ContentBlock>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  translate,
  AjaxHelper,
  ContentBlock,
  Matomo,
} from 'CoreHome';
import {
  Field,
  FormField,
  SaveButton,
  GroupedSettings,
} from 'CorePluginsAdmin';
import VariablesStore from './Variables.store';
import { Variable, VariableCategory, Container } from '../types';
import AvailableComparisonsStore from '../AvailableComparisons.store';

interface Option {
  key: string;
  value: unknown;
}

type DeregisterWatch = () => void;

interface VariableEditState {
  isDirty: boolean;
  showAdvanced: boolean;
  canUseCustomTemplates: boolean;
  availableVariables: VariableCategory[];
  editTitle: string;
  create: boolean;
  edit: boolean;
  variable: Variable;
  chooseVariableType: boolean;
  parameterValues: Record<string, unknown>;
  deregisterWatches: DeregisterWatch[];
}

export default defineComponent({
  props: {
    idVariable: [String, Number],
    idContainer: {
      type: [String, Number],
      required: true,
    },
    idContainerVersion: {
      type: [String, Number],
      required: true,
    },
    variableType: {
      type: [String, Number],
      required: true,
    },
    // TODO: initialized to !!this.onChangeVariable
    isEmbedded: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    GroupedSettings,
    ContentBlock,
    Field,
    FormField,
    SaveButton,
  },
  data(): VariableEditState {
    return {
      isDirty: false,
      showAdvanced: false,
      chooseVariableType: false,
      canUseCustomTemplates: Matomo.hasUserCapability('tagmanager_use_custom_templates'),
      availableVariables: [],
      editTitle: '',
      create: this.idVariable === '0' || this.idVariable === 0,
      edit: !this.create,
      variable: {} as unknown as Variable,
      chooseVariableType: false,
      parameterValues: {},
      deregisterWatches: [],
    };
  },
  emits: ['changeVariable'],
  created() {
    // needed for suggestNameForType() to make sure it is aware of all names
    VariablesStore.fetchVariablesIfNotLoaded(this.idContainer, this.idContainerVersion);

    /* TODO: why is this needed (needed in adapter for idVariable which is two-way bound)
    this.$on('$destroy', function () {
      this.idVariable = null;
      currentId = null;
    });
    */

    if (this.idVariable) {
      this.initIdVariable();
    }
  },
  watch: {
    idVariable(newValue) {
      if (newValue === null) {
        return;
      }

      this.initIdVariable();
    },
  },
  methods: {
    // TODO
    enrichTemplateType(template) {
      template.isDisabled = !this.canUseCustomTemplates && template && template.isCustomTemplate;
      return template;
    },
    // TODO
    removeAnyVariableNotification() {
      var notification = this.notification;
      notification.remove(notificationId);
      notification.remove('ajaxHelper');
    },
    // TODO
    showNotification(message, context) {
      var notification = this.notification;
      notification.show(message, {
        context: context,
        id: notificationId
      });
      $timeout(function () {
        notification.scrollToNotification();
      }, 200);
    },
    // TODO
    showErrorFieldNotProvidedNotification(title) {
      var message = translate('TagManager_ErrorXNotProvided', [title]);
      this.showNotification(message, 'error');
    },
    onIdContainerChange() {
      if (this.idContainer) {
        AjaxHelper.fetch<Container>({
          method: 'TagManager.getContainer',
          idContainer: this.idContainer,
          filter_limit: '-1',
        }).then((container) => {
          this.idContainerContext = container.context;
        });
      } else {
        this.idContainerContext = null; // TODO
      }
    },
    // TODO
    initIdVariable() {
      this.deregisterWatches.forEach((fn) => fn());

      Matomo.helper.lazyScrollToContent();

      this.availableVariables = [];

      ;

      this.model.fetchContainer(this.idContainer).then(function (container) {
        return this.model.fetchAvailableVariables(container.context);
      }).then(function (variables) {
        angular.forEach(variables, function (variablesGroup) {
          angular.forEach(variablesGroup.types, function (variable) {
            this.enrichTemplateType(variable);
          });
        });
        this.availableVariables = variables;
      }).then(function () {
        if (this.edit && this.idVariable) {
          this.editTitle = translate('TagManager_EditVariable');
          this.model.findVariable(this.idContainer, this.idContainerVersion, this.idVariable).then(function (variable) {
            if (!variable) {
              return;
            }

            this.variable = angular.copy(variable);
            this.variable.idcontainer = this.idContainer;

            if (this.variable.typeMetadata) {
              this.enrichTemplateType(this.variable.typeMetadata);
            }

            if (this.variable.lookup_table && this.variable.lookup_table.length) {
              this.showAdvanced = true; // make sure lookup_table is visible directly if configured
            } else if (this.variable.default_value) {
              this.showAdvanced = true; // make sure default_value is visible directly if configured
            }

            this.addLookUpEntryIfNoneExists();
            this.onLookupChange();
            this.addParameterWatch();
            this.isDirty = false;
          });
        } else if (this.create) {
          var found = false;

          if (this.variableType) {
            angular.forEach(this.availableVariables, function (variablesCategory) {
              angular.forEach(variablesCategory.types, function (variable) {
                if (!found && variable && variable.id === this.variableType) {
                  this.createVariableType(variable);
                  found = true;
                }
              });
            });
          }

          if (!found) {
            this.editTitle = translate('TagManager_ChooseVariableToContinue');
            this.chooseVariableType = true;
          }
        }
      });
    },
    // TODO
    addParameterWatch() {
      var index;

      if (this.variable.typeMetadata && this.variable.parameters) {
        for (index = 0; index < this.variableTemplate?.parameters.length; index++) {
          deregisterWatches.push(this.$watch('editVariable.variableTemplate?.parameters[' + index + '].value', function (val, oldVal) {
            if (val !== oldVal) {
              this.isDirty = true;
            }
          }, true));
        }
      }
    },
    // TODO
    addLookUpEntryIfNoneExists() {
      if (!this.variable.lookup_table || !angular.isArray(this.variable.lookup_table)) {
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
    // TODO
    onLookupChange() {
      var hasAll = true;
      angular.forEach(this.variable.lookup_table, function (table) {
        if (!table || !table.out_value) {
          hasAll = false;
        }
      });

      if (hasAll) {
        this.addLookUpEntry();
      }
    },
    // TODO
    addLookUpEntry() {
      this.variable.lookup_table.push({
        comparison: 'equals',
        match_value: '',
        out_value: ''
      });
      this.isDirty = true;
    },
    // TODO
    removeLookUpEntry(index) {
      if (index > -1) {
        this.variable.lookup_table.splice(index, 1);
        this.isDirty = true;
      }
    },
    // TODO
    createVariableType(variableTemplate) {
      if (variableTemplate && variableTemplate.isDisabled) {
        return;
      }

      this.chooseVariableType = false;
      this.editTitle = translate('TagManager_CreateNewVariable');
      this.variable = {
        idSite: piwik.idSite,
        name: this.model.suggestNameForType(variableTemplate.name),
        type: variableTemplate.id,
        idcontainer: this.idContainer,
        idcontainerversion: this.idContainerVersion,
        parameters: {},
        default_value: '',
        lookup_table: [],
        typeMetadata: variableTemplate
      };
      this.addLookUpEntry();
      this.addParameterWatch();
      this.isDirty = true; // we directly make the create button visible as sometimes some variables do not have any settings

      $timeout(function () {
        var editVariable = $('.editVariable');

        if (editVariable.length && editVariable[0]) {
          editVariable[0].scrollIntoView();
        }

        $('.editVariable #name').focus();
      }, 1);
    },
    // TODO
    cancel() {
      this.idVariable = null;
      currentId = null;
      var $search = $location.search();
      delete $search.idVariable;
      $location.search($search);
    },
    // TODO
    createVariable() {
      this.removeAnyVariableNotification();

      if (!this.checkRequiredFieldsAreSet) {
        return;
      }

      this.isUpdating = true;
      var tempVariable = angular.copy(this.variable);
      tempVariable.name = encodeURIComponent(tempVariable.name);
      tagManagerVariableModel.createOrUpdateVariable(tempVariable, 'TagManager.addContainerVariable').then(function (response) {
        this.isUpdating = false;

        if (!response || response.type === 'error' || !response.response) {
          return;
        }

        this.isDirty = false;
        var this.idVariable = response.response.value;

        if ('function' === typeof this.onChangeVariable) {
          this.model.reload(this.idContainer, this.idContainerVersion);
          this.variable.idvariable = this.idVariable;
          this.$emit('changeVariable', {
            variable: this.variable
          });
          return;
        }

        tagManagerVariableModel.reload(this.idContainer, this.idContainerVersion).then(function () {
          if (piwik.helper.isAngularRenderingThePage()) {
            var $search = $location.search();
            $search.idVariable = this.idVariable;
            $location.search($search);
          } else {
            $location.url('/?idVariable=' + this.idVariable);
          }

          $timeout(function () {
            this.showNotification(translate('TagManager_CreatedX', translate('TagManager_Variable')) + ' ' + translate('TagManager_WantToDeployThisChangeCreateVersion', '<a onclick="tagManagerHelper.createNewVersion()">', '</a>'), response.type);
          }, 200);
        });
      }, function () {
        this.isUpdating = false;
      });
    },
    // TODO
    setValueHasChanged() {
      this.isDirty = true;
    },
    // TODO
    updateVariable() {
      this.removeAnyVariableNotification();

      if (!this.checkRequiredFieldsAreSet) {
        return;
      }

      this.isUpdating = true;
      var tempVariable = angular.copy(this.variable);
      tempVariable.name = encodeURIComponent(tempVariable.name);
      tagManagerVariableModel.createOrUpdateVariable(tempVariable, 'TagManager.updateContainerVariable').then(function (response) {
        if (response.type === 'error') {
          return;
        }

        var this.idVariable = this.variable.idvariable;

        if ('function' === typeof this.onChangeVariable) {
          this.$emit('changeVariable', {
            variable: this.variable
          });
          return;
        }

        this.isDirty = false;
        this.variable = {};
        tagManagerVariableModel.reload(this.idContainer, this.idContainerVersion).then(function () {
          this.init(this.idVariable);
        });
        this.showNotification(translate('TagManager_UpdatedX', translate('TagManager_Variable')) + ' ' + translate('TagManager_WantToDeployThisChangeCreateVersion', '<a onclick="tagManagerHelper.createNewVersion()">', '</a>'), response.type);
      });
    },
  },
  computed: {
    isLoading() {
      return VariablesStore.isLoading.value || AvailableComparisonsStore.isLoading.value;
    },
    isUpdating() {
      return VariablesStore.isUpdating.value;
    },
    availableLookUpComparisons() {
      return AvailableComparisonsStore.comparisonOptions.value;
    },
    // TODO
    notification() {
      var UI = require('piwik/UI');

      return new UI.Notification();
    },
    // TODO
    checkRequiredFieldsAreSet() {
      var title;

      if (!this.variable.name) {
        title = _pk_translate('General_Name');
        this.showErrorFieldNotProvidedNotification(title);
        return false;
      }

      return true;
    },
  },
});
</script>
