import Vue from 'vue'
import { mapState } from 'vuex'
import { assemblyEditorGroups, DEFAULTS } from '../../lib/feature/property'
import { getComponent } from '../../lib/feature/component'
import emiter from '../../utils/emiter'
import Datasource from '../Datasource'
import Listeners from '../Listeners'
import { Accordion, Card } from '../Accordion'
import { Fragment } from 'vue-fragment'
import SvgIcon from 'vue-svgicon'
import VJForm from 'vjform'

export default Vue.extend({
  components: { Datasource, Listeners },
  data() {
    return {
      active: 0,
      editorGroups: [],
      updating: null,
      groupNames: [],
      propNames: [],
      //
      showDatasource: false
    }
  },
  computed: {
    ...mapState({
      editing: ({ form }) => form.fieldMap[form.editing]
    })
  },
  watch: {
    editing(value) {
      if (!value) {
        this.editorGroups = []
        return
      }

      const component = getComponent(value.component)
      const groups = assemblyEditorGroups(component.properties, DEFAULTS)

      this.editorGroups = Object.keys(groups)
        .filter(key => groups[key].length > 0)
        .map(key => {
          const fields = groups[key]
          const components = {}
          fields.forEach(field => {
            if (field.instance) {
              components[field.instance.name] = field.instance
            }
          })
          return { key, fields, components }
        })
      this.groupNames = Object.keys(groups)
    },
    updating(value) {
      if (value === null) {
        return
      }

      this.$nextTick(() => {
        this.$store.commit('form/UPDATE_EDITING', value)
        this.updating = null
      })
    }
  },
  methods: {
    updateEditing(value) {
      this.updating = value
    },
    refreshEditing() {
      this.$store.commit('form/REFRESH_EDITING')
    },
    toggleActive(index) {
      this.active = index
    }
  },
  created() {
    emiter.$on('component-selected', field => {
      this.$store.commit('form/SELECT_EDITING', field)
    })

    emiter.$on('component-delete', field => {
      this.$store.commit('form/DELETE_FIELD', field)
    })
  },
  destroyed() {
    emiter.$off('component-selected')
    emiter.$off('component-delete')
  },
  render() {
    return (
      <div class="v-jd-aside right">
        <ul class="nav nav-tabs v-jd-tabs" role="tablist">
          <li class="nav-item v-jd-tabitem" role="presentation" style="width: 50%">
            <a
              class={`nav-link v-jd-link ${this.active === 0 ? 'active' : ''}`}
              role="tab"
              href="javascript:;"
              onClick={() => this.toggleActive(0)}
            >
              组件属性
            </a>
          </li>
          <li class="nav-item v-jd-tabitem" role="presentation" style="width: 50%">
            <a
              class={`nav-link v-jd-link ${this.active === 1 ? 'active' : ''}`}
              role="tab"
              href="javascript:;"
              onClick={() => this.toggleActive(1)}
            >
              页面属性
            </a>
          </li>
        </ul>
        <div class="tab-content v-jd-tabcontent">
          {this.active === 0 ? (
            <div class="tab-pane fade show active" role="tabpanel">
              {this.editing ? (
                <Accordion v-model={this.groupNames}>
                  {this.editorGroups.map(group => (
                    <Card key={group.key} name={group.key}>
                      <Fragment slot="title">
                        <i>
                          <SvgIcon class="v-jd-svgicon" name="tools" />
                        </i>
                        {group.key}
                      </Fragment>
                      <form class="v-jd-propform">
                        <VJForm
                          class="v-jd-property"
                          value={this.editing}
                          fields={group.fields}
                          onInput={this.updateEditing}
                          onClear={this.refreshEditing}
                          components={{ ...group.components }}
                        />
                      </form>
                    </Card>
                  ))}
                </Accordion>
              ) : (
                <p>请选择组件</p>
              )}
            </div>
          ) : null}
          {this.active === 1 ? (
            <div class="tab-pane fade show active" role="tabpanel">
              <Accordion v-model={this.propNames}>
                <datasource></datasource>
                <listeners></listeners>
              </Accordion>
            </div>
          ) : null}
        </div>
        {/* <Tabs type="border-card" class="max-aside">
          <TabPane label="组件属性">
            {this.editing ? (
              <Collapse
                v-model={this.groupNames}
                class="components"
                key={this.editing.uuid}
              >
                {this.editorGroups.map((group, index) => (
                  <CollapseItem key={index} name={group.key}>
                    <div slot="title">
                      <i class="el-icon-s-operation"></i>
                      {group.key}
                    </div>
                    <Form size="mini" label-position="top">
                      <VJForm
                        class="vjdesign-property"
                        fields={group.fields}
                        value={this.editing}
                        onInput={this.updateEditing}
                        onClear={this.refreshEditing}
                        components={{
                          ...group.components,
                          "el-form-item": FormItem,
                          "el-input": Input,
                          "el-checkbox": Checkbox,
                          "el-select": Select,
                          "el-option": Option,
                          "el-button": Button,
                          "el-popconfirm": Popconfirm
                        }}
                      ></VJForm>
                    </Form>
                  </CollapseItem>
                ))}
              </Collapse>
            ) : null}
          </TabPane>
          <TabPane label="页面属性">
            <Collapse v-model={this.propNames} class="components">
              
            </Collapse>
          </TabPane>
        </Tabs> */}
      </div>
    )
  }
})
