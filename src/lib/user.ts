import { writable } from "svelte/store";
import type { Readable } from "svelte/store";
import { supabase } from "./db";
import { browser } from "$app/environment";
import type { User } from "@supabase/supabase-js";

const createUserStore = () => {
  const { subscribe, set } = writable(null);

  if (browser) {
    supabase.auth.getSession().then(({ data: { session } }) => {
      set(session?.user ?? null);
    });

    supabase.auth.onAuthStateChange((_, session) => {
      set(session?.user ?? null);
    });
  }

  return {
    subscribe,
    logout: async () => {
      if (browser) {
        await supabase.auth.signOut();
      }
      set(null);
    },
    // Additional functionality as needed
  };
};

export const user: Readable<User | null> = createUserStore();
