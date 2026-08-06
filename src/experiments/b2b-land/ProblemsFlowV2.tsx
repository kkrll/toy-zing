"use client";

import { cn } from "@/lib/utils";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { Sankey } from "recharts";
import styles from "./problems.module.css";

// Node order matters — indices are referenced by the links below.
const NODES = [
  { name: "All members" }, // 0
  { name: "Work with a PT" }, // 1
  { name: "Start training without a PT" }, // 2
  { name: "Continue membership" }, // 3
  { name: "Churn without PT attention" }, // 4
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
  "var(--color-grey-300)", // 4 churn
];

// Ribbon fill per link index (rendered translucent).
const LINK_STROKE = [
  "var(--color-orchid-500)",
  "var(--color-orchid-300)",
  "var(--color-orchid-500)",
  "var(--color-orchid-200)",
  "var(--color-grey-300)",
];

/** Links leaving "All members" — the tier that pans out of frame. */
const TIER_1_LINKS = [0, 1];

/** The column shared by both tiers, so it survives the pan and swaps label side. */
const MIDDLE_NODES = [1, 2];

const NODE_WIDTH = 8;
const CHART_HEIGHT = 420;

/** Frame width, so the chart can be laid out wider than the box that crops it. */
const useFrameWidth = () => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [frameWidth, setFrameWidth] = useState(0);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const observer = new ResizeObserver(([entry]) => {
      setFrameWidth(entry.contentRect.width);
    });

    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return { frameRef, frameWidth };
};

type NodeRenderProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
  payload: { name: string; value: number; sourceLinks: number[] };
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

const nodeBarClass = (index: number) => {
  if (index === 0) return styles.nodeSource;
  if (MIDDLE_NODES.includes(index)) return styles.nodeMiddle;
  // The end column sits outside the frame until the pan brings it in, already full.
  return undefined;
};

const renderNode = ({
  x,
  y,
  width,
  height,
  index,
  payload,
}: NodeRenderProps) => {
  // The start node labels on its right; every other node labels on its left,
  // except the middle column once the pan puts it against the frame's edge.
  const isStart = payload.sourceLinks.length === 0;
  const isMiddle = MIDDLE_NODES.includes(index);
  const endY = y + height;

  const label = (
    labelX: number,
    anchor: "start" | "end",
    beatClass: string | undefined,
  ) => (
    <g className={beatClass}>
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
    </g>
  );

  return (
    <g key={`node-${index}`}>
      <rect
        className={cn(styles.node, nodeBarClass(index))}
        x={x}
        y={y}
        width={width}
        height={height}
        fill={NODE_FILL[index]}
        stroke="var(--color-orchid-200)"
        strokeWidth={1}
      />
      {isStart && label(x + width + 10, "start", styles.labelSource)}
      {isMiddle && label(x - 10, "end", styles.labelMiddleLeft)}
      {isMiddle && label(x + width + 10, "start", styles.labelMiddleRight)}
      {!isStart && !isMiddle && label(x - 10, "end", styles.labelEnd)}
    </g>
  );
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
    className={
      TIER_1_LINKS.includes(index) ? styles.linkTier1 : styles.linkTier2
    }
    d={`M${sourceX},${sourceY}C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}`}
    fill="none"
    stroke={LINK_STROKE[index]}
    strokeWidth={linkWidth}
    strokeOpacity={0.45}
    pathLength={1}
  />
);

export const ProblemsFlowV2 = () => {
  const { frameRef, frameWidth } = useFrameWidth();

  // Double width puts each tier's far column exactly on a frame edge.
  const chartWidth = frameWidth * 2 - NODE_WIDTH;

  return (
    <div
      ref={frameRef}
      className="w-full overflow-hidden"
      style={{ height: CHART_HEIGHT }}
    >
      {frameWidth > 0 && (
        <div
          className={styles.chartPan}
          style={
            {
              width: chartWidth,
              "--pan-x": `${-(frameWidth - NODE_WIDTH)}px`,
            } as CSSProperties
          }
        >
          <Sankey
            width={chartWidth}
            height={CHART_HEIGHT}
            data={DATA}
            nodeWidth={NODE_WIDTH}
            nodePadding={80}
            linkCurvature={0.5}
            sort={false}
            margin={{ top: 40, right: 0, bottom: 0, left: 0 }}
            node={renderNode}
            link={renderLink}
          >
            {/* no tooltip — values are shown inline on the nodes */}
          </Sankey>
        </div>
      )}
    </div>
  );
};
