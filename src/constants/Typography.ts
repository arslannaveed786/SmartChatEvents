export const FONT_SIZE = {
  XXSMALL: 8,
  XSMALL: 10,
  SMALL: 12,
  SMEDIUM: 14,
  MEDIUM: 16,
  LARGE: 20,
  XLARGE: 24,
  XXLARGE: 32,
};

export const FONT_WEIGHT = {
  LIGHT: 300,
  REGULAR: 400,
  MEDIUM: 500,
  MEDIUMBOLD: 600,
  BOLD: 700,
  EXTRABOLD: 800,
  DOUBLEBOLD: 900,
} as const;
export type FontWeight = (typeof FONT_WEIGHT)[keyof typeof FONT_WEIGHT];

