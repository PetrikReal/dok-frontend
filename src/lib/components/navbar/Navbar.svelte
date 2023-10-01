<script lang="ts">
  import Menu from './Menu.svelte';
  import Icon from './Icon.svelte';
  import { pb } from '$lib/pocketbase';
  import { tabStore } from '$lib/tabstore';
  import { page } from '$app/stores';
  const { tab } = tabStore;
</script>

<nav class="bg-zinc-800 text-white p-3 flex flex-row items-center justify-between px-4">
  <Icon />

  {#if $page.url.pathname == '/'}
    <div class="py-2 flex-row rounded-full border-2 border-white hidden md:flex">
      {#if $tab == 0}
        <p class="mx-2 bg-zinc-950 p-1 px-1.5 rounded-full">Hírek</p>
      {:else}
        <button
          class="mx-2 bg-zinc-700 p-1 px-1.5 rounded-full"
          on:click={() => {
            tabStore.tab.set(0);
          }}>Hírek</button
        >
      {/if}
      {#if $tab == 1}
        <p class="mx-2 bg-zinc-950 p-1 px-1.5 rounded-full">Feladataim</p>
      {:else}
        <button
          class="mx-2 bg-zinc-700 p-1 px-1.5 rounded-full"
          on:click={() => {
            tabStore.tab.set(1);
          }}>Feladataim</button
        >
      {/if}
      {#if $tab == 2}
        <p class="mx-2 bg-zinc-950 p-1 px-1.5 rounded-full">Feladatok</p>
      {:else}
        <button
          class="mx-2 bg-zinc-700 p-1 px-1.5 rounded-full"
          on:click={() => {
            tabStore.tab.set(2);
          }}>Feladatok</button
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
  {/if}

  <Menu />
</nav>
