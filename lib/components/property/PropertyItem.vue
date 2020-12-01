<template>
  <div :class="{ 'form-group': true, transform: isTransform }">
    <label>{{ label }}</label>
    <div class="propterty-type" v-if="transform !== false">
      <a @click="onChangeType(false)" :class="!isTransform ? 'active' : ''">
        <span
          class="badge badge-pill"
          :class="!isTransform ? 'badge-primary' : ''"
          >值</span
        >
      </a>
      <a @click="onChangeType(true)" :class="isTransform ? 'active' : ''">
        <span
          class="badge badge-pill"
          :class="isTransform ? 'badge-primary' : ''"
          >转换</span
        >
      </a>
    </div>
    <div class="property-tail">
      <a href="javascript:;" v-if="hasValue" @click="onClear">清空</a>
    </div>
    <slot v-if="!isTransform"></slot>
    <div v-else-if="transform !== false">
      <div class="input-group">
        <div class="input-group-prepend">
          <label class="input-group-text">类型</label>
        </div>
        <select class="form-control" :value="type" @change="onChangePrefix">
          <option :key="item" :value="item" v-for="item in enablesTransform">
            {{ transformKeys[item] }}
          </option>
        </select>
      </div>
      <div class="input-group" v-if="type === '@'">
        <div class="input-group-prepend">
          <label class="input-group-text" :value="model">数据</label>
        </div>
        <input class="form-control" :value="model" @change="onChangeModel" />
      </div>
      <div class="input-group">
        <div class="input-group-prepend">
          <label class="input-group-text">实现</label>
        </div>
        <input class="form-control" :value="expr" @change="onChangeExpr" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button">
            <svg-icon name="edit"></svg-icon>
          </button>
        </div>
      </div>
    </div>
    <small class="form-text text-muted">
      <slot name="description"></slot>
    </small>
  </div>
</template>

<script>
import SvgIcon from 'vue-svgicon'
import { isArray } from 'lodash-es'

export default {
  name: 'v-jd-property-item',
  props: {
    label: String,
    transform: [Boolean, Array],
    value: null
  },
  components: { SvgIcon },
  data() {
    return {
      type: null,
      model: '',
      expr: '',
      transformKeys: { $: '表达式', '#': '模板', '@': '行为' }
    }
  },
  computed: {
    hasValue() {
      return this.value !== undefined
    },
    enablesTransform() {
      return this.transform !== false &&
        isArray(this.transform) &&
        this.transform.length > 0
        ? this.transform
        : ['$', '#']
    },
    isTransform() {
      return (
        typeof this.value === 'object' &&
        this.value !== null &&
        this.value.$type === 'design'
      )
    },
    transfromType() {
      if (!this.isTransform) {
        return null
      }

      const value = this.value.$value || ''
      if (/^([$]:)/g.test(value)) {
        return '$'
      } else if (/^([#]:)/g.test(value)) {
        return '#'
      } else if (/^(@[\s\S]*:)/g.test(value)) {
        return '@'
      } else {
        return null
      }
    }
  },
  watch: {
    type() {
      this.updateValue()
    },
    model() {
      this.updateValue()
    },
    expr() {
      this.updateValue()
    },
    ['value.$type'](value) {
      if (value !== 'design') {
        return
      }
      this.resolveTransform()
    }
  },
  methods: {
    onClear() {
      this.$emit('clear')
    },
    onChangeType(value) {
      this.$emit('changeType', value)
    },
    onChangePrefix(evt) {
      this.type = evt.target.value
      if (this.type !== '@') {
        this.model = ''
      }
    },
    onChangeModel(evt) {
      this.model = evt.target.value
    },
    onChangeExpr(evt) {
      this.expr = evt.target.value
    },
    //
    updateValue() {
      this.value.$value = `${this.type}${this.model}:${this.expr}`
    },
    resolveTransform() {
      if (!this.isTransform) {
        return
      }

      const realValue = this.value.$value || ''
      const firstIndex = realValue.indexOf(':')
      const valueArray = [
        realValue.substring(0, firstIndex),
        realValue.substring(firstIndex + 1, realValue.length)
      ]

      if (valueArray.length > 1) {
        this.type = valueArray[0][0]
        this.model = valueArray[0].substring(1, valueArray[0].length) || ''
        this.expr = valueArray[1]
      }
    }
  },
  mounted() {
    this.resolveTransform()
  }
}
</script>

<style lang="scss" scoped>
.property-tail {
  float: right;
}

.transform {
  .input-group {
    margin-bottom: 0.25rem;

    &:last-child {
      margin-bottom: inherit;
    }
  }
}

.form-group {
  .propterty-type {
    display: inline-block;
    margin-left: 1rem;

    > a {
      cursor: pointer;

      &.active {
        cursor: default;
      }
    }

    .badge-primary {
      cursor: default;
    }
  }

  .input-group {
    .type-selector {
      width: 6rem;
      flex: none;
    }
  }
}
</style>
