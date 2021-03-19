import {Component} from "react";
import "./OurTeam";

export default class OurTeam extends Component{
    render(){
        return(
            <div className="ourTeam">
                <h2>Our Team</h2>
                <section className="picture">
                    <img src="./picture.png" alt="Founder's picture" />
                    <small>Baruch Varticovschi</small>
                </section>
                <section>
                    <h3>Founder and CEO - Baruch Varticovschi</h3>
                    <p>
                        Baruch is a 26 years old fullstack developer.
                        Last year, Baruch desided to establish this astonishing website. 
                    </p>
                    <h4>Main Skills:</h4>
                    <ul>
                        <li>
                            <h5>Programin Languages:</h5>
                            <ol>
                                <li>Java - SpringBoot, SpringData, JDBC, JPA </li>
                                <li>Pyhton - Pandas, Matplotlib</li>
                                <li>JavaScript - React.JS</li>
                            </ol>
                        </li>
                        <li>
                            <h5>Tools and Technoligies:</h5>
                            <ol>
                                <li>SQL - MySQL, MsSQL</li>
                                <li>GIT</li>
                                <li>HTML/CSS</li> 
                            </ol>
                        </li>
                        <li>
                            <h5>IDE's</h5>
                            <ol>
                                <li>Eclipse</li>
                                <li>VS Code</li>
                                <li>PyCharm</li>
                            </ol>
                        </li>
                    </ul>
                </section>
            </div>
        )
    }
}