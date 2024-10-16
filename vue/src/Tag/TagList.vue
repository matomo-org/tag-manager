<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="tagManagerManageList tagManagerTagList">
    <ContentBlock
      feature="Tag Manager"
      :content-title="translate('TagManager_ManageX', translate('TagManager_Tags'))"
      :help-text="tagsHelpText"
    >
      <p>{{ translate('TagManager_TagUsageBenefits') }}</p>
      <div class="tagSearchFilter">
        <Field
          uicontrol="text"
          name="tagSearch"
          :title="translate('General_Search')"
          v-show="tags.length > 0"
          v-model="tagSearch"
        >
        </Field>
      </div>
      <table v-content-table>
        <thead>
          <tr>
            <th class="name" :title="nameTranslatedText">{{ translate('General_Name') }}</th>
            <th class="description" :title="descriptionTranslatedText">
              {{ translate('General_Description') }}</th>
            <th class="type" :title="typeTranslatedText">{{ translate('TagManager_Type') }}</th>
            <th class="triggers" :title="triggersTranslatedText">
              {{ translate('TagManager_Triggers') }}</th>
            <th class="lastUpdated" :title="lastUpdatedTranslatedText">
              {{ translate('TagManager_LastUpdated') }}</th>
            <th
              class="action"
              :title="actionTranslatedText"
              v-show="hasWriteAccess"
            >{{ translate('General_Actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-show="isLoading || isUpdating">
            <td colspan="6">
              <span class="loadingPiwik">
                <img src="plugins/Morpheus/images/loading-blue.gif" />
                {{ translate('General_LoadingData') }}
              </span>
            </td>
          </tr>
          <tr v-show="!isLoading && tags.length === 0">
            <td colspan="6">
              {{ translate('TagManager_NoTagsFound') }}
              <a
                class="createContainerTagNow"
                v-show="hasWriteAccess"
                @click="createTag()"
              >{{ translate('TagManager_CreateNewTagNow') }}</a>
            </td>
          </tr>
          <tr
            class="tags"
            v-for="tag in sortedTags"
            :key="tag.idtag"
            :id="`tag${ tag.idtag }`"
          >
            <td class="name" :title="tag.name">{{ truncateText(tag.name, 50) }}</td>
            <td
              class="description"
              :title="tag.description"
            >
              {{ truncateText(tag.description, 75) }}
            </td>
            <td
              class="type"
              :title="tag.typeMetadata.description"
            >
              {{ tag.typeMetadata.name }}
            </td>
            <td class="triggers">
              <span
                v-for="(fireTriggerId, fireTriggerIndex) in tag.fire_trigger_ids"
                :key="fireTriggerIndex"
                style="margin-right:3.5px;"
              >
                <a
                  style="display: inline-block;vertical-align: top !important;"
                  class="chip"
                  v-if="hasWriteAccess"
                  href=""
                  @click.prevent="editTrigger(fireTriggerId)"
                  :title="this.triggers[fireTriggerId]"
                >
                  {{ truncateText(this.triggers[fireTriggerId], triggerTruncateLength) }}
                </a>
                <span
                  class="chip"
                  v-if="!hasWriteAccess"
                  :title="this.triggers[fireTriggerId]"
                >
                  {{ truncateText(this.triggers[fireTriggerId], triggerTruncateLength) }}
                </span>
              </span>
              <span v-show="tag.block_trigger_ids.length">
                {{ translate('TagManager_Except') }}:
                <span
                  v-for="(blockTriggerId, index) in tag.block_trigger_ids"
                  :key="index"
                  style="margin-right:3.5px;"
                >
                  <a
                    class="chip"
                    v-show="hasWriteAccess"
                    href=""
                    @click.prevent="editTrigger(blockTriggerId)"
                    :title="this.triggers[blockTriggerId]"
                  >
                    {{ truncateText(this.triggers[blockTriggerId], triggerTruncateLength) }}
                  </a>
                  <span
                    class="chip"
                    v-show="!hasWriteAccess"
                    :title="this.triggers[blockTriggerId]"
                  >
                    {{ truncateText(this.triggers[blockTriggerId], triggerTruncateLength) }}
                  </span>
                </span>
              </span>
            </td>
            <td
              class="lastUpdated"
              :title="translate('TagManager_CreatedOnX', tag.created_date_pretty)"
            >
              <span>{{ tag.updated_date_pretty }}</span>
            </td>
            <td
              class="action"
              v-show="hasWriteAccess"
            >
              <a
                v-show="tag.status === 'active'"
                class="table-action icon-pause"
                @click="pauseTag(tag)"
                :title="translate('TagManager_PauseX', translate('TagManager_Tag'))"
              />
              <a
                v-show="tag.status === 'paused'"
                class="table-action icon-play"
                @click="resumeTag(tag)"
                :title="translate('TagManager_ResumeX', translate('TagManager_Tag'))"
              />
              <a
                class="table-action icon-edit"
                @click="editTag(tag.idtag, tag.type)"
                :title="translate('TagManager_EditTag')"
              />
              <a
                class="table-action icon-delete"
                @click="deleteTag(tag)"
                :title="translate('TagManager_DeleteX', translate('TagManager_Tag'))"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="tableActionBar"
        v-show="hasWriteAccess"
      >
        <a
          class="createNewTag"
          value
          @click="createTag()"
        >
          <span class="icon-add">&nbsp;</span>{{ translate('TagManager_CreateNewTag') }}
        </a>
      </div>
    </ContentBlock>
    <div
      class="ui-confirm"
      id="confirmDeleteTag"
      ref="confirmDeleteTag"
    >
      <h2>{{ translate('TagManager_DeleteTagConfirm') }} </h2>
      <input
        role="yes"
        type="button"
        :value="translate('General_Yes')"
      />
      <input
        role="no"
        type="button"
        :value="translate('General_No')"
      />
    </div>
    <div
      class="ui-confirm"
      id="confirmPauseTag"
      ref="confirmPauseTag"
    >
      <h2>{{ translate('TagManager_PauseTagConfirm') }} </h2>
      <input
        role="yes"
        type="button"
        :value="translate('General_Yes')"
      />
      <input
        role="no"
        type="button"
        :value="translate('General_No')"
      />
    </div>
    <div
      class="ui-confirm"
      id="confirmResumeTag"
      ref="confirmResumeTag"
    >
      <h2>{{ translate('TagManager_ResumeTagConfirm') }} </h2>
      <input
        role="yes"
        type="button"
        :value="translate('General_Yes')"
      />
      <input
        role="no"
        type="button"
        :value="translate('General_No')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import {
  ContentBlock,
  ContentTable,
  Matomo,
  MatomoUrl, NotificationsStore, NotificationType, translate,
} from 'CoreHome';
import { Field } from 'CorePluginsAdmin';
import TagsStore from './Tags.store';
import TriggersStore from '../Trigger/Triggers.store';
import { Tag, TagType } from '../types';

interface TagListState {
  hasWriteAccess: boolean;
  triggerTruncateLength: number;
  tagSearch: string;
}

const { tagManagerHelper } = window;

const notificationId = 'tagtagmanagementlist';

export default defineComponent({
  props: {
    idContainer: {
      type: String,
      required: true,
    },
    idContainerVersion: {
      type: Number,
      required: true,
    },
    tagsHelpText: String,
  },
  components: {
    ContentBlock,
    Field,
  },
  directives: {
    ContentTable,
  },
  data(): TagListState {
    return {
      hasWriteAccess: Matomo.hasUserCapability('tagmanager_write'),
      triggerTruncateLength: 40,
      tagSearch: '',
    };
  },
  created() {
    watch(() => TagsStore.tags.value, () => {
      this.reloadTriggers();
    });

    this.reloadTriggers();

    TagsStore.fetchTags(this.idContainer, this.idContainerVersion);
  },
  methods: {
    reloadTriggers() {
      TriggersStore.reload(this.idContainer, this.idContainerVersion);
    },
    createTag() {
      this.editTag(0);
    },
    editTrigger(idTrigger: number) {
      tagManagerHelper.editTrigger(
        this.idContainer,
        this.idContainerVersion,
        idTrigger,
        () => {
          this.reloadTriggers();
        },
      );
    },
    editTag(idTag: number) {
      MatomoUrl.updateHash({
        ...MatomoUrl.hashParsed.value,
        idTag,
      });
    },
    pauseTag(tag: Tag) {
      const doPause = () => {
        TagsStore.pauseTag(this.idContainer, this.idContainerVersion, tag.idtag).then(() => {
          TagsStore.reload(this.idContainer, this.idContainerVersion).then(() => {
            setTimeout(() => {
              this.showDeployNotification('pause');
            }, 200);
          });
        });
      };

      Matomo.helper.modalConfirm('#confirmPauseTag', {
        yes: doPause,
      });
    },
    resumeTag(tag: Tag) {
      const doResume = () => {
        TagsStore.resumeTag(this.idContainer, this.idContainerVersion, tag.idtag).then(() => {
          TagsStore.reload(this.idContainer, this.idContainerVersion).then(() => {
            setTimeout(() => {
              this.showDeployNotification('resume');
            }, 200);
          });
        });
      };

      Matomo.helper.modalConfirm('#confirmResumeTag', {
        yes: doResume,
      });
    },
    deleteTag(tag: Tag) {
      const doDelete = () => {
        TagsStore.deleteTag(this.idContainer, this.idContainerVersion, tag.idtag).then(() => {
          TagsStore.reload(this.idContainer, this.idContainerVersion);
        });
      };

      Matomo.helper.modalConfirm('#confirmDeleteTag', {
        yes: doDelete,
      });
    },
    truncateText(text: string, length: number) {
      return tagManagerHelper.truncateText(text, length);
    },
    hasPublishCapability() {
      return Matomo.hasUserCapability('tagmanager_write') && Matomo.hasUserCapability('tagmanager_use_custom_templates');
    },
    showDeployNotification(type: string) {
      const translatedString = type === 'pause' ? 'TagManager_PausedTag' : 'TagManager_ResumedTag';
      const createdX = translate(translatedString, translate('TagManager_Tag'));
      let wantToRedeploy = '';
      if (this.hasPublishCapability()) {
        wantToRedeploy = translate(
          'TagManager_WantToDeployThisChangeCreateVersion',
          '<a class="createNewVersionLink">',
          '</a>',
        );
      }

      this.showNotification(`${createdX} ${wantToRedeploy}`, 'success');
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
  },
  computed: {
    triggers() {
      const triggers: Record<string, string> = {};
      TriggersStore.triggers.value.forEach((t) => {
        triggers[`${t.idtrigger}`] = t.name;
      });
      return triggers;
    },
    isLoading() {
      return TagsStore.isLoading.value;
    },
    isUpdating() {
      return TagsStore.isUpdating.value;
    },
    tags() {
      return TagsStore.tags.value;
    },
    sortedTags() {
      const searchFilter = this.tagSearch.toLowerCase();

      // look through string properties of tags for values that have searchFilter in them
      // (mimics angularjs filter() filter)
      const result = [...this.tags].filter((h) => Object.keys(h).some((propName) => {
        const entity = h as unknown as Record<string, unknown>;
        let propValue = '';
        if (typeof entity[propName] === 'string') {
          propValue = (entity[propName] as string);
        } else if (propName === 'typeMetadata') {
          const propTypeMeta = (entity.typeMetadata as TagType);
          propValue = (propTypeMeta.name as string);
        } else if (propName === 'fire_trigger_ids') {
          if (this.triggers && entity.fire_trigger_ids) {
            Object.values((entity.fire_trigger_ids) as number[]).forEach((value) => {
              if (this.triggers[value]) {
                propValue += `${this.triggers[value]} `;
              }
            });
          }
        } else if (propName === 'parameters' && entity.type === 'CustomHtml') {
          const propTypeParameters = (entity.parameters as Record<string, unknown>);
          propValue = (propTypeParameters.customHtml as string);
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
    nameTranslatedText(): string {
      return this.translate('TagManager_TagsNameDescription');
    },
    descriptionTranslatedText(): string {
      return this.translate('TagManager_TagsDescriptionDescription');
    },
    typeTranslatedText(): string {
      return this.translate('TagManager_TagsTypeDescription');
    },
    triggersTranslatedText(): string {
      return this.translate('TagManager_TagsTriggersDescription');
    },
    lastUpdatedTranslatedText(): string {
      return this.translate('TagManager_TagsLastUpdatedDescription');
    },
    actionTranslatedText(): string {
      return this.translate('TagManager_TagsActionDescription');
    },
  },
});
</script>
