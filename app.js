let boxStates = [null, null, null, null, null, null, null, null, null];

class Box extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boxContent: null
        };
        this.play = this.play.bind(this);
        this.emptyBox = this.emptyBox.bind(this);
    }

    play(e) {
        if (this.props.victory) {
            e.stopPropagation();
        }
        else {
            const content = this.props.curPlayer;
            if (this.state.boxContent) {
            e.stopPropagation();
            } else {
            this.setState({boxContent: content});
            boxStates[this.props.id - 1] = content;
            this.props.onPlayerMove(boxStates[this.props.id - 1]);
            }
        }
    }

    emptyBox() {
        if (this.props.start && this.state.boxContent !== null) {
            this.setState({boxContent: null});
        }
    }

    render() {
        this.emptyBox();
            return (
            <div className="ttt-box" id={this.props.id} onClick={this.play}>
                    {this.state.boxContent}
                </div>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: true,
            currentPlayer: 'X',
            winner: null,
            victory: false,
            draw: false,
        };
        this.changePlayer = this.changePlayer.bind(this);
        this.reset = this.reset.bind(this);
        this.handlePlayerMove = this.handlePlayerMove.bind(this);
    }

    changePlayer(e) {
        if (this.state.start === true) {
            this.setState({start: false});
        }
        if (e.target === document.querySelector('#tictactoe')) {
            return;
        } else {
            const currPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
            this.setState({currentPlayer: currPlayer}); 
        }
    }

    reset() {
        this.setState({
            start: true,
            currentPlayer: 'X',
            winner: null,
            victory:false, 
            draw:false
        });
        boxStates = [null, null, null, null, null, null, null, null, null];
    }

    handlePlayerMove(player) {
        // player should === 'X' || 'O'
        const case1 = boxStates[0] === player && boxStates[1] === player && boxStates[2] === player; // boxes 1, 2, 3
        const case2 = boxStates[3] === player && boxStates[4] === player && boxStates[5] === player; // boxes 4, 5, 6
        const case3 = boxStates[6] === player && boxStates[7] === player && boxStates[8] === player; // boxes 7, 8, 9
        const case4 = boxStates[0] === player && boxStates[3] === player && boxStates[6] === player; // boxes 1, 4, 7
        const case5 = boxStates[1] === player && boxStates[4] === player && boxStates[7] === player; // boxes 2, 5, 8
        const case6 = boxStates[2] === player && boxStates[5] === player && boxStates[8] === player; // boxes 3, 6, 9
        const case7 = boxStates[0] === player && boxStates[4] === player && boxStates[8] === player; // boxes 1, 5, 9
        const case8 = boxStates[2] === player && boxStates[4] === player && boxStates[6] === player; // boxes 3, 5, 7

        if (case1 || case2 || case3 || case4 || case5 || case6 || case7 || case8) {
            this.setState({victory: true, winner: player});
        }
        else if (!boxStates.includes(null)) {
            this.setState({draw: true});
        }
    }

    render() {
        const victoryMsg = "Player " + this.state.winner + " won!";
        const draw = "It's a draw.";
        const msg = this.state.victory ? victoryMsg : (this.state.draw ? draw : null);
        return (
        <React.Fragment>
            <div id='tictactoe' onClick={this.changePlayer}>
                <Box start={this.state.start} curPlayer={this.state.currentPlayer} onPlayerMove={this.handlePlayerMove} victory={this.state.victory} id='1' />
                <Box start={this.state.start} curPlayer={this.state.currentPlayer} onPlayerMove={this.handlePlayerMove} victory={this.state.victory} id='2' />
                <Box start={this.state.start} curPlayer={this.state.currentPlayer} onPlayerMove={this.handlePlayerMove} victory={this.state.victory} id='3' />
                <Box start={this.state.start} curPlayer={this.state.currentPlayer} onPlayerMove={this.handlePlayerMove} victory={this.state.victory} id='4' />
                <Box start={this.state.start} curPlayer={this.state.currentPlayer} onPlayerMove={this.handlePlayerMove} victory={this.state.victory} id='5' />
                <Box start={this.state.start} curPlayer={this.state.currentPlayer} onPlayerMove={this.handlePlayerMove} victory={this.state.victory} id='6' />
                <Box start={this.state.start} curPlayer={this.state.currentPlayer} onPlayerMove={this.handlePlayerMove} victory={this.state.victory} id='7' />
                <Box start={this.state.start} curPlayer={this.state.currentPlayer} onPlayerMove={this.handlePlayerMove} victory={this.state.victory} id='8' />
                <Box start={this.state.start} curPlayer={this.state.currentPlayer} onPlayerMove={this.handlePlayerMove} victory={this.state.victory} id='9' />
            </div>
            <button onClick={this.reset}>Reset</button>
            <div className={msg ? 'endgame' : null}>
                {msg ? msg : ''}
            </div>
        </React.Fragment>
        );
    }
}

ReactDOM.render(<Board />, document.querySelector('#container'));