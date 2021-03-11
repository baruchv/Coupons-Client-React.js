import {ChangeEvent, Component} from "react";
import {store} from "../../../redux/store";
import {BasicCouponData} from "../../../models/coupons/BasicCouponData";
import  CouponComponent from "./units/CouponComponent";
import "./CouponsView.css";
import { NavLink } from "react-router-dom";
import { getAllCoupons } from "../CouponUtils";


interface CouponsViewState{
    coupons: BasicCouponData[];
    filterValue: string;
}

export default class CouponsView extends Component<any, CouponsViewState> {
    public constructor(props: any){
        super(props);
        
        let initialCouponList = store.getState().coupons;
        if( ! initialCouponList){
            initialCouponList = [];
        }

        this.state = {
            coupons: initialCouponList,
            filterValue: ""
        }
        store.subscribe(this.subscription); 
    }

   public render(){ 
        let userType = sessionStorage.getItem("userType");
        return(
            <div className = "couponsView">
             <section className="topSection">
                    <h1>Hi, good to see you :)</h1>
                    {
                        userType === "COMPANY" &&
                        <NavLink to ="/coupons/create" exact>
                            <button>Create Coupon</button>
                        </NavLink>
                    }
                    <label htmlFor="couponTitleFilter">Filter By Title:</label>
                    <input type="text" id="couponTitleFilter" onChange={this.setFilterValue}/>
             </section>
             <section>
                {
                     this.state.coupons.filter(this.filter).map(
                        (coupon) => <CouponComponent key={coupon.id} {...coupon} />
                      )
                }
             </section>
            </div>
        )
    }

    async componentDidMount(){
        if (! store.getState().coupons) {
            getAllCoupons();
        }
    }

    private setFilterValue = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({filterValue: event.target.value.toLowerCase()});
    }

    private filter = (coupon: BasicCouponData): boolean =>{
        if(this.state.filterValue == ""){
            return true;
        }
        return coupon.couponTitle.toLowerCase().includes(this.state.filterValue);
    }

    private subscription = () =>{
        this.setState({  coupons: store.getState().coupons});
    }

    
}