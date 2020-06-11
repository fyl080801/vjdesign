import Vue from "vue";
import { isEmpty } from "lodash-es";
import TransformEditor from "./TransformEditor";

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
    openEditor() {
      this.transformValue = this.transformValue || { $type: null };
      const editor = this.$createElement(TransformEditor, {
        props: { value: this.transformValue }
      });

      this.$confirm(editor, {
        title: "编辑转换",
        customClass: "v-jdesign-transform-editor",
        beforeClose: async (action, instance, done) => {
          const { child: form } = editor;

          try {
            if (action === "confirm") {
              const result = await form.validate();
              if (result) {
                done();
              }
            } else {
              done();
            }
          } catch {
            //
          }
        }
      })
        .then(() => {
          this.$emit("input", this.transformValue);
        })
        .catch(() => {});

      this.$nextTick(() => {
        editor.child.clearValidate();
      });
    }
  }
});
