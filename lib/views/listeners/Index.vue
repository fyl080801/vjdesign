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
          <div class="form-group">
            <div class="delete">
              <button
                class="btn btn-link delete"
                @click="onRemove($event, index)"
              >
                <SvgIcon name="trash-alt"></SvgIcon>
                <span>删除</span>
              </button>
            </div>
            <label>监听对象</label>
            <input
              class="form-control"
              :value="item.watch"
              @change="onWatchChange($event, index)"
            />
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
import SvgIcon from 'vue-svgicon'
import { Switch } from '../../components/controls'
import Actions from './Actions'

export default {
  components: { SvgIcon, [Switch.name]: Switch, Actions },
  computed: { ...mapGetters(['form']) },
  methods: {
    onAdd() {
      this.$store.dispatch('form/addListener')
    },
    onRemove(evt, index) {
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
    onWatchChange(evt, index) {
      this.$store.dispatch('form/updateListener', {
        index,
        value: evt.target.value
      })
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

        > .form-group {
          position: relative;

          .delete {
            position: absolute;
            right: 0;

            > button {
              display: contents;

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
