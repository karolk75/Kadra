import * as React from "react"
import Svg, { G, Ellipse, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Ellipse cx={61} cy={61.176} fill="#E5E1DA" rx={57} ry={61.176} />
    </G>
    <Defs></Defs>
  </Svg>
)
export default SvgComponent
