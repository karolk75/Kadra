import * as React from "react";
import Svg, { Rect, Circle, Path } from "react-native-svg";
import { View } from "react-native";

function SvgComponent(props) {
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 159 215"
        preserveAspectRatio="xMidYMid slice"
      >
        <Rect width={159} height={201} rx={5} fill="#B3C8CF" />
        <Circle cx={76.5} cy={90.5} r={9.5} fill="white" />
        <Path
          d="M63.7589 101.69C67.7164 92.3026 86.02 96.1431 88.4934 101.69C90.9669 107.237 89.9775 129 88.4934 129C87.0093 129 63.7589 129 63.7589 129C63.7589 129 59.8014 111.078 63.7589 101.69Z"
          fill="#A64F3C"
        />
        <Path d="M58 105L77 108V131L58 127.5V105Z" fill="#89A8B2" />
        <Path d="M96 105L77 108V131L96 127.5V105Z" fill="#89A8B2" />
        <Circle cx={57} cy={117} r={3} fill="white" />
        <Circle cx={96} cy={117} r={3} fill="white" />
        <Circle cx={127.5} cy={132.5} r={9.5} fill="white" />
        <Circle cx={28.5} cy={133.5} r={9.5} fill="white" />
        <Circle cx={93.5} cy={146.5} r={9.5} fill="white" />
        <Circle cx={60.5} cy={147.5} r={9.5} fill="white" />
        <Path
          d="M115.778 144.668C119.778 133.668 138.278 138.168 140.778 144.668C143.278 151.167 142.278 176.668 140.778 176.668C139.278 176.668 115.778 176.668 115.778 176.668C115.778 176.668 111.778 155.668 115.778 144.668Z"
          fill="#A64F3C"
        />
        <Path
          d="M15.9999 145C19.9999 134 38.4999 138.5 40.9999 145C43.4999 151.5 42.4999 177 40.9999 177C39.4999 177 15.9999 177 15.9999 177C15.9999 177 11.9999 156 15.9999 145Z"
          fill="#DAC081"
        />
        <Path
          d="M47.7778 158.668C51.7778 147.668 70.2778 152.168 72.7778 158.668C75.2778 165.167 74.2778 190.668 72.7778 190.668C71.2778 190.668 47.7778 190.668 47.7778 190.668C47.7778 190.668 43.7778 169.668 47.7778 158.668Z"
          fill="#A64F3C"
        />
        <Path
          d="M81.7778 158.668C85.7778 147.668 104.278 152.168 106.778 158.668C109.278 165.167 108.278 190.668 106.778 190.668C105.278 190.668 81.7778 190.668 81.7778 190.668C81.7778 190.668 77.7778 169.668 81.7778 158.668Z"
          fill="#DAC081"
        />
      </Svg>
    </View>
  );
}

export default SvgComponent;
