import Vue from "vue";
// import emiter from "./emiter";

export default Vue.extend({
  methods: {
    openEditor() {
      this.transformValue = this.transformValue || { $type: null };

      this.$emit("setTransform", this.transformValue);

      this.$nextTick(() => {
        this.$emit("input", this.transformValue);
      });
      // emiter.$emit("set-transform", this.transformValue);
    }
  }
});
