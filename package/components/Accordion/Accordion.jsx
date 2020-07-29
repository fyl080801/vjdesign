import Vue from "vue";

export default Vue.component("v-jd-accordion", {
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    onItemToggle(name) {
      const index = this.value.indexOf(name);
      if (index >= 0) {
        this.value.splice(index, 1);
      } else {
        this.value.push(name);
      }
    }
  },
  render() {
    return <div class="accordion v-jd-collapse">{this.$slots.default}</div>;
  }
});
