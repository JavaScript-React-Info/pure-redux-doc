import { createStore } from "redux";
import userReducer from "./reducer";

export const SelectorStore = createStore(userReducer);