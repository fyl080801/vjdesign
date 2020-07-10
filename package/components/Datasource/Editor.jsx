import Vue from "vue";
import { cloneDeep } from "lodash-es";
import { getDatasources } from "../../lib/feature/datasource";
import { assemblyEditor } from "../../lib/feature/property";
import "./Editor.scss";
import VJForm from "vjform";
import {
  Dialog,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Button
} from "element-ui";

export default Vue.extend({
  props: {
    visible: Boolean,
    value: Object
  },
  data() {
    return {
      updating: false,
      datasources: [],
      model: {},
      editing: null,
      components: {}
    };
  },
  watch: {
    visible(value) {
      if (value === true) {
        this.updating = true;
        this.model = cloneDeep(this.value);

        this.$nextTick(() => {
          if (this.$refs && this.$refs.form) {
            this.$refs.form.clearValidate();
          }
          this.updating = false;
        });
      }
    },
    ["model.type"](value) {
      this.editing = null;
      this.components = {
        "el-form-item": FormItem
      };

      if (value) {
        const selected = this.datasources.find(ds => ds.type === value);

        if (!selected) {
          return;
        }

        this.editing = assemblyEditor(selected.options) || [];
        this.editing.forEach(item => {
          this.components = { ...this.components, ...item.editorComponents };
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
      <Dialog
        visible={this.visible}
        title="数据源"
        onClose={this.onCancel}
        width="540px"
        custom-class="v-jdesign-dialog"
        close-on-click-modal={false}
        append-to-body={true}
      >
        <Form
          ref="form"
          props={{ model: this.model }}
          label-position="top"
          size="small"
        >
          <FormItem
            prop="name"
            label="名称"
            rules={[{ required: true, message: "必填项" }]}
          >
            <Input v-model={this.model.name} placeholder="请输入"></Input>
          </FormItem>
          <FormItem
            prop="type"
            label="类型"
            rules={[{ required: true, message: "必选项" }]}
          >
            <Select v-model={this.model.type} placeholder="请选择">
              {this.datasources.map(ds => (
                <Option value={ds.type} label={ds.description}></Option>
              ))}
            </Select>
          </FormItem>
          {this.editing && !this.updating ? (
            <VJForm
              fields={this.editing}
              v-model={this.model}
              onInput={value => {
                this.model = { ...this.model, ...value };
              }}
              components={this.components}
            ></VJForm>
          ) : null}
        </Form>
        <span slot="footer" class="dialog-footer">
          <Button size="small" onClick={this.onCancel}>
            取消
          </Button>
          <Button size="small" type="primary" onClick={this.onSubmit}>
            确定
          </Button>
        </span>
      </Dialog>
    );
  }
});
