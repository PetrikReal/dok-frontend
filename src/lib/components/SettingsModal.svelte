<script lang="ts">
  import { Modal } from '@svelteuidev/core';
  import { pb, currentUser } from '$lib/pocketbase';

  let opened = true;
  let disabled = false;

  let fullName = $currentUser.name;

  const checkInputs = () => {
    disabled = !(fullName.length <= 30);
    console.log(disabled);
  };

  const updateUserInfo = () => {
    const data = {
      name: fullName,
      avatar: files[0]
    };
    const record = pb.collection('users').update($currentUser.id, data);
    console.log(record);
    opened = false;
  };

  let files: FileList;

  let avatarPreview: string = $currentUser.avatar
    ? pb.files.getUrl($currentUser, $currentUser.avatar)
    : undefined;

  const previewFile = () => {
    const file = files[0];
    if (file) {
      avatarPreview = URL.createObjectURL(file);
    }
  };
</script>

<Modal {opened} title="Felhasználói beállítások" withCloseButton={false}>
  <label for="fullName">Teljes név</label>
  <input
    id="fullName"
    type="text"
    placeholder={$currentUser.name}
    class="bg-zinc-700 w-full mb-2 p-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-emerald-600"
    bind:value={fullName}
    on:input={checkInputs}
  />

  <label for="avatar">Tölts fel egy profilképet:</label>
  <input
    accept="image/png, image/jpeg"
    bind:files
    id="avatar"
    name="avatar"
    type="file"
    class="bg-zinc-700 w-full mb-2 p-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-emerald-600"
    on:change={previewFile}
  />
  {#if avatarPreview}
    <p class="text-center">Előnézet:</p>
    <img
      src={avatarPreview}
      alt="Avatar preview"
      class="w-20 h-20 rounded-full object-cover mt-2 mx-auto"
    />
  {/if}

  <script>
    let avatarPreview;

    const previewFile = () => {
      const file = $files[0];
      if (file) {
        avatarPreview = URL.createObjectURL(file);
      }
    };
  </script>

  <button
    class="bg-emerald-600 disabled:bg-emerald-950 disabled:hover:bg-emerald-950 disabled:cursor-not-allowed text-white p-2 rounded-lg mt-3 w-full transition hover:bg-emerald-700"
    on:click={updateUserInfo}
    {disabled}
  >
    Mentés
  </button>
</Modal>
