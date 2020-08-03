import Vue from "vue";
import { mapState } from "vuex";
import emiter from "../../utils/emiter";
import vuedraggable from "vuedraggable";
import VJForm from "vjform";
// import { Popconfirm } from "element-ui";
// import "./index.scss";

export default Vue.extend({
  components: { vuedraggable },
  computed: mapState({
    fields: state => state.form.value.fields,
    listeners: state => state.form.value.listeners,
    datasource: state => state.form.value.datasource,
    schema: state => state.form.value.schema,
    designComponents: state => ({
      ...state.components,
      ...{ vuedraggable }
    }),
    designFields() {
      return [
        {
          component: "vuedraggable",
          layout: true,
          fieldOptions: {
            class: "v-jd-layout root",
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
              draggable: ".v-jd-design"
            }
          },
          children: [
            ...this.fields,
            ...["top", "left", "bottom", "right"].map(item => ({
              component: "div",
              layout: true,
              fieldOptions: {
                class: "v-jd-border-layout v-jd-border-" + item
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
      options: { mode: "design", sss: true },
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
          draggable=".v-jd-design"
        >
          <p>拖组件到此</p>
        </vuedraggable>
        <VJForm
          v-show={this.fields.length}
          fields={this.designFields}
          listeners={this.listeners}
          datasource={this.datasource}
          schema={this.schema}
          components={this.designComponents}
          options={this.options}
        ></VJForm>
      </div>
    );
  }
});
