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
      <main class="flex justify-center">
        <div class="max-w-5xl">
          <div class="bg-zinc-800 p-4 my-5 rounded-lg text-white overflow-y-auto">
            <h1 class="text-4xl text-center py-4 font-black">{data.title}</h1>
            <div class="flex flex-row">
              <img src={data.authorAvatar} class="w-12 h-12 mr-3 rounded-full object-cover" alt="" />
              <div class="">
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
  