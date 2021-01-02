<template>
  <v-jdesign v-model="value" :profile="profile"></v-jdesign>
</template>

<script>
export default {
  data() {
    return {
      value: {},
      profile: {
        components: [
          {
            name: 'el-row',
            label: '行',
            group: 'ElementUI',
            designer: 'classContainer'
          },
          {
            name: 'el-form',
            label: '表单',
            group: 'ElementUI',
            designer: 'container',
            properties: [
              {
                name: 'fieldOptions.props.model',
                label: '表单数据',
                group: '数据'
              },
              {
                name: 'fieldOptions.props.labelWidth',
                label: '前缀宽度',
                group: '组件'
              }
            ]
          },
          {
            name: 'el-input',
            label: '输入框',
            group: 'ElementUI',
            properties: [
              'model',
              'elForm.label',
              'elForm.rules',
              'colProps.span'
            ]
          },
          {
            name: 'el-select',
            label: '选择框',
            group: 'ElementUI',
            properties: [
              'model',
              'elForm.label',
              'elForm.rules',
              'colProps.span'
            ]
          }
        ],
        properties: [
          { name: 'elForm.label', label: '前缀', group: '表单' },
          {
            name: 'elForm.rules',
            label: '验证规则',
            group: '表单',
            properties: [
              {
                name: 'type',
                label: '类型',
                transform: false,
                editor: {
                  name: 'select',
                  options: {
                    items: [
                      { value: 'string', label: '字符串' },
                      { value: 'number', label: '数字' },
                      { value: 'boolean', label: '布尔' },
                      { value: 'array', label: '数组' }
                    ]
                  }
                }
              },
              { name: 'required', label: '是否必填', editor: 'switch' },
              { name: 'message', label: '错误提示' },
              { name: 'min', label: '最小值', editor: 'number' },
              { name: 'max', label: '最大值', editor: 'number' },
              { name: 'pattern', label: '正则' }
            ],
            editor: 'array'
          },
          {
            name: 'colProps.span',
            label: '列宽',
            group: '布局',
            editor: 'number'
          }
        ]
      }
    }
  }
}
</script>
