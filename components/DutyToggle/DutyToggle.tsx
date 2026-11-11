import React, { type CSSProperties } from "react";
import { textStyles } from "../_shared/textStyles";

/**
 * Runway DutyToggle — Figma: Duty Toggle (701:124459).
 * Requires tokens/tokens.css. Colours, radius and typography are tokens; padding, gap, stroke width and the
 * nested toggle-switch geometry/shadows are raw because Figma leaves them unbound (see spec.md).
 */

export type DutyStatus = "Off Duty" | "On Duty";

const PAINT: Record<DutyStatus, {
  fill: string; stroke: string; label: string; track: string; knob: string; trackX: number; knobX: number; knobShadow: string;
}> = {
  "Off Duty": {
    fill: "var(--mapped-gray-gray-50)",
    stroke: "var(--border-neutral-dark)",
    label: "var(--text-neutral-medium)",
    track: "var(--mapped-gray-gray-400)",
    knob: "var(--mapped-gray-gray-100)",
    trackX: 2,
    knobX: 2,
    // raw effects
    knobShadow: "0 1px 1px rgba(0,0,0,0.24), -1px 0 4px rgba(0,0,0,0.12)",
  },
  "On Duty": {
    fill: "var(--mapped-green-green-50)",
    stroke: "var(--border-success-dark)",
    label: "var(--text-success-dark)",
    track: "var(--mapped-green-green-200)",
    knob: "var(--mapped-green-green-400)",
    trackX: 1,
    knobX: 17,
    knobShadow: "0 1px 1px rgba(0,0,0,0.24), 1px 0 4px rgba(0,0,0,0.16)",
  },
};

export interface DutyToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /** Figma "Property 1". */
  status?: DutyStatus;
  onChange?: (next: DutyStatus) => void;
}

export function DutyToggle({ status = "Off Duty", onChange, onClick, style, ...rest }: DutyToggleProps) {
  const p = PAINT[status];
  const on = status === "On Duty";

  const root: CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8, // raw
    width: "100%",
    padding: "8px 16px", // raw
    borderRadius: "var(--button-radius)",
    border: "none",
    background: p.fill,
    boxShadow: `inset 0 0 0 1px ${p.stroke}`, // stroke 1, inside (weight unbound)
    cursor: "pointer",
    ...style,
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      style={root}
      onClick={(e) => {
        onClick?.(e);
        onChange?.(on ? "Off Duty" : "On Duty");
      }}
      {...rest}
    >
      <span style={{ ...textStyles["Button/Moderate/SemiBold"], color: p.label, flex: 1, minWidth: 0, textAlign: "left" }}>
        {on ? "ON DUTY" : "OFF DUTY"}
      </span>
      {/* Toggle Switch/No Text/Active/ON|OFF — 40×26, raw geometry */}
      <span aria-hidden style={{ position: "relative", flex: "none", width: 40, height: 26 }}>
        <span style={{ position: "absolute", left: p.trackX, top: 6, width: 36, height: 14, borderRadius: 200, background: p.track }} />
        <span style={{ position: "absolute", left: p.knobX, top: 3, width: 20, height: 20, borderRadius: "50%", background: p.knob, boxShadow: p.knobShadow }} />
      </span>
    </button>
  );
}

export default DutyToggle;
