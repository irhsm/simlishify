<script lang="ts">
  import { onMount } from 'svelte'
  import AppBar from '$components/AppBar.svelte'
  import { SimlishifyAppPageState } from './state.svelte'
  import { isEmptyString } from '$lib'
  import KeyboardCommandKey from '$components/svg/KeyboardCommandKey.svelte'
  import KeyboardReturn from '$components/svg/KeyboardReturn.svelte'

  let pageState = new SimlishifyAppPageState(),
    input = $state<string>(''),
    outputs = $state<string[]>([])

  const startProcesses = () => {
    if (input) outputs = [...outputs, pageState.startSimlishifying(input)]

    const element = document.getElementById('title-output')

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      })
    }
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault()
      startProcesses()
    }
  }

  onMount(() => {
    pageState.buildWordBankObject()
  })
</script>

<svelte:window onkeydown={onKeyDown} />

<AppBar />
<div class="min-h-screen">
  <div class="flex flex-col gap-2 p-4">
    <h1 id="title-input" class="text-base-content/50 text-sm font-bold">Input</h1>
    <textarea class="field-sizing-content min-h-40 text-sm focus:outline-none" name="input" id="input" placeholder="Enter text here" bind:value={input}></textarea>
    <div class="flex flex-1 justify-end">
      <button class="btn btn-neutral" disabled={isEmptyString(input)} onclick={() => startProcesses()}>
        Run
        <div class="flex items-center">
          <KeyboardCommandKey class="h-4 w-4" />
          <KeyboardReturn class="h-5 w-5" />
        </div>
      </button>
    </div>
  </div>
  <div class="flex flex-col gap-2 p-4">
    <h1 id="title-output" class="text-base-content/50 text-sm font-bold">Output</h1>
    <div contenteditable="true" class="text-sm whitespace-pre-line focus:outline-none">
      {outputs.length ? outputs[outputs.length - 1] : ''}
    </div>
  </div>
</div>
