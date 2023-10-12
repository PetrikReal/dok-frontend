<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { pb } from '$lib/pocketbase';
  import boti from '$lib/img/boti.jpg';

  let count: number;
  let target: number;
  let unsubscribe: () => void;
  let botiStyle = '';

  onMount(async () => {
    // Get initial messages
    const countResult = await pb.collection('boti').getOne('boti_counter_69');
    count = countResult.count;

    const targetResult = await pb.collection('boti').getOne('target_counter_');
    target = targetResult.count;

    // Subscribe to realtime messages
    unsubscribe = await pb
      .collection('boti')
      .subscribe('boti_counter_69', async ({ action, record }) => {
        if (action === 'update') {
          count = record.count;
        }
      });
  });

  // Unsubscribe from realtime messages
  onDestroy(() => {
    unsubscribe?.();
  });

  async function updateCount() {
    const newCount = {
      count: count + 1
    };
    await pb.collection('boti').update('boti_counter_69', newCount);
    botiStyle = `transform: translate(${Math.floor(Math.random() * 80)}vw, ${Math.floor(
      Math.random() * 80
    )}vh);`;
  }
</script>

<div class="flex flex-col justify-center items-center h-screen">
  <p class="text-4xl">Kiszavazás!</p>
  <p class="text-3xl">{count}/{target}</p>
  <img src={boti} class="h-96 m-3 rounded-lg" alt="boti" />
  <button
    class="h-14 text-xl bg-green-500 text-white px-2 rounded-lg shadow-lg absolute top-0 left-0 z-50 select-none"
    style={botiStyle}
    on:click={updateCount}
    tabindex="-1"
  >
    Még!
  </button>
</div>
