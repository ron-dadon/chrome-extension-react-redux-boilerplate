import { storageSet, storageSetError } from 'actions/storage'
import browser from 'webextension-polyfill'

const VALID_STORAGE_TYPES = ['local', 'sync']

export default ({ getState }) => next => (action) => {
  next(action)
  if (!action.meta || !action.meta.storeState) return
  const {
    storageKey = '__initialState__',
    stateKeys = [],
    storageType = 'local'
  } = action.meta.storeState
  if (!Array.isArray(stateKeys) || !stateKeys.length) return
  const state = getState()
  const stateToStore = stateKeys.reduce((stateToStoreObj, key) => ({ ...stateToStoreObj, [key]: state[key] }), {})
  if (!VALID_STORAGE_TYPES.includes(storageType)) {
    next(storageSetError({
      value: stateToStore,
      message: `Storage type ${storageType} is invalid. Valid types are: ${VALID_STORAGE_TYPES.join(',')}`
    }))
  }
  browser.storage[storageType].set({ [storageKey]: stateToStore }).then(() => {
    next(storageSet(stateToStore))
  }).catch(({ message }) => {
    next(storageSetError({ value: stateToStore, message }))
  })
}
