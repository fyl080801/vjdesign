import Vue from "vue";
import Editor from "./Editor";

export default Vue.extend({
  components: {
    "watch-editor": Editor
  },
  data() {
    return {
      dialog: {
        visible: false,
        data: {}
      }
    };
  },
  methods: {
    onAdd() {},
    onSubmit() {}
  },
  render() {
    return (
      <el-collapse-item
        key="vjform_watchs"
        name="vjform_watchs"
        class="property-wrapper"
      >
        <div slot="title">
          <i class="el-icon-s-operation"></i>监听
        </div>
        <watch-editor
          visible={this.dialog.visible}
          v-model={this.dialog.data}
          onSubmit={this.onSubmit}
          onCancel={() => (this.dialog.visible = false)}
        ></watch-editor>
        <el-button size="small" onClick={this.onAdd} style="width: 100%">
          <i class="el-icon-plus"></i>
          添加
        </el-button>
      </el-collapse-item>
    );
  }
});
