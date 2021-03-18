import { Component } from "react";
import { BasicUserData } from "../../../../models/users/BasicUserData";
import Modal from "react-bootstrap/Modal";
import "./UserComponent.css"
import { FullUserData } from "../../../../models/users/FullUserData";
import axios from "axios";

interface UserState{ showModal: boolean, fullUser: FullUserData }

export default class UserComponent extends Component<BasicUserData, UserState> {
   public constructor(props: BasicUserData){
       super(props);
       this.state = {
           showModal: false,
           fullUser: new FullUserData()
       }
   }

    render() {
        let userType = this.props.type;
        return (
            <div className="user">
                <h2>Username: {this.props.userName}</h2>
                <h2>User Type: {this.props.type}</h2>
                <button onClick={this.openModal}>View Details</button>
                <Modal className="userModal" nforceFocus scrollable show={this.state.showModal}>
                    <Modal.Header>
                        <Modal.Title>
                            <h2>Username: {this.props.userName}</h2>
                            <h2>User Type: {userType}</h2>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            {   userType === "COMPANY" &&
                                <h3>Company: {this.state.fullUser.companyName}</h3>
                            }
                            <h3>First Name: {this.state.fullUser.firstName}</h3>
                            <h3>Surname: {this.state.fullUser.surName}</h3>
                            {}
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={this.closeModal}>Cancel</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    private closeModal = () => {
        this.setState({showModal: false});
    }

    private openModal = () => {
        if( ! this.state.fullUser.firstName){
            this.getFullUser();
        }
        this.setState({showModal: true});   
    }

    private getFullUser = async () => {
        let url = "http://localhost:8080/users/" + this.props.id;
        try {
            let response = await axios.get(url);
            this.setState({fullUser: response.data});
            console.log(this.state.fullUser)
        } catch (error) {
            alert("Failed loading user-details");
            console.error(error.message);
        }
    }




}