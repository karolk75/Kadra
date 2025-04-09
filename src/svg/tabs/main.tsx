import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={30}
      height={36}
      viewBox="0 0 30 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15.424 2.03L28.5 14.328V34.5h-27V14.355L15.424 2.03z"
        fill="#fff"
        stroke="#DAC081"
        strokeWidth={3}
      />
      <Path fill="#DAC081" d="M11.8182 24.5454H19.09093V33.5454H11.8182z" />
    </Svg>
  );
}

export default SvgComponent;
