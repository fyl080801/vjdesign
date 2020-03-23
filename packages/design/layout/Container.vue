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

export default {
  name: "vJdesign",
  store,
  components: {
    "v-jcomponents": Components,
    "v-jmain": Main,
    "v-jproperties": Properties
  }
};
</script>
