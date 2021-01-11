import { createRegistry } from '../registry'

import defaultEditor from '../internal/editors/default'
import select from '../internal/editors/select'
import modelEditor from '../internal/editors/model'
import checkbox from '../internal/editors/checkbox'
import numberEditor from '../internal/editors/number'
import switchEditor from '../internal/editors/switch'
import arrayEditor from '../internal/editors/array'
import tagsEditor from '../internal/editors/tags'

import defaultDesign from '../internal/designers/default'
import containerDesign from '../internal/designers/container'
import divElementDesign from '../internal/designers/divElement'
import divContainerDesign from '../internal/designers/divContainer'
import classContainerDesign from '../internal/designers/classContainer'
import tableDesign from '../internal/designers/table'

const createInternalRegistry = () => {
  const instance = createRegistry()

  instance.use(({ editor, designer }) => {
    // editor
    editor('default', defaultEditor)
    editor('select', select)
    editor('model', modelEditor)
    editor('checkbox', checkbox)
    editor('number', numberEditor)
    editor('switch', switchEditor)
    editor('array', arrayEditor)
    editor('tags', tagsEditor)

    // designer
    designer('default', defaultDesign)
    designer('container', containerDesign)
    designer('divElement', divElementDesign)
    designer('divContainer', divContainerDesign)
    designer('classContainer', classContainerDesign)
    designer('table', tableDesign)
  })

  return instance
}

export default createInternalRegistry()
