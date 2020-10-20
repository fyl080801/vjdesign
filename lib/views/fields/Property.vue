<template>
  <div class="property side">
    <Collapse v-model="actives">
      <CollapseItem title="分组"></CollapseItem>
    </Collapse>
  </div>
</template>

<script>
import { Collapse, CollapseItem } from '../../components/collapse'

export default {
  components: { Collapse, CollapseItem },
  data() {
    return { actives: [] }
  }
}
</script>

<style scoped>
.property {
  width: 300px;
  border-left: 1px solid #dcdfe6;
}
</style>
