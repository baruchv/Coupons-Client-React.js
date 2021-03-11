import axios from "axios";
import { ChangeEvent, Component } from "react";
import { SuccessfulLoginData } from "../../models/SuccessfulLoginData";
import { UserLoginDetails } from "../../models/UserLoginDetails";
import { ActionType } from "../../redux/action-type";
import { store } from "../../redux/store";
import "./SignUp.css";

interface RegisterState{
    userName: string,
    password: string,
    firstName: string,
    surName: string
}

export default class SignUp extends Component<any,RegisterState> {
    public constructor(props: any){
        super(props);
        this.state = {
            userName: "",
            password: "",
            firstName: "",
            surName: ""
        }
    }
    
    public render() {
        return (
            <div className="sign-up">
                <h2>Please Fill Details</h2>
                <label htmlFor="firstname-input" id="firstname-label">First Name:</label>
                <input type="text" id="firstname-input" onChange = {this.setFirstName} title="Enter your first name - at least 2 characters long" required />
                <br />
                <label htmlFor="surname-input" id="surname-label">Surname:</label>
                <input type="text" id="surname-input" onChange = {this.setSurName} title="Enter your surname - at least 2 characters long" required />
                <br />
                <label htmlFor="username-input" id="username-label">Username:</label>
                <input type="text" id="username-input" onChange = {this.setUserName} title="Enter a username - at least 2 characters long" required />
                <br />
                <label htmlFor="password-input" id="password-label">Password:</label>
                <input type="password" id="password-input" onChange = {this.setPassword} title="Enter a password - at least 8 characters long"  required />
                <button type="submit" onClick = {this.register}>Sign Up</button>
            </div>
        );
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


    private register = async () =>{
        let registerData = {
            userName: this.state.userName,
            password: this.state.password,
            firstName: this.state.firstName,
            surName: this.state.surName,
            type: "CUSTOMER"
        }
        if (registerData.userName.length < 2) {
            alert("username must be longer than 1 charachter");
            return;

        }
        if (registerData.surName.length < 2) {
            alert("username must be longer than 1 charachter");
            return;

        }
        if (registerData.firstName.length < 2) {
            alert("username must be longer than 1 charachter");
            return;

        }
        if (registerData.password.length < 8) {
            alert("username must be longer than 7 charachter");
            return;

        }

        try {
            let response = await axios.post("http://localhost:8080/users", registerData);
            alert("Register Succeeded");
            this.login();
        } catch (error) {
            console.error(error.message)
        }

    }

    private login = async () =>{
        let userLoginDetails = new UserLoginDetails(this.state.userName, this.state.password);
        let response = await axios.post<SuccessfulLoginData>("http://localhost:8080/users/login", userLoginDetails);
        axios.defaults.headers.common["Authorization"] = response.data.token;
        store.dispatch({ type: ActionType.Login });
        sessionStorage.setItem("userType", "CUSTOMER");
        sessionStorage.setItem("token", response.data.token);
        this.props.history.push("/coupons");
    }
    
}