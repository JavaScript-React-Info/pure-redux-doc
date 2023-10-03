import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { usersSelector } from "./selector";

const SelectorApp = (props) => {
   

    const handleUserNameChange = (e)=> {
        props.dispatch({
            type: 'CHANGE_USERNAME',
            payload: e.target.value
        })
    }

    const addUser = (e) => {
        props.dispatch({
            type: 'ADD_USER',
        })
    }

    return(
        <div>
           <input 
           type='text'
           value={props.username}
           onChange={handleUserNameChange}
           />
           <button onClick={addUser}>Add User</button>
           <ul>
            {
                props.users.map((user, index)=> <li key={index}>{user}</li>)
            }
           </ul>
        </div>
    )
}

const mapStateToProp = (state) => {
    console.log("~~~~~~~mapStateToProp", (state));
    return {
        users: usersSelector(state), // this is a code duplication,if we try to have this in other compoennt, so better to write function which has global state and return a pice of state.
        // seclector function which return a part of state
        username: state.username
    }
}

export default connect(mapStateToProp)(SelectorApp);