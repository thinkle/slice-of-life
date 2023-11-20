<script lang="ts">
  import TagSelector from "./TagSelector.svelte";

  import { onMount } from "svelte";
  import { supabase } from "$lib/db";
  import { createActivity } from "$lib/activities";
  import type { ActivityObject } from "$lib/activities";
  import { tags } from "$lib/tags";
  import type { TagNode } from "$lib/tags";
  import { user } from "$lib/user"; // user is a store
  import {
    Form,
    FormGroup,
    Button,
    ButtonSet,
    Slider,
    NumberInput,
    SelectableTile,
    TextInput,
    ComboBox,
    Grid,
    Row,
    Column,
  } from "carbon-components-svelte";
  import DateTimePicker from "./DateTimePicker.svelte";
  import type { Activity } from "./dbTypes";
  import TagToggle from "./TagToggle.svelte";

  function formatDuration(duration: number | null): string {
    if (duration === null) {
      return "-";
    } else if (!duration) {
      return "0 minutes";
    }
    let hours = Math.floor(duration / 60);
    let minutes = duration % 60;
    if (hours === 0) return `${minutes} minutes`;
    return `${hours} hours, ${minutes} minutes`;
  }
  let activity: ActivityObject = {
    description: "",
    duration: 0,
    timestamp: new Date().toString(),
    tags: [],
    users: [{ id: $user?.id }],
  };

  function submitActivity() {
    activity.timestamp = startTime.toISOString();
    activity = createActivity(activity);
  }
  let startTime = new Date();
  let newTags: string[] = [];

  export function onToggleTag(tag: TagNode) {
    if (activity.tags.find((t) => t.id == tag.id)) {
      activity.tags = activity.tags.filter((t) => t.id != tag.id);
    } else {
      activity.tags = [
        ...activity.tags,
        {
          id: tag.id,
          name: tag.name,
        },
      ];
    }
  }
  $: console.log("Got tags: ", $tags);
  let autofilled = false;
  function autoFill(activity: ActivityObject) {
    if (autofilled || (!activity.description && activity.tags)) {
      let tagNames = activity.tags.map((t) => t.name);
      activity.description = tagNames.join(" ");
      autofilled = true;
    }
  }

  $: autoFill(activity);
</script>

<h2>New Activity</h2>

<Form>
  <Grid>
    <Row>
      <Column>
        <DateTimePicker labelText="Start Time:" bind:value={startTime} />
      </Column>
      <Column>
        <TextInput
          labelText="Description:"
          bind:value={activity.description}
          required
          on:input={() => {
            autofilled = false;
          }}
        />
      </Column>
    </Row>
    <Row>
      <Column>
        <FormGroup>
          <Slider
            labelText="Duration: {formatDuration(activity.duration)}"
            min={0}
            max={60 * 8}
            step={15}
            bind:value={activity.duration}
          />
        </FormGroup>
      </Column>
      <Column><Button on:click={submitActivity}>+ Add</Button></Column>
    </Row>
  </Grid>
  <FormGroup>
    <!-- Tag Selector -->
    <TagSelector {activity} {onToggleTag} />
  </FormGroup>
</Form>
