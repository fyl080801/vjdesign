<template>
  <div ref="modal" class="v-jdesign-modal">
    <div ref="popup" class="modal fade" style="display: block">
      <div class="modal-dialog" :class="`modal-${size}`">
        <slot></slot>
      </div>
    </div>
    <div ref="backdrop" class="modal-backdrop fade"></div>
  </div>
</template>

<script>
const TRANSITION_END = 'transitionend'

export default {
  props: {
    visiable: {
      type: Boolean,
      default: false
    },
    size: String,
    // 为true时无法通过点击遮罩层关闭modal
    force: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      duration: null
    }
  },
  watch: {
    visiable(value) {
      if (value) {
        this.addModalClass()
      } else {
        this.removeModalClass()
      }
    }
  },
  methods: {
    doTransition(callback) {
      this.$nextTick(() => {
        setTimeout(callback, 0)
      })
    },
    addBodyClass() {
      document.body.className += ' modal-open'
    },
    removeBodyClass() {
      document.body.className = document.body.className.replace(
        /\s?modal-open/,
        ''
      )
    },
    addModalClass() {
      this.addBodyClass()

      this.$refs.modal.className += ' show'

      this.doTransition(() => {
        const func = () => {
          this.$refs.popup.className += ' show'
          this.$refs.backdrop.removeEventListener(TRANSITION_END, func)
        }
        this.$refs.backdrop.addEventListener(TRANSITION_END, func)
        this.$refs.backdrop.className += ' show'
      })
    },
    removeModalClass() {
      const func1 = () => {
        this.$refs.backdrop.className = this.$refs.backdrop.className.replace(
          /\s?show/,
          ''
        )
        this.$refs.popup.removeEventListener(TRANSITION_END, func1)
      }

      const func2 = () => {
        this.$refs.modal.className = this.$refs.modal.className.replace(
          /\s?show/,
          ''
        )
        this.removeBodyClass()
        this.$refs.backdrop.removeEventListener(TRANSITION_END, func2)
      }

      this.$refs.popup.addEventListener(TRANSITION_END, func1)
      this.$refs.backdrop.addEventListener(TRANSITION_END, func2)
      this.$refs.popup.className = this.$refs.popup.className.replace(
        /\s?show/,
        ''
      )
    }
  },
  created() {
    if (this.visiable) {
      this.addModalClass()
    }
  },
  beforeDestroy() {
    this.removeBodyClass()
  }
}
</script>

<style lang="scss">
.v-jdesign-modal {
  display: none;

  &.show {
    display: block;
  }

  > .modal {
    overflow: auto !important;

    &.fade {
      &.show {
        .modal-dialog {
          -webkit-transform: none;
          transform: none;
        }
      }

      .modal-dialog {
        transition: -webkit-transform 0.3s ease-out;
        transition: transform 0.3s ease-out;
        transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
        -webkit-transform: translate(0, -50px);
        transform: translate(0, -50px);
      }
    }
  }
}
</style>
