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
            icon: 'file-alt',
            group: 'ElementUI', // 分组
            designer: 'container', // 设计器使用的 provider
            properties: [
              'fieldOptions.props.model',
              'fieldOptions.props.size',
              'fieldOptions.props.labelWidth',
              {
                name: 'fieldOptions.props.labelPosition',
                group: '组件',
                label: '前缀位置',
                editor: {
                  name: 'select',
                  options: {
                    items: [
                      { value: 'right', label: '右侧' },
                      { value: 'left', label: '左侧' },
                      { value: 'top', label: '顶部' }
                    ]
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
            properties: ['fieldOptions.props.label']
          },
          {
            name: 'el-input',
            label: '输入框',
            description: '',
            group: 'ElementUI', // 分组
            properties: []
          },
          {
            name: 'el-row',
            label: '行',
            icon: 'window-maximize',
            description: '',
            group: 'ElementUI', // 分组
            designer: 'container', // 设计器使用的 provider
            properties: ['fieldOptions.props.gutter']
          },
          {
            name: 'el-col',
            label: '列',
            icon: 'columns',
            description: '',
            group: 'ElementUI', // 分组
            designer: 'container', // 设计器使用的 provider
            properties: ['fieldOptions.props.span']
          }
          // {
          //   name: 'simple-table',
          //   label: '数据表格',
          //   description: '',
          //   icon: 'table',
          //   group: 'Custom',
          //   designer: 'default',
          //   properties: [
          //     {
          //       prop: 'columns',
          //       editor: 'tablecolumns'
          //     }
          //   ]
          // }
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
          {
            name: 'fieldOptions.props.size',
            group: '组件',
            label: '尺寸',
            editor: {
              name: 'select',
              options: {
                items: [
                  { value: 'medium', label: '适中' },
                  { value: 'small', label: '小' },
                  { value: 'mini', label: '极小' }
                ]
              }
            }
          },
          {
            name: 'fieldOptions.props.labelWidth',
            group: '组件',
            label: '前缀宽度'
          },
          {
            name: 'fieldOptions.props.label',
            group: '组件',
            label: '前缀'
          },
          {
            name: 'fieldOptions.props.model',
            group: '组件',
            label: '表单数据'
          },
          {
            name: 'fieldOptions.props.gutter',
            group: '组件',
            label: '间隔',
            editor: { name: 'simple', options: { type: 'number' } }
          },
          {
            name: 'fieldOptions.props.span',
            group: '组件',
            label: '列宽',
            editor: { name: 'simple', options: { type: 'number' } }
          }
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
