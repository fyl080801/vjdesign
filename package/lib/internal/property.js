import feature from '../feature'
import { DEFAULT_KEYS } from '../feature/property'

feature.property(DEFAULT_KEYS.样式, { description: '样式' })
feature.property(DEFAULT_KEYS.别名, { description: '别名' }, 'simple')
feature.property(DEFAULT_KEYS.名称, { description: '名称' })
feature.property(
  DEFAULT_KEYS.命名槽,
  {
    description: '命名槽'
  },
  'simple'
)
feature.property(DEFAULT_KEYS.内部文本, { description: '内部文本' })
feature.property(DEFAULT_KEYS.水印, { description: '水印' })
feature.property(DEFAULT_KEYS.数据, { description: '数据' }, 'simple')
feature.property(DEFAULT_KEYS.条件显示, { description: '条件显示' }, 'checkbox')
// feature.property(DEFAULT_KEYS.响应输入, {
//   description: "响应输入",
//   editor: "on"
// });
