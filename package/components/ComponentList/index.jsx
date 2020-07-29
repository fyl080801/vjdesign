import Vue from "vue";
import vuedraggable from "vuedraggable";
// import "./index.scss";
// import { Collapse, CollapseItem, Row, Col, Card } from "element-ui";

export default Vue.extend({
  components: { vuedraggable },
  props: {
    list: Array
  },
  data() {
    return {
      shown: []
    };
  },
  watch: {
    list(value) {
      this.names = value.length > 0 ? [value[0].name] : [];
    }
  },
  methods: {
    toggleShown(index) {
      const include = this.shown.findIndex(item => item === index);
      if (include >= 0) {
        this.shown.splice(include, 1);
      } else {
        this.shown.push(index);
      }
    }
  },
  render() {
    return (
      <div class="accordion v-jd-collapse">
        {this.list.map((group, index) => (
          <div class="card item">
            <a
              href="javascript:;"
              class="card-header header"
              onClick={() => this.toggleShown(index)}
            >
              <i>
                <svg-icon name="th-large" />
              </i>
              {group.name}
              <i>
                <svg-icon
                  name={
                    this.shown.includes(index)
                      ? "chevron-down"
                      : "chevron-right"
                  }
                />
              </i>
            </a>
            <div class={{ collapse: true, show: this.shown.includes(index) }}>
              <div class="card-body body">
                <vuedraggable
                  tag="div"
                  class="components-group row"
                  list={group.components}
                  draggable=".drag-handler"
                  group={{ name: "jdesign", pull: "clone", put: false }}
                  sort={false}
                >
                  {group.components.map(item => (
                    <a href="javascript:;" class="drag-handler col-6">
                      {item.description}
                    </a>
                  ))}
                </vuedraggable>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
});
