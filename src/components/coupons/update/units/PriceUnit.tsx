import axios from "axios";
import { Component, ChangeEvent} from "react";
import { Modal } from "react-bootstrap";
import { store } from "../../../../redux/store";
import { getAllCoupons } from "../../CouponUtils";
import "./Unit.css";

interface UnitState{
    input: string,
    showModal: boolean,
    price: number
}

export  class PriceUnit extends Component<any, UnitState>{
    public constructor(props: any){
        super(props);
        let coupon = store.getState().couponForAction;
        this.state = {
            input: null,
            showModal: false,
            price: coupon ? coupon.price : 0
        }
    }

    render(){
        return(
            <div className="unit">
                <h2>price:</h2>
                <h3>{this.state.price}</h3>
                <button onClick={this.setShowModal}>Change</button>
                <Modal enforceFocus show={this.state.showModal}>
                    <Modal.Header>
                        <Modal.Title>
                            <h2>Update Coupon's price</h2>
                        </Modal.Title>
                        <Modal.Body>
                            <h3>Price: {this.state.price}</h3>
                            <input type="number" placeholder="Enter coupon's price" onChange={this.setInput} />
                        </Modal.Body>
                        <Modal.Footer>
                            <button onClick={this.setShowModal}>Cancel</button>
                            <button onClick={this.updatePrice}>Apply</button>
                        </Modal.Footer>
                    </Modal.Header>

                </Modal>
            </div>
        )
    }

    private setShowModal = () =>{
        let newShowModal = ! this.state.showModal;
        this.setState({showModal: newShowModal});
    }

    private setInput = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({input: event.target.value});
    }

    private updatePrice = async () => {
        let couponID = store.getState().couponForAction.id
        let url = "http://localhost:8080/coupons/" + couponID + "/price";
        let data = {
            price: this.state.input
        };
        try {
            await axios.put(url,data);
            alert("Coupon's price was updated successfully");
            this.setState({ price: parseFloat(data.price) })
            getAllCoupons();
        } catch (error) {
            console.error(error.message);
            alert("Update process was failed");
        }
        this.setShowModal();
    }
}