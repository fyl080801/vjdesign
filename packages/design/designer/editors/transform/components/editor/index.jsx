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
    // shown() {
    //   this.$refs.tree.setCurrentKey(this.value[0].uuid);
    //   this.editing = this.value[0];
    // },
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
      return isEmpty(data.name)
        ? data.isRoot
          ? "<root>"
          : "<新建节点>"
        : data.name;
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
                <div class="transform-item-wrapper">
                  <div class="transform-item-label">
                    <span>{this.getNodeName(data)}</span>
                    {data.$type && TransformTypes[data.$type] ? (
                      <el-tag size="mini" type="success">
                        {TransformTypes[data.$type]}
                      </el-tag>
                    ) : null}
                  </div>
                  <div class="transform-action">
                    {data.$type &&
                    data.$type !== "bind" &&
                    data.$type !== "raw" ? (
                      <el-button
                        type="text"
                        onClick={() => this.addArgument(node)}
                      >
                        添加参数
                      </el-button>
                    ) : null}
                    <el-button
                      type="text"
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
