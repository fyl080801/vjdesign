export default [
  {
    name: 'div',
    label: '层',
    icon: 'layer-group',
    description: '',
    group: 'Html',
    designer: 'container',
    properties: []
  },
  {
    name: 'p',
    label: '段落',
    icon: 'paragraph',
    group: 'Html',
    properties: ['fieldOptions.domProps.innerText']
  },
  {
    name: 'span',
    label: '文本',
    icon: 'font',
    group: 'Html',
    properties: ['fieldOptions.domProps.innerText']
  },
  {
    name: 'a',
    label: '超链接',
    icon: 'link',
    group: 'Html',
    properties: [
      'fieldOptions.domProps.innerText',
      { name: 'fieldOptions.domProps.href', group: '基础', label: '链接' },
      {
        name: 'fieldOptions.domProps.target',
        group: '基础',
        label: '目标',
        editor: {
          name: 'select',
          options: {
            items: [
              { value: '_blank', label: '空白页' },
              { value: '_self', label: '当前页' }
            ]
          }
        },
        default: '_self'
      }
    ]
  },
  {
    name: 'input',
    label: '输入',
    group: 'Html',
    properties: ['fieldOptions.attrs.placeholder', 'model']
  }
]
