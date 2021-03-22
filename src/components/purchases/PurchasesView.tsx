import { Component, ChangeEvent} from "react";
import {store} from "../../redux/store";
import axios from "axios";
import { BasicPurchaseData } from "../../models/purchases/BasicPurchaseData";
import { ActionType } from "../../redux/action-type";
import PurchaseUnit from "./purchaseunit/PurchaseUnit";
import "./PurchasesView.css";

interface PurchasesState{
    purchases: BasicPurchaseData[],
    input: string
}

export default class PurchasesView extends Component<any,PurchasesState>{
    public constructor(props: any){
        super(props);
        
        let initialPurchasesList = store.getState().purchases;
        if( ! initialPurchasesList){
            initialPurchasesList = [];
        }
        
        this.state = {
            purchases: initialPurchasesList,
            input: ""
        }
        store.subscribe(this.subscription);
    }
    public render(){
        return(
            <div className="purchasesView">
                <section className="topSection">
                    <h1>Hi, good to see you :)</h1>
                    <label htmlFor="companyFilter">Filter By Title:</label>
                    <input type="text" id="companyFilter" onChange={this.setInput} />
                </section>
                <section>
                    {this.state.purchases.filter(this.filterFunc).map(
                        (purchase) => <PurchaseUnit key={purchase.id} {...purchase} />
                    )}
                </section>
            </div>
        );
    }

    async componentDidMount() {
        let isLoged = store.getState().isLoged;
        let purchases = store.getState().purchases;
        let shouldGetPurchases = (!purchases) && isLoged;

        if (shouldGetPurchases ) {
            try {
                let response = await axios.get<BasicPurchaseData[]>("http://localhost:8080/purchases");
                store.dispatch({ type: ActionType.GetAllPurchases, payload: response.data });
            } catch (error) {
                console.error(error.message);
                alert("General Error");
            }
        }
    }

    private subscription = () => {
       if (store.getState().purchases){
           this.setState({ purchases: store.getState().purchases });
       }
    }

    private setInput = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({input: event.target.value.toLowerCase()});
    }

    private filterFunc = (purchase: BasicPurchaseData) => {
        let input = this.state.input
        if(input == ""){
            return true;
        }
        return purchase.couponTitle.toLowerCase().includes(input);
    }
}

