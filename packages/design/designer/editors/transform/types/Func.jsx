import Vue from "vue";

export default Vue.extend({
  props: {
    value: Object
  },
  computed: {
    args() {
      return [];
    }
  },
  render() {
    return (
      <div>
        <el-form-item label="参数" prop="$arguments">
          <span slot="label">
            参数
            <el-button type="text" style={{ marginLeft: "15px" }}>
              <i
                class="el-icon-circle-plus-outline"
                style={{ marginRight: "5px" }}
              ></i>
              添加
            </el-button>
          </span>
          <el-table border={true} show-header={false} data={this.args}>
            <el-table-column lable="参数名" prop="name"></el-table-column>
            <el-table-column lable="参数值" prop="value"></el-table-column>
            <el-table-column lable="操作"></el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item
          label="表达式"
          prop="$result"
          rules={[{ required: true, message: "必填项" }]}
        >
          <el-input v-model={this.value.$result}></el-input>
        </el-form-item>
        <el-form-item label="默认值" prop="$default">
          <el-input v-model={this.value.$default}></el-input>
        </el-form-item>
      </div>
    );
  }
});
