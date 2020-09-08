import Vue from 'vue'
import SvgIcon from 'vue-svgicon'
// import Transform from '../transform'
// import { Input, Button } from "element-ui";

export default Vue.component('v-jdesign-input', {
  // mixins: [Transform],
  // props: {
  //   placeholder: { type: String, default: '请输入' }
  // },
  props: {
    types: Array,
    value: [String, Boolean, Number, Object]
  },
  data() {
    return {
      valueType: 'string',
      inputTypes: [
        { value: 'string', text: '字符' },
        { value: 'number', text: '数字' },
        // { value: 'datetime', text: '时间' },
        { value: 'boolean', text: '布尔' },
        { value: 'object', text: '对象' }
      ],
      showTypes: false,
      showTypeLocation: 'bottom'
    }
  },
  methods: {
    onToggleTypes(evt) {
      this.showTypes = !this.showTypes
      if (this.showTypes && evt) {
        this.showTypeLocation =
          document.documentElement.clientHeight - evt.target.getBoundingClientRect().bottom > 120
            ? 'bottom'
            : 'top'
      }
      evt.stopPropagation()
    },
    onSetValueType(value) {
      this.valueType = value
      this.$emit('input', undefined)
      this.hideTypes()
    },
    hideTypes() {
      this.showTypes = false
    }
  },
  mounted() {
    this.valueType =
      ['string', 'number', 'boolean', 'object'].find(item => item === typeof value) ||
      (this.types || []).find((item, idx) => idx === 0) ||
      'string'
  },
  created() {
    document.body.addEventListener('click', this.hideTypes)
  },
  beforeDestroy() {
    document.body.removeEventListener('click', this.hideTypes)
  },
  render() {
    return (
      <div class="input-group input-group-sm">
        {!this.types || this.types.length <= 0 || this.types.length !== 1 ? (
          <div class="input-group-prepend">
            <button
              class="btn btn-outline-secondary dropdown-toggle"
              type="button"
              onClick={this.onToggleTypes}
            >
              {this.inputTypes.find(item => item.value === this.valueType).text}
            </button>
            <div
              class={{ 'dropdown-menu': true, show: this.showTypes }}
              style={{
                position: 'absolute',
                'will-change': 'transform',
                top: 0,
                left: 0,
                transform: `translate3d(0px, ${
                  this.showTypeLocation === 'bottom' ? '31px' : '-150px'
                }, 0px)`
              }}
            >
              {this.inputTypes
                .filter(item =>
                  this.types && this.types.length > 0 ? this.types.indexOf(item.value) >= 0 : true
                )
                .map(item => (
                  <a
                    class={{ 'dropdown-item': true, active: this.valueType === item.value }}
                    onClick={() => this.onSetValueType(item.value)}
                  >
                    {item.text}
                  </a>
                ))}
            </div>
          </div>
        ) : null}

        {this.valueType === 'string' ? (
          <input
            class="form-control"
            placeholder="请输入字符"
            onInput={evt => this.$emit('input', evt.target.value)}
          />
        ) : null}
        {this.valueType === 'number' ? (
          <input
            class="form-control"
            type="number"
            placeholder="请输入数字"
            onInput={evt => this.$emit('input', parseInt(evt.target.value))}
          />
        ) : null}
        {this.valueType === 'boolean' ? (
          <div class="input-group-text">
            <input type="checkbox" onInput={evt => this.$emit('input', evt.target.checked)} />
          </div>
        ) : null}

        <div class="input-group-append">
          <button type="button" class="btn btn-outline-secondary">
            <i>
              <SvgIcon class="v-jd-svgicon" name="code" />
            </i>
          </button>
          {/* <button
            type="button"
            class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span class="sr-only">Toggle Dropdown</span>
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">
              Action
            </a>
            <a class="dropdown-item" href="#">
              Another action
            </a>
            <a class="dropdown-item" href="#">
              Something else here
            </a>
            <div role="separator" class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">
              Separated link
            </a>
          </div> */}
        </div>

        {/* {!this.isTransform ? (
          <Input
            v-model={this.fieldValue}
            placeholder={this.placeholder}
            onChange={this.changed}
          >
            <Button
              slot="append"
              icon="el-icon-link"
              onClick={this.openEditor}
            ></Button>
          </Input>
        ) : (
          <Input placeholder="<转换的值>" readonly={true}>
            <Button
              slot="append"
              icon="el-icon-edit"
              onClick={this.openEditor}
            ></Button>
          </Input>
        )} */}
      </div>
    )
  }
})
