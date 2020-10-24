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
import SvgIcon from 'vue-svgicon'
import { mapGetters } from 'vuex'

export default {
  name: 'v-jd-delete-tag',
  props: { field: Object },
  components: { SvgIcon },
  computed: { ...mapGetters(['form']) },
  methods: {
    onDrop(evt) {
      this.$store.dispatch('popup/show', {
        title: '删除',
        size: 'sm',
        form: {
          fields: [
            {
              component: 'v-jd-modal-content',
              children: [
                { component: 'p', text: '是否删除?' },
                {
                  component: 'button',
                  text: '确定',
                  fieldOptions: {
                    slot: 'footer',
                    class: 'btn btn-primary',
                    on: {
                      click: () => {
                        this.$store.dispatch(
                          'form/removeField',
                          this.field.uuid
                        )
                        this.$store.dispatch('popup/close')
                      }
                    }
                  }
                },
                {
                  component: 'button',
                  text: '取消',
                  fieldOptions: {
                    slot: 'footer',
                    class: 'btn btn-secondary',
                    on: { click: () => this.$store.dispatch('popup/close') }
                  }
                }
              ]
            }
          ]
        }
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
