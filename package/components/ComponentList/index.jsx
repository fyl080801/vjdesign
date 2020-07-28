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
          <div class="card item" key={index}>
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
                  {group.components.map((item, index) => (
                    <a
                      key={index}
                      href="javascript:;"
                      class="drag-handler col-6"
                    >
                      {item.description}
                    </a>
                    // <div >

                    //   {/* <Card body-style={{ padding: "10px" }}>
                    //       <i
                    //         class={item.icon ? item.icon : "el-icon-s-help"}
                    //       ></i>
                    //       {item.description}
                    //     </Card> */}
                    // </div>
                    // <Col span={12} key={index} class="drag-handler">
                    //   <Card body-style={{ padding: "10px" }}>
                    //     <i
                    //       class={item.icon ? item.icon : "el-icon-s-help"}
                    //     ></i>
                    //     {item.description}
                    //   </Card>
                    // </Col>
                  ))}
                </vuedraggable>
              </div>
              {/* <div class="card-body body">
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                non cupidatat skateboard dolor brunch. Food truck quinoa
                nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                put a bird on it squid single-origin coffee nulla assumenda
                shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                wes anderson cred nesciunt sapiente ea proident. Ad vegan
                excepteur butcher vice lomo. Leggings occaecat craft beer
                farm-to-table, raw denim aesthetic synth nesciunt you probably
                haven't heard of them accusamus labore sustainable VHS.
              </div> */}
            </div>
          </div>
        ))}
      </div>
    );
    // return (
    //   <Collapse v-model={this.names} class="components">
    //     {this.list.map((group, index) => (
    //       <CollapseItem key={index} name={group.name}>
    //         <div slot="title">
    //           <i class="el-icon-menu"></i>
    //           {group.name}
    //         </div>
    //         <Row>
    // <vuedraggable
    //   tag="div"
    //   class="components-group"
    //   list={group.components}
    //   draggable=".drag-handler"
    //   group={{ name: "jdesign", pull: "clone", put: false }}
    //   sort={false}
    // >

    //           </vuedraggable>
    //         </Row>
    //       </CollapseItem>
    //     ))}
    //   </Collapse>
    // );
  }
});
