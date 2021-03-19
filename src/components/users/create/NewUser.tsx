import axios from "axios";
import { ChangeEvent, Component } from "react";
import { getAllUsers } from "../Utils";
import "./NewUser.css"

interface CreateUserState{
    userName: string,
    password: string,
    firstName: string,
    surName: string,
}

export default class NewUser extends Component<any, CreateUserState> {
    public constructor(props: any){
        super(props);
        this.state = {
            userName: null,
            password: null,
            firstName: null,
            surName: null
        }
    }
    
    render() {
        return (
            <div className="register">
                <h2>Please Fill Details</h2>
                <label htmlFor="firstname-input" id="firstname-label">First Name:</label>
                <input type="text" id="firstname-input" onChange={this.setFirstName} title="Enter your first name - at least 2 characters long" required />
                <br />
                <label htmlFor="surname-input" id="surname-label">Surname:</label>
                <input type="text" id="surname-input" onChange={this.setSurName} title="Enter your surname - at least 2 characters long" required />
                <br />
                <label htmlFor="username-input" id="username-label">Username:</label>
                <input type="text" id="username-input" onChange={this.setUserName} title="Enter a username - at least 2 characters long" required />
                <br />
                <label htmlFor="password-input" id="password-label">Password:</label>
                <input type="password" id="password-input" onChange={this.setPassword} title="Enter a password - at least 8 characters long" required />
                <button type="submit" onClick={this.register}>Sign Up</button>
            </div>
        )
    }

    private setUserName = (event: ChangeEvent<HTMLInputElement>) => {
        let userName = event.target.value;
        this.setState({ userName });
    }

    private setPassword = (event: ChangeEvent<HTMLInputElement>) => {
        let password = event.target.value;
        this.setState({ password });
    }

    private setFirstName = (event: ChangeEvent<HTMLInputElement>) => {
        let firstName = event.target.value;
        this.setState({ firstName });
    }

    private setSurName = (event: ChangeEvent<HTMLInputElement>) => {
        let surName = event.target.value;
        this.setState({ surName });
    }


    private register = async () => {
        let basicRegisterData = {
            userName: this.state.userName,
            password: this.state.password,
            firstName: this.state.firstName,
            surName: this.state.surName,
            type: this.props.location.state.userType,
        };
        let registerData;
        if (basicRegisterData.type === "COMPANY") {
            let id = this.props.location.state.companyID;
            registerData = {
                ...basicRegisterData,
                companyID: id
            }
        }
        else {
            registerData = basicRegisterData
        }
        try {
            this.validateUserDetails(registerData);
        } catch (error) {
            alert(error.message);
            return;
        }
        try {
            await axios.post("http://localhost:8080/users", registerData);
            alert("User was created successfully");
            getAllUsers();
            this.props.history.push("/users");
        } catch (error) {
            console.error(error.message);
            alert("User-creation failed");
        }
    }

    private validateUserDetails = (registerData: any) => {
        if(! registerData.userName){
            throw new Error("Must enter a username");
        }
        if(! registerData.surName){
            throw new Error("Must enter a surname");
        }
        if(! registerData.firstName){
            throw new Error("Must enter a first-name");
        }
        if(! registerData.password){
            throw new Error("Must enter a password");
        }
        if (registerData.userName.length < 2) {
            throw new Error("Username must be longer than 1 charachter");
        }
        if (registerData.surName.length < 2) {
            throw new Error("Surname must be longer than 1 charachter");
        }
        if (registerData.firstName.length < 2) {
            throw new Error("First-Name must be longer than 1 charachter");
        }
        if (registerData.password.length < 8) {
            throw new Error("Password must be longer than 7 charachter");
        }
    }

}