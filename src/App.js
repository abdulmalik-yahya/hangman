import './App.css';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';
import { useEffect, useState } from 'react';
import { notificationPopup } from './components/Helpers';

// you can use any words you want 
const words = ['application', 'programming', 'interface', 'wizard', 'javascript', 'design'];
let selectedWord = words[Math.floor(Math.random() * words.length)]

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]); // should be an array
  const [wrongLetters, setWrongtLetters] = useState([]); 
  const [showNotification, setShowNotification] = useState(false)
  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(curr=> [...curr, letter])
          }
          else {
            // todo, show notification for dupliacate key press
            notificationPopup(setShowNotification)
          }
        }
        else {
          if (!wrongLetters.includes(letter)) {
            setWrongtLetters(curr => [...curr, letter])
          }
          else {
            // todo, show notification for dupliacate key press
            notificationPopup(setShowNotification)
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable])
  
  function playAgain() {
    setPlayable(true);
    setCorrectLetters([]);
    setWrongtLetters([]);
    selectedWord = words[Math.floor(Math.random() * words.length)]
  }
  return (
    <>
      <Header />
      <div className='game-container'>
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={ correctLetters} />
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={ setPlayable} playAgain={playAgain} />
      <Notification showNotification={ showNotification} />
    </>
  );
}

export default App;
