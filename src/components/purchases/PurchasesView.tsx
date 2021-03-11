import {Component} from "react";
import {store} from "../../redux/store";
import axios from "axios";
import { BasicPurchaseData } from "../../models/purchases/BasicPurchaseData";
import { ActionType } from "../../redux/action-type";
import PurchaseUnit from "./purchaseunit/PurchaseUnit";
import "./PurchasesView.css";

interface PurchasesState{
    purchases: BasicPurchaseData[];
}

export default class PurchasesView extends Component<any,PurchasesState>{
    public constructor(props: any){
        super(props);
        
        let initialPurchasesList = store.getState().purchases;
        if( ! initialPurchasesList){
            initialPurchasesList = [];
        }
        
        this.state = {
            purchases: initialPurchasesList
        }
        store.subscribe(this.subscription);
    }
    public render(){
        return(
            <div className="purchasesView">
                <section>

                </section>
                <section>
                    {this.state.purchases.map(
                        (purchase) => <PurchaseUnit key={purchase.id} {...purchase} />
                    )}
                </section>
            </div>
        );
    }

    async componentDidMount() {
        if ( ! store.getState().purchases ) {
            try {
                let response = await axios.get<BasicPurchaseData[]>("http://localhost:8080/purchases");
                store.dispatch({ type: ActionType.GetAllPurchases, payload: response.data });
            } catch (error) {
                alert(error.message);
            }
        }
    }

    private subscription = () => {
        this.setState({ purchases: store.getState().purchases });
    }
}