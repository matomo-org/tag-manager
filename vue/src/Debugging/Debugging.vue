<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div>
    <nav>
      <div class="nav-wrapper">
        <ul>
          <li><slot name="logo"></slot></li>
          <li :class="{'active': (contentTab === 'tags' || !contentTab)}">
            <a @click="contentTab = 'tags'">Tags</a>
          </li>
          <li :class="{'active': (contentTab === 'triggers')}">
            <a @click="contentTab = 'triggers'">Triggers</a>
          </li>
          <li :class="{'active': (contentTab === 'variables')}">
            <a @click="contentTab = 'variables'">Variables</a>
          </li>
          <li :class="{'active': (contentTab === 'dataLayer')}">
            <a @click="contentTab = 'dataLayer'">Data Layer</a>
          </li>
          <li :class="{'active': (contentTab === 'logs')}">
            <a @click="contentTab = 'logs'">Logs</a>
          </li>
          <li class="pull-right">
            <a id="mtmUpdateDebugPosition"
               @click="mtmUpdateDebugPosition()">{{ positionText }}</a>
          </li>
        </ul>
      </div>
    </nav>

    <svg
      aria-hidden="true"
      style="position: absolute; width: 0; height: 0; overflow: hidden;"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <symbol id="tm-icon-checkmark" viewBox="0 0 32 32">
          <path d="M27 4l-15 15-7-7-5 5 12 12 20-20z"></path>
        </symbol>
      </defs>
    </svg>

    <div class="page" style="clear:both;">
      <div
        id="secondNavBar"
        class="Menu--dashboard z-depth-1"
        v-if="contentTab !== 'logs'"
      >
        <ul class="navbar" role="menu" style="padding: 0;">
          <li class="menuTab" role="menuitem">
            <span class="item" style="font-weight: normal;"> Events
                <span v-if="mtmEvents.length > 0">
                    <br><br>
                    <input
                      type="checkbox"
                      class="onlyFiredTags-chk"
                      name="onlyfiredTags"
                      id="onlyfiredTags"
                      value="1" v-model="onlyfiredTags"
                      style="margin-right: 3.5px"
                    />
                    <label for="onlyfiredTags" class="lbl-onlyfiredTags">Only fired tags</label>
                </span>
            </span>
          </li>
          <li v-if="mtmEvents.length === 0" style="padding: 0 0 1rem 1.2rem;">No event executed</li>
          <li
            class="menuTab"
            role="menuitem"
            v-for="(event, index) in mtmEventsReversed"
            :key="index"
            :class="{'active': index === selectedEventIndex}"
          >
            <a
              v-if="(event.tags || []).length || !onlyfiredTags"
              class="item"
              @click="selectEvent(event.index0)"
              :title="`Time: ${event.time}. Trigger: ${event.metTrigger?.name}`">
              {{ event.index }}: {{ event.name }}
              <span title="This tag was fired" v-show="event.tags?.length">
                <svg class="tm-icon tm-icon-checkmark">
                  <use xlink:href="#tm-icon-checkmark"></use>
                </svg>
              </span>
            </a>
          </li>
        </ul>
      </div>
      <div class="pageWrap">
        <div class="home" id="content">
          <h2 v-show="contentTab !== 'logs'">
            {{ homeTabTitle }}
          </h2>

          <div v-show="contentTab === 'tags' || !contentTab">
            <h3>Fired Tags</h3>
            <table class="entityTable">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Fired count</th>
                </tr>
              </thead>
              <tbody>
              <tr v-if="!selectedEvent?.tags?.length">
                <td colspan="4">No tags</td>
              </tr>
              <tr v-for="(tag, index) in (selectedEvent?.tags || [])" :key="index">
                <td>{{ tag.action }}</td>
                <td>{{ tag.name }}</td>
                <td>{{ tag.type }}</td>
                <td>{{ tag.numExecuted }}</td>
              </tr>
              </tbody>
            </table>

            <h3 style="margin-top:30px;">Not Yet Fired Tags</h3>
            <table class="entityTable">
              <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
              </thead>
              <tbody>
              <tr v-show="notFiredTags.length === 0">
                <td colspan="4">No tags</td>
              </tr>
              <tr v-for="(tag, index) in notFiredTags" :key="index">
                <td>{{ tag.name }}</td>
                <td>{{ tag.type }}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div v-show="contentTab === 'triggers'">
            <h3>Triggers</h3>

            <table class="entityTable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="!selectedEvent?.metTrigger">
                  <td colspan="4">No trigger</td>
                </tr>
                <tr v-if="selectedEvent?.metTrigger">
                  <td>{{ selectedEvent.metTrigger.name }}</td>
                  <td>{{ selectedEvent.metTrigger.type }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-show="contentTab === 'dataLayer'">
            <h3>Pushed data by this event</h3>

            <table class="entityTable">
              <tbody>
              <tr>
                <td style="word-break: break-all">
                  {{ selectedEventData }}
                </td>
              </tr>
              </tbody>
            </table>

            <br>
            <h3>Content after this event</h3>

            <table class="entityTable">
              <tbody>
              <tr>
                <td style="word-break: break-all">
                  {{ selectedEventContainerDataLayer }}
                </td>
              </tr>
              </tbody>
            </table>

          </div>
          <div v-show="contentTab === 'variables'">
            <table class="entityTable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="!selectedEvent?.container?.variables?.length">
                  <td colspan="3">No variables</td>
                </tr>
                <tr
                  v-for="(variable, index) in selectedEvent?.container?.variables || []"
                  :key="index"
                >
                  <td>{{ variable.name }}</td>
                  <td>{{ variable.type }}</td>
                  <td style="word-break: break-all">
                    {{ stringifySelectedVariable(variable) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-show="contentTab === 'logs'">
            <table class="entityTable">
              <thead>
              <tr>
                <th>Time</th>
                <th>Message</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(log, index) in mtmLogs" :key="index">
                <td>{{ log.time }}</td>
                <td style="word-break: break-all">
                  <span v-for="(logMessage, index) in log.messages" :key="index">
                    {{ logMessage }}<br />
                  </span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */

import { defineComponent, reactive } from 'vue';
import {
  setCookie, getCookie,
} from 'CoreHome';

interface TagDebugData {
  action: string;
  type: string;
  name: string;
  numExecuted: number;
}

interface VariableDebugData {
  name: string;
  type: string;
  value: any;
}

interface MtmEvent {
  tags: TagDebugData[],
  variables: VariableDebugData[],
  metTrigger: null,
  name: string;
  eventData: any;
  container: any;
  time: string;
  index0: number;
  index: number;
}

interface MtmLog {
  time: string;
  messages: string[];
}

interface DebuggingState {
  contentTab: string;
  selectedEventIndex: number;
  onlyfiredTags: boolean;
  positionText: string;
}

interface MtmData {
  mtmEvents: MtmEvent[];
  mtmLogs: MtmLog[];
}

declare global {
  interface Window {
    mtmDbgData: MtmData;
  }
}

window.mtmDbgData = reactive<MtmData>({
  mtmEvents: window.mtmDbgData?.mtmEvents || [],
  mtmLogs: window.mtmDbgData?.mtmLogs || [],
}) as unknown as MtmData;

const cookieName = 'mtmPreviewPosition';
const stickyTextTop = 'Stick to Top';
const stickyTextBottom = 'Stick to Bottom';

function getCircularReplacer() {
  const seen = new WeakSet();
  function circular(key: any, value: any) {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '';
      }
      seen.add(value);
    }
    return value;
  }
  return circular;
}

export default defineComponent({
  data(): DebuggingState {
    return {
      contentTab: 'tags',
      selectedEventIndex: 0,
      onlyfiredTags: false,
      positionText: (getCookie(cookieName) === 'top' ? stickyTextBottom : stickyTextTop),
    };
  },
  methods: {
    mtmUpdateDebugPosition() {
      const sevenDays = 7 * 60 * 60 * 24 * 1000;
      const currentCookieValue = getCookie(cookieName);
      const cookieValue = (currentCookieValue === 'top' ? 'bottom' : 'top');
      setCookie(cookieName, cookieValue, sevenDays);
      const iframe = window.parent.document.getElementById('mtmDebugFrame');
      if (cookieValue === 'top') {
        this.positionText = stickyTextBottom;
        iframe!.classList.remove('mtmStickyBottom');
        iframe!.classList.add('mtmStickyTop');
      } else {
        this.positionText = stickyTextTop;
        iframe!.classList.remove('mtmStickyTop');
        iframe!.classList.add('mtmStickyBottom');
      }
    },
    selectEvent(eventIndex: number) {
      if (!this.mtmEvents[eventIndex]) {
        return;
      }

      this.selectedEventIndex = eventIndex;
    },
    stringifySelectedVariable(variable: any) {
      return JSON.stringify(variable.value, getCircularReplacer());
    },
  },
  computed: {
    homeTabTitle(): string {
      if (!this.selectedEvent?.container) {
        return '';
      }

      const versionName = this.selectedEvent.container.versionName || 'Draft version';
      const container = this.selectedEvent.container.id;
      const eventNum = this.selectedEventIndex + 1;
      return `Event ${eventNum}: ${this.selectedEvent.name} (${container} - ${versionName})`;
    },
    notFiredTags(): any[] {
      if (!this.selectedEvent?.container) {
        return [];
      }

      const eventIndex = this.selectedEventIndex;

      const tagsFired: string[] = [];
      this.mtmEvents.forEach((event, i) => {
        if (i > eventIndex) {
          return;
        }

        tagsFired.push(...event.tags.map((tag: any) => tag.name as string));
      });

      const tagsNotFired: any[] = [];
      this.selectedEvent.container.tags.forEach((tag: any) => {
        if (tagsFired.indexOf(tag.name) === -1) {
          tagsNotFired.push(tag);
        }
      });
      return tagsNotFired;
    },
    selectedEvent(): MtmEvent {
      return this.mtmEvents[this.selectedEventIndex];
    },
    mtmEvents(): MtmEvent[] {
      return window.mtmDbgData.mtmEvents;
    },
    mtmEventsReversed(): MtmEvent[] {
      const result = [...this.mtmEvents];
      result.reverse();
      return result;
    },
    mtmLogs(): MtmLog[] {
      return window.mtmDbgData.mtmLogs;
    },
    selectedEventData(): string {
      return this.selectedEvent?.eventData
        && JSON.stringify(this.selectedEvent.eventData, getCircularReplacer());
    },
    selectedEventContainerDataLayer(): string {
      return this.selectedEvent?.container?.dataLayer
        && JSON.stringify(this.selectedEvent.container.dataLayer, getCircularReplacer());
    },
  },
});
</script>
