<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="manageVersion">
    <div v-if="!editMode">
      <VersionList
        :id-container="idContainer"
        :versions-help-text="versionsHelpText"
      />
    </div>
    <div v-if="editMode">
      <VersionEdit
        :id-container="idContainer"
        :id-container-version="idContainerVersion"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { Matomo, NotificationsStore, MatomoUrl } from 'CoreHome';
import VersionList from './VersionList.vue';
import VersionEdit from './VersionEdit.vue';

interface VersionManageState {
  isAddAllowed: boolean;
}

export default defineComponent({
  props: {
    idContainer: String,
    versionsHelpText: String,
  },
  components: {
    VersionList,
    VersionEdit,
  },
  data(): VersionManageState {
    return {
      isAddAllowed: false,
    };
  },
  created() {
    // doing this in a watch because we don't want to post an event in a computed property
    watch(() => MatomoUrl.hashParsed.value.idContainerVersion as string, (v) => {
      this.onIdContainerVersionParamChange(v);
    });

    NotificationsStore.remove('versiontagmanagement');

    this.onIdContainerVersionParamChange(MatomoUrl.hashParsed.value.idContainerVersion as string);
  },
  methods: {
    onIdContainerVersionParamChange(idContainerVersion: string) {
      // for BC w/ angularjs only invoke event if idContainerVersion is 0
      if (idContainerVersion === '0') {
        const parameters = { isAllowed: true };
        Matomo.postEvent('TagManager.initAddVersion', parameters);
        this.isAddAllowed = !!parameters.isAllowed;
      }
    },
  },
  computed: {
    idContainerVersion() {
      const idContainerVersion = MatomoUrl.hashParsed.value.idContainerVersion as string;
      if (!this.isAddAllowed && idContainerVersion === '0') {
        return null;
      }
      return idContainerVersion ? parseInt(idContainerVersion, 10) : idContainerVersion;
    },
    editMode() {
      return typeof this.idContainerVersion === 'number';
    },
  },
});
</script>
