import React, { useState, type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";

/**
 * Runway Button — Figma: Buttons (671:83990) and Icon Only Button (1760:6878).
 * Requires tokens/tokens.css. All values come from CSS variables; Button Tokens resolve per size
 * through the `data-button-size` attribute set on the root element.
 */

export type ButtonSize = "Large" | "Medium" | "Small";
export type ButtonType =
  | "Primary-Default"
  | "Secondary-Default"
  | "Secondary-Positive"
  | "Secondary-Negative"
  | "Secondary-Info"
  | "Tertiary-Default"
  | "Tertiary-Info"
  | "Tertiary-Negative";
export type ButtonState = "Active" | "Pressed" | "Disabled";

type Paint = { fill?: string; stroke?: string; label: string; icon: string };

// Unbound #000000 in Figma; equals Base-Neutral/Black.
const ICON_BLACK = "var(--base-neutral-black)";
const DISABLED: Paint = { label: "var(--text-onsurface-disabled)", icon: "var(--surface-neutral-medium)" };

const PAINTS: Record<ButtonType, Record<ButtonState, Paint>> = {
  "Primary-Default": {
    Active: { fill: "var(--mapped-yellow-yellow-400)", label: "var(--text-onsurface-default)", icon: ICON_BLACK },
    Pressed: { fill: "var(--mapped-yellow-yellow-300)", label: "var(--text-onsurface-default)", icon: ICON_BLACK },
    Disabled: { ...DISABLED, fill: "var(--surface-neutral-light)" },
  },
  "Secondary-Default": {
    Active: { stroke: "var(--border-neutral-dark)", label: "var(--text-onsurface-default)", icon: ICON_BLACK },
    Pressed: { fill: "var(--surface-neutral-light)", stroke: "var(--border-neutral-dark)", label: "var(--text-onsurface-default)", icon: ICON_BLACK },
    Disabled: { ...DISABLED, stroke: "var(--border-neutral-medium)" },
  },
  "Secondary-Positive": {
    Active: { stroke: "var(--border-success-dark)", label: "var(--text-success-dark)", icon: "var(--surface-success-dark)" },
    Pressed: { fill: "var(--surface-success-light)", stroke: "var(--border-success-dark)", label: "var(--text-success-dark)", icon: "var(--surface-success-dark)" },
    Disabled: { ...DISABLED, stroke: "var(--border-neutral-medium)" },
  },
  "Secondary-Negative": {
    Active: { stroke: "var(--border-error-dark)", label: "var(--text-error-dark)", icon: "var(--surface-error-dark)" },
    Pressed: { fill: "var(--surface-error-light)", stroke: "var(--border-error-dark)", label: "var(--text-error-dark)", icon: "var(--surface-error-dark)" },
    Disabled: { ...DISABLED, stroke: "var(--border-neutral-medium)" },
  },
  "Secondary-Info": {
    Active: { stroke: "var(--border-information-dark)", label: "var(--text-information-dark)", icon: "var(--surface-information-dark)" },
    Pressed: { fill: "var(--surface-information-light)", stroke: "var(--border-information-dark)", label: "var(--text-information-dark)", icon: "var(--surface-information-dark)" },
    Disabled: { ...DISABLED, stroke: "var(--border-neutral-medium)" },
  },
  "Tertiary-Default": {
    Active: { label: "var(--text-onsurface-default)", icon: ICON_BLACK },
    Pressed: { fill: "var(--surface-neutral-light)", label: "var(--text-onsurface-default)", icon: ICON_BLACK },
    Disabled: DISABLED,
  },
  "Tertiary-Info": {
    Active: { label: "var(--text-information-dark)", icon: "var(--surface-information-dark)" },
    Pressed: { fill: "var(--surface-information-light)", label: "var(--text-information-dark)", icon: "var(--surface-information-dark)" },
    Disabled: DISABLED,
  },
  "Tertiary-Negative": {
    Active: { label: "var(--text-error-dark)", icon: "var(--surface-error-dark)" },
    Pressed: { fill: "var(--surface-error-light)", label: "var(--text-error-dark)", icon: "var(--surface-error-dark)" },
    Disabled: DISABLED,
  },
};

/** Stroke weight 1, align inside (Figma). No token exists for stroke width. */
const strokeShadow = (color?: string) => (color ? `inset 0 0 0 1px ${color}` : undefined);

function usePressed(disabled: boolean) {
  const [pressed, setPressed] = useState(false);
  const handlers = disabled
    ? {}
    : {
        onPointerDown: () => setPressed(true),
        onPointerUp: () => setPressed(false),
        onPointerLeave: () => setPressed(false),
        onPointerCancel: () => setPressed(false),
      };
  return [pressed, handlers] as const;
}

const iconBox = (color: string): CSSProperties => ({
  display: "inline-flex",
  flex: "none",
  width: "var(--button-icon-size)",
  height: "var(--button-icon-size)",
  color, // icons should paint with currentColor
});

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  size?: ButtonSize;
  variant?: ButtonType;
  /** Forces a visual state (for documentation). Normally derived from `disabled` + pointer press. */
  state?: ButtonState;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  /** Figma "Show Text". */
  showText?: boolean;
  htmlType?: "button" | "submit" | "reset";
  children?: ReactNode;
}

export function Button({
  size = "Large",
  variant = "Primary-Default",
  state,
  leadingIcon,
  trailingIcon,
  showText = true,
  disabled,
  htmlType = "button",
  children = "Label",
  style,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || state === "Disabled";
  const [pressed, pressHandlers] = usePressed(!!isDisabled);
  const s: ButtonState = state ?? (isDisabled ? "Disabled" : pressed ? "Pressed" : "Active");
  const p = PAINTS[variant][s];

  const hasLead = !!leadingIcon;
  const hasTrail = !!trailingIcon;
  const labelMax = hasLead && hasTrail
    ? "var(--un-common-label-layout-max-width-both-icon)"
    : hasLead || hasTrail
      ? "var(--un-common-label-layout-max-width-any-one-icon)"
      : "var(--un-common-label-layout-max-width-no-icon)";

  const root: CSSProperties = {
    boxSizing: "border-box",
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--button-space-number)",
    height: "var(--button-button-height)",
    minWidth: "var(--button-button-min-width)",
    maxWidth: "var(--button-button-max-width)",
    paddingTop: "var(--button-v-padding)",
    paddingBottom: "var(--button-v-padding)",
    // Icon = Leading → extra padding on the right; Icon = Trailing → extra padding on the left.
    paddingLeft: hasTrail && !hasLead ? "var(--button-h-pad-extra)" : "var(--button-h-padding)",
    paddingRight: hasLead && !hasTrail ? "var(--button-h-pad-extra)" : "var(--button-h-padding)",
    borderRadius: "var(--button-radius)",
    border: "none",
    background: p.fill ?? "transparent",
    boxShadow: strokeShadow(p.stroke),
    cursor: isDisabled ? "default" : "pointer",
    ...style,
  };

  const labelFrame: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "var(--button-space-number)",
    maxWidth: labelMax,
    minWidth: 0,
  };

  const label: CSSProperties = {
    ...(size === "Small" ? textStyles["Button/Small/Bold"] : textStyles["Button/Moderate/Bold"]),
    color: p.label,
    textAlign: "left",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2, // Figma: truncation ENDING, max lines 2
    overflow: "hidden",
  };

  return (
    <button
      type={htmlType}
      data-button-size={size.toLowerCase()}
      disabled={isDisabled}
      style={root}
      {...pressHandlers}
      {...rest}
    >
      <span style={labelFrame}>
        {hasLead && <span style={iconBox(p.icon)} aria-hidden>{leadingIcon}</span>}
        {showText && <span style={label}>{children}</span>}
      </span>
      {hasTrail && <span style={iconBox(p.icon)} aria-hidden>{trailingIcon}</span>}
    </button>
  );
}

/* ------------------------------------------------------------------ Icon Only Button */

export type IconOnlyButtonType = "Primary" | "Secondary";

const ICON_ONLY: Record<IconOnlyButtonType, Record<ButtonState, Paint>> = {
  Primary: {
    Active: { fill: "var(--mapped-yellow-yellow-400)", label: "", icon: ICON_BLACK },
    Pressed: { fill: "var(--mapped-yellow-yellow-300)", label: "", icon: ICON_BLACK },
    Disabled: { fill: "var(--surface-neutral-light)", label: "", icon: "var(--surface-neutral-medium)" },
  },
  Secondary: {
    Active: { fill: "var(--surface-neutral-white)", stroke: "var(--border-neutral-dark)", label: "", icon: ICON_BLACK },
    Pressed: { fill: "var(--surface-neutral-light)", stroke: "var(--border-neutral-black)", label: "", icon: ICON_BLACK },
    Disabled: { fill: "var(--surface-neutral-white)", stroke: "var(--border-neutral-medium)", label: "", icon: "var(--surface-neutral-medium)" },
  },
};

export interface IconOnlyButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  size?: ButtonSize;
  variant?: IconOnlyButtonType;
  state?: ButtonState;
  icon: ReactNode;
  /** Accessible name — required because there is no visible label. */
  "aria-label": string;
  htmlType?: "button" | "submit" | "reset";
}

export function IconOnlyButton({
  size = "Large",
  variant = "Primary",
  state,
  icon,
  disabled,
  htmlType = "button",
  style,
  ...rest
}: IconOnlyButtonProps) {
  const isDisabled = disabled || state === "Disabled";
  const [pressed, pressHandlers] = usePressed(!!isDisabled);
  const s: ButtonState = state ?? (isDisabled ? "Disabled" : pressed ? "Pressed" : "Active");
  const p = ICON_ONLY[variant][s];
  // Figma: the box is square at Button Height; bound padding is larger than the box allows, so the
  // icon is simply centred (see spec.md).
  const root: CSSProperties = {
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "var(--button-button-height)",
    height: "var(--button-button-height)",
    padding: 0,
    borderRadius: "var(--button-radius)",
    border: "none",
    background: p.fill,
    boxShadow: strokeShadow(p.stroke),
    cursor: isDisabled ? "default" : "pointer",
    ...style,
  };
  return (
    <button type={htmlType} data-button-size={size.toLowerCase()} disabled={isDisabled} style={root} {...pressHandlers} {...rest}>
      <span style={iconBox(p.icon)} aria-hidden>{icon}</span>
    </button>
  );
}

export default Button;
