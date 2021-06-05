const Vue = window.Vue

const questionMixins = {
  props: {
    label: String,
    prop: String,
    required: Boolean,
    requireMessage: String
  },
  data() {
    return {
      parentModel: {}
    }
  },
  computed: {
    baseRules() {
      return [{ required: this.required, message: this.requireMessage }]
    }
  },
  methods: {
    onInput(value) {
      this.$set(this.parentModel, this.prop, value)
    },
    resolveParentModel() {
      let cacheParent = this.$parent
      while (cacheParent && cacheParent.$options.componentName !== 'ElForm') {
        cacheParent = cacheParent.$parent
      }
      this.parentModel = cacheParent.model
    }
  },
  mounted() {
    this.resolveParentModel()
  }
}

Vue.component('c-form', {
  template: `<el-form ref="form" :model="model" label-position="top">
  <h1>{{title}}</h1>
  <slot></slot>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">提交</el-button>
  </el-form-item>
</el-form>`,
  props: {
    title: { type: String, default: '问卷调查' }
  },
  data() {
    return { model: {} }
  },
  methods: {
    onSubmit() {
      this.$refs.form
        .validate()
        .then(() => {
          alert(JSON.stringify(this.model))
        })
        .catch(() => {})
    }
  }
})

Vue.component('c-question-input', {
  template: `<el-form-item :label="label" :rules="[...baseRules]" :prop="prop">
  <h2 slot="label" style="display: inline-block">{{label}}</h2>
  <el-input :value="parentModel[prop]" @input="onInput"></el-input>
</el-form-item>`,
  mixins: [questionMixins]
})

Vue.component('c-question-single', {
  template: `<el-form-item :label="label" :rules="[...baseRules]" :prop="prop">
  <h2 slot="label" style="display: inline-block">{{label}}</h2>
  <el-radio-group :value="parentModel[prop]" @input="onInput">
    <el-radio :key="index" :label="item.label" v-for="(item, index) in options">{{item.label}}</el-radio>
  </el-radio-group>
</el-form-item>`,
  mixins: [questionMixins],
  props: {
    options: Array
  }
})

Vue.component('c-question-multiple', {
  template: `<el-form-item :label="label" :rules="[...baseRules]" :prop="prop">
  <h2 slot="label" style="display: inline-block">{{label}}</h2>
  <el-checkbox-group :value="parentModel[prop] || []" @input="onInput">
    <el-checkbox :key="index" :label="item.label" v-for="(item, index) in options">
      {{item.label}}
    </el-checkbox>
  </el-checkbox-group>
</el-form-item>`,
  mixins: [questionMixins],
  props: {
    options: Array
  }
})
