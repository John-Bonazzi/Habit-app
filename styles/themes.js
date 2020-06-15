export const makeTheme = (key, val) => {
  Styles[key] = {...Styles.key, color: val.text};
}

export const Styles = {
    container: {
      flex: 1,
      flexDirection: 'column',
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    text: {
      flex: 1,
      fontWeight: 'bold',
    }
}