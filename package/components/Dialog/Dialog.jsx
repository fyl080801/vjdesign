import Vue from 'vue'

export default Vue.extend({
  props: {
    title: String,
    visible: Boolean,
    backdrop: Boolean,
    cancelText: { type: String, default: '取消' },
    okText: { type: String, default: '确定' }
  },
  watch: {
    visible: {
      handler(value) {
        if (value === true) {
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
    onCancel() {
      this.visible = false
      setTimeout(() => {
        this.callback('cancel')
      })
    },
    onOk() {
      this.visible = false
      setTimeout(() => {
        this.callback('confirm')
      })
    }
    //
    // showBackdrop() {
    //   let backdropElm = document.querySelector('.modal-backdrop')
    //   if (!backdropElm) {
    //     backdropElm = document.createElement('div')
    //     backdropElm.classList.add('modal-backdrop')
    //     backdropElm.classList.add('fade')
    //     document.body.appendChild(backdropElm)
    //   }
    //   backdropElm.classList.add('show')
    // },
    // hideBackdrop() {
    //   const backdropElm = document.querySelector('.modal-backdrop')
    //   if (backdropElm) {
    //     backdropElm.classList.remove('show')
    //   }
    // }
  },
  render() {
    return (
      <div>
        <div ref="backdrop" class="modal-backdrop fade"></div>
        <div ref="dialog" class="modal fade" style={{ display: 'block' }}>
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{this.$slots.title ? this.$slots.title : this.title}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">{this.$slots.default}</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={this.onCancel}
                >
                  {this.cancelText}
                </button>
                <button type="button" class="btn btn-primary" onClick={this.onOk}>
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
