import { Component, ChangeEvent } from "react";
import { NavLink } from "react-router-dom";
import { BasicCompanyData } from "../../../models/companies/BasicCompanyData";
import { store } from "../../../redux/store";
import { getAllCompanies } from "../CompanyUtils";
import CompanyComponent from "./units/CompanyComponent";
import "./CompaniesView.css"

interface CompaniesViewState{
    companies: BasicCompanyData[],
    filterValue: string
}

export default class CompaniesView extends Component<any, CompaniesViewState> {
    public constructor(props: any){
        super(props);

        let initialCompaniesList = store.getState().companies;
        if (!initialCompaniesList) {
            initialCompaniesList = [];
        }

        this.state = {
            companies: initialCompaniesList,
            filterValue: ""
        }

        store.subscribe(this.subscription);
    }
    
    render() {
        return (
            <div className="companiesView">
                <section className="topSection">
                    <h1>Hi, good to see you :)</h1>
                        <NavLink to="/companies/create" exact>
                            <button>Create Company</button>
                        </NavLink>
                    <label htmlFor="companyFilter">Filter By name:</label>
                    <input type="text" id="companyFilter" onChange={this.setFilterValue} />
                </section>
                <section>
                    {
                        this.state.companies.filter(this.filter).map(
                            (company) => <CompanyComponent key={company.id} {...company} />
                        )
                    }
                </section>
            </div>
        )
    }

    async componentDidMount(){
        let isLoged = store.getState().isLoged;
        let companies = store.getState().companies;
        let shouldGetCompanies = (! companies) && isLoged;

        if(shouldGetCompanies){
            getAllCompanies();
        }
    }

    private setFilterValue = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ filterValue: event.target.value.toLowerCase() });
    }

    private filter = (company: BasicCompanyData): boolean => {
        if (this.state.filterValue == "") {
            return true;
        }
        return company.name.toLowerCase().includes(this.state.filterValue);
    }

    private subscription = () => {
        if (store.getState().companies ){
            this.setState({ companies: store.getState().companies });
        }
    }
}