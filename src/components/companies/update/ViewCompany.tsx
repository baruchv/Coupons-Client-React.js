import {ChangeEvent, Component} from "react";
import { FullCompanyData } from "../../../models/companies/FullCompanyData";
import { store } from "../../../redux/store";
import Modal from "react-bootstrap/Modal";
import "./ViewCompany.css"
import axios from "axios";
import { getAllCompanies } from "../CompanyUtils";

interface ViewCompanyState{
    companyDetails: FullCompanyData
}


interface DetailState{
    input: string,
    showModal: boolean,
    originalField: string,
    companyID: number
}

export default class ViewCompany extends Component<any, ViewCompanyState>{
    public constructor(props: any){
        super(props)
        this.state = {
            companyDetails: new FullCompanyData()
        }
    }
    
    render(){
        return(
            <div className="viewCompany">
                <h2>Companies Name: {this.state.companyDetails.name}</h2>
                <AddressUnit/>
                <PhoneNumberUnit/>
                <button onClick={this.deleteCompany}>Delete Company</button>
                <button onClick={this.goBack}>Go Back</button>
            </div>
        )
    }

    async componentDidMount(){
        if (store.getState().companyForView){
            this.setState({ companyDetails: store.getState().companyForView });
        }
        else{
            this.props.history.push("/coupons");
        }
    }

    private deleteCompany = async () => {
        let url = "http://localhost:8080/companies/" + this.props.companyID
        try {
            await axios.delete(url);
            alert("Company was deleted successfully");
        } catch (error) {
            console.error(error.message);
            alert("General Error");
        }
        getAllCompanies();
        this.goBack()
    }

    private goBack = () => {
        this.props.history.push("/companies");
    }

}

class AddressUnit extends Component<any, DetailState>{
    public constructor(props: any){
        super(props);
        let fullCompany = store.getState().companyForView
        if(! fullCompany){
           fullCompany = new FullCompanyData()
        }
        this.state = {
            companyID: fullCompany.id,
            originalField: fullCompany.address,
            input: null,
            showModal: false
        }
    }
    render() {
        return (
            <div className="detailUnit">
                <h3>Address: {this.state.originalField}</h3>
                <button onClick={this.setShowModal}>Change</button>
                <Modal enforceFocus show={this.state.showModal}>
                    <Modal.Header>
                        <Modal.Title>
                            <h2>Update Address</h2>
                        </Modal.Title>
                        <Modal.Body>
                            <h3>Address: {this.state.originalField}</h3>
                            <input type="text" placeholder="Enter new address" onChange={this.setInput} />
                        </Modal.Body>
                        <Modal.Footer>
                            <button onClick={this.setShowModal}>Cancel</button>
                            <button onClick={this.updateDetail}>Apply</button>
                        </Modal.Footer>
                    </Modal.Header>
                </Modal>
            </div>
        )
    }

    private setInput = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ input: event.target.value });
    }

    private setShowModal = () => {
        let newShowModal = !this.state.showModal;
        this.setState({ showModal: newShowModal });
    }

    private updateDetail = async () => {
        let input = this.state.input;
        if( ! input ){
            alert("Must enter an address");
            return;
        }
        if(input.length < 2){
            alert("Address must be longer than one charachter");
            return;
        }
        let data = {address: input}
        try {
            await axios.put("http://localhost:8080/companies/address", data);
            alert("Company was updated successfuly");
        } catch (error) {
            console.error(error.message);
            alert("General Error");
        }
        getAllCompanies()
        this.setShowModal();
    }
}

class PhoneNumberUnit extends Component<any, DetailState>{
    public constructor(props: any){
        super(props);
        let fullCompany = store.getState().companyForView;
        if( ! fullCompany ){
            fullCompany = new FullCompanyData();
        }
        this.state = {
            showModal: false,
            input: null,
            originalField: fullCompany.phoneNumber,
            companyID: fullCompany.id
        }
    }

    render() {
        return (
            <div className="detailUnit">
                <h3>Phone Number: {this.state.originalField}</h3>
                <button onClick={this.setShowModal}>Change</button>
                <Modal enforceFocus show={this.state.showModal}>
                    <Modal.Header>
                        <Modal.Title>
                            <h2>Update Phone Number</h2>
                        </Modal.Title>
                        <Modal.Body>
                            <h3>Phone Number: {this.state.originalField}</h3>
                            <input type="text" placeholder="Enter new address" onChange={this.setInput} />
                        </Modal.Body>
                        <Modal.Footer>
                            <button onClick={this.setShowModal}>Cancel</button>
                            <button onClick={this.updateDetail}>Apply</button>
                        </Modal.Footer>
                    </Modal.Header>
                </Modal>
            </div>
        )
    }

    private setInput = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ input: event.target.value });
    }

    private setShowModal = () => {
        let newShowModal = !this.state.showModal;
        this.setState({ showModal: newShowModal });
    }

    private updateDetail = async () => {
        let input = this.state.input;
        if (!input) {
            alert("Must enter an phone number");
            return;
        }
        if (input.length < 10) {
            alert("Address must be longer than 9 charachters");
            return;
        }
        let data = { phoneNumber: input }
        try {
            await axios.put("http://localhost:8080/companies/phoneNumber", data);
            alert("Company was updated successfuly");
        } catch (error) {
            console.error(error.message);
            alert("General Error");
        }
        getAllCompanies()
        this.setShowModal();
    }

}
