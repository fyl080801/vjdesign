<template>
  <div class="design-content">
    <vuedraggable
      tag="div"
      v-show="!fields.length"
      class="empty-text"
      :value="fields"
      @input="emitter"
      group="jdesign"
      draggable=".design-element"
    >
      <p>拖组件到此</p>
    </vuedraggable>
    <vjform
      v-show="fields.length"
      :fields="fields"
      :watchs="watchs"
      :datasource="datasource"
      :schema="schema"
      :inits="inits"
      :components="designComponents"
      :options="options"
    ></vjform>
  </div>
</template>

<script>
import { mapState } from "vuex";
import emiter from "../utils/emiter";
import vuedraggable from "vuedraggable";

export default {
  name: "design-content",
  components: { vuedraggable },
  computed: mapState({
    fields: state => state.form.fields,
    watchs: state => state.form.watchs,
    datasource: state => state.form.datasource,
    schema: state => state.form.schema,
    inits: state => state.form.inits
  }),
  data() {
    return {
      model: {},
      options: { dev: true },
      designComponents: { vuedraggable },
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
  }
};
</script>

<style>
.design-content {
  min-height: 250px;
  border: 1px;
  border-style: dashed;
  border-color: silver;
}

.empty-text {
  color: silver;
  height: 250px;
  position: relative;
}

.empty-text p {
  text-align: center;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
</style>
