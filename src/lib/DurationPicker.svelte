<script lang="ts">
  export let value: number; // Duration in minutes

  // Quick duration buttons
  const quickDurations = [
    { label: "1/2 hr", value: 30 },
    { label: "1", value: 60 },
    { label: "2", value: 120 },
    { label: "3", value: 180 },
    { label: "4", value: 240 },
    { label: "8", value: 480 },
    { label: "12", value: 12 * 60 },
    // Add more if needed
  ];

  const setDuration = (minutes: number) => {
    value = minutes;
  };

  const handleNumericInput = (event: KeyboardEvent) => {
    const num = parseInt(event.target.value);
    if (!isNaN(num)) {
      value = num;
    }
  };

  // Function to convert minutes to a user-friendly format
  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hrs = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hrs} hr${hrs > 1 ? "s" : ""} ${
        mins > 0 ? `${mins} min` : ""
      }`.trim();
    }
  };

  // Function to parse duration input
  const parseDurationInput = (input: string) => {
    const parts = input.split(":");
    let minutes = 0;
    if (parts.length === 2) {
      // Format is HH:MM
      minutes = parseInt(parts[0]) * 60 + parseInt(parts[1]);
    } else if (parts.length === 1) {
      // Only minutes or hours
      minutes = input.includes(":")
        ? parseInt(parts[0]) * 60
        : parseInt(parts[0]);
    }
    return isNaN(minutes) ? 0 : minutes;
  };

  export let maxDuration = 16 * 60;
  export let sliderMax = 8 * 60;
  let minutes = value % 60;
  let hours = Math.floor(value / 60);

  $: minutes = value % 60;
  $: hours = Math.floor(value / 60);
  function setMinutes(minutes: number) {
    value = hours * 60 + minutes;
  }
  function setHours(hours: number) {
    value = hours * 60 + minutes;
  }
  function zeroPad(n) {
    let s = "" + n;
    if (s.length === 1) {
      return "0" + s;
    } else {
      return s;
    }
  }
</script>

<div class="duration-picker">
  <!-- Slider input -->
  <input
    class="slider"
    type="range"
    min="0"
    max={sliderMax}
    step="15"
    bind:value
  />
  <!-- Quick selection buttons -->
  <div class="quick-buttons">
    {#each quickDurations as { label, value: durationValue }}
      <button
        style:--perc={durationValue / sliderMax}
        on:click={() => setDuration(durationValue)}>{label}</button
      >
    {/each}
  </div>
  <div class="text">
    <input
      type="number"
      min="0"
      max="24"
      value={zeroPad(hours)}
      on:input={(e) => setHours(e.target.valueAsNumber)}
    />:
    <input
      type="number"
      min="0"
      max="60"
      value={zeroPad(minutes)}
      on:input={(e) => setMinutes(e.target.valueAsNumber)}
    />
  </div>
</div>

<style>
  .duration-picker {
    display: grid;
    grid-template-areas:
      "quick-buttons"
      "slider"
      "text";
    width: calc(100cqw - var(--form-label-width) - 3 * var(--padding));
  }
  .slider {
    grid-area: slider;
  }
  .text {
    grid-area: text;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .quick-buttons {
    grid-area: quick-buttons;
    height: 1em;
    position: relative;
  }
  button {
    position: absolute;
    left: calc(100% * var(--perc));
    background-color: transparent;
    border: none;
  }
  button::after {
    content: "|";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 1em;
  }
</style>
