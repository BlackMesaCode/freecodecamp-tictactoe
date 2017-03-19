import React from "react";
import {Link} from "react-router-dom";

export default class SelectMode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mark: "x"
        }
    }

    changeMark(event) {
        this.setState({
            mark: event.target.value
        });
    }

    render() {
        return (
            <div>
                <h3>Please select your mark:</h3>
                <div className="radio-buttons">
                    <label>
                        <input type="radio" name="mark" value="x" onChange={this.changeMark.bind(this)} checked={this.state.mark === "x"} />
                        <span>X</span>
                    </label>
                    <label>
                        <input type="radio" name="mark" value="o" onChange={this.changeMark.bind(this)} checked={this.state.mark === "o"} />
                        <span>O</span>
                    </label>
                </div>
                <Link to={`/Play/${this.props.match.params.mode}/${this.state.mark}`}>Start Game</Link>
            </div>
        );
    }
}