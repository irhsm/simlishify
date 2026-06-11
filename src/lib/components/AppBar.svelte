<script lang="ts">
  import MenuOpen from './svg/MenuOpen.svelte'
</script>

<div class="navbar bg-base-100 shadow-sm">
  <div class="flex-none">
    <label for="my-drawer" class="btn btn-square">
      <MenuOpen class="h-5 w-5" />
    </label>
  </div>
  <div class="flex-1">
    <a class="btn btn-ghost text-xl" href="/app">Simlishify</a>
  </div>
  <div class="flex-none"></div>
</div>
