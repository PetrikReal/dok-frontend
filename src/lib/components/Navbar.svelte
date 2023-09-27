<script lang="ts">
  import Menu from './Menu.svelte';

  import Icon from './Icon.svelte';

  import { currentUser } from '../pocketbase';

  import 'iconify-icon';
</script>

<nav class="bg-zinc-800 text-white p-3 flex flex-row items-center justify-between px-4">
  <Icon />

  <p>Signed in as {$currentUser.username}</p>
  <Menu />
</nav>
