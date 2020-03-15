<template>
  <json-viewer :value="fields" :expand-depth="10" copyable></json-viewer>
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
      return fields;
    }
  })
};
</script>

<style></style>
