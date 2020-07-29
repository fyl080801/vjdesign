import Vue from "vue";
import Editor from "./Editor";
import { mapState } from "vuex";
import { Button, Popconfirm } from "element-ui";
import { Card } from "../Accordion";

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
    onRemove(index) {
      this.$store.commit("form/REMOVE_LISTENERS", {
        index: index
      });
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
      listeners: ({ form }) => form.value.listeners
    })
  },
  render() {
    return (
      <Card key="vjform_watchs" name="vjform_watchs" class="property-wrapper">
        <fragment slot="title">
          <i>
            <svg-icon name="tools" />
          </i>
          监听
        </fragment>
        <listeners-editor
          visible={this.dialog.visible}
          v-model={this.dialog.data}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
        ></listeners-editor>
        <div class="property-wrapper__body">
          {this.listeners.length <= 0 ? <p class="empty">暂无数据</p> : null}
          {this.listeners.map((lis, index) => (
            <div class="inline-property">
              <div class="inline-property__title">
                <span>{lis.label}</span>
              </div>
              <div class="inline-property__action">
                <Button
                  size="small"
                  type="text"
                  onClick={() => this.onEdit(index)}
                >
                  编辑
                </Button>
                <Popconfirm
                  title="是否删除？"
                  onOnConfirm={() => this.onRemove(lis)}
                >
                  <Button slot="reference" size="small" type="text">
                    删除
                  </Button>
                </Popconfirm>
              </div>
            </div>
          ))}
        </div>
        <Button size="small" onClick={this.onAdd} style="width: 100%">
          <i class="el-icon-plus"></i> 添加
        </Button>
      </Card>
    );
  }
});
