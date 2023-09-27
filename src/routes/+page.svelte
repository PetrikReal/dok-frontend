<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Login from '$lib/components/Login.svelte';
  import SetupModal from '$lib/components/SetupModal.svelte';
  import { currentUser } from '$lib/pocketbase';
</script>

<div class="w-full h-full">
  {#if $currentUser}
    <Navbar />
    {#if $currentUser.isSetup}
      <h1>Welcome to the wonders of Petrik</h1>
    {:else}
      <SetupModal />
    {/if}
  {:else}
    <Login />
  {/if}
</div>
