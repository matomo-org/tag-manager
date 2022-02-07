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
  <div class="tagManagerManageList tagManagerTagList">
    <ContentBlock
      feature="Tag Manager"
      :content-title="translate('TagManager_ManageX', translate('TagManager_Tags'))"
    >
      <p>{{ translate('TagManager_TagUsageBenefits') }}</p>
      <table v-content-table>
        <thead>
          <tr>
            <th class="name">{{ translate('General_Name') }}</th>
            <th class="type">{{ translate('TagManager_Type') }}</th>
            <th class="triggers">{{ translate('TagManager_Triggers') }}</th>
            <th class="lastUpdated">{{ translate('TagManager_LastUpdated') }}</th>
            <th
              class="action"
              v-show="hasWriteAccess"
            >{{ translate('General_Actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-show="model.isLoading || model.isUpdating">
            <td colspan="5">
              <span class="loadingPiwik"><img src="plugins/Morpheus/images/loading-blue.gif" /> {{ translate('General_LoadingData') }}</span>
            </td>
          </tr>
          <tr v-show="!model.isLoading && length(model.tags) == 0">
            <td colspan="5">
              {{ translate('TagManager_NoTagsFound') }}
              <a
                class="createContainerTagNow"
                v-show="hasWriteAccess"
                @click="createTag()"
              >{{ translate('TagManager_CreateNewTagNow') }}</a>
            </td>
          </tr>
          <tr
            id="tag{{ tag.idtag }}"
            class="tags"
            v-for="tag in orderBy(model.tags, 'name', false)"
          >
            <td class="name">{{ tag.name }}</td>
            <td
              class="type"
              :title="tag.typeMetadata.description"
            >{{ tag.typeMetadata.name }}</td>
            <td class="triggers">
              <span v-for="((fireTriggerIndex, fireTriggerId), fireTriggerIndex) in tag.fire_trigger_ids">
                <a
                  style="display: inline-block;vertical-align: top !important;"
                  class="chip"
                  v-show="hasWriteAccess"
                  @click="editTrigger(fireTriggerId)"
                >{{ triggers.fireTriggerId }}</a>
                <span
                  class="chip"
                  v-show="!hasWriteAccess"
                >{{ triggers.fireTriggerId }}</span>
              </span>
              <span v-show="length(tag.block_trigger_ids)">{{ translate('TagManager_Except') }}:
                <span v-for="blockTriggerId in tag.block_trigger_ids">
                  <a
                    class="chip"
                    v-show="hasWriteAccess"
                    @click="editTrigger(blockTriggerId)"
                  >{{ triggers.blockTriggerId }}</a>
                  <span
                    class="chip"
                    v-show="!hasWriteAccess"
                  >{{ triggers.blockTriggerId }}</span>
                </span></span>
            </td>
            <td
              class="lastUpdated"
              :title="translate('TagManager_CreatedOnX', tag.created_date_pretty)"
            ><span>{{ tag.updated_date_pretty }}</span></td>
            <td
              class="action"
              v-show="hasWriteAccess"
            >
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
        ><span class="icon-add" /> {{ translate('TagManager_CreateNewTag') }}</a>
      </div>
    </ContentBlock>
    <div
      class="ui-confirm"
      id="confirmDeleteTag"
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { translate, AjaxHelper, ContentBlock, ContentTable } from 'CoreHome';


interface TagListState {
  model: unknown; // TODO
  hasWriteAccess: unknown; // TODO
  triggers: Record<string, unknown>; // TODO
}

export default defineComponent({
  props: {
    idContainer: null, // TODO,
    idContainerVersion: null, // TODO,
  },
  components: {
    ContentBlock,
  },
  directives: {
    ContentTable,
  },
  data(): TagListState {
    return {
      model: tagManagerTagModel,
      hasWriteAccess: piwik.hasUserCapability('tagmanager_write'),
      triggers: {},
    };
  },
  created() {
    this.model.onReload = function () {
  updateTriggers();
};
    this.model.fetchTags(this.idContainer, this.idContainerVersion);
    updateTriggers();
  },
  methods: {
    // TODO
    updateTriggers() {
      tagManagerTriggerModel.reload(this.idContainer, this.idContainerVersion).then(function (this.triggers) {
        this.triggers = {};
        angular.forEach(this.triggers, function (trigger) {
          this.triggers[trigger.idtrigger] = trigger.name;
        });
      });
    },
    // TODO
    createTag() {
      this.editTag(0);
    },
    // TODO
    editTrigger(idTrigger) {
      tagManagerHelper.editTrigger(this, this.idContainer, this.idContainerVersion, idTrigger, function () {
        this.updateTriggers();
      });
    },
    // TODO
    editTag(idTag) {
      var $search = $location.search();
      $search.idTag = idTag;
      $location.search($search);
    },
    // TODO
    deleteTag(tag) {
      function doDelete() {
        tagManagerTagModel.deleteTag(this.idContainer, this.idContainerVersion, tag.idtag).then(function () {
          tagManagerTagModel.reload(this.idContainer, this.idContainerVersion);
        });
      }
    
      piwik.helper.modalConfirm('#confirmDeleteTag', {
        yes: doDelete
      });
    },
  },
});
</script>
