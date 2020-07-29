import Vue from "vue";
import { mapState } from "vuex";
import Editor from "./Editor";
import { getDatasources } from "../../lib/feature/datasource";
import "./index.scss";
import { Tag, Button, Popconfirm } from "element-ui";
import { Card } from "../Accordion";

export default Vue.extend({
  components: { "datasource-editor": Editor },
  data() {
    return {
      datasources: {},
      dialog: {
        visible: false,
        data: {}
      }
    };
  },
  computed: {
    ...mapState({
      datasource: ({ form }) => {
        return Object.keys(form.value.datasource || {}).map(key => ({
          name: key,
          value: form.value.datasource[key]
        }));
      }
    })
  },
  methods: {
    onAdd() {
      this.dialog.data = {};
      this.dialog.visible = true;
    },
    onEdit(index) {
      const current = this.datasource[index];
      this.dialog.data = { ...current.value, name: current.name, index: index };
      this.dialog.visible = true;
    },
    onSubmit(data) {
      this.dialog.visible = false;

      if (data.index !== undefined) {
        this.$store.commit("form/UPDATE_DATASOURCE", {
          name: this.datasource[data.index].name,
          value: { ...data, index: undefined }
        });
      } else {
        this.$store.commit("form/SET_DATASOURCE", {
          name: data.name,
          value: data
        });
      }
    },
    onRemove(item) {
      this.$store.commit("form/REMOVE_DATASOURCE", item.name);
    }
  },
  mounted() {
    this.datasources = getDatasources().reduce((result, ds) => {
      result[ds.type] = ds.description;
      return result;
    }, {});
  },
  render() {
    return (
      <Card
        class="property-wrapper"
        key="vjform_datasource"
        name="vjform_datasource"
      >
        <fragment slot="title">
          <i>
            <svg-icon name="tools" />
          </i>
          数据源
        </fragment>
        {/* <div slot="title">
          <i class="el-icon-s-operation"></i>数据源
        </div> */}
        {/* 这种Ïdialog必须放到前面 */}
        <datasource-editor
          visible={this.dialog.visible}
          v-model={this.dialog.data}
          onSubmit={this.onSubmit}
          onCancel={() => (this.dialog.visible = false)}
        ></datasource-editor>
        <div class="property-wrapper__body">
          {this.datasource.length <= 0 ? <p class="empty">暂无数据</p> : null}
          {this.datasource.map((ds, index) => (
            <div class="inline-property">
              <div class="inline-property__title">
                <span>{ds.name}</span>
                <span style="line-height: 30px">
                  <Tag size="small" type="info">
                    {this.datasources[ds.value.type]}
                  </Tag>
                </span>
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
                  onOnConfirm={() => this.onRemove(ds)}
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
