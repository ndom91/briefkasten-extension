<script>
  import { openOptions } from "../browser";

  function handleOptions() {
    openOptions()
  }
</script>

<main class="text-base space-y-4">
  <h2 class="text-xl uppercase font-semibold">Welcome</h2>
  <p>This is a companion extension for the <a class="text-slate-700 font-semibold" href="https://github.com/ndom91/briefkasten">briefkasten</a> bookmark
    service. Before you can start using it you have to configure some basic settings, so that the extension can
    communicate with your briefkasten installation.</p>
  <div class="flex justify-start items-center">
    <button type="submit" class="rounded-md focus:ring-2 focus:ring-slate-400 focus:bg-slate-900 outline-none focus:outline-none hover:cursor-pointer px-4 py-2 text-white bg-slate-700 hover:bg-slate-900 disabled:hover:bg-slate-700 mr-2" on:click={handleOptions}>Get started</button>
  </div>
</main>
