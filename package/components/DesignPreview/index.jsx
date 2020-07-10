import Vue from "vue";
import { mapState } from "vuex";
import VJForm from "vjform";

export default Vue.extend({
  computed: mapState({
    fields: state => state.form.value.fields,
    watchs: state => state.form.value.watchs,
    datasource: state => state.form.value.datasource,
    schema: state => state.form.value.schema,
    inits: state => state.form.value.inits,
    model: state => state.form.model,
    designComponents: state => state.components
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
  },
  render() {
    return (
      <div class="preview">
        <VJForm
          v-show={this.fields.length}
          value={this.model}
          onInput={this.updateModel}
          components={this.designComponents}
          fields={this.fields}
          watchs={this.watchs}
          datasource={this.datasource}
          schema={this.schema}
          inits={this.inits}
          options={this.options}
        ></VJForm>
      </div>
    );
  }
});
