import Vue from "vue";
import { mapState } from "vuex";
import Editor from "./Editor";
import { getDatasources } from "../../lib/feature/datasource";
import "./index.scss";

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
      datasource: state => {
        return Object.keys(state.form.datasource).map(key => ({
          name: key,
          value: state.form.datasource[key]
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
      this.$confirm("是否删除？", "删除数据源")
        .then(() => {
          this.$store.commit("form/REMOVE_DATASOURCE", item.name);
        })
        .catch(() => {});
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
      <el-collapse-item
        class="property-wrapper"
        key="vjform_datasource"
        name="vjform_datasource"
      >
        <div slot="title">
          <i class="el-icon-s-operation"></i>数据源
        </div>
        {/* 这种Ïdialog必须放到前面 */}
        <datasource-editor
          visible={this.dialog.visible}
          v-model={this.dialog.data}
          onSubmit={this.onSubmit}
          onCancel={() => (this.dialog.visible = false)}
        ></datasource-editor>
        <div class="property-wrapper__body">
          {this.datasource.map((ds, index) => (
            <div class="inline-property">
              <div class="inline-property__title">
                <span>{ds.name}</span>
                <span style="line-height: 30px">
                  <el-tag size="small" type="info">
                    {this.datasources[ds.value.type]}
                  </el-tag>
                </span>
              </div>
              <div class="inline-property__action">
                <el-button
                  size="small"
                  type="text"
                  onClick={() => this.onEdit(index)}
                >
                  编辑
                </el-button>
                <el-button
                  size="small"
                  type="text"
                  onClick={() => this.onRemove(ds)}
                >
                  删除
                </el-button>
              </div>
            </div>
          ))}
        </div>
        <el-button size="small" onClick={this.onAdd} style="width: 100%">
          <i class="el-icon-plus"></i>
          添加
        </el-button>
      </el-collapse-item>
    );
  }
});
