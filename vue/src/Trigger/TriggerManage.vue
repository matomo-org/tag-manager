<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="manageTrigger">
    <div v-show="!editMode">
      <div>
        <TriggerList
          :id-container="idContainer"
          :id-container-version="idContainerVersion"
          :triggers-help-text="triggersHelpText"
        />
      </div>
    </div>
    <div v-show="editMode">
      <div>
        <TriggerEdit
          :id-container="idContainer"
          :id-container-version="idContainerVersion"
          :id-trigger="idTrigger"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { MatomoUrl, NotificationsStore, Matomo } from 'CoreHome';
import TriggerList from './TriggerList.vue';
import TriggerEdit from './TriggerEdit.vue';

interface TriggerManageState {
  isAddAllowed: boolean;
}

export default defineComponent({
  props: {
    idContainerVersion: Number,
    idContainer: String,
    triggersHelpText: String,
  },
  components: {
    TriggerList,
    TriggerEdit,
  },
  data(): TriggerManageState {
    return {
      isAddAllowed: false,
    };
  },
  created() {
    // doing this in a watch because we don't want to post an event in a computed property
    watch(() => MatomoUrl.hashParsed.value.idTrigger as string, (idTrigger) => {
      this.onIdTriggerParamChange(idTrigger);
    });

    NotificationsStore.remove('triggertriggermanagement');

    this.onIdTriggerParamChange(MatomoUrl.hashParsed.value.idTrigger as string);
  },
  methods: {
    onIdTriggerParamChange(idTrigger: string) {
      // for BC w/ angularjs only invoke event if idVariable is 0
      if (idTrigger === '0') {
        const parameters = { isAllowed: true };
        Matomo.postEvent('TagManager.initAddTrigger', parameters);
        this.isAddAllowed = !!parameters.isAllowed;
      }
    },
  },
  computed: {
    idTrigger() {
      const idTrigger = MatomoUrl.hashParsed.value.idTrigger as string;
      if (!this.isAddAllowed && idTrigger === '0') {
        return null;
      }
      return idTrigger ? parseInt(idTrigger, 10) : idTrigger;
    },
    editMode() {
      return typeof this.idTrigger === 'number';
    },
  },
});
</script>
