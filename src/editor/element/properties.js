import vjdesign from '../../../package/index'

const { feature } = vjdesign

feature.property('fieldOptions.attrs.placeholder', { description: '水印' })
feature.property('fieldOptions.props.labelWidth', { description: '前缀宽度' })
feature.property('fieldOptions.props.label', { description: '前缀' })
feature.property('fieldOptions.props.gutter', {
  description: '间隔',
  editor: 'number'
})
feature.property('fieldOptions.props.span', {
  description: '列宽',
  editor: 'number'
})
feature.property('fieldOptions.props.size', {
  description: '尺寸',
  defaultValue: 'medium',
  editor: {
    name: 'select',
    options: {
      items: [
        { label: '正常', value: 'medium' },
        { label: '小', value: 'small' },
        { label: '最小', value: 'mini' }
      ]
    }
  }
})

feature.property('fieldOptions.props.labelPosition', {
  description: '前缀位置',
  editor: {
    name: 'select',
    options: {
      items: [
        { label: '靠右', value: 'right' },
        { label: '靠左', value: 'left' },
        { label: '顶部', value: 'top' }
      ]
    }
  }
})

feature.property('fieldOptions.props.disabled', {
  description: '禁用',
  editor: 'check'
})

feature.property('fieldOptions.props.min', {
  description: '最小值',
  editor: 'number'
})

feature.property('fieldOptions.props.max', {
  description: '最大值',
  editor: 'number'
})

feature.property('fieldOptions.props.step', {
  description: '步长',
  editor: 'number'
})

feature.property('fieldOptions.props.range', {
  description: '是否范围',
  editor: 'check'
})

feature.property('fieldOptions.props.name', {
  description: '命名',
  editor: 'simple'
})

feature.property('fieldOptions.props.required', {
  description: '必填',
  editor: 'check'
})
