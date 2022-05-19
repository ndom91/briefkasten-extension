<script>
  import Form from "./form.svelte";
  import Intro from "./intro.svelte";
  import { isConfigurationComplete } from "../configuration";
  import "../styles/index.css"

  const hasCompleteConfiguration = isConfigurationComplete();
</script>

{#if hasCompleteConfiguration}
  <Form />
{:else}
  <Intro />
{/if}
