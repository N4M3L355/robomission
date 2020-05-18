// include global css styles
import 'normalize.css';
import './styles.css';

import theme from './newTheme';

export { theme };

export function initGlobalTheme() {
  setGlobalFonts();
}


function setGlobalFonts() {
  global.WebFontConfig = {
    google: { families: ['Righteous:400:latin', 'Roboto:300,400,600,700:latin'] },
  };
  const webFontScriptElement = document.createElement('script');
  webFontScriptElement.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  webFontScriptElement.type = 'text/javascript';
  webFontScriptElement.async = true;
  const s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(webFontScriptElement, s);
}
