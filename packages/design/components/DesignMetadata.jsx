import Vue from "vue";
import { mapState } from "vuex";
import JsonViewer from "vue-json-viewer";
import { cloneDeep } from "lodash-es";
import { eachTreeNodes } from "../utils/tree";

export default Vue.extend({
  name: "design-metadata",
  components: {
    JsonViewer
  },
  computed: mapState({
    fields: state => {
      const fields = cloneDeep(state.form.fields);
      eachTreeNodes(fields, node => {
        delete node.uuid;
      });
      return {
        inits: state.form.inits,
        datasource: state.form.datasource,
        watchs: state.form.watchs,
        schema: state.form.schema,
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
