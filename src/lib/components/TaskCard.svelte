<script lang="ts">
  export let title: string;
  export let body: string;
  export let due_date: string;
  export let id: string;

  // truncate body to 100 characters
  if (body.length > 100) {
    body = body.slice(0, 200) + '...';
  }

  const href = `/tasks/${id}`;
</script>

<div class="w-full bg-zinc-900 overflow-hidden rounded-lg mb-3 flex flex-col">
  <a {href}>
    <div class="flex justify-between p-4 bg-zinc-700">
      <h1 class="text-xl font-medium">{title}</h1>
      <div class="flex items-center">
        <h1 class="text-xl font-medium text-teal-500">
          {new Date(due_date).toLocaleDateString()}
        </h1>
        <iconify-icon icon="uiw:date" class="ml-2 text-teal-500" />
      </div>
    </div>
    <hr />
    <div class="flex flex-row">
      <p class="text-sm p-2">
        {body}
      </p>
    </div>
  </a>
</div>
