import React, { type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";
import { Button } from "../Button/Button";
import { BottomSheet } from "../BottomSheet/BottomSheet";

/**
 * Runway BlockingSheet — composition, not a new Figma component.
 * Model: Face Auth `n6MeDvD6KOl4x8gdY7Lqmm`, frame 1305:3878 ("Off duty"), which is an instance of Runway
 * `Bottom Sheet` (1549:8554) Type=Full Illustration with its Text Box slot filled and the buttons moved inside the content.
 * Built from `BottomSheet` (scrim, floating close, container, illustration slot) + `Button`. Requires tokens/tokens.css.
 * Colours and typography are tokens; spacing, sizes and radii are raw because Figma binds no variable to them (see spec.md).
 */

export interface BlockingSheetAction {
  label: ReactNode;
  onClick?: () => void;
}

export interface BlockingSheetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Illustration. "full": fills 360×180 (Face Auth 1305:3878). "badge": 124×124 with status badge (P14, Face Auth 1187:7110). */
  image: ReactNode;
  /** Default "full". */
  imageLayout?: "full" | "badge";
  /** Heading. States the block (and its duration when there is one). */
  title: ReactNode;
  /** Content written for the context. An array renders as a bullet list (as in 1305:3878). */
  body?: ReactNode | ReactNode[];
  /** Optional consequence note in a red box (1305:3923), e.g. "<b>Note</b>: If selfie does not match…". */
  note?: ReactNode;
  /** D12 = B: "error" makes the title red (Text/Error/Dark) for blocked / failed sheets. Default "default". */
  tone?: "default" | "error";
  /** Yellow, moves the captain forward. For a multi-step task it opens the task checklist page. */
  primaryAction: BlockingSheetAction;
  /** Optional white/secondary CTA, only when the use case needs a second choice (D05). */
  secondaryAction?: BlockingSheetAction;
  /** Required (R11): every overlay can be dismissed. Wired to the floating × above the sheet (D09 = A). */
  onDismiss: () => void;
  /** Close icon graphic (24×24, white). Use assets/icons/custom/close-stroke.svg. */
  closeIcon?: ReactNode;
}

const text = (style: CSSProperties, color: string): CSSProperties => ({ ...style, color, margin: 0 });

export function BlockingSheet({
  image,
  imageLayout = "full",
  title,
  body,
  note,
  tone = "default",
  primaryAction,
  secondaryAction,
  onDismiss,
  closeIcon,
  ...rest
}: BlockingSheetProps) {
  const bodyStyle = text(textStyles["Body/Moderate/Reg"], "var(--text-onsurface-default)");

  /* Text Box (1305:3915): vertical, gap 20 (raw) → [title + body group, gap 12] + note. */
  const textBox = (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 /* raw */ }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 /* raw */ }}>
        <h2
          style={text(
            textStyles["Title/Moderate/Bold"],
            tone === "error" ? "var(--text-error-dark)" : "var(--text-onsurface-default)",
          )}
        >
          {title}
        </h2>
        {Array.isArray(body) ? (
          /* Each bullet is its own "Body" row in Figma (gap 12 from the parent); list-disc, indent 24 (raw). */
          body.map((item, i) => (
            <ul key={i} style={{ ...bodyStyle, paddingLeft: 24 /* raw */ }}>
              <li>{item}</li>
            </ul>
          ))
        ) : body != null ? (
          <p style={bodyStyle}>{body}</p>
        ) : null}
      </div>
      {note != null && (
        /* Note box (1305:3923). Stand-in for the planned Inline alert (C03, error variant).
           Fill Mapped-Red/Red 50 (bound), padding 8, radius 8 (raw). Figma fixes height 80 — hugs here. */
        <div style={{ padding: 8, borderRadius: 8, background: "var(--mapped-red-red-50)" }}>
          <p style={text(textStyles["Body/Moderate/Reg"], "var(--text-error-dark)")}>{note}</p>
        </div>
      )}
    </div>
  );

  /* Vertically Stacked Buttons (1305:3928): gap 12 (raw), Large, fill width. Primary (yellow) first. */
  const buttons = (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
      <Button size="Large" variant="Primary-Default" style={{ width: "100%" }} onClick={primaryAction.onClick}>
        {primaryAction.label}
      </Button>
      {secondaryAction && (
        <Button size="Large" variant="Secondary-Default" style={{ width: "100%" }} onClick={secondaryAction.onClick}>
          {secondaryAction.label}
        </Button>
      )}
    </div>
  );

  /* Content (1305:3914): padding 0/24 (raw), gap 32 (raw); Container adds 32 above (its gap) and 24 below (padding-bottom). */
  const content = (
    <div
      style={{
        boxSizing: "border-box",
        display: "flex", flexDirection: "column",
        gap: 32, // raw
        // Full: 32 above (Container gap) / 24 sides / 24 below. Badge: BottomSheet "Empty" already pads 24 on every side.
        padding: imageLayout === "badge" ? 0 : "32px 24px 24px", // raw
      }}
    >
      {imageLayout === "badge" && (
        <div style={{ display: "flex", width: 124, height: 124 /* raw */, flex: "none" }}>{image}</div>
      )}
      {textBox}
      {buttons}
    </div>
  );

  /* BottomSheet supplies scrim, floating ×, container (radius 16/16/0/0, max-height 632). "full" uses Type=Full Illustration
     for the 360×180 illustration slot; "badge" uses Type=Empty (padding 24, gap 32) because Full always reserves the 180 slot.
     BottomSheet's own CTA bar is switched off: in 1305:3878 the buttons sit inside the content, not in an elevated bar. */
  return (
    <BottomSheet
      type={imageLayout === "full" ? "Full Illustration" : "Empty"}
      illustration={imageLayout === "full" ? image : undefined}
      textBox={content}
      showPrimaryButton={false}
      showSecondaryButton={false}
      verticallyStackedButtons={false}
      onClose={onDismiss}
      closeIcon={closeIcon}
      {...rest}
    />
  );
}

export default BlockingSheet;
