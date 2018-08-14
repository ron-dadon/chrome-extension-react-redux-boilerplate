import { DISABLE, ENABLE, SET_BADGE_BACKGROUND_COLOR, SET_BADGE_TEXT, SET_ICON, SET_TITLE } from 'actions/browserAction'
import middlewareCreator from 'reduxUtils/middlewareCreator'
import browser from 'webextension-polyfill'

const setTitle = ({ action: { payload: { title, tabId } } }) => {
  browser.browserAction.setTitle({ title, tabId })
}

const setIcon = ({ action: { payload: { imageData, path, tabId } } }) => {
  browser.browserAction.setIcon({ imageData, path, tabId })
}

const setBadgeText = ({ action: { payload: { text, tabId } } }) => {
  browser.browserAction.setBadgeText({ text, tabId })
}

const setBadgeBackgroundColor = ({ action: { payload: { color, tabId } } }) => {
  browser.browserAction.setBadgeBackgroundColor({ color, tabId })
}

const enable = ({ action: { payload: { tabId } } }) => {
  browser.browserAction.enable({ tabId })
}

const disable = ({ action: { payload: { tabId } } }) => {
  browser.browserAction.disable({ tabId })
}

export default middlewareCreator({
  [SET_TITLE]: setTitle,
  [SET_ICON]: setIcon,
  [SET_BADGE_TEXT]: setBadgeText,
  [SET_BADGE_BACKGROUND_COLOR]: setBadgeBackgroundColor,
  [ENABLE]: enable,
  [DISABLE]: disable
})
