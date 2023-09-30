<script lang="ts">
  import NewsCard from '../NewsCard.svelte';
  import type { RecordModel } from 'pocketbase';
  import type { PageData } from '../../../routes/$types';

  export let data: PageData;
  const news: RecordModel[] = data.news;
  console.log(news);
</script>

<main class="flex justify-center">
  <div class="max-w-5xl">
    <div class="bg-zinc-800 p-4 my-5 rounded-lg text-white overflow-auto h-[40rem] 2xl:h-[50rem]">
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
