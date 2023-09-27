<script lang="ts">
  import { pb, currentUser } from '$lib/pocketbase';
  import { page } from '$app/stores';
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

  // title: news.title,
  // body: news.body,
  // author: author_name,
  // image: pb.files.getUrl(news, news.image),
  // created: news.created,
</script>

<main>
  {#if $currentUser}
    <Navbar />
    <main class="bg-zinc-800 m-2 p-2 rounded-lg">
      <h1 class="text-3xl text-center">
        {data.title}
      </h1>
      <img src={data.image} alt="" class="h-auto max-w-lg rounded-lg" />
    </main>
  {:else}
    <Login />
  {/if}
</main>
