<script lang="ts">
  import 'iconify-icon';

  export let icon: string;
  export let text: string;
  export let classnames: string = undefined;
  export let onClick: () => void = undefined;
</script>

<button
  class="p-2 hover:bg-slate-300 hover:text-black transition rounded-lg w-full flex flex-row text-sm items-center {classnames}"
  on:click={onClick}
>
  <iconify-icon {icon} class="mr-1" />
  <p>{text}</p>
</button>
