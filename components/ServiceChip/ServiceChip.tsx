import React, { type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";

/**
 * Runway service chip — Figma: `.Service Chips` (2315:2010, 18 variants) and
 * `.Service Chip Icons` (2315:1487, 13 variants), page "OA screen and cards".
 * Both are private (dot-prefixed) in Figma; they are used inside the OA card header.
 * Requires tokens/tokens.css. Glyphs are passed in as ReactNode and should paint with currentColor.
 */

/* ------------------------------------------------------------------ Service Chip Icon */

export type ServiceChipIconType =
  | "Bike Taxi"
  | "Scooty"
  | "Food"
  | "Grocery"
  | "Parcel"
  | "Auto"
  | "Auto Plus"
  | "Share"
  | "Pet"
  | "Cab Economy"
  | "Cab Sedan"
  | "Cab XL"
  | "Cab Premium";

type IconTone = "neutral" | "info" | "premium" | "inverse" | "food" | "grocery" | "parcel" | "pet";

// Premium gradient (Scooty, Auto Plus, Cab Premium): raw values, no variables bound in Figma.
// Fill: Figma gradientTransform [[0,1,0],[-1,0,1]] = top → bottom.
const PREMIUM_FILL = "linear-gradient(180deg, #bc9f58 0%, #fdf9d4 100%)";
// Stroke: Figma gradientTransform [[0.64,0.523,-0.113],[-0.523,0.64,0.443]] — direction converted to a CSS angle (≈129.25deg).
const PREMIUM_STROKE = "linear-gradient(129.25deg, #bea157 0%, #f9f2c9 100%)";

const ICON_TONE: Record<IconTone, { bg: string; glyph: string; gradient?: boolean }> = {
  neutral: { bg: "var(--surface-neutral-dark)", glyph: "var(--surface-neutral-white)" },
  info: { bg: "var(--surface-information-dark)", glyph: "var(--surface-neutral-white)" },
  premium: { bg: PREMIUM_FILL, glyph: "var(--surface-neutral-black)", gradient: true },
  // Corporate chips override the icon background to white and the glyph to black.
  inverse: { bg: "var(--surface-neutral-white)", glyph: "var(--surface-neutral-black)" },
  food: { bg: "#5e9076", glyph: "var(--base-neutral-white)" }, // raw (glyph uses remote style "Neutrals/White")
  grocery: { bg: "var(--base-green-green-600)", glyph: "var(--base-neutral-white)" }, // unbound in Figma; equal to Base-Green/Green 600 and Base-Neutral/White
  parcel: { bg: "#bc7c46", glyph: "var(--base-neutral-white)" }, // raw (glyph uses remote style "Color/Palette/White")
  pet: { bg: "#844301", glyph: "var(--base-neutral-white)" }, // raw
};

const TYPE_TONE: Record<ServiceChipIconType, IconTone> = {
  "Bike Taxi": "neutral",
  Auto: "neutral",
  "Cab Economy": "neutral",
  "Cab Sedan": "neutral",
  "Cab XL": "neutral",
  Share: "info",
  Scooty: "premium",
  "Auto Plus": "premium",
  "Cab Premium": "premium",
  Food: "food",
  Grocery: "grocery",
  Parcel: "parcel",
  Pet: "pet",
};

// Cab glyphs (Economy, Sedan, XL) are painted Surface/Neutral/Light instead of white.
const CAB_GLYPH = "var(--surface-neutral-light)";

export interface ServiceChipIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  type?: ServiceChipIconType;
  /** 16×16 glyph (paints with currentColor). */
  glyph?: ReactNode;
  /** Internal: corporate chips render the icon white with a black glyph. */
  inverse?: boolean;
}

export function ServiceChipIcon({ type = "Bike Taxi", glyph, inverse, style, ...rest }: ServiceChipIconProps) {
  const tone = ICON_TONE[inverse ? "inverse" : TYPE_TONE[type]];
  const isCab = type === "Cab Economy" || type === "Cab Sedan" || type === "Cab XL";
  const glyphColor = !inverse && isCab ? CAB_GLYPH : tone.glyph;

  const root: CSSProperties = {
    boxSizing: "border-box",
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: "none",
    width: 20, // raw
    height: 20, // raw
    padding: 2, // raw
    borderRadius: 24, // raw
    color: glyphColor,
    ...(tone.gradient
      ? {
          // 1px INSIDE gradient stroke + gradient fill.
          border: "1px solid transparent",
          background: `${PREMIUM_FILL} padding-box, ${PREMIUM_STROKE} border-box`,
        }
      : { background: tone.bg }),
    ...style,
  };

  return (
    <span style={root} aria-hidden {...rest}>
      <span style={{ display: "inline-flex", width: 16, height: 16, alignItems: "center", justifyContent: "center" }}>{glyph}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ Service Chip */

export type ServiceChipSubService =
  | "Bike"
  | "Scooty"
  | "Food"
  | "Grocery"
  | "Parcel Delivery"
  | "Bike Corporate"
  | "Auto"
  | "Auto Plus"
  | "Share"
  | "Pet"
  | "Auto Parcel"
  | "Auto Corporate"
  | "Cab Economy"
  | "Cab Sedan"
  | "Cab XL"
  | "Cab Premium"
  | "Cab Share"
  | "Cab Corporate";

type ChipTone = "default" | "corporate" | "premium";

const SUB_SERVICE: Record<ServiceChipSubService, { label: string; icon: ServiceChipIconType; tone: ChipTone }> = {
  Bike: { label: "Bike", icon: "Bike Taxi", tone: "default" },
  Scooty: { label: "Scooty", icon: "Scooty", tone: "premium" },
  Food: { label: "Food Delivery", icon: "Food", tone: "default" },
  Grocery: { label: "Grocery Delivery", icon: "Grocery", tone: "default" },
  "Parcel Delivery": { label: "Parcel Delivery", icon: "Parcel", tone: "default" },
  "Bike Corporate": { label: "Bike Corporate", icon: "Bike Taxi", tone: "corporate" },
  Auto: { label: "Auto", icon: "Auto", tone: "default" },
  "Auto Plus": { label: "Auto Plus", icon: "Auto Plus", tone: "premium" },
  Share: { label: "Auto Share", icon: "Share", tone: "default" },
  Pet: { label: "Auto Pet", icon: "Pet", tone: "default" },
  "Auto Parcel": { label: "Auto Parcel", icon: "Parcel", tone: "default" },
  "Auto Corporate": { label: "Auto Corporate", icon: "Auto", tone: "corporate" },
  "Cab Economy": { label: "Cab Economy", icon: "Cab Economy", tone: "default" },
  "Cab Sedan": { label: "Cab Sedan", icon: "Cab Sedan", tone: "default" },
  "Cab XL": { label: "Cab XL", icon: "Cab XL", tone: "default" },
  "Cab Premium": { label: "Cab Premium", icon: "Cab Premium", tone: "premium" },
  "Cab Share": { label: "Cab Share", icon: "Share", tone: "default" },
  "Cab Corporate": { label: "Cab Corporate", icon: "Cab Sedan", tone: "corporate" },
};

const CHIP_TONE: Record<ChipTone, { fill: string; label: string }> = {
  // Figma binds a remote copy of Surface/Neutral/Light and Text/OnSurface/Default here; local tokens used.
  default: { fill: "var(--surface-neutral-light)", label: "var(--text-onsurface-default)" },
  corporate: { fill: "var(--surface-neutral-black)", label: "var(--text-neutral-white)" },
  // Fill is a remote copy of Surface/Neutral/Black; label #cbaa54 is raw (unbound).
  premium: { fill: "var(--surface-neutral-black)", label: "#cbaa54" },
};

export interface ServiceChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  subService?: ServiceChipSubService;
  /** Overrides the label (Figma text is fixed per variant). */
  label?: ReactNode;
  /** 16×16 glyph for the chip icon. */
  glyph?: ReactNode;
}

export function ServiceChip({ subService = "Bike", label, glyph, style, ...rest }: ServiceChipProps) {
  const s = SUB_SERVICE[subService];
  const t = CHIP_TONE[s.tone];

  const root: CSSProperties = {
    boxSizing: "border-box",
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4, // raw
    height: 24, // hug result: 2 + 20 + 2
    padding: "2px 6px 2px 2px", // raw
    borderRadius: 100, // raw
    background: t.fill,
    ...style,
  };

  const text: CSSProperties = {
    ...textStyles["Label/Moderate/Reg"],
    color: t.label,
    textAlign: "center",
    whiteSpace: "nowrap",
  };

  return (
    <span style={root} {...rest}>
      <ServiceChipIcon type={s.icon} glyph={glyph} inverse={s.tone === "corporate"} />
      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
        <span style={text}>{label ?? s.label}</span>
      </span>
    </span>
  );
}

export default ServiceChip;
