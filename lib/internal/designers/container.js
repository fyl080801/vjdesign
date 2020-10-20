import store from '../../store'
import defaultDesigner from './default'

export default field => {
  defaultDesigner(field)

  const realChild = field.children[0]
  const designComponents = field.children.splice(1, field.children.length - 1)

  const { uuid, component, remark } = realChild

  realChild.children = [
    {
      component: 'vuedraggable',
      fieldOptions: {
        attrs: {
          group: 'jdesign',
          draggable: '.drag-handler',
          ghostClass: 'ghost'
        },
        class:
          'v-jd-container-wrapper designed ' +
          (store.getters.form.editing === uuid ? 'editing' : ''),
        on: {
          input: value => {
            store.dispatch('form/updateChildren', {
              uuid: realChild.uuid,
              value
            })
          }
          // add: value => {
          //   // emiter.$emit('children-add', { uuid: field.uuid, value })
          // },
          // remove: value => {
          //   // emiter.$emit('children-remove', { uuid: field.uuid, value })
          // },
          // update: value => {
          //   // emiter.$emit('children-update', { uuid: field.uuid, value })
          // }
        },
        props: {
          value: [...(realChild.children || [])]
        }
      },
      children: [
        ...(realChild.children || []),
        {
          component: 'v-jd-container-border',
          fieldOptions: { class: 'designed' }
        },
        {
          component: 'p',
          text: remark ? `${component}.${remark}` : component,
          fieldOptions: {
            class: 'root-text designed',
            slot: 'footer'
          }
        }
      ]
    }
  ]

  field.children = [realChild, ...designComponents]
}
