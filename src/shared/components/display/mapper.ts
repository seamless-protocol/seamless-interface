export function pxToRem(px: number, baseFontSize = 16) {
  return `${px / baseFontSize}rem`;
}

export const fontSizes = {
  display1: pxToRem(32),
  h1: pxToRem(32),
  h2: pxToRem(21),
  h3: pxToRem(18),
  h4: pxToRem(16),
  subheader1: pxToRem(14),
  subheader2: pxToRem(12),
  subheader2Light: pxToRem(12),
  description: pxToRem(14),
  buttonL: pxToRem(16),
  buttonM: pxToRem(14),
  buttonS: pxToRem(10),
  helperText: pxToRem(10),
  tooltip: pxToRem(12),
  main21: pxToRem(21),
  secondary21: pxToRem(21),
  main16: pxToRem(16),
  secondary16: pxToRem(16),
  main14: pxToRem(14),
  secondary14: pxToRem(14),
  main12: pxToRem(12),
  secondary12: pxToRem(12),
};
