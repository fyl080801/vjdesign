<template>
  <div class="fields">
    <Toolbox></Toolbox>
    <Design></Design>
    <Property></Property>
  </div>
</template>

<script>
import Design from './Design'
import Toolbox from './Toolbox'
import Property from './Property'

export default {
  components: { Design, Toolbox, Property }
}
</script>

<style scoped>
.fields {
  flex: 1;
  display: flex;
}
</style>
