import { getFeature } from './map'

export const getEditor = (name = 'default') => {
  return getFeature('editor').get(name)
}

export const getEditorFactory = name => {
  const factory = getEditor(name)

  return (path, options) => {
    return factory(path, options)
  }
}

export default store => {
  // factory 用于创建编辑器的定义
  return (name, factory) => {
    store.set(name, factory)
  }
}
