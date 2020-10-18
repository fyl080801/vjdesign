<template>
  <div class="design">
    <vuedraggable
      tag="div"
      class="inner"
      :value="form.fields"
      @input="onFieldsUpdate"
      group="jdesign"
      draggable=".drag-handler"
    >
      <v-jform
        v-if="form.fields.length > 0"
        v-model="edit.model"
        :components="edit.components"
        :fields="form.fields"
        :listeners="form.listeners"
        :datasource="form.datasource"
        :initialling="onInitialling"
        :options="options"
      ></v-jform>
      <p :class="{ 'root-text': true, empty: !form.fields.length }">
        {{ !form.fields.length ? '拖组件到此' : 'root' }}
      </p>
    </vuedraggable>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import vjform from 'vjform/lib'
import vuedraggable from 'vuedraggable'
import designer from '../../internal/providers/designer'

export default {
  components: { [vjform.name]: vjform, vuedraggable },
  computed: { ...mapGetters(['form', 'edit', 'options']) },
  methods: {
    onInitialling({ provider }) {
      provider(designer)
    },
    onFieldsUpdate(value) {
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
      border: 1px dashed #e4e7ed;
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
