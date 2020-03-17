<template>
  <el-aside class="aside right">
    <el-tabs type="border-card" class="max-aside">
      <el-tab-pane label="组件属性">
        <el-collapse
          v-model="groupNames"
          v-if="editing"
          class="components"
          :key="editing.uuid"
        >
          <el-collapse-item
            :key="index"
            :name="group.key"
            v-for="(group, index) in editorGroups"
          >
            <template slot="title">
              <div><i class="el-icon-s-operation"></i> {{ group.key }}</div>
            </template>
            <el-form size="mini" label-position="top">
              <vjform
                :fields="group.fields"
                :value="editing"
                @input="updateEditing"
                :components="group.components"
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
      editorGroups: [],
      updating: null,
      groupNames: []
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
        const fields = groups[key];
        const components = {};
        fields.map(field => {
          if (field.instance) {
            components[field.instance.name] = field.instance;
          }
          return { ...field, instance: undefined };
        });
        return { key, fields, components };
      });
      this.groupNames = Object.keys(groups);
    },
    updating(value) {
      if (value === null) {
        return;
      }

      this.$nextTick(() => {
        this.$store.commit("form/UPDATE_EDITING", value);
        this.updating = null;
      });
    }
  },
  methods: {
    updateEditing(value) {
      this.updating = value;
    }
  },
  created() {
    emiter.$on("component-selected", field => {
      this.$store.commit("form/SELECT_EDITING", field);
    });

    emiter.$on("component-delete", field => {
      this.$store.commit("form/DELETE_FIELD", field);
    });
  }
};
</script>

<style></style>
