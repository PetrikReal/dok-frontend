<script lang="ts">
  import { pb } from '../pocketbase';

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

<button
  class="text-black bg-emerald-700 rounded-lg px-4 py-2 hover:text-white transition duration-200"
  on:click={signIn}>Log In</button
>
