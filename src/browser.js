function isChrome() {
  return typeof chrome !== 'undefined'
}

export function getBrowser() {
  return isChrome() ? chrome : browser
}

export async function getCurrentTabInfo() {
  const browser = getBrowser()
  const tabs = await browser.tabs.query({ active: true, currentWindow: true })
  if (!Array.isArray(tabs)) return { url: '', title: '' }

  return {
    url: tabs[0].url,
    title: tabs[0].title,
  }
}

export function openOptions() {
  getBrowser().runtime.openOptionsPage()
  window.close()
}
