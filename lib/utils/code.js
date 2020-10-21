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

  // var outer = cm.getMode(),
  //   text = cm.getRange(from, to).split('\n')
  // var state = CodeMirror.copyState(outer, cm.getTokenAt(from).state)
  // var tabSize = cm.getOption('tabSize')

  // var out = '',
  //   lines = 0,
  //   atSol = from.ch == 0
  // function newline() {
  //   out += '\n'
  //   atSol = true
  //   ++lines
  // }

  // for (var i = 0; i < text.length; ++i) {
  //   var stream = new CodeMirror.StringStream(text[i], tabSize)
  //   while (!stream.eol()) {
  //     var inner = CodeMirror.innerMode(outer, state)
  //     var style = outer.token(stream, state),
  //       cur = stream.current()
  //     stream.start = stream.pos
  //     if (!atSol || /\S/.test(cur)) {
  //       out += cur
  //       atSol = false
  //     }
  //     if (
  //       !atSol &&
  //       inner.mode.newlineAfterToken &&
  //       inner.mode.newlineAfterToken(
  //         style,
  //         cur,
  //         stream.string.slice(stream.pos) || text[i + 1] || '',
  //         inner.state
  //       )
  //     )
  //       newline()
  //   }
  //   if (!stream.pos && outer.blankLine) outer.blankLine(state)
  //   if (!atSol) newline()
  // }

  // cm.operation(function() {
  //   cm.replaceRange(out, from, to)
  //   for (var cur = from.line + 1, end = from.line + lines; cur <= end; ++cur)
  //     cm.indentLine(cur, 'smart')
  //   cm.setSelection(from, cm.getCursor(false))
  // })
})
