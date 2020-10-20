export const register = store => {
  return (name, factory) => {
    store.set(name, factory)
  }
}

export const merge = (store, sourceStore) => {
  sourceStore.forEach((value, key) => {
    store.set(key, value)
  })
}

export const resolve = store => {
  const stored = {}

  store.forEach((value, key) => {
    stored[key] = value
  })

  return stored
}
