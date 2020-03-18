<template>
  <div class="preview">
    <vjform
      v-show="fields.length"
      :value="model"
      @input="updateModel"
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
    inits: state => state.form.inits,
    model: state => state.form.model
  }),
  data() {
    return {
      options: { dev: false }
    };
  },
  methods: {
    updateModel(value) {
      this.$store.commit("form/UPDATE_MODEL", value);
    }
  }
};
</script>

<style></style>
