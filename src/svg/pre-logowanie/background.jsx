import * as React from "react"
import Svg, {
  G,
  Rect,
  Path,
  Circle,
  Ellipse,
  Line,
  Mask,
  Defs,
  ClipPath
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

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
      <G clipPath="url(#clip0_415_778)">
        <Rect width={393} height={852} fill="white" />
        <Path
          d="M-23 -4H395V496.006C356.391 461.453 306.254 434.638 272.153 432.215C238.052 429.793 165.515 438.253 143.987 446.287C122.46 454.32 75.7236 482.438 51.4529 496.006C27.1822 509.574 6.24953 517.678 -23 515.706V-4Z"
          fill="#FAF8F5"
        />
        <Path
          d="M-10.0214 540.463C59.0423 548.927 210.915 373.324 401.27 502.497"
          stroke="#FAF8F5"
          strokeWidth={2}
        />
        <Path
          d="M295.093 284.554C330.093 326.878 239.426 379.054 183.093 379.054C102.287 385.786 79.3326 324.185 81.0925 292.554C82.8525 260.923 115.093 207.729 183.093 206.054C251.093 204.378 260.093 242.229 295.093 284.554Z"
          fill="white"
        />
        <Path
          d="M21.9319 412.436C88.8201 420.761 235.82 248.761 420.227 375.421"
          stroke="#FAF8F5"
          strokeWidth={2}
        />
        <Path
          d="M-14.0681 329.436C52.8201 337.761 199.82 165.761 384.227 292.421"
          stroke="#FAF8F5"
          strokeWidth={2}
        />
        <Path
          d="M-26.0681 293.436C40.8201 301.761 187.82 129.761 372.227 256.421"
          stroke="#FAF8F5"
          strokeWidth={2}
        />
        <Path
          d="M1.93188 367.436C68.8201 375.761 215.82 203.761 400.227 330.421"
          stroke="#FAF8F5"
          strokeWidth={2}
        />
        <Path
          d="M232.607 349.5C232.607 351.157 219.249 351.5 215.107 351.5C210.965 351.5 211.928 346.504 212.607 346.5C213.286 346.496 222.786 345 223.286 345C223.786 345 232.607 347.843 232.607 349.5Z"
          fill="#F2E5D5"
        />
        <Path
          d="M223.187 346.317C223.135 346.298 223.077 346.324 223.058 346.375C223.039 346.427 223.065 346.485 223.117 346.504L223.187 346.317ZM223.117 346.504C226.844 347.901 228.566 348.752 231.095 350.493L231.208 350.328C228.662 348.576 226.924 347.718 223.187 346.317L223.117 346.504Z"
          fill="#898580"
        />
        <Path
          d="M222.142 347.69C222.09 347.671 222.033 347.697 222.013 347.749C221.994 347.8 222.02 347.858 222.072 347.877L222.142 347.69ZM222.072 347.877C225.799 349.274 227.521 350.125 230.05 351.866L230.164 351.701C227.618 349.949 225.88 349.091 222.142 347.69L222.072 347.877Z"
          fill="#898580"
        />
        <Path
          d="M238.5 313.5H289L272.5 350.5H221.5L238.5 313.5Z"
          fill="#89A8B2"
        />
        <Path
          d="M253.035 329.101C253.57 328.201 255.025 327.707 255.032 329C255.111 330.578 255.5 332.5 255.535 333.5C255.57 334.5 254.07 336.5 253.035 334.5C252 332.5 252.5 330 253.035 329.101Z"
          fill="#D9D9D9"
        />
        <Path
          d="M255.5 333C255.5 334 259 336 259 336C260.041 336.649 260 337.5 258.5 337.5C257 337.5 254 336.5 253 334.5C252 332.5 255.5 332 255.5 333Z"
          fill="#D9D9D9"
        />
        <Path
          d="M289 296.5C289 302.299 286 304.5 276.5 307C267 309.5 264 302.299 264 296.5C264 290.701 269.596 286 276.5 286C283.404 286 289 290.701 289 296.5Z"
          fill="#F2E3B5"
        />
        <Path
          d="M265.5 302.291L271.515 306.915L265.251 309.874L265.5 302.291Z"
          fill="#F2E3B5"
        />
        <Path
          d="M276.825 301.273C275.651 301.046 274 296.5 274 295C274 293.5 276.825 297.5 276.825 297.5C276.825 297.5 280.544 288.568 280.522 290.534C280.5 292.5 278 301.5 276.825 301.273Z"
          fill="#DAC081"
        />
        <Circle cx={262.5} cy={193.5} r={21.5} fill="white" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M263 218C276.807 218 288 206.807 288 193C288 179.193 276.807 168 263 168C249.193 168 238 179.193 238 193C238 206.807 249.193 218 263 218ZM263 216.958C276.232 216.958 286.958 206.232 286.958 193C286.958 179.768 276.232 169.042 263 169.042C249.768 169.042 239.042 179.768 239.042 193C239.042 206.232 249.768 216.958 263 216.958Z"
          fill="#F2E3B5"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M149 198C162.807 198 174 186.807 174 173C174 159.193 162.807 148 149 148C135.193 148 124 159.193 124 173C124 186.807 135.193 198 149 198ZM148.958 196.917C162.19 196.917 172.917 186.19 172.917 172.958C172.917 159.727 162.19 149 148.958 149C135.727 149 125 159.727 125 172.958C125 186.19 135.727 196.917 148.958 196.917Z"
          fill="#F2E3B5"
        />
        <Circle cx={149.5} cy={173.5} r={21.5} fill="white" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M253.4 181.116C254.503 185.094 256.393 191.58 256.753 192.814C256.769 192.847 256.785 192.881 256.8 192.916C257.367 194.175 257.553 195.665 255.538 196.571C253.523 197.477 251.431 197.191 250.865 195.932C250.298 194.673 251.472 192.918 253.487 192.011C253.874 191.837 254.215 191.716 254.515 191.645C253.859 189.926 252.832 187.182 252.347 185.593C251.675 183.394 251.795 181.525 251.841 180.809L251.841 180.809C251.846 180.731 251.85 180.667 251.852 180.617C251.868 180.26 252.175 178.618 252.397 178.038C252.444 177.81 252.521 177.654 252.641 177.642C253.139 177.593 259.9 184.961 259.95 185.458C259.999 185.956 257.273 184.601 256.726 184.153C256.362 183.854 254.563 182.194 253.4 181.116Z"
          fill="#F2E3B5"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M269.775 186.425C269.775 186.425 271.61 189.297 273.5 190C275.749 190.837 279.588 189.165 279.588 189.165L269.775 186.425ZM269.418 186.497C269.418 186.497 268.783 190.822 268 193.5C267.236 196.11 265.5 200 265.5 200L265.495 199.999C265.49 200.061 265.483 200.123 265.474 200.184C265.288 201.497 263.267 202.052 261.37 201.783C259.474 201.513 258.087 200.231 258.273 198.918C258.46 197.605 261.379 196.706 263.276 196.975C263.768 197.045 264.165 197.206 264.48 197.429C264.844 195.933 265.387 193.948 266 192.5C267.052 190.016 269.418 186.497 269.418 186.497ZM278.08 196.517C278.864 193.839 279.498 189.515 279.498 189.515C279.498 189.515 277.132 193.033 276.08 195.517C275.504 196.879 274.99 198.715 274.627 200.174C274.3 199.919 273.876 199.734 273.34 199.658C271.443 199.389 268.524 200.288 268.337 201.601C268.151 202.913 269.537 204.196 271.434 204.465C273.266 204.725 275.214 204.216 275.513 202.998L275.58 203.017C275.58 203.017 277.317 199.128 278.08 196.517Z"
          fill="#F2E3B5"
        />
        <Path
          d="M162.5 172.5C162.5 175.114 160.373 177.856 158 179.5C155.861 180.982 151.642 181.5 148.5 181.5C144.634 181.5 140.695 179.129 138.5 177C137.65 176.175 137.655 172.667 140 172.5C141.5 172.5 143.837 174.128 144.5 172.5C144.966 171.356 144.741 170.764 143.5 169.5C142.872 168.86 140.908 168.398 141.5 167C142.044 165.717 143.58 163.488 144.5 163C147.202 161.566 150.289 161.5 153 161.5C156.121 161.5 158.687 163.684 160 165.5C161.476 167.541 162.5 169.87 162.5 172.5Z"
          fill="#F2E3B5"
        />
        <Path
          d="M149.95 166C149.95 167.067 148.864 167.95 147.5 167.95C146.136 167.95 145.05 167.067 145.05 166C145.05 164.933 146.136 164.05 147.5 164.05C148.864 164.05 149.95 164.933 149.95 166Z"
          fill="white"
          stroke="#ADA27F"
          strokeWidth={0.1}
        />
        <Circle cx={142.5} cy={176.5} r={1.5} fill="white" />
        <Circle
          cx={147.5}
          cy={178.5}
          r={1.45}
          fill="white"
          stroke="#ADA27F"
          strokeWidth={0.1}
        />
        <Circle
          cx={142.5}
          cy={176.5}
          r={1.45}
          fill="white"
          stroke="#ADA27F"
          strokeWidth={0.1}
        />
        <Circle
          cx={157.5}
          cy={176.5}
          r={1.45}
          fill="white"
          stroke="#ADA27F"
          strokeWidth={0.1}
        />
        <Circle
          cx={159.5}
          cy={171.5}
          r={1.45}
          fill="white"
          stroke="#ADA27F"
          strokeWidth={0.1}
        />
        <Circle
          cx={152.5}
          cy={178.5}
          r={1.45}
          fill="white"
          stroke="#ADA27F"
          strokeWidth={0.1}
        />
        <Path
          d="M131.5 177.843C131.5 177.843 130.782 178.672 132 176.343C133.265 173.925 135.5 168 137 165.5C137.5 164.5 138 163.7 139.5 161.343L141 162.343C140.621 162.998 140.147 164.579 139 166.5C137.728 168.63 135.738 171.177 134.5 173.343C132.977 176.008 131.5 177.843 131.5 177.843Z"
          fill="#F2E3B5"
        />
        <Path
          d="M142.919 161.181C142.189 161.707 142.208 161.606 141.598 161.878C140.91 161.878 140.647 161.981 140.189 161.707C139.791 161.469 139.777 161.393 139.689 160.878C139.638 160.571 139.642 160.231 139.703 159.878C139.784 159.411 140.919 158.681 141.419 158.681C142.919 158.181 142.919 157.681 143.203 157.378C143.419 156.86 142.26 156.72 142.703 156.707C142.989 156.698 143.26 156.761 143.499 156.904C143.863 157.122 144.315 157.725 144.419 158.181C144.547 158.74 143.95 159.658 143.676 160.342C143.591 160.552 143.042 160.974 142.919 161.181Z"
          fill="#F2E3B5"
        />
        <Ellipse cx={88.5} cy={215} rx={13.5} ry={13} fill="#F2E3B5" />
        <Path
          d="M101.415 214.978C101.415 221.859 95.6227 227.437 88.4775 227.437C81.3324 227.437 75.54 221.859 75.54 214.978C75.54 208.098 81.3324 202.52 88.4775 202.52C95.6227 202.52 101.415 208.098 101.415 214.978Z"
          fill="#FAF8F5"
        />
        <Ellipse cx={88.77} cy={215.26} rx={11.61} ry={11.18} fill="white" />
        <Path
          d="M84 221C84.228 220.496 84.4591 220.293 85 220H92C92.4923 220.193 92.7246 220.391 93 221V222H84V221Z"
          fill="#F2E3B5"
        />
        <Path
          d="M87 212H90C90.0189 215.194 90.2569 216.714 91 219H86C86.8981 216.412 87.0542 214.864 87 212Z"
          fill="#F2E3B5"
        />
        <Rect x={86} y={210} width={5} height={1} fill="#F2E3B5" />
        <Path
          d="M90 208.5C90 208.916 89.7733 209.728 89.5 210C89.2288 210.27 88.9126 210 88.5 210C88.1014 210 87.7686 210.254 87.5 210C87.2103 209.727 87 208.93 87 208.5C87 207.672 87.6716 207 88.5 207C89.3284 207 90 207.672 90 208.5Z"
          fill="#F2E3B5"
        />
        <Ellipse cx={210.5} cy={175} rx={13.5} ry={13} fill="#F2E3B5" />
        <Path
          d="M223.415 174.978C223.415 181.859 217.623 187.437 210.478 187.437C203.332 187.437 197.54 181.859 197.54 174.978C197.54 168.098 203.332 162.52 210.478 162.52C217.623 162.52 223.415 168.098 223.415 174.978Z"
          fill="#FAF8F5"
        />
        <Ellipse cx={210.77} cy={175.26} rx={11.61} ry={11.18} fill="white" />
        <Ellipse cx={299} cy={232.5} rx={14} ry={13.5} fill="#F2E3B5" />
        <Path
          d="M311.913 232.5C311.913 239.381 306.12 244.958 298.975 244.958C291.83 244.958 286.038 239.381 286.038 232.5C286.038 225.619 291.83 220.042 298.975 220.042C306.12 220.042 311.913 225.619 311.913 232.5Z"
          fill="#FAF8F5"
        />
        <Ellipse cx={298.61} cy={232.18} rx={11.61} ry={11.18} fill="white" />
        <Path
          d="M294 237H301C301.539 237.304 301.786 237.505 302 238V239H293V238C293.273 237.468 293.503 237.264 294 237Z"
          fill="#F2E3B5"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M293.024 233.969C293.256 236.231 295.149 237.975 297.476 237.975C299.961 237.975 301.976 235.96 301.976 233.475C301.976 231.151 300.215 229.239 297.955 229L299.775 230.836C300.511 231.478 300.976 232.422 300.976 233.475C300.976 235.408 299.409 236.975 297.476 236.975C296.465 236.975 295.555 236.547 294.916 235.862L294.909 235.87L293.024 233.969Z"
          fill="#F2E3B5"
        />
        <Rect x={292} y={233} width={5} height={3} fill="white" />
        <Path d="M293 235.5L296 235.5" stroke="#F2E3B5" strokeLinecap="round" />
        <Path
          d="M297.557 228.041L301 230L300 231L296.486 229.731L297.557 228.041Z"
          fill="white"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M300 231C300.552 231 301 230.552 301 230C301 229.448 300.552 229 300 229C299.448 229 299 229.448 299 230C299 230.552 299.448 231 300 231ZM300 230.5C300.276 230.5 300.5 230.276 300.5 230C300.5 229.724 300.276 229.5 300 229.5C299.724 229.5 299.5 229.724 299.5 230C299.5 230.276 299.724 230.5 300 230.5Z"
          fill="#F2E3B5"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M301.893 226.234L300.319 225L296 230.509L297.574 231.743L298.474 230.595C298.182 230.321 298 229.932 298 229.5C298 228.672 298.672 228 299.5 228C299.802 228 300.083 228.089 300.318 228.243L301.893 226.234Z"
          fill="#F2E3B5"
        />
        <Circle cx={296.5} cy={231.5} r={0.5} fill="#F2E3B5" />
        <Path
          d="M302.234 223L303.808 224.234L302 226L301 225L302.234 223Z"
          fill="#F2E3B5"
        />
        <Circle cx={49} cy={327} r={25} fill="#F2E3B5" />
        <Path
          d="M72.9167 326.958C72.9167 340.19 62.1902 350.917 48.9583 350.917C35.7265 350.917 25 340.19 25 326.958C25 313.727 35.7265 303 48.9583 303C62.1902 303 72.9167 313.727 72.9167 326.958Z"
          fill="#FAF8F5"
        />
        <Ellipse cx={49.5} cy={327.5} rx={21.5} ry={21.5} fill="white" />
        <Path
          d="M62.5 328.5C62.5 335.663 56.4731 341.5 49 341.5C41.5269 341.5 35.5 335.663 35.5 328.5C35.5 321.337 41.5269 315.5 49 315.5C56.4731 315.5 62.5 321.337 62.5 328.5Z"
          fill="white"
          stroke="#F2E3B5"
        />
        <Path
          d="M49.6666 315.643C49.6666 315.643 50.7748 318.53 50.9999 320.786C51.299 323.785 51.1945 326.779 50.9999 329.786C50.8038 332.816 50.5321 333.562 48.9999 336.215C47.6449 338.56 45 340.714 45 340.714"
          stroke="#F2E3B5"
          strokeLinecap="round"
        />
        <Path
          d="M36 324C36 324 39.2308 322.709 41.3481 322.218C43.9242 321.62 45.3738 321.142 48.0331 321.029C50.6539 320.918 52.1549 321.126 54.7182 321.623C57.4205 322.148 61 323.703 61 323.703"
          stroke="#F2E3B5"
        />
        <Path
          d="M38.4981 336.856C38.4935 337.132 38.7145 337.355 38.9917 337.355C39.269 337.356 39.4974 337.133 39.502 336.858L38.4981 336.856ZM41.6668 329.143L42.0856 329.411L41.6668 329.143ZM47.0001 320.143L47.4907 320.03L47.4907 320.03L47.0001 320.143ZM45.6668 324.643L46.1115 324.867L45.6668 324.643ZM39.6668 333L39.205 332.812L39.6668 333ZM44.3334 316.286C44.0054 316.668 44.0053 316.668 44.0052 316.668C44.0052 316.668 44.0052 316.667 44.0051 316.667C44.0051 316.667 44.0051 316.667 44.0051 316.667C44.0052 316.667 44.0054 316.668 44.0057 316.668C44.0064 316.668 44.0075 316.669 44.0092 316.671C44.0126 316.674 44.018 316.678 44.0254 316.685C44.04 316.697 44.0623 316.717 44.0913 316.743C44.1494 316.795 44.2339 316.872 44.3374 316.971C44.5446 317.169 44.8254 317.454 45.1186 317.797C45.7165 318.497 46.3185 319.386 46.5096 320.256L47.4907 320.03C47.2468 318.92 46.5155 317.88 45.8887 317.147C45.5696 316.773 45.2653 316.465 45.0404 316.249C44.9278 316.141 44.8347 316.056 44.7689 315.998C44.736 315.968 44.71 315.946 44.6917 315.93C44.6826 315.922 44.6754 315.916 44.6703 315.912C44.6678 315.909 44.6658 315.908 44.6643 315.906C44.6635 315.906 44.6629 315.905 44.6624 315.905C44.6622 315.905 44.662 315.904 44.6618 315.904C44.6617 315.904 44.6616 315.904 44.6616 315.904C44.6615 315.904 44.6614 315.904 44.3334 316.286ZM46.5096 320.256C46.8533 321.821 46.1274 322.691 45.2221 324.419L46.1115 324.867C46.9155 323.333 47.9325 322.041 47.4907 320.03L46.5096 320.256ZM45.2221 324.419C44.7259 325.366 44.1073 325.952 43.4132 326.566C42.7205 327.179 41.9362 327.832 41.248 328.875L42.0856 329.411C42.6861 328.501 43.3606 327.937 44.0752 327.305C44.7883 326.674 45.5254 325.986 46.1115 324.867L45.2221 324.419ZM41.248 328.875C40.2856 330.333 39.8743 331.244 39.205 332.812L40.1286 333.188C40.7892 331.641 41.1727 330.794 42.0856 329.411L41.248 328.875ZM39.205 332.812C38.8617 333.616 38.689 334.639 38.5995 335.431C38.554 335.833 38.5287 336.187 38.5148 336.441C38.5078 336.569 38.5037 336.671 38.5012 336.742C38.5 336.778 38.4993 336.806 38.4988 336.825C38.4985 336.835 38.4984 336.842 38.4983 336.848C38.4982 336.85 38.4982 336.852 38.4981 336.854C38.4981 336.855 38.4981 336.855 38.4981 336.856C38.4981 336.856 38.4981 336.856 38.4981 336.856C38.4981 336.856 38.4981 336.856 38.4981 336.856C38.4981 336.856 38.4981 336.856 39 336.857C39.502 336.858 39.502 336.858 39.502 336.858C39.502 336.858 39.502 336.858 39.502 336.858C39.502 336.858 39.502 336.858 39.502 336.858C39.502 336.858 39.502 336.858 39.502 336.857C39.502 336.856 39.502 336.855 39.5021 336.853C39.5022 336.849 39.5023 336.843 39.5025 336.835C39.5029 336.818 39.5036 336.793 39.5047 336.761C39.5069 336.696 39.5108 336.6 39.5173 336.481C39.5305 336.241 39.5543 335.906 39.5972 335.527C39.6843 334.757 39.8449 333.853 40.1286 333.188L39.205 332.812Z"
          fill="#F2E3B5"
        />
        <Path
          d="M57 318.215C57 318.215 55.973 319.703 55.6666 320.786C55.2556 322.239 55.5059 323.145 55.6666 324.643C56.0055 327.802 58.1056 329.189 58.3333 332.357C58.4963 334.625 57.6666 338.143 57.6666 338.143"
          stroke="#F2E3B5"
        />
        <Circle cx={53} cy={260} r={25} fill="#F2E3B5" />
        <Path
          d="M76.9166 259.958C76.9166 273.19 66.1901 283.917 52.9583 283.917C39.7264 283.917 28.9999 273.19 28.9999 259.958C28.9999 246.727 39.7264 236 52.9583 236C66.1901 236 76.9166 246.727 76.9166 259.958Z"
          fill="#FAF8F5"
        />
        <Circle cx={53.5} cy={260.5} r={21.5} fill="white" />
        <Path
          d="M40.0358 255.608C39.8272 254.831 40.0882 254.278 40.5358 253.608C40.9539 252.983 41.4245 252.834 42.0569 252.427C43.1433 251.728 45.0781 251.08 45.0781 251.08L48.873 259.588L50.7704 263.843C50.7704 263.843 51.3441 266.849 51.1573 268.771C50.9891 270.501 50.0359 273.08 50.0359 273.08L48.0359 273.08C48.0359 273.08 46.9505 271.64 46.5358 270.58C45.8918 268.933 46.0542 267.848 46.0358 266.08C46.0154 264.129 47.1255 262.968 46.5358 261.109C46.1916 260.023 45.8641 259.39 45.0358 258.609C44.5237 258.125 44.1763 257.901 43.5358 257.609C42.8034 257.274 42.2379 257.502 41.5358 257.109C40.8133 256.703 40.2505 256.409 40.0358 255.608Z"
          fill="#F2E3B5"
        />
        <Path
          d="M60 261.573C60 264.345 59.6251 268.092 59.0074 270.019C58.6426 271.157 57.5184 273 57.5184 273C56.5259 273 56.6207 273 56.0295 273C55.4384 273 54.0443 273 54.0443 273C54.0443 273 52.99 271.315 52.5554 269.522C52.1782 267.966 52.3128 263.055 52.1503 261.722C52.1503 262.938 52.217 262.712 52.1503 261.722C52.1503 258.32 52.1146 255.005 53 253C53.2587 252.414 52.6665 254.024 52.974 256.717C53.1997 258.693 53.0107 261.165 53.2569 263.176C53.564 265.683 54.9116 267.647 55.2422 267.647C55.5728 267.647 55.7385 268.144 57.2274 265.66C58.22 263.672 58.3164 263.742 58.5499 261.722C58.8475 259.146 58.2985 252.558 58.5499 253.127C59.1189 254.415 59.5554 256.131 59.7948 258.095C59.9278 259.188 60 260.357 60 261.573Z"
          fill="#F2E3B5"
        />
        <Path
          d="M46 256.482L52.0724 253L53 254.5L46.9949 258.217L46 256.482Z"
          fill="#F2E3B5"
        />
        <Path
          d="M47.5 248.5L53.5298 253.334L52.2289 254.853L46 249.519L47.5 248.5Z"
          fill="#F2E3B5"
        />
        <Path
          d="M60 250L52.5 257L52.4167 254.477L57.6857 249L60 250Z"
          fill="#F2E3B5"
        />
        <Path
          d="M59 255.5L53 250L53.5 248L58.5001 253L59 255.5Z"
          fill="#F2E3B5"
        />
        <Path
          d="M46.5001 248L52.5 248L52.5 250L46 249.5L46.5001 248Z"
          fill="#F2E3B5"
        />
        <Path
          d="M52.5 243.5L60.4972 243.359L59.6937 246L53.0375 246L52.5 243.5Z"
          fill="#F2E3B5"
        />
        <Path d="M53 247L60 244.5L59.5 247L54 249L53 247Z" fill="#F2E3B5" />
        <Path
          d="M53.5 248L59.5 248L60.0389 250L53.0403 250.141L53.5 248Z"
          fill="#F2E3B5"
        />
        <Path
          d="M46 244.5L52.5 248L52.5 250L46.5 247L46 244.5Z"
          fill="#F2E3B5"
        />
        <Circle cx={326} cy={272} r={25} fill="#F2E3B5" />
        <Path
          d="M349.917 271.958C349.917 285.19 339.19 295.917 325.958 295.917C312.727 295.917 302 285.19 302 271.958C302 258.727 312.727 248 325.958 248C339.19 248 349.917 258.727 349.917 271.958Z"
          fill="#FAF8F5"
        />
        <Circle cx={326.5} cy={272.5} r={21.5} fill="white" />
        <Path
          d="M320.5 264.5L322 263.5H330.5L332.5 264.5L332 270L332.5 275L333.5 280L334 282H319L319.5 280L321 275L321.5 269.5L320.5 264.5Z"
          fill="#F2E3B5"
        />
        <Path
          d="M330.499 263.502L331.5 264L324.311 276.757L323.436 276.273L330.499 263.502Z"
          fill="white"
        />
        <Rect
          x={333.743}
          y={276.074}
          width={1}
          height={14.7385}
          transform="rotate(90.2844 333.743 276.074)"
          fill="white"
        />
        <Rect
          x={328.183}
          y={276}
          width={0.980124}
          height={4.00002}
          transform="rotate(33.07 328.183 276)"
          fill="white"
        />
        <Rect
          x={328}
          y={276.642}
          width={0.980124}
          height={4.00002}
          transform="rotate(-40.8461 328 276.642)"
          fill="white"
        />
        <Path
          d="M321.006 264.505C324.825 265.349 318.976 281.723 318.976 281.723L315.59 280.974C315.59 280.974 317.186 263.661 321.006 264.505Z"
          fill="#DECFA2"
        />
        <Path
          d="M331.958 264.443C335.789 263.653 337.14 280.987 337.14 280.987L333.745 281.687C333.745 281.687 328.127 265.233 331.958 264.443Z"
          fill="#DECFA2"
        />
        <Path
          d="M322 263.5L323 263.501L327.443 270.915L326.577 271.416L322 263.5Z"
          fill="white"
        />
        <Rect x={203} y={169} width={15} height={10} rx={1} fill="#F2E3B5" />
        <Rect x={204} y={170} width={13} height={6} fill="white" />
        <Rect
          x={209.15}
          y={177.15}
          width={2.7}
          height={0.7}
          rx={0.35}
          fill="#F2E3B5"
          stroke="white"
          strokeWidth={0.3}
        />
        <Path
          d="M209.5 180H211.5L212.012 181.025H209.012L209.5 180Z"
          fill="#F2E3B5"
        />
        <Path d="M207 182H214L215 183H206L207 182Z" fill="#F2E3B5" />
        <Circle cx={335} cy={333} r={25} fill="#F2E3B5" />
        <Path
          d="M358.917 332.958C358.917 346.19 348.19 356.917 334.958 356.917C321.727 356.917 311 346.19 311 332.958C311 319.727 321.727 309 334.958 309C348.19 309 358.917 319.727 358.917 332.958Z"
          fill="#FAF8F5"
        />
        <Circle cx={335.5} cy={333.5} r={21.5} fill="white" />
        <Ellipse cx={330.5} cy={329.5} rx={8.5} ry={7.5} fill="#F2E3B5" />
        <Path
          d="M348.58 340.849C346.87 344.622 342.018 346.109 337.742 344.171C334.979 342.919 333.133 340.543 332.634 338C335 337.5 336.713 336.287 338 335C340 333 340.5 332 340.227 329.66C341.453 329.683 342.717 329.957 343.934 330.509C348.21 332.447 350.29 337.076 348.58 340.849Z"
          fill="#F2E3B5"
        />
        <Path
          d="M323.391 332.73L326.557 335.684L322.415 336.948L323.391 332.73Z"
          fill="#F2E3B5"
        />
        <Path
          d="M348.296 341.003L348.775 345.307L344.808 343.569L348.296 341.003Z"
          fill="#F2E3B5"
        />
        <Path
          d="M342.603 334.139L340.48 341.453"
          stroke="white"
          strokeLinecap="round"
        />
        <Path
          d="M344.642 341.453L342.52 334.139"
          stroke="white"
          strokeLinecap="round"
        />
        <Line x1={341} y1={338.5} x2={344} y2={338.5} stroke="white" />
        <Path d="M327 327.5H334" stroke="white" strokeLinecap="round" />
        <Path
          d="M331 325C331 324.724 330.776 324.5 330.5 324.5C330.224 324.5 330 324.724 330 325H331ZM330 325V328H331V325H330Z"
          fill="white"
        />
        <Path
          d="M327.922 328C328.589 330.99 330.318 332.988 332.922 333"
          stroke="white"
          strokeLinecap="round"
        />
        <Path
          d="M333 328C332.334 330.99 330.604 332.988 328 333"
          stroke="white"
          strokeLinecap="round"
        />
        <Path
          d="M208.5 306.5C206.5 317 193.947 325 182.349 325C170.751 325 168.849 328.5 161.349 295C153.849 261.5 191 249.5 193.349 271.5C195.698 293.5 210.5 296 208.5 306.5Z"
          fill="#A64F3C"
        />
        <Path
          d="M208.254 306.453C207.27 311.62 203.684 316.194 198.882 319.481C194.083 322.768 188.094 324.75 182.349 324.75C181.271 324.75 180.274 324.78 179.353 324.808C179.032 324.818 178.721 324.827 178.418 324.835C177.242 324.865 176.201 324.871 175.255 324.775C173.378 324.584 171.883 323.997 170.501 322.399C169.104 320.783 167.813 318.12 166.401 313.744C164.991 309.372 163.468 303.319 161.593 294.945C157.866 278.3 165.233 267.042 173.77 262.66C178.045 260.465 182.599 260 186.212 261.412C189.81 262.82 192.522 266.107 193.1 271.527C194.282 282.592 198.6 288.762 202.36 293.468C202.726 293.926 203.085 294.369 203.435 294.8C204.887 296.59 206.178 298.18 207.088 299.817C208.209 301.831 208.741 303.897 208.254 306.453Z"
          stroke="black"
          strokeOpacity={0.22}
          strokeWidth={0.5}
        />
        <Path
          d="M171.5 301.5C169.534 310.888 175.404 319.932 164 319.932C152.596 319.932 147.572 289.432 150.572 278.432C153.572 267.432 174.351 259.665 176.66 279.335C178.97 299.004 173.466 292.112 171.5 301.5Z"
          fill="#A64F3C"
        />
        <Path
          d="M171.255 301.449C170.757 303.827 170.757 306.177 170.852 308.351C170.879 308.962 170.914 309.556 170.947 310.133C171.033 311.623 171.112 312.996 171.039 314.221C170.939 315.915 170.55 317.259 169.537 318.188C168.521 319.12 166.826 319.682 164 319.682C161.273 319.682 158.886 317.859 156.877 314.855C154.871 311.857 153.277 307.731 152.127 303.245C150.978 298.761 150.277 293.934 150.051 289.544C149.824 285.149 150.073 281.21 150.813 278.497C151.547 275.809 153.372 273.303 155.748 271.36C158.123 269.417 161.032 268.051 163.911 267.63C166.788 267.208 169.621 267.731 171.875 269.544C174.129 271.357 175.84 274.49 176.412 279.364C177.567 289.2 176.752 292.306 175.479 294.13C175.142 294.612 174.758 295.019 174.357 295.443C173.239 296.625 171.989 297.947 171.255 301.449Z"
          stroke="black"
          strokeOpacity={0.22}
          strokeWidth={0.5}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M156.5 308C150.701 308 146 312.701 146 318.5V330.709V338.259V354H167V338.259V330.709V318.5C167 312.701 162.299 308 156.5 308Z"
          fill="#BF7B54"
        />
        <Path
          d="M150.5 342.5C149.825 321.392 150.373 314.26 154 315"
          stroke="#9B6343"
        />
        <Path
          d="M187.5 287C187.5 296.665 187.008 302 179 302C170.992 302 163.5 296.665 163.5 287C163.5 277.335 165.992 271 174 271C182.008 271 187.5 277.335 187.5 287Z"
          fill="#F2E5D5"
        />
        <Path
          d="M165 287C165 289.209 164.933 292.5 163 292.5C161.067 292.5 159.5 289.209 159.5 287C159.5 284.791 160.067 283.5 162 283.5C163.933 283.5 165 284.791 165 287Z"
          fill="#F2E5D5"
        />
        <Path
          d="M163.5 286C161.836 283.527 160.578 285.163 160.5 286"
          stroke="black"
          strokeWidth={0.5}
          strokeLinecap="round"
        />
        <Ellipse cx={181} cy={286.5} rx={1} ry={1.5} fill="black" />
        <Ellipse cx={175} cy={286.5} rx={1} ry={1.5} fill="black" />
        <Path
          d="M172 283C174.016 281.207 174.919 281.018 177 283"
          stroke="black"
          strokeWidth={0.5}
          strokeLinecap="round"
        />
        <Path
          d="M179 283C181.016 281.346 181.919 281.101 184 283"
          stroke="black"
          strokeWidth={0.5}
          strokeLinecap="round"
        />
        <Path
          d="M174.218 295C177.555 296.787 179.438 298.073 182.635 296.465"
          stroke="black"
          strokeWidth={0.5}
          strokeLinecap="round"
        />
        <Path
          d="M177.937 287.561L177.937 287.561L177.937 287.561L177.481 287.733L178.287 293.476L178.322 293.724L178.57 293.688L178.534 293.441C178.57 293.688 178.571 293.688 178.571 293.688L178.571 293.688L178.572 293.688L178.574 293.688L178.585 293.686L178.623 293.68C178.657 293.675 178.706 293.667 178.767 293.657C178.89 293.636 179.063 293.605 179.264 293.565C179.666 293.484 180.189 293.362 180.66 293.202C180.895 293.121 181.123 293.03 181.319 292.925C181.51 292.823 181.69 292.698 181.81 292.545C181.937 292.381 182.004 292.172 181.924 291.944C181.853 291.738 181.676 291.561 181.438 291.403C180.589 290.84 179.716 289.887 179.046 289.059C178.714 288.647 178.436 288.272 178.241 287.999C178.144 287.863 178.068 287.753 178.016 287.677C177.99 287.639 177.97 287.61 177.957 287.59L177.942 287.568L177.938 287.562L177.937 287.561L177.937 287.561L177.937 287.561Z"
          fill="#F2E5D5"
          stroke="black"
          strokeWidth={0.5}
        />
        <Path
          d="M177.081 286.84C177.081 286.84 179.221 290.077 181.328 291.449C183.434 292.821 177.994 293.645 177.994 293.645L177.081 286.84Z"
          fill="#F2E5D5"
        />
        <Ellipse
          cx={170.048}
          cy={291.193}
          rx={2.83265}
          ry={2.76213}
          transform="rotate(41.4852 170.048 291.193)"
          fill="#F0A38B"
          fillOpacity={0.19}
        />
        <Mask
          id="mask0_415_778"
          style={{
            maskType: "alpha"
          }}
          maskUnits="userSpaceOnUse"
          x={163}
          y={271}
          width={25}
          height={32}
        >
          <Path
            d="M187.5 287C187.5 296.665 187.508 303 179.5 303C171.492 303 163.5 296.665 163.5 287C163.5 277.335 165.992 271 174 271C182.008 271 187.5 277.335 187.5 287Z"
            fill="#F2E5D5"
          />
        </Mask>
        <G mask="url(#mask0_415_778)">
          <Ellipse
            cx={186.952}
            cy={289.946}
            rx={2.83265}
            ry={2.76213}
            transform="rotate(41.4852 186.952 289.946)"
            fill="#F0A38B"
            fillOpacity={0.19}
          />
        </G>
        <Path
          d="M178.932 267.041L188.553 282C178.932 275 172.817 276.202 163.04 275.91L167.324 269.193L178.932 267.041Z"
          fill="#A64F3C"
        />
        <Ellipse cx={164.5} cy={278.5} rx={6.5} ry={5.5} fill="#A64F3C" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M195.83 313.952C194.977 309.976 191.068 306 187.317 306C184.169 306 181.111 307.148 179.744 309.547C176.207 312.137 173.64 312.169 169.51 308.5L169.466 308.505C167.788 307.271 165.609 306.5 163.147 306.5C157.482 306.5 151 307.082 151 311.5C151 313.393 151.128 315.225 151.72 316.7C151.676 319.885 155.69 336.658 160.241 350.334L205.322 349.516L195.83 313.952Z"
          fill="#D9D9D9"
        />
        <Path
          d="M169 297L179 300.5C180.135 305.257 179.328 307.615 179.5 310C179.695 307.931 179.305 312.069 179.5 310C174.926 314.011 172.575 314.205 169 308.5V307.298L169 302.601V297Z"
          fill="#F2E5D5"
        />
        <Path
          d="M179.427 301.999C179.701 302.811 179.922 303.602 179.927 303.999C179.931 304.395 175.335 303.374 172.5 301.5C175.171 301.926 176.677 302.099 179.427 301.999Z"
          fill="#231F20"
        />
        <Path
          d="M168 313C172.846 316.816 175.486 317.16 180 313"
          stroke="#5D5B5B"
          strokeWidth={0.3}
          strokeLinecap="round"
        />
        <Path
          d="M169.249 327.464C173.508 339.498 185.27 342.635 180 344.5C174.73 346.365 158.66 361.891 154.4 349.857C150.141 337.823 146.724 310.918 151.994 309.053C157.264 307.188 164.989 315.431 169.249 327.464Z"
          fill="#D9D9D9"
        />
        <Path
          d="M200.684 326.944C204.699 338.287 208.274 348.487 204 350C199.726 351.513 193.367 358.452 189.352 347.108C185.336 335.765 185.078 309.013 189.352 307.5C193.625 305.987 196.669 315.6 200.684 326.944Z"
          fill="#D9D9D9"
        />
        <Rect
          x={195.964}
          y={338.102}
          width={21}
          height={10}
          transform="rotate(17.3146 195.964 338.102)"
          fill="#D9D9D9"
        />
        <Path
          d="M193.988 347.517C194.01 349.459 192.697 351.049 191.055 351.068C189.412 351.087 188.063 349.528 188.04 347.585C188.018 345.643 189.358 344.019 191 344C192.642 343.981 193.966 345.575 193.988 347.517Z"
          fill="#3E3939"
        />
        <Path
          d="M158.575 339L189.075 344V353C189.075 353 176 356 161 351.5C146 347 158.575 339 158.575 339Z"
          fill="#D9D9D9"
        />
        <Path
          d="M161 321.5C161 321.5 161.5 322.5 163 324.5C164.5 326.5 165.5 335 165.5 335C165.5 335 166 338.5 166.5 338.909C167 339.319 178.75 341.455 178.75 341.455L191.5 344L178.75 343C178.75 343 173 342.5 171.5 342.5C170 342.5 168 342 167.5 342C167 342 166.5 342 165 341.5C163.5 341 163.5 340 163.5 340L162 331L161 321.5Z"
          fill="#B8B8B8"
        />
        <Path
          d="M160.341 321.043C160.873 320.229 162.985 337.453 163.229 340.123C163.474 342.793 172.756 342.526 190.789 344.043"
          stroke="#5D5B5B"
          strokeWidth={0.2}
          strokeLinecap="round"
        />
        <Path
          d="M160.5 321C161.032 320.186 163.143 337.41 163.388 340.08C163.632 342.75 172.915 342.483 190.947 344"
          stroke="#5D5B5B"
          strokeWidth={0.2}
          strokeLinecap="round"
        />
        <Path
          d="M193.988 347.551C194.011 349.493 192.697 351.083 191.055 351.102C189.413 351.121 188.063 349.561 188.041 347.619C188.018 345.677 189.358 344.053 191 344.034C192.643 344.015 193.966 345.609 193.988 347.551Z"
          fill="#3E3939"
        />
        <Path
          d="M189.096 320.972C192.342 329.985 193.85 335.266 196.096 344.972"
          stroke="#5D5B5B"
          strokeWidth={0.3}
          strokeLinecap="round"
        />
        <Path
          d="M208.5 349C208.5 350.657 195.142 351 191 351C186.858 351 187.821 346.004 188.5 346C189.179 345.996 198.679 344.5 199.179 344.5C199.679 344.5 208.5 347.343 208.5 349Z"
          fill="#F2E5D5"
        />
        <Path
          d="M199.08 345.817C199.028 345.798 198.97 345.824 198.951 345.875C198.932 345.927 198.958 345.985 199.01 346.004L199.08 345.817ZM199.01 346.004C202.737 347.401 204.459 348.252 206.988 349.993L207.101 349.828C204.555 348.076 202.817 347.218 199.08 345.817L199.01 346.004Z"
          fill="#898580"
        />
        <Path
          d="M198.035 347.19C197.983 347.171 197.926 347.197 197.906 347.249C197.887 347.3 197.913 347.358 197.965 347.377L198.035 347.19ZM197.965 347.377C201.692 348.774 203.414 349.625 205.943 351.366L206.057 351.201C203.511 349.449 201.773 348.591 198.035 347.19L197.965 347.377Z"
          fill="#898580"
        />
        <G filter="url(#filter0_d_415_778)">
          <Rect x={81} y={349} width={221} height={6} rx={2} fill="#734E38" />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_415_778">
          <Rect width={393} height={852} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
