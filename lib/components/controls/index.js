import Switch from './Switch.vue'
import DatasourceForm from './DatasourceForm.vue'
import ArrayForm from './ArrayForm.vue'

export { Switch, DatasourceForm, ArrayForm }

export const controls = {
  [DatasourceForm.name]: DatasourceForm,
  [Switch.name]: Switch,
  [ArrayForm.name]: ArrayForm
}
