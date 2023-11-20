<script>
  import Auth from "$lib/Auth.svelte";
  import { user } from "$lib/user";
  import "carbon-components-svelte/css/g100.css";
  import NewActivity from "$lib/NewActivity.svelte";
  import { Content } from "carbon-components-svelte";
</script>

<Content>
  <h1>Slice of Life!</h1>
  {#if !$user}
    <Auth />
  {:else}
    <NewActivity />
    <p>Logged in as {$user.email}</p>
  {/if}
</Content>
