// var appTarget = document.getElementById("app")
// new briefkasten.Options({ target: appTarget })
import Options from "./options.svelte"
import "../styles/index.css"

const app = new Options({
  target: document.getElementById("app"),
})

export default app
