import React, { type CSSProperties } from "react";

/**
 * Runway Radio Button — Figma: Radio Button (1104:357).
 * Requires tokens/tokens.css. Colours are tokens; the 24×24 box and glyph geometry are raw (unbound in Figma).
 * Glyph paths are the exact vectors exported from the Figma variants.
 */

export type RadioButtonState = "Active" | "Disabled";

// Outer ring (r 10 / inner r 8), 24×24 viewBox.
const RING =
  "M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z";
// Inner disc (r 8) — Disabled + unselected centre fill.
const INNER =
  "M12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z";
// Selected dot (r 5).
const DOT =
  "M12 17C13.3833 17 14.5625 16.5125 15.5375 15.5375C16.5125 14.5625 17 13.3833 17 12C17 10.6167 16.5125 9.4375 15.5375 8.4625C14.5625 7.4875 13.3833 7 12 7C10.6167 7 9.4375 7.4875 8.4625 8.4625C7.4875 9.4375 7 10.6167 7 12C7 13.3833 7.4875 14.5625 8.4625 15.5375C9.4375 16.5125 10.6167 17 12 17Z";

const COLORS: Record<RadioButtonState, Record<"off" | "on", { ring: string; inner?: string }>> = {
  Active: {
    off: { ring: "var(--surface-neutral-dark)" },
    on: { ring: "var(--surface-information-dark)" },
  },
  Disabled: {
    off: { ring: "var(--surface-neutral-medium)", inner: "var(--surface-neutral-light)" },
    on: { ring: "var(--surface-neutral-medium)" },
  },
};

const hiddenInput: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  margin: 0,
  opacity: 0,
  cursor: "inherit",
};

export interface RadioButtonProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Forces the visual state (for documentation). Normally derived from `disabled`. */
  state?: RadioButtonState;
}

export function RadioButton({ state, checked, defaultChecked, disabled, style, className, ...rest }: RadioButtonProps) {
  const s: RadioButtonState = state ?? (disabled ? "Disabled" : "Active");
  const isDisabled = disabled || s === "Disabled";
  // Visual selection follows `checked` when controlled; uncontrolled radios use CSS via :checked below.
  const controlled = checked !== undefined;
  const on = COLORS[s].on;
  const off = COLORS[s].off;

  return (
    <span
      className={className}
      data-runway-radio=""
      style={{
        position: "relative",
        display: "inline-flex",
        flex: "none",
        width: 24, // raw: component box 24×24
        height: 24,
        cursor: isDisabled ? "default" : "pointer",
        ...style,
      }}
    >
      <input
        type="radio"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={isDisabled}
        style={hiddenInput}
        {...rest}
      />
      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden style={{ pointerEvents: "none" }}>
        {controlled ? (
          checked ? (
            <path d={DOT + RING} fill={on.ring} />
          ) : (
            <>
              <path d={RING} fill={off.ring} />
              {off.inner && <path d={INNER} fill={off.inner} />}
            </>
          )
        ) : (
          <>
            <g data-off="">
              <path d={RING} fill={off.ring} />
              {off.inner && <path d={INNER} fill={off.inner} />}
            </g>
            <g data-on="">
              <path d={DOT + RING} fill={on.ring} />
            </g>
          </>
        )}
      </svg>
      {!controlled && (
        <style>{`[data-runway-radio] [data-on]{display:none}[data-runway-radio] input:checked+svg [data-on]{display:inline}[data-runway-radio] input:checked+svg [data-off]{display:none}`}</style>
      )}
    </span>
  );
}

export default RadioButton;
