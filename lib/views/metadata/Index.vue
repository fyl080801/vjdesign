<template>
  <div class="metadata">
    <div class="navbar navbar-light bg-light">
      <div class="form-inline">
        <button v-if="editing" class="btn btn-light" @click="onFormat">
          <SvgIcon name="stream"></SvgIcon>
          格式
        </button>
      </div>

      <div v-if="editing" class="form-inline">
        <button class="btn btn-light" @click="onSubmit">
          <SvgIcon name="check"></SvgIcon>
          提交
        </button>
        <button class="btn btn-light" @click="onCancel">
          <SvgIcon name="times"></SvgIcon>
          取消
        </button>
      </div>
      <div v-else>
        <button class="btn btn-light" @click="onEdit">
          <SvgIcon name="edit"></SvgIcon>
          编辑
        </button>
      </div>
    </div>
    <textarea ref="source"></textarea>
  </div>
</template>

<script>
import { CodeMirror } from '../../utils/code'
import { mapGetters } from 'vuex'
import SvgIcon from 'vue-svgicon'

export default {
  components: { SvgIcon },
  data() {
    return {
      code: '',
      instance: null,
      editing: false,
      options: {
        readOnly: true,
        theme: 'default',
        lineNumbers: true,
        mode: 'application/json',
        gutters: ['CodeMirror-lint-markers'],
        lint: true
      }
    }
  },
  computed: {
    ...mapGetters(['form'])
  },
  methods: {
    // 初始化
    initialize() {
      this.code = JSON.stringify(this.form.value)
      this.instance = CodeMirror.fromTextArea(this.$refs.source, this.options)
      this.instance.setValue(this.code)
      this.instance.formatAll()
      this.instance.on('change', this.onChange)
    },
    disponse() {
      this.instance.off('change', this.onChange)
      this.instance = null
    },
    onChange(code) {
      this.code = code.getValue()
    },
    onFormat() {
      this.instance.formatAll()
    },
    onSubmit() {
      this.editing = false
      this.$store.dispatch('form/init', JSON.parse(this.code))
      this.instance.setOption('readOnly', true)
      this.instance.formatAll()
    },
    onEdit() {
      this.editing = true
      this.instance.setOption('readOnly', false)
    },
    onCancel() {
      this.editing = false
      this.instance.setOption('readOnly', true)
      this.code = JSON.stringify(this.form.value)
      this.instance.setValue(this.code)
      this.instance.formatAll()
    }
  },
  mounted() {
    this.initialize()
  },
  beforeDestroy() {
    this.disponse()
  }
}
</script>

<style lang="scss">
.v-jdesign {
  .metadata {
    flex: 1;
    display: flex;
    flex-direction: column;

    > .navbar {
      border-bottom: 1px solid #dcdfe6;
    }

    > .CodeMirror {
      flex: 1;
    }
  }
}
</style>
