<script lang="ts">
  import { pb } from '../../pocketbase';

  async function signIn() {
    const authData = await pb.collection('users').authWithOAuth2({
      provider: 'microsoft',
      createData: {
        isAdmin: false,
        isSetup: false
      }
    });
    console.log('signed in');
    console.log(authData);
  }
</script>

<div class="flex flex-col justify-center items-center h-screen">
  <h1 class="mb-3 text-2xl">DÖKWeb</h1>
  <button
    on:click={signIn}
    class="flex items-center p-3 border-slate-100 border-2 rounded-lg transition hover:bg-gray-500"
  >
    <iconify-icon icon="bi:microsoft" class="mr-2" />
    <h2>Sign in</h2>
  </button>
</div>
