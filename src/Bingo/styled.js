import styled from 'styled-components';

export const BingoTile = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    cursor: pointer;
    background: ${({ $selected, $completed, $center }) => {
        if ($completed) {
            return 'lightgreen';
        }

        if ($center) {
            return 'cyan';
        }

        return $selected ? 'lightgrey' : 'none';
    }};
    color: ${({ $selected }) => $selected ? 'grey' : 'black'};
    text-decoration: ${({ $selected }) => $selected ? 'line-through' : 'none'};
    transition: background-color, color .5s linear;
    font-size: 16px;
    font-size: 2.5vw;
`;

export const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    text-align: center;
    grid-template-columns: repeat(5, 1fr);
`;