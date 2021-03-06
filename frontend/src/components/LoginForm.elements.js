import styled from 'styled-components'

export const FormLogin = styled.form`
    border: 1px solid #D6D9DC;
    border-radius: 3px;

    /* width: 600px; */
    padding: 50px;
    margin: 0 0 40px 0;

    @media screen and (max-width: 960px) {
        width: 80%;
    }
`

export const ErrorMessage = styled.p`

    font-size: 16px;
    color: #FF6347;
    height: 16px;
    margin: 20px;
`