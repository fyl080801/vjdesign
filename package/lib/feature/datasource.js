import { getFeature } from './map'
import { cloneDeep } from 'lodash-es'

export const getDatasource = type => {
  return cloneDeep(getFeature('datasource').get(type))
}

export const getDatasources = () => {
  const result = []

  getFeature('datasource').forEach((ds, key) => {
    result.push({ type: key, ...ds })
  })

  return result
}

export default store => {
  return (type, description, options = []) => {
    const component = {
      description,
      options
    }

    store.set(type, component)
  }
}
