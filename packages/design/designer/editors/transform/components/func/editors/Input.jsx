import Vue from "vue";
import Transform from "../../../index";
import CascadeEditor from "../../../mixins/cascadeEditor";

export default Vue.extend({
  mixins: [Transform, CascadeEditor],
  render() {
    return (
      <div>
        {!this.isTransform ? (
          <el-input
            value={this.fieldValue}
            placeholder="请输入"
            onInput={this.changed}
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
