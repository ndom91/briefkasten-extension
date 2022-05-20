<script>
  import TagAutocomplete from './TagAutocomplete.svelte'
  import { getCurrentTabInfo, openOptions } from "../browser"
  import { getTags, saveBookmark } from "../briefkasten"

  let url = ""
  let title = ""
  let titlePlaceholder = ""
  let desc = ""
  let tags = ""
  let saveState = ""
  let errorMessage = ""
  let availableTagNames = []

  async function init() {
    const tabInfo = await getCurrentTabInfo()
    url = tabInfo.url
    titlePlaceholder = tabInfo.title
    const availableTags = await getTags().catch(() => [])
    availableTagNames = availableTags.map(tag => tag.name)
  }

  init();

  async function handleSubmit() {
    const tagNames = tags.split(" ").map(tag => tag.trim()).filter(Boolean)
    const bookmark = {
      url,
      title,
      desc,
      tags: tagNames,
    }

    try {
      saveState = "loading"
      await saveBookmark(bookmark)
      saveState = "success"
    } catch (e) {
      saveState = "error"
      errorMessage = e.toString()
      console.error(errorMessage)
    }
  }

  function handleOptions() {
    openOptions()
  }

</script>

<main class="text-base gap-2 flex flex-col">
  <div class="flex justify-between items-center mb-4">
    <h2 class="text-xl uppercase font-semibold">Briefkasten</h2>
    <a href="#" class="rounded-md focus:ring-2 focus:ring-slate-400 focus:bg-slate-900 outline-none focus:outline-none hover:cursor-pointer px-4 py-2 text-white bg-slate-700 hover:bg-slate-900 disabled:hover:bg-slate-700" on:click|preventDefault={handleOptions}>Options</a>
  </div>
  <form class="flex flex-col gap-2 w-full " on:submit|preventDefault={handleSubmit}>
    <div class="flex flex-col justify-start items-start">
      <label class="text-md uppercase tracking-tight font-semibold" for="input-url">URL</label>
      <input class="w-full border-2 border-slate-300 p-1 rounded-md focus:outline-none outline-none focus:ring-2 focus:ring-slate-300" type="text" id="input-url" placeholder="URL"
             bind:value={url}>
    </div>
    <div class="flex flex-col justify-start items-start">
      <label class="text-md uppercase tracking-tight font-semibold" for="input-tags">Tags</label>
      <TagAutocomplete id="input-tags" name="tags" bind:value={tags} tags={availableTagNames}/>
    </div>
    <div class="flex flex-col justify-start items-start">
      <label class="text-md uppercase tracking-tight font-semibold" for="input-title">Title</label>
      <input class="w-full border-2 border-slate-300 p-1 rounded-md focus:outline-none outline-none focus:ring-2 focus:ring-slate-300" type="text" id="input-title"
             bind:value={title} placeholder={titlePlaceholder}>
    </div>
    <div class="flex flex-col justify-start items-start">
      <label class="text-md uppercase tracking-tight font-semibold" for="input-description">Description</label>
      <textarea class="w-full border-2 border-slate-300 p-1 rounded-md focus:outline-none outline-none focus:ring-2 focus:ring-slate-300" id="input-description"
                bind:value={desc}
                placeholder="Leave empty to use description from website"></textarea>
    </div>
    {#if saveState === 'success'}
      <div class="form-group has-success flex justify-center mt-2">
        <span class="text-slate-500 flex justify-start items-center">
          <svg class="w-6 h-6 text-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
          Bookmark Added
        </span>
      </div>
    {/if}
    {#if saveState === 'error'}
      <div class="form-group has-error flex justify-center mt-2">
        <span class="text-slate-500 flex justify-start items-center">
          <svg class="w-6 h-6 text-red-600 mr-2" name="cross" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          Error saving: {errorMessage}
        </span>
      </div>
    {/if}
    {#if saveState !== 'success'}
      <div class="flex justify-end">
        <button type="submit" class="rounded-md focus:ring-2 focus:ring-slate-400 focus:bg-slate-900 outline-none focus:outline-none hover:cursor-pointer px-4 py-2 text-white bg-slate-700 hover:bg-slate-900 disabled:hover:bg-slate-700" class:loading={saveState === 'loading'}>Save</button>
      </div>
    {/if}
  </form>

</main>
