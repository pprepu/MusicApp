import styled from 'styled-components'
import { Container, SubPage, Button } from '../globalStyles'

export const SessionContainer = styled(Container)`
    display: flex;
    flex-direction: row;
    justify-content: end;
    margin: 5px 5px 20px 5px;

    @media screen and (max-width: 960px) {
        width: 80%;
        /* flex-direction: column; */
        align-items: space-between;
        margin: 4px 4px 4px 4px;
    }
`

export const ImageContainer = styled(Container)`
    display: flex;
    width: 50%;
    justify-content: center;
    margin: 5px 5px 20px 5px;

    @media screen and (max-width: 960px) {
        width: 80%;
    }
`

export const AnswerContainer = styled(Container)`
    width: 75%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 5px 5px 20px 5px;

    @media screen and (max-width: 960px) {
        width: 80%;
    }
`

export const ImageItem = styled.img`
    width: 32%;
    height: auto;
`

export const AnswerButton = styled(Button)`
    background-color: ${({ isToggled }) => isToggled ? 'grey' : 'white'};
    border: ${props => props.hasAnswered && props.isCorrect ? props.userCorrect ? '5px solid green' : '5px solid red' : '1px solid black'};
    padding: ${props => props.hasAnswered && props.isCorrect ? '6px 16px' : '10px 20px'};
`