<template>
  <json-viewer
    v-if="complete"
    :value="json"
    :expand-depth="10"
    copyable
  ></json-viewer>
</template>

<script>
import { mapState } from "vuex";
import JsonViewer from "vue-json-viewer";
import { cloneDeep } from "lodash-es";
import { eachTreeNodes } from "../utils/tree";

export default {
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
  }
};
</script>

<style></style>
