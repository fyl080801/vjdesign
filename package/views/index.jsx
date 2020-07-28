import Vue from "vue";
import store from "../store";
import Components from "./Components";
import Main from "./Main";
import Properties from "./Properties";

export default Vue.extend({
  store,
  props: {
    value: Object,
    components: Object
  },
  components: {},
  created() {
    this.$store.commit("components/UPDATE", this.components || {});
    this.$store.commit("form/CREATEED", this.value);
  },
  render() {
    return (
      <div class="v-jdesign">
        <Components></Components>
        <Main></Main>
        <Properties></Properties>
      </div>
    );
  }
});
