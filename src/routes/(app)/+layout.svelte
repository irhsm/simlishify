<script lang="ts">
  import '../../app.css'
  let { children } = $props()
</script>

<div class="drawer-content">
  {@render children?.()}
</div>
<div class="drawer-side">
  <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
  <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
    <!-- Sidebar content here -->
    <li><button>Sidebar Item 1</button></li>
    <li><button>Sidebar Item 2</button></li>
  </ul>
</div>
