import { isArray } from 'lodash-es'

const _convert = function(data) {
  // 将键值映射成键值对
  let map = {}

  data.forEach(current => {
    map[current[this.key]] = {
      $data: current,
      $key: current[this.key]
    }
  })

  // 构建树
  let root = {
    $data: null,
    $key: null,
    $children: []
  }

  Object.keys(map).forEach(key => {
    let current = map[key]
    let parent = map[current.$data[this.parent]]
    if (parent) {
      parent.$children = parent.$children || []
      parent.$children.push(current)
      this.onEach(current, parent, data)
    } else {
      root.$children.push(current)
      this.onEach(current, root, data)
    }
  })

  return root
}

// const _resolve = function(data, parent) {
//   let node = {
//     $data: data,
//     $parent: parent,
//     $key: data[this.options.key]
//   }

//   let resolvedChildren = []
//   let children = data[this.options.children]
//   children = Array.isArray(children) ? children : []

//   children.forEach(child => {
//     resolvedChildren.push(_resolve.call(this, child, node))
//   })

//   node.$children = resolvedChildren
//   delete node.$data[this.options.children]

//   // defer.notify(node)

//   return node
// }

// const _each = function(root, context) {
//   root.$children.forEach(current => {
//     // defer.notify(root.$children[i])
//     if (current.$children) {
//       this._each(current, this.options)
//     }
//   })
// }

export const eachTree = (node, callback) => {
  const result = callback(node)

  if (result === false) {
    return false
  }

  eachTreeNodes(isArray(node.children) ? node.children : [], callback)
}

export const eachTreeNodes = (nodes, callback) => {
  for (const i in nodes) {
    const result = eachTree(nodes[i], callback)

    if (result === false) {
      break
    }
  }
}

export const convertToTree = options => {
  const {
    key = 'id',
    parent = 'parentId',
    children = 'children',
    onEach = () => {},
    data = []
  } = options

  return _convert.call({ key, parent, children, onEach }, data)
}
