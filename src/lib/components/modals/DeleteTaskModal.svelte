<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Modal } from '@svelteuidev/core';
    import { pb } from '$lib/pocketbase';

  const dispatch = createEventDispatcher();

  export let opened = true;
  export let id: string;
  export let title: string;
  
  const deleteTask = async () => {
    await pb.collection('tasks').delete(id)
    console.log(`[Deleted task -> ${id}]`)
    dispatch('deleted-task')
  }
</script>

<Modal {opened} title="Feladat törlése" withCloseButton={false}>
    <div>
        Biztosan törlöd a "{title}" nevű feladatot?
    </div>
  <div class="flex flex-row gap-3">
    <button
      class="bg-emerald-600 disabled:bg-emerald-950 disabled:hover:bg-emerald-950 disabled:cursor-not-allowed text-white p-2 rounded-lg mt-3 w-full transition hover:bg-emerald-700"
      on:click={() => {
        opened = false;
      }}
    >
      Mégse
    </button>

    <button
      class="bg-rose-600 disabled:bg-emerald-950 disabled:hover:bg-emerald-950 disabled:cursor-not-allowed text-white p-2 rounded-lg mt-3 w-full transition hover:bg-rose-700"
      on:click={deleteTask}
    >
      Törlés
    </button>
  </div>
</Modal>
