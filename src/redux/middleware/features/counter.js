import { updateBadge } from 'actions/badge'
import { INCREMENT, updateCounter } from 'actions/counter'
import middlewareCreator from 'reduxUtils/middlewareCreator'

const increment = ({ store: { getState }, next }) => {
  const { counter: { count } } = getState()
  next(updateCounter(count + 1))
  next(updateBadge(count + 1))
}

export default middlewareCreator({
  [INCREMENT]: increment
})
