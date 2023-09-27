<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Login from '$lib/components/Login.svelte';
  import { pb, currentUser } from '$lib/pocketbase';
</script>

<div class="bg-slate-700 w-full h-full">
  {#if $currentUser}
    <Navbar />
    {#if $currentUser.isSetup}
      <h1>Welcome to the wonders of Petrik</h1>
    {:else}
      <h1>Welcome to hell, motherfucker</h1>
    {/if}
  {:else}
    <Login />
  {/if}
</div>
