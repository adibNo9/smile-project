export const ScoreHand = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="109"
      height="48"
      viewBox="0 0 109 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.2721 23.5204L106.619 5.85194L20.4082 35.2242L17.2721 23.5204Z"
        fill="#ADE1FF"
      />
      <g filter="url(#filter0_d_237_2026)">
        <ellipse
          cx="18.8399"
          cy="29.3723"
          rx="12.1168"
          ry="12.1168"
          transform="rotate(-15 18.8399 29.3723)"
          fill="#051D28"
        />
        <path
          d="M29.3826 26.5474C30.9427 32.3699 27.4874 38.3548 21.6648 39.9149C15.8423 41.4751 9.85744 38.0197 8.29729 32.1972C6.73715 26.3746 10.1925 20.3898 16.015 18.8296C21.8376 17.2695 27.8224 20.7249 29.3826 26.5474Z"
          stroke="white"
          strokeWidth="2.40442"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_237_2026"
          x="0.308418"
          y="10.8407"
          width="37.0629"
          height="37.0631"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3.2059" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_237_2026"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_237_2026"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
