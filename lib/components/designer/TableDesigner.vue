<template>
  <table class="design-table">
    <thead>
      <tr>
        <th></th>
        <th>+</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="index" v-for="(row, index) in rows">
        <td></td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td>+</td>
        <td></td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
export default {
  name: 'v-jd-table-designer',
  data() {
    return {
      rows: []
    }
  }
}
</script>

<style lang="scss" scoped>
.design-table {
  width: 100%;
}
</style>
