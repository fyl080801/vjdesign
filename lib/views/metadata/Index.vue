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
        <button key="btn_submit" class="btn btn-light" @click="onSubmit">
          <SvgIcon name="check"></SvgIcon>
          确定
        </button>
        <button key="btn_cancel" class="btn btn-light" @click="onCancel">
          <SvgIcon name="times"></SvgIcon>
          取消
        </button>
      </div>
      <div v-else class="form-inline">
        <button key="btn_edit" class="btn btn-light" @click="onEdit">
          <SvgIcon name="edit"></SvgIcon>
          编辑
        </button>
      </div>
    </div>
    <div class="code-wrapper">
      <textarea ref="source"></textarea>
    </div>
  </div>
</template>

<script>
import { CodeMirror } from '../../utils/code'
import { mapGetters } from 'vuex'
import SvgIcon from '../../icons'

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
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    > .navbar {
      border-bottom: 1px solid #dcdfe6;
    }

    > .code-wrapper {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 50px;
      display: flex;
      /* width: 100%; */
      flex-direction: column;

      > .CodeMirror {
        flex: 1;
      }
    }
  }
}
</style>
