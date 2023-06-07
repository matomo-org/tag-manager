<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->
<template>
  <div class="tagManagerTrackingCode">
    <TrackingCodeCommon
      :show-container-row="showContainerRow"
      :showBottom="false"
      :showDescription="false"
      :additionalStepContent="additionalStepContent"
      @fetchInstallInstructions="fetchInstallInstructions"
      ref="trackingCodeCommon"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import {
  AjaxHelper,
  SelectOnFocus,
} from 'CoreHome';
import TrackingCodeCommon from './TrackingCodeCommon.vue';
import {
  InstallInstructions,
} from '../types';

export default defineComponent({
  props: {
    showContainerRow: Boolean,
    additionalStepContent: String,
  },
  components: {
    TrackingCodeCommon,
  },
  directives: {
    SelectOnFocus,
  },
  methods: {
    fetchInstallInstructions() {
      // eslint-disable-next-line
      const refs = (this.$refs.trackingCodeCommon as any);
      refs.installInstructions = [];

      if (
        !refs?.idContainer
        || !refs?.environment
        || !refs?.site?.id
      ) {
        return;
      }

      refs.isLoading = true;
      AjaxHelper.fetch<InstallInstructions[]>({
        method: 'TagManager.getContainerInstallInstructions',
        filter_limit: '-1',
        idContainer: refs?.idContainer,
        environment: refs?.environment,
        idSite: refs?.site?.id,
        jsFramework: 'react',
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
