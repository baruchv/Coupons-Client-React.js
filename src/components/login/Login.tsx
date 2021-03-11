import { Component, ChangeEvent } from "react";
import axios from "axios";
import { UserLoginDetails } from "../../models/UserLoginDetails";
import "./Login.css"; 
import { store } from "../../redux/store";
import { ActionType } from "../../redux/action-type";
import { SuccessfulLoginData } from "../../models/SuccessfulLoginData";

interface LoginState{
    userName:string
    password:string;
}

export default class Login extends Component <any,LoginState>{
    
    public constructor(props:any){
        super(props);
        this.state = {
            userName:"",
            password:""
        }
    }
   
    public render() {
        return (
                <div className="login">
                    <h2>Let's Log In !</h2>
                    <label htmlFor="username-input" id="username-label" >Username:</label>
                    <input type="text" id="username-input" required onChange = {this.setUserName} />
                    <br/>
                    <label htmlFor="password-input" id="password-label" >Password:</label>
                    <input type="password" id="password-input" required onChange = {this.setPassword} />
                    <button type="submit" onClick = {this.login}>Log In</button>
                 </div>
            
        );
    }

    private login = async () => {
        
        let inputUserName = this.state.userName; 
        if (inputUserName.length < 2) {
            alert("username must be longet than 1 charachter");
            return;

        }

        let inputPassword = this.state.password;
        if (inputPassword.length < 8) {
           alert("password must be longer than 7 charachters");
           return;
        }
        try {
            let userLoginDetails = new UserLoginDetails(this.state.userName, this.state.password);
            let response = await axios.post<SuccessfulLoginData>("http://localhost:8080/users/login", userLoginDetails);
            axios.defaults.headers.common["Authorization"] = response.data.token;
            store.dispatch({ type: ActionType.Login });
            sessionStorage.setItem("userType", response.data.type);
            sessionStorage.setItem("token", response.data.token);
            this.props.history.push("/coupons");
        }
        catch (error) {
            alert(error.message);
        }
       
    }


    private setUserName = (event: ChangeEvent<HTMLInputElement>) => {
        let userName = event.target.value;
        this.setState( { userName } );
    }

    private setPassword = (event: ChangeEvent<HTMLInputElement>) => {
        let password = event.target.value;
        this.setState( { password } );
    }

}

   
