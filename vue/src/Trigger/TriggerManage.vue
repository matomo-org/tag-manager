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
  <div class="manageTrigger">
    <div v-show="!editMode">
      <div
        piwik-trigger-list
        :id-container="idContainer"
        :id-container-version="idContainerVersion"
      />
    </div>
    <div v-show="editMode">
      <div
        piwik-trigger-edit
        :id-container="idContainer"
        :id-container-version="idContainerVersion"
        :id-trigger="idTrigger"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { translate, AjaxHelper } from 'CoreHome';
import TriggerList from '../Trigger/TriggerList.vue';
import TriggerEdit from '../Trigger/TriggerEdit.vue';

interface TriggerManageState {
  editMode: boolean;
}

export default defineComponent({
  props: {
    idContainerVersion: String,
    idContainer: String,
  },
  components: {
    TriggerList,
    TriggerEdit,
  },
  data(): TriggerManageState {
    return {
      editMode: false,
    };
  },
  created() {
    initState();
    this.$on('$destroy', function () {
  if (onChangeSuccess) {
    onChangeSuccess();
  }
});
  },
});
</script>
