import DesignBorder from './DesignBorder.vue'
import ContainerBorder from './ContainerBorder.vue'
import DesignWrapper from './DesignWrapper.vue'
import TitleTag from './TitleTag.vue'
import DeleteTag from './DeleteTag.vue'
import DesignFace from './DesignFace.vue'
import ContainerWrapper from './ContainerWrapper.vue'
import ContainerTag from './ContainerTag.vue'
import CollapseTag from './CollapseTag.vue'
import './styles.scss'

export {
  DesignBorder,
  ContainerBorder,
  DesignWrapper,
  TitleTag,
  DeleteTag,
  DesignFace,
  ContainerWrapper,
  ContainerTag,
  CollapseTag
}

export default {
  [DesignBorder.name]: DesignBorder,
  [ContainerBorder.name]: ContainerBorder,
  [DesignWrapper.name]: DesignWrapper,
  [DeleteTag.name]: DeleteTag,
  [ContainerWrapper.name]: ContainerWrapper,
  [TitleTag.name]: TitleTag,
  [DesignFace.name]: DesignFace,
  [ContainerTag.name]: ContainerTag,
  [CollapseTag.name]: CollapseTag
}
