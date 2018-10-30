import React from 'react';
import './PigGame.css'

const PigGame = (props) =>{
  return (
    <div>
        <div className={props.classValue}>
            <div className="player-name" id={props.idName}>{props.name}</div>
            <div className="player-score" id={props.idScore}>{props.score}</div>
            <div className="player-current-box">
                <div className="player-current-label">Current</div>
                <div className="player-current-score" id={props.idSum}>{props.currentScore}</div>
            </div>
        </div>
    </div>
  )
};

const PigGameButton = (props) =>{
  return (
    <button className={props.classValueButton} onClick={props.click}><i className={props.classValueI}>{props.value}</i></button>
  )
};

const PigGameDiceImg = (props) =>{
  return (
    <img src={props.srcPath} alt="Dice" id="dice" className="dice" />
  )
};

export default PigGame;
export {PigGameButton, PigGameDiceImg};
