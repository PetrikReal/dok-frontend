<script lang="ts">
  import type { RecordModel } from 'pocketbase';
  import { pb } from '$lib/pocketbase';
  import TaskCard from '../TaskCard.svelte';
  let assigned_tasks: RecordModel[] = [];
  const fetch_assigned_tasks = async () => {
    assigned_tasks = await pb.collection('tasks').getFullList({
      filter: `assigned_to.id ?= "${pb.authStore.model.id}"`
    });
  };
</script>

<div>
  {#await fetch_assigned_tasks()}
    <p>loading...</p>
  {:then}
    <div class="h-3/6">
      <h1 class="text-xl text-center mb-2">Feladataim</h1>

      <div class="flex flex-col">
        {#each assigned_tasks as task}
          <TaskCard title={task.title} body={task.body} due_date={task.due_date} id={task.id} />
        {/each}
      </div>
    </div>
  {:catch error}
    <p>Cannot get your tasks :c ERROR: {error}</p>
  {/await}
</div>