/* eslint-disable no-confusing-arrow */
export default (handlers, defaultState) =>
  (state = defaultState, action) =>
    handlers[action.type] ? handlers[action.type]({ state, action }) : state
