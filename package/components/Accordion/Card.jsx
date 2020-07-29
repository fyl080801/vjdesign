import Vue from "vue";

export default Vue.extend({
  props: {
    name: String,
    title: String
  },
  methods: {
    toggleShown() {
      this.$parent.onItemToggle(this.name);
    }
  },
  render() {
    return (
      <div class="card item">
        <a
          href="javascript:;"
          class="card-header header"
          onClick={() => this.toggleShown()}
        >
          {this.$slots.title ? this.$slots.title : this.title}
          <i>
            <svg-icon
              name={
                this.$parent.value.includes(this.name)
                  ? "chevron-down"
                  : "chevron-right"
              }
            />
          </i>
        </a>
        <div
          class={{
            collapse: true,
            show: this.$parent.value.includes(this.name)
          }}
        >
          <div class="card-body body">{this.$slots.default}</div>
        </div>
      </div>
    );
  }
});
