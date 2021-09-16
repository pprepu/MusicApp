import styled from 'styled-components'
import { StyledButton } from '../globalStyles'

export const SignupButton = styled(StyledButton)`
    opacity: ${({ disabled }) => disabled ? '0.2' : '1'};
`

export const ErrorText = styled.p`
    color: red;
    font-size: 14px;
    height: 14px;
`

export const TextDescription = styled.p`
    font-size: 10px;
`