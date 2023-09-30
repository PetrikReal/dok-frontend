<script lang="ts">
  import { currentUser } from '$lib/pocketbase';
  import Login from '$lib/components/views/Login.svelte';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import type { PageData } from '../$types';

  import Navbar from '$lib/components/navbar/Navbar.svelte';

  export let data: PageData;

  interface PageData {
    title: string;
    body: string;
    authorAvatar: string;
    author: string;
    image: string;
    created: string;
  }

  onMount(async () => {
    if (!$currentUser) {
      goto('/');
    }
  });
</script>

<main>
  {#if $currentUser}
    <Navbar />
    <main class="flex justify-center">
      <div class="max-w-5xl">
        <div class="bg-zinc-800 p-4 my-5 rounded-lg text-white overflow-y-auto">
          <img src={data.image} alt="" class="h-72 w-full rounded-lg object-cover" />
          <div class="flex flex-row">
            <img
              src={data.authorAvatar}
              class="w-12 h-12 mt-3 mr-3 rounded-full object-cover"
              alt=""
            />
            <div class="mt-3">
              <p class="text-lg">{data.author}</p>
              <p>{data.created}</p>
            </div>
          </div>
          <div class="mt-3">
            <p>{data.body}</p>
          </div>
        </div>
      </div>
    </main>
  {:else}
    <Login />
  {/if}
</main>
