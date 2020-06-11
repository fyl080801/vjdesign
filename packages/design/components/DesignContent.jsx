import Vue from "vue";
import { mapState } from "vuex";
import emiter from "../utils/emiter";
import vuedraggable from "vuedraggable";
import "./DesignContent.css";

export default Vue.extend({
  components: { vuedraggable },
  computed: mapState({
    fields: state => state.form.fields,
    watchs: state => state.form.watchs,
    datasource: state => state.form.datasource,
    schema: state => state.form.schema,
    inits: state => state.form.inits,
    designComponents: state => ({ ...state.components, ...{ vuedraggable } }),
    designFields() {
      return [
        {
          component: "vuedraggable",
          layout: true,
          fieldOptions: {
            class: "layout root",
            on: {
              // 回头加上对root的节点操作
              // input: value => {
              //   emiter.$emit("children-changed", { value });
              // },
              // add: value => {
              //   // this.$store.commit("form/ADD_ROOT", value);
              // },
              // remove: value => {
              //   emiter.$emit("children-remove", { value });
              // },
              // update: value => {
              //   emiter.$emit("children-update", { value });
              // }
            },
            attrs: {
              group: "jdesign",
              draggable: ".design-element"
            }
          },
          children: [
            ...this.fields,
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
                domProps: {
                  innerText: "root"
                }
              }
            }
          ]
        }
      ];
    }
  }),
  data() {
    return {
      model: {},
      options: { mode: "design" },
      changes: []
    };
  },
  methods: {
    emitter(value) {
      this.$store.commit("form/ADD_ROOT", value);
    }
  },
  watch: {
    changes(value) {
      if (value.length <= 0) {
        return;
      }

      this.$store.commit("form/FIELD_CHILDREN_CHANGED", value);
      this.changes = [];
    }
  },
  created() {
    emiter.$on("children-changed", value => {
      this.changes.push(value);
    });
  },
  render() {
    return (
      <div class="design-content">
        <vuedraggable
          tag="div"
          v-show={!this.fields.length}
          class="empty-text"
          value={this.fields}
          onInput={this.emitter}
          group="jdesign"
          draggable=".design-element"
        >
          <p>拖组件到此</p>
        </vuedraggable>
        <vjform
          v-show={this.fields.length}
          fields={this.designFields}
          watchs={this.watchs}
          datasource={this.datasource}
          schema={this.schema}
          inits={this.inits}
          components={this.designComponents}
          options={this.options}
        ></vjform>
      </div>
    );
  }
});
