import "typeface-inter";

const defaultFontFamily = `'Inter', sans-serif`
const secondaryFontFamily = `'Roboto', sans-serif`
const fontSize = 14 // px
const fontWeights = {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
}
const caseAllCaps = {
    textTransform: 'uppercase',
}
const htmlFontSize = 16 // 16px is the default font-size used by browsers.
const coef = fontSize / 14
const pxToRem = (size) => (size / htmlFontSize) * coef
const buildVariant = ({
    fontFamily = defaultFontFamily,
    fontWeight = fontWeights.regular,
    minSize,
    maxSize,
    lineHeight = 1.4,
    letterSpacing,
    casing = {},
}) => ({
    fontFamily,
    fontWeight,
    fontSize: `max(${
        minSize ?? pxToRem(maxSize)
    }rem, min(1rem + 16vw, ${pxToRem(maxSize)}rem))`,
    letterSpacing,
    lineHeight,
    ...casing,
})

const typography = {
    h1: buildVariant({
        fontWeight: fontWeights.bold,
        minSize: 2,
        maxSize: 96,
        letterSpacing: -1.5,
    }),
    h2: buildVariant({
        fontWeight: fontWeights.bold,
        minSize: 1.5,
        maxSize: 52,
        letterSpacing: -0.5,
    }),
    h3: buildVariant({
        fontWeight: fontWeights.bold,
        minSize: 1.17,
        maxSize: 48,
        letterSpacing: 0,
    }),
    h4: buildVariant({
        fontWeight: fontWeights.bold,
        minSize: 1,
        maxSize: 35,
        letterSpacing: 0.25,
    }),
    h5: buildVariant({
        fontWeight: fontWeights.bold,
        minSize: 0.83,
        maxSize: 20,
        letterSpacing: 0,
    }),
    h6: buildVariant({
        fontWeight: fontWeights.bold,
        minSize: 0.75,
        maxSize: 20,
        letterSpacing: 0.15,
    }),
    subtitle1: buildVariant({
        maxSize: 16,
        letterSpacing: 0.15,
    }),
    subtitle2: buildVariant({
        maxSize: 14,
        letterSpacing: 0.1,
    }),
    body1: buildVariant({
        fontFamily: defaultFontFamily,
        minSize: 1,
        maxSize: 16,
        letterSpacing: 0.5,
    }),
    body2: buildVariant({
        fontFamily: defaultFontFamily,
        maxSize: 14,
        letterSpacing: 0.25,
    }),
    buttonSmall: buildVariant({
        fontFamily: defaultFontFamily,
        fontWeight: fontWeights.bold,
        maxSize: 14,
        letterSpacing: 0.75,
    }),
    buttonMedium: buildVariant({
        fontFamily: defaultFontFamily,
        fontWeight: fontWeights.bold,
        maxSize: 16,
        letterSpacing: 1,
    }),
    buttonBig: buildVariant({
        fontFamily: defaultFontFamily,
        fontWeight: fontWeights.bold,
        maxSize: 18,
        letterSpacing: 1.25,
    }),
    caption: buildVariant({
        fontFamily: defaultFontFamily,
        maxSize: 12,
        letterSpacing: 0.4,
    }),
    overline: buildVariant({
        fontFamily: defaultFontFamily,
        maxSize: 10,
        letterSpacing: 1.5,
    }),
    paragraph: buildVariant({
        fontFamily: defaultFontFamily,
        maxSize: 16,
        letterSpacing: 0.5,
    }),
    label: buildVariant({
        fontFamily: defaultFontFamily,
        maxSize: 14,
        letterSpacing: 0.5,
    }),
    link: buildVariant({
        fontFamily: defaultFontFamily,
        maxSize: 18,
        letterSpacing: 0.75,
        lineHeight: 1.7,
    }),
    small: buildVariant({
        fontFamily: defaultFontFamily,
        maxSize: 12,
        letterSpacing: 0.5,
    }),
    fontWeights,
    pxToRem,
    defaultFontFamily,
    secondaryFontFamily,
    defaultFontSize: htmlFontSize,
    caseAllCaps,
}

export default typography
