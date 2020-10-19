<template>
  <el-container direction="vertical" class="demo">
    <el-header class="header">
      <el-button size="small" @click="showPreview">预览</el-button>
      <el-button size="small">导出</el-button>
    </el-header>
    <el-main class="design">
      <v-jdesign v-model="value" :profile="profile"></v-jdesign>
    </el-main>
    <Preview ref="preview"></Preview>
  </el-container>
</template>

<script>
import Preview from './components/Preview'

export default {
  components: { Preview },
  data() {
    return {
      value: {
        // fields: [{ component: 'p', text: 'test' }]
      },
      profile: {
        // i18n: {}, // 考虑国际化
        components: [
          // 工具箱里的组件
          {
            name: 'el-form',
            label: '表单',
            description: '',
            icon: 'window-maximize',
            group: 'ElementUI', // 分组
            designer: 'container', // 设计器使用的 provider
            properties: [
              'fieldOptions.props.model',
              'fieldOptions.props.labelWidth',
              {
                prop: 'fieldOptions.props.size',
                editor: {
                  name: 'elselect',
                  options: {
                    items: []
                  }
                }
              }
            ]
          },
          {
            name: 'el-form-item',
            label: '表单项',
            description: '',
            group: 'ElementUI', // 分组
            designer: 'container', // 设计器使用的 provider
            properties: ['fieldOptions.props.labelWidth']
          },
          {
            name: 'el-input',
            label: '输入框',
            description: '',
            group: 'ElementUI', // 分组
            designer: 'container', // 设计器使用的 provider
            properties: []
          },
          {
            name: 'simple-table',
            label: '数据表格',
            description: '',
            icon: 'table',
            group: 'Custom',
            designer: 'default',
            properties: [
              {
                prop: 'columns',
                editor: 'tablecolumns'
              }
            ]
          }
        ],
        datasource: [
          // 支持的数据源
          {
            name: 'object',
            label: '对象',
            description: '',
            properties: [{ name: 'data', editor: 'objecteditor' }]
          },
          {
            name: 'request',
            label: '请求',
            description: '',
            properties: [
              { name: 'url', editor: 'default' },
              {
                name: 'method',
                editor: {
                  name: 'select',
                  options: { items: ['GET', 'POST', 'PUT'] }
                }
              }
            ],
            schema: {}
          }
        ],
        functional: [
          // 支持的功能函数
          {
            name: 'ADD',
            label: '相加',
            description: '',
            params: ['value1', 'value2']
          },
          {
            name: 'IF',
            label: '条件判断',
            description: '',
            params: ['expr', 'trueValue', 'falseValue']
          }
        ],
        properties: [
          // 支持的全局属性定义
          { name: '', editor: '' },
          { name: '', editor: {} }
        ],
        schema: {
          type: 'object',
          properties: {
            model: {},
            params: {}
          }
        } // 可用数据的结构
      }
    }
  },
  methods: {
    showPreview() {
      this.$refs.preview.show(this.value)
    }
  }
}
</script>

<style>
html,
body {
  font-size: 14px;
}

.demo {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.demo > .header {
  border-bottom: 1px solid #dcdfe6;
  line-height: 60px;
  text-align: right;
}

.demo > .design {
  padding: 0;
}
</style>
