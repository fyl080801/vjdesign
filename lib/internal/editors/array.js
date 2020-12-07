export default (path, options, prop) => {
  return {
    component: 'v-jd-array-form',
    model: [path],
    fieldOptions: { props: { prop } }
  }
}
