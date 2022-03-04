<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="manageContainer">
    <div v-show="!editMode">
      <ContainerList />
    </div>
    <div v-show="editMode">
      <ContainerEdit
        :id-container="idContainer"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { Matomo, MatomoUrl, NotificationsStore } from 'CoreHome';
import ContainerList from './ContainerList.vue';
import ContainerEdit from './ContainerEdit.vue';

interface ContainerManageState {
  isAddAllowed: boolean;
}

export default defineComponent({
  props: {},
  components: {
    ContainerList,
    ContainerEdit,
  },
  data(): ContainerManageState {
    return {
      isAddAllowed: false,
    };
  },
  created() {
    // doing this in a watch because we don't want to post an event in a computed property
    watch(() => MatomoUrl.hashParsed.value.idContainer as string, (v) => {
      this.onIdContainerParamChange(v);
    });

    NotificationsStore.remove('containertagmanagement');

    this.onIdContainerParamChange(MatomoUrl.hashParsed.value.idContainer as string);
  },
  computed: {
    idContainer(): null|string {
      const idContainer = MatomoUrl.hashParsed.value.idContainer as string;
      if (!this.isAddAllowed && idContainer === '') {
        return null;
      }
      return idContainer;
    },
    editMode(): boolean {
      return !!this.idContainer;
    },
  },
  methods: {
    onIdContainerParamChange(idContainer: string) {
      // for BC w/ angularjs only invoke event if idContainer is 0
      if (idContainer === '0') {
        const parameters = { isAllowed: true };
        Matomo.postEvent('TagManager.initAddVersion', parameters);
        this.isAddAllowed = !!parameters.isAllowed;
      }
    },
  },
});
</script>
