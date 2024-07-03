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
    <p>
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
  translate,
  MatomoUrl,
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

      this.updateStep1Text();

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
    updateStep1Text() {
      // eslint-disable-next-line
      const refs = (this.$refs.trackingCodeCommon as any);

      if (!refs?.site?.id) {
        return;
      }

      // Allow an empty container ID, since we only need the site ID for the URL
      const idContainer = !refs?.idContainer ? '' : refs.idContainer;
      const manageContainerURL = this.linkTo('manageContainers', refs.site.id, idContainer);
      this.setupStep1 = translate(
        'TagManager_SPAFollowStep1',
        '<br><strong>',
        '</strong>',
        `<a href="${manageContainerURL}" target="_blank" rel="noreferrer noopener">`,
        '</a>',
      );
    },
  },
  mounted() {
    this.updateStep1Text();
  },
});
</script>
