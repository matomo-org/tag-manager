<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<todo>
- test in UI
- check uses:
  ./plugins/TagManager/templates/trackingCode.twig
  ./plugins/TagManager/angularjs/tagmanagerTrackingCode/tagmanager.directive.js
- create PR
</todo>

<template>
  <div class="tagManagerTrackingCode">
    <ActivityIndicator
      :style="{opacity: isLoading ? 1 : 0}"
      :loading="true"
    />
    <div class="row">
      <div class="col s12 m4 ">
        <div class="form-group row">
          <div class="col s12 input-field">
            <label
              for="tagManagerTrackingCodeSite"
              class="siteSelectorLabel"
            >{{ translate('General_Website') }}</label>
            <div class="sites_autocomplete">
              <SiteSelector
                id="tagManagerTrackingCodeSite"
                v-model="site"
                :show-all-sites-item="false"
                :switch-site-on-select="false"
                :show-selected-site="true"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col s12 m4">
        <div>
          <Field
            uicontrol="select"
            name="containers"
            :model-value="idContainer"
            @update:model-value="idContainer = $event; onContainerChange()"
            :options="containerOptions"
            :disabled="containerOptions.length <= 1"
            :full-width="true"
            :title="translate('TagManager_Container')"
          >
          </Field>
        </div>
      </div>
      <div class="col s12 m4">
        <div>
          <Field
            uicontrol="select"
            name="environment"
            :model-value="environment"
            @update:model-value="environment = $event; fetchInstallInstructions()"
            :options="environments"
            :disabled="environments.length <= 1"
            :full-width="true"
            :title="translate('TagManager_Environment')"
          >
          </Field>
        </div>
      </div>
    </div>
    <div
      class="alert alert-info"
      v-if="idContainer && noReleaseFound"
    >
      {{ translate('TagManager_NoReleasesFoundForContainer') }}
      <a href>{{ translate('TagManager_PublishVersionToEnvironmentToViewEmbedCode') }} </a>
    </div>
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
        v-text="installInstruction.embedCode"
        v-select-on-focus="{}"
        ref="codeblock"
      />
    </div>
    <h3 v-if="idContainer">
      {{ translate('TagManager_CustomizeTracking') }}
    </h3>
    <p v-if="idContainer">{{ translate('TagManager_CustomizeTrackingTeaser') }}</p>
    <ul v-if="idContainer">
      <li v-if="!matomoConfigs.length">
        {{ translate('TagManager_NoMatomoConfigFoundForContainer') }}
      </li>
      <li
        v-for="matomoConfig in matomoConfigs"
        :key="matomoConfig.idvariable"
      >
        <a :href="linkTo('manageVariables', idContainer,
        {idVariable: matomoConfig.idvariable})"
        >
          <span class="icon-edit"/> {{ matomoConfig.name }}
        </a>
      </li>
    </ul>
    <p v-if="idContainer">
      <br />
      <a :href="linkTo('dashboard', idContainer)">
        <span class="icon-show" /> {{ translate('TagManager_ViewContainerDashboard') }}
      </a>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import {
  AjaxHelper,
  ActivityIndicator,
  SiteSelector,
  SelectOnFocus,
  SiteRef,
  MatomoUrl,
  Matomo,
} from 'CoreHome';
import { Field } from 'CorePluginsAdmin';
import {
  Container,
  InstallInstructions,
  Release,
  Variable,
} from '../types';

interface Environment {
  id: string;
  name: string;
}

interface Option {
  key: string;
  value: string;
}

interface TagmanagerTrackingCodeState {
  containerVariables: Variable[];
  isLoading: boolean;
  idContainer: string;
  environment: string;
  environments: Option[];
  environmentNameMap: Record<string, string>;
  containerMap: Record<string, Container>;
  containerOptions: Option[];
  site: SiteRef|null;
  matomoConfigs: Variable[];
  releases: Release[];
  installInstructions: InstallInstructions[];
  noReleaseFound: boolean;
}

function ucfirst(s: string): string {
  return `${s.substr(0, 1).toUpperCase()}${s.substr(1)}`;
}

export default defineComponent({
  props: {},
  components: {
    ActivityIndicator,
    SiteSelector,
    Field,
  },
  directives: {
    SelectOnFocus,
  },
  data(): TagmanagerTrackingCodeState {
    return {
      containerVariables: [],
      isLoading: false,
      idContainer: '',
      environment: '',
      environments: [],
      environmentNameMap: {},
      containerMap: {},
      containerOptions: [],
      site: {
        id: Matomo.idSite,
        name: Matomo.helper.htmlDecode(Matomo.siteName),
      },
      matomoConfigs: [],
      releases: [],
      installInstructions: [],
      noReleaseFound: false,
    };
  },
  created() {
    AjaxHelper.fetch<Environment[]|Record<string, Environment>>({
      method: 'TagManager.getAvailableEnvironments',
      filter_limit: '-1',
    }).then((environments) => {
      let entities: Environment[];
      if (Array.isArray(environments)) {
        entities = environments as Environment[];
      } else {
        entities = Object.values(environments as Record<string, Environment>);
      }

      this.environmentNameMap = Object.fromEntries(entities.map(({ id, name }) => [id, name]));
    });

    this.onSiteChange();
  },
  watch: {
    site() {
      this.onSiteChange();
    },
  },
  methods: {
    onSiteChange() {
      this.installInstructions = [];
      this.containerOptions = [];
      this.containerMap = {};
      this.environments = [];
      this.matomoConfigs = [];
      this.idContainer = '';

      if (!this.site?.id) {
        return;
      }

      this.isLoading = true;
      AjaxHelper.fetch<Container[]>({
        method: 'TagManager.getContainers',
        filter_limit: '-1',
        idSite: this.site.id,
      }).then((containers) => {
        this.containerOptions = [];

        if (!containers?.length) {
          this.idContainer = '';
          this.containerOptions.push({
            key: '',
            value: this.translate('TagManager_NoContainersFound'),
          });
          return;
        }

        containers.forEach((container) => {
          if (!this.idContainer) {
            this.idContainer = container.idcontainer;
          }

          this.containerMap[container.idcontainer] = container;
          this.containerOptions.push({
            key: container.idcontainer,
            value: container.name,
          });
        });

        this.onContainerChange();
      }).finally(() => {
        this.isLoading = false;
      });
    },
    onContainerChange() {
      this.noReleaseFound = false;

      if (!this.idContainer) {
        return;
      }

      this.installInstructions = [];
      const container = this.containerMap[this.idContainer];
      const draftVersion = container.draft.idcontainerversion;
      this.environment = '';
      this.environments = [];

      const releases = container.releases || [];

      if (releases.find((r) => r.environment === 'live')) {
        // we always prefer to pre-select the live environment
        this.environment = 'live';
      }

      releases.forEach((release) => {
        if (release.environment === 'preview') {
          return; // there is nothing to embed for this environment
        }

        if (!this.environment) {
          this.environment = release.environment;
        }

        let name = ucfirst(release.environment);
        if (release.environment in this.environmentNameMap) {
          name = this.environmentNameMap[release.environment];
        }

        this.environments.push({
          key: release.environment,
          value: name,
        });
      });

      if (!this.environments.length) {
        this.noReleaseFound = true;
        this.environments.push({
          key: '',
          value: this.translate('TagManager_NoReleasesFound'),
        });
      }

      this.fetchInstallInstructions();
      this.fetchVariables(draftVersion);
    },
    linkTo(action: string, idContainer: string, hash: QueryParameters) {
      const newQuery = MatomoUrl.stringify({
        ...MatomoUrl.urlParsed.value,
        module: 'TagManager',
        action,
        idContainer,
      });

      let newUrl = `${window.location.pathname}?${newQuery}`;
      if (hash) {
        newUrl += `#?${MatomoUrl.stringify(hash)}`;
      }
      return newUrl;
    },
    fetchInstallInstructions() {
      this.installInstructions = [];

      if (!this.idContainer || !this.environment || !this.site?.id) {
        return;
      }

      this.isLoading = true;
      AjaxHelper.fetch<InstallInstructions[]>({
        method: 'TagManager.getContainerInstallInstructions',
        filter_limit: '-1',
        idContainer: this.idContainer,
        environment: this.environment,
        idSite: this.site.id,
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
        this.isLoading = false;
      });
    },
    fetchVariables(containerDraftVersion: number) {
      this.matomoConfigs = [];

      if (!this.idContainer || !this.site?.id || !containerDraftVersion) {
        return;
      }

      AjaxHelper.fetch<Variable[]>({
        method: 'TagManager.getContainerVariables',
        filter_limit: '-1',
        idContainer: this.idContainer,
        idContainerVersion: containerDraftVersion,
        idSite: this.site.id,
      }).then((variables) => {
        this.matomoConfigs = variables.filter((v) => v.type === 'MatomoConfiguration');
      }).finally(() => {
        this.isLoading = false;
      });
    },
  },
});
</script>
