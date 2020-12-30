<template>
  <div class="toolbox side">
    <Collapse v-model="actives">
      <CollapseItem
        v-for="group in groups"
        :key="group.name"
        :name="group.name"
        :title="group.name"
      >
        <vuedraggable
          tag="ul"
          class="component-group row"
          draggable=".drag-handler"
          :list="group.children"
          ghost-class="ghost"
          :group="{ name: 'jdesign', pull: 'clone', put: false }"
          :sort="false"
        >
          <a
            class="col-md-6 item-wrapper drag-handler"
            v-for="item in group.children"
            :key="`${group.name}_${item.name}_${item.label}`"
            :title="item.label"
          >
            <li class="item">
              <SvgIcon class="icon" :name="item.icon || 'square'"></SvgIcon>
              <span>{{ item.label }}</span>
            </li>
          </a>
        </vuedraggable>
      </CollapseItem>
    </Collapse>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Collapse, CollapseItem } from '../../components/collapse'
import vuedraggable from 'vuedraggable'
import SvgIcon from '../../icons'

export default {
  components: { Collapse, CollapseItem, vuedraggable, SvgIcon },
  data() {
    return {
      actives: []
    }
  },
  computed: {
    ...mapGetters(['profile']),
    groups() {
      return Object.keys(this.profile.components).reduce((prev, cur) => {
        const current = this.profile.components[cur]
        const existGroup = prev.find(item => item.name === current.group)

        if (existGroup) {
          existGroup.children = existGroup.children || []
          existGroup.children.push(current)
        } else {
          prev.push({
            name: current.group,
            children: [current]
          })
        }
        return prev
      }, [])
    }
  },
  watch: {
    groups(value) {
      this.actives = []
      value.forEach(group => {
        this.actives.push(group.name)
      })
    }
  },
  mounted() {
    this.groups.forEach(group => {
      this.actives.push(group.name)
    })
  }
}
</script>

<style lang="scss">
.v-jdesign {
  .toolbox {
    width: 18rem;
    border-right: 1px solid #dcdfe6;

    .component-group {
      list-style: none;
      padding: inherit;
      margin: inherit;
      margin-bottom: -1px;
      margin-right: -1px;
      margin-left: 0;

      .item-wrapper {
        border-bottom: 1px solid #dcdfe6;
        border-right: 1px solid #dcdfe6;
        padding-left: 1.25rem;
        color: #409eff;

        &.drag-handler {
          cursor: pointer;
          text-decoration: none;
        }

        .item {
          padding: 0.75rem 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          > .icon {
            margin-right: 0.75em;
          }
        }
      }
    }
  }
}
</style>
