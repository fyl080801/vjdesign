<template>
  <div class="property side">
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
          :components="components"
          :fields="propForm[key]"
          v-model="editing"
        ></v-jform>
      </CollapseItem>
    </Collapse>
  </div>
</template>

<script>
import { resolveForm } from '../../utils/property'
import { Collapse, CollapseItem } from '../../components/collapse'
import { PropertyItem } from '../../components/property'
import vjform from 'vjform'
import SvgIcon from 'vue-svgicon'
import { mapGetters } from 'vuex'

export default {
  components: { Collapse, CollapseItem, [vjform.name]: vjform },
  data() {
    return {
      components: { [PropertyItem.name]: PropertyItem, SvgIcon },
      actives: [],
      propForm: null
    }
  },
  computed: {
    ...mapGetters(['profile', 'form', 'edit']),
    editing() {
      return this.form.map[this.form.editing]
    },
    component() {
      return this.form.map[this.form.editing]
        ? this.profile.components.find(
            item => item.name === this.form.map[this.form.editing].component
          )
        : null
    }
  },
  watch: {
    ['form.editing'](value) {
      if (value) {
        this.propForm = resolveForm([
          'remark',
          'condition',
          'fieldOptions.slot',
          'fieldOptions.class',
          'fieldOptions.style',
          ...this.component.properties
        ])(this.profile.properties, this.edit.registry.editor)
        this.actives = Object.keys(this.propForm)
      } else {
        this.propForm = null
        this.actives = []
      }
    }
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
}
</style>
