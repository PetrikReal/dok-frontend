<script lang="ts">
  import NewsCard from '../NewsCard.svelte';
  import { pb } from '$lib/pocketbase';
  import type { RecordModel } from 'pocketbase';
  import type { PageData } from '../../../routes/$types';
  // let news: RecordModel[] = [];
  // pb.collection('news')
  //   .getFullList({ sort: '-created' })
  //   .then((res: RecordModel[]) => {
  //     news = res;
  //   });
  export let data: PageData;
  const news: RecordModel[] = data.news;
  console.log(news)
</script>

<main class="flex justify-center">
  <div class="max-w-5xl">
    <div class="bg-zinc-800 p-4 my-5 rounded-lg text-white overflow-auto" style="height: 40rem">
      {#each news as item}
      <NewsCard
      title={item.title}
      body={item.body}
      image={item.image}
      href={item.id}
      author={item.author}
      created={item.created}
      authorAvatar={item.authorAvatar}
      />
      {/each}
    </div>
  </div>
</main>
