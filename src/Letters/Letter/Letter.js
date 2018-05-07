import React, {
    Component
} from 'react';

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
        this.handleButtonPress = this.handleButtonPress.bind(this);
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

    voidResponse = () => {
        this.props.voidCallback();
    };



    handleButtonPress(event) {
        const keyName = event.detail.toLowerCase();
        if (letters.includes(keyName) && !this.state.correct) {
            this.setState({
                letterChosen: keyName,
                correct: this.state.letter === keyName ? true : false
            });
            // for some reason it is acting differently here than the keypress event
            let localCheck = this.state.letter === keyName ? true : false;
            if (localCheck) {
                this.updateParentRight();
            } else {
                this.updateParentWrong();
            }
        } else if (letters.includes(keyName) && this.state.correct) {
            // send void responseHeard
            this.voidResponse();
        }

    }

    handleKeyPress(event) {
        console.log('KEYPRESS ON SPACE WITH LETTER ' + this.state.letter);
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
        } else if (letters.includes(keyName) && this.state.correct) {
            // send void responseHeard
            this.voidResponse();
        }
    }

    componentDidMount() {
        if (this.state.active) {
            document.addEventListener('keypress', this.handleKeyPress);
            document.addEventListener('letterButtonPress', this.handleButtonPress);
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.handleKeyPress);
        document.removeEventListener('letterButtonPress', this.handleButtonPress);
    }

    render() {
        return (
            <span>
                <span className="Letter_holder">
                  <span
                    className="Letter"
                    id='Letters_Holders'
                    style={
                      this.state.correct || this.state.gaveUp
                        ? { visibility: 'visible' } : { visibility: 'hidden' }
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
