<script lang="ts">
  import Pencil from "svelte-material-icons/Pencil.svelte";
  import Close from "svelte-material-icons/Close.svelte";
  import { onMount } from "svelte";
  import { Button } from "contain-css-svelte";

  export let value: Date = new Date();

  let dateString = value.toISOString().substring(0, 10); // Format for date input
  let timeString = value.toTimeString().substring(0, 5); // Format for time input
  let showDay = false;
  let todayText: string;
  $: todayText = value.toDateString();

  const now = new Date();

  const updateDateTime = () => {
    const [hours, minutes] = timeString.split(":");
    value.setHours(parseInt(hours), parseInt(minutes));
    value = value;
  };

  const updateDate = () => {
    const [year, month, day] = dateString.split("-");
    value.setFullYear(parseInt(year), parseInt(month) - 1, parseInt(day));
    updateDateTime(); // Update time in case it's changed
  };

  const setToToday = () => {
    value.setMonth(now.getMonth());
    value.setDate(now.getDate());
    dateString = value.toISOString().substring(0, 10);
    value = value; // react!
  };

  const setToYesterday = () => {
    value.setMonth(now.getMonth());
    value.setDate(now.getDate() - 1);
    dateString = value.toISOString().substring(0, 10);
    value = value; // react!
  };

  const setToDayBeforeYesterday = () => {
    value.setMonth(now.getMonth());
    value.setDate(now.getDate() - 2);
    dateString = value.toISOString().substring(0, 10);
    value = value; // react!
  };

  onMount(() => {
    updateDateTime();
  });
</script>

<div class="date-time-picker">
  <input type="time" bind:value={timeString} on:change={updateDateTime} />
  <div class="day-picker">
    <div
      class="day-activator"
      class:open={showDay}
      class:closed={!showDay}
      on:click={() => (showDay = !showDay)}
    >
      {#if showDay}
        <Close />
      {:else}
        <Button>
          {todayText}
          <Pencil />
        </Button>
      {/if}
    </div>
    {#if showDay}
      <div class="day-options">
        <input type="date" bind:value={dateString} on:change={updateDate} />
        <Button on:click={setToDayBeforeYesterday}>Day Before Yesterday</Button>
        <Button on:click={setToYesterday}>Yesterday</Button>
        <Button on:click={setToToday}>Today</Button>
      </div>
    {/if}
  </div>
</div>

<style>
  .date-time-picker {
    display: flex;
    flex-direction: row;
    gap: var(--gap);
    align-items: start;
  }
  .day-activator {
    display: flex;
  }
  .day-activator.open {
    justify-content: flex-end;
  }
  .day-activator.closed {
  }
  .day-options {
    display: grid;
    grid-template-areas:
      "date-input date-input date-input"
      "day-before-yesterday yesterday today";
  }
  .day-options input {
    grid-area: date-input;
  }
</style>
