<script lang="ts">
  import Navbar from '$lib/components/navbar/Navbar.svelte';
  import Login from '$lib/components/views/Login.svelte';
  import SetupModal from '$lib/components/modals/SetupModal.svelte';
  import NewsView from '$lib/components/views/NewsView.svelte';
  import { currentUser } from '$lib/pocketbase';

  import type { PageData } from './$types';
  export let data: PageData;

  import { tabStore } from '$lib/tabstore';
    import TasksView from '$lib/components/views/TasksView.svelte';
  const { tab } = tabStore;
</script>

<div class="w-full h-full">
  {#if $currentUser}
    <Navbar />
    {#if $currentUser.isSetup}
      {#if $tab == 0}
      <NewsView data={data}/>
      {:else if $tab == 1}
      <TasksView></TasksView>
      {:else}
      <p>My tasks :3</p>
      {/if}

    {:else}
      <SetupModal />
    {/if}
  {:else}
    <Login />
  {/if}
</div>
