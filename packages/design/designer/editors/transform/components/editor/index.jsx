import Vue from "vue";
import Panel from "./Panel";
import "./index.scss";

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
    },
    setTransform(payload, index) {
      // if (index > this.values.length - 1) {
      //   // 触发转换编辑的面板大于当前正在编辑转换的面板数量，是不可能的
      //   // 只可能会发生当前面板其他参数被编辑，或者上级某个面板的参数被编辑
      //   return;
      // }

      if (index < this.values.length) {
        // 当前面板之前的面板参数需要被编辑
        this.values = this.values.slice(0, index);
        this.values.push(payload);
      } else if (index === this.values.length) {
        //
        this.values.push(payload);
      }
    }
  },
  render() {
    return (
      <div class="v-jdesign-transform-wrapper">
        {[this.value, ...this.values].map((item, index) => (
          <Panel
            ref={`trans_${index}`}
            value={item}
            onSetTransform={payload => {
              this.setTransform(payload, index);
            }}
          ></Panel>
        ))}
      </div>
    );
  }
});
