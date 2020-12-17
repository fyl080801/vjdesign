import Switch from './Switch.vue'
import DatasourceForm from './DatasourceForm.vue'
import ArrayProperty from './ArrayProperty.vue'
import ObjectForm from './ObjectForm.vue'
import PropertyItem from './PropertyItem.vue'

export { Switch, DatasourceForm, ArrayProperty, ObjectForm, PropertyItem }

export const controls = {
  [DatasourceForm.name]: DatasourceForm,
  [Switch.name]: Switch,
  [ArrayProperty.name]: ArrayProperty,
  [ObjectForm.name]: ObjectForm,
  [PropertyItem.name]: PropertyItem
}
