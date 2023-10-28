<script lang="ts">
  import { Modal } from '@svelteuidev/core';
  import { pb } from '$lib/pocketbase';
  import { createEventDispatcher } from 'svelte';
  import type { RecordModel } from 'pocketbase';

  import UserChip from '../UserChip.svelte';

  const dispatch = createEventDispatcher();

  export let opened = true;

  export let id: string;

  let selectedUser = ''
  let namesearch = '';
  let userQuery: RecordModel[] = [];
  let isUserSearchOpen = false

  let assignese: string[];
  let title: string;
  let task: RecordModel;
  const fetchTask = async () => {
    task = await pb.collection('tasks').getOne(id, { expand: 'assigned_to' });
    assignese = task.assigned_to;
    if (task.expand) {
      task.assigned_to = task.expand.assigned_to;
    }
    title = task.title;
  };

  const fetchUser = async (fullName: string) => {
    userQuery = await pb
      .collection('users')
      .getFullList({ filter: `name ~ "${namesearch}"`, requestKey: null });
  };

  let titleError: string = '';

  const updateUserInfo = async () => {
    task.assigned_to = assignese;

    task = await pb.collection('tasks').update(task.id, task);

    dispatch('task-edited');
  };

  const deleteAssignedUser = (event: CustomEvent<{ id: string }>) => {
    let id = event.detail.id;

    let index = assignese.findIndex((item: string) => {
      return item === id;
    });

    if (index !== -1) {
      assignese = assignese.filter((uid) => uid !== id);
      console.log(assignese);
      console.log('Item deleted: ' + id);
    } else {
      console.log('Item not found: ' + id);
    }
  };
</script>

<Modal {opened} withCloseButton={false} title="Feladat szerkesztése">
  {#await fetchTask()}
    <p>loading...</p>
  {:then}
    <p class="mb-3 text-center">A {title} című feladatot szerkeszted</p>

    <div class="flex flex-col">
      <label for="userName">Cím</label>
      <label for="userName" class="text-red-500">{titleError}</label>
    </div>
    <input
      id="userName"
      type="text"
      placeholder="3-48 karakter"
      class="bg-zinc-700 w-full mb-2 p-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-emerald-600"
      bind:value={task.title}
    />
    <label for="fullName">Szöveg test</label>
    <textarea
      id="large-text"
      name="large-text"
      rows="7"
      class="p-3 bg-zinc-700 w-full"
      bind:value={task.body}
    />

    <ul class="bg-zinc-700 p-2 rounded-lg my-4 space-y-2">
      {#if assignese.length == 0}
        <p class="text-center">Nincs hozzárendelve senki</p>
      {/if}
      {#each assignese as id}
        <UserChip {id} on:delete={deleteAssignedUser} />
      {/each}
    </ul>

    <div class="relative">
      <button
        class="border-zinc-400 border hover:bg-zinc-600 p-2 rounded-lg w-full"
        on:click={() => {
          isUserSearchOpen = !isUserSearchOpen;
        }}
      >
        search for users to assign to task
      </button>
      {#if isUserSearchOpen}
        <div class="absolute bg-zinc-800 p-3 rounded-lg border border-zinc-400 mt-2">
          <label class="font-medium" for="optionalSelect">Choose an option (optional):</label>
          <input
            class="bg-zinc-700 border-zinc-400 border p-2 rounded-lg w-full mb-2"
            placeholder="Nev"
            type="text"
            name=""
            id=""
            bind:value={namesearch}
            on:input={async () => {
              await fetchUser(namesearch);
            }}
          />
          {#await fetchUser(namesearch)}
            <p>loading...</p>
          {:then}
            <select
              id="optionalSelect"
              name="optionalSelect"
              class="bg-zinc-700 p-2 rounded-lg w-full"
              bind:value={selectedUser}
            >
              {#each userQuery as user}
                <option class="px-2 py-1 hover:bg-zinc-600 text-white" value={user.id}
                  >{user.name}</option
                >
              {/each}
            </select>
          {:catch error}
            <p>There was an error: {error}</p>
          {/await}

          <button
            class="bg-emerald-600 hover:bg-emerald-800 p-2 rounded-lg w-full mt-2 text-white"
            on:click={() => {
              assignese = [...assignese, selectedUser];
              console.log(assignese);
              isUserSearchOpen = false;
            }}
          >
            Add
          </button>
        </div>
      {/if}
    </div>
  {:catch error}
    <p>Got error: {error}</p>
  {/await}

  <button
    class="bg-rose-600 disabled:bg-rose-950 disabled:hover:bg-rose-950 disabled:cursor-not-allowed text-white p-2 rounded-lg mt-3 w-full transition hover:bg-rose-700"
    on:click={() => dispatch('closed')}
  >
    Mégse
  </button>

  <button
    class="bg-emerald-600 disabled:bg-emerald-950 disabled:hover:bg-emerald-950 disabled:cursor-not-allowed text-white p-2 rounded-lg mt-3 w-full transition hover:bg-emerald-700"
    on:click={updateUserInfo}
  >
    Mentés
  </button>
</Modal>
