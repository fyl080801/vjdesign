<template>
  <div class="v-jd-listeners-actions">
    <div v-if="actions" class="listener-actions">
      <div :key="index" v-for="(item, index) in actions" class="card">
        <div class="card-body">
          <div class="delete">
            <button class="btn btn-link delete" @click="onRemove(index)">
              <SvgIcon name="trash-alt"></SvgIcon>
              <span>删除</span>
            </button>
          </div>
          <div class="row">
            <div class="form-group col-md-8">
              <label>条件</label>
              <input class="form-control" v-model="item.condition" />
            </div>
            <div class="form-group col-md-4">
              <label>延时</label>
              <input
                class="form-control"
                type="number"
                v-model.number="item.timeout"
              />
            </div>
          </div>
          <div class="form-group">
            <label>行为</label>
            <input class="form-control" v-model="item.handler" />
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-body add">
          <a href="javascript:;" @click="onAdd">
            <SvgIcon name="plus"></SvgIcon>
            <span>添加行为</span>
          </a>
        </div>
      </div>
    </div>
    <p class="empty" v-else>创建或选择监听</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SvgIcon from 'vue-svgicon'

export default {
  components: { SvgIcon },
  computed: {
    ...mapGetters(['form']),
    actions() {
      return this.form.listener !== null
        ? this.form.value.listeners[this.form.listener].actions || []
        : null
    }
  },
  methods: {
    onAdd() {
      this.$store.dispatch('form/addAction')
    },
    onRemove(index) {
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
                        this.$store.dispatch('form/removeAction', index)
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

<style lang="scss">
.v-jdesign {
  .v-jd-listeners-actions {
    display: flex;
    justify-content: center;
    flex-direction: column;

    > .listener-actions {
      padding: 0.75rem 1.25rem;
      flex: 1;
      overflow: auto;

      > .card {
        margin-bottom: 0.75rem;

        .delete {
          position: absolute;
          right: 1.25rem;
          z-index: 1;

          > button {
            display: contents;

            > .svg-icon {
              margin-right: 0.25rem;
            }
          }
        }
      }

      .add {
        text-align: center;

        .svg-icon {
          margin-right: 0.25rem;
        }
      }
    }

    > .empty {
      text-align: center;
      color: #c0c4cc;
    }
  }
}
</style>
