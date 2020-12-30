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
    <StackModals :modals="popup.modals"></StackModals>
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
import SvgIcon from '../icons'
import { mapGetters } from 'vuex'
import { StackModals } from '../components/modal'
import vjform from 'vjform'

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
    Metadata,
    [vjform.name]: vjform,
    StackModals
  },
  data() {
    return {
      current: 'fields',
      modalUpdating: false
    }
  },
  computed: { ...mapGetters(['popup', 'form', 'edit']) },
  watch: {
    ['form.value.fields'](value) {
      this.value.fields = value
    },
    ['form.value.datasource'](value) {
      this.value.datasource = value
    },
    ['form.value.listeners'](value) {
      this.value.listeners = value
    },
    ['form.value.model'](value) {
      this.value.model = value
    },
    value(value) {
      this.$store.dispatch('form/init', value)
    },
    profile(value) {
      this.$store.dispatch('profile/init', value)
    },
    components(value) {
      this.$store.dispatch('edit/init', {
        components: value || {},
        registry: createRegistry(commonRegistry.map).build()
      })
    }
  },
  methods: {
    change(value) {
      this.current = value
    }
  },
  created() {
    this.$store.dispatch('edit/init', {
      components: this.components || {},
      registry: createRegistry(commonRegistry.map).build()
    })
    this.$store.dispatch('profile/init', this.profile)
    this.$store.dispatch('form/init', this.value)
  }
}
</script>

<style lang="scss">
.v-jdesign {
  > ul {
    &.v-jd-feature {
      background-color: rgb(48, 65, 86);
      list-style: none;
      margin: 0;
      padding: 0;
      color: rgb(191, 203, 217);
      overflow: hidden;

      a {
        cursor: pointer;
      }

      li {
        padding: 0.375rem 0.75rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        height: 4.35rem;

        &.active {
          color: rgb(64, 158, 255);
          background-color: #263445;
        }
      }
    }
  }

  > .content {
    flex: 1;
    display: flex;
    position: relative;
  }
}
</style>
