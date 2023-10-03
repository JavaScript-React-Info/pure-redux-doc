import React from "react";
import { useState } from "react";
import { connect } from "react-redux";

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
    console.log("~~~~~~~mapStateToProp", state);
    return {
        users: state.users,
        username: state.username
    }
}

export default connect(mapStateToProp)(SelectorApp);