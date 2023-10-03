<script lang="ts">
  import { pb } from '$lib/pocketbase';
  import AdminTaskCard from '../AdminTaskCard.svelte';
  import type { RecordModel } from 'pocketbase';
  import NewTaskModal from '../modals/NewTaskModal.svelte';
  import DeleteTaskModal from '../modals/DeleteTaskModal.svelte';
  import EditTaskModal from '../modals/EditTaskModal.svelte';

  let create_task_open = false;

  let delete_task_open = false;
  let delete_task_id = '';
  let delete_task_title = '';

  // If any one of u touches these varibles i will cut ur pp :3 (i will make em disappear soon just wait my little buddies)
  let edit_task_open = false;
  let edit_task_id = '';
  let edit_task_title = '';
  let edit_task_body = '';
  let edit_task_due_date: Date;

  let authored_tasks: RecordModel[] = [];
  const fetch_authored_tasks = async () => {
    authored_tasks = await pb.collection('tasks').getFullList({
      sort: '-created',
      filter: `author.id ?= "${pb.authStore.model.id}"`
    });
  };

  const openEditTaskModal = (event: any) => {
    edit_task_id = event.detail.id;
    edit_task_title = event.detail.title;
    edit_task_body = event.detail.body;
    edit_task_due_date = event.detail.due_date;
    edit_task_open = true;
  };

  const openDeleteTaskModal = (event: any) => {
    delete_task_id = event.detail.id;
    delete_task_title = event.detail.title;
    delete_task_open = true;
  };
</script>

<EditTaskModal
  on:task-edited={async () => {
    await fetch_authored_tasks();
    edit_task_open = false;
  }}
  opened={edit_task_open}
  id={edit_task_id}
  due_date={edit_task_due_date}
  body={edit_task_body}
  title={edit_task_title}
  on:closed={() => {
    edit_task_open = false;
  }}
/>
<DeleteTaskModal
  on:close={() => {
    delete_task_open = false;
  }}
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
  <div id="tasks-sec" class="max-w-[35rem] my-4 mx-auto bg-zinc-700 overflow-hidden rounded-xl">
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
            on:edit-task={openEditTaskModal}
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
