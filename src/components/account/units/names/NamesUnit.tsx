import { ChangeEvent, Component } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { store } from "../../../../redux/store";
import { FullUserData } from "../../../../models/users/FullUserData";
import { ActionType } from "../../../../redux/action-type";
import "./NamesUnit.css";


interface NamesUnitProps {
    firstName: string,
    surName: string
}

interface NamesUnitState {
    input: string,
    showFirstModal: boolean,
    showSecondModal: boolean
}


export class NamesUnit extends Component<NamesUnitProps, NamesUnitState>{
    public constructor(props: NamesUnitProps) {
        super(props)
        this.state = {
            input: "",
            showFirstModal: false,
            showSecondModal: false
        }
    }
    render() {
        return (
            <div className="names">
                <section className="nameUnit" id="firstName">
                    <h2>First Name:</h2>
                    <h3>{this.props.firstName}</h3>
                    <button onClick={this.setShowFirstModal}>Change</button>
                    <Modal enforceFocus show={this.state.showFirstModal}>
                        <Modal.Header>
                            <Modal.Title>
                                <h2>Update First Name</h2>
                            </Modal.Title>
                            <Modal.Body>
                                <h3>First Name: {this.props.firstName}</h3>
                                <input type="text" placeholder="Enter your first name" onChange={this.setInput} />
                            </Modal.Body>
                            <Modal.Footer>
                                <button onClick={this.setShowFirstModal}>Cancel</button>
                                <button onClick={this.updateFirstName}>Apply</button>
                            </Modal.Footer>
                        </Modal.Header>

                    </Modal>
                </section>
                <section className="nameUnit" id="surName">
                    <h2>Surname:</h2>
                    <h3>{this.props.surName}</h3>
                    <button onClick={this.setShowSecondModal}>Change</button>
                    <Modal enforceFocus show={this.state.showSecondModal}>
                        <Modal.Header>
                            <Modal.Title>
                                <h2>Update Surname</h2>
                            </Modal.Title>
                            <Modal.Body>
                                <h3>Surname: {this.props.surName}</h3>
                                <input type="text" placeholder="Enter your first name" onChange={this.setInput} />
                            </Modal.Body>
                            <Modal.Footer>
                                <button onClick={this.setShowSecondModal}>Cancel</button>
                                <button onClick={this.updateSurName}>Apply</button>
                            </Modal.Footer>
                        </Modal.Header>

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

    private updateFirstName = async () => {
        try {
            let updatedFiled = this.state.input;
            if (updatedFiled.length < 2) {
                alert("First Name must be longer than one chatachter");
                return;
            }
            await axios.put("http://localhost:8080/users/firstName", { firstName: this.state.input });
            alert("Youre account has been succesfully updated");
            this.setShowFirstModal();
            this.getAccountDetails();

        } catch (error) {
            console.error(error.message);
        }
    }

    private updateSurName = async () => {
        try {
            let updatedFiled = this.state.input;
            if (updatedFiled.length < 2) {
                alert("Surname must be longer than one chatachter");
                return;
            }
            await axios.put("http://localhost:8080/users/surName", { surName: this.state.input });
            this.setShowSecondModal();
            alert("Youre account has been succesfully updated");
            this.getAccountDetails();

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