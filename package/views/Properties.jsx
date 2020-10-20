import Vue from "vue";
import { mapState } from "vuex";
import { assemblyEditorGroups, DEFAULTS } from "../lib/feature/property";
import { getComponent } from "../lib/feature/component";
import emiter from "../utils/emiter";
import Datasource from "../components/Datasource";
import Listeners from "../components/Listeners";
import {
  Aside,
  Tabs,
  TabPane,
  Collapse,
  CollapseItem,
  Form,
  FormItem,
  Input,
  Checkbox,
  Select,
  Option,
  Button,
  Popconfirm
} from "element-ui";
import VJForm from "vjform";

export default Vue.extend({
  components: { Datasource, Listeners },
  data() {
    return {
      editorGroups: [],
      updating: null,
      groupNames: [],
      propNames: [],
      //
      showDatasource: false
    };
  },
  computed: {
    ...mapState({
      editing: ({ form }) => form.fieldMap[form.editing]
    })
  },
  watch: {
    editing(value) {
      if (!value) {
        this.editorGroups = [];
        return;
      }

      const component = getComponent(value.component);
      const groups = assemblyEditorGroups(component.properties, DEFAULTS);

      this.editorGroups = Object.keys(groups)
        .filter(key => groups[key].length > 0)
        .map(key => {
          const fields = groups[key];
          const components = {};
          fields.forEach(field => {
            if (field.instance) {
              components[field.instance.name] = field.instance;
            }
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
    },
    refreshEditing() {
      this.$store.commit("form/REFRESH_EDITING");
    }
  },
  created() {
    emiter.$on("component-selected", field => {
      this.$store.commit("form/SELECT_EDITING", field);
    });

    emiter.$on("component-delete", field => {
      this.$store.commit("form/DELETE_FIELD", field);
    });
  },
  destroyed() {
    emiter.$off("component-selected");
    emiter.$off("component-delete");
  },
  render() {
    return (
      <Aside class="aside right">
        <Tabs type="border-card" class="max-aside">
          <TabPane label="组件属性">
            {this.editing ? (
              <Collapse
                v-model={this.groupNames}
                class="components"
                key={this.editing.uuid}
              >
                {this.editorGroups.map((group, index) => (
                  <CollapseItem key={index} name={group.key}>
                    <div slot="title">
                      <i class="el-icon-s-operation"></i>
                      {group.key}
                    </div>
                    <Form size="mini" label-position="top">
                      <VJForm
                        class="vjdesign-property"
                        fields={group.fields}
                        value={this.editing}
                        onInput={this.updateEditing}
                        onClear={this.refreshEditing}
                        components={{
                          ...group.components,
                          "el-form-item": FormItem,
                          "el-input": Input,
                          "el-checkbox": Checkbox,
                          "el-select": Select,
                          "el-option": Option,
                          "el-button": Button,
                          "el-popconfirm": Popconfirm
                        }}
                      ></VJForm>
                    </Form>
                  </CollapseItem>
                ))}
              </Collapse>
            ) : null}
          </TabPane>
          <TabPane label="页面属性">
            <Collapse v-model={this.propNames} class="components">
              <datasource></datasource>
              <listeners></listeners>
            </Collapse>
          </TabPane>
        </Tabs>
      </Aside>
    );
  }
});
