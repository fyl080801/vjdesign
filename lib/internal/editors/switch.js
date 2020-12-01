export default path => {
  return {
    component: 'div',
    children: [
      {
        component: 'v-jd-switch',
        model: [path]
      }
    ]
  }
}
