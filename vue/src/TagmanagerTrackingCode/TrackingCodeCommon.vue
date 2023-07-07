<template>
  <div class="tagManagerTrackingCode">
    <ActivityIndicator
      :style="{opacity: isLoading ? 1 : 0}"
      :loading="true"
      v-if="showContainerRow || environments.length > 1"
    />
    <div class="row" v-if="showContainerRow || environments.length > 1">
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
            @update:model-value="environment = $event; this.$emit('fetchInstallInstructions')"
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
      <p v-if="showDescription">{{ installInstruction.description }}
        <a
          target="_blank"
          v-if="installInstruction.helpUrl"
          :href="installInstruction.helpUrl"
        >{{ translate('TagManager_LearnMore') }}</a>.
      </p>
      <div v-if="showPlainMtmSteps">
        <li>
          {{ translate('TagManager_SiteWithoutDataMtmStep2') }}
          <a :href="linkTo('dashboard', site.id, idContainer)">
            {{ translate('TagManager_Container') }} {{ translate('Dashboard_Dashboard') }}
          </a>. <span v-html="$sanitize(getLearnMoreLink)"></span>.
        </li>
        <li v-html="$sanitize(getMtmStep3)"></li>
      </div>
      <div>
        <pre
          class="codeblock"
          v-text="installInstruction.embedCode"
          ref="codeblock"
          v-copy-to-clipboard="{}"
        />
      </div>
    </div>
    <div v-if="showBottom">
      <p v-if="idContainer" v-html="$sanitize(getCongratulationsText)"></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  AjaxHelper,
  ActivityIndicator,
  SiteSelector,
  SiteRef,
  MatomoUrl,
  Matomo,
  translate,
  CopyToClipboard,
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
  props: {
    showContainerRow: Boolean,
    currentAction: String,
    showBottom: Boolean,
    showDescription: Boolean,
    showPlainMtmSteps: Boolean,
  },
  components: {
    ActivityIndicator,
    SiteSelector,
    Field,
  },
  emits: ['fetchInstallInstructions'],
  directives: {
    CopyToClipboard,
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

      this.$emit('fetchInstallInstructions');
      this.fetchVariables(draftVersion);
    },
    linkTo(action: string, idSite: string, idContainer: string, hash: QueryParameters) {
      const newQuery = MatomoUrl.stringify({
        ...MatomoUrl.urlParsed.value,
        module: 'TagManager',
        action,
        idSite,
        idContainer,
      });

      let newUrl = `${window.location.pathname}?${newQuery}`;
      if (hash) {
        newUrl += `#?${MatomoUrl.stringify(hash)}`;
      }
      return newUrl;
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
  computed: {
    getLearnMoreLink() {
      return translate(
        'TagManager_CustomHtmlTagHelpText',
        '<a rel="noreferrer noopener" target="_blank" href="https://matomo.org/faq/tag-manager/container-dashboard-in-matomo-tag-manager/">',
        '</a>',
      );
    },
    getMtmStep3() {
      return translate(
        'TagManager_SiteWithoutDataMtmStep3', '&lt;/head&gt;',
        '<a rel="noreferrer noopener" target="_blank" href="https://developer.matomo.org/guides/tagmanager/embedding">',
        '</a>',
      );
    },
    getCongratulationsText() {
      return translate(
        'TagManager_SiteWithoutDataReactFollowStepCompleted',
        '<strong>',
        '</strong>',
      );
    },
  },
});
</script>
