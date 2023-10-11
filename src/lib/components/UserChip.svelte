<script lang="ts">
  import { pb } from '$lib/pocketbase';
  import type { RecordModel } from 'pocketbase';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let id: string;

  let user: RecordModel;

  const fetchUser = async () => {
    user = await pb.collection('users').getOne(id);
  };
</script>

{#await fetchUser()}
  <p>Loading...</p>
{:then}
  <div class="flex items-center bg-zinc-800 p-2 border border-zinc-600 rounded-lg justify-between">
    <div class="flex items-center">
      <img
        class="w-14 h-14 rounded-full"
        src={pb.files.getUrl(user, user.avatar)}
        alt={user.name}
      />
      <h1 class="font-medium text-xl ml-2">{user.name}</h1>
    </div>
    <button
      class="text-red-400 h-10 w-10 flex items-center text-3xl hover:bg-red-400 hover:text-zinc-800 rounded-full"
      on:click={() => {
        dispatch('delete', { id: user.id });
      }}><iconify-icon icon="ph:x" class="mx-auto" /></button
    >
  </div>
{:catch error}
  <p>Got error: {error}</p>
{/await}
