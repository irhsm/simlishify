<script lang="ts">
  import { onMount } from 'svelte'
  import AppBar from '$components/AppBar.svelte'
  import ArrowUp from '$components/icons/ArrowUp.svelte'
  import { wordBank } from '$lib/wordBank'
  import { simlish } from '$lib/simlish'
  import { SimlishifyAppPageState } from './state.svelte'
  import { app } from '$lib/shared.svelte'
  import { isEmptyString } from '$lib'
  import Simlishify from '$icons/Simlishify.svelte'

  let pageState = new SimlishifyAppPageState(),
    input = $state<string>(''),
    outputs = $state<string[]>([]),
    willScrollEl = $state<HTMLDivElement>(),
    scrollElHeight = $state<number>(0)

  const startProcesses = () => {
    if (input) outputs = [...outputs, pageState.startSimlishifying(input)]
  }

  const initScrollHeight = () => {
    if (willScrollEl) {
      const rect = willScrollEl.getBoundingClientRect()
      scrollElHeight = rect.height
    }
  }

  onMount(() => {
    initScrollHeight()
    pageState.buildWordBankObject()
  })
</script>

<div class="grid-top-ads-auto">
  <div class="bg-base-200">
    <div>
      <!-- Top ads -->
    </div>
  </div>
  <div class="flex-side-bar-app-side-ads">
    <div class="desktop-side-bar border-base-content/5 hidden p-2 md:block">
      <!-- Desktop side bar -->
      <header>
        <button class="btn btn-square btn-ghost w-full">
          <Simlishify />
        </button>
      </header>
    </div>
    <main class="grid-app-bar-auto-status-bar">
      <AppBar />
      <div class="bg-base-200 hero-pattern-doodle relative" bind:this={willScrollEl}>
        <div class="pb-input relative z-10 overflow-y-auto p-2" style={`max-height: ${scrollElHeight}px;`}>
          <ul class="list-output">
            {#each outputs as output}
              <li>
                <div class="chat chat-end">
                  <div class="chat-bubble text-sm whitespace-pre-line focus:outline-none" contenteditable="true">
                    {output}
                  </div>
                </div>
              </li>
            {/each}
          </ul>
        </div>
        <div class="floating-input bg-base-100 rounded p-4 shadow">
          <textarea name="input" class="textarea textarea-ghost w-full focus:outline-none" placeholder="Enter your text" bind:value={input}></textarea>
          <div class="mt-4 flex justify-end">
            <button type="button" class="btn btn-sm" onclick={startProcesses} disabled={isEmptyString(input)}>
              <ArrowUp />
            </button>
          </div>
        </div>
      </div>
      <div class="status-bar border-base-content/5">
        <!-- Status bar -->
        <span class="text-base-content/50 text-xs">Memoized pairs: {Object.keys(app.memoized).length}</span>
        <span class="text-base-content/50 text-xs">Known Simlish word: {Object.keys(simlish).length}</span>
        <span class="text-base-content/50 text-xs">Word bank: {wordBank.length}</span>
      </div>
    </main>
    <div class="side-ads border-base-content/5">
      <!-- Side ads -->
    </div>
  </div>
</div>
