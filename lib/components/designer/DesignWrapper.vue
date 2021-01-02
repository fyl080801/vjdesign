<template>
  <div :class="classes" @click="onClick">
    <slot></slot>
    <div class="header">
      <slot name="header"></slot>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'v-jd-design-wrapper',
  props: {
    field: Object,
    copyClass: { type: Boolean, required: false, default: null }
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
      return this.form.editing === this.field.uuid
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
      if (this.field.uuid === this.form.editing) {
        this.$store.dispatch('form/unselect')
      } else {
        this.$store.dispatch('form/select', {
          uuid: this.field.uuid,
          value: this.field
        })
      }
      evt.stopPropagation()
    }
  },
  mounted() {
    if (this.copyClass !== false && this.$children.length > 0) {
      this.childClass = [...this.$children[0].$el.classList]
      this.$children[0].$el.classList.remove(...this.$children[0].$el.classList)
    }
  }
}
</script>

<style lang="scss">
$design-border: 1px dashed #dcdfe6;

.v-jdesign {
  .design {
    .inner {
      .v-jd-design-wrapper {
        padding-top: calc(1.45rem + 1px);
        position: relative;
        z-index: 0;

        > .header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
        }
      }
    }
  }
}
</style>
