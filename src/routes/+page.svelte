<script lang="ts">
  import Navbar from '$lib/components/navbar/Navbar.svelte';
  import AdminView from '$lib/components/views/AdminView.svelte';
  import Login from '$lib/components/views/Login.svelte';
  import SetupModal from '$lib/components/modals/SetupModal.svelte';
  import NewsView from '$lib/components/views/NewsView.svelte';
  import { currentUser } from '$lib/pocketbase';

  import type { PageData } from './$types';
  export let data: PageData;

  import { tabStore } from '$lib/tabstore';
  import TasksView from '$lib/components/views/TasksView.svelte';
  import AllTasksView from '$lib/components/views/AllTasksView.svelte';
  import { pb } from '$lib/pocketbase';
  const { tab } = tabStore;
</script>

<svelte:head>
  <title>DÖKWeb</title>
</svelte:head>

<div>
  {#if $currentUser}
    <Navbar />
    {#if $currentUser.isSetup}
      <div
        class="py-2 flex flex-row rounded-full border-2 border-zinc-600 visible md:hidden w-fit mx-auto mt-4"
      >
        {#if $tab == 0}
          <p class="mx-2 bg-zinc-950 p-1 px-1.5 rounded-full">News</p>
        {:else}
          <button
            class="mx-2 bg-zinc-700 p-1 px-1.5 rounded-full"
            on:click={() => {
              tabStore.tab.set(0);
            }}>News</button
          >
        {/if}
        {#if $tab == 1}
          <p class="mx-2 bg-zinc-950 p-1 px-1.5 rounded-full">My Tasks</p>
        {:else}
          <button
            class="mx-2 bg-zinc-700 p-1 px-1.5 rounded-full"
            on:click={() => {
              tabStore.tab.set(1);
            }}>My Tasks</button
          >
        {/if}
        {#if $tab == 2}
          <p class="mx-2 bg-zinc-950 p-1 px-1.5 rounded-full">All Tasks</p>
        {:else}
          <button
            class="mx-2 bg-zinc-700 p-1 px-1.5 rounded-full"
            on:click={() => {
              tabStore.tab.set(2);
            }}>All Tasks</button
          >
        {/if}
        {#if pb.authStore.model.isAdmin}
          {#if $tab == 3}
            <p class="mx-2 bg-zinc-950 p-1 px-1.5 rounded-full">Admin</p>
          {:else}
            <button
              class="mx-2 bg-zinc-700 p-1 px-1.5 rounded-full"
              on:click={() => {
                tabStore.tab.set(3);
              }}>Admin</button
            >
          {/if}
        {/if}
      </div>
      {#if $tab == 0}
        <NewsView {data} />
      {:else if $tab == 1}
        <TasksView />
      {:else if $tab == 2}
        <AllTasksView />
      {:else if $tab == 3}
        <AdminView />
      {/if}
    {:else}
      <SetupModal />
    {/if}
  {:else}
    <Login />
  {/if}
</div>
