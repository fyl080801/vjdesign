<template>
  <div class="design">
    <v-jform
      v-model="edit.model"
      :components="edit.components"
      :fields="form.fields"
      :listeners="form.listeners"
      :datasource="form.datasource"
      :initialling="onInitialling"
      :options="options"
    ></v-jform>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import vjform from 'vjform'
import designer from '../../internal/providers/designer'

export default {
  components: { [vjform.name]: vjform },
  data() {
    return {}
  },
  computed: { ...mapGetters(['form', 'edit', 'options']) },
  methods: {
    onInitialling({ provider }) {
      provider(designer)
    }
  }
}
</script>

<style scoped>
.design {
  flex: 1;
}
</style>
