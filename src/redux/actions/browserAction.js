import { labelCreator } from 'reduxUtils/actions'

const LABEL = labelCreator('browser action')

export const SET_TITLE = `${LABEL} Set title`
export const SET_ICON = `${LABEL} Set icon`
export const SET_BADGE_TEXT = `${LABEL} Set badge text`
export const SET_BADGE_BACKGROUND_COLOR = `${LABEL} Set badge background color`
export const ENABLE = `${LABEL} Enable`
export const DISABLE = `${LABEL} Disable`

export const setTitle = ({ title, tabId }) => ({
  type: SET_TITLE,
  payload: { title, tabId }
})

export const setIcon = ({ imageData, path, tabId }) => ({
  type: SET_ICON,
  payload: { imageData, path, tabId }
})

export const setBadgeText = ({ text, tabId }) => ({
  type: SET_BADGE_TEXT,
  payload: { text, tabId }
})

export const setBadgeBackgroundColor = ({ color, tabId }) => ({
  type: SET_BADGE_BACKGROUND_COLOR,
  payload: { color, tabId }
})

export const enable = ({ tabId }) => ({
  type: ENABLE,
  payload: { tabId }
})

export const disable = ({ tabId }) => ({
  type: DISABLE,
  payload: { tabId }
})
