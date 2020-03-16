<template>
  <el-aside class="aside right">
    <el-tabs type="border-card" class="max-aside">
      <el-tab-pane label="组件属性">
        <el-collapse v-if="editing" class="components" :key="editing.uuid">
          <el-collapse-item
            :title="group.key"
            :key="index"
            v-for="(group, index) in editorGroups"
          >
            <el-form size="mini">
              <vjform
                :fields="group.fields"
                :value="editing"
                @input="updateEditing"
              ></vjform>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="页面属性">页面属性</el-tab-pane>
    </el-tabs>
  </el-aside>
</template>

<script>
import { mapState } from "vuex";
import { assembly } from "../designer";
import emiter from "../utils/emiter";

export default {
  data() {
    return {
      editorGroups: []
    };
  },
  computed: mapState({
    editing: state => state.form.fieldMap[state.form.editing]
  }),
  watch: {
    editing(value) {
      if (!value) {
        this.editorGroups = [];
        return;
      }

      const groups = assembly(value.component);
      this.editorGroups = Object.keys(groups).map(key => {
        return { key, fields: groups[key] };
      });
    }
  },
  methods: {
    updateEditing(value) {
      this.$store.commit("form/UPDATE_EDITING", value);
    }
  },
  created() {
    emiter.$on("component-selected", field => {
      this.$store.commit("form/SELECT_EDITING", field);
    });
  }
};
</script>

<style></style>
