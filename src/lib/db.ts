import { createClient } from "@supabase/supabase-js";
import type { Database } from "./schema";

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const getData = (response: { error: any; data: any }) => {
  if (response.error) {
    throw new Error(response.error.message);
  } else {
    return response.data;
  }
};
