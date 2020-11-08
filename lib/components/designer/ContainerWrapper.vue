<template>
  <vuedraggable
    v-if="(field.options || {}).collapse !== true"
    group="jdesign"
    draggable=".drag-handler"
    ghost-class="ghost"
    :class="{
      'v-jd-container-wrapper': true,
      editing: this.form.editing === this.field.uuid
    }"
    :value="value"
    @input="onInput"
  >
    <slot></slot>
  </vuedraggable>
</template>

<script>
import vuedraggable from 'vuedraggable'
import { mapGetters } from 'vuex'

export default {
  name: 'v-jd-container-wrapper',
  props: { value: { type: Array, default: () => [] }, field: Object },
  components: { vuedraggable },
  computed: { ...mapGetters(['form']) },
  methods: {
    onInput(value) {
      this.$store.dispatch('form/updateFields', {
        uuid: this.field.uuid,
        value
      })
    }
  }
}
</script>

<style lang="scss">
.v-jdesign {
  .design {
    .inner {
      .v-jd-container-wrapper {
        position: relative;
        padding: 0.75rem 1.25rem;
        padding-bottom: 0;
        z-index: 0;
      }
    }
  }
}
</style>
