import styled from 'styled-components'

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
    font-size: ${({ size }) => !size ? '' : size > 8 ? '10px' : '14px' };
`

export const TextContainer = styled.div`
    border: 1px solid #D6D9DC;
    border-radius: 3px;

    /* width: 600px; */
    padding: 50px;
    margin: 0 0 20px 0;

    @media screen and (max-width: 960px) {
        width: 80%;
    }

`
export const TextRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 20px;
    

    @media screen and (max-width: 960px) {
        width: 70%;
        flex-direction: column;
        align-items: center;
    }
`

export const UserpageText = styled.p`
    font-size: 20px;
    font-weight: ${({ bold }) => bold ? 'bold' : 'normal' };
    margin: 10px 40px 40px 10px;

    @media screen and (max-width: 960px) {
        margin: 5px 0 0 0;
    }
`