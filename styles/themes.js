import { useTheme } from "@react-navigation/native";

export const lightTheme = {
  myColors: {
    button: 'green',
    buttonIcon: 'red',
    text: 'black',
    cards: 'grey',
    header: 'green',
  }
}

export const darkTheme = {
  myColors: {
    button: 'white',
    buttonIcon: 'black',
    text: 'red',
    cards: 'white',
    header: 'grey',
  }
}

export const Styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    fontWeight: 'bold',
  },
  myColors: lightTheme.myColors,
}


export const makeTheme = (theme) => {
  Styles.dark = theme.dark;
  Styles.colors = theme.colors;
  Styles['text'] = {...Styles.text, color: theme.colors.text};
  Styles['card'] = theme.card;
  Styles['myColors'] = theme.dark ? darkTheme.myColors : lightTheme.myColors;
}

