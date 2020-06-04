import Vue from "vue";
import { isEmpty } from "lodash-es";
import TransformEditor from "./TransformEditor.vue";

export default Vue.extend({
  props: {
    value: {
      type: [Object, String, Number, Array, Date],
      required: false,
      default() {
        return null;
      }
    }
  },
  components: { [TransformEditor.name]: TransformEditor },
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
    },
    async openEditor() {
      try {
        const transformValue = { $type: null };
        const editor = this.$createElement(TransformEditor, {
          props: { value: transformValue }
        });
        await this.$confirm(editor, "编辑转换", {
          customClass: "v-jdesign-transform-editor",
          beforeClose: (action, instance, done) => {
            if (action === "confirm") {
              editor.child
                .validate()
                .then(result => {
                  if (result) {
                    done();
                  }
                })
                .catch(() => {
                  // not validate
                });
            } else {
              done();
            }
          }
        });
        console.log(transformValue);
      } catch {
        //
      }
    }
  }
});
