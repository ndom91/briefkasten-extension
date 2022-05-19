<script>
  import { getConfiguration, saveConfiguration } from "./configuration";
  import { testConnection } from "./briefkasten";

  let baseUrl = "";
  let token = "";
  let isSuccess = false;
  let isError = false;

  function init() {
    const config = getConfiguration();
    baseUrl = config.baseUrl;
    token = config.token;
  }

  init();

  async function handleSubmit() {
    const config = {
      baseUrl,
      token
    };

    const testResult = await testConnection(config);

    if (testResult) {
      saveConfiguration(config);
      isError = false;
      isSuccess = true;
    } else {
      isSuccess = false;
      isError = true;
    }
  }
</script>
<h6>Configuration</h6>
<div class="divider"></div>
<p>This is a companion extension for the <a href="https://github.com/ndom91/briefkasten">briefkasten</a> bookmark
  service. Before you can start using it you have to configure some basic settings, so that the extension can
  communicate with your briefkasten installation.</p>
<form class="form" on:submit|preventDefault={handleSubmit}>
  <div class="form-group">
    <label class="form-label" for="input-base-url">Base URL</label>
    <input class="form-input" type="text" id="input-base-url" placeholder="https://briefkasten.mydomain.com"
           bind:value={baseUrl}>
    <div class="form-input-hint">The base URL of your briefkasten installation, <b>without</b> the <samp>/bookmark</samp> path or a trailing slash</div>
  </div>
  <div class="form-group">
    <label class="form-label" for="input-token">API Authentication Token</label>
    <input class="form-input" type="password" id="input-token" placeholder="Token" bind:value={token}>
    <div class="form-input-hint">Used to authenticate against the briefkasten API. You can find this on your briefkasten
      settings page.
    </div>
  </div>
  <div class="divider"></div>
  <div class="button-row">
    {#if isSuccess}
      <div class="form-group has-success mr-2">
        <span class="form-input-hint"><i class="icon icon-check"></i> Connection successful</span>
      </div>
    {/if}
    {#if isError}
      <div class="form-group has-error mr-2">
        <span class="form-input-hint"><i class="icon icon-cross"></i> Connection failed</span>
      </div>
    {/if}
    <button type="submit" class="btn btn-primary ml-2" disabled={!(baseUrl && token)}>
      Save
    </button>
  </div>
</form>
<style>
    .button-row {
        display: flex;
        justify-content: flex-end;
        align-items: baseline;
    }
    .button-row button {
        padding-left: 32px;
        padding-right: 32px;
    }
</style>
