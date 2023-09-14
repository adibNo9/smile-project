export const StartBackgroundSvg = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_81_595)">
        <ellipse
          cx="704.025"
          cy="263"
          rx="445.359"
          ry="263"
          fill="#00E0FF"
          fillOpacity="0.15"
        />
        <ellipse
          cx="931.499"
          cy="526"
          rx="445.359"
          ry="263"
          fill="url(#paint0_linear_81_595)"
          fillOpacity="0.4"
        />
        <ellipse
          cx="1215.97"
          cy="263"
          rx="445.359"
          ry="263"
          fill="url(#paint1_radial_81_595)"
          fillOpacity="0.6"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_81_595"
          x="-141.334"
          y="-400"
          width="2202.67"
          height="1589"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="200"
            result="effect1_foregroundBlur_81_595"
          />
        </filter>
        <linearGradient
          id="paint0_linear_81_595"
          x1="718"
          y1="340.5"
          x2="931.499"
          y2="789"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00BAFF" />
          <stop offset="1" stopColor="#00BAFF" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          id="paint1_radial_81_595"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(1215.97 263) rotate(137.881) scale(266.898 451.96)"
        >
          <stop stopColor="#F8A61F" />
          <stop offset="1" stopColor="#F8A61F" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};
