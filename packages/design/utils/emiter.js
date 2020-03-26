import Vue from "vue";

const emiter = new Vue({
  data() {
    return { editing: null };
  },
  methods: {
    setEditing(id) {
      this.editing = id;
    }
  }
});

export default emiter;
