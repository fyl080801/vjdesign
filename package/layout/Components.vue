<template>
  <el-aside class="aside">
    <el-tabs type="border-card" class="max-aside">
      <el-tab-pane label="基础组件">
        <component-list :list="origin"></component-list>
      </el-tab-pane>
      <el-tab-pane label="集成组件">
        <component-list :list="advance"></component-list>
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
      origin: [],
      advance: []
    };
  },
  mounted() {
    this.origin = getComponentGroups(true);
    this.advance = getComponentGroups(false);
  }
};
</script>

<style></style>
