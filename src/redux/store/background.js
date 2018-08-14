import { compose, createStore, applyMiddleware } from 'redux'
import { APP_NAME } from 'utils/constants'
import { wrapStore } from 'react-chrome-redux'
import badge from 'middleware/core/badge'
import storage from 'middleware/core/storage'
import browserAction from 'middleware/core/browserAction'
import counter from 'middleware/features/counter'
import { composeWithDevTools } from 'remote-redux-devtools'

import rootReducer from 'reducers'

const composeEnhancers = composeWithDevTools ? composeWithDevTools({ suppressConnectErrors: false, port: 8000 }) : compose

const coreMiddleware = [badge, storage, browserAction]
const featureMiddleware = [counter]

const enhancer = composeEnhancers(applyMiddleware(...[...featureMiddleware, ...coreMiddleware]))

let store

export default (initialState) => {
  if (store) return store
  store = createStore(rootReducer, initialState, enhancer)
  wrapStore(store, { portName: APP_NAME })
  return store
}
