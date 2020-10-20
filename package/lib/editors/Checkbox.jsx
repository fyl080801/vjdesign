import Vue from "vue";
import Transform from "./transform";
import "./Checkbox.scss";
import { Checkbox, Button } from "element-ui";

const component = Vue.component("v-jdesign-checkbox", {
  mixins: [Transform],
  render() {
    return (
      <div class="v-jdesign-checkbox">
        {!this.isTransform ? (
          <Checkbox
            v-model={this.fieldValue}
            onChange={this.changed}
          ></Checkbox>
        ) : (
          <Checkbox disabled={true}>{"<转换>"}</Checkbox>
        )}
        {!this.isTransform ? (
          <Button type="text" icon="el-icon-link" onClick={this.openEditor}>
            转换
          </Button>
        ) : (
          <span>
            <Button type="text" icon="el-icon-edit" onClick={this.openEditor}>
              编辑
            </Button>
            {/* <Button
              type="text"
              icon="el-icon-close"
              onClick={this.clearTransform}
            >
              清除
            </Button> */}
          </span>
        )}
      </div>
    );
  }
});

export default component;
