import emiter from "../../utils/emiter";
import { getComponents } from "../feature/component";

let layouts = null;

// 布局元素处理程序
export default function() {
  return function(field, options) {
    layouts = layouts
      ? layouts
      : getComponents()
          .filter(item => item.container)
          .map(item => item.tag);

    const { component, layout, remark } = field;

    if (
      options.mode !== "design" ||
      layouts.indexOf(component) < 0 ||
      (layout && /border/g.test((field.fieldOptions || {}).class || "")) ||
      (layout &&
        ((field.fieldOptions || {}).class || "").indexOf("design-element") >= 0)
    ) {
      return;
    }

    field.layout = true;
    field.children = [
      {
        component: "vuedraggable",
        layout: true,
        fieldOptions: {
          class: "layout " + (emiter.editing === field.uuid ? "editing" : ""),
          on: {
            input: value => {
              emiter.$emit("children-changed", { uuid: field.uuid, value });
            },
            add: value => {
              emiter.$emit("children-add", { uuid: field.uuid, value });
            },
            remove: value => {
              emiter.$emit("children-remove", { uuid: field.uuid, value });
            },
            update: value => {
              emiter.$emit("children-update", { uuid: field.uuid, value });
            }
          },
          attrs: {
            group: "jdesign",
            draggable: ".design-element"
          },
          props: {
            value: [...(field.children || [])]
          }
        },
        children: [
          ...(field.children || []),
          // 必须用4个绝对定位的边框，因为要把可拖动区域避开
          ...["top", "left", "bottom", "right"].map(item => ({
            component: "div",
            layout: true,
            fieldOptions: {
              class: "border-layout border-" + item
            }
          })),
          {
            component: "p",
            layout: true,
            fieldOptions: {
              class: "empty",
              slot: "footer",
              domProps: {
                innerText: remark ? `${component}.${remark}` : component
              }
            }
          }
        ]
      }
    ];
  };
}
