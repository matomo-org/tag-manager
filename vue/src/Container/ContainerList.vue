<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="tagManagerManageList tagManagerContainerList">
    <ContentBlock
      feature="Tag Manager"
      :content-title="translate(
        'TagManager_ManageX',
        translate('TagManager_Containers'),
      )"
    >
      <p>{{ translate('TagManager_ContainerUsageBenefits') }}</p>
      <table v-content-table>
        <thead>
          <tr>
            <th class="index">{{ translate('General_Id') }}</th>
            <th class="name">{{ translate('General_Name') }}</th>
            <th class="description">{{ translate('General_Description') }}</th>
            <th class="created">{{ translate('TagManager_CreatedDate') }}</th>
            <th class="action">{{ translate('General_Actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-show="isLoading || isUpdating">
            <td colspan="5">
              <span class="loadingPiwik">
                <img src="plugins/Morpheus/images/loading-blue.gif" />
                {{ translate('General_LoadingData') }}
              </span>
            </td>
          </tr>
          <tr v-show="!isLoading && containers.length === 0">
            <td colspan="5">
              {{ translate('TagManager_NoContainersFound') }} <a
                  class="createContainerNow"
                  v-show="hasWriteAccess"
                  @click="createContainer()"
                >
                  {{ translate('TagManager_CreateNewContainerNow') }}
              </a>
            </td>
          </tr>
          <tr
            :id="`container${container.idcontainer}`"
            class="containers"
            v-for="container in sortedContainers"
            :key="container.idcontainer"
          >
            <td
              class="index"
              :title="`${translate('TagManager_Context')}: ` +
                contexts[container.context]"
            >{{ container.idcontainer }}</td>
            <td class="name">{{ container.name }}</td>
            <td
              class="description"
              :title="container.description"
            >{{ truncateText(container.description, 50) }}</td>
            <td class="created"><span>{{ container.created_date_pretty }}</span></td>
            <td class="action">
              <a
                class="table-action icon-configure"
                :href="'?module=TagManager&action=' + containerDefaultAction + '&idContainer='
                  + container.idcontainer + '&idSite=' + container.idsite
                  + '&period=day&date=yesterday'"
                :title="translate(
                  'TagManager_ConfigureX',
                  translate('TagManager_Container'),
                )"
              />
              <a
                class="table-action installCode icon-embed"
                @click="installCode(container.idcontainer)"
                :title="translate('TagManager_InstallCode')"
              />
              <a
                class="table-action icon-edit"
                v-show="hasWriteAccess"
                @click="editContainer(container.idcontainer)"
                :title="translate(
                  'TagManager_EditX',
                  translate('TagManager_Container'),
                )"
              />
              <a
                class="table-action icon-delete"
                v-show="hasWriteAccess"
                @click="deleteContainer(container)"
                :title="translate(
                  'TagManager_DeleteX',
                  translate('TagManager_Container'),
                )"
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
          class="createNewContainer"
          value
          @click="createContainer()"
        >
          <span class="icon-add" /> {{ translate('TagManager_CreateNewContainer') }}
        </a>
      </div>
    </ContentBlock>
    <div
      class="ui-confirm"
      id="confirmDeleteContainer"
      ref="confirmDeleteContainer"
    >
      <h2>{{ translate('TagManager_DeleteContainerConfirm') }} </h2>
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
import { DeepReadonly, defineComponent } from 'vue';
import {
  Matomo,
  ContentBlock,
  ContentTable,
  MatomoUrl,
} from 'CoreHome';
import AvailableContextsStore from '../AvailableContexts.store';
import ContainersStore from './Containers.store';
import { Container } from '../types';
import VersionsStore from '../Version/Versions.store';

const { tagManagerHelper } = window;

export default defineComponent({
  components: {
    ContentBlock,
  },
  directives: {
    ContentTable,
  },
  created() {
    AvailableContextsStore.init();
    ContainersStore.fetchContainers();
  },
  computed: {
    contexts(): Record<string, string> {
      const result: Record<string, string> = {};
      AvailableContextsStore.contexts.value.forEach(({ id, name }) => {
        result[id] = name;
      });
      return result;
    },
    hasWriteAccess(): boolean {
      return Matomo.hasUserCapability('tagmanager_write');
    },
    containerDefaultAction(): string {
      return this.hasWriteAccess ? 'dashboard' : 'manageTags';
    },
    isLoading(): boolean {
      return VersionsStore.isLoading.value;
    },
    isUpdating(): boolean {
      return VersionsStore.isUpdating.value;
    },
    containers(): DeepReadonly<Container[]> {
      return ContainersStore.containers.value;
    },
    sortedContainers(): DeepReadonly<Container[]> {
      const sorted = [...this.containers];
      sorted.sort((lhs, rhs) => {
        if (lhs.created_date < rhs.created_date) {
          return 1;
        }
        return lhs.created_date > rhs.created_date ? -1 : 0;
      });
      return sorted;
    },
  },
  methods: {
    createContainer() {
      this.editContainer('0');
    },
    editContainer(idContainer: string) {
      MatomoUrl.updateHash({
        ...MatomoUrl.hashParsed.value,
        idContainer,
      });
    },
    installCode(idContainer: string) {
      tagManagerHelper.showInstallCode(idContainer);
    },
    deleteContainer(container: Container) {
      function doDelete() {
        ContainersStore.deleteContainer(container.idcontainer).then(() => {
          ContainersStore.reload();
        });
      }

      Matomo.helper.modalConfirm(this.$refs.confirmDeleteContainer as HTMLElement, {
        yes: doDelete,
      });
    },
    truncateText(text: string, length: number) {
      if (text.length > length) {
        return `${text.substr(0, length - 3)}...`;
      }

      return text;
    },
  },
});
</script>
