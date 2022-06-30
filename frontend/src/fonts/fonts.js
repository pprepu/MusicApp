import { createGlobalStyle } from 'styled-components'

import Roboto from './Roboto-Light-webfont.woff'

export default createGlobalStyle`
    @font-face {
        font-family: 'Roboto';
        src: local('Roboto'), local('Roboto'),
        url(${Roboto}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
`