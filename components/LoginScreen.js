import * as React from "react";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  Path,
  G,
  Rect,
  Circle,
  Ellipse,
} from "react-native-svg";

function LoginScreen(props) {
  return (
    <Svg width={375} height={812} viewBox="0 0 375 812" {...props}>
      <Defs>
        <LinearGradient
          id="prefix__b"
          x1={0.001}
          y1={0.5}
          x2={1}
          y2={0.5}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="gray" stopOpacity={0.251} />
          <Stop offset={0.54} stopColor="gray" stopOpacity={0.122} />
          <Stop offset={1} stopColor="gray" stopOpacity={0.102} />
        </LinearGradient>
        <ClipPath id="prefix__a">
          <Path d="M0 0h375v812H0z" />
        </ClipPath>
      </Defs>
      <G data-name="index(main) Screen" clipPath="url(#prefix__a)">
        {}
        {}
        <Path
          data-name="Path 1"
          d="M83.272 259.825l-.416.833a180.956 180.956 0 00-7.355 17.069 13.024 13.024 0 00-.971 4.718q0 5.971 7.216 9.02a46.649 46.649 0 008.6.833 38.1 38.1 0 0013.739-2.5 52.4 52.4 0 0016.653-9.992v-1.249a43.02 43.02 0 00-.971-9.437q-1.114-4.857-2.5-9.437l7.494-17.347a42.812 42.812 0 014.441 18.873 47.379 47.379 0 01-.694 8.049 63.466 63.466 0 01-10.269 25.4 40.138 40.138 0 01-19.29 15.265 32 32 0 01-11.1 2.22 18.735 18.735 0 01-8.743-2.082q-8.326-4.024-9.437-17.208v-2.22q0-13.041 12.073-35.249 1.665-3.05 3.678-6.522t3.822-6.661l2.082 1.11.278.139 10.824 7.355q-2.22 4.163-4.441 8.118t-4.441 7.841z"
          fill="#4f3c75"
        />
        <Path
          data-name="Path 2"
          d="M157.929 227.061q-6.661 1.249-13.322 2.429t-13.323 2.428l8.326-16.514q14.433-2.633 26.645-5z"
          fill="#4f3c75"
        />
        <Path
          data-name="Path 3"
          d="M161.398 246.351q0 6.106-3.678 15.126t-10.2 12.92q-8.326 4.718-27.894 5.967l1.943-18.6h.139q21.51-1.114 28.588-3.608t10.686-12.069z"
          fill="#4f3c75"
        />
        <Path
          data-name="Path 4"
          d="M247.196 230.361l-19.973-29.958-.024-.031-.108-.146a2.494 2.494 0 00-4 .146l-.024.031-19.973 29.958a2.5 2.5 0 00.312 3.15 31.592 31.592 0 019.02 18.457 12.785 12.785 0 00-4.76 9.94 2.491 2.491 0 002.5 2.467h29.958a2.491 2.491 0 002.5-2.467 12.66 12.66 0 00-3.636-8.916 13.271 13.271 0 00-1.117-1.013 31.613 31.613 0 019.02-18.457 2.5 2.5 0 00.305-3.161zm-22.551-1.065a1.971 1.971 0 10.014 0zm-11.572 30.073a7.63 7.63 0 017.064-5.159h9.988a7.63 7.63 0 017.064 5.159zm20.088-9.77a12.143 12.143 0 00-3.036-.382h-9.974a12.143 12.143 0 00-3.036.382 36.63 36.63 0 00-8.764-18.127l14.308-21.441v14.651a7.49 7.49 0 104.992 0v-14.648l14.3 21.441a36.63 36.63 0 00-8.774 18.127z"
          fill="#4f3c75"
        />
        <Path
          data-name="Path 5"
          d="M218.584 272.947a30.315 30.315 0 014.278-1.9 41.544 41.544 0 004.354-7.959c.278-.659.538-1.3.794-1.932-.548.055-1.1.1-1.651.128v1a1.735 1.735 0 11-3.469 0v-1.069c-4.018-.326-7.979-1.1-12.021-1.138a1.737 1.737 0 01-.552-.087 126.2 126.2 0 01-16.126 1.7q-2.224.139-4.3.139a85.007 85.007 0 01-14.02-1.11q-8.878-1.388-12.347-5.69a12.115 12.115 0 01-2.543-5.44 45.917 45.917 0 01-8.819 8.753 1.735 1.735 0 01-1.5.378 20.816 20.816 0 001.343 6.311q2.775 7.633 11.175 10.824a56.531 56.531 0 0018.662 3.469 29.037 29.037 0 002.918.139 109.179 109.179 0 0017.482-1.665 77 77 0 0015.574-3.972 1.572 1.572 0 01.768-.879z"
          fill="#4f3c75"
        />
        <Path
          data-name="Path 6"
          d="M233.548 267.913c2.887-.888 9.53-2.657 9.135-6.692a1.761 1.761 0 010-.43 44.743 44.743 0 00-.486-1.766 2.1 2.1 0 01-.847 0 22.6 22.6 0 00-1.735-.222.06.06 0 010 .024 1.756 1.756 0 01-1.735 1.735 3.471 3.471 0 00-.465.028l-.271.062c-.17.042-.347.087-.507.139l-.225.08.049-.024a1.759 1.759 0 01-2.21-.552c-2.64.347-5.253.829-7.9.971v1a1.735 1.735 0 01-3.469 0v-1.051c-.448-.038-.9-.076-1.346-.121l-1.928 11.311c4.458-2.171 9.211-3.032 13.94-4.492z"
          fill="#4f3c75"
        />
        <Path
          data-name="Path 7"
          d="M272.116 270.47l.139-.139q2.082-.833 5.551-2.151t7.355-2.706q3.882-1.388 8.049-2.914t7.91-2.776l-4.024 6.384q-7.494 2.64-15.335 5.482a145.124 145.124 0 00-14.086 5.9v.139z"
          fill="#ffeed6"
        />
        <Path
          data-name="Path 8"
          d="M276.005 193.454l10.269-16.237 4.024 58.979-10.269 16.237z"
          fill="#4f3c75"
        />
        <Path
          data-name="Path 9"
          d="M219.5 171.877v-.277q-1.114-.968-8.6-1.8a65.315 65.315 0 00-3.886-.139q-4.3 0-6.106 1.249-.694.555-1.873 1.665a6.332 6.332 0 01-1.6 1.249h-.139q0-.968 1.8-5.273a35.8 35.8 0 015.135-8.465q1.808-2.082 8.465-2.082h2.5q8.878.416 10.963 2.637a5.17 5.17 0 011.388 3.469 13.656 13.656 0 01-1.943 6.245 21.8 21.8 0 01-10.686 10.269 29.41 29.41 0 01-6.453 2.151 57.117 57.117 0 01-6.592.9l-1.388-.139q.416-1.114 8.6-5.065t10.415-6.594z"
          fill="#ffeed6"
        />
        <Path
          data-name="Path 10"
          d="M139.216 187.014q2.217-.833 5.62-2.082t7.286-2.706q3.882-1.457 8.049-2.984t7.771-2.775l-4.024 6.384q-7.494 2.633-15.2 5.482t-14.086 5.9z"
          fill="#ffeed6"
        />
        <Path
          data-name="Path 11"
          d="M224.554 195.934q-1.863-2.945-3.705-5.766t-3.608-5.738l8.5-5.551q1.894 2.838 3.674 5.7t3.657 5.811z"
          fill="#4f3c75"
        />
        <G data-name="Group 2" transform="translate(15.37 128)">
          <Path
            data-name="Path 17"
            d="M196.907 43.493c-21.169-.736-41.33-7.569-60.582-15.046S97.994 12.685 77.339 8.724C64.05 6.176 48.853 5.816 38.145 12.94c-10.3 6.869-13.633 18.693-15.425 29.676-1.344 8.262-2.136 16.956 1.554 24.692 2.561 5.371 7.111 9.884 10.257 15.029 10.944 17.9 3.209 39.97-8.655 57.446-5.56 8.2-12.017 16.027-16.312 24.747s-6.28 18.726-2.525 27.629c3.725 8.831 12.6 15.451 22.212 20.112 19.52 9.469 42.521 12.177 64.962 13.711 49.658 3.4 99.584 1.927 149.372.455 18.428-.546 36.938-1.1 55.064-3.948 10.064-1.583 20.459-4.092 27.766-10.156 9.276-7.7 11.576-20.731 5.361-30.38-10.427-16.187-39.25-20.207-46.547-37.582-4.013-9.561.108-20.211 5.937-29.081 12.508-19.023 33.47-35.714 34.576-57.459.759-14.938-9.319-29.892-24.9-36.96-16.335-7.405-38.982-6.476-51.025 5.786-12.416 12.626-34.216 17.483-52.91 16.836z"
            fill="#6c63ff"
            opacity={0.1}
          />
          <G opacity={0.6}>
            <Path
              data-name="Path 18"
              d="M84.499 80.368s-8.992-15.926-22.53-20.515a27.72 27.72 0 01-14.019-10.5 46.535 46.535 0 01-4.141-7.448"
              fill="none"
              stroke="#535461"
              strokeMiterlimit={10}
              strokeWidth={2}
            />
            <Path
              data-name="Path 19"
              d="M35.279 38.963c1.541 1.5 8.727 3.045 8.727 3.045s-1.763-7.134-3.307-8.632a3.892 3.892 0 10-5.42 5.587z"
              fill="#6c63ff"
            />
            <Path
              data-name="Path 20"
              d="M39.342 51.882c2.11.419 8.982-2.188 8.982-2.188s-5.358-5.031-7.467-5.449a3.893 3.893 0 00-1.514 7.637z"
              fill="#6c63ff"
            />
            <Path
              data-name="Path 21"
              d="M54.144 65.848c2.031-.7 6.65-6.421 6.65-6.421s-7.166-1.635-9.2-.935a3.893 3.893 0 102.55 7.356z"
              fill="#6c63ff"
            />
            <Path
              data-name="Path 22"
              d="M67.72 73.898c2.123-.35 7.641-5.207 7.641-5.207s-6.784-2.826-8.906-2.476a3.893 3.893 0 101.266 7.683z"
              fill="#6c63ff"
            />
            <Path
              data-name="Path 23"
              d="M54.316 44.111c0 2.152-3.889 8.386-3.889 8.386s-3.9-6.215-3.9-8.383a3.892 3.892 0 017.785 0z"
              fill="#6c63ff"
            />
            <Path
              data-name="Path 24"
              d="M70.081 53.727c-.654 2.054-6.215 6.839-6.215 6.839s-1.851-7.114-1.21-9.158a3.893 3.893 0 117.431 2.326z"
              fill="#6c63ff"
            />
            <Path
              data-name="Path 25"
              d="M84.113 65.175c-.285 2.133-4.975 7.794-4.975 7.794s-3.029-6.7-2.741-8.831a3.893 3.893 0 017.716 1.037z"
              fill="#6c63ff"
            />
            <Path
              data-name="Path 26"
              d="M35.279 38.963c1.541 1.5 8.727 3.045 8.727 3.045s-1.763-7.134-3.307-8.632a3.892 3.892 0 10-5.42 5.587z"
              opacity={0.25}
            />
            <Path
              data-name="Path 27"
              d="M39.342 51.882c2.11.419 8.982-2.188 8.982-2.188s-5.358-5.031-7.467-5.449a3.893 3.893 0 00-1.514 7.637z"
              opacity={0.25}
            />
            <Path
              data-name="Path 28"
              d="M54.144 65.848c2.031-.7 6.65-6.421 6.65-6.421s-7.166-1.635-9.2-.935a3.893 3.893 0 102.55 7.356z"
              opacity={0.25}
            />
            <Path
              data-name="Path 29"
              d="M67.72 73.898c2.123-.35 7.641-5.207 7.641-5.207s-6.784-2.826-8.906-2.476a3.893 3.893 0 101.266 7.683z"
              opacity={0.25}
            />
            <Path
              data-name="Path 30"
              d="M54.316 44.111c0 2.152-3.889 8.386-3.889 8.386s-3.9-6.215-3.9-8.383a3.892 3.892 0 017.785 0z"
              opacity={0.25}
            />
            <Path
              data-name="Path 31"
              d="M70.081 53.727c-.654 2.054-6.215 6.839-6.215 6.839s-1.851-7.114-1.21-9.158a3.893 3.893 0 117.431 2.326z"
              opacity={0.25}
            />
            <Path
              data-name="Path 32"
              d="M84.113 65.175c-.285 2.133-4.975 7.794-4.975 7.794s-3.029-6.7-2.741-8.831a3.893 3.893 0 017.716 1.037z"
              opacity={0.25}
            />
            <Path
              data-name="Path 33"
              d="M83.982 80.054s-1.766-18.205-12.285-27.887a27.723 27.723 0 01-8.576-15.285 46.528 46.528 0 01-.779-8.488"
              fill="none"
              stroke="#535461"
              strokeMiterlimit={10}
              strokeWidth={2}
            />
            <Path
              data-name="Path 34"
              d="M55.764 22.248c.8 2 6.744 6.323 6.744 6.323s1.282-7.238.478-9.234a3.893 3.893 0 00-7.222 2.911z"
              fill="#6c63ff"
            />
            <Path
              data-name="Path 35"
              d="M54.247 35.705c1.756 1.236 9.1 1.635 9.1 1.635s-2.859-6.771-4.618-8.007a3.892 3.892 0 00-4.478 6.368z"
              fill="#6c63ff"
            />
            <Path
              data-name="Path 36"
              d="M62.113 54.477c2.142.18 8.684-3.179 8.684-3.179s-5.887-4.4-8.03-4.579a3.893 3.893 0 10-.654 7.758z"
              fill="#6c63ff"
            />
            <Path
              data-name="Path 37"
              d="M71.265 67.337c2.084.54 9.1-1.665 9.1-1.665s-5.06-5.331-7.14-5.887a3.892 3.892 0 10-1.962 7.523z"
              fill="#6c63ff"
            />
            <Path
              data-name="Path 38"
              d="M71.082 34.675c-.87 1.962-6.954 6.09-6.954 6.09s-1.037-7.274-.167-9.24a3.893 3.893 0 117.121 3.15z"
              fill="#6c63ff"
            />
            <Path
              data-name="Path 39"
              d="M81.594 49.851c-1.42 1.613-8.458 3.729-8.458 3.729s1.187-7.251 2.617-8.867a3.894 3.894 0 115.852 5.138z"
              fill="#6c63ff"
            />
            <Path
              data-name="Path 40"
              d="M89.785 66.006c-1.125 1.832-7.7 5.109-7.7 5.109s-.056-7.35 1.07-9.184a3.893 3.893 0 116.633 4.075z"
              fill="#6c63ff"
            />
          </G>
          <Circle
            data-name="Ellipse 3"
            cx={7.075}
            cy={7.075}
            r={7.075}
            transform="translate(116.34)"
            fill="#6c63ff"
            opacity={0.1}
          />
          <Circle
            data-name="Ellipse 4"
            cx={7.075}
            cy={7.075}
            r={7.075}
            transform="translate(223.987 9.767)"
            fill="#6c63ff"
            opacity={0.1}
          />
          <Circle
            data-name="Ellipse 5"
            cx={7.075}
            cy={7.075}
            r={7.075}
            transform="translate(299.592 114.577)"
            fill="#6c63ff"
            opacity={0.1}
          />
          <Circle
            data-name="Ellipse 6"
            cx={11.857}
            cy={11.857}
            r={11.857}
            transform="translate(320.117 78.255)"
            fill="#6c63ff"
            opacity={0.1}
          />
          <Circle
            data-name="Ellipse 7"
            cx={11.857}
            cy={11.857}
            r={11.857}
            transform="translate(304.42 135.795)"
            fill="#6c63ff"
            opacity={0.1}
          />
          <Circle
            data-name="Ellipse 8"
            cx={11.857}
            cy={11.857}
            r={11.857}
            transform="translate(0 98.72)"
            fill="#6c63ff"
            opacity={0.1}
          />
          <Path
            data-name="Path 69"
            d="M840.255 431.492a5.93 5.93 0 00-.147-1.174c-.3-1.1-.958-2.44-2.054-2.774a17.28 17.28 0 01-3.248-1.374c-.2-3.506.608-7.094-.271-10.493a27.071 27.071 0 01-1.011-3.709c-.18-1.58.255-3.271-.376-4.73a4.675 4.675 0 00-2.767-2.388 14.907 14.907 0 00-3.686-.654c-1.57-.131-6.653-.733-8.422.674a1.751 1.751 0 00-.327.327 1.152 1.152 0 00-.108.17.111.111 0 010 .026 2.071 2.071 0 00-.088.213 1.233 1.233 0 00-.052.242.61.61 0 000 .082 1.466 1.466 0 000 .173v.337c.023.291.069.589.069.88a1.913 1.913 0 01-.039.432 3.035 3.035 0 01-.543 1.056l-.059.085-.108.157-.085.134-.072.118c-.033.056-.059.111-.088.17l-.049.092a2 2 0 00-.1.278 1.813 1.813 0 000 .867 3.317 3.317 0 00.445 1.034c.082.134.173.265.265.4s.15.206.229.307a6.545 6.545 0 00-.072.919 6.754 6.754 0 002.587 5.315 20.274 20.274 0 01-.042 4.151c-.033.291-.065.579-.1.867s-.072.481-.108.72a3.336 3.336 0 01-1.433-.111 6.682 6.682 0 00-.654-.252c-.955-.236-1.927.713-2.865.425a.551.551 0 01-.043.131 1.308 1.308 0 00-.654-.193 2.4 2.4 0 01-1.42-.814l-1.243-1.174a1.257 1.257 0 01-.216-.242 1.612 1.612 0 01-.151-.4 4.647 4.647 0 00-1.207-1.73.817.817 0 00-.36-.258.438.438 0 00-.16 0c-.036-.046-.069-.092-.108-.134a4.13 4.13 0 00-.275-.271c-.592-.549-.654-1.02-1.171-1.635a15.392 15.392 0 01-1.22-1.848c-.046-.327-.1-.693-.177-1.053a13.443 13.443 0 00-.713-2.384l.448-.491v-.487l.8-.932-.056-.049.981-.922-.981-.036-.458.635-.036-.033-.818.818-.572.065-.075.078c-.474-.706-.981-1.092-1.433-1-.762.157-1.141 1.635-1.02 3.569l-2.267 2.371-.255.268-1.171 1.5.919.883 1.41-1.308.226-.245 1.4-1.521a.8.8 0 00.033.147 3.945 3.945 0 00-.072.707c0 .278.258.478.389.726a1.988 1.988 0 01.327 1.115c0 .137-.059.271-.062.412a1.558 1.558 0 00.3.847q.821 1.374 1.635 2.747c.111.193.229.386.327.576a.139.139 0 010 .029 1.391 1.391 0 00.438.5 6.014 6.014 0 00.54 1.989c.059.121.121.242.186.36a11.523 11.523 0 001.541 2l.782.873c.766.86 1.534 1.717 2.368 2.512a3.162 3.162 0 001.063.739 1.187 1.187 0 001.187-.17v1.214a.867.867 0 01.572.373.834.834 0 01-.056.707 26.681 26.681 0 01-2.42 5.122 10.793 10.793 0 012.028 1.544 8.962 8.962 0 011.06 1.433c.026.239.049.481.065.72.242 3.9-1.266 7.768-2.617 11.484a8.925 8.925 0 00-.778 3.248 6.746 6.746 0 00-.736.53 4.87 4.87 0 01.137 2.07 3.681 3.681 0 01-.275 1.308c-.128.291-.327.563-.468.841a12.483 12.483 0 00-1.207 4.975c-.1 1.034.3 2.29-.17 3.212a13.59 13.59 0 00-1.652 5.031 5.255 5.255 0 01-.147 1.178c-.1.327-.285.605-.376.926a3.943 3.943 0 00-.062 1.308 12.505 12.505 0 01-.69 4.615 6.289 6.289 0 00-.536 3.621 5.081 5.081 0 00-1.384 3.035 4.79 4.79 0 01-.108.867 4.313 4.313 0 01-.389.837 7.328 7.328 0 00-.893 3.925 10.9 10.9 0 00-1.76 4.605c-.291 1.632-.422 3.294-.795 4.906-.494 2.136-1.393 4.291-1.573 6.473a4.585 4.585 0 00-1.72 3.232 14.678 14.678 0 01-.752 3.686c-.268.6-.654 1.129-.909 1.734a7.813 7.813 0 00-.4 1.495 5.778 5.778 0 00-.1 2.453 3.691 3.691 0 01-.958.733c.049-.2.095-.409.128-.615-.844.769-2.371.5-3.048 1.42a1.387 1.387 0 00.327 1.894 2.668 2.668 0 00.68.291 10.821 10.821 0 004.995.772 1.515 1.515 0 00.566-.183 1.758 1.758 0 00.526-.608l.756-1.2a15.535 15.535 0 001.835.432q.091.782.128 1.57c.327.065.765.082.919-.219a.8.8 0 00.059-.363c0-.236.029-.543.052-.857h.065a6.213 6.213 0 002.895-.589c-.353-2.895.8-5.727 1.806-8.468 1.056-2.885 1.962-5.825 2.872-8.763.654-2.064 1.38-4.069 2.018-6.136q1.217-3.925 2.43-7.85c.357-1.151.71-2.29 1.119-3.434a53.784 53.784 0 013.029-6.751c.327-.615.654-1.227.926-1.871.327-.782.559-1.6.818-2.4a37.618 37.618 0 012.057-4.838l.059-.121c.265 1.083.533 2.185.707 3.271a12.337 12.337 0 01.056 4.043 13.111 13.111 0 00-.415 2.738 16.942 16.942 0 001.066 3.676 14.209 14.209 0 01.37 2.813c.088 1.469.89 3.12.327 4.484-1.747 4.321-.9 9.2-1.9 13.738-.51 2.329-2.083 4.52-1.963 6.9q.131 2.535.445 5.057a4.718 4.718 0 00.356 1.491 6.717 6.717 0 00.448.729c-.141.059-.265.206-.366.517a1.963 1.963 0 00.726 2.29 3.157 3.157 0 00.942.327 5.12 5.12 0 001.367.19 2.7 2.7 0 00.428-.056 15.138 15.138 0 001.55.556 2.083 2.083 0 00.039.4.481.481 0 00.173.37.471.471 0 00.262.049h1.776v-.445a1.449 1.449 0 001.129-.37 1.67 1.67 0 00.327-.677q.726-2.466 1.446-4.929a14.954 14.954 0 00.507-2.123 14.515 14.515 0 00.193-3.506c-.628-6.028.759-12.076.307-18.12a43.222 43.222 0 01.556-10.869c.147-.811.327-1.635.393-2.443.141-1.524-.033-3.065.072-4.579.039-.53.111-1.056.177-1.583a76.039 76.039 0 00.765-9.865 30.132 30.132 0 00-.2-3.271 1.927 1.927 0 00.89-.523 2.207 2.207 0 00.216-1.4 10.218 10.218 0 01.876-3.346 40.348 40.348 0 001.24-4.579 16.1 16.1 0 00.549-3.843 2.709 2.709 0 00-.02-.4.979.979 0 00.3-.327 1.838 1.838 0 00.157-.605l.36-2.509.258-1.8q.52-3.624 1.037-7.255c.092-.631.18-1.259.271-1.891l.268-1.874c.033-.222.062-.445.088-.671.814-1.293.051-3.076-.031-4.593zm-8.664 27.174a5.886 5.886 0 01-.654-2.842h-.037a1.482 1.482 0 00-.046-.922c-.1-.242-.275-.445-.383-.68a2.5 2.5 0 01-.177-.919 25.112 25.112 0 01.465-5.93c.042-.232.088-.461.134-.693a1.755 1.755 0 00.37-.288 2.681 2.681 0 00.422-.654q.553-1.112 1.02-2.267c.1-.252.249-.536.5-.6-.052 1.913.144 3.866-.654 5.593a3.48 3.48 0 00-.327.883c-.072.484.131.981.059 1.465-.036.249-.144.484-.19.729a.72.72 0 00.193.693.51.51 0 00.137.075c-.02.131-.036.265-.046.392-.029.268-.039.52-.056.677a21.089 21.089 0 00-.091 2.4c0 .867.036 1.737.02 2.617a1.732 1.732 0 01-.124.742 1.272 1.272 0 01-.248.327c-.088-.285-.192-.543-.287-.798z"
            transform="translate(-533.317 -304.989)"
            fill="url(#prefix__b)"
          />
          <Path
            data-name="Path 70"
            d="M273.553 106.021l1.1-1.024-.981-.036-.513.785z"
            fill="#33313f"
          />
          <Path
            data-name="Path 71"
            d="M265.644 113.19l1.16-1.495.258-.268 3.565-3.732 1.214-1.272.569-.065.818-.814.481.422-.795.929.016.487-1.243 1.348-3.5 3.8-.226.242-1.406 1.3z"
            fill="#65617d"
          />
          <Path
            data-name="Path 72"
            d="M267.066 111.427l3.565-3.732 1.06 1.034-3.5 3.8z"
            fill="#33313f"
          />
          <Ellipse
            data-name="Ellipse 9"
            cx={1.845}
            cy={5.224}
            rx={1.845}
            ry={5.224}
            transform="rotate(-11.6 655.517 -1269.483)"
            fill="#fbbebe"
          />
          <Path
            data-name="Path 73"
            d="M287.682 220.86a1.962 1.962 0 00.723 2.27 3.214 3.214 0 00.942.327 5.078 5.078 0 001.361.19c.569-.029 1.112-.249 1.675-.327a.274.274 0 01.193.029.284.284 0 01.075.226 8.647 8.647 0 00.072.965.37.37 0 00.432.415h1.769a17 17 0 00-.513-4.625 1 1 0 00-.131-.327 1.043 1.043 0 00-.562-.327 3.181 3.181 0 00-1.374-.239 3.99 3.99 0 00-1.537.752 2.325 2.325 0 01-1.743.419c-.594-.16-1.081-.657-1.382.252z"
            fill="#3f3d56"
          />
          <Path
            data-name="Path 74"
            d="M261.64 219.424a4.879 4.879 0 01-1.786 1.214l-.3.147a.164.164 0 00-.1.082.177.177 0 00.029.147 2.123 2.123 0 002.4.873 1.286 1.286 0 00.53-.275 1.754 1.754 0 00.406-1.056 2.208 2.208 0 00-.049-1.2c-.446-1.031-.617-.567-1.13.068z"
            fill="#fbbebe"
          />
          <Path
            data-name="Path 75"
            d="M268.454 223.453a.758.758 0 01-.059.363c-.15.3-.582.281-.916.219a21.992 21.992 0 00-.4-3.307c-.635-.029-1.1.576-1.433 1.112l-.877 1.393a1.779 1.779 0 01-.527.605 1.521 1.521 0 01-.563.183 10.809 10.809 0 01-4.982-.772 2.7 2.7 0 01-.677-.288 1.38 1.38 0 01-.327-1.891c.674-.916 2.2-.654 3.039-1.413a7.421 7.421 0 01-.432 1.56c1.132-.17 1.887-1.2 2.8-1.894a1.664 1.664 0 01.8-.383 1.765 1.765 0 01.654.072 7.651 7.651 0 012.878 1.416 3.1 3.1 0 011.03 1.073 8.107 8.107 0 01-.008 1.952z"
            fill="#3f3d56"
          />
          <Circle
            data-name="Ellipse 10"
            cx={6.758}
            cy={6.758}
            r={6.758}
            transform="translate(284.192 102.017)"
            fill="#fbbebe"
          />
          <Path
            data-name="Path 76"
            d="M304.263 148.676a15.97 15.97 0 01-.55 3.83 39.28 39.28 0 01-1.233 4.579 10.085 10.085 0 00-.876 3.336 2.243 2.243 0 01-.213 1.393 2.073 2.073 0 01-.958.546 1.191 1.191 0 00-.8.713 5 5 0 01-.684-1.495q-.877-2.7-1.635-5.42a.7.7 0 01.042-.654.777.777 0 01.288-.16 2.945 2.945 0 00.9-.585 1.335 1.335 0 00.3-.386 1.733 1.733 0 00.124-.742c0-.863 0-1.73-.02-2.594a21.755 21.755 0 01.088-2.4c0-.16.029-.409.056-.677.049-.517.147-1.109.428-1.308.412-.281 1.655.095 2.129.157a48.57 48.57 0 012.424.4 6.645 6.645 0 01.19 1.467z"
            fill="#3f3d56"
          />
          <Path
            data-name="Path 77"
            d="M276.973 116.343c-.262.523-.89.772-1.374 1.106l-1.658 1.138a1.119 1.119 0 01-.818.281 1.079 1.079 0 01-.612-.572l-.02-.029-.327-.572-1.635-2.741a1.59 1.59 0 01-.3-.847 3.555 3.555 0 01.065-.409 2.024 2.024 0 00-.327-1.112c-.131-.249-.4-.448-.386-.723a2.577 2.577 0 01.183-1.06 2.159 2.159 0 01.713-.765c.154-.111.327-.216.474-.327a.947.947 0 01.288-.128c.268-.056.536.167.811.177 1.184.792 1.635 2.29 2.568 3.372.523.612.576 1.083 1.168 1.635a3.038 3.038 0 01.271.271 1.743 1.743 0 01.3.425c.1.279.755.612.616.88z"
            fill="#3f3d56"
          />
          <Path
            data-name="Path 78"
            d="M288.572 115.552a6.087 6.087 0 01.726 3.294 2.066 2.066 0 01-.281.867 2.814 2.814 0 01-2.322.9 1.37 1.37 0 00-1 .327.909.909 0 00.062 1.119 2.446 2.446 0 001 .654 8.782 8.782 0 004.308.955c.687-.065 1.354-.262 2.038-.363a20.5 20.5 0 012.231-.115c.89-.033 1.776-.121 2.662-.209l2.345-.232a.517.517 0 00.35-.128c.177-.2-.049-.5-.262-.654-1.249-.926-2.836-1.557-3.542-2.944a17.171 17.171 0 01-.674-2.139 17.407 17.407 0 01-.775-2.064 13.622 13.622 0 01-.108-1.9 2.531 2.531 0 00-.654-1.74 2.736 2.736 0 00-1.779-.576 5.78 5.78 0 00-4.337 1.41c-.3.3-.549.638-.86.922s-.723.347-.52.7.6.569.814.883a7.316 7.316 0 01.578 1.033z"
            fill="#fbbebe"
          />
          <Path
            data-name="Path 79"
            d="M301.897 125.05a37.486 37.486 0 01-1.989 7.369 27.225 27.225 0 00-1.177 3.307c-.255 1.014-.2 2.1-.438 3.117-.288 1.263-.576 2.535-.808 3.811a24.959 24.959 0 00-.465 5.914 2.49 2.49 0 00.177.916c.108.235.284.438.383.677a1.612 1.612 0 01-.088 1.308 3.829 3.829 0 01-.674 1.024c-3.052.909-6.309.608-9.485.8-2.944.18-5.888.782-8.772.278a6.916 6.916 0 01.687-3.951c1.354-3.706 2.859-7.565 2.617-11.448a11.81 11.81 0 00-.157-1.348 17.968 17.968 0 01.87-8.269 14.038 14.038 0 00.373-5.161 9.4 9.4 0 01-.023-1.688 3.016 3.016 0 01.615-1.58l.049-.069c.036-.056.144-.023.242 0a.213.213 0 00.164 0 .075.075 0 01.037-.02.092.092 0 01.095 0c.075.049.114.2.278.232a6.542 6.542 0 00.729.072 3.9 3.9 0 01.87.124h.039a2.587 2.587 0 001.269-.108 3.394 3.394 0 00.778-.3 5.426 5.426 0 01.615-.206c.3-.183.235-1.027.3-1.37a3.764 3.764 0 01.242-1.014 1.72 1.72 0 011.4-.814 7.12 7.12 0 011.681.15c1.217.173 2.466.141 3.667.422a2.732 2.732 0 001.812.082c.147.033.17.167.17.327a1.793 1.793 0 01-.092.448c-.206.9.5 1.73 1.155 2.388a3.777 3.777 0 00.981.769c.327.15.654.213.981.376a1.734 1.734 0 01.654.6 2.425 2.425 0 01.373.952 5.664 5.664 0 01-.135 1.883z"
            fill="#3f3d56"
          />
          <Path
            data-name="Path 80"
            d="M301.898 125.05a37.486 37.486 0 01-1.989 7.369 27.238 27.238 0 00-1.177 3.307c-.255 1.014-.2 2.1-.438 3.117-.288 1.263-.576 2.535-.808 3.811a1.597 1.597 0 01-.209.1 5.074 5.074 0 01-1.282.415 7.977 7.977 0 01-2.4-.078l-4.677-.612c-1.864-.249-3.85-.553-5.233-1.815a11.092 11.092 0 01-1.822-2.5 11.812 11.812 0 00-.157-1.348 17.972 17.972 0 01.87-8.269 14.041 14.041 0 00.373-5.161 9.38 9.38 0 01-.023-1.688 3.015 3.015 0 01.615-1.58 2.481 2.481 0 01.291-.069 1.375 1.375 0 01.2-.023h.095a1.425 1.425 0 01.327.039c.219.056.422.173.638.252h.039a2.6 2.6 0 00.87.124c.432 0 .877-.072 1.308-.1a2.408 2.408 0 011.55.275 8.991 8.991 0 01.864.792 3.881 3.881 0 001.092.592 11.553 11.553 0 008.7-.186 1.74 1.74 0 01.873-.219 1.678 1.678 0 01.631.265c.193.115.389.226.586.327a2.427 2.427 0 01.373.952 5.671 5.671 0 01-.08 1.911z"
            opacity={0.1}
          />
          <Path
            data-name="Path 81"
            d="M304.743 122.885a17.187 17.187 0 01-3.725-1.635 1.655 1.655 0 00-.631-.268 1.711 1.711 0 00-.873.222 11.569 11.569 0 01-8.7.183 3.8 3.8 0 01-1.092-.592 9.357 9.357 0 00-.86-.792c-1.076-.7-2.564.124-3.771-.327a6.62 6.62 0 00-.638-.252c-.952-.235-1.92.71-2.859.425a15.515 15.515 0 00-.765 2.918 31.764 31.764 0 00-.213 3.441c-.02.687-.036 1.377 0 2.067a.867.867 0 01.572.373.831.831 0 01-.056.7 26.639 26.639 0 01-2.414 5.109 10.733 10.733 0 012.017 1.546c1.148 1.21 1.707 2.9 2.944 4.023 1.393 1.263 3.382 1.567 5.233 1.819l4.671.641a7.979 7.979 0 002.4.078 5.067 5.067 0 001.282-.415 2.289 2.289 0 00.713-.471 2.691 2.691 0 00.422-.654 32.19 32.19 0 001.014-2.26c.111-.271.275-.592.569-.612 1.73-1.563 3.369-3.166 5.1-4.73a11.3 11.3 0 001.861-1.963c.863-1.272.078-3.078 0-4.612a5.65 5.65 0 00-.144-1.171c-.307-1.123-.968-2.457-2.057-2.791z"
            fill="#6c63ff"
          />
          <Path
            data-name="Path 82"
            d="M276.978 116.344c-.262.523-.89.772-1.374 1.106l-1.658 1.138a1.119 1.119 0 01-.818.281 1.08 1.08 0 01-.612-.572v-.236a2.174 2.174 0 01.1-.782 2.466 2.466 0 01.733-.942 5.937 5.937 0 012.149-1.308.719.719 0 01.4-.039.494.494 0 01.141.062 1.743 1.743 0 01.3.425c.118.265.772.597.639.867z"
            opacity={0.1}
          />
          <Path
            data-name="Path 83"
            d="M280.879 119.801a2.371 2.371 0 01-1.413-.814l-1.243-1.171a1.169 1.169 0 01-.216-.242 1.718 1.718 0 01-.147-.4 4.692 4.692 0 00-1.2-1.727.847.847 0 00-.36-.258.717.717 0 00-.4.043 5.938 5.938 0 00-2.149 1.308 2.417 2.417 0 00-.733.942 2.177 2.177 0 00-.1.782 6.005 6.005 0 00.573 2.512c.059.121.118.242.183.36a11.751 11.751 0 001.537 2l.779.873c.765.854 1.531 1.711 2.365 2.5a3.108 3.108 0 001.056.739 1.181 1.181 0 001.217-.2 1.712 1.712 0 00.347-.621 12.138 12.138 0 001.011-4.075 14.607 14.607 0 00-.069-1.691c-.06-.6-.479-.834-1.038-.86z"
            fill="#6c63ff"
          />
          <Path
            data-name="Path 84"
            d="M300.701 165.592a75.6 75.6 0 01-.7 9.835c-.065.523-.137 1.05-.173 1.58-.108 1.524.065 3.061-.075 4.579-.078.818-.245 1.635-.393 2.437a43.14 43.14 0 00-.553 10.839c.448 6.028-.932 12.06-.308 18.071a14.582 14.582 0 01-.19 3.5 15.2 15.2 0 01-.507 2.116q-.723 2.46-1.439 4.906a1.716 1.716 0 01-.327.677 1.54 1.54 0 01-1.227.366 14.136 14.136 0 01-5.374-1.671 1.759 1.759 0 01-.54-.327c-.357-.37-.327-.955-.484-1.439a14.483 14.483 0 00-.827-1.449 4.88 4.88 0 01-.357-1.485q-.327-2.515-.445-5.044c-.121-2.375 1.446-4.559 1.962-6.869 1-4.54.154-9.407 1.9-13.718.546-1.357-.249-3.006-.327-4.471a13.916 13.916 0 00-.366-2.806 17.447 17.447 0 01-1.063-3.663 13.077 13.077 0 01.415-2.734 12.431 12.431 0 00-.056-4.03c-.173-1.1-.442-2.2-.707-3.271l-.059.121a36.962 36.962 0 00-2.051 4.824c-.258.8-.491 1.616-.818 2.4-.268.654-.6 1.249-.919 1.864a53.216 53.216 0 00-3.022 6.731c-.406 1.132-.759 2.29-1.115 3.424q-1.207 3.925-2.42 7.85c-.638 2.064-1.374 4.059-2.012 6.12-.906 2.944-1.812 5.861-2.865 8.736-1 2.734-2.152 5.56-1.8 8.449a6.215 6.215 0 01-2.885.586 16.942 16.942 0 01-4.906-1.194 3.763 3.763 0 01-1.691-1.007c-.729-.886-.546-2.185-.327-3.31a7.7 7.7 0 01.4-1.491c.245-.605.638-1.138.906-1.73a14.435 14.435 0 00.752-3.676 4.538 4.538 0 011.714-3.222c.177-2.175 1.076-4.327 1.57-6.453.373-1.613.5-3.271.788-4.906a10.593 10.593 0 011.76-4.579 7.294 7.294 0 01.886-3.925 4.2 4.2 0 00.389-.834 4.706 4.706 0 00.108-.863 5.083 5.083 0 011.377-3.029 6.175 6.175 0 01.536-3.6 12.385 12.385 0 00.687-4.6 4.032 4.032 0 01.065-1.308c.092-.327.271-.605.373-.922a4.856 4.856 0 00.147-1.174 13.646 13.646 0 011.635-5.014c.468-.922.069-2.175.17-3.205a12.443 12.443 0 011.2-4.962 8.452 8.452 0 00.468-.841 3.571 3.571 0 00.271-1.308 4.8 4.8 0 00-.134-2.064 10.464 10.464 0 016.414-1.946 38.1 38.1 0 006.807-.379c.654-.144 1.308-.35 2-.448a12.923 12.923 0 014.7.484 5.76 5.76 0 00.638 2.836 30.442 30.442 0 012.424 11.636z"
            fill="#33313f"
          />
          <Path
            data-name="Path 85"
            d="M292.997 166.332l-3.755 8.452c-.173-1.1-.441-2.2-.706-3.271l-.059.121.016-.177 2.047-4.507z"
            opacity={0.1}
          />
          <Path
            data-name="Path 86"
            d="M304.262 148.676a1.482 1.482 0 01-.746.278 3.731 3.731 0 01-1.227-.167l-2.927-.742a1.235 1.235 0 01-.268-.092c.049-.517.147-1.109.428-1.308.412-.281 1.655.095 2.129.157.811.115 1.619.245 2.424.4a6.654 6.654 0 01.186 1.475z"
            opacity={0.1}
          />
          <Path
            data-name="Path 87"
            d="M306.748 129.215c.065.271.154.54.2.814a6.27 6.27 0 01-.065 2.021l-.268 1.871-.268 1.884-1.037 7.238-.258 1.792-.357 2.5a1.9 1.9 0 01-.157.6 1.263 1.263 0 01-1.027.605 3.725 3.725 0 01-1.223-.167l-2.927-.739a.927.927 0 01-.356-.147.713.713 0 01-.193-.69c.042-.249.151-.481.19-.729.072-.484-.134-.981-.059-1.462a3.405 3.405 0 01.327-.883c.981-2.169.412-4.7.746-7.052a10.676 10.676 0 012.237-5.053 14.222 14.222 0 012.5-2.456 5.068 5.068 0 011.41-.981c.614-.121.49.622.585 1.034z"
            fill="#6c63ff"
          />
          <Path
            data-name="Path 88"
            d="M284.474 101.04c-.216.684.121 1.439-.033 2.142-.17.772-.893 1.308-1.1 2.083-.327 1.181.674 2.257 1.4 3.238 2.715 3.64 2.358 8.684 1.429 13.132a67.45 67.45 0 01-3.091 10.467 8.04 8.04 0 01-1.662 2.921 8.607 8.607 0 014.612-.448c1.91.53 3.559 2.384 5.492 1.962 1.168-.262 1.982-1.308 3.032-1.864 1.963-1.056 4.324-.393 6.516-.056a2.5 2.5 0 001.423-.072 2.381 2.381 0 00.864-.792 8.07 8.07 0 001.678-4.35 5.56 5.56 0 00-1.606-4.295 9.323 9.323 0 01-1.374-1.308 4.01 4.01 0 01-.54-1.982c-.262-3.6.615-7.268-.285-10.748a26.465 26.465 0 01-1.007-3.7c-.18-1.577.252-3.271-.376-4.717a4.639 4.639 0 00-2.757-2.378 13.8 13.8 0 00-3.676-.654c-1.789-.154-8.19-.92-8.939 1.419z"
            fill="#33313f"
          />
          <G data-name="Group 1" opacity={0.1}>
            <Path
              data-name="Path 89"
              d="M285.171 121.635a67.676 67.676 0 01-3.074 10.426c.226-.448.419-.919.6-1.387a67.486 67.486 0 003.091-10.467c.929-4.445 1.285-9.485-1.429-13.132-.654-.867-1.495-1.809-1.462-2.833a3.429 3.429 0 00-.556 1.03c-.327 1.181.674 2.257 1.4 3.238 2.719 3.633 2.363 8.677 1.43 13.125z"
            />
            <Path
              data-name="Path 90"
              d="M283.48 102.848a3.27 3.27 0 00.576-1.1 5.608 5.608 0 00-.039-1.459 1.576 1.576 0 00-.543.752 6.837 6.837 0 00.006 1.807z"
            />
            <Path
              data-name="Path 91"
              d="M302.974 132.312a2.4 2.4 0 01-.867.795 2.49 2.49 0 01-1.42.072c-2.191-.327-4.579-1-6.516.056-1.05.569-1.868 1.6-3.032 1.861-1.936.432-3.6-1.42-5.5-1.963a7.671 7.671 0 00-4.144.327 5.723 5.723 0 01-1.079 1.567 8.607 8.607 0 014.612-.448c1.91.53 3.559 2.384 5.492 1.963 1.164-.262 1.982-1.308 3.032-1.864 1.963-1.057 4.324-.393 6.516-.056a2.5 2.5 0 001.423-.072 2.381 2.381 0 00.864-.792 8.991 8.991 0 001.354-2.59 9.621 9.621 0 01-.735 1.144z"
            />
          </G>
          <Path
            data-name="Path 92"
            d="M244.9 190.25s1.94 2.538-.893 6.368-5.175 7.068-4.229 9.449c0 0 4.278-7.114 7.758-7.2s1.194-4.337-2.636-8.617z"
            fill="#6c63ff"
          />
          <Path
            data-name="Path 93"
            d="M244.9 190.25a3.079 3.079 0 01.4.8c3.4 3.99 5.207 7.713 1.943 7.807-3.042.088-6.689 5.524-7.566 6.9.03.108.066.209.1.327 0 0 4.278-7.114 7.758-7.2s1.195-4.354-2.635-8.634z"
            opacity={0.1}
          />
          <Path
            data-name="Path 94"
            d="M248.509 193.485c0 .893-.1 1.616-.226 1.616s-.222-.723-.222-1.616.124-.474.249-.474.199-.419.199.474z"
            fill="#ffd037"
          />
          <Path
            data-name="Path 95"
            d="M249.744 194.551c-.785.425-1.469.684-1.527.576s.53-.543 1.308-.981.478-.115.536 0 .468-.023-.317.405z"
            fill="#ffd037"
          />
          <Path
            data-name="Path 96"
            d="M234.666 190.25s-1.94 2.538.9 6.368 5.171 7.062 4.226 9.449c0 0-4.278-7.114-7.758-7.2s-1.209-4.337 2.632-8.617z"
            fill="#6c63ff"
          />
          <Path
            data-name="Path 97"
            d="M234.666 190.25a3.074 3.074 0 00-.4.8c-3.4 3.99-5.207 7.713-1.943 7.807 3.042.088 6.692 5.524 7.565 6.9-.029.108-.065.209-.1.327 0 0-4.278-7.114-7.758-7.2s-1.205-4.354 2.636-8.634z"
            opacity={0.1}
          />
          <Path
            data-name="Path 98"
            d="M231.067 193.485c0 .893.1 1.616.222 1.616s.222-.723.222-1.616-.124-.474-.249-.474-.195-.419-.195.474z"
            fill="#ffd037"
          />
          <Path
            data-name="Path 99"
            d="M229.811 194.551c.785.425 1.469.684 1.528.576s-.53-.543-1.308-.981-.474-.115-.536 0-.465-.023.316.405z"
            fill="#ffd037"
          />
          <Path
            data-name="Path 100"
            d="M250.215 202.649l-.095.792-.137 1.119-.056.464-.137 1.122-.059.464-.134 1.119-1.554 12.724c-.137 1.135-2 2.021-4.233 2.021h-8.066c-2.237 0-4.092-.886-4.229-2.021l-1.554-12.724-.137-1.119-.056-.464-.139-1.122-.056-.464-.134-1.119-.1-.792c-.078-.654.926-1.187 2.191-1.187h16.492c1.267 0 2.274.543 2.193 1.187z"
            fill="#444053"
          />
          <Path
            data-name="Path 101"
            d="M250.118 203.441l-.137 1.115h-20.41l-.134-1.115z"
            fill="#9d9cb5"
          />
          <Path
            data-name="Path 102"
            d="M249.926 205.024l-.137 1.119h-20.021l-.137-1.119z"
            fill="#9d9cb5"
          />
          <Path
            data-name="Path 103"
            d="M249.73 206.61l-.134 1.119h-19.635l-.137-1.119z"
            fill="#9d9cb5"
          />
        </G>
      </G>
    </Svg>
  );
}

export default LoginScreen;
