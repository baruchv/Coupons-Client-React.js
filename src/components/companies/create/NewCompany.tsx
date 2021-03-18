import axios from "axios";
import {ChangeEvent, Component} from "react";
import { getAllCompanies } from "../CompanyUtils";
import "./NewCompany.css";

interface NewCompanyState {
    name: string,
    address: string,
    phoneNumber: string
}

export default class NewCompany extends Component<any, NewCompanyState>{
    public constructor(props: any){
        super(props);
        this.state = {
            name: null,
            address: null,
            phoneNumber: null
        }
    }
    
    render(){
        return(
            <div className="createCompany">
                <h2>Please Fill Details</h2>
                <label htmlFor="name-input" id="name-label">Name:</label>
                <input type="text" id="name-input" onChange={this.setName} title="Enter Company's name - at least 2 characters long" required />
                <br />
                <label htmlFor="address-input" id="address-label">Address:</label>
                <input type="text" id="address-input" onChange={this.setAddress} title="Enter Company's address - at least 2 characters long" required />
                <br />
                <label htmlFor="phone-input" id="phone-label">Phone Number:</label>
                <input type="text" id="phone-input" onChange={this.setPhoneNumber} title="Enter a phone number - at least 8 characters long" required />
                <br />
                <button type="submit" onClick={this.createCompany}>Create</button>
                <button onClick={()=>{this.props.history.push("/companies")}}>Go Back</button>
            </div>
        )
    }

    private setName = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({name: event.target.value});
    }

    private setAddress = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ address: event.target.value });
    }

    private setPhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ phoneNumber: event.target.value });
    }

    private createCompany = async () => {
        if( ! this.state.name ){
            alert("Must enter a name");
            return;
        }
        if (!this.state.address) {
            alert("Must enter an address");
            return;
        }
        if (!this.state.phoneNumber) {
            alert("Must enter a phone number");
            return;
        }
        if(this.state.name.length < 2){
            alert("Name must be longer than 1 charachter");
            return;
        }
        if (this.state.address.length < 2) {
            alert("Address must be longer than 1 charachter");
            return;
        }
        if (this.state.phoneNumber.length < 10) {
            alert("Phone number must be longer than 9 charachter");
            return;
        }
        try {
            let data = {
                name: this.state.name,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber
            }
            await axios.post("http://localhost:8080/companies", data);
            alert("Company was created successfully");
            getAllCompanies();
            this.props.history.push("/companies");
        } catch (error) {
            console.error(error.message);
            alert("General Error");
        }
    }
}