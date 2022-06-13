import { getConfiguration } from './configuration'

export async function saveBookmark(bookmark) {
  const configuration = await getConfiguration()

  const res = await fetch(`${configuration.baseUrl}/api/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...bookmark, userId: configuration.token }),
  })
  if (res.status === 200) {
    const body = await res.json()
    return body
    // Unnecessary for now as API does an upsert and will just update existing entry
    // } else if (res.status === 409) {
    //   throw new Error('Bookmark already exists')
  } else if (res.status === 400) {
    const body = await res.json()
    throw new Error(`Validation error: ${JSON.stringify(body)}`)
  } else {
    throw new Error(`Request error: ${res.statusText}`)
  }
}

export async function checkUrl(url) {
  const configuration = await getConfiguration()

  const res = await fetch(`${configuration.baseUrl}/api/bookmarks?q=${url}`)
  if (res.status === 200) {
    const body = await res.json()
    return body.results
  } else if (res.status === 400) {
    const body = await res.json()
    throw new Error(`Validation error: ${JSON.stringify(body)}`)
  } else {
    throw new Error(`Request error: ${res.statusText}`)
  }
}

export async function getTags() {
  const configuration = await getConfiguration()

  const res = await fetch(`${configuration.baseUrl}/api/tags/?limit=10`, {
    headers: {
      Authorization: `${configuration.token}`,
    },
  })
  if (res.status === 200) {
    const body = await res.json()
    return body.tags
  } else {
    throw new Error('Error loading tags')
  }
}

export async function search(text, options) {
  const configuration = await getConfiguration()
  const q = encodeURIComponent(text)
  const limit = options.limit || 100

  const res = await fetch(`${configuration.baseUrl}/api/bookmarks/?q=${q}&limit=${limit}`, {
    headers: {
      Authorization: `${configuration.token}`,
    },
  })
  if (res.status === 200) {
    const body = await res.json()
    return body.results
  }
  return `Error searching bookmarks: ${res.statusText}`
}

export async function testConnection(configuration) {
  const res = await fetch(`${configuration.baseUrl}/api/bookmarks/?limit=1`, {
    headers: {
      Authorization: `${configuration.token}`,
    },
  })
  if (res.status === 200) {
    const body = await res.json()
    return body
  }
}
