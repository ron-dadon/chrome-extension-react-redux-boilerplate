export default (handlers, options = {}) => store => next => (action) => {
  const { autoNext = true } = options
  if (autoNext) next(action)
  if (handlers[action.type]) {
    handlers[action.type]({ store, next, action })
  }
}
