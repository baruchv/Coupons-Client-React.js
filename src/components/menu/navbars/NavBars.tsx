import {Component} from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {store} from "../../../redux/store";
import { ActionType } from "../../../redux/action-type";
import "./NavBars.css";


export class VisitorsMenu extends Component{
    public render() {
        return (
            <div className="navBar">
                <NavLink to="/home" exact>
                    <button >
                        Home
                    </button>
                </NavLink>
                <NavLink to="/login" exact>
                    <button >
                        Log In
                    </button>
                </NavLink>
                <NavLink to="/register" exact>
                    <button >
                        Sign Up
                    </button>
                </NavLink>
                <NavLink to="/about" exact>
                    <button >
                        About
                     </button>
                </NavLink>
            </div>
        );
    }
}

export class BasicUserMenu extends Component{
    public render(){
        return(
            <div className = "navBar">
                <NavLink to="/coupons" exact>
                    <button >
                        Coupons
                    </button>
                </NavLink>
                <NavLink to="/purchases" exact>
                    <button >
                        Purchases
                     </button>
                </NavLink>
                <NavLink to="/account" exact>
                    <button >
                        My Account
                    </button>
                </NavLink>
                <NavLink to="/home" exact>
                    <button onClick = {this.logOut}>
                        Log Out
                    </button>
                </NavLink>
            </div>
        );
    }

    private logOut = async () => {
        try {
            axios.post("http://localhost:8080/users/logout");
            store.dispatch({type: ActionType.Logout});
        } catch (error) {
            console.error(error.message);
        }
    }
}

export class AdminMenu extends Component{
    public render(){
        return(
            <div className="adminNavBar">
                <NavLink to="/coupons" exact>
                    <button >
                        Coupons
                    </button>
                </NavLink>
                <NavLink to="/purchases" exact>
                    <button >
                        Purchases
                     </button>
                </NavLink>
                <NavLink to="/companies" exact>
                    <button >
                        Purchases
                     </button>
                </NavLink>
                <NavLink to="/users" exact>
                    <button >
                       Users
                     </button>
                </NavLink>
                <NavLink to="/account" exact>
                    <button >
                        My Account
                    </button>
                </NavLink>
                <NavLink to="/home" exact>
                    <button onClick={this.logOut}>
                        Log Out
                    </button>
                </NavLink>
            </div>
        );
    }

    private logOut = async () => {
        try {
            axios.post("http://localhost:8080/users/logout");
            store.dispatch({ type: ActionType.Logout });
        } catch (error) {
            console.error(error.message);
        }
    }
}

