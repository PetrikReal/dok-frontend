<script lang="ts">
  import '../app.css';
  import { SvelteUIProvider } from '@svelteuidev/core';
</script>

<SvelteUIProvider withGlobalStyles themeObserver={'dark'}>
  <slot />
</SvelteUIProvider>
