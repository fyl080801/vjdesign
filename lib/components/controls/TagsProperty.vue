<template>
  <div class="input-group">
    <div class="input-group-prepend">
      <label class="input-group-text">数组</label>
    </div>
    <input
      class="form-control"
      placeholder="输入项用逗号分割"
      :value="innerValue"
      @change="onValueChange"
    />
  </div>
</template>

<script>
export default {
  name: 'v-jd-tags',
  props: {
    value: Array
  },
  computed: {
    innerValue() {
      return (this.value || []).join(',')
    }
  },
  methods: {
    onValueChange(evt) {
      if (!evt.target.value || evt.target.value.trim() === '') {
        this.$emit('input', [])
        return
      }

      const inputs = evt.target.value.split(',')
      const isNumber =
        inputs.filter(item => /^([-+]?[0-9])+(\.[0-9]+)?$/g.test(item.trim()))
          .length === inputs.length

      this.$emit(
        'input',
        inputs.map(item => (isNumber ? +item.trim() : item))
      )
    }
  }
}
</script>
