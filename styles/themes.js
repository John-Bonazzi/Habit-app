/*export const Themes = {
  dark: {
    container:{
      backgroundColor: 'black',
    },
    text:{
      color: 'white',
    }
  },
  light: {
    container:{
      backgroundColor: 'white',
    },
    text:{
      color: 'black',
    }
  },
};*/

export const theme = {...Styles};

export const makeTheme = (key, val) => {
  theme[key] = {...theme.key, color: val.text};
  return theme;
}

export const Styles = {
  
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontWeight: 'bold',
    }
}