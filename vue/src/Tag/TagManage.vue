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
  <div class="manageTag">
    <div v-show="!editMode">
      <div
        piwik-tag-list
        :id-container="idContainer"
        :id-container-version="idContainerVersion"
      />
    </div>
    <div v-show="editMode">
      <div
        piwik-tag-edit
        :id-container="idContainer"
        :id-container-version="idContainerVersion"
        :id-tag="idTag"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { translate, AjaxHelper } from 'CoreHome';
import TagList from '../TagList/TagList.vue';
import TagEdit from '../TagEdit/TagEdit.vue';

interface TagManageState {
  editMode: boolean;
}

export default defineComponent({
  props: {
    idContainerVersion: String,
    idContainer: String,
  },
  components: {
    TagList,
    TagEdit,
  },
  data(): TagManageState {
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
