import React from "react";
import PlayingField from "./PlayingField";
import Computations from "./Computations";

export default class Play extends React.Component {
    constructor(props) {
        super(props);
        this.mode = this.props.match.params.mode;
        this.player1 = {
                displayName: this.props.match.params.mode === "1p" ? "Player" : "Player 1",
                mark: this.props.match.params.mark,
        };
        this.player2 = {
            displayName: this.props.match.params.mode === "1p" ? "Computer" : "Player 2",
            mark: this.props.match.params.mark === "x" ? "o" : "x"
        };
        this.state = {
            currentPlayer: this.getRandomPlayer(),
            placements: this.initPlacements(),
        };
        this.computations = new Computations(this.player2.mark, this.state.placements);

    }

    componentDidMount() {


        // if we play vs the computer and the computer may start, we kick of the first move here
        if (this.mode === "1p" && this.state.currentPlayer === this.player2) {
            let placement = this.computations.getNextComputerPlacement();
            this.move(placement[0], placement[1], true);
        }
    }

    initPlacements() {
        return [ [ "", "", ""], [ "", "", ""], [ "", "", ""] ];
    }

    getRandomPlayer() { return Math.floor(Math.random()) === 1 ? this.player1 : this.player2 }


    move(row, col, isComputer) {

        // if field is already occupied, we ignore the move
        if (this.state.placements[row][col] !== "") return;

        // if game is finished we ignore the move
        if (this.state.winner || this.state.tie) return;

        // if we play vs the computer and its the computers turn, we ignore all player moves
        if (this.mode === "1p" && this.state.currentPlayer === this.player2 && !isComputer) return;

        // update the immutable placements array by cloning it
        let placementsCloned = this.state.placements.slice(0);
        placementsCloned[row][col] = this.state.currentPlayer.mark;

        // update placements for the computations
        this.computations.updatePlacements(placementsCloned); 

        // switch player in the next turn
        let nextPlayer = this.state.currentPlayer === this.player1 ? this.player2 : this.player1;

        // check if current move finished the game
        let hasWon = this.computations.hasWon(row, col, this.state.currentPlayer.mark);
        // console.log("hasWon?", hasWon);
        if (hasWon) {
            // console.log("winner of the game:", this.state.currentPlayer)
            // update state to show a winning message and deactivate playing field
            this.setState({ 
                winner: this.state.currentPlayer
            });
        }
        else {
            // check if no more placements left
            let allFieldAreOccupied = this.computations.allFieldAreOccupied()
            if (allFieldAreOccupied) {
                this.setState({
                    tie: true
                });
            }
        }

        // update state and trigger rerender
        this.setState({
            placements: placementsCloned,
            currentPlayer: nextPlayer,
        });
    }

    componentDidUpdate() {

        // auto trigger computers move after a short timespan
        if (this.mode === "1p" && this.state.currentPlayer === this.player2 && !this.state.winner && !this.state.tie) {
            setTimeout(function() {
                let placement = this.computations.getNextComputerPlacement();
                this.move(placement[0], placement[1], true);
            }.bind(this), 300)
        }

    }


    render() {
        return (
            <div>
                <p id="message-box">
                    {
                        this.state.winner ? (this.state.winner.displayName + " has won the game!") : 
                        this.state.tie ? "Tie" : this.state.currentPlayer.displayName + " - Its your turn!"
                    }
                </p>
                <PlayingField placements={this.state.placements} move={this.move.bind(this)} />
            </div>
        );
    }
}