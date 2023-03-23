import './GameOver.css';
import gym from '../images/gym.png';
import card from '../images/card.png';

const GameOver = ({ retry, score, conseq }) => {
  return (
    <div className="gameOver-container">
      <h1>Fim do Jogo!</h1>
      <h2>A sua pontuação foi: <span>{score}</span></h2>
      <h2>Consequência:</h2>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={card} alt="card" width="100%" height="100%"></img>
          </div>
          <div className="flip-card-back">
            <img src={gym} alt="gym" width="100%" height="70%"></img>
            <h3>{conseq}</h3>
          </div>

        </div>
      </div>
      <button onClick={retry}>Resetar Jogo</button>
    </div>
  );
}

export default GameOver;