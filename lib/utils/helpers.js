export const getMapDefault = (map, key, def) => {
  const value = map.get(key)
  if (value === undefined || value === null) {
    map.set(key, def)
    return map.get(key)
  } else {
    return value
  }
}
