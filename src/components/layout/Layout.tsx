import { Component } from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Login from "../login/Login";
import Menu from "../menu/Menu";
import Home from "../home/Home";
import About from "../about/About";
import SignUp from "../sign up/SignUp";
import NewPurchaseView from "../purchases/newpurchase/NewPurchaseView";
import CouponsView from "../coupons/view/CouponsView";
import axios from "axios";
import PurchasesView from "../purchases/PurchasesView";
import './Layout.css';
import Account from "../account/Account";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/action-type";
import { BasicCouponData } from "../../models/coupons/BasicCouponData";
import NewCoupon from "../coupons/create/NewCoupon";
import UpdateCoupon from "../coupons/update/UpdateCoupon";



interface LayoutState{
  defaultRouting: string
}

export default class Layout extends Component<any,LayoutState>{
  
  public constructor(props: any){
    super(props);

    this.state = {
      defaultRouting: "/home"
    };


  }
  
  public render() {
    return(
      <BrowserRouter>
        <div className="layout">
          <header>
            <Header />
          </header>
          <aside>
            <Menu />
          </aside>
          <main>
            <Switch> 
              <Route path="/home" component = {Home} exact/>
              <Route path="/login" component = {Login} exact />
              <Route path="/register" component = {SignUp} exact />
              <Route path="/about" component = {About} exact />
              <Route path="/coupons/create" component = {NewCoupon} exact />
              <Route path = "/coupons/update" component = {UpdateCoupon} exact />
              <Route path="/coupons" component={CouponsView} exact />
              <Route path="/purchases/newPurchase" component = {NewPurchaseView} exact />
              <Route path="/purchases" component = {PurchasesView} exact />
              <Route path="/account" component = {Account} exact />
              <Redirect from = "/" to = {this.state.defaultRouting} exact />
            </Switch>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </BrowserRouter>
    );
  }

  async componentDidMount(){
    try {
      let response = axios.get<BasicCouponData[]>("http://localhost:8080/coupons");
      store.dispatch({ type: ActionType.GetAllCoupons, payload: (await response).data });
      this.setState({ defaultRouting: "/coupons" });
    } catch (error) {
      console.log("Login session was timed out");
    }
  }
}
