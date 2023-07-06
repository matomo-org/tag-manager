<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->
<template>
  <ol class="list-style-decimal">
    <li v-html="$sanitize(setupStep1)" v-if="showContainerRow"></li>
    <TrackingCodeCommon
      :show-container-row="showContainerRow"
      :showBottom="true"
      :showDescription="false"
      :showPlainMtmSteps="true"
      @fetchInstallInstructions="fetchInstallInstructions"
      ref="trackingCodeCommon"
    />
  </ol>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import {
  AjaxHelper,
  MatomoUrl,
  translate,
} from 'CoreHome';
import TrackingCodeCommon from './TrackingCodeCommon.vue';
import {
  InstallInstructions,
} from '../types';

export default defineComponent({
  props: {
    showContainerRow: Boolean,
  },
  components: {
    TrackingCodeCommon,
  },
  data() {
    return {
      setupStep1: '',
    };
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

      const manageContainerURL = this.linkTo('manageContainers', refs.site.id, refs.idContainer);
      this.setupStep1 = translate(
        'TagManager_SPAFollowStep1',
        '<br><strong>',
        '</strong>',
        `<a href="${manageContainerURL}" target="_blank" rel="noreferrer noopener">`,
        '</a>',
      );

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
    linkTo(action: string, idSite: string, idContainer: string, hash?: QueryParameters) {
      let url = MatomoUrl.stringify({
        ...MatomoUrl.urlParsed.value,
        module: 'TagManager',
        action,
        idSite,
        idContainer,
      });
      if (hash) {
        url += `#?${MatomoUrl.stringify(hash)}`;
      }
      return `?${url}`;
    },
  },
});
</script>
