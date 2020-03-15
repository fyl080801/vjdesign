<template>
  <json-viewer :value="fields" :expand-depth="10" copyable></json-viewer>
</template>

<script>
import { mapState } from "vuex";
import JsonViewer from "vue-json-viewer";

export default {
  name: "design-metadata",
  components: {
    JsonViewer
  },
  computed: mapState({
    fields: state => state.form.fields
  })
};
</script>

<style></style>
