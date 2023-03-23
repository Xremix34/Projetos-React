import './Game.css'
import { useState, useRef } from 'react';
import clip1 from '../images/clip.png';

const Game = ({ verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score }) => {

  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLetter(letter);

    setLetter("");

    letterInputRef.current.focus();
  }

  return (
    <>
      <div className="game">
        <p className="points">
          <span>Pontuação: {score}</span>
        </p>
        <h1>Adivinhe a palavra:</h1>
        <h3 className="tip">
          Dica sobre a palavra: <span>{pickedCategory}</span>
        </h3>
        <p>Você ainda tem {guesses} tentativa(s).</p>
        <div className="wordConteiner">

          {letters.map((letter, i) => (
            guessedLetters.includes(letter) ? (
              <span key={i} className="letter">{letter}</span>

            ) : (
              <span key={i} className="blankSquare"></span>
            )
          ))}

        </div>
        <div className='letterConteiner'>
          <p>Tente adivinhar uma letra da palavra</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="letter"
              maxLength="1"
              required
              onChange={(e) => setLetter(e.target.value.toLowerCase())}
              value={letter}
              ref={letterInputRef}
              pattern="[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$"
              autoCorrect='none'
              autoCapitalize='none'
            />
            <button>Jogar!</button>
          </form>
        </div>
        <div className="wrongLettersConteiner">
          <h2>Letras Erradas:</h2>
          {wrongLetters.map((letter, i) => (
            <span key={i} className="letterError">{letter} </span>
          ))}
        </div>
        <div>
          <h2>Letras Acertadas:</h2>
          <span className="letterChecked">{guessedLetters} </span>
        </div>
      </div>
      <div>
        <img src={clip1} alt="clip1" width="100" height="100"></img>
      </div>
    </>
  );
}

export default Game;