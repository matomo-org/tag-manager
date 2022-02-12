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
    class="editVersion tagManagerManageEdit"
    feature="Tag Manager"
    :content-title="editTitle"
  >
    <p v-show="model.isLoading">
      <span class="loadingPiwik"><img src="plugins/Morpheus/images/loading-blue.gif" /> {{ translate('General_LoadingData') }}</span>
    </p>
    <p v-show="model.isUpdating">
      <span class="loadingPiwik"><img src="plugins/Morpheus/images/loading-blue.gif" /> {{ translate('TagManager_UpdatingData') }}</span>
    </p>
    <form @submit="edit ? updateVersion() : createVersion()">
      <div
        id="versionNameHelpText"
        class="inline-help-node"
      >
        {{ translate('TagManager_VersionNameHelp') }}
        <br /><br />
        <span
          v-show="lastVersion"
          v-html="$sanitize(translate('TagManager_NameOfLatestVersion', '&lt;strong&gt;' + lastVersion + '&lt;/strong&gt;'))"
        />
      </div>
      <div>
        <div>
          <Field
            uicontrol="text"
            name="name"
            inline-help="#versionNameHelpText"
            :model-value="version.name"
            @update:model-value="version.name = $event; setValueHasChanged()"
            :maxlength="30"
            :title="translate('TagManager_VersionName')"
          />
        </div>
        <div>
          <Field
            uicontrol="text"
            name="description"
            :model-value="version.description"
            @update:model-value="version.description = $event; setValueHasChanged()"
            :title="translate('TagManager_VersionDescription')"
            :inline-help="translate('TagManager_VersionDescriptionHelp')"
          />
        </div>
        <SaveButton
          class="createButton no-publish"
          @confirm="edit ? updateVersion() : createVersion()"
          :disabled="model.isUpdating || !isDirty"
          :saving="model.isUpdating"
          :value="edit ? translate('CoreUpdater_UpdateTitle') : translate('TagManager_CreateVersionWithoutPublishing')"
        >
        </SaveButton>
        <div
          id="selectTagManagerEnvironmentHelp"
          class="inline-help-node"
        >
          <div>{{ translate('TagManager_VersionEnvironmentHelp') }}</div>
          <div
            class="alert alert-info"
            style="margin-bottom: 0;padding-bottom: 0;"
            v-show="!canPublishToLive"
          >
            {{ translate('TagManager_PublishLiveEnvironmentCapabilityRequired', translate('TagManager_CapabilityPublishLiveContainer')) }}
          </div>
        </div>
        <div>
          <Field
            uicontrol="select"
            name="environment"
            inline-help="#selectTagManagerEnvironmentHelp"
            :model-value="version.environment"
            @update:model-value="version.environment = $event; setValueHasChanged()"
            v-show="create && environments.length"
            :options="environments"
            :introduction="translate('TagManager_OrCreateAndPublishVersion')"
            :title="translate('TagManager_Environment')"
          />
        </div>
        <SaveButton
          class="publishButton"
          v-show="create && environments.length"
          @confirm="createVersionAndPublish()"
          :disabled="model.isUpdating || !isDirty"
          :saving="model.isUpdating"
          :value="translate('TagManager_CreateVersionAndPublishRelease')"
        >
        </SaveButton>
        <div
          class="versionChanges"
          v-if="lastVersion"
        >
          <h3>{{ translate('TagManager_ChangesSinceLastVersion') }}:</h3>
          <table v-content-table>
            <thead>
              <tr>
                <th>{{ translate('SitesManager_Type') }}</th>
                <th>{{ translate('General_Name') }}</th>
                <th>{{ translate('TagManager_Change') }}</th>
                <th>{{ translate('TagManager_LastUpdated') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isLoadingVersionChanges">
                <td colspan="4">
                  <ActivityIndicator
                    :loading-message="translate('TagManager_DetectingChanges')"
                    :loading="true"
                  />
                </td>
              </tr>
              <tr v-if="!versionChanges.length && !isLoadingVersionChanges">
                <td colspan="4">{{ translate('UserCountryMap_None') }}</td>
              </tr>
              <tr v-for="versionChange in versionChanges">
                <td>{{ translate(versionChange.entityType) }}</td>
                <td>{{ versionChange.name }}</td>
                <td>{{ translate(versionChange.type) }}</td>
                <td class="lastUpdated"><span>{{ versionChange.lastChanged }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="entityCancel"
          v-show="!isEmbedded"
        >
          <a @click="cancel()">{{ translate('General_Cancel') }}</a>
        </div>
      </div>
    </form>
  </ContentBlock>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  Matomo,
  translate,
  AjaxHelper,
  ContentBlock,
  ContentTable,
  ActivityIndicator,
  NotificationsStore, NotificationType,
} from 'CoreHome';
import { Field, SaveButton } from 'CorePluginsAdmin';
import AvailableEnvironmentsStore from '../AvailableEnvironments.store';

interface VersionEditState {
  isDirty: boolean;
  isEmbedded: unknown; // TODO
  lastVersion: unknown|null; // TODO
  versionChanges: unknown[]; // TODO
  isLoadingVersionChanges: boolean;
  canPublishToLive: unknown; // TODO
}

const notificationId = 'versiontagmanagement';

export default defineComponent({
  props: {
    idContainerVersion: {
      type: Number,
      required: true,
    },
    idContainer: {
      type: Number,
      required: true,
    },
  },
  components: {
    ContentBlock,
    Field,
    SaveButton,
    ActivityIndicator,
  },
  directives: {
    ContentTable,
  },
  data(): VersionEditState {
    return {
      isDirty: false,
      isEmbedded: !!this.onChangeVersion,
      lastVersion: null,
      versionChanges: [],
      isLoadingVersionChanges: false,
      canPublishToLive: Matomo.hasUserCapability('tagmanager_publish_live_container'),
    };
  },
  emits: ['changeVersion'],
  created() {
    this.initIdContainerVersion();
  },
  watch: {
    idContainerVersion(newValue) {
      if (newValue === null) {
        return;
      }

      this.initIdContainerVersion();
    },
  },
  methods: {
    removeAnyVersionNotification() {
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
    // TODO
    initIdContainerVersion() {
      this.create = this.idContainerVersion == '0';
      this.edit = !this.create;
      this.version = {};
      this.lastVersion = null;
      this.versionChanges = [];
      this.isLoadingVersionChanges = true;
      tagManagerContainerModel.findContainer(this.idContainer).then(function (container) {
        this.isLoadingVersionChanges = false;
        this.lastVersion = null;

        if (!container || !container.versions || !angular.isArray(container.versions) || !container.versions.length) {
          return;
        }

        container = angular.copy(container); // we copy to not change original versions array

        var versions = container.versions;
        versions.sort(function (a, b) {
          return a.revision < b.revision;
        });
        var lastContainerVersion = null;

        if (this.create && versions[0] && versions[0].name) {
          this.lastVersion = versions[0].name;
          lastContainerVersion = versions[0].idcontainerversion;
        } else if (this.edit) {
          for (var i = 0; i < versions.length - 1; i++) {
            // we stop before the last one because it cannot have an entry
            if (versions[i].idcontainerversion === parseInt(this.idContainerVersion, 10) && versions[i + 1]) {
              this.lastVersion = versions[i + 1].name;
              lastContainerVersion = versions[i + 1].idcontainerversion;
            }
          }
        }

        if (this.lastVersion) {
          this.isLoadingVersionChanges = true;
          tagManagerVersionDiff.diffDraftVersion(this.idContainer, this.idContainerVersion, lastContainerVersion).then(function (diff) {
            this.versionChanges = diff;
            this.isLoadingVersionChanges = false;
          });

          if (this.create && !this.version.name && /^\d+$/.test(this.lastVersion)) {
            this.version.name = parseInt(this.lastVersion, 10) + 1;
            this.isDirty = true;
          }
        }
      });
      piwik.helper.lazyScrollToContent();

      if (this.edit && this.idContainerVersion) {
        this.editTitle = translate('TagManager_EditVersion');
        this.model.findVersion(this.idContainer, this.idContainerVersion).then(function (version) {
          if (!version) {
            return;
          }

          this.version = angular.copy(version);
          this.isDirty = false;
        });
      } else if (this.create) {
        this.editTitle = translate('TagManager_CreateNewVersion');
        this.version = {
          idSite: piwik.idSite,
          idcontainer: this.idContainer,
          name: '',
          environment: '',
          description: ''
        };

        if (this.canPublishToLive) {
          this.version.environment = 'live';
        } else if (angular.isArray(this.environments) && this.environments.length && this.environments[0]) {
          this.version.environment = this.environments[0].key;
        }

        this.isDirty = false;
      }
    },
    // TODO
    cancel() {
      this.idContainerVersion = null;
      currentId = null;
      var $search = $location.search();
      delete $search.idContainerVersion;
      $location.search($search);
    },
    // TODO
    createVersion() {
      this.removeAnyVersionNotification();

      if (!this.checkRequiredFieldsAreSet) {
        return;
      }

      this.isUpdating = true;
      tagManagerVersionModel.createOrUpdateVersion(this.version, 'TagManager.createContainerVersion').then(function (response) {
        this.isUpdating = false;

        if (!response || response.type === 'error' || !response.response) {
          return;
        }

        this.isDirty = false;
        var idContainerVersion = response.response.value;

        if ('function' === typeof this.onChangeVersion) {
          this.version.idcontainerversion = this.idContainerVersion;
          this.$emit('changeVersion', {
            version: this.version
          });
          return;
        }

        tagManagerVersionModel.reload(this.idContainer).then(function () {
          var $search = $location.search();
          $search.idContainerVersion = this.idContainerVersion;
          $location.search($search);
          setTimeout(function () {
            this.showNotification(translate('TagManager_CreatedX', translate('TagManager_Version')), response.type);
          }, 200);
        });
      }, function () {
        this.isUpdating = false;
      });
    },
    // TODO
    createVersionAndPublish() {
      this.removeAnyVersionNotification();

      if (!this.checkRequiredFieldsAreSet) {
        return;
      }

      this.isUpdating = true;
      tagManagerVersionModel.createOrUpdateVersion(this.version, 'TagManager.createContainerVersion').then(function (response) {
        if (!response || response.type === 'error' || !response.response || !response.response.value) {
          this.isUpdating = false;
          return;
        }

        var idContainerVersion = response.response.value;
        this.version.idcontainerversion = this.idContainerVersion;
        tagManagerVersionModel.publishVersion(this.idContainer, this.idContainerVersion, this.version.environment).then(function (response) {
          this.isUpdating = false;

          if (!response || response.type === 'error') {
            return;
          }

          this.isDirty = false;

          if ('function' === typeof this.onChangeVersion) {
            this.$emit('changeVersion', {
              version: this.version
            });
            return;
          }

          tagManagerVersionModel.reload(this.idContainer).then(function () {
            var $search = $location.search();
            $search.idContainerVersion = this.idContainerVersion;
            $location.search($search);
            setTimeout(function () {
              this.showNotification(translate('TagManager_VersionPublishSuccess'), response.type);
            }, 200);
          });
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
    updateVersion() {
      this.removeAnyVersionNotification();

      if (!this.checkRequiredFieldsAreSet) {
        return;
      }

      this.isUpdating = true;
      tagManagerVersionModel.createOrUpdateVersion(this.version, 'TagManager.updateContainerVersion').then(function (response) {
        if (response.type === 'error') {
          return;
        }

        var idContainerVersion = this.version.idcontainerversion;

        if ('function' === typeof this.onChangeVersion) {
          this.$emit('changeVersion', {
            version: this.version
          });
          return;
        }

        this.isDirty = false;
        this.version = {};
        tagManagerVersionModel.reload(this.idContainer).then(function () {
          this.init(this.idContainerVersion);
        });
        this.showNotification(translate('TagManager_UpdatedX', translate('TagManager_Version')), response.type);
      });
    },
  },
  computed: {
    environments() {
      return AvailableEnvironmentsStore.environmentsWithPublishOptions.value;
    },
    // TODO
    notification() {
      var UI = require('piwik/UI');

      return new UI.Notification();
    },
    // TODO
    checkRequiredFieldsAreSet() {
      var title;

      if (!this.version.name) {
        title = translate('General_Name');
        this.showErrorFieldNotProvidedNotification(title);
        return false;
      }

      return true;
    },
  },
});
</script>
