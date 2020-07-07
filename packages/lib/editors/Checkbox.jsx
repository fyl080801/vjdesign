import Vue from "vue";
import Transform from "./transform";
import "./Checkbox.scss";

const component = Vue.component("v-jdesign-checkbox", {
  mixins: [Transform],
  render() {
    return (
      <div class="v-jdesign-checkbox">
        {!this.isTransform ? (
          <el-checkbox
            v-model={this.fieldValue}
            onChange={this.changed}
          ></el-checkbox>
        ) : (
          <el-checkbox disabled={true}>{"<转换>"}</el-checkbox>
        )}
        {!this.isTransform ? (
          <el-button type="text" icon="el-icon-link" onClick={this.openEditor}>
            转换
          </el-button>
        ) : (
          <span>
            <el-button
              type="text"
              icon="el-icon-edit"
              onClick={this.openEditor}
            >
              编辑
            </el-button>
            <el-button
              type="text"
              icon="el-icon-close"
              onClick={this.clearTransform}
            >
              清除
            </el-button>
          </span>
        )}
      </div>
    );
  }
});

export default component;
