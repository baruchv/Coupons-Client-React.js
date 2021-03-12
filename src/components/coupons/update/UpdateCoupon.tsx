import {Component} from "react";
import { NavLink } from "react-router-dom";
import { FullCouponData } from "../../../models/coupons/FullCouponData";
import { AmountUnit } from "./units/AmountUnit";
import { ImageUnit } from "./units/ImageUnit";
import { PriceUnit } from "./units/PriceUnit";
import { store } from "../../../redux/store";
import "./UpdateCoupon.css";

interface UpdateCouponState{
    coupon: FullCouponData
}

export default class UpdateCoupon extends Component<any, UpdateCouponState>{
    public constructor(props: any){
        super(props);
        this.state = { coupon: store.getState().couponForAction }
    }
    render(){
        return(
            <div className="updateCoupon"> 
                <AmountUnit />
                <PriceUnit />
                <ImageUnit />
                <NavLink to="/coupons" exact>
                    <button id="returnButton">Go Back</button>
                </NavLink>
            </div>
        )
    }

}