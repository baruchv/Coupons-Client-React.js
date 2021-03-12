import axios from "axios";
import { Component, ChangeEvent } from "react";
import { Modal } from "react-bootstrap";
import { store } from "../../../../redux/store";
import { getAllCoupons } from "../../CouponUtils";
import "./Unit.css";


interface UnitState {
    input: string,
    showModal: boolean,
    amount: number
}

export class AmountUnit extends Component<any, UnitState>{
    public constructor(props: any) {
        super(props);
        let coupon = store.getState().couponForAction;
        this.state = {
            input: null,
            showModal: false,
            amount: coupon ? coupon.amount : 0
        }
    }

    render() {
        return (
            <div className="unit">
                <h2>amount:</h2>
                <h3>{this.state.amount}</h3>
                <button onClick={this.setShowModal}>Change</button>
                <Modal enforceFocus show={this.state.showModal}>
                    <Modal.Header>
                        <Modal.Title>
                            <h2>Update Coupon's amount</h2>
                        </Modal.Title>
                        <Modal.Body>
                            <h3>Amount: {this.state.amount}</h3>
                            <input type="number" placeholder="Enter coupon's price" onChange={this.setInput} />
                        </Modal.Body>
                        <Modal.Footer>
                            <button onClick={this.setShowModal}>Cancel</button>
                            <button onClick={this.updateAmount}>Apply</button>
                        </Modal.Footer>
                    </Modal.Header>

                </Modal>
            </div>
        )
    }

    private setShowModal = () => {
        let newShowModal = !this.state.showModal;
        this.setState({ showModal: newShowModal });
    }

    private setInput = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ input: event.target.value });
    }

    private updateAmount = async () => {
        let newAmount = Number(this.state.input);
        if( ! Number.isInteger(newAmount)){
            alert("Coupon's amount must be an hole number");
            return
        }
        let couponID = store.getState().couponForAction.id;
        let url = "http://localhost:8080/coupons/" + couponID + "/amount";
        let data = {
            amount: newAmount
        };
        try {
            await axios.put(url, data);
            alert("Coupon's amount was updated successfully");
            this.setState({ amount: Number(data.amount) })
            getAllCoupons();
        } catch (error) {
            console.error(error.message);
            alert("Update process was failed");
        }
        this.setShowModal();
    }
}