<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="editTrigger tagManagerManageEdit" ref="root">
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
        v-show="!chooseTriggerType && editTitle"
        @submit="edit ? updateTrigger() : createTrigger()"
      >
        <div>
          <div
            class="alert alert-warning"
            v-show="isTriggerDisabled"
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
              :model-value="trigger.typeMetadata?.name"
              :disabled="true"
              :inline-help="`${trigger.typeMetadata?.description} ${trigger.typeMetadata?.help}`"
              :title="translate('TagManager_Type')"
            />
          </div>
          <div>
            <Field
              uicontrol="text"
              name="name"
              :model-value="trigger.name"
              @update:model-value="trigger.name = $event; setValueHasChanged()"
              :maxlength="50"
              :title="translate('General_Name')"
              :inline-help="translate('TagManager_TriggerNameHelp')"
            />
          </div>
          <div>
            <Field
              uicontrol="textarea"
              name="description"
              :model-value="trigger.description"
              @update:model-value="trigger.description = $event; setValueHasChanged()"
              :maxlength="1000"
              :title="translate('General_Description')"
              :inline-help="translate('TagManager_TriggerDescriptionHelp')"
            />
          </div>
          <div
            class="form-group row"
            v-show="trigger.typeMetadata?.parameters?.length"
          >
            <div class="col s12">
              <h3>{{ translate('TagManager_ConfigureThisTrigger') }}</h3>
            </div>
          </div>
          <div v-if="trigger">
            <GroupedSettings
              :settings="trigger.typeMetadata?.parameters || []"
              :all-setting-values="parameterValues"
              @change="parameterValues[$event.name] = $event.value"
            />
          </div>
          <div
            class="form-group row"
            v-show="trigger.typeMetadata?.hasAdvancedSettings"
          >
            <div class="col s12">
              <h3>
                {{ translate('TagManager_OnlyTriggerWhen') }} {{ translate('Goals_Optional') }}
              </h3>
            </div>
          </div>
          <div v-show="trigger.typeMetadata?.hasAdvancedSettings">
            <div class="form-group row multiple">
              <div class="col s12 m12">
                <div>
                  <p>
                    {{ translate('TagManager_TriggerConditionsHelp') }}
                  </p>
                  <div
                    v-for="(condition, index) in trigger.conditions"
                    :key="index"
                    class="condition multiple valign-wrapper"
                    :class="`condition${index}`"
                  >
                    <div class="innerFormField">
                      <Field
                        uicontrol="expandable-select"
                        name="condition_actual"
                        :model-value="condition.actual"
                        @update:model-value="condition.actual = $event; setValueHasChanged()"
                        :full-width="true"
                        :options="availableVariables"
                        :title="variableIdToName[condition.actual] || condition.actual"
                      />
                    </div>
                    <div class="innerFormField comparisonField">
                      <Field
                        uicontrol="select"
                        name="condition_comparison"
                        :model-value="condition.comparison"
                        @update:model-value="condition.comparison = $event; setValueHasChanged()"
                        :full-width="true"
                        :options="availableComparisons"
                      />
                    </div>
                    <div class="innerFormField">
                      <Field
                        uicontrol="text"
                        name="condition_expected"
                        :model-value="condition.expected"
                        @update:model-value="condition.expected = $event;
                          setValueHasChanged(); onConditionChange()"
                        :full-width="true"
                      />
                    </div>
                    <span
                      class="icon-minus valign"
                      @click="removeConditionEntry(index)"
                      v-show="!((index + 1) === trigger.conditions.length)"
                      :title="translate('General_Remove')"
                    />
                  </div>
                </div>
                <p class="triggerConditionNode">
                  {{ translate('TagManager_TriggerConditionNode') }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="alert alert-warning"
            v-show="isTriggerDisabled"
          >
            {{ translate(
                'TagManager_UseCustomTemplateCapabilityRequired',
                translate('TagManager_CapabilityUseCustomTemplates'),
              ) }}
          </div>
          <SaveButton
            class="createButton"
            v-show="!isTriggerDisabled"
            @confirm="edit ? updateTrigger() : createTrigger()"
            :disabled="isUpdating || !isDirty"
            :saving="isUpdating"
            :value="saveButtonText"
          />
          <div
            class="entityCancel"
            v-show="!isEmbedded"
          >
            <a @click="cancel()">{{ translate('General_Cancel') }}</a>
          </div>
        </div>
      </form>
      <div
        id="confirmSelectTriggerType"
        v-show="chooseTriggerType"
      >
        <ul
          class="collection with-header"
          v-for="(triggerCategory, index) in availableTriggers"
          :key="index"
        >
          <li class="collection-header">
            <h4>{{ triggerCategory.name }}</h4>
          </li>
          <li
            class="collection-item avatar"
            @click="createTriggerType(triggerTemplate)"
            :class="{
              disabledTemplate: isTriggerTemplateDisabled[triggerTemplate.id],
              [`templateType${ triggerTemplate.id}`]: true,
            }"
            v-for="(triggerTemplate, index) in triggerCategory.types"
            :key="index"
            :title="!isTriggerTemplateDisabled[triggerTemplate.id] ? '' : collectionItemAvatarText"
          >
            <img
              alt
              class="circle"
              :src="triggerTemplate.icon"
              v-if="triggerTemplate.icon"
            />
            <span class="title">{{ triggerTemplate.name }}</span>
            <p v-show="triggerTemplate.description">{{ triggerTemplate.description }}</p>
            <span
              class="secondary-content"
              v-show="!!triggerTemplate.help"
            >
              <i
                class="icon-help"
                :title="triggerTemplate.help"
              />
            </span>
          </li>
        </ul>
        <div
          class="entityCancel"
          v-show="!isEmbedded"
        >
          <a @click="cancel()">{{ translate('General_Cancel') }}</a>
        </div>
      </div>
    </ContentBlock>
  </div>
</template>

<script lang="ts">
import { DeepReadonly, defineComponent, nextTick } from 'vue';
import {
  translate,
  AjaxHelper,
  ContentBlock,
  Matomo,
  NotificationType,
  NotificationsStore,
  clone,
  MatomoUrl,
} from 'CoreHome';
import { Field, GroupedSettings, SaveButton } from 'CorePluginsAdmin';
import TriggersStore from './Triggers.store';
import AvailableComparisonsStore from '../AvailableComparisons.store';
import {
  Container,
  ContainerVariableCategory,
  Trigger,
  TriggerCategory,
  TriggerType,
} from '../types';

interface Option {
  key: string;
  value: string;
  group: string;
  tooltip: string;
}

interface TriggerEditState {
  isDirty: boolean;
  chooseTriggerType: boolean;
  availableTriggers: DeepReadonly<TriggerCategory[]>;
  availableVariables: Option[];
  variableIdToName: Record<string, string>;
  trigger: Trigger;
  editTitle: string;
  parameterValues: Record<string, unknown>;
  isUpdatingTrigger: boolean;
}

const notificationId = 'tagvariablemanagement';

const TRIGGER_TYPE_TO_CONDITION_ACTUAL: Record<string, string> = {
  AllElementsClick: 'ClickId',
  AllLinksClick: 'ClickId',
  DownloadClick: 'ClickId',
  ElementVisibility: 'VisibleElementClasses',
  FormSubmit: 'FormId',
  JavaScriptError: 'ErrorMessage',
};

export default defineComponent({
  props: {
    idTrigger: Number,
    idContainer: {
      type: String,
      required: true,
    },
    idContainerVersion: {
      type: Number,
      required: true,
    },
    newTriggerType: String,
    isEmbedded: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ContentBlock,
    Field,
    GroupedSettings,
    SaveButton,
  },
  data(): TriggerEditState {
    return {
      isDirty: false,
      chooseTriggerType: false,
      availableTriggers: [],
      availableVariables: [],
      variableIdToName: {},
      editTitle: '',
      trigger: {} as unknown as Trigger,
      parameterValues: {},
      isUpdatingTrigger: false,
    };
  },
  emits: ['changeTrigger'],
  created() {
    AvailableComparisonsStore.init();

    AjaxHelper.fetch<ContainerVariableCategory[]>({
      method: 'TagManager.getAvailableContainerVariables',
      filter_limit: '-1',
      idContainer: this.idContainer,
      idContainerVersion: this.idContainerVersion,
    }).then((categories) => {
      categories.forEach((category) => {
        category.types.forEach((v) => {
          this.variableIdToName[v.id] = v.name;
          this.availableVariables.push({
            key: v.id,
            value: v.name,
            group: category.name,
            tooltip: v.description,
          });
        });
      });
    });

    // needed for suggestNameForType() to make sure it is aware of all names
    TriggersStore.fetchTriggersIfNotLoaded(this.idContainer, this.idContainerVersion);

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
      deep: true,
    },
  },
  methods: {
    checkRequiredFieldsAreSet() {
      if (!this.trigger.name) {
        this.showErrorFieldNotProvidedNotification(translate('General_Name'));
        return false;
      }

      return true;
    },
    removeAnyTriggerNotification() {
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
    initIdTrigger() {
      this.trigger = {} as unknown as Trigger;
      this.chooseTriggerType = false;
      this.editTitle = '';

      Matomo.helper.lazyScrollToContent();

      this.availableTriggers = [];

      AjaxHelper.fetch<Container>({
        method: 'TagManager.getContainer',
        idContainer: this.idContainer,
        filter_limit: '-1',
      }).then(
        (container) => TriggersStore.fetchAvailableTriggers(container.context),
      ).then((triggers) => {
        this.availableTriggers = triggers;
      }).then(() => {
        if (this.edit && this.idTrigger) {
          this.editTitle = translate('TagManager_EditTrigger');
          TriggersStore.findTrigger(
            this.idContainer,
            this.idContainerVersion,
            this.idTrigger,
          ).then((trigger) => {
            if (!trigger) {
              return;
            }

            this.trigger = clone(trigger) as unknown as Trigger;
            this.parameterValues = Object.fromEntries(trigger.typeMetadata.parameters.map(
              (s) => [s.name, s.value],
            ));

            this.addConditionEntryIfNoneExists();
            this.onConditionChange();
            this.isDirty = false;
          });
          return;
        }

        if (this.create) {
          this.editTitle = translate('TagManager_ChooseTriggerToContinue');
          this.chooseTriggerType = true;
        }
      });
    },
    onConditionChange() {
      const hasAll = (this.trigger.conditions || []).every((c) => !!c?.expected);
      if (hasAll) {
        this.addConditionEntry();
      }
    },
    addConditionEntryIfNoneExists() {
      if (!this.trigger.conditions
        || !Array.isArray(this.trigger.conditions)
      ) {
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
    removeConditionEntry(index: number) {
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
    createTriggerType(triggerTemplate: TriggerType) {
      if (triggerTemplate && this.isTriggerTemplateDisabled[triggerTemplate.id]) {
        return;
      }

      this.chooseTriggerType = false;
      this.editTitle = translate('TagManager_CreateNewTrigger');
      this.trigger = {
        idsite: parseInt(`${Matomo.idSite}`, 10),
        name: TriggersStore.suggestNameForType(triggerTemplate.name) || '',
        description: '',
        type: triggerTemplate.id,
        idcontainerversion: this.idContainerVersion,
        conditions: [],
        typeMetadata: triggerTemplate,
      };

      this.parameterValues = Object.fromEntries(triggerTemplate.parameters.map(
        (s) => [s.name, s.value],
      ));

      this.addConditionEntry();

      // we directly make the create button visible as sometimes some triggers do not
      // have any settings
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
      delete newParams.idTrigger;

      MatomoUrl.updateHash(newParams);
    },
    createTrigger() {
      this.removeAnyTriggerNotification();

      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }

      this.isUpdatingTrigger = true;
      TriggersStore.createOrUpdateTrigger(
        this.trigger,
        'TagManager.addContainerTrigger',
        this.idContainer,
        this.idContainerVersion,
        this.parameterValues,
      ).then((response) => {
        const idTrigger = response.value;

        this.isDirty = false;
        TriggersStore.reload(this.idContainer, this.idContainerVersion).then(() => {
          if (this.isEmbedded) {
            this.trigger.idtrigger = idTrigger;
            this.$emit('changeTrigger', {
              trigger: this.trigger,
            });
            return;
          }

          MatomoUrl.updateHash({
            ...MatomoUrl.hashParsed.value,
            idTrigger,
          });

          setTimeout(() => {
            const createdX = translate('TagManager_CreatedX', translate('TagManager_Trigger'));
            const wantToRedeploy = translate(
              'TagManager_WantToDeployThisChangeCreateVersion',
              '<a href="" class="createNewVersionLink">',
              '</a>',
            );

            this.showNotification(`${createdX} ${wantToRedeploy}`, 'success');
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
      TriggersStore.createOrUpdateTrigger(
        this.trigger,
        'TagManager.updateContainerTrigger',
        this.idContainer,
        this.idContainerVersion,
        this.parameterValues,
      ).then((response) => {
        if (!response) {
          return;
        }

        if (this.isEmbedded) {
          this.$emit('changeTrigger', {
            trigger: this.trigger,
          });
          return;
        }

        this.isDirty = false;
        TriggersStore.reload(this.idContainer, this.idContainerVersion).then(() => {
          this.initIdTrigger();
        });

        const updatedAt = translate('TagManager_UpdatedX', translate('TagManager_Trigger'));
        const wantToDeploy = translate(
          'TagManager_WantToDeployThisChangeCreateVersion',
          '<a href="" class="createNewVersionLink">',
          '</a>',
        );

        this.showNotification(`${updatedAt} ${wantToDeploy}`, 'success');
      }).finally(() => {
        this.isUpdatingTrigger = false;
      });
    },
    makeDefaultCondition() {
      let actual = 'PageUrl';
      if (this.trigger?.typeMetadata) {
        const type = this.trigger.typeMetadata.id;
        if (TRIGGER_TYPE_TO_CONDITION_ACTUAL[type]) {
          actual = TRIGGER_TYPE_TO_CONDITION_ACTUAL[type];
        }
      }
      return { comparison: 'equals', actual, expected: '' };
    },
  },
  computed: {
    isLoading() {
      return TriggersStore.isLoading.value || AvailableComparisonsStore.isLoading.value;
    },
    isUpdating() {
      return TriggersStore.isUpdating.value || this.isUpdatingTrigger;
    },
    create() {
      return this.idTrigger === 0;
    },
    edit() {
      return !this.create;
    },
    canUseCustomTemplates() {
      return Matomo.hasUserCapability('tagmanager_use_custom_templates');
    },
    isTriggerDisabled() {
      return !this.canUseCustomTemplates && this.trigger.typeMetadata?.isCustomTemplate;
    },
    saveButtonText() {
      return this.edit
        ? translate('CoreUpdater_UpdateTitle')
        : translate('TagManager_CreateNewTrigger');
    },
    collectionItemAvatarText() {
      return translate(
        'TagManager_UseCustomTemplateCapabilityRequired',
        translate('TagManager_CapabilityUseCustomTemplates'),
      );
    },
    availableComparisons() {
      return AvailableComparisonsStore.comparisonOptions.value;
    },
    isTriggerTemplateDisabled() {
      const result: Record<string, boolean> = {};
      this.availableTriggers.forEach((triggerCategory) => {
        triggerCategory.types.forEach((trigger) => {
          result[trigger.id] = !this.canUseCustomTemplates && trigger.isCustomTemplate;
        });
      });
      return result;
    },
    triggerParameterValues() {
      if (!this.trigger.typeMetadata?.parameters) {
        return null;
      }

      return this.parameterValues;
    },
  },
});
</script>
