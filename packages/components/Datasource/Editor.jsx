import Vue from "vue";
import { cloneDeep } from "lodash-es";
import { getDatasources } from "../../lib/feature/datasource";
import { assemblyEditor } from "../../lib/feature/property";
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

        this.$nextTick(() => {
          if (this.$refs && this.$refs.form) {
            this.$refs.form.clearValidate();
          }
        });
      }
    },
    ["model.type"](value) {
      this.editing = null;
      this.components = {};

      if (value) {
        const selected = this.datasources.find(ds => ds.type === value);

        if (!selected) {
          return;
        }

        this.editing = assemblyEditor(selected.options) || [];
        this.editing.forEach(item => {
          if (item.instance) {
            this.components[item.instance.name] = item.instance;
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
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit("submit", this.model);
        }
      });
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
        custom-class="v-jdesign-dialog"
        close-on-click-modal={false}
        append-to-body={true}
      >
        <el-form
          ref="form"
          props={{ model: this.model }}
          label-position="top"
          size="small"
        >
          <el-form-item
            prop="name"
            label="名称"
            rules={[{ required: true, message: "必填项" }]}
          >
            <el-input v-model={this.model.name} placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item
            prop="type"
            label="类型"
            rules={[{ required: true, message: "必选项" }]}
          >
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
          <el-button size="small" onClick={this.onCancel}>
            取消
          </el-button>
          <el-button size="small" type="primary" onClick={this.onSubmit}>
            确定
          </el-button>
        </span>
      </el-dialog>
    );
  }
});
