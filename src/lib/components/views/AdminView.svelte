<script lang="ts">
  import { pb } from '$lib/pocketbase';
  import AdminTaskCard from '../AdminTaskCard.svelte';
  import type { RecordModel } from 'pocketbase';
  import NewTaskModal from '../modals/NewTaskModal.svelte';

  let create_task_open = false;

  let authored_tasks: RecordModel[] = [];
  const fetch_authored_tasks = async () => {
    authored_tasks = await pb.collection('tasks').getFullList({
      sort: '-created',
      filter: `author.id ?= "${pb.authStore.model.id}"`
    });
  };
</script>

<NewTaskModal
  opened={create_task_open}
  on:task-created={async () => {
    await fetch_authored_tasks();
    create_task_open = false;
  }}
/>
<div>
  <div id="tasks-sec" class="max-w-[30rem] my-4 mx-auto bg-zinc-700 overflow-hidden rounded-xl">
    <div class="p-2">
      <button
        class="px-3 p-2 bg-emerald-600 text-white font-medium rounded-lg flex-col flex mx-auto"
        on:click={() => {
          create_task_open = true;
        }}>Feladat létrehozása</button
      >
    </div>
    <hr class="border-zinc-400" />
    <div id="tasks-authored">
      {#await fetch_authored_tasks()}
        <p class="text-center p-4">Betöltés...</p>
      {:then}
        {#each authored_tasks as task}
        <AdminTaskCard on:task-deleted={async () => { await fetch_authored_tasks() }} id={task.id} body={task.body} title={task.title} due_date={task.due_date}></AdminTaskCard>
        {/each}
      {:catch error}
        <p>Nem sikerült a feladatok betöltése: {error}</p>
      {/await}
    </div>
  </div>
</div>
