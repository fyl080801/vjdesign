export default [
  { name: 'remark', group: '通用', label: '别名' },
  { name: 'fieldOptions.domProps.innerText', group: '基础', label: '文本' },
  { name: 'model', group: '基础', label: '数据', editor: 'model' },
  {
    name: 'condition',
    group: '通用',
    label: '条件显示',
    editor: { name: 'default', options: { types: ['boolean'] } }
  },
  {
    name: 'fieldOptions.slot',
    group: '通用',
    label: '命名槽'
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
    label: '内部样式',
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
  { name: 'fieldOptions.on.click', group: '事件', label: '点击' }
]
