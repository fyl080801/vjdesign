import Vue from "vue";
import { isEmpty } from "lodash-es";

export default Vue.extend({
  props: {
    value: [Object, String, Number, Array]
  },
  data() {
    const isTransform = this.checkTransform();
    return {
      fieldValue: isTransform ? null : this.value, // 普通值
      transformValue: isTransform ? this.value : null // 转换的值
    };
  },
  computed: {
    isTransform() {
      return this.checkTransform();
    }
  },
  methods: {
    checkTransform() {
      return (
        this.value !== null &&
        typeof this.value === "object" &&
        !isEmpty(this.value.$type)
      );
    },
    changed(value) {
      this.fieldValue = value;
      this.$emit("input", value);
    },
    clearTransform() {
      this.$emit("input", this.fieldValue);
    }
  }
});
