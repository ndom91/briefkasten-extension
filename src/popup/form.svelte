<script>

  import TagAutocomplete from './TagAutocomplete.svelte'
  import { getCurrentTabInfo, openOptions } from "../browser";
  import { getTags, saveBookmark } from "../briefkasten";

  let url = "";
  let title = "";
  let titlePlaceholder = "";
  let description = "";
  let tags = "";
  let saveState = "";
  let errorMessage = "";
  let availableTagNames = []

  async function init() {
    const tabInfo = await getCurrentTabInfo();
    url = tabInfo.url;
    titlePlaceholder = tabInfo.title;
    const availableTags = await getTags().catch(() => [])
    availableTagNames = availableTags.map(tag => tag.name)
  }

  init();

  async function handleSubmit() {
    const tagNames = tags.split(" ").map(tag => tag.trim()).filter(tag => !!tag);
    const bookmark = {
      url,
      title,
      description,
      tag_names: tagNames
    };

    try {
      saveState = "loading";
      await saveBookmark(bookmark);
      saveState = "success";
    } catch (e) {
      saveState = "error";
      errorMessage = e.toString();
      console.error(errorMessage);
    }
  }

  function handleOptions() {
    openOptions();
  }

</script>

<main class="text-base gap-2 flex flex-col">
  <div class="flex justify-between items-center mb-4">
    <h2 class="text-xl uppercase font-semibold">Add Bookmark</h2>
    <a href="#" class="rounded-md focus:ring-2 focus:ring-slate-400 focus:bg-slate-900 outline-none focus:outline-none hover:cursor-pointer px-4 py-2 text-white bg-slate-700 hover:bg-slate-900 disabled:hover:bg-slate-700 mr-2" on:click|preventDefault={handleOptions}>Options</a>
  </div>
  <form class="flex flex-col gap-2 w-full " on:submit|preventDefault={handleSubmit}>
    <div class="flex flex-col justify-start items-start">
      <label class="text-md uppercase tracking-tight font-semibold" for="input-url">URL</label>
      <input class="w-full border-2 border-slate-300 p-1 rounded-sm focus:outline-none outline-none focus:ring-2 focus:ring-slate-300" type="text" id="input-url" placeholder="URL"
             bind:value={url}>
    </div>
    <div class="flex flex-col justify-start items-start">
      <label class="text-md uppercase tracking-tight font-semibold" for="input-tags">Tags</label>
      <TagAutocomplete id="input-tags" name="tags" bind:value={tags} tags={availableTagNames}/>
    </div>
    <div class="flex flex-col justify-start items-start">
      <label class="text-md uppercase tracking-tight font-semibold" for="input-title">Title</label>
      <input class="w-full border-2 border-slate-300 p-1 rounded-sm focus:outline-none outline-none focus:ring-2 focus:ring-slate-300" type="text" id="input-title"
             bind:value={title} placeholder={titlePlaceholder}>
    </div>
    <div class="flex flex-col justify-start items-start">
      <label class="text-md uppercase tracking-tight font-semibold" for="input-description">Description</label>
      <textarea class="w-full border-2 border-slate-300 p-1 rounded-sm focus:outline-none outline-none focus:ring-2 focus:ring-slate-300" id="input-description"
                bind:value={description}
                placeholder="Leave empty to use description from website"></textarea>
    </div>
    <div class="divider"></div>
    {#if saveState === 'success'}
      <div class="form-group has-success result-row">
        <div class="form-input-hint"><i class="icon icon-check"></i> Bookmark added</div>
      </div>
    {/if}
    {#if saveState === 'error'}
      <div class="form-group has-error result-row">
        <div class="form-input-hint">Error saving bookmark: {errorMessage}</div>
      </div>
    {/if}
    {#if saveState !== 'success'}
      <div class="button-row">
        <button type="submit" class="rounded-md focus:ring-2 focus:ring-slate-400 focus:bg-slate-900 outline-none focus:outline-none hover:cursor-pointer px-4 py-2 text-white bg-slate-700 hover:bg-slate-900 disabled:hover:bg-slate-700 mr-2" class:loading={saveState === 'loading'}>Save</button>
      </div>
    {/if}
  </form>
</main>

<style>
    .title-row {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }

    .button-row {
        display: flex;
        justify-content: flex-end;
    }
    .button-row button {
        padding-left: 32px;
        padding-right: 32px;
    }

    .result-row {
        display: flex;
        justify-content: center;
    }
</style>
