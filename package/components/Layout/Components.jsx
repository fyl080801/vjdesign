import Vue from 'vue'
import ComponentList from '../ComponentList'
import { getGroups } from '../../lib/feature/component'

export default Vue.extend({
  data() {
    return {
      origin: []
    }
  },
  mounted() {
    this.origin = getGroups()
  },
  render() {
    return (
      <div class="v-jd-aside left">
        <ul class="nav nav-tabs v-jd-tabs" role="tablist">
          <li class="nav-item v-jd-tabitem" role="presentation" style="width: 50%">
            <a class="nav-link active v-jd-link" role="tab" href="javascript:;">
              组件库
            </a>
          </li>
        </ul>
        <div class="tab-content v-jd-tabcontent">
          <div
            class="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <ComponentList list={this.origin} />
          </div>
        </div>
      </div>
    )
  }
})
