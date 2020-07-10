import Vue from "vue";
import vuedraggable from "vuedraggable";
import "./index.scss";
import { Collapse, CollapseItem, Row, Col, Card } from "element-ui";

export default Vue.extend({
  components: { vuedraggable },
  props: {
    list: Array
  },
  data() {
    return {
      names: []
    };
  },
  watch: {
    list(value) {
      this.names = value.length > 0 ? [value[0].name] : [];
    }
  },
  render() {
    return (
      <Collapse v-model={this.names} class="components">
        {this.list.map((group, index) => (
          <CollapseItem key={index} name={group.name}>
            <div slot="title">
              <i class="el-icon-menu"></i>
              {group.name}
            </div>
            <Row>
              <vuedraggable
                tag="div"
                class="components-group"
                list={group.components}
                draggable=".drag-handler"
                group={{ name: "jdesign", pull: "clone", put: false }}
                sort={false}
              >
                {group.components.map((item, index) => (
                  <Col span={12} key={index} class="drag-handler">
                    <Card body-style={{ padding: "10px" }}>
                      <i class={item.icon ? item.icon : "el-icon-s-help"}></i>
                      {item.description}
                    </Card>
                  </Col>
                ))}
              </vuedraggable>
            </Row>
          </CollapseItem>
        ))}
      </Collapse>
    );
  }
});
