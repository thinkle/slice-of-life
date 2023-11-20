import type { Database } from "./schema";
export type Activity = Database["public"]["Tables"]["activities"]["Row"];
export type ActivityInsert =
  Database["public"]["Tables"]["activities"]["Insert"];
export type ActivityUpdate =
  Database["public"]["Tables"]["activities"]["Update"];
export type ActivityTagAssignment =
  Database["public"]["Tables"]["activity_tag_assignments"]["Row"];
export type ActivityTagAssignmentInsert =
  Database["public"]["Tables"]["activity_tag_assignments"]["Insert"];
export type ActivityTagAssignmentUpdate =
  Database["public"]["Tables"]["activity_tag_assignments"]["Update"];
export type ActivityTag = Database["public"]["Tables"]["activity_tags"]["Row"];
export type ActivityTagInsert =
  Database["public"]["Tables"]["activity_tags"]["Insert"];
export type ActivityTagUpdate =
  Database["public"]["Tables"]["activity_tags"]["Update"];
export type ActivityUser =
  Database["public"]["Tables"]["activity_users"]["Row"];
export type ActivityUserInsert =
  Database["public"]["Tables"]["activity_users"]["Insert"];
export type ActivityUserUpdate =
  Database["public"]["Tables"]["activity_users"]["Update"];
export type GroupMember = Database["public"]["Tables"]["group_members"]["Row"];
export type GroupMemberInsert =
  Database["public"]["Tables"]["group_members"]["Insert"];
export type GroupMemberUpdate =
  Database["public"]["Tables"]["group_members"]["Update"];
export type Group = Database["public"]["Tables"]["groups"]["Row"];
export type GroupInsert = Database["public"]["Tables"]["groups"]["Insert"];
export type GroupUpdate = Database["public"]["Tables"]["groups"]["Update"];
export type SchemaVersion =
  Database["public"]["Tables"]["schema_version"]["Row"];
export type SchemaVersionInsert =
  Database["public"]["Tables"]["schema_version"]["Insert"];
export type SchemaVersionUpdate =
  Database["public"]["Tables"]["schema_version"]["Update"];
export type User = Database["public"]["Tables"]["users"]["Row"];
export type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
export type UserUpdate = Database["public"]["Tables"]["users"]["Update"];
