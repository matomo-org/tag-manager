<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="manageVariable">
    <div v-if="!editMode">
      <VariableList
        :id-container-version="idContainerVersion"
        :id-container="idContainer"
        :variables-help-text="variablesHelpText"
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
import VariableList from './VariableList.vue';
import VariableEdit from './VariableEdit.vue';

interface VariableManageState {
  isAddAllowed: boolean;
}

export default defineComponent({
  props: {
    idContainerVersion: Number,
    idContainer: String,
    variablesHelpText: String,
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
    watch(() => MatomoUrl.hashParsed.value.idVariable as string, (idVariable) => {
      this.onIdVariableParamChange(idVariable);
    });

    NotificationsStore.remove('variablevariablemanagement');

    this.onIdVariableParamChange(MatomoUrl.hashParsed.value.idVariable as string);
  },
  methods: {
    onIdVariableParamChange(idVariable: string) {
      // for BC w/ angularjs only invoke event if idVariable is 0
      if (idVariable === '0') {
        const parameters = { isAllowed: true };
        Matomo.postEvent('TagManager.initAddVariable', parameters);
        this.isAddAllowed = !!parameters.isAllowed;
      }
    },
  },
  computed: {
    idVariable() {
      const idVariable = MatomoUrl.hashParsed.value.idVariable as string;
      if (!this.isAddAllowed && idVariable === '0') {
        return null;
      }
      return idVariable ? parseInt(idVariable, 10) : idVariable;
    },
    editMode() {
      return typeof this.idVariable === 'number';
    },
  },
});
</script>
