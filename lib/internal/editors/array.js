export default (path, options, prop) => {
  return {
    component: 'v-jd-array-property',
    model: [path],
    fieldOptions: { props: { prop } }
  }
}
