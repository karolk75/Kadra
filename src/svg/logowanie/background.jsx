import * as React from "react"
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={393}
      height={852}
      viewBox="0 0 393 852"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_418_440)">
        <Rect width={393} height={852} fill="white" />
        <Path
          d="M-30.7471 329.199C-10.0307 268.998 11.4959 263.804 58.9999 280.793C132.393 300.161 157.116 274.948 191.75 209.194C212.566 164.653 230.914 143.249 324.5 137.596C360.962 131.858 376.055 120.043 401.253 96.1987"
          stroke="#FAF8F5"
          strokeWidth={20}
        />
        <Path
          d="M-13.6246 837.653C7.09186 777.452 28.6185 772.258 76.1225 789.248C149.516 808.616 174.239 783.402 208.873 717.649C229.689 673.108 248.036 651.703 341.622 646.05C378.084 640.312 393.178 628.498 418.375 604.653"
          stroke="#FAF8F5"
          strokeWidth={20}
        />
        <Path
          d="M-61.6246 183.653C-40.9081 123.452 -19.3815 118.258 28.1225 135.248C101.516 154.616 126.239 129.402 160.873 63.6489C181.689 19.1078 200.036 -2.29662 293.622 -7.95001C330.084 -13.6877 345.178 -25.5024 370.375 -49.3468"
          stroke="#FAF8F5"
          strokeWidth={20}
        />
        <Path
          d="M60.5273 208.111H62.6185V204.832C62.2577 204.787 61.0169 204.686 59.5719 204.686C56.5568 204.686 54.4914 206.394 54.4914 209.533V212.422H51.1642V216.088H54.4914V225.313H58.5707V216.089H61.7633L62.2701 212.422H58.5697V209.896C58.5707 208.837 58.8876 208.111 60.5273 208.111Z"
          fill="white"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_418_440">
          <Rect width={393} height={852} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
