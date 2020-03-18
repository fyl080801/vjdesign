<template>
  <json-viewer :value="modelData" :expand-depth="10" copyable></json-viewer>
</template>

<script>
import { mapState } from "vuex";
import JsonViewer from "vue-json-viewer";

export default {
  name: "model-preview",
  components: {
    JsonViewer
  },
  computed: mapState({
    modelData: state => state.form.model
  })
};
</script>

<style></style>
