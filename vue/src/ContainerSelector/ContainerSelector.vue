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
  <div
    class="tagContainerSelector piwikSelector borderedControl"
    @click="fetchContainers(); showContainerList = !showContainerList"
    :class="{'expanded': showContainerList}"
    v-focus-anywhere-but-here="containerSelector.showContainerList=false"
    :title="translate('TagManager_ChooseContainer')"
  >
    <a class="title">
      <span class="icon icon-arrow-bottom" />
      {{ containerName }}
    </a>
    <div
      class="dropdown positionInViewport"
      v-show="showContainerList"
    >
      <ActivityIndicator :loading="isLoading" />
      <div class="custom_select_container">
        <ul class="custom_select_ul_list">
          <li v-show="!isLoading && containers.length == 0">
            <a
              tabindex="-1"
              @click="$event.stopPropagation(); $event.preventDefault()"
            >{{ translate('TagManager_NoContainersFound') }}</a>
          </li>
          <li
            v-for="containerEntry in containers"
            :title="containerEntry.name + ' (' + containerEntry.idcontainer + ')'"
          >
            <a :href="linkTo(containerEntry.idcontainer)">{{ containerEntry.name }} ({{ containerEntry.idcontainer }})</a>
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
  ActivityIndicator
} from 'CoreHome';


interface ContainerSelectorState {
  containers: unknown[]; // TODO
  isLoading: boolean;
  hasWriteAccess: unknown; // TODO
}

export default defineComponent({
  props: {
    containerName: {
    type: undefined,
    required: true,
},
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
      hasWriteAccess: Matomo.hasUserCapability('tagmanager_write'),
    };
  },
  created() {
    setTimeout(function () {
      initTopControls();
    });
    setTimeout(function () {
      initTopControls();
    });
    if (this.containerName) {
      this.containerName = translate('TagManager_ContainerX', this.containerName);
    } else {
      this.containerName = 'Choose container';
    }
  },
  methods: {
    // TODO
    fetchContainers() {
      this.isLoading = true;
      this.containers = [];
      AjaxHelper.fetch({
        method: 'TagManager.getContainers'
      }).then(function (containers) {
        this.isLoading = false;
        this.containers = this.containers;
      }, function () {
        this.isLoading = false;
      });
    },
    // TODO
    linkTo(idContainer) {
      var currentUrl = window.location.pathname + window.location.search;
      currentUrl = Matomo.broadcast.updateParamValue('idContainer=' + idContainer, currentUrl);
      var action = Matomo.broadcast.getValueFromUrl('idContainer');
    
      if (!action || action === 'manageContainers') {
        if (this.hasWriteAccess) {
          currentUrl = Matomo.broadcast.updateParamValue('action=dashboard', currentUrl);
        } else {
          currentUrl = Matomo.broadcast.updateParamValue('action=manageTags', currentUrl);
        }
      }
    
      return currentUrl;
    },
  },
});
</script>
