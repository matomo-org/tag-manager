<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div
    id="selectTagManagerEnvironmentHelp"
    class="inline-help-node"
  >
    <div>{{ translate('TagManager_VersionEnvironmentHelp') }}</div>
    <div
      class="alert alert-info"
      style="margin-bottom: 0;padding-bottom: 0;"
      v-show="!canPublishToLive"
    >
      {{ translate(
          'TagManager_PublishLiveEnvironmentCapabilityRequired',
          translate('TagManager_CapabilityPublishLiveContainer'),
        ) }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    canPublishToLive: Boolean,
  },
});
</script>
