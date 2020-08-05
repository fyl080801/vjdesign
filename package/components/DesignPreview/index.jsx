import Vue from 'vue'
import { mapState } from 'vuex'
import VJForm from 'vjform'

export default Vue.extend({
  computed: mapState({
    fields: state => state.form.value.fields,
    listeners: state => state.form.value.listeners,
    datasource: state => state.form.value.datasource,
    schema: state => state.form.value.schema,
    model: state => state.form.model,
    designComponents: state => state.components
  }),
  data() {
    return {
      options: { dev: false }
    }
  },
  methods: {
    updateModel(value) {
      this.$store.commit('form/UPDATE_MODEL', value)
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
          listeners={this.listeners}
          datasource={this.datasource}
          schema={this.schema}
          options={this.options}
        ></VJForm>
      </div>
    )
  }
})
