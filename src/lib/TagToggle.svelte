<script lang="ts">
  import TagIcon from "./TagIcon.svelte";

  import { FormGroup, SelectableTile } from "carbon-components-svelte";
  import type { ActivityObject } from "./activities";
  import type { TagNode } from "./tags";
  export let activity: ActivityObject;
  export let tag: TagNode;
  export let onToggle: (tag: TagNode) => void;
  SelectableTile;
  $: console.log("Tag has activity", activity);
</script>

<SelectableTile
  selected={activity &&
    activity.tags &&
    !!activity.tags.find((t) => t.id == tag.id)}
  on:select={() => {
    onToggle(tag);
  }}
>
  {#if tag.name}
    <TagIcon tagname={tag.name} />
  {/if}
  <!-- </div> -->
</SelectableTile>

<!-- 
{#if tag.children}
  <div class="children">
    <FormGroup>
      {#each tag.children as child}
        <svelte:self tag={child} {onToggle} {activity} />
      {/each}
    </FormGroup>
  </div>
{/if} -->

<style>
</style>
