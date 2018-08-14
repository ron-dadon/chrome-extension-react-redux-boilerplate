import { labelCreator } from 'reduxUtils/actions'

const LABEL = labelCreator('badge')

export const UPDATE_BADGE = `${LABEL} Update`

export const updateBadge = value => ({
  type: UPDATE_BADGE,
  payload: value
})
