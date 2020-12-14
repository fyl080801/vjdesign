import Switch from './Switch.vue'
import DatasourceForm from './DatasourceForm.vue'
import ArrayProperty from './ArrayProperty.vue'

export { Switch, DatasourceForm, ArrayProperty }

export const controls = {
  [DatasourceForm.name]: DatasourceForm,
  [Switch.name]: Switch,
  [ArrayProperty.name]: ArrayProperty
}
