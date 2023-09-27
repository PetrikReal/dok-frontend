<script lang="ts">
  import { Modal, createStyles } from '@svelteuidev/core';
  import { pb, currentUser } from '$lib/pocketbase';

  let opened = true;
  let disabled = true;

  let fullName = '';
  let userName = '';

  let usernameError: string = '';

  const checkInputs = () => {
    const userIsAlpha = /^[a-z0-9]+$/i.test(userName);

    const userLengthConstraint = userName.length >= 3 && userName.length <= 16;

    usernameError = !userIsAlpha
      ? 'csak betűket és számokat tartalmazhat!'
      : !userLengthConstraint
      ? '3 és 16 karakter között kell lennie!'
      : '';

    disabled = !(fullName.length <= 30) || !userLengthConstraint || !userIsAlpha;
    console.log(disabled);
  };

  const updateUserInfo = () => {
    const data = {
      name: fullName,
      username: userName,
      isSetup: true
    };
    const record = pb.collection('users').update($currentUser.id, data);
    console.log(record);
    opened = false;
  };
</script>

<Modal {opened} withCloseButton={false}>
  <p class="text-center text-xl mb-3">Végső simítások</p>
  <p class="mb-3 text-center">Még nincs kész a profilod, adj meg pár adatot!</p>

  <label for="fullName">Teljes név</label>
  <input
    id="fullName"
    type="text"
    placeholder="Teszt Attila"
    class="bg-zinc-700 w-full mb-2 p-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-emerald-600"
    bind:value={fullName}
    on:input={checkInputs}
  />

  <div class="flex flex-col">
    <label for="userName">Felhasználónév</label>
    <label for="userName" class="text-red-500">{usernameError}</label>
  </div>
  <input
    id="userName"
    type="text"
    placeholder="3-16 karakter"
    class="bg-zinc-700 w-full mb-2 p-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-emerald-600"
    bind:value={userName}
    on:input={checkInputs}
  />

  <button
    class="bg-emerald-600 disabled:bg-emerald-950 disabled:hover:bg-emerald-950 disabled:cursor-not-allowed text-white p-2 rounded-lg mt-3 w-full transition hover:bg-emerald-700"
    on:click={updateUserInfo}
    {disabled}
  >
    Mentés
  </button>
</Modal>
