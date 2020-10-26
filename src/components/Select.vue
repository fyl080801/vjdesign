<template>
  <el-select :value="value" @input="onInput">
    <el-option
      :value="item[valueProp]"
      :key="index"
      :label="item[labelProp]"
      v-for="(item, index) in items"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'c-select',
  props: {
    value: [Object, Number, String],
    items: { type: Array, default: () => [] },
    valueProp: { type: String, default: 'value' },
    labelProp: { type: String, default: 'label' }
  },
  methods: {
    onInput(value) {
      this.$emit('input', value)
    }
  }
}
</script>
