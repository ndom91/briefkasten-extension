import Popup from "./popup.svelte"
import "../styles/index.css"

const app = new Popup({
  target: document.getElementById("app"),
})

export default app
