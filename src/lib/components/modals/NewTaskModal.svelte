<script lang="ts">
  import { Modal } from '@svelteuidev/core';
  import { pb, currentUser } from '$lib/pocketbase';
  import 'iconify-icon';

  let opened = true;
  let disabled = false;

  let title = '';
  let body = '';
  let due_date: Date = new Date();

  const checkInputs = () => {
    if (body.length <= 0 || title.length <= 0) {
      disabled = true
    }
    console.log(disabled);
  };
  checkInputs()

  const createTask = async () => {
    pb.collection('tasks').create({
      title: title,
      body: body,
      author: $currentUser.id,
      due_date: due_date,
      isOpen: true,
      isComplete: false
    });
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
  <input
    type="text"
    name="body"
    id="body-inp"
    bind:value={body}
    on:input={checkInputs}
    placeholder="Szöveg"
    class="bg-zinc-700 w-full mb-2 p-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-emerald-600"
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

  <div class="flex flex-row gap-3">
    <button
      class="bg-rose-600 disabled:bg-emerald-950 disabled:hover:bg-emerald-950 disabled:cursor-not-allowed text-white p-2 rounded-lg mt-3 w-full transition hover:bg-rose-700"
      on:click={() => {
        opened = false;
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
