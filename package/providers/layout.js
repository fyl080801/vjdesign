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
        domProps: { innerText: "添加组件" }
      }
    }
  ];
  // !field.children || field.children.length <= 0
  //   ? [
  //       {
  //         component: "p",
  //         layout: true,
  //         fieldOptions: {
  //           class: "empty",
  //           domProps: { innerText: "添加组件" }
  //         }
  //       }
  //     ]
  //   : [];
  const childrenValue = [...(field.children || [])];
  const children = [].concat(field.children || []).concat(empty);

  field.layout = true;
  field.children = [
    {
      component: "vuedraggable",
      layout: true,
      fieldOptions: {
        class: "layout",
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
