import SvgIcon from '../components/svgicon' // svg component

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => {
  return requireContext.keys().map(requireContext)
}
requireAll(req)

export default SvgIcon
