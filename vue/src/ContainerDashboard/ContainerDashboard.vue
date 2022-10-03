<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="containerDashboard">
    <ActivityIndicator :loading="isLoading" />
    <div v-if="!isLoading">
      <div v-content-intro>
        <h2>
          <EnrichedHeadline
            feature-name="Tag Manager"
            :inline-help="dashboardHelpText"
          >
            {{ translate('TagManager_ContainerX', container?.name) }}
          </EnrichedHeadline>
        </h2>
        <p class="dashboardCreationDate">
          {{ containerMetaInformation }}
          <span v-if="containerVersion?.description">
            <br />
            {{ translate('General_Description') }}: {{ containerVersion?.description }}
          </span>
        </p>
      </div>
      <div
        class="row"
        style="margin-left: -0.75rem;"
      >
        <div class="col m6 s12">
          <ContentBlock
            feature="Tag Manager"
            :content-title="`${tagCount} ${translate('TagManager_Tags')}`"
            :help-text="tagsHelpText"
          >
            <p>
              <span v-if="tagCount">
                {{ translate('TagManager_Names') }}:
                <span
                  v-for="(tag, index) in sortedContainerVersionTags"
                  :key="index"
                >
                  <a
                    :href="linkTo('manageTags', { idTag: tag.idtag })"
                    :title="translate(
                      'TagManager_EntityDateTypeMetaInformation',
                      tag.created_date_pretty,
                      tag.updated_date_pretty,
                      tag.type,
                    )"
                  >{{ tag.name }}</a><span
                    v-if="index !== sortedContainerVersionTags.length - 1"
                  >, </span>
                </span>
              </span>
            </p>
            <hr />
            <a
              class="btn-flat"
              :href="linkTo('manageTags')"
            >
              <span class="icon-edit" /> {{ translate('TagManager_EditTags') }}
            </a>
            <a
              class="btn-flat"
              :href="linkTo('manageTags', { idTag: 0 })"
            >
              <span class="icon-add" /> {{ translate('TagManager_CreateNewTag') }}
            </a>
          </ContentBlock>
        </div>
        <div class="col m6 s12">
          <ContentBlock
            feature="Tag Manager"
            :content-title="`${triggerCount} ${translate('TagManager_Triggers')}`"
            :help-text="triggersHelpText"
          >
            <p> <span v-if="triggerCount">
                {{ translate('TagManager_Names') }}:
                <span v-for="(trigger, index) in sortedTriggers" :key="index">
                  <a
                    :href="linkTo('manageTriggers', { idTrigger: trigger.idtrigger })"
                    :title="translate(
                      'TagManager_EntityDateTypeMetaInformation',
                      trigger.created_date_pretty,
                      trigger.updated_date_pretty,
                      trigger.type,
                    )"
                  >{{ trigger.name }}</a><span v-show="
                    index !== sortedTriggers.length - 1"
                  >, </span>
                </span>
              </span>
            </p>
            <hr />
            <a
              class="btn-flat"
              :href="linkTo('manageTriggers')"
            >
              <span class="icon-edit" /> {{ translate('TagManager_EditTriggers') }}
            </a>
            <a
              class="btn-flat"
              :href="linkTo('manageTriggers', { idTrigger: 0 })"
            >
              <span class="icon-add" /> {{ translate('TagManager_CreateNewTrigger') }}
            </a>
          </ContentBlock>
        </div>
      </div>
      <div
        class="row"
        style="margin-left: -0.75rem;"
      >
        <div class="col m6 s12">
          <ContentBlock
            feature="Tag Manager"
            :content-title="`${variableCount} ${translate('TagManager_Variables')}`"
            :help-text="variablesHelpText"
          >
            <p> <span v-show="variableCount">
                {{ translate('TagManager_Names') }}:
                <span v-for="(variable, index) in sortedVariables" :key="index">
                  <a
                    :href="linkTo('manageVariables', { idVariable: variable.idvariable })"
                    :title="translate(
                      'TagManager_EntityDateTypeMetaInformation',
                      variable.created_date_pretty,
                      variable.updated_date_pretty,
                      variable.type,
                    )"
                  >{{ variable.name }}</a><span
                    v-if="index !== sortedVariables.length - 1"
                  >, </span>
                </span>
              </span>
            </p>
            <hr />
            <a
              class="btn-flat"
              :href="linkTo('manageVariables')"
            >
              <span class="icon-edit" /> {{ translate('TagManager_EditVariables') }}
            </a>
            <a
              class="btn-flat"
              :href="linkTo('manageVariables', { idVariable: 0 })"
            >
              <span class="icon-add" /> {{ translate('TagManager_CreateNewVariable') }}
            </a>
          </ContentBlock>
        </div>
        <div class="col m6 s12">
          <ContentBlock
            feature="Tag Manager"
            :content-title="`${versionCount} ${translate('TagManager_Versions')}`"
            :help-text="versionsHelpText"
          >
            <p> <span v-show="lastVersions.length">
                {{ translate('TagManager_LastVersions') }}:
                <span v-for="(lastVersion, index) in lastVersions" :key="index">
                  <a
                    :title="lastVersionLinkTitle(lastVersion)"
                    :href="linkTo(
                      'manageVersions',
                      { idContainerVersion: lastVersion.idcontainerversion },
                    )"
                  >
                    {{ lastVersion.name }}
                  </a><span v-if="index !== lastVersions.length - 1">, </span>
                </span>
              </span>
              <span v-show="container.releases.length">
                <br />
                {{ translate('TagManager_Environments') }}:
                <span v-for="(release, index) in container.releases" :key="index">
                  <span
                    :title="releaseTooltip(release)"
                  >{{ ucfirst(release.environment) }}</span><span
                    v-if="index !== container.releases.length - 1"
                  >, </span>
                </span>
              </span>
            </p>
            <hr />
            <a
              class="btn-flat"
              :href="linkTo('manageVersions')"
            >
              <span class="icon-edit" /> {{ translate('TagManager_EditVersions') }}
            </a>
            <a
              class="btn-flat"
              :href="linkTo('manageVersions', { idContainerVersion: 0 })"
            >
              <span class="icon-add" /> {{ translate('TagManager_CreateNewVersion') }}
            </a>
          </ContentBlock>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  translate,
  AjaxHelper,
  ActivityIndicator,
  ContentIntro,
  EnrichedHeadline,
  ContentBlock,
  MatomoUrl,
} from 'CoreHome';
import AvailableContextsStore from '../AvailableContexts.store';
import {
  Container,
  ExportedVersion,
  Release,
  Version,
} from '../types';

interface ContainerDashboardState {
  container: Container|null;
  containerVersion: ExportedVersion|null;
  isLoading: boolean;
}

function sortByName<T extends { name: string }>(items: T[]) {
  items.sort((lhs, rhs) => {
    if (lhs.name < rhs.name) {
      return -1;
    }
    return lhs.name > rhs.name ? 1 : 0;
  });
}

export default defineComponent({
  props: {
    idContainer: String,
    dashboardHelpText: String,
    tagsHelpText: String,
    triggersHelpText: String,
    variablesHelpText: String,
    versionsHelpText: String,
  },
  components: {
    ActivityIndicator,
    EnrichedHeadline,
    ContentBlock,
  },
  directives: {
    ContentIntro,
  },
  data(): ContainerDashboardState {
    return {
      container: null,
      containerVersion: null,
      isLoading: false,
    };
  },
  created() {
    AvailableContextsStore.init();

    this.isLoading = true;

    const containerPromise = AjaxHelper.fetch<Container>({
      method: 'TagManager.getContainer',
      idContainer: this.idContainer,
    }).then((container) => {
      this.container = container;
    });

    const versionPromise = AjaxHelper.fetch<ExportedVersion>({
      method: 'TagManager.exportContainerVersion',
      idContainer: this.idContainer,
    }).then((containerVersion) => {
      this.containerVersion = containerVersion;
    });

    Promise.all([containerPromise, versionPromise]).finally(() => {
      this.isLoading = false;
    });
  },
  methods: {
    linkTo(action: string, hash?: QueryParameters) {
      let url = MatomoUrl.stringify({
        ...MatomoUrl.urlParsed.value,
        module: 'TagManager',
        action,
      });

      if (hash) {
        url += `#?${MatomoUrl.stringify(hash)}`;
      }

      return `?${url}`;
    },
    lastVersionLinkTitle(lastVersion: Version): string {
      return `Created on ${lastVersion.created_date_pretty}`
        + `, description: '${lastVersion.description}'`;
    },
    releaseTooltip(release: Release) {
      const firstPart = translate(
        'TagManager_ReleaseInfo',
        release.release_login,
        release.release_date_pretty,
      );
      const secondPart = translate('TagManager_ReleaseVersionInfo', release.version_name);
      return `${firstPart} ${secondPart}`;
    },
    ucfirst(s: string) {
      return `${s.substr(0, 1).toUpperCase()}${s.substr(1)}`;
    },
  },
  computed: {
    lastVersions(): Version[] {
      if (this.container?.versions?.length) {
        return this.container.versions.slice(-5);
      }
      return [];
    },
    contexts(): Record<string, string> {
      const result: Record<string, string> = {};
      AvailableContextsStore.contexts.value.forEach(({ id, name }) => {
        result[id] = name;
      });
      return result;
    },
    containerMetaInformation() {
      return translate(
        'TagManager_ContainerMetaInformation',
        this.containerVersion?.idcontainer || '',
        this.contexts[this.container?.context || ''] || '',
        this.containerVersion?.created_date_pretty || '',
      );
    },
    sortedContainerVersionTags() {
      const tags = (this.containerVersion?.tags || []);
      sortByName(tags);
      return tags;
    },
    sortedTriggers() {
      const triggers = (this.containerVersion?.triggers || []);
      sortByName(triggers);
      return triggers;
    },
    sortedVariables() {
      const variables = (this.containerVersion?.variables || []);
      sortByName(variables);
      return variables;
    },
    tagCount() {
      return this.containerVersion?.tags.length;
    },
    triggerCount() {
      return this.containerVersion?.triggers.length;
    },
    versionCount() {
      return this.container?.versions.length;
    },
    variableCount() {
      return this.containerVersion?.variables.length;
    },
  },
});
</script>
