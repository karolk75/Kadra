import * as React from "react";
import Svg, { Path, Circle, G, Rect } from "react-native-svg";

export const ProfileIcon = (props) => (
  <Svg width={60} height={60} viewBox="0 0 60 60" fill="none" {...props}>
    <Circle cx={30} cy={30} r={29} fill="#EFEAE1" />
    <Circle cx={30} cy={30} r={28} stroke="#D5C8A5" strokeWidth={2} />
  </Svg>
);

export const UserDataIcon = (props) => (
  <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props}>
    <Circle cx={20} cy={20} r={19} fill="#F4EFE2" />
    <Circle cx={20} cy={15} r={6} fill="#D5C8A5" />
    <Path
      d="M10 32C10 25.373 14.477 22 20 22C25.523 22 30 25.373 30 32"
      fill="#D5C8A5"
    />
  </Svg>
);

export const PaymentsIcon = (props) => (
  <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props}>
    <Circle cx={20} cy={20} r={19} fill="#F4EFE2" />
    <G fill="#D5C8A5">
      <Rect x={10} y={12} width={20} height={16} rx={2} />
      <Rect x={15} y={20} width={10} height={2} rx={1} fill="#F4EFE2" />
      <Rect x={15} y={16} width={10} height={2} rx={1} fill="#F4EFE2" />
      <Path d="M10 16H30V18H10z" />
    </G>
  </Svg>
);

export const HomeworkIcon = (props) => (
  <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props}>
    <Circle cx={20} cy={20} r={19} fill="#F4EFE2" />
    <G fill="#D5C8A5">
      <Rect x={12} y={10} width={16} height={20} rx={2} />
      <Rect x={15} y={15} width={10} height={2} rx={1} fill="#F4EFE2" />
      <Rect x={15} y={19} width={10} height={2} rx={1} fill="#F4EFE2" />
      <Rect x={15} y={23} width={6} height={2} rx={1} fill="#F4EFE2" />
      <Path d="M26 26L30 30" stroke="#D5C8A5" strokeWidth={2} />
    </G>
  </Svg>
);

export const SettingsIcon = (props) => (
  <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props}>
    <Circle cx={20} cy={20} r={19} fill="#F4EFE2" />
    <G fill="#D5C8A5">
      <Path d="M20 24C22.2091 24 24 22.2091 24 20C24 17.7909 22.2091 16 20 16C17.7909 16 16 17.7909 16 20C16 22.2091 17.7909 24 20 24Z" />
      <Path d="M28.5 20C28.5 19.4477 28.9477 19 29.5 19C30.0523 19 30.5 19.4477 30.5 20C30.5 20.5523 30.0523 21 29.5 21C28.9477 21 28.5 20.5523 28.5 20Z" />
      <Path d="M9.5 20C9.5 19.4477 9.94772 19 10.5 19C11.0523 19 11.5 19.4477 11.5 20C11.5 20.5523 11.0523 21 10.5 21C9.94772 21 9.5 20.5523 9.5 20Z" />
      <Path d="M20 11.5C19.4477 11.5 19 11.0523 19 10.5C19 9.94772 19.4477 9.5 20 9.5C20.5523 9.5 21 9.94772 21 10.5C21 11.0523 20.5523 11.5 20 11.5Z" />
      <Path d="M20 30.5C19.4477 30.5 19 30.0523 19 29.5C19 28.9477 19.4477 28.5 20 28.5C20.5523 28.5 21 28.9477 21 29.5C21 30.0523 20.5523 30.5 20 30.5Z" />
      <Path d="M14.5 25.5C14.0858 25.0858 13.4142 25.0858 13 25.5C12.5858 25.9142 12.5858 26.5858 13 27C13.4142 27.4142 14.0858 27.4142 14.5 27C14.9142 26.5858 14.9142 25.9142 14.5 25.5Z" />
      <Path d="M27 13C26.5858 12.5858 25.9142 12.5858 25.5 13C25.0858 13.4142 25.0858 14.0858 25.5 14.5C25.9142 14.9142 26.5858 14.9142 27 14.5C27.4142 14.0858 27.4142 13.4142 27 13Z" />
      <Path d="M25.5 27C25.9142 26.5858 26.5858 26.5858 27 27C27.4142 27.4142 27.4142 28.0858 27 29C26.5858 29.4142 25.9142 29.4142 25.5 29C25.0858 28.5858 25.0858 27.9142 25.5 27Z" />
      <Path d="M13 13C13.4142 12.5858 14.0858 12.5858 14.5 13C14.9142 13.4142 14.9142 14.0858 14.5 14.5C14.0858 14.9142 13.4142 14.9142 13 14.5C12.5858 14.0858 12.5858 13.4142 13 13Z" />
    </G>
  </Svg>
);
