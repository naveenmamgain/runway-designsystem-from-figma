import React, { type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";
import { Button } from "../Button/Button";

/**
 * Runway GuidanceBottomSheet — Figma: `Guidance Bottom Sheet` (2706:11381), variants Sheet1/Sheet2/Sheet3 = step 1–3 of a
 * paged guide. Requires tokens/tokens.css. Colours/effects/typography are tokens; spacing, sizes and radii are raw because
 * Figma binds no variable to them (see spec.md).
 */

export interface GuidanceStep {
  /** "Image" slot, 360×335 (Figma: image fill, scale mode FILL). */
  image?: ReactNode;
  title?: ReactNode;
  body?: ReactNode;
  /** Replaces the whole "Textbox" slot. */
  textbox?: ReactNode;
}

export interface GuidanceBottomSheetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  steps: GuidanceStep[];
  /** 0-based index of the shown step (Figma Property 1 = Sheet1/2/3). */
  current?: number;
  /** Optional header (Figma "Head" frame, hidden in all variants; sample "Company Order Rules"). */
  heading?: ReactNode;
  /** Trailing icon on the "Next" button (non-last steps). */
  nextIcon?: ReactNode;
  nextLabel?: ReactNode;
  confirmLabel?: ReactNode;
  onNext?: () => void;
  onConfirm?: () => void;
}

const GUIDANCE_TEXT = "var(--base-gray-gray-800)"; // raw in Figma (unbound); equals Base-Gray/Gray 800

export function GuidanceBottomSheet({
  steps, current = 0, heading, nextIcon, nextLabel = "Next", confirmLabel = "Confirm", onNext, onConfirm, style, ...rest
}: GuidanceBottomSheetProps) {
  const step = steps[current] ?? {};
  const isLast = current >= steps.length - 1;
  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        boxSizing: "border-box",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        width: 360, height: 720, // raw, Figma frame (use 100% / 100dvh in an app)
        background: "var(--overlays-large-75pct-black)",
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          display: "flex", flexDirection: "column", width: "100%",
          borderRadius: "16px 16px 0 0", // raw
          background: "var(--surface-neutral-white)",
          overflow: "hidden",
        }}
      >
        {heading != null && (
          <div style={{ display: "flex", alignItems: "center", padding: "16px 24px", borderRadius: "10px 10px 0 0" /* raw */ }}>
            <h2 style={{ ...textStyles["Title/Moderate/SemiBold"], color: "var(--text-onsurface-default)", margin: 0 }}>{heading}</h2>
          </div>
        )}
        <div style={{ display: "flex", width: "100%", height: 335 /* raw */, overflow: "hidden" }}>{step.image}</div>
        <div
          style={{
            boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 8, padding: "16px 24px",
            maxHeight: 192, // raw
            overflowY: "auto",
          }}
        >
          {step.textbox ?? (
            <>
              <h3 style={{ ...textStyles["Title/Small/Bold"], color: GUIDANCE_TEXT, margin: 0 }}>{step.title}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <p style={{ ...textStyles["Body/Moderate/Reg"], color: GUIDANCE_TEXT, margin: 0 }}>{step.body}</p>
              </div>
            </>
          )}
        </div>
        <div
          style={{
            boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "12px 24px", // raw
            background: "var(--surface-neutral-white)",
            boxShadow: "var(--elevation-s)",
          }}
        >
          <div style={{ display: "flex", gap: 16 /* raw */ }} aria-label={`Step ${current + 1} of ${steps.length}`} role="img">
            {steps.map((_, i) => (
              <span
                key={i}
                style={{
                  boxSizing: "border-box", width: 16, height: 16, borderRadius: "50%", // raw
                  boxShadow: "inset 0 0 0 1px var(--border-neutral-dark)",
                  background: i === current ? "var(--surface-neutral-dark)" : "transparent",
                }}
              />
            ))}
          </div>
          {/* Figma: Buttons Medium / Primary-Default; instance fill overridden to Surface/Brand/Primary-A (same hex as
              Mapped-Yellow/Yellow 400) and min-width unbound/removed (button is 112 wide < token min 140). */}
          <Button
            size="Medium"
            variant="Primary-Default"
            trailingIcon={isLast ? undefined : nextIcon}
            style={{ minWidth: 0 }} // fill left to Button (Yellow 400 = Primary-A hex) so Pressed/Disabled still work
            onClick={isLast ? onConfirm : onNext}
          >
            {isLast ? confirmLabel : nextLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
