import { labelCreator } from 'reduxUtils/actions'

const LABEL = labelCreator('counter')

export const INCREMENT = `${LABEL} Increment`
export const UPDATE_COUNTER = `${LABEL} Update counter`

export const increment = () => ({
  type: INCREMENT
})

export const updateCounter = value => ({
  type: UPDATE_COUNTER,
  payload: value,
  meta: {
    storeState: {
      stateKeys: ['counter']
    }
  }
})
