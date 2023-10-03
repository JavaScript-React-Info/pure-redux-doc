import React from "react";
import { useState } from "react";
import { connect } from "react-redux";

const SelectorApp = (props) => {
    console.log("~~~~selectorapp props", props);
    const [username, setUsername] = useState('')

    const addUser = () => {
        props.dispatch({
            type: 'ADD_USER',
            payload: username
        })
    }

    return(
        <div>
           <input 
           type='text'
           value={username}
           onChange={(e)=> setUsername(e.target.value)}
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
        users: state
    }
}

export default connect(mapStateToProp)(SelectorApp);