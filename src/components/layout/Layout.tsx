import { Component } from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Login from "../login/Login";
import Menu from "../menu/Menu";
import Home from "../home/Home";
import About from "../about/About";
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
import CompaniesView from "../companies/view/CompaniesView";
import ViewCompany from "../companies/update/ViewCompany";
import NewCompany from "../companies/create/NewCompany";
import UsersView from "../users/view/UsersView";
import NewUser from "../users/create/NewUser";
import OurTeam from "../team/OurTeam";
import Contact from "../contact/Contact";
import { BasicCompanyData } from "../../models/companies/BasicCompanyData";
import { BasicPurchaseData } from "../../models/purchases/BasicPurchaseData";
import { FullUserData } from "../../models/users/FullUserData";



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
              <Route path="/register" component = {NewUser} exact />
              <Route path="/about" component = {About} exact />
              <Route path="/coupons/create" component = {NewCoupon} exact />
              <Route path = "/coupons/update" component = {UpdateCoupon} exact />
              <Route path="/coupons" component={CouponsView} exact />
              <Route path="/purchases/newPurchase" component = {NewPurchaseView} exact />
              <Route path="/purchases" component = {PurchasesView} exact />
              <Route path="/account" component = {Account} exact />
              <Route path="/companies" component={CompaniesView} exact />
              <Route path="/companies/viewCompany" component={ViewCompany} exact />
              <Route path="/companies/create" component={NewCompany} exact />
              <Route path="/users" component={UsersView} exact />
              <Route path="users/create" component={NewUser} exact />
              <Route path="/ourTeam" component={OurTeam} exact/>
              <Route path="/contact" component={Contact} exact/>
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

  //Checks whether the user is in a middle of login-session.
  //In case he is, bring the data from the server.
  async componentDidMount(){
    try {
      axios.defaults.headers.common["Authorization"] = sessionStorage.getItem("token");
      let coupons = await axios.get<BasicCouponData[]>("http://localhost:8080/coupons");
      if(coupons.status == 200){
        store.dispatch({ type: ActionType.GetAllCoupons, payload: coupons.data });
        store.dispatch({type: ActionType.Login});
        this.setState({ defaultRouting: "/coupons" });
        let purchases = await axios.get<BasicPurchaseData[]>("http://localhost:8080/purchases");
        store.dispatch({ type: ActionType.GetAllPurchases, payload: purchases.data });
        let userDetails = await axios.get<FullUserData>("http://localhost:8080/users/account");
        store.dispatch({ type: ActionType.GetAccountDetails, payload: userDetails.data });        
        if(sessionStorage.getItem("userType") === "ADMIN"){
          let companies = await axios.get<BasicCompanyData[]>("http://localhost:8080/companies");
          store.dispatch({ type: ActionType.GetAllCompanies, payload: companies.data });
          let users = await axios.get<BasicCompanyData[]>("http://localhost:8080/users");store.dispatch({ type: ActionType.GetAllCompanies, payload: companies.data });
          store.dispatch({ type: ActionType.GetAllUsers, payload: users.data });
        }
      }
    } catch (error) {
      console.log("Not loged in");
    }
  }
}
