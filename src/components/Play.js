import React from "react";
import PlayingField from "./PlayingField";


export default class Play extends React.Component {
    constructor(props) {
        super(props);
        this.mode = this.props.match.params.mode,
        this.player1 = {
                displayName: "Player 1",
                mark: this.props.match.params.mark,
        },
        this.player2 = {
            displayName: this.props.match.params.mode === "1p" ? "Computer" : "Player 2",
            mark: this.props.match.params.mark === "x" ? "o" : "x"
        },
        this.state = {
            turn: this.getRandomPlayer(),
            placements: this.initPlacements(),
        }
    }

    initPlacements() {
        return [ [ "", "", ""], [ "", "", ""], [ "", "", ""] ];
    }

    getRandomPlayer() { return Math.floor(Math.random()) === 1 ? this.player1 : this.player2 }

    move(row, col) {
        console.log("row", row);
        console.log("col", col);
    }

    render() {
        return (
            <div>
                <PlayingField placements={this.state.placements} move={this.move.bind(this)} />
            </div>
        );
    }
}