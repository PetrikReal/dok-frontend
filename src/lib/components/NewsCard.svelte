<script lang="ts">
  export let title: string;
  export let body: string;
  export let image: string;
  export let href: string;
  export let author: string = 'Anonymous';

  href = `/news/${href}`;
</script>

<div class="w-full bg-zinc-900 p-3 rounded-lg">
  <a {href}>
    <h1 class="text-lg text-center">{title}</h1>
    <img src={image} alt="" class="h-72 w-full rounded-lg my-2 object-cover" />
    <p class="truncate">
      {body}
    </p>
  </a>
</div>
