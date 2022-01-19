<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

// TODO
<todo>
- get to build
- test in UI
- create PR
</todo>

<template>
  <div class="manageVariable">
    <div v-if="!editMode">
      <VariableList
        :id-container-version="idContainerVersion"
        :id-container="idContainer"
      />
    </div>
    <div v-if="editMode">
      <VariableEdit
        :id-container-version="idContainerVersion"
        :id-container="idContainer"
        :id-variable="idVariable"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { Matomo, MatomoUrl, NotificationsStore } from 'CoreHome';
import VariableList from '../Variable/VariableList.vue';
import VariableEdit from '../Variable/VariableEdit.vue';

interface VariableManageState {
  isAddAllowed: boolean;
}

export default defineComponent({
  props: {
    idContainerVersion: String,
    idContainer: String,
  },
  components: {
    VariableList,
    VariableEdit,
  },
  data(): VariableManageState {
    return {
      isAddAllowed: false,
    };
  },
  created() {
    // doing this in a watch because we don't want to post an event in a computed property
    watch(() => MatomoUrl.parsed.value, () => {
      // for BC w/ angularjs only invoke event if idVariable is 0
      const idVariable = MatomoUrl.urlParsed.value.idVariable as string;
      if (idVariable === '0') {
        const parameters = { isAllowed: true };
        Matomo.postEvent('TagManager.initAddVariable', parameters);
        this.isAddAllowed = !!parameters.isAllowed;
      }
    });

    NotificationsStore.remove('variablevariablemanagement');
  },
  computed: {
    idVariable() {
      const idVariable = MatomoUrl.urlParsed.value.idVariable as string;
      if (!this.isAddAllowed && idVariable === '0') {
        return null;
      }
      return idVariable ? parseInt(idVariable, 10) : idVariable;
    },
    editMode() {
      return !!this.idVariable;
    },
  },
});
</script>
