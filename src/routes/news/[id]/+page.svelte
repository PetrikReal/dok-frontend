<script lang="ts">
  import { pb, currentUser } from '$lib/pocketbase';
  import { page } from '$app/stores';
  import Login from '$lib/components/views/Login.svelte';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  import Navbar from '$lib/components/navbar/Navbar.svelte';

  onMount(() => {
    if (!$currentUser) {
      goto('/');
    }
  });

  // pb.collection('news')
  //   .getOne($page.params.id)
  //   .then((res) => {
  //     news = res;
  //     console.log(res);
  //   });

  try {
    const news = pb.collection('news').getOne($page.params.id);
  } catch (error) {
    console.log(error);
  }
</script>

<main>
  {#if $currentUser}
    <Navbar />
    <div class="" />
  {:else}
    <Login />
  {/if}
</main>
