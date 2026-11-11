import React, { type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";
import { Button, IconOnlyButton } from "../Button/Button";
import { AndroidStatusBar } from "../AndroidStatusBar/AndroidStatusBar";
import { PrimaryTabs, type PrimaryTabsProps } from "../PrimaryTabs/PrimaryTabs";
import { SecondaryTabs, type SecondaryTabsProps } from "../SecondaryTabs/SecondaryTabs";

/**
 * Runway InternalPageHeader — Figma: Internal Page Header (1372:7618).
 * Requires tokens/tokens.css. Colours, elevation, typography and button metrics are tokens; layout spacing is raw
 * (unbound in Figma).
 */

export interface InternalPageHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** "Page name" text layer (no text property in Figma). */
  title?: ReactNode;
  /** Figma "Show Back Button" — rendered when `onBack` or `backIcon` is given. */
  showBackButton?: boolean;
  backIcon?: ReactNode;
  onBack?: () => void;
  /** Figma "Icon Button" (Translate_Hindi by default, 20×20). */
  showIconButton?: boolean;
  iconButtonIcon?: ReactNode;
  iconButtonLabel?: string;
  onIconButtonClick?: () => void;
  /** Figma "Show Help Buttons" — Button Small / Secondary-Default / Icon=Leading. */
  showHelpButton?: boolean;
  helpLabel?: ReactNode;
  helpIcon?: ReactNode;
  onHelpClick?: () => void;
  /** Figma "Show Primary Tabs". */
  showPrimaryTabs?: boolean;
  primaryTabs?: PrimaryTabsProps;
  /** Figma "Show Secondary Tabs". */
  showSecondaryTabs?: boolean;
  secondaryTabs?: SecondaryTabsProps;
  /** Figma "Android status bar" (default false). */
  showAndroidStatusBar?: boolean;
}

// Both trailing buttons override their stroke to Border/Neutral/Black (1px inside) in Figma.
const blackStroke = "inset 0 0 0 1px var(--border-neutral-black)";

export function InternalPageHeader({
  title = "Page name",
  showBackButton = true,
  backIcon,
  onBack,
  showIconButton = true,
  iconButtonIcon,
  iconButtonLabel = "Change language",
  onIconButtonClick,
  showHelpButton = true,
  helpLabel = "Label",
  helpIcon,
  onHelpClick,
  showPrimaryTabs = true,
  primaryTabs,
  showSecondaryTabs = true,
  secondaryTabs,
  showAndroidStatusBar = false,
  style,
  ...rest
}: InternalPageHeaderProps) {
  const root: CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: 8, // raw
    width: "100%",
    background: "var(--surface-neutral-white)",
    boxShadow: "var(--elevation-s)",
    ...style,
  };
  const titleRow: CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    gap: 16, // raw
    height: 64, // raw, fixed
    padding: "12px 16px", // raw
    background: "var(--surface-neutral-white)",
  };
  return (
    <header style={root} {...rest}>
      {showAndroidStatusBar && <AndroidStatusBar style={{ height: 32 }} /* instance override in Figma */ />}
      <div style={titleRow}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 /* raw */, flex: "1 1 0", minWidth: 0 }}>
          {showBackButton && (
            <button
              type="button"
              aria-label="Back"
              onClick={onBack}
              // Left Arrow 24×24; vector is unbound #000000 (= Base-Neutral/Black)
              style={{ display: "inline-flex", flex: "none", width: 24, height: 24, padding: 0, border: "none", background: "none", color: "var(--base-neutral-black)", cursor: "pointer" }}
            >
              {backIcon}
            </button>
          )}
          {/* Fill is unbound #000000 in Figma (= Base-Neutral/Black). */}
          <span style={{ ...textStyles["Title/X-Small/SemiBold"], color: "var(--base-neutral-black)", flex: 1, minWidth: 0, textAlign: "left" }}>
            {title}
          </span>
        </div>
        {(showIconButton || showHelpButton) && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 /* raw */, flex: "none" }}>
            {showIconButton && (
              <IconOnlyButton
                size="Small"
                variant="Secondary"
                icon={iconButtonIcon}
                aria-label={iconButtonLabel}
                onClick={onIconButtonClick}
                style={{ boxShadow: blackStroke }}
              />
            )}
            {showHelpButton && (
              <Button
                size="Small"
                variant="Secondary-Default"
                leadingIcon={helpIcon}
                onClick={onHelpClick}
                style={{ boxShadow: blackStroke }}
              >
                {helpLabel}
              </Button>
            )}
          </div>
        )}
      </div>
      {showPrimaryTabs && (
        <div style={{ boxShadow: "inset 0 -1px 0 var(--border-neutral-light)" /* bottom stroke 1, inside */ }}>
          <PrimaryTabs {...primaryTabs} />
        </div>
      )}
      {showSecondaryTabs && (
        <div style={{ paddingBottom: 4 /* raw */ }}>
          <SecondaryTabs {...secondaryTabs} />
        </div>
      )}
    </header>
  );
}

export default InternalPageHeader;
