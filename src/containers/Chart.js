import React from 'react';
import { scaleLinear, scaleTime, extent, timeFormat } from 'd3';
import { useData } from '../hooks/useData'
import { AxisBottom } from '../components/AxisBottom'
import { AxisLeft } from '../components/AxisLeft'
import { Marks } from '../components/Marks'

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 70, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 50;

export const Chart = () => {
    const data = useData();

    if (!data) {
        return <pre style={{ marginLeft: margin.left, marginTop: margin.top }}>Loading ...</pre>
    }

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xValue = d => d.timestamp;
    const xAxisLabel = "Time";

    const yValue = d => d.temperature;
    const yAxisLabel = "Temperature";

    const xAxisTickFormat = timeFormat('%a');

    const xScale = scaleTime()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice()

    const yScale = scaleLinear()
        .domain(extent(data, yValue))
        .range([innerHeight, 0])
        .nice()

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <AxisBottom
                    xScale={xScale}
                    innerHeight={innerHeight}
                    tickFormat={xAxisTickFormat}
                    tickOffset={12}
                />
                <text
                    className="axis-label"
                    textAnchor="middle"
                    transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`}
                >
                    {yAxisLabel}
                </text>
                <AxisLeft
                    yScale={yScale}
                    innerWidth={innerWidth}
                    tickOffset={8}
                />
                <text
                    className="axis-label"
                    x={innerWidth / 2}
                    y={innerHeight + xAxisLabelOffset}
                    textAnchor="middle"
                >
                    {xAxisLabel}
                </text>
                <Marks
                    xScale={xScale}
                    yScale={yScale}
                    xValue={xValue}
                    yValue={yValue}
                    data={data}
                    tooltipFormat={xAxisTickFormat}
                    circleRadius={4}
                    showPoints={false}
                />
            </g>
        </svg>
    );
};
