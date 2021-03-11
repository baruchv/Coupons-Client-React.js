import {Component} from "react";
import './Footer.css';

export default class Footer extends Component{
    public render(){
        return(
            <div className="footer">
                <a id="contactLink" href="">Contact Us</a>
                <a id="ourTeamLink" href="">Our Team</a>
                <a id = "githubRepositoryLink" href="">Github Repository</a>
            </div>
        );
    }
}