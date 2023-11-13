import { createStore }from "redux"
import {  rootReducer } from "../RootReducer/rootReducer"

let store = createStore(
    rootReducer
    )

 export default store
