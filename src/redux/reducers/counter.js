import { UPDATE_COUNTER } from 'actions/counter'
import reducerCreator from 'reduxUtils/reducerCreator'

export default reducerCreator({
  [UPDATE_COUNTER]: ({ state, action: { payload: count } }) => ({ ...state, count })
}, { count: 0 })
