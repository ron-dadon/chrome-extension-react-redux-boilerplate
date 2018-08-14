import React from 'react'
import ReactDOM from 'react-dom'
import store from 'store/content'
import withBackgroundStore from 'shared/hoc/withBackgroundStore'
import { MOUNTING_DIV_ID } from 'utils/constants'

export const getMountingPoint = (id, style) => {
  const mountElement = document.getElementById(id)
  if (mountElement) return mountElement
  const newMountElement = document.createElement('div')
  newMountElement.setAttribute('id', id)
  if (style) newMountElement.style = style
  document.body.appendChild(newMountElement)
  return newMountElement
}

export const mountWithStore = ({ Component, elementId, elementStyle }) => {
  const WithStoreComponent = withBackgroundStore(Component)
  store.ready().then(() => {
    ReactDOM.render(<WithStoreComponent />, getMountingPoint(elementId || MOUNTING_DIV_ID, elementStyle))
  })
}

export const removeMountingPoint = (id) => {
  const mountElement = document.getElementById(id)
  if (!mountElement) return
  document.body.removeChild(mountElement)
}
