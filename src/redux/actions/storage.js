import { errorTag, labelCreator } from 'reduxUtils/actions'

const LABEL = labelCreator('storage')

export const STORAGE_SET = `${LABEL} Stored value`
export const STORAGE_SET_ERROR = `${LABEL} storing value ${errorTag}`

export const storageSet = payload => ({
  type: STORAGE_SET,
  payload
})

export const storageSetError = ({ message, value }) => ({
  type: STORAGE_SET_ERROR,
  payload: { message, value }
})
