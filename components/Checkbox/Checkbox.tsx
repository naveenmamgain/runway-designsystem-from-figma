import React, { type CSSProperties } from "react";

/**
 * Runway Checkbox — Figma: Checkbox (1107:145).
 * Requires tokens/tokens.css. Colours are tokens; the 24×24 box and glyph geometry are raw (unbound in Figma).
 * Glyph paths are the exact vectors exported from the Figma variants.
 */

export type CheckboxState = "Active" | "Disabled";

// Unselected outline (outer 18×18 at 3,3, r 2, 2px wall).
const OUTLINE =
  "M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM5 19H19V5H5V19Z";
// Inner square — Disabled + unselected fill.
const INNER = "M5 19H19V5H5V19Z";
// Selected: filled box with check mark knocked out.
const CHECKED =
  "M10.6 13.4L8.45 11.25C8.26667 11.0667 8.03333 10.975 7.75 10.975C7.46667 10.975 7.23333 11.0667 7.05 11.25C6.86667 11.4333 6.775 11.6667 6.775 11.95C6.775 12.2333 6.86667 12.4667 7.05 12.65L9.9 15.5C10.1 15.7 10.3333 15.8 10.6 15.8C10.8667 15.8 11.1 15.7 11.3 15.5L16.95 9.85C17.1333 9.66667 17.225 9.43333 17.225 9.15C17.225 8.86667 17.1333 8.63333 16.95 8.45C16.7667 8.26667 16.5333 8.175 16.25 8.175C15.9667 8.175 15.7333 8.26667 15.55 8.45L10.6 13.4ZM5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5Z";

const COLORS: Record<CheckboxState, { box: string; inner?: string }> = {
  Active: { box: "var(--surface-information-dark)" },
  Disabled: { box: "var(--surface-neutral-medium)", inner: "var(--surface-neutral-light)" },
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

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Forces the visual state (for documentation). Normally derived from `disabled`. */
  state?: CheckboxState;
}

export function Checkbox({ state, checked, defaultChecked, disabled, style, className, ...rest }: CheckboxProps) {
  const s: CheckboxState = state ?? (disabled ? "Disabled" : "Active");
  const isDisabled = disabled || s === "Disabled";
  const c = COLORS[s];
  const controlled = checked !== undefined;

  const off = (
    <>
      <path d={OUTLINE} fill={c.box} />
      {c.inner && <path d={INNER} fill={c.inner} />}
    </>
  );
  const on = <path d={CHECKED} fill={c.box} />;

  return (
    <span
      className={className}
      data-runway-checkbox=""
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
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={isDisabled}
        style={hiddenInput}
        {...rest}
      />
      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden style={{ pointerEvents: "none" }}>
        {controlled ? (checked ? on : off) : (
          <>
            <g data-off="">{off}</g>
            <g data-on="">{on}</g>
          </>
        )}
      </svg>
      {!controlled && (
        <style>{`[data-runway-checkbox] [data-on]{display:none}[data-runway-checkbox] input:checked+svg [data-on]{display:inline}[data-runway-checkbox] input:checked+svg [data-off]{display:none}`}</style>
      )}
    </span>
  );
}

export default Checkbox;
