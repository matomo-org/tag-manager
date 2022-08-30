<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <ContentBlock
    class="manageInstallTagCode"
    feature="Tag Manager"
    content-title="Install Code"
  >
    <div style="margin-left: -0.75rem;">
      <Field
        uicontrol="select"
        name="environment"
        :model-value="environment"
        @update:model-value="environment = $event; fetchInstallInstructions(environment)"
        :options="environments"
        :title="translate('TagManager_Environment')"
      >
      </Field>
    </div>
    <ActivityIndicator :loading="isLoading" />
    <div
      v-for="(installInstruction, index) in installInstructions"
      :key="index"
    >
      <p>{{ installInstruction.description }}
        <br />
        <a
          target="_blank"
          v-if="installInstruction.helpUrl"
          :href="installInstruction.helpUrl"
        >{{ translate('TagManager_LearnMore') }}</a>
      </p>
      <pre
        class="codeblock"
        v-if="installInstruction.embedCode"
        v-text="installInstruction.embedCode"
        v-select-on-focus="{}"
        ref="codeblock"
      />
    </div>
    <p>{{ translate('TagManager_InstallCodePublishEnvironmentNote', 'preview') }}
      {{ translate('TagManager_ConfigureEnvironmentsSuperUser') }}</p>
    <p style="margin-top: 1rem;">
      <span v-html="$sanitize(translate(
        'TagManager_InstallCodeDataLayerNote',
        '&lt;strong&gt;',
        '&lt;/strong&gt;'
      ))" />
      <br />
      <a
        target="_blank"
        href="https://matomo.org/faq/tag-manager/data-layer-in-matomo-tag-manager/"
      >{{ translate('TagManager_LearnMore') }}</a>
    </p>
    <h2>{{ translate('TagManager_ReleasesOverview') }}</h2>
    <table v-content-table>
      <thead>
        <tr>
          <th class="environment">{{ translate('TagManager_Environment') }}</th>
          <th class="name">{{ translate('TagManager_VersionName') }}</th>
          <th class="name">{{ translate('TagManager_VersionRevision') }}</th>
          <th class="released_by">{{ translate('TagManager_ReleasedBy') }}</th>
          <th class="released_on">{{ translate('TagManager_ReleasedOn') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="isLoading">
          <td colspan="7">
            <span class="loadingPiwik"><img src="plugins/Morpheus/images/loading-blue.gif" />
              {{ translate('General_LoadingData') }}</span>
          </td>
        </tr>
        <tr v-if="!isLoading && container?.releases?.length === 0">
          <td colspan="7">
            {{ translate('TagManager_NoReleasesFound') }}
          </td>
        </tr>
        <tr
          v-for="release in sortedReleases"
          :key="release.idcontainerrelease"
        >
          <td class="environment">{{ ucfirst(release.environment) }}</td>
          <td class="name">{{ releaseVersions[release.idcontainerrelease]?.name }}</td>
          <td class="revision">{{ releaseVersions[release.idcontainerrelease]?.revision }}</td>
          <td class="released_by">{{ release.release_login }}</td>
          <td class="released_on"><span class="date">{{ release.release_date_pretty }}</span></td>
        </tr>
      </tbody>
    </table>
  </ContentBlock>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import {
  AjaxHelper,
  ContentBlock,
  ActivityIndicator,
  SelectOnFocus,
  ContentTable,
} from 'CoreHome';
import { Field } from 'CorePluginsAdmin';
import { Container, Version, InstallInstructions } from '../types';

interface Environment {
  id: string;
  name: string;
}

interface Option {
  key: string;
  value: string;
}

interface ManageInstallTagCodeState {
  container: Container|null;
  environments: Option[];
  environment: string;
  installInstructions: InstallInstructions[];
  isLoading: boolean;
  isLoadingInstructions: boolean;
}

const { $ } = window;

export default defineComponent({
  props: {
    idContainer: {
      type: String,
      required: true,
    },
  },
  components: {
    ContentBlock,
    Field,
    ActivityIndicator,
  },
  directives: {
    SelectOnFocus,
    ContentTable,
  },
  data(): ManageInstallTagCodeState {
    return {
      container: null,
      environments: [],
      environment: 'live',
      installInstructions: [],
      isLoading: false,
      isLoadingInstructions: false,
    };
  },
  created() {
    this.isLoading = true;
    this.fetchReleases().finally(() => {
      this.isLoading = false;
    });
  },
  methods: {
    fetchInstallInstructions(environment: string) {
      this.installInstructions = [];
      this.isLoadingInstructions = true;
      return AjaxHelper.fetch<InstallInstructions[]>({
        method: 'TagManager.getContainerInstallInstructions',
        filter_limit: '-1',
        idContainer: this.idContainer,
        environment,
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
        this.isLoadingInstructions = false;
      });
    },
    fetchReleases() {
      return AjaxHelper.fetch<[Environment[], Container]>([
        {
          method: 'TagManager.getAvailableEnvironments',
          filter_limit: '-1',
        },
        {
          method: 'TagManager.getContainer',
          idContainer: this.idContainer,
          filter_limit: '-1',
        },
      ]).then(([environments, container]) => {
        this.environments = environments.map((e) => ({ key: e.id, value: e.name }));

        this.container = container;

        const hasLive = container.releases.some((r) => r.environment === 'live');

        if (!hasLive && this.environments?.[0]?.key) {
          this.environment = this.environments[0].key;
        } else if (!hasLive) {
          // no release available yet
          this.environment = '';
        }

        if (this.environment) {
          return this.fetchInstallInstructions(this.environment);
        }

        return undefined;
      });
    },
    ucfirst(s: string) {
      return `${s.substr(0, 1).toUpperCase()}${s.substr(1)}`;
    },
  },
  computed: {
    releaseVersions() {
      const result: Record<string, Version|undefined> = {};
      (this.container?.releases || []).forEach((r) => {
        result[r.idcontainerrelease] = this.container!.versions.find(
          (v) => v.idcontainerversion === r.idcontainerversion,
        );
      });
      return result;
    },
    sortedReleases() {
      const sorted = [...(this.container?.releases || []).map((r, i) => ({ ...r, index: i }))];
      sorted.sort((lhs, rhs) => {
        if (lhs.release_date < rhs.release_date) {
          return 1;
        }

        if (lhs.release_date > rhs.release_date) {
          return -1;
        }

        return rhs.index - lhs.index; // angularjs sort defaults to using index when key is same
      });
      return sorted;
    },
  },
});
</script>
