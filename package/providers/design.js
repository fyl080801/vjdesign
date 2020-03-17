import emiter from "../utils/emiter";
import { getComponents } from "../designer";

let natives = null;

export default function(field, options) {
  natives =
    natives ||
    getComponents()
      .filter(item => item.base !== false)
      .map(item => item.tag);

  if (!options.dev || field.layout) {
    return;
  }

  const cloned = { layout: true, ...field };

  Object.keys(field).forEach(key => {
    delete field[key];
  });

  field.component = "div";
  field.layout = true;
  field.fieldOptions = {
    class: "design-element " + (emiter.editing === cloned.uuid ? "editing" : "")
  };
  field.children = [
    {
      component: "div",
      layout: true,
      fieldOptions: {
        class: "border border-top"
      }
    },
    {
      component: "div",
      layout: true,
      fieldOptions: {
        class: "border border-left"
      }
    },
    {
      component: "div",
      layout: true,
      fieldOptions: {
        class: "border border-bottom"
      }
    },
    {
      component: "div",
      layout: true,
      fieldOptions: {
        class: "border border-right"
      }
    },
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
    {
      component: "a",
      layout: true,
      fieldOptions: {
        class: "del",
        domProps: {
          innerText: "删除",
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
    },
    cloned
  ];

  const onEvent = natives.indexOf(field.component) >= 0 ? "on" : "nativeOn";

  field.fieldOptions[onEvent] = field.fieldOptions[onEvent] || {};
  field.fieldOptions[onEvent].click = evt => {
    emiter.$emit("component-selected", cloned);
    emiter.setEditing(cloned.uuid);
    evt.stopPropagation();
  };
}
