import {ChangeEvent, Component} from "react";
import { BasicUserData } from "../../../models/users/BasicUserData";
import { store } from "../../../redux/store";
import { NavLink } from "react-router-dom";
import "./UsersView.css"
import UserComponent from "./units/UserComponent";
import { getAllUsers } from "../Utils";

interface UsersViewState{
    users: BasicUserData[],
    filterValue: string
}

export default class UsersView extends Component<any, UsersViewState>{
    public constructor(props: any){
        super(props);
        
        let usersList = store.getState().users;
        if( !usersList ){
            usersList = [];
        }

        this.state = {
            users: usersList,
            filterValue: ""
        }

        store.subscribe(this.subscription);
    }

    render(){
        return(
            <div className="usersView">
                <section className="topSection">
                    <h1>Hi, good to see you :)</h1>
                    {
                        <NavLink to="/users/create" exact>
                            <button>Create User</button>
                        </NavLink>
                    }
                    <label htmlFor="usersFilter">Filter By Username:</label>
                    <input type="text" id="usersFilter" onChange={this.setFilterValue} />
                </section>
                <section>
                    {
                        this.state.users.filter(this.filter).map(
                            (user) => <UserComponent key={user.id} {...user} />
                        )
                    }
                </section>
            </div>
        )
    }

    async componentDidMount() {
        let isLoged = store.getState().isLoged;
        let companies = store.getState().companies;
        let shouldGetCompanies = (!companies) && isLoged;

        if (shouldGetCompanies) {
            getAllUsers();
        }
    }

    private setFilterValue = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ filterValue: event.target.value.toLowerCase() });
    }

    private filter = (user: BasicUserData): boolean => {
        if (this.state.filterValue == "") {
            return true;
        }
        return user.userName.toLowerCase().includes(this.state.filterValue);
    }

    private subscription = () => {
        if (store.getState().users) {
            this.setState({ users: store.getState().users });
        }
    }
}