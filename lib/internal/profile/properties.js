export default [
  { name: 'remark', group: '通用', label: '别名', transform: false },
  { name: 'fieldOptions.domProps.innerText', group: '基础', label: '文本' },
  {
    name: 'model',
    group: '数据',
    label: '数据',
    editor: 'model',
    transform: false
  },
  {
    name: 'condition',
    group: '通用',
    label: '条件显示',
    editor: { name: 'default', options: { types: ['boolean'] } }
  },
  { name: 'fieldOptions.slot', group: '通用', label: '命名槽' },
  { name: 'fieldOptions.scopedSlot', group: '通用', label: '作用域命名槽' },
  {
    name: 'fieldOptions.ref',
    group: '通用',
    label: '引用名',
    transform: false
  },
  {
    name: 'fieldOptions.class',
    group: '样式',
    label: '引用样式',
    editor: { name: 'default', options: { types: ['string'] } }
  },
  {
    name: 'fieldOptions.style',
    group: '样式',
    label: '内联样式',
    editor: { name: 'default', options: { types: ['string'] } }
  },
  {
    name: 'fieldOptions.attrs.placeholder',
    group: '基础',
    label: '水印'
  },
  { name: 'fieldOptions.attrs.href', group: '基础', label: 'URL' },
  {
    name: 'fieldOptions.attrs.type',
    group: '基础',
    label: 'type',
    editor: {
      name: 'select',
      options: { items: [{ value: 'text/css', label: 'text/css' }] }
    },
    default: 'text/css'
  },
  {
    name: 'fieldOptions.domProps.value',
    group: '基础',
    label: '值'
  },
  { name: 'fieldOptions.on.click', group: '事件', label: '点击' },
  { name: 'options.direct', default: true },
  {
    name: 'events',
    label: '事件集合',
    group: '基础',
    editor: 'array',
    properties: [
      { name: 'name', label: '事件名称', transform: false },
      { name: 'handler', label: '事件处理', transform: ['@'] }
    ]
  }
]
