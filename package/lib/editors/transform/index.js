import Vue from "vue";
import { isEmpty, cloneDeep } from "lodash-es";
import TransformEditor from "./components/form";
import { convertTransformData, convertTransformResult } from "./helpers";
import "./styles/index.scss";

export default Vue.extend({
  props: {
    value: {
      type: [Object, String, Number, Array, Date, Boolean],
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
  watch: {
    value(newval) {
      const isTransform = this.checkTransform();
      this.fieldValue = isTransform ? null : newval; // 普通值
      this.transformValue = isTransform ? newval : null; // 转换的值
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
      //
      const editingData = cloneDeep(
        convertTransformData(this.transformValue, true)
      );
      const editor = this.$createElement(TransformEditor, {
        props: {
          value: editingData
        }
      });

      this.$confirm(editor, {
        title: "编辑转换",
        customClass: "v-jdesign-transform-editor",
        closeOnClickModal: false,
        beforeClose: (action, instance, done) => {
          // if (action === "confirm") {
          //   // const result = await form.validate();
          //   // if (result) {
          //   //   done();
          //   // }
          //   done(action);
          // } else {
          //   done(action);
          // }
          done(action);
        }
      })
        .then(result => {
          if (result !== "confirm") {
            return;
          }

          this.$emit("input", convertTransformResult(editingData));
        })
        .catch(() => {});

      this.$nextTick(() => {
        editor.child.shown();
      });
    }
  }
});
