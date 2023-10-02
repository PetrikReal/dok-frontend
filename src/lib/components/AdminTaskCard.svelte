<script lang="ts">
  import { truncate_to } from '$lib/truncate';
  import { createEventDispatcher } from 'svelte';
  import { pb } from '$lib/pocketbase';

  const dispatch = createEventDispatcher();

  export let id: string;
  export let body: string;
  export let title: string;
  export let due_date: string;

  const deleteTask = async () => {
    await pb.collection('tasks').delete(id);
    dispatch('task-deleted');
  };
</script>

<div class="flex border-t border-zinc-400">
  <a
    href={`/tasks/${id}`}
    class="flex flex-col p-2 hover:bg-zinc-800 w-full border-r border-zinc-400"
  >
    <div class="flex justify-between font-semibold text-xl">
      <h1>{truncate_to(title, 25)}</h1>
      <h1 class="text-emerald-500">{new Date(due_date).toLocaleDateString()}</h1>
    </div>
    <p>
      {truncate_to(body, 45)}
    </p>
  </a>
  <button class="text-red-400 w-[5rem] hover:bg-red-400 hover:text-zinc-800" on:click={deleteTask}>
    <iconify-icon icon="mdi:trash" style="font-size: xx-large;" />
  </button>
</div>
