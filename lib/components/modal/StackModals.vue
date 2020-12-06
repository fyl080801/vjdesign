<template>
  <div ref="modal" class="v-jdesign-modal">
    <div
      :key="index"
      :ref="`popup_${index}`"
      v-for="(item, index) in stackModals"
      class="modal fade"
      style="display: block !important"
    >
      <div class="modal-dialog" :class="`modal-${item.size}`">
        <v-jform
          tag="div"
          class="modal-content"
          v-model="item.model"
          :fields="item.form.fields"
          :datasource="item.form.datasource"
          :listeners="item.form.listeners"
          :components="edit.components"
          :initialling="item.form.initialling"
        ></v-jform>
      </div>
    </div>
    <div ref="backdrop" class="modal-backdrop fade"></div>
  </div>
</template>

<script>
import vjform from 'vjform'
import { mapGetters } from 'vuex'

const TRANSITION_END = 'transitionend'
const Z_INDEX_UNIT = 5

export default {
  props: { modals: Array },
  components: { [vjform.name]: vjform },
  computed: { ...mapGetters(['edit']) },
  data() {
    return {
      stackModals: [...this.modals]
    }
  },
  watch: {
    'modals.length'(newValue, originValue) {
      if (newValue > originValue && newValue > 0) {
        this.syncModals()
        this.$nextTick(() => {
          this.pushShow(newValue - 1)
        })
      } else {
        this.popClose()
      }
    }
  },
  methods: {
    addBodyClass() {
      document.body.classList.add('modal-open')
    },
    removeBodyClass() {
      document.body.classList.remove('modal-open')
    },
    pushShow(index) {
      if (this.modals.length > 0) {
        this.addBodyClass()
      }

      const maxIndex = 1024 + this.getMaxZIndex()
      const modal = this.$refs.modal
      const backdrop = this.$refs.backdrop

      if (this.modals.length > 1) {
        // 已有弹窗
        this.setZIndex(backdrop, maxIndex + Z_INDEX_UNIT)

        const popup = modal.querySelectorAll('.modal')[index]
        if (popup) {
          this.setShow(popup, maxIndex + Z_INDEX_UNIT * 2)
        }
      } else {
        // 第一次弹窗

        this.setShow(modal, maxIndex)

        setTimeout(() => {
          this.setShow(backdrop, maxIndex)
          this.once(backdrop, TRANSITION_END, () => {
            const popup = modal.querySelectorAll('.modal')[index]
            if (popup) {
              this.setShow(popup, maxIndex + Z_INDEX_UNIT)
            }
          })
        })
      }
    },
    popClose() {
      const index = this.stackModals.length - 1
      const backdrop = this.$refs.backdrop
      const modal = this.$refs.modal
      const popup = modal.querySelectorAll('.modal')[index]

      if (!popup) {
        return
      }

      this.setClose(popup, () => {
        if (this.modals.length > 0) {
          // 还存在窗口
          const prePopup = modal.querySelectorAll('.modal')[index - 1]
          const current = window.getComputedStyle(prePopup).zIndex
          this.setZIndex(backdrop, +current - Z_INDEX_UNIT * 2)
          this.syncModals()
        } else {
          // 不存在窗口
          this.setClose(backdrop, () => {
            this.setClose(modal, () => {
              this.syncModals()
            })
          })
        }
      })
    },
    // utils
    syncModals() {
      this.stackModals = [...this.modals]
    },
    setZIndex(elm, zindex) {
      const styles = (elm.getAttribute('style') || '')
        .split(';')
        .map(item => item.trim())
        .filter(item => !/^z-index:/.test(item))
      styles.push(`z-index: ${zindex}`)

      elm.setAttribute(
        'style',
        styles.filter(item => item.trim() !== '').join('; ')
      )
    },
    setShow(elm, zindex) {
      this.setZIndex(elm, zindex)
      elm.classList.add('show')
    },
    setClose(elm, callback) {
      elm.classList.remove('show')
      this.once(elm, TRANSITION_END, () => {
        const styles = (elm.getAttribute('style') || '')
          .split(';')
          .map(item => item.trim())
          .filter(item => !/^z-index:/.test(item))
        elm.setAttribute(
          'style',
          styles.filter(item => item.trim() !== '').join('; ')
        )
        ;(callback || (() => {}))()
      })
    },
    once(elm, evt, callback) {
      const fn = () => {
        elm.removeEventListener(evt, fn)
        callback()
      }
      elm.addEventListener(evt, fn)
    },
    getMaxZIndex() {
      let maxIndex = 0
      document.querySelectorAll('*').forEach(elm => {
        const current = window.getComputedStyle(elm).zIndex
        if (current > maxIndex) {
          maxIndex = current
        }
      })
      return maxIndex === 'auto' ? 1024 : +maxIndex
    }
  }
}
</script>

<style lang="scss">
.v-jdesign-modal {
  display: none;

  &.show {
    display: block !important;
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
