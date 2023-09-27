<script lang="ts">
  import Navbar from '$lib/components/navbar/Navbar.svelte';
  import Login from '$lib/components/views/Login.svelte';
  import SetupModal from '$lib/components/modals/SetupModal.svelte';
  import UserView from '$lib/components/views/UserView.svelte';
  import { currentUser } from '$lib/pocketbase';
</script>

<div class="w-full h-full">
  {#if $currentUser}
    <Navbar />
    {#if $currentUser.isSetup}
      <UserView />
    {:else}
      <SetupModal />
    {/if}
  {:else}
    <Login />
  {/if}
</div>
