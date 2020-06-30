import Vue from "vue";
import Panel from "./Panel";
import { uuid } from "../../../../../utils/helpers";
import { TransformTypes } from "../../../../../utils/enums";
import { isEmpty } from "lodash-es";
import "./index.scss";

export default Vue.extend({
  props: {
    value: Array
  },
  data() {
    return {
      editing: null,
      rootKey: this.value[0].uuid
    };
  },
  methods: {
    shown() {
      this.editing = null;
    },
    //
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
        ? "组件属性"
        : this.isNewNode(data)
        ? "<参数>"
        : data.name;
    },
    isRoot(data) {
      return data.isRoot;
    },
    isNewNode(data) {
      return isEmpty(data.name) ? (data.isRoot ? false : true) : false;
    }
  },
  watch: {
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
      <div class="v-jdesign-transform-wrapper">
        <el-tree
          ref="tree"
          class="v-jdesign-transform-panel"
          data={this.value}
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
                      <el-tag size="mini" type="success">
                        {TransformTypes[data.$type]}
                      </el-tag>
                    ) : null}
                  </div>
                  <div class="transform-action">
                    {data.$type && ["func", "on"].includes(data.$type) ? (
                      <el-button
                        type="text"
                        onClick={() => this.addArgument(node)}
                      >
                        添加参数
                      </el-button>
                    ) : null}
                    <el-button
                      type="text"
                      disabled={data.isRoot}
                      onClick={() => this.removeArgument(node)}
                    >
                      删除
                    </el-button>
                  </div>
                </div>
              );
            }
          }}
        ></el-tree>
        {this.editing ? (
          <Panel value={this.editing}></Panel>
        ) : (
          <div class="v-jdesign-transform-panel"></div>
        )}
      </div>
    );
  }
});
