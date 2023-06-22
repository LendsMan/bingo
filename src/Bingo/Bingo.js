import { useEffect, useState } from 'react';
import { BingoTile, Wrapper } from './styled';
import { shuffle } from '../helpers/shuffle.helper';


const BINGO_SIZE = 5;
const BINGO_INDEX = Math.floor(BINGO_SIZE * BINGO_SIZE / 2);
const DEFAULT_SELECTED_STATE = Array.from({length: BINGO_SIZE * BINGO_SIZE}, (i, index) => index === BINGO_INDEX);

const LEFT_DIAGONAL = getLeftDiagonal();
const RIGHT_DIAGONAL = getRightDiagonal();

function Bingo({ tiles, centerTile }) {
  const [selectedTiles, setSelectedTiles] = useState(DEFAULT_SELECTED_STATE);
  const [completed, setCompleted] = useState(new Set());
  const [bingoTiles, setBingoTiles] = useState([]);

  useEffect(() => {
    setBingoTiles(getBingoTiles(tiles, centerTile, BINGO_INDEX));
    setCompleted(new Set());
    setSelectedTiles(DEFAULT_SELECTED_STATE);
  }, [tiles, centerTile]);

  const checkGame = (tiles, index) => {
    if (!tiles[index]) {
      if (completed.has(index)) {
        setCompleted(getCompleted(tiles));
      }

      return;
    }

    const currentRowIndex = Math.floor(index / BINGO_SIZE);
    const currentColumnIndex = index % BINGO_SIZE;

    const currentRow = getCurrentRow(currentRowIndex);
    const currentColumn = getCurrentColumn(currentColumnIndex);

    const isCurrentRowCompleted = isRowCompleted(tiles, currentRowIndex);
    const isCurrentColumnCompleted = isColumnCompleted(tiles, currentColumnIndex);

    let tempCompleted = [
      ...completed,
      ...(isCurrentRowCompleted ? currentRow : []),
      ...(isCurrentColumnCompleted ? currentColumn : []),
    ];

    const isLeftDiagonal = index % BINGO_SIZE === Math.floor(index / BINGO_SIZE);
    const isRightDiagonal = index % BINGO_SIZE === BINGO_SIZE - 1 - Math.floor(index / BINGO_SIZE);

    const isCurrentDiagonalCompleted = isLeftDiagonal 
      ? isDiagonalCompleted(tiles, LEFT_DIAGONAL) 
      : isRightDiagonal 
        ? isDiagonalCompleted(tiles, RIGHT_DIAGONAL)
        : false;

    if (isCurrentDiagonalCompleted) {
      tempCompleted = [
        ...tempCompleted,
        ...(isLeftDiagonal ? LEFT_DIAGONAL : []),
        ...(isRightDiagonal ? RIGHT_DIAGONAL : []),
      ]
    }    

    if (isCurrentRowCompleted || isCurrentColumnCompleted || isCurrentDiagonalCompleted) {
      showWinningAnimation();
    }

    setCompleted(new Set(tempCompleted));
  };

  const toggle = (index) => {
    if (index === BINGO_INDEX) {
      return;
    }

    const tiles = [...selectedTiles];

    tiles[index] = !selectedTiles[index]; 

    setSelectedTiles([...tiles]);
    checkGame(tiles, index);
  };

  return (
    <Wrapper className="Bingo">
      {   
        bingoTiles.map((text, index) =>
          <BingoTile key={index} 
                    $selected={index === BINGO_INDEX ? true : selectedTiles[index]} 
                    $completed={completed.has(index)} 
                    $center={index === BINGO_INDEX}
                    onClick={() => toggle(index)}
          >{ text }</BingoTile>)
      }
    </Wrapper>
  );
}

export default Bingo;

function getCurrentRow(currentRowIndex) {
  return Array.from({length: BINGO_SIZE}, (_, i) => currentRowIndex * BINGO_SIZE + i);
}

function getCurrentColumn(currentColumnIndex) {
  return Array.from({length: BINGO_SIZE}, (_, i) => i * BINGO_SIZE + currentColumnIndex);
}

function getLeftDiagonal() {
  return Array.from({length: BINGO_SIZE}, (_, i) => i * BINGO_SIZE + i);
}

function getRightDiagonal() {
  return Array.from({length: BINGO_SIZE}, (_, i) =>  (i + 1) * BINGO_SIZE - i - 1);
}

function getCompleted(tiles) {
  let completed = [];

  for (let i = 0; i < BINGO_SIZE; i++) {
    const currentColumn = getCurrentColumn(i);
    const currentRow = getCurrentRow(i);

    const isCurrentRowCompleted = isRowCompleted(tiles, i);
    const isCurrentColumnCompleted = isColumnCompleted(tiles, i);

    completed = [
      ...completed,
      ...(isCurrentRowCompleted ? currentRow : []),
      ...(isCurrentColumnCompleted ? currentColumn : []),
    ]
  }

  completed = [
    ...completed,
    ...(isDiagonalCompleted(tiles, LEFT_DIAGONAL) ? LEFT_DIAGONAL : []),
    ...(isDiagonalCompleted(tiles, RIGHT_DIAGONAL) ? RIGHT_DIAGONAL : []),
  ];

  return new Set([...completed]);
}

function isDiagonalCompleted(tiles, diagonal) {
  return diagonal.map((i) => tiles[i]).every(isSelected => !!isSelected);
}

function isRowCompleted(tiles, index) {
  return tiles.slice(index * BINGO_SIZE, index * BINGO_SIZE + BINGO_SIZE).every(isSelected => !!isSelected);
}

function isColumnCompleted(tiles, index) {
  return tiles.filter((tile, i) => i % BINGO_SIZE === index).every(isSelected => !!isSelected);
}

function showWinningAnimation() {
  if (!window.JSConfetti) {
    return;
  }

  const jsConfetti = new window.JSConfetti();

    jsConfetti.addConfetti({
      emojis: ['✨'],
    });
}

function getBingoTiles(tiles, centerTile, centerTileIndex) {
  const tempTiles = shuffle(tiles);

  return [
    ...tempTiles.slice(0, centerTileIndex),
    centerTile,
    ...tempTiles.slice(centerTileIndex),
  ];
}
