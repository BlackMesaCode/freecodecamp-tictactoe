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

    initPlacements() {
        return [ [ "", "", ""], [ "", "", ""], [ "", "", ""] ];
    }

    getRandomPlayer() { return Math.floor(Math.random()) === 1 ? this.player1 : this.player2 }

    move(row, col) {

        // field is already occupied
        if (this.state.placements[row][col] !== "") return;

        let placementsCloned = this.state.placements.slice(0);
        placementsCloned[row][col] = this.state.currentPlayer.mark;

        this.computations.updatePlacements(placementsCloned); // update placements for the computations
        let nextPlayer = this.state.currentPlayer === this.player1 ? this.player2 : this.player1;

        // console.log(this.computations.getFirstDuo(this.state.currentPlayer.mark))

        console.log(this.computations.isTrio([[0,0], [0,1], [0,2]]));

        this.setState({
            placements: placementsCloned,
            currentPlayer: nextPlayer
        });

        // if (this.mode === "1p") {
        //     this.computations.getNextComputerPlacement(this.state.placements);
        // }
        
        
    }


    render() {
        return (
            <div>
                <p id="message-box">{this.state.currentPlayer.displayName} - Its your turn!</p>
                <PlayingField placements={this.state.placements} move={this.move.bind(this)} />
            </div>
        );
    }
}