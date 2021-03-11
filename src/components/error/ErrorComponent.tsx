import { Component } from "react";
import "./ErrorComponent.css";


export default class ErrorComponents extends Component <{message: String}>{
    render() {
        return (
            <div className ="error">
                <h1>Opps - it looks like there is an Error</h1>
                <h2>{this.props.message}</h2>
            </div>
        )
    }
}