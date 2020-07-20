import Vue from "vue";
import {
  Dialog,
  Button,
  Form,
  FormItem,
  Input,
  Checkbox,
  Row,
  Col
} from "element-ui";
import { cloneDeep } from "lodash-es";
import { assemblyEditor } from "../../lib/feature/property";
import VJForm from "vjform";

export default Vue.extend({
  props: {
    visible: Boolean,
    value: Object
  },
  data() {
    return {
      updating: false,
      model: {},
      components: {},
      fields: []
    };
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
    }
  },
  mounted() {
    this.components = {
      "el-form-item": FormItem
    };

    this.fields =
      assemblyEditor([
        {
          property: "watch",
          description: "监听",
          rules: [{ required: true, message: "必填项" }],
          editor: {
            name: "default",
            options: { props: { transforms: ["bind", "func"] } }
          }
        }
      ]) || [];

    this.fields.forEach(item => {
      this.components = { ...this.components, ...item.editorComponents };
    });
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
            prop="source"
            label="名称"
            rules={[{ required: true, message: "必填项" }]}
          >
            <Input v-model={this.model.source} placeholder="请输入"></Input>
          </FormItem>
          <Row gutter={20}>
            <Col span={12}>
              <FormItem prop="deep" label="深度监听">
                <Checkbox v-model={this.model.deep}></Checkbox>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem prop="immediate" label="首次执行">
                <Checkbox v-model={this.model.immediate}></Checkbox>
              </FormItem>
            </Col>
          </Row>
          {!this.updating ? (
            <VJForm
              class="vjdesign-property"
              fields={this.fields}
              v-model={this.model}
              onClear={() => {
                this.updating = true;
                this.$nextTick(() => {
                  this.updating = false;
                });
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
