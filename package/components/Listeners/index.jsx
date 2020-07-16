import Vue from "vue";
import Editor from "./Editor";
import { mapState } from "vuex";
import { CollapseItem, Button } from "element-ui";

export default Vue.extend({
  components: {
    "listeners-editor": Editor
  },
  data() {
    return {
      dialog: {
        visible: false,
        data: {},
        index: -1
      },
      data: []
    };
  },
  methods: {
    onAdd() {
      this.dialog.data = {};
      this.dialog.visible = true;
    },
    onEdit(index) {
      this.dialog.index = index;
      this.dialog.data = this.listeners[index];
      this.dialog.visible = true;
    },
    onSubmit(data) {
      this.dialog.visible = false;

      if (this.dialog.index >= 0) {
        this.$store.commit("form/UPDATE_LISTENERS", {
          index: this.dialog.index,
          value: data
        });
      } else {
        this.$store.commit("form/SET_LISTENERS", {
          value: data
        });
      }

      this.dialog.index = -1;
    },
    onCancel() {
      this.dialog.visible = false;
      this.dialog.index = -1;
    }
  },
  computed: {
    ...mapState({
      listeners: ({ form }) => form.value.listeners // 回头转换成树结构
    })
  },
  render() {
    return (
      <CollapseItem
        key="vjform_watchs"
        name="vjform_watchs"
        class="property-wrapper"
      >
        <div slot="title">
          <i class="el-icon-s-operation"></i>监听
        </div>
        <listeners-editor
          visible={this.dialog.visible}
          v-model={this.dialog.data}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
        ></listeners-editor>
        <el-tree
          data={this.data}
          scopedSlots={{ default: () => <div></div> }}
        ></el-tree>
        <Button size="small" onClick={this.onAdd} style="width: 100%">
          <i class="el-icon-plus"></i> 添加
        </Button>
      </CollapseItem>
    );
  }
});
