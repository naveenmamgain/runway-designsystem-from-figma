import React, { useId, useState, type CSSProperties, type ReactNode } from "react";
import { InputCaption, captionText, type InputCaptionType } from "../InputCaption/InputCaption";

/**
 * Runway Input — Figma: .Input (2023:4600), private set ("Input Field"). Not the public Input Field (see TextField).
 *
 * Almost every value is bound in Figma to a REMOTE library (Sizing [Compact/Spacious], Radius [Default/Rounded/Sharp],
 * Colors Semantic [Light], Typography/Hopr Font Family = Poppins). None exist in Runway tokens.css, so resolved raw
 * values (default modes: Compact / Default / Light) are used, each commented with its remote variable.
 * Typeface: Runway's --cap-app-typeface (Inter) instead of the remote Poppins.
 */

export type InputType = "Default" | "Secondary" | "Combo Box";
export type InputSize = "Small" | "Medium" | "Large";
export type InputState = "Default" | "Focused" | "Typing" | "Error" | "Disabled";

// Remote Colors Semantic (Light), resolved.
const C = {
  surfaceContainer: "var(--base-neutral-white)", // R: Semantics/Surface/Surface Container — same value as Runway Surface/Neutral/White (--surface-neutral-white)
  surfaceDim: "#e1e1e2", // R: Semantics/Surface/Surface Dim
  onSurface1: "#1d1d20", // R: Semantics/Surface/On Surface 1
  onSurfaceContainer1: "#1d1d20", // R: Semantics/Surface/On Surface Container 1
  onSurface3: "#7a7a83", // R: Semantics/Surface/On Surface 3
  onSurfaceContainer3: "#7a7a83", // R: Semantics/Surface/On Surface Container 3
  onSurfaceDim: "#a1a1aa", // R: Semantics/Surface/On Surface Dim
  primary: "#1559ea", // R: Semantics/Primary/Primary
  error: "#dc2828", // R: Semantics/Error/Error
} as const;

// Remote Sizing (Compact) / Radius (Default), resolved.
const S = {
  sp0: 0, // R: Sizing/spacing/0 (Compact 0, Spacious 0)
  sp2: 2, // R: Sizing/spacing/2 (Compact 2, Spacious 4)
  sp3: 4, // R: Sizing/spacing/3 (Compact 4, Spacious 8)
  sp4: 6, // R: Sizing/spacing/4 (Compact 6, Spacious 10)
  sp5: 8, // R: Sizing/spacing/5 (Compact 8, Spacious 12)
  sp6: 10, // R: Sizing/spacing/6 (Compact 10, Spacious 14)
  sp7: 12, // R: Sizing/spacing/7 (Compact 12, Spacious 16)
  sp8: 16, // R: Sizing/spacing/8 (Compact 16, Spacious 20)
  sp9: 20, // R: Sizing/spacing/9 (Compact 20, Spacious 24)
  iconMd: 20, // R: Sizing/icon/md (Compact 20, Spacious 22)
  iconLg: 24, // R: Sizing/icon/lg (Compact 24, Spacious 26)
  iconXl: 28, // R: Sizing/icon/xl (Compact 28, Spacious 30)
  strokeSm: 1, // R: Sizing/stroke/sm (1 in both modes)
  strokeLg: 2, // R: Sizing/stroke/lg (2 in both modes)
  strokeXl: 3, // R: Sizing/stroke/xl (3 in both modes)
  radi6: 12, // R: Radius/radi-6 (Default 12, Rounded 18, Sharp 0)
  radi0: 0, // R: Radius/radi-0 (0 in all modes)
} as const;

const SIZE = {
  Small: {
    width: 240, height: 36, // raw
    rootGap: S.sp5,
    padLDefault: S.sp7, padLSecondary: S.sp6, padR: S.sp6,
    gap: S.sp5, gapActive: S.sp5,
    icon: S.iconMd, focusStroke: S.strokeLg, typingGap: S.sp2,
    combo: { boxPadX: S.sp7, boxGap: S.sp4, midPadL: S.sp7, midPadR: S.sp6 },
  },
  Medium: {
    width: 264, height: 44,
    rootGap: S.sp6,
    padLDefault: S.sp8, padLSecondary: S.sp7, padR: S.sp7,
    gap: S.sp6, gapActive: S.sp5, // Figma: Focused/Typing use spacing/5 at Medium
    icon: S.iconLg, focusStroke: S.strokeLg, typingGap: S.sp2,
    combo: { boxPadX: S.sp7, boxGap: S.sp5, midPadL: S.sp8, midPadR: S.sp7 },
  },
  Large: {
    width: 324, height: 56,
    rootGap: S.sp7,
    padLDefault: S.sp9, padLSecondary: S.sp8, padR: S.sp8,
    gap: S.sp7, gapActive: S.sp7,
    icon: S.iconXl, focusStroke: S.strokeXl, typingGap: S.sp3,
    combo: { boxPadX: S.sp8, boxGap: S.sp6, midPadL: S.sp8, midPadR: S.sp8 },
  },
} as const;

/** Remote Body/{Small,Moderate,Large}/Med — same-named local styles for Small/Moderate, raw for Large. */
const bodyText = captionText;

// Remote Title/X-Small/Semi-Bold (Poppins SemiBold 18/28); no same-named local style → raw.
const LABEL_TEXT: CSSProperties = { fontFamily: "var(--cap-app-typeface)", fontSize: 18, lineHeight: "28px", fontWeight: 600, letterSpacing: 0 };

const STATE: Record<InputState, { fill: string; stroke?: string; text: string; placeholder: string; box: string; strokeWeight: "sm" | "focus" }> = {
  Default: { fill: C.surfaceContainer, stroke: C.onSurface3, text: C.onSurfaceContainer1, placeholder: C.onSurface3, box: C.onSurfaceContainer3, strokeWeight: "sm" },
  Focused: { fill: C.surfaceContainer, stroke: C.primary, text: C.onSurfaceContainer1, placeholder: C.onSurfaceContainer3, box: C.onSurfaceContainer3, strokeWeight: "focus" },
  Typing: { fill: C.surfaceContainer, stroke: C.primary, text: C.onSurfaceContainer1, placeholder: C.onSurfaceContainer3, box: C.onSurfaceContainer3, strokeWeight: "focus" },
  Error: { fill: C.surfaceContainer, stroke: C.error, text: C.onSurfaceContainer1, placeholder: C.onSurfaceContainer3, box: C.onSurfaceContainer3, strokeWeight: "focus" },
  Disabled: { fill: C.surfaceDim, text: C.onSurfaceDim, placeholder: C.onSurfaceDim, box: C.onSurfaceDim, strokeWeight: "sm" },
};

const iconBox = (size: number): CSSProperties => ({ display: "inline-flex", flex: "none", width: size, height: size });

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  type?: InputType;
  size?: InputSize;
  /** Forces a visual state (for documentation). Normally derived from disabled / error / focus / value. */
  state?: InputState;
  /** HTML input type (text, password, …). */
  htmlType?: React.HTMLInputTypeAttribute;
  /** Figma "↳ Label" + Label layer (hidden by default in Figma). */
  label?: ReactNode;
  /** Figma "Left Icon" / "↳ Icon L" (default chevron_left). */
  leftIcon?: ReactNode;
  /** Figma "Right Icon" / "↳ Icon R" (default close). */
  rightIcon?: ReactNode;
  /** Error flag → Error state + Error caption. */
  error?: boolean;
  /** Figma "↳ Caption" (default shown, text "Caption"). Pass `false` to hide. */
  caption?: ReactNode | false;
  /** Caption type override; defaults to "Error" in the Error state, otherwise "Caption". */
  captionType?: InputCaptionType;
  captionIcon?: ReactNode;
  /** Combo Box: "↳ Lead Box" content (Figma text "Box"). `false` hides it. */
  leadBox?: ReactNode | false;
  /** Combo Box: "↳ Trail Box" content. `false` hides it. */
  trailBox?: ReactNode | false;
  /** Combo Box: "Icon Lead" / "↳ Icon Lead". */
  leadIcon?: ReactNode;
  /** Combo Box: "Icon Trail" / "↳ Icon Trail". */
  trailIcon?: ReactNode;
}

export function Input({
  type = "Default",
  size = "Small",
  state,
  htmlType = "text",
  label,
  leftIcon,
  rightIcon,
  error,
  caption = "Caption",
  captionType,
  captionIcon,
  leadBox = "Box",
  trailBox = "Box",
  leadIcon,
  trailIcon,
  disabled,
  placeholder = "Text",
  id,
  style,
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [focused, setFocused] = useState(false);
  const [innerValue, setInnerValue] = useState(String(defaultValue ?? ""));
  const current = value !== undefined ? String(value) : innerValue;

  const st: InputState =
    state ?? (disabled ? "Disabled" : error ? "Error" : focused ? (current ? "Typing" : "Focused") : "Default");
  const v = STATE[st];
  const z = SIZE[size];
  const isCombo = type === "Combo Box";
  const isSecondary = type === "Secondary";
  const active = st === "Focused" || st === "Typing";

  const strokeW = st === "Disabled" ? (isCombo ? S.strokeSm : 0) : v.strokeWeight === "sm" ? S.strokeSm : z.focusStroke;
  const strokeColor = st === "Disabled" ? (isCombo ? C.surfaceDim : undefined) : v.stroke;
  const strokeShadow = strokeColor && strokeW
    ? isSecondary
      ? `inset 0 -${strokeW}px 0 0 ${strokeColor}` // Secondary: bottom stroke only
      : `inset 0 0 0 ${strokeW}px ${strokeColor}`
    : undefined;

  const gap = active ? z.gapActive : z.gap;
  const captionId = caption !== false ? `${inputId}-caption` : undefined;

  const row = (padL: number, padR: number, fill: boolean): CSSProperties => ({
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    gap,
    paddingTop: 0, // raw
    paddingBottom: 0,
    paddingLeft: padL,
    paddingRight: padR,
    height: "100%",
    flex: fill ? 1 : undefined,
    minWidth: 0,
    background: v.fill,
  });

  const field = (
    <input
      id={inputId}
      type={htmlType}
      disabled={st === "Disabled"}
      placeholder={placeholder}
      value={value}
      defaultValue={value === undefined ? defaultValue : undefined}
      aria-invalid={st === "Error" || undefined}
      aria-describedby={captionId}
      onChange={(e) => { if (value === undefined) setInnerValue(e.target.value); onChange?.(e); }}
      onFocus={(e) => { setFocused(true); onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); onBlur?.(e); }}
      data-runway-input=""
      style={{
        ...bodyText(size),
        color: v.text,
        caretColor: C.primary, // Figma cursor: 2×18 rect, R: Primary/Primary
        flex: 1,
        minWidth: 0,
        border: "none",
        outline: "none",
        background: "transparent",
        padding: 0,
        ["--runway-input-placeholder" as string]: v.placeholder,
      }}
      {...rest}
    />
  );

  const textRow = (padL: number, padR: number, fill: boolean) => (
    <div style={row(padL, padR, fill)}>
      {leftIcon && <span style={iconBox(z.icon)} aria-hidden>{leftIcon}</span>}
      {field}
      {rightIcon && <span style={iconBox(z.icon)} aria-hidden>{rightIcon}</span>}
    </div>
  );

  const segment = (content: ReactNode, icon: ReactNode, lead: boolean): ReactNode => (
    <div
      style={{
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        gap: z.combo.boxGap,
        // Lead Box: top/bottom 0 (raw at S/M, R: Sizing/spacing/0 at L); Trail Box: R: Sizing/spacing/4 (6)
        paddingTop: lead ? S.sp0 : S.sp4,
        paddingBottom: lead ? S.sp0 : S.sp4,
        paddingLeft: z.combo.boxPadX,
        paddingRight: z.combo.boxPadX,
        height: "100%",
        flex: "none",
        background: v.fill,
      }}
    >
      {lead && icon && <span style={iconBox(z.icon)} aria-hidden>{icon}</span>}
      <span style={{ ...bodyText(size), color: v.box, whiteSpace: "nowrap" }}>{content}</span>
      {!lead && icon && <span style={iconBox(z.icon)} aria-hidden>{icon}</span>}
    </div>
  );

  const inputFrame: CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: z.height, // raw
    borderRadius: isSecondary ? S.radi0 : S.radi6,
    boxShadow: isCombo ? undefined : strokeShadow,
    // Default/Secondary: fill on the frame; Combo Box: fills on the segments, frame clips
    background: isCombo ? undefined : v.fill,
    overflow: isCombo ? "hidden" : undefined,
    position: "relative",
  };

  const capType: InputCaptionType = captionType ?? (st === "Error" ? "Error" : "Caption");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: z.rootGap,
        width: z.width, // raw (fixed in Figma)
        minHeight: z.height, // raw
        ...style,
      }}
    >
      {label && (
        <label htmlFor={inputId} style={{ ...LABEL_TEXT, color: C.onSurface1, width: "100%", minHeight: 28 }}>
          {label}
        </label>
      )}
      <div style={inputFrame}>
        {isCombo ? (
          <>
            {leadBox !== false && segment(leadBox, leadIcon, true)}
            {textRow(z.combo.midPadL, z.combo.midPadR, true)}
            {trailBox !== false && segment(trailBox, trailIcon, false)}
            {/* Combo stroke is drawn above the segment fills */}
            <span aria-hidden style={{ position: "absolute", inset: 0, borderRadius: S.radi6, boxShadow: strokeShadow, pointerEvents: "none" }} />
          </>
        ) : (
          textRow(isSecondary ? z.padLSecondary : z.padLDefault, z.padR, true)
        )}
      </div>
      {caption !== false && (
        <InputCaption id={captionId} type={capType} size={size} icon={captionIcon} style={{ width: "100%" }}>
          {caption}
        </InputCaption>
      )}
      <style>{`[data-runway-input]::placeholder{color:var(--runway-input-placeholder);opacity:1}`}</style>
    </div>
  );
}

export default Input;
