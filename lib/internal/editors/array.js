export default (path, options, prop) => {
  let { fields, listeners = [], datasource = {} } = options
  const { properties = [] } = prop

  fields =
    fields ||
    properties.map(item => ({
      component: 'p',
      condition: '$:model.' + item.name + ' !== undefined',
      text: '#:' + item.label + ': ${model.' + item.name + '}',
      fieldOptions: { style: 'margin-bottom: 0' }
    }))

  return {
    component: 'v-jd-array-property',
    model: [path],
    fieldOptions: {
      props: {
        prop,
        '^:form': { fields, listeners, datasource }
      }
    }
  }
}
