import React, {
    Component
} from 'react';
import Letter from './Letter/Letter';
import '../App.css';
import $ from 'jquery';
import {
    Button
} from 'reactstrap';

const letters = 'abcdefghijklmnopqrstuvwxyz';
const top_row = 'qwertyuiop';
const middle_row = 'asdfghjkl';
const bottom_row = 'zxcvbnm';
const top_letters_array = top_row.split('');
const middle_letters_array = middle_row.split('');
const bottom_letters_array = bottom_row.split('');

const attempsStyle = {
    color: 'black'
}

class AttempsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attempts: this.props.attempts
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return ({
            attempts: nextProps.attempts
        })
    }

    render() {
        return (
            <span><span id='attemptsHolder'></span></span>
        )
    }
}


class LetterButton extends Component {
    constructor(props) {
        super(props);
        this.letter = this.props.letter;
        this.buttonPressed = this.buttonPressed.bind(this);
        this.state = {
            disabled: this.props.disabled
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.disabled !== prevState.disabled) {
            return ({
                disabled: nextProps.disabled
            })
        }
    }

    buttonPressed() {
        var event = new CustomEvent('letterButtonPress', {
            detail: this.letter
        });
        document.dispatchEvent(event);
    }

    render() {
        return (
            <span className="ButtonHolder">
                <Button disabled={this.state.disabled} color="info" onClick={this.buttonPressed}>{this.letter}</Button>
            </span>
        )
    }

}

class Letters extends Component {

    static SlettersGuessedWrong = function() {
        return this.lettersGuessedWrong;
    }
    constructor(props) {
        super(props);
        this.i = 0; // for keys
        this.j = 0; // also for keys
        this.state = {
            letters: this.props.letters,
            active: this.props.active,
            gaveUp: this.props.giveUp,
            length: this.props.letters.length,
            attempts: this.props.attempts,
            state_lettersGuessedWrong: 0
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
            $('#attemptsHolder').html(this.state.attempts - this.lettersGuessedWrong);
            this.drawStick(this.state.attempts - this.lettersGuessedWrong);

            if (this.lettersGuessedWrong === this.state.attempts) {
                this.lettersGuessedRight = 0;
                this.lettersGuessedWrong = 0;
                $('#attemptsHolder').html(this.state.attempts - this.lettersGuessedWrong);
                this.drawStick(this.state.attempts - this.lettersGuessedWrong);
                this.responsesHeard = 0;
                this.props.callBackWhenFail();

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
            $('#attemptsHolder').html(this.state.attempts - this.lettersGuessedWrong);
            this.drawStick(this.state.attempts - this.lettersGuessedWrong);
            this.responsesHeard = 0;
            $('#Letters_Holders').css('color', 'green');
            alert('FIN');
            this.props.callBackWhenSuccess();
        }
        if (this.responsesHeard === this.state.length) {
            console.log('(RIGHT) RESPONSES BACK DOWN TO ZERO ');
            this.numberLettersWrong = 0;
            this.responsesHeard = 0;
        }
    };

    drawStick(attemptsLeft) {
        let canvas = document.getElementById("stickCanvas");
        let ctx = canvas.getContext('2d');
        let commandObject = {
            0: () => {
                ctx.moveTo(150, 90);
                ctx.lineTo(160, 105);
            },
            1: () => {
                ctx.moveTo(150, 90);
                ctx.lineTo(140, 105);
            },
            2: () => {
                ctx.moveTo(150, 60);
                ctx.lineTo(150, 90);
            },
            3: () => {
                ctx.moveTo(150, 60);
                ctx.lineTo(160, 75);
            },
            4: () => {
                ctx.moveTo(150, 60);
                ctx.lineTo(140, 75);
            },
            5: () => {
                ctx.moveTo(150, 50);
                ctx.lineTo(150, 60);
            },
            6: () => {
                ctx.moveTo(150, 50);
                ctx.beginPath();
                ctx.arc(150, 30, 20, 0, 2 * Math.PI);

            },
            7: () => {
                ctx.moveTo(150, 0);
                ctx.lineTo(150, 10);
            },
            8: () => {
                ctx.moveTo(100, 0);
                ctx.lineTo(150, 0);
            },
            9: () => {
                ctx.moveTo(100, 150);
                ctx.lineTo(100, 0);
            },
            10: () => {
                ctx.moveTo(0, 150);
                ctx.lineTo(150, 150);
            },
            11: () => {
                // ctx.clearRect(0, 0, canvas.width, canvas.height);
                // canvas.width = canvas.width;
            }
        };
        commandObject[attemptsLeft]();
        ctx.stroke();
    }


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
            $('#attemptsHolder').html(this.state.attempts - this.lettersGuessedWrong);
            this.drawStick(this.state.attempts - this.lettersGuessedWrong);
            if (this.lettersGuessedWrong === this.state.attempts) {
                this.lettersGuessedRight = 0;
                this.lettersGuessedWrong = 0;
                $('#attemptsHolder').html(this.state.attempts - this.lettersGuessedWrong);
                this.drawStick(this.state.attempts - this.lettersGuessedWrong);
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
        $('#attemptsHolder').html(this.state.attempts - this.lettersGuessedWrong);
        this.drawStick(this.state.attempts - this.lettersGuessedWrong);
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
            <div>
<canvas id="stickCanvas">Browser does not support this game</canvas>
            {/*<span style={attempsStyle}><AttempsComponent attempts={this.state.attempts -  this.lettersGuessedWrong} /></span>*/}

            <div className="wordHolder">
                {this.state.letters.map(char => {
                  return (
                    <Letter
                      key={'Letter'+(this.i++).toString()}
                      letter={char}
                      active={this.state.active}
                      giveUp={this.state.gaveUp}
                      callbackFromLetters={this.updateGuessedLetters}
                      wrongCallbackFromLetters={this.updateWrongGuessedLetters}
                      voidCallback={this.voidCallback}
                    />
                  );
                })}
                <div className="keyboardHolder">
                {
                    top_letters_array.map(char => {
                        return (

                <LetterButton key={'LetterHolder'+(this.j++)} disabled={this.state.gaveUp} letter={char}></LetterButton>
                        )
                    })
                }
            </div>
<div className="keyboardHolder">
                {
                    middle_letters_array.map(char => {
                        return (

                <LetterButton key={'LetterHolder'+(this.j++)} disabled={this.state.gaveUp} letter={char}></LetterButton>
                        )
                    })
                }
            </div>
<div className="keyboardHolder">
                {
                    bottom_letters_array.map(char => {
                        return (

                <LetterButton key={'LetterHolder'+(this.j++)} disabled={this.state.gaveUp} letter={char}></LetterButton>
                        )
                    })
                }
            </div>
            </div>
        </div>
        );
    }
}

export default Letters;
