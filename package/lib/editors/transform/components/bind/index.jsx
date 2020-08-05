import Vue from 'vue'
// import { Input, FormItem } from "element-ui";

export default Vue.extend({
  props: {
    value: Object
  },
  render() {
    return (
      <div>
        {/* <FormItem
          label="来源"
          prop="$source"
          rules={[{ required: true, message: "必填项" }]}
        >
          <Input
            v-model={this.value.$source}
            placeholder="model,params,datasource,sourcedata里的属性完整路径"
          ></Input>
        </FormItem>
        <FormItem label="默认值" prop="$default">
          <Input v-model={this.value.$default} placeholder="请输入"></Input>
        </FormItem> */}
      </div>
    )
  }
})
