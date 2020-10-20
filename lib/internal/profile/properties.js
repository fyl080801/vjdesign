export default [
  { name: 'remark', group: '通用', label: '别名', editor: 'simple' },
  { name: 'text', group: '基础', label: '文本' },
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
    label: '命名槽',
    editor: 'simple'
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
  }
]
