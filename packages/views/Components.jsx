import Vue from "vue";
import ComponentList from "../components/ComponentList/index";
import { getGroups } from "../lib/feature/component";

export default Vue.extend({
  components: { ComponentList },
  data() {
    return {
      origin: []
    };
  },
  mounted() {
    this.origin = getGroups();
  },
  render() {
    return (
      <el-aside class="aside">
        <el-tabs type="border-card" class="max-aside">
          <el-tab-pane label="组件库">
            <component-list list={this.origin}></component-list>
          </el-tab-pane>
        </el-tabs>
      </el-aside>
    );
  }
});
