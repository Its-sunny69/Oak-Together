import React from "react";
import * as d3 from "d3";

const DottedBar = ({ label, value, dotSizeRange }) => {
  const width = 150;

  // const barHeight = (value / 100) * maxHeight; // bar & dots height
  const barHeight = value;
  const numDots = Math.floor(value * 2); // you can control density here

  // Create a color interpolator from light green to dark green
  const colorInterpolator = d3.interpolateRgb("green", "rgba(0, 229, 0, 0.2)");

  // Create a scale to map radius to t ∈ [0,1] for interpolation
  const colorScale = d3.scaleLinear().domain(dotSizeRange).range([0, 1]);

  // Opacity control separately
  const opacityScale = d3.scaleLinear().domain(dotSizeRange).range([0.3, 0.9]);

  const dots = Array.from({ length: numDots }, () => {
    const r =
      Math.random() * (dotSizeRange[1] - dotSizeRange[0]) + dotSizeRange[0];

    const color = colorInterpolator(colorScale(r)); // This gives a color string like rgb(...)
    const opacity = opacityScale(r);

    // Now create RGBA manually by extracting rgb components
    const rgbMatch = color.match(/\d+/g);
    const fillColor = `rgba(${rgbMatch[0]}, ${rgbMatch[1]}, ${rgbMatch[2]}, ${opacity})`;

    return {
      cx: Math.random() * width,
      cy: Math.random() * barHeight,
      r,
      fill: fillColor,
    };
  });

  return (
    <div className="flex flex-col items-center mx-2 justify-end">
      <div className="text-2xl font-bold">{value}%</div>
      <div className="text-sm mt-1 text-center">{label}</div>

      <div
        className=" bg-green-50 rounded-sm overflow-hidden mt-2"
        style={{ width: "100%", height: barHeight }}
      >
        <svg width={width} height={barHeight}>
          {dots.map((dot, idx) => (
            <circle
              key={idx}
              cx={dot.cx}
              cy={dot.cy}
              r={dot.r}
              fill={dot.fill}
              opacity={0.7}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

const PollutionBarGraph = ({ maxPM }) => {
  // const { p1, p2 } = useSelector(
  //   (state) => state.airVisual.aqiByCoordinates.data.pollution
  // );

  const dataPM = { p1: 71, p2: 57 };

  const calculatePercentage = (pmValue) => {
    const percentage = (pmValue / maxPM) * 100;
    return Math.min(100, Math.round(percentage)); // max cap 100
  };

  const data = [
    {
      label: `PM10 - ${dataPM.p1} µg/m³`,
      value: calculatePercentage(dataPM.p1),
      dotSizeRange: [2, 6], // BIGGER dots
    },
    {
      label: `PM2.5 - ${dataPM.p2} µg/m³`,
      value: calculatePercentage(dataPM.p2),
      dotSizeRange: [1, 3], // SMALLER dots
    },
  ];

  return (
    <div className="flex justify-center items-end">
      {data.map((d, idx) => (
        <DottedBar
          key={idx}
          label={d.label}
          value={d.value}
          dotSizeRange={d.dotSizeRange}
        />
      ))}
    </div>
  );
};

export default PollutionBarGraph;
