const polarToCartesian = (cx, cy, r, angleInDeg) => {
  const angleInRad = ((angleInDeg - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleInRad),
    y: cy + r * Math.sin(angleInRad),
  };
};

const describeArc = (cx, cy, r, startAngle, endAngle) => {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  const d = [
    "M", start.x, start.y,
    "A", r, r, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");
  return d;
};

const DonutChart = ({ data = [], colors = [], width = 280, height = 200, thickness = 18 }) => {
  const cx = width / 3; // chart on left, legend on right
  const cy = height / 2;
  const r = Math.min(cx, cy) - 8;
  const total = data.reduce((s, d) => s + d.value, 0) || 1;

  let angle = 0;
  const segments = data.map((d, i) => {
    const valueAngle = (d.value / total) * 360;
    const start = angle;
    const end = angle + valueAngle;
    angle = end;
    return { start, end, label: d.label, value: d.value, color: colors[i % colors.length] };
  });

  return (
    <svg width={width} height={height}>
      {/* Segments */}
      {segments.map((s, i) => (
        <g key={i}>
          <path d={describeArc(cx, cy, r, s.start, s.end)} stroke={s.color} strokeWidth={thickness} fill="none" />
        </g>
      ))}
      {/* Center text */}
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="#111827">
        {total}
      </text>
      {/* Legend */}
      {segments.map((s, i) => (
        <g key={i} transform={`translate(${width * 0.6}, ${24 + i * 22})`}>
          <rect width="12" height="12" rx="2" fill={s.color} />
          <text x="18" y="10" fontSize="12" fill="#374151">{s.label} ({s.value})</text>
        </g>
      ))}
    </svg>
  );
};

export default DonutChart;
