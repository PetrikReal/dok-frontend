<script lang="ts">
  export let title: string;
  export let body: string;
  export let image: string;
  export let href: string;

  // truncate body to 100 characters
  body = body.slice(0, 200) + '...';

  href = `/news/${href}`;
</script>

<div class="w-full bg-zinc-900 p-3 rounded-lg mb-3 flex flex-col">
  <a {href}>
    <h1 class="text-xl text-center">{title}</h1>
    <div class="flex flex-row">
      <div class="w-1/3 aspect-square rounded-lg my-2 overflow-hidden">
        <img src={image} alt="" class="object-cover h-full" />
      </div>
      <p class="text-sm px-3 py-1">
        {body}
      </p>
    </div>
  </a>
</div>
