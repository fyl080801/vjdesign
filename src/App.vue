<template>
  <el-container direction="vertical" class="demo">
    <el-header class="header">
      <el-button>预览</el-button>
      <el-button>元数据</el-button>
      <el-button>导出</el-button>
    </el-header>
    <el-main class="design">
      <v-jdesign v-model="value" :profile="profile"></v-jdesign>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      value: {
        fields: [{ component: 'p', text: 'test' }]
      },
      profile: {
        // i18n: {}, // 考虑国际化
        components: [
          // 工具箱里的组件
          {
            component: 'el-form',
            label: '表单',
            description: '',
            icon: 'form',
            group: 'ElementUI', // 分组
            tags: ['form', 'layout'], // 按标签查询
            provider: 'default', // 设计器使用的 provider
            properties: [
              'fieldOptions.props.model',
              'fieldOptions.props.labelWidth',
              {
                prop: 'fieldOptions.props.labelWidth',
                editor: {}
              },
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
            component: 'simple-table',
            label: '数据表格',
            description: '',
            icon: 'table',
            group: 'Custom',
            tags: ['table', 'data'],
            provider: 'default',
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
        // editors: [
        //   { name: 'elinput', field: { component: 'el-input' } },
        //   {
        //     name: 'elselect',
        //     field: {
        //       component: 'el-select',
        //       fieldOptions: {
        //         props: {}
        //       },
        //       children: [
        //         {
        //           component: 'v-jd-repeat',
        //           fieldOptions: {
        //             props: {
        //               '$:data': 'params.items',
        //               '^:field': {
        //                 component: 'el-option',
        //                 fieldOptions: { props: { value: '' } }
        //               }
        //             }
        //           }
        //         }
        //       ]
        //     }
        //   }
        // ], // 支持的编辑器
        schema: {
          type: 'object',
          properties: {
            model: {},
            params: {}
          }
        } // 可用数据的结构
      }
    }
  }
}
</script>

<style>
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
