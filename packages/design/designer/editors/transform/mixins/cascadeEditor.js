import Vue from "vue";
import emiter from "./emiter";

export default Vue.extend({
  methods: {
    openEditor() {
      this.transformValue = this.transformValue || { $type: null };
      emiter.$emit("set-transform", this.transformValue);
    }
  }
});
