import emiter from "../utils/emiter";

const layouts = ["div", "p", "h1"];

export default function(field) {
  const { component, layout } = field;

  if (layouts.indexOf(component) < 0 || layout) {
    return;
  }

  const clonedChildren = [...(field.children || [])];

  field.children = [
    {
      component: "vuedraggable",
      layout: true,
      fieldOptions: {
        class: "layout-component",
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
          group: "jdesign"
        },
        props: {
          tag: "div",
          value: clonedChildren
        }
      },
      children: clonedChildren
    }
  ];
}
