<script lang="ts">
  import MenuButton from './MenuButton.svelte';

  import { pb, currentUser } from '../pocketbase';

  import 'iconify-icon';
  import { Burger, Menu } from '@svelteuidev/core';
  let opened = false;
  let menu: typeof Menu;
</script>

<div class="flex flex-col">
  <button
    on:click={() => {
      opened = !opened;
      menu.toggle();
    }}
    class="border-white border-2 p-0.5 rounded-full flex flex-row items-center"
    type="button"
  >
    <img
      src={pb.files.getUrl($currentUser, $currentUser.avatar)}
      alt="Avatar"
      class="w-10 h-10 rounded-full p-0.5"
    />
    <Burger class="mr-1" color="#fff" size="sm" {opened} />
  </button>
  <!-- TODO: make this dark mode -->
  <Menu
    on:close={() => {
      opened = false;
    }}
    bind:this={menu}
  >
    <div class="" slot="control" />

    <p class="p-1 ml-1 w-full flex flex-row text-md">Nigga</p>
    <MenuButton icon="solar:black-hole-bold" text="Summon niggers" />
    <hr class="my-1" />
    <MenuButton icon="fluent:settings-24-regular" text="Settings" />
    <MenuButton
      icon="uil:signout"
      text="Sign Out"
      classnames="text-red-500"
      onClick={() => {
        pb.authStore.clear();
      }}
    />
  </Menu>
</div>
