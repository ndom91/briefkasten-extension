const CONFIG_KEY = 'bk_ext_config'

export async function getConfiguration() {
  const config = await chrome.storage.local.get([CONFIG_KEY])
  return config[CONFIG_KEY]
}

export function saveConfiguration(config) {
  chrome.storage.local.set({ [CONFIG_KEY]: config })
}

export function isConfigurationComplete() {
  const config = getConfiguration()

  return config.baseUrl && config.token
}
