import * as React from "react";
import Svg, { Mask, Rect, Ellipse, Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={35}
      height={30}
      viewBox="0 0 35 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Mask id="a" fill="#fff">
        <Rect y={3.15784} width={35} height={26.8421} rx={2} />
      </Mask>
      <Rect
        y={3.15784}
        width={35}
        height={26.8421}
        rx={2}
        fill="#fff"
        stroke="#DAC081"
        strokeWidth={6}
        mask="url(#a)"
      />
      <Rect y={1.57898} width={35} height={4.73684} rx={2} fill="#DAC081" />
      <Ellipse
        cx={28.0814}
        cy={3.55262}
        rx={1.22093}
        ry={1.18421}
        fill="#fff"
      />
      <Ellipse
        cx={7.73256}
        cy={3.55262}
        rx={1.22093}
        ry={1.18421}
        fill="#fff"
      />
      <Path stroke="#DAC081" d="M7.82559 0L7.82559 3.94737" />
      <Path stroke="#DAC081" d="M28.1744 0L28.1744 3.94737" />
      <Path
        fill="#DAC081"
        d="M3.25583 8.6842H5.69769V11.052620000000001H3.25583z"
      />
      <Path fill="#DAC081" d="M3.25583 16.579H5.69769V18.94742H3.25583z" />
      <Path fill="#DAC081" d="M8.13953 16.579H10.58139V18.94742H8.13953z" />
      <Path fill="#DAC081" d="M3.25583 20.5264H5.69769V22.89482H3.25583z" />
      <Path
        fill="#DAC081"
        d="M8.13953 8.6842H10.58139V11.052620000000001H8.13953z"
      />
      <Path
        fill="#DAC081"
        d="M13.0233 8.6842H15.465160000000001V11.052620000000001H13.0233z"
      />
      <Path
        fill="#DAC081"
        d="M17.907 8.6842H20.348860000000002V11.052620000000001H17.907z"
      />
      <Path
        fill="#DAC081"
        d="M3.25583 12.6316H5.69769V15.000020000000001H3.25583z"
      />
      <Path
        fill="#DAC081"
        d="M8.13953 12.6316H10.58139V15.000020000000001H8.13953z"
      />
      <Path
        fill="#DAC081"
        d="M13.0233 12.6316H15.465160000000001V15.000020000000001H13.0233z"
      />
    </Svg>
  );
}

export default SvgComponent;
