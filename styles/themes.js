import { useTheme } from "@react-navigation/native";

export const lightTheme = {
  myColors: {
    drawerTint: '#9ABA23',
    button: '#B95411',
    optionButton: '#9ABA23',
    newButton: '#9ABA23',
    editButton: '#23B2BA',
    deleteButton: '#7D07BA',
    buttonIcon: 'red',
    text: 'black',
    cards: '#944C1C',
    header: '#B95411',
  }
}

export const darkTheme = {
  myColors: {
    drawerTint: '#23B2BA',
    button: '#B95411',
    optionButton: '#7D07BA',
    newButton: '#9ABA23',
    editButton: '#23B2BA',
    deleteButton: '#7D07BA',
    buttonIcon: 'black',
    text: 'black',
    subText: '#79979C',
    cards: 'grey',
    header: '#B95411',
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

