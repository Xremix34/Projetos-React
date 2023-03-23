// CSS
import './App.css';

// React
import { useCallback, useEffect, useState } from 'react';

//Data
import { wordsList } from './data/words';
import { consequences } from './data/consequences';

// Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 5;

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [conseqList] = useState(consequences);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessLetters] = useState("");
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);
  const [usedWords, setUsedWords] = useState([]);

  //Show the random consequences
  const conseq = conseqList[Math.floor(Math.random() * conseqList.length)];
  console.log(conseq);

  const pickWordAndCategory = useCallback(() => {
    // pick a random category
    const categories = Object.keys(words);

    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    console.log(word);

    return { category, word };
  }, [words]);


  const startGame = useCallback(() => {
    //clear all letters
    clearLettersStates();

    //pick word and 
    const { category, word } = pickWordAndCategory();

    //verify if word is repeated
    if (usedWords.includes(word)) {
      startGame();
      return;
    }
    usedWords.push(word);

    // Create an array of letters
    let wordLetters = word.split('');

    //console.log(category, word);
    wordLetters = wordLetters.map((l) => l.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""));

    console.log("test WordsLetters: ", wordLetters);

    //Fill States
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory, usedWords]);

  // process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    //check if letter has already been utilized
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }

    //push guessed letter or remove a guess
    console.log("ver", letters)
    if (letters.includes(normalizedLetter)) {
      setGuessLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  //restarts the game
  const retry = () => {
    setUsedWords([]);
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
  };

  const clearLettersStates = () => {
    setGuessLetters([]);
    setWrongLetters([]);
  };

  //check if guesses ended
  useEffect(() => {
    if (guesses === 0) {
      //gameOver and reset all states
      clearLettersStates();
      setGameStage(stages[2].name);
    }
  }, [guesses])

  //check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    //win condition
    if (guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
      // add score
      setScore((actualScore) => (actualScore += 100));

      //restart game with new word
      setTimeout(() => {
        startGame();
      }, 1000);
    }

  }, [guessedLetters, letters, startGame, gameStage])


  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} conseq={conseq} />}
    </div>
  );
};

export default App;
