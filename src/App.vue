<template>
  <div id="app">
    <v-jdesign :value="designValue" @input="changed" :components="components"></v-jdesign>
  </div>
</template>

<script>
import FieldSet from './components/FieldSet.vue'

export default {
  name: 'App',
  data() {
    return {
      designValue: {
        fields: []
      },
      components: { FieldSet }
    }
  },
  methods: {
    changed(value) {
      this.designValue = value
    }
  }
}
</script>

<style>
#app {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
}
</style>
