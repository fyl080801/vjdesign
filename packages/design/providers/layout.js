import emiter from "../utils/emiter";
import { getComponents } from "../designer";

let layouts = null;

export default function(field, options) {
  layouts = layouts
    ? layouts
    : getComponents()
        .filter(item => item.container)
        .map(item => item.tag);

  const { component, layout } = field;

  if (
    !options.dev ||
    layouts.indexOf(component) < 0 ||
    (layout && /border/g.test((field.fieldOptions || {}).class || "")) ||
    (layout &&
      ((field.fieldOptions || {}).class || "").indexOf("design-element") >= 0)
  ) {
    return;
  }

  const empty = [
    {
      component: "p",
      layout: true,
      fieldOptions: {
        class: "empty",
        domProps: {
          innerText: field.remark
            ? field.component + "." + field.remark
            : field.component
        }
      }
    }
  ];

  const childrenValue = [...(field.children || [])];

  const children = []
    .concat(field.children || [])
    // border必须排在表单元素后面
    .concat(
      ["top", "left", "bottom", "right"].map(item => ({
        component: "div",
        layout: true,
        fieldOptions: {
          class: "border-layout border-" + item
        }
      }))
    )
    .concat(empty);

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
          value: childrenValue
        }
      },
      children
    }
  ];
}
