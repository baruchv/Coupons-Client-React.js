import {Component} from "react";
import {BasicCouponData} from "../../../../models/coupons/BasicCouponData";
import axios from "axios";
import { FullCouponData } from "../../../../models/coupons/FullCouponData";
import Modal from "react-bootstrap/Modal";
import {NavLink} from "react-router-dom";
import { store } from "../../../../redux/store";
import { ActionType } from "../../../../redux/action-type";
import "./CouponComponent.css";
import { getAllCoupons } from "../../CouponUtils";

interface couponState{
    showModal: boolean,
    fullCoupon: FullCouponData
}

export default class CouponComponentForCustomer extends Component<BasicCouponData,couponState>{
    public constructor(props: BasicCouponData){
        super(props);
        this.state = {
            showModal: false,
            fullCoupon: new FullCouponData()
        }
    }
    render(){
        return(
            <div className="coupon">
                <h2 id="title">{this.props.couponTitle}</h2>
                <h3 id="companyName">Company: {this.props.companyName}</h3>
                <h3 id="price">Price: {this.props.price}</h3>
                <h3 id="endDate">Expiration: {this.props.endDate}</h3>
                <button onClick={this.openModal}>View details</button>    
                <Modal dialogClassName = "couponModal" enforceFocus scrollable show = {this.state.showModal}>
                    <Modal.Header>  
                        <Modal.Title>
                            <h2>Coupon's name: {this.state.fullCoupon.title}</h2>
                            <h3>Company: {this.state.fullCoupon.companyName}</h3>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h2>Category: {this.state.fullCoupon.category}</h2>
                        <h3>Description:</h3>
                        <p>{this.state.fullCoupon.description}</p>
                        <h3>Price: {this.state.fullCoupon.price}</h3>
                        <h3>Amount: {this.state.fullCoupon.amount}</h3>
                        <h3>Start date: {this.state.fullCoupon.startDate} </h3>
                        <h3>End date: {this.state.fullCoupon.endDate}</h3> 
                    </Modal.Body>
                    <Modal.Footer>
                        <this.ButtonSet/>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    private ButtonSet = (props: any) =>{
        let userType = sessionStorage.getItem("userType");
        let isCustomer = (userType == "CUSTOMER");
        let isCompany = (userType == "COMPANY");
        let isAdmin = (userType == "ADMIN");
        return(
            <div className = "modalButtons">
                { isCustomer &&
                  <NavLink to="/purchases/newPurchase" exact>
                  <button onClick={this.prepareForPurchaseOrUpdate}>Purchase</button>
                  </NavLink>
                  } 
                { isCompany &&
                  <NavLink to = "coupons/update" exact>
                    <button onClick={this.prepareForPurchaseOrUpdate}>Update</button>
                  </NavLink>
                }
                {
                  isCompany &&
                  <button onClick={this.deleteCoupon}>Delete Coupon</button>
                }
                {
                  isAdmin &&
                    <NavLink to="/companies/viewCompany" exact>
                        <button onClick={this.prepareForPurchaseOrUpdate}>View Company</button>
                    </NavLink>
                }
                <button onClick={this.hideModal}>Cancel</button>
            </div>
        );
    }

    private hideModal = () =>{
        this.setState({ showModal: false });
    }

    private openModal = async () =>{
        if(this.state.fullCoupon.title === undefined){
            try {
                let url = "http://localhost:8080/coupons/" + this.props.id;
                let response = await axios.get<FullCouponData>(url);
                this.setState({showModal:true, fullCoupon: response.data});
                return;
            } catch (error) {
                console.log(error.message);
            }
        }
        this.setState({showModal:true});
    }           

   private prepareForPurchaseOrUpdate = () => {
        this.hideModal();
        store.dispatch({type: ActionType.PrepareForPurchaseOrUpdate, payload: {...this.state.fullCoupon}});
   }

   private deleteCoupon = async () =>{
       this.hideModal();
       try {
           let couponID = this.props.id;
           let url = "http://localhost:8080/coupons/" + couponID;
           await axios.delete(url);
           alert("Coupon was successfully deleted");
       } catch (error) {
           console.error(error.message);
           alert("Deleting process was failed");
       }
       getAllCoupons();
   }
   
}   