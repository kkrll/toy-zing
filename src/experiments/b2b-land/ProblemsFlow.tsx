"use client";

import { Layer, Rectangle, ResponsiveContainer, Sankey } from "recharts";

// Node order matters — indices are referenced by the links below.
const NODES = [
  { name: "All members" }, // 0
  { name: "Work with a PT" }, // 1
  { name: "Start training without a PT" }, // 2
  { name: "Continue membership" }, // 4
  { name: "Churn without PT attention" }, // 5
];

const LINKS = [
  { source: 0, target: 1, value: 5 },
  { source: 0, target: 2, value: 95 },
  { source: 1, target: 3, value: 5 },
  { source: 2, target: 3, value: 45 },
  { source: 2, target: 4, value: 50 },
];

const DATA = { nodes: NODES, links: LINKS };

// Fill per node index.
const NODE_FILL = [
  "var(--color-orchid-400)", // 0 all members
  "var(--color-orchid-500)", // 1 work with a PT
  "var(--color-orchid-300)", // 2 without a PT
  "var(--color-orchid-500)", // 3 retained (PT)
  "var(--color-grey-300)", // 5 churn
];

// Ribbon fill per link index (rendered translucent).
const LINK_STROKE = [
  "var(--color-orchid-500)",
  "var(--color-orchid-300)",
  "var(--color-orchid-500)",
  "var(--color-orchid-200)",
  "var(--color-grey-300)",
];

type NodeRenderProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
  payload: { name: string; value: number; sourceLinks: number[] };
};

const renderNode = ({
  x,
  y,
  width,
  height,
  index,
  payload,
}: NodeRenderProps) => {
  // Only the start node (no incoming links) labels on the right; all others left.
  const isStart = payload.sourceLinks.length === 0;
  const labelX = isStart ? x + width + 10 : x - 10;
  const anchor = isStart ? "start" : "end";
  const endY = y + height;

  return (
    <Layer key={`node-${index}`}>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={NODE_FILL[index]}
        stroke="var(--color-orchid-200)"
        strokeWidth={1}
      />
      <text
        x={labelX}
        y={endY - 48}
        textAnchor={anchor}
        dominantBaseline="middle"
        className="type-body-lg-semi fill-theme-text-orchid"
      >
        {payload.name}
      </text>
      <text
        x={labelX}
        y={endY - 28}
        textAnchor={anchor}
        dominantBaseline="middle"
        className="type-body-sm fill-theme-text-orchid"
      >
        {payload.value}%
      </text>
    </Layer>
  );
};

type LinkRenderProps = {
  sourceX: number;
  sourceY: number;
  sourceControlX: number;
  targetX: number;
  targetY: number;
  targetControlX: number;
  linkWidth: number;
  index: number;
};

const renderLink = ({
  sourceX,
  sourceY,
  sourceControlX,
  targetX,
  targetY,
  targetControlX,
  linkWidth,
  index,
}: LinkRenderProps) => (
  <path
    key={`link-${index}`}
    d={`M${sourceX},${sourceY}C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}`}
    fill="none"
    stroke={LINK_STROKE[index]}
    strokeWidth={linkWidth}
    strokeOpacity={0.45}
  />
);

export const ProblemsFlow = () => {
  return (
    <div className="w-full h-[420px]">
      <ResponsiveContainer width="100%" height="100%">
        <Sankey
          data={DATA}
          nodeWidth={8}
          nodePadding={80}
          linkCurvature={0.5}
          sort={false}
          margin={{ top: 40, right: 0, bottom: 0, left: 0 }}
          node={renderNode}
          link={renderLink}
        >
          {/* no tooltip — values are shown inline on the nodes */}
        </Sankey>
      </ResponsiveContainer>
    </div>
  );
};
