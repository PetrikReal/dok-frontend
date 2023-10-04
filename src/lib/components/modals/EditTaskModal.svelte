<script lang="ts">
  import { Modal } from '@svelteuidev/core';
  import { pb } from '$lib/pocketbase';
  import { createEventDispatcher } from 'svelte';
    import type { RecordModel } from 'pocketbase';
  const dispatch = createEventDispatcher();

  export let opened = true;
  let disabled = true;

  export let id: string;
  
  let title: string;
  let task: RecordModel;
  const fetchTask = async () => {
    task = await pb.collection('tasks').getOne(id);
    title = task.title;
  };

  let titleError: string = '';

  const updateUserInfo = async () => {
    const data = {
      title: task.title,
      body: task.body,
    };
    const record = await pb.collection('tasks').update(id, data);
    dispatch('task-edited');
  };
</script>

<Modal {opened} withCloseButton={false} title="Feladat szerkesztése">
  {#await fetchTask()}
  <p>loading...</p>
  {:then}
  <p class="mb-3 text-center">A {title} című feladatot szerkeszted</p>
  
  <div class="flex flex-col">
    <label for="userName">Cím</label>
    <label for="userName" class="text-red-500">{titleError}</label>
  </div>
  <input
    id="userName"
    type="text"
    placeholder="3-48 karakter"
    class="bg-zinc-700 w-full mb-2 p-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-emerald-600"
    bind:value={task.title}
  />
  <label for="fullName">Szöveg test</label>
  <input
    id="fullName"
    type="text"
    placeholder="A feladat az, hogy..."
    class="bg-zinc-700 w-full mb-2 p-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-emerald-600"
    bind:value={task.body}
  />
  {:catch error}
  <p>Got error: {error}</p>
  {/await}

  <button
    class="bg-rose-600 disabled:bg-rose-950 disabled:hover:bg-rose-950 disabled:cursor-not-allowed text-white p-2 rounded-lg mt-3 w-full transition hover:bg-rose-700"
    on:click={() => dispatch('closed')}
  >
    Mégse
  </button>

  <button
    class="bg-emerald-600 disabled:bg-emerald-950 disabled:hover:bg-emerald-950 disabled:cursor-not-allowed text-white p-2 rounded-lg mt-3 w-full transition hover:bg-emerald-700"
    on:click={updateUserInfo}
  >
    Mentés
  </button>
</Modal>
