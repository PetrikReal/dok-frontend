<script lang="ts">
  import { pb } from '$lib/pocketbase';
  import AdminTaskCard from '../AdminTaskCard.svelte';
  import type { RecordModel } from 'pocketbase';
  import NewTaskModal from '../modals/NewTaskModal.svelte';
  import DeleteTaskModal from '../modals/DeleteTaskModal.svelte';

  let create_task_open = false;
  let delete_task_open = false;
  let delete_task_id = '';
  let delete_task_title = '';

  let authored_tasks: RecordModel[] = [];
  const fetch_authored_tasks = async () => {
    authored_tasks = await pb.collection('tasks').getFullList({
      sort: '-created',
      filter: `author.id ?= "${pb.authStore.model.id}"`
    });
  };

  const openDeleteTaskModal = (event: any) => {
    delete_task_id = event.detail.id;
    delete_task_title = event.detail.title;
    delete_task_open = true;
  };
</script>

<DeleteTaskModal
  opened={delete_task_open}
  id={delete_task_id}
  title={delete_task_title}
  on:deleted-task={async () => {
    await fetch_authored_tasks();
    delete_task_open = false;
  }}
/>
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
          <AdminTaskCard
            on:delete-task={openDeleteTaskModal}
            on:task-deleted={async () => {
              await fetch_authored_tasks();
            }}
            id={task.id}
            body={task.body}
            title={task.title}
            due_date={task.due_date}
          />
        {/each}
      {:catch error}
        <p>Nem sikerült a feladatok betöltése: {error}</p>
      {/await}
    </div>
  </div>
</div>
