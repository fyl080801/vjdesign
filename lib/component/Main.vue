<template>
  <div class="v-jdesign">
    <ul class="v-jd-feature">
      <a @click="change('fields')">
        <li :class="{ active: current === 'fields' }">
          <svg-icon name="object-group"></svg-icon>
          设计
        </li>
      </a>
      <a @click="change('datasource')">
        <li :class="{ active: current === 'datasource' }">
          <svg-icon name="database"></svg-icon>
          数据源
        </li>
      </a>
      <a @click="change('listeners')">
        <li :class="{ active: current === 'listeners' }">
          <svg-icon name="podcast"></svg-icon>
          监听
        </li>
      </a>
      <a @click="change('metadata')">
        <li :class="{ active: current === 'metadata' }">
          <svg-icon name="code"></svg-icon>
          元数据
        </li>
      </a>
    </ul>
    <div class="content">
      <Fields v-if="current === 'fields'"></Fields>
      <Datasource v-if="current === 'datasource'"></Datasource>
      <Listeners v-if="current === 'listeners'"></Listeners>
      <Metadata v-if="current === 'metadata'"></Metadata>
    </div>
  </div>
</template>

<script>
import { createRegistry } from '../registry'
import commonRegistry from '../utils/register'
import store from '../store'
import Fields from './fields/Index'
import Datasource from './datasource/Index'
import Listeners from './listeners/Index'
import Metadata from './metadata/Index'
import SvgIcon from 'vue-svgicon'
import '../icons/components'

export default {
  name: 'v-jdesign',
  store,
  props: {
    value: Object,
    components: Object,
    profile: Object
  },
  components: {
    SvgIcon,
    Fields,
    Datasource,
    Listeners,
    Metadata
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
    this.$store.dispatch('edit/init', {
      registry: createRegistry(commonRegistry.map).build()
    })
  }
}
</script>

<style>
.v-jdesign {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  font-size: 14px;
  height: 100%;
  width: 100%;
  display: flex;
}

.v-jdesign .svg-icon {
  width: 16px;
  height: 16px;
  color: inherit;
}

.v-jdesign .svg-icon.svg-fill {
  fill: currentColor;
  stroke: none;
}

.v-jdesign > ul.v-jd-feature {
  background-color: rgb(48, 65, 86);
  list-style: none;
  margin: 0;
  padding: 0;
  color: rgb(191, 203, 217);
}

.v-jdesign > ul.v-jd-feature a {
  cursor: pointer;
}

.v-jdesign > ul.v-jd-feature li {
  padding: 6px 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 48px;
}

.v-jdesign > ul.v-jd-feature li.active {
  color: rgb(64, 158, 255);
  background-color: #263445;
}

.v-jdesign > .content {
  flex: 1;
  display: flex;
}
</style>
