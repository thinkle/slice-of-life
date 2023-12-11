<script lang="ts">
  export let value: Date;
  export let labelText: string;
  import {
    TimePicker,
    SelectItem,
    TimePickerSelect,
    DatePicker,
    DatePickerInput,
  } from "carbon-components-svelte";
  if (!value) {
    value = new Date();
  }

  let timeValue = value.toLocaleTimeString();
  console.log("timeValue is ", timeValue);
  let ampm = timeValue.slice(-2);
  let hour = timeValue.slice(0, 2);
  let minute = timeValue.slice(2, 5);

  let timeString = `${hour}${minute}`;

  $: console.log("Time is ", timeString + ampm);
</script>

<input type="time" bind:value={timeString} />
