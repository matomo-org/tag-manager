<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="editVariable tagManagerManageEdit" ref="root">
    <ContentBlock
      feature="Tag Manager"
      :content-title="editTitle"
    >
      <p v-show="isLoading">
        <span class="loadingPiwik">
          <img src="plugins/Morpheus/images/loading-blue.gif" />
          {{ translate('General_LoadingData') }}
        </span>
      </p>
      <p v-show="isUpdating">
        <span class="loadingPiwik">
          <img src="plugins/Morpheus/images/loading-blue.gif" />
          {{ translate('TagManager_UpdatingData') }}
        </span>
      </p>
      <form
        v-show="!chooseVariableType && editTitle"
        @submit="edit ? updateVariable() : createVariable()"
      >
        <div>
          <div
            class="alert alert-warning"
            v-show="isVariableDisabled"
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
              :model-value="variable.typeMetadata?.name"
              :disabled="true"
              :inline-help="typeInlineHelp"
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
          <div>
            <Field
              uicontrol="textarea"
              name="description"
              :model-value="variable.description"
              @update:model-value="variable.description = $event; setValueHasChanged()"
              :maxlength="1000"
              :title="translate('General_Description')"
              :inline-help="translate('TagManager_VariableDescriptionHelp')"
            />
          </div>
          <div
            class="form-group row"
            v-if="variable.typeMetadata?.parameters?.length"
          >
            <div class="col s12">
              <h3>{{ translate('TagManager_ConfigureThisVariable') }}</h3>
            </div>
          </div>
          <div v-if="variable">
            <GroupedSettings
              :settings="variable.typeMetadata?.parameters || []"
              :all-setting-values="parameterValues"
              @change="parameterValues[$event.name] = $event.value"
            />
          </div>
          <div
            class="form-group row"
            v-show="variable.typeMetadata?.hasAdvancedSettings"
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
          <div v-show="showAdvanced && variable.typeMetadata?.hasAdvancedSettings">
            <div class="innerFormField">
              <Field
                uicontrol="text"
                name="default_value"
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
                    <div class="innerFormField comparisonField">
                      <Field
                        uicontrol="select"
                        name="lookup_table_comparison"
                        :model-value="lookup.comparison"
                        @update:model-value="lookup.comparison = $event; setValueHasChanged()"
                        :full-width="true"
                        :options="availableLookUpComparisons"
                      />
                    </div>
                    <div class="innerFormField">
                      <Field
                        uicontrol="text"
                        name="lookup_table_matchvalue"
                        :model-value="lookup.match_value"
                        @update:model-value="lookup.match_value = $event; setValueHasChanged();"
                        :full-width="true"
                        :placeholder="translate('TagManager_LookupTableMatchValue')"
                      />
                    </div>
                    <div class="innerFormField">
                      <Field
                        uicontrol="text"
                        name="lookup_table_outvalue"
                        :model-value="lookup.out_value"
                        @update:model-value="lookup.out_value = $event; setValueHasChanged();"
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
            v-show="isVariableDisabled"
          >
            {{ translate(
                'TagManager_UseCustomTemplateCapabilityRequired',
                translate('TagManager_CapabilityUseCustomTemplates'),
              ) }}
          </div>
          <SaveButton
            class="createButton"
            v-show="!isVariableDisabled"
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
              disabledTemplate: this.isVariableTemplateDisabled[variableTemplate.id],
              [`templateType${variableTemplate.id}`]: true,
            }"
            :title="!this.isVariableTemplateDisabled[variableTemplate.id] ? '' :
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
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, DeepReadonly } from 'vue';
import {
  translate,
  AjaxHelper,
  ContentBlock,
  Matomo,
  NotificationsStore,
  NotificationType,
  MatomoUrl,
  clone,
} from 'CoreHome';
import {
  Field,
  SaveButton,
  GroupedSettings,
} from 'CorePluginsAdmin';
import VariablesStore from './Variables.store';
import {
  Variable,
  VariableCategory,
  Container,
  VariableType,
} from '../types';
import AvailableComparisonsStore from '../AvailableComparisons.store';

interface VariableEditState {
  isDirty: boolean;
  showAdvanced: boolean;
  canUseCustomTemplates: boolean;
  availableVariables: DeepReadonly<VariableCategory[]>;
  editTitle: string;
  variable: Variable;
  chooseVariableType: boolean;
  parameterValues: Record<string, unknown>;
  isUpdatingVar: boolean;
}

const notificationId = 'tagvariablemanagement';

export default defineComponent({
  props: {
    idVariable: Number,
    idContainer: {
      type: String,
      required: true,
    },
    idContainerVersion: {
      type: Number,
      required: true,
    },
    variableType: String,
    isEmbedded: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    GroupedSettings,
    ContentBlock,
    Field,
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
      variable: {} as unknown as Variable,
      parameterValues: {},
      isUpdatingVar: false,
    };
  },
  emits: ['changeVariable'],
  created() {
    AvailableComparisonsStore.init();

    // needed for suggestNameForType() to make sure it is aware of all names
    VariablesStore.fetchVariablesIfNotLoaded(this.idContainer, this.idContainerVersion);

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
      deep: true,
    },
    variableLookupTable: {
      handler() {
        const hasAll = (this.variable.lookup_table || []).every((t) => !!t?.out_value);
        if (hasAll) {
          this.addLookUpEntry();
        }
      },
      deep: true,
    },
  },
  methods: {
    removeAnyVariableNotification() {
      NotificationsStore.remove(notificationId);
      NotificationsStore.remove('ajaxHelper');
    },
    showNotification(message: string, context: NotificationType['context']) {
      const notificationInstanceId = NotificationsStore.show({
        message,
        context,
        id: notificationId,
        type: 'transient',
      });
      setTimeout(() => {
        NotificationsStore.scrollToNotification(notificationInstanceId);
      }, 200);
    },
    showErrorFieldNotProvidedNotification(title: string) {
      const message = translate('TagManager_ErrorXNotProvided', [title]);
      this.showNotification(message, 'error');
    },
    initIdVariable() {
      Matomo.helper.lazyScrollToContent();

      this.availableVariables = [];

      AjaxHelper.fetch<Container>({
        method: 'TagManager.getContainer',
        idContainer: this.idContainer,
        filter_limit: '-1',
      }).then(
        (container) => VariablesStore.fetchAvailableVariables(container.context),
      ).then((variables) => {
        this.availableVariables = variables;
      }).then(() => {
        if (this.edit && this.idVariable) {
          this.editTitle = translate('TagManager_EditVariable');
          VariablesStore.findVariable(
            this.idContainer,
            this.idContainerVersion,
            this.idVariable,
            this.isEmbedded,
          ).then((variable) => {
            if (!variable) {
              return;
            }

            this.variable = clone(variable) as unknown as Variable;
            this.parameterValues = Object.fromEntries(variable.typeMetadata.parameters.map(
              (s) => [s.name, s.value],
            ));

            if ((this.variable.lookup_table && this.variable.lookup_table.length)
              || this.variable.default_value
            ) {
              this.showAdvanced = true; // make sure lookup_table is visible directly if configured
            }

            this.addLookUpEntryIfNoneExists();
            this.isDirty = false;
          });

          return;
        }

        if (this.create) {
          let found = false;

          if (this.variableType) {
            this.availableVariables.forEach((category) => {
              if (!found) {
                const variable = category.types.find((v) => v?.id === this.variableType);
                if (variable) {
                  found = true;

                  this.createVariableType(variable);
                }
              }
            });
          }

          if (!found) {
            this.editTitle = translate('TagManager_ChooseVariableToContinue');
            this.chooseVariableType = true;
          }
        }
      });
    },
    addLookUpEntryIfNoneExists() {
      if (!this.variable.lookup_table
        || !Array.isArray(this.variable.lookup_table)
      ) {
        this.variable.lookup_table = [];
      }

      if (!this.variable.lookup_table.length) {
        this.variable.lookup_table.push({
          comparison: 'equals',
          match_value: '',
          out_value: '',
        });
      }
    },
    addLookUpEntry() {
      this.variable.lookup_table.push({
        comparison: 'equals',
        match_value: '',
        out_value: '',
      });
      this.isDirty = true;
    },
    removeLookUpEntry(index: number) {
      if (index > -1) {
        this.variable.lookup_table.splice(index, 1);
        this.isDirty = true;
      }
    },
    createVariableType(variableTemplate: DeepReadonly<VariableType>) {
      if (variableTemplate && this.isVariableTemplateDisabled[variableTemplate.id]) {
        return;
      }

      this.chooseVariableType = false;
      this.editTitle = translate('TagManager_CreateNewVariable');

      this.variable = {
        idsite: parseInt(`${Matomo.idSite}`, 10),
        name: VariablesStore.suggestNameForType(variableTemplate.name) || '',
        description: '',
        type: variableTemplate.id,
        idcontainer: this.idContainer,
        idcontainerversion: this.idContainerVersion,
        default_value: '',
        lookup_table: [],
        typeMetadata: variableTemplate,
      };

      this.parameterValues = Object.fromEntries(variableTemplate.parameters.map(
        (s) => [s.name, s.value],
      ));

      this.addLookUpEntry();

      // we directly make the create button visible as sometimes some variables do not have
      // any settings
      this.isDirty = true;

      nextTick(() => {
        if (!this.$refs.root) {
          return;
        }

        const root = this.$refs.root as HTMLElement;
        root.scrollIntoView();

        const name = root.querySelector('#name') as HTMLElement;
        if (name) {
          name.focus();
        }
      });
    },
    cancel() {
      const newParams = { ...MatomoUrl.hashParsed.value };
      delete newParams.idVariable;

      MatomoUrl.updateHash(newParams);
    },
    createVariable() {
      this.removeAnyVariableNotification();

      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }

      this.isUpdatingVar = true;

      VariablesStore.createOrUpdateVariable(
        { ...this.variable, name: encodeURIComponent(this.variable.name) },
        'TagManager.addContainerVariable',
        this.idContainer,
        this.idContainerVersion,
        this.parameterValues,
      ).then((response) => {
        if (!response) {
          return;
        }

        this.isDirty = false;

        const idVariable = response.value;

        VariablesStore.reload(this.idContainer, this.idContainerVersion).then(() => {
          if (this.isEmbedded) {
            this.variable.idvariable = idVariable;
            this.$emit('changeVariable', {
              variable: this.variable,
            });
            return;
          }

          if (Matomo.helper.isAngularRenderingThePage()) {
            MatomoUrl.updateHash({
              ...MatomoUrl.hashParsed.value,
              idVariable,
            });
          } else {
            // TODO: compare w/ original behavior
            MatomoUrl.updateHash({
              idVariable,
            });
          }

          setTimeout(() => {
            const createdX = translate('TagManager_CreatedX', translate('TagManager_Variable'));
            const wantToRedeploy = translate(
              'TagManager_WantToDeployThisChangeCreateVersion',
              '<a class="createNewVersionLink">',
              '</a>',
            );

            this.showNotification(`${createdX} ${wantToRedeploy}`, 'success');
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

      VariablesStore.createOrUpdateVariable(
        { ...this.variable, name: encodeURIComponent(this.variable.name) },
        'TagManager.updateContainerVariable',
        this.idContainer,
        this.idContainerVersion,
        this.parameterValues,
      ).then((response) => {
        if (!response) {
          return;
        }

        if (this.isEmbedded) {
          this.$emit('changeVariable', {
            variable: this.variable,
          });
          return;
        }

        this.isDirty = false;
        VariablesStore.reload(this.idContainer, this.idContainerVersion).then(() => {
          this.initIdVariable();
        });

        const updatedAt = translate('TagManager_UpdatedX', translate('TagManager_Variable'));
        const wantToDeploy = translate(
          'TagManager_WantToDeployThisChangeCreateVersion',
          '<a class="createNewVersionLink">',
          '</a>',
        );

        this.showNotification(`${updatedAt} ${wantToDeploy}`, 'success');
      }).finally(() => {
        this.isUpdatingVar = false;
      });
    },
    checkRequiredFieldsAreSet() {
      if (!this.variable.name) {
        this.showErrorFieldNotProvidedNotification(translate('General_Name'));
        return false;
      }
      return true;
    },
  },
  computed: {
    typeInlineHelp() {
      const desc = this.variable.typeMetadata?.description || '';
      const help = this.variable.typeMetadata?.help || '';
      return `${desc} ${help}`;
    },
    create() {
      return this.idVariable === 0;
    },
    edit() {
      return !this.create;
    },
    isLoading() {
      return VariablesStore.isLoading.value || AvailableComparisonsStore.isLoading.value;
    },
    isUpdating() {
      return VariablesStore.isUpdating.value || this.isUpdatingVar;
    },
    availableLookUpComparisons() {
      return AvailableComparisonsStore.comparisonOptions.value;
    },
    isVariableTemplateDisabled() {
      const result: Record<string, boolean> = {};
      this.availableVariables.forEach((variableCategory) => {
        variableCategory.types.forEach((variable) => {
          result[variable.id] = !this.canUseCustomTemplates && variable.isCustomTemplate;
        });
      });
      return result;
    },
    isVariableDisabled() {
      return !this.canUseCustomTemplates && this.variable.typeMetadata?.isCustomTemplate;
    },
    variableParameterValues() {
      if (!this.variable.typeMetadata?.parameters) {
        return null;
      }

      return this.parameterValues;
    },
    variableLookupTable() {
      return this.variable.lookup_table;
    },
  },
});
</script>
