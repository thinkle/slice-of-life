<script lang="ts">
  /* Based on example from Supabase 
  https://github.com/supabase/supabase/blob/master/examples/todo-list/sveltejs-todo-list/src/lib/Auth.svelte
  */
  import type { Provider } from "@supabase/supabase-js";
  import { supabase } from "./db";
  import {
    TextInput,
    Form,
    FormGroup,
    Button,
    ButtonSet,
    PasswordInput,
  } from "carbon-components-svelte";
  interface HelperText {
    error: boolean | null;
    text: string | null;
  }

  let email: string = "";
  let password: string = "";
  let helperText: HelperText = { error: null, text: null };

  const handleLogin = async (type) => {
    const {
      data: { user },
      error,
    } =
      type === "LOGIN"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (error) {
      helperText = { error: true, text: error.message };
    } else if (!user && !error) {
      helperText = {
        error: false,
        text: "An email has been sent to you for verification!",
      };
    }
  };

  const handleOAuthLogin = async (provider: Provider) => {
    // You need to enable the third party auth you want in Authentication > Settings
    // Read more on: https://supabase.com/docs/guides/auth#third-party-logins
    let { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) console.log("Error: ", error.message);
  };
</script>

<Form>
  <FormGroup>
    <TextInput
      labelText="Email:"
      type="email"
      name="email"
      bind:value={email}
      required
    />
    <PasswordInput labelText="Password:" bind:value={password} />

    {#if !!helperText.text}
      <div>
        {helperText.text}
      </div>
    {/if}
  </FormGroup>

  <ButtonSet stacked={true} style="align-items: end;">
    <Button on:click={() => handleLogin("LOGIN")} type="button">Sign In</Button>
    <Button
      kind="secondary"
      type="submit"
      on:click={() => handleLogin("REGISTER")}
    >
      Sign Up
    </Button>
    <Button
      kind="tertiary"
      on:click={() => handleOAuthLogin("github")}
      type="button"
    >
      GitHub
    </Button>

    <Button
      kind="tertiary"
      on:click={() => handleOAuthLogin("google")}
      type="button"
    >
      Google
    </Button>
  </ButtonSet>
</Form>
