export const saveComponentCache = () => {
  return field => {
    field._cachecomponent = field.component
  }
}

export const getComponentCache = () => {
  return field => {
    field.component = field.component || field._cachecomponent
  }
}
