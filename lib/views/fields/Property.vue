<template>
  <div :class="{ property: true, side: true, 'no-select': !propForm }">
    <Collapse v-if="propForm" v-model="actives">
      <CollapseItem
        :name="key"
        :key="key"
        v-for="key in Object.keys(propForm)"
        :title="key"
      >
        <v-jform
          tag="form"
          class="property-form"
          :components="edit.components"
          :fields="propForm[key]"
          v-model="form.map[form.editing]"
        ></v-jform>
      </CollapseItem>
    </Collapse>
    <p v-else class="empty">请选择组件</p>
  </div>
</template>

<script>
import { resolveForm } from '../../utils/property'
import { Collapse, CollapseItem } from '../../components/collapse'
import vjform from 'vjform'
import { mapGetters } from 'vuex'

export default {
  components: { Collapse, CollapseItem, [vjform.name]: vjform },
  data() {
    return {
      actives: []
    }
  },
  computed: {
    ...mapGetters(['profile', 'form', 'edit']),
    component() {
      return this.form.map[this.form.editing]
        ? this.profile.components[this.form.map[this.form.editing].component]
        : null
    },
    propForm() {
      return this.form.editing
        ? resolveForm(
            this.component.properties,
            this.form.map[this.form.editing]
          )(this.edit.registry.editor).reduce((prev, cur) => {
            prev[cur.fieldOptions.attrs.group] =
              prev[cur.fieldOptions.attrs.group] || []

            prev[cur.fieldOptions.attrs.group].push(cur)

            return prev
          }, {})
        : null
    }
  },
  watch: {
    ['form.editing'](value) {
      this.actives = value ? Object.keys(this.propForm) : []
    }
  },
  mounted() {
    this.actives = this.form.editing ? Object.keys(this.propForm) : []
  }
}
</script>

<style lang="scss" scoped>
.property {
  width: 300px;
  border-left: 1px solid #dcdfe6;

  .property-form {
    padding: 0.75rem 1.25rem;
  }

  > .empty {
    text-align: center;
    color: #c0c4cc;
  }

  &.no-select {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
