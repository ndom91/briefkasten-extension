import { getBrowser } from './src/browser'
import { search } from './src/briefkasten'
import { getConfiguration, isConfigurationComplete } from './src/configuration'

const browser = getBrowser()

console.log(browser)

chrome.omnibox.onInputStarted.addListener(() => {
  const hasCompleteConfiguration = isConfigurationComplete()
  const description = hasCompleteConfiguration
    ? 'Search bookmarks in briefkasten'
    : '⚠️ Please configure the briefkasten extension first'

  chrome.omnibox.setDefaultSuggestion(description)
})

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  search(text, { limit: 20 })
    .then((results) => {
      const bookmarkSuggestions = results.map((bookmark) => ({
        content: bookmark.url,
        description: `<dim>${bookmark.title}</dim>`, // <dim>${bookmark.desc}</dim> <url>${bookmark.url}</url>`,
      }))
      suggest(bookmarkSuggestions)
    })
    .catch((error) => {
      console.error(error)
    })
})

chrome.omnibox.onInputEntered.addListener((content, disposition) => {
  if (!content) return

  const configuration = getConfiguration()
  const isUrl = /^http(s)?:\/\//.test(content)
  const url = isUrl
    ? content
    : `${configuration.baseUrl}/bookmarks?q=${encodeURIComponent(content)}`

  switch (disposition) {
    case 'currentTab':
      browser.tabs.update({ url })
      break
    case 'newForegroundTab':
      browser.tabs.create({ url })
      break
    case 'newBackgroundTab':
      browser.tabs.create({ url, active: false })
      break
  }
})
