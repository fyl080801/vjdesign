<template>
  <el-main class="main">
    <el-tabs type="border-card" class="max-aside">
      <el-tab-pane label="设计器">
        <div class="design">
          <design-content></design-content>
        </div>
      </el-tab-pane>
      <el-tab-pane label="元数据">
        <design-metadata></design-metadata>
      </el-tab-pane>
      <el-tab-pane label="预览" icon="view">
        <design-preview></design-preview>
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script>
import DesignContent from "../components/DesignContent.vue";
import DesignMetadata from "../components/DesignMetadata.vue";
import DesignPreview from "../components/DesignPreview.vue";

export default {
  components: {
    DesignContent,
    DesignMetadata,
    DesignPreview
  }
};
</script>

<style scoped>
.main {
  padding: 0;
}
</style>
