import {Component} from "react";
import {store} from "../../redux/store";
import axios from "axios";
import "./Account.css";
import { ActionType } from "../../redux/action-type";
import { FullUserData } from "../../models/users/FullUserData";
import { NamesUnit } from "./units/names/NamesUnit";
import ButtonsUnit from "./units/buttons/ButtonsUnit";

interface AccountState{
    userDetails: FullUserData,
    showModal: boolean

}


export default class Account extends Component<any, AccountState>{
    public constructor(props:any){
        super(props);
        
        let initialUserDetails = store.getState().userDetails;
        if( ! initialUserDetails ){
            initialUserDetails = new FullUserData();
        }
        
        this.state = {
            userDetails: initialUserDetails,
            showModal: false
        }
        store.subscribe(this.subsription);
    }
    
    render(){
        let userType = this.state.userDetails.type;
        return(
            <div className="account">
                <section className = "loginDetails">
                    <h2>Username: {this.state.userDetails.userName}</h2>
                    <h3>User Type: {userType}</h3>
                    {
                        userType === "COMPANY" &&
                        <h4>Company Name: {this.state.userDetails.companyName}</h4>
                    }
                </section>
                <section className="names">
                    <NamesUnit firstName={this.state.userDetails.firstName} surName={this.state.userDetails.surName} />
                </section>
                <section className="passwordAndDelete">
                    <ButtonsUnit />
                </section>
            </div>
        );
    }

    async componentDidMount(){
        if( ! store.getState().userDetails  ){
            try {
                let response = await axios.get<FullUserData>("http://localhost:8080/users/account");
                store.dispatch({ type: ActionType.GetAccountDetails, payload: response.data });
            } 
            catch (error) {
                console.error(error.message);
            }
        }
    }


    private subsription = () => {
        let newUserDetails = store.getState().userDetails;
        this.setState({userDetails: newUserDetails});
    }

 
}