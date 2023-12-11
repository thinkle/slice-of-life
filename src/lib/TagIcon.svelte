<script lang="ts">
  import Laptop from "svelte-material-icons/Laptop.svelte";
  import Phone from "svelte-material-icons/Cellphone.svelte";
  import TV from "svelte-material-icons/TelevisionClassic.svelte";
  import Fam from "svelte-material-icons/HumanMaleFemaleChild.svelte";
  import Friends from "svelte-material-icons/HumanFemaleFemale.svelte";
  import Connecting from "svelte-material-icons/Link.svelte";
  import Devices from "svelte-material-icons/Devices.svelte";
  import School from "svelte-material-icons/School.svelte";
  import Work from "svelte-material-icons/OfficeBuilding.svelte";
  import Walk from "svelte-material-icons/Walk.svelte";
  import Drive from "svelte-material-icons/Car.svelte";
  import Bike from "svelte-material-icons/Bike.svelte";
  import Run from "svelte-material-icons/Run.svelte";
  import Homework from "svelte-material-icons/FileDocument.svelte";
  import Class from "svelte-material-icons/Bell.svelte";
  import Extracurricular from "svelte-material-icons/Theater.svelte";
  import Shopping from "svelte-material-icons/Shopping.svelte";
  import Cleaning from "svelte-material-icons/Broom.svelte";
  import Laundry from "svelte-material-icons/WashingMachine.svelte";
  import Cooking from "svelte-material-icons/Stove.svelte";
  import House from "svelte-material-icons/HomeOutline.svelte";
  import { TooltipIcon } from "carbon-components-svelte";
  export let size: number = 32;
  export let tagname = "";
  let componentMap: {
    [key: string]: any;
  } = {
    Screentime: Devices,
    "Phone/Tablet": Phone,
    Computer: Laptop,
    "TV/Movie": TV,
    "Family Time": Fam,
    "Time w/ Friends": Friends,
    Connecting: Connecting,
    School: School,
    Work: Work,
    Walking: Walk,
    Driving: Drive,
    Biking: Bike,
    Running: Run,
    Class: Class,
    Homework: Homework,
    Extracurricular: Extracurricular,
    Cleaning: Cleaning,
    Laundry: Laundry,
    Shopping: Shopping,
    Cooking: Cooking,
    Personal: House,
  };
</script>

{#if tagname in componentMap}
  <div class="wrap">
    <div class="icon">
      <svelte:component this={componentMap[tagname]} {size} />
    </div>
    <div class="text">{tagname}</div>
  </div>
{:else}
  <span>{tagname}</span>
{/if}

<style>
  .wrap {
    height: 100%;
    width: 100%;
    display: grid;
    place-content: center;
    text-align: center;
  }
  .wrap .text {
    opacity: 0.5;
    font-size: x-small;
  }
  .wrap:hover .text {
    opacity: 1;
  }
</style>
