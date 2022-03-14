<!--
  Matomo - free/libre analytics platform
  @link https://matomo.org
  @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="col s12 m6 input-field">
    <input
      ref="dateInput"
      type="text"
      :name="`${name}_date`"
      :id="`${name}_date`"
      class="dateInput"
      :value="dateText"
      @keydown="onDateKeydown($event)"
      @change="onDateKeydown($event)"
    />
  </div>
  <div class="col s12 m6 input-field">
    <input
      ref="timeInput"
      type="text"
      :name="`${name}_time`"
      :id="`${name}_time`"
      class="timeInput"
      :value="timeText"
      @keydown="onTimeKeydown($event)"
    />
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { defineComponent } from 'vue';
import { Matomo } from 'CoreHome';
import ChangeEvent = JQuery.ChangeEvent;

function prefixDateZeroIfNeeded(number: number) {
  let datePart = String(number);

  if (datePart.length === 1) {
    datePart = `0${datePart}`;
  }

  return datePart;
}

function convertUtcToLocalDate(dateTime: string): Date|undefined {
  if (!dateTime) {
    return undefined;
  }

  let isoDate = dateTime;
  if (isoDate) {
    isoDate = (`${isoDate}`).replace(/-/g, '/');

    try {
      return new Date(`${isoDate} UTC`);
    } catch (e) {
      try {
        return new Date(Date.parse(`${isoDate} UTC`));
      } catch (ex) {
        // eg phantomjs etc
        const datePart = isoDate.substr(0, 10);
        const timePart = isoDate.substr(11);

        const dateParts = datePart.split('/');
        const timeParts = timePart.split(':');

        if (dateParts.length === 3 && timeParts.length === 3) {
          const result = new Date(
            parseInt(dateParts[0], 10),
            parseInt(dateParts[1], 10) - 1,
            parseInt(dateParts[2], 10),
            parseInt(timeParts[0], 10),
            parseInt(timeParts[1], 10),
            parseInt(timeParts[2], 10),
          );
          const newTime = result.getTime() + (result.getTimezoneOffset() * 60000);
          return new Date(newTime);
        }
      }
    }
  }

  return undefined;
}

function convertUtcDateToLocalDatePart(isoDateTime: string): string {
  const localStartDate = convertUtcToLocalDate(isoDateTime);
  if (localStartDate) {
    const month = prefixDateZeroIfNeeded(localStartDate.getMonth() + 1);
    const date = prefixDateZeroIfNeeded(localStartDate.getDate());
    return `${localStartDate.getFullYear()}-${month}-${date}`;
  }

  const parts = isoDateTime.split(' ');
  return parts[0];
}

function convertUtcDateToLocalTimePart(isoDateTime: string): string {
  const localStartDate = convertUtcToLocalDate(isoDateTime);
  if (localStartDate) {
    const hours = prefixDateZeroIfNeeded(localStartDate.getHours());
    const minutes = prefixDateZeroIfNeeded(localStartDate.getMinutes());
    const seconds = prefixDateZeroIfNeeded(localStartDate.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  }

  const parts = isoDateTime.split(' ');
  return parts[1];
}

function convertLocalDateToUtc(strDate: string): string {
  let dateTime = strDate;
  if (dateTime) {
    dateTime = dateTime.replace(/-/g, '/');
  }
  try {
    const localDate = new Date(dateTime);

    const month = prefixDateZeroIfNeeded(localDate.getUTCMonth() + 1);
    const date = prefixDateZeroIfNeeded(localDate.getUTCDate());
    const hours = prefixDateZeroIfNeeded(localDate.getUTCHours());
    const minutes = prefixDateZeroIfNeeded(localDate.getUTCMinutes());
    const seconds = prefixDateZeroIfNeeded(localDate.getUTCSeconds());

    let formatted = '';
    formatted += `${localDate.getUTCFullYear()}-${month}-${date}`;
    formatted += ' ';
    formatted += `${hours}:${minutes}:${seconds}`;

    return formatted;
  } catch (e) {
    return dateTime;
  }
}

const { $ } = window;

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    defaultTime: {
      type: String,
      required: true,
    },
    modelValue: String,
  },
  mounted() {
    const datePickerOptions: Record<string, unknown> = {
      ...Matomo.getBaseDatePickerOptions(null),
      minDate: new Date(),
    };
    delete datePickerOptions.maxDate;

    $(this.$refs.dateInput as HTMLElement).datepicker({ ...datePickerOptions });

    // @ts-ignore
    $(this.$refs.timeInput as HTMLElement)
      .timepicker({ timeFormat: 'H:i:s' })
      // timepicker triggers a jquery event, not a addEventListener event, so vue doesn't catch
      // it
      .on('change', (event) => {
        this.onTimeKeydown(event);
      });
  },
  computed: {
    dateText() {
      if (!this.modelValue) {
        return '';
      }

      return convertUtcDateToLocalDatePart(this.modelValue);
    },
    timeText() {
      if (!this.modelValue) {
        return '';
      }

      return convertUtcDateToLocalTimePart(this.modelValue);
    },
  },
  methods: {
    onDateKeydown(event: KeyboardEvent) {
      setTimeout(() => {
        const { value } = (event.target as HTMLInputElement);
        if (this.dateText === value) {
          return;
        }

        this.onChange(value, this.timeText);
      });
    },
    onTimeKeydown(event: KeyboardEvent|ChangeEvent) {
      setTimeout(() => {
        const { value } = (event.target as HTMLInputElement);
        if (this.timeText === value) {
          return;
        }

        this.onChange(this.dateText, value);
      });
    },
    onChange(date: string, time: string) {
      if (!date) {
        this.$emit('update:model-value', null);
        return;
      }

      const timeToUse = time || this.defaultTime;
      const newDate = convertLocalDateToUtc(`${date} ${timeToUse}`);
      this.$emit('update:model-value', newDate);
    },
  },
});
</script>
