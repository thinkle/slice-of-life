<script>
  import Auth from "$lib/Auth.svelte";
  import { user } from "$lib/user";
  import NewActivity from "$lib/NewActivity.svelte";
  import { Page, Container } from "contain-css-svelte";
  import "contain-css-svelte/vars/defaults.css";
  import "contain-css-svelte/vars/themes/lightordark.css";
</script>

<Page>
  <Container>
    <h1>Slice of Life!</h1>
    {#if !$user}
      <Auth />
    {:else}
      <NewActivity />
      <p>Logged in as {$user.email}</p>
    {/if}
  </Container>
</Page>
