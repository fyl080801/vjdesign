import Vue from "vue";
import { Dialog } from "element-ui";

export default Vue.extend({
  props: {
    visible: Boolean,
    value: Object
  },
  data() {
    return {
      model: {}
    };
  },
  methods: {
    onCancel() {}
  },
  render() {
    return (
      <Dialog
        visible={this.visible}
        title="数据源"
        onClose={this.onCancel}
        width="540px"
        custom-class="v-jdesign-dialog"
        close-on-click-modal={false}
        append-to-body={true}
      ></Dialog>
    );
  }
});
