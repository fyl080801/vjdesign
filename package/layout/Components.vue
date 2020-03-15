<template>
  <el-aside class="aside">
    <el-tabs type="border-card" class="max-aside">
      <el-tab-pane label="基础组件">
        <el-collapse class="components">
          <el-collapse-item
            :title="group.name"
            :key="index"
            v-for="(group, index) in origin"
          >
            <el-row :gutter="10">
              <vuedraggable
                tag="div"
                class="components-group"
                :list="group.components"
                draggable=".drag-handler"
                :group="{ name: 'jdesign', pull: 'clone', put: false }"
                :sort="false"
              >
                <el-col
                  :span="12"
                  :key="index"
                  class="drag-handler"
                  v-for="(item, index) in group.components"
                >
                  <el-card :body-style="{ padding: '10px' }">{{
                    item.description
                  }}</el-card>
                </el-col>
              </vuedraggable>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="集成组件">bbb</el-tab-pane>
    </el-tabs>
  </el-aside>
</template>

<script>
import vuedraggable from "vuedraggable";
import { getComponentGroups } from "../designer";

export default {
  components: { vuedraggable },
  data() {
    return {
      origin: [],
      advance: []
    };
  },
  mounted() {
    this.origin = getComponentGroups(true);
  }
};
</script>

<style></style>
