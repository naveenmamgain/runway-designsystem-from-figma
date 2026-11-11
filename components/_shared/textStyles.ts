import type { CSSProperties } from "react";

/**
 * Runway text styles as CSS. Each style maps to the semantic typography tokens it is
 * bound to in Figma (Typography - Semantic Tokens) plus the typeface token.
 * Variable names follow tokens/tokens.css (kebab-case of the Figma variable path).
 *
 * Label/* styles have Figma "leading trim: cap height" set; CSS `text-box` is applied
 * for those (supported in recent browsers; ignored elsewhere).
 */
const ts = (prefix: string, capTrim = false): CSSProperties => ({
  fontFamily: "var(--cap-app-typeface)",
  fontSize: `var(--${prefix}-size)`,
  fontWeight: `var(--${prefix}-weight)` as CSSProperties["fontWeight"],
  lineHeight: `var(--${prefix}-height)`,
  letterSpacing: 0,
  ...(capTrim ? ({ textBox: "trim-both cap alphabetic" } as CSSProperties) : {}),
});

export const textStyles = {
  "Display/Large/Bold": ts("display-large-40-bold"),
  "Display/X-Large/Bold": ts("display-x-large-48-bold"),
  "Title/2X-Small/SemiBold": ts("title-2x-small-16-semibold"),
  "Title/2X-Small/Bold": ts("title-2x-small-16-bold"),
  // Figma binds this style's weight to Title/2X-Small (16)/SemiBold/Weight (same value). See EXPORT_NOTES.md.
  "Title/X-Small/SemiBold": { ...ts("title-x-small-18-semibold"), fontWeight: "var(--title-2x-small-16-semibold-weight)" } as CSSProperties,
  "Title/X-Small/Bold": ts("title-x-small-18-bold"),
  "Title/Small/SemiBold": ts("title-small-20-semibold"),
  "Title/Small/Bold": ts("title-small-20-bold"),
  "Title/Moderate/SemiBold": ts("title-moderate-24-semibold"),
  "Title/Moderate/Bold": ts("title-moderate-24-bold"),
  "Title/Large/SemiBold": ts("title-large-32-semibold"),
  "Title/Large/Bold": ts("title-large-32-bold"),
  "SubTitle/X-Small/Med": ts("subtitle-x-small-14-med"),
  "SubTitle/X-Small/SemiBold": ts("subtitle-x-small-14-semibold"),
  "SubTitle/X-Small/Bold": ts("subtitle-x-small-14-bold"),
  "SubTitle/Small/Med": ts("subtitle-small-16-med"),
  "SubTitle/Small/SemiBold": ts("subtitle-small-16-semibold"),
  "SubTitle/Small/Bold": ts("subtitle-small-16-bold"),
  "SubTitle/Moderate/Med": ts("subtitle-moderate-20-med"),
  "SubTitle/Moderate/SemiBold": ts("subtitle-moderate-20-semibold"),
  "SubTitle/Moderate/Bold": ts("subtitle-moderate-20-bold"),
  "SubTitle/Large/Med": ts("subtitle-large-24-med"),
  "SubTitle/Large/SemiBold": ts("subtitle-large-24-semibold"),
  "SubTitle/Large/Bold": ts("subtitle-large-24-bold"),
  "Body/Small/Reg": ts("body-small-14-reg"),
  "Body/Small/Med": ts("body-small-14-med"),
  "Body/Moderate/Reg": ts("body-moderate-16-reg"),
  "Body/Moderate/Med": ts("body-moderate-16-med"),
  "Label/Small/Reg": ts("label-small-10-reg", true),
  "Label/Small/Med": ts("label-small-10-med", true),
  "Label/Moderate/Reg": ts("label-moderate-12-reg", true),
  "Label/Moderate/Med": ts("label-moderate-12-med", true),
  "Label/Large/Reg": ts("label-large-14-reg", true),
  "Label/Large/Med": ts("label-large-14-med", true),
  // Text styles are named "Button/…"; their variables live under the Figma group "Botton/…" (sic).
  "Button/Small/Med": ts("botton-small-14-med"),
  "Button/Small/SemiBold": ts("botton-small-14-semibold"),
  "Button/Small/Bold": ts("botton-small-14-bold"),
  "Button/Moderate/Med": ts("botton-moderate-16-med"),
  "Button/Moderate/SemiBold": ts("botton-moderate-16-semibold"),
  "Button/Moderate/Bold": ts("botton-moderate-16-bold"),
} satisfies Record<string, CSSProperties>;

export type TextStyleName = keyof typeof textStyles;
