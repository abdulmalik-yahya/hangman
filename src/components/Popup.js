import React, { useEffect } from 'react'
import { checkWin } from './Helpers';

const Popup = ({ correctLetters, wrongLetters, selectedWord, setPlayable, playAgain}) => {
    let finalMsg = '';
    let finalMsgRevealWord = '';
    let playable = true;
    if (checkWin(correctLetters, wrongLetters, selectedWord) === 'win') {
        finalMsg = "Congratulations! You Won!";
        playable = false;

    }
    else if (checkWin(correctLetters, wrongLetters, selectedWord) === 'lose') {
        finalMsg = "Unfortunately! You lost!";
        finalMsgRevealWord = `...the word was ${selectedWord} `
        playable = false;
    }

    useEffect(() => setPlayable(playable));
  return (
      <div className='popup-container' style={finalMsg !== '' ? {display: 'flex'} : {} }>
          <div className='popup'>
              <h2>{ finalMsg}</h2>
              <h3>{ finalMsgRevealWord}</h3>
              <button onClick={playAgain}>Play Again</button>
        
          </div>
      </div>
  )
}

export default Popup