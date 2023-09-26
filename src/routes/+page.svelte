<script lang="ts">
  import Navbar from '$lib/Navbar.svelte';
  import { pb, currentUser } from '$lib/pocketbase';
</script>

<Navbar />

{#if $currentUser}
  {#if $currentUser.isSetup}
    <h1>Welcome to the wonders of Petrik</h1>
  {:else}
    <h1>Welcome to hell, motherfucker</h1>
  {/if}
{/if}
