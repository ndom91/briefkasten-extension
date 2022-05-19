function isChrome() {
  return typeof chrome !== "undefined"
}

export function getBrowser() {
  return isChrome() ? chrome : browser
}

export async function getCurrentTabInfo() {
  const browser = getBrowser()
  // let tabsPromise
  // if (isChrome()) {
  //   tabsPromise =new Promise(resolve => browser.tabs.query({
  //     active: true,
  //     currentWindow: true
  //   }, resolve))
  // } else {
  //   tabsPromise = browser.tabs.query({ active: true, currentWindow: true });
  // }
  // const tabs = await tabsPromise;
  // const tab = tabs && tabs[0];

  const tabs = await browser.tabs.query({ active: true, currentWindow: true })
  if (!Array.isArray(tabs)) return { url: "", title: "" }

  return {
    url: tabs[0].url,
    title: tabs[0].title,
  }
}

export function openOptions() {
  getBrowser().runtime.openOptionsPage()
  window.close()
}
