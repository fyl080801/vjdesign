import emiter from "../../utils/emiter";
import { getComponents } from "../feature/component";

let natives = null;

// 元素设计时处理程序
export default function() {
  return function(field, options) {
    natives =
      natives ||
      getComponents()
        .filter(item => item.base !== false)
        .map(item => item.tag);

    if (options.mode !== "design" || field.layout) {
      return;
    }

    const cloned = { layout: true, ...field };

    Object.keys(field).forEach(key => {
      delete field[key];
    });

    field.component = "div";
    field.layout = true;
    field.fieldOptions = {
      class:
        "design-element " + (emiter.editing === cloned.uuid ? "editing" : "")
    };

    field.children = []
      .concat(cloned)
      .concat(
        ["top", "left", "bottom", "right"].map(item => ({
          component: "div",
          layout: true,
          fieldOptions: {
            class: "border border-" + item
          }
        }))
      )
      .concat(
        [
          {
            component: "span",
            layout: true,
            fieldOptions: {
              class: "tag",
              domProps: {
                innerText: cloned.remark
                  ? cloned.component + "." + cloned.remark
                  : cloned.component
              }
            }
          },
          emiter.editing === cloned.uuid
            ? {
                component: "a",
                layout: true,
                fieldOptions: {
                  class: "del",
                  domProps: {
                    innerHTML: '<i class="el-icon-delete"></i> 删除',
                    href: "javascript:;"
                  },
                  on: {
                    click: () => {
                      this.$confirm("是否删除？")
                        .then(() => {
                          emiter.$emit("component-delete", cloned);
                        })
                        .catch(() => {});
                    }
                  }
                }
              }
            : null
        ].filter(item => item !== null)
      );

    const onEvent = natives.indexOf(field.component) >= 0 ? "on" : "nativeOn";

    field.fieldOptions[onEvent] = field.fieldOptions[onEvent] || {};
    field.fieldOptions[onEvent].click = evt => {
      emiter.$emit("component-selected", cloned);
      emiter.setEditing(cloned.uuid);
      evt.stopPropagation();
    };
  };
}
