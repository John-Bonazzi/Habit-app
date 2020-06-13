import StyleMerge from 'lodash.merge';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { getData } from '../helpers/Storage';
import { Styles, Themes } from '../styles/themes';

const defaultStyle = StyleSheet.create(Styles.default);

export const load_theme = async (updateTheme) => {
  var themeOption;
  var newTheme;
  getData('theme')
    .then((val) => { 
      themeOption = val;
      })
    .finally(() => {
      newTheme = StyleMerge({}, defaultStyle, Themes[themeOption]);
      updateTheme(StyleSheet.create(newTheme));
    });
}

export default Loader = (updateTheme) => {
  useEffect(() =>{
    load_theme(updateTheme);
  }, []);
}