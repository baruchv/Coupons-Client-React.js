import {ChangeEvent, Component} from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import {store} from "../../../../redux/store";
import { FullUserData } from "../../../../models/users/FullUserData";
import { ActionType } from "../../../../redux/action-type";
import "./ButtonsUnit.css";


interface ButtonsUnitState{
    input: string,
    showFirstModal: boolean,
    showSecondModal: boolean
}


export default class ButtonsUnit extends Component<any, ButtonsUnitState>{
    public constructor(props: any) {
        super(props)
        this.state = {
            input: "",
            showFirstModal: false,
            showSecondModal: false
        }
    }
    render() {
        return (
            <div className = "buttonsUnit">
                <section className="passwordSection">
                    <button onClick={this.setShowFirstModal} id="passwordButton">Change Password</button>
                    <Modal enforceFocus show={this.state.showFirstModal}>
                        <Modal.Header>
                            <Modal.Title>
                                <h2>Update Password</h2>
                            </Modal.Title>
                            <Modal.Body>
                                <input type="text" placeholder="Enter your first name" onChange={this.setInput} />
                            </Modal.Body>
                            <Modal.Footer>
                                <button onClick={this.setShowFirstModal}>Cancel</button>
                                <button onClick={this.updatePaswword}>Apply</button>
                            </Modal.Footer>
                        </Modal.Header>

                    </Modal>
                </section>
                <section className="deleteSection">
                    <button onClick={this.setShowSecondModal} id="deleteButton">Delete Account</button>
                    <Modal enforceFocus show={this.state.showSecondModal}>
                        <Modal.Header>
                            <Modal.Title>
                                <h2>Are you sure you would like to delete?</h2>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <button onClick={this.deleteAccount}>Delete</button>
                        </Modal.Body>
                        <Modal.Footer>
                            <button onClick={this.setShowSecondModal}>Cancel</button>
                        </Modal.Footer>
                    </Modal>
                </section>
            </div>
        )
    }

    private setInput = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ input: event.target.value });
    }

    private setShowFirstModal = () => {
        let newShowFirstModal = !this.state.showFirstModal;
        this.setState({ showFirstModal: newShowFirstModal });
    }

    private setShowSecondModal = () => {
        let newShowSecondModal = !this.state.showSecondModal;
        this.setState({ showSecondModal: newShowSecondModal });
    }

    private updatePaswword = async () => {
        try {
            let updatedFiled = this.state.input;
            if (updatedFiled.length < 8) {
                alert("Password must be longer than one chatachter");
                return;
            }
            await axios.put("http://localhost:8080/users/password", { surName: this.state.input });
            this.setShowFirstModal();
            alert("Youre account has been succesfully updated");
            this.getAccountDetails();

        } catch (error) {
            console.error(error.message);
        }
    }


    private deleteAccount = async () => {
        try {
            await axios.delete("http://localhost:8080/users");
            store.dispatch({ type: ActionType.Logout });
            this.props.history.push("/home");
            alert("Your account has been successfully deleted");
            sessionStorage.removeItem("userType");
            sessionStorage.removeItem("token");
        } catch (error) {
            console.error(error.message);
        }
    }

    private getAccountDetails = async () => {
        try {
            let response = await axios.get<FullUserData>("http://localhost:8080/users/account");
            store.dispatch({ type: ActionType.GetAccountDetails, payload: response.data });
        } catch (error) {
            console.error(error.message);
        }
    }
}

 