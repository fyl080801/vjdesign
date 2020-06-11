<template>
  <el-main class="main">
    <el-tabs type="border-card" class="max-aside">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-edit-outline"></i> 设计器</span>
        <div class="design">
          <design-content></design-content>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-tickets"></i> 元数据</span>
        <design-metadata></design-metadata>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-view"></i> 视图预览</span>
        <design-preview></design-preview>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-coin"></i> 数据预览</span>
        <model-preview></model-preview>
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script>
import DesignContent from "../components/DesignContent";
import DesignMetadata from "../components/DesignMetadata";
import DesignPreview from "../components/DesignPreview";
import ModelPreview from "../components/ModelPreview";

export default {
  components: {
    DesignContent,
    DesignMetadata,
    DesignPreview,
    ModelPreview
  }
};
</script>

<style scoped>
.main {
  padding: 0;
}
</style>
