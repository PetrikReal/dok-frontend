<script lang="ts">
  import NewsCard from '../NewsCard.svelte';
  import { pb } from '$lib/pocketbase';
  import type { RecordModel } from 'pocketbase';
  import { Container } from '@svelteuidev/core';
  let news: RecordModel[] = [];
  let assigned_tasks: RecordModel[] = [];
  pb.collection('news')
    .getFullList({ sort: '-created' })
    .then((res: RecordModel[]) => {
      news = res;
    });
  const fetch_assigned_tasks = async () => {
    assigned_tasks = await pb.collection('tasks').getFullList({
      filter: `assigned_to.id ?= "${pb.authStore.model.id}"`
    })
    console.log(assigned_tasks)
  }
  
</script>

<main class="">
  <div class="grid grid-cols-2 grid-rows-1 gap-3 m-3 h-screen">
    <div class="bg-zinc-800 p-2 rounded-lg text-white overflow-y-auto"> <!-- Adjust max-height as needed -->
      <h1 class="text-xl text-center mb-2">Hírek</h1>
      {#each news as item}
        <NewsCard
          title={item.title}
          body={item.body}
          image={pb.files.getUrl(item, item.image)}
          href={item.id}
        />
      {/each}
    </div>
    <div class="bg-zinc-800 p-2 rounded-lg text-white">
      <div class="grid grid-cols-1 grid-rows-2 gap-3 h-full">
        <div class="h-3/6">
          <h1 class="text-xl text-center mb-2">Feladatok</h1>
        </div>
        {#await fetch_assigned_tasks()}
          <p>loading...</p>
        {:then}
        <div class="h-3/6">
          <h1 class="text-xl text-center mb-2">Feladataim</h1>
          
          <div class="flex flex-col">
            {#each assigned_tasks as task}
              <div>
                <h1>{task.id}</h1>
              </div>
            {/each}
          </div>
        </div>
        {:catch error}
        <p>Cannot get your tasks :c ERROR: {error}</p>
        {/await}
      </div>
    </div>
  </div>
</main>
