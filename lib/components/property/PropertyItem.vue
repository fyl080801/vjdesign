<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <slot></slot>
    <small class="form-text text-muted">
      <slot name="description"></slot>
    </small>
  </div>
</template>

<script>
export default {
  name: 'v-jd-property-item',
  props: {
    label: String
  }
}
</script>
