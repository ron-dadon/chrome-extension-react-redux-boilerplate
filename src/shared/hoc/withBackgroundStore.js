import React from 'react'
import store from 'store/content'
import { Provider } from 'react-redux'

const withBackgroundStore = WrappedComponent => props => (
  <Provider store={store}>
    <WrappedComponent {...props} />
  </Provider>
)

export default withBackgroundStore
