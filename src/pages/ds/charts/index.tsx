"use client";
import MetricCard, { MetricCardVariant } from "@/components/MetricCard";
import { cn } from "@/lib/utils";
import { useState } from "react";

const ChartsPage = () => {
  const [variant, setVariant] = useState<MetricCardVariant>("brief");
  return (
    <main className="p-200  md:p-1000">
      <header className="mb-600">
        <h1 className="mb-200">Charts</h1>
        <p className="type-body-lg text-theme-text-secondary max-w-3xl">
          Use <span className="text-theme-text-primary">MetricCard</span> to
          show metric trends. Pass{" "}
          <span className="text-theme-text-primary">values</span>,{" "}
          <span className="text-theme-text-primary">type</span> (line, bar, or
          area), <span className="text-theme-text-primary">category</span> for
          color theming, and optional{" "}
          <span className="text-theme-text-primary">target</span>,{" "}
          <span className="text-theme-text-primary">targetArea</span>, and{" "}
          <span className="text-theme-text-primary">unit</span> for the
          reference line and healthy range.
        </p>
      </header>

      <div className="flex flex-col gap-3 bg-theme-bg-chat w-full p-8 rounded-4xl">
        <div className="flex p-1 bg-white-24 gap-50 rounded-2xl w-48">
          {["brief", "focused"].map((v) => {
            return (
              <button
                key={v}
                onClick={() => setVariant(v as MetricCardVariant)}
                className={cn(
                  "px-3 py-1 rounded-xl w-full transition-colors duration-150",
                  v === variant
                    ? "bg-theme-fg-100 text-theme-bg-100"
                    : "text-theme-fg-100 cursor-pointer hover:bg-white-64 hover:text-theme-bg-100",
                )}
              >
                {v}
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] mb-200 gap-100 w-full ">
          <MetricCard
            title="Activity"
            values={[76, 78, 81, 80, 82]}
            category="activity"
            target={80}
            variant={variant}
            targetArea={[80, 100]}
            type="line"
            caption={
              <p className="type-body-sm-medium text-theme-text-secondary">
                Healthy
              </p>
            }
          />
          <MetricCard
            title="Strength"
            values={[42, 48, 46, 52, 55, 55]}
            category="strength"
            target={50}
            variant={variant}
            type="bar"
            unit="pt"
            caption={
              <p className="type-body-sm-medium text-theme-text-secondary">
                Above average
              </p>
            }
          />
          <MetricCard
            title="Flexibility"
            values={[34, 39, 37, 43, 41]}
            category="flexibility"
            variant={variant}
            type="area"
          />
          <MetricCard
            title="Weight"
            values={[66.8, 65.4, 64.6, 62.9, 63.6]}
            category="body"
            variant={variant}
            target={62}
            unit="kg"
            type="area"
          />
          <MetricCard
            title="Cardio"
            values={[61, 58, 64, 62, 63]}
            category="cardio"
            variant={variant}
            target={61}
            unit="bpm"
            type="area"
          />
          <MetricCard
            title="Body"
            values={[88, 87, 89, 88, 90, 88, 87, 89, 88, 90]}
            category="body"
            variant={variant}
            target={88}
            type="bar"
          />
        </div>
      </div>
    </main>
  );
};

export default ChartsPage;
