import type {
  Activity,
  ActivityInsert,
  ActivityTag,
  ActivityTagInsert,
  ActivityTagAssignmentInsert,
  ActivityUserInsert,
  User,
  ActivityUser,
} from "$lib/dbTypes";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase, getData } from "./db";

export type ActivityObject = ActivityInsert & {
  tags: Partial<ActivityTag> & { id: string }[];
  users: Partial<User> & { id: string }[];
};

export const createActivity = async (activity: ActivityObject) => {
  console.log("createActivity", activity);
  let users = activity.users;
  let tags = activity.tags;
  let completeActivity: Activity = await insertActivity();
  let activityId = completeActivity.id;
  // Next let's add the tags...
  let completeTags = await insertTags(activityId, tags);
  let completeUsers = await insertUsers(activityId, users);
  console.log("Created activity", {
    ...completeActivity,
    users: completeUsers,
    tags: completeTags,
  });
  return {
    ...completeActivity,
    users: completeUsers,
    tags: completeTags,
  };

  async function insertActivity() {
    let activityInsert: ActivityInsert = {
      creator: activity.creator,
      description: activity.description,
      duration: activity.duration,
      timestamp: activity.timestamp,
    };
    // First we create the activity...
    let data = getData(
      await supabase.from("activities").insert([activityInsert]).select()
    ) as Activity[];
    return data[0];
  }

  /* Add tags, and return tags as added */
  async function insertTags(activityId: string, tags: { id: string }[]) {
    let activityTagAssignments: ActivityTagAssignmentInsert[] = [];
    // Build tag assignment row
    tags.forEach((tag) => {
      if (tag.id) {
        activityTagAssignments.push({
          activity_id: activityId,
          tag_id: tag.id,
        });
      } else {
        console.log("Ignoring unknown tag", tag); // FIX ME
      }
    });
    // getData gives us a free error check
    // We will actually do a separate query to get the assignments so we get all
    // assignments and not just those we just added (just in case).
    getData(
      await supabase
        .from("activity_tag_assignments")
        .insert(activityTagAssignments)
    );
    // Fetch all tags for activity
    let tagResponse = await supabase
      .from("activity_tag_assignments")
      .select("activity_tags(*)")
      .eq("activity_id", activityId);
    let completeTags: ActivityTag[] = getData(tagResponse).map(
      (ata: { activity_tags: ActivityTag }) => ata.activity_tags
    );
    return completeTags;
  }

  async function insertUsers(activityId: string, users: { id: string }[]) {
    let activityUserAssignments: ActivityUserInsert[] = [];
    users.forEach((user) => {
      if (user.id) {
        activityUserAssignments.push({
          activity_id: activityId,
          user_id: user.id,
        });
      } else {
        console.log("Ignoring unknown user", user); // FIX ME
      }
    });
    // getData gives us a free error check
    let response = getData(
      await supabase.from("activity_users").insert(activityUserAssignments)
    );
    // Fetch list of all users assigned to activity
    let userResponse = await supabase
      .from("activity_users")
      .select("users(*)")
      .eq("activity_id", activityId);
    let completeUsers: User[] = getData(userResponse).map(
      (responseData: { users: User }) => responseData.users
    );
    return completeUsers;
  }
};
