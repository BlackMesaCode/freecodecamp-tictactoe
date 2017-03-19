import React from "react";

export default class PlayingField extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="grid">
                {
                    this.props.placements.map((row, rowIndex) => 
                        <div className="row" key={rowIndex}>
                            { 
                                row.map((col, colIndex) => 
                                    <div className="col" key={colIndex} onClick={this.props.move.bind(this, rowIndex, colIndex)}>
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
