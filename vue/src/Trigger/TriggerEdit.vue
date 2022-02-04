<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

// TODO
<todo>
- look over component code
- get to build
- test in UI
- create PR
</todo>

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
              <h3>{{ translate('TagManager_OnlyTriggerWhen') }} {{ translate('Goals_Optional') }}</h3>
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
                    <div>
                      <Field
                        uicontrol="expandable-select"
                        name="condition_actual"
                        class="innerFormField"
                        :model-value="condition.actual"
                        @update:model-value="condition.actual = $event; setValueHasChanged()"
                        :full-width="true"
                        :options="availableVariables"
                        :title="variableIdToName.condition.actual || condition.actual"
                      />
                    </div>
                    <div>
                      <Field
                        uicontrol="select"
                        name="condition_comparison"
                        class="innerFormField comparisonField"
                        :model-value="condition.comparison"
                        @update:model-value="condition.comparison = $event; setValueHasChanged()"
                        :full-width="true"
                        :options="availableComparisons"
                      />
                    </div>
                    <div>
                      <Field
                        uicontrol="text"
                        name="condition_expected"
                        class="innerFormField"
                        :model-value="condition.expected"
                        @update:model-value="condition.expected = $event;
                          setValueHasChanged(); onConditionChange()"
                        :full-width="true"
                      />
                    </div>
                    <span
                      class="icon-minus valign"
                      @click="removeConditionEntry(index)"
                      v-show="!((index + 1) == (trigger.conditions.length))"
                      :title="translate('General_Remove')"
                    />
                  </div>
                </div>
                <p class="triggerConditionNode">{{ translate('TagManager_TriggerConditionNode') }}</p>
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
              disabledTemplate: triggerTemplate.isDisabled,
              [`templateType${ triggerTemplate.id}`]: true,
            }"
            v-for="(triggerTemplate, index) in triggerCategory.types"
            :key="index"
            :title="!triggerTemplate.isDisabled ? '' : collectionItemAvatarText"
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
import { defineComponent } from 'vue';
import {
  translate,
  AjaxHelper,
  ContentBlock,
  Matomo, NotificationType, NotificationsStore,
} from 'CoreHome';
import { Field, FormField, SaveButton } from 'CorePluginsAdmin';
import TriggersStore from './Triggers.store';
import AvailableComparisonsStore from '../AvailableComparisons.store';
import { Trigger } from '../types';

interface TriggerEditState {
  isDirty: boolean;
  chooseTriggerType: boolean;
  canUseCustomTemplates: unknown; // TODO
  availableTriggers: unknown[]; // TODO
  availableComparisons: unknown[]; // TODO
  availableVariables: unknown[]; // TODO
  variableIdToName: Record<string, unknown>; // TODO
  trigger: Trigger;
  editTitle: string;
  parameterValues: Record<string, unknown>;
}

const notificationId = 'tagvariablemanagement';

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
    FormField,
    SaveButton,
  },
  data(): TriggerEditState {
    return {
      isDirty: false,
      chooseTriggerType: false,
      canUseCustomTemplates: Matomo.hasUserCapability('tagmanager_use_custom_templates'),
      availableTriggers: [],
      availableComparisons: [],
      availableVariables: [],
      variableIdToName: {},
      editTitle: '',
      trigger: {} as unknown as Trigger,
      parameterValues: {},
    };
  },
  emits: ['changeTrigger'],
  created() {
    this.model.fetchAvailableComparisons().then(function (comparisons) {
      this.availableComparisons = [];
      angular.forEach(comparisons, function (comparison) {
        this.availableComparisons.push({
          key: comparison.id,
          value: comparison.name
        });
      });
    });
    this.model.fetchAvailableContainerVariables(this.idContainer, this.idContainerVersion).then(function (variables) {
      this.availableVariables = [];
      angular.forEach(variables, function (category) {
        angular.forEach(category.types, function (variable) {
          this.variableIdToName[variable.id] = variable.name;
          this.availableVariables.push({
            key: variable.id,
            value: variable.name,
            group: category.name
          });
        });
      });
    });

    // needed for suggestNameForType() to make sure it is aware of all names
    this.model.fetchTriggersIfNotLoaded();

    this.$watch('idTrigger', function (newValue, oldValue) {
      if (newValue === null) {
        return;
      }

      if (newValue != oldValue || currentId === null) {
        currentId = newValue;
        init(newValue);
      }
    });
  },
  methods: {
    // TODO
    enrichTemplateType(template) {
      template.isDisabled = !this.canUseCustomTemplates && template && template.isCustomTemplate;
      return template;
    },
    // TODO
    removeAnyTriggerNotification() {
      var notification = this.notification;
      notification.remove(notificationId);
      notification.remove('ajaxHelper');
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
    // TODO
    showErrorFieldNotProvidedNotification(title) {
      var message = translate('TagManager_ErrorXNotProvided', [title]);
      this.showNotification(message, 'error');
    },
    // TODO
    init(idTrigger) {
      this.create = this.idTrigger == '0';
      this.edit = !this.create;
      this.trigger = {};
      this.chooseTriggerType = false;
      this.editTitle = '';
      var dereg;

      for (dereg = 0; dereg < deregisterWatches.length; dereg++) {
        if ('function' === typeof deregisterWatches[dereg]) {
          deregisterWatches[dereg]();
        }
      }

      piwik.helper.lazyScrollToContent();
      this.availableTriggers = [];
      this.model.fetchContainer(this.idContainer).then(function (container) {
        return this.model.fetchAvailableTriggers(container.context);
      }).then(function (triggers) {
        angular.forEach(triggers, function (triggersGroup) {
          angular.forEach(triggersGroup.types, function (trigger) {
            this.enrichTemplateType(trigger);
          });
        });
        this.availableTriggers = triggers;
      }).then(function () {
        if (this.edit && this.idTrigger) {
          this.editTitle = translate('TagManager_EditTrigger');
          this.model.findTrigger(this.idContainer, this.idContainerVersion, this.idTrigger).then(function (trigger) {
            if (!trigger) {
              return;
            }

            this.trigger = angular.copy(trigger);
            this.trigger.idcontainer = this.idContainer;

            if (this.trigger.typeMetadata) {
              this.enrichTemplateType(this.trigger.typeMetadata);
            }

            this.addConditionEntryIfNoneExists();
            this.onConditionChange();
            this.addParameterWatch();
            this.isDirty = false;
          });
        } else if (this.create) {
          this.editTitle = translate('TagManager_ChooseTriggerToContinue');
          this.chooseTriggerType = true;
        }
      });
    },
    // TODO
    addParameterWatch() {
      var index;

      if (this.trigger.typeMetadata && this.trigger.typeMetadata.parameters) {
        for (index = 0; index < this.trigger.typeMetadata.parameters.length; index++) {
          deregisterWatches.push(this.$watch('editTrigger.trigger.typeMetadata.parameters[' + index + '].value', function (val, oldVal) {
            if (val !== oldVal) {
              this.isDirty = true;
            }
          }));
        }
      }
    },
    // TODO
    onConditionChange() {
      var hasAll = true;
      angular.forEach(this.trigger.conditions, function (condition) {
        if (!condition || !condition.expected) {
          hasAll = false;
        }
      });

      if (hasAll) {
        this.addConditionEntry();
      }
    },
    // TODO
    addConditionEntryIfNoneExists() {
      if (!this.trigger.conditions || !angular.isArray(this.trigger.conditions)) {
        this.trigger.conditions = [];
      }

      if (!this.trigger.conditions.length) {
        this.trigger.conditions.push(this.getDefaultCondition());
      }
    },
    // TODO
    addConditionEntry() {
      this.trigger.conditions.push(this.getDefaultCondition());
      this.isDirty = true;
    },
    // TODO
    removeConditionEntry(index) {
      if (index > -1) {
        var lastIndex = this.trigger.conditions.length - 1;

        if (lastIndex === index) {
          this.trigger.conditions[index] = this.getDefaultCondition();
        } else {
          this.trigger.conditions.splice(index, 1);
        }

        this.isDirty = true;
      }
    },
    // TODO
    createTriggerType(triggerTemplate) {
      if (triggerTemplate && triggerTemplate.isDisabled) {
        return;
      }

      this.chooseTriggerType = false;
      this.editTitle = translate('TagManager_CreateNewTrigger');
      this.trigger = {
        idSite: piwik.idSite,
        name: this.model.suggestNameForType(triggerTemplate.name),
        type: triggerTemplate.id,
        idcontainer: this.idContainer,
        idcontainerversion: this.idContainerVersion,
        parameters: {},
        conditions: [],
        typeMetadata: triggerTemplate
      };
      this.addConditionEntry();
      this.addParameterWatch();
      this.isDirty = true; // we directly make the create button visible as sometimes some triggers do not have any settings

      $timeout(function () {
        var $editTrigger = $('.editTrigger');

        if ($editTrigger.length && $editTrigger[0]) {
          $editTrigger[0].scrollIntoView();
        }

        $('.editTrigger #name').focus();
      }, 1);
    },
    // TODO
    cancel() {
      this.idTrigger = null;
      currentId = null;
      var $search = $location.search();
      delete $search.idTrigger;
      $location.search($search);
    },
    // TODO
    createTrigger() {
      this.removeAnyTriggerNotification();

      if (!this.checkRequiredFieldsAreSet) {
        return;
      }

      this.isUpdating = true;
      tagManagerTriggerModel.createOrUpdateTrigger(this.trigger, 'TagManager.addContainerTrigger').then(function (response) {
        this.isUpdating = false;

        if (!response || response.type === 'error' || !response.response) {
          return;
        }

        var this.idTrigger = response.response.value;

        if ('function' === typeof this.onChangeTrigger) {
          this.model.reload(this.idContainer, this.idContainerVersion);
          this.trigger.idtrigger = this.idTrigger;
          this.$emit('changeTrigger', {
            trigger: this.trigger
          });
          return;
        }

        this.isDirty = false;
        tagManagerTriggerModel.reload(this.idContainer, this.idContainerVersion).then(function () {
          var $search = $location.search();
          $search.idTrigger = this.idTrigger;
          $location.search($search);
          $timeout(function () {
            this.showNotification(translate('TagManager_CreatedX', translate('TagManager_Trigger')) + ' ' + translate('TagManager_WantToDeployThisChangeCreateVersion', '<a onclick="tagManagerHelper.createNewVersion()">', '</a>'), response.type);
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
    updateTrigger() {
      this.removeAnyTriggerNotification();

      if (!this.checkRequiredFieldsAreSet) {
        return;
      }

      this.isUpdating = true;
      tagManagerTriggerModel.createOrUpdateTrigger(this.trigger, 'TagManager.updateContainerTrigger').then(function (response) {
        if (response.type === 'error') {
          return;
        }

        if ('function' === typeof this.onChangeTrigger) {
          this.trigger.idtrigger = this.idTrigger;
          this.$emit('changeTrigger', {
            trigger: this.trigger
          });
          return;
        }

        var this.idTrigger = this.trigger.idtrigger;
        this.isDirty = false;
        this.trigger = {};
        tagManagerTriggerModel.reload(this.idContainer, this.idContainerVersion).then(function () {
          this.init(this.idTrigger);
        });
        this.showNotification(translate('TagManager_UpdatedX', translate('TagManager_Trigger')) + ' ' + translate('TagManager_WantToDeployThisChangeCreateVersion', '<a onclick="tagManagerHelper.createNewVersion()">', '</a>'), response.type);
      });
    },
  },
  computed: {
    isLoading() {
      return TriggersStore.isLoading.value || AvailableComparisonsStore.isLoading.value;
    },
    isUpdating() {
      return TriggersStore.isUpdating.value || this.isUpdatingVar;
    },
    create() {
      return this.idTrigger === 0;
    },
    edit() {
      return !this.create;
    },
    isTriggerDisabled() {
      // TODO
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
    // TODO
    checkRequiredFieldsAreSet() {
      var title;

      if (!this.trigger.name) {
        title = translate('General_Name');
        this.showErrorFieldNotProvidedNotification(title);
        return false;
      }

      return true;
    },
  },
});
</script>
