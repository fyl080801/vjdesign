import Vue from 'vue'
import DesignContent from '../DesignContent/index'
import DesignMetadata from '../DesignMetadata/index'
import DesignPreview from '../DesignPreview/index'
import ModelPreview from '../ModelPreview/index'
import SvgIcon from 'vue-svgicon'

export default Vue.extend({
  data() {
    return {
      active: 0
    }
  },
  methods: {
    toggleActive(index) {
      this.active = index
    }
  },
  render() {
    return (
      <div class="v-jd-main">
        <ul class="nav nav-tabs v-jd-tabs" role="tablist">
          <li class="nav-item v-jd-tabitem" role="presentation">
            <a
              class={`nav-link v-jd-link ${this.active === 0 ? 'active' : ''}`}
              role="tab"
              href="javascript:;"
              onClick={() => this.toggleActive(0)}
            >
              <SvgIcon name="edit" class="tab-icon v-jd-svgicon" />
              设计器
            </a>
          </li>
          <li class="nav-item v-jd-tabitem" role="presentation">
            <a
              class={`nav-link v-jd-link ${this.active === 1 ? 'active' : ''}`}
              role="tab"
              href="javascript:;"
              onClick={() => this.toggleActive(1)}
            >
              <SvgIcon name="code" class="tab-icon v-jd-svgicon" />
              配置预览
            </a>
          </li>
          <li class="nav-item v-jd-tabitem" role="presentation">
            <a
              class={`nav-link v-jd-link ${this.active === 2 ? 'active' : ''}`}
              role="tab"
              href="javascript:;"
              onClick={() => this.toggleActive(2)}
            >
              <SvgIcon name="eye-on" class="tab-icon v-jd-svgicon" />
              视图预览
            </a>
          </li>
          <li class="nav-item v-jd-tabitem" role="presentation">
            <a
              class={`nav-link v-jd-link ${this.active === 3 ? 'active' : ''}`}
              role="tab"
              href="javascript:;"
              onClick={() => this.toggleActive(3)}
            >
              <SvgIcon name="database" class="tab-icon v-jd-svgicon" />
              数据预览
            </a>
          </li>
        </ul>
        <div class="tab-content v-jd-tabcontent" style="padding: 15px">
          <div class="tab-pane fade show active" role="tabpanel">
            {this.active === 0 ? <DesignContent /> : null}
            {this.active === 1 ? <DesignMetadata /> : null}
            {this.active === 2 ? <DesignPreview /> : null}
            {this.active === 3 ? <ModelPreview /> : null}
          </div>
        </div>
      </div>
    )
  }
})
