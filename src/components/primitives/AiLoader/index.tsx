import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";

import { starsAnimation } from "./starsAnimation";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

export type AiLoaderProps = {
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  color?: "purple" | "white";
};

export function AiLoader({
  autoplay = true,
  className,
  color = "white",
  loop = true,
}: AiLoaderProps) {
  return (
    <span className={cn("inline-flex size-full shrink-0", className)} aria-hidden="true">
      <Lottie
        animationData={starsAnimation(color)}
        autoplay={autoplay}
        loop={loop}
        className="size-full"
      />
    </span>
  );
}
