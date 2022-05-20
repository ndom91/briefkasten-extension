import Options from "./options.svelte"
import "../styles/index.css"

const app = new Options({
  target: document.getElementById("app"),
})

export default app
