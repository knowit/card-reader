const colors = {
  grey: '#777777',
  greyLight: '#e8e3e3',
  greyLighter: '#eff0f2',
  greyLightest: '#f8f8f8',
  greyDark: '#4d4d4d',
  knowit: {
    green: '#00594F',
    greenLight: '#009681',
    greenLighter: '#A0D1CA',
    greenLightest: '#C9E2E0',
    red: '#C26E60',
    redLight: '#EAA794',
    redLighter: '#ECC3B2',
    redLightest: '#F3E9E2',
    purple: '#614B79',
    purpleLight: '#8E7FAE',
    purpleLighter: '#B6B8DC',
    purpleLightest: '#DEE1EC',
    grey: '#75787B',
    greyLight: '#B1B3B3',
    greyLighter: '#D0D0CE',
    greyLightest: '#E4E2DB',
  },
};

const mediaQueries = {
  xxlarge: 'min-width: 1800px',
  xlarge: 'min-width: 1200px',
  large: 'min-width: 800px',
  medium: 'max-width: 800px',
  small: 'max-width: 600px',
  xsmall: 'max-width: 400px',
};

const spacingUnit = 26;

const spacing = {
  xsmall: `${spacingUnit / 4}px`,
  small: `${spacingUnit / 2}px`,
  normal: `${spacingUnit}px`,
  medium: `${spacingUnit * 1.25}px`,
  large: `${spacingUnit * 2}px`,
};


export { 
    colors,
    mediaQueries,
    spacing,
}