<template>
  <div class="preview">
    <!-- <vjform
      v-show="fields.length"
      :fields="fields"
      :watchs="watchs"
      :datasource="datasource"
      :schema="schema"
      :inits="inits"
    ></vjform> -->
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "design-preview",
  computed: mapState({
    fields: state => state.form.fields,
    watchs: state => state.form.watchs,
    datasource: state => state.form.datasource,
    schema: state => state.form.schema,
    inits: state => state.form.inits
  })
};
</script>

<style></style>
