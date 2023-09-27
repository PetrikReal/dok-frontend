<script lang="ts">
  import { pb } from '$lib/pocketbase';
  import { page } from '$app/stores';
  import type { RecordModel } from 'pocketbase';

  import Navbar from '$lib/components/navbar/Navbar.svelte';

  let news: RecordModel;

  pb.collection('news')
    .getOne($page.params.id)
    .then((res) => {
      news = res;
      console.log(res);
    });

  console.log(news);
</script>

<main>
  <Navbar />
  <div class="">
    {news}
  </div>
</main>
