import Vue from "vue";
import ComponentList from "../components/ComponentList/index";
import { getGroups } from "../lib/feature/component";
import { Tabs, TabPane } from "element-ui";

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
      <div class="aside">
        <Tabs type="border-card" class="max-aside">
          <TabPane label="组件库">
            <component-list list={this.origin}></component-list>
          </TabPane>
        </Tabs>
      </div>
    );
  }
});
