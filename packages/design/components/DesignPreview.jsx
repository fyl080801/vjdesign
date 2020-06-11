import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  computed: mapState({
    fields: state => state.form.fields,
    watchs: state => state.form.watchs,
    datasource: state => state.form.datasource,
    schema: state => state.form.schema,
    inits: state => state.form.inits,
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
        <vjform
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
        ></vjform>
      </div>
    );
  }
});
