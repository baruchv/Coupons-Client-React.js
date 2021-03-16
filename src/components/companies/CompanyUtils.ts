import axios from "axios";
import { BasicCompanyData } from "../../models/companies/BasicCompanyData";
import { ActionType } from "../../redux/action-type";
import { store } from "../../redux/store";

export const getAllCompanies = async () => {
    try {
        let response = await axios.get<BasicCompanyData[]>("http://localhost:8080/companies");
        store.dispatch({ type: ActionType.GetAllCompanies, payload: response.data });
    } catch (error) {
        console.error(error.message);
        alert("General Error");
    }
}