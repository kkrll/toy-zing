import baseAnimation from "./purple-stars.json";

type StarColor = "purple" | "white";

const COLOR_STOPS: Record<StarColor, number[]> = {
  purple: [
    0, 0.5490196078431373, 0.1450980392156863, 0.9568627450980393, 1,
    0.5490196078431373, 0.1450980392156863, 0.9568627450980393,
  ],
  white: [0, 1, 1, 1, 1, 1, 1, 1],
};

// Walks the Lottie JSON and replaces gradient fill color stop arrays in-place.
function applyColor(node: unknown, stops: number[]): void {
  if (Array.isArray(node)) {
    node.forEach((item) => applyColor(item, stops));
    return;
  }
  if (node !== null && typeof node === "object") {
    const obj = node as Record<string, unknown>;
    if (obj["ty"] === "gf") {
      const g = obj["g"] as { k?: { k?: number[] } } | undefined;
      if (g?.k?.k) {
        g.k.k = stops;
      }
    }
    Object.values(obj).forEach((v) => applyColor(v, stops));
  }
}

export function starsAnimation(color: StarColor = "purple") {
  const clone = JSON.parse(JSON.stringify(baseAnimation));
  applyColor(clone, COLOR_STOPS[color]);
  return clone;
}
