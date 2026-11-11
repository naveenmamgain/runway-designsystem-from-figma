import React from "react";

/**
 * Runway Stamp — Figma: stamp (1700:34107).
 * Pure illustration: Figma binds no variables, so nothing here is tokenised. Artwork is bundled as PNG in ./assets
 * (1× exports; see spec.md). Pass `src` to use your own (e.g. SVG) export instead.
 */

export type StampName =
  | "0 commission plan"
  | "fixed commission"
  | "work zone-0 commission"
  | "fixed earnings per km"
  | "work zone- extra earnings"
  | "0 commission lifetime guarantee";

const FILES: Record<StampName, string> = {
  "0 commission plan": "0-commission-plan.png",
  "fixed commission": "fixed-commission.png",
  "work zone-0 commission": "work-zone-0-commission.png",
  "fixed earnings per km": "fixed-earnings-per-km.png",
  "work zone- extra earnings": "work-zone-extra-earnings.png",
  "0 commission lifetime guarantee": "0-commission-lifetime-guarantee.png",
};

/**
 * Rendered sizes (raw). Figma frames are 164 × 164, except "fixed commission" whose frame is 198.67 × 164 but whose
 * artwork overflows it; its PNG is the full rendered bounds (211 × 204), so it is shown at that size.
 */
const SIZE: Record<StampName, { width: number; height: number }> = {
  "0 commission plan": { width: 164, height: 164 },
  "fixed commission": { width: 211, height: 204 },
  "work zone-0 commission": { width: 164, height: 164 },
  "fixed earnings per km": { width: 164, height: 164 },
  "work zone- extra earnings": { width: 164, height: 164 },
  "0 commission lifetime guarantee": { width: 164, height: 164 },
};

const ALT: Record<StampName, string> = {
  "0 commission plan": "0% commission plan",
  "fixed commission": "Fixed commission",
  "work zone-0 commission": "Work zone 0% commission",
  "fixed earnings per km": "Fixed earnings per km",
  "work zone- extra earnings": "Work zone extra earnings",
  "0 commission lifetime guarantee": "0% commission lifetime guarantee",
};

export interface StampProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  /** Figma variant "name". */
  name?: StampName;
  /** Override the bundled PNG. */
  src?: string;
}

export function Stamp({ name = "fixed commission", src, alt, style, ...rest }: StampProps) {
  const url = src ?? new URL(`./assets/${FILES[name]}`, import.meta.url).href;
  const { width, height } = SIZE[name];
  return (
    <img
      src={url}
      alt={alt ?? ALT[name]}
      width={width}
      height={height}
      style={{ display: "inline-block", width, height, objectFit: "contain", ...style }}
      {...rest}
    />
  );
}

export default Stamp;
