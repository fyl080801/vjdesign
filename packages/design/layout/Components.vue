<template>
  <el-aside class="aside">
    <el-tabs type="border-card" class="max-aside">
      <el-tab-pane label="组件库">
        <component-list :list="origin"></component-list>
      </el-tab-pane>
    </el-tabs>
  </el-aside>
</template>

<script>
import ComponentList from "../components/ComponentList";
import { getComponentGroups } from "../designer";

export default {
  components: { ComponentList },
  data() {
    return {
      origin: []
    };
  },
  mounted() {
    this.origin = getComponentGroups();
  }
};
</script>

<style></style>
