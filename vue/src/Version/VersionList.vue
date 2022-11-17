<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="tagManagerManageList tagManagerVersionList">
    <ContentBlock
      feature="Tag Manager"
      :content-title="translate('TagManager_ManageX', translate('TagManager_Versions'))"
      :help-text="versionsHelpText"
    >
      <p>
        {{ translate('TagManager_VersionUsageBenefits') }}
        {{ translate('TagManager_ConfigureEnvironmentsSuperUser') }}
      </p>
      <table v-content-table>
        <thead>
          <tr>
            <th class="index"
              :title="revisionTranslatedText">{{ translate('TagManager_Revision') }}</th>
            <th class="name" :title="nameTranslatedText">{{ translate('General_Name') }}</th>
            <th class="description"
              :title="descriptionTranslatedText">{{ translate('General_Description') }}</th>
            <th class="environments"
              :title="environmentTranslatedText">{{ translate('TagManager_Environments') }}</th>
            <th class="created"
              :title="createdTranslatedText">{{ translate('TagManager_Created') }}</th>
            <th class="action"
              :title="actionTranslatedText">{{ translate('General_Actions') }}</th>
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
          <tr v-show="!isLoading && versions.length === 0">
            <td colspan="7">
              {{ translate('TagManager_NoVersionsFound') }}
              <a
                class="createContainerVersionNow"
                v-show="hasWriteAccess"
                @click="createVersion()"
              >
                {{ translate('TagManager_CreateNewVersionNow') }}
              </a>
            </td>
          </tr>
          <tr
            :id="`version${version.idcontainerversion}`"
            class="versions"
            v-for="version in sortedVersions"
            :key="version.revision"
          >
            <td class="index">{{ version.revision }}</td>
            <td class="name">{{ version.name }}</td>
            <td
              class="description"
              :title="version.description"
            >
              {{ truncateText(version.description, 30) }}
            </td>
            <td class="environments">
              <span
                v-for="(release, index) in version.releases"
                :key="index"
                :title="translate(
                  'TagManager_ReleaseInfo',
                  release.release_login,
                  release.release_date_pretty
                )"
              >
                {{ ucfirst(release.environment) }}<span
                  v-show="index !== version.releases.length - 1">, </span>
              </span>
            </td>
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
                @click.prevent="exportVersion(version.idcontainerversion, version.name);"
                :href="getExportUrl(version)"
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
        >
          <span class="icon-add" /> {{ translate('TagManager_CreateNewVersion') }}
        </a>
        <a
          class="exportDraft"
          target="_blank"
          @click="exportVersion(null, 'draft'); $event.preventDefault()"
          :href="getExportDraftUrl()"
        >
          <span class="icon-export" /> {{ translate('TagManager_ExportDraft') }}
        </a>
        <a
          class="importVersion"
          v-show="hasWriteAccess"
          @click="importVersion()"
        >
          <span class="icon-upload" /> {{ translate('TagManager_Import') }}
        </a>
      </div>
    </ContentBlock>
    <div
      class="ui-confirm"
      id="confirmDeleteVersion"
      ref="confirmDeleteVersion"
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
      ref="confirmPublishVersion"
    >
      <h2>{{ translate('TagManager_PublishVersion', versionToBePublished?.name) }}</h2>
      <div v-show="availableEnvironmentsToPublish.environnments.length">
        <div>
          <Field
            uicontrol="select"
            name="environment"
            v-model="availableEnvironmentsToPublish.deployEnvironment"
            :options="availableEnvironmentsToPublish.environnments"
            :full-width="true"
            :title="translate('TagManager_Environment')"
          />
        </div>
        <div
          style="margin-bottom: 0;"
          class="alert alert-info"
          v-show="!canPublishToLive"
        >
          {{ translate(
              'TagManager_PublishLiveEnvironmentCapabilityRequired',
              translate('TagManager_CapabilityPublishLiveContainer'),
            ) }}
        </div>
      </div>
      <div
        class="alert alert-info"
        style="margin-top: 16px;"
        v-if="!availableEnvironmentsToPublish.environnments.length"
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
  Matomo,
  AjaxHelper,
  ContentBlock,
  ContentTable, MatomoUrl,
} from 'CoreHome';
import { Field } from 'CorePluginsAdmin';
import VersionsStore from './Versions.store';
import { Version } from '../types';
import AvailableEnvironmentsStore from '../AvailableEnvironments.store';

interface VersionListState {
  versionToBePublished: Version|null;
}

const { tagManagerHelper } = window;

export default defineComponent({
  props: {
    idContainer: {
      type: String,
      required: true,
    },
    versionsHelpText: String,
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
      versionToBePublished: null,
    };
  },
  created() {
    AvailableEnvironmentsStore.init();
    VersionsStore.fetchVersions(this.idContainer);
  },
  methods: {
    createVersion() {
      this.editVersion(0);
    },
    truncateText(text: string, length: number) {
      return tagManagerHelper.truncateText(text, length);
    },
    publishVersion(version: Version) {
      this.versionToBePublished = version;
      Matomo.helper.modalConfirm(this.$refs.confirmPublishVersion as HTMLElement, {
        yes: () => {
          const { deployEnvironment } = this.availableEnvironmentsToPublish;
          if (deployEnvironment) {
            VersionsStore.publishVersion(
              version.idcontainer,
              version.idcontainerversion,
              deployEnvironment,
            ).then(() => {
              VersionsStore.reload(this.idContainer);
            });
          }
        },
      });
    },
    enableDebugMode(idContainerVersion: number) {
      tagManagerHelper.enablePreviewMode(this.idContainer, idContainerVersion);
    },
    exportVersion(idContainerVersion: number, versionName: string) {
      const params: QueryParameters = {
        module: 'API',
        method: 'TagManager.exportContainerVersion',
        format: 'json',
        idContainer: this.idContainer,
        filter_limit: -1,
      };

      if (idContainerVersion) {
        params.idContainerVersion = idContainerVersion;
      }

      let filename = `container_${this.idContainer}`;
      if (versionName) {
        filename += `_${versionName}`;
      }

      AjaxHelper.fetch(params).then((exportedContainer) => {
        Matomo.helper.sendContentAsDownload(`${filename}.json`, JSON.stringify(exportedContainer));
      });
    },
    editVersion(idContainerVersion: number) {
      MatomoUrl.updateHash({
        ...MatomoUrl.hashParsed.value,
        idContainerVersion,
      });
    },
    importVersion() {
      tagManagerHelper.importVersion(null, this.idContainer);
    },
    deleteVersion(version: Version) {
      const doDelete = () => {
        VersionsStore.deleteVersion(this.idContainer, version.idcontainerversion).then(() => {
          VersionsStore.reload(this.idContainer);
        });
      };

      Matomo.helper.modalConfirm(this.$refs.confirmDeleteVersion as HTMLElement, {
        yes: doDelete,
      });
    },
    ucfirst(s: string) {
      return `${s.substring(0, 1).toUpperCase()}${s.substring(1)}`;
    },
    getExportUrl(version: Version): string {
      return `?module=TagManager&action=exportContainerVersion&idContainer=${this.idContainer}`
        + `&idContainerVersion=${version.idcontainerversion}&idSite=${version.idsite}`
        + '&period=day&date=yesterday';
    },
    getExportDraftUrl(): string {
      return `?module=TagManager&action=exportContainerVersion&idContainer=${this.idContainer}`
        + `&idSite=${this.idSite}&period=day&date=yesterday`;
    },
  },
  computed: {
    environments() {
      return AvailableEnvironmentsStore.environmentsWithPublishOptions.value;
    },
    availableEnvironmentsToPublish() {
      let deployEnvironment = '';

      const environnments = this.environments.filter((env) => {
        if (!this.versionToBePublished?.releases) {
          return true;
        }

        const found = this.versionToBePublished?.releases.some((r) => r.environment === env?.key);
        if (!found && !deployEnvironment) {
          deployEnvironment = env.key;
        }
        return !found;
      });

      return {
        deployEnvironment,
        environnments,
      };
    },
    idSite() {
      return Matomo.idSite;
    },
    isLoading() {
      return VersionsStore.isLoading.value;
    },
    isUpdating() {
      return VersionsStore.isUpdating.value;
    },
    versions() {
      return VersionsStore.versions.value;
    },
    sortedVersions() {
      const sorted = [...this.versions];
      sorted.sort((lhs, rhs) => {
        if (lhs.revision < rhs.revision) {
          return 1;
        }
        return lhs.revision > rhs.revision ? 0 : 1;
      });
      return sorted;
    },
    hasWriteAccess() {
      return Matomo.hasUserCapability('tagmanager_write');
    },
    canPublishToLive() {
      return Matomo.hasUserCapability('tagmanager_publish_live_container');
    },
    revisionTranslatedText(): string {
      return this.translate('TagManager_VersionsRevisionDescription');
    },
    nameTranslatedText(): string {
      return this.translate('TagManager_VersionsNameDescription');
    },
    descriptionTranslatedText(): string {
      return this.translate('TagManager_VersionsDescriptionDescription');
    },
    environmentTranslatedText(): string {
      return this.translate('TagManager_VersionsEnvironmentsDescription');
    },
    createdTranslatedText(): string {
      return this.translate('TagManager_VersionsCreatedDescription');
    },
    actionTranslatedText(): string {
      return this.translate('TagManager_VersionsActionDescription');
    },
  },
});
</script>
