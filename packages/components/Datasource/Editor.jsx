import Vue from "vue";
import { cloneDeep } from "lodash-es";
import { getDatasources } from "../../lib/feature/datasource";
import { assemblyEditor } from "../../lib/feature/property";
import { set } from "lodash-es";
import "./Editor.scss";

export default Vue.extend({
  props: {
    visible: Boolean,
    value: Object
  },
  data() {
    return {
      datasources: [],
      model: {},
      editing: null,
      components: {}
    };
  },
  watch: {
    visible(value) {
      if (value === true) {
        this.model = cloneDeep(this.value);
      }
    },
    ["model.type"](value) {
      this.editing = null;
      this.components = {};

      if (value) {
        const selectDatasource = this.datasources.find(ds => ds.type === value);

        if (!selectDatasource) {
          return;
        }

        this.editing = assemblyEditor(selectDatasource.options) || [];
        this.editing.forEach(item => {
          if (item.instance) {
            this.components[item.instance.name] = item.instance;
          }
          if (item.defaultValue !== undefined) {
            set(this.model, item.property, item.defaultValue);
          }
        });
      }
    }
  },
  methods: {
    onCancel() {
      this.$emit("cancel");
    },
    onSubmit() {
      if (!this.model.name) {
        return;
      }
      this.$emit("submit", this.model);
    }
  },
  mounted() {
    this.datasources = getDatasources();
  },
  render() {
    return (
      <el-dialog
        visible={this.visible}
        title="数据源"
        onClose={this.onCancel}
        width="540px"
        custom-class="v-jdesign-datasource-dialog"
        close-on-click-modal={false}
        append-to-body={true}
      >
        <el-form props={{ model: this.model }} label-position="top">
          <el-form-item prop="name" label="名称">
            <el-input v-model={this.model.name} placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item prop="type" label="类型">
            <el-select v-model={this.model.type} placeholder="请选择">
              {this.datasources.map(ds => (
                <el-option value={ds.type} label={ds.description}></el-option>
              ))}
            </el-select>
          </el-form-item>
          {this.editing ? (
            <vjform
              fields={this.editing}
              v-model={this.model}
              components={this.components}
            ></vjform>
          ) : null}
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button onClick={this.onCancel}>取消</el-button>
          <el-button type="primary" onClick={this.onSubmit}>
            确定
          </el-button>
        </span>
      </el-dialog>
    );
  }
});
