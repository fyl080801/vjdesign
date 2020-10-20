<template>
  <div class="v-jdesign-modal">
    <div
      ref="bg"
      class="modal-backdrop"
      :style="{ display: popup.show ? 'block' : 'none' }"
    ></div>
    <div
      ref="backdrop"
      class="modal"
      tabindex="-1"
      aria-modal="true"
      role="dialog"
      :style="{
        display: popup.show ? 'block' : 'none',
        'z-index': popup.show ? 1072 : -1072
      }"
    >
      <v-jform
        tag="div"
        class="modal-dialog"
        v-model="popup.model"
        :fields="popup.fields"
        :datasource="popup.datasource"
        :listeners="popup.listeners"
        :components="edit.components"
      ></v-jform>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import vjform from 'vjform'

export default {
  components: { [vjform.name]: vjform },
  computed: { ...mapGetters(['popup', 'edit']) },
  watch: {
    ['popup.show'](value) {
      // 无动画，回头再说
      if (value) {
        this.$refs.bg.classList.add('fade', 'show')
        this.$refs.backdrop.classList.add('fade', 'show')
      } else {
        this.$refs.backdrop.classList.remove('show', 'fade')
        this.$refs.bg.classList.remove('fade', 'show')
      }
    }
  },
  mounted() {
    document.body.appendChild(this.$el)
  }
}
</script>

<style lang="scss">
.v-jdesign-modal {
  position: fixed;
}
</style>
