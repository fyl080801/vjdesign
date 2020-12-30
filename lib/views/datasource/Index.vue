<template>
  <div class="v-jd-datasource">
    <div class="datasource-container row">
      <div :key="key" v-for="key in names" class="col-md-4">
        <div class="card datasource-item">
          <div class="card-body">
            <div class="row">
              <div class="form-group col-md-6">
                <label>名称</label>
                <div>
                  <span>{{ key }}</span>
                </div>
              </div>
              <div class="form-group col-md-6">
                <label>类型</label>
                <div>
                  <span>{{
                    (
                      profile.datasource[form.value.datasource[key].type] || {
                        label: '未知类型'
                      }
                    ).label
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            <a href="javascript:;" @click="onEdit(key)">
              <SvgIcon name="edit"></SvgIcon>
              <span>编辑</span>
            </a>
            <a href="javascript:;" @click="onRemove($event, key)">
              <SvgIcon name="trash-alt"></SvgIcon>
              <span>删除</span>
            </a>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card datasource-item add">
          <div class="card-body">
            <a href="javascript:;" @click="onAdd">
              <SvgIcon name="plus"></SvgIcon>
              <span>添加</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SvgIcon from '../../icons'
import { cloneDeep } from 'lodash-es'

export default {
  components: {
    SvgIcon
  },
  computed: {
    ...mapGetters(['form', 'popup', 'edit', 'profile']),
    names() {
      return Object.keys(this.form.value.datasource).filter(
        key => this.form.value.datasource[key]
      )
    },
    datasource() {
      return this.form.value.datasource
    }
  },
  methods: {
    resolveForm(title) {
      return [
        {
          component: 'v-jd-modal-content',
          fieldOptions: { props: { title } },
          children: [
            {
              component: 'v-jd-datasource-form',
              model: ['data'],
              fieldOptions: { ref: 'form' }
            },
            {
              component: 'button',
              text: '确定',
              fieldOptions: {
                slot: 'footer',
                class: 'btn btn-primary',
                on: {
                  click: '@:SUBMIT_DS()'
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
    },
    onAdd() {
      const model = { data: { name: '' } }

      this.$store.dispatch('popup/show', {
        model,
        form: {
          initialling: ({ functional }) => {
            functional('SUBMIT_DS', () => {
              this.$store.dispatch('form/setDatasource', model.data)
              this.$store.dispatch('popup/close')
            })
          },
          fields: this.resolveForm('添加数据源')
        }
      })
    },
    onEdit(key) {
      const model = {
        data: { ...cloneDeep(this.form.value.datasource[key]), name: key }
      }

      this.$store.dispatch('popup/show', {
        model,
        form: {
          initialling: ({ functional }) => {
            functional('SUBMIT_DS', () => {
              if (model.data.name !== this.form.value.datasource[key].name) {
                this.$store.dispatch('form/removeDatasource', key)
              }
              this.$store.dispatch('form/setDatasource', model.data)
              this.$store.dispatch('popup/close')
            })
          },
          fields: this.resolveForm('编辑数据源')
        }
      })
    },
    onRemove(evt, key) {
      this.$store
        .dispatch('popup/confirm', {
          title: '删除',
          content: '是否删除？'
        })
        .then(() => {
          this.$store.dispatch('form/removeDatasource', key)
        })
        .catch(() => {
          //
        })
      evt.stopPropagation()
    }
  }
}
</script>

<style lang="scss">
.v-jdesign {
  .v-jd-datasource {
    position: absolute;
    padding: 0.75rem 1.25rem;
    overflow: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    .datasource-container {
      > * {
        margin-bottom: 0.75rem;
      }

      .datasource-item {
        &.add {
          text-align: center;

          a {
            color: #409eff;
          }
        }

        .svg-icon {
          margin-right: 0.25rem;
        }

        .card-footer {
          text-align: right;

          > * {
            color: #409eff;
            margin-left: 1.25rem;
          }
        }
      }
    }
  }
}
</style>
