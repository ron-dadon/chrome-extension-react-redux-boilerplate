import { Store } from 'react-chrome-redux'
import { APP_NAME } from 'utils/constants'

const store = new Store({
  portName: APP_NAME
})

export default store
