import store from '../../store'
import defaultDesigner from './default'

export default field => {
  defaultDesigner(field)

  const readChild = field.children[0]

  const { component, remark } = readChild

  readChild.children = [
    {
      component: 'vuedraggable',
      designed: true,
      fieldOptions: {
        attrs: { group: 'jdesign', draggable: '.drag-handler' },
        class: 'v-jd-container-wrapper',
        on: {
          input: value => {
            store.dispatch('form/updateChildren', {
              uuid: readChild.uuid,
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
          value: [...(readChild.children || [])]
        }
      },
      children: [
        ...(readChild.children || []),
        { component: 'v-jd-container-border', designed: true },
        {
          component: 'p',
          designed: true,
          text: remark ? `${component}.${remark}` : component,
          fieldOptions: {
            class: 'root-text',
            slot: 'footer'
          }
        }
      ]
    }
  ]

  field.children = [readChild]
}
