import { cn } from "@/lib/utils";
import { ReactNode, useId, type CSSProperties } from "react";
import {
  ChartContainer,
  ChartTooltip,
  RechartsPrimitive,
  type ChartConfig,
} from "../primitives/Chart";

type MetricChartType = "line" | "bar" | "area";
export type MetricCardVariant = "brief" | "focused";
type MetricCategory =
  "activity" | "strength" | "cardio" | "flexibility" | "body";

const CATEGORY_STYLES: Record<
  MetricCategory,
  {
    color: string;
    fill: string;
    target: string;
  }
> = {
  activity: {
    color: "var(--ds-theme-text-green)",
    fill: "var(--ds-theme-bg-green-100)",
    target: "var(--ds-theme-fg-600)",
  },
  strength: {
    color: "var(--ds-color-yellow-500)",
    fill: "var(--ds-color-yellow-100)",
    target: "var(--ds-theme-fg-600)",
  },
  cardio: {
    color: "var(--ds-theme-text-red)",
    fill: "var(--ds-theme-bg-red-100)",
    target: "var(--ds-theme-fg-600)",
  },
  flexibility: {
    color: "var(--ds-theme-text-blue)",
    fill: "var(--ds-theme-bg-blue-100)",
    target: "var(--ds-theme-fg-600)",
  },
  body: {
    color: "var(--ds-theme-text-orchid)",
    fill: "var(--ds-theme-bg-orchid-100)",
    target: "var(--ds-theme-fg-600)",
  },
};

const MetricCard = ({
  title,
  values,
  type = "line",
  category = "activity",
  variant = "brief",
  target,
  targetArea,
  targetLabel = "Goal",
  unit,
  caption,
}: {
  title: string;
  values: number[];
  type?: MetricChartType;
  category?: MetricCategory;
  variant?: MetricCardVariant;
  target?: number;
  targetArea?: [number, number];
  targetLabel?: string;
  unit?: string;
  caption?: ReactNode;
}) => {
  const categoryStyle = CATEGORY_STYLES[category];
  const data = values.map((value, index) => ({
    label: `Point ${index + 1}`,
    value,
  }));
  const latestValue = values.at(-1);
  const getDiff = () => {
    if (values.length > 1) {
      const diff =
        Math.round(
          (values[values.length - 1] - values[values.length - 2]) * 10,
        ) / 10;
      if (diff > 0)
        return (
          <span className="type-body-lg-semi text-theme-text-green">
            ↑{diff}
          </span>
        );
      if (diff === 0)
        return (
          <span className="type-body-lg-semi text-theme-text-disabled">=</span>
        );
      return (
        <span className="type-body-lg-semi text-theme-text-red">
          ↓{Math.abs(diff)}
        </span>
      );
    }
    return undefined;
  };

  const diff = getDiff();

  const chartConfig = {
    value: {
      label: title,
      color: "var(--metric-chart-color)",
    },
  } satisfies ChartConfig;

  const chartStyle = {
    "--metric-chart-color": categoryStyle.color,
    "--metric-chart-fill": categoryStyle.fill,
    "--metric-target-color": categoryStyle.target,
  } as CSSProperties;

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-3xl bg-theme-bg-100 px-200 pt-200",
        variant === "brief" && "flex-row gap-300 pb-200",
        variant === "focused" && "flex-col gap-50 pb-150",
      )}
    >
      <div
        className={cn(
          "flex-1 flex justify-between h-full",
          variant === "brief" && "flex-col",
          variant === "focused" && "flex-row w-full",
        )}
      >
        <div className="flex flex-col mb-4">
          <h1 className="type-body-lg-semi text-theme-text-primary">{title}</h1>
          <p className="text-theme-text-secondary type-body-caption">
            Aug 5, 2022
          </p>
        </div>
        <div
          className={cn(
            "flex flex-col ",
            variant === "focused" && "text-right",
          )}
        >
          {latestValue !== undefined ? (
            <p className={cn("type-counter-xs text-theme-text-primary")}>
              {latestValue}
              {unit && <span className="type-body-lg-semi">{` ` + unit}</span>}
              {` `}
              {values.length > 1 && diff}
            </p>
          ) : null}
          {caption}
        </div>
      </div>
      <ChartContainer
        config={chartConfig}
        className={cn(
          "h-full  [&_.recharts-tooltip-cursor]:hidden",
          variant === "brief" && "w-36",
          variant === "focused" && "w-full h-20",
        )}
        style={chartStyle}
      >
        <MetricChart
          data={data}
          target={target}
          targetArea={targetArea}
          targetLabel={targetLabel}
          type={type}
          unit={unit}
          variant={variant}
        />
      </ChartContainer>
    </div>
  );
};

const MetricChart = ({
  data,
  target,
  targetArea,
  targetLabel,
  type,
  unit,
  variant,
}: {
  data: Array<{ label: string; value: number }>;
  target?: number;
  targetArea?: [number, number];
  targetLabel: string;
  type: MetricChartType;
  unit?: string;
  variant: MetricCardVariant;
}) => {
  const areaGradientId = useId().replace(/:/g, "");
  const [targetAreaMin, targetAreaMax] = targetArea ?? [];
  const showTargetLabel = variant === "focused";

  const sharedChartProps = {
    accessibilityLayer: true,
    data,
    margin: {
      left: 8,
      right: 8,
      top: 8,
      bottom: showTargetLabel ? 22 : 8,
    },
  };

  const sharedChildren = (
    <>
      <RechartsPrimitive.XAxis dataKey="label" hide />
      <RechartsPrimitive.YAxis hide domain={["dataMin", "dataMax"]} />
      {targetArea ? (
        <RechartsPrimitive.ReferenceArea
          y1={targetAreaMin}
          y2={targetAreaMax}
          fill="var(--metric-chart-fill)"
          fillOpacity={0.44}
          strokeOpacity={0}
          ifOverflow="hidden"
          zIndex={-50}
        />
      ) : null}
      {target !== undefined ? (
        <RechartsPrimitive.ReferenceLine
          y={target}
          stroke="var(--metric-target-color)"
          strokeDasharray="4 3"
          ifOverflow="extendDomain"
          label={
            showTargetLabel
              ? {
                  position: "insideBottomRight",
                  offset: 8,
                  content: createMetricTargetLabel(target, targetLabel, unit),
                }
              : false
          }
        />
      ) : null}
      <ChartTooltip
        cursor={false}
        isAnimationActive={false}
        offset={6}
        content={<MetricChartTooltip />}
      />
    </>
  );

  if (type === "bar") {
    return (
      <RechartsPrimitive.BarChart {...sharedChartProps}>
        {sharedChildren}
        <RechartsPrimitive.Bar
          dataKey="value"
          fill="var(--color-value)"
          radius={4}
        />
      </RechartsPrimitive.BarChart>
    );
  }

  if (type === "area") {
    return (
      <RechartsPrimitive.AreaChart {...sharedChartProps}>
        <defs>
          <linearGradient id={areaGradientId} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--metric-chart-color)"
              stopOpacity={0.4}
            />
            <stop
              offset="95%"
              stopColor="var(--metric-chart-color)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        {sharedChildren}
        <RechartsPrimitive.Area
          dataKey="value"
          stroke="var(--color-value)"
          strokeWidth={2}
          fill={`url(#${areaGradientId})`}
          dot={{
            fill: "var(--ds-theme-fg-100)",
            stroke: "var(--ds-theme-fg-100)",
            r: 2,
          }}
        />
      </RechartsPrimitive.AreaChart>
    );
  }

  return (
    <RechartsPrimitive.LineChart {...sharedChartProps}>
      {sharedChildren}
      <RechartsPrimitive.Line
        dataKey="value"
        stroke="var(--color-value)"
        strokeWidth={2}
        dot={{
          fill: "var(--ds-theme-fg-100)",
          stroke: "var(--ds-theme-fg-100)",
          r: 2,
        }}
      />
    </RechartsPrimitive.LineChart>
  );
};

type MetricTargetLabelViewBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const createMetricTargetLabel = (
  target: number,
  targetLabel: string,
  unit?: string,
) => {
  const MetricTargetLabel = ({
    viewBox,
  }: {
    viewBox?: MetricTargetLabelViewBox;
  }) => {
    if (!viewBox) {
      return null;
    }

    const labelWidth = 96;
    const labelHeight = 14;

    return (
      <foreignObject
        x={viewBox.x + viewBox.width - labelWidth}
        y={viewBox.y + 6}
        width={labelWidth}
        height={labelHeight}
        className="overflow-visible"
      >
        <div className="ml-auto flex justify-end gap-50 whitespace-nowrap type-body-caption leading-none bg-theme-bg-100/50 backdrop-blur-md p-1 rounded-md w-fit">
          <span style={{ color: "var(--metric-chart-color)" }}>
            {targetLabel}:
          </span>
          <span
            className="font-semibold"
            style={{ color: "var(--metric-chart-color)" }}
          >
            {target}
            {unit ? ` ${unit}` : ""}
          </span>
        </div>
      </foreignObject>
    );
  };

  return MetricTargetLabel;
};

const MetricChartTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: ReadonlyArray<{ value?: number }>;
}) => {
  if (!active || !payload?.length) {
    return null;
  }

  const value = payload[0]?.value;
  if (value === undefined || value === null) {
    return null;
  }

  return (
    <div className="rounded-sm bg-theme-bg-100 px-50 py-50 type-body-sm-medium tabular-nums text-theme-text-primary shadow-sm">
      {value}
    </div>
  );
};

export default MetricCard;
