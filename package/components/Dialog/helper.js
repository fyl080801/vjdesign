const defaults = {
  title: null,
  visible: false,
  backdrop: false,
  size: null,
  cancelText: '取消',
  okText: '确定'
}

import Vue from 'vue'
import msgboxVue from './Dialog'
import { merge } from 'lodash-es'

const hasOwn = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

const isVNode = node => {
  return node !== null && typeof node === 'object' && hasOwn(node, 'componentOptions')
}

const MessageBoxConstructor = Vue.extend(msgboxVue)

let currentMsg, instance
let msgQueue = []

const defaultCallback = action => {
  if (currentMsg) {
    let callback = currentMsg.callback
    if (typeof callback === 'function') {
      if (instance.showInput) {
        callback(instance.inputValue, action)
      } else {
        callback(action)
      }
    }
    if (currentMsg.resolve) {
      if (action === 'confirm') {
        if (instance.showInput) {
          currentMsg.resolve({ value: instance.inputValue, action })
        } else {
          currentMsg.resolve(action)
        }
      } else if (currentMsg.reject && (action === 'cancel' || action === 'close')) {
        currentMsg.reject(action)
      }
    }
  }
}

const initInstance = () => {
  instance = new MessageBoxConstructor({
    el: document.createElement('div')
  })

  instance.callback = defaultCallback
}

const showNextMsg = () => {
  if (!instance) {
    initInstance()
  }
  instance.action = ''

  if (!instance.visible || instance.closeTimer) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift()

      let options = currentMsg.options
      for (let prop in options) {
        if (hasOwn(options, prop)) {
          instance[prop] = options[prop]
        }
      }
      if (options.callback === undefined) {
        instance.callback = defaultCallback
      }

      let oldCb = instance.callback
      instance.callback = (action, instance) => {
        oldCb(action, instance)
        showNextMsg()
      }
      if (isVNode(instance.message)) {
        instance.$slots.default = [instance.message]
        instance.message = null
      } else {
        delete instance.$slots.default
      }
      ;[
        'modal',
        'showClose',
        'closeOnClickModal',
        'closeOnPressEscape',
        'closeOnHashChange'
      ].forEach(prop => {
        if (instance[prop] === undefined) {
          instance[prop] = true
        }
      })
      document.body.appendChild(instance.$el)

      Vue.nextTick(() => {
        instance.visible = true
      })
    }
  }
}

const Dialog = function(options, callback) {
  if (Vue.prototype.$isServer) return
  if (typeof options === 'string' || isVNode(options)) {
    options = {
      message: options
    }
    if (typeof arguments[1] === 'string') {
      options.title = arguments[1]
    }
  } else if (options.callback && !callback) {
    callback = options.callback
  }

  if (typeof Promise !== 'undefined') {
    return new Promise((resolve, reject) => {
      msgQueue.push({
        options: merge({}, defaults, Dialog.defaults, options),
        callback: callback,
        resolve: resolve,
        reject: reject
      })

      showNextMsg()
    })
  } else {
    msgQueue.push({
      options: merge({}, defaults, Dialog.defaults, options),
      callback: callback
    })

    showNextMsg()
  }
}

Dialog.setDefaults = defaults => {
  Dialog.defaults = defaults
}

Dialog.alert = (message, title, options) => {
  if (typeof title === 'object') {
    options = title
    title = ''
  } else if (title === undefined) {
    title = ''
  }
  return Dialog(
    merge(
      {
        title: title,
        message: message,
        closeOnPressEscape: false,
        closeOnClickModal: false
      },
      options
    )
  )
}

Dialog.confirm = (message, title, options) => {
  if (typeof title === 'object') {
    options = title
    title = ''
  } else if (title === undefined) {
    title = ''
  }
  return Dialog(
    merge(
      {
        title: title,
        message: message,
        showCancelButton: true
      },
      options
    )
  )
}

Dialog.close = () => {
  instance.doClose()
  instance.visible = false
  msgQueue = []
  currentMsg = null
}

export default Dialog
export { Dialog }
