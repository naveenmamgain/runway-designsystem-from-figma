import React, { type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";
import { Button } from "../Button/Button";

/**
 * Runway BottomSheet — Figma: `Bottom Sheet` (1549:8554), 5 variants, with private `.Radio Points` (1547:8275).
 * Requires tokens/tokens.css. Colours/effects/typography are tokens; spacing, sizes and radii are raw because Figma binds
 * no variable to them (see spec.md). Icons/illustrations are ReactNode props.
 */

export type BottomSheetType = "Empty" | "Basic" | "Points" | "Half Illustration" | "Full Illustration";

export interface BottomSheetAction {
  label: ReactNode;
  onClick?: () => void;
}

export interface BottomSheetPoint {
  label: ReactNode;
  /** `.Radio Points` "Instance" (20×20, default Live Location_Filled). Omit to hide (Figma "Show Icon" = false). */
  icon?: ReactNode;
}

export interface BottomSheetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Figma Type. Default "Empty". */
  type?: BottomSheetType;
  title?: ReactNode;
  body?: ReactNode;
  /** Replaces the whole "Text Box" slot (title + body; for Points also the radio list). For Empty: the sheet content. */
  textBox?: ReactNode;
  /** Figma "Show Top Icon" (Basic, Points). Default true. */
  showTopIcon?: boolean;
  /** "Icon" slot content (40×40 icon placed in the 60×60 Blue 200 holder). */
  icon?: ReactNode;
  /** Replaces the whole "Icon" slot. */
  iconSlot?: ReactNode;
  /** "Illustration" slot (Half: 124×124; Full: 360×180). */
  illustration?: ReactNode;
  /** Points variant: radio list. */
  points?: BottomSheetPoint[];
  selectedPoint?: number;
  onSelectPoint?: (index: number) => void;
  /** Radio Button graphics (24×24, paint with currentColor). Selection=False / Selection=True. */
  radioIcon?: ReactNode;
  radioSelectedIcon?: ReactNode;
  /** Figma "Show Radio Button" on .Radio Points. Default true. */
  showRadioButton?: boolean;
  primaryAction?: BottomSheetAction;
  secondaryAction?: BottomSheetAction;
  /** Figma "Primary Button" / "Secondary Button". Default true. */
  showPrimaryButton?: boolean;
  showSecondaryButton?: boolean;
  /** Figma "Horizontally Stacked Buttons" (default false) / "Vertically Stacked Buttons" (default true). */
  horizontallyStackedButtons?: boolean;
  verticallyStackedButtons?: boolean;
  /** Close icon (24×24, white). The close control renders when onClose is set. */
  closeIcon?: ReactNode;
  onClose?: () => void;
}

const sheetText = (style: CSSProperties): CSSProperties => ({ ...style, color: "var(--text-onsurface-default)", margin: 0 });

function TextBox({ title, body, padded }: { title?: ReactNode; body?: ReactNode; padded?: boolean }) {
  // "Text Box": vertical, padding 0/8/0/8, gap 12 (raw). Full Illustration wraps it in a 24-padding slot.
  const inner = (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "0 8px" }}>
      {title != null && <h2 style={sheetText(textStyles["Title/Moderate/Bold"])}>{title}</h2>}
      {body != null && <p style={sheetText(textStyles["Body/Moderate/Reg"])}>{body}</p>}
    </div>
  );
  return padded ? <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: 24 }}>{inner}</div> : inner;
}

function TopIcon({ icon }: { icon?: ReactNode }) {
  return (
    <div
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: 60, height: 60, borderRadius: 32, // raw (slot frame itself: radius 999)
        background: "var(--mapped-blue-blue-200)",
      }}
    >
      <span aria-hidden style={{ display: "inline-flex", width: 40, height: 40, color: "var(--surface-neutral-black)" }}>{icon}</span>
    </div>
  );
}

/** `.Radio Points` (Type = Default | Selected). */
function RadioPoint({
  point, selected, onSelect, radioIcon, radioSelectedIcon, showRadioButton,
}: {
  point: BottomSheetPoint; selected: boolean; onSelect: () => void;
  radioIcon?: ReactNode; radioSelectedIcon?: ReactNode; showRadioButton: boolean;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      style={{
        boxSizing: "border-box",
        display: "flex", alignItems: "center", gap: 8, padding: 8, // raw
        width: "100%", minHeight: 44, borderRadius: 8, // raw
        border: "none", textAlign: "left", cursor: "pointer",
        background: "var(--surface-neutral-white)",
        boxShadow: selected
          ? "inset 0 0 0 1px var(--border-information-dark), var(--elevation-s)"
          : "inset 0 0 0 1px var(--border-neutral-light)",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 4, flex: 1, minWidth: 0 }}>
        {point.icon && (
          <span style={{ display: "inline-flex", padding: 4, borderRadius: 999, flex: "none" }}>
            {/* icon fill is raw #1c1b1f in Figma (unbound) */}
            <span aria-hidden style={{ display: "inline-flex", width: 20, height: 20, color: "#1c1b1f" }}>{point.icon}</span>
          </span>
        )}
        <span
          style={{
            ...textStyles["Body/Moderate/Reg"],
            color: "var(--text-onsurface-default)", // raw #1a202a in Figma (unbound); same value
            flex: 1, minWidth: 0,
            display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden",
          }}
        >
          {point.label}
        </span>
      </span>
      {showRadioButton && (
        <span
          aria-hidden
          style={{
            display: "inline-flex", width: 24, height: 24, flex: "none",
            color: selected ? "var(--surface-information-dark)" : "var(--surface-neutral-dark)",
          }}
        >
          {selected ? radioSelectedIcon : radioIcon}
        </span>
      )}
    </button>
  );
}

export function BottomSheet({
  type = "Empty",
  title: titleProp,
  body,
  textBox,
  showTopIcon = true,
  icon,
  iconSlot,
  illustration,
  points = [],
  selectedPoint,
  onSelectPoint,
  radioIcon,
  radioSelectedIcon,
  showRadioButton = true,
  primaryAction = { label: "Label" },
  secondaryAction = { label: "Label" },
  showPrimaryButton = true,
  showSecondaryButton = true,
  horizontallyStackedButtons = false,
  verticallyStackedButtons = true,
  closeIcon,
  onClose,
  style,
  ...rest
}: BottomSheetProps) {
  const title = titleProp ?? (type === "Empty" ? "Detach this component to use." : "Write your title here -   can span to max 3 lines if needed.");
  const defaultBody = type === "Points" ? "Add detailed explanation here." : "Add detailed explanation or context here. This text can span";

  /* Buttons. Horizontal: Medium, each fills half (Figma 152 fixed of 312, gap 8).
     Order differs in Figma: Basic = Secondary, Primary; Points/Half/Full = Primary, Secondary. */
  const half: CSSProperties = { flex: 1, minWidth: 0 };
  const primaryM = showPrimaryButton && (
    <Button size="Medium" variant="Primary-Default" style={half} onClick={primaryAction.onClick}>{primaryAction.label}</Button>
  );
  const secondaryM = showSecondaryButton && (
    <Button size="Medium" variant="Secondary-Default" style={half} onClick={secondaryAction.onClick}>{secondaryAction.label}</Button>
  );
  const horizontal = horizontallyStackedButtons && (
    <div style={{ display: "flex", gap: 8, width: "100%" }}>
      {type === "Basic" ? <>{secondaryM}{primaryM}</> : <>{primaryM}{secondaryM}</>}
    </div>
  );
  const vertical = verticallyStackedButtons && (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
      {showPrimaryButton && (
        <Button size="Large" variant="Primary-Default" style={{ width: "100%" }} onClick={primaryAction.onClick}>{primaryAction.label}</Button>
      )}
      {showSecondaryButton && (
        <Button size="Large" variant="Secondary-Default" style={{ width: "100%" }} onClick={secondaryAction.onClick}>{secondaryAction.label}</Button>
      )}
    </div>
  );
  const hasButtons = !!(horizontal || vertical);
  /* CTA bar (Points, Half, Full): padding 16/24/16/24, fill raw #ffffff (unbound), Elevation/S. */
  const ctaBar = hasButtons && (
    <div
      style={{
        boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 10, padding: "16px 24px",
        background: "var(--surface-neutral-white)", boxShadow: "var(--elevation-s)",
      }}
    >
      {horizontal}
      {vertical}
    </div>
  );

  const topIcon = showTopIcon && (iconSlot ?? <TopIcon icon={icon} />);
  const tb = textBox ?? <TextBox title={title} body={body ?? defaultBody} />;

  let content: ReactNode;
  switch (type) {
    case "Empty":
      content = (
        <div style={{ display: "flex", flexDirection: "column", gap: 32, padding: 24 }}>
          {textBox ?? (
            <>
              <h2 style={sheetText(textStyles["Title/Moderate/Bold"])}>{title}</h2>
              {body != null && <p style={sheetText(textStyles["Body/Moderate/Reg"])}>{body}</p>}
            </>
          )}
        </div>
      );
      break;
    case "Basic":
      content = (
        <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: 24 }}>
          {topIcon}
          {tb}
          {horizontal}
          {vertical}
        </div>
      );
      break;
    case "Points":
      content = (
        <>
          {/* Content: padding 24, gap 24; fixed 464 high in Figma — hugs here. */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: 24, minHeight: 0, overflowY: "auto" }}>
            {topIcon}
            {textBox ?? (
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <TextBox title={title} body={body ?? defaultBody} />
                <div role="radiogroup" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {points.map((pt, i) => (
                    <RadioPoint
                      key={i}
                      point={pt}
                      selected={i === selectedPoint}
                      onSelect={() => onSelectPoint?.(i)}
                      radioIcon={radioIcon}
                      radioSelectedIcon={radioSelectedIcon}
                      showRadioButton={showRadioButton}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          {ctaBar}
        </>
      );
      break;
    case "Half Illustration":
      content = (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: 24, minHeight: 0, overflowY: "auto" }}>
            <div style={{ display: "flex", width: 124, height: 124 /* raw */ }}>{illustration}</div>
            {tb}
          </div>
          {ctaBar}
        </>
      );
      break;
    case "Full Illustration":
      content = (
        <>
          <div style={{ minHeight: 0, overflowY: "auto" }}>
            <div style={{ display: "flex", width: "100%", height: 180 /* raw */ }}>{illustration}</div>
            {textBox ?? <TextBox title={title} body={body ?? defaultBody} padded />}
          </div>
          {ctaBar}
        </>
      );
      break;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        boxSizing: "border-box",
        display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end",
        gap: 16, // raw
        width: 360, height: 720, // raw, Figma frame (use 100% / 100dvh in an app)
        background: "var(--overlays-large-75pct-black)",
        ...style,
      }}
      {...rest}
    >
      {onClose && (
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          style={{ display: "inline-flex", padding: "4px 16px", border: "none", background: "none", cursor: "pointer" }}
        >
          <span aria-hidden style={{ display: "inline-flex", width: 24, height: 24, color: "var(--surface-neutral-white)" }}>{closeIcon}</span>
        </button>
      )}
      <div
        style={{
          boxSizing: "border-box",
          display: "flex", flexDirection: "column",
          width: "100%", maxHeight: 632, // raw
          borderRadius: "16px 16px 0 0", // raw
          background: "var(--surface-neutral-white)", // raw #ffffff in Figma (unbound); same value
          overflow: "hidden",
        }}
      >
        {content}
      </div>
    </div>
  );
}
