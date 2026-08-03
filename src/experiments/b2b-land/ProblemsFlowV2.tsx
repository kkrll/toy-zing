"use client";

import { useEffect, useRef, useState } from "react";
import { Layer, Rectangle, Sankey } from "recharts";

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

/** Which scroll phase draws each link. */
const LINK_PHASE = [1, 1, 2, 2, 2];

/** Which scroll phase reveals each node, and how far into that phase. */
const NODE_PHASE = [1, 1, 1, 2, 2];
const NODE_REVEAL_FROM = [0, 0.72, 0.72, 0.72, 0.72];
const NODE_REVEAL_TO = [0.14, 1, 1, 1, 1];

/** "All members" — the tier it splits is self-evident once the flow is in frame. */
const SOURCE_NODE = 0;

/** The column shared by both tiers, so it survives the pan and swaps label side. */
const MIDDLE_NODES = [1, 2];

const NODE_WIDTH = 8;
const CHART_HEIGHT = 420;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const range = (value: number, from: number, to: number) =>
  clamp01((value - from) / (to - from));

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

type ProblemsFlowV2Props = {
  /** 0–1 draw progress for the tier that leaves "All members". */
  phase1: number;
  /** 0–1 draw progress for the tier that leaves the second column. */
  phase2: number;
  /**
   * The chart is always laid out at double the frame width. 0 frames the first
   * tier, 1 slides across to frame the second.
   */
  pan: number;
};

export const ProblemsFlowV2 = ({
  phase1,
  phase2,
  pan,
}: ProblemsFlowV2Props) => {
  const { frameRef, frameWidth } = useFrameWidth();

  // Double width puts each tier's far column exactly on a frame edge.
  const chartWidth = frameWidth * 2 - NODE_WIDTH;
  const panX = -pan * (frameWidth - NODE_WIDTH);

  const phaseProgress = (phase: number) => (phase === 1 ? phase1 : phase2);

  // "All members" and its ribbons clear out as the second tier takes the frame.
  const sourceFade = range(pan, 0.55, 0.05);

  // The middle column's labels change sides mid-pan, so blink them across.
  const swapFade = 1 - range(pan, 0.2, 0.45) + range(pan, 0.55, 0.8);

  const renderNode = ({
    x,
    y,
    width,
    height,
    index,
    payload,
  }: NodeRenderProps) => {
    const reveal = range(
      phaseProgress(NODE_PHASE[index]),
      NODE_REVEAL_FROM[index],
      NODE_REVEAL_TO[index],
    );

    // The start node labels on its right; every other node labels on its left,
    // except the middle column once the pan puts it against the frame's edge.
    const isStart = payload.sourceLinks.length === 0;
    const isMiddle = MIDDLE_NODES.includes(index);
    const onRight = isStart || (isMiddle && pan > 0.5);
    const labelX = onRight ? x + width + 10 : x - 10;
    const anchor = onRight ? "start" : "end";
    const endY = y + height;

    return (
      <Layer
        key={`node-${index}`}
        opacity={index === SOURCE_NODE ? sourceFade : 1}
      >
        <Rectangle
          x={x}
          y={y}
          width={width}
          height={height * reveal}
          fill={NODE_FILL[index]}
          stroke="var(--color-orchid-200)"
          strokeWidth={reveal > 0 ? 1 : 0}
        />
        <g
          opacity={reveal * (isMiddle ? swapFade : 1)}
          transform={`translate(0 ${(1 - reveal) * 10})`}
        >
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
      </Layer>
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
  }: LinkRenderProps) => {
    const drawn = clamp01(phaseProgress(LINK_PHASE[index]));
    // Phase 1 links are exactly the ribbons leaving the source node.
    const fade = LINK_PHASE[index] === 1 ? sourceFade : 1;

    return (
      <path
        key={`link-${index}`}
        d={`M${sourceX},${sourceY}C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}`}
        fill="none"
        stroke={LINK_STROKE[index]}
        strokeWidth={linkWidth}
        strokeOpacity={0.45 * fade}
        // Normalised length so the ribbon can be wiped in without measuring it.
        pathLength={1}
        strokeDasharray="1 1"
        strokeDashoffset={1 - drawn}
      />
    );
  };

  return (
    <div
      ref={frameRef}
      className="w-full overflow-hidden"
      style={{ height: CHART_HEIGHT }}
    >
      {frameWidth > 0 && (
        <div style={{ width: chartWidth, transform: `translateX(${panX}px)` }}>
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
