import { UPDATE_BADGE } from 'actions/badge'
import middlewareCreator from 'reduxUtils/middlewareCreator'
import browser from 'webextension-polyfill'

const updateBadge = ({ action: { payload: badgeText } }) => {
  browser.browserAction.setBadgeText({
    text: badgeText ? badgeText.toString() : ''
  })
}

export default middlewareCreator({
  [UPDATE_BADGE]: updateBadge
})
