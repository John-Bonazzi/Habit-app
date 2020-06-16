export const makeTheme = (key, val, dark) => {
  Styles.dark = dark;
  Styles[key] = {...Styles.key, color: val.text};
  Styles['myColors'] = dark ? darkTheme.myColors : lightTheme.myColors;
}

export const Styles = {
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    text: {
      flex: 1,
      fontWeight: 'bold',
    },
    myColors: lightTheme,
}

const lightTheme = {
  myColors: {
    button: 'green',
    buttonIcon: 'red',
    text: 'black',
    cards: 'grey',
    header: 'green',
  }
}

const darkTheme = {
  myColors: {
    button: 'white',
    buttonIcon: 'black',
    text: 'black',
    cards: 'white',
    header: 'grey',
  }
}