import Vue from "vue";
import Panel from "./Panel";

export default Vue.extend({
  props: {
    value: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      values: []
    };
  },
  methods: {
    validate() {
      return Promise.all(
        new Array(this.values.length + 1)
          .fill("")
          .map((item, index) => this.$refs[`trans_${index}`].validate())
      );
    },
    clearValidate() {
      new Array(this.values.length + 1)
        .fill("")
        .forEach((item, index) => this.$refs[`trans_${index}`].clearValidate());
    }
  },
  render() {
    return (
      <div>
        {[this.value, ...this.values].map((item, index) => (
          <Panel ref={`trans_${index}`} value={item}></Panel>
        ))}
      </div>
    );
  }
});
