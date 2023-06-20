<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->
<template>
  <ol class="list-style-decimal">
    <li v-html="$sanitize(setupStep1)"></li>
    <TrackingCodeCommon
      :show-container-row="showContainerRow"
      :current-action="currentAction"
      :showBottom="false"
      :showDescription="false"
      :showStep2="false"
      :showStep3="false"
      @fetchInstallInstructions="fetchInstallInstructionsSPA"
      ref="trackingCodeCommon"
    />
    <li v-html="$sanitize(setupStep2)"></li>
    <li v-html="$sanitize(fetchFollowStep3)"></li>
    <li v-text="translate('TagManager_SPAFollowStep4')"></li>
    <li v-html="$sanitize(fetchFollowStepCommon(5))"></li>
    <!-- Since both the buttons has same text we are using the step4's text here   -->
    <li v-text="translate('TagManager_SPAFollowStep4')"></li>
    <li v-html="$sanitize(setupStep7)"></li>
    <li v-html="$sanitize(fetchFollowStep8)"></li>
    <li v-html="$sanitize(fetchFollowStepCommon(9))"></li>
    <li v-html="$sanitize(fetchFollowStepCommon(10))"></li>
    <li v-html="$sanitize(fetchFollowStepCommon(11))"></li>
    <li v-text="translate('TagManager_SPAFollowStep12')"></li>
    <li v-text="translate('TagManager_SPAFollowStep13')"></li>
    <li v-html="$sanitize(fetchFollowStepCommon(14))"></li>
    <li v-text="translate('TagManager_SPAFollowStep15')"></li>
    <li v-html="$sanitize(fetchFollowStep16)"></li>
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
    fetchFollowStepCommon(stepNo :number) {
      return translate(
        `TagManager_SPAFollowStep${stepNo}`,
        '<strong>',
        '</strong>',
      );
    },
  },
  computed: {
    fetchFollowStep3() {
      return translate(
        'TagManager_SPAFollowStep3',
        '<strong>',
        '</strong>',
        '<a href="https://matomo.org/faq/tag-manager/manage-triggers-in-matomo-tag-manager/" target="_blank" rel="noreferrer noopener">',
        '</a>',
      );
    },
    fetchFollowStep8() {
      return translate(
        'TagManager_SPAFollowStep8',
        '<strong>',
        '</strong>',
        '<a href="https://matomo.org/faq/tag-manager/manage-tags-in-matomo-tag-manager/" target="_blank" rel="noreferrer noopener">',
        '</a>',
      );
    },
    fetchFollowStep16() {
      return translate(
        'TagManager_SPAFollowStep16',
        '&lt;/head&gt;',
        '<a href="https://developer.matomo.org/guides/tagmanager/embedding" target="_blank" rel="noreferrer noopener">',
        '</a>',
      );
    },
  },
});
</script>
