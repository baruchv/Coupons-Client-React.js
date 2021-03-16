import {Component} from "react";
import { NavLink } from "react-router-dom";
import { FullCompanyData } from "../../../models/companies/FullCompanyData";
import { store } from "../../../redux/store";
import "./UpdateCompany.css"

interface ViewCompanyState{
    companyDetails: FullCompanyData
}

interface DetailProps{
    kind: string,
    detail: string
    companyID: number
}

interface DetailState{
    input: string,
    showModal: boolean
}

export default class ViewCompany extends Component<any, ViewCompanyState>{
    public constructor(props: any){
        super(props)
        let fullCompany = store.getState().companyForView;
        if(! fullCompany){
            this.props.history.push("/coupons");
        }
        this.state = {
            companyDetails: fullCompany
        }
    }
    
    render(){
        return(
            <div className="viewCompany">
                <h2>Companies Name: {this.state.companyDetails.name}</h2>
                <DetailUnit kind="Address" detail={this.state.companyDetails.address} companyID={this.state.companyDetails.id}/>
                <DetailUnit kind="Phone Number" detail={this.state.companyDetails.phoneNumber} companyID={this.state.companyDetails.id} />
                <button>Delete Company</button>
                <NavLink to="/companies" exact>
                    <button>Go Back</button>
                </NavLink>
            </div>
        )
    }

}

class DetailUnit extends Component<DetailProps, DetailState>{
    public constructor(props: DetailProps){
        super(props);
        this.state = {
            showModal: false,
            input: null
        }
    }

    render(){
        return(
            <div className="detailUnit">

            </div>
        )
    }
}
