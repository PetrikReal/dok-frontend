<script lang="ts">
  import Menu from './Menu.svelte';
  import Icon from './Icon.svelte';
</script>

<nav class="bg-zinc-800 text-white p-3 flex flex-row items-center justify-between px-4">
  <Icon />

  <div class="py-2 flex flex-row rounded-full border-2 border-white">
    <p class="mx-2 bg-zinc-700 p-1 px-1.5 rounded-full">Tasks</p>
    <p class="mx-2 bg-zinc-950 p-1 px-1.5 rounded-full">Tasks</p>
    <p class="mx-2 bg-zinc-700 p-1 px-1.5 rounded-full">Tasks</p>
  </div>

  <Menu />
</nav>
