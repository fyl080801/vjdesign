const fs = require('fs')
const path = require('path')

const base = path.resolve(__dirname, '../../../')

module.exports.resolvePaths = () => {
  const list = fs.readdirSync(base)

  const groups = list
    .map(item => {
      return { name: item, stat: fs.statSync(path.resolve(base, item)) }
    })
    .filter(item => item.stat.isDirectory() && item.name !== '.vuepress')
    .reduce((prev, cur) => {
      const current = prev[cur.name] || {
        title: '',
        collapsable: false,
        children: []
      }

      const readmePath = path.resolve(base, cur.name, 'README.md')

      if (fs.existsSync(readmePath)) {
        const readmeFile = fs.readFileSync(readmePath).toString()
        const lines = readmeFile.split('\n')
        if (lines.length > 0 && lines[0].startsWith('# ')) {
          current.title = lines[0].replace('# ', '')
          // current.path = `/${cur.name}`
        }
      }

      fs.readdirSync(path.resolve(base, cur.name))
        .filter(file => file !== 'README.md' && file.endsWith('.md'))
        .forEach(file => {
          const filestat = fs.statSync(path.resolve(base, cur.name, file))

          if (!filestat.isFile()) {
            return
          }

          current.children.push(
            path.resolve('/', cur.name, file.replace('.md', ''))
          )
        })

      if (!current.children || current.children.length <= 0) {
        prev[cur.name] = current.path + '/README'
      } else {
        prev[cur.name] = current
      }

      return prev
    }, {})
  // console.log(groups)
  return Object.keys(groups).map(key => groups[key])
}
