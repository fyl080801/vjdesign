import Vue from "vue";
import Panel from "./Panel";
import { uuid } from "../../../../../utils/helpers";
import { TransformTypes } from "../../../../../utils/enums";
import { isEmpty, cloneDeep } from "lodash-es";
import "./index.scss";
import { Tree, Tag, Button, Dialog } from "element-ui";

export default Vue.extend({
  props: {
    value: Array,
    transforms: Array,
    visible: Boolean
  },
  data() {
    return {
      model: {},
      editing: null
    };
  },
  computed: {
    rootKey() {
      return this.value.length > 0 ? this.value[0].uuid : null;
    }
  },
  methods: {
    addArgument(node) {
      this.$refs.tree.append({ $type: null, uuid: uuid(), name: "" }, node);
    },
    removeArgument(node) {
      this.$refs.tree.remove(node);
    },
    onCurrentChange(data) {
      this.editing = data;
    },
    //
    getNodeName(data) {
      return this.isRoot(data)
        ? "转换属性"
        : this.isNewNode(data)
        ? "<参数>"
        : data.name;
    },
    isRoot(data) {
      return data.isRoot;
    },
    isNewNode(data) {
      return isEmpty(data.name) ? (data.isRoot ? false : true) : false;
    },
    //
    onCancel() {
      this.$emit("cancel");
    },
    onSubmit() {
      this.$emit("submit", this.model);
    }
  },
  watch: {
    visible(value) {
      if (value === true) {
        this.model = cloneDeep(this.value);
        this.editing = null;
      }
    },
    ["editing.$type"](value) {
      if (!this.editing) {
        return;
      }

      if (
        !["func", "on"].includes(value) &&
        (this.editing.children || []).length > 0
      ) {
        for (let i = this.editing.children.length; i >= 0; i--) {
          this.$refs.tree.remove(this.editing.children[i]);
        }
      }
    }
  },
  render() {
    return (
      <Dialog
        visible={this.visible}
        title="编辑转换"
        custom-class="v-jdesign-dialog"
        append-to-body={true}
        close-on-click-modal={false}
        onClose={this.onCancel}
      >
        <div class="v-jdesign-transform-wrapper">
          <Tree
            ref="tree"
            class="v-jdesign-transform-panel"
            data={this.model}
            highlight-current={true}
            default-expand-all={true}
            expand-on-click-node={false}
            node-key="uuid"
            current-node-key="uuid"
            props={{ children: "children" }}
            on-current-change={this.onCurrentChange}
            class="transform-tree"
            scopedSlots={{
              default: ({ node, data }) => {
                return (
                  <div
                    class={{
                      "transform-item-wrapper": true,
                      root: this.isRoot(data),
                      new: this.isNewNode(data)
                    }}
                  >
                    <div class="transform-item-label">
                      <span>{this.getNodeName(data)}</span>
                      {data.$type && TransformTypes[data.$type] ? (
                        <Tag size="mini" type="success">
                          {TransformTypes[data.$type]}
                        </Tag>
                      ) : null}
                    </div>
                    <div class="transform-action">
                      {data.$type && ["func", "on"].includes(data.$type) ? (
                        <Button
                          type="text"
                          size="small"
                          onClick={() => this.addArgument(node)}
                        >
                          添加参数
                        </Button>
                      ) : null}
                      <Button
                        type="text"
                        size="small"
                        disabled={data.isRoot}
                        onClick={() => this.removeArgument(node)}
                      >
                        删除
                      </Button>
                    </div>
                  </div>
                );
              }
            }}
          ></Tree>
          {this.editing ? (
            <Panel
              value={this.editing}
              transforms={this.isRoot(this.editing) ? this.transforms : null}
            ></Panel>
          ) : (
            <div class="v-jdesign-transform-panel"></div>
          )}
        </div>
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
