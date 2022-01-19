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
  <div class="tagManagerManageList tagManagerVariableList">
    <ContentBlock
      feature="Tag Manager"
      class="tagManagerCustomVariablesList"
      :content-title="translate('TagManager_ManageX', translate('TagManager_Variables'))"
    >
      <p>{{ translate('TagManager_VariableUsageBenefits') }}</p>
      <table v-content-table>
        <thead>
          <tr>
            <th class="name">{{ translate('General_Name') }}</th>
            <th class="type">{{ translate('TagManager_Type') }}</th>
            <th class="lookupTable">{{ translate('TagManager_LookupTable') }}</th>
            <th class="lastUpdated">{{ translate('TagManager_LastUpdated') }}</th>
            <th
              class="action"
              v-show="hasWriteAccess"
            >{{ translate('General_Actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-show="isLoading || isUpdating">
            <td colspan="7">
              <span class="loadingPiwik">
                <img src="plugins/Morpheus/images/loading-blue.gif" />
                {{ translate('General_LoadingData') }}
              </span>
            </td>
          </tr>
          <tr v-show="!isLoading && !this.variables.length">
            <td colspan="7">
              {{ translate('TagManager_NoVariablesFound') }}
              <a
                class="createContainerVariableNow"
                v-show="hasWriteAccess"
                @click="createVariable()"
              >
                {{ translate('TagManager_CreateNewVariableNow') }}
              </a>
            </td>
          </tr>
          <tr
            :id="`variable${variable.idvariable}`"
            class="variables"
            v-for="(variable, index) in sortedVariables"
            :key="index"
          >
            <td class="name">{{ variable.name }}</td>
            <td
              class="type"
              :title="variable.typeMetadata.description"
            >{{ variable.typeMetadata.name }}</td>
            <td class="lookupTable"><span
                class="icon-ok"
                v-show="length(variable.lookup_table)"
              /></td>
            <td
              class="lastUpdated"
              :title="translate('TagManager_CreatedOnX', variable.created_date_pretty)"
            ><span>{{ variable.updated_date_pretty }}</span></td>
            <td
              class="action"
              v-show="hasWriteAccess"
            >
              <a
                class="table-action icon-edit"
                @click="editVariable(variable.idvariable, variable.type)"
                :title="translate('TagManager_EditVariable')"
              />
              <a
                class="table-action icon-delete"
                @click="deleteVariable(variable)"
                :title="translate('TagManager_DeleteX', translate('TagManager_Variable'))"
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
          class="createNewVariable"
          value
          @click="createVariable()"
        ><span class="icon-add" /> {{ translate('TagManager_CreateNewVariable') }}</a>
      </div>
    </ContentBlock>
    <h2 :title="translate('TagManager_PreConfiguredInfoTitle')">{{ translate('TagManager_PreconfiguredVariables') }} <span class="icon-help preconfiguredVariablesHelp" /></h2>
    <div>
      <ul
        class="collection with-header"
        v-for="variableCategory in containerVariables"
      >
        <li class="collection-header">
          <h4>{{ variableCategory.name }}</h4>
        </li>
        <li
          class="collection-item"
          v-show="variableTemplate.is_pre_configured"
          v-for="variableTemplate in variableCategory.types"
        >
          <span class="title">{{ variableTemplate.name }} <span class="variableId">{{ '{' + '{' + variableTemplate.id + '}' + '}' }}</span></span>
          <span
            class="secondary-content"
            v-show="!!variableTemplate.description"
          ><i
              class="icon-help"
              :title="variableTemplate.description"
            /></span>
        </li>
      </ul>
    </div>
    <div
      class="ui-confirm"
      id="confirmDeleteVariable"
    >
      <h2>{{ translate('TagManager_DeleteVariableConfirm') }} </h2>
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
      id="confirmDeleteVariableNotPossible"
    >
      <h2>{{ translate('TagManager_VariableCannotBeDeleted') }}</h2>
      <p>
        {{ translate('TagManager_VariableBeingUsedBy') }}
      </p>
      <ul class="collection">
        <li
          class="collection-item"
          v-for="reference in variableReferences"
        >
          {{ reference.referenceTypeName }}: {{ reference.referenceName }}
        </li>
      </ul>
      <p>
        {{ translate('TagManager_VariableBeingUsedNeedsRemove') }}
      </p>
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
import {
  translate,
  AjaxHelper,
  ContentBlock,
  ContentTable,
  Matomo,
} from 'CoreHome';
import VariablesStore from './Variables.store';
import AvailableComparisonsStore from '../AvailableComparisons.store';

interface VariableListState {
  hasWriteAccess: unknown; // TODO
  variableReferences: unknown[]; // TODO
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
  data(): VariableListState {
    return {
      hasWriteAccess: Matomo.hasUserCapability('tagmanager_write'),
      variableReferences: [],
    };
  },
  created() {
    this.model.fetchVariables(this.idContainer, this.idContainerVersion);
    this.model.fetchAvailableContainerVariables(this.idContainer, this.idContainerVersion).then(function (variables) {
      this.containerVariables = variables;
    });
  },
  methods: {
    // TODO
    createVariable() {
      this.editVariable(0);
    },
    // TODO
    editVariable(idVariable) {
      var $search = $location.search();
      $search.idVariable = idVariable;
      $location.search($search);
    },
    // TODO
    deleteVariable(variable) {
      piwikApi.fetch({
        method: 'TagManager.getContainerVariableReferences',
        idContainer: this.idContainer,
        idContainerVersion: this.idContainerVersion,
        idVariable: variable.idvariable
      }).then(function (references) {
        if (!references || !references.length) {
          this.variableReferences = [];

          function doDelete() {
            tagManagerVariableModel.deleteVariable(this.idContainer, this.idContainerVersion, variable.idvariable).then(function () {
              tagManagerVariableModel.reload(this.idContainer, this.idContainerVersion);
            });
          }

          piwik.helper.modalConfirm('#confirmDeleteVariable', {
            yes: doDelete
          });
        } else {
          this.variableReferences = references;
          piwik.helper.modalConfirm('#confirmDeleteVariableNotPossible', {});
        }
      });
    },
  },
  computed: {
    isLoading() {
      return VariablesStore.isLoading.value;
    },
    isUpdating() {
      return VariablesStore.isUpdating.value;
    },
    variables() {
      return VariablesStore.variables.value;
    },
    sortedVariables() {
      // TODO orderBy(model.variables, 'name', false)
    }
  },
});
</script>
