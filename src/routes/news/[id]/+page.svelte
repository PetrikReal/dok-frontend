<script lang="ts">
  import { currentUser } from '$lib/pocketbase';
  import Login from '$lib/components/views/Login.svelte';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import type { PageData } from '../$types';

  import Navbar from '$lib/components/navbar/Navbar.svelte';

  export let data: PageData;

  onMount(async () => {
    if (!$currentUser) {
      goto('/');
    }
  });
</script>

<main>
  {#if $currentUser}
    <Navbar />
    <div class="grid grid-cols-2 grid-rows-1">
      <main class="bg-zinc-800 m-2 p-2 rounded-lg">
        <div class="flex justify-center">
          <img src={data.image} alt="" class="h-72 w-full rounded-lg object-cover" />
        </div>
      </main>
      <div class="bg-zinc-800 m-2 p-2 rounded-lg">
        <div>
          <h1 class="text-3xl text-center">
            {data.title}
          </h1>
          <h1 class="text-xl text-center">
            Írta: {data.author} - {data.created}
          </h1>
          <p class="p-4">
            {data.body}
          </p>
        </div>
      </div>
    </div>
  {:else}
    <Login />
  {/if}
</main>
