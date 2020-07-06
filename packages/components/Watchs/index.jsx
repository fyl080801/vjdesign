import Vue from "vue";

export default Vue.extend({
  methods: {
    onAdd() {}
  },
  render() {
    return (
      <el-collapse-item
        key="vjform_watchs"
        name="vjform_watchs"
        class="property-wrapper"
      >
        <div slot="title">
          <i class="el-icon-s-operation"></i> 监听
        </div>
        <el-button onClick={this.onAdd} style="width: 100%">
          <i class="el-icon-plus"></i>
          添加
        </el-button>
      </el-collapse-item>
    );
  }
});
