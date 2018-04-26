import React, { Component } from 'react';
import Hangman from './Hangman/Hangman';
import { Button } from 'reactstrap';
// import $ from 'jquery';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameOn: true,
      letterChosen: '',
      style: { display: 'none' },
      keepTrying: true
    };
    this.startGame = this.startGame.bind(this);
    this.giveUp = this.giveUp.bind(this);
  }

  startGame() {
    this.setState(prevState => {
      return {
        gameOn: !prevState.gameOn,
        style:
          prevState.style.display === 'block'
            ? { display: 'none' }
            : { display: 'block' }
      };
    });
    console.log(this.state.style);
  }

  giveUp() {
    this.setState(prevState => {
      return {
        keepTrying: !prevState.keepTrying
      };
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <header className="header">
            <h1 className="App-title">Hangman</h1>
          </header>

          <Button color="danger" onClick={this.startGame}>
            Start Game
          </Button>
          <div style={this.state.style}>
            <Hangman active={!this.state.gameOn} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
