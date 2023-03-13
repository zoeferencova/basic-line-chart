import { line, curveNatural } from 'd3';

export const Marks = ({ data, xScale, yScale, xValue, yValue, tooltipFormat, circleRadius, showPoints = false }) => (
  <g className="marks">
    <path
      d={line().curve(curveNatural).x(d => xScale(xValue(d))).y(d => yScale(yValue(d)))(data)}
    />
    {showPoints && data.map((d) => (
      <circle
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={circleRadius}
      >
        <title>{yValue(d)}</title>
      </circle>
    ))}
  </g>
)