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
            <property-item
              label="条件"
              class="col-md-8"
              :value="item.condition"
              @input="value => (item.condition = value)"
              :transform="true"
              @clear="onActionClear(item, 'condition')"
              @changeType="
                value => onActionTypeChange(item, 'condition', value)
              "
            >
              <div>
                <input type="checkbox" v-model="item.condition" />
              </div>
            </property-item>
            <div class="form-group col-md-4">
              <label>延时</label>
              <input
                class="form-control"
                type="number"
                v-model.number="item.timeout"
              />
            </div>
          </div>
          <property-item
            label="行为"
            :value="item.handler"
            @input="value => (item.handler = value)"
            :transform="['@']"
            @clear="onActionClear(item, 'handler')"
            @changeType="value => onActionTypeChange(item, 'handler', value)"
          >
            <div>
              <input class="form-control" v-model="item.handler" />
            </div>
          </property-item>
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
import { PropertyItem } from '../../components/property'
import { set, get } from 'lodash-es'
import { deepSet } from '../../utils/helpers'

export default {
  components: { SvgIcon, PropertyItem },
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
    },
    onActionClear(item, prop) {
      set(item, prop, undefined)
    },
    onActionTypeChange(item, prop, value) {
      const cache = get(item, prop)

      if (value === true) {
        deepSet(item, prop, { $type: 'design', $cache: cache })
      } else {
        if (
          typeof cache === 'object' &&
          cache !== null &&
          cache.$type === 'design' &&
          cache.$cache !== undefined
        ) {
          deepSet(item, prop, cache.$cache)
        } else {
          deepSet(item, prop, undefined)
        }
      }
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
