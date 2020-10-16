import { createRegistry } from '../registry'

import defaultEditor from '../internal/editors/default'

import defaultDesign from '../internal/designers/default'
import containerDesign from '../internal/designers/container'

const createInternalRegistry = () => {
  const instance = createRegistry()

  instance.use(({ editor, designer }) => {
    // editor
    editor('default', defaultEditor)

    // designer
    designer('default', defaultDesign)
    designer('container', containerDesign)
  })

  return instance
}

export default createInternalRegistry()
