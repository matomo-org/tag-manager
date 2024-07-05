<template>
  <div class="tagManagerTrackingCode">
    <li v-if="showContainerRow">
      {{ translate('TagManager_OptionallyCustomiseContainer') }}
      <div class="trackingCodeAdvancedOptions">
        <div class="advance-option">
          <span>
            <a href="javascript:;"
               v-if="!isAdvancedDisplayed"
               @click.prevent="isAdvancedDisplayed = true">
              {{ translate('CoreAdminHome_ShowAdvancedOptions') }}
              <span class="icon-chevron-down"></span>
            </a>
            <a href="javascript:;"
               v-if="isAdvancedDisplayed"
               @click.prevent="isAdvancedDisplayed = false">
              {{ translate('CoreAdminHome_HideAdvancedOptions') }}
              <span class="icon-chevron-up"></span>
            </a>
          </span>
        </div>

        <div id="mtm-advanced-options" v-show="isAdvancedDisplayed">
          <ul  class="browser-default">
            <li v-html="$sanitize(getAdvancedStepText)"></li>
            <ActivityIndicator
              v-show="isLoading"
              :loading="true"
              v-if="showContainerRow || environments.length > 1"
            />
            <div class="row"
                 v-if="showContainerRow || environments.length > 1"
                 v-show="!isLoading"
            >
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
                    @update:model-value="environment = $event;
                      this.$emit('fetchInstallInstructions')"
                    :options="environments"
                    :disabled="environments.length <= 1"
                    :full-width="true"
                    :title="translate('TagManager_Environment')"
                  >
                  </Field>
                </div>
              </div>
            </div>
            <li v-if="idContainer" v-html="$sanitize(getAdvancedStepInfo)"></li>
          </ul>
        </div>
      </div>
    </li>
    <div
      class="alert alert-info"
      v-if="idContainer && noReleaseFound"
    >
      {{ translate('TagManager_NoReleasesFoundForContainer') }}
      <a href>{{ translate('TagManager_PublishVersionToEnvironmentToViewEmbedCode') }} </a>
    </div>
    <template
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
      <template v-if="showPlainMtmSteps">
        <li v-html="$sanitize(getMtmStep3)"></li>
      </template>
      <div>
        <pre
          class="codeblock"
          v-text="installInstruction.embedCode"
          ref="codeblock"
          v-copy-to-clipboard="{}"
        />
      </div>
    </template>
    <template v-if="showBottom && !noReleaseFound && idContainer">
      <p v-if="!showTestSection" v-html="$sanitize(getCongratulationsText)"></p>
      <template v-else>
        <li><component :is="testComponent" :site="site"></component></li>
      </template>
    </template>
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
  useExternalPluginComponent,
  externalLink,
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
  isAdvancedDisplayed: boolean;
}

function ucfirst(s: string): string {
  return `${s.substr(0, 1).toUpperCase()}${s.substr(1)}`;
}

export default defineComponent({
  props: {
    showContainerRow: Boolean,
    showBottom: Boolean,
    showDescription: Boolean,
    showPlainMtmSteps: Boolean,
    showTestSection: Boolean,
    showAdvancedOptions: {
      required: false,
      type: Boolean,
      default: false,
    },
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
      isAdvancedDisplayed: false,
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

    this.isAdvancedDisplayed = this.showAdvancedOptions;
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
          this.isAdvancedDisplayed = true;
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
    linkTo(action: string, idSite: string, idContainer: string, hash?: QueryParameters) {
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
        externalLink('https://matomo.org/faq/tag-manager/container-dashboard-in-matomo-tag-manager/'),
        '</a>',
      );
    },
    getMtmStep3() {
      return translate(
        'TagManager_CopyCodePasteInHeader', '&lt;/head&gt;',
      );
    },
    getCongratulationsText() {
      return translate(
        'TagManager_SiteWithoutDataReactFollowStepCompleted',
        '<strong>',
        '</strong>',
      );
    },
    testComponent() {
      if (this.showTestSection) {
        return useExternalPluginComponent('JsTrackerInstallCheck', 'JsTrackerInstallCheck');
      }
      return '';
    },
    getAdvancedStepText() {
      const stepText = translate('TagManager_SelectContainerForWebsite', '<strong>', '</strong>');
      if (this.idContainer) {
        return stepText;
      }

      // If not container is found, we should include a link to the manage containers area
      const manageContainerURL = this.linkTo('manageContainers', String(this.site?.id), '');
      const manageContainersText = translate(
        'TagManager_ManageContainersLink',
        `<a href="${manageContainerURL}" target="_blank" rel="noreferrer noopener">`,
        '</a>',
      );

      return `${stepText} ${manageContainersText}`;
    },
    getAdvancedStepInfo() {
      const idSite = this.site && this.site.id ? this.site.id as string : '';
      const link = this.linkTo('dashboard', idSite, this.idContainer, []);

      return translate(
        'TagManager_CustomiseContainer',
        `<a href="${link}">`,
        '</a>',
        externalLink('https://matomo.org/faq/tag-manager/container-dashboard-in-matomo-tag-manager/'),
        '</a>',
      );
    },
  },
});
</script>
