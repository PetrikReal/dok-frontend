<script lang="ts">
  import { pb } from '$lib/pocketbase';
  import type { RecordModel } from 'pocketbase';

  export let id: string;

  let user: RecordModel;

  const fetchUser = async () => {
    user = await pb.collection('users').getOne(id);
  };
</script>

{#await fetchUser()}
  <p>Loading...</p>
{:then}
  <div class="flex items-center bg-zinc-800 p-2 border border-zinc-600 rounded-lg">
    <img class="w-14 h-14 rounded-full" src={pb.files.getUrl(user, user.avatar)} alt={user.name} />
    <h1 class="font-medium text-xl ml-2">{user.name}</h1>
  </div>
{:catch error}
  <p>Got error: {error}</p>
{/await}
