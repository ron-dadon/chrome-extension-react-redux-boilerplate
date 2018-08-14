import { updateBadge } from 'actions/badge'
import initStore from 'store/background'
import browser from 'webextension-polyfill'

browser.storage.local.get().then(({ __initialState__ }) => {
  const store = initStore(__initialState__ || {})
  const currentState = store.getState()
  if (currentState.counter && currentState.counter.count !== undefined) {
    store.dispatch(updateBadge(currentState.counter.count))
  }
})
