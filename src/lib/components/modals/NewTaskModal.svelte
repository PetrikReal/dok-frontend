<script lang="ts">
  import { Modal } from '@svelteuidev/core';
  import { pb, currentUser } from '$lib/pocketbase';
  import { createEventDispatcher } from 'svelte';
  import 'iconify-icon';
  import type { RecordModel } from 'pocketbase';
  import UserChip from '../UserChip.svelte';

  const dispatch = createEventDispatcher();

  export let opened = true;
  let disabled = false;

  let title = '';
  let body = '';
  let due_date: Date = new Date();
  let isOpen: boolean = false;

  const checkInputs = () => {
    if (body.length <= 0 || title.length <= 0) {
      disabled = true;
      console.log('asd');
    } else {
      disabled = false;
    }
    console.log(disabled);
  };
  checkInputs();

  let assignese: string[] = [];
  let selectedUser = '';
  let isUserSearchOpen = false;
  let namesearch: string = '';
  let userQuery: RecordModel[] = [];

  const fetchUser = async (fullName: string) => {
    userQuery = await pb
      .collection('users')
      .getFullList({ filter: `name ~ "${namesearch}"`, requestKey: null });
  };

  const createTask = async () => {
    await pb.collection('tasks').create({
      title: title,
      body: body,
      author: $currentUser.id,
      due_date: due_date,
      isOpen: isOpen,
      assigned_to: assignese,
      isComplete: false
    });

    assignese = [];

    dispatch('task-created');
  };
</script>

<Modal {opened} title="Új feladat létrehozása" withCloseButton={false}>
  <label for="title">Cím</label>
  <input
    type="text"
    name="title"
    id="title"
    bind:value={title}
    on:input={checkInputs}
    placeholder="Cím"
    class="bg-zinc-700 w-full mb-2 p-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-emerald-600"
  />
  <label for="body">Szöveg</label>
  <textarea
    id="large-text"
    name="large-text"
    rows="5"
    cols="40"
    class="p-3 bg-zinc-700"
    bind:value={body}
  />
  <label for="due-date">Határidő</label>
  <input
    type="date"
    name="due-date"
    id="due-date"
    bind:value={due_date}
    on:input={checkInputs}
    placeholder="Határidő"
    class="bg-zinc-700 w-full mb-2 p-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-emerald-600"
  />
  <label for="is-open">Nyittot?</label>
  <input type="checkbox" bind:value={isOpen} name="is-open" />

  <ul class="bg-zinc-700 p-2 rounded-lg my-4 space-y-2">
    {#if assignese.length == 0}
      <p class="text-center">Nincs hozzárendelve senki</p>
    {/if}
    {#each assignese as id (id)}
      <UserChip {id} />
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

  <div class="flex flex-row gap-3">
    <button
      class="bg-rose-600 disabled:bg-emerald-950 disabled:hover:bg-emerald-950 disabled:cursor-not-allowed text-white p-2 rounded-lg mt-3 w-full transition hover:bg-rose-700"
      on:click={() => {
        assignese = [];
        dispatch('closed');
      }}
    >
      Mégse
    </button>

    <button
      class="bg-emerald-600 disabled:bg-emerald-950 disabled:hover:bg-emerald-950 disabled:cursor-not-allowed text-white p-2 rounded-lg mt-3 w-full transition hover:bg-emerald-700"
      on:click={createTask}
      {disabled}
    >
      Létrehozás
    </button>
  </div>
</Modal>
