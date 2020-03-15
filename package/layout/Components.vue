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
                :list="group.children"
                draggable=".drag-handler"
                :group="{ name: 'jdesign', pull: 'clone', put: false }"
                :sort="false"
              >
                <el-col
                  :span="12"
                  :key="index"
                  class="drag-handler"
                  v-for="(item, index) in group.children"
                >
                  <el-card :body-style="{ padding: '10px' }">{{
                    item.name
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

export default {
  components: { vuedraggable },
  data() {
    return {
      origin: [
        {
          name: "布局元素",
          children: [
            {
              name: "层",
              tag: "div"
            },
            {
              name: "段落",
              tag: "p"
            },
            {
              name: "标题1",
              tag: "h1"
            }
          ]
        },
        {
          name: "块级元素",
          children: [
            {
              name: "文本",
              tag: "span"
            }
          ]
        }
      ],
      advance: []
    };
  }
};
</script>

<style></style>
