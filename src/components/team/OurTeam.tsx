import {Component} from "react";
import "./OurTeam.css";

const skillArr = [
    {
        title:"Programin Languages",
        skills: ["Java - SpringBoot, SpringData, JDBC, JPA", "Pyhton - Pandas, Matplotlib", "JavaScript - React.JS"]
    },
    {
        title:"Tools and Technoligies",
        skills: ["SQL - MySQL, MsSQL", "GIT", "HTML/CSS"]
    },
    {
        title:"IDE's",
        skills: ["Eclipse", "VS Code", "PyCharm"]
    }
]

export default class OurTeam extends Component{
    render(){
        return(
            <div className="ourTeam">
                <h2>Our Team</h2>
                <section className="picture">
                    <img src="./picture.jpg" alt="Founder's picture" />
                    <small>Baruch Varticovschi</small>
                </section>
                <section>
                    <h3>Founder and CEO - Baruch Varticovschi</h3>
                    <p>
                        Baruch is a 26 years old fullstack developer.
                        Last year, Baruch desided to establish this astonishing website. 
                    </p>
                    <section className="skills">
                        <h4>Main Skills:</h4>
                        <ul>
                            {skillArr.map((currentElement, index) => <SkillBlock {...currentElement} key={index} />)}
                        </ul>
                    </section>
                </section>
            </div>
        )
    }
}

interface SkillProps{
    title: string,
    skills: string[]
}

class SkillBlock extends Component<SkillProps>{
    public constructor(props: SkillProps){
        super(props);
    }

    render(){
        return(
            <div className="skillBlock">
                <h5>{this.props.title}:</h5>
                <ol>
                    {this.props.skills.map((skill) => <li>{skill}</li>)}
                </ol>
            </div>
        )
    }
}