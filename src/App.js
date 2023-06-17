import Bingo from './Bingo/Bingo';

// xbox conference...
const BINGO_TEXTS = [
  'Unexpected sequel', 
  'Gamepass announcement', 
  'Kameo Remake', 
  'Phil Spencer with a gaming T-Shirt', 
  'New game by Ninja Theory', 
  'New Game by Software', 
  'Halo Infinite Gameplay', 
  'Conker Remake', 
  'Fable 4 announcement', 
  'Something for Minecraft', 
  'Next Gen tease', 
  'CRINGE', 
  'XBOX CONFERENCE',
  'WORLD REVEAL', 
  'Battletoads gameplay', 
  'Banjo Kazzooie remake', 
  'Technical issues', 
  'Ryse 2 announcemet', 
  'Car on stage for Forza 8', 
  'Big ID@Xbox montage', 
  'New studios aquired', 
  'Perfect Dark sequel', 
  'Cyberpunk 2077 release date', 
  'Gears 5 release date',
  'New controller',
];

function App() {
  return (
    <Bingo texts={BINGO_TEXTS}></Bingo>
  );
}

export default App;
