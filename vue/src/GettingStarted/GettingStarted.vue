<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="tagManagerGettingStarted">
    <h2>{{ translate('TagManager_GettingStarted') }}</h2>
    <ContentBlock :content-title="translate('CorePluginsAdmin_WhatIsTagManager')">
      <p>{{ translate('TagManager_GettingStartedWhatIsIntro') }}</p>

      <ul>
        <li>{{ translate('TagManager_GettingStartedAnalyticsTracking') }}</li>
        <li>{{ translate('TagManager_GettingStartedConversionTracking') }}</li>
        <li>{{ translate('TagManager_GettingStartedNewsletterSignups') }}</li>
        <li>{{ translate('TagManager_GettingStartedExitActions') }}</li>
        <li>{{ translate('TagManager_GettingStartedRemarketing') }}</li>
        <li>{{ translate('TagManager_GettingStartedSocialWidgets') }}</li>
        <li>{{ translate('TagManager_GettingStartedAffiliates') }}</li>
        <li>{{ translate('TagManager_GettingStartedAds') }}</li>
        <li>{{ translate('TagManager_GettingStartedAndMore') }}</li>
      </ul>

      <p>
        <br />
        {{ translate('TagManager_GettingStartedMainComponents') }}
      </p>
      <ul>
        <li>{{ translate('TagManager_GettingStartedTagComponent') }}</li>
        <li>{{ translate('TagManager_GettingStartedTriggerComponent') }}</li>
        <li>{{ translate('TagManager_GettingStartedVariableComponent') }}</li>
      </ul>
    </ContentBlock>
    <ContentBlock :content-title="translate('TagManager_GettingStartedWhyDoINeed')">
      <p>
        {{ translate('TagManager_GettingStartedWhyMakesLifeEasier') }}
        <br /><br />
        {{ translate('TagManager_GettingStartedWhyThirdPartySnippets') }}
        <br /><br />
        {{ translate('TagManager_GettingStartedWhyAccuracyPerformance') }}
      </p>
    </ContentBlock>

    <ContentBlock
      v-if="canEdit"
      :content-title="translate('TagManager_GettingStartedHowDoI')"
    >
      <p>
        <span v-html="$sanitize(gettingStartedHowCreateContainerText)"></span>
        {{ translate('TagManager_GettingStartedHowCopyCode') }}
        <br /><br />
        {{ translate('TagManager_GettingStartedHowAddTagsToContainer') }}
      </p>
    </ContentBlock>

    <ContentBlock :content-title="translate('TagManager_GettingStartedWhatIfUnsupported')">
      <p>
        {{ translate('TagManager_GettingStartedCustomTags') }}
        <br /><br />
        <span v-html="$sanitize(gettingStartedContributeTagsText)"></span>
      </p>
    </ContentBlock>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  ContentBlock,
  translate,
  MatomoUrl,
  externalLink,
} from 'CoreHome';

export default defineComponent({
  props: {
    canEdit: Boolean,
  },
  components: {
    ContentBlock,
  },
  computed: {
    gettingStartedHowCreateContainerText() {
      const link = `?${MatomoUrl.stringify({
        module: 'TagManager',
        action: 'manageContainers',
      })}}`;

      return translate(
        'TagManager_GettingStartedHowCreateContainer',
        `<a href="${link}">`,
        '</a>',
      );
    },
    gettingStartedContributeTagsText() {
      return translate(
        'TagManager_GettingStartedContributeTags',
        externalLink('https://developer.matomo.org/guides/tagmanager/settingup'),
        '</a>',
      );
    },
  },
});
</script>
