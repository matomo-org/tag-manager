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
  <div class="tagManagerManageList tagManagerVersionList">
    <ContentBlock
      feature="Tag Manager"
      :content-title="translate('TagManager_ManageX', translate('TagManager_Versions'))"
    >
      <p>{{ translate('TagManager_VersionUsageBenefits') }} {{ translate('TagManager_ConfigureEnvironmentsSuperUser') }}</p>
      <table v-content-table>
        <thead>
          <tr>
            <th class="index">{{ translate('TagManager_Revision') }}</th>
            <th class="name">{{ translate('General_Name') }}</th>
            <th class="description">{{ translate('General_Description') }}</th>
            <th class="environments">{{ translate('TagManager_Environments') }}</th>
            <th class="created">{{ translate('TagManager_Created') }}</th>
            <th class="action">{{ translate('General_Actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-show="model.isLoading || model.isUpdating">
            <td colspan="7">
              <span class="loadingPiwik"><img src="plugins/Morpheus/images/loading-blue.gif" /> {{ translate('General_LoadingData') }}</span>
            </td>
          </tr>
          <tr v-show="!model.isLoading && model.versions.length == 0">
            <td colspan="7">
              {{ translate('TagManager_NoVersionsFound') }}
              <a
                class="createContainerVersionNow"
                v-show="hasWriteAccess"
                @click="createVersion()"
              >Create a new version now</a>
            </td>
          </tr>
          <tr
            id="version{{ version.idcontainerversion }}"
            class="versions"
            v-for="version in orderBy(model.versions, 'revision', true)"
          >
            <td class="index">{{ version.revision }}</td>
            <td class="name">{{ version.name }}</td>
            <td
              class="description"
              :title="version.description"
            >{{ truncateText(version.description, 30) }}</td>
            <td class="environments"><span
                v-for="release in version.releases"
                :title="translate('TagManager_ReleaseInfo', release.release_login, release.release_date_pretty)"
              >{{ ucfirst(release.environment) }}<span v-show="!$last">, </span></span></td>
            <td class="created"><span>{{ version.created_date_pretty }}</span></td>
            <td class="action">
              <a
                class="table-action icon-rocket"
                v-show="hasWriteAccess"
                @click="publishVersion(version)"
                :title="translate('TagManager_PublishVersion', version.name)"
              />
              <a
                class="table-action icon-bug"
                v-show="hasWriteAccess"
                @click="enableDebugMode(version.idcontainerversion)"
                :title="translate('TagManager_EnablePreviewDebug')"
              />
              <a
                target="_blank"
                class="table-action icon-export"
                @click="exportVersion(version.idcontainerversion, version.name); $event.preventDefault()"
                :href="'?module=TagManager&amp;action=exportContainerVersion&amp;idContainer=' + idContainer + '&amp;idContainerVersion=' + version.idcontainerversion + '&amp;idSite=' + version.idsite + '&amp;period=day&amp;date=yesterday'"
                :title="translate('TagManager_ExportX', translate('TagManager_Version'))"
              />
              <a
                class="table-action icon-edit"
                v-show="hasWriteAccess"
                @click="editVersion(version.idcontainerversion)"
                :title="translate('TagManager_EditX', translate('TagManager_Version'))"
              />
              <a
                class="table-action icon-delete"
                v-show="version.releases.length === 0 && hasWriteAccess"
                @click="deleteVersion(version)"
                :title="translate('TagManager_DeleteX', translate('TagManager_Version'))"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="tableActionBar">
        <a
          class="createNewVersion"
          v-show="hasWriteAccess"
          @click="createVersion()"
        ><span class="icon-add" /> {{ translate('TagManager_CreateNewVersion') }}</a>
        <a
          class="exportDraft"
          target="_blank"
          @click="exportVersion(null, 'draft'); $event.preventDefault()"
          :href="'?module=TagManager&amp;action=exportContainerVersion&amp;idContainer=' + idContainer + '&amp;idSite=' + idSite + '&amp;period=day&amp;date=yesterday'"
        ><span class="icon-export" /> {{ translate('TagManager_ExportDraft') }}</a>
        <a
          class="importVersion"
          v-show="hasWriteAccess"
          @click="importVersion()"
        ><span class="icon-upload" /> {{ translate('TagManager_Import') }}</a>
      </div>
    </ContentBlock>
    <div
      class="ui-confirm"
      id="confirmDeleteVersion"
    >
      <h2>{{ translate('TagManager_DeleteVersionConfirm') }} </h2>
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
      id="confirmPublishVersion"
    >
      <h2>{{ translate('TagManager_PublishVersion', versionToBePublished.name) }}</h2>
      <div v-show="versionToBePublished.availableEnvironments.length">
        <div>
          <Field
            uicontrol="select"
            name="environment"
            v-model="versionToBePublished.deployEnvironment"
            :options="versionToBePublished.availableEnvironments"
            :full-width="true"
            :title="translate('TagManager_Environment')"
          />
        </div>
        <div
          style="margin-bottom: 0;"
          class="alert alert-info"
          v-show="!canPublishToLive"
        >
          {{ translate('TagManager_PublishLiveEnvironmentCapabilityRequired', translate('TagManager_CapabilityPublishLiveContainer')) }}
        </div>
      </div>
      <div
        class="alert alert-info"
        style="margin-top: 16px;"
        v-if="!versionToBePublished.availableEnvironments.length"
      >
        {{ translate('TagManager_VersionAlreadyPublishedToAllEnvironments') }}
      </div>
      <input
        role="yes"
        type="button"
        :value="translate('TagManager_PublishRelease')"
      />
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
  Matomo,
  AjaxHelper,
  ContentBlock,
  ContentTable
} from 'CoreHome';
import { Field } from 'CorePluginsAdmin';


interface VersionListState {
  model: unknown; // TODO
  hasWriteAccess: unknown; // TODO
  token_auth: unknown; // TODO
  environments: unknown[]; // TODO
  versionToBePublished: unknown|null; // TODO
  idSite: unknown; // TODO
  canPublishToLive: unknown; // TODO
}

export default defineComponent({
  props: {
    idContainer: null, // TODO,
  },
  components: {
    ContentBlock,
    Field,
  },
  directives: {
    ContentTable,
  },
  data(): VersionListState {
    return {
      model: tagManagerVersionModel,
      hasWriteAccess: Matomo.hasUserCapability('tagmanager_write'),
      token_auth: Matomo.token_auth,
      environments: [],
      versionToBePublished: null,
      idSite: Matomo.idSite,
      canPublishToLive: Matomo.hasUserCapability('tagmanager_publish_live_container'),
    };
  },
  created() {
    tagManagerVersionModel.fetchAvailableEnvironmentsWithPublishPermission().then(function (environments) {
      this.environments = [];
      angular.forEach(environments, function (environment) {
        this.environments.push({
          key: environment.id,
          value: environment.name
        });
      });
    });
    this.model.fetchVersions(this.idContainer);
  },
  methods: {
    // TODO
    createVersion() {
      this.editVersion(0);
    },
    // TODO
    truncateText(text, length) {
      if (text && (text + '').length > length) {
        return String(text).substr(0, length - 3) + '...';
      }
    
      return text;
    },
    // TODO
    publishVersion(version) {
      version.deployEnvironment = '';
      version.availableEnvironments = [];
      angular.forEach(this.environments, function (env) {
        var found = false;
    
        if (version.releases) {
          angular.forEach(version.releases, function (release) {
            if (env && env.key == release.environment) {
              found = true;
            }
          });
        }
    
        if (!found) {
          if (!version.deployEnvironment) {
            version.deployEnvironment = env.key;
          }
    
          version.availableEnvironments.push(env);
        }
      });
      this.versionToBePublished = version;
      Matomo.helper.modalConfirm('#confirmPublishVersion', {
        yes: function () {
          if (version.deployEnvironment) {
            this.model.publishVersion(version.idcontainer, version.idcontainerversion, version.deployEnvironment).then(function () {
              this.model.reload(this.idContainer);
            });
          }
        }
      });
    },
    // TODO
    enableDebugMode(idContainerVersion) {
      tagManagerHelper.enablePreviewMode(this.idContainer, idContainerVersion);
    },
    // TODO
    exportVersion(idContainerVersion, versionName) {
      var params = {
        module: 'API',
        method: 'TagManager.exportContainerVersion',
        format: 'json',
        idContainer: this.idContainer,
        filter_limit: -1
      };
    
      if (idContainerVersion) {
        params.idContainerVersion = idContainerVersion;
      }
    
      var filename = 'container_' + this.idContainer;
    
      if (versionName) {
        filename += '_' + versionName;
      }
    
      AjaxHelper.fetch(params).then(function (exportedContainer) {
        Matomo.helper.sendContentAsDownload(filename + '.json', JSON.stringify(exportedContainer));
      });
    },
    // TODO
    editVersion(idContainerVersion) {
      var $search = $location.search();
      $search.idContainerVersion = idContainerVersion;
      $location.search($search);
    },
    // TODO
    importVersion() {
      tagManagerHelper.importVersion(this, this.idContainer);
    },
    // TODO
    deleteVersion(version) {
      function doDelete() {
        tagManagerVersionModel.deleteVersion(this.idContainer, version.idcontainerversion).then(function () {
          tagManagerVersionModel.reload(this.idContainer);
        });
      }
    
      Matomo.helper.modalConfirm('#confirmDeleteVersion', {
        yes: doDelete
      });
    },
  },
});
</script>
