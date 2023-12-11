<script lang="ts">
  import { createActivity } from "$lib/activities";
  import type { ActivityObject } from "$lib/activities";
  import { tags } from "$lib/tags";
  import type { TagNode } from "$lib/tags";
  import { tagGroups, tagsByName } from "$lib/tags";
  import { GridLayout, Row, Container } from "contain-css-svelte";

  import TagToggle from "./TagToggle.svelte";
  export let activity: ActivityObject;

  export let onToggleTag: (tag: TagNode) => void;
</script>

<Container>
  {#each tagGroups as group}
    {#if !group.dependsOn || (activity.tags && activity.tags.find((t) => t.name == group.dependsOn))}
      <Row size="small" --tile-width="80px">
        <label>
          {group.label}
        </label>

        {#each group.options as tagName}
          {@const tag = $tagsByName.get(tagName)}
          {#if tag}
            <TagToggle {tag} {activity} onToggle={onToggleTag} />
          {:else}
            Unknown nested tag? {tagName}
            {console.log("Could not find", tagName, "in map", $tagsByName)}
          {/if}
        {/each}
      </Row>
    {/if}
  {/each}
</Container>

<style>
  label {
    width: calc(2 * var(--tile-width));
    text-align: right;
  }
</style>
