<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <component
    :is="currentAction === 'getTrackingMethodsForSite' ? 'div' : 'ContentBlock'"
    anchor="tagmanager"
    :content-title="translate('TagManager_MatomoTagManager')"
  >
    <p>
      {{ translate('TagManager_MtmTrackingCodeIntro') }}
    </p>
    <br>
    <p class="followStepsHeading">
      <strong>{{ translate('SitesManager_SiteWithoutDataCloudflareFollowStepsIntro') }}</strong>
    </p>
    <ol style="list-style: inside decimal">
      <TrackingCodeCommon
        :show-container-row="showContainerRow"
        :showBottom="true"
        :showDescription="false"
        :showPlainMtmSteps="true"
        :showAdvancedOptions="currentAction === 'trackingCodeGenerator'"
        :showTestSection="currentAction === 'getTrackingMethodsForSite'
                          && isJsTrackerInstallCheckAvailable"
        @fetchInstallInstructions="fetchInstallInstructions"
        ref="trackingCodeCommon"
      />
    </ol>
  </component>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import {
  ContentBlock,
  AjaxHelper,
} from 'CoreHome';
import TrackingCodeCommon from './TrackingCodeCommon.vue';
import { InstallInstructions } from '../types';

export default defineComponent({
  props: {
    currentAction: String,
    showContainerRow: Boolean,
    isJsTrackerInstallCheckAvailable: Boolean,
  },
  components: {
    ContentBlock,
    TrackingCodeCommon,
  },
  methods: {
    fetchInstallInstructions() {
      // eslint-disable-next-line
      const refs = (this.$refs.trackingCodeCommon as any);
      refs.installInstructions = [];

      if (!refs?.site?.id || !refs?.environment) {
        return;
      }

      refs.isLoading = true;
      AjaxHelper.fetch<InstallInstructions[]>({
        method: 'TagManager.getContainerInstallInstructions',
        filter_limit: '-1',
        idContainer: refs?.idContainer,
        environment: refs?.environment,
        idSite: refs?.site?.id,
      }).then((instructions) => {
        refs.installInstructions = instructions;
        nextTick(() => {
          const codeblocks = Array.isArray(this.$refs.codeblock)
            ? this.$refs.codeblock
            : [this.$refs.codeblock];
          (codeblocks as HTMLElement[]).forEach((n) => {
            $(n).effect('highlight', {}, 1500);
          });
        });
      }).finally(() => {
        refs.isLoading = false;
      });
    },
  },
});
</script>
