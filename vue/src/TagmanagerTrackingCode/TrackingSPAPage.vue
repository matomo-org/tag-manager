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
      :current-action="currentAction"
      :showBottom="false"
      :showDescription="false"
      @fetchInstallInstructions="fetchInstallInstructionsSPA"
      ref="trackingCodeCommon"
    />
    <li v-html="$sanitize(setupStep2)"></li>
    <li v-html="$sanitize(fetchFollowStep3)"></li>
    <li v-text="fetchClickX('TagManager_CreateNewTrigger')"></li>
    <li v-html="$sanitize(fetchFollowStep5)"></li>
    <!-- Since both the buttons has same text we are using the step4's text here   -->
    <li v-text="fetchClickX('TagManager_CreateNewTrigger')"></li>
    <li v-html="$sanitize(setupStep7)"></li>
    <li v-html="$sanitize(fetchFollowStep8)"></li>
    <li v-html="$sanitize(fetchFollowStep9)"></li>
    <li>
      <span v-text="fetchFollowStep10"></span>
      <ol style="list-style: lower-alpha; list-style-position: inside; text-indent: 1.2rem;">
        <li v-html="$sanitize(fetchFollowStep10a)"></li>
        <li v-html="$sanitize(fetchFollowStep10b)"></li>
      </ol>
    </li>
    <li v-html="$sanitize(fetchFollowStep11)"></li>
    <li v-text="fetchClickX('General_Update')"></li>
    <li v-text="fetchFollowStep13"></li>
    <li v-html="$sanitize(fetchFollowStep14)"></li>
    <li v-text="fetchFollowStep15"></li>
    <li v-if="jsFramework === 'react'" v-html="$sanitize(fetchFollowStep16React)"></li>
    <li v-else v-html="$sanitize(fetchFollowStep16SPA)"></li>
    <div
      v-for="(installInstruction, index) in installInstructions"
      :key="index"
    >
      <pre
        class="codeblock"
        v-text="installInstruction.embedCode"
        v-select-on-focus="{}"
        ref="codeblock"
      />
    </div>
  </ol>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import {
  AjaxHelper, MatomoUrl,
  SelectOnFocus, translate,
} from 'CoreHome';
import TrackingCodeCommon from './TrackingCodeCommon.vue';
import {
  InstallInstructions,
} from '../types';

interface TagmanagerTrackingSPAPageState {
  setupStep1: string,
  setupStep2: string,
  setupStep7: string,
  installInstructions: InstallInstructions[];
}
export default defineComponent({
  props: {
    showContainerRow: Boolean,
    currentAction: String,
    jsFramework: String,
  },
  components: {
    TrackingCodeCommon,
  },
  directives: {
    SelectOnFocus,
  },
  data(): TagmanagerTrackingSPAPageState {
    return {
      setupStep1: '',
      setupStep2: '',
      setupStep7: '',
      installInstructions: [],
    };
  },
  methods: {
    fetchInstallInstructionsSPA() {
      // eslint-disable-next-line
      const refs = (this.$refs.trackingCodeCommon as any);
      this.installInstructions = [];
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
      const triggersUrl = this.linkTo('manageTriggers', refs.site.id, refs.idContainer);
      this.setupStep2 = translate(
        'TagManager_SPAFollowStep2',
        `<a href="${triggersUrl}" target="_blank" rel="noreferrer noopener">`,
        '</a>',
      );
      const tagsURL = this.linkTo('manageTags', refs.site.id, refs.idContainer);
      this.setupStep7 = translate(
        'TagManager_SPAFollowStep7',
        `<a href="${tagsURL}" target="_blank" rel="noreferrer noopener">`,
        '</a>',
      );
      refs.isLoading = true;
      AjaxHelper.fetch<InstallInstructions[]>({
        method: 'TagManager.getContainerInstallInstructions',
        filter_limit: '-1',
        idContainer: refs?.idContainer,
        environment: refs?.environment,
        idSite: refs?.site?.id,
        jsFramework: this.jsFramework,
      }).then((instructions) => {
        this.installInstructions = instructions;
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
    fetchClickX(clickTarget: string) {
      return translate(
        'General_ClickX',
        translate(clickTarget),
      );
    },
  },
  computed: {
    fetchFollowStep3() {
      return translate(
        'TagManager_SPAFollowStep3',
        `<strong>${translate('TagManager_PageViewTriggerName')}</strong>`,
        translate('TagManager_PageViewTriggerName'),
        '<a href="https://matomo.org/faq/tag-manager/how-do-i-track-pageviews-of-my-website-using-matomo-tag-manager/#create-pageview-trigger" target="_blank" rel="noreferrer noopener">',
        '</a>',
      );
    },
    fetchFollowStep5() {
      return translate(
        'TagManager_SPAFollowStep5',
        `<strong>${translate('TagManager_HistoryChangeTriggerName')}</strong>`,
        translate('TagManager_CategoryUserEngagement'),
      );
    },
    fetchFollowStep8() {
      return translate(
        'TagManager_SPAFollowStep8',
        `<strong>${translate('TagManager_PageViewTriggerName')}</strong>`,
        `<strong>${translate('TagManager_MatomoTagName')}</strong>`,
        translate('TagManager_PageViewTriggerName'),
        '<a href="https://matomo.org/faq/tag-manager/how-do-i-track-pageviews-of-my-website-using-matomo-tag-manager/#create-pageview-tag" target="_blank" rel="noreferrer noopener">',
        '</a>',
      );
    },
    fetchFollowStep9() {
      return translate(
        'TagManager_SPAFollowStep9',
        translate('TagManager_ConfigureWhatTagDoes'),
        translate('TagManager_CustomTitle'),
        '<strong>',
        '</strong>',
      );
    },
    fetchFollowStep10() {
      return translate(
        'TagManager_SPAFollowStep10',
        translate('TagManager_CustomUrl'),
      );
    },
    fetchFollowStep10a() {
      return translate(
        'TagManager_SPAFollowStep10a',
        '<strong>',
        '</strong>',
        translate('TagManager_CustomUrl'),
      );
    },
    fetchFollowStep10b() {
      return translate(
        'TagManager_SPAFollowStep10b',
        translate('TagManager_CustomUrl'),
        '<strong>',
        '</strong>',
      );
    },
    fetchFollowStep11() {
      return translate(
        'TagManager_SPAFollowStep11',
        translate('TagManager_ConfigureWhenTagDoes'),
        translate('TagManager_FireTriggerTitle'),
        `<strong>${translate('TagManager_HistoryChangeTriggerName')}</strong>`,
        `<strong>${translate('TagManager_PageViewTriggerName')}</strong>`,
      );
    },
    fetchFollowStep13() {
      return translate(
        'TagManager_SPAFollowStep13',
        translate('TagManager_Publish'),
      );
    },
    fetchFollowStep14() {
      return translate(
        'TagManager_SPAFollowStep14',
        translate('TagManager_VersionName'),
        '<strong>',
        '</strong>',
      );
    },
    fetchFollowStep15() {
      return translate(
        'TagManager_SPAFollowStep15',
        translate('TagManager_CreateVersionAndPublishRelease'),
      );
    },
    fetchFollowStep16SPA() {
      return translate(
        'TagManager_SPAFollowStep16',
        '&lt;/head&gt;',
        '<a href="https://developer.matomo.org/guides/tagmanager/embedding" target="_blank" rel="noreferrer noopener">',
        '</a>',
      );
    },
    fetchFollowStep16React() {
      return translate(
        'TagManager_ReactFollowStep16',
        '<strong>',
        '</strong>',
        '<strong>App.js</strong>',
        '<strong>React.useEffect</strong>',
        '<strong>Hello World</strong>',
        '<strong>React.js</strong>',
      );
    },
  },
});
</script>
