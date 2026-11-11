import React, { type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";

/**
 * Runway Input Caption — Figma: .Input Caption (2023:4536), private; used by Input (2023:4600).
 *
 * Every colour here is bound in Figma to a REMOTE library variable (Colors Semantic, mode Light) that has no Runway
 * token, so the resolved raw value is used with the remote variable named in a comment. Font family is remote
 * `Typography/Hopr Font Family` (= Poppins); Runway's typeface token (Inter) is used instead.
 */

export type InputCaptionType = "Caption" | "Success" | "Info" | "Requirement" | "Error" | "Password";
export type InputCaptionSize = "Small" | "Medium" | "Large";

// Remote Colors Semantic (Light) — resolved values.
export const REMOTE = {
  onSurface2: "#52525b", // R: Colors Semantic/Semantics/Surface/On Surface 2 (→ Colors Base/gray/600)
  onSurface3: "#7a7a83", // R: Colors Semantic/Semantics/Surface/On Surface 3 (→ gray/500)
  surfaceDim: "#e1e1e2", // R: Colors Semantic/Semantics/Surface/Surface Dim (→ gray/200)
  success: "#149041", // R: Colors Semantic/Semantics/Success/Success (→ green/600)
  error: "#dc2828", // R: Colors Semantic/Semantics/Error/Error (→ red/600)
} as const;

const PAINT: Record<InputCaptionType, { icon?: string; text: string }> = {
  Caption: { text: REMOTE.onSurface2 },
  Success: { icon: REMOTE.success, text: REMOTE.success },
  Info: { icon: REMOTE.onSurface3, text: REMOTE.onSurface2 },
  Requirement: { icon: REMOTE.onSurface3, text: REMOTE.onSurface2 },
  Error: { icon: REMOTE.error, text: REMOTE.error },
  Password: { text: REMOTE.success },
};

/**
 * Text style per size. Figma uses remote Body/Small|Moderate|Large/Med (Poppins Medium 14/22, 16/24, 18/28).
 * Small/Moderate use the same-named local Runway styles; Large has no local equivalent → raw 18/28/500.
 */
export const captionText = (size: InputCaptionSize): CSSProperties =>
  size === "Small"
    ? textStyles["Body/Small/Med"]
    : size === "Medium"
      ? textStyles["Body/Moderate/Med"]
      : { fontFamily: "var(--cap-app-typeface)", fontSize: 18, lineHeight: "28px", fontWeight: 500, letterSpacing: 0 }; // raw: remote Body/Large/Med

const ICON_SIZE: Record<InputCaptionSize, number> = { Small: 20, Medium: 24, Large: 24 }; // raw (unbound)

export interface InputCaptionProps {
  type?: InputCaptionType;
  size?: InputCaptionSize;
  /** Figma "Icon" boolean (ignored for Caption / Password, which have no icon). */
  showIcon?: boolean;
  /** Icon node (paint with currentColor). Figma defaults: Success check_circle, Info information-fill, Requirement lock, Error warning. */
  icon?: ReactNode;
  /** Password only: number of filled bars out of 4. Figma shows 3 (not a Figma property). */
  strength?: 0 | 1 | 2 | 3 | 4;
  children?: ReactNode;
  id?: string;
  style?: CSSProperties;
}

// Figma sample texts, verbatim (including the "Succes" / "8 character" typos).
const DEFAULT_TEXT: Record<InputCaptionType, string> = {
  Caption: "Caption",
  Success: "Succes",
  Info: "Info",
  Requirement: "At least 8 character",
  Error: "Error",
  Password: "Good!",
};

export function InputCaption({
  type = "Caption",
  size = "Small",
  showIcon = true,
  icon,
  strength = 3,
  children,
  id,
  style,
}: InputCaptionProps) {
  const p = PAINT[type];
  const text = <span style={{ ...captionText(size), color: p.text, whiteSpace: "nowrap" }}>{children ?? DEFAULT_TEXT[type]}</span>;

  if (type === "Password") {
    return (
      <div id={id} style={{ display: "flex", alignItems: "center", gap: 8 /* raw */, width: 163 /* raw, fixed */, height: 24, ...style }}>
        <div style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0, height: 24, gap: 4 /* R: Sizing/spacing/3 — Compact 4, Spacious 8 */ }}>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              style={{
                flex: 1,
                height: 6, // raw
                borderRadius: 2, // R: Radius/radi-1 — Default 2, Rounded 4, Sharp 0
                background: i < strength ? REMOTE.success : REMOTE.surfaceDim,
              }}
            />
          ))}
        </div>
        {text}
      </div>
    );
  }

  const hasIcon = showIcon && !!icon && p.icon !== undefined;
  return (
    <div id={id} style={{ display: "flex", alignItems: "center", gap: 4 /* raw */, height: 24 /* raw, fixed */, ...style }}>
      {hasIcon && (
        <span style={{ display: "inline-flex", flex: "none", width: ICON_SIZE[size], height: ICON_SIZE[size], color: p.icon }} aria-hidden>
          {icon}
        </span>
      )}
      {text}
    </div>
  );
}

export default InputCaption;
