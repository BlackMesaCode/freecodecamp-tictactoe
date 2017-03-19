import React from "react";
import {Link} from "react-router-dom";

export default class SelectMode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "1p"
        }
    }

    changeMode(event) {
        this.setState({
            mode: event.target.value
        });
    }

    render() {
        return (
            <div>
                <h3>Please select a game mode:</h3>
                <div className="radio-buttons">
                    <label>
                        <input type="radio" name="mode" value="1p" onChange={this.changeMode.bind(this)} checked={this.state.mode === "1p"} />
                        <span>1 Player</span>
                    </label>
                    <label>
                        <input type="radio" name="mode" value="2p" onChange={this.changeMode.bind(this)} checked={this.state.mode === "2p"} />
                        <span>2 Players</span>
                    </label>
                </div>
                <div className="navigation-buttons">
                    <span></span>
                    <Link to={`/SelectMark/${this.state.mode}`}><i className="fa fa-arrow-right"></i></Link>
                </div>
            </div>
        );
    }
}