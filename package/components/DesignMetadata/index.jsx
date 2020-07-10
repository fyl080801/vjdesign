import Vue from "vue";
import { mapState } from "vuex";
import JsonViewer from "vue-json-viewer";
import { cloneDeep } from "lodash-es";
import { eachTreeNodes } from "../../utils/tree";

export default Vue.extend({
  components: {
    JsonViewer
  },
  computed: mapState({
    fields: state => {
      const fields = cloneDeep(state.form.value.fields);
      eachTreeNodes(fields, node => {
        delete node.uuid;
      });
      return {
        inits: state.form.value.inits,
        datasource: state.form.value.datasource,
        watchs: state.form.value.watchs,
        schema: state.form.value.schema,
        fields
      };
    }
  }),
  data() {
    return {
      complete: true,
      json: {}
    };
  },
  watch: {
    fields(value) {
      this.complete = false;
      this.json = value;
    },
    json() {
      this.$nextTick(() => {
        this.complete = true;
      });
    }
  },
  render() {
    return this.complete ? (
      <json-viewer value={this.json} expand-depth={10} copyable></json-viewer>
    ) : null;
  }
});
