import Vue from 'vue'
import { isEmpty } from 'lodash-es'

export default Vue.extend({
  props: {
    title: String,
    message: String,
    visible: Boolean,
    backdrop: Boolean,
    size: { type: String },
    cancelText: { type: String, default: '取消' },
    okText: { type: String, default: '确定' }
  },
  computed: {
    modalSize() {
      return isEmpty(this.size) || this.size === 'md' ? '' : `modal-${this.size}`
    }
  },
  watch: {
    visible: {
      handler(value) {
        if (value === true) {
          const style = window.getComputedStyle(this.$refs.backdrop)
          this.$refs.wrapper.style.display = 'block'
          this.$refs.wrapper.style.zIndex = style.zIndex

          setTimeout(() => {
            this.$refs.backdrop.classList.add('show')
            this.$refs.dialog.classList.add('show')
          })
        } else {
          setTimeout(() => {
            this.$refs.dialog.classList.remove('show')
            this.$refs.backdrop.classList.remove('show')
          })
        }
      }
    }
  },
  methods: {
    init() {
      this.$refs.backdrop.addEventListener('transitionend', this.onTransitionend)
    },
    release() {
      this.$refs.backdrop.removeEventListener('transitionend', this.onTransitionend)
    },
    onTransitionend() {
      if (!this.visible) {
        this.$refs.wrapper.style.display = 'none'
        this.$refs.wrapper.style.zIndex = '-1'
      }
    },
    //
    onCancel() {
      this.visible = false
      this.callback('cancel')
    },
    onOk() {
      this.visible = false
      this.callback('confirm')
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.release()
  },
  render() {
    return (
      <div ref="wrapper">
        <div ref="backdrop" class="modal-backdrop fade"></div>
        <div ref="dialog" class="modal fade" style={{ display: 'block' }}>
          <div class={['modal-dialog', this.modalSize]}>
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{this.$slots.title ? this.$slots.title : this.title}</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.onCancel}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">{this.$slots.default || this.message}</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary btn-sm"
                  data-dismiss="modal"
                  onClick={this.onCancel}
                >
                  {this.cancelText}
                </button>
                <button type="button" class="btn btn-primary btn-sm" onClick={this.onOk}>
                  {this.okText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
