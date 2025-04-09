import * as React from "react"
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="100%"
    height="100%"
    fill="none"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h31v31H0z" />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#b" transform="scale(.00195)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,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"
        id="b"
        width={512}
        height={512}
        preserveAspectRatio="none"
      />
    </Defs>
  </Svg>
)
export default SvgComponent
