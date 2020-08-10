import emiter from '../../utils/emiter'
import dialog from '../../utils/dialog'

// 元素设计时处理程序
export default function() {
  return function(field, options) {
    if (options.mode !== 'design' || field.layout === true) {
      return
    }

    const cloned = {
      ...field,
      layout: true,
      component: field.component || field.$conditionComponent
    }
    const { uuid, component, remark } = cloned

    Object.keys(field).forEach(key => {
      delete field[key]
    })

    field.component = 'div'
    field.layout = true
    field.fieldOptions = {
      class: 'v-jd-design ' + (emiter.editing === uuid ? 'editing' : ''),
      on: {
        click: evt => {
          emiter.$emit('component-selected', cloned)
          emiter.setEditing(uuid)
          evt.stopPropagation()
        }
      }
    }
    field.children = [
      cloned,
      ...['top', 'left', 'bottom', 'right'].map(item => ({
        component: 'div',
        layout: true,
        fieldOptions: { class: 'v-jd-border v-jd-border-' + item }
      })),
      {
        component: 'span',
        layout: true,
        fieldOptions: {
          class: 'tag',
          domProps: {
            innerText: remark ? component + '.' + remark : component
          }
        }
      },
      {
        component: emiter.editing === uuid ? 'span' : null,
        layout: true,
        fieldOptions: {
          // props: { title: '是否删除？' },
          class: 'del'
          // on: {
          //   onConfirm: () => {
          //     emiter.$emit('component-delete', cloned)
          //   }
          // }
        },
        children: [
          {
            component: 'a',
            layout: true,
            fieldOptions: {
              on: { click: dialog.confirm },
              domProps: {
                innerHTML: '<i class="el-icon-delete"></i> 删除',
                href: 'javascript:;'
              }
            }
          }
        ]
      }
    ]
  }
}
