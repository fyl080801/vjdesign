<template>
  <div class="toolbox side">
    <Collapse>
      <CollapseItem name="group1" title="tab1">ssss</CollapseItem>
      <CollapseItem name="group2" title="xxx"></CollapseItem>
    </Collapse>
  </div>
</template>

<script>
import { Collapse, CollapseItem } from '../../components/collapse'
// import vuedraggable from 'vuedraggable'

export default {
  components: { Collapse, CollapseItem }
}
</script>

<style scoped>
.toolbox {
  width: 250px;
  border-right: 1px solid #dcdfe6;
}
</style>
