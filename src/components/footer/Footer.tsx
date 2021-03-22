import {Component} from "react";
import './Footer.css';

export default class Footer extends Component{
    public render(){
        return(
            <div className="footer">
                <a id="contactLink" href="/contact">Contact Us</a>
                <a id="ourTeamLink" href="/ourTeam">Our Team</a>
                <a id="githubRepositoryLink" href="https://github.com/baruchv">Github Repository</a>
            </div>
        );
    }
}