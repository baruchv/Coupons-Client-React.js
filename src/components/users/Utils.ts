import axios from "axios";
import { ActionType } from "../../redux/action-type";
import { store } from "../../redux/store";

export const getAllUsers = async () => {
    try {
        let response = await axios.get("http://localhost:8080/users");
        store.dispatch({type: ActionType.GetAllUsers, payload: response.data});
    } catch (error) {
        alert("General Error");
        console.error(error.message);
    }
}