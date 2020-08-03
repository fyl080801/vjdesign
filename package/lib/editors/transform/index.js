import Vue from "vue";
import { isEmpty, cloneDeep } from "lodash-es";
import TransformEditor from "./components/form";
import { convertTransformData, convertTransformResult } from "./helpers";
// import "./styles/index.scss";

export default Vue.extend({
  props: {
    value: {
      type: [Object, String, Number, Array, Date, Boolean],
      required: false,
      default() {
        return null;
      }
    },
    transforms: { type: Array, default: () => [] }
  },
  data() {
    const isTransform = this.checkTransform();
    return {
      dialog: {
        mounted: false,
        visible: false,
        value: null,
        transforms: []
      },
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
      this.dialog.transforms = [...this.transforms];

      if (!this.dialog.mounted) {
        document.body.appendChild(
          new Vue({
            render: h => {
              return h(TransformEditor, {
                props: this.dialog,
                on: {
                  cancel: () => {
                    this.dialog.visible = false;
                  },
                  submit: data => {
                    this.$emit("input", convertTransformResult(data));
                    this.dialog.visible = false;
                  }
                }
              });
            }
          }).$mount().$el
        );

        this.dialog.mounted = true;
      }

      this.dialog.value = cloneDeep(
        convertTransformData(this.transformValue, true)
      );
      this.dialog.visible = true;
    }
  }
});
