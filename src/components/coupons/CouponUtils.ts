import axios from "axios";
import { BasicCouponData } from "../../models/coupons/BasicCouponData";
import { ActionType } from "../../redux/action-type";
import { store } from "../../redux/store";

export const getAllCoupons = async () => {
    try {
        let response = await axios.get<BasicCouponData[]>("http://localhost:8080/coupons");
        store.dispatch({ type: ActionType.GetAllCoupons, payload: response.data });
    } catch (error) {
        console.error(error.message);
        alert("General Error");
    }
}