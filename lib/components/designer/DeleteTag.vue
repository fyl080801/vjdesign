<template>
  <a
    v-if="form.editing === field.uuid"
    class="design-tag delete"
    @click="onDrop"
  >
    <SvgIcon name="trash-alt"></SvgIcon>
    <span>删除</span>
  </a>
</template>

<script>
import SvgIcon from '../../icons'
import { mapGetters } from 'vuex'

export default {
  name: 'v-jd-delete-tag',
  props: { field: Object },
  components: { SvgIcon },
  computed: { ...mapGetters(['form']) },
  methods: {
    onDrop(evt) {
      this.$store
        .dispatch('popup/confirm', {
          title: '删除',
          content: '是否删除？'
        })
        .then(() => {
          this.$store.dispatch('form/removeField', this.field.uuid)
        })
        .catch(() => {
          //
        })
      evt.stopPropagation()
    }
  }
}
</script>

<style lang="scss" scoped>
.delete {
  border-color: #007bff !important;
  color: #007bff !important;
  right: 0;
}
</style>
