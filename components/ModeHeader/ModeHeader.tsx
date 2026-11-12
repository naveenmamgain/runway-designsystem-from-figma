import React, { type CSSProperties, type ReactNode } from "react";
import { HomepageHeader, type HomepageHeaderProps } from "../HomepageHeader/HomepageHeader";
import { modeAttr, type CaptainMode } from "../ModeSwitcher/ModeSwitcher";

/**
 * Runway ModeHeader — the home header tinted per captain mode (Hub / Delivery / Bike Lift).
 * Source: Logistics file nJVb4xUWWcmIUArw5sAxIv, frame "Header" (360×110) in 556:39547 (Hub), 119:14011 (Delivery),
 * 119:14091 (Bike Lift): a vertical gradient (`--mode-header-start` → `--mode-header-end`) behind the Runway
 * Homepage Header (66) and the "Today's Earnings" row (44).
 * Requires tokens/tokens.css.
 */

export interface ModeHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  mode: CaptainMode;
  /** Props for the Runway HomepageHeader inside (rendered without its own white fill). */
  header?: HomepageHeaderProps;
  /** Content under the header row — in Figma the "Today's Earnings Accordian" (360×44, padding 10/16/10/16). */
  children?: ReactNode;
}

export function ModeHeader({ mode, header, children, style, ...rest }: ModeHeaderProps) {
  const root: CSSProperties = {
    boxSizing: "border-box",
    width: "100%",
    minHeight: 110, // raw (Figma Header frame height)
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(180deg, var(--mode-header-start) 0%, var(--mode-header-end) 100%)",
    ...style,
  };
  return (
    <div data-mode={modeAttr(mode)} style={root} {...rest}>
      {/* Figma keeps Elevation/S on the Homepage Header instance but gives it no fill; the visible result is the
          gradient with no white bar, so the header's own background and shadow are removed here. */}
      <HomepageHeader {...header} style={{ background: "transparent", boxShadow: "none", ...header?.style }} />
      {children}
    </div>
  );
}

export default ModeHeader;
