<template>
  <div class="v-jd-listeners">
    <div class="v-jd-listeners-watchs">
      <ul class="list-group list-group-flush">
        <li
          :key="index"
          v-for="(item, index) in form.value.listeners"
          :class="[
            'list-group-item',
            'listener-item',
            form.listener === index ? 'bg-light' : '',
            form.listener === index ? 'selected' : ''
          ]"
          @click="onSelect(index)"
        >
          <div class="v-jd-watch-item">
            <div class="watch-body">
              <div class="form-group">
                <property-item
                  label="监听对象"
                  :value="item.watch"
                  @input="value => onWatchChange(value, index)"
                  :transform="true"
                  @clear="onWatchChange(undefined, index)"
                  @changeType="value => onWatchTypeChange(value, index)"
                >
                  <div>
                    <input class="form-control" v-model="item.watch" />
                  </div>
                </property-item>
              </div>
              <div class="row">
                <div class="form-group col-md">
                  <label>深度监听</label>
                  <div>
                    <v-jd-switch v-model="item.deep"></v-jd-switch>
                  </div>
                </div>
                <div class="form-group col-md">
                  <label>立即执行</label>
                  <div>
                    <v-jd-switch v-model="item.immediate"></v-jd-switch>
                  </div>
                </div>
              </div>
            </div>
            <div class="delete">
              <button
                class="btn btn-link delete"
                @click="onRemove($event, index)"
              >
                <SvgIcon name="trash-alt"></SvgIcon>
                <span>删除</span>
              </button>
            </div>
          </div>
        </li>

        <li class="list-group-item add">
          <a href="javascript:;" @click="onAdd">
            <SvgIcon name="plus"></SvgIcon>
            <span>添加监听</span>
          </a>
        </li>
      </ul>
    </div>
    <Actions></Actions>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SvgIcon from '../../icons'
import { Switch } from '../../components/controls'
import Actions from './Actions'
import { PropertyItem } from '../../components/controls'

export default {
  components: { SvgIcon, [Switch.name]: Switch, Actions, PropertyItem },
  computed: { ...mapGetters(['form']) },
  methods: {
    onAdd() {
      this.$store.dispatch('form/addListener')
    },
    onRemove(evt, index) {
      this.$store.dispatch('popup/show', {
        size: 'sm',
        form: {
          fields: [
            {
              component: 'v-jd-modal-content',
              fieldOptions: { props: { title: '删除' } },
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
                        this.$store.dispatch('form/removeListener', index)
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
    },
    onSelect(index) {
      this.$store.dispatch('form/selectListener', index)
    },
    onWatchChange(value, index) {
      this.$store.dispatch('form/updateListener', {
        index,
        value
      })
    },
    onWatchTypeChange(value, index) {
      const cache = this.form.value.listeners[index].watch

      if (value === true) {
        this.$store.dispatch('form/updateListener', {
          index,
          value: { $type: 'design', $cache: cache }
        })
      } else {
        if (
          typeof cache === 'object' &&
          cache !== null &&
          cache.$type === 'design' &&
          cache.$cache !== undefined
        ) {
          this.$store.dispatch('form/updateListener', {
            index,
            value: cache.$cache
          })
        } else {
          this.$store.dispatch('form/updateListener', {
            index,
            value: undefined
          })
        }
      }
    }
  }
}
</script>

<style lang="scss">
.v-jdesign {
  .v-jd-listeners {
    flex: 1;
    display: flex;

    .v-jd-listeners-watchs {
      flex: 1;
      border-right: 1px solid #dcdfe6;
      overflow: auto;

      .listener-item {
        position: relative;
        padding-left: calc(1.25rem + 5px);

        &.selected {
          &:after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            background-color: #007bff;
            border-color: #f8f9fa;
            width: 5px;
          }
        }

        > .v-jd-watch-item {
          display: flex;
          align-items: center;

          > .watch-body {
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
    }

    .v-jd-listeners-actions {
      flex: 1;
    }

    .add {
      text-align: center;

      .svg-icon {
        margin-right: 0.25rem;
      }
    }
  }
}
</style>
