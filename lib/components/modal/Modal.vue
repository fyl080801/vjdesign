<template>
  <div ref="wrapper" class="v-jdesign-modal" style="z-index: -1">
    <div ref="backdrop" class="modal-backdrop fade"></div>
    <div
      ref="dialog"
      class="modal fade"
      tabindex="-1"
      aria-modal="true"
      role="dialog"
      :style="{
        display: 'block'
      }"
    >
      <v-jform
        v-if="!updating"
        tag="div"
        :class="['modal-dialog', 'modal-' + (popup.size ? popup.size : '')]"
        v-model="popup.model"
        :fields="popup.fields"
        :datasource="popup.datasource"
        :listeners="popup.listeners"
        :components="edit.components"
        :initialling="popup.initialling"
      ></v-jform>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import vjform from 'vjform/lib'

export default {
  components: { [vjform.name]: vjform },
  computed: { ...mapGetters(['popup', 'edit']) },
  data() {
    return {
      updating: false
    }
  },
  watch: {
    ['popup.show']: {
      handler(value) {
        if (value === true) {
          const style = window.getComputedStyle(this.$refs.backdrop)
          this.$refs.wrapper.style.display = 'block'
          this.$refs.wrapper.style.zIndex = style.zIndex

          setTimeout(() => {
            this.$refs.backdrop.classList.add('show')
          })
        } else {
          setTimeout(() => {
            this.$refs.dialog.classList.remove('show')
          })
        }

        this.updating = true
        this.$nextTick(() => {
          this.updating = false
        })
      }
    }
  },
  methods: {
    onTransitionend() {
      if (this.popup.show) {
        this.$refs.dialog.classList.add('show')
      } else {
        this.$refs.wrapper.style.display = 'none'
        this.$refs.wrapper.style.zIndex = '-1'
      }
    },
    onDialogTransitionend() {
      if (!this.popup.show) {
        this.$refs.backdrop.classList.remove('show')
      }
    }
  },
  mounted() {
    document.body.appendChild(this.$el)
    this.$refs.backdrop.addEventListener('transitionend', this.onTransitionend)
    this.$refs.dialog.addEventListener(
      'transitionend',
      this.onDialogTransitionend
    )
  },
  beforeDestroy() {
    this.$refs.backdrop.removeEventListener(
      'transitionend',
      this.onTransitionend
    )
    this.$refs.dialog.removeEventListener(
      'transitionend',
      this.onDialogTransitionend
    )
  }
}
</script>

<style lang="scss">
.v-jdesign-modal {
  position: fixed;

  > .modal {
    overflow: auto !important;
  }
}
</style>
