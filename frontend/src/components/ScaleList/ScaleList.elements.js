import styled from 'styled-components'
import { Button, Container, StyledButton } from '../../globalStyles'

export const ScaleButton = styled(Button)`
    background-color: ${({ isToggled }) => isToggled ? 'grey' : 'white'};
`

export const ScaleContainer = styled(Container)`
    margin-bottom: 15px;
    display: flex;
    flex-direction: row;
    justify-content: center;

    @media screen and (max-width: 960px) {
        flex-direction: column;
    }

`

export const OptionList = styled.ul`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`

export const OptionItem = styled.button`
    font-size: 1.2rem;
    height: 35px;
    width: 19%;
    margin-bottom: 10px;
    margin-right: 5px;
    background-color: ${({ isToggled }) => isToggled ? 'grey' : 'white'};

    &:hover {
        transition: all 0.3s ease-out;
    }

    @media screen and (max-width: 960px) {
        width: 40%;
    }

`