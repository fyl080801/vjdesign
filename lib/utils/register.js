import { createRegistry } from '../registry'

import defaultEditor from '../internal/editors/default'
import simple from '../internal/editors/simple'
import select from '../internal/editors/select'
import modelEditor from '../internal/editors/model'

import defaultDesign from '../internal/designers/default'
import containerDesign from '../internal/designers/container'
import selectDesign from '../internal/designers/select'

const createInternalRegistry = () => {
  const instance = createRegistry()

  instance.use(({ editor, designer }) => {
    // editor
    editor('default', defaultEditor)
    editor('simple', simple)
    editor('select', select)
    editor('model', modelEditor)

    // designer
    designer('default', defaultDesign)
    designer('container', containerDesign)
    designer('select', selectDesign)
  })

  return instance
}

export default createInternalRegistry()
