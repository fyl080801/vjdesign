<template>
  <div class="preview">
    <vjform
      v-show="fields.length"
      v-model="model"
      :fields="fields"
      :watchs="watchs"
      :datasource="datasource"
      :schema="schema"
      :inits="inits"
      :options="options"
    ></vjform>
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
  }),
  data() {
    return {
      model: {},
      options: { dev: false }
    };
  }
};
</script>

<style></style>
