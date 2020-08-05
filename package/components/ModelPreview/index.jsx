import Vue from 'vue'
import { mapState } from 'vuex'
import JsonViewer from 'vue-json-viewer'

export default Vue.extend({
  components: {
    JsonViewer
  },
  computed: mapState({
    modelData: state => state.form.model
  }),
  render() {
    return <json-viewer value={this.modelData} expand-depth={10} copyable />
  }
})
