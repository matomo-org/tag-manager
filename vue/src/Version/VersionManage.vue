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
  <div class="manageVersion">
    <div v-show="!editMode">
      <div
        piwik-version-list
        :id-container="idContainer"
      />
    </div>
    <div v-show="editMode">
      <div
        piwik-version-edit
        :id-container="idContainer"
        :id-container-version="idContainerVersion"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { translate, Matomo } from 'CoreHome';
import VersionList from 'VersionList.vue';
import VersionEdit from 'VersionEdit.vue';

interface VersionManageState {
  editMode: boolean;
}

export default defineComponent({
  props: {
    idContainer: String,
  },
  components: {
    VersionList,
    VersionEdit,
  },
  data(): VersionManageState {
    return {
      editMode: false,
    };
  },
  created() {
    this.initState();
    this.$on('$destroy', function () {
      if (onChangeSuccess) {
        onChangeSuccess();
      }
    });
  },
  methods: {
    // TODO
    removeAnyVersionNotification() {
      var UI = require('piwik/UI');
    
      new UI.Notification().remove('versiontagmanagement');
    },
    // TODO
    initState() {
      var $search = $location.search();
    
      if ('idContainerVersion' in $search) {
        if ($search.idContainerVersion === 0 || $search.idContainerVersion === '0') {
          var parameters = {
            isAllowed: true
          };
          Matomo.postEvent('TagManager.initAddVersion', parameters);
    
          if (parameters && !parameters.isAllowed) {
            this.editMode = false;
            this.idContainerVersion = null;
            return;
          }
        }
    
        this.editMode = true;
        this.idContainerVersion = parseInt($search.idContainerVersion, 10);
      } else {
        this.editMode = false;
        this.idContainerVersion = null;
      }
    
      this.removeAnyVersionNotification();
    },
  },
});
</script>
