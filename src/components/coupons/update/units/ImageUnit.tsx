import axios from "axios";
import { Component, ChangeEvent } from "react";
import { Modal } from "react-bootstrap";
import { getAllCoupons } from "../../CouponUtils";
import "./Unit.css";

interface UnitProps {
    originalField: string,
    couponID: number
}

interface UnitState {
    input: string,
    showModal: boolean
}

export class ImageUnit extends Component<UnitProps, UnitState>{
    public constructor(props: UnitProps) {
        super(props);
        this.state = {
            input: null,
            showModal: false
        }
    }

    render() {
        return (
            <div className="unit">
                <h2>Image:</h2>
                <h3>{this.props.originalField}</h3>
                <button onClick={this.setShowModal}>Change</button>
                <Modal enforceFocus show={this.state.showModal}>
                    <Modal.Header>
                        <Modal.Title>
                            <h2>Update Coupon's image</h2>
                        </Modal.Title>
                        <Modal.Body>
                            <h3>Image's Url:</h3>
                            <h4>{this.props.originalField}</h4>
                            <input type="url" placeholder="Enter your image's url" onChange={this.setInput} />
                        </Modal.Body>
                        <Modal.Footer>
                            <button onClick={this.setShowModal}>Cancel</button>
                            <button onClick={this.updateImage}>Apply</button>
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

    private updateImage = async () => {
        let url = "http://localhost:8080/coupons/" + this.props.couponID + "/image";
        let data = {
            input: this.state.input
        };
        try {
            await axios.put(url, data);
            alert("Coupon's image was updated successfully");
        } catch (error) {
            console.error(error.message);
            alert("Update process was failed");
        }
        this.setShowModal();
        getAllCoupons();
    }

}