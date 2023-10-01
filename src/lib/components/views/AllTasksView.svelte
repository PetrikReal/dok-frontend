<script lang="ts">
    import type { RecordModel } from 'pocketbase';
    import { pb } from '$lib/pocketbase';
    import TaskCard from '../TaskCard.svelte';
    let assigned_tasks: RecordModel[] = [];
    const fetch_assigned_tasks = async () => {
      assigned_tasks = await pb.collection('tasks').getFullList();
    };
  </script>
  
  <div>
    {#await fetch_assigned_tasks()}
      <p class="text-center p-4">Betöltés...</p>
    {:then}
      <div class="h-3/6 md:w-[35rem] xl:w-2/4 mx-auto">
        <h1 class="text-xl text-center mb-2 mt-2">Feladatok</h1>
  
        <div class="flex flex-col">
          {#each assigned_tasks as task}
            <TaskCard title={task.title} body={task.body} due_date={task.due_date} id={task.id} />
          {/each}
        </div>
      </div>
    {:catch error}
      <p>Nem sikerült a feladatok betöltése: {error}</p>
    {/await}
  </div>
  