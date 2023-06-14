<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->
<template>
  <p>{{translate('TagManager_SiteWithoutDataReactIntro')}}</p>
  <br>
  <p>{{translate('SitesManager_SiteWithoutDataCloudflareFollowStepsIntro')}}</p>
  <ol class="list-style-decimal">
    <li v-html="$sanitize(fetchSetupStep1)"></li>
      <ol class="list-style-disc" style="margin-left: 1rem;">
        <li v-if="this.setupStep1_1" v-html="$sanitize(setupStep1_1)"></li>
        <li v-html="$sanitize(fetchSetupStep1_2)"></li>
        <li v-html="$sanitize(fetchSetupStep1_3)"></li>
        <li v-html="$sanitize(fetchSetupStep1_4)"></li>
      </ol>
    <div class="tagManagerTrackingCode">
      <TrackingCodeCommon
        :show-container-row="showContainerRow"
        :showBottom="false"
        :showDescription="false"
        :showStep2="true"
        :showStep3="true"
        @fetchInstallInstructions="fetchInstallInstructions"
        ref="trackingCodeCommon"
      />
    </div>
  </ol>
  <br>
  <p v-html="$sanitize(fetchFollowStepCompleted)"></p>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import {
  AjaxHelper,
  SelectOnFocus, translate,
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
  directives: {
    SelectOnFocus,
  },
  data() {
    return {
      setupStep1_1: '',
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
        let param1 = '<strong>';
        let param2 = '</strong>';
        if (instructions.length && typeof instructions[0].pageViewTriggerEditUrl !== 'undefined' && instructions[0].pageViewTriggerEditUrl) {
          const { pageViewTriggerEditUrl } = instructions[0];
          param1 = `<a href="${pageViewTriggerEditUrl}" target="_blank" rel="noreferrer noopener">`;
          param2 = '</a>';
        }
        this.setupStep1_1 = translate(
          'TagManager_SiteWithoutDataReactFollowStep1_1',
          param1,
          param2,
        );
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
  computed: {
    fetchSetupStep1() {
      return translate(
        'TagManager_SiteWithoutDataReactFollowStep1',
        '<strong>',
        '</strong>',
      );
    },
    fetchSetupStep1_2() {
      return translate(
        'TagManager_SiteWithoutDataReactFollowStep1_2',
        '<strong>',
        '</strong>',
      );
    },
    fetchSetupStep1_3() {
      const historyPageFAQLink = 'https://matomo.org/faq/tag-manager/how-do-i-use-the-history-change-trigger-if-my-website-has-multiple-history-change-types/#which-history-source-should-i-use-for-my-single-page-application';
      return translate(
        'TagManager_SiteWithoutDataReactFollowStep1_3',
        '<strong>',
        '</strong>',
        `<a href="${historyPageFAQLink}" target="_blank" rel="noreferrer noopener">`,
        '</a>',
      );
    },
    fetchSetupStep1_4() {
      return translate(
        'TagManager_SiteWithoutDataReactFollowStep1_4',
        '<strong>',
        '</strong>',
      );
    },
    fetchFollowStepCompleted() {
      return translate(
        'TagManager_SiteWithoutDataReactFollowStepCompleted',
        '<strong>',
        '</strong>',
      );
    },
  },
});
</script>
