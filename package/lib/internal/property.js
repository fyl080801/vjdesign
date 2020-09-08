import feature from '../feature'
import { DEFAULT_KEYS } from '../feature/property'

feature.property(DEFAULT_KEYS.样式, {
  description: '样式',
  editor: { name: 'default', options: { props: { types: ['string'] } } }
})
feature.property(DEFAULT_KEYS.别名, { description: '别名', editor: 'simple' })
feature.property(DEFAULT_KEYS.名称, { description: '名称', editor: 'simple' })
feature.property(DEFAULT_KEYS.命名槽, {
  description: '命名槽',
  editor: 'simple'
})
feature.property(DEFAULT_KEYS.内部文本, {
  description: '内部文本',
  editor: { name: 'default', options: { props: { types: ['string'] } } }
})
feature.property(DEFAULT_KEYS.水印, {
  description: '水印',
  editor: { name: 'default', options: { props: { types: ['string'] } } }
})
feature.property(DEFAULT_KEYS.数据, { description: '数据', editor: 'simple' })
feature.property(DEFAULT_KEYS.条件显示, {
  description: '条件显示',
  editor: { name: 'default', options: { props: { types: ['boolean'] } } }
})
// feature.property(DEFAULT_KEYS.响应输入, {
//   description: "响应输入",
//   editor: "on"
// });
