<script lang="ts">
  import Login from '$lib/components/Login.svelte';
  import { pb, currentUser } from '../pocketbase';

  let isMenuOpen = false;
</script>

<nav class="bg-slate-800 text-white p-3 flex flex-row items-center justify-between px-4">
  {#if $currentUser}
    <p>Signed in as {$currentUser.username}</p>
    <button
      on:click={() => {
        isMenuOpen = !isMenuOpen;
        console.log(isMenuOpen);
      }}
    >
      <img
        src={pb.files.getUrl($currentUser, $currentUser.avatar)}
        alt="Avatar"
        class="w-10 h-10 rounded-full border-white border-2 p-0.5"
      />
    </button>
    {#if isMenuOpen}
      <div
        id="usermenu"
        class="absolute mt-14 mr-3 top-0 right-0 w-48 bg-slate-800 text-white border p-3 rounded shadow-md hidden"
      >
        <button class="pb-3 w-full text-left">Nothing button</button>
        <hr class="pb-3" />
        <button
          class="w-full text-left"
          on:click={() => {
            pb.authStore.clear();
          }}>Sign Out</button
        >
      </div>
    {/if}
  {:else}
    <Login />
  {/if}
</nav>
