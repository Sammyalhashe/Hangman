import React, {
    Component
} from 'react';
import {
    Button
} from 'reactstrap';
import Letters from '../Letters/Letters';

const letters = 'abcdefghijklmnopqrstuvwxyz';



class Hangman extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: '',
            definition: '',
            wordType: '',
            letters: [],
            active: props.active,
            keepTrying: true
        };
        this.showWordDisabled = false;
        // this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.giveUp = this.giveUp.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('HANGMAN recieved props');
        return {
            active: nextProps.active
        };
    }

    // componentDidMount = () => {
    //   fetch(
    //     'http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
    //   )
    //     .then(result => {
    //       return result.json();
    //     })
    //       let lowercase_letters = data[0].word
    //         .split('')
    //         .map(word => word.toLowerCase());
    //       this.setState({
    //         word: data[0].word,
    //         letters: lowercase_letters
    //       });
    //     });
    // };

    // updateWord = () => {
    //   this.showWordDisabled = false;
    //   fetch(
    //     'http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
    //   )
    //     .then(result => {
    //       return result.json();
    //     })
    //     .then(data => {
    //       console.log(data[0].word);
    //       let lowercase_letters = data[0].word
    //         .split('')
    //         .map(word => word.toLowerCase());
    //       this.setState({
    //         word: data[0].word,
    //         letters: lowercase_letters,
    //         keepTrying: true
    //       });
    //     });
    // };

    componentDidMount = () => {
        fetch(
                'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
            )
            .then(result => {
                return result.json();
            })
            .then(data => {
                this.processRetrievedValue(data.word);
            });
    };

    updateWord = () => {
        this.showWordDisabled = false;
        fetch(
                'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
            )
            .then(result => {
                return result.json();
            })
            .then(data => {
                console.log(data.word);
                this.processRetrievedValue(data.word);
            });
    };

    processRetrievedValue = word => {
        let lowercase_letters = word.split('').map(word => word.toLowerCase());
        lowercase_letters.forEach(char => {
            if (!letters.includes(char)) {
                // alert(char);
                this.updateWord();
                return;
            }
        });

        console.log(word);

        fetch(
                `http://api.wordnik.com:80/v4/words.json/reverseDictionary?query=${word}&minCorpusCount=5&maxCorpusCount=-1&minLength=1&maxLength=-1&includeTags=false&skip=0&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`
            )
            .then(result => result.json())
            .then(data => {
                console.log(data);
                try {
                    this.setState({
                        word: word,
                        definition: data.results[0].text,
                        wordType: data.results[0].partOfSpeech,
                        letters: lowercase_letters,
                        keepTrying: true
                    });
                } catch (error) {
                    console.log(error);
                    this.updateWord();
                }
            });
        // this.setState({
        //   word: word,
        //   letters: lowercase_letters,
        //   keepTrying: true
        // });
        let canvas = document.getElementById("stickCanvas");
        canvas.width = canvas.width;
    };

    giveUp() {
        this.showWordDisabled = true;
        this.setState(prevState => {
            return {
                keepTrying: !prevState.keepTrying
            };
        });
    }

    callBackWhenSuccess = () => {
        this.giveUp(); // I call give up here because it resets the state, re-renders this component, and thus uses the new 'showWordDisabled' var for the disabled attribute for the 'Show Word' Button
        // this.updateWord();
    };

    callBackWhenFail = () => {
        alert('YOU HAVE FAILED');
        this.giveUp();
    };

    render() {
        return (
            <div className="Hangman">
        <br />
        <br />
                <br />
        <form>
          <Letters
            letters={this.state.letters}
            active={this.state.active}
            giveUp={!this.state.keepTrying}
            attempts={11}
            callBackWhenSuccess={this.callBackWhenSuccess}
            callBackWhenFail={this.callBackWhenFail}
          />
        </form>
        <Button
          disabled={this.showWordDisabled}
          onClick={this.giveUp}
          color="primary"
        >
          Show Word
        </Button>
        <Button color="success" onClick={this.updateWord}>
          Next Word
        </Button>
        <br />
        <br />
        <div className="definition">
          <h1>{this.state.definition}</h1> <br />
          <h2>{this.state.wordType}</h2>
        </div>
      </div>
        );
    }
}

export default Hangman;
