import { combineReducers } from "redux";
import { fetchEbolaData } from "../reducers/chain";

export default combineReducers({
    chain: fetchEbolaData
});