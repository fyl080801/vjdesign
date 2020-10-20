<template>
  <div class="design">
    <vuedraggable
      v-if="!form.value.fields.length"
      tag="div"
      class="inner"
      :value="form.value.fields"
      @input="onRootUpdate"
      group="jdesign"
      draggable=".drag-handler"
    >
      <p class="root-text empty">拖组件到此</p>
    </vuedraggable>
    <v-jform
      v-else
      v-model="form.model"
      class="inner"
      :components="edit.components"
      :fields="fields"
      :listeners="form.value.listeners"
      :datasource="form.value.datasource"
      :initialling="onInitialling"
      :options="options"
    ></v-jform>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import vjform from 'vjform'
import vuedraggable from 'vuedraggable'
import designer from '../../internal/providers/designer'

export default {
  components: { [vjform.name]: vjform, vuedraggable },
  computed: {
    ...mapGetters(['form', 'edit', 'options']),
    fields() {
      return this.form.value.fields
      // return [
      //   {
      //     component: 'vuedraggable',
      //     fieldOptions: {
      //       class: 'designed',
      //       props: { group: 'jdesign', draggable: '.drag-handler' }
      //     },
      //     children: [
      //       ...this.form.value.fields,
      //       {
      //         component: 'p',
      //         text: 'root',
      //         fieldOptions: { class: 'root-text designed' }
      //       }
      //     ]
      //   }
      // ]
    }
  },
  methods: {
    onInitialling({ provider }) {
      provider(designer).withIndex(1000)
    },
    onRootUpdate(value) {
      this.$store.dispatch('form/updateRoot', value)
    }
  }
}
</script>

<style lang="scss">
.v-jdesign {
  .design {
    flex: 1;
    overflow: auto;
    padding: 0.75rem 1.25rem;

    .inner {
      border: 1px dashed #dcdfe6;
      cursor: pointer;
    }

    .root-text {
      text-align: center;
      color: #c0c4cc;
      padding: 0.75rem 1.25rem;
      margin: 0;

      &.empty {
        padding: 4rem 2rem;
      }
    }
  }
}
</style>
