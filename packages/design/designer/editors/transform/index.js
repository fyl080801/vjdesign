import Vue from "vue";
import { isEmpty } from "lodash-es";
import TransformEditor from "./components/editor";
import { convertTransformData } from "./utils";
import "./index.scss";

export default Vue.extend({
  props: {
    value: {
      type: [Object, String, Number, Array, Date],
      required: false,
      default() {
        return null;
      }
    },
    sync: { type: Boolean, default: false }
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
      if (!this.sync) {
        return;
      }
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
      const editor = this.$createElement(TransformEditor, {
        props: {
          value: convertTransformData(this.transformValue)
        }
      });

      this.$confirm(editor, {
        title: "编辑转换",
        customClass: "v-jdesign-transform-editor",
        closeOnClickModal: false,
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            // const result = await form.validate();
            // if (result) {
            //   done();
            // }
            done(action);
          } else {
            done(action);
          }
        }
      })
        .then(result => {
          console.log(result);
          // this.$emit("input", cloneDeep(this.transformValue));
        })
        .catch(() => {});

      // this.$nextTick(() => {
      //   editor.child.shown();
      // });
    }
  }
});
