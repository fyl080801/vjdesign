<template>
  <form>
    <div class="form-group">
      <label>名称</label>
      <input class="form-control" v-model="value.name" />
    </div>
    <div class="form-group">
      <label>类型</label>
      <select class="form-control" v-model="value.type">
        <option
          :key="key"
          :value="key"
          v-for="key in Object.keys(profile.datasource)"
        >
          {{ profile.datasource[key].label }}
        </option>
      </select>
    </div>
    <v-jform
      v-model="value"
      :fields="fields"
      :components="edit.components"
    ></v-jform>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import { resolveForm } from '../../utils/property'
import vjform from 'vjform'

export default {
  name: 'v-jd-datasource-form',
  components: { [vjform.name]: vjform },
  props: {
    value: Object
  },
  data() {
    return {
      fields: []
    }
  },
  computed: { ...mapGetters(['edit', 'profile']) },
  watch: {
    ['value.type']: {
      handler(value) {
        if (!value) {
          return
        }

        this.fields = resolveForm(
          this.profile.datasource[value].properties,
          this.value
        )(this.edit.registry.editor)
      },
      immediate: true
    }
  },
  methods: {}
}
</script>
