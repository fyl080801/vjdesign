import emiter from "../utils/emiter";
import { getComponents } from "../designer";

const layouts = getComponents()
  .filter(item => item.container)
  .map(item => item.tag);

export default function(field, options) {
  const { component, layout } = field;

  if (!options.dev || layouts.indexOf(component) < 0 || layout) {
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
          value: clonedChildren
        }
      },
      children: clonedChildren
    }
  ];
}
