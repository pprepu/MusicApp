import styled, { createGlobalStyle } from 'styled-components'
import Roboto from './fonts/Roboto-Light-webfont.woff'
const GlobalStyle = createGlobalStyle`

    @font-face {
        font-family: 'Roboto';
        src: url(${Roboto}) format('woff');
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto';
    }
`

export const Container = styled.div`
    z-index: 1;
    width: 100%;
    max-width: 1300px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 50px;
    padding-left: 50px;

@media screen and (max-width: 960px) {
    padding-right: 30px;
    padding-left: 30px;
}
`

export const Button = styled.button`
    border-radius: 4px;
    white-space: nowrap;
    padding: ${({ big }) => (big ? '12px 64px' : '10px 20px')};
    font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
    outline: none;
    border: solid 1px;
    cursor: pointer;

    &:hover {
        transition: all 0.3s ease-out;
    }

    @media screen and (max-width: 960px) {
        width: 100%;
    }
`

export const StyledButton = styled.button`
    border-radius: 4px;
    background: ${({ primary }) => (primary ? '#4B59F7' : '#0467fb')};
    white-space: nowrap;
    padding: ${({ big }) => (big ? '12px 64px' : '10px 20px')};
    color: #fff;
    font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
    outline: none;
    border: none;
    cursor: pointer;

    &:hover {
        transition: all 0.3s ease-out;
        background: #fff;
        background: ${({ primary }) => (!primary ? '#4B59F7' : '#0467fb')};
    }

    @media screen and (max-width: 960px) {
        width: 100%;
    }
`

export const Page = styled.div`
    /* width: 900px; */
    font-size: 18px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const SubPage = styled.div`
    /* margin: auto; */
    max-width: 1300px;
    width: 900px;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 960px) {
        width: 650px;
    }
`

export const FormRow = styled.div`
    
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 20px;
    flex-wrap: wrap;

    @media screen and (max-width: 960px) {
        
        margin-bottom: 40px;
        flex-direction: column;
        
    }
`

export const FormInput = styled.input`
    background-color: #FFFFFF;
    border: 1px solid #D6D9DC;
    border-radius: 3px;
    width: 250px;
    padding: 7px;
    font-size: 14px;

    @media screen and (max-width: 960px) {
        width: 100%;
    }
`

export const FormLabel = styled.label`

    text-align: right;
    width: 120px;
    margin-top: 7px;
    padding-right: 20px;

    @media screen and (max-width: 960px) {
        margin-bottom: 15px;
    }
    
`

export const TextParagraph = styled.p`
    /* align-self: left; */
    text-align: left;
    margin: 25px;

    @media screen and (max-width: 960px) {
        width: 70%;
    }
`

export const Text = styled.p`
    margin: 25px;

    @media screen and (max-width: 960px) {
        width: 70%;
        margin: 10px 15px 10px 10px;
    }
`

export default GlobalStyle