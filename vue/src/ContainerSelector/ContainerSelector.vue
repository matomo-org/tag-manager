<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div
    class="tagContainerSelector piwikSelector borderedControl"
    @click="fetchContainers(); showContainerList = !showContainerList"
    :class="{expanded: showContainerList}"
    v-focus-anywhere-but-here="{ blur: onBlur }"
    :title="translate('TagManager_ChooseContainer')"
  >
    <a class="title">
      <span class="icon icon-arrow-bottom" />
      {{ actualContainerName }}
    </a>
    <div
      class="dropdown positionInViewport"
      v-show="showContainerList"
    >
      <ActivityIndicator :loading="isLoading" />
      <div class="custom_select_container">
        <ul class="custom_select_ul_list">
          <li v-show="!isLoading && containers.length === 0">
            <a
              tabindex="-1"
              @click.prevent.stop
            >
              {{ translate('TagManager_NoContainersFound') }}
            </a>
          </li>
          <li
            v-for="containerEntry in containers"
            :title="`${containerEntry.name} (${containerEntry.idcontainer})`"
            :key="containerEntry.idcontainer"
          >
            <a :href="linkTo(containerEntry.idcontainer)">
              {{ containerEntry.name }} ({{ containerEntry.idcontainer }})
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  translate,
  Matomo,
  AjaxHelper,
  FocusAnywhereButHere,
  ActivityIndicator,
  MatomoUrl,
} from 'CoreHome';
import { Container } from '../types';

interface ContainerSelectorState {
  containers: Container[];
  isLoading: boolean;
  showContainerList: boolean;
}

export default defineComponent({
  props: {
    containerName: String,
  },
  components: {
    ActivityIndicator,
  },
  directives: {
    FocusAnywhereButHere,
  },
  data(): ContainerSelectorState {
    return {
      containers: [],
      isLoading: false,
      showContainerList: false,
    };
  },
  created() {
    setTimeout(() => {
      window.initTopControls();
    });
  },
  methods: {
    fetchContainers() {
      this.isLoading = true;
      this.containers = [];
      AjaxHelper.fetch<Container[]>({
        method: 'TagManager.getContainers',
      }).then((containers) => {
        this.containers = containers;
      }).finally(() => {
        this.isLoading = false;
      });
    },
    linkTo(idContainer: string) {
      let action = MatomoUrl.urlParsed.value.action as string;
      if (!action || action === 'manageContainers') {
        action = this.hasWriteAccess ? 'dashboard' : 'manageTags';
      }

      const newQuery = MatomoUrl.stringify({
        ...MatomoUrl.urlParsed.value,
        idContainer,
        action,
      });

      return `${window.location.pathname}?${newQuery}`;
    },
    onBlur() {
      this.showContainerList = false;
    },
  },
  computed: {
    actualContainerName() {
      if (this.containerName) {
        return translate('TagManager_ContainerX', this.containerName);
      }

      return translate('TagManager_ChooseContainer');
    },
    hasWriteAccess() {
      return Matomo.hasUserCapability('tagmanager_write');
    },
  },
});
</script>
