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
      :initialling="onInitialling"
      :options="options"
    ></v-jform>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import vjform from 'vjform'
import vuedraggable from 'vuedraggable'
import { designProvider } from '../../internal/providers/designer'
import {
  saveComponentCache,
  getComponentCache
} from '../../internal/providers/condition'

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
      provider(designProvider).withIndex(-Number.MAX_SAFE_INTEGER + 1)

      provider(saveComponentCache).withIndex(-Number.MAX_SAFE_INTEGER)
      provider(getComponentCache)
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
      clear: both;

      &.empty {
        padding: 4rem 2rem;
      }
    }
  }
}
</style>
