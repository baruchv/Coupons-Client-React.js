import {Component} from "react";
import axios from "axios";
import { store } from "../../../redux/store";
import { FullCouponData } from "../../../models/coupons/FullCouponData";
import { BasicCouponData } from "../../../models/coupons/BasicCouponData";
import { ActionType } from "../../../redux/action-type";
import { BasicPurchaseData } from "../../../models/purchases/BasicPurchaseData";
import "./NewPurchaseView.css";


interface purchaseState{
    amount: number,
    coupon: FullCouponData
}


export default class NewPurchaseView extends Component<any, purchaseState>{
    public constructor(props: any){
        super(props);
      
        this.state = {
            amount: 1,
            coupon: store.getState().couponForAction
        }
        
    }
    
    render(){
        let couponTitle = this.state.coupon.title;
        let companyName = this.state.coupon.companyName;
        let couponPrice = this.state.coupon.price;
        return(
            <div className = "newPurchase">
                <h2>Hi, Let's proceed with the purchase :)</h2>
                <section className = "purchaseDetails">
                    <h3>Coupon's Title: 
                        <h4>{couponTitle}</h4>
                    </h3>
                    <h3>Company Name: 
                        <h4>{companyName}</h4>
                    </h3>
                    <h3>Amount: 
                        <h4>{this.state.amount}</h4>
                    </h3>
                    <h3>Total Price: {this.state.amount * couponPrice}</h3>
                    <button onClick={this.increase} id="increaseButton">Increase</button>
                    <button onClick={this.decrease} id="decreaseButton">Decrease</button>   
                </section>
                <section className="purchaseActions">
                    <button onClick={this.purchase} id="purchaseButton">Purchase</button>
                    <button onClick={this.cancelPurchase} id="cancelButton">Cancel</button>
                </section>

            </div>
        );
    }

    private increase = () => {
        let availableAmount = this.state.coupon.amount;
        if (this.state.amount >= availableAmount) {
            alert("Sorry, you've reached the maximal amount");
        }
        else{
            let newAmount = this.state.amount + 1;
            this.setState({amount: newAmount});
        }
    }

    private decrease = () => {
        if (this.state.amount <= 1) {
            alert("Sorry, amount of coupons must be positive");
        }
        else{
            let newAmount = this.state.amount - 1;
            this.setState({amount: newAmount});
        }
    } 

    private purchase = async() => {
        try {
            let purchaseDto = {
                couponID: this.state.coupon.id,
                amount: this.state.amount
            }
            await axios.post("http://localhost:8080/purchases", purchaseDto);
            alert("Congrats! Purchase was succeed");
            this.props.history.push("/coupons");
            this.updateCoupons();
            this.updatePurchsaes();
        } catch (error) {
            console.error(error.message);
        }
    }

    private updateCoupons = async() =>{
        try {
            let response = await axios.get<BasicCouponData[]>("http://localhost:8080/coupons");
            store.dispatch({ type: ActionType.GetAllCoupons, payload: response.data });
        } catch (error) {
            alert(error.message);
        }
    }

    private updatePurchsaes = async() =>{
        try {
            let response = await axios.get<BasicPurchaseData[]>("http://localhost:8080/purchases");
            store.dispatch({ type: ActionType.GetAllPurchases, payload: response.data });
        } catch (error) {
            alert(error.message);
        }
    }

    private cancelPurchase = () =>{
        this.props.history.push("/coupons");
    }

}