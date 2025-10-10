<script lang="ts">
  import '../app.css'
  import favicon from '$lib/assets/favicon.svg'
  import MetaHome from '$components/MetaHome.svelte'

  let { children } = $props()
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<MetaHome />

<input id="my-drawer" type="checkbox" class="drawer-toggle" />
{@render children?.()}
