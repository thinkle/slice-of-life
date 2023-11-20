export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      activities: {
        Row: {
          creator: string | null
          description: string | null
          duration: number | null
          id: string
          timestamp: string | null
        }
        Insert: {
          creator?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          timestamp?: string | null
        }
        Update: {
          creator?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activities_creator_fkey"
            columns: ["creator"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      activity_tag_assignments: {
        Row: {
          activity_id: string
          tag_id: string
        }
        Insert: {
          activity_id: string
          tag_id: string
        }
        Update: {
          activity_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_tag_assignments_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_tag_assignments_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "activity_tags"
            referencedColumns: ["id"]
          }
        ]
      }
      activity_tags: {
        Row: {
          id: string
          name: string | null
          parent_tag_id: string | null
        }
        Insert: {
          id?: string
          name?: string | null
          parent_tag_id?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          parent_tag_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_tags_parent_tag_id_fkey"
            columns: ["parent_tag_id"]
            isOneToOne: false
            referencedRelation: "activity_tags"
            referencedColumns: ["id"]
          }
        ]
      }
      activity_users: {
        Row: {
          activity_id: string
          user_id: string
        }
        Insert: {
          activity_id: string
          user_id: string
        }
        Update: {
          activity_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_users_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      group_members: {
        Row: {
          group_id: string
          user_id: string
        }
        Insert: {
          group_id: string
          user_id: string
        }
        Update: {
          group_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      groups: {
        Row: {
          id: string
          name: string | null
        }
        Insert: {
          id?: string
          name?: string | null
        }
        Update: {
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      schema_version: {
        Row: {
          applied_on: string | null
          version_id: number
          version_number: number | null
        }
        Insert: {
          applied_on?: string | null
          version_id?: number
          version_number?: number | null
        }
        Update: {
          applied_on?: string | null
          version_id?: number
          version_number?: number | null
        }
        Relationships: []
      }
      users: {
        Row: {
          email: string | null
          id: string
          name: string | null
        }
        Insert: {
          email?: string | null
          id: string
          name?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
