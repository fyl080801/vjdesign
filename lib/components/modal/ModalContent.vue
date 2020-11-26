<template>
  <div>
    <div class="modal-header">
      <h5 class="modal-title">{{ popup.title }}</h5>
      <button
        type="button"
        class="close"
        data-dismiss="modal"
        aria-label="Close"
        @click="onClose"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
    <div class="modal-body">
      <slot></slot>
    </div>
    <div class="modal-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'v-jd-modal-content',
  computed: { ...mapGetters(['popup']) },
  methods: {
    onClose() {
      this.$store.dispatch('popup/close')
    }
  }
}
</script>
