import _CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/keymap/vim'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'
require('script-loader!jsonlint')
import { js_beautify } from 'js-beautify'

import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/lint/lint.css'

export const CodeMirror = window.CodeMirror || _CodeMirror

CodeMirror.defineExtension('formatAll', function() {
  const json = this.getValue()
  this.setValue(js_beautify(json, { indent_size: this.options.indentUnit }))
})
