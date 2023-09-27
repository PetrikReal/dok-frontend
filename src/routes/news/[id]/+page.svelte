<script lang="ts">
  import { pb, currentUser } from '$lib/pocketbase';
  import { page } from '$app/stores';
  import Login from '$lib/components/views/Login.svelte';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  import Navbar from '$lib/components/navbar/Navbar.svelte';
    import NewsCard from '$lib/components/NewsCard.svelte';

  onMount(async () => {
    if (!$currentUser) {
      goto('/');
    }

    const news = await pb.collection('news').getOne($page.params.id);
    console.log(news);
  });
</script>

<main>
  {#if $currentUser}
    <Navbar />
  {:else}
    <Login />
  {/if}
</main>