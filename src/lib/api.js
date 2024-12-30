import { query } from '@solidjs/router'

const story = path => `https://node-hnapi.herokuapp.com/${path}`
const user = path => `https://hacker-news.firebaseio.com/v0/${path}.json`

async function fetchAPI(path) {
  const url = path.startsWith('user') ? user(path) : story(path)
  const headers = { 'User-Agent': 'chrome' }

  try {
    const response = await fetch(url, { headers })
    const text = await response.text()
    try {
      if (text === null) {
        return { error: 'Not found' }
      }
      return JSON.parse(text)
    }
    catch (e) {
      console.error(`Received from API: ${text}`)
      console.error(e)
      return { error: e }
    }
  }
  catch (error) {
    return { error }
  }
}

const mapStories = {
  top: 'news',
  new: 'newest',
  show: 'show',
  ask: 'ask',
  job: 'jobs',
}

export const getStories = query(async (type, page) => {
  'use server'
  return fetchAPI(`${mapStories[type]}?page=${page}`)
}, 'stories')

export const getStory = query(async (id) => {
  'use server'
  return fetchAPI(`item/${id}`)
}, 'story')

export const getUser = query(async (id) => {
  'use server'
  return fetchAPI(`user/${id}`)
}, 'user')
