
import styled from "styled-components"

export const Table = styled.table`

    width: 850px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    @media screen and (max-width: 960px) {
        width: 100%;
    }
`

export const TableRow = styled.tr`
    display: flex;
    background-color: ${({ header }) => header ? '#E8E8E8' : 'white' };
    font-size: ${({ header }) => header ? '14px' : '18px' };
    border-bottom: ${({ last }) => last ? '' : '1px solid black'};
    justify-content: ${({ header }) => header ? 'left' : 'space-between' };
    width: 85%;
    padding: ${({ header }) => header ? '17px' : '10px' };
    
    @media screen and (max-width: 960px) {
        width: 100%;
    }
`

export const TableText = styled.p`
    margin-left: 20px;
    margin-right: 20px;
    font-size: ${({ size }) => !size ? '' : size > 8 ? '10px' : '14px' }
`
