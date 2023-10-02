import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./action";

const ReduxApp = () =>{
    const count = useSelector((state) => state);
    const dispatch = useDispatch()
    
    return(
        <div>
            <h1>{count}</h1>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
    )
}
export default ReduxApp;