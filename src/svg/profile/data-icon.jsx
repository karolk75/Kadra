import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    fill="none"
    {...props}
  >
    <Circle
      cx={17.5}
      cy={17.5}
      r={16}
      fill="#fff"
      stroke="#DAC081"
      strokeWidth={3}
    />
    <Path
      stroke="#DAC081"
      strokeWidth={3}
      d="M5.066 29.474c9.574-14.739 15.475-15.102 25.329-.46"
    />
    <Path
      fill="#fff"
      stroke="#DAC081"
      strokeWidth={3}
      d="M21.526 12.434c0 1.85-1.677 3.566-4.026 3.566-2.35 0-4.026-1.717-4.026-3.566 0-1.849 1.677-3.566 4.026-3.566 2.35 0 4.026 1.717 4.026 3.566Z"
    />
  </Svg>
)
export default SvgComponent
