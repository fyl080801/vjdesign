export default [
  {
    type: 'request',
    label: 'Http请求',
    properties: [
      { name: 'method', label: '方法' },
      { name: 'url', label: '请求地址' },
      { name: 'params', label: '请求参数' },
      { name: 'data', label: '请求数据' },
      { name: 'headers', label: '请求头' },
      {
        name: 'dataType',
        label: '数据类型',
        editor: {
          name: 'select',
          options: {
            items: [{ value: 'json', label: 'json' }]
          }
        }
      },
      { name: 'autoload', label: '自动请求' },
      { name: 'dataPath', label: '数据属性' },
      { name: 'defaultData', label: '默认数据' },
      { name: 'errorData', label: '异常数据' }
    ]
  }
]
