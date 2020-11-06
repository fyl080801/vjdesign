import { createRegistry } from '../registry'

import defaultEditor from '../internal/editors/default'
import select from '../internal/editors/select'
import modelEditor from '../internal/editors/model'

import defaultDesign from '../internal/designers/default'
import containerDesign from '../internal/designers/container'
import designElementDesign from '../internal/designers/designElement'
import designContainerDesign from '../internal/designers/designContainer'

const createInternalRegistry = () => {
  const instance = createRegistry()

  instance.use(({ editor, designer }) => {
    // editor
    editor('default', defaultEditor)
    editor('select', select)
    editor('model', modelEditor)

    // designer
    designer('default', defaultDesign)
    designer('container', containerDesign)
    designer('designElement', designElementDesign)
    designer('designContainer', designContainerDesign)
  })

  return instance
}

export default createInternalRegistry()
