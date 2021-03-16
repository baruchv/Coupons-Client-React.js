import { BasicCompanyData } from "../models/companies/BasicCompanyData";
import { FullCompanyData } from "../models/companies/FullCompanyData";
import { BasicCouponData } from "../models/coupons/BasicCouponData";
import { FullCouponData } from "../models/coupons/FullCouponData";
import {BasicPurchaseData} from "../models/purchases/BasicPurchaseData";
import { FullUserData } from "../models/users/FullUserData";

export class AppState{
    isLoged: boolean;
    coupons: BasicCouponData[];
    companies: BasicCompanyData[];
    purchases: BasicPurchaseData[];
    couponForAction: FullCouponData;
    userDetails: FullUserData;
    companyForUpdate: FullCompanyData
}

