import TransformEditor from "./TransformEditor.vue";
import { isEmpty } from "lodash-es";

export default {
  components: { [TransformEditor.name]: TransformEditor },
  props: {
    value: [Object, String]
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
    async openTransform(value) {
      return await new Promise((resolve, reject) => {
        let transformValue = value;

        const component = this.$createElement(TransformEditor.name, {
          on: {
            input: newvalue => {
              transformValue = newvalue;
            }
          },

          props: { value, width: "200px" }
        });

        this.$confirm(component, "编辑转换", {
          customClass: "transform-form",
          beforeClose: (action, instance, done) => {
            if (action === "confirm" && transformValue !== null) {
              resolve(transformValue);
            } else {
              reject();
            }
            done();
          }
        }).catch(() => {});
      });
    },
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
    setTransform() {
      this.openTransform(this.transformValue)
        .then(value => {
          this.$emit("input", value);
        })
        .catch(() => {});
    },
    clearTransform() {
      this.$emit("input", this.fieldValue);
    }
  }
};
