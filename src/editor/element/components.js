import vjdesign from '../../../package/index'

const { feature } = vjdesign
const { properties } = feature

feature.component(
  'el-form',
  {
    group: 'Element 布局',
    description: '表单',
    container: true
  },
  ['fieldOptions.props.labelWidth', 'fieldOptions.props.size', 'fieldOptions.props.labelPosition']
)

feature.component(
  'el-tabs',
  {
    group: 'Element 布局',
    description: '标签页',
    container: true
  },
  [
    properties.数据,
    {
      property: 'fieldOptions.props.type',
      description: '类型',
      editor: {
        name: 'select',
        options: {
          items: [
            { label: '卡片', value: 'card' },
            { label: '带边框卡片', value: 'border-card' }
          ]
        }
      },
      defaultValue: 'border-card'
    }
  ]
)

feature.component(
  'el-tab-pane',
  {
    group: 'Element 布局',
    description: '标签项',
    container: true
  },
  ['fieldOptions.props.name', 'fieldOptions.props.label']
)

feature.component(
  'el-col',
  {
    group: 'Element 布局',
    description: '列',
    container: true
  },
  ['fieldOptions.props.span']
)

feature.component(
  'el-row',
  {
    group: 'Element 布局',
    description: '行',
    container: true
  },
  ['fieldOptions.props.gutter']
)

feature.component(
  'el-form-item',
  {
    group: 'Element 布局',
    description: '表单项',
    container: true
  },
  ['fieldOptions.props.label', 'fieldOptions.props.required']
)

feature.component(
  'el-input',
  {
    group: 'Element 输入',
    description: '文本框'
  },
  [properties.数据, 'fieldOptions.props.disabled', 'fieldOptions.attrs.placeholder']
)

feature.component(
  'el-select',
  {
    group: 'Element 输入',
    description: '选择器'
  },
  [properties.数据, 'fieldOptions.props.disabled', 'fieldOptions.attrs.placeholder']
)

feature.component(
  'el-input-number',
  {
    group: 'Element 输入',
    description: '计数器'
  },
  [properties.数据, 'fieldOptions.props.disabled']
)

feature.component(
  'el-switch',
  {
    group: 'Element 输入',
    description: '开关'
  },
  [properties.数据, 'fieldOptions.props.disabled']
)

feature.component(
  'el-slider',
  {
    group: 'Element 输入',
    description: '滑块'
  },
  [
    properties.数据,
    'fieldOptions.props.disabled',
    'fieldOptions.props.range',
    { property: 'fieldOptions.props.min', defaultValue: 0 },
    { property: 'fieldOptions.props.max', defaultValue: 100 },
    { property: 'fieldOptions.props.step', defaultValue: 1 }
  ]
)

feature.component(
  'el-time-select',
  {
    group: 'Element 输入',
    description: '时间'
  },
  [properties.数据, 'fieldOptions.props.disabled']
)

feature.component(
  'el-date-picker',
  {
    group: 'Element 输入',
    description: '日期时间'
  },
  [
    properties.数据,
    'fieldOptions.props.disabled',
    {
      description: '数据格式',
      property: 'fieldOptions.props.valueFormat',
      defaultValue: 'yyyy-MM-dd HH:mm:ss'
    },
    {
      property: 'fieldOptions.props.type',
      description: '类型',
      editor: {
        name: 'select',
        options: {
          items: [
            { label: '日期', value: 'date' },
            { label: '日期时间', value: 'datetime' },
            { label: '时间段', value: 'daterange' }
          ]
        }
      }
    }
  ]
)

feature.component(
  'el-rate',
  {
    group: 'Element 输入',
    description: '评分'
  },
  [properties.数据, 'fieldOptions.props.disabled']
)

feature.component(
  'el-radio-group',
  {
    group: 'Element 输入',
    description: '单选项组',
    container: true
  },
  [properties.数据, 'fieldOptions.props.size', 'fieldOptions.props.disabled']
)

feature.component(
  'el-radio-button',
  {
    group: 'Element 输入',
    description: '单选按钮'
  },
  ['fieldOptions.props.disabled', { property: 'fieldOptions.props.label', editor: 'simple' }]
)

feature.component(
  'el-radio',
  {
    group: 'Element 输入',
    description: '单选项'
  },
  ['fieldOptions.props.disabled', { property: 'fieldOptions.props.label', editor: 'simple' }]
)

feature.component(
  'el-checkbox-group',
  {
    group: 'Element 输入',
    description: '复选项组',
    container: true
  },
  [properties.数据, 'fieldOptions.props.size', 'fieldOptions.props.disabled']
)

feature.component(
  'el-checkbox-button',
  {
    group: 'Element 输入',
    description: '复选按钮'
  },
  ['fieldOptions.props.disabled', { property: 'fieldOptions.props.label', editor: 'simple' }]
)

feature.component(
  'el-checkbox',
  {
    group: 'Element 输入',
    description: '复选项'
  },
  [
    properties.数据,
    'fieldOptions.props.disabled',
    { property: 'fieldOptions.props.label', editor: 'simple' }
  ]
)

feature.component('el-table', {
  group: 'Element 数据',
  description: '表格'
})

feature.component(
  'el-pagination',
  {
    group: 'Element 数据',
    description: '分页'
  },
  [
    {
      description: '分页大小',
      property: 'fieldOptions.props.pageSize',
      editor: 'number',
      defaultValue: 10
    }
  ]
)

// 交互
feature.component('el-button', { group: 'Element 输入', description: '按钮' }, [
  properties.内部文本,
  {
    description: '点击',
    group: '事件',
    property: 'fieldOptions.on.click'
  }
])
