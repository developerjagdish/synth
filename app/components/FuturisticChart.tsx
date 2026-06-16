export default function FuturisticChart() {
  return (
    <div className="relative w-full aspect-square max-w-[320px] mx-auto overflow-visible select-none">
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <pattern
            id="dots"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.5" fill="#ff1a1a" />
          </pattern>

          <linearGradient
            id="areaGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#ff1a1a" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ff1a1a" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines (faint dark gray for cyberpunk dark mode) */}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={i}
            x1={50 + i * 40}
            y1={50}
            x2={50 + i * 40}
            y2={450}
            stroke="#262626"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
        ))}

        {/* Area under line */}
        <path
          d="
            M50 380
            C100 280,120 260,160 250
            C220 250,240 220,280 220
            C320 220,340 180,370 140
            C400 100,420 70,450 40
            L450 450
            L50 450
            Z
          "
          fill="url(#areaGradient)"
        />

        {/* Dotted Fill */}
        <path
          d="
            M50 380
            C100 280,120 260,160 250
            C220 250,240 220,280 220
            C320 220,340 180,370 140
            C400 100,420 70,450 40
            L450 450
            L50 450
            Z
          "
          fill="url(#dots)"
          opacity="0.6"
        />

        {/* Line */}
        <path
          d="
            M50 380
            C100 280,120 260,160 250
            C220 250,240 220,280 220
            C320 220,340 180,370 140
            C400 100,420 70,450 40
          "
          fill="none"
          stroke="#ff1a1a"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* End Point */}
        <circle
          cx="450"
          cy="40"
          r="8"
          fill="white"
        />

        {/* Red Halo */}
        <circle
          cx="450"
          cy="40"
          r="40"
          fill="#ff1a1a"
          opacity="0.15"
        />
      </svg>
    </div>
  );
}
