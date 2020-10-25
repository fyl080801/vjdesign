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
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            <a href="javascript:;" @click="onEdit">
              <SvgIcon name="edit"></SvgIcon>
              <span>编辑</span>
            </a>
            <a href="javascript:;" @click="onRemove">
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
              <span>添加</span></a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SvgIcon from 'vue-svgicon'

export default {
  components: {
    SvgIcon
  },
  computed: {
    ...mapGetters(['form', 'popup']),
    names() {
      return Object.keys(this.form.value.datasource)
    },
    datasource() {
      return this.form.value.datasource
    }
  },
  methods: {
    onAdd() {
      const model = { data: { name: '' } }

      this.$store.dispatch('popup/show', {
        title: '添加数据源',
        model,
        form: {
          fields: [
            {
              component: 'v-jd-modal-content',
              children: [
                {
                  component: 'v-jd-datasource-form',
                  model: ['data'],
                  children: []
                },
                {
                  component: 'button',
                  text: '确定',
                  fieldOptions: {
                    slot: 'footer',
                    class: 'btn btn-primary',
                    on: {
                      click: () => {
                        this.$store.dispatch('form/setDatasource', model.data)
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
    onEdit() {},
    onRemove() {}
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
