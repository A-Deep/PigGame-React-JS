import React, { Component } from 'react';
import './App.css';
import PigGame from './resource/PigGame';
import {PigGameButton, PigGameDiceImg} from './resource/PigGame';
var images = require.context('./resource/images', true);

class App extends Component {
  NoResult = true;
  RoundScore = 0;
  state = {
    Scores : [0,0],
    TempRoundScore :[0,0],
    Player : 0,
    DiceDisplay : true,
    ImgUrl :"5"
  }

  startPoint = () => {
    this.NoResult = true;
    this.RoundScore = 0;
    //New game Code
    this.setState({
      Scores : [0,0],
      TempRoundScore :[0,0],
      Player : 0,
      DiceDisplay : false,
      ImgUrl :"5"
    })
  }

  randomValue = () =>{
    //To get rendom number from 1 to 6
    return Math.floor(Math.random() * 6) + 1; //Math.floor(Math.random() * (max - min + 1)) + min;
  }

  roleDice = () =>{
    // clculate the current score
    if(this.NoResult){
      let currentRoleValue = this.randomValue();
      if(currentRoleValue == 1){
        currentRoleValue = 0;
        this.RoundScore = 0;
        this.setState({
          TempRoundScore :[0,0],
          DiceDisplay : false,
          ImgUrl : 1
        })
        this.hold();
      }else {
          this.RoundScore = this.RoundScore + currentRoleValue;
          this.setState({
            DiceDisplay : true,
            ImgUrl : currentRoleValue
          })
          this.state.Player == 0 ?
          this.setState({
            TempRoundScore :[this.RoundScore,0]
          }):
          this.setState({
            TempRoundScore :[0,this.RoundScore]
          })
      }
  }


  }

  hold = () =>{
    // to change the player

  if(this.NoResult){
    let ScoreCal = 0;
    if(this.state.Player == 0){
      ScoreCal =this.state.Scores[this.state.Player] + this.RoundScore;
      this.RoundScore = 0;
      this.setState({
      Scores : [ScoreCal,this.state.Scores[1]],
      DiceDisplay : false
    })
  }else{
    ScoreCal =this.state.Scores[this.state.Player] + this.RoundScore;
    this.RoundScore = 0;
    this.setState({
      Scores : [this.state.Scores[0],ScoreCal],
      DiceDisplay : false
    })
  }
  ScoreCal >= 25 ? this.NoResult = false : this.activePlayer();
  }
  /*if((this.state.Scores[0] >= 25)|| (this.state.Scores[1] >= 25)){
      this.NoResult = false;
  }else{
     this.activePlayer()
  }*/


  }

  activePlayer = () => {
    //all activity for active player
    this.state.Player == 0? this.setState({Player:1}) : this.setState({Player:0});
    }


  render() {
      let img_src = images(`./dice_${this.state.ImgUrl}.png`);
      let ActiveClassDisplay1 = ["player-0-panel"];
      let ActiveClassDisplay2 = ["player-1-panel"];

      if(this.state.Player == 0){
          ActiveClassDisplay1.push('active');
          if(ActiveClassDisplay2.length >1){ActiveClassDisplay2.pop();}
        }

      if(this.state.Player == 1){
          ActiveClassDisplay2.push('active');
          if(ActiveClassDisplay1.length >1){ActiveClassDisplay1.pop();}
      }

      return (
          <div className="wrapper clearfix">
            <PigGameButton classValueButton="player-0-panel" classValueI="ion-ios-plus-outline" value="New Game" click={this.startPoint}/>
            <PigGame classValue={ActiveClassDisplay1.join(' ')} idName ="name-0" idScore = "score-0" idSum="current-0" name="Player 1" score={this.state.Scores[0]} currentScore={this.state.TempRoundScore[0]}/>
            <PigGame classValue={ActiveClassDisplay2.join(' ')} idName ="name-1" idScore = "score-1" idSum="current-1" name="Player 2" score={this.state.Scores[1]} currentScore={this.state.TempRoundScore[1]}/>
            <PigGameButton classValueButton="btn-roll" classValueI="ion-ios-loop" value="ROLL DICE" click={this.roleDice}/>
            <PigGameButton classValueButton="btn-hold" classValueI="ion-ios-download-outline" value="HOLD" click={this.hold}/>

            {
              this.state.DiceDisplay ? <PigGameDiceImg srcPath={img_src} />: null
            }

      </div>
    );
  }
}

export default App;
