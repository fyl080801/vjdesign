<template>
  <div class="v-jd-listeners-actions">
    <div v-if="actions" class="listener-actions">
      <div :key="index" v-for="(item, index) in actions" class="card">
        <div class="card-body">
          <div class="v-jd-action-item">
            <div class="action-body">
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
                @changeType="
                  value => onActionTypeChange(item, 'handler', value)
                "
              >
                <div>
                  <input class="form-control" v-model="item.handler" />
                </div>
              </property-item>
            </div>
            <div class="delete">
              <button class="btn btn-link delete" @click="onRemove(index)">
                <SvgIcon name="trash-alt"></SvgIcon>
                <span>删除</span>
              </button>
            </div>
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
import SvgIcon from '../../icons'
import { PropertyItem } from '../../components/controls'
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
      this.$store
        .dispatch('popup/confirm', {
          title: '删除',
          content: '是否删除？'
        })
        .then(() => {
          this.$store.dispatch('form/removeAction', index)
        })
        .catch(() => {
          //
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

        .v-jd-action-item {
          display: flex;
          align-items: center;

          > .action-body {
            flex: 1;
            margin-right: 1.25rem;
          }

          > .delete {
            > button {
              > .svg-icon {
                margin-right: 0.25rem;
              }
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
