<script lang="ts">
  import NewsCard from '../NewsCard.svelte';
  import { pb } from '$lib/pocketbase';
  import type { RecordModel } from 'pocketbase';
  let news: RecordModel[] = [];
  pb.collection('news')
    .getFullList({ sort: '-created' })
    .then((res: RecordModel[]) => {
      news = res;
    });
</script>

<main class="">
  <div class="grid grid-cols-2 grid-rows-1 gap-3 m-3">
    <div class="bg-zinc-800 p-2 rounded-lg text-white">
      <h1 class="text-xl text-center mb-2">Hírek</h1>
      {#each news as item}
        <NewsCard
          title={item.title}
          body={item.body}
          image={pb.files.getUrl(item, item.image)}
          href={item.id}
          author={item.author}
        />
      {/each}
    </div>
    <div class="bg-zinc-800 p-2 rounded-lg text-white">
      <div class="h-full flex flex-col justify-between">
        <div class="">
          <h1 class="text-xl text-center mb-2">Feladatok</h1>
        </div>
        <div class="">
          <h1 class="text-xl text-center mb-2">Feladataim</h1>
        </div>
      </div>
    </div>
  </div>
</main>
