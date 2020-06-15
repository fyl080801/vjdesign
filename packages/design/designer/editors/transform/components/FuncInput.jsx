import Vue from "vue";
import Transform from "../index";

export default Vue.extend({
  mixins: [Transform],
  render() {
    return (
      <div>
        {!this.isTransform ? (
          <el-input
            value={this.fieldValue}
            placeholder="请输入"
            onInput={this.changed}
          >
            <el-button slot="append" icon="el-icon-link"></el-button>
          </el-input>
        ) : (
          <el-input placeholder="<转换的值>" readonly={true}>
            <el-button slot="append" icon="el-icon-edit"></el-button>
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
