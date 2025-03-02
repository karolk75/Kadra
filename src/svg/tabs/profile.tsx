import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={30}
      height={29}
      viewBox="0 0 30 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M28.5 14.5c0 7.132-5.996 13-13.5 13s-13.5-5.868-13.5-13 5.996-13 13.5-13 13.5 5.868 13.5 13z"
        fill="#fff"
        stroke="#DAC081"
        strokeWidth={3}
      />
      <Path
        d="M4.342 24.421c8.207-12.212 13.265-12.512 21.71-.381"
        stroke="#DAC081"
        strokeWidth={3}
      />
      <Path
        d="M18.237 10.303C18.237 11.627 16.963 13 15 13s-3.237-1.373-3.237-2.697c0-1.325 1.274-2.698 3.237-2.698s3.237 1.373 3.237 2.698z"
        fill="#fff"
        stroke="#DAC081"
        strokeWidth={3}
      />
    </Svg>
  )
}

export default SvgComponent
