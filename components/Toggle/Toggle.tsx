import React, { type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";

/**
 * Runway Toggle — Figma: Toggle (1107:166).
 * Requires tokens/tokens.css. Colours and text style are tokens; all dimensions are raw because Figma binds none.
 */

export type ToggleType = "Text" | "No Text";
export type ToggleState = "Active" | "Disabled";

type Paint = { track: string; knob: string; label: string; icon: string };

// Active knob icon colour is the icon's own unbound #1c1b1f in Figma (no token).
const ICON_RAW = "#1c1b1f";

const PAINTS: Record<ToggleState, Record<"on" | "off", Paint>> = {
  Active: {
    on: { track: "var(--surface-success-dark)", knob: "var(--surface-neutral-white)", label: "var(--text-onsurface-inverse)", icon: ICON_RAW },
    off: { track: "var(--surface-neutral-medium)", knob: "var(--surface-neutral-white)", label: "var(--text-onsurface-default)", icon: ICON_RAW },
  },
  Disabled: {
    on: { track: "var(--surface-neutral-light)", knob: "var(--surface-neutral-medium)", label: "var(--text-onsurface-disabled)", icon: "var(--surface-neutral-dark)" },
    off: { track: "var(--surface-neutral-light)", knob: "var(--surface-neutral-medium)", label: "var(--text-onsurface-disabled)", icon: "var(--surface-neutral-dark)" },
  },
};

// Raw drop shadow, only on Type=No Text + Active knobs in Figma.
const KNOB_SHADOW = "1px 1px 4px 0px rgba(16, 16, 16, 0.1)";

export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onChange"> {
  type?: ToggleType;
  /** Forces the visual state (for documentation). Normally derived from `disabled`. */
  state?: ToggleState;
  /** Figma "Selected" (ON = true). */
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  /** Figma "Show Icon" (Type=Text only). */
  showIcon?: boolean;
  /** Figma "ON Icon" — default Volume_Up_Filled. 20×20, paint with currentColor. */
  onIcon?: ReactNode;
  /** Figma "OFF Icon" — default Volume_Mute_Filled. */
  offIcon?: ReactNode;
  onLabel?: ReactNode;
  offLabel?: ReactNode;
}

export function Toggle({
  type = "No Text",
  state,
  checked = false,
  onChange,
  showIcon = true,
  onIcon,
  offIcon,
  onLabel = "ON",
  offLabel = "OFF",
  disabled,
  style,
  onClick,
  ...rest
}: ToggleProps) {
  const s: ToggleState = state ?? (disabled ? "Disabled" : "Active");
  const isDisabled = disabled || s === "Disabled";
  const p = PAINTS[s][checked ? "on" : "off"];
  const withText = type === "Text";
  const icon = checked ? onIcon : offIcon;

  const track: CSSProperties = {
    boxSizing: "border-box",
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4, // raw
    width: 72, // raw
    height: 32, // raw
    // raw padding: ON 4/4/4/8, OFF 4/8/4/4 (top/right/bottom/left)
    padding: checked ? "4px 4px 4px 8px" : "4px 8px 4px 4px",
    borderRadius: 222, // raw
    border: "none",
    background: p.track,
    cursor: isDisabled ? "default" : "pointer",
    ...style,
  };

  const labelFrame: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 32, // raw
  };

  const knob: CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "none",
    width: 24, // raw
    height: 24,
    padding: 2, // raw
    borderRadius: 24, // raw
    background: p.knob,
    boxShadow: !withText && s === "Active" ? KNOB_SHADOW : undefined,
  };

  const label = (text: ReactNode) => (
    <span style={labelFrame}>
      {withText && <span style={{ ...textStyles["Button/Moderate/SemiBold"], color: p.label, textAlign: "left" }}>{text}</span>}
    </span>
  );

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={isDisabled}
      style={track}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) onChange?.(!checked);
      }}
      {...rest}
    >
      {checked && label(onLabel)}
      <span style={knob}>
        {withText && showIcon && icon && (
          <span style={{ display: "inline-flex", width: 20, height: 20, color: p.icon }} aria-hidden>
            {icon}
          </span>
        )}
      </span>
      {!checked && label(offLabel)}
    </button>
  );
}

export default Toggle;
