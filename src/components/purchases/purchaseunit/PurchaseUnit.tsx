import {Component} from "react";
import axios from "axios";
import "./PurchaseUnit.css";
import { BasicPurchaseData } from "../../../models/purchases/BasicPurchaseData";
import { FullPurchaseData } from "../../../models/purchases/FullPurchaseData";
import Modal from "react-bootstrap/Modal";

interface PurchaseState{
    showModal: boolean,
    fullPurchase: FullPurchaseData
}

export default class PurchaseUnit extends Component<BasicPurchaseData, PurchaseState>{
    public constructor(props: BasicPurchaseData){
        super(props);
        this.state = {
            showModal: false,
            fullPurchase: new FullPurchaseData()
        }
    }

    public render(){
        return(
            <div className="purchaseUnit">
                <h2 id="title">{this.props.couponTitle}</h2>
                <h3 id="companyName">Amount: {this.props.amount}</h3>
                <h3 id="price">Price: {this.props.totalPrice}</h3>
                <h3 id="endDate">TimeStamp: {this.props.timeStamp}</h3>
                <button onClick={this.openModal}>View details</button>
                <Modal dialogClassName="purchaseModal" enforceFocus scrollable show={this.state.showModal}>
                    <Modal.Header>
                        <Modal.Title>
                            <h2>Coupon's title: {this.state.fullPurchase.couponTitle}</h2>
                            <h3>Company: {this.state.fullPurchase.companyName}</h3>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3>Amount: {this.state.fullPurchase.amount}</h3>
                        <h3>Price: {this.state.fullPurchase.totalPrice}</h3>
                        <h3>Time Staamp: {this.state.fullPurchase.timeStamp}</h3>
                        {
                            sessionStorage.getItem("userType") == "ADMIN" &&
                            <h3>Username: {this.state.fullPurchase.userName}</h3>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={this.hideModal}>Cancel</button>
                        {
                            sessionStorage.getItem("userType") == "ADMIN" &&
                            <button>Delete</button>
                        }
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    private openModal = async () => {
        if (this.state.fullPurchase.couponTitle === undefined) {
            try {
                let url = "http://localhost:8080/purchases/" + this.props.id;
                let response = await axios.get<FullPurchaseData>(url);
                this.setState({ showModal: true, fullPurchase: response.data });
                return;
            } catch (error) {
                console.log(error.message);
            }
        }
        this.setState({ showModal: true });
    }
    
    private hideModal = async() =>{
        this.setState({showModal: false});
    }
}