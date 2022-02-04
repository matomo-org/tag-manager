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
  <div class="tagManagerManageList tagManagerTriggerList">
    <ContentBlock
      feature="Tag Manager"
      :content-title="translate('TagManager_ManageX', translate('TagManager_Triggers'))"
    >
      <p>{{ translate('TagManager_TriggerUsageBenefits') }}</p>
      <table v-content-table>
        <thead>
          <tr>
            <th class="name">{{ translate('General_Name') }}</th>
            <th class="type">{{ translate('TagManager_Type') }}</th>
            <th class="conditions">{{ translate('TagManager_Filter') }}</th>
            <th class="lastUpdated">{{ translate('TagManager_LastUpdated') }}</th>
            <th
              class="action"
              v-show="hasWriteAccess"
            >{{ translate('General_Actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-show="model.isLoading || model.isUpdating">
            <td colspan="7">
              <span class="loadingPiwik"><img src="plugins/Morpheus/images/loading-blue.gif" /> {{ translate('General_LoadingData') }}</span>
            </td>
          </tr>
          <tr v-show="!model.isLoading && length(model.triggers) == 0">
            <td colspan="7">
              {{ translate('TagManager_NoTriggersFound') }}
              <a
                class="createContainerTriggerNow"
                v-show="hasWriteAccess"
                @click="createTrigger()"
              >{{ translate('TagManager_CreateNewTriggerNow') }}</a>
            </td>
          </tr>
          <tr
            id="trigger{{ trigger.idtrigger }}"
            class="triggers"
            v-for="trigger in orderBy(model.triggers, 'name', false)"
          >
            <td class="name">{{ trigger.name }}</td>
            <td
              class="type"
              :title="trigger.typeMetadata.description"
            >{{ trigger.typeMetadata.name }}</td>
            <td class="conditions"><span
                class="icon-ok"
                v-show="length(trigger.conditions)"
              /></td>
            <td
              class="lastUpdated"
              :title="translate('TagManager_CreatedOnX', trigger.created_date_pretty)"
            ><span>{{ trigger.updated_date_pretty }}</span></td>
            <td
              class="action"
              v-show="hasWriteAccess"
            >
              <a
                class="table-action icon-edit"
                @click="editTrigger(trigger.idtrigger, trigger.type)"
                :title="translate('TagManager_EditTrigger')"
              />
              <a
                class="table-action icon-delete"
                @click="deleteTrigger(trigger)"
                :title="translate('TagManager_DeleteX', translate('TagManager_Trigger'))"
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
          class="createNewTrigger"
          value
          @click="createTrigger()"
        ><span class="icon-add" /> {{ translate('TagManager_CreateNewTrigger') }}</a>
      </div>
    </ContentBlock>
    <div
      class="ui-confirm"
      id="confirmDeleteTrigger"
    >
      <h2>{{ translate('TagManager_DeleteTriggerConfirm') }} </h2>
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
      id="confirmDeleteTriggerNotPossible"
    >
      <h2>{{ translate('TagManager_TriggerCannotBeDeleted') }}</h2>
      <p>{{ translate('TagManager_TriggerBeingUsedBy') }}</p>
      <ul class="collection">
        <li
          class="collection-item"
          v-for="reference in triggerReferences"
        >
          {{ reference.referenceTypeName }}: {{ reference.referenceName }}
        </li>
      </ul>
      <p>{{ translate('TagManager_TriggerBeingUsedNeedsRemove') }}</p>
      <input
        role="no"
        type="button"
        :value="translate('General_Cancel')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { translate, AjaxHelper, ContentBlock, ContentTable } from 'CoreHome';


interface TriggerListState {
  model: unknown; // TODO
  hasWriteAccess: unknown; // TODO
  triggerReferences: unknown[]; // TODO
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
  data(): TriggerListState {
    return {
      model: tagManagerTriggerModel,
      hasWriteAccess: piwik.hasUserCapability('tagmanager_write'),
      triggerReferences: [],
    };
  },
  created() {
    this.model.fetchTriggers(this.idContainer, this.idContainerVersion);
  },
  methods: {
    // TODO
    createTrigger() {
      this.editTrigger(0);
    },
    // TODO
    editTrigger(idTrigger) {
      var $search = $location.search();
      $search.idTrigger = idTrigger;
      $location.search($search);
    },
    // TODO
    deleteTrigger(trigger) {
      piwikApi.fetch({
        method: 'TagManager.getContainerTriggerReferences',
        idContainer: this.idContainer,
        idContainerVersion: this.idContainerVersion,
        idTrigger: trigger.idtrigger
      }).then(function (references) {
        if (!references || !references.length) {
          this.triggerReferences = [];
    
          function doDelete() {
            tagManagerTriggerModel.deleteTrigger(this.idContainer, this.idContainerVersion, trigger.idtrigger).then(function () {
              tagManagerTriggerModel.reload(this.idContainer, this.idContainerVersion);
            });
          }
    
          piwik.helper.modalConfirm('#confirmDeleteTrigger', {
            yes: doDelete
          });
        } else {
          this.triggerReferences = references;
          piwik.helper.modalConfirm('#confirmDeleteTriggerNotPossible', {});
        }
      });
    },
  },
});
</script>
