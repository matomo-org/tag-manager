<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="editTag tagManagerManageEdit" ref="root">
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
        v-show="!chooseTagType && editTitle"
        @submit="edit ? updateTag() : createTag()"
      >
        <div>
          <div
            class="alert alert-warning"
            v-show="isTagDisabled"
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
              :model-value="tag.typeMetadata?.name"
              :disabled="true"
              :inline-help="tag.typeMetadata?.description + ' ' + tag.typeMetadata?.help"
              :title="translate('TagManager_Type')"
            />
          </div>
          <div>
            <Field
              uicontrol="text"
              name="name"
              :model-value="tag.name"
              @update:model-value="tag.name = $event; setValueHasChanged()"
              :maxlength="50"
              :title="translate('General_Name')"
              :inline-help="translate('TagManager_TagNameHelp')"
            />
          </div>
          <div>
            <Field
              uicontrol="textarea"
              name="description"
              :model-value="tag.description"
              @update:model-value="tag.description = $event; setValueHasChanged()"
              :maxlength="1000"
              :title="translate('General_Description')"
              :inline-help="translate('TagManager_TagDescriptionHelp')"
            />
          </div>
          <div
            class="form-group row"
            v-show="tag.typeMetadata?.parameters.length"
          >
            <div class="col s12">
              <h3>{{ translate('TagManager_ConfigureWhatTagDoes') }}</h3>
            </div>
          </div>
          <div v-if="tag">
            <GroupedSettings
              :settings="tag.typeMetadata?.parameters || []"
              :all-setting-values="parameterValues"
              @change="parameterValues[$event.name] = $event.value; setValueHasChanged()"
            />
          </div>
          <div
            class="form-group row"
            v-show="tag.typeMetadata?.parameters.length"
          >
            <div class="col s12">
              <h3>{{ translate('TagManager_ConfigureWhenTagDoes') }}</h3>
            </div>
          </div>
          <TagTriggerArray
            :container-triggers="containerTriggers"
            type="fire"
            :title="translate('TagManager_FireTriggerTitle')"
            :help="translate(
              'TagManager_FireTriggerHelp',
              translate('TagManager_FireLimit'),
            )"
            :model-value="fireTriggers"
            @update:model-value="fireTriggers = $event; setValueHasChanged();
              onFireTriggerChange()"
            @create="onCreateNewFireTrigger()"
            @edit="editTrigger($event)"
          />
          <TagTriggerArray
            :container-triggers="containerTriggers"
            type="block"
            :title="translate('TagManager_BlockTriggerTitle')"
            :help="translate('TagManager_BlockTriggerHelp')"
            :model-value="blockTriggers"
            @update:model-value="blockTriggers = $event; setValueHasChanged();
              onBlockTriggerChange()"
            @create="onCreateNewBlockTrigger()"
            @edit="editTrigger($event)"
          />
          <div
            class="form-group row"
            v-show="tag.typeMetadata?.hasAdvancedSettings"
          >
            <div class="col s12">
              <h3>
                <a
                  href=""
                  class="showAdvancedSettings"
                  v-show="!showAdvanced"
                  @click.prevent="showAdvanced = true"
                >{{ translate('TagManager_ShowAdvancedSettings') }}</a>
                <a
                  href=""
                  class="hideAdvancedSettings"
                  v-show="showAdvanced"
                  @click.prevent="showAdvanced = false"
                >{{ translate('TagManager_HideAdvancedSettings') }}</a>
              </h3>
            </div>
          </div>
          <div v-show="showAdvanced && tag.typeMetadata?.hasAdvancedSettings">
            <div>
              <Field
                uicontrol="radio"
                name="fire_limit"
                :model-value="tag.fire_limit"
                @update:model-value="tag.fire_limit = $event; setValueHasChanged()"
                :options="availableFireLimits"
                :title="translate('TagManager_FireLimit')"
                :inline-help="fireLimitHelp"
              />
            </div>
            <div>
              <Field
                uicontrol="text"
                name="fire_delay"
                :model-value="tag.fire_delay"
                @update:model-value="tag.fire_delay = $event; setValueHasChanged()"
                :maxlength="8"
                :title="translate('TagManager_FireDelay')"
                :inline-help="translate('TagManager_FireDelayHelp')"
              />
            </div>
            <div>
              <Field
                uicontrol="text"
                name="priority"
                :model-value="tag.priority"
                @update:model-value="tag.priority = $event; setValueHasChanged()"
                :maxlength="4"
                :title="translate('TagManager_Priority')"
                :inline-help="translate('TagManager_PriorityHelp')"
              />
            </div>
            <div class="form-group row tagStartDate">
              <div class="col s12 m6">
                <div class="row">
                  <div class="col s12">
                    <label
                      for="start_date_date"
                      class="active"
                    >{{ translate('TagManager_StartDate') }}:</label>
                  </div>
                  <div class="tagStartDate">
                    <TagDateInput
                      name="start_date"
                      :model-value="tag.start_date"
                      @update:model-value="tag.start_date = $event; setValueHasChanged();"
                      default-time="00:00:00"
                    />
                  </div>
                </div>
              </div>
              <div class="col s12 m6 ">
                <div class="form-help">
                <span class="inline-help">
                  <span>
                    <span v-html="$sanitize(translate(
                      'TagManager_TagStartDateHelp',
                      '&lt;strong&gt;',
                      '&lt;/strong&gt;'
                    ))" />
                    <br />
                    <span
                      class="currentLocalTime"
                      v-html="$sanitize(translate(
                        'TagManager_CurrentTimeInLocalTimezone',
                        '&lt;strong&gt;',
                        currentTime,
                        '&lt;/strong&gt;',
                      ))"
                    />
                  </span>
                </span>
                </div>
              </div>
            </div>
            <div class="form-group row tagEndDate">
              <div class="col s12 m6">
                <div class="row">
                  <div class="col s12">
                    <label
                      for="end_date_date"
                      class="active"
                    >{{ translate('TagManager_EndDate') }}:</label>
                  </div>
                  <div class="tagEndDate">
                    <TagDateInput
                      name="end_date"
                      :model-value="tag.end_date"
                      @update:model-value="tag.end_date = $event; setValueHasChanged();"
                      default-time="23:59:59"
                    />
                  </div>
                </div>
              </div>
              <div class="col s12 m6">
                <div class="form-help">
                <span class="inline-help">
                  <span>
                    <span v-html="$sanitize(translate(
                      'TagManager_TagEndDateHelp',
                      '&lt;strong&gt;',
                      '&lt;/strong&gt;',
                    ))" />
                    <br />
                    <span
                      class="currentLocalTime"
                      v-html="$sanitize(translate(
                        'TagManager_CurrentTimeInLocalTimezone',
                        '&lt;strong&gt;',
                        currentTime,
                        '&lt;/strong&gt;',
                      ))"
                    />
                  </span>
                </span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="alert alert-warning"
            v-show="isTagDisabled"
          >
            {{ translate(
            'TagManager_UseCustomTemplateCapabilityRequired',
            translate('TagManager_CapabilityUseCustomTemplates'),
          ) }}
          </div>
          <SaveButton
            class="createButton"
            v-show="!isTagDisabled"
            @confirm="edit ? updateTag() : createTag()"
            :disabled="isUpdating || !isDirty"
            :saving="isUpdating"
            :value="edit
            ? translate('CoreUpdater_UpdateTitle')
            : translate('TagManager_CreateNewTag')"
          >
          </SaveButton>
          <div class="entityCancel">
            <a @click="cancel()">{{ translate('General_Cancel') }}</a>
          </div>
        </div>
      </form>
      <div
        id="confirmSelectTagType"
        v-show="chooseTagType"
      >
        <ul
          class="collection with-header"
          v-for="tagCategory in availableTags"
          :key="tagCategory.name"
        >
          <li class="collection-header">
            <h4>{{ tagCategory.name }}</h4>
          </li>
          <li
            v-for="(tagTemplate, index) in tagCategory.types"
            :key="index"
            class="collection-item avatar"
            @click="createTagType(tagTemplate)"
            :class="{
            disabledTemplate: isTagTemplateDisabled[tagTemplate.id],
            [`templateType${ tagTemplate.id}`]: true,
          }"
            :title="!isTagTemplateDisabled[tagTemplate.id] ? '' : collectionItemAvatarText"
          >
            <img
              alt
              class="circle"
              :src="tagTemplate.icon"
              v-if="tagTemplate.icon"
            />
            <span class="title">{{ tagTemplate.name }}</span>
            <p v-show="tagTemplate.description">{{ tagTemplate.description }}</p>
            <span
              class="secondary-content"
              v-show="!!tagTemplate.help"
            >
            <i
              class="icon-help"
              :title="tagTemplate.help"
            />
          </span>
          </li>
        </ul>
        <div class="entityCancel">
          <a @click="cancel()">{{ translate('General_Cancel') }}</a>
        </div>
      </div>
    </ContentBlock>
  </div>
</template>

<script lang="ts">
import { DeepReadonly, defineComponent } from 'vue';
import {
  translate,
  AjaxHelper,
  ContentBlock,
  Matomo,
  NotificationsStore,
  NotificationType,
  clone,
  MatomoUrl,
} from 'CoreHome';
import { Field, SaveButton, GroupedSettings } from 'CorePluginsAdmin';
import AvailableFireLimitsStore from '../AvailableFireLimit.store';
import {
  Container,
  Tag,
  TagType,
  TagTypeCategory,
  Trigger,
} from '../types';
import TriggersStore from '../Trigger/Triggers.store';
import TagTriggerArray from './TagTriggerArray.vue';
import TagDateInput from './TagDateInput.vue';
import TagsStore from './Tags.store';

interface Option {
  key: number;
  value: string;
}

interface TagEditState {
  isDirty: boolean;
  showAdvanced: boolean;
  chooseTagType: boolean;
  availableTags: DeepReadonly<TagTypeCategory[]>;
  containerTriggers: Option[];
  currentTime: string|null;
  tag: Tag;
  editTitle: string;
  parameterValues: Record<string, unknown>;
  isUpdatingTag: boolean;
  fireTriggers: (number|null)[];
  blockTriggers: (number|null)[];
  currentTimeTimeout: ReturnType<typeof setTimeout>|null;
}

function getCurrentTime(): string|null {
  const date = new Date();
  if (date && date.toString) {
    return date.toString();
  }
  return null;
}

const { $, tagManagerHelper } = window;

const notificationId = 'tagtagmanagement';

export default defineComponent({
  props: {
    idTag: Number,
    idContainer: {
      type: String,
      required: true,
    },
    idContainerVersion: {
      type: Number,
      required: true,
    },
    newTagType: null,
  },
  components: {
    TagDateInput,
    ContentBlock,
    Field,
    SaveButton,
    GroupedSettings,
    TagTriggerArray,
  },
  data(): TagEditState {
    return {
      isDirty: false,
      showAdvanced: false,
      chooseTagType: false,
      availableTags: [],
      containerTriggers: [],
      currentTime: null,
      tag: {} as unknown as Tag,
      editTitle: '',
      parameterValues: {},
      isUpdatingTag: false,
      fireTriggers: [],
      blockTriggers: [],
      currentTimeTimeout: null,
    };
  },
  created() {
    AvailableFireLimitsStore.init();

    this.updateAvailableTriggers();
    this.setCurrentTime();

    TagsStore.reload(this.idContainer, this.idContainerVersion).then(() => {
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
    },
  },
  methods: {
    setCurrentTime() {
      this.currentTime = getCurrentTime();
      this.currentTimeTimeout = setTimeout(this.setCurrentTime.bind(this), 10000);
    },
    updateAvailableTriggers() {
      AjaxHelper.fetch<Trigger[]>({
        method: 'TagManager.getContainerTriggers',
        idContainer: this.idContainer,
        idContainerVersion: this.idContainerVersion,
        filter_limit: '-1',
      }).then((triggers: Trigger[]) => {
        this.containerTriggers = triggers.map((t) => ({
          key: t.idtrigger!,
          value: t.name,
        }));
      });
    },
    removeAnyTagNotification() {
      NotificationsStore.remove(notificationId);
      NotificationsStore.remove('ajaxHelper');
    },
    showNotification(message: string, context: NotificationType['context']) {
      const instanceId = NotificationsStore.show({
        message,
        context,
        id: notificationId,
        type: 'transient',
      });

      setTimeout(() => {
        NotificationsStore.scrollToNotification(instanceId);
      }, 200);
    },
    showErrorFieldNotProvidedNotification(title: string) {
      const message = translate('TagManager_ErrorXNotProvided', [title]);
      this.showNotification(message, 'error');
    },
    initIdTag() {
      this.tag = {} as unknown as Tag;
      this.chooseTagType = false;
      this.editTitle = '';

      Matomo.helper.lazyScrollToContent();

      this.availableTags = [];
      AjaxHelper.fetch<Container>({
        method: 'TagManager.getContainer',
        idContainer: this.idContainer,
        filter_limit: '-1',
      }).then(
        (container) => TagsStore.fetchAvailableTags(container.context),
      ).then((tags) => {
        this.availableTags = tags;
      }).then(() => {
        if (this.edit && this.idTag) {
          this.editTitle = translate('TagManager_EditTag');
          TagsStore.findTag(this.idContainer, this.idContainerVersion, this.idTag).then((tag) => {
            if (!tag) {
              return;
            }

            this.tag = clone(tag) as unknown as Tag;
            this.parameterValues = Object.fromEntries(tag.typeMetadata.parameters.map(
              (s) => [s.name, s.value],
            ));

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
          });

          return;
        }

        if (this.create) {
          this.editTitle = translate('TagManager_ChooseTagToContinue');
          this.chooseTagType = true;
        }
      });
    },
    onCreateNewBlockTrigger() {
      this.openEditTrigger((trigger) => {
        const indexLastEntry = this.blockTriggers.length - 1;

        if (!this.blockTriggers[indexLastEntry]) {
          this.blockTriggers[indexLastEntry] = trigger.idtrigger!;
        } else {
          this.blockTriggers.push(trigger.idtrigger!);
        }

        this.onBlockTriggerChange();
      }, 0);
    },
    onCreateNewFireTrigger() {
      this.openEditTrigger((trigger) => {
        const indexLastEntry = this.fireTriggers.length - 1;

        if (!this.fireTriggers[indexLastEntry]) {
          this.fireTriggers[indexLastEntry] = trigger.idtrigger!;
        } else {
          this.fireTriggers.push(trigger.idtrigger!);
        }

        this.onFireTriggerChange();
      }, 0);
    },
    editTrigger(idTrigger: number) {
      this.openEditTrigger(() => null, idTrigger);
    },
    openEditTrigger(callback: (trigger: Trigger) => void, idTag: number) {
      tagManagerHelper.editTrigger(
        null,
        this.idContainer,
        this.idContainerVersion,
        idTag,
        (trigger) => {
          this.updateAvailableTriggers();
          callback(trigger);
        },
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
    removeBlockTrigger(index: number) {
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
    removeFireTrigger(index: number) {
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
    createTagType(tagTemplate: TagType) {
      if (tagTemplate && this.isTagTemplateDisabled[tagTemplate.id]) {
        return;
      }

      this.chooseTagType = false;
      this.editTitle = translate('TagManager_CreateNewTag');

      this.tag = {
        idsite: parseInt(`${Matomo.idSite}`, 10),
        name: TagsStore.suggestNameForType(tagTemplate.name) || '',
        type: tagTemplate.id,
        fire_limit: 'unlimited',
        priority: 999,
        fire_delay: 0,
        typeMetadata: tagTemplate,
      } as unknown as Tag;

      this.blockTriggers = [null];
      this.fireTriggers = [null];

      this.parameterValues = Object.fromEntries(tagTemplate.parameters.map(
        (s) => [s.name, s.value],
      ));

      this.isDirty = false;

      setTimeout(() => {
        const editTag = $(this.$refs.root as HTMLElement);

        if (editTag.length && editTag[0]) {
          editTag[0].scrollIntoView();
        }

        editTag.find('#name').focus();
      }, 1);
    },
    cancel() {
      const newParams = { ...MatomoUrl.hashParsed.value };
      delete newParams.idTag;

      MatomoUrl.updateHash(newParams);
    },
    createTag() {
      this.removeAnyTagNotification();

      if (!this.checkRequiredFieldsAreSet()) {
        return;
      }

      this.isUpdatingTag = true;
      TagsStore.createOrUpdateTag(
        this.tag,
        'TagManager.addContainerTag',
        this.idContainer,
        this.idContainerVersion,
        this.parameterValues,
        this.fireTriggers.filter((id) => !!id) as unknown as number[],
        this.blockTriggers.filter((id) => !!id) as unknown as number[],
      ).then((response) => {
        if (!response) {
          return;
        }

        this.isDirty = false;

        const idTag = response.value;

        TagsStore.reload(this.idContainer, this.idContainerVersion).then(() => {
          MatomoUrl.updateHash({
            ...MatomoUrl.hashParsed.value,
            idTag,
          });

          setTimeout(() => {
            const createdX = translate('TagManager_CreatedX', translate('TagManager_Tag'));
            const wantToRedeploy = translate(
              'TagManager_WantToDeployThisChangeCreateVersion',
              '<a class="createNewVersionLink">',
              '</a>',
            );

            this.showNotification(`${createdX} ${wantToRedeploy}`, 'success');
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
      TagsStore.createOrUpdateTag(
        this.tag,
        'TagManager.updateContainerTag',
        this.idContainer,
        this.idContainerVersion,
        this.parameterValues,
        this.fireTriggers.filter((id) => !!id) as unknown as number[],
        this.blockTriggers.filter((id) => !!id) as unknown as number[],
      ).then((response) => {
        if (!response) {
          return;
        }

        this.isDirty = false;

        TagsStore.reload(this.idContainer, this.idContainerVersion).then(() => {
          this.initIdTag();
        });

        const updatedAt = translate('TagManager_UpdatedX', translate('TagManager_Tag'));
        const wantToDeploy = translate(
          'TagManager_WantToDeployThisChangeCreateVersion',
          '<a class="createNewVersionLink">',
          '</a>',
        );

        this.showNotification(`${updatedAt} ${wantToDeploy}`, 'success');
      }).finally(() => {
        this.isUpdatingTag = false;
      });
    },
    checkRequiredFieldsAreSet() {
      if (!this.tag.name) {
        const title = translate('General_Name');
        this.showErrorFieldNotProvidedNotification(title);
        return false;
      }

      if (!this.fireTriggers || !this.fireTriggers.length) {
        this.showNotification(translate('TagManager_TagFireTriggerRequirement'), 'error');
        return false;
      }

      return true;
    },
  },
  computed: {
    availableFireLimits() {
      return AvailableFireLimitsStore.fireLimitsOptions.value;
    },
    isLoading() {
      return TriggersStore.isLoading.value || AvailableFireLimitsStore.isLoading.value;
    },
    isUpdating() {
      return TriggersStore.isUpdating.value || this.isUpdatingTag;
    },
    create() {
      return this.idTag === 0;
    },
    edit() {
      return !this.create;
    },
    canUseCustomTemplates() {
      return Matomo.hasUserCapability('tagmanager_use_custom_templates');
    },
    isTagDisabled() {
      return !this.canUseCustomTemplates && this.tag.typeMetadata?.isCustomTemplate;
    },
    isTagTemplateDisabled() {
      const result: Record<string, boolean> = {};
      this.availableTags.forEach((tagCategory) => {
        tagCategory.types.forEach((tag) => {
          result[tag.id] = !this.canUseCustomTemplates && tag.isCustomTemplate;
        });
      });
      return result;
    },
    collectionItemAvatarText() {
      return translate(
        'TagManager_UseCustomTemplateCapabilityRequired',
        translate('TagManager_CapabilityUseCustomTemplates'),
      );
    },
    fireLimitHelp() {
      return translate(
        'TagManager_FireLimitHelp',
        translate('TagManager_Unlimited'),
        translate('TagManager_OncePage'),
        translate('TagManager_Once24Hours'),
        translate('TagManager_OnceLifetime'),
      );
    },
  },
});
</script>
