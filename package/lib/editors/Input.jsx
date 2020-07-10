import Vue from "vue";
import Transform from "./transform";
import { Input, Button } from "element-ui";

export default Vue.component("v-jdesign-input", {
  mixins: [Transform],
  render() {
    return (
      <div>
        {!this.isTransform ? (
          <Input
            v-model={this.fieldValue}
            placeholder="请输入"
            onChange={this.changed}
          >
            <Button
              slot="append"
              icon="el-icon-link"
              onClick={this.openEditor}
            ></Button>
          </Input>
        ) : (
          <Input placeholder="<转换的值>" readonly={true}>
            <Button
              slot="append"
              icon="el-icon-edit"
              onClick={this.openEditor}
            ></Button>
            <Button
              slot="append"
              icon="el-icon-close"
              onClick={this.clearTransform}
            ></Button>
          </Input>
        )}
      </div>
    );
  }
});
