import { getMapDefault } from '../utils/helpers'
import * as editor from './editor'
import * as designer from './designer'

const registries = {
  editor,
  designer
}

const getFeature = (map, type) => {
  return getMapDefault(map, type, new Map())
}

const registerFactory = map => {
  return type =>
    (registries[type].register || new Function())(getFeature(map, type))
}

const mergeFactory = map => {
  return (type, stored) =>
    (registries[type].merge || new Function())(
      getFeature(map, type),
      getFeature(stored, type)
    )
}

const resolveFactory = map => {
  return type =>
    (registries[type].resolve || new Function())(getFeature(map, type))
}

export const createRegistry = stored => {
  const map = new Map()
  const register = registerFactory(map)

  if (stored) {
    const merge = mergeFactory(map)

    merge('editor', stored)
    merge('designer', stored)
    //
  }

  const resolve = resolveFactory(map)

  const instance = {
    map,
    use: builder => {
      typeof builder !== 'function' ||
        builder({
          editor: register('editor'),
          designer: register('designer')
          //
        })
      return instance
    },
    build: () => ({
      editor: resolve('editor'),
      designer: resolve('designer')
      //
    })
  }

  return instance
}
