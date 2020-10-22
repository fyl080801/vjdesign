<template>
  <div :class="classes" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'v-jd-design-wrapper',
  props: {
    uuid: Symbol,
    value: Object
  },
  data() {
    return {
      rawClass: ['v-jd-design-wrapper', 'drag-handler'],
      childClass: []
    }
  },
  computed: {
    ...mapGetters(['form']),
    editing() {
      return this.form.editing === this.uuid
    },
    classes() {
      return [
        ...this.rawClass,
        ...this.childClass,
        this.editing ? 'editing' : ''
      ]
    }
  },
  methods: {
    onClick(evt) {
      if (this.uuid === this.form.editing) {
        this.$store.dispatch('form/unselect')
      } else {
        this.$store.dispatch('form/select', {
          uuid: this.uuid,
          value: this.value
        })
      }
      evt.stopPropagation()
    }
  },
  mounted() {
    if (this.$children.length > 0) {
      this.childClass = [...this.$children[0].$el.classList]
      this.$children[0].$el.classList.remove(...this.$children[0].$el.classList)
    }
  }
}
</script>
