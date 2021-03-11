import {createStore} from "redux";
import { FullCouponData } from "../models/coupons/FullCouponData";
import { FullUserData } from "../models/users/FullUserData";
import {AppState} from "./AppState";
import {reducer} from "./reducers";

const initialState = new AppState();

export const store = createStore(reducer, initialState);