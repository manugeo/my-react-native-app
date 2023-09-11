const theme = {
  colors: {
    backgroundPrimary: '#abd699',
    backgroundSecondary: '#cdf8bb',
    backgroundDarker: '#16123f',
    backgroundLighter: 'rgba(22, 18, 63, 0.1)',
    textPrimary: '#16123f',
    textLight: '#ffffff',
    textError: '#FF0000',

    // textPrimary: '#0d5588',
    teal: '#75c9b7',
    mint: '#c7ddcc',
    navy: '#16123f'
  },
  texts: {
    largeBold: {
      fontSize: 20,
      lineHeight: 22,
      fontWeight: 'bold'
    },
    large: {
      fontSize: 20,
      lineHeight: 22
    },
    medium: {
      fontSize: 16,
      lineHeight: 18
    },
    small: {
      fontSize: 14,
      lineHeight: 16
    },
  }
};

export const defaultScreenOptions = {
  headerTitleAlign: 'center',
  headerTintColor: theme.colors.textLight,
  headerStyle: { backgroundColor: theme.colors.backgroundDarker }
};

export default theme;