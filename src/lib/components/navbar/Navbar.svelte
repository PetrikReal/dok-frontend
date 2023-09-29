<script lang="ts">
  import Menu from './Menu.svelte';
  import Icon from './Icon.svelte';
  import { tabStore } from '$lib/tabstore';
  const { tab } = tabStore;
</script>

<nav class="bg-zinc-800 text-white p-3 flex flex-row items-center justify-between px-4">
  <Icon />

  <div class="py-2 flex flex-row rounded-full border-2 border-white">
    {#if $tab == 0}
    <p class="mx-2 bg-zinc-950 p-1 px-1.5 rounded-full">News</p>
    {:else}
    <button class="mx-2 bg-zinc-700 p-1 px-1.5 rounded-full" on:click={() => {tabStore.tab.set(0)}}>News</button>
    {/if}
    {#if $tab == 1}
    <p class="mx-2 bg-zinc-950 p-1 px-1.5 rounded-full">My Tasks</p>
    {:else}
    <button class="mx-2 bg-zinc-700 p-1 px-1.5 rounded-full" on:click={() => {tabStore.tab.set(1)}}>My Tasks</button>
    {/if}
    {#if $tab == 2}
    <p class="mx-2 bg-zinc-950 p-1 px-1.5 rounded-full">All Tasks</p>
    {:else}
    <button class="mx-2 bg-zinc-700 p-1 px-1.5 rounded-full" on:click={() => {tabStore.tab.set(2)}}>All Tasks</button>
    {/if}
  </div>

  <Menu />
</nav>
