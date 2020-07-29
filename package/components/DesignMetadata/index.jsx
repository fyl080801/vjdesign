import Vue from "vue";
import { mapState } from "vuex";
import JsonViewer from "vue-json-viewer";
import { cloneDeep } from "lodash-es";
import { eachTreeNodes } from "../../utils/tree";

export default Vue.extend({
  computed: {
    ...mapState({
      fields: state => {
        const fields = cloneDeep(state.form.value.fields);
        eachTreeNodes(fields, node => {
          delete node.uuid;
        });
        return {
          datasource: state.form.value.datasource,
          listeners: state.form.value.listeners,
          schema: state.form.value.schema,
          fields
        };
      }
    })
  },
  render() {
    return <JsonViewer value={this.fields} expand-depth={10} copyable={true} />;
  }
});
