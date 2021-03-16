import {Component} from "react";
import { BasicCompanyData } from "../../../../models/companies/BasicCompanyData";
import { FullCompanyData } from "../../../../models/companies/FullCompanyData";
import Modal from "react-bootstrap/Modal";
import "./CompanyComponent.css";
import axios from "axios";
import { store } from "../../../../redux/store";
import { ActionType } from "../../../../redux/action-type";
import { getAllCompanies } from "../../CompanyUtils";
import { NavLink } from "react-router-dom";

interface companyState{
    fullCompany: FullCompanyData
    showModal: boolean
}

export default class CompanyComponent extends Component<BasicCompanyData, companyState>{
    public constructor(props: BasicCompanyData){
        super(props);
        this.state = {
            fullCompany: new FullCompanyData(),
            showModal: false
        }
    }
    render(){
        return(
            <div className="company">
                <h2>{this.props.name}</h2>
                <button onClick={this.openModal}>View details</button>
                <Modal dialogClassName="couponModal" enforceFocus scrollable show={this.state.showModal}>
                    <Modal.Header>
                        <Modal.Title>
                            <h2>Company's name: {this.state.fullCompany.name}</h2>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3>Address: {this.state.fullCompany.address}</h3>
                        <h3>Phone Number: {this.state.fullCompany.phoneNumber}</h3>
                    </Modal.Body>
                    <Modal.Footer>
                        <NavLink to="companies/update" exact>
                            <button onClick={this.prepareForUpdateCompany}>Update</button>
                        </NavLink>
                        <button onClick={this.deleteCompany}>Delete</button>
                        <button onClick={this.hideModal}>Cancel</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    private hideModal = () => {
        this.setState({ showModal: false });
    }

    private openModal = async () => {
        if (this.state.fullCompany.name === undefined) {
            try {
                let url = "http://localhost:8080/companies/" + this.props.id;
                let response = await axios.get<FullCompanyData>(url);
                this.setState({ showModal: true, fullCompany: response.data });
            } catch (error) {
                console.log(error.message);
            }
        }
        this.setState({ showModal: true });
    }

    private prepareForUpdateCompany = () => {
        this.hideModal();
        store.dispatch({ type: ActionType.PrepareForUpdateCompany, payload: { ...this.state.fullCompany } });
    }

    private deleteCompany = async () => {
        this.hideModal();
        try {
            let url = "http://localhost:8080/companies/" + this.props.id;
            await axios.delete(url);
            alert("Company was successfully deleted");
        } catch (error) {
            console.error(error.message);
            alert("Deleting process was failed");
        }
        getAllCompanies();
    }

}