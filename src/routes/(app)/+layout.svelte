<script lang="ts">
  import Footer from '$components/Footer.svelte'
  import { app } from '$lib/shared.svelte'
  import { simlish } from '$lib/simlish'
  import { wordBank } from '$lib/wordBank'

  let { children } = $props()
</script>

<div class="drawer-content">
  <dialog class="modal" class:modal-open={app.isModalOpen}>
    <div class="modal-box">
      <h3 class="text-lg font-bold">Hello!</h3>
      <p class="py-4">Press ESC key or click the button below to close</p>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn" onclick={() => (app.isModalOpen = false)}>Close</button>
        </form>
      </div>
    </div>
  </dialog>
  {@render children?.()}
  <Footer />
</div>
<div class="drawer-side">
  <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
  <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
    <li><div>Memoized pairs: {Object.keys(app.memoized).length}</div></li>
    <li><div>Known Simlish word: {Object.keys(simlish).length}</div></li>
    <li><div>Word bank: {wordBank.length}</div></li>
  </ul>
</div>
