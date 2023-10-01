<script lang="ts">
    import { pb } from "$lib/pocketbase";
    import { truncate_to } from "$lib/truncate";
    import type { RecordModel } from "pocketbase";
    import NewTaskModal from "../modals/NewTaskModal.svelte";

    let authored_tasks: RecordModel[] = [];
    const fetch_authored_tasks = async () => {
        authored_tasks = await pb.collection('tasks').getFullList({
            sort: "-created",
            filter: `author.id ?= "${pb.authStore.model.id}"`
        })
    }
</script>

<div>
  <div id="tasks-sec" class="max-w-[30rem] my-4 mx-auto bg-zinc-700 overflow-hidden rounded-xl">
  <div class="p-2">
    <button
      class="px-3 p-2 bg-emerald-600 text-white font-medium rounded-lg flex-col flex mx-auto"
      on:click={() => {
        new NewTaskModal({target: document.body})
      }}
      >Feladat létrehozása</button
    >

  </div>
    <hr class="border-zinc-400"/>
    <div id="tasks-authored">
    {#await fetch_authored_tasks()}
    <p class="text-center p-4">Betöltés...</p>
    {:then}
    {#each authored_tasks as task}
      <div class="p-2 bg-zinc-700 border-b border-zinc-500 hover:bg-zinc-800">
        <div class="flex justify-between">
          <h1 class="text-xl font-semibold">{truncate_to(task.title, 25)}</h1>
          <h1 class="text-xl font-semibold">{new Date(task.due_date).toLocaleDateString()}</h1>
        </div>
        <p>{truncate_to(task.body, 42)}</p>
      </div>
      {/each}
    {:catch error}
    <p>Nem sikerült a feladatok betöltése: {error}</p>
      {/await}
    </div>
  </div>
</div>
