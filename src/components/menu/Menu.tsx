import { Component } from "react";
import {store} from "../../redux/store";
import { VisitorsMenu, BasicUserMenu, AdminMenu} from "./navbars/NavBars"
import "./Menu.css";

interface MenuState{
    isLoged: boolean;
}

export default class Menu extends Component<any, MenuState> {
    public constructor(props: any){
        super(props);
        this.state = {
            isLoged: store.getState().isLoged
        }
        store.subscribe(() => this.setState(
                {
                     isLoged: store.getState().isLoged
                }
            )
        );
   }
    public render(){
        let isDefaultUser = this.state.isLoged && sessionStorage.getItem("userType") != "ADMIN";
        let isAdmin = this.state.isLoged && sessionStorage.getItem("userType") == "ADMIN";
        return (
            <div className="menu">
                {!this.state.isLoged && <VisitorsMenu/>}
                {isDefaultUser && <BasicUserMenu/>}
                {isAdmin && <AdminMenu/>}
            </div>
        );
    }

    
}