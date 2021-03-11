import {Component} from "react";
import { NavLink } from "react-router-dom";
import { FullCouponData } from "../../../models/coupons/FullCouponData";
import { AmountUnit } from "./units/AmountUnit";
import { ImageUnit } from "./units/ImageUnit";
import { PriceUnit } from "./units/PriceUnit";
import { store } from "../../../redux/store";

interface UpdateCouponState{
    coupon: FullCouponData
}

export default class UpdateCoupon extends Component<any, UpdateCouponState>{
    public constructor(props: any){
        super(props);
        this.state = {
            coupon: new FullCouponData()
        }
    }
    render(){
        return(
            <div className="updateCoupon"> 
                <AmountUnit originalField={this.props.amount} couponID={this.props.id}/>
                <PriceUnit originalField={this.props.price} couponID={this.props.id}/>
                <ImageUnit originalField={this.props.image} couponID={this.props.id}/>
                <NavLink to="/coupons" exact>
                    <button>Go Back</button>
                </NavLink>
            </div>
        )
    }
    
    async componentDidMount(){
        this.setState({coupon: store.getState().couponForAction})
    }
}