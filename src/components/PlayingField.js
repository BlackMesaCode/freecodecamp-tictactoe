import React from "react";

export default class PlayingField extends React.Component {
    constructor(props) {
        super(props);
    }

    cellIsPartOfTheWinningTrio(row, col) {
        if (this.props.winningTrio) {
            for (let trio of this.props.winningTrio) {
                if (row === trio[0] && col === trio[1])
                    return true;
            }
        }
        return false;
    }

    render() {

        return (
            <div id="grid">
                {
                    this.props.placements.map((row, rowIndex) => 
                        <div className="row" key={rowIndex}>
                            {
                                row.map((col, colIndex) => 
                                    <div className=
                                        {`
                                            col ${this.cellIsPartOfTheWinningTrio(rowIndex, colIndex) ? "winner" : "" } 
                                            ${this.props.winner || this.props.tie ? "no-hover" : "hover" }
                                        `} 
                                        key={colIndex} onClick={this.props.move.bind(this, rowIndex, colIndex, false)}>
                                        {this.props.placements[rowIndex][colIndex]}
                                    </div>
                                )
                            }
                        </div>
                     )
                }
            </div>
        );
    }
}
