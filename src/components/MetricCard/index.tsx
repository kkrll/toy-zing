import { cn } from "@/lib/utils";
import { ReactNode, useId, type CSSProperties } from "react";
import {
  ChartContainer,
  ChartTooltip,
  RechartsPrimitive,
  type ChartConfig,
} from "../primitives/Chart";

export type MetricChartType =
  | "line"
  | "bar"
  | "area"
  | "ratio-line"
  | "stacked-area";
export type MetricCardVariant = "brief" | "focused";
export type MetricCategory =
  | "activity"
  | "strength"
  | "cardio"
  | "flexibility"
  | "body";

export type MetricCardSecondaryMetric = {
  values: number[];
  label?: string;
  unit?: string;
  category?: MetricCategory;
};

export type MetricDiff = "absolute" | "per cent" | null | ReactNode;

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
  valueLabel,
  secondaryMetric,
  showSecondaryValue = false,
  diff = "absolute",
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
  valueLabel?: string;
  secondaryMetric?: MetricCardSecondaryMetric;
  showSecondaryValue?: boolean;
  diff?: MetricDiff;
}) => {
  const categoryStyle = CATEGORY_STYLES[category];
  const secondaryCategoryStyle = secondaryMetric
    ? CATEGORY_STYLES[secondaryMetric.category ?? "flexibility"]
    : undefined;
  const pointCount = Math.max(values.length, secondaryMetric?.values.length ?? 0);
  const data = Array.from({ length: pointCount }, (_, index) => ({
    label: `Point ${index + 1}`,
    value: values[index],
    secondaryValue: secondaryMetric?.values[index],
  }));

  const chartConfig = {
    value: {
      label: valueLabel ?? title,
      color: "var(--metric-chart-color)",
    },
    ...(secondaryMetric
      ? {
          secondaryValue: {
            label: secondaryMetric.label ?? secondaryMetric.unit ?? title,
            color: "var(--metric-secondary-chart-color)",
          },
        }
      : {}),
  } satisfies ChartConfig;

  const chartStyle = {
    "--metric-chart-color": categoryStyle.color,
    "--metric-chart-fill": categoryStyle.fill,
    "--metric-target-color": categoryStyle.target,
    "--metric-secondary-chart-color": secondaryCategoryStyle?.color,
    "--metric-secondary-chart-fill": secondaryCategoryStyle?.fill,
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
            "flex flex-col",
            secondaryMetric && showSecondaryValue && "gap-100",
            variant === "focused" && "text-right",
          )}
        >
          <MetricValue
            values={values}
            unit={unit}
            markerColor={
              secondaryMetric && showSecondaryValue
                ? categoryStyle.color
                : undefined
            }
            alignEnd={variant === "focused"}
            showSecondaryValue={showSecondaryValue}
            diff={diff}
          />
          {secondaryMetric ? (
            showSecondaryValue ? (
              <MetricValue
                values={secondaryMetric.values}
                unit={secondaryMetric.unit}
                markerColor={secondaryCategoryStyle?.color}
                alignEnd={variant === "focused"}
                showSecondaryValue
                diff={diff}
              />
            ) : (
              <MetricCompactValue
                values={secondaryMetric.values}
                unit={secondaryMetric.unit}
                label={secondaryMetric.label}
              />
            )
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
          valueLabel={valueLabel ?? title}
          secondaryUnit={secondaryMetric?.unit}
          secondaryValueLabel={secondaryMetric?.label}
          variant={variant}
          hasSecondaryMetric={Boolean(secondaryMetric)}
        />
      </ChartContainer>
    </div>
  );
};

const MetricValue = ({
  values,
  unit,
  markerColor,
  alignEnd,
  showSecondaryValue = false,
  diff = "absolute",
}: {
  values: number[];
  unit?: string;
  markerColor?: string;
  alignEnd: boolean;
  showSecondaryValue: boolean;
  diff?: MetricDiff;
}) => {
  const latestValue = values.at(-1);
  if (latestValue === undefined) {
    return null;
  }

  const diffValue = () => {
    if (diff !== "absolute" && diff !== "per cent") {
      return diff;
    }
    if (values.length <= 1) {
      return null;
    }

    const difference =
      Math.round((latestValue - values[values.length - 2]) * 10) / 10;
    return (
      <MetricDiffValue
        diff={difference}
        suffix={diff === "per cent" ? "%" : undefined}
      />
    );
  };

  return (
    <p
      className={cn(
        "flex items-baseline gap-50 text-theme-text-primary",
        alignEnd && "justify-end",
        showSecondaryValue ? "type-heading-h3" : "type-heading-h2",
      )}
    >
      {markerColor ? (
        <span
          className="h-3 w-3 shrink-0 rounded-sm"
          style={{ backgroundColor: markerColor }}
        />
      ) : null}
      <span>
        {latestValue}
        {unit && (
          <span className="type-body-lg-semi">
            {unit === "%" ? unit : ` ${unit}`}
          </span>
        )}{" "}
        {diffValue()}
      </span>
    </p>
  );
};

const MetricCompactValue = ({
  values,
  unit,
  label,
}: {
  values: number[];
  unit?: string;
  label?: string;
}) => {
  const latestValue = values.at(-1);
  if (latestValue === undefined) {
    return null;
  }

  return (
    <p className="type-body-lg-semi text-theme-text-secondary">
      {formatTooltipValue(latestValue, unit)}
      {label ? ` ${label}` : ""}
    </p>
  );
};

const MetricDiffValue = ({
  diff,
  suffix,
}: {
  diff: number;
  suffix?: string;
}) => {
  if (diff > 0) {
    return (
      <span className="type-body-lg-semi text-theme-text-green">
        ↑{diff}
        {suffix}
      </span>
    );
  }
  if (diff === 0) {
    return (
      <span className="type-body-lg-semi text-theme-text-disabled">=</span>
    );
  }
  return (
    <span className="type-body-lg-semi text-theme-text-red">
      ↓{Math.abs(diff)}
      {suffix}
    </span>
  );
};

const getBarOpacity = (value?: number, target?: number) =>
  target !== undefined && value !== undefined && value < target ? 0.5 : 1;

const MetricChart = ({
  data,
  target,
  targetArea,
  targetLabel,
  type,
  unit,
  valueLabel,
  secondaryUnit,
  secondaryValueLabel,
  variant,
  hasSecondaryMetric,
}: {
  data: Array<{
    label: string;
    value?: number;
    secondaryValue?: number;
  }>;
  target?: number;
  targetArea?: [number, number];
  targetLabel: string;
  type: MetricChartType;
  unit?: string;
  valueLabel: string;
  secondaryUnit?: string;
  secondaryValueLabel?: string;
  variant: MetricCardVariant;
  hasSecondaryMetric: boolean;
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
      <RechartsPrimitive.YAxis
        hide
        domain={
          type === "ratio-line"
            ? [0, 1]
            : type === "stacked-area"
              ? [0, "auto"]
              : ["dataMin", "dataMax"]
        }
      />
      {targetArea && type !== "ratio-line" ? (
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
      {target !== undefined && type !== "ratio-line" ? (
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
        content={
          <MetricChartTooltip
            unit={unit}
            valueLabel={valueLabel}
            secondaryUnit={secondaryUnit}
            secondaryValueLabel={secondaryValueLabel}
          />
        }
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
          minPointSize={8}
          radius={4}
        >
          {data.map((point) => (
            <RechartsPrimitive.Cell
              key={point.label}
              fillOpacity={getBarOpacity(point.value, target)}
            />
          ))}
        </RechartsPrimitive.Bar>
        {hasSecondaryMetric ? (
          <RechartsPrimitive.Bar
            dataKey="secondaryValue"
            fill="var(--color-secondaryValue)"
            minPointSize={8}
            radius={4}
          >
            {data.map((point) => (
              <RechartsPrimitive.Cell
                key={point.label}
                fillOpacity={getBarOpacity(point.secondaryValue, target)}
              />
            ))}
          </RechartsPrimitive.Bar>
        ) : null}
      </RechartsPrimitive.BarChart>
    );
  }

  if (type === "ratio-line") {
    return (
      <RechartsPrimitive.AreaChart
        {...sharedChartProps}
        stackOffset="expand"
      >
        {sharedChildren}
        {hasSecondaryMetric ? (
          <RechartsPrimitive.Area
            dataKey="secondaryValue"
            stackId="metric"
            stroke="var(--color-value)"
            strokeWidth={2}
            fill="var(--metric-secondary-chart-fill)"
            dot={{
              fill: "var(--ds-theme-fg-100)",
              stroke: "var(--ds-theme-fg-100)",
              r: 2,
            }}
          />
        ) : null}
        <RechartsPrimitive.Area
          dataKey="value"
          stackId="metric"
          stroke="none"
          fill="var(--metric-chart-fill)"
          dot={false}
          activeDot={false}
        />
      </RechartsPrimitive.AreaChart>
    );
  }

  if (type === "stacked-area") {
    return (
      <RechartsPrimitive.AreaChart {...sharedChartProps}>
        {sharedChildren}
        {hasSecondaryMetric ? (
          <RechartsPrimitive.Area
            dataKey="secondaryValue"
            stackId="metric"
            stroke="var(--color-secondaryValue)"
            strokeWidth={2}
            fill="var(--metric-secondary-chart-fill)"
            dot={{
              fill: "var(--ds-theme-fg-100)",
              stroke: "var(--ds-theme-fg-100)",
              r: 2,
            }}
          />
        ) : null}
        <RechartsPrimitive.Area
          dataKey="value"
          stackId="metric"
          stroke="var(--color-value)"
          strokeWidth={2}
          fill="var(--metric-chart-fill)"
          dot={{
            fill: "var(--ds-theme-fg-100)",
            stroke: "var(--ds-theme-fg-100)",
            r: 2,
          }}
        />
      </RechartsPrimitive.AreaChart>
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
        {hasSecondaryMetric ? (
          <RechartsPrimitive.Area
            dataKey="secondaryValue"
            stroke="var(--color-secondaryValue)"
            strokeWidth={2}
            fill="transparent"
            dot={{
              fill: "var(--ds-theme-fg-100)",
              stroke: "var(--ds-theme-fg-100)",
              r: 2,
            }}
          />
        ) : null}
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
      {hasSecondaryMetric ? (
        <RechartsPrimitive.Line
          dataKey="secondaryValue"
          stroke="var(--color-secondaryValue)"
          strokeWidth={2}
          dot={{
            fill: "var(--ds-theme-fg-100)",
            stroke: "var(--ds-theme-fg-100)",
            r: 2,
          }}
        />
      ) : null}
    </RechartsPrimitive.LineChart>
  );
};

type MetricTargetLabelViewBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const isMetricTargetLabelViewBox = (
  viewBox: unknown,
): viewBox is MetricTargetLabelViewBox =>
  typeof viewBox === "object" &&
  viewBox !== null &&
  "x" in viewBox &&
  typeof viewBox.x === "number" &&
  "y" in viewBox &&
  typeof viewBox.y === "number" &&
  "width" in viewBox &&
  typeof viewBox.width === "number" &&
  "height" in viewBox &&
  typeof viewBox.height === "number";

const createMetricTargetLabel = (
  target: number,
  targetLabel: string,
  unit?: string,
) => {
  const MetricTargetLabel = ({ viewBox }: { viewBox?: unknown }) => {
    if (!isMetricTargetLabelViewBox(viewBox)) {
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
  unit,
  valueLabel,
  secondaryUnit,
  secondaryValueLabel,
}: {
  active?: boolean;
  payload?: ReadonlyArray<{
    dataKey?: string | number;
    value?: number;
  }>;
  unit?: string;
  valueLabel: string;
  secondaryUnit?: string;
  secondaryValueLabel?: string;
}) => {
  if (!active || !payload?.length) {
    return null;
  }

  const entries = payload
    .filter(
      (entry): entry is { dataKey?: string | number; value: number } =>
        typeof entry.value === "number",
    )
    .toSorted(
      (a, b) =>
        Number(a.dataKey === "secondaryValue") -
        Number(b.dataKey === "secondaryValue"),
    );
  if (!entries.length) {
    return null;
  }

  return (
    <div className="flex items-center gap-100 whitespace-nowrap rounded-sm bg-theme-bg-100 px-100 py-50 type-body-sm-medium tabular-nums text-theme-text-primary shadow-sm">
      {entries.map((entry, index) => {
        const isSecondary = entry.dataKey === "secondaryValue";
        const entryUnit = isSecondary ? secondaryUnit : unit;
        const entryLabel = isSecondary ? secondaryValueLabel : valueLabel;

        return (
          <span key={`${entry.dataKey ?? index}`} className="flex gap-50">
            {index > 0 ? <span aria-hidden="true">|</span> : null}
            <span>
              {formatTooltipValue(entry.value, entryUnit)}
              {entryLabel ? ` ${entryLabel}` : ""}
            </span>
          </span>
        );
      })}
    </div>
  );
};

const formatTooltipValue = (value: number, unit?: string) => {
  if (!unit) {
    return value;
  }
  return unit.startsWith("%") ? `${value}${unit}` : `${value} ${unit}`;
};

export default MetricCard;
