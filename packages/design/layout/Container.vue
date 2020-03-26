<template>
  <el-container class="v-jdesign">
    <v-jcomponents></v-jcomponents>
    <v-jmain></v-jmain>
    <v-jproperties></v-jproperties>
  </el-container>
</template>

<script>
import store from "../store";
import Components from "./Components.vue";
import Main from "./Main.vue";
import Properties from "./Properties.vue";
import { mapState } from "vuex";

export default {
  name: "vJdesign",
  store,
  props: {
    value: Object,
    components: Object
  },
  components: {
    "v-jcomponents": Components,
    "v-jmain": Main,
    "v-jproperties": Properties
  },
  computed: mapState({
    form: state => state.form
  }),
  watch: {
    form: {
      handler(value) {
        const result = {};
        ["fields", "datasource", "inits", "watchs", "schema"].forEach(key => {
          result[key] = value[key];
        });
        this.$emit("input", result);
      },
      deep: true
    }
  },
  created() {
    this.$store.commit("components/UPDATE", this.components || {});
    this.$store.commit("form/CREATEED", this.value);
  }
};
</script>
