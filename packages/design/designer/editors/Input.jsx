import Vue from "vue";
import Transform from "../mixins/transform";

const component = Vue.component("v-jdesign-input", {
  mixins: [Transform],
  render() {
    return (
      <div>
        {!this.isTransform ? (
          <el-input
            v-model={this.fieldValue}
            placeholder="请输入"
            onChange={this.changed}
          >
            <el-button
              slot="append"
              icon="el-icon-link"
              onClick={this.openEditor}
            ></el-button>
          </el-input>
        ) : (
          <el-input placeholder="<转换的值>" readonly={true}>
            <el-button
              slot="append"
              icon="el-icon-edit"
              onClick={this.openEditor}
            ></el-button>
            <el-button
              slot="append"
              icon="el-icon-close"
              onClick={this.clearTransform}
            ></el-button>
          </el-input>
        )}
      </div>
    );
  }
});

export default component;
