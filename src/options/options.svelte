<script>
  import { getConfiguration, saveConfiguration } from "../configuration";
  import { testConnection } from "../briefkasten";

  let baseUrl = "";
  let token = "";
  let isSuccess = false;
  let isError = false;
  let isLoading = false;

  async function init() {
    const config = await getConfiguration();
    baseUrl = config.baseUrl;
    token = config.token;
  }

  init();

  async function handleSubmit() {
    const config = {
      baseUrl,
      token
    };
    isLoading = true

    const testResult = await testConnection(config);

    if (testResult) {
      saveConfiguration(config);
      isError = false;
      isSuccess = true;
    } else {
      isSuccess = false;
      isError = true;
    }
    isLoading = false
  }
</script>

<main class="text-base space-y-2">
  <h2 class="text-xl uppercase font-semibold">Configuration</h2>
  <p>This is a companion extension for the <a class="text-slate-700 font-semibold" href="https://github.com/ndom91/briefkasten">briefkasten</a> bookmark
    service. Before you can start using it you have to configure some basic settings, so that the extension can
    communicate with your briefkasten installation.</p>
  <div class="divide-y"></div>
  <form class="flex flex-col" on:submit|preventDefault={handleSubmit}>
    <div class="flex flex-col mt-2">
      <label class="uppercase tracking-tight font-semibold" for="input-base-url">Base URL</label>
      <input class="border-2 border-slate-300 p-2 rounded-md focus:outline-none outline-none focus:ring-2 focus:ring-slate-300" type="text" id="input-base-url" placeholder="https://briefkasten.mydomain.com" bind:value={baseUrl}>
    </div>
    <div class="text-xs mt-1">The base URL of your briefkasten installation, <b>without</b> the <samp>/bookmark</samp> path or a trailing slash</div>
    <div class="flex flex-col mt-2">
      <label class="uppercase tracking-tight font-semibold" for="input-token">API Authentication Token</label>
      <input class="border-2 border-slate-300 p-2 rounded-md focus:outline-none outline-none focus:ring-2 focus:ring-slate-300" type="password" id="input-token" placeholder="Token" bind:value={token}>
    </div>
    <div class="text-xs mt-1">Used to authenticate against the briefkasten API. You can find this on your briefkasten settings page. </div>
    <div class="divide-y"></div>
    <div class="flex mt-4">
      <button type="submit" class="rounded-md focus:ring-2 focus:ring-slate-400 focus:bg-slate-900 outline-none focus:outline-none hover:cursor-pointer px-4 py-2 text-white bg-slate-700 hover:bg-slate-900 disabled:hover:bg-slate-700 mr-2" disabled={!(baseUrl && token)}>
          {#if isLoading}
            <div class="flex items-center justify-center">
              <svg
                class="h-5 w-5 animate-spin text-white mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Save</span>
            </div>
          {:else}
            Save
          {/if}
      </button>
      {#if isSuccess}
        <div class="flex ml-2">
          <span class="text-slate-500 flex justify-start items-center">
            <svg class="w-6 h-6 text-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
            Connection successful
          </span>
        </div>
      {/if}
      {#if isError}
        <div class="flex ml-2">
          <span class="text-slate-500 flex justify-start items-center">
            <svg class="w-6 h-6 text-red-600 mr-2" name="cross" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            Connection failed
          </span>
        </div>
      {/if}
    </div>
  </form>
</main>
