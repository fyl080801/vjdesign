import Vue from 'vue'

export default Vue.extend({
  props: {
    message: String
  },
  render() {
    return <div>{this.message}</div>
  }
})
