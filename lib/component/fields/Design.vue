<template>
  <div class="design">
    <v-jform
      v-model="edit.model"
      :components="components"
      :fields="form.fields"
      :listeners="form.listeners"
      :datasource="form.datasource"
      :initialling="onInitialling"
    ></v-jform>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import vjform from 'vjform'

export default {
  components: { [vjform.name]: vjform },
  computed: { ...mapGetters(['components', 'form', 'edit']) },
  methods: {
    onInitialling() {}
  }
}
</script>

<style scoped>
.design {
  flex: 1;
}
</style>
