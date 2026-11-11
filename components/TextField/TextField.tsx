import React, { useId, useState, type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";
import { Button } from "../Button/Button";

/**
 * Runway TextField — Figma: Input Field (2025:5480).
 * Requires tokens/tokens.css. Colours/effects/typography use tokens; spacing, radius, stroke widths and icon sizes are raw
 * because Figma does not bind them to any variable (see spec.md).
 */

export type TextFieldState = "Default" | "Focused" | "Error" | "Disabled";

const STATE: Record<TextFieldState, {
  fill: string; stroke?: string; strokeWidth: number; elevation?: string; text: string; icon: string;
}> = {
  Default: { fill: "var(--surface-neutral-white)", stroke: "var(--border-neutral-light)", strokeWidth: 1, text: "var(--text-neutral-black)", icon: "var(--surface-neutral-dark)" },
  Focused: { fill: "var(--surface-neutral-white)", stroke: "var(--border-information-dark)", strokeWidth: 1.5, elevation: "var(--elevation-s)", text: "var(--text-neutral-black)", icon: "var(--surface-neutral-black)" },
  Error: { fill: "var(--surface-neutral-white)", stroke: "var(--border-error-dark)", strokeWidth: 1.5, elevation: "var(--elevation-s)", text: "var(--text-neutral-black)", icon: "var(--surface-neutral-black)" },
  Disabled: { fill: "var(--surface-neutral-light)", strokeWidth: 0, text: "var(--text-onsurface-disabled)", icon: "var(--surface-neutral-medium)" },
};

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "title"> {
  /** Figma "Title". */
  title?: ReactNode;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  /** Figma "Error Message". When set, the field renders in the Error state. */
  errorMessage?: ReactNode;
  /** Figma "Caption". */
  caption?: ReactNode;
  /** Icon shown before the error message (Figma: warning_amber / Round, 20×20). */
  errorIcon?: ReactNode;
  /** Icon shown before the caption (Figma: Info_Circle_Stroke, 20×20). */
  captionIcon?: ReactNode;
  /** Figma "Supporting Button" — rendered as Button Small / Tertiary-Info. */
  supportingAction?: { label: ReactNode; onClick?: () => void };
  /** Forces a visual state (for documentation). */
  state?: TextFieldState;
}

const icon = (size: number, color: string): CSSProperties => ({
  display: "inline-flex", flex: "none", width: size, height: size, color,
});

function Message({ icon: ic, color, iconColor, children }: { icon?: ReactNode; color: string; iconColor: string; children: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "0 2px" }}>
      {ic && <span style={icon(20, iconColor)} aria-hidden>{ic}</span>}
      <span style={{ ...textStyles["Body/Small/Med"], color, flex: 1, minWidth: 0 }}>{children}</span>
    </div>
  );
}

export function TextField({
  title, leadingIcon, trailingIcon, errorMessage, caption, errorIcon, captionIcon, supportingAction,
  state, disabled, onFocus, onBlur, id, placeholder = "Enter your text", style, ...inputProps
}: TextFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [focused, setFocused] = useState(false);
  const s: TextFieldState =
    state ?? (disabled ? "Disabled" : errorMessage ? "Error" : focused ? "Focused" : "Default");
  const v = STATE[s];
  const msgId = errorMessage ? `${inputId}-error` : undefined;
  const capId = caption ? `${inputId}-caption` : undefined;

  const inputRow: CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    gap: 4,
    padding: "16px 12px",
    minHeight: 56,
    borderRadius: 12,
    background: v.fill,
    boxShadow: [v.stroke ? `inset 0 0 0 ${v.strokeWidth}px ${v.stroke}` : null, v.elevation ?? null].filter(Boolean).join(", ") || undefined,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", ...style }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {(title || supportingAction) && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 2 }}>
            {title && (
              <label htmlFor={inputId} style={{ ...textStyles["Title/2X-Small/Bold"], color: "var(--text-neutral-dark)", flex: 1 }}>
                {title}
              </label>
            )}
            {supportingAction && (
              <Button size="Small" variant="Tertiary-Info" onClick={supportingAction.onClick}>
                {supportingAction.label}
              </Button>
            )}
          </div>
        )}
        <div style={inputRow}>
          {leadingIcon && <span style={icon(24, v.icon)} aria-hidden>{leadingIcon}</span>}
          <input
            id={inputId}
            disabled={s === "Disabled"}
            placeholder={placeholder}
            aria-invalid={s === "Error" || undefined}
            aria-describedby={[msgId, capId].filter(Boolean).join(" ") || undefined}
            onFocus={(e) => { setFocused(true); onFocus?.(e); }}
            onBlur={(e) => { setFocused(false); onBlur?.(e); }}
            style={{
              ...textStyles["Body/Moderate/Reg"],
              color: v.text,
              flex: 1,
              minWidth: 0,
              border: "none",
              outline: "none",
              background: "transparent",
              padding: 0,
              // Placeholder colour (Figma Default state): Text/Neutral/Medium — see the <style> below.
            }}
            data-runway-textfield=""
            {...inputProps}
          />
          {trailingIcon && <span style={icon(24, v.icon)} aria-hidden>{trailingIcon}</span>}
        </div>
        {errorMessage && (
          <div id={msgId} role="alert">
            <Message icon={errorIcon} color="var(--text-error-dark)" iconColor="var(--surface-error-dark)">{errorMessage}</Message>
          </div>
        )}
      </div>
      {caption && (
        <div id={capId}>
          <Message icon={captionIcon} color="var(--text-neutral-medium)" iconColor="var(--surface-neutral-dark)">{caption}</Message>
        </div>
      )}
      <style>{`[data-runway-textfield]::placeholder{color:var(--text-neutral-medium);opacity:1}`}</style>
    </div>
  );
}

export default TextField;
