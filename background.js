import { getBrowser, openOptions } from './src/browser'
import { search } from './src/briefkasten'
import { getConfiguration, isConfigurationComplete } from './src/configuration'

const browser = getBrowser()

const hasCompleteConfiguration = isConfigurationComplete()
chrome.omnibox.setDefaultSuggestion({
  description: hasCompleteConfiguration
    ? 'Bookmark search:'
    : '⚠️ Please configure the briefkasten extension first',
})

chrome.runtime.onInstalled.addListener(function ({ reason }) {
  // See https://developer.chrome.com/extensions/runtime#event-onInstalled
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    openOptions()
  }
})

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  search(text, { limit: 20 })
    .then((results) => {
      const bookmarkSuggestions = results.map((bookmark) => ({
        content: bookmark.url,
        description: `${bookmark.title} ${bookmark.desc} (${bookmark.url})`,
        descriptionStyles: [
          { offset: 0, type: 'match', length: bookmark.title.length },
          {
            offset: bookmark.title.length,
            type: 'dim',
            length: bookmark.desc ? bookmark.desc.length + 1 : 0,
          },
          {
            offset: bookmark.desc ? bookmark.title.length + bookmark.desc.length + 2 : 0,
            type: 'url',
            length: bookmark.url.length + 2,
          },
        ],
      }))
      suggest(bookmarkSuggestions)
    })
    .catch((error) => {
      console.error(error)
    })
})

chrome.omnibox.onInputEntered.addListener(async (content, disposition) => {
  if (!content) return

  const configuration = await getConfiguration()
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
