import "./StartScreen.css";
import clip from "../images/clip.png";

const StartScreen = ({ startGame }) => {
  return (
    <div className="start">
      <div className="title-container">
        <span className="first-title">Secret</span><br />
        <span className="second-title">W
          <img src={clip} alt="clip" width="100" height="100"></img>
          <span className="letter-word">R</span>D
        </span>

      </div>
      <p>Clique no botão abaixo para começar a jogar</p>
      <button onClick={startGame}>Começar o Jogo</button>
    </div >
  );
}

export default StartScreen;