import type { ActivityTag, ActivityTagInsert } from "$lib/dbTypes";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase, getData } from "./db";
import type { Readable } from "svelte/store";
import { derived, writable } from "svelte/store";

export async function listTags(): Promise<ActivityTag[]> {
  return getData(await supabase.from("activity_tags").select());
}

export type TagNode = ActivityTag & {
  children: TagNode[];
};

export async function getTagHeirarchy(): Promise<
  TagNode[] & { _all: TagNode[] }
> {
  let tagList = await listTags();
  let tagNodes: TagNode[] = tagList.map((tag) => {
    return {
      ...tag,
      children: [],
    };
  });
  tagNodes.forEach((tagNode) => {
    if (tagNode.parent_tag_id) {
      let parent = tagNodes.find((tag) => tag.id === tagNode.parent_tag_id);
      if (parent) {
        parent.children.push(tagNode);
      }
    }
  });
  console.log("Returning filtered heirarchy from...", tagNodes);

  let topLevel = tagNodes.filter(
    (tagNode) => !tagNode.parent_tag_id
  ) as TagNode[] & { _all: TagNode[] };
  topLevel._all = tagNodes;
  return topLevel;
}

const createTagStore = () => {
  const { subscribe, set } = writable<TagNode[] & { _all: TagNode[] }>([]);

  const refresh = async () => {
    let tags = await getTagHeirarchy();
    console.log("Setting store!", tags);
    set(tags);
  };

  refresh();

  return {
    subscribe,
    refresh,
    // Additional functionality as needed
  };
};

export const tags: Readable<TagNode[] & { _all: TagNode[] }> = createTagStore();

export const tagsByName = derived(tags, ($tags) => {
  let byName = new Map<string, TagNode>();
  if ($tags._all) {
    $tags._all.forEach((tag) => {
      if (tag.name) {
        byName.set(tag.name, tag);
      }
    });
  }
  return byName;
});

/* tagGroups is organized by a key
then within each item we have a list
items or groups. If the list is a 
group, then we have a "parent" which is
"implied" by the children  */

type TagGroup = {
  label: string;
  type: "heirarchy" | "choice";
  options: string[];
  dependsOn?: string;
};

export const tagGroups: TagGroup[] = [
  {
    label: "Device",
    options: ["Screentime", "Phone/Tablet", "Computer", "TV/Movie"],
    type: "heirarchy",
  },
  {
    label: "Type",
    options: ["Work", "School", "Personal"],
    type: "choice",
  },
  {
    label: "Schoolwork",
    options: ["Homework", "Class", "Extracurricular"],
    type: "choice",
    dependsOn: "School",
  },
  {
    label: "Chores",
    options: [
      "Chores",
      "Cooking",
      "Laundry",
      "Cleaning",
      "Shopping",
      "Driving",
    ],
    type: "heirarchy",
    dependsOn: "Personal",
  },
  {
    label: "Social",
    options: ["Connecting", "Family Time", "Time w/ Friends"],
    type: "heirarchy",
  },
];
