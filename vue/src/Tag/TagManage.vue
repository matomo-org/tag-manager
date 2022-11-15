<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="manageTag">
    <div v-if="!editMode">
      <TagList
        :id-container="idContainer"
        :id-container-version="idContainerVersion"
        :tags-help-text="tagsHelpText"
      />
    </div>
    <div v-if="editMode">
      <TagEdit
        :id-container="idContainer"
        :id-container-version="idContainerVersion"
        :id-tag="idTag"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { MatomoUrl, NotificationsStore, Matomo } from 'CoreHome';
import TagList from './TagList.vue';
import TagEdit from './TagEdit.vue';

interface TagManageState {
  isAddAllowed: boolean;
}

export default defineComponent({
  props: {
    idContainerVersion: Number,
    idContainer: String,
    tagsHelpText: String,
  },
  components: {
    TagList,
    TagEdit,
  },
  data(): TagManageState {
    return {
      isAddAllowed: false,
    };
  },
  created() {
    // doing this in a watch because we don't want to post an event in a computed property
    watch(() => MatomoUrl.hashParsed.value.idTag as string, (idTag) => {
      this.onIdTagParamChange(idTag);
    });

    NotificationsStore.remove('tagtagmanagement');

    this.onIdTagParamChange(MatomoUrl.hashParsed.value.idTag as string);
  },
  methods: {
    onIdTagParamChange(idTag: string) {
      // for BC w/ angularjs only invoke event if idTag is 0
      if (idTag === '0') {
        const parameters = { isAllowed: true };
        Matomo.postEvent('TagManager.initAddTag', parameters);
        this.isAddAllowed = !!parameters.isAllowed;
      }
    },
  },
  computed: {
    idTag() {
      const idTag = MatomoUrl.hashParsed.value.idTag as string;
      if (!this.isAddAllowed && idTag === '0') {
        return null;
      }
      return idTag ? parseInt(idTag, 10) : idTag;
    },
    editMode() {
      return typeof this.idTag === 'number';
    },
  },
});
</script>
