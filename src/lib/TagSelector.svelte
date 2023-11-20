<script lang="ts">
  import { createActivity } from "$lib/activities";
  import type { ActivityObject } from "$lib/activities";
  import { tags } from "$lib/tags";
  import type { TagNode } from "$lib/tags";
  import { tagGroups, tagsByName } from "$lib/tags";
  import { Grid, Row, Column } from "carbon-components-svelte";
  import TagToggle from "./TagToggle.svelte";
  export let activity: ActivityObject;

  export let onToggleTag: (tag: TagNode) => void;
</script>

<h2>Tags be Here</h2>
<Grid condensed padding>
  {#each tagGroups as group}
    {#if !group.dependsOn || activity.tags.find((t) => t.name == group.dependsOn)}
      <label>
        {group.label}
      </label>
      <Row padding={true}>
        {#each group.options as tagName}
          {@const tag = $tagsByName.get(tagName)}
          {#if tag}
            <Column sm={2} md={2} lg={2} padding>
              <TagToggle {tag} {activity} onToggle={onToggleTag} />
            </Column>
          {:else}
            Unknown nested tag? {tagName}
            {console.log("Could not find", tagName, "in map", $tagsByName)}
          {/if}
        {/each}
      </Row>
    {/if}
  {/each}
</Grid>
