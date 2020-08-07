import Vue from 'vue'
import { Fragment } from 'vue-fragment'

export default Vue.extend({
  render() {
    return <Fragment>{this.$slots.reference}</Fragment>
  }
})
