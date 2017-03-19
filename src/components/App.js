import React from "react";

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Tic Tac Toe</h1>
                {this.props.children}
                <p></p>
            </div>
        );
    }
}