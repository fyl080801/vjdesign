<template>
  <fieldset>
    <legend>{{ title }}</legend>
    <template slot="default"></template>
  </fieldset>
</template>

<script>
export default {
  name: 'v-fieldset',
  props: { title: String }
}
</script>

<style></style>
