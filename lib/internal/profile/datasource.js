export default [
  {
    type: 'object',
    label: '数据',
    properties: [{ name: 'data', label: '数据' }]
  },
  {
    type: 'request',
    label: 'Http请求',
    properties: [
      {
        name: 'method',
        label: '方法',
        editor: {
          name: 'select',
          options: {
            items: [
              { value: 'GET', label: 'GET' },
              { value: 'POST', label: 'POST' },
              { value: 'PUT', label: 'PUT' },
              { value: 'PATCH', label: 'PATCH' },
              { value: 'DELETE', label: 'DELETE' }
            ]
          }
        }
      },
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
      { name: 'autoload', label: '自动请求', editor: 'checkbox' },
      { name: 'dataPath', label: '数据属性' },
      { name: 'defaultData', label: '默认数据' },
      { name: 'errorData', label: '异常数据' }
    ]
  }
]
