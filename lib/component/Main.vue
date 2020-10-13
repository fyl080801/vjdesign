<template>
  <div class="v-jdesign">
    <ul class="feature">
      <a @click="change('fields')">
        <li :class="{ active: current === 'fields' }">设计</li>
      </a>
      <a @click="change('datasource')">
        <li :class="{ active: current === 'datasource' }">数据源</li>
      </a>
      <a @click="change('listeners')">
        <li :class="{ active: current === 'listeners' }">监听</li>
      </a>
    </ul>
    <div class="content">
      <Fields v-if="current === 'fields'"></Fields>
      <Datasource v-if="current === 'datasource'"></Datasource>
      <Listeners v-if="current === 'listeners'"></Listeners>
    </div>
  </div>
</template>

<script>
import store from '../store'
import Fields from './fields/Index'
import Datasource from './datasource/Index'
import Listeners from './listeners/Index'

export default {
  name: 'v-jdesign',
  store,
  props: {
    value: Object,
    components: Object
  },
  components: {
    Fields,
    Datasource,
    Listeners
  },
  data() {
    return {
      current: 'fields'
    }
  },
  methods: {
    change(value) {
      this.current = value
    }
  },
  created() {
    this.$store.dispatch('components/init', this.components || {})
    this.$store.dispatch('form/init', this.value)
  }
}
</script>

<style scoped>
.v-jdesign {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  font-size: 14px;
  height: 100%;
  width: 100%;
  display: flex;
}

.v-jdesign > ul.feature {
  background-color: rgb(48, 65, 86);
  list-style: none;
  margin: 0;
  padding: 0;
  color: rgb(191, 203, 217);
}

.v-jdesign > ul.feature a {
  cursor: pointer;
}

.v-jdesign > ul.feature li {
  line-height: 56px;
  padding: 0 15px;
  text-align: center;
}

.v-jdesign > ul.feature li.active {
  color: rgb(64, 158, 255);
  background-color: #263445;
}

.v-jdesign > .content {
  flex: 1;
  display: flex;
}
</style>
