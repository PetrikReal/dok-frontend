<script lang="ts">
  export let title: string;
  export let body: string;
  export let image: string;
  export let href: string;
  export let author: string;
  export let created: string;
  export let authorAvatar: string;

  import { pb } from "$lib/pocketbase";

  // truncate body to 100 characters
  body = body.slice(0, 400) + '...';

  href = `/news/${href}`;
  console.log(created)
</script>

<div class="w-full bg-zinc-900 p-3 rounded-lg mb-3 last:mb-0 flex flex-col">
  <a {href}>
    <div class="flex flex-row">
      <div class="w-1/4 aspect-square rounded-lg my-2 overflow-hidden">
        <img src={image} alt="" class="object-cover h-full w-full" />
      </div>
      <div class="w-3/4 flex flex-col">
        <h1 class="text-xl text-center">{title}</h1>

        <div class="flex flex-col h-full">
          <p class="text-sm px-3 py-1 h-full">
            {body}
          </p>

          <div class="mx-3 w-full flex flex-row mb-2 text-right justify-end">
            <div class="">
              <h1 class="text-md">{author}</h1>
              <h1 class="text-md">{created}</h1>
            </div>
            <img src={authorAvatar} alt="Author avatar" class="w-12 h-12 ml-3 mr-5 rounded-full object-cover" />  
          </div>
        </div>
      </div>
    </div>
  </a>
</div>
