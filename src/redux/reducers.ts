import {Action} from "./action";
import {AppState} from "./AppState";
import {ActionType} from "./action-type";

export function reducer(currentState: AppState, action: Action){
    switch (action.type) {
        case ActionType.Login:
            return (
                {
                    ...currentState,
                    isLoged: true
                }
            );
        case ActionType.Logout:
            return (
                new AppState()
            );
        case ActionType.GetAllCoupons:
            return (
                {
                    ...currentState,
                    coupons: action.payload
                }
            );
        case ActionType.GetAllCompanies:
            return(
                {
                    ...currentState,
                    companies: action.payload
                }
            );
        case ActionType.GetAllPurchases:
            return (
                {
                    ...currentState,
                    purchases: action.payload
                }
            );
        case ActionType.PrepareForPurchaseOrUpdate:
            return(
                {
                    ...currentState,
                    couponForAction: action.payload
                }
            );
        case ActionType.GetAccountDetails:
            return(
                {
                    ...currentState,
                    userDetails: action.payload
                }
            );
        case ActionType.PrepareForUpdateCompany:
            return(
                {
                    ...currentState,
                    companyForUpdate: action.payload
                }
            );
        default:
            return currentState;
    }
}