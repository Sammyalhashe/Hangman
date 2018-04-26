import React, { Component } from 'react';
import Letter from './Letter/Letter';

class Letters extends Component {
  constructor(props) {
    super(props);
    this.i = 0; // for keys
    this.state = {
      letters: this.props.letters,
      active: this.props.active,
      gaveUp: this.props.giveUp,
      length: this.props.letters.length,
      attempts: this.props.attempts
    };
    this.lettersGuessedRight = 0;
    this.lettersGuessedWrong = 0;
    this.numberLettersWrong = 0;
    this.responsesHeard = 0;
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  voidCallback = () => {
    this.responsesHeard++;
    this.numberLettersWrong++;
    if (this.numberLettersWrong === this.state.length) {
      this.numberLettersWrong = 0;
      this.responsesHeard = 0;
      this.lettersGuessedWrong++;
      console.log('Letters guessed wrong ' + this.lettersGuessedWrong);

      if (this.lettersGuessedWrong === this.state.attempts) {
        alert('ATTEMPTS USED UP');
        this.lettersGuessedRight = 0;
        this.lettersGuessedWrong = 0;
        this.responsesHeard = 0;
      }
    }
    if (this.responsesHeard === this.state.length) {
      console.log('(VOID) RESPONSES BACK DOWN TO ZERO ');
      this.numberLettersWrong = 0;
      this.responsesHeard = 0;
    }
  };

  updateGuessedLetters = () => {
    this.lettersGuessedRight++;
    this.responsesHeard++;
    console.log('Responses heard ' + this.responsesHeard);
    if (this.lettersGuessedRight === this.state.length) {
      this.lettersGuessedRight = 0;
      this.lettersGuessedWrong = 0;
      this.responsesHeard = 0;
      alert('FIN');
      this.props.callBackWhenSuccess();
    }
    if (this.responsesHeard === this.state.length) {
      console.log('(RIGHT) RESPONSES BACK DOWN TO ZERO ');
      this.numberLettersWrong = 0;
      this.responsesHeard = 0;
    }
  };

  updateWrongGuessedLetters = () => {
    this.numberLettersWrong++;
    this.responsesHeard++;
    console.log('Responses heard ' + this.responsesHeard);
    console.log('Number of places its wrong ' + this.numberLettersWrong);
    if (this.numberLettersWrong === this.state.length) {
      this.numberLettersWrong = 0;
      this.responsesHeard = 0;
      this.lettersGuessedWrong++;
      console.log('Letters guessed wrong ' + this.lettersGuessedWrong);

      if (this.lettersGuessedWrong === this.state.attempts) {
        this.lettersGuessedRight = 0;
        this.lettersGuessedWrong = 0;
        this.responsesHeard = 0;
        this.props.callBackWhenFail();
      }
    }
    if (this.responsesHeard === this.state.length) {
      console.log('(Wrong) RESPONSES BACK DOWN TO ZERO ');
      this.numberLettersWrong = 0;
      this.responsesHeard = 0;
    }
  };

  refreshGuesses = () => {
    this.lettersGuessedRight = 0;
    this.lettersGuessedWrong = 0;
    this.responsesHeard = 0;
  };

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log('componentWillMount-Letters');
  //   console.log(nextProps);
  //   if (nextProps.giveUp === false) {
  //     refresh();
  //     return {
  //       letters: nextProps.letters,
  //       active: nextProps.active,
  //       gaveUp: nextProps.giveUp,
  //       length: nextProps.letters.length
  //     };
  //   } else {
  //     return {
  //       letters: nextProps.letters,
  //       active: nextProps.active,
  //       gaveUp: nextProps.giveUp,
  //       length: nextProps.letters.length
  //     };
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillMount-Letters');
    console.log(nextProps);
    if (nextProps.giveUp === false) {
      this.refreshGuesses();
      this.setState({
        letters: nextProps.letters,
        active: nextProps.active,
        gaveUp: nextProps.giveUp,
        length: nextProps.letters.length
      });
    } else {
      this.setState({
        letters: nextProps.letters,
        active: nextProps.active,
        gaveUp: nextProps.giveUp,
        length: nextProps.letters.length
      });
    }
  }

  render() {
    return (
      <div className="wordHolder">
        {this.state.letters.map(char => {
          return (
            <Letter
              key={(this.i++).toString()}
              letter={char}
              active={this.state.active}
              giveUp={this.state.gaveUp}
              callbackFromLetters={this.updateGuessedLetters}
              wrongCallbackFromLetters={this.updateWrongGuessedLetters}
              voidCallback={this.voidCallback}
            />
          );
        })}
      </div>
    );
  }
}

export default Letters;
