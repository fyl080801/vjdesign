import Vue from "vue";
import { mapState } from "vuex";
import Editor from "./Editor";

export default Vue.extend({
  components: { "datasource-editor": Editor },
  data() {
    return {
      dialog: {
        visible: false,
        data: {}
      }
    };
  },
  computed: mapState({
    datasource: state =>
      Object.keys(state.form.datasource).map(key => ({
        name: key,
        value: state.form.datasource[key]
      }))
  }),
  methods: {
    addDatasource() {
      this.dialog.data = {};
      this.dialog.visible = true;
    },
    onSubmitDatasource(data) {
      this.dialog.visible = false;
      console.log(data);
    }
  },
  render() {
    return (
      <el-collapse-item key="vjform_datasource" name="vjform_datasource">
        <div slot="title">
          <i class="el-icon-s-operation"></i> 数据源
        </div>
        {this.datasource.map(ds => (
          <p>{ds.name}</p>
        ))}
        <datasource-editor
          visible={this.dialog.visible}
          v-model={this.dialog.data}
          onSubmit={this.onSubmitDatasource}
          onCancel={() => (this.dialog.visible = false)}
        ></datasource-editor>
        <el-button onClick={this.addDatasource}>添加</el-button>
      </el-collapse-item>
    );
  }
});
