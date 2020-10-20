<template>
  <a class="delete" @click="onDrop">
    <SvgIcon name="trash-alt"></SvgIcon>
    <span>删除</span>
  </a>
</template>

<script>
import SvgIcon from 'vue-svgicon'

export default {
  name: 'v-jd-delete-element',
  props: { uuid: Symbol },
  components: { SvgIcon },
  methods: {
    onDrop() {
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
                        this.$store.dispatch('form/removeChild', this.uuid)
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
    }
  }
}
</script>

<style lang="scss" scoped>
.delete {
  position: absolute;
  top: 0;
  right: 0;
  color: #409eff;

  border: 1px dashed #409eff;
  background-color: rgba(0, 0, 0, 0.03);

  padding: 0 0.5rem;
  line-height: 1.45rem;

  .svg-icon {
    margin-right: 0.25rem;
  }
}
</style>
