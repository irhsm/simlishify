<script lang="ts">
  import Menu from './icons/Menu.svelte'
</script>

<div class="navbar bg-base-100 shadow-sm md:hidden">
  <div class="flex-none">
    <label for="my-drawer" class="btn btn-square btn-ghost">
      <Menu />
    </label>
  </div>
  <div class="flex-1">
    <a class="btn btn-ghost text-xl" href="/app">Simlishify</a>
  </div>
  <div class="flex-none"></div>
</div>
