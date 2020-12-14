<template>
  <form>
    <v-jform
      v-model="value"
      :fields="fields"
      :components="edit.components"
    ></v-jform>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import vjform from 'vjform'
import { resolveForm } from '../../utils/property'

export default {
  name: 'v-jd-object-form',
  components: { [vjform.name]: vjform },
  props: {
    value: Object,
    properties: Array
  },
  computed: { ...mapGetters(['edit']) },
  data() {
    return {
      fields: []
    }
  },
  mounted() {
    this.fields = resolveForm(
      this.properties,
      this.value
    )(this.edit.registry.editor)
  }
}
</script>
