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

export const makeTheme = (key, val) => {
  Styles[key] = {...Styles.key, color: val.text};
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