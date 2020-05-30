<template>
  <el-collapse v-model="names" class="components">
    <el-collapse-item
      :key="index"
      :name="group.name"
      v-for="(group, index) in list"
    >
      <template slot="title">
        <div><i class="el-icon-menu"></i> {{ group.name }}</div>
      </template>
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
            <el-card :body-style="{ padding: '10px' }">
              <i :class="item.icon ? item.icon : 'el-icon-s-help'"></i>
              {{ item.description }}
            </el-card>
          </el-col>
        </vuedraggable>
      </el-row>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import vuedraggable from "vuedraggable";

export default {
  name: "component-list",
  components: { vuedraggable },
  props: {
    list: Array
  },
  data() {
    return {
      names: []
    };
  },
  watch: {
    list(value) {
      this.names = value.length > 0 ? [value[0].name] : [];
    }
  }
};
</script>

<style></style>
