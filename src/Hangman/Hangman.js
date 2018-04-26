import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Letters from '../Letters/Letters';

class Hangman extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      letters: [],
      active: props.active,
      keepTrying: true
    };
    // this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.giveUp = this.giveUp.bind(this);
  }

  // componentWillReceiveProps(props) {
  //   console.log('HANGMAN recieved props');
  //   this.setState({
  //     active: props.active
  //   });
  //   console.log(this.state.active);
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('HANGMAN recieved props');
    return {
      active: nextProps.active
    };
  }

  componentDidMount = () => {
    fetch(
      'http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
    )
      .then(result => {
        return result.json();
      })
      .then(data => {
        let lowercase_letters = data[0].word
          .split('')
          .map(word => word.toLowerCase());
        this.setState({
          word: data[0].word,
          letters: lowercase_letters
        });
      });
  };

  updateWord = () => {
    fetch(
      'http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
    )
      .then(result => {
        return result.json();
      })
      .then(data => {
        console.log(data[0].word);
        let lowercase_letters = data[0].word
          .split('')
          .map(word => word.toLowerCase());
        this.setState({
          word: data[0].word,
          letters: lowercase_letters,
          keepTrying: true
        });
      });
  };

  giveUp() {
    this.setState(prevState => {
      return {
        keepTrying: !prevState.keepTrying
      };
    });
  }

  render() {
    return (
      <div className="Hangman">
        <br />
        <br />
        <br />
        <br />
        <br />
        <form>
          <Letters
            letters={this.state.letters}
            active={this.state.active}
            giveUp={!this.state.keepTrying}
            attempts={7}
          />
        </form>
        <Button onClick={this.giveUp} color="primary">
          Show Word
        </Button>
        <Button color="success" onClick={this.updateWord}>
          Next Word
        </Button>
      </div>
    );
  }
}

export default Hangman;
