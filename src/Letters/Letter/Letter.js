import React, { Component } from 'react';

const letters = 'abcdefghijklmnopqrstuvwxyz';

class Letter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letter: props.letter,
      letterChosen: '',
      active: props.active,
      correct: false,
      gaveUp: false
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  // componentWillReceiveProps(props) {
  //   console.log(props);
  //   this.setState({
  //     gaveUp: props.giveUp
  //   });
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('IN LETTERS');
    console.log(nextProps);
    return {
      gaveUp: nextProps.giveUp
    };
  }

  updateParentRight = () => {
    this.props.callbackFromLetters();
  };

  updateParentWrong = () => {
    this.props.wrongCallbackFromLetters();
  };

  handleKeyPress(event) {
    const keyName = event.key;
    if (letters.includes(keyName) && !this.state.correct) {
      this.setState({
        letterChosen: keyName,
        correct: this.state.letter === keyName ? true : false
      });
      if (this.state.correct) {
        this.updateParentRight();
      } else {
        this.updateParentWrong();
      }
    }
  }

  componentDidMount() {
    if (this.state.active) {
      document.addEventListener('keypress', this.handleKeyPress);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyPress);
  }

  render() {
    return (
      <span>
        <span className="Letter_holder">
          <span
            className="Letter"
            style={
              this.state.correct || this.state.gaveUp
                ? { visibility: 'visible' }
                : { visibility: 'hidden' }
            }
          >
            {this.state.letter}
          </span>
        </span>
        <span className="separator" />
      </span>
    );
  }
}

export default Letter;
