import Vue from "vue";
import TransformEditor from "../TransformEditor";
import { cloneDeep } from "lodash-es";

export default Vue.extend({
  methods: {
    openEditor() {
      this.transformValue = this.transformValue || { $type: null };
      const editor = this.$createElement(TransformEditor, {
        props: { value: this.transformValue }
      });

      this.$confirm(editor, {
        title: "编辑转换",
        customClass: "v-jdesign-transform-editor",
        closeOnClickModal: false,
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
          this.$emit("input", cloneDeep(this.transformValue));
        })
        .catch(() => {});

      this.$nextTick(() => {
        editor.child.clearValidate();
      });
    }
  }
});
