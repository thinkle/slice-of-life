<script lang="ts">
  import TagIcon from "./TagIcon.svelte";

  import { FormGroup, SelectableTile } from "carbon-components-svelte";
  import { Tile } from "contain-css-svelte";
  import type { ActivityObject } from "./activities";
  import type { TagNode } from "./tags";
  export let activity: ActivityObject;
  export let tag: TagNode;
  export let onToggle: (tag: TagNode) => void;
  SelectableTile;

  let checked = activity.tags.find((t) => t.id == tag.id);
  $: {
    checked = !!activity.tags.find((t) => t.id == tag.id);
    console.log("Updated checked for ", tag.name, "=>", checked);
  }
</script>

<Tile selectable {checked} on:input={() => onToggle(tag)}>
  {#if tag.name}
    <TagIcon tagname={tag.name} />
  {/if}
  <!-- </div> -->
</Tile>

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
